import React, { useState } from 'react';
import { Search, Users, CheckCircle, MessageSquare, Trophy, Briefcase, Package } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'client' | 'freelancer'>('client');
  const [activeMode, setActiveMode] = useState<'project' | 'gig'>('project');

  const clientData = {
    project: [
      {
        icon: Briefcase,
        title: 'Post Your Project',
        description: 'Describe your project needs and requirements in detail',
        details: 'Create a comprehensive project brief with timeline, budget, and specific deliverables',
        color: 'from-[#2E2E2E] to-[#2E2E2E]'
      },
      {
        icon: Users,
        title: 'Review Proposals',
        description: 'Get matched with qualified freelancers and review their proposals',
        details: 'Our AI algorithm matches you with the best talent based on skills and project requirements',
        color: 'from-[#FF6B00] to-[#FF6B00]'
      },
      {
        icon: CheckCircle,
        title: 'Start Working',
        description: 'Choose your freelancer and begin your project with secure payments',
        details: 'Use our escrow system for secure payments and milestone-based project management',
        color: 'from-[#2E2E2E] to-[#2E2E2E]'
      }
    ],
    gig: [
      {
        icon: Search,
        title: 'Browse Gig Marketplace',
        description: 'Discover pre-packaged services from top freelancers',
        details: 'Filter by category, price range, delivery time, and ratings to find the perfect gig for your needs',
        color: 'from-[#2E2E2E] to-[#2E2E2E]'
      },
      {
        icon: Package,
        title: 'Select Gig Package',
        description: 'Choose from tiered service packages with clear deliverables',
        details: 'Compare package features and prices to find the perfect fit for your requirements and budget',
        color: 'from-[#FF6B00] to-[#FF6B00]'
      },
      {
        icon: CheckCircle,
        title: 'Purchase and Collaborate',
        description: 'Purchase the gig and work directly with the freelancer',
        details: 'Communicate requirements and receive updates through our streamlined collaboration system',
        color: 'from-[#2E2E2E] to-[#2E2E2E]'
      }
    ]
  };

  const freelancerData = {
    project: [
      {
        icon: Search,
        title: 'Browse Projects',
        description: 'Find projects that match your skills and interests',
        details: 'Use advanced filters to find projects that fit your expertise and availability',
        color: 'from-[#2E2E2E] to-[#2E2E2E]'
      },
      {
        icon: MessageSquare,
        title: 'Submit Proposals',
        description: 'Write compelling proposals that showcase your expertise',
        details: 'Use our AI-powered proposal assistant to craft winning submissions',
        color: 'from-[#FF6B00] to-[#FF6B00]'
      },
      {
        icon: Trophy,
        title: 'Deliver Excellence',
        description: 'Complete projects and build your reputation on the platform',
        details: 'Earn positive reviews and build long-term client relationships',
        color: 'from-[#2E2E2E] to-[#2E2E2E]'
      }
    ],
    gig: [
      {
        icon: Package,
        title: 'Create Gig Packages',
        description: 'Design appealing service packages with clear deliverables',
        details: 'Create Basic, Standard, and Premium tiers with increasing value and price points',
        color: 'from-[#2E2E2E] to-[#2E2E2E]'
      },
      {
        icon: Users,
        title: 'Optimize Visibility',
        description: 'Enhance your gig listings with SEO and rich media',
        details: 'Use keywords, portfolio samples, and testimonials to make your gigs stand out in search results',
        color: 'from-[#FF6B00] to-[#FF6B00]'
      },
      {
        icon: CheckCircle,
        title: 'Fulfill Orders Efficiently',
        description: 'Streamline delivery with templates and automation',
        details: 'Build a repeatable process to deliver consistent quality and earn stellar reviews',
        color: 'from-[#2E2E2E] to-[#2E2E2E]'
      }
    ]
  };

  const getCurrentData = () => {
    if (activeTab === 'client') {
      return activeMode === 'project' ? clientData.project : clientData.gig;
    } else {
      return activeMode === 'project' ? freelancerData.project : freelancerData.gig;
    }
  };

  const currentSteps = getCurrentData();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B00] to-[#FF6B00]">
            How It Works
          </h2>
          <p className="text-xl text-[#2E2E2E] max-w-3xl mx-auto">
            Join thousands of successful projects and gigs completed on our platform
          </p>
        </div>

        {/* Main Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#ffeee3] p-1.5 rounded-xl shadow-lg inline-flex">
            <button
              onClick={() => setActiveTab('client')}
              className={`px-8 py-3.5 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'client'
                  ? 'bg-[#FF6B00] text-white shadow-md'
                  : 'bg-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3]'
              }`}
            >
              For Clients
            </button>
            <button
              onClick={() => setActiveTab('freelancer')}
              className={`px-8 py-3.5 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'freelancer'
                  ? 'bg-[#FF6B00] text-white shadow-md'
                  : 'bg-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3]'
              }`}
            >
              For Freelancers
            </button>
          </div>
        </div>

        {/* Secondary Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex rounded-lg bg-[#ffeee3] p-1">
            <button
              onClick={() => setActiveMode('project')}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeMode === 'project'
                  ? 'bg-[#FF6B00] shadow-sm text-white'
                  : 'text-[#2E2E2E] hover:text-[#2E2E2E]'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveMode('gig')}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeMode === 'gig'
                  ? 'bg-[#FF6B00] shadow-sm text-white'
                  : 'text-[#2E2E2E] hover:text-[#2E2E2E]'
              }`}
            >
              Gigs
            </button>
          </div>
        </div>

        {/* Steps - Modern Card Layout */}
        <div className="relative">
          {/* Steps Connection Line */}
          <div className="hidden lg:block absolute top-1/3 left-0 right-0 h-0.5 bg-[#ffeee3] z-0"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 relative z-10">
            {currentSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="group"
                >
                  <div className="bg-[#ffeee3] rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-full">
                    {/* Step Header with Gradient */}
                    <div className={`bg-gradient-to-r ${step.color} p-6 relative`}>
                      <div className="flex items-center justify-between">
                        <div className="bg-[#ffeee3]/20 backdrop-blur-sm rounded-full p-3">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <span className="bg-[#ffeee3] rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold text-[#2E2E2E]">
                          {index + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mt-4">
                        {step.title}
                      </h3>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="font-medium text-[#2E2E2E] mb-4">
                        {step.description}
                      </p>
                      <p className="text-[#2E2E2E]/80 text-sm">
                        {step.details}
                      </p>
                      
                      {/* Removed the unnecessary arrow */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-[#FF6B00] rounded-2xl p-8 shadow-md">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold text-white mb-4">
              Ready to get started?
            </h3>
            <p className="text-white/90 mb-8">
              Join our growing community of successful clients and freelancers today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3.5 bg-[#ffeee3] text-[#2E2E2E] font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                {activeTab === 'client' 
                  ? (activeMode === 'project' ? 'Post a Project' : 'Browse Gigs') 
                  : (activeMode === 'project' ? 'Find Projects' : 'Create a Gig')}
              </button>
              <button className="px-8 py-3.5 bg-[#ffeee3] text-[#2E2E2E] font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
