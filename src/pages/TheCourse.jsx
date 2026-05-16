import React, { useState } from "react";
import { useDemoModal } from "../context/DemoModalContext";
import { useEnrollGate } from "../hooks/useEnrollGate";

const syllabusTopics = [
  {
    category: "Quantitative Aptitude",
    icon: "🔢",
    topics: [
      "Averages",
      "Time & Work",
      "Time & Distance",
      "Profit & Loss",
      "Percentages",
      "Ratios & Proportions",
      "Interest, Discount & Applications",
      "Pipes & Cisterns, Trains, Ages, and more",
    ],
  },
  {
    category: "Logical Reasoning",
    icon: "🧩",
    topics: [
      "Seating Arrangements",
      "Series & Patterns",
      "Directions & Distance",
      "Blood Relations",
      "Coding–Decoding",
      "Syllogisms & Logical Connectives",
      "Analytical & Puzzle-Based Reasoning",
    ],
  },
  {
    category: "Verbal Ability",
    icon: "📖",
    topics: [
      "Reading Comprehension",
      "Jumbled Sentences",
      "Grammar & Sentence Correction",
      "Synonyms & Antonyms",
      "Sentence Formation",
      "Verbal Logic",
    ],
  },
];

function AccordionItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-blue-50 transition text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{item.icon}</span>
          <span className="font-bold text-blue-900 text-lg">{item.category}</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
            {item.topics.length} Topics
          </span>
        </div>
        <span className={`text-blue-600 text-xl font-bold transition-transform duration-200 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && (
        <div className="bg-gray-50 px-6 pb-5 pt-3 border-t border-gray-100">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {item.topics.map((topic, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                <span className="text-blue-500 font-bold mt-0.5">•</span>
                {topic}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function TheCourse() {
  const { openModal } = useDemoModal();
  const handleEnroll = useEnrollGate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ── Hero Pitch ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-3">
            One Course. All Patterns. Every Exam.
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
            Aptitude Pattern Mastery Program
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
            The only online aptitude course that teaches you to <em>recognize patterns</em> — not
            memorize formulas — so you can solve campus placement questions faster and with accuracy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openModal}
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-4 rounded-xl text-base shadow-lg transition animate-pulse-glow"
            >
              Watch Free Demo First 🎥
            </button>
            <button
              onClick={handleEnroll}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold px-8 py-4 rounded-xl text-base transition"
            >
              Enroll Now – ₹4,999
            </button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-blue-200 text-sm">
            <span>✔ 3 Live Sessions/Week</span>
            <span>✔ 3-Month Program</span>
            <span>✔ Lifetime Access to Recordings</span>
            <span>✔ Weekly Progress Tests</span>
          </div>
        </div>
      </section>

      {/* ── Why CTP ──────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-blue-900 mb-2 text-center">Why Choose Crack The Pattern?</h2>
        <p className="text-center text-gray-500 mb-10">Everything you need. Nothing you don't.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "🎯", title: "Pattern-Based Learning", desc: "Recognize question types on sight. No more blank-staring at a question — you'll know the shortcut instantly." },
            { icon: "🎙️", title: "Live Interactive Classes", desc: "3 sessions per week, 60 minutes each. Ask doubts in real-time. Small batches mean personal attention." },
            { icon: "📹", title: "Lifetime Recordings", desc: "Miss a class? Zero stress. Every session is recorded and available forever inside your dashboard." },
            { icon: "📊", title: "Weekly Progress Tests", desc: "Timed mock tests every week. Track your improvement score-by-score and see where to focus next." },
            { icon: "🏢", title: "Company-Wise Patterns", desc: "TCS, Infosys, Wipro, Accenture — each company's exam pattern taught topic-by-topic." },
            { icon: "🔓", title: "Try Before You Buy", desc: "Watch the free demo masterclass and see the pattern method in action before spending a rupee." },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition hover:-translate-y-0.5">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Course Structure ─────────────────────────────────────────────────── */}
      <section className="bg-blue-50 border-y border-blue-100 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center">Course Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { stat: "3 Months", desc: "Program duration with flexible pacing" },
              { stat: "3×/Week", desc: "60-minute live sessions, Mon–Sat" },
              { stat: "Lifetime", desc: "Access to recordings & materials after graduation" },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-blue-200">
                <div className="text-4xl font-extrabold text-blue-700 mb-2">{s.stat}</div>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Syllabus Accordion ───────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-blue-900 mb-2 text-center">Full Syllabus</h2>
        <p className="text-center text-gray-500 mb-8">
          Three domains, all taught via pattern-based methods aligned with real placement exams.
        </p>
        <div className="space-y-4">
          {syllabusTopics.map((item, i) => (
            <AccordionItem key={i} item={item} />
          ))}
        </div>
      </section>

      {/* ── How It's Taught ─────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center">How Every Topic Is Taught</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Pattern Concept", desc: "Understand the repeating pattern behind each question type." },
              { step: "2", title: "Shortcut Technique", desc: "Learn the fastest formula or approach for that exact pattern." },
              { step: "3", title: "Solved Examples", desc: "Watch 3–5 live examples solved using the technique." },
              { step: "4", title: "Practice & Test", desc: "Reinforce with practice sets and weekly timed tests." },
            ].map((s, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-12 h-12 bg-blue-700 text-white text-xl font-extrabold rounded-full flex items-center justify-center mx-auto mb-3">
                  {s.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-4">Ready to Crack the Pattern?</h2>
          <p className="text-gray-500 mb-8">
            Watch the free demo first — no commitment, no credit card.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openModal}
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-4 rounded-xl text-base shadow transition"
            >
              Watch Free Demo 🎥
            </button>
            <button
              onClick={handleEnroll}
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-xl text-base transition"
            >
              Enroll Now – ₹4,999
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
