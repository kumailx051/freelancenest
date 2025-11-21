import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage: React.FC = () => {
  const { userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      // Redirect to appropriate dashboard based on user role
      if (userRole === 'client') {
        navigate('/client/dashboard', { replace: true });
      } else if (userRole === 'freelancer') {
        navigate('/freelancer/dashboard', { replace: true });
      } else {
        // If no role, redirect to onboarding
        navigate('/onboarding', { replace: true });
      }
    }
  }, [userRole, loading, navigate]);

  // Show loading while determining redirect
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00] mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
};

export default DashboardPage;












