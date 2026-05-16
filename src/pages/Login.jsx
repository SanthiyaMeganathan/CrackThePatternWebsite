import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [step, setStep] = useState("email"); // "email" | "otp"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6-digit array
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const otpRefs = useRef([]);

  // ── Step 1: Request OTP ────────────────────────────────────────────────
  async function handleRequestOTP(e) {
    e.preventDefault();
    setError(""); setInfo("");

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 402) {
          setError(data.error);
          setTimeout(() => navigate("/checkout"), 2500);
        } else {
          setError(data.error || "Failed to send OTP.");
        }
        return;
      }

      setInfo("OTP sent! Check your email inbox (and spam folder).");
      setStep("otp");
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // OTP box input handler with auto-focus-next
  function handleOtpChange(index, value) {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  }

  function handleOtpKeyDown(index, e) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  function handleOtpPaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...otp];
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    otpRefs.current[Math.min(pasted.length, 5)]?.focus();
  }

  // ── Step 2: Verify OTP ─────────────────────────────────────────────────
  async function handleVerifyOTP(e) {
    e.preventDefault();
    setError("");
    const otpString = otp.join("");

    if (otpString.length < 6) {
      setError("Please enter all 6 digits.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim(), otp: otpString }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 402) {
          setError(data.error);
          setTimeout(() => navigate("/checkout"), 2500);
        } else {
          setError(data.error || "Invalid OTP.");
          setOtp(["", "", "", "", "", ""]);
          otpRefs.current[0]?.focus();
        }
        return;
      }

      login(data.sessionToken, data.user);
      navigate(from, { replace: true });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <img src="/logo.png" alt="CTP" className="w-16 h-16 rounded-xl mx-auto mb-3 shadow-lg" />
          </Link>
          <h1 className="text-2xl font-extrabold text-white">Crack The Pattern</h1>
          <p className="text-blue-300 text-sm mt-1">Student Portal</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-yellow-400" />

          <div className="p-8">
            {step === "email" ? (
              <>
                <h2 className="text-xl font-extrabold text-blue-900 mb-1">Welcome back!</h2>
                <p className="text-gray-500 text-sm mb-6">
                  Enter your registered email. We'll send you a one-time login code.
                </p>

                <form onSubmit={handleRequestOTP} noValidate className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="login-email">
                      Email Address
                    </label>
                    <input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading ? (
                      <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Sending OTP…</>
                    ) : "Send Login Code →"}
                  </button>
                </form>

                <p className="mt-5 text-center text-xs text-gray-400">
                  Not enrolled yet?{" "}
                  <Link to="/checkout" className="text-blue-600 hover:underline font-medium">
                    Enroll now
                  </Link>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-extrabold text-blue-900 mb-1">Enter your OTP</h2>
                <p className="text-gray-500 text-sm mb-1">
                  A 6-digit code was sent to{" "}
                  <strong className="text-blue-900">{email}</strong>
                </p>
                {info && <p className="text-green-600 text-xs mb-4">{info}</p>}

                <form onSubmit={handleVerifyOTP} noValidate className="space-y-5 mt-5">
                  {/* OTP Boxes */}
                  <div
                    className="flex gap-3 justify-center"
                    onPaste={handleOtpPaste}
                    aria-label="Enter 6-digit OTP"
                  >
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => (otpRefs.current[i] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        className="w-11 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        aria-label={`OTP digit ${i + 1}`}
                      />
                    ))}
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading ? (
                      <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Verifying…</>
                    ) : "Verify & Login →"}
                  </button>

                  <button
                    type="button"
                    onClick={() => { setStep("email"); setOtp(["","","","","",""]); setError(""); }}
                    className="w-full text-sm text-gray-500 hover:text-blue-600 transition py-1"
                  >
                    ← Change email
                  </button>
                </form>

                <p className="text-xs text-gray-400 text-center mt-4">
                  Didn't receive it? Check your spam folder, then{" "}
                  <button onClick={handleRequestOTP} className="text-blue-600 hover:underline">
                    resend OTP
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
