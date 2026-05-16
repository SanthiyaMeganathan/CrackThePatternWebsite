import React from "react";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-extrabold text-blue-900 mb-2">Payment Successful! 🎉</h1>
        <p className="text-gray-600 mb-6">
          Welcome to Crack The Pattern! Your enrollment is confirmed. Check your email for your
          login link — it should arrive within a few minutes.
        </p>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 text-sm text-gray-700 text-left space-y-2">
          <p><span className="font-semibold">✔ Next step 1:</span> Check your email for the welcome message</p>
          <p><span className="font-semibold">✔ Next step 2:</span> Click the login link in that email</p>
          <p><span className="font-semibold">✔ Next step 3:</span> Enter your email to receive your OTP and access the dashboard</p>
        </div>

        <Link
          to="/login"
          className="block w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl transition mb-3"
        >
          Go to Login →
        </Link>
        <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 transition">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
