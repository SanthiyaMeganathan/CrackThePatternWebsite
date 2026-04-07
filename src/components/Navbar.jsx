import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80">
          <img src="/logo.png" alt="CTP Logo" className="w-12 h-12 rounded-md object-cover" />
          <div>
            <h1 className="font-extrabold text-lg">Crack The Pattern</h1>
            <p className="text-xs text-gray-500">Learn the Pattern. Crack the Exam.</p>
          </div>
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-sm hover:text-blue-700">
            Home
          </Link>
          <Link to="/courses" className="text-sm hover:text-blue-700">
            Courses
          </Link>
          <Link to="/syllabus" className="text-sm hover:text-blue-700">
            Syllabus
          </Link>
          <Link to="/demo" className="text-sm hover:text-blue-700">
            Free Demo
          </Link>
          <Link to="/leaderboard" className="text-sm hover:text-blue-700">
            Leaderboard
          </Link>
          <button className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-md font-semibold shadow">
            Book Demo
          </button>
        </nav>
      </div>
    </header>
  );
}

