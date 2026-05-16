const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const { Resend } = require("resend");
const supabase = require("../db/supabase");

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Helpers ──────────────────────────────────────────────────────────────

function generateOTP() {
  return String(crypto.randomInt(100000, 999999));
}

function generateSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}

async function sendOTPEmail(email, name, otp) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "noreply@crackthepattern.com",
    to: email,
    subject: "Your Crack The Pattern Login OTP",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;background:#f0f4ff;border-radius:12px;">
        <h2 style="color:#1e3a8a;margin-bottom:8px;">Crack The Pattern</h2>
        <p style="color:#374151;">Hi ${name || "there"},</p>
        <p style="color:#374151;">Your one-time login code is:</p>
        <div style="font-size:40px;font-weight:900;letter-spacing:12px;color:#1e3a8a;text-align:center;padding:24px 0;">
          ${otp}
        </div>
        <p style="color:#6b7280;font-size:13px;">This code expires in <strong>5 minutes</strong>. Do not share it with anyone.</p>
        <hr style="border:none;border-top:1px solid #dde3f0;margin:24px 0;" />
        <p style="color:#9ca3af;font-size:12px;">Crack The Pattern · Learn the Pattern. Crack the Exam.</p>
      </div>
    `,
  });
}

// ─── POST /api/v1/auth/signup ─────────────────────────────────────────────
/**
 * Body: { name, email, phone }
 * Creates a new Lead-status user and sends OTP for first-time verification.
 * Does NOT issue a session token directly — OTP verify-otp completes the flow.
 */
router.post("/signup", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name?.trim() || !email?.trim() || !phone?.trim()) {
    return res.status(400).json({ error: "Name, email, and phone are required." });
  }

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRx.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  const phoneRx = /^[6-9]\d{9}$/;
  if (!phoneRx.test(phone.replace(/\s/g, ""))) {
    return res.status(400).json({ error: "Enter a valid 10-digit Indian mobile number." });
  }

  const cleanEmail = email.toLowerCase().trim();

  // Check if user already exists
  const { data: existing } = await supabase
    .from("users")
    .select("id, account_status")
    .eq("email", cleanEmail)
    .single();

  if (existing) {
    return res.status(409).json({
      error: "An account with this email already exists. Please log in instead.",
      redirect: "login",
    });
  }

  // Create new Lead-status user
  const { error: insertError } = await supabase
    .from("users")
    .insert({ name: name.trim(), email: cleanEmail, phone: phone.trim(), account_status: "Lead" });

  if (insertError) {
    console.error("[auth:signup]", insertError);
    return res.status(500).json({ error: "Failed to create account. Please try again." });
  }

  // Generate and send OTP to verify email ownership
  const otp = generateOTP();
  const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

  await supabase
    .from("users")
    .update({ otp_code: otp, otp_expires_at: otpExpiresAt })
    .eq("email", cleanEmail);

  try {
    await sendOTPEmail(cleanEmail, name.trim(), otp);
  } catch (err) {
    console.error("[auth:signup-email]", err);
    return res.status(500).json({ error: "Account created but failed to send OTP. Please use login to continue." });
  }

  return res.status(201).json({
    success: true,
    message: "Account created! Check your email for the verification code.",
    email: cleanEmail,
  });
});

// ─── POST /api/v1/auth/request-otp ────────────────────────────────────────
/**
 * Body: { email }
 * Any registered user (Lead or Paid) can request an OTP.
 * Returns 404 only if no account exists at all.
 */
router.post("/request-otp", async (req, res) => {
  const { email } = req.body;

  if (!email?.trim()) {
    return res.status(400).json({ error: "Email is required." });
  }

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRx.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  const cleanEmail = email.toLowerCase().trim();

  const { data: user } = await supabase
    .from("users")
    .select("id, name, email, account_status")
    .eq("email", cleanEmail)
    .single();

  if (!user) {
    return res.status(404).json({
      error: "No account found with this email. Please sign up first.",
      redirect: "signup",
    });
  }

  const otp = generateOTP();
  const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

  await supabase
    .from("users")
    .update({ otp_code: otp, otp_expires_at: otpExpiresAt })
    .eq("id", user.id);

  try {
    await sendOTPEmail(user.email, user.name, otp);
  } catch (err) {
    console.error("[auth:otp-email]", err);
    return res.status(500).json({ error: "Failed to send OTP email. Please try again." });
  }

  return res.json({
    success: true,
    message: "Login code sent to your email address.",
  });
});

// ─── POST /api/v1/auth/verify-otp ─────────────────────────────────────────
/**
 * Body: { email, otp }
 * Works for any registered user regardless of account_status.
 * Returns sessionToken + user info including account_status so the
 * frontend can route accordingly (paid → dashboard, lead → my-learning empty state).
 */
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required." });
  }

  const { data: user } = await supabase
    .from("users")
    .select("id, name, email, account_status, otp_code, otp_expires_at")
    .eq("email", email.toLowerCase().trim())
    .single();

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  if (!user.otp_code || user.otp_code !== otp) {
    return res.status(401).json({ error: "Incorrect OTP. Please check your email." });
  }

  if (!user.otp_expires_at || new Date(user.otp_expires_at) < new Date()) {
    return res.status(401).json({ error: "OTP has expired. Please request a new one." });
  }

  // ✅ Issue new session token (single-session: overwrites any existing)
  const sessionToken = generateSessionToken();

  await supabase
    .from("users")
    .update({
      current_session_token: sessionToken,
      otp_code: null,
      otp_expires_at: null,
    })
    .eq("id", user.id);

  return res.json({
    success: true,
    sessionToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      accountStatus: user.account_status, // 'Lead' | 'Paid' — frontend routes based on this
    },
  });
});

// ─── POST /api/v1/auth/validate-session ───────────────────────────────────
/**
 * Body: { token }
 * Validates token is still the current active session.
 * Returns { valid, accountStatus } — does NOT require Paid status.
 * The frontend uses accountStatus to update UI state if payment completes mid-session.
 */
router.post("/validate-session", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.json({ valid: false, reason: "no_token" });
  }

  const { data: user } = await supabase
    .from("users")
    .select("id, current_session_token, account_status")
    .eq("current_session_token", token)
    .single();

  if (!user) {
    return res.json({ valid: false, reason: "device_eviction" });
  }

  return res.json({ valid: true, accountStatus: user.account_status });
});

// ─── POST /api/v1/auth/logout ─────────────────────────────────────────────
router.post("/logout", async (req, res) => {
  const authHeader = req.headers["authorization"] || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (token) {
    await supabase
      .from("users")
      .update({ current_session_token: null })
      .eq("current_session_token", token);
  }

  return res.json({ success: true });
});

module.exports = router;
