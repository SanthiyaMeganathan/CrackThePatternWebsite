const supabase = require("../db/supabase");

/**
 * Middleware: validates the session token sent in the Authorization header
 * against the live value in the database.
 *
 * Header expected: Authorization: Bearer <sessionToken>
 *
 * Attaches req.user = { id, email, account_status } on success.
 * Returns 401 with reason 'device_eviction' when a newer session exists.
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
    // Token doesn't match any row → could be eviction or invalid token
    return res.status(401).json({
      error: "Session invalid.",
      reason: "device_eviction",
    });
  }

  if (user.account_status !== "Paid") {
    return res.status(403).json({ error: "Access requires a paid account." });
  }

  req.user = user;
  next();
}

module.exports = sessionGuard;
