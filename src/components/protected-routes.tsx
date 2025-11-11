
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/auth-context";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  console.log("ProtectedRoute - isAuthenticated:",isAuthenticated, children);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  } else {
    return children
  }

};

export default ProtectedRoute;