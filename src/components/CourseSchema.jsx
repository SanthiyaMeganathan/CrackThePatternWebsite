import React from "react";

export default function CourseSchema() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Aptitude Pattern Mastery Program",
    description: "Online aptitude training for placement exams using pattern-based learning.",
    provider: {
      "@type": "Organization",
      name: "Crack The Pattern",
      url: "https://crackthepattern.com",
    },
  };

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Crack The Pattern?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Crack The Pattern is an online aptitude training program focused on placement exam preparation using pattern-based learning.",
        },
      },
      {
        "@type": "Question",
        name: "Are the classes live?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, classes are conducted live and recorded sessions are available if you miss a class.",
        },
      },
      {
        "@type": "Question",
        name: "Is this suitable for campus placements?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the course covers quantitative aptitude, logical reasoning, and verbal ability — the core sections tested in placement exams.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
    </>
  );
}
