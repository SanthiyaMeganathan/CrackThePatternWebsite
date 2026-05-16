import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";
const COURSE_PRICE = parseInt(import.meta.env.VITE_COURSE_PRICE_INR) || 4999;
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || "";

function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Checkout() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [processing, setProcessing] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email.";
    if (!form.phone.trim()) e.phone = "Phone is required.";
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Invalid Indian mobile number.";
    return e;
  }

  async function handlePay(e) {
    e.preventDefault();
    setApiError("");
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setProcessing(true);
    try {
      // 1. Create Razorpay order via backend
      const res = await fetch(`${API}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const order = await res.json();

      if (!res.ok) {
        setApiError(order.error || "Failed to initiate payment.");
        return;
      }

      // 2. Load Razorpay SDK
      const loaded = await loadRazorpay();
      if (!loaded) {
        setApiError("Razorpay SDK failed to load. Check your internet connection.");
        return;
      }

      // 3. Open Razorpay popup
      const rzp = new window.Razorpay({
        key: RAZORPAY_KEY || order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Crack The Pattern",
        description: "Aptitude Pattern Mastery Program",
        order_id: order.orderId,
        prefill: order.prefill,
        theme: { color: "#1e3a8a" },
        modal: {
          ondismiss: () => setProcessing(false),
        },
        handler: function () {
          // Payment captured — webhook handles DB update
          navigate("/payment-success");
        },
      });

      rzp.open();
    } catch {
      setApiError("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    // No Navbar/Footer on this route — see App.jsx
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Minimal top bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-blue-900">
          <img src="/logo.png" alt="CTP" className="w-9 h-9 rounded" />
          <span className="font-bold">Crack The Pattern</span>
        </Link>
        <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Secure Checkout
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* ── Order Summary ─────────────────────────────────────────────── */}
        <div className="md:col-span-2 order-2 md:order-1">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-6">
            <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>

            <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-100">
              <p className="font-bold text-blue-900 text-base">Aptitude Pattern Mastery Program</p>
              <p className="text-sm text-gray-600 mt-1">3 months · Live + Recorded · Lifetime access</p>
            </div>

            <ul className="text-sm text-gray-600 space-y-2 mb-4">
              {[
                "✔ 3 live sessions/week",
                "✔ Lifetime access to recordings",
                "✔ Weekly mock tests",
                "✔ Company-wise question patterns",
                "✔ Class notes after every session",
              ].map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Course fee</span>
                <span>₹{COURSE_PRICE.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between font-extrabold text-blue-900 text-lg">
                <span>Total</span>
                <span>₹{COURSE_PRICE.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
              <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Payments secured by Razorpay. UPI · Cards · Net Banking supported.
            </div>
          </div>
        </div>

        {/* ── Checkout Form ──────────────────────────────────────────────── */}
        <div className="md:col-span-3 order-1 md:order-2">
          <h1 className="text-2xl font-extrabold text-blue-900 mb-6">Complete Your Enrollment</h1>

          <form onSubmit={handlePay} noValidate className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm space-y-5">
            {[
              { id: "co-name", label: "Full Name", key: "name", type: "text", placeholder: "As per your college records" },
              { id: "co-email", label: "Email Address", key: "email", type: "email", placeholder: "you@example.com" },
              { id: "co-phone", label: "Phone Number", key: "phone", type: "tel", placeholder: "10-digit mobile" },
            ].map(({ id, label, key, type, placeholder }) => (
              <div key={key}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition
                    ${errors[key] ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                />
                {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
              </div>
            ))}

            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                {apiError}
              </div>
            )}

            <button
              type="submit"
              disabled={processing}
              id="pay-now-btn"
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-xl text-base transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {processing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing…
                </>
              ) : (
                <>Pay ₹{COURSE_PRICE.toLocaleString("en-IN")} via Razorpay →</>
              )}
            </button>

            <p className="text-xs text-gray-400 text-center mt-2">
              By proceeding you agree to our Terms of Service. After payment, you'll receive a
              welcome email with your login link.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
