import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/auth-context';

const ProtectedRoute: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated)
    return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
