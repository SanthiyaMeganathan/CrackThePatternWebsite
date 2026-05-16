import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDemoModal } from "../context/DemoModalContext";
import { useAuth } from "../context/AuthContext";
import { useAuthModal } from "../context/AuthModalContext";

export default function Navbar() {
  const { openModal } = useDemoModal();
  const { isAuthenticated, user, logout } = useAuth();
  const { openAuthModal } = useAuthModal();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors hover:text-blue-600
        ${isActive(to) ? "text-blue-700 font-semibold" : "text-gray-700"}`}
    >
      {label}
    </Link>
  );

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-shadow duration-200
        ${scrolled ? "shadow-md" : "shadow-sm border-b border-gray-100"}`}
    >
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition flex-shrink-0">
          <img src="/logo.png" alt="CTP Logo" className="w-11 h-11 rounded-md object-cover" />
          <div className="hidden sm:block">
            <p className="font-extrabold text-base text-blue-900 leading-tight">Crack The Pattern</p>
            <p className="text-xs text-gray-400">Learn the Pattern. Crack the Exam.</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLink("/", "Home")}
          {navLink("/the-course", "The Course")}
          {navLink("/leaderboard", "Leaderboard")}
          {isAuthenticated && navLink("/my-learning", "My Learning")}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-600">Hi, {user?.name?.split(" ")[0]}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-red-600 transition font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => openAuthModal("login")}
              className="text-sm font-medium text-gray-600 hover:text-blue-700 transition"
            >
              Sign In
            </button>
          )}
          <button
            onClick={openModal}
            id="nav-watch-demo-btn"
            className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-5 py-2.5 rounded-xl text-sm shadow-sm transition-all hover:shadow-md active:scale-95"
          >
            Watch Free Demo 🎥
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-3">
          <Link to="/" className="block text-sm font-medium text-gray-700 py-1">Home</Link>
          <Link to="/the-course" className="block text-sm font-medium text-gray-700 py-1">The Course</Link>
          <Link to="/leaderboard" className="block text-sm font-medium text-gray-700 py-1">Leaderboard</Link>
          {isAuthenticated && (
            <Link to="/my-learning" className="block text-sm font-medium text-gray-700 py-1">My Learning</Link>
          )}
          {isAuthenticated ? (
            <button onClick={handleLogout} className="block text-sm text-red-500 py-1">
              Logout
            </button>
          ) : (
            <button onClick={() => openAuthModal("login")} className="block text-sm font-medium text-gray-600 py-1">Sign In</button>
          )}
          <button
            onClick={openModal}
            className="w-full bg-yellow-400 text-blue-900 font-bold py-3 rounded-xl text-sm mt-2"
          >
            Watch Free Demo 🎥
          </button>
        </div>
      )}
    </header>
  );
}
