import React from "react";
import CourseSection from "../components/CourseSection";
import CourseSchema from "../components/CourseSchema";

export default function Courses() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <CourseSchema />
      
      {/* Page Header */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-blue-900 leading-tight">
          Aptitude Pattern Mastery Program
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Our comprehensive online aptitude training course designed specifically for campus placement exams. Learn the pattern-based method proven to improve scores by 25-35% in the first month.
        </p>
        <p className="sr-only">
          Crack The Pattern offers live online aptitude training courses for placement exams. Our curriculum covers quantitative aptitude, logical reasoning, and verbal ability with a focus on pattern recognition and time management.
        </p>
      </section>

      {/* Full Course Details */}
      <CourseSection />

      {/* Why Choose This Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">Why Choose Crack The Pattern?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <h3 className="font-bold text-lg text-gray-900 mb-2">Live Interactive Classes</h3>
            <p className="text-gray-600">
              3 live sessions per week with experienced instructors. Ask questions in real-time and clarify doubts instantly.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <h3 className="font-bold text-lg text-gray-900 mb-2">Lifetime Access to Recordings</h3>
            <p className="text-gray-600">
              Miss a class? No problem. Access recorded sessions anytime, anywhere. Learn at your own pace without losing any content.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <h3 className="font-bold text-lg text-gray-900 mb-2">Pattern-Based Learning Method</h3>
            <p className="text-gray-600">
              Instead of memorizing, learn to recognize problem patterns. Solve questions faster and with greater accuracy under time pressure.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <h3 className="font-bold text-lg text-gray-900 mb-2">Weekly Progress Tracking</h3>
            <p className="text-gray-600">
              Weekly tests and personalized feedback help you measure improvement. Track your growth and identify areas for focus.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <h3 className="font-bold text-lg text-gray-900 mb-2">Company-Wise Aptitude Patterns</h3>
            <p className="text-gray-600">
              Practice aptitude questions based on patterns commonly asked by companies like TCS, Infosys, Wipro, and other major recruiters — integrated into every topic.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <h3 className="font-bold text-lg text-gray-900 mb-2">No Pressure to Enroll</h3>
            <p className="text-gray-600">
              Join a free 30-minute demo class first. See the pattern method in action before making any commitment.
            </p>
          </div>
        </div>
      </section>

      {/* Course Duration & Structure */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">Course Duration & Structure</h2>
        
        <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">3 Months</div>
              <p className="text-gray-700">Standard program duration with flexible pacing options.</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">3 Classes/Week</div>
              <p className="text-gray-700">60-minute live sessions scheduled at convenient times.</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">Lifetime Access</div>
              <p className="text-gray-700">Forever access to recordings and course materials after completion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Ready to Master Aptitude Patterns?</h2>
        <p className="text-gray-600 mb-6">Join our free demo class and see the pattern method in action.</p>
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
