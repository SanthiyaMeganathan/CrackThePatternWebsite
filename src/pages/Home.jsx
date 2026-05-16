import React from "react";
import { Link } from "react-router-dom";
import { useDemoModal } from "../context/DemoModalContext";
import { useEnrollGate } from "../hooks/useEnrollGate";
import HowItWorksSection from "../components/HowItWorksSection";

export default function Home() {
  const { openModal } = useDemoModal();
  const handleEnroll = useEnrollGate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <p className="sr-only">
        Online aptitude training for engineering students in India. Crack The Pattern helps college
        students prepare for campus placement aptitude tests through live online classes.
      </p>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-yellow-600 text-xs font-bold uppercase tracking-widest mb-3">
            #1 Pattern-Based Aptitude Training · India
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 leading-tight">
            Crack The Pattern –{" "}
            <span className="text-blue-600">Online Aptitude Training</span>{" "}
            for Placement Exams
          </h1>
          <p className="mt-4 text-gray-600 max-w-xl text-lg">
            Improve speed, accuracy, and confidence in quantitative, logical, and verbal aptitude
            using a proven pattern-based method. Live classes. Lifetime recordings.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              id="hero-watch-demo-btn"
              onClick={openModal}
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-4 rounded-xl text-base shadow-lg transition animate-pulse-glow"
            >
              Watch Free Demo 🎥
            </button>
            <Link
              to="/the-course"
              className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-bold px-8 py-4 rounded-xl text-base transition text-center"
            >
              View Course Details
            </Link>
          </div>

          <p className="mt-4 text-xs text-gray-400">
            ✔ Live classes &nbsp;·&nbsp; ✔ Recorded sessions &nbsp;·&nbsp; ✔ No pressure to enroll
          </p>

          {/* Mini feature tiles */}
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-white rounded-xl shadow-sm flex items-start gap-3 border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <p className="font-semibold text-gray-900">Pattern Method</p>
                <p className="text-xs text-gray-500">Structured shortcut techniques</p>
              </div>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-sm flex items-start gap-3 border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <p className="font-semibold text-gray-900">Live & Interactive</p>
                <p className="text-xs text-gray-500">Doubt clearing & small batches</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Lead form card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-7">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
            Free Demo · No Credit Card
          </p>
          <h2 className="text-xl font-bold text-blue-900 mb-1">Watch the Free Masterclass</h2>
          <p className="text-gray-500 text-sm mb-5">
            30-minute video teaching you exactly how the pattern method works.
          </p>

          <button
            onClick={openModal}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition text-base mb-3"
          >
            Get Instant Access →
          </button>

          <ul className="text-sm text-gray-600 space-y-1.5">
            <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✔</span> 3–5 live placement questions solved</li>
            <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✔</span> The pattern recognition method explained</li>
            <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✔</span> No selling, no pressure</li>
          </ul>
          <p className="text-xs text-gray-400 mt-4 text-center">🔒 Your details are 100% secure. We never spam.</p>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <HowItWorksSection />

      {/* ── Social Proof Strip ───────────────────────────────────────────── */}
      <section className="bg-blue-900 text-white py-10 px-6 mt-8">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-around gap-6 text-center">
          {[
            { stat: "25–35%", label: "Score improvement in first month" },
            { stat: "3×/Week", label: "Live classes with doubt clearing" },
            { stat: "Lifetime", label: "Access to all recordings & notes" },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-3xl font-extrabold text-yellow-400">{s.stat}</p>
              <p className="text-blue-200 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
