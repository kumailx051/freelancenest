import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ThumbsUp, Award, Clock, Users, ExternalLink, BookOpen, Coffee, Gift, TrendingUp } from 'lucide-react';

const CommunityContributionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'my-contributions' | 'leaderboard'>('overview');
  
  // Sample contribution stats
  const contributionStats = {
    totalPoints: 835,
    rank: 42,
    answers: 28,
    tutorials: 4,
    blogs: 3,
    discussions: 16,
    upvotes: 247,
    badges: [
      { name: 'Helpful', level: 'Gold', icon: 'thumbs-up' },
      { name: 'Teacher', level: 'Silver', icon: 'book-open' },
      { name: 'Enthusiast', level: 'Bronze', icon: 'coffee' },
    ]
  };
  
  // Sample contribution history
  const contributionHistory = [
    {
      id: 1,
      type: 'Answer',
      title: 'How to optimize React rendering performance with useMemo?',
      date: '2 days ago',
      points: 25,
      upvotes: 18,
      responses: 3,
      status: 'Approved'
    },
    {
      id: 2,
      type: 'Tutorial',
      title: 'Building a responsive dashboard with Tailwind CSS',
      date: '1 week ago',
      points: 120,
      upvotes: 47,
      responses: 12,
      status: 'Featured'
    },
    {
      id: 3,
      type: 'Blog',
      title: '5 Essential Tips for Freelancers Starting Their Career in 2023',
      date: '3 weeks ago',
      points: 85,
      upvotes: 32,
      responses: 8,
      status: 'Approved'
    },
    {
      id: 4,
      type: 'Discussion',
      title: 'What project management tools do you use for client projects?',
      date: '1 month ago',
      points: 15,
      upvotes: 24,
      responses: 21,
      status: 'Active'
    }
  ];
  
  // Sample contribution opportunities
  const contributionOpportunities = [
    {
      id: 1,
      title: 'Answer Questions',
      description: 'Help fellow freelancers by answering their questions in the community forum',
      points: '10-50 points per answer',
      time: '~15 minutes',
      difficulty: 'Easy',
      icon: 'message-circle'
    },
    {
      id: 2,
      title: 'Write Tutorials',
      description: 'Create step-by-step tutorials on topics you\'re knowledgeable about',
      points: '100-200 points per tutorial',
      time: '1-2 hours',
      difficulty: 'Medium',
      icon: 'book-open'
    },
    {
      id: 3,
      title: 'Host Webinars',
      description: 'Share your expertise through live webinars on technical or freelancing topics',
      points: '300 points per webinar',
      time: '1-3 hours',
      difficulty: 'Hard',
      icon: 'users'
    },
    {
      id: 4,
      title: 'Create Blog Articles',
      description: 'Write informative blog posts about your freelancing experiences or technical insights',
      points: '75-150 points per article',
      time: '2-4 hours',
      difficulty: 'Medium',
      icon: 'coffee'
    }
  ];
  
  // Sample rewards
  const communityRewards = [
    {
      id: 1,
      title: 'Profile Boost',
      description: 'Get your profile boosted in search results for 1 week',
      points: 500,
      featured: false
    },
    {
      id: 2,
      title: 'Premium Badge',
      description: 'Earn a "Community Expert" badge on your profile',
      points: 1000,
      featured: false
    },
    {
      id: 3,
      title: 'Featured Tutorial',
      description: 'Get your tutorial featured on the platform homepage',
      points: 1500,
      featured: false
    },
    {
      id: 4,
      title: 'Commission Discount',
      description: 'Receive a 30% discount on platform fees for 1 month',
      points: 2000,
      featured: true
    }
  ];
  
  // Sample leaderboard data
  const leaderboardData = [
    { id: 1, name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', points: 4856, badges: 12, contributions: 87 },
    { id: 2, name: 'Sophia Chen', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', points: 3742, badges: 10, contributions: 63 },
    { id: 3, name: 'Michael Rodriguez', avatar: 'https://randomuser.me/api/portraits/men/67.jpg', points: 3158, badges: 8, contributions: 52 },
    { id: 4, name: 'Emma Davis', avatar: 'https://randomuser.me/api/portraits/women/28.jpg', points: 2975, badges: 7, contributions: 49 },
    { id: 5, name: 'David Kim', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', points: 2813, badges: 9, contributions: 41 },
    { id: 42, name: 'You', avatar: 'https://randomuser.me/api/portraits/lego/1.jpg', points: 835, badges: 3, contributions: 51 }
  ];

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-r from-primary-500 to-purple-600">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Community Contributions</h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Share your knowledge, help others, and earn rewards while building your reputation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveTab('overview')}
                className="bg-white text-[#FF6B00] hover:bg-[#ffeee3] font-medium px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Start Contributing
              </button>
              <button
                onClick={() => setActiveTab('my-contributions')}
                className="bg-transparent border border-white text-white hover:bg-white/10 font-medium px-6 py-3 rounded-lg transition-colors duration-200"
              >
                View Your Contributions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="section-container">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white p-1 rounded-lg shadow-sm">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-2 rounded-md font-medium ${
                  activeTab === 'overview'
                    ? 'bg-[#FF6B00] text-white'
                    : 'text-[#2E2E2E] hover:bg-[#ffeee3]'
                } transition-colors duration-200`}
              >
                How It Works
              </button>
              <button
                onClick={() => setActiveTab('my-contributions')}
                className={`px-6 py-2 rounded-md font-medium ${
                  activeTab === 'my-contributions'
                    ? 'bg-[#FF6B00] text-white'
                    : 'text-[#2E2E2E] hover:bg-[#ffeee3]'
                } transition-colors duration-200`}
              >
                My Contributions
              </button>
              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`px-6 py-2 rounded-md font-medium ${
                  activeTab === 'leaderboard'
                    ? 'bg-[#FF6B00] text-white'
                    : 'text-[#2E2E2E] hover:bg-[#ffeee3]'
                } transition-colors duration-200`}
              >
                Leaderboard
              </button>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="max-w-5xl mx-auto">
              {/* How It Works */}
              <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
                <h2 className="text-2xl font-bold mb-8">How Community Contributions Work</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="bg-[#ffeee3] h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="h-8 w-8 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">1. Contribute</h3>
                    <p className="text-[#2E2E2E]">
                      Share your knowledge through tutorials, Q&A, webinars, or blog posts
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-[#ffeee3] h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ThumbsUp className="h-8 w-8 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">2. Get Upvoted</h3>
                    <p className="text-[#2E2E2E]">
                      Valuable contributions receive upvotes from community members
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-[#ffeee3] h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">3. Earn Points</h3>
                    <p className="text-[#2E2E2E]">
                      Each contribution and upvote earns you points based on quality and engagement
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-[#ffeee3] h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Gift className="h-8 w-8 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">4. Redeem Rewards</h3>
                    <p className="text-[#2E2E2E]">
                      Use your points to unlock special perks, badges, and visibility benefits
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Contribution Opportunities */}
              <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
                <h2 className="text-2xl font-bold mb-6">Ways to Contribute</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {contributionOpportunities.map((opportunity) => (
                    <div 
                      key={opportunity.id}
                      className="border border-[#ffeee3] rounded-lg p-6 hover:border-[#ffeee3] hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex">
                        <div className="bg-[#ffeee3] p-4 rounded-lg mr-4">
                          {opportunity.icon === 'message-circle' && <MessageCircle className="h-6 w-6 text-[#FF6B00]" />}
                          {opportunity.icon === 'book-open' && <BookOpen className="h-6 w-6 text-[#FF6B00]" />}
                          {opportunity.icon === 'users' && <Users className="h-6 w-6 text-[#FF6B00]" />}
                          {opportunity.icon === 'coffee' && <Coffee className="h-6 w-6 text-[#FF6B00]" />}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-2">{opportunity.title}</h3>
                          <p className="text-[#2E2E2E] mb-4">{opportunity.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm">
                              <Award className="h-4 w-4 text-[#FF6B00] mr-1" />
                              <span className="text-[#2E2E2E]">{opportunity.points}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Clock className="h-4 w-4 text-[#ffeee3] mr-1" />
                              <span className="text-[#2E2E2E]">{opportunity.time}</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              opportunity.difficulty === 'Easy'
                                ? 'bg-[#ffeee3] text-[#2E2E2E]'
                                : opportunity.difficulty === 'Medium'
                                ? 'bg-[#ffeee3] text-[#2E2E2E]'
                                : 'bg-[#ffeee3] text-[#2E2E2E]'
                            }`}>
                              {opportunity.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Rewards */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold mb-6">Community Rewards</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {communityRewards.map((reward) => (
                    <div 
                      key={reward.id}
                      className={`rounded-lg p-6 relative ${
                        reward.featured 
                          ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white'
                          : 'bg-white border border-[#ffeee3]'
                      }`}
                    >
                      {reward.featured && (
                        <div className="absolute -top-3 right-4 bg-[#FF9F45] text-[#2E2E2E] text-xs font-bold px-3 py-1 rounded-full">
                          FEATURED
                        </div>
                      )}
                      <h3 className={`text-lg font-bold mb-2 ${reward.featured ? 'text-white' : 'text-[#2E2E2E]'}`}>
                        {reward.title}
                      </h3>
                      <p className={`mb-6 ${reward.featured ? 'text-white opacity-90' : 'text-[#2E2E2E]'}`}>
                        {reward.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className={`flex items-center ${reward.featured ? 'text-white' : 'text-[#FF6B00]'}`}>
                          <Award className="h-5 w-5 mr-1" />
                          <span className="font-bold">{reward.points} points</span>
                        </div>
                        <button 
                          className={`px-3 py-1 rounded-lg text-sm ${
                            reward.featured
                              ? 'bg-white text-[#FF6B00] hover:bg-[#ffeee3]'
                              : 'bg-[#FF6B00] text-white hover:bg-[#2E2E2E]'
                          }`}
                        >
                          Redeem
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <button className="bg-white border border-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3] font-medium px-6 py-3 rounded-lg transition-colors duration-200">
                    View All Rewards
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* My Contributions Tab */}
          {activeTab === 'my-contributions' && (
            <div className="max-w-5xl mx-auto">
              {/* Contribution Stats */}
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <div className="md:flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Your Contribution Stats</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="bg-[#ffeee3] p-4 rounded-lg">
                        <div className="text-sm text-[#ffeee3] mb-1">Total Points</div>
                        <div className="text-2xl font-bold text-[#2E2E2E]">{contributionStats.totalPoints}</div>
                      </div>
                      <div className="bg-[#ffeee3] p-4 rounded-lg">
                        <div className="text-sm text-[#ffeee3] mb-1">Ranking</div>
                        <div className="text-2xl font-bold text-[#2E2E2E]">#{contributionStats.rank}</div>
                      </div>
                      <div className="bg-[#ffeee3] p-4 rounded-lg">
                        <div className="text-sm text-[#ffeee3] mb-1">Total Upvotes</div>
                        <div className="text-2xl font-bold text-[#2E2E2E]">{contributionStats.upvotes}</div>
                      </div>
                      <div className="bg-[#ffeee3] p-4 rounded-lg">
                        <div className="text-sm text-[#ffeee3] mb-1">Contributions</div>
                        <div className="text-2xl font-bold text-[#2E2E2E]">
                          {contributionStats.answers + contributionStats.tutorials + contributionStats.blogs + contributionStats.discussions}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 md:mt-0">
                    <h3 className="text-lg font-bold mb-4">Your Badges</h3>
                    <div className="flex gap-4">
                      {contributionStats.badges.map((badge, index) => (
                        <div key={index} className="text-center">
                          <div className={`h-16 w-16 rounded-full mx-auto mb-2 flex items-center justify-center ${
                            badge.level === 'Gold' 
                              ? 'bg-[#ffeee3] text-[#2E2E2E]'
                              : badge.level === 'Silver'
                              ? 'bg-[#ffeee3] text-[#2E2E2E]'
                              : 'bg-[#ffeee3] text-[#FF6B00]'
                          }`}>
                            {badge.icon === 'thumbs-up' && <ThumbsUp className="h-8 w-8" />}
                            {badge.icon === 'book-open' && <BookOpen className="h-8 w-8" />}
                            {badge.icon === 'coffee' && <Coffee className="h-8 w-8" />}
                          </div>
                          <div className="text-sm font-medium">{badge.name}</div>
                          <div className={`text-xs ${
                            badge.level === 'Gold' 
                              ? 'text-[#2E2E2E]'
                              : badge.level === 'Silver'
                              ? 'text-[#2E2E2E]'
                              : 'text-[#FF6B00]'
                          }`}>
                            {badge.level}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contribution Breakdown */}
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h3 className="text-lg font-bold mb-4">Contribution Breakdown</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 border border-[#ffeee3] rounded-lg">
                    <div className="bg-[#ffeee3] h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MessageCircle className="h-6 w-6 text-[#FF6B00]" />
                    </div>
                    <div className="text-2xl font-bold">{contributionStats.answers}</div>
                    <div className="text-sm text-[#ffeee3]">Questions Answered</div>
                  </div>
                  <div className="text-center p-4 border border-[#ffeee3] rounded-lg">
                    <div className="bg-[#ffeee3] h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="h-6 w-6 text-[#FF6B00]" />
                    </div>
                    <div className="text-2xl font-bold">{contributionStats.tutorials}</div>
                    <div className="text-sm text-[#ffeee3]">Tutorials Created</div>
                  </div>
                  <div className="text-center p-4 border border-[#ffeee3] rounded-lg">
                    <div className="bg-[#ffeee3] h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Coffee className="h-6 w-6 text-[#FF6B00]" />
                    </div>
                    <div className="text-2xl font-bold">{contributionStats.blogs}</div>
                    <div className="text-sm text-[#ffeee3]">Blog Posts</div>
                  </div>
                  <div className="text-center p-4 border border-[#ffeee3] rounded-lg">
                    <div className="bg-[#ffeee3] h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-[#FF6B00]" />
                    </div>
                    <div className="text-2xl font-bold">{contributionStats.discussions}</div>
                    <div className="text-sm text-[#ffeee3]">Discussions</div>
                  </div>
                </div>
              </div>
              
              {/* Recent Contributions */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-[#ffeee3] flex justify-between items-center">
                  <h3 className="text-xl font-bold">Recent Contributions</h3>
                  <div>
                    <select className="text-sm border border-[#ffeee3] rounded-md px-3 py-2">
                      <option>All Types</option>
                      <option>Answers</option>
                      <option>Tutorials</option>
                      <option>Blog Posts</option>
                      <option>Discussions</option>
                    </select>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#ffeee3]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">
                          Points
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">
                          Engagement
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {contributionHistory.map((contribution) => (
                        <tr key={contribution.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              contribution.type === 'Answer'
                                ? 'bg-[#ffeee3] text-[#2E2E2E]'
                                : contribution.type === 'Tutorial'
                                ? 'bg-[#ffeee3] text-[#2E2E2E]'
                                : contribution.type === 'Blog'
                                ? 'bg-[#ffeee3] text-[#2E2E2E]'
                                : 'bg-[#ffeee3] text-[#2E2E2E]'
                            }`}>
                              {contribution.type}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <a href="#" className="text-sm font-medium text-[#2E2E2E] hover:text-[#FF6B00]">
                                {contribution.title}
                              </a>
                              <ExternalLink className="h-3 w-3 ml-1 text-[#ffeee3]" />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-[#ffeee3]">{contribution.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm font-medium text-[#2E2E2E]">
                              <Award className="h-4 w-4 text-[#FF6B00] mr-1" />
                              {contribution.points}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-[#ffeee3]">
                              <ThumbsUp className="h-4 w-4 text-[#ffeee3] mr-1" />
                              {contribution.upvotes}
                              <MessageCircle className="h-4 w-4 text-[#ffeee3] ml-2 mr-1" />
                              {contribution.responses}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              contribution.status === 'Approved'
                                ? 'bg-[#ffeee3] text-[#2E2E2E]'
                                : contribution.status === 'Featured'
                                ? 'bg-[#ffeee3] text-[#2E2E2E]'
                                : contribution.status === 'Active'
                                ? 'bg-[#ffeee3] text-[#2E2E2E]'
                                : 'bg-[#ffeee3] text-[#2E2E2E]'
                            }`}>
                              {contribution.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-6 border-t border-[#ffeee3] flex justify-between items-center">
                  <div className="text-sm text-[#2E2E2E]">
                    Showing <span className="font-medium">4</span> of <span className="font-medium">51</span> contributions
                  </div>
                  <div className="flex space-x-2">
                    <button className="border border-[#ffeee3] rounded-md px-3 py-1 text-sm">
                      Previous
                    </button>
                    <button className="border border-[#ffeee3] bg-[#ffeee3] rounded-md px-3 py-1 text-sm">
                      1
                    </button>
                    <button className="border border-[#ffeee3] rounded-md px-3 py-1 text-sm">
                      2
                    </button>
                    <button className="border border-[#ffeee3] rounded-md px-3 py-1 text-sm">
                      3
                    </button>
                    <button className="border border-[#ffeee3] rounded-md px-3 py-1 text-sm">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Leaderboard Tab */}
          {activeTab === 'leaderboard' && (
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-[#ffeee3]">
                  <h3 className="text-xl font-bold">Community Leaderboard</h3>
                </div>
                
                {/* Top 3 Contributors */}
                <div className="p-8">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16">
                    <div className="order-2 md:order-1 text-center">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-silver mx-auto">
                          <img src={leaderboardData[1].avatar} alt={leaderboardData[1].name} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-silver text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                          2
                        </div>
                      </div>
                      <h4 className="mt-4 font-bold">{leaderboardData[1].name}</h4>
                      <div className="text-sm text-[#ffeee3]">{leaderboardData[1].points} points</div>
                    </div>
                    
                    <div className="order-1 md:order-2 text-center">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#FF9F45] mx-auto">
                          <img src={leaderboardData[0].avatar} alt={leaderboardData[0].name} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#FF9F45] text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                          1
                        </div>
                      </div>
                      <h4 className="mt-4 font-bold">{leaderboardData[0].name}</h4>
                      <div className="text-sm text-[#ffeee3]">{leaderboardData[0].points} points</div>
                      <div className="mt-1">
                        <span className="bg-[#ffeee3] text-[#2E2E2E] text-xs px-2 py-1 rounded-full">
                          Top Contributor
                        </span>
                      </div>
                    </div>
                    
                    <div className="order-3 text-center">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#FF6B00] mx-auto">
                          <img src={leaderboardData[2].avatar} alt={leaderboardData[2].name} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#ffeee3] text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                          3
                        </div>
                      </div>
                      <h4 className="mt-4 font-bold">{leaderboardData[2].name}</h4>
                      <div className="text-sm text-[#ffeee3]">{leaderboardData[2].points} points</div>
                    </div>
                  </div>
                </div>
                
                {/* Full Leaderboard */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#ffeee3]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">
                          Rank
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">
                          Contributor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">
                          Points
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">
                          Badges
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">
                          Contributions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {leaderboardData.slice(3, 5).map((user, index) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-[#2E2E2E]">{index + 4}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-[#2E2E2E]">{user.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-[#2E2E2E]">{user.points}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Award className="h-4 w-4 text-[#FF6B00] mr-1" />
                              <span className="text-sm text-[#2E2E2E]">{user.badges}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-[#2E2E2E]">{user.contributions}</div>
                          </td>
                        </tr>
                      ))}
                      
                      {/* More rows between top 5 and user's ranking */}
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center">
                          <div className="border-t border-b border-dashed border-[#ffeee3] py-2 text-[#ffeee3]">
                            â€¢ â€¢ â€¢
                          </div>
                        </td>
                      </tr>
                      
                      {/* User's ranking */}
                      <tr className="bg-[#ffeee3]">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-[#2E2E2E]">#{contributionStats.rank}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                              <img src={leaderboardData[5].avatar} alt={leaderboardData[5].name} className="h-full w-full object-cover" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-[#2E2E2E]">{leaderboardData[5].name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-[#2E2E2E]">{leaderboardData[5].points}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Award className="h-4 w-4 text-[#FF6B00] mr-1" />
                            <span className="text-sm text-[#2E2E2E]">{leaderboardData[5].badges}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-[#2E2E2E]">{leaderboardData[5].contributions}</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="p-6 border-t border-[#ffeee3] flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-[#2E2E2E]">
                    Ranked <span className="font-medium">#{contributionStats.rank}</span> out of <span className="font-medium">3,427</span> contributors this month
                  </div>
                  <button className="bg-[#FF6B00] text-white hover:bg-[#2E2E2E] px-4 py-2 rounded-lg text-sm transition-colors duration-200 flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    Improve Your Ranking
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">Benefits of Community Contributions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-[#FF6B00] mb-4">
                  <Award className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-bold mb-2">Build Your Reputation</h3>
                <p className="text-[#2E2E2E]">
                  Establish yourself as an expert in your field and gain visibility among potential clients and collaborators.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-[#FF6B00] mb-4">
                  <TrendingUp className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-bold mb-2">Boost Your Profile</h3>
                <p className="text-[#2E2E2E]">
                  Earn badges and rewards that enhance your profile's visibility in search results and client recommendations.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-[#FF6B00] mb-4">
                  <Users className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-bold mb-2">Expand Your Network</h3>
                <p className="text-[#2E2E2E]">
                  Connect with other professionals, build relationships, and discover new collaboration opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#FF6B00] text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Start Contributing Today</h2>
            <p className="text-xl opacity-90 mb-8">
              Share your knowledge, help others, and build your professional reputation while earning rewards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveTab('overview')}
                className="bg-white text-[#FF6B00] hover:bg-[#ffeee3] font-medium px-8 py-4 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Join Community Forum
              </button>
              <Link to="/ways-to-earn" className="bg-transparent border border-white text-white hover:bg-white/10 font-medium px-8 py-4 rounded-lg text-lg transition-colors duration-200 inline-block">
                Explore More Ways to Earn
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommunityContributionsPage;

















