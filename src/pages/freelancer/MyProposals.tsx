import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Edit,
  Trash2,
  Copy,
  MessageCircle,
  Calendar,
  DollarSign,
  Clock,
  TrendingUp,
  XCircle,
  AlertCircle,
  Users,
  Search,
  MoreHorizontal,
  Star,
  Award
} from 'lucide-react';

const MyProposals: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const proposals = [
    {
      id: 1,
      jobTitle: 'Full Stack React Developer for E-commerce Platform',
      client: 'TechCorp Solutions',
      submittedDate: '2024-01-15',
      status: 'interviewing',
      proposedAmount: 4200,
      clientBudget: '$3,000 - $5,000',
      coverLetter: 'Dear TechCorp Solutions, I\'m excited about the opportunity to work on your e-commerce platform...',
      timeline: '10 weeks',
      clientResponse: 'We\'d like to schedule an interview. Are you available this week?',
      responseDate: '2024-01-16',
      isInvited: false,
      clientRating: 4.8,
      clientReviews: 127,
      lastActivity: '2 days ago'
    },
    {
      id: 2,
      jobTitle: 'Mobile App UI/UX Designer Needed',
      client: 'StartupXYZ',
      submittedDate: '2024-01-12',
      status: 'submitted',
      proposedAmount: 2800,
      clientBudget: '$2,000 - $4,000',
      coverLetter: 'Hello StartupXYZ team, I\'m a seasoned UI/UX designer with extensive mobile app experience...',
      timeline: '6 weeks',
      clientResponse: null,
      responseDate: null,
      isInvited: false,
      clientRating: 4.6,
      clientReviews: 45,
      lastActivity: '5 days ago'
    },
    {
      id: 3,
      jobTitle: 'Python Data Analysis for Marketing Campaign',
      client: 'Marketing Pro Agency',
      submittedDate: '2024-01-10',
      status: 'rejected',
      proposedAmount: 1800,
      clientBudget: '$1,500 - $2,500',
      coverLetter: 'Hi Marketing Pro Agency, I\'m a data scientist with 3+ years of experience...',
      timeline: '3 weeks',
      clientResponse: 'Thank you for your proposal. We decided to go with another candidate.',
      responseDate: '2024-01-14',
      isInvited: false,
      clientRating: 4.9,
      clientReviews: 89,
      lastActivity: '1 week ago'
    },
    {
      id: 4,
      jobTitle: 'WordPress Website Development and Customization',
      client: 'Business Solutions Ltd',
      submittedDate: '2024-01-08',
      status: 'draft',
      proposedAmount: 2500,
      clientBudget: '$2,000 - $3,500',
      coverLetter: 'Dear Business Solutions Ltd, I\'m a WordPress expert with over 4 years...',
      timeline: '5 weeks',
      clientResponse: null,
      responseDate: null,
      isInvited: true,
      clientRating: 4.7,
      clientReviews: 76,
      lastActivity: '1 week ago'
    },
    {
      id: 5,
      jobTitle: 'React Native Mobile App Development',
      client: 'FoodieApp Inc',
      submittedDate: '2024-01-05',
      status: 'interviewing',
      proposedAmount: 5500,
      clientBudget: '$4,000 - $7,000',
      coverLetter: 'Hello FoodieApp Inc, I\'m thrilled about the opportunity to develop your food delivery app...',
      timeline: '12 weeks',
      clientResponse: 'Your proposal looks promising. Let\'s schedule a video call to discuss the project details.',
      responseDate: '2024-01-06',
      isInvited: false,
      clientRating: 4.8,
      clientReviews: 102,
      lastActivity: '3 days ago'
    }
  ];

  const tabs = [
    { id: 'all', label: 'All', count: proposals.length },
    { id: 'draft', label: 'Draft', count: proposals.filter(p => p.status === 'draft').length },
    { id: 'submitted', label: 'Submitted', count: proposals.filter(p => p.status === 'submitted').length },
    { id: 'interviewing', label: 'Interviewing', count: proposals.filter(p => p.status === 'interviewing').length },
    { id: 'rejected', label: 'Rejected', count: proposals.filter(p => p.status === 'rejected').length }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <Edit className="w-4 h-4 text-gray-500" />;
      case 'submitted':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'interviewing':
        return <Users className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'interviewing':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProposals = proposals.filter(proposal => {
    const matchesTab = selectedTab === 'all' || proposal.status === selectedTab;
    const matchesSearch = proposal.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         proposal.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const duplicateProposal = (proposalId: number) => {
    console.log('Duplicating proposal:', proposalId);
  };

  const withdrawProposal = (proposalId: number) => {
    console.log('Withdrawing proposal:', proposalId);
  };

  const deleteProposal = (proposalId: number) => {
    console.log('Deleting proposal:', proposalId);
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2E2E2E] mb-2">My Proposals</h1>
          <p className="text-[#2E2E2E]/70">Track and manage your job proposals</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#2E2E2E]/60 text-sm font-medium">Total Proposals</p>
                <p className="text-2xl font-bold text-[#2E2E2E]">{proposals.length}</p>
              </div>
              <div className="bg-[#ffeee3] p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-[#FF6B00]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#2E2E2E]/60 text-sm font-medium">Interviewing</p>
                <p className="text-2xl font-bold text-[#2E2E2E]">
                  {proposals.filter(p => p.status === 'interviewing').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#2E2E2E]/60 text-sm font-medium">Success Rate</p>
                <p className="text-2xl font-bold text-[#2E2E2E]">25%</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#2E2E2E]/60 text-sm font-medium">Avg. Response Time</p>
                <p className="text-2xl font-bold text-[#2E2E2E]">2.5d</p>
              </div>
              <div className="bg-[#ffeee3] p-3 rounded-lg">
                <Clock className="w-6 h-6 text-[#FF6B00]" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-[#FF6B00] text-[#FF6B00]'
                      : 'border-transparent text-[#2E2E2E]/60 hover:text-[#2E2E2E] hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    selectedTab === tab.id
                      ? 'bg-[#ffeee3] text-[#FF6B00]'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Search and Sort */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search proposals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount-high">Highest Amount</option>
                <option value="amount-low">Lowest Amount</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>
        </div>

        {/* Proposals List */}
        <div className="space-y-6">
          {filteredProposals.map((proposal) => (
            <div key={proposal.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-[#2E2E2E] hover:text-[#FF6B00] cursor-pointer">
                      <Link to={`/freelancer/job-details/${proposal.id}`}>
                        {proposal.jobTitle}
                      </Link>
                    </h3>
                    {proposal.isInvited && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        Invited
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-[#2E2E2E]/60">
                    <span>Client: {proposal.client}</span>
                    <span>•</span>
                    <span>Submitted {proposal.submittedDate}</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                      {proposal.clientRating} ({proposal.clientReviews} reviews)
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(proposal.status)}`}>
                    {getStatusIcon(proposal.status)}
                    <span className="ml-1 capitalize">{proposal.status}</span>
                  </span>
                  
                  <div className="relative">
                    <button className="p-2 text-gray-400 hover:text-[#2E2E2E] rounded-lg hover:bg-gray-50">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Proposal Details */}
                <div className="lg:col-span-2">
                  <div className="mb-4">
                    <h4 className="font-medium text-[#2E2E2E] mb-2">Cover Letter</h4>
                    <p className="text-[#2E2E2E]/70 text-sm line-clamp-3">
                      {proposal.coverLetter}
                    </p>
                  </div>

                  {/* Client Response */}
                  {proposal.clientResponse && (
                    <div className="bg-[#ffeee3]/50 border border-[#FF6B00]/20 rounded-lg p-4 mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <MessageCircle className="w-4 h-4 text-[#FF6B00]" />
                        <span className="text-sm font-medium text-[#2E2E2E]">
                          Client Response - {proposal.responseDate}
                        </span>
                      </div>
                      <p className="text-sm text-[#2E2E2E]/80">{proposal.clientResponse}</p>
                    </div>
                  )}

                  {/* Key Details */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <DollarSign className="w-5 h-5 text-[#FF6B00] mx-auto mb-1" />
                      <p className="text-sm font-semibold text-[#2E2E2E]">
                        ${proposal.proposedAmount.toLocaleString()}
                      </p>
                      <p className="text-xs text-[#2E2E2E]/60">Your Bid</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Clock className="w-5 h-5 text-[#FF6B00] mx-auto mb-1" />
                      <p className="text-sm font-semibold text-[#2E2E2E]">{proposal.timeline}</p>
                      <p className="text-xs text-[#2E2E2E]/60">Timeline</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-[#FF6B00] mx-auto mb-1" />
                      <p className="text-sm font-semibold text-[#2E2E2E]">{proposal.clientBudget}</p>
                      <p className="text-xs text-[#2E2E2E]/60">Client Budget</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-[#2E2E2E] mb-3">Actions</h5>
                    <div className="space-y-2">
                      {proposal.status === 'draft' && (
                        <>
                          <Link
                            to={`/freelancer/proposal-composer?job=${proposal.id}`}
                            className="w-full bg-[#FF6B00] hover:bg-[#FF9F45] text-white text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit & Submit
                          </Link>
                          <button
                            onClick={() => deleteProposal(proposal.id)}
                            className="w-full border border-red-300 text-red-600 hover:bg-red-50 text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </button>
                        </>
                      )}
                      
                      {proposal.status === 'submitted' && (
                        <>
                          <button
                            onClick={() => withdrawProposal(proposal.id)}
                            className="w-full border border-orange-300 text-orange-600 hover:bg-orange-50 text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Withdraw
                          </button>
                          <button
                            onClick={() => duplicateProposal(proposal.id)}
                            className="w-full border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center"
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </button>
                        </>
                      )}
                      
                      {proposal.status === 'interviewing' && (
                        <>
                          <Link
                            to={`/freelancer/messages?client=${proposal.client}`}
                            className="w-full bg-[#FF6B00] hover:bg-[#FF9F45] text-white text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Message Client
                          </Link>
                          <Link
                            to={`/freelancer/meetings?schedule=true&client=${proposal.client}`}
                            className="w-full border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center"
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule Meeting
                          </Link>
                        </>
                      )}
                      
                      {proposal.status === 'rejected' && (
                        <button
                          onClick={() => duplicateProposal(proposal.id)}
                          className="w-full bg-[#FF6B00] hover:bg-[#FF9F45] text-white text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Reuse for Similar Job
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="text-xs text-[#2E2E2E]/60 text-center">
                    Last activity: {proposal.lastActivity}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProposals.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-[#2E2E2E] mb-2">No proposals found</h3>
            <p className="text-[#2E2E2E]/60 mb-6">
              {searchQuery 
                ? 'Try adjusting your search criteria'
                : 'Start applying to jobs to see your proposals here'
              }
            </p>
            <Link
              to="/freelancer/job-feed"
              className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Browse Jobs
            </Link>
          </div>
        )}

        {/* Pagination */}
        {filteredProposals.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-[#2E2E2E] hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 bg-[#FF6B00] text-white rounded-lg">1</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-[#2E2E2E] hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-[#2E2E2E] hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProposals;
