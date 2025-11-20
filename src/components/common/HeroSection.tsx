import React from 'react';
import { ArrowRight, Star, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-28 pt-32 md:pt-36">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero image.png"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#2E2E2E]/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 section-container text-center text-white my-auto">
        <div className="max-w-4xl mx-auto py-8 md:py-12">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-[#ffeee3]/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8 animate-fade-in">
            <Star className="w-4 h-4 mr-2 text-[#FF6B00]" />
            Trusted by 100k+ professionals worldwide
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-in">
            Connect with Top{' '}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#ffeee3] bg-clip-text text-transparent">
              Talent
            </span>{' '}
            Worldwide
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-[#ffeee3] mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-in">
            Find skilled freelancers for your next project or discover exciting opportunities with our AI-powered matching platform
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-in">
            <Link to="/signup">
              <Button 
                size="lg" 
                variant="primary"
                icon={Users}
                className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                Hire Talent
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                size="lg" 
                variant="secondary"
                icon={ArrowRight}
                iconPosition="right"
                className="bg-[#ffeee3]/10 hover:bg-[#ffeee3]/20 text-white border-[#ffeee3]/30 backdrop-blur-sm px-8 py-4 text-lg font-semibold"
              >
                Find Work
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto mt-4">
            <div className="text-center animate-fade-in">
              <div className="text-2xl md:text-3xl font-bold text-white mb-2">50k+</div>
              <div className="text-[#ffeee3] text-sm font-medium">Projects Completed</div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-2xl md:text-3xl font-bold text-white mb-2">99%</div>
              <div className="text-[#ffeee3] text-sm font-medium">Success Rate</div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-2xl md:text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-[#ffeee3] text-sm font-medium">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#FF6B00]/20 rounded-full blur-xl animate-bounce-subtle"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#FF9F45]/20 rounded-full blur-xl animate-bounce-subtle" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#ffeee3]/20 rounded-full blur-xl animate-bounce-subtle" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default HeroSection;
