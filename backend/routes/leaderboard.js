const express = require("express");
const router = express.Router();
const supabase = require("../db/supabase");

/**
 * GET /api/v1/leaderboard
 * Query params: ?week=1 (optional, defaults to latest week)
 * Returns leaderboard sorted by score descending. Public route.
 */
router.get("/", async (req, res) => {
  try {
    const weekParam = req.query.week ? parseInt(req.query.week) : null;

    let query = supabase
      .from("leaderboard_scores")
      .select("student_display_name, week_number, score, max_score, percentage, created_at")
      .order("score", { ascending: false })
      .order("created_at", { ascending: true }); // tie-break: earlier submission ranks higher

    if (weekParam) {
      query = query.eq("week_number", weekParam);
    } else {
      // Get the latest week's data
      const { data: latestWeek } = await supabase
        .from("leaderboard_scores")
        .select("week_number")
        .order("week_number", { ascending: false })
        .limit(1)
        .single();

      if (latestWeek) {
        query = query.eq("week_number", latestWeek.week_number);
      }
    }

    const { data, error } = await query.limit(50);

    if (error) throw error;

    // Add rank
    const ranked = (data || []).map((row, i) => ({ rank: i + 1, ...row }));

    return res.json({ success: true, data: ranked });
  } catch (err) {
    console.error("[leaderboard]", err);
    return res.status(500).json({ error: "Failed to fetch leaderboard." });
  }
});

/**
 * GET /api/v1/leaderboard/weeks
 * Returns list of available week numbers.
 */
router.get("/weeks", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("leaderboard_scores")
      .select("week_number")
      .order("week_number", { ascending: true });

    if (error) throw error;

    const weeks = [...new Set((data || []).map((r) => r.week_number))];
    return res.json({ success: true, weeks });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch weeks." });
  }
});

module.exports = router;
