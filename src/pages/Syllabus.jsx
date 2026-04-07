import React from "react";

export default function Syllabus() {
  const syllabusTopics = [
    {
      category: "Quantitative Ability",
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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Page Header */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-blue-900 leading-tight">
          Placement Aptitude Syllabus (Pattern-Based)
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          This syllabus outlines the key aptitude topics and pattern categories covered in Crack The Pattern's online placement aptitude training program.
        </p>
        <p className="sr-only">
          Crack The Pattern's placement aptitude syllabus covers quantitative aptitude, logical reasoning, and verbal ability, taught using pattern-based methods aligned with campus placement exams.
        </p>
      </section>

      {/* Syllabus Snapshot */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-blue-900 mb-2">Syllabus Snapshot (What You'll Cover)</h2>
        <p className="text-gray-600 mb-8">
          Below is a high-level overview of the three major aptitude domains. Each topic is taught using pattern-based problem-solving methods to help you recognize and solve questions faster.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {syllabusTopics.map((section, idx) => (
            <div key={idx} className="p-6 bg-white rounded-lg shadow border-t-4 border-blue-600">
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                {section.category}
              </h3>
              <ul className="space-y-2 text-gray-600">
                {section.topics.map((topic, topicIdx) => (
                  <li key={topicIdx} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Pattern-Based Learning Explanation */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">How Topics Are Taught at Crack The Pattern</h2>
          
          <p className="text-gray-700 mb-4">
            Each aptitude topic is taught through clearly defined question patterns found in actual placement exams.
          </p>

          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold text-lg">✓</span>
              <p><strong>Common question types</strong> asked in placement exams</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold text-lg">✓</span>
              <p><strong>How to identify patterns quickly</strong> within time limits</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold text-lg">✓</span>
              <p><strong>Which formulas or approaches</strong> apply to each pattern type</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold text-lg">✓</span>
              <p><strong>Shortcuts and techniques</strong> to solve efficiently</p>
            </div>
          </div>

          <p className="text-gray-700 mt-6 font-semibold">
            This approach helps you think faster and solve more questions correctly, instead of memorizing formulas.
          </p>
        </div>
      </section>

      {/* Full Syllabus Download */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow p-8 border-l-4 border-blue-600">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">
            Download Full Placement Aptitude Syllabus (PDF)
          </h2>
          <p className="text-gray-600 mb-6">
            Get the complete detailed syllabus with topic-wise patterns, question types, difficulty levels, and the full preparation structure for quantitative aptitude, logical reasoning, and verbal ability.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Download Full Syllabus (PDF)
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Ready to Master These Patterns?</h2>
        <p className="text-gray-600 mb-6">Book a free demo to see how the pattern-based method works in action.</p>
        <a 
          href="/demo"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Book Your Free Demo
        </a>
      </section>
    </div>
  );
}
