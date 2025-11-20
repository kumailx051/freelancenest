import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Package, Users, Award, Check, Star } from 'lucide-react';

const WaysToEarnPage: React.FC = () => {
  const [hours, setHours] = useState(20);
  const [skillLevel, setSkillLevel] = useState('Entry Level');
  const [category, setCategory] = useState('Web Development');
  const [customHourlyRate, setCustomHourlyRate] = useState('');
  const [customProjectRate, setCustomProjectRate] = useState('');
  const [useCustomRates, setUseCustomRates] = useState(false);

  // Earning calculation logic
  const calculateEarnings = () => {
    let minHourly, maxHourly, minProject, maxProject;

    if (useCustomRates && customHourlyRate) {
      // Use custom hourly rate
      const hourlyRate = parseFloat(customHourlyRate);
      minHourly = hourlyRate;
      maxHourly = hourlyRate;
    } else {
      // Use calculated rates based on skill level and category
      const skillMultipliers = {
        'Entry Level': { min: 15, max: 25 },
        'Intermediate': { min: 25, max: 45 },
        'Expert': { min: 45, max: 80 }
      };

      const categoryMultipliers = {
        'Web Development': 1.2,
        'Design': 1.0,
        'Writing': 0.8,
        'Marketing': 1.1,
        'Video & Animation': 1.3,
        'Admin Support': 0.7
      };

      const baseRates = skillMultipliers[skillLevel as keyof typeof skillMultipliers];
      const categoryMultiplier = categoryMultipliers[category as keyof typeof categoryMultipliers];
      
      minHourly = Math.round(baseRates.min * categoryMultiplier);
      maxHourly = Math.round(baseRates.max * categoryMultiplier);
    }

    if (useCustomRates && customProjectRate) {
      // Use custom project rate
      const projectRate = parseFloat(customProjectRate);
      minProject = projectRate;
      maxProject = projectRate;
    } else {
      // Calculate project rates based on hourly rates
      minProject = Math.round(minHourly * 20);
      maxProject = Math.round(maxHourly * 30);
    }
    
    const weeksPerMonth = 4.33;
    
    // Calculate monthly potential with mixed approach (hourly + project work)
    // Assume 70% hourly work and 30% project work for more realistic estimates
    const hourlyWorkPercentage = 0.7;
    const projectWorkPercentage = 0.3;
    
    // Monthly from hourly work
    const monthlyFromHourly = Math.round(minHourly * hours * weeksPerMonth * hourlyWorkPercentage);
    const monthlyFromHourlyMax = Math.round(maxHourly * hours * weeksPerMonth * hourlyWorkPercentage);
    
    // Monthly from project work (assuming 1-2 projects per month)
    const projectsPerMonth = 1.5; // Average projects per month
    const monthlyFromProjects = Math.round(minProject * projectsPerMonth * projectWorkPercentage);
    const monthlyFromProjectsMax = Math.round(maxProject * projectsPerMonth * projectWorkPercentage);
    
    // Combined monthly potential
    const minMonthly = monthlyFromHourly + monthlyFromProjects;
    const maxMonthly = monthlyFromHourlyMax + monthlyFromProjectsMax;

    return {
      hourlyMin: minHourly,
      hourlyMax: maxHourly,
      monthlyMin: minMonthly,
      monthlyMax: maxMonthly,
      projectMin: minProject,
      projectMax: maxProject
    };
  };

  const earnings = calculateEarnings();

  return (
    <>
      <style>
        {`
          .range-slider::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #FF6B00;
            cursor: pointer;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          .range-slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #FF6B00;
            cursor: pointer;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
        `}
      </style>
      <div className="min-h-screen bg-[#ffeee3]/30">
      {/* Hero Section */}
      <section className="pt-40 pb-16 relative">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#2E2E2E]/90"></div>
        </div>
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ways to <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Earn</span>
            </h1>
            <p className="text-xl text-[#ffeee3] mb-4">
              Discover multiple income streams and opportunities on FreelanceNest.
            </p>
          </div>
        </div>
      </section>

      {/* Income Streams Section */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">Multiple Ways to <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Generate</span> Income</h2>
            <p className="text-xl text-[#2E2E2E]">
              FreelanceNest offers various paths to earn money based on your skills and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Bids */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300 border border-[#ffeee3] hover:border-[#FF6B00]/20">
              <div className="h-3 bg-[#FF6B00]"></div>
              <div className="p-8">
                <div className="bg-[#ffeee3] text-[#FF6B00] p-3 inline-block rounded-lg mb-6">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2E2E2E] group-hover:text-[#FF6B00] transition-colors duration-300">
                  Project Bidding
                </h3>
                <p className="text-[#2E2E2E] mb-6">
                  Browse available projects and submit competitive proposals to win work that matches your skills and interests.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FF6B00] mr-2 shrink-0 mt-0.5" />
                    <span className="text-[#2E2E2E]">Thousands of projects posted daily</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FF6B00] mr-2 shrink-0 mt-0.5" />
                    <span className="text-[#2E2E2E]">Set your own rates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FF6B00] mr-2 shrink-0 mt-0.5" />
                    <span className="text-[#2E2E2E]">Develop long-term client relationships</span>
                  </li>
                </ul>
                <Link to="/ways-to-earn/project-bidding" className="w-full bg-white border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] font-medium py-2 rounded transition-colors duration-200 inline-block text-center">
                  Find Projects
                </Link>
              </div>
            </div>

            {/* Service Packages */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300 border border-[#ffeee3] hover:border-[#FF6B00]/20">
              <div className="h-3 bg-[#FF6B00]"></div>
              <div className="p-8">
                <div className="bg-[#ffeee3] text-[#FF6B00] p-3 inline-block rounded-lg mb-6">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2E2E2E] group-hover:text-[#FF6B00] transition-colors duration-300">
                  Service Packages
                </h3>
                <p className="text-[#2E2E2E] mb-6">
                  Create pre-defined service packages with clear deliverables and fixed pricing to attract clients looking for specific solutions.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FF6B00] mr-2 shrink-0 mt-0.5" />
                    <span className="text-[#2E2E2E]">Higher visibility in marketplace</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FF6B00] mr-2 shrink-0 mt-0.5" />
                    <span className="text-[#2E2E2E]">Streamlined workflow for repeat services</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FF6B00] mr-2 shrink-0 mt-0.5" />
                    <span className="text-[#2E2E2E]">Offer tiered pricing options</span>
                  </li>
                </ul>
                <Link to="/ways-to-earn/service-packages" className="w-full bg-white border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] font-medium py-2 rounded transition-colors duration-200 inline-block text-center">
                  Create Packages
                </Link>
              </div>
            </div>

            {/* Project Collaboration */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300 border border-[#ffeee3] hover:border-[#FF6B00]/20">
              <div className="h-3 bg-[#FF6B00]"></div>
              <div className="p-8">
                <div className="bg-[#ffeee3] text-[#FF6B00] p-3 inline-block rounded-lg mb-6">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2E2E2E] group-hover:text-[#FF6B00] transition-colors duration-300">
                  Project Collaboration
                </h3>
                <p className="text-[#2E2E2E] mb-6">
                  Team up with other freelancers to tackle larger projects and offer comprehensive solutions to clients.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FF6B00] mr-2 shrink-0 mt-0.5" />
                    <span className="text-[#2E2E2E]">Access to bigger projects</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FF6B00] mr-2 shrink-0 mt-0.5" />
                    <span className="text-[#2E2E2E]">Expand your service offerings</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FF6B00] mr-2 shrink-0 mt-0.5" />
                    <span className="text-[#2E2E2E]">Build your professional network</span>
                  </li>
                </ul>
                <Link to="/ways-to-earn/project-collaboration" className="w-full bg-white border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] font-medium py-2 rounded transition-colors duration-200 inline-block text-center">
                  Find Collaborators
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Income Opportunities */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">Additional <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Earning</span> Opportunities</h2>
            <p className="text-xl text-[#2E2E2E]">
              Expand your income potential with these specialized opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Skill Certification */}
            <div className="bg-[#ffeee3]/50 rounded-xl p-8 flex flex-col md:flex-row gap-6 items-start hover:bg-[#ffeee3]/70 transition-colors duration-300">
              <div className="bg-[#ffeee3] text-[#FF6B00] p-3 rounded-lg">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Skill Certification</h3>
                <p className="text-[#2E2E2E] mb-4">
                  Get certified in your areas of expertise and earn by creating assessment tests for your skills. You'll receive compensation each time a freelancer takes your test.
                </p>
                <Link to="/ways-to-earn/skill-certification" className="text-[#FF6B00] font-medium hover:text-[#2E2E2E] hover:underline flex items-center transition-colors">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Referral Program */}
            <div className="bg-[#ffeee3]/50 rounded-xl p-8 flex flex-col md:flex-row gap-6 items-start hover:bg-[#ffeee3]/70 transition-colors duration-300">
              <div className="bg-[#ffeee3] text-[#FF6B00] p-3 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Referral Program</h3>
                <p className="text-[#2E2E2E] mb-4">
                  Invite other freelancers or clients to FreelanceNest and earn a percentage of platform fees when they complete projects. The more successful your referrals are, the more you earn.
                </p>
                <Link to="/ways-to-earn/referral-program" className="text-[#FF6B00] font-medium hover:text-[#2E2E2E] hover:underline flex items-center transition-colors">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Community Contributions */}
            <div className="bg-[#ffeee3]/50 rounded-xl p-8 flex flex-col md:flex-row gap-6 items-start hover:bg-[#ffeee3]/70 transition-colors duration-300">
              <div className="bg-[#ffeee3] text-[#FF6B00] p-3 rounded-lg">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Community Contributions</h3>
                <p className="text-[#2E2E2E] mb-4">
                  Create tutorials, write articles, or answer questions in our community forum. Top contributors receive recognition and financial rewards each month.
                </p>
                <Link to="/ways-to-earn/community-contributions" className="text-[#FF6B00] font-medium hover:text-[#2E2E2E] hover:underline flex items-center transition-colors">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Enterprise Solutions */}
            <div className="bg-[#ffeee3]/50 rounded-xl p-8 flex flex-col md:flex-row gap-6 items-start hover:bg-[#ffeee3]/70 transition-colors duration-300">
              <div className="bg-[#ffeee3] text-[#FF6B00] p-3 rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Enterprise Solutions</h3>
                <p className="text-[#2E2E2E] mb-4">
                  Get matched with enterprise-level clients looking for long-term partnerships. These projects typically have higher budgets and more stability.
                </p>
                <Link to="/ways-to-earn/enterprise-freelancing" className="text-[#FF6B00] font-medium hover:text-[#2E2E2E] hover:underline flex items-center transition-colors">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Freelancer Competitions */}
            <div className="bg-[#ffeee3]/50 rounded-xl p-8 flex flex-col md:flex-row gap-6 items-start hover:bg-[#ffeee3]/70 transition-colors duration-300">
              <div className="bg-[#ffeee3] text-[#FF6B00] p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Freelancer Competitions</h3>
                <p className="text-[#2E2E2E] mb-4">
                  Showcase your skills in competitions sponsored by top brands. Win cash prizes, gain recognition, and enhance your portfolio with award-winning work.
                </p>
                <Link to="/ways-to-earn/freelancer-competitions" className="text-[#FF6B00] font-medium hover:text-[#2E2E2E] hover:underline flex items-center transition-colors">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Earnings Calculator */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#ffeee3]/50 rounded-xl p-8 md:p-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">Earnings <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Potential</span> Calculator</h2>
                <p className="text-xl text-[#2E2E2E]">
                  See how much you could earn based on your skills and availability
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="skill-level" className="block text-[#2E2E2E] font-medium mb-2">
                      Your Skill Level
                    </label>
                    <select
                      id="skill-level"
                      value={skillLevel}
                      onChange={(e) => setSkillLevel(e.target.value)}
                      className="w-full bg-white border border-[#ffeee3] text-[#2E2E2E] py-3 px-4 pr-8 rounded focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                    >
                      <option value="Entry Level">Entry Level</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-[#2E2E2E] font-medium mb-2">
                      Primary Category
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white border border-[#ffeee3] text-[#2E2E2E] py-3 px-4 pr-8 rounded focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="Design">Design</option>
                      <option value="Writing">Writing</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Video & Animation">Video & Animation</option>
                      <option value="Admin Support">Admin Support</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="hours" className="block text-[#2E2E2E] font-medium mb-2">
                      Hours Available per Week: <span className="text-[#FF6B00] font-bold">{hours}h</span>
                    </label>
                    <input
                      type="range"
                      id="hours"
                      min="5"
                      max="40"
                      step="5"
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="w-full h-2 bg-[#ffeee3] rounded-lg appearance-none cursor-pointer range-slider"
                      style={{
                        background: `linear-gradient(to right, #FF6B00 0%, #FF6B00 ${((hours - 5) / 35) * 100}%, #ffeee3 ${((hours - 5) / 35) * 100}%, #ffeee3 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5h</span>
                      <span>40h</span>
                    </div>
                  </div>
                  
                  {/* Custom Rates Section */}
                  <div className="border-t border-[#ffeee3] pt-6">
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="useCustomRates"
                        checked={useCustomRates}
                        onChange={(e) => setUseCustomRates(e.target.checked)}
                        className="mr-3 w-4 h-4 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                      />
                      <label htmlFor="useCustomRates" className="text-[#2E2E2E] font-medium">
                        Set Custom Rates
                      </label>
                    </div>
                    
                    {useCustomRates && (
                      <div className="space-y-4 bg-[#ffeee3]/30 p-4 rounded-lg">
                        <div>
                          <label htmlFor="customHourlyRate" className="block text-[#2E2E2E] font-medium mb-2">
                            Your Hourly Rate ($)
                          </label>
                          <input
                            type="number"
                            id="customHourlyRate"
                            value={customHourlyRate}
                            onChange={(e) => setCustomHourlyRate(e.target.value)}
                            placeholder="e.g., 50"
                            min="1"
                            className="w-full bg-white border border-[#ffeee3] text-[#2E2E2E] py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="customProjectRate" className="block text-[#2E2E2E] font-medium mb-2">
                            Average Project Rate ($)
                          </label>
                          <input
                            type="number"
                            id="customProjectRate"
                            value={customProjectRate}
                            onChange={(e) => setCustomProjectRate(e.target.value)}
                            placeholder="e.g., 1500"
                            min="1"
                            className="w-full bg-white border border-[#ffeee3] text-[#2E2E2E] py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Optional: Leave blank to auto-calculate based on hourly rate
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-medium py-3 rounded transition-colors duration-200">
                    Calculate Earnings
                  </button>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-[#FF6B00]/20">
                  <h3 className="text-xl font-bold mb-6 text-center text-[#2E2E2E]">Your Potential Earnings</h3>
                  
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#FF6B00]">
                        ${earnings.monthlyMin.toLocaleString()} - ${earnings.monthlyMax.toLocaleString()}
                      </div>
                      <div className="text-gray-600">Monthly Potential</div>
                    </div>
                    
                    <div className="border-t border-[#FF6B00]/20 pt-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-[#2E2E2E]">Hourly Rate:</span>
                        <span className="font-medium text-[#2E2E2E]">
                          {useCustomRates && customHourlyRate 
                            ? `$${earnings.hourlyMin}` 
                            : `$${earnings.hourlyMin} - $${earnings.hourlyMax}`}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-[#2E2E2E]">Weekly Hours:</span>
                        <span className="font-medium text-[#2E2E2E]">{hours}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-[#2E2E2E]">Project-Based:</span>
                        <span className="font-medium text-[#2E2E2E]">
                          {useCustomRates && customProjectRate 
                            ? `$${earnings.projectMin}` 
                            : `$${earnings.projectMin} - $${earnings.projectMax}`}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-3 p-3 bg-[#ffeee3]/30 rounded">
                        <div className="font-medium text-[#2E2E2E] mb-1">Monthly calculation includes:</div>
                        <div>• 70% hourly work ({hours}h/week)</div>
                        <div>• 30% project work (~1.5 projects/month)</div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 italic">
                      * {useCustomRates 
                          ? 'These estimates are based on your custom rates and are intended for guidance purposes only. Actual earnings may vary, and we can calculate potential earnings only, not guarantee them.' 
                          : `These estimates are based on ${skillLevel.toLowerCase()} level in ${category} and are intended for guidance purposes only. Actual earnings may vary, and we can calculate potential earnings only, not guarantee them.`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#2E2E2E] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E2E2E] to-[#2E2E2E]/80"></div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Grow</span> Your Income?</h2>
            <p className="text-xl opacity-90 mb-8 text-[#ffeee3]">
              Join thousands of freelancers who are building their careers and increasing their earnings on FreelanceNest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90 font-medium px-8 py-4 rounded-lg text-lg transition-colors duration-200 inline-block shadow-lg hover:shadow-xl">
                Start Earning Now
              </Link>
              <Link to="/how-to-find-work" className="bg-transparent border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00]/10 font-medium px-8 py-4 rounded-lg text-lg transition-colors duration-200 inline-block">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default WaysToEarnPage;












