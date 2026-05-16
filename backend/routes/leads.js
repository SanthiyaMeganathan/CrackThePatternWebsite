const express = require("express");
const router = express.Router();
const supabase = require("../db/supabase");

/**
 * POST /api/v1/leads
 * Body: { name, email, phone }
 * Saves lead and upserts a 'Lead' user record.
 */
router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name?.trim() || !email?.trim() || !phone?.trim()) {
    return res.status(400).json({ error: "Name, email, and phone are required." });
  }

  // Basic email validation
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRx.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  // Phone: 10-digit Indian mobile
  const phoneRx = /^[6-9]\d{9}$/;
  if (!phoneRx.test(phone.replace(/\s/g, ""))) {
    return res.status(400).json({ error: "Enter a valid 10-digit Indian mobile number." });
  }

  try {
    // Save to leads table (audit log)
    await supabase.from("leads").insert({ name, email, phone });

    // Upsert into users — don't overwrite paid users
    const { data: existing } = await supabase
      .from("users")
      .select("id, account_status")
      .eq("email", email)
      .single();

    if (!existing) {
      await supabase.from("users").insert({ name, email, phone, account_status: "Lead" });
    } else if (existing.account_status === "Lead") {
      // Update name/phone if they changed
      await supabase.from("users").update({ name, phone }).eq("email", email);
    }

    return res.status(201).json({ success: true, message: "Lead captured." });
  } catch (err) {
    console.error("[leads]", err);
    return res.status(500).json({ error: "Failed to save lead." });
  }
});

module.exports = router;
