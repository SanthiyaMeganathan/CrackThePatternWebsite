const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const { Resend } = require("resend");
const supabase = require("../db/supabase");

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Helpers ──────────────────────────────────────────────────────────────

function generateOTP() {
  // Cryptographically random 6-digit OTP
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

// ─── POST /api/v1/auth/request-otp ────────────────────────────────────────
/**
 * Body: { email }
 * Checks paid status, generates OTP, sends email.
 * Returns 402 if user is not paid (redirect to checkout).
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

  const { data: user } = await supabase
    .from("users")
    .select("id, name, email, account_status")
    .eq("email", email.toLowerCase().trim())
    .single();

  if (!user) {
    // Don't reveal whether email exists — guide to checkout
    return res.status(402).json({
      error: "No paid account found for this email.",
      redirect: "/checkout",
    });
  }

  if (user.account_status !== "Paid") {
    return res.status(402).json({
      error: "Your account is not yet activated. Please complete payment to access the course.",
      redirect: "/checkout",
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
    message: "OTP sent to your registered email address.",
  });
});

// ─── POST /api/v1/auth/verify-otp ─────────────────────────────────────────
/**
 * Body: { email, otp }
 * Verifies OTP, issues a new session token (overwrites old one → single-session).
 * Returns sessionToken + user info.
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

  if (user.account_status !== "Paid") {
    return res.status(402).json({ error: "Account not activated.", redirect: "/checkout" });
  }

  if (!user.otp_code || user.otp_code !== otp) {
    return res.status(401).json({ error: "Incorrect OTP. Please check your email." });
  }

  if (!user.otp_expires_at || new Date(user.otp_expires_at) < new Date()) {
    return res.status(401).json({ error: "OTP has expired. Please request a new one." });
  }

  // ✅ Valid — issue new session token (single-session: this overwrites any existing token)
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
    },
  });
});

// ─── POST /api/v1/auth/validate-session ───────────────────────────────────
/**
 * Body: { token }
 * Compares client token against DB. Used for polling-based session eviction.
 * Returns { valid: true } or { valid: false, reason: 'device_eviction' }
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

  if (user.account_status !== "Paid") {
    return res.json({ valid: false, reason: "unpaid" });
  }

  return res.json({ valid: true });
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
