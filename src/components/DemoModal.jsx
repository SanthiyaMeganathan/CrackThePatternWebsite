import React, { useEffect, useRef } from "react";
import { useDemoModal } from "../context/DemoModalContext";

export default function DemoModal() {
  const { isOpen, closeModal } = useDemoModal();
  const overlayRef = useRef(null);

  // Focus trap + scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="demo-modal-title"
    >
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-blue-950/90 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal Card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden animate-modal-in">
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-yellow-400" />

        <div className="p-6 md:p-8">
          {/* Header & Close button */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
                Free Masterclass
              </p>
              <h2 id="demo-modal-title" className="text-2xl font-extrabold text-blue-900">
                Pattern-Based Aptitude Training
              </h2>
            </div>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-700 transition text-3xl leading-none ml-4"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Video Player */}
          <div className="relative w-full overflow-hidden rounded-xl bg-gray-900 shadow-inner" style={{ paddingTop: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button 
              onClick={closeModal}
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition"
            >
              Close Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
