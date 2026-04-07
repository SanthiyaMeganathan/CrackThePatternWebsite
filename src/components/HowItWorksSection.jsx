import React from "react";

export default function HowItWorksSection() {
  return (
    <section aria-labelledby="how-ctp-works" className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 id="how-ctp-works" className="text-2xl font-bold text-blue-900">How CTP Works</h2>
        <p className="text-gray-600 mt-2">
          A simple 3-step method that makes aptitude preparation for placement exams predictable.
        </p>
        <p className="sr-only">
          Crack The Pattern is an online aptitude training program that helps students prepare for placement exams using pattern-based learning.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="font-semibold">Step 1: Pattern Concept</h3>
            <p className="text-sm text-gray-600 mt-2">
              Learn the core pattern behind each type of aptitude question using clear examples.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="font-semibold">Step 2: Shortcuts & Techniques</h3>
            <p className="text-sm text-gray-600 mt-2">
              Learn smart shortcuts to solve common quantitative, logical, and verbal questions faster.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="font-semibold">Step 3: Weekly Practice & Progress Tracking</h3>
            <p className="text-sm text-gray-600 mt-2">
              Apply patterns in weekly timed tests and track improvement in speed and accuracy.
            </p>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-gray-500 italic">
          Designed to improve speed, clarity, and confidence.
        </p>
      </div>
    </section>
  );
}
