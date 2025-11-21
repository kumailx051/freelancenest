import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'freelancer' | 'client';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { currentUser, loading } = useAuth();
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

  console.log('User authenticated:', currentUser.uid, 'accessing:', location.pathname);

  // TODO: Add role-based access control if needed
  // For now, any authenticated user can access both client and freelancer routes
  // You can implement role checking here later if you store user roles in Firestore

  return <>{children}</>;
};

export default ProtectedRoute;