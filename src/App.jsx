import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Providers
import { AuthProvider } from "./context/AuthContext";
import { DemoModalProvider } from "./context/DemoModalContext";
import { AuthModalProvider } from "./context/AuthModalContext";

// Layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DemoModal from "./components/DemoModal";
import AuthModal from "./components/AuthModal";
import ProtectedRoute from "./components/ProtectedRoute";

// Schema
import FAQSchema from "./components/FAQSchema";
import CourseSchema from "./components/CourseSchema";

// Pages
import Home from "./pages/Home";
import TheCourse from "./pages/TheCourse";
import Leaderboard from "./pages/Leaderboard";
import DemoMasterclass from "./pages/DemoMasterclass";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import MyLearning from "./pages/MyLearning";
import Dashboard from "./pages/Dashboard"; // kept as alias

// Legacy SEO pages
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";

/**
 * Routes that render without the global Navbar/Footer.
 * /my-learning has its own header so it's excluded here too.
 */
const BARE_ROUTES = ["/checkout", "/my-learning", "/dashboard", "/demo-masterclass", "/payment-success"];

function AppLayout() {
  const location = useLocation();
  const isBare = BARE_ROUTES.some((r) => location.pathname.startsWith(r));

  return (
    <>
      <FAQSchema />
      <CourseSchema />

      {/* Global modals — rendered at root above all content */}
      <DemoModal />
      <AuthModal />

      {!isBare && <Navbar />}

      <main className={!isBare ? "flex-grow" : ""}>
        <Routes>
          {/* ── Public ──────────────────────────────────────────────── */}
          <Route path="/" element={<Home />} />
          <Route path="/the-course" element={<TheCourse />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/demo-masterclass" element={<DemoMasterclass />} />

          {/* ── Checkout funnel (bare, distraction-free) ────────────── */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />

          {/* ── Protected: any authenticated user ───────────────────── */}
          <Route
            path="/my-learning"
            element={
              <ProtectedRoute>
                <MyLearning />
              </ProtectedRoute>
            }
          />

          {/* Alias: /dashboard → /my-learning (backward compat) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MyLearning />
              </ProtectedRoute>
            }
          />

          {/* ── Legacy SEO routes ────────────────────────────────────── */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />

          {/* Old /courses + /syllabus → merged course page */}
          <Route path="/courses" element={<TheCourse />} />
          <Route path="/syllabus" element={<TheCourse />} />

          {/* 404 */}
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
        <AuthModalProvider>
          <DemoModalProvider>
            <div className="flex flex-col min-h-screen">
              <AppLayout />
            </div>
          </DemoModalProvider>
        </AuthModalProvider>
      </AuthProvider>
    </Router>
  );
}
