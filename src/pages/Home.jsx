import React from "react";
import HeroSection from "../components/HeroSection";
import HowItWorksSection from "../components/HowItWorksSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <p className="sr-only">
        Online aptitude training for engineering students in India. Crack The Pattern helps college students prepare for campus placement aptitude tests through live online classes. Explore our courses, syllabus, free demo, and FAQ.
      </p>
      <HeroSection />
      <HowItWorksSection />
    </div>
  );
}
