import React, { createContext, useContext, useState } from "react";

/**
 * Controls the Unified Auth Modal — a single popup containing both
 * Login (Slide 1) and Signup (Slide 2) panels.
 *
 * openAuthModal('login')  → opens on the Login slide (default)
 * openAuthModal('signup') → opens on the Signup slide
 */
const AuthModalContext = createContext(null);

export function AuthModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState("login"); // 'login' | 'signup'

  function openAuthModal(slide = "login") {
    setInitialSlide(slide);
    setIsOpen(true);
  }

  function closeAuthModal() {
    setIsOpen(false);
  }

  return (
    <AuthModalContext.Provider value={{ isOpen, initialSlide, openAuthModal, closeAuthModal }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used inside <AuthModalProvider>");
  return ctx;
}
