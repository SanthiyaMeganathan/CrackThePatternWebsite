import React, { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEnrollGate } from "../hooks/useEnrollGate";

// ── Replace this with your actual video embed URL ─────────────────────────
// YouTube: "https://www.youtube.com/embed/VIDEO_ID?rel=0&modestbranding=1&controls=1"
// Vimeo:   "https://player.vimeo.com/video/VIDEO_ID"
// Mux/Self-hosted: use <video> tag instead
const DEMO_VIDEO_EMBED_URL =
  import.meta.env.VITE_DEMO_VIDEO_URL ||
  "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1";

export default function DemoMasterclass() {
  const navigate = useNavigate();
  const handleEnroll = useEnrollGate();
  const name = sessionStorage.getItem("ctp_lead_name") || "";
  const videoRef = useRef(null);

  // Guard: if no lead data in session, redirect back to home
  useEffect(() => {
    if (!sessionStorage.getItem("ctp_lead_email")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // Prevent right-click on the video area
  function blockContextMenu(e) {
    e.preventDefault();
    return false;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div className="bg-blue-900/80 backdrop-blur border-b border-blue-800 px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition">
          <img src="/logo.png" alt="CTP" className="w-8 h-8 rounded" />
          <span className="font-bold text-sm">Crack The Pattern</span>
        </Link>
        <p className="text-xs text-blue-300 hidden sm:block">
          🔒 Secure · For registered leads only
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* ── Welcome header ──────────────────────────────────────────────── */}
        <div className="mb-8 text-center animate-fade-up">
          {name && (
            <p className="text-yellow-400 font-semibold text-sm mb-2">
              Welcome, {name}! 👋
            </p>
          )}
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Free Demo Masterclass
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Watch how the <strong className="text-white">pattern-based method</strong> solves
            placement aptitude questions in under 30 seconds — no formulas required.
          </p>
        </div>

        {/* ── Video Player ────────────────────────────────────────────────── */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-black"
          onContextMenu={blockContextMenu}
          ref={videoRef}
        >
          {/* Transparent overlay to block right-click download on <video> tags */}
          <div
            className="absolute inset-0 z-10"
            onContextMenu={blockContextMenu}
            style={{ pointerEvents: "auto" }}
          />

          <div className="aspect-video w-full">
            <iframe
              src={DEMO_VIDEO_EMBED_URL}
              title="Crack The Pattern – Free Demo Masterclass"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
              style={{ display: "block" }}
            />
          </div>
        </div>

        {/* ── Enroll CTA below video ───────────────────────────────────────── */}
        <div className="mt-10 bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 text-center border border-blue-700">
          <p className="text-yellow-400 text-sm font-semibold uppercase tracking-wider mb-2">
            Limited seats · Next batch starting soon
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            Ready to Enroll in the Full Course?
          </h2>
          <p className="text-blue-200 mb-6 max-w-md mx-auto">
            You've seen the method. Now master every pattern with 3 months of live coaching,
            weekly tests, and lifetime access to recordings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleEnroll}
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-10 py-4 rounded-xl text-lg shadow-lg transition animate-pulse-glow"
            >
              Enroll in Course Now – ₹4,999 →
            </button>
          </div>
          <p className="text-blue-400 text-xs mt-4">
            ✔ Secure payment via Razorpay · UPI, Cards, Net Banking accepted
          </p>
        </div>

        {/* ── What you just saw ────────────────────────────────────────────── */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: "⚡", title: "Pattern Recognition", desc: "Identify question types instantly" },
            { icon: "🧮", title: "Speed Techniques", desc: "Solve in 15–30 seconds flat" },
            { icon: "📈", title: "Consistent Accuracy", desc: "No formula memorization needed" },
          ].map((f, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
              <div className="text-2xl mb-2">{f.icon}</div>
              <p className="font-bold text-white text-sm">{f.title}</p>
              <p className="text-gray-500 text-xs mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
