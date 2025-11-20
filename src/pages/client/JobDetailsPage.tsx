import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const JobDetailsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('applications');

  // Sample job data
  const job = {
    id: '1',
    title: 'E-commerce Website Development',
    description: 'Looking for an experienced developer to build a modern e-commerce website with React and Node.js. The project includes user authentication, payment integration, inventory management, and admin dashboard.',
    category: 'Web Development',
    budget: '$2,500',
    budgetType: 'fixed',
    timeline: '2-4 weeks',
    status: 'Active',
    postedDate: '2 days ago',
    proposalsCount: 12,
    skills: ['React', 'Node.js', 'MongoDB', 'Stripe Integration', 'REST API'],
    requirements: [
      'Experience with React and Node.js',
      'Previous e-commerce development experience',
      'Knowledge of payment gateway integration',
      'Portfolio showing similar projects'
    ],
    attachments: [
      { name: 'Requirements.pdf', size: '2.4 MB', type: 'pdf' },
      { name: 'Wireframes.fig', size: '1.8 MB', type: 'figma' }
    ]
  };

  const applications = [
    {
      id: '1',
      freelancer: {
        name: 'John Smith',
        avatar: '/api/placeholder/50/50',
        rating: 4.9,
        reviews: 127,
        location: 'United States',
        verified: true
      },
      bid: '$2,500',
      duration: '2 weeks',
      coverLetter: 'I have 8 years of experience in React and Node.js development. I\'ve built several e-commerce platforms and can deliver exactly what you need.',
      proposal: 'Detailed proposal with timeline and deliverables...',
      submittedDate: '1 day ago',
      status: 'new'
    },
    {
      id: '2',
      freelancer: {
        name: 'Sarah Johnson',
        avatar: '/api/placeholder/50/50',
        rating: 4.8,
        reviews: 89,
        location: 'Canada',
        verified: true
      },
      bid: '$2,200',
      duration: '3 weeks',
      coverLetter: 'I specialize in e-commerce development with React and have extensive experience with payment integrations.',
      proposal: 'Comprehensive proposal with technical approach...',
      submittedDate: '2 days ago',
      status: 'shortlisted'
    }
  ];

  const qaThreads = [
    {
      id: '1',
      question: 'Do you need mobile responsive design?',
      answer: 'Yes, the website should be fully responsive and work well on all devices.',
      askedBy: 'Mike Brown',
      askedDate: '1 day ago',
      answeredDate: '1 day ago'
    },
    {
      id: '2',
      question: 'What payment gateways do you want to integrate?',
      answer: 'We need Stripe and PayPal integration for now.',
      askedBy: 'Emma Davis',
      askedDate: '2 days ago',
      answeredDate: '2 days ago'
    }
  ];

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1 mb-6 lg:mb-0">
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    job.status === 'Active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                  }`}>
                    {job.status}
                  </span>
                  <span className="text-[#ffeee3]/80">Posted {job.postedDate}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{job.title}</h1>
                <p className="text-xl text-[#ffeee3] mb-6">{job.description}</p>
                <div className="flex flex-wrap items-center gap-6 text-[#ffeee3]/80">
                  <span>💰 {job.budget} ({job.budgetType})</span>
                  <span>⏱️ {job.timeline}</span>
                  <span>📝 {job.proposalsCount} proposals</span>
                </div>
              </div>
              
              <div className="lg:w-80">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#ffeee3]/30">
                  <h3 className="font-semibold text-white mb-4">Job Actions</h3>
                  <div className="space-y-3">
                    <Link 
                      to="/client/post-job"
                      className="w-full bg-[#FF6B00] hover:bg-[#FF9F45] text-white py-3 rounded-lg font-medium transition-colors text-center block"
                    >
                      Edit Job Post
                    </Link>
                    <button className="w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-lg font-medium transition-colors">
                      Boost Job
                    </button>
                    <button className="w-full bg-transparent border border-white/30 hover:border-white/50 text-white py-3 rounded-lg font-medium transition-colors">
                      Close Job
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-0 bg-white border-b border-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="flex space-x-8 overflow-x-auto">
              {[
                { id: 'applications', label: `Applications (${applications.length})` },
                { id: 'job-details', label: 'Job Details' },
                { id: 'qa', label: `Q&A (${qaThreads.length})` },
                { id: 'similar', label: 'Similar Candidates' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#FF6B00] text-[#FF6B00]'
                      : 'border-transparent text-[#2E2E2E]/60 hover:text-[#2E2E2E] hover:border-[#2E2E2E]/30'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            
            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-[#2E2E2E]">Applications</h2>
                  <div className="flex items-center space-x-4">
                    <select className="px-4 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]">
                      <option>All Applications</option>
                      <option>New</option>
                      <option>Shortlisted</option>
                      <option>Interviewed</option>
                      <option>Hired</option>
                    </select>
                    <select className="px-4 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]">
                      <option>Sort by Date</option>
                      <option>Sort by Rating</option>
                      <option>Sort by Price</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-6">
                  {applications.map((application) => (
                    <div key={application.id} className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3] hover:border-[#FF6B00] transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <img
                            src={application.freelancer.avatar}
                            alt={application.freelancer.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-[#2E2E2E] text-lg">{application.freelancer.name}</h3>
                              {application.freelancer.verified && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.259.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              )}
                              {application.status === 'shortlisted' && (
                                <span className="px-2 py-1 bg-[#FF6B00] text-white text-xs rounded-full">Shortlisted</span>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-[#2E2E2E]/60 mb-2">
                              <div className="flex items-center space-x-1">
                                <span className="font-medium text-[#2E2E2E]">{application.freelancer.rating}</span>
                                <div className="flex">
                                  {[1,2,3,4,5].map((star) => (
                                    <svg key={star} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                    </svg>
                                  ))}
                                </div>
                                <span>({application.freelancer.reviews})</span>
                              </div>
                              <span>{application.freelancer.location}</span>
                              <span>Applied {application.submittedDate}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#FF6B00] mb-1">{application.bid}</div>
                          <div className="text-sm text-[#2E2E2E]/60">in {application.duration}</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium text-[#2E2E2E] mb-2">Cover Letter</h4>
                        <p className="text-[#2E2E2E]/80">{application.coverLetter}</p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[#ffeee3]">
                        <div className="flex items-center space-x-4">
                          <Link 
                            to={`/client/freelancer/${application.id}`}
                            className="text-[#FF6B00] hover:text-[#FF9F45] font-medium"
                          >
                            View Profile
                          </Link>
                          <button className="text-[#FF6B00] hover:text-[#FF9F45] font-medium">
                            View Proposal
                          </button>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button className="px-4 py-2 border border-[#ffeee3] text-[#2E2E2E] rounded-lg hover:border-[#FF6B00] transition-colors">
                            Message
                          </button>
                          <button className="px-4 py-2 bg-[#ffeee3] text-[#FF6B00] rounded-lg hover:bg-[#FF6B00] hover:text-white transition-colors">
                            Shortlist
                          </button>
                          <button className="px-4 py-2 bg-[#FF6B00] text-white rounded-lg hover:bg-[#FF9F45] transition-colors">
                            Hire
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Job Details Tab */}
            {activeTab === 'job-details' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                    <h2 className="text-xl font-bold text-[#2E2E2E] mb-4">Job Description</h2>
                    <p className="text-[#2E2E2E]/80 leading-relaxed mb-6">{job.description}</p>
                    
                    <h3 className="font-semibold text-[#2E2E2E] mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start text-[#2E2E2E]/80">
                          <span className="text-[#FF6B00] mr-2">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                    <h2 className="text-xl font-bold text-[#2E2E2E] mb-4">Required Skills</h2>
                    <div className="flex flex-wrap gap-3">
                      {job.skills.map((skill) => (
                        <span key={skill} className="px-4 py-2 bg-[#ffeee3] text-[#FF6B00] rounded-lg font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {job.attachments.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                      <h2 className="text-xl font-bold text-[#2E2E2E] mb-4">Attachments</h2>
                      <div className="space-y-3">
                        {job.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border border-[#ffeee3] rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-[#ffeee3] rounded-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                              <div>
                                <div className="font-medium text-[#2E2E2E]">{file.name}</div>
                                <div className="text-sm text-[#2E2E2E]/60">{file.size}</div>
                              </div>
                            </div>
                            <button className="text-[#FF6B00] hover:text-[#FF9F45] font-medium">
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                    <h3 className="font-semibold text-[#2E2E2E] mb-4">Job Summary</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#2E2E2E]/60">Category:</span>
                        <span className="font-medium text-[#2E2E2E]">{job.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2E2E2E]/60">Budget:</span>
                        <span className="font-medium text-[#2E2E2E]">{job.budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2E2E2E]/60">Timeline:</span>
                        <span className="font-medium text-[#2E2E2E]">{job.timeline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2E2E2E]/60">Proposals:</span>
                        <span className="font-medium text-[#2E2E2E]">{job.proposalsCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2E2E2E]/60">Status:</span>
                        <span className="font-medium text-[#2E2E2E]">{job.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                    <h3 className="font-semibold text-[#2E2E2E] mb-4">Job Stats</h3>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#FF6B00]">{job.proposalsCount}</div>
                        <div className="text-sm text-[#2E2E2E]/60">Total Proposals</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#FF6B00]">2</div>
                        <div className="text-sm text-[#2E2E2E]/60">Shortlisted</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#FF6B00]">0</div>
                        <div className="text-sm text-[#2E2E2E]/60">Hired</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Q&A Tab */}
            {activeTab === 'qa' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-[#2E2E2E]">Questions & Answers</h2>
                  <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Ask a Question
                  </button>
                </div>

                <div className="space-y-6">
                  {qaThreads.map((qa) => (
                    <div key={qa.id} className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                      <div className="mb-4">
                        <h3 className="font-semibold text-[#2E2E2E] mb-2">Q: {qa.question}</h3>
                        <div className="text-sm text-[#2E2E2E]/60 mb-3">
                          Asked by {qa.askedBy} • {qa.askedDate}
                        </div>
                      </div>
                      
                      {qa.answer && (
                        <div className="bg-[#ffeee3]/50 rounded-lg p-4">
                          <h4 className="font-medium text-[#2E2E2E] mb-2">A: {qa.answer}</h4>
                          <div className="text-sm text-[#2E2E2E]/60">
                            Answered {qa.answeredDate}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Similar Candidates Tab */}
            {activeTab === 'similar' && (
              <div>
                <h2 className="text-2xl font-bold text-[#2E2E2E] mb-8">Similar Candidates</h2>
                <div className="text-center py-12">
                  <div className="text-[#2E2E2E]/40 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-[#2E2E2E] mb-2">Finding Similar Candidates</h3>
                  <p className="text-[#2E2E2E]/60 mb-6">We're analyzing freelancer profiles to find candidates who match your project requirements.</p>
                  <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Search for Candidates
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetailsPage;
