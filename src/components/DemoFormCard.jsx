import React from "react";
import { useDemoModal } from "../context/DemoModalContext";

export default function DemoFormCard() {
  const { openModal } = useDemoModal();

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-sm">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Video Thumbnail Placeholder */}
        <div 
          className="relative w-full h-48 bg-gray-900 cursor-pointer group"
          onClick={openModal}
        >
          {/* Subtle background pattern or image can go here. For now a dark slate color looks good. */}
          <div className="absolute inset-0 bg-blue-900/60 transition-opacity group-hover:bg-blue-900/40"></div>
          
          {/* Play Button Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
              <svg className="w-8 h-8 text-blue-900 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4l12 6-12 6z" />
              </svg>
            </div>
          </div>
          
          <div className="absolute bottom-3 left-4">
            <span className="bg-black/60 text-white text-xs font-bold px-2 py-1 rounded">
              30:00
            </span>
          </div>
        </div>

        <div className="p-5">
          <h2 className="text-xl font-bold text-blue-900 leading-tight">
            Watch the Masterclass
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Experience the pattern-based method in action. Instantly watch our 30-minute aptitude demo video.
          </p>
          
          <button
            onClick={openModal}
            className="w-full mt-5 bg-blue-900 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl transition shadow flex items-center justify-center gap-2"
          >
            Watch Free Demo 🎥
          </button>
        </div>
      </div>
    </div>
  );
}
