import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'freelancer' | 'client' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { currentUser, userRole, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00] mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login with the current location
  if (!currentUser) {
    console.log('User not authenticated, redirecting to login from:', location.pathname);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('User authenticated:', currentUser.uid, 'Role:', userRole, 'accessing:', location.pathname);

  // Role-based access control
  if (requiredRole && userRole !== requiredRole) {
    // If a client tries to access freelancer routes, redirect to client dashboard
    if (userRole === 'client' && requiredRole === 'freelancer') {
      console.log('Client attempting to access freelancer route, redirecting to client dashboard');
      return <Navigate to="/client/dashboard" replace />;
    }
    
    // If a freelancer tries to access client routes, redirect to freelancer dashboard
    if (userRole === 'freelancer' && requiredRole === 'client') {
      console.log('Freelancer attempting to access client route, redirecting to freelancer dashboard');
      return <Navigate to="/freelancer/dashboard" replace />;
    }
    
    // If user has no role yet (e.g., hasn't completed onboarding) and trying to access role-specific routes
    if (!userRole) {
      console.log('User has no role, redirecting to onboarding');
      return <Navigate to="/onboarding" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;