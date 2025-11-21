import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Facebook } from 'lucide-react';
import { AuthService } from '../lib/authService';
import { FreelanceFirestoreService } from '../lib/firestoreService';

import bgImage from '../assets/images/hero image.png';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'freelancer',
    companyName: '',
    termsAccepted: false,
    marketingOptIn: false
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Validation state
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-4 scale
  const [passwordMatch, setPasswordMatch] = useState(true);

  // Check password strength
  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    
    if (password.length >= 8) strength++; // Length
    if (/[A-Z]/.test(password)) strength++; // Uppercase
    if (/[0-9]/.test(password)) strength++; // Number
    if (/[^A-Za-z0-9]/.test(password)) strength++; // Special character
    
    return strength;
  };
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
      
      // Update password validation
      if (name === 'password') {
        setPasswordStrength(checkPasswordStrength(value));
        // Also check if passwords match if confirmPassword exists
        if (formData.confirmPassword) {
          setPasswordMatch(value === formData.confirmPassword);
        }
      }
      
      // Check if confirm password matches when that field changes
      if (name === 'confirmPassword') {
        setPasswordMatch(value === formData.password);
      }
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      const user = await AuthService.signInWithGoogle();
      
      // Extract names from display name
      const nameParts = user.displayName?.split(' ') || ['', ''];
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      // Check if user profile already exists
      const existingProfile = await FreelanceFirestoreService.getUserProfile(user.uid);
      
      if (existingProfile.length === 0) {
        // Create new user profile for Google sign-in
        const userProfileData = {
          uid: user.uid,
          firstName: firstName,
          lastName: lastName,
          email: user.email || '',
          displayName: user.displayName || '',
          accountType: 'freelancer', // Default, can be changed later
          companyName: null,
          marketingOptIn: false,
          termsAccepted: true, // Assumed for Google sign-in
          profileCompleted: false,
          emailVerified: false, // Always require OTP verification
          photoURL: user.photoURL || null,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        console.log('Creating Google user profile with UID as document ID:', user.uid);
        await FreelanceFirestoreService.createUserProfile(user.uid, userProfileData);
        console.log('Google user profile created successfully with document ID:', user.uid);
        
        // Send OTP for Google sign-in users too
        try {
          const otpResponse = await fetch('http://localhost:5000/api/send-otp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user.email,
              user_name: user.displayName || firstName
            }),
          });
          
          const otpResult = await otpResponse.json();
          if (!otpResult.success) {
            console.error('Failed to send OTP for Google sign-in');
          }
        } catch (otpError) {
          console.error('OTP sending error for Google sign-in:', otpError);
        }
      }
      
      setSuccess('Successfully signed in with Google! Please check your email for verification.');
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('userEmail', user.email || '');
      localStorage.setItem('userName', user.displayName || firstName);
      
      setTimeout(() => {
        navigate('/onboarding');
      }, 1500);
      
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      setError('Failed to sign in with Google: ' + (error.message || 'Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous messages
    setError('');
    setSuccess('');
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (!passwordMatch) {
      setError('Passwords do not match');
      return;
    }
    
    if (passwordStrength < 2) {
      setError('Please choose a stronger password');
      return;
    }

    if (!formData.termsAccepted) {
      setError('Please accept the terms and conditions');
      return;
    }
    
    setLoading(true);
    
    try {
      // Create Firebase user account
      const displayName = `${formData.firstName} ${formData.lastName}`;
      const user = await AuthService.signUp(formData.email, formData.password, displayName);
      
      // Prepare user profile data for Firestore
      const userProfileData = {
        uid: user.uid,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        displayName: displayName,
        accountType: formData.accountType,
        companyName: formData.companyName || null,
        marketingOptIn: formData.marketingOptIn,
        termsAccepted: formData.termsAccepted,
        profileCompleted: false,
        emailVerified: false, // Always require OTP verification
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Save user profile to Firestore
      console.log('Creating user profile with UID as document ID:', user.uid);
      await FreelanceFirestoreService.createUserProfile(user.uid, userProfileData);
      console.log('User profile created successfully with document ID:', user.uid);
      
      // Send OTP to user's email
      try {
        const otpResponse = await fetch('http://localhost:5000/api/send-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            user_name: displayName
          }),
        });
        
        const otpResult = await otpResponse.json();
        if (otpResult.success) {
          setSuccess('Account created successfully! Please check your email for the verification code.');
        } else {
          setError('Account created but failed to send verification email. Please try again.');
        }
      } catch (otpError) {
        console.error('OTP sending error:', otpError);
        setError('Account created but failed to send verification email. Please try again.');
      }
      
      // Store account type and user info for onboarding
      localStorage.setItem('accountType', formData.accountType);
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', displayName);
      
      // Navigate to onboarding after a brief delay
      setTimeout(() => {
        navigate('/onboarding');
      }, 2000);
      
    } catch (error: any) {
      console.error('Signup error:', error);
      setError('Failed to create account: ' + (error.message || 'Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Signup Form */}
      <div className="w-full lg:w-1/2 p-6 md:p-12 flex flex-col bg-white">
        <div className="max-w-md w-full mx-auto">
          {/* Logo Text */}
          <div className="mb-8 text-center">
            <span className="text-3xl font-bold text-[#2E2E2E]">Freelance<span className="text-[#FF6B00]">Nest</span></span>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-[#2E2E2E]">Create Your Account</h1>
            <p className="text-gray-600">Join thousands of freelancers and clients</p>
          </div>

          {/* Social Signup Buttons */}
          <div className="space-y-3 mb-6">
            <button 
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#4285F4">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="text-gray-700">Continue with Google</span>
            </button>
            <button 
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              <Facebook size={20} className="text-[#1877F2]" />
              <span className="text-gray-700">Continue with Facebook</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center text-sm text-gray-500 my-8">
            <div className="border-t border-gray-300 flex-grow"></div>
            <div className="mx-4 bg-white px-2">or with email</div>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>

          {/* Error and Success Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
              <p className="text-sm font-medium">{success}</p>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex gap-4">
              <div className="w-1/2 space-y-1">
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-all duration-200"
                  placeholder="John"
                  required
                />
              </div>
              <div className="w-1/2 space-y-1">
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-all duration-200"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-all duration-200"
                placeholder="email@example.com"
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
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-all duration-200
                    ${formData.password.length > 0 && passwordStrength < 2 ? 'border-red-300' : 
                      passwordStrength >= 3 ? 'border-green-300' : 'border-gray-300'}`}
                  placeholder="Create a strong password"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {/* Password strength meter */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex space-x-1 mb-1">
                    <div className={`h-1 flex-1 rounded-sm ${passwordStrength >= 1 ? 'bg-[#FF6B00]' : 'bg-gray-300'}`}></div>
                    <div className={`h-1 flex-1 rounded-sm ${passwordStrength >= 2 ? 'bg-[#FF6B00]' : 'bg-gray-300'}`}></div>
                    <div className={`h-1 flex-1 rounded-sm ${passwordStrength >= 3 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div className={`h-1 flex-1 rounded-sm ${passwordStrength >= 4 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  </div>
                  <p className={`text-xs ${
                    passwordStrength <= 1 ? 'text-red-500' :
                    passwordStrength === 2 ? 'text-orange-500' :
                    passwordStrength === 3 ? 'text-green-500' :
                    'text-green-600'
                  }`}>
                    {passwordStrength === 0 && 'Very weak - Use at least 8 characters'}
                    {passwordStrength === 1 && 'Weak - Add uppercase letters, numbers or symbols'}
                    {passwordStrength === 2 && 'Fair - Add more variety of characters'}
                    {passwordStrength === 3 && 'Good - Almost there'}
                    {passwordStrength === 4 && 'Strong password'}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-all duration-200
                    ${formData.confirmPassword && !passwordMatch ? 'border-red-300' : 
                      formData.confirmPassword && passwordMatch ? 'border-green-300' : 'border-gray-300'}`}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formData.confirmPassword && !passwordMatch && (
                <p className="mt-1 text-xs text-red-500">
                  Passwords don't match
                </p>
              )}
              {formData.confirmPassword && passwordMatch && (
                <p className="mt-1 text-xs text-green-500">
                  Passwords match ✓
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                I want to
              </label>
              <div className="grid grid-cols-1 gap-3">
                <div 
                  className={`border ${formData.accountType === 'freelancer' ? 'border-[#FF6B00] bg-orange-50' : 'border-gray-300'} rounded-lg p-4 cursor-pointer transition-all duration-200 hover:border-[#FF6B00]`}
                  onClick={() => setFormData({...formData, accountType: 'freelancer'})}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800">Work as Freelancer</h3>
                    <div className={`w-5 h-5 rounded-full border-2 ${formData.accountType === 'freelancer' ? 'border-[#FF6B00]' : 'border-gray-300'} flex items-center justify-center`}>
                      {formData.accountType === 'freelancer' && <div className="w-3 h-3 bg-[#FF6B00] rounded-full"></div>}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Find work and offer your services</p>
                </div>
                <div 
                  className={`border ${formData.accountType === 'client' ? 'border-[#FF6B00] bg-orange-50' : 'border-gray-300'} rounded-lg p-4 cursor-pointer transition-all duration-200 hover:border-[#FF6B00]`}
                  onClick={() => setFormData({...formData, accountType: 'client'})}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800">Hire Talent</h3>
                    <div className={`w-5 h-5 rounded-full border-2 ${formData.accountType === 'client' ? 'border-[#FF6B00]' : 'border-gray-300'} flex items-center justify-center`}>
                      {formData.accountType === 'client' && <div className="w-3 h-3 bg-[#FF6B00] rounded-full"></div>}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Post jobs and hire professionals</p>
                </div>
              </div>
            </div>

            {/* Company Information for Clients */}
            {formData.accountType === 'client' && (
              <div className="space-y-1">
                <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700">
                  Company Name (Optional)
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-all duration-200"
                  placeholder="Your company name"
                />
              </div>
            )}

            <div className="space-y-4 pt-4">
              <div className="flex items-start">
                <input
                  id="termsAccepted"
                  name="termsAccepted"
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#FF6B00] border-gray-300 rounded focus:ring-[#FF6B00] mt-0.5"
                  required
                />
                <label htmlFor="termsAccepted" className="ml-3 block text-sm text-gray-700">
                  I agree to the <Link to="/terms" className="text-[#FF6B00] hover:text-[#FF9F45] font-medium">Terms of Service</Link> and <Link to="/privacy" className="text-[#FF6B00] hover:text-[#FF9F45] font-medium">Privacy Policy</Link>
                </label>
              </div>

              <div className="flex items-start">
                <input
                  id="marketingOptIn"
                  name="marketingOptIn"
                  type="checkbox"
                  checked={formData.marketingOptIn}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#FF6B00] border-gray-300 rounded focus:ring-[#FF6B00] mt-0.5"
                />
                <label htmlFor="marketingOptIn" className="ml-3 block text-sm text-gray-700">
                  Send me helpful emails to find opportunities and improve my experience
                </label>
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#FF6B00] to-[#FF9F45] hover:from-[#FF9F45] hover:to-[#FF6B00] text-white py-3 rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[#FF6B00] font-semibold hover:text-[#FF9F45] transition-colors">
                Sign in
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
          <h2 className="text-4xl font-bold mb-6">Start your <span className="text-[#FF6B00]">freelancing</span> journey today.</h2>
          <p className="text-gray-300 text-lg mb-8">
            Join thousands of freelancers and clients on our platform. Connect, collaborate, and grow your career.
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

export default SignupPage;
