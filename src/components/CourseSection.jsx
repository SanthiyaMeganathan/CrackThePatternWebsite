import React from "react";
import { useEnrollGate } from "../hooks/useEnrollGate";

export default function CourseSection() {
  const handleEnroll = useEnrollGate();

  return (
    <>
      {/* COURSES */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-blue-900">Our Course</h3>
          <p className="text-gray-600 mt-2">
            A complete aptitude training program built for placements.
          </p>

          <div className="mt-8 p-8 bg-white rounded-xl shadow border border-gray-100 max-w-3xl">
            {/* Course Title */}
            <div className="flex items-center gap-3">
              <h4 className="text-xl font-bold text-blue-900">
                Aptitude Pattern Mastery Program
              </h4>
              <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded">
                Live
              </span>
            </div>

            {/* Meta Info */}
            <p className="mt-2 text-sm text-gray-600">
              3 months • 3 live sessions/week • Recorded classes available
            </p>

            {/* Divider */}
            <hr className="my-5" />

            {/* What You'll Learn */}
            <h5 className="text-sm font-semibold text-gray-800 mb-3">
              What you'll learn
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium text-gray-900">Quantitative Aptitude</p>
                <p className="text-gray-600 mt-1">
                  Solve problems using clear, repeatable patterns.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium text-gray-900">Logical & Reasoning</p>
                <p className="text-gray-600 mt-1">
                  Step-by-step reasoning using pattern recognition.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium text-gray-900">Verbal Ability</p>
                <p className="text-gray-600 mt-1">
                  Focus on structure, comprehension, and logic.
                </p>
              </div>
            </div>

            {/* What You Get */}
            <h5 className="text-sm font-semibold text-gray-800 mt-6 mb-3">
              What you'll get
            </h5>

            <ul className="text-sm text-gray-700 space-y-2 list-disc ml-5">
              <li>Company-specific aptitude patterns (TCS, Infosys, Wipro, etc.)</li>
              <li>Weekly timed practice tests with progress tracking</li>
              <li>Practice questions for every topic</li>
              <li>Class notes shared after every session</li>
            </ul>

            {/* Outcome Line */}
            <p className="mt-4 text-sm italic text-gray-500">
              Designed to improve speed, clarity, and exam confidence in placement aptitude.
            </p>

            {/* CTA */}
            <div className="mt-6 flex gap-3">
              <button className="bg-blue-700 text-white px-5 py-2 rounded font-medium hover:bg-blue-800 transition">
                View Program Details
              </button>
              <button 
                onClick={handleEnroll}
                className="border border-blue-700 text-blue-700 px-5 py-2 rounded font-medium hover:bg-blue-50 transition">
                Enroll Now
              </button>
            </div>

            {/* Hidden SEO / AEO Support */}
            <p className="sr-only">
              Aptitude Pattern Mastery Program is a live online aptitude course for placement exams,
              covering quantitative aptitude, logical reasoning, and verbal ability with pattern-based learning.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
