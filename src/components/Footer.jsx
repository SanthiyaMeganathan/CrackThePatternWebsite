import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-bold text-lg">Crack The Pattern</h4>
          <p className="text-sm mt-2">Learn the Pattern. Crack the Exam.</p>
          <p className="text-xs mt-3">© 2026 Crack The Pattern. All rights reserved.</p>
        </div>
        <div>
          <h5 className="font-semibold">Contact</h5>
          <p className="text-sm mt-2">Phone: 9xxxxxxxxx</p>
          <p className="text-sm">Email: crackthepattern@gmail.com</p>
          <div className="mt-4 flex gap-2">
            <a href="#" className="bg-white text-blue-900 px-3 py-2 rounded">
              WhatsApp
            </a>
            <a href="#" className="bg-white text-blue-900 px-3 py-2 rounded">
              Instagram
            </a>
          </div>
        </div>
        <div>
          <h5 className="font-semibold">Quick Links</h5>
          <ul className="mt-2 text-sm">
            <li>
              <Link to="/courses" className="hover:text-yellow-400">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/syllabus" className="hover:text-yellow-400">
                Syllabus
              </Link>
            </li>
            <li>
              <Link to="/demo" className="hover:text-yellow-400">
                Demo
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
