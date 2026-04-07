import React from "react";

export default function DemoFormCard() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
  };

  return (
    <div className="p-6 rounded-lg bg-gradient-to-br from-blue-50 to-white border border-blue-100">
      <div className="bg-white rounded-md shadow p-4">
        <h2 className="text-lg font-semibold text-blue-900">
          Book Your Free Aptitude Demo
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          30-minute live aptitude demo to experience the pattern-based method.
        </p>
        <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
          <input placeholder="Full name" className="border p-2 rounded" />
          <input placeholder="Phone number" className="border p-2 rounded" />
          <input placeholder="Email (optional)" className="border p-2 rounded" />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-800 text-white px-4 py-2 rounded"
            >
              Reserve Slot
            </button>
            <button
              type="button"
              className="flex-1 border border-gray-300 px-4 py-2 rounded"
            >
              Join WhatsApp
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            We respect your privacy. Your details are used only to share demo session information.
          </p>
        </form>
      </div>
    </div>
  );
}
