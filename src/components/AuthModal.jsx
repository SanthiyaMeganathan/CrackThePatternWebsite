import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAuthModal } from "../context/AuthModalContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

// ── OTP digit input sub-component ─────────────────────────────────────────
function OtpInputs({ value, onChange, onPaste }) {
  const refs = useRef([]);
  function handleChange(i, v) {
    if (!/^\d?$/.test(v)) return;
    const next = [...value];
    next[i] = v;
    onChange(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  }
  function handleKeyDown(i, e) {
    if (e.key === "Backspace" && !value[i] && i > 0) refs.current[i - 1]?.focus();
  }
  function handlePaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = Array(6).fill("");
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    onPaste(next);
    refs.current[Math.min(pasted.length, 5)]?.focus();
  }

  return (
    <div className="flex gap-2.5 justify-center" aria-label="Enter 6-digit OTP">
      {value.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className="w-11 h-13 text-center text-xl font-bold border-2 border-gray-300 rounded-xl
                     focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          aria-label={`OTP digit ${i + 1}`}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
export default function AuthModal() {
  const { isOpen, initialSlide, closeAuthModal } = useAuthModal();
  const { login } = useAuth();
  const navigate = useNavigate();

  // ── Slide: 'login' | 'signup'
  const [slide, setSlide] = useState("login");
  const [authFlow, setAuthFlow] = useState(""); // 'login' | 'signup'
  
  // ── OTP step — shared by both login and signup after email/form submission
  const [otpPending, setOtpPending] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");

  // ── Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // ── Signup state
  const [signupForm, setSignupForm] = useState({ name: "", email: "", phone: "" });
  const [signupErrors, setSignupErrors] = useState({});
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState("");

  // ── Shared OTP state
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpInfo, setOtpInfo] = useState("");

  const firstInputRef = useRef(null);

  // ── Sync slide when modal opens ─────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setSlide(initialSlide);
      resetAll();
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInputRef.current?.focus(), 120);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen, initialSlide]);

  // ESC to close
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []); // eslint-disable-line

  function resetAll() {
    setAuthFlow("");
    setOtpPending(false);
    setPendingEmail("");
    setLoginEmail("");
    setLoginError("");
    setSignupForm({ name: "", email: "", phone: "" });
    setSignupErrors({});
    setSignupError("");
    setOtp(Array(6).fill(""));
    setOtpError("");
    setOtpInfo("");
  }

  function handleClose() {
    closeAuthModal();
  }

  function switchToSlide(target) {
    setSlide(target);
    setLoginError("");
    setSignupError("");
    setSignupErrors({});
    setOtpError("");
  }

  // ── On successful auth — close modal, stay on current page ──────────────
  function handleAuthSuccess(sessionToken, userData) {
    login(sessionToken, userData);
    closeAuthModal();
    // No navigation here — the caller (useEnrollGate) handles routing
  }

  // ── Login: Step 1 — request OTP ─────────────────────────────────────────
  async function handleLoginEmailSubmit(e) {
    e.preventDefault();
    setLoginError("");
    if (!loginEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail)) {
      setLoginError("Enter a valid email address.");
      return;
    }
    setLoginLoading(true);
    try {
      const res = await fetch(`${API}/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail.toLowerCase().trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.redirect === "signup") {
          setLoginError("No account found. Create one below.");
          setTimeout(() => switchToSlide("signup"), 1200);
        } else {
          setLoginError(data.error || "Failed to send OTP.");
        }
        return;
      }

      setPendingEmail(loginEmail.toLowerCase().trim());
      setOtp(Array(6).fill(""));
      setOtpError("");
      setOtpInfo("OTP sent! Check your inbox.");
      setAuthFlow("login");
      setOtpPending(true);
    } catch {
      setLoginError("Network error. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  }

  // ── Signup: submit form → create account → OTP ──────────────────────────
  function validateSignup() {
    const e = {};
    if (!signupForm.name.trim()) e.name = "Name is required.";
    if (!signupForm.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupForm.email)) e.email = "Invalid email.";
    if (!signupForm.phone.trim()) e.phone = "Phone is required.";
    else if (!/^[6-9]\d{9}$/.test(signupForm.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid 10-digit Indian number.";
    return e;
  }

  async function handleSignupSubmit(e) {
    e.preventDefault();
    setSignupError("");
    const errs = validateSignup();
    setSignupErrors(errs);
    if (Object.keys(errs).length) return;

    setSignupLoading(true);
    try {
      const res = await fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signupForm.name.trim(),
          email: signupForm.email.toLowerCase().trim(),
          phone: signupForm.phone.trim(),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.redirect === "login") {
          setSignupError("Account already exists. Switching to login…");
          setTimeout(() => {
            setLoginEmail(signupForm.email);
            switchToSlide("login");
          }, 1200);
        } else {
          setSignupError(data.error || "Failed to create account.");
        }
        return;
      }

      setPendingEmail(signupForm.email.toLowerCase().trim());
      setOtp(Array(6).fill(""));
      setOtpError("");
      setOtpInfo("Account created! Enter the code we emailed you.");
      setAuthFlow("signup");
      setOtpPending(true);
    } catch {
      setSignupError("Network error. Please try again.");
    } finally {
      setSignupLoading(false);
    }
  }

  // ── OTP: Verify ──────────────────────────────────────────────────────────
  async function handleOtpVerify(e) {
    e.preventDefault();
    setOtpError("");
    const otpStr = otp.join("");
    if (otpStr.length < 6) { setOtpError("Enter all 6 digits."); return; }

    setOtpLoading(true);
    try {
      const endpoint = authFlow === "signup" ? "/auth/verify-signup" : "/auth/verify-otp";
      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: pendingEmail, otp: otpStr }),
      });
      const data = await res.json();

      if (!res.ok) {
        setOtpError(data.error || "Invalid OTP.");
        setOtp(Array(6).fill(""));
        return;
      }

      handleAuthSuccess(data.sessionToken, data.user);
    } catch {
      setOtpError("Network error. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  }

  async function resendOtp() {
    setOtpError("");
    setOtpInfo("");
    try {
      await fetch(`${API}/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: pendingEmail }),
      });
      setOtpInfo("New OTP sent!");
    } catch { /* silent */ }
  }

  if (!isOpen) return null;

  // ── Shared OTP screen ─────────────────────────────────────────────────
  if (otpPending) {
    return (
      <ModalShell onClose={handleClose}>
        <div className="p-8">
          <button onClick={() => setOtpPending(false)} className="text-blue-600 text-sm hover:underline mb-5 block">
            ← Back
          </button>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">Step 2 of 2</p>
          <h2 className="text-2xl font-extrabold text-blue-900 mb-1">Enter your code</h2>
          <p className="text-gray-500 text-sm mb-1">
            Sent to <strong className="text-blue-900">{pendingEmail}</strong>
          </p>
          {otpInfo && <p className="text-green-600 text-xs mb-4">{otpInfo}</p>}

          <form onSubmit={handleOtpVerify} className="space-y-5 mt-5" noValidate>
            <OtpInputs value={otp} onChange={setOtp} onPaste={setOtp} />
            {otpError && <ErrorBox msg={otpError} />}

            <SubmitBtn loading={otpLoading} label="Verify & Continue →" />
          </form>

          <p className="text-xs text-gray-400 text-center mt-4">
            Didn't receive it?{" "}
            <button onClick={resendOtp} className="text-blue-600 hover:underline">Resend OTP</button>
          </p>
        </div>
      </ModalShell>
    );
  }

  // ── Slide animation wrapper ─────────────────────────────────────────────
  return (
    <ModalShell onClose={handleClose}>
      {/* Slide track: translate based on active slide */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: slide === "login" ? "translateX(0%)" : "translateX(-50%)", width: "200%" }}
        >
          {/* ── Slide 1: Login ─────────────────────────────────────────── */}
          <div className="w-1/2 p-8 flex-shrink-0">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
              Welcome back
            </p>
            <h2 className="text-2xl font-extrabold text-blue-900 mb-1">Sign In</h2>
            <p className="text-gray-500 text-sm mb-6">
              Enter your email — we'll send you a one-time code.
            </p>

            <form onSubmit={handleLoginEmailSubmit} noValidate className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="auth-login-email">
                  Email Address
                </label>
                <input
                  ref={slide === "login" ? firstInputRef : null}
                  id="auth-login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none
                             focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {loginError && <ErrorBox msg={loginError} />}
              <SubmitBtn loading={loginLoading} label="Send Login Code →" />
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              Don't have an account?{" "}
              <button
                onClick={() => switchToSlide("signup")}
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>

          {/* ── Slide 2: Signup ────────────────────────────────────────── */}
          <div className="w-1/2 p-8 flex-shrink-0">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
              New here?
            </p>
            <h2 className="text-2xl font-extrabold text-blue-900 mb-1">Create Account</h2>
            <p className="text-gray-500 text-sm mb-6">
              Free to register. Purchase unlocks the full course.
            </p>

            <form onSubmit={handleSignupSubmit} noValidate className="space-y-4">
              {[
                { id: "sg-name", label: "Full Name", key: "name", type: "text", placeholder: "Priya Sharma", ref: slide === "signup" ? firstInputRef : null },
                { id: "sg-email", label: "Email", key: "email", type: "email", placeholder: "you@example.com" },
                { id: "sg-phone", label: "Phone (10-digit)", key: "phone", type: "tel", placeholder: "98765 43210" },
              ].map(({ id, label, key, type, placeholder, ref }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={id}>
                    {label}
                  </label>
                  <input
                    ref={ref}
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={signupForm[key]}
                    maxLength={key === "phone" ? 10 : undefined}
                    onChange={(e) => {
                      const v = key === "phone" ? e.target.value.replace(/\D/g, "") : e.target.value;
                      setSignupForm({ ...signupForm, [key]: v });
                    }}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none
                               focus:ring-2 focus:ring-blue-500 transition
                               ${signupErrors[key] ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                  />
                  {signupErrors[key] && (
                    <p className="text-xs text-red-500 mt-1">{signupErrors[key]}</p>
                  )}
                </div>
              ))}

              {signupError && <ErrorBox msg={signupError} />}
              <SubmitBtn loading={signupLoading} label="Create Account →" />
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              Already have an account?{" "}
              <button
                onClick={() => switchToSlide("login")}
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

// ── Shared sub-components ────────────────────────────────────────────────

function ModalShell({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-blue-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-modal-in">
        <div className="h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-yellow-400" />

        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-400 hover:text-gray-700 text-2xl leading-none transition z-20"
          aria-label="Close"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
}

function ErrorBox({ msg }) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
      {msg}
    </div>
  );
}

function SubmitBtn({ loading, label }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl
                 transition flex items-center justify-center gap-2 disabled:opacity-60"
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Please wait…
        </>
      ) : label}
    </button>
  );
}
