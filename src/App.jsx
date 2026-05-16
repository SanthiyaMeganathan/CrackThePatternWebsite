import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Providers
import { AuthProvider } from "./context/AuthContext";
import { DemoModalProvider } from "./context/DemoModalContext";

// Layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DemoModal from "./components/DemoModal";
import ProtectedRoute from "./components/ProtectedRoute";

// Schema components
import FAQSchema from "./components/FAQSchema";
import CourseSchema from "./components/CourseSchema";

// Pages
import Home from "./pages/Home";
import TheCourse from "./pages/TheCourse";
import Leaderboard from "./pages/Leaderboard";
import DemoMasterclass from "./pages/DemoMasterclass";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// Legacy pages (kept for SEO continuity — will redirect/show content)
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";

/**
 * Routes that should NOT show the global Navbar/Footer.
 * Checkout is a conversion-optimized page; Login/Dashboard have their own headers.
 */
const BARE_ROUTES = ["/checkout", "/login", "/dashboard", "/demo-masterclass", "/payment-success"];

function AppLayout() {
  const location = useLocation();
  const isBare = BARE_ROUTES.some((r) => location.pathname.startsWith(r));

  return (
    <>
      <FAQSchema />
      <CourseSchema />
      {/* Global modal — rendered at root so it appears above everything */}
      <DemoModal />

      {!isBare && <Navbar />}

      <main className={!isBare ? "flex-grow" : ""}>
        <Routes>
          {/* ── Public routes ─────────────────────────────────────────── */}
          <Route path="/" element={<Home />} />
          <Route path="/the-course" element={<TheCourse />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/demo-masterclass" element={<DemoMasterclass />} />

          {/* ── Checkout funnel (bare layout) ─────────────────────────── */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />

          {/* ── Auth ──────────────────────────────────────────────────── */}
          <Route path="/login" element={<Login />} />

          {/* ── Protected student dashboard ───────────────────────────── */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ── Legacy routes (kept for SEO / backlinks) ──────────────── */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />

          {/* Old /courses and /syllabus → redirect to /the-course */}
          <Route path="/courses" element={<TheCourse />} />
          <Route path="/syllabus" element={<TheCourse />} />

          {/* 404 fallback */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center text-center p-8">
              <div>
                <div className="text-6xl mb-4">🔍</div>
                <h1 className="text-2xl font-bold text-blue-900 mb-2">Page Not Found</h1>
                <p className="text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
                <a href="/" className="bg-blue-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition">
                  Go Home
                </a>
              </div>
            </div>
          } />
        </Routes>
      </main>

      {!isBare && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <DemoModalProvider>
          <div className="flex flex-col min-h-screen">
            <AppLayout />
          </div>
        </DemoModalProvider>
      </AuthProvider>
    </Router>
  );
}
