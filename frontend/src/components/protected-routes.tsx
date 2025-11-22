import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/auth-context';

const ProtectedRoute: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div
        className="flex flex-col items-center justify-center h-screen w-screen 
  bg-surface-light dark:bg-surface-dark transition-colors duration-300 gap-3"
      >
        <span
          className="text-3xl font-bold tracking-wide animate-pulse 
    text-brand-light dark:text-brand-dark"
        >
          Expense
        </span>

        <span className="text-sm text-text-light dark:text-text-dark opacity-70">
          Loading your finances...
        </span>

        <div className="flex gap-2 mt-1">
          <div className="h-2 w-2 rounded-full bg-brand-light dark:bg-brand-dark animate-bounce" />
          <div className="h-2 w-2 rounded-full bg-brand-light dark:bg-brand-dark animate-bounce [animation-delay:-.2s]" />
          <div className="h-2 w-2 rounded-full bg-brand-light dark:bg-brand-dark animate-bounce [animation-delay:-.4s]" />
        </div>
      </div>
    );
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
