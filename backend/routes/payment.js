const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Razorpay = require("razorpay");
const { Resend } = require("resend");
const supabase = require("../db/supabase");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const resend = new Resend(process.env.RESEND_API_KEY);
const COURSE_PRICE_PAISE = (parseInt(process.env.COURSE_PRICE_INR) || 4999) * 100;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// ─── POST /api/v1/payment/create-order ────────────────────────────────────
/**
 * Body: { name, email, phone }
 * Creates a Razorpay order. Returns orderId + key for frontend checkout popup.
 */
router.post("/payment/create-order", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!email?.trim()) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    const order = await razorpay.orders.create({
      amount: COURSE_PRICE_PAISE,
      currency: "INR",
      receipt: `ctp_${Date.now()}`,
      notes: { name, email, phone },
    });

    // Upsert user record so webhook can find them
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("email", email.toLowerCase().trim())
      .single();

    if (!existing) {
      await supabase.from("users").insert({
        name,
        email: email.toLowerCase().trim(),
        phone,
        account_status: "Lead",
        razorpay_order_id: order.id,
      });
    } else {
      await supabase
        .from("users")
        .update({ razorpay_order_id: order.id, name, phone })
        .eq("id", existing.id);
    }

    return res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      prefill: { name, email, contact: phone },
    });
  } catch (err) {
    console.error("[payment:create-order]", err);
    return res.status(500).json({ error: "Failed to create payment order." });
  }
});

// ─── POST /api/v1/payment-webhook ─────────────────────────────────────────
/**
 * Razorpay webhook. Expects raw body for HMAC verification.
 * Handles: payment.captured
 */
router.post("/payment-webhook", async (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];

  // Verify signature
  const rawBody = req.body; // Buffer (raw body middleware applied in server.js)
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");

  if (signature !== expectedSignature) {
    console.warn("[webhook] Invalid signature");
    return res.status(400).json({ error: "Invalid webhook signature." });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody.toString());
  } catch {
    return res.status(400).json({ error: "Invalid JSON payload." });
  }

  const event = payload.event;
  console.log("[webhook] Event:", event);

  if (event === "payment.captured") {
    const payment = payload.payload.payment.entity;
    const { email, name, phone } = payment.notes || {};
    const paymentId = payment.id;

    if (!email) {
      console.warn("[webhook] No email in payment notes");
      return res.status(200).json({ received: true });
    }

    try {
      const { data: existing } = await supabase
        .from("users")
        .select("id, name, account_status")
        .eq("email", email.toLowerCase().trim())
        .single();

      if (existing) {
        // Update existing user to Paid
        await supabase
          .from("users")
          .update({
            account_status: "Paid",
            razorpay_payment_id: paymentId,
            name: existing.name || name,
            phone: phone || undefined,
          })
          .eq("id", existing.id);
      } else {
        // Create new paid user
        await supabase.from("users").insert({
          name,
          email: email.toLowerCase().trim(),
          phone,
          account_status: "Paid",
          razorpay_payment_id: paymentId,
        });
      }

      // Send welcome email with login deep-link
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "noreply@crackthepattern.com",
        to: email,
        subject: "🎉 Welcome to Crack The Pattern! Your course access is ready.",
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:auto;padding:32px;background:#f0f4ff;border-radius:12px;">
            <h1 style="color:#1e3a8a;font-size:24px;margin-bottom:8px;">Welcome to Crack The Pattern! 🎉</h1>
            <p style="color:#374151;">Hi ${name || "there"},</p>
            <p style="color:#374151;">
              Your payment was successful and your course access is now <strong>fully activated</strong>.
              You can log in using the button below — no password needed, just your email.
            </p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${FRONTEND_URL}/login"
                 style="background:#1e3a8a;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;">
                Access My Course Dashboard →
              </a>
            </div>
            <p style="color:#6b7280;font-size:13px;">
              Click "Login" on that page, enter this email address, and we'll send you a one-time login code.
            </p>
            <hr style="border:none;border-top:1px solid #dde3f0;margin:24px 0;" />
            <p style="color:#9ca3af;font-size:12px;">
              Payment ID: ${paymentId}<br/>
              Crack The Pattern · Learn the Pattern. Crack the Exam.
            </p>
          </div>
        `,
      });

      console.log("[webhook] User activated:", email);
    } catch (err) {
      console.error("[webhook:payment.captured]", err);
    }
  }

  return res.status(200).json({ received: true });
});

module.exports = router;
