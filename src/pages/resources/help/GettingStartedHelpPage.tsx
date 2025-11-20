import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle, Link as LinkIcon, Layout } from 'lucide-react';

// Getting Started topics
const gettingStartedTopics = [
  {
    title: "Creating Your Account",
    description: "Learn how to set up your FreelanceNest account in minutes",
    icon: <FileText className="w-6 h-6" />,
    steps: [
      "Visit FreelanceNest.com and click on the 'Sign Up' button",
      "Choose between client or freelancer account type",
      "Enter your email and create a strong password",
      "Verify your email address through the confirmation link",
      "Complete your basic profile information"
    ]
  },
  {
    title: "Setting Up Your Profile",
    description: "Create a compelling profile that attracts clients",
    icon: <Layout className="w-6 h-6" />,
    steps: [
      "Upload a professional profile photo",
      "Write an engaging professional headline",
      "Craft a detailed overview of your skills and experience",
      "List your key skills and expertise areas",
      "Add your education and work history",
      "Upload portfolio samples to showcase your work"
    ]
  },
  {
    title: "Finding Your First Projects",
    description: "Discover projects that match your skills and expertise",
    icon: <LinkIcon className="w-6 h-6" />,
    steps: [
      "Navigate to the 'Find Work' section of the platform",
      "Use filters to narrow down projects in your expertise area",
      "Read project descriptions thoroughly before applying",
      "Write customized proposals addressing client needs",
      "Set realistic pricing for your services",
      "Follow up on your applications professionally"
    ]
  }
];

// Quick start guide steps
const quickStartSteps = [
  {
    number: 1,
    title: "Create Your Account",
    description: "Sign up for FreelanceNest with your email or social accounts",
    time: "2 minutes"
  },
  {
    number: 2,
    title: "Build Your Profile",
    description: "Add your skills, experience, and portfolio samples",
    time: "15 minutes"
  },
  {
    number: 3,
    title: "Verify Your Identity",
    description: "Complete identity verification for account security",
    time: "5 minutes"
  },
  {
    number: 4,
    title: "Set Up Payment Methods",
    description: "Add your preferred payment methods for receiving funds",
    time: "3 minutes"
  },
  {
    number: 5,
    title: "Find & Apply for Projects",
    description: "Browse available projects and submit your first proposals",
    time: "10+ minutes"
  }
];

// Video tutorials
const videoTutorials = [
  {
    title: "Complete Account Setup Guide",
    thumbnail: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    duration: "4:32",
    url: "#"
  },
  {
    title: "Creating a Standout Profile",
    thumbnail: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    duration: "7:15",
    url: "#"
  },
  {
    title: "Writing Winning Proposals",
    thumbnail: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    duration: "5:48",
    url: "#"
  }
];

// Success tips
const successTips = [
  "Complete your profile 100% - profiles with all sections completed receive 30% more client interest",
  "Add portfolio samples - freelancers with 5+ samples get twice as many interviews",
  "Set a professional profile photo - it increases response rates by 32%",
  "Be specific about your skills - detailed skill lists improve search visibility",
  "Get verified - completing identity and skill verifications builds client trust",
  "Start with competitive pricing - you can increase rates as you build reputation"
];

const GettingStartedHelpPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-r from-blue-500 to-blue-600">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/resources/help-center" 
              className="inline-flex items-center text-[#ffeee3] hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Help Center
            </Link>
            <div>
              <span className="bg-[#FF6B00]/30 text-white text-sm font-medium px-3 py-1 rounded-full">Help Center</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">Getting Started</h1>
              <p className="text-xl text-[#ffeee3] max-w-3xl">
                Everything you need to know to start your freelancing journey on FreelanceNest
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Guide Section */}
      <section className="py-16 -mt-8">
        <div className="section-container">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-[#2E2E2E] mb-6">Quick Start Guide</h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[39px] top-0 h-full w-0.5 bg-[#ffeee3]"></div>
              
              {/* Steps */}
              <div className="space-y-8">
                {quickStartSteps.map((step) => (
                  <div key={step.number} className="flex items-start">
                    <div className="bg-[#FF6B00] text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0 z-10">
                      {step.number}
                    </div>
                    <div className="ml-6 pt-3">
                      <h3 className="text-xl font-bold text-[#2E2E2E]">{step.title}</h3>
                      <p className="text-[#2E2E2E] mt-1">{step.description}</p>
                      <div className="mt-2 inline-block bg-[#ffeee3] text-[#FF6B00] text-sm px-3 py-1 rounded-full">
                        Estimated time: {step.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <Link 
                to="/signup" 
                className="inline-flex items-center justify-center px-6 py-3 bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium rounded-lg transition-colors"
              >
                Create Your Account Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Getting Started Topics */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Essential Getting Started Topics</h2>
            
            <div className="space-y-12">
              {gettingStartedTopics.map((topic, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="md:flex">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 md:w-1/3 text-white flex items-center">
                      <div>
                        <div className="bg-white/20 p-3 inline-block rounded-lg mb-4">
                          {topic.icon}
                        </div>
                        <h3 className="text-xl font-bold">{topic.title}</h3>
                        <p className="mt-2 text-[#ffeee3]">{topic.description}</p>
                      </div>
                    </div>
                    <div className="p-8 md:w-2/3">
                      <h4 className="text-lg font-semibold mb-4">Step-by-Step Guide:</h4>
                      <ol className="space-y-3">
                        {topic.steps.map((step, i) => (
                          <li key={i} className="flex items-start">
                            <div className="bg-[#ffeee3] rounded-full p-1 mr-3 flex-shrink-0 mt-1">
                              <CheckCircle className="w-4 h-4 text-[#FF6B00]" />
                            </div>
                            <span className="text-[#2E2E2E]">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Video Tutorials</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {videoTutorials.map((video, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#FF6B00] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2">{video.title}</h3>
                    <a 
                      href={video.url} 
                      className="text-[#FF6B00] hover:text-[#FF6B00] font-medium inline-flex items-center"
                    >
                      Watch Tutorial
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Tips */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-8">
            <h2 className="text-2xl font-bold mb-6">Tips for Success</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {successTips.map((tip, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-white/20 p-1 rounded-full mr-3 flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-[#ffeee3] rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">How long does it take to set up an account?</h3>
                <p className="text-[#2E2E2E]">
                  Basic account setup takes only 2-3 minutes. Completing your full profile with portfolio samples, 
                  skill verifications, and payment methods typically takes 15-30 minutes total.
                </p>
              </div>
              
              <div className="bg-[#ffeee3] rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Is FreelanceNest free to join?</h3>
                <p className="text-[#2E2E2E]">
                  Yes, creating an account on FreelanceNest is completely free. We only charge service fees when 
                  you successfully earn money through the platform. There are no upfront costs to join.
                </p>
              </div>
              
              <div className="bg-[#ffeee3] rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">What documents do I need for verification?</h3>
                <p className="text-[#2E2E2E]">
                  To verify your identity, you'll need a government-issued photo ID (such as a passport or driver's license) 
                  and sometimes a proof of address document. For payment setup, you may need your bank account details or 
                  relevant payment service information.
                </p>
              </div>
              
              <div className="bg-[#ffeee3] rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">How quickly can I start working?</h3>
                <p className="text-[#2E2E2E]">
                  Once your account is set up and verified, you can start applying for projects immediately. Many freelancers 
                  secure their first project within the first week, but this can vary based on your skills, proposal quality, 
                  and the demand in your field.
                </p>
              </div>
              
              <div className="bg-[#ffeee3] rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Can I use FreelanceNest on mobile devices?</h3>
                <p className="text-[#2E2E2E]">
                  Yes, FreelanceNest is fully responsive and works on mobile browsers. We also offer dedicated mobile apps 
                  for iOS and Android that provide a seamless experience for managing your freelance business on the go.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-[#2E2E2E] mb-8">
              Create your account now and join thousands of successful freelancers on FreelanceNest
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/signup" 
                className="px-6 py-3 bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium rounded-lg transition-colors"
              >
                Create Your Account
              </Link>
              <Link 
                to="/resources/help-center" 
                className="px-6 py-3 bg-white border border-[#ffeee3] hover:bg-[#ffeee3] text-[#2E2E2E] font-medium rounded-lg transition-colors"
              >
                Explore More Help Topics
              </Link>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-8">
              <Link 
                to="/resources/help/account-profile" 
                className="flex items-center text-[#FF6B00] hover:text-[#FF6B00] font-medium"
              >
                Next Topic: Account & Profile
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
              
              <span className="hidden sm:block text-[#ffeee3]">|</span>
              
              <Link 
                to="/contact-support" 
                className="flex items-center text-[#FF6B00] hover:text-[#FF6B00] font-medium"
              >
                Need Help? Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GettingStartedHelpPage;











