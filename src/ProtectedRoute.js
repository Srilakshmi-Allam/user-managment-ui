import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuditTracking } from "./utils/hooks/useAuditTracking";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("access_token");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useAuditTracking();

  return children;
};

export default ProtectedRoute;
