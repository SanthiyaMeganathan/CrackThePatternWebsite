import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";
const POLL_INTERVAL_MS = 60_000; // 1 minute

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [sessionToken, setSessionToken] = useState(null);
  const [evictionMessage, setEvictionMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const pollRef = useRef(null);

  // ── Bootstrap from localStorage ─────────────────────────────────────────
  useEffect(() => {
    const storedToken = localStorage.getItem("ctp_session_token");
    const storedUser = localStorage.getItem("ctp_user");
    if (storedToken && storedUser) {
      setSessionToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // ── Session validation + eviction polling ────────────────────────────────
  const validateSession = useCallback(async (token) => {
    if (!token) return;
    try {
      const res = await fetch(`${API}/auth/validate-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();

      if (!data.valid) {
        // Token mismatch — evict this session
        clearAuth();
        if (data.reason === "device_eviction") {
          setEvictionMessage(
            "You have been logged out because this account was accessed on another device."
          );
        }
      }
    } catch {
      // Network error — silent fail, retry next poll
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (sessionToken) {
      // Immediate check on token change
      validateSession(sessionToken);

      // Polling
      pollRef.current = setInterval(() => validateSession(sessionToken), POLL_INTERVAL_MS);
    }
    return () => clearInterval(pollRef.current);
  }, [sessionToken, validateSession]);

  // ── Auth helpers ─────────────────────────────────────────────────────────
  function login(token, userData) {
    localStorage.setItem("ctp_session_token", token);
    localStorage.setItem("ctp_user", JSON.stringify(userData));
    setSessionToken(token);
    setUser(userData);
    setEvictionMessage("");
  }

  function clearAuth() {
    localStorage.removeItem("ctp_session_token");
    localStorage.removeItem("ctp_user");
    setSessionToken(null);
    setUser(null);
    clearInterval(pollRef.current);
  }

  async function logout() {
    try {
      await fetch(`${API}/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${sessionToken}` },
      });
    } catch { /* ignore */ }
    clearAuth();
  }

  const isAuthenticated = !!sessionToken && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        sessionToken,
        isAuthenticated,
        isLoading,
        evictionMessage,
        login,
        logout,
        clearAuth,
        setEvictionMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
