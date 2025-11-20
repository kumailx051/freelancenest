import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OnboardingCompleteProps {
  user: any;
  onNext: (data?: any) => void;
  onBack: () => void;
}

const OnboardingComplete: React.FC<OnboardingCompleteProps> = ({ 
  user,
  onBack 
}) => {
  const navigate = useNavigate();
  const accountType = user.accountType;

  const handleLoginToAccount = () => {
    // Clear any temporary onboarding data from localStorage
    localStorage.removeItem('onboardingComplete');
    
    // Navigate to the login page
    navigate('/login');
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 bg-[#ffeee3] rounded-full flex items-center justify-center mb-6 animate-bounce">
        <Check size={40} className="text-[#FF6B00]" />
      </div>

      <h2 className="text-2xl font-bold mb-4 text-center">Your account is ready!</h2>
      <p className="text-[#2E2E2E] text-center max-w-lg mb-8">
        {accountType === 'freelancer' 
          ? "You're all set to start finding work and growing your freelance career."
          : "You're all set to start finding and hiring talented freelancers for your projects."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl mb-8">
        {accountType === 'freelancer' ? (
          // Freelancer next steps
          <>
            <div className="bg-[#ffeee3] p-5 rounded-lg text-center">
              <div className="w-10 h-10 bg-[#ffeee3] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-[#FF6B00] font-bold">1</span>
              </div>
              <h3 className="font-medium mb-2">Browse Projects</h3>
              <p className="text-sm text-[#2E2E2E]">Find work that matches your skills and interests</p>
            </div>
            <div className="bg-[#ffeee3] p-5 rounded-lg text-center">
              <div className="w-10 h-10 bg-[#ffeee3] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-[#FF6B00] font-bold">2</span>
              </div>
              <h3 className="font-medium mb-2">Submit Proposals</h3>
              <p className="text-sm text-[#2E2E2E]">Apply to jobs with compelling proposals</p>
            </div>
            <div className="bg-[#ffeee3] p-5 rounded-lg text-center">
              <div className="w-10 h-10 bg-[#ffeee3] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-[#FF6B00] font-bold">3</span>
              </div>
              <h3 className="font-medium mb-2">Get Hired</h3>
              <p className="text-sm text-[#2E2E2E]">Start working and building your reputation</p>
            </div>
          </>
        ) : (
          // Client next steps
          <>
            <div className="bg-[#ffeee3] p-5 rounded-lg text-center">
              <div className="w-10 h-10 bg-[#ffeee3] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-[#FF6B00] font-bold">1</span>
              </div>
              <h3 className="font-medium mb-2">Post a Job</h3>
              <p className="text-sm text-[#2E2E2E]">Describe what you need and set your budget</p>
            </div>
            <div className="bg-[#ffeee3] p-5 rounded-lg text-center">
              <div className="w-10 h-10 bg-[#ffeee3] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-[#FF6B00] font-bold">2</span>
              </div>
              <h3 className="font-medium mb-2">Review Proposals</h3>
              <p className="text-sm text-[#2E2E2E]">Compare qualified freelancers who respond</p>
            </div>
            <div className="bg-[#ffeee3] p-5 rounded-lg text-center">
              <div className="w-10 h-10 bg-[#ffeee3] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-[#FF6B00] font-bold">3</span>
              </div>
              <h3 className="font-medium mb-2">Hire & Collaborate</h3>
              <p className="text-sm text-[#2E2E2E]">Choose the best talent and start working together</p>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
        <button
          onClick={onBack}
          className="order-2 md:order-1 w-full md:w-auto border border-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3] font-medium px-8 py-3 rounded-lg transition-colors duration-300"
        >
          Back
        </button>
        <button
          onClick={handleLoginToAccount}
          className="order-1 md:order-2 w-full md:flex-1 bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium px-8 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
        >
          Login Your Account
          <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default OnboardingComplete;












