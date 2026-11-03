import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  requireOnboarding?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireOnboarding = true
}) => {
  const { isAuthenticated, currentStudent, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3 text-indigo-600 dark:text-indigo-400">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Loading session...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !currentStudent) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireOnboarding && !currentStudent.onboardingCompleted && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
