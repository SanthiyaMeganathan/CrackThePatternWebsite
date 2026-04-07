import React from "react";
import LeaderboardPreview from "../components/LeaderboardPreview";

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-blue-900 leading-tight">
          Weekly Progress Tracking
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Track your individual progress through weekly aptitude tests. Watch yourself improve week after week as you master new patterns and techniques.
        </p>
        <p className="sr-only">
          The Crack The Pattern progress tracking system helps students monitor their improvement through weekly tests. This page will be updated with real student progress after the first batch begins.
        </p>
      </section>

      <LeaderboardPreview />

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Ready to Start Tracking Your Progress?
          </h2>
          <p className="text-gray-700 mb-6">
            Book your free demo class today and be part of our first batch. Once you enroll, you'll get access to weekly tests and progress tracking from day one.
          </p>
          <a 
            href="/demo"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition"
          >
            Book Your Free Demo
          </a>
        </div>
      </section>
    </div>
  );
}
