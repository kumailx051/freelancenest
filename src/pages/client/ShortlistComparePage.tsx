import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ShortlistComparePage: React.FC = () => {
  const [selectedProposals, setSelectedProposals] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState(false);
  const [shortlistedOnly, setShortlistedOnly] = useState(false);

  // Sample proposal data
  const proposals = [
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
      title: 'Full-Stack Web Developer',
      bid: '$2,500',
      duration: '2 weeks',
      coverLetter: 'I have 8 years of experience in React and Node.js development...',
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      portfolio: ['E-commerce Platform', 'SaaS Dashboard', 'Mobile App'],
      fitScore: 95,
      shortlisted: true,
      responseTime: '2 hours',
      completionRate: 98
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
      title: 'React Specialist',
      bid: '$2,200',
      duration: '3 weeks',
      coverLetter: 'I specialize in modern React applications with Redux...',
      skills: ['React', 'Redux', 'JavaScript', 'CSS'],
      portfolio: ['Corporate Website', 'E-learning Platform', 'Portfolio Site'],
      fitScore: 87,
      shortlisted: true,
      responseTime: '1 hour',
      completionRate: 95
    },
    {
      id: '3',
      freelancer: {
        name: 'Mike Brown',
        avatar: '/api/placeholder/50/50',
        rating: 4.7,
        reviews: 156,
        location: 'United Kingdom',
        verified: false
      },
      title: 'Frontend Developer',
      bid: '$1,800',
      duration: '4 weeks',
      coverLetter: 'I can help you build a modern, responsive website...',
      skills: ['HTML', 'CSS', 'JavaScript', 'Vue.js'],
      portfolio: ['Business Website', 'Landing Pages', 'Web App'],
      fitScore: 78,
      shortlisted: false,
      responseTime: '4 hours',
      completionRate: 92
    },
    {
      id: '4',
      freelancer: {
        name: 'Emma Davis',
        avatar: '/api/placeholder/50/50',
        rating: 4.9,
        reviews: 203,
        location: 'Australia',
        verified: true
      },
      title: 'Full-Stack Engineer',
      bid: '$3,000',
      duration: '2 weeks',
      coverLetter: 'I have extensive experience in building scalable web applications...',
      skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      portfolio: ['Enterprise App', 'API Development', 'Cloud Migration'],
      fitScore: 92,
      shortlisted: true,
      responseTime: '30 minutes',
      completionRate: 99
    }
  ];

  const filteredProposals = shortlistedOnly 
    ? proposals.filter(p => p.shortlisted)
    : proposals;

  const handleSelectProposal = (proposalId: string) => {
    setSelectedProposals(prev => 
      prev.includes(proposalId)
        ? prev.filter(id => id !== proposalId)
        : [...prev, proposalId]
    );
  };

  const handleShortlist = (proposalId: string) => {
    // Toggle shortlist status
    const proposalIndex = proposals.findIndex(p => p.id === proposalId);
    if (proposalIndex !== -1) {
      proposals[proposalIndex].shortlisted = !proposals[proposalIndex].shortlisted;
    }
  };

  const compareProposals = selectedProposals.map(id => 
    proposals.find(p => p.id === id)
  ).filter((proposal): proposal is NonNullable<typeof proposal> => proposal !== undefined);

  const ProposalCard = ({ proposal }: { proposal: any }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3] hover:border-[#FF6B00] transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <input
            type="checkbox"
            checked={selectedProposals.includes(proposal.id)}
            onChange={() => handleSelectProposal(proposal.id)}
            className="mt-1 h-4 w-4 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
          />
          <div className="flex items-start space-x-3">
            <img
              src={proposal.freelancer.avatar}
              alt={proposal.freelancer.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-[#2E2E2E]">{proposal.freelancer.name}</h3>
                {proposal.freelancer.verified && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.259.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className="text-sm text-[#2E2E2E]/60">{proposal.title}</p>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-[#2E2E2E]">{proposal.freelancer.rating}</span>
                  <div className="flex">
                    {[1,2,3,4,5].map((star) => (
                      <svg key={star} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-[#2E2E2E]/60">({proposal.freelancer.reviews})</span>
                </div>
                <span className="text-sm text-[#2E2E2E]/60">{proposal.freelancer.location}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="text-center">
            <div className="text-lg font-bold text-[#FF6B00]">{proposal.fitScore}%</div>
            <div className="text-xs text-[#2E2E2E]/60">Match</div>
          </div>
          <button
            onClick={() => handleShortlist(proposal.id)}
            className={`p-2 rounded-lg transition-colors ${
              proposal.shortlisted 
                ? 'bg-[#FF6B00] text-white' 
                : 'bg-[#ffeee3] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
        <div>
          <div className="font-semibold text-[#2E2E2E]">{proposal.bid}</div>
          <div className="text-xs text-[#2E2E2E]/60">Bid Amount</div>
        </div>
        <div>
          <div className="font-semibold text-[#2E2E2E]">{proposal.duration}</div>
          <div className="text-xs text-[#2E2E2E]/60">Duration</div>
        </div>
        <div>
          <div className="font-semibold text-[#2E2E2E]">{proposal.responseTime}</div>
          <div className="text-xs text-[#2E2E2E]/60">Response</div>
        </div>
      </div>

      <p className="text-sm text-[#2E2E2E]/80 mb-4 line-clamp-3">{proposal.coverLetter}</p>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-[#2E2E2E] mb-2">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {proposal.skills.map((skill: string) => (
            <span key={skill} className="px-2 py-1 bg-[#ffeee3] text-[#FF6B00] text-xs rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#ffeee3]">
        <div className="flex items-center space-x-4 text-sm text-[#2E2E2E]/60">
          <span>{proposal.completionRate}% Success Rate</span>
          <span>{proposal.portfolio.length} Portfolio Items</span>
        </div>
        <div className="flex items-center space-x-2">
          <Link 
            to={`/client/freelancer/${proposal.id}`}
            className="text-[#FF6B00] hover:text-[#FF9F45] text-sm font-medium"
          >
            View Profile
          </Link>
          <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-3 py-1 rounded-md text-sm font-medium transition-colors">
            Message
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shortlist & Compare</h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Review proposals, shortlist your favorites, and compare freelancers side-by-side to make the best hiring decision.
            </p>
            
            {selectedProposals.length > 1 && (
              <button
                onClick={() => setCompareMode(!compareMode)}
                className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                {compareMode ? 'Exit Comparison' : `Compare Selected (${selectedProposals.length})`}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="py-8 bg-white border-b border-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-[#2E2E2E]/60">
                  Showing {filteredProposals.length} of {proposals.length} proposals
                </div>
                
                {selectedProposals.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-[#2E2E2E]/60">
                      {selectedProposals.length} selected
                    </span>
                    <button className="px-3 py-1 bg-[#FF6B00] text-white text-sm rounded-md hover:bg-[#FF9F45] transition-colors">
                      Shortlist All
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors">
                      Reject All
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={shortlistedOnly}
                    onChange={(e) => setShortlistedOnly(e.target.checked)}
                    className="h-4 w-4 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                  />
                  <span className="text-sm text-[#2E2E2E]">Shortlisted only</span>
                </label>
                
                <select className="px-4 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent">
                  <option value="match">Sort by Match</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="reviews">Most Reviews</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            
            {compareMode && selectedProposals.length > 1 ? (
              /* Comparison View */
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#2E2E2E] mb-2">Compare Proposals</h2>
                  <p className="text-[#2E2E2E]/60">Side-by-side comparison of selected freelancers</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {compareProposals.map((proposal) => (
                    <div key={proposal.id} className="bg-white rounded-xl shadow-sm p-6 border-2 border-[#FF6B00]">
                      <div className="text-center mb-6">
                        <img
                          src={proposal.freelancer.avatar}
                          alt={proposal.freelancer.name}
                          className="w-16 h-16 rounded-full object-cover mx-auto mb-3"
                        />
                        <h3 className="font-bold text-[#2E2E2E]">{proposal.freelancer.name}</h3>
                        <p className="text-sm text-[#2E2E2E]/60">{proposal.title}</p>
                        <div className="text-2xl font-bold text-[#FF6B00] mt-2">{proposal.fitScore}%</div>
                        <div className="text-xs text-[#2E2E2E]/60">Match Score</div>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="font-semibold text-[#2E2E2E]">{proposal.bid}</div>
                            <div className="text-xs text-[#2E2E2E]/60">Bid</div>
                          </div>
                          <div>
                            <div className="font-semibold text-[#2E2E2E]">{proposal.duration}</div>
                            <div className="text-xs text-[#2E2E2E]/60">Timeline</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="font-semibold text-[#2E2E2E]">{proposal.freelancer.rating}</div>
                            <div className="text-xs text-[#2E2E2E]/60">Rating</div>
                          </div>
                          <div>
                            <div className="font-semibold text-[#2E2E2E]">{proposal.completionRate}%</div>
                            <div className="text-xs text-[#2E2E2E]/60">Success</div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-[#2E2E2E] mb-2">Top Skills</h4>
                          <div className="flex flex-wrap gap-1">
                            {proposal.skills.slice(0, 4).map((skill: string) => (
                              <span key={skill} className="px-2 py-1 bg-[#ffeee3] text-[#FF6B00] text-xs rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button className="flex-1 bg-[#FF6B00] hover:bg-[#FF9F45] text-white py-2 rounded-lg text-sm font-medium transition-colors">
                            Hire Now
                          </button>
                          <button className="px-3 py-2 border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white rounded-lg text-sm transition-colors">
                            Message
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* List View */
              <div className="space-y-6">
                {filteredProposals.map((proposal) => (
                  <ProposalCard key={proposal.id} proposal={proposal} />
                ))}
              </div>
            )}

            {filteredProposals.length === 0 && (
              <div className="text-center py-12">
                <div className="text-[#2E2E2E]/40 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-[#2E2E2E] mb-2">No proposals found</h3>
                <p className="text-[#2E2E2E]/60">
                  {shortlistedOnly 
                    ? "You haven't shortlisted any proposals yet." 
                    : "No proposals match your current filters."
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShortlistComparePage;
