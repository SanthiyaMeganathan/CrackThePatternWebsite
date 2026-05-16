import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDemoModal } from "../context/DemoModalContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

export default function DemoModal() {
  const { isOpen, closeModal } = useDemoModal();
  const navigate = useNavigate();
  const overlayRef = useRef(null);
  const firstInputRef = useRef(null);

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  // Focus trap + scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInputRef.current?.focus(), 100);
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

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email address.";
    }
    if (!form.phone.trim()) {
      errs.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) {
      errs.phone = "Enter a valid 10-digit Indian mobile number.";
    }
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError("");
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${API}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error || "Something went wrong. Please try again.");
        return;
      }

      // Store in sessionStorage for personalization on the masterclass page
      sessionStorage.setItem("ctp_lead_name", form.name);
      sessionStorage.setItem("ctp_lead_email", form.email);

      closeModal();
      navigate("/demo-masterclass");
    } catch {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

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
        className="absolute inset-0 bg-blue-950/80 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal Card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-modal-in">
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-yellow-400" />

        <div className="p-8">
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>

          {/* Header */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
              Free Demo · No Credit Card Required
            </p>
            <h2 id="demo-modal-title" className="text-2xl font-extrabold text-blue-900">
              Watch the Free Masterclass
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Get instant access to our pattern-based aptitude demo video.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="dm-name">
                Full Name
              </label>
              <input
                ref={firstInputRef}
                id="dm-name"
                type="text"
                placeholder="e.g. Priya Sharma"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition
                  ${errors.name ? "border-red-400 bg-red-50" : "border-gray-300"}`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="dm-email">
                Email Address
              </label>
              <input
                id="dm-email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition
                  ${errors.email ? "border-red-400 bg-red-50" : "border-gray-300"}`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="dm-phone">
                Phone Number
              </label>
              <div className="flex gap-2">
                <span className="flex items-center px-3 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-600 font-medium">
                  🇮🇳 +91
                </span>
                <input
                  id="dm-phone"
                  type="tel"
                  placeholder="98765 43210"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
                  className={`flex-1 border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition
                    ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                />
              </div>
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>

            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                {apiError}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl transition text-base flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving…
                </>
              ) : (
                "Watch Free Demo →"
              )}
            </button>

            <p className="text-xs text-gray-400 text-center">
              🔒 Your details are 100% secure. We never spam.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
