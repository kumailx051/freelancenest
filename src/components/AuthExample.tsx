import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AuthService } from '../lib/authService';

const AuthExample: React.FC = () => {
  const { currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await AuthService.signUp(email, password, displayName);
      setMessage('Account created successfully!');
    } catch (error) {
      setError('Failed to create account: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await AuthService.signIn(email, password);
      setMessage('Signed in successfully!');
    } catch (error) {
      setError('Failed to sign in: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setError('');
      await AuthService.signOut();
      setMessage('Signed out successfully!');
    } catch (error) {
      setError('Failed to sign out: ' + (error as Error).message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await AuthService.signInWithGoogle();
      setMessage('Signed in with Google successfully!');
    } catch (error) {
      setError('Failed to sign in with Google: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    try {
      setError('');
      setMessage('');
      await AuthService.resetPassword(email);
      setMessage('Password reset email sent!');
    } catch (error) {
      setError('Failed to reset password: ' + (error as Error).message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Firebase Auth Example</h2>
      
      {currentUser ? (
        <div className="text-center">
          <p className="mb-4">Welcome, {currentUser.displayName || currentUser.email}!</p>
          <p className="mb-4 text-sm text-gray-600">User ID: {currentUser.uid}</p>
          <button
            onClick={handleSignOut}
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Display Name (for sign up)
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email@example.com"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
              />
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                onClick={handleSignIn}
                disabled={loading}
                className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Sign In'}
              </button>
              
              <button
                type="button"
                onClick={handleSignUp}
                disabled={loading}
                className="flex-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Sign Up'}
              </button>
            </div>
          </form>

          <div className="mt-4 space-y-2">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Sign In with Google'}
            </button>
            
            <button
              onClick={handlePasswordReset}
              className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm"
            >
              Reset Password
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {message && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {message}
        </div>
      )}
    </div>
  );
};

export default AuthExample;
