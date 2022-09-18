import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || !localStorage.getItem("ropstamp_test_key")===null) {
    // user is not authenticated
    return <Navigate to="/auth" />;
  }
  return children;
};