import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, Star, Clock, DollarSign } from 'lucide-react';

const ProjectBiddingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recommended' | 'latest' | 'saved'>('recommended');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample project data
  const projects = [
    {
      id: 1,
      title: 'E-commerce Website Development',
      description: 'Looking for an experienced developer to build a Shopify-based e-commerce website with custom features. The site will need product management, payment integration, and responsive design.',
      budget: '$1,500 - $3,000',
      duration: '4-6 weeks',
      skills: ['Shopify', 'JavaScript', 'HTML/CSS', 'Payment APIs'],
      proposals: 12,
      clientRating: 4.8,
      clientLocation: 'United States',
      postedAt: '2 days ago',
      verified: true
    },
    {
      id: 2,
      title: 'Mobile App UI/UX Design',
      description: 'We need a skilled designer to create the user interface and experience for our iOS/Android fitness tracking application. Looking for modern, clean designs with intuitive user flows.',
      budget: '$800 - $1,500',
      duration: '2-3 weeks',
      skills: ['UI/UX Design', 'Figma', 'Mobile Design', 'Prototyping'],
      proposals: 18,
      clientRating: 4.5,
      clientLocation: 'Canada',
      postedAt: '1 day ago',
      verified: true
    },
    {
      id: 3,
      title: 'Content Creation for Tech Blog',
      description: 'Seeking a content writer with knowledge of technology trends to write weekly blog articles. Topics will include AI, software development, and emerging technologies.',
      budget: '$50 - $100 per article',
      duration: 'Ongoing',
      skills: ['Content Writing', 'SEO', 'Tech Knowledge', 'Research'],
      proposals: 24,
      clientRating: 4.2,
      clientLocation: 'United Kingdom',
      postedAt: '3 days ago',
      verified: false
    },
    {
      id: 4,
      title: 'WordPress Website Migration',
      description: 'Need help migrating an existing WordPress website to a new host. The site has approximately 500 pages and uses several custom plugins that need to be maintained.',
      budget: '$300 - $600',
      duration: '1 week',
      skills: ['WordPress', 'PHP', 'Database Migration', 'Troubleshooting'],
      proposals: 9,
      clientRating: 4.9,
      clientLocation: 'Australia',
      postedAt: '5 hours ago',
      verified: true
    },
    {
      id: 5,
      title: 'Social Media Marketing Campaign',
      description: 'Seeking a social media specialist to create and manage a 3-month campaign for our fitness brand. Will involve content creation, scheduling, and analytics reporting.',
      budget: '$800 - $1,200 per month',
      duration: '3 months',
      skills: ['Social Media Marketing', 'Content Creation', 'Analytics', 'Campaign Management'],
      proposals: 15,
      clientRating: 4.6,
      clientLocation: 'Germany',
      postedAt: '1 day ago',
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-r from-primary-500 to-purple-600">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Project Bidding</h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Browse and bid on thousands of projects that match your skills and interests
            </p>
            <div className="bg-white p-2 rounded-lg flex items-center shadow-lg max-w-2xl mx-auto">
              <Search className="ml-3 h-5 w-5 text-[#ffeee3]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for projects (e.g. WordPress, Logo Design, Content Writing)"
                className="flex-1 outline-none px-4 py-2 text-[#2E2E2E]"
              />
              <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg px-6 py-2 font-medium transition-colors duration-200">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">Filters</h3>
                  <button className="text-[#FF6B00] text-sm font-medium">Reset All</button>
                </div>

                {/* Budget Filter */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Budget</h4>
                    <ChevronDown className="w-4 h-4 text-[#ffeee3]" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="budget-1" className="mr-3" />
                      <label htmlFor="budget-1" className="text-[#2E2E2E]">Under $500</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="budget-2" className="mr-3" />
                      <label htmlFor="budget-2" className="text-[#2E2E2E]">$500 - $1,000</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="budget-3" className="mr-3" />
                      <label htmlFor="budget-3" className="text-[#2E2E2E]">$1,000 - $5,000</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="budget-4" className="mr-3" />
                      <label htmlFor="budget-4" className="text-[#2E2E2E]">$5,000+</label>
                    </div>
                  </div>
                </div>

                {/* Duration Filter */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Project Duration</h4>
                    <ChevronDown className="w-4 h-4 text-[#ffeee3]" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="duration-1" className="mr-3" />
                      <label htmlFor="duration-1" className="text-[#2E2E2E]">Less than 1 week</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="duration-2" className="mr-3" />
                      <label htmlFor="duration-2" className="text-[#2E2E2E]">1-2 weeks</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="duration-3" className="mr-3" />
                      <label htmlFor="duration-3" className="text-[#2E2E2E]">2-4 weeks</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="duration-4" className="mr-3" />
                      <label htmlFor="duration-4" className="text-[#2E2E2E]">1-3 months</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="duration-5" className="mr-3" />
                      <label htmlFor="duration-5" className="text-[#2E2E2E]">3+ months</label>
                    </div>
                  </div>
                </div>

                {/* Skills Filter */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Skills</h4>
                    <ChevronDown className="w-4 h-4 text-[#ffeee3]" />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      placeholder="Search skills"
                      className="w-full px-3 py-2 border border-[#ffeee3] rounded-md text-sm"
                    />
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    <div className="flex items-center">
                      <input type="checkbox" id="skill-1" className="mr-3" />
                      <label htmlFor="skill-1" className="text-[#2E2E2E]">JavaScript</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="skill-2" className="mr-3" />
                      <label htmlFor="skill-2" className="text-[#2E2E2E]">React</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="skill-3" className="mr-3" />
                      <label htmlFor="skill-3" className="text-[#2E2E2E]">WordPress</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="skill-4" className="mr-3" />
                      <label htmlFor="skill-4" className="text-[#2E2E2E]">UI/UX Design</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="skill-5" className="mr-3" />
                      <label htmlFor="skill-5" className="text-[#2E2E2E]">Content Writing</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="skill-6" className="mr-3" />
                      <label htmlFor="skill-6" className="text-[#2E2E2E]">Python</label>
                    </div>
                  </div>
                </div>

                {/* Client Rating Filter */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Client Rating</h4>
                    <ChevronDown className="w-4 h-4 text-[#ffeee3]" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="rating-4" className="mr-3" />
                      <label htmlFor="rating-4" className="text-[#2E2E2E] flex items-center">
                        <span className="mr-1">4+</span>
                        <Star className="w-4 h-4 fill-yellow-400 text-[#FF9F45]" />
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="rating-3" className="mr-3" />
                      <label htmlFor="rating-3" className="text-[#2E2E2E] flex items-center">
                        <span className="mr-1">3+</span>
                        <Star className="w-4 h-4 fill-yellow-400 text-[#FF9F45]" />
                      </label>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium py-3 rounded transition-colors duration-200">
                  Apply Filters
                </button>
              </div>
            </div>

            {/* Projects List */}
            <div className="lg:w-3/4">
              {/* Tabs and Sorting */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveTab('recommended')}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      activeTab === 'recommended'
                        ? 'bg-[#FF6B00] text-white'
                        : 'bg-white text-[#2E2E2E] hover:bg-[#ffeee3]'
                    }`}
                  >
                    Recommended
                  </button>
                  <button
                    onClick={() => setActiveTab('latest')}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      activeTab === 'latest'
                        ? 'bg-[#FF6B00] text-white'
                        : 'bg-white text-[#2E2E2E] hover:bg-[#ffeee3]'
                    }`}
                  >
                    Latest
                  </button>
                  <button
                    onClick={() => setActiveTab('saved')}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      activeTab === 'saved'
                        ? 'bg-[#FF6B00] text-white'
                        : 'bg-white text-[#2E2E2E] hover:bg-[#ffeee3]'
                    }`}
                  >
                    Saved
                  </button>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <span className="text-[#2E2E2E] text-sm whitespace-nowrap">Sort by:</span>
                  <select className="border border-[#ffeee3] rounded-lg py-2 px-3 bg-white text-[#2E2E2E] w-full md:w-auto">
                    <option>Most Relevant</option>
                    <option>Newest First</option>
                    <option>Budget: High to Low</option>
                    <option>Budget: Low to High</option>
                    <option>Client Rating</option>
                  </select>
                </div>
              </div>

              {/* Project Cards */}
              <div className="space-y-6">
                {projects.map(project => (
                  <div key={project.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold mb-2 text-[#2E2E2E]">{project.title}</h3>
                        <button className="text-[#ffeee3] hover:text-[#FF6B00]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="flex items-center text-sm text-[#ffeee3] mb-4">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Posted {project.postedAt} â€¢ </span>
                        <span className="flex items-center ml-2">
                          <Star className="w-4 h-4 text-[#FF9F45] fill-yellow-400 mr-1" />
                          {project.clientRating} â€¢ 
                        </span>
                        <span className="ml-2">{project.clientLocation}</span>
                        {project.verified && (
                          <span className="bg-[#ffeee3] text-[#2E2E2E] text-xs font-medium ml-2 px-2 py-0.5 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                      
                      <p className="text-[#2E2E2E] mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.skills.map((skill, idx) => (
                          <span 
                            key={idx} 
                            className="bg-[#ffeee3] text-[#2E2E2E] text-xs font-medium px-2.5 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 border-t border-[#ffeee3] pt-4">
                        <div className="flex gap-6">
                          <div>
                            <div className="text-sm text-[#ffeee3]">Budget</div>
                            <div className="font-medium flex items-center">
                              <DollarSign className="w-4 h-4 mr-1 text-[#ffeee3]" />
                              {project.budget}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-[#ffeee3]">Duration</div>
                            <div className="font-medium">{project.duration}</div>
                          </div>
                          <div>
                            <div className="text-sm text-[#ffeee3]">Proposals</div>
                            <div className="font-medium">{project.proposals}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                            Submit a Proposal
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-10">
                <div className="flex">
                  <button className="px-4 py-2 border border-[#ffeee3] rounded-l-lg bg-white hover:bg-[#ffeee3] text-[#ffeee3]">
                    Previous
                  </button>
                  <button className="px-4 py-2 border-t border-b border-[#ffeee3] bg-[#FF6B00] text-white font-medium">
                    1
                  </button>
                  <button className="px-4 py-2 border-t border-b border-[#ffeee3] bg-white hover:bg-[#ffeee3] text-[#2E2E2E]">
                    2
                  </button>
                  <button className="px-4 py-2 border-t border-b border-[#ffeee3] bg-white hover:bg-[#ffeee3] text-[#2E2E2E]">
                    3
                  </button>
                  <button className="px-4 py-2 border border-[#ffeee3] rounded-r-lg bg-white hover:bg-[#ffeee3] text-[#ffeee3]">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Tips for Successful Project Bidding</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-[#FF6B00] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Personalize Your Proposals</h3>
                <p className="text-[#2E2E2E]">
                  Take time to read the project description thoroughly and tailor your proposal to address the client's specific needs and requirements.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-[#FF6B00] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Set Clear Expectations</h3>
                <p className="text-[#2E2E2E]">
                  Be specific about deliverables, timelines, and pricing. Clear communication from the start helps build trust with potential clients.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-[#FF6B00] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Showcase Relevant Experience</h3>
                <p className="text-[#2E2E2E]">
                  Highlight projects and skills that are directly relevant to the job you're bidding on to demonstrate your expertise in that specific area.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-[#FF6B00] text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Win More Projects?</h2>
            <p className="text-xl opacity-90 mb-8">
              Complete your profile, showcase your portfolio, and start bidding on projects that match your skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="bg-white text-[#FF6B00] hover:bg-[#ffeee3] font-medium px-8 py-4 rounded-lg text-lg transition-colors duration-200 inline-block">
                Get Started
              </Link>
              <Link to="/ways-to-earn" className="bg-transparent border border-white text-white hover:bg-white/10 font-medium px-8 py-4 rounded-lg text-lg transition-colors duration-200 inline-block">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectBiddingPage;












