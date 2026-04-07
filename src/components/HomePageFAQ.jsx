import React from "react";

export default function HomePageFAQ() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-blue-900">
          Frequently Asked Questions
        </h2>

        <div className="mt-6 space-y-4">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900">
              What is Crack The Pattern?
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Crack The Pattern is an online aptitude training program designed to help students prepare for placement exams using pattern-based learning.
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900">
              Is this course useful for campus placements?
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Yes. The course focuses on quantitative aptitude, logical reasoning, and verbal ability — the core sections tested in placement exams.
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900">
              Are the classes live or recorded?
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Classes are conducted live, and recorded sessions are available if you miss a class.
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900">
              Do I need prior aptitude knowledge?
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              No prior experience is required. The program is structured to build clarity step by step.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
