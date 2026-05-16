const supabase = require("../db/supabase");

/**
 * sessionGuard — validates the session token in the Authorization header.
 *
 * Only verifies the token is current (device-eviction protection).
 * Does NOT enforce account_status — individual routes that need paid-only
 * access use the separate paidGuard middleware.
 *
 * Attaches req.user = { id, email, account_status } on success.
 */
async function sessionGuard(req, res, next) {
  const authHeader = req.headers["authorization"] || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "No session token provided." });
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("id, email, account_status, current_session_token")
    .eq("current_session_token", token)
    .single();

  if (error || !user) {
    return res.status(401).json({
      error: "Session invalid.",
      reason: "device_eviction",
    });
  }

  req.user = user;
  next();
}

/**
 * paidGuard — must be chained AFTER sessionGuard.
 * Returns 403 if the authenticated user has not paid yet.
 */
function paidGuard(req, res, next) {
  if (req.user?.account_status !== "Paid") {
    return res.status(403).json({
      error: "Access requires a paid account.",
      reason: "unpaid",
    });
  }
  next();
}

module.exports = { sessionGuard, paidGuard };
