import React from 'react';
import HeroSection from '../components/common/HeroSection';
import HowItWorksSection from '../components/common/HowItWorksSection';
import KeyDifferentiatorsSection from '../components/common/KeyDifferentiatorsSection';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <KeyDifferentiatorsSection />
    </div>
  );
};

export default LandingPage;








