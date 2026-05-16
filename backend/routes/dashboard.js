const express = require("express");
const router = express.Router();
const supabase = require("../db/supabase");
const { sessionGuard, paidGuard } = require("../middleware/sessionGuard");

const SIGNED_URL_TTL = 900; // 15 minutes in seconds

/**
 * GET /api/v1/dashboard/modules
 * Protected. Returns course modules with freshly signed, short-lived URLs.
 * Raw storage paths are NEVER sent to the client.
 */
router.get("/modules", sessionGuard, paidGuard, async (req, res) => {
  try {
    const { data: modules, error } = await supabase
      .from("course_modules")
      .select("id, title, description, type, storage_path, module_order, week_number")
      .eq("is_active", true)
      .order("module_order", { ascending: true });

    if (error) throw error;

    // Generate signed URLs server-side — never expose raw storage paths
    const modulesWithSignedUrls = await Promise.all(
      (modules || []).map(async (mod) => {
        let signedUrl = null;

        if (mod.type === "video" || mod.type === "pdf") {
          const bucket = mod.type === "video" ? "course-videos" : "course-pdfs";
          const { data: signed, error: signError } = await supabase.storage
            .from(bucket)
            .createSignedUrl(mod.storage_path, SIGNED_URL_TTL);

          if (!signError && signed) {
            signedUrl = signed.signedUrl;
          }
        } else if (mod.type === "link") {
          // External links (e.g. Google Meet) passed through as-is
          signedUrl = mod.storage_path;
        }

        return {
          id: mod.id,
          title: mod.title,
          description: mod.description,
          type: mod.type,
          url: signedUrl,           // signed URL only — no raw storage_path
          moduleOrder: mod.module_order,
          weekNumber: mod.week_number,
        };
      })
    );

    return res.json({ success: true, modules: modulesWithSignedUrls });
  } catch (err) {
    console.error("[dashboard:modules]", err);
    return res.status(500).json({ error: "Failed to load course modules." });
  }
});

/**
 * GET /api/v1/dashboard/me
 * Protected. Returns the authenticated student's profile.
 */
router.get("/me", sessionGuard, async (req, res) => { // any authenticated user
  return res.json({
    success: true,
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

module.exports = router;
