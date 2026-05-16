import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAuthModal } from "../context/AuthModalContext";

/**
 * useEnrollGate — the "Enroll Now" gatekeeper hook.
 *
 * Returns a single handleEnroll function. When called:
 *   - NOT logged in → open AuthModal on Login slide
 *   - IS  logged in → navigate directly to /checkout
 *
 * Usage: const handleEnroll = useEnrollGate();
 *        <button onClick={handleEnroll}>Enroll Now</button>
 */
export function useEnrollGate() {
  const { isAuthenticated } = useAuth();
  const { openAuthModal } = useAuthModal();
  const navigate = useNavigate();

  return function handleEnroll() {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      openAuthModal("login");
    }
  };
}
