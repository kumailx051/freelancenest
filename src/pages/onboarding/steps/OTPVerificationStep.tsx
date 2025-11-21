import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Mail, RefreshCw } from 'lucide-react';

interface OTPVerificationStepProps {
  user: any;
  onNext: (data?: any) => void;
  onBack: () => void;
  onVerifyEmail: () => Promise<void>;
}

const OTPVerificationStep: React.FC<OTPVerificationStepProps> = ({ 
  user, 
  onNext, 
  onVerifyEmail 
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  // Get user info from localStorage
  const userEmail = localStorage.getItem('userEmail') || user?.email || '';
  const userName = localStorage.getItem('userName') || user?.name || '';

  // Timer for OTP expiration
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          otp: otpCode
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Email verified successfully!');
        await onVerifyEmail();
        setTimeout(() => {
          onNext();
        }, 1500);
      } else {
        setError(result.message || 'Invalid verification code');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    setIsResending(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          user_name: userName
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('New verification code sent to your email!');
        setTimeLeft(600); // Reset timer
        setCanResend(false);
        setOtp(['', '', '', '', '', '']); // Clear OTP inputs
      } else {
        setError(result.message || 'Failed to resend verification code');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-md mx-auto">
      <div className="w-20 h-20 bg-[#ffeee3] rounded-full flex items-center justify-center mb-6">
        {success ? (
          <CheckCircle size={40} className="text-green-500" />
        ) : (
          <Mail size={40} className="text-[#FF6B00]" />
        )}
      </div>

      <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
        Verify your email address
      </h2>
      
      <p className="text-gray-600 text-center mb-6">
        We've sent a 6-digit verification code to{' '}
        <span className="font-semibold text-gray-800">{userEmail}</span>
      </p>

      {/* Error Message */}
      {error && (
        <div className="w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          <div className="flex items-center">
            <AlertCircle size={20} className="mr-2" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="w-full bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
          <div className="flex items-center">
            <CheckCircle size={20} className="mr-2" />
            <p className="text-sm font-medium">{success}</p>
          </div>
        </div>
      )}

      {/* OTP Input Fields */}
      <div className="w-full mb-6">
        <div className="flex justify-center space-x-3 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value.replace(/[^0-9]/g, ''))}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-[#FF6B00] focus:outline-none transition-colors"
              disabled={isVerifying || !!success}
            />
          ))}
        </div>

        {/* Timer */}
        <div className="text-center mb-4">
          {timeLeft > 0 ? (
            <p className="text-sm text-gray-500">
              Code expires in: <span className="font-mono font-bold text-[#FF6B00]">{formatTime(timeLeft)}</span>
            </p>
          ) : (
            <p className="text-sm text-red-500 font-medium">
              Verification code has expired
            </p>
          )}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerifyOTP}
          disabled={isVerifying || otp.join('').length !== 6 || !!success}
          className="w-full bg-gradient-to-r from-[#FF6B00] to-[#FF9F45] hover:from-[#FF9F45] hover:to-[#FF6B00] text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Verifying...
            </div>
          ) : (
            'Verify Email'
          )}
        </button>
      </div>

      {/* Resend Section */}
      <div className="text-center space-y-2">
        <p className="text-sm text-gray-600">Didn't receive the code?</p>
        <button
          onClick={handleResendOTP}
          disabled={!canResend || isResending}
          className="flex items-center justify-center text-[#FF6B00] hover:text-[#FF9F45] font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isResending ? (
            <>
              <RefreshCw size={16} className="mr-1 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <RefreshCw size={16} className="mr-1" />
              {canResend ? 'Resend Code' : `Resend in ${formatTime(timeLeft)}`}
            </>
          )}
        </button>
      </div>

      {/* Skip Option */}
      <div className="mt-6 pt-4 border-t border-gray-200 w-full">
        <button
          onClick={() => onNext()}
          className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors duration-200"
        >
          I'll verify later
        </button>
      </div>
    </div>
  );
};

export default OTPVerificationStep;
