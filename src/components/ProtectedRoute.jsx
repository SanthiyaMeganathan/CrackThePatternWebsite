import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAuthModal } from "../context/AuthModalContext";

/**
 * Wraps routes that require any authenticated session.
 * - Loading → spinner
 * - Not authenticated → open Auth Modal on Login slide (no URL change)
 * - Authenticated (any status) → render children
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const { openAuthModal } = useAuthModal();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Verifying your session…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Open auth modal instead of redirecting to a separate login page
    openAuthModal("login");
    // Render a minimal placeholder while the modal is open
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400 text-sm">Please sign in to continue.</p>
      </div>
    );
  }

  return children;
}
