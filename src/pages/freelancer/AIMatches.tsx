import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Target,
  Star,
  Clock,
  DollarSign,
  Users,
  Bookmark,
  Eye,
  TrendingUp,
  Bot,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Sparkles,
  MapPin
} from 'lucide-react';

const AIMatches: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('fit-score');
  const [bookmarkedJobs, setBookmarkedJobs] = useState<number[]>([]);

  const matches = [
    {
      id: 1,
      title: 'Senior React Developer for E-commerce Platform',
      client: {
        name: 'TechCorp Solutions',
        location: 'United States',
        rating: 4.8,
        reviewsCount: 127,
        verified: true,
        avatar: '/api/placeholder/50/50'
      },
      description: 'We need an experienced React developer to build a comprehensive e-commerce platform with advanced features including payment integration, inventory management, and user authentication.',
      budget: {
        type: 'fixed',
        min: 4000,
        max: 6000
      },
      duration: '3-4 months',
      experienceLevel: 'Expert',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
      proposals: 8,
      postedTime: '2 hours ago',
      fitScore: 98,
      aiInsights: {
        whyMatch: [
          'Your React expertise perfectly aligns with requirements',
          'Experience with e-commerce projects matches client needs',
          'Budget range fits your typical project scope',
          'Client has positive history with similar developers'
        ],
        successPrediction: 'Very High',
        competitionLevel: 'Low',
        responseTime: '2 hours average'
      }
    },
    {
      id: 2,
      title: 'Full Stack Web Application Development',
      client: {
        name: 'InnovateTech Inc',
        location: 'Canada',
        rating: 4.7,
        reviewsCount: 89,
        verified: true,
        avatar: '/api/placeholder/50/50'
      },
      description: 'Looking for a full stack developer to create a SaaS application with React frontend and Node.js backend. Must have experience with database design and API development.',
      budget: {
        type: 'hourly',
        min: 45,
        max: 65
      },
      duration: '2-3 months',
      experienceLevel: 'Expert',
      skills: ['React', 'Node.js', 'PostgreSQL', 'Express.js', 'Docker'],
      proposals: 12,
      postedTime: '4 hours ago',
      fitScore: 95,
      aiInsights: {
        whyMatch: [
          'Strong match in full stack development skills',
          'SaaS experience aligns with client requirements',
          'Hourly rate matches your preferred range',
          'Client timeline fits your availability'
        ],
        successPrediction: 'High',
        competitionLevel: 'Medium',
        responseTime: '4 hours average'
      }
    },
    {
      id: 3,
      title: 'Modern React Dashboard Development',
      client: {
        name: 'DataViz Solutions',
        location: 'United Kingdom',
        rating: 4.9,
        reviewsCount: 156,
        verified: true,
        avatar: '/api/placeholder/50/50'
      },
      description: 'We need a React specialist to build an analytics dashboard with complex data visualizations, real-time updates, and responsive design.',
      budget: {
        type: 'fixed',
        min: 2500,
        max: 4000
      },
      duration: '6-8 weeks',
      experienceLevel: 'Intermediate',
      skills: ['React', 'D3.js', 'Chart.js', 'WebSocket', 'CSS3'],
      proposals: 15,
      postedTime: '6 hours ago',
      fitScore: 92,
      aiInsights: {
        whyMatch: [
          'Data visualization skills highly relevant',
          'React dashboard experience is a perfect fit',
          'Budget aligns with your project preferences',
          'Timeline matches your current availability'
        ],
        successPrediction: 'High',
        competitionLevel: 'Medium',
        responseTime: '3 hours average'
      }
    },
    {
      id: 4,
      title: 'React Native Mobile App Development',
      client: {
        name: 'MobileFirst Co',
        location: 'Australia',
        rating: 4.6,
        reviewsCount: 73,
        verified: false,
        avatar: '/api/placeholder/50/50'
      },
      description: 'Seeking a React Native developer to build a cross-platform mobile app for our logistics company. Integration with GPS tracking and real-time notifications required.',
      budget: {
        type: 'fixed',
        min: 3500,
        max: 5500
      },
      duration: '2-4 months',
      experienceLevel: 'Expert',
      skills: ['React Native', 'JavaScript', 'Firebase', 'GPS Integration', 'Push Notifications'],
      proposals: 6,
      postedTime: '8 hours ago',
      fitScore: 88,
      aiInsights: {
        whyMatch: [
          'React Native skills complement your React expertise',
          'Mobile development aligns with portfolio expansion',
          'Budget range fits your project expectations',
          'Lower competition increases win probability'
        ],
        successPrediction: 'Medium-High',
        competitionLevel: 'Low',
        responseTime: '6 hours average'
      }
    },
    {
      id: 5,
      title: 'TypeScript & React Performance Optimization',
      client: {
        name: 'PerformancePro Ltd',
        location: 'Germany',
        rating: 4.8,
        reviewsCount: 94,
        verified: true,
        avatar: '/api/placeholder/50/50'
      },
      description: 'Need an expert to optimize our existing React application built with TypeScript. Focus on performance improvements, code refactoring, and best practices implementation.',
      budget: {
        type: 'hourly',
        min: 50,
        max: 75
      },
      duration: '4-6 weeks',
      experienceLevel: 'Expert',
      skills: ['React', 'TypeScript', 'Performance Optimization', 'Code Refactoring', 'Testing'],
      proposals: 9,
      postedTime: '1 day ago',
      fitScore: 90,
      aiInsights: {
        whyMatch: [
          'TypeScript expertise directly matches requirements',
          'Performance optimization aligns with your specialization',
          'Premium hourly rate suits your experience level',
          'Optimization projects showcase advanced skills'
        ],
        successPrediction: 'High',
        competitionLevel: 'Medium',
        responseTime: '5 hours average'
      }
    }
  ];

  const filters = [
    { id: 'all', label: 'All Matches', count: matches.length },
    { id: 'high-fit', label: 'High Fit (90%+)', count: matches.filter(m => m.fitScore >= 90).length },
    { id: 'new', label: 'New Today', count: matches.filter(m => m.postedTime.includes('hours')).length },
    { id: 'low-competition', label: 'Low Competition', count: matches.filter(m => m.aiInsights.competitionLevel === 'Low').length }
  ];

  const filteredMatches = matches.filter(match => {
    switch (selectedFilter) {
      case 'high-fit':
        return match.fitScore >= 90;
      case 'new':
        return match.postedTime.includes('hours');
      case 'low-competition':
        return match.aiInsights.competitionLevel === 'Low';
      default:
        return true;
    }
  });

  const toggleBookmark = (jobId: number) => {
    setBookmarkedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const getSuccessColor = (prediction: string) => {
    switch (prediction) {
      case 'Very High':
        return 'text-green-700 bg-green-100';
      case 'High':
        return 'text-green-600 bg-green-50';
      case 'Medium-High':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getCompetitionColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'text-green-700 bg-green-100';
      case 'Medium':
        return 'text-yellow-700 bg-yellow-100';
      case 'High':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#2E2E2E]">AI Job Matches</h1>
              <p className="text-[#2E2E2E]/70">Personalized job recommendations powered by AI</p>
            </div>
          </div>

          {/* AI Insights Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">How AI Matching Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-[#2E2E2E]/80">Analyzes your skills & experience</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-[#2E2E2E]/80">Matches client requirements</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-[#2E2E2E]/80">Predicts success probability</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Filter Matches</h3>
              
              <div className="space-y-3">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedFilter === filter.id
                        ? 'bg-[#ffeee3] text-[#FF6B00] border border-[#FF6B00]'
                        : 'bg-gray-50 text-[#2E2E2E] hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{filter.label}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedFilter === filter.id
                          ? 'bg-[#FF6B00] text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {filter.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
              >
                <option value="fit-score">Best Fit Score</option>
                <option value="newest">Newest First</option>
                <option value="budget-high">Highest Budget</option>
                <option value="least-proposals">Fewest Proposals</option>
                <option value="success-prediction">Success Prediction</option>
              </select>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-[#2E2E2E]/70">
                Showing {filteredMatches.length} AI-matched jobs for you
              </p>
            </div>

            {/* Job Matches */}
            <div className="space-y-6">
              {filteredMatches.map((match) => (
                <div key={match.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center`}>
                          <Target className="w-3 h-3 mr-1" />
                          {match.fitScore}% Match
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSuccessColor(match.aiInsights.successPrediction)}`}>
                          {match.aiInsights.successPrediction} Success
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCompetitionColor(match.aiInsights.competitionLevel)}`}>
                          {match.aiInsights.competitionLevel} Competition
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-[#2E2E2E] mb-2 hover:text-[#FF6B00] cursor-pointer">
                        <Link to={`/freelancer/job-details/${match.id}`}>
                          {match.title}
                        </Link>
                      </h3>
                      <p className="text-[#2E2E2E]/70 mb-4 line-clamp-2">{match.description}</p>
                    </div>
                    
                    <button
                      onClick={() => toggleBookmark(match.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        bookmarkedJobs.includes(match.id)
                          ? 'text-[#FF6B00] bg-[#ffeee3]'
                          : 'text-gray-400 hover:text-[#FF6B00] hover:bg-[#ffeee3]'
                      }`}
                    >
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={match.client.avatar}
                      alt={match.client.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-[#2E2E2E]">{match.client.name}</p>
                        {match.client.verified && (
                          <span className="text-green-500 text-xs">✓ Verified</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-[#2E2E2E]/60">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                          {match.client.rating} ({match.client.reviewsCount} reviews)
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {match.client.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-[#FF6B00]" />
                      <div>
                        <p className="text-sm font-medium text-[#2E2E2E]">
                          {match.budget.type === 'fixed' 
                            ? `$${match.budget.min.toLocaleString()} - $${match.budget.max.toLocaleString()}`
                            : `$${match.budget.min} - $${match.budget.max}/hr`
                          }
                        </p>
                        <p className="text-xs text-[#2E2E2E]/60">
                          {match.budget.type === 'fixed' ? 'Fixed Price' : 'Hourly'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-[#FF6B00]" />
                      <div>
                        <p className="text-sm font-medium text-[#2E2E2E]">{match.duration}</p>
                        <p className="text-xs text-[#2E2E2E]/60">Duration</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-[#FF6B00]" />
                      <div>
                        <p className="text-sm font-medium text-[#2E2E2E]">{match.experienceLevel}</p>
                        <p className="text-xs text-[#2E2E2E]/60">Experience</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-[#FF6B00]" />
                      <div>
                        <p className="text-sm font-medium text-[#2E2E2E]">{match.proposals} proposals</p>
                        <p className="text-xs text-[#2E2E2E]/60">Competition</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {match.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-[#ffeee3] text-[#FF6B00] text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* AI Insights */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Lightbulb className="w-4 h-4 text-blue-600" />
                      <h4 className="font-medium text-[#2E2E2E]">AI Insights: Why This is a Great Match</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {match.aiInsights.whyMatch.map((reason, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-sm text-[#2E2E2E]/80">{reason}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center space-x-4 mt-3 text-xs text-[#2E2E2E]/60">
                      <span>Avg. client response: {match.aiInsights.responseTime}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-[#2E2E2E]/60">
                      Posted {match.postedTime}
                    </div>
                    <div className="flex space-x-3">
                      <Link
                        to={`/freelancer/job-details/${match.id}`}
                        className="border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Link>
                      <Link
                        to={`/freelancer/proposal-composer?job=${match.id}&ai=true`}
                        className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                      >
                        <Bot className="w-4 h-4 mr-2" />
                        Draft with AI
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="bg-[#ffeee3] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center mx-auto">
                Load More Matches
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMatches;
