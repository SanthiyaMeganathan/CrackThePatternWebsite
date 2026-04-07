import React, { useState } from "react";
import FAQSchema from "../components/FAQSchema";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "What is the Pattern Method?",
      answer:
        "The Pattern Method is a scientifically-designed approach to learning aptitude. Instead of memorizing formulas, we teach you to recognize patterns in problems, making them predictable and solvable under time pressure.",
    },
    {
      question: "How long is a typical course?",
      answer:
        "Our main Aptitude Pattern Mastery course runs for 3 months with 3 classes per week. Each class is 60 minutes long. We also offer intensive and company-specific batches.",
    },
    {
      question: "Can I attend the demo before enrolling?",
      answer:
        "Absolutely! We offer free 30-minute live demos every day. You'll see the pattern method in action and can ask all your questions. Book your demo slot on our website.",
    },
    {
      question: "What if I can't attend live classes?",
      answer:
        "All live classes are recorded and made available to students. You can watch them at your own pace. However, we recommend attending live for interactive doubt-clearing sessions.",
    },
    {
      question: "How much will my score improve?",
      answer:
        "90% of our students see significant improvements in their aptitude scores. The average improvement is 25-35% within the first month, depending on your starting level and consistency.",
    },
    {
      question: "What's the refund policy?",
      answer:
        "We offer a 7-day money-back guarantee if you're not satisfied. However, most students see immediate value in the first class itself!",
    },
    {
      question: "Are there company-specific batches?",
      answer:
        "Yes! We offer specialized batches for TCS, Infosys, Wipro, and other major recruiters. These batches focus on the exact question patterns and difficulty levels of these companies.",
    },
    {
      question: "Can I get a certificate after completion?",
      answer:
        "Yes, all students who complete the course and pass the final assessment receive a certificate of completion from Crack The Pattern.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <FAQSchema />
      
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-blue-900 leading-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Find answers to common questions about Crack The Pattern, our courses, teaching methodology, demo classes, and more.
        </p>
        <p className="sr-only">
          This FAQ page answers common questions about our online aptitude training course including the pattern method, course duration, live demos, recordings, progress tracking, refund policy, company-specific batches, and certificates.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.question}
                </h3>
                <span
                  className={`text-2xl text-blue-800 transition-transform ${
                    openIndex === index ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          Didn't find your answer?
        </h2>
        <p className="text-gray-700 mb-6">
          No problem! Reach out to us directly and our team will be happy to help you with any questions about our aptitude training course.
        </p>
        <div className="flex gap-4 flex-wrap">
          <a 
            href="/contact"
            className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition"
          >
            Contact Support
          </a>
          <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded font-semibold hover:bg-blue-50 transition">
            Join WhatsApp Group
          </button>
        </div>
      </section>
    </div>
  );
}
