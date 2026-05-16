import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEnrollGate } from "../hooks/useEnrollGate";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

export default function MyLearning() {
  const { user, sessionToken, isPaid, logout, evictionMessage, setEvictionMessage } = useAuth();
  const navigate = useNavigate();
  const handleEnroll = useEnrollGate();

  const [modules, setModules] = useState([]);
  const [loadingModules, setLoadingModules] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [activeModule, setActiveModule] = useState(null);

  // Eviction redirect
  useEffect(() => {
    if (evictionMessage) {
      const t = setTimeout(() => {
        setEvictionMessage("");
        navigate("/", { replace: true });
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [evictionMessage, navigate, setEvictionMessage]);

  const fetchModules = useCallback(async () => {
    if (!sessionToken || !isPaid) {
      setLoadingModules(false);
      return;
    }
    setLoadingModules(true);
    setFetchError("");
    try {
      const res = await fetch(`${API}/dashboard/modules`, {
        headers: { Authorization: `Bearer ${sessionToken}` },
      });
      const data = await res.json();

      if (res.status === 401) {
        logout();
        navigate("/", { replace: true });
        return;
      }
      if (!res.ok) {
        setFetchError(data.error || "Failed to load modules.");
        return;
      }
      setModules(data.modules || []);
      if (data.modules?.length) setActiveModule(data.modules[0]);
    } catch {
      setFetchError("Network error. Please refresh.");
    } finally {
      setLoadingModules(false);
    }
  }, [sessionToken, isPaid]); // eslint-disable-line

  useEffect(() => { fetchModules(); }, [fetchModules]);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  // ── Eviction banner ───────────────────────────────────────────────────
  if (evictionMessage) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="bg-red-950 border border-red-700 rounded-2xl p-8 max-w-md text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-white font-bold text-xl mb-3">Session Ended</h2>
          <p className="text-red-300 text-sm">{evictionMessage}</p>
          <p className="text-red-500 text-xs mt-4">Redirecting…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <Link to="/">
            <img src="/logo.png" alt="CTP" className="w-9 h-9 rounded-lg" />
          </Link>
          <div>
            <p className="font-bold text-sm">Crack The Pattern</p>
            <p className="text-blue-300 text-xs">My Learning</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="font-semibold text-sm">{user?.name}</p>
            <p className="text-blue-300 text-xs">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-blue-300 hover:text-red-400 transition border border-blue-700
                       hover:border-red-500 px-3 py-1.5 rounded-lg"
          >
            Logout
          </button>
        </div>
      </header>

      {/* ── Not paid: elegant empty state ────────────────────────────────── */}
      {!isPaid ? (
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <div className="text-6xl mb-5">📚</div>
          <h1 className="text-2xl font-extrabold text-blue-900 mb-3">
            You haven't enrolled in any courses yet
          </h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Once you enroll in the <strong>Aptitude Pattern Mastery Program</strong>, all your
            course modules, recordings, and weekly test results will appear here.
          </p>
          <button
            onClick={handleEnroll}
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold
                       px-10 py-4 rounded-xl text-base shadow-lg transition animate-pulse-glow"
          >
            Enroll Now – ₹4,999 →
          </button>
          <p className="text-gray-400 text-xs mt-4">
            ✔ Secure payment via Razorpay · UPI, Cards, Net Banking
          </p>

          {/* Preview of what awaits */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
            {[
              { icon: "🎬", title: "Video Lessons", desc: "60+ recorded sessions available lifetime" },
              { icon: "📊", title: "Weekly Tests", desc: "Timed aptitude tests with leaderboard" },
              { icon: "📄", title: "Class Notes", desc: "PDF notes shared after every session" },
            ].map((f, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm opacity-60">
                <div className="text-2xl mb-2">{f.icon}</div>
                <p className="font-bold text-gray-800 text-sm mb-1">{f.title}</p>
                <p className="text-gray-500 text-xs">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ── Paid: course content ──────────────────────────────────────── */
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-blue-50 border-b border-blue-100 px-5 py-4">
                <h2 className="font-bold text-blue-900 text-sm">Course Modules</h2>
              </div>

              {loadingModules ? (
                <div className="p-6 space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : fetchError ? (
                <div className="p-5">
                  <p className="text-red-600 text-sm">{fetchError}</p>
                  <button onClick={fetchModules} className="mt-2 text-blue-600 text-xs hover:underline">Retry</button>
                </div>
              ) : modules.length === 0 ? (
                <div className="p-5 text-gray-500 text-sm">Modules loading soon — check back!</div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {modules.map((mod) => (
                    <li key={mod.id}>
                      <button
                        onClick={() => setActiveModule(mod)}
                        className={`w-full text-left px-5 py-4 flex items-start gap-3 hover:bg-blue-50 transition
                          ${activeModule?.id === mod.id ? "bg-blue-50 border-l-4 border-blue-600" : ""}`}
                      >
                        <span className="text-lg mt-0.5">
                          {mod.type === "video" ? "🎬" : mod.type === "pdf" ? "📄" : "🔗"}
                        </span>
                        <div>
                          <p className={`text-sm font-medium ${activeModule?.id === mod.id ? "text-blue-900" : "text-gray-800"}`}>
                            {mod.title}
                          </p>
                          {mod.weekNumber && (
                            <p className="text-xs text-gray-400 mt-0.5">Week {mod.weekNumber}</p>
                          )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Main viewer */}
          <div className="lg:col-span-3">
            {activeModule ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium capitalize">
                      {activeModule.type}
                    </span>
                    {activeModule.weekNumber && (
                      <span className="text-sm text-gray-400">Week {activeModule.weekNumber}</span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-blue-900">{activeModule.title}</h2>
                  {activeModule.description && (
                    <p className="text-gray-500 text-sm mt-1">{activeModule.description}</p>
                  )}
                </div>

                <div className="p-6">
                  {activeModule.type === "video" && activeModule.url && (
                    <div
                      className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-md"
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      <video
                        key={activeModule.url}
                        src={activeModule.url}
                        controls
                        controlsList="nodownload"
                        disablePictureInPicture
                        className="w-full h-full"
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    </div>
                  )}

                  {activeModule.type === "pdf" && activeModule.url && (
                    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-md">
                      <iframe
                        src={`${activeModule.url}#toolbar=0&navpanes=0`}
                        title={activeModule.title}
                        className="w-full"
                        style={{ height: "70vh" }}
                      />
                    </div>
                  )}

                  {activeModule.type === "link" && activeModule.url && (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-4">🔗</div>
                      <a
                        href={activeModule.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-bold px-8 py-3 rounded-xl transition"
                      >
                        Join Live Session →
                      </a>
                    </div>
                  )}

                  {!activeModule.url && (
                    <div className="text-center py-12 text-gray-400">
                      <div className="text-4xl mb-3">🔒</div>
                      <p>Content not yet available. Check back soon.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center text-gray-400">
                <div className="text-5xl mb-4">📚</div>
                <p className="font-medium text-gray-600">Select a module from the left to begin</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
