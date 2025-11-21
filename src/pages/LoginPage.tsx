import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Facebook } from 'lucide-react';
import { AuthService } from '../lib/authService';
import { FreelanceFirestoreService } from '../lib/firestoreService';

// Using a placeholder image until we can add the proper one
import bgImage from '../assets/images/hero image.png';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Sign in with Firebase Auth
      const user = await AuthService.signIn(email, password);

      // Get user profile from Firestore to determine account type
      const userProfiles = await FreelanceFirestoreService.getUserProfile(user.uid);

      if (userProfiles.length > 0) {
        const userProfile = userProfiles[0];
        const accountType = userProfile.accountType;

        // Store user info in localStorage if remember me is checked
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        // Get the redirect location from the route state or default to dashboard
        const from = (location.state as any)?.from?.pathname;
        
        // Navigate based on redirect location or account type
        if (from) {
          // If user was trying to access a protected route, redirect them there
          navigate(from, { replace: true });
        } else if (accountType === 'freelancer') {
          navigate('/freelancer/dashboard');
        } else if (accountType === 'client') {
          navigate('/client/dashboard');
        } else if (accountType === 'admin') {
          // Admin dashboard will be created later
          navigate('/dashboard');
        } else {
          // Fallback for unknown account types
          navigate('/dashboard');
        }
      } else {
        // User profile not found - this shouldn't happen normally
        setError('User profile not found. Please contact support.');
        await AuthService.signOut();
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle specific Firebase auth errors
      if (error.code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (error.code === 'auth/user-disabled') {
        setError('This account has been disabled. Please contact support.');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many failed login attempts. Please try again later.');
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      // Sign in with Google
      const user = await AuthService.signInWithGoogle();

      // Get user profile from Firestore to determine account type
      const userProfiles = await FreelanceFirestoreService.getUserProfile(user.uid);

      if (userProfiles.length > 0) {
        const userProfile = userProfiles[0];
        const accountType = userProfile.accountType;

        // Get the redirect location from the route state or default to dashboard
        const from = (location.state as any)?.from?.pathname;
        
        // Navigate based on redirect location or account type
        if (from) {
          // If user was trying to access a protected route, redirect them there
          navigate(from, { replace: true });
        } else if (accountType === 'freelancer') {
          navigate('/freelancer/dashboard');
        } else if (accountType === 'client') {
          navigate('/client/dashboard');
        } else if (accountType === 'admin') {
          // Admin dashboard will be created later
          navigate('/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        // New Google user - redirect to signup to complete profile
        setError('Please complete your profile by signing up first.');
        await AuthService.signOut();
      }
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Sign-in was cancelled.');
      } else if (error.code === 'auth/popup-blocked') {
        setError('Pop-up blocked. Please allow pop-ups and try again.');
      } else {
        setError('Google sign-in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-white">
        <div className="max-w-md w-full mx-auto">
          {/* Logo Text */}
          <div className="mb-8 text-center">
            <span className="text-3xl font-bold text-[#2E2E2E]">Freelance<span className="text-[#FF6B00]">Nest</span></span>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-[#2E2E2E]">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button 
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#4285F4">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="text-gray-700">
                {loading ? 'Signing in...' : 'Continue with Google'}
              </span>
            </button>
            <button 
              type="button"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
            >
              <Facebook size={20} className="text-[#1877F2]" />
              <span className="text-gray-700">Continue with Facebook</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center text-sm text-gray-500 my-8">
            <div className="border-t border-gray-300 flex-grow"></div>
            <div className="mx-4 bg-white px-2">or continue with email</div>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#FF6B00] border-gray-300 rounded focus:ring-[#FF6B00]"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-[#FF6B00] hover:text-[#FF9F45] font-medium transition-colors">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#FF6B00] to-[#FF9F45] hover:from-[#FF9F45] hover:to-[#FF6B00] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg transition-all duration-200 font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#FF6B00] font-semibold hover:text-[#FF9F45] transition-colors">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div 
        className="hidden lg:block lg:w-1/2 bg-gray-600 relative overflow-hidden"
      >
        <div className="relative z-10 text-white max-w-md p-12 mt-24">
          <h2 className="text-4xl font-bold mb-6">Connect with every <span className="text-[#FF6B00]">application.</span></h2>
          <p className="text-gray-300 text-lg">
            Everything you need in an easily customizable dashboard. Find talents and projects that match your skills.
          </p>
        </div>
        
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 opacity-10">
          <img
            src={bgImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full bg-gray-700 opacity-40 filter blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-gray-700 opacity-40 filter blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;










