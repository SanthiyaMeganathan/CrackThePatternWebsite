import React from "react";

export default function CoursesSection() {
  const courses = [
    {
      id: 1,
      title: "Aptitude Pattern Mastery",
      description: "3 months • 3 days/week • Weekly tests",
      topics: ["Quantitative Patterns", "Logical Reasoning", "Verbal Patterns"],
    },
    {
      id: 2,
      title: "Company-Specific Batches",
      description: "TCS, Infosys, Wipro style mocks & practice",
      topics: [],
    },
    {
      id: 3,
      title: "Placement Readiness",
      description: "Resume, LinkedIn optimization & interview prep",
      topics: [],
    },
  ];

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-2xl font-bold text-blue-900">Our Courses</h3>
        <p className="text-gray-600 mt-2">Structured courses built for campus placements.</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="p-6 bg-white rounded-lg shadow">
              <h4 className="font-semibold">{course.title}</h4>
              <p className="text-sm text-gray-600 mt-2">{course.description}</p>
              {course.topics.length > 0 && (
                <ul className="mt-3 text-sm text-gray-600 list-disc ml-5">
                  {course.topics.map((topic, idx) => (
                    <li key={idx}>{topic}</li>
                  ))}
                </ul>
              )}
              <div className="mt-4 flex gap-2">
                <button className="bg-blue-800 text-white px-4 py-2 rounded">
                  View
                </button>
                <button className="border border-blue-800 px-4 py-2 rounded">
                  Enroll
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
