import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

const MEDALS = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [activeWeek, setActiveWeek] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchWeeks() {
    try {
      const res = await fetch(`${API}/leaderboard/weeks`);
      const data = await res.json();
      if (data.weeks?.length) {
        setWeeks(data.weeks);
        setActiveWeek(data.weeks[data.weeks.length - 1]); // latest week
      }
    } catch { /* silent */ }
  }

  async function fetchScores(week) {
    setLoading(true);
    setError("");
    try {
      const url = week ? `${API}/leaderboard?week=${week}` : `${API}/leaderboard`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to load."); return; }
      setScores(data.data || []);
    } catch {
      setError("Network error. Please refresh.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchWeeks(); }, []);
  useEffect(() => { if (activeWeek !== null) fetchScores(activeWeek); }, [activeWeek]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-2">Community · Progress · Proof</p>
          <h1 className="text-4xl font-extrabold mb-3">Weekly Leaderboard</h1>
          <p className="text-blue-200 max-w-xl mx-auto">
            Every week, students take timed aptitude tests. Their scores are ranked here —
            a live proof of progress, not pressure.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* ── Week Tabs ───────────────────────────────────────────────────── */}
        {weeks.length > 1 && (
          <div className="flex gap-2 flex-wrap mb-8">
            {weeks.map((w) => (
              <button
                key={w}
                onClick={() => setActiveWeek(w)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition
                  ${activeWeek === w
                    ? "bg-blue-900 text-white shadow"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-blue-400"
                  }`}
              >
                Week {w}
              </button>
            ))}
          </div>
        )}

        {/* ── Table ───────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-blue-900 text-lg">
              {activeWeek ? `Week ${activeWeek} Results` : "Latest Results"}
            </h2>
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
              {scores.length} students
            </span>
          </div>

          {loading ? (
            <div className="p-6 space-y-3">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          ) : scores.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-5xl mb-4">📊</div>
              <p className="text-gray-500">No scores recorded yet for this week.</p>
              <p className="text-gray-400 text-sm mt-2">Check back after the weekly test!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {/* Top 3 podium cards */}
              {scores.slice(0, 3).length === 3 && (
                <div className="grid grid-cols-3 gap-3 p-4 bg-gradient-to-b from-blue-50 to-white">
                  {[scores[1], scores[0], scores[2]].map((s, i) => {
                    const positions = [2, 1, 3];
                    const pos = positions[i];
                    const heights = ["h-20", "h-24", "h-16"];
                    return (
                      <div key={s.rank} className={`flex flex-col items-center justify-end ${heights[i]} bg-white rounded-xl border border-gray-100 shadow-sm p-3`}>
                        <span className="text-2xl">{MEDALS[pos]}</span>
                        <p className="font-bold text-xs text-center text-gray-900 mt-1 truncate w-full text-center">{s.student_display_name}</p>
                        <p className="text-blue-700 font-extrabold text-sm">{s.score}/{s.max_score}</p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Full table */}
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
                    <th className="px-5 py-3 text-left w-12">Rank</th>
                    <th className="px-5 py-3 text-left">Student</th>
                    <th className="px-5 py-3 text-right">Score</th>
                    <th className="px-5 py-3 text-right">%</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((row) => (
                    <tr
                      key={`${row.rank}-${row.student_display_name}`}
                      className={`hover:bg-blue-50 transition ${row.rank <= 3 ? "bg-yellow-50/40" : ""}`}
                    >
                      <td className="px-5 py-4 font-bold text-gray-400">
                        {MEDALS[row.rank] || `#${row.rank}`}
                      </td>
                      <td className="px-5 py-4 font-semibold text-gray-900">
                        {row.student_display_name}
                      </td>
                      <td className="px-5 py-4 text-right font-bold text-blue-800">
                        {row.score}/{row.max_score}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold
                          ${row.percentage >= 80 ? "bg-green-100 text-green-700"
                          : row.percentage >= 60 ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-600"}`}>
                          {parseFloat(row.percentage).toFixed(0)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <div className="mt-10 bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">Want your name on this leaderboard?</h2>
          <p className="text-blue-200 text-sm mb-5">
            Enroll in Crack The Pattern and start your weekly score tracking from day one.
          </p>
          <Link
            to="/checkout"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-3 rounded-xl transition"
          >
            Enroll Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
