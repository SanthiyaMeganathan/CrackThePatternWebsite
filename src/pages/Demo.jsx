import React from "react";
import DemoFormCard from "../components/DemoFormCard";

export default function Demo() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-blue-900 leading-tight">
          Book Your Free Aptitude Demo for Placement Exams
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Attend a 30-minute live aptitude demo to understand how pattern-based learning helps you solve placement aptitude questions faster and with clarity.
        </p>
        <p className="sr-only">
          Crack The Pattern offers a free online aptitude demo for placement exams, covering quantitative aptitude, logical reasoning, and verbal ability using pattern-based learning.
        </p>
      </section>

      {/* Main Content: Two-Column Layout */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: What You'll Learn */}
        <div>
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              What You'll Learn in the Demo
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  ✓
                </span>
                <span className="text-gray-700">
                  How the pattern method works
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  ✓
                </span>
                <span className="text-gray-700">
                  2–3 real placement aptitude questions solved live
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  ✓
                </span>
                <span className="text-gray-700">
                  How to identify question patterns quickly
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  ✓
                </span>
                <span className="text-gray-700">
                  Live Q&A with the instructor
                </span>
              </li>
            </ul>

            {/* Trust Reassurance Below Content */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">
                <strong>No pressure to enroll.</strong> This demo is designed to help you understand if the pattern method works for you.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Demo Form */}
        <DemoFormCard />
      </section>

      {/* Demo Schedule Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          Available Demo Slots (IST)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <p className="font-semibold text-blue-900 mb-2">Weekdays</p>
            <p className="text-gray-600">Monday – Friday</p>
            <p className="text-gray-600">7:00 PM – 8:00 PM IST</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <p className="font-semibold text-blue-900 mb-2">Weekend</p>
            <p className="text-gray-600">Saturday</p>
            <p className="text-gray-600">10:00 AM – 11:00 AM IST</p>
          </div>
        </div>
      </section>

      {/* Trust & Support Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Why Join the Free Demo?
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-3">
              <span className="text-blue-600 font-bold text-lg">→</span>
              See the pattern method in real-time with live examples
            </li>
            <li className="flex items-center gap-3">
              <span className="text-blue-600 font-bold text-lg">→</span>
              Ask instructors any doubts directly
            </li>
            <li className="flex items-center gap-3">
              <span className="text-blue-600 font-bold text-lg">→</span>
              Decide if this course is right for you before enrolling
            </li>
            <li className="flex items-center gap-3">
              <span className="text-blue-600 font-bold text-lg">→</span>
              Connect with other students preparing for placements
            </li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          Ready to Experience the Pattern Method?
        </h2>
        <p className="text-gray-600 mb-6">
          Book your free demo slot above. You'll receive the live session link via email after registering.
        </p>
      </section>
    </div>
  );
}
