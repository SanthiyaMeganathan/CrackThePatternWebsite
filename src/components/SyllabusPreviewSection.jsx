import React from "react";

export default function SyllabusPreviewSection() {
  const syllabusTopics = [
    {
      category: "Quantitative Aptitude",
      items: ["Averages", "Time & Work", "Time & Distance", "Profit & Loss"],
    },
    {
      category: "Logical & Reasoning",
      items: ["Seating Arrangements", "Series & Patterns"],
    },
    {
      category: "Verbal Ability",
      items: ["Jumbled Sentences", "Reading Comprehension"],
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start gap-8">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-blue-900">
            Placement Aptitude Syllabus Snapshot
          </h3>
          <p className="text-gray-600 mt-2">
            Key aptitude topics covered in placement exams, structured for pattern-based learning.
          </p>
          <p className="sr-only">
            This placement aptitude syllabus covers quantitative aptitude, logical reasoning,
            and verbal ability topics commonly asked in campus placement exams.
          </p>

          <div className="mt-6 space-y-4">
            {syllabusTopics.map((section, idx) => (
              <div key={idx}>
                <h4 className="text-sm font-semibold text-blue-900 mb-2">
                  {section.category}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 ml-4">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button className="bg-yellow-400 text-blue-900 px-4 py-2 rounded font-semibold hover:bg-yellow-500 transition">
              Download Full Syllabus (PDF)
            </button>
          </div>
        </div>

        <div className="w-full md:w-96 p-6 bg-gray-50 rounded-lg shadow">
          <h4 className="font-semibold text-blue-900 text-lg">Next Live Aptitude Batch</h4>
          <p className="text-sm text-gray-600 mt-3">
            Next live batch starts on <strong>Jan 8, 2026</strong>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Mon, Wed, Fri • 7:00–8:00 PM (IST)
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <button className="bg-blue-800 text-white px-4 py-2 rounded font-medium hover:bg-blue-900 transition">
              Register for Demo
            </button>
            <button className="border border-blue-800 text-blue-800 px-4 py-2 rounded font-medium hover:bg-blue-50 transition">
              Talk to Us
            </button>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Live classes • Recorded sessions available • No pressure to enroll
          </p>
        </div>
      </div>
    </section>
  );
}
