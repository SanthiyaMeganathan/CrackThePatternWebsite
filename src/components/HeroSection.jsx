import React from "react";
import DemoFormCard from "./DemoFormCard";
import { useDemoModal } from "../context/DemoModalContext";

export default function HeroSection() {
  const { openModal } = useDemoModal();

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-4xl font-bold text-blue-900 leading-tight">
          Crack The Pattern – Online Aptitude Training for Placement Exams
        </h1>
        <p className="mt-4 text-gray-600 max-w-xl">
          Crack The Pattern is an online aptitude training program that helps students prepare for placement exams using pattern-based learning. Improve speed, accuracy, and confidence in quantitative, logical, and verbal aptitude.
        </p>
        <p className="sr-only">
          Crack The Pattern provides online aptitude coaching for campus placements, covering quantitative aptitude, logical reasoning, and verbal ability using a pattern-based approach.
        </p>
        <div className="mt-6 flex gap-4">
          <button 
            onClick={openModal}
            className="bg-blue-700 text-white px-6 py-3 rounded-md font-semibold">
            Join Free Aptitude Demo
          </button>
          <button className="border border-blue-700 text-blue-700 px-6 py-3 rounded-md font-semibold">
            View Course Details
          </button>
        </div>
        <p className="mt-3 text-sm text-gray-500">
          ✔ Live classes • ✔ Recorded sessions available • ✔ No pressure to enroll
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 bg-white rounded-md shadow flex items-start gap-3">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <p className="font-semibold">Pattern Method</p>
              <p className="text-xs text-gray-500">Structured shortcut techniques</p>
            </div>
          </div>
          <div className="p-3 bg-white rounded-md shadow flex items-start gap-3">
            <div className="w-10 h-10 rounded bg-yellow-50 text-yellow-600 flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <p className="font-semibold">Live & Interactive</p>
              <p className="text-xs text-gray-500">Doubt clearing & small batches</p>
            </div>
          </div>
        </div>
      </div>
      <DemoFormCard />
    </section>
  );
}
