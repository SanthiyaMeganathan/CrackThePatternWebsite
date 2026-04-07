import React from "react";

export default function LeaderboardPreview() {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-blue-900">
          Weekly Progress Tracking (Coming Soon)
        </h2>
        <p className="text-gray-600 mt-2">
          Weekly aptitude tests will be used to track individual progress and improvement over time.
        </p>

        {/* Progress Tracking Preview Box */}
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-6 mt-6">
          <h3 className="font-semibold text-gray-800 mb-4">
            Progress Tracking Preview
          </h3>

          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-center">
              <span className="text-green-600 font-bold mr-2">✔</span>
              Weekly timed aptitude tests
            </li>
            <li className="flex items-center">
              <span className="text-green-600 font-bold mr-2">✔</span>
              Personal progress tracking (not public comparison)
            </li>
            <li className="flex items-center">
              <span className="text-green-600 font-bold mr-2">✔</span>
              Improvement-focused feedback after every test
            </li>
            <li className="flex items-center">
              <span className="text-green-600 font-bold mr-2">✔</span>
              Leaderboard will be enabled once batches begin
            </li>
          </ul>

          <p className="mt-3 text-xs text-gray-500">
            This feature is designed to help students track their own growth, not to rank or judge anyone.
          </p>
        </div>

        {/* Micro-trust line */}
        <p className="mt-2 text-xs text-gray-400">
          Progress tracking will be available after the first batch begins.
        </p>

        {/* SEO/AEO Hidden Text */}
        <p className="sr-only">
          Crack The Pattern includes weekly aptitude tests and progress tracking to help students improve speed, accuracy, and consistency in placement aptitude exams.
        </p>
      </div>
    </section>
  );
}
