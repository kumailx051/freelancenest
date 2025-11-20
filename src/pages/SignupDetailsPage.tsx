import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import bgImage from '../assets/images/hero image.png';

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountType: string;
  termsAccepted: boolean;
  marketingOptIn: boolean;
}

const SignupDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Get signup data from localStorage
  const [signupData, setSignupData] = useState<SignupData | null>(null);
  
  // Form state for professional details
  const [detailsData, setDetailsData] = useState({
    jobTitle: '',
    specialization: '',
    companyName: '',
    skills: [] as string[]
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get signup data from localStorage
    const storedData = localStorage.getItem('signupData');
    if (storedData) {
      const parsedData = JSON.parse(storedData) as SignupData;
      setSignupData(parsedData);
    } else {
      // If no signup data, redirect back to signup
      navigate('/signup');
    }
  }, [navigate]);

  // Handle skill selection
  const handleSkillSelect = (skill: string) => {
    if (detailsData.skills.includes(skill)) {
      setDetailsData({
        ...detailsData,
        skills: detailsData.skills.filter(s => s !== skill)
      });
    } else {
      setDetailsData({
        ...detailsData,
        skills: [...detailsData.skills, skill]
      });
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetailsData({
      ...detailsData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Combine signup data with details data
    const completeSignupData = {
      ...signupData,
      ...detailsData
    };
    
    try {
      // Here you would normally send data to your backend
      console.log('Complete signup data:', completeSignupData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear localStorage
      localStorage.removeItem('signupData');
      
      // Navigate to success page or dashboard
      navigate('/account-type');
      
    } catch (error) {
      console.error('Signup error:', error);
      alert('There was an error creating your account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Go back to previous step
  const handleBack = () => {
    navigate('/signup');
  };

  // Sample skills for selection
  const skillOptions = [
    'Web Development', 'Mobile Development', 'UI/UX Design', 
    'Graphic Design', 'Content Writing', 'SEO', 'Digital Marketing',
    'Data Analysis', 'Video Editing', 'Translation', 'Photography',
    'Social Media Marketing', 'WordPress', 'E-commerce', 'Branding',
    'Logo Design', 'Animation', 'Voice Over', 'Music Production'
  ];

  if (!signupData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Details Form */}
      <div className="w-full lg:w-1/2 p-6 md:p-12 flex flex-col bg-white">
        <div className="max-w-md w-full mx-auto">
          {/* Logo Text */}
          <div className="mb-8 text-center">
            <span className="text-3xl font-bold text-[#2E2E2E]">Freelance<span className="text-[#FF6B00]">Nest</span></span>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-[#2E2E2E]">Almost There!</h1>
            <p className="text-gray-600">
              {signupData.accountType === 'freelancer' 
                ? 'Tell us about your professional skills' 
                : 'Tell us about your business needs'
              }
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex-1 h-2 rounded-full bg-[#FF6B00] mr-2"></div>
            <div className="flex-1 h-2 rounded-full bg-[#FF6B00]"></div>
          </div>

          {/* Details Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {signupData.accountType === 'freelancer' ? (
              // Freelancer specific fields
              <>
                <div className="space-y-1">
                  <label htmlFor="jobTitle" className="block text-sm font-semibold text-gray-700">
                    Professional Title
                  </label>
                  <input
                    id="jobTitle"
                    name="jobTitle"
                    type="text"
                    value={detailsData.jobTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-all duration-200"
                    placeholder="e.g. Full Stack Developer"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="specialization" className="block text-sm font-semibold text-gray-700">
                    Main Specialization
                  </label>
                  <select
                    id="specialization"
                    name="specialization"
                    value={detailsData.specialization}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">Select your specialization</option>
                    <option value="webDevelopment">Web Development</option>
                    <option value="mobileDevelopment">Mobile Development</option>
                    <option value="uiUxDesign">UI/UX Design</option>
                    <option value="graphicDesign">Graphic Design</option>
                    <option value="contentWriting">Content Writing</option>
                    <option value="digitalMarketing">Digital Marketing</option>
                    <option value="videoEditing">Video Editing</option>
                    <option value="dataAnalysis">Data Analysis</option>
                    <option value="translation">Translation</option>
                    <option value="photography">Photography</option>
                    <option value="animation">Animation</option>
                    <option value="voiceOver">Voice Over</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Your Skills
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {detailsData.skills.map(skill => (
                      <div 
                        key={skill} 
                        className="bg-orange-100 text-[#FF6B00] px-3 py-1 rounded-full text-sm flex items-center font-medium"
                      >
                        {skill}
                        <button 
                          type="button" 
                          onClick={() => handleSkillSelect(skill)}
                          className="ml-2 text-[#FF6B00] hover:text-red-500 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="border border-gray-300 rounded-lg p-3 max-h-48 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2">
                      {skillOptions.map(skill => (
                        <div 
                          key={skill}
                          onClick={() => handleSkillSelect(skill)}
                          className={`px-3 py-2 rounded-md cursor-pointer text-sm transition-all duration-200 ${
                            detailsData.skills.includes(skill) 
                              ? 'bg-orange-100 text-[#FF6B00] font-medium' 
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Select at least 3 skills that represent your strengths
                  </p>
                </div>
              </>
            ) : (
              // Client specific fields
              <>
                <div className="space-y-1">
                  <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700">
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={detailsData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-all duration-200"
                    placeholder="Your company name"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="specialization" className="block text-sm font-semibold text-gray-700">
                    Industry
                  </label>
                  <select
                    id="specialization"
                    name="specialization"
                    value={detailsData.specialization}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">Select your industry</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="education">Education</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="consulting">Consulting</option>
                    <option value="nonprofit">Non-profit</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Services You Need
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {detailsData.skills.map(service => (
                      <div 
                        key={service} 
                        className="bg-orange-100 text-[#FF6B00] px-3 py-1 rounded-full text-sm flex items-center font-medium"
                      >
                        {service}
                        <button 
                          type="button" 
                          onClick={() => handleSkillSelect(service)}
                          className="ml-2 text-[#FF6B00] hover:text-red-500 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="border border-gray-300 rounded-lg p-3 max-h-48 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2">
                      {skillOptions.map(service => (
                        <div 
                          key={service}
                          onClick={() => handleSkillSelect(service)}
                          className={`px-3 py-2 rounded-md cursor-pointer text-sm transition-all duration-200 ${
                            detailsData.skills.includes(service) 
                              ? 'bg-orange-100 text-[#FF6B00] font-medium' 
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          {service}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Select services you're interested in hiring for
                  </p>
                </div>
              </>
            )}

            {/* Navigation buttons */}
            <div className="flex gap-3 pt-6">
              <button
                type="button"
                onClick={handleBack}
                className="w-1/2 border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg transition-all duration-200 font-semibold"
              >
                Back
              </button>
              
              <button
                type="submit"
                disabled={isLoading || (signupData.accountType === 'freelancer' && detailsData.skills.length < 3)}
                className="w-1/2 bg-gradient-to-r from-[#FF6B00] to-[#FF9F45] hover:from-[#FF9F45] hover:to-[#FF6B00] text-white py-3 rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
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
          <h2 className="text-4xl font-bold mb-6">
            {signupData.accountType === 'freelancer' 
              ? `Welcome ${signupData.firstName}! Let's showcase your talents.`
              : `Welcome ${signupData.firstName}! Let's find the perfect talent for you.`
            }
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            {signupData.accountType === 'freelancer' 
              ? 'Complete your profile to start finding amazing projects and clients who need your skills.'
              : 'Complete your profile to start posting projects and finding the best freelancers for your needs.'
            }
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

export default SignupDetailsPage;
