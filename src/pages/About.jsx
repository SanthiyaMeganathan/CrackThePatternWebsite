import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-blue-900 leading-tight">
          About Crack The Pattern
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Learn the story behind India's most innovative aptitude learning
          platform.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At Crack The Pattern, we believe aptitude isn't about memorizing
            formulas—it's about understanding patterns. Our mission is to
            empower students with shortcuts and techniques that make complex
            problems predictable and solvable under time pressure.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            We envision a future where every student, regardless of their
            background, can confidently crack placement exams using our
            scientifically-designed pattern methodology. Success in aptitude
            should be achievable, not elusive.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Pattern-Based Learning</h3>
              <p className="text-gray-600 mt-1">
                Understand the core patterns behind each topic
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Proven Results</h3>
              <p className="text-gray-600 mt-1">
                90% of our students improve their scores significantly
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Expert Instructors</h3>
              <p className="text-gray-600 mt-1">
                Learn from industry professionals with placement experience
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold flex-shrink-0">
              4
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Small Batches</h3>
              <p className="text-gray-600 mt-1">
                Personalized attention in interactive live classes
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
