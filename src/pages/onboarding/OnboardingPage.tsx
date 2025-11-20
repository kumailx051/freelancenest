import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronRight } from 'lucide-react';
import OTPVerificationStep from './steps/OTPVerificationStep';
import FreelancerProfileStep from './steps/freelancer/FreelancerProfileStep';
import FreelancerSkillsStep from './steps/freelancer/FreelancerSkillsStep';
import FreelancerPortfolioStep from './steps/freelancer/FreelancerPortfolioStep';
import ClientProfileStep from './steps/client/ClientProfileStep';
import ClientPreferencesStep from './steps/client/ClientPreferencesStep';
import ClientPaymentStep from './steps/client/ClientPaymentStep';
import OnboardingComplete from './steps/OnboardingComplete';

// Get user info from localStorage or fallback to defaults
const getUserFromStorage = () => {
  const userId = localStorage.getItem('userId') || '1234';
  const userName = localStorage.getItem('userName') || 'User';
  const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
  const accountType = localStorage.getItem('accountType') || 'freelancer';
  
  return {
    id: userId,
    name: userName,
    email: userEmail,
    accountType: accountType,
    emailVerified: false,
  };
};

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [user, setUser] = useState(() => getUserFromStorage());
  const [progress, setProgress] = useState(0);
  const [stepTransitioning, setStepTransitioning] = useState(false);
  
  // Define steps based on account type
  const freelancerSteps = [
    { id: 'verify', title: 'Verify Email', component: OTPVerificationStep as React.ComponentType<any> },
    { id: 'profile', title: 'Complete Profile', component: FreelancerProfileStep as React.ComponentType<any> },
    { id: 'skills', title: 'Skills', component: FreelancerSkillsStep as React.ComponentType<any> },
    { id: 'portfolio', title: 'Portfolio', component: FreelancerPortfolioStep as React.ComponentType<any> },
    { id: 'complete', title: 'Complete', component: OnboardingComplete as React.ComponentType<any> },
  ];

  const clientSteps = [
    { id: 'verify', title: 'Verify Email', component: OTPVerificationStep },
    { id: 'profile', title: 'Company Profile', component: ClientProfileStep },
    { id: 'preferences', title: 'Project Preferences', component: ClientPreferencesStep },
    { id: 'payment', title: 'Payment Setup', component: ClientPaymentStep as React.ComponentType<any> },
    { id: 'complete', title: 'Complete', component: OnboardingComplete },
  ];

  const steps = user.accountType === 'freelancer' ? freelancerSteps : clientSteps;

  // Check if account type exists and redirect if not
  useEffect(() => {
    const accountType = localStorage.getItem('accountType');
    if (!accountType) {
      navigate('/account-type');
    }
  }, [navigate]);

  // Update progress whenever current step changes
  useEffect(() => {
    const newProgress = ((currentStep) / (steps.length - 1)) * 100;
    setProgress(newProgress);
  }, [currentStep, steps.length]);
  
  // Listen for changes to accountType in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const accountType = localStorage.getItem('accountType');
      if (accountType && accountType !== user.accountType) {
        setUser(prev => ({ ...prev, accountType }));
        // Reset to first step when account type changes
        setCurrentStep(0);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user.accountType]);

  // Mock function to verify email
  const verifyEmail = () => {
    setUser((prev) => ({ ...prev, emailVerified: true }));
  };

  // Handle next step transition
  const handleNextStep = (data = {}) => {
    // Save step data (in a real app, you would send this to your backend)
    console.log(`Step ${currentStep} data:`, data);

    // Animate the transition
    setStepTransitioning(true);
    setTimeout(() => {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      setStepTransitioning(false);
    }, 300);
  };

  // Handle previous step transition
  const handlePrevStep = () => {
    if (currentStep === 0) return;

    // Animate the transition
    setStepTransitioning(true);
    setTimeout(() => {
      setCurrentStep((prev) => Math.max(prev - 1, 0));
      setStepTransitioning(false);
    }, 300);
  };

  // Handle skipping to dashboard
  const handleSkipToDashboard = () => {
    navigate('/dashboard');
  };

  // Current step component
  const CurrentStepComponent = steps[currentStep].component as React.ComponentType<any>;

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-10">
        <div className="section-container py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-[#2E2E2E]">FreelanceNest</div>
            <button 
              onClick={handleSkipToDashboard}
              className="text-[#FF6B00] hover:text-[#2E2E2E] font-medium text-sm flex items-center"
            >
              Skip to dashboard
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </header>

      <div className="pt-20 pb-16">
        <div className="section-container">
          {/* Progress Bar */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">Setup your account</h2>
              <span className="text-[#ffeee3] font-medium">{Math.round(progress)}% complete</span>
            </div>
            
            <div className="h-1.5 w-full bg-[#ffeee3] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#FF6B00] rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between mt-4">
              {steps.slice(0, -1).map((step, index) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center"
                  style={{ width: `${100 / (steps.length - 1)}%` }}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-300
                      ${index < currentStep ? 'bg-[#FF6B00] text-white' : 
                        index === currentStep ? 'bg-[#FF6B00] text-white ring-4 ring-blue-100' : 
                        'bg-[#ffeee3] text-[#ffeee3]'}`}
                  >
                    {index < currentStep ? (
                      <CheckCircle size={16} className="text-white" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className={`text-xs font-medium hidden md:block ${
                    index <= currentStep ? 'text-[#FF6B00]' : 'text-[#ffeee3]'
                  }`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
            <div className={`transition-opacity duration-300 ${stepTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <CurrentStepComponent 
                user={user}
                onNext={handleNextStep}
                onBack={handlePrevStep}
                onVerifyEmail={verifyEmail}
                isLastStep={currentStep === steps.length - 1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;











