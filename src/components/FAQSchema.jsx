import React from "react";

export default function FAQSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Crack The Pattern?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Crack The Pattern is an online aptitude training program designed to help students crack placement exams using pattern-based learning. We teach students to recognize patterns in aptitude questions and apply proven shortcuts to solve problems faster.",
        },
      },
      {
        "@type": "Question",
        name: "How does CTP help in placement aptitude preparation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CTP teaches students to recognize patterns in aptitude questions, apply the right formulas quickly, and improve speed and accuracy in placement exams through our 3-step methodology: Pattern Concept, Shortcuts & Techniques, and Weekly Practice with Progress Tracking.",
        },
      },
      {
        "@type": "Question",
        name: "Is CTP suitable for beginners?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, CTP is designed to help students of all levels build strong aptitude fundamentals and gradually improve problem-solving speed. Our live sessions are recorded, so students can learn at their own pace.",
        },
      },
      {
        "@type": "Question",
        name: "What topics are covered in Aptitude Pattern Mastery Program?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The program covers Quantitative Aptitude, Logical and Reasoning questions, Verbal Ability, and company-specific aptitude patterns for TCS, Infosys, Wipro, and other major recruiters.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
