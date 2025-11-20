import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface EmailVerificationStepProps {
  user: any;
  onNext: (data?: any) => void;
  onBack: () => void;
  onVerifyEmail: () => void;
}

const EmailVerificationStep: React.FC<EmailVerificationStepProps> = ({ 
  user, 
  onNext, 
  onVerifyEmail 
}) => {
  const [verificationSent, setVerificationSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // In a real app, this would connect to your auth system
  const handleSendVerification = () => {
    setIsVerifying(true);
    
    // Simulate API call
    setTimeout(() => {
      setVerificationSent(true);
      setIsVerifying(false);
    }, 1500);
  };

  // Simulate verification
  const handleVerify = () => {
    setIsVerifying(true);
    
    // Simulate API verification
    setTimeout(() => {
      onVerifyEmail();
      setIsVerifying(false);
      onNext();
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 bg-[#ffeee3] rounded-full flex items-center justify-center mb-6">
        {user.emailVerified ? (
          <CheckCircle size={40} className="text-[#FF6B00]" />
        ) : (
          <AlertCircle size={40} className="text-[#FF6B00]" />
        )}
      </div>

      <h2 className="text-2xl font-bold mb-2 text-center">Verify your email address</h2>
      <p className="text-[#2E2E2E] text-center max-w-md mb-8">
        We've sent a verification link to <strong>{user.email}</strong>.
        Please check your inbox and verify your email to continue.
      </p>

      {user.emailVerified ? (
        <div className="flex flex-col items-center">
          <div className="flex items-center text-[#FF6B00] mb-6">
            <CheckCircle size={24} className="mr-2" />
            <span className="font-medium">Email verified successfully!</span>
          </div>
          
          <button
            onClick={() => onNext()}
            className="w-full md:w-auto bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium px-8 py-3 rounded-lg transition-colors duration-300"
          >
            Continue
          </button>
        </div>
      ) : (
        <div className="space-y-4 w-full max-w-md">
          <button
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full bg-[#FF6B00] hover:bg-[#FF9F45] disabled:bg-[#FF6B00] text-white font-medium px-8 py-3 rounded-lg transition-colors duration-300 flex justify-center items-center"
          >
            {isVerifying ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </>
            ) : (
              "I've verified my email"
            )}
          </button>
          
          <div className="text-center">
            <p className="text-[#2E2E2E] mb-2">Didn't receive the email?</p>
            <button 
              onClick={handleSendVerification} 
              disabled={isVerifying || verificationSent}
              className="text-[#FF6B00] hover:text-[#2E2E2E] font-medium"
            >
              {verificationSent ? 'Verification email sent!' : 'Resend verification email'}
            </button>
          </div>
          
          <div className="border-t border-[#ffeee3] pt-4 mt-4">
            <button
              onClick={() => onNext()}
              className="w-full text-[#ffeee3] hover:text-[#2E2E2E] font-medium py-2 transition-colors duration-200"
            >
              I'll verify later
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailVerificationStep;











