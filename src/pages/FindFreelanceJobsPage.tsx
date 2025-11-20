import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, BookOpen, Clock, DollarSign } from 'lucide-react';

const FindFreelanceJobsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All', 'Development', 'Design', 'Marketing', 'Writing', 'Admin Support', 'Customer Service',
    'Data', 'Engineering', 'Business', 'Legal', 'Translation'
  ];

  // Sample job data
  const jobs = [
    {
      id: 1,
      title: 'React Developer for E-commerce Platform',
      category: 'Development',
      description: 'Looking for an experienced React developer to build a responsive e-commerce platform with custom features...',
      budget: '$2000-$5000',
      duration: '2-3 months',
      skills: ['React', 'Redux', 'TypeScript', 'Node.js'],
      postedDate: '2 hours ago',
      proposals: 12,
      clientInfo: {
        name: 'TechSolutions Inc.',
        rating: 4.9,
        reviews: 87,
        location: 'United States',
        verified: true
      }
    },
    {
      id: 2,
      title: 'UX/UI Designer for Mobile App',
      category: 'Design',
      description: 'Need a talented designer to create intuitive user interfaces for our fitness tracking mobile application...',
      budget: '$1500-$3000',
      duration: '1-2 months',
      skills: ['Figma', 'UI Design', 'Mobile UX', 'Prototyping'],
      postedDate: '5 hours ago',
      proposals: 18,
      clientInfo: {
        name: 'FitTech Ventures',
        rating: 4.7,
        reviews: 35,
        location: 'Canada',
        verified: true
      }
    },
    {
      id: 3,
      title: 'Content Writer for SaaS Blog',
      category: 'Writing',
      description: 'We need an experienced B2B writer to create engaging blog content for our SaaS platform...',
      budget: '$500-$1000',
      duration: 'Ongoing',
      skills: ['Content Writing', 'SEO', 'B2B', 'Technical Writing'],
      postedDate: '1 day ago',
      proposals: 24,
      clientInfo: {
        name: 'CloudSoft Solutions',
        rating: 4.8,
        reviews: 62,
        location: 'United Kingdom',
        verified: true
      }
    },
    {
      id: 4,
      title: 'Social Media Marketing Specialist',
      category: 'Marketing',
      description: 'Looking for a social media expert to manage our accounts and grow our online presence...',
      budget: '$800-$1500',
      duration: '3-6 months',
      skills: ['Social Media', 'Content Creation', 'Analytics', 'Advertising'],
      postedDate: '2 days ago',
      proposals: 31,
      clientInfo: {
        name: 'GreenLife Brands',
        rating: 4.5,
        reviews: 23,
        location: 'Australia',
        verified: false
      }
    },
    {
      id: 5,
      title: 'Data Analyst for E-commerce Insights',
      category: 'Data',
      description: 'Need a data analyst to help interpret our e-commerce metrics and provide actionable insights...',
      budget: '$1200-$2500',
      duration: '1 month',
      skills: ['SQL', 'Python', 'Data Visualization', 'E-commerce'],
      postedDate: '3 days ago',
      proposals: 16,
      clientInfo: {
        name: 'ShopSmart Analytics',
        rating: 5.0,
        reviews: 11,
        location: 'Singapore',
        verified: true
      }
    },
    {
      id: 6,
      title: 'Virtual Assistant for Executive Support',
      category: 'Admin Support',
      description: 'Seeking a detail-oriented virtual assistant to provide administrative support to our executives...',
      budget: '$15-$25/hr',
      duration: 'Ongoing',
      skills: ['Calendar Management', 'Email', 'Documentation', 'Organization'],
      postedDate: '4 days ago',
      proposals: 42,
      clientInfo: {
        name: 'Executive Edge LLC',
        rating: 4.6,
        reviews: 28,
        location: 'United States',
        verified: true
      }
    }
  ];

  const filteredJobs = jobs.filter(job => 
    (selectedCategory === 'All' || job.category === selectedCategory) &&
    (job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
     job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
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
              Find <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Freelance</span> Jobs
            </h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Discover opportunities that match your skills and interests
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for jobs by title, skill, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-[#2E2E2E]">Filters</h2>
                  <Filter className="w-5 h-5 text-[#FF6B00]" />
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3 text-[#2E2E2E]">Categories</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {categories.map(category => (
                      <div key={category} className="flex items-center">
                        <input
                          type="radio"
                          id={category}
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="w-4 h-4 text-[#FF6B00] bg-gray-100 border-gray-300 focus:ring-[#FF6B00]"
                        />
                        <label htmlFor={category} className="ml-2 text-gray-700 cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3 text-[#2E2E2E]">Project Type</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="fixed-price"
                        className="w-4 h-4 text-[#FF6B00] bg-gray-100 border-gray-300 rounded focus:ring-[#FF6B00]"
                      />
                      <label htmlFor="fixed-price" className="ml-2 text-gray-700 cursor-pointer">
                        Fixed Price
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hourly"
                        className="w-4 h-4 text-[#FF6B00] bg-gray-100 border-gray-300 rounded focus:ring-[#FF6B00]"
                      />
                      <label htmlFor="hourly" className="ml-2 text-gray-700 cursor-pointer">
                        Hourly Rate
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3 text-[#2E2E2E]">Experience Level</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="entry"
                        className="w-4 h-4 text-[#FF6B00] bg-gray-100 border-gray-300 rounded focus:ring-[#FF6B00]"
                      />
                      <label htmlFor="entry" className="ml-2 text-gray-700 cursor-pointer">
                        Entry Level
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="intermediate"
                        className="w-4 h-4 text-[#FF6B00] bg-gray-100 border-gray-300 rounded focus:ring-[#FF6B00]"
                      />
                      <label htmlFor="intermediate" className="ml-2 text-gray-700 cursor-pointer">
                        Intermediate
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="expert"
                        className="w-4 h-4 text-[#FF6B00] bg-gray-100 border-gray-300 rounded focus:ring-[#FF6B00]"
                      />
                      <label htmlFor="expert" className="ml-2 text-gray-700 cursor-pointer">
                        Expert
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3 text-[#2E2E2E]">Client History</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="payment-verified"
                        className="w-4 h-4 text-[#FF6B00] bg-gray-100 border-gray-300 rounded focus:ring-[#FF6B00]"
                      />
                      <label htmlFor="payment-verified" className="ml-2 text-gray-700 cursor-pointer">
                        Payment Verified
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="5-star"
                        className="w-4 h-4 text-[#FF6B00] bg-gray-100 border-gray-300 rounded focus:ring-[#FF6B00]"
                      />
                      <label htmlFor="5-star" className="ml-2 text-gray-700 cursor-pointer">
                        5 Star Rating
                      </label>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-medium py-2 rounded transition-colors duration-200">
                  Apply Filters
                </button>
              </div>
            </div>
            
            {/* Jobs List */}
            <div className="lg:w-3/4">
              {/* Results Info */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  Showing {filteredJobs.length} jobs
                  {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
                
                <div className="flex items-center">
                  <label htmlFor="sort" className="mr-2 text-gray-600">Sort by:</label>
                  <select
                    id="sort"
                    className="bg-white border border-[#FF6B00] text-gray-700 py-2 px-4 pr-8 rounded focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                  >
                    <option>Most Relevant</option>
                    <option>Newest</option>
                    <option>Budget: High to Low</option>
                    <option>Budget: Low to High</option>
                  </select>
                </div>
              </div>
              
              {/* Jobs */}
              <div className="space-y-6">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map(job => (
                    <div key={job.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#FF6B00]/20">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-[#2E2E2E] hover:text-[#FF6B00] transition-colors cursor-pointer">
                          {job.title}
                        </h3>
                        <span className="bg-[#ffeee3] text-[#FF6B00] text-xs font-medium px-2.5 py-1 rounded">
                          {job.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {job.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.map(skill => (
                          <span key={skill} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          <span>{job.budget}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{job.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          <span>{job.proposals} proposals</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${job.clientInfo.verified ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span className="text-sm mr-2">{job.clientInfo.name}</span>
                          <div className="flex items-center text-yellow-400">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm text-gray-700 ml-1">{job.clientInfo.rating}</span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-400">{job.postedDate}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <div className="text-5xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-[#2E2E2E] mb-2">
                      No jobs found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your search terms or filters to find more opportunities
                    </p>
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All');
                      }}
                      className="text-[#FF6B00] hover:text-[#2E2E2E] hover:underline font-medium transition-colors"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
              
              {/* Pagination */}
              {filteredJobs.length > 0 && (
                <div className="flex justify-center mt-12">
                  <nav className="flex items-center">
                    <button className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 mr-2">
                      Previous
                    </button>
                    <button className="px-3 py-2 rounded-md bg-[#FF6B00] text-white mx-1">1</button>
                    <button className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 mx-1">2</button>
                    <button className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 mx-1">3</button>
                    <button className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 ml-2">
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Get Noticed Section */}
      <section className="py-16 bg-[#2E2E2E] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E2E2E] to-[#2E2E2E]/80"></div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Want to <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">stand out</span> to clients?</h2>
            <p className="text-xl opacity-90 mb-8 text-[#ffeee3]">
              Complete your profile, showcase your portfolio, and get verified skills to improve your chances of winning great projects.
            </p>
            <Link to="/login" className="bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90 font-medium px-8 py-4 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl inline-block">
              Update Your Profile
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-white to-[#ffeee3]/30">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block px-3 py-1 bg-[#ffeee3] text-[#FF6B00] rounded-full text-sm font-semibold mb-3">
              Questions & Answers
            </div>
            <h2 className="text-4xl font-bold mb-6 text-[#2E2E2E]">
              Frequently Asked <span className="text-[#FF6B00]">Questions</span>
            </h2>
            <p className="text-xl text-[#2E2E2E]/80 max-w-2xl mx-auto">
              Everything you need to know about finding freelance jobs on our platform
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Accordion Items */}
            <div className="space-y-4">
              {/* FAQ Item 1 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-300">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="text-xl font-bold flex items-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#ffeee3] text-[#FF6B00] text-sm font-bold mr-4">Q</span>
                      <span className="text-[#2E2E2E]">How do I find jobs that match my skills?</span>
                    </h3>
                    <div className="w-8 h-8 flex-shrink-0 bg-[#ffeee3] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-[#2E2E2E]/80">
                    <div className="bg-[#ffeee3] border-l-4 border-[#FF6B00] pl-4 py-3 mb-3">
                      <p className="font-medium text-[#2E2E2E]">Job matching strategies:</p>
                    </div>
                    <p className="mb-4">
                      There are several ways to find jobs that match your skills:
                    </p>
                    <ul className="space-y-2 list-disc list-inside mb-4">
                      <li>Use the search bar with specific skills or keywords related to your expertise</li>
                      <li>Apply filters to narrow down results by category, project type, and experience level</li>
                      <li>Set up job alerts to get notified when relevant projects are posted</li>
                      <li>Complete your profile with your skills and experience to receive personalized job recommendations</li>
                      <li>Browse jobs in your specialized category to find niche opportunities</li>
                    </ul>
                  </div>
                </details>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-300">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="text-xl font-bold flex items-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#ffeee3] text-[#FF6B00] text-sm font-bold mr-4">Q</span>
                      <span className="text-[#2E2E2E]">What's the best way to submit a winning proposal?</span>
                    </h3>
                    <div className="w-8 h-8 flex-shrink-0 bg-[#ffeee3] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-[#2E2E2E]/80">
                    <div className="bg-[#ffeee3] border-l-4 border-[#FF6B00] pl-4 py-3 mb-3">
                      <p className="font-medium text-[#2E2E2E]">Proposal best practices:</p>
                    </div>
                    <p className="mb-3">Creating an effective proposal greatly increases your chances of winning projects. Here are some key tips:</p>
                    <ol className="list-decimal list-inside space-y-2 mb-4">
                      <li>Personalize each proposal to address the specific job requirements</li>
                      <li>Demonstrate your understanding of the client's needs and challenges</li>
                      <li>Highlight relevant experience and showcase similar projects you've completed</li>
                      <li>Include specific examples of how you would approach the project</li>
                      <li>Keep your proposal concise and well-structured</li>
                      <li>Ask thoughtful questions that show your expertise and interest</li>
                      <li>Provide a clear timeline and deliverables plan</li>
                    </ol>
                    <p>Remember: Quality matters more than quantity when it comes to proposals. It's better to submit fewer, highly tailored proposals than many generic ones.</p>
                  </div>
                </details>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-300">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="text-xl font-bold flex items-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#ffeee3] text-[#FF6B00] text-sm font-bold mr-4">Q</span>
                      <span className="text-[#2E2E2E]">How does the job bidding process work?</span>
                    </h3>
                    <div className="w-8 h-8 flex-shrink-0 bg-[#ffeee3] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-[#2E2E2E]/80">
                    <div className="bg-[#ffeee3] border-l-4 border-[#FF6B00] pl-4 py-3 mb-3">
                      <p className="font-medium text-[#2E2E2E]">Bidding process overview:</p>
                    </div>
                    <p className="mb-3">The job bidding process follows these steps:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-[#ffeee3]/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-[#2E2E2E]">1. Find a job</h4>
                        <p className="text-sm">Browse or search for jobs that match your skills and interests.</p>
                      </div>
                      <div className="bg-[#ffeee3]/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-[#2E2E2E]">2. Submit a proposal</h4>
                        <p className="text-sm">Write a customized proposal and include your bid (rate or fixed price).</p>
                      </div>
                      <div className="bg-[#ffeee3]/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-[#2E2E2E]">3. Client review</h4>
                        <p className="text-sm">The client reviews proposals and may contact you for more information.</p>
                      </div>
                      <div className="bg-[#ffeee3]/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-[#2E2E2E]">4. Interview/discussion</h4>
                        <p className="text-sm">You might be invited to chat further about the project details.</p>
                      </div>
                    </div>
                    <p>Once a client selects your proposal, you'll receive a notification to begin work according to the agreed terms.</p>
                  </div>
                </details>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-300">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="text-xl font-bold flex items-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#ffeee3] text-[#FF6B00] text-sm font-bold mr-4">Q</span>
                      <span className="text-[#2E2E2E]">Are there fees for submitting proposals?</span>
                    </h3>
                    <div className="w-8 h-8 flex-shrink-0 bg-[#ffeee3] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-[#2E2E2E]/80">
                    <div className="bg-[#ffeee3] border-l-4 border-[#FF6B00] pl-4 py-3 mb-3">
                      <p className="font-medium text-[#2E2E2E]">Proposal credits and fees:</p>
                    </div>
                    <p className="mb-3">
                      FreelanceNest uses a credit-based system for proposals:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-[#FF6B00] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Free members receive 10 proposal credits per month</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-[#FF6B00] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Each job application costs 1-2 credits, depending on the project budget</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-[#FF6B00] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>FreelanceNest Plus members receive additional credits and priority on proposals</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-[#FF6B00] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>You can purchase additional credits if you use all your monthly allocation</span>
                      </li>
                    </ul>
                    <p>This system helps ensure quality proposals while preventing spam applications to clients.</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FindFreelanceJobsPage;
