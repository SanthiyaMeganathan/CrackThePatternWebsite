require("dotenv").config();
const express = require("express");
const cors = require("cors");

const leadsRouter = require("./routes/leads");
const authRouter = require("./routes/auth");
const paymentRouter = require("./routes/payment");
const leaderboardRouter = require("./routes/leaderboard");
const dashboardRouter = require("./routes/dashboard");

const app = express();

// ─── CORS ──────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

// ─── Body Parsers ─────────────────────────────────────────────────────────
// Raw body needed for Razorpay webhook signature verification
app.use((req, res, next) => {
  if (req.path === "/api/v1/payment-webhook") {
    express.raw({ type: "application/json" })(req, res, next);
  } else {
    express.json()(req, res, next);
  }
});

// ─── Routes ───────────────────────────────────────────────────────────────
app.use("/api/v1/leads", leadsRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", paymentRouter);          // /api/v1/payment/create-order + /api/v1/payment-webhook
app.use("/api/v1/leaderboard", leaderboardRouter);
app.use("/api/v1/dashboard", dashboardRouter);

// ─── Health Check ─────────────────────────────────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok", ts: new Date() }));

// ─── Global Error Handler ─────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("[ERROR]", err);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});

// ─── Start ────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ CTP Backend running on http://localhost:${PORT}`);
});
