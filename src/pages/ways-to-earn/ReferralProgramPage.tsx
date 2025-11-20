import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Copy, Share2, TrendingUp, DollarSign, Gift, Award, Clock } from 'lucide-react';

const ReferralProgramPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'my-referrals' | 'rewards'>('overview');
  
  // Referral stats
  const referralStats = {
    referralCode: 'ALEXSMITH2023',
    link: 'https://freelance-platform.com/join?ref=ALEXSMITH2023',
    totalReferrals: 14,
    activeReferrals: 9,
    pendingReferrals: 5,
    totalEarned: 350,
    availableBalance: 150,
    nextMilestone: 20,
    milestoneReward: 'Premium Badge for 3 months'
  };
  
  // Sample referral history
  const referralHistory = [
    {
      id: 1,
      name: 'Michael Johnson',
      email: 'm******n@gmail.com',
      date: 'Oct 15, 2023',
      status: 'Active',
      earned: 50
    },
    {
      id: 2,
      name: 'Sarah Williams',
      email: 's******s@outlook.com',
      date: 'Sep 28, 2023',
      status: 'Active',
      earned: 50
    },
    {
      id: 3,
      name: 'David Thompson',
      email: 'd******n@yahoo.com',
      date: 'Sep 14, 2023',
      status: 'Pending',
      earned: 0
    },
    {
      id: 4,
      name: 'Jessica Brown',
      email: 'j******n@gmail.com',
      date: 'Aug 22, 2023',
      status: 'Active',
      earned: 50
    },
    {
      id: 5,
      name: 'Robert Miller',
      email: 'r******r@hotmail.com',
      date: 'Aug 10, 2023',
      status: 'Inactive',
      earned: 0
    }
  ];
  
  // Sample rewards
  const availableRewards = [
    {
      id: 1,
      title: 'Cash Bonus',
      description: 'Get $50 for every successful referral who completes their first project',
      type: 'Cash',
      amount: '$50',
      perReferral: true
    },
    {
      id: 2,
      title: 'Featured Freelancer',
      description: 'Get featured in our "Top Freelancers" section for 1 week',
      type: 'Feature',
      requirement: '5 active referrals',
      perReferral: false
    },
    {
      id: 3,
      title: 'Premium Account',
      description: 'Enjoy premium account benefits for 3 months',
      type: 'Membership',
      requirement: '10 active referrals',
      perReferral: false
    },
    {
      id: 4,
      title: 'Commission Discount',
      description: 'Get 50% off platform fees for 2 months',
      type: 'Discount',
      requirement: '15 active referrals',
      perReferral: false
    }
  ];
  
  // Function to copy referral link
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralStats.link)
      .then(() => {
        alert('Referral link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-r from-primary-500 to-purple-600">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Referral Program</h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Earn rewards by inviting talented freelancers and clients to join our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveTab('overview')}
                className="bg-white text-[#FF6B00] hover:bg-[#ffeee3] font-medium px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Start Referring
              </button>
              <button
                onClick={() => setActiveTab('my-referrals')}
                className="bg-transparent border border-white text-white hover:bg-white/10 font-medium px-6 py-3 rounded-lg transition-colors duration-200"
              >
                View Your Rewards
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
                Program Overview
              </button>
              <button
                onClick={() => setActiveTab('my-referrals')}
                className={`px-6 py-2 rounded-md font-medium ${
                  activeTab === 'my-referrals'
                    ? 'bg-[#FF6B00] text-white'
                    : 'text-[#2E2E2E] hover:bg-[#ffeee3]'
                } transition-colors duration-200`}
              >
                My Referrals
              </button>
              <button
                onClick={() => setActiveTab('rewards')}
                className={`px-6 py-2 rounded-md font-medium ${
                  activeTab === 'rewards'
                    ? 'bg-[#FF6B00] text-white'
                    : 'text-[#2E2E2E] hover:bg-[#ffeee3]'
                } transition-colors duration-200`}
              >
                Rewards
              </button>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="max-w-5xl mx-auto">
              {/* Referral Stats */}
              <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
                <h2 className="text-2xl font-bold mb-6">Your Referral Dashboard</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-[#ffeee3] p-5 rounded-lg">
                    <div className="text-sm text-[#ffeee3] mb-1">Total Referrals</div>
                    <div className="text-3xl font-bold text-[#2E2E2E]">{referralStats.totalReferrals}</div>
                    <div className="text-sm text-[#FF6B00] mt-2 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{referralStats.activeReferrals} active</span>
                    </div>
                  </div>
                  
                  <div className="bg-[#ffeee3] p-5 rounded-lg">
                    <div className="text-sm text-[#ffeee3] mb-1">Total Earned</div>
                    <div className="text-3xl font-bold text-[#2E2E2E]">${referralStats.totalEarned}</div>
                    <div className="text-sm text-[#FF6B00] mt-2 flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>${referralStats.availableBalance} available</span>
                    </div>
                  </div>
                  
                  <div className="bg-[#ffeee3] p-5 rounded-lg">
                    <div className="text-sm text-[#ffeee3] mb-1">Next Milestone</div>
                    <div className="text-3xl font-bold text-[#2E2E2E]">{referralStats.nextMilestone}</div>
                    <div className="text-sm text-[#FF6B00] mt-2 flex items-center">
                      <Award className="h-4 w-4 mr-1" />
                      <span>{referralStats.milestoneReward}</span>
                    </div>
                  </div>
                  
                  <div className="bg-[#ffeee3] p-5 rounded-lg">
                    <div className="text-sm text-[#ffeee3] mb-1">Progress</div>
                    <div className="flex items-center">
                      <div className="flex-1 bg-[#ffeee3] rounded-full h-2.5 mr-2">
                        <div
                          className="bg-[#FF6B00] h-2.5 rounded-full"
                          style={{ width: `${(referralStats.totalReferrals / referralStats.nextMilestone) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-[#2E2E2E]">
                        {Math.round((referralStats.totalReferrals / referralStats.nextMilestone) * 100)}%
                      </span>
                    </div>
                    <div className="text-sm text-[#FF6B00] mt-4 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>{referralStats.nextMilestone - referralStats.totalReferrals} referrals to go</span>
                    </div>
                  </div>
                </div>
                
                {/* Referral Link */}
                <div className="border border-[#ffeee3] rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <label className="block text-sm font-medium text-[#2E2E2E] mb-1">Your Referral Code</label>
                      <div className="text-lg font-bold">{referralStats.referralCode}</div>
                    </div>
                    <button 
                      onClick={copyReferralLink}
                      className="bg-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3] py-2 px-4 rounded-lg flex items-center"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Code
                    </button>
                  </div>
                </div>
                
                <div className="border border-[#ffeee3] rounded-lg p-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-4 md:mb-0">
                      <label className="block text-sm font-medium text-[#2E2E2E] mb-1">Your Referral Link</label>
                      <div className="text-sm text-[#2E2E2E] truncate max-w-md">{referralStats.link}</div>
                    </div>
                    <div className="flex space-x-3">
                      <button 
                        onClick={copyReferralLink}
                        className="bg-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3] py-2 px-4 rounded-lg flex items-center"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Link
                      </button>
                      <button className="bg-[#FF6B00] text-white hover:bg-[#2E2E2E] py-2 px-4 rounded-lg flex items-center">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* How It Works */}
              <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
                <h2 className="text-2xl font-bold mb-6">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="bg-[#ffeee3] h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Share2 className="h-8 w-8 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">1. Invite Friends</h3>
                    <p className="text-[#2E2E2E]">
                      Share your unique referral link with friends, colleagues, and on social media
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-[#ffeee3] h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">2. They Join & Engage</h3>
                    <p className="text-[#2E2E2E]">
                      When they sign up using your link and complete their first project
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-[#ffeee3] h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Gift className="h-8 w-8 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">3. You Get Rewarded</h3>
                    <p className="text-[#2E2E2E]">
                      Earn cash rewards, premium features, and other bonuses for each successful referral
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Share Section */}
              <div className="bg-[#FF6B00] text-white rounded-xl shadow-sm p-8">
                <div className="md:flex items-center justify-between">
                  <div className="mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold mb-3">Share With Your Network</h2>
                    <p className="opacity-90">
                      The more you share, the more you earn. Use these quick links to spread the word.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button className="bg-[#3b5998] hover:bg-[#324b81] text-white px-4 py-2 rounded-lg flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                      </svg>
                      Facebook
                    </button>
                    <button className="bg-[#1da1f2] hover:bg-[#1a91da] text-white px-4 py-2 rounded-lg flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                      Twitter
                    </button>
                    <button className="bg-[#0077b5] hover:bg-[#006396] text-white px-4 py-2 rounded-lg flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </button>
                    <button className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2 rounded-lg flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </button>
                    <button className="bg-[#EA4335] hover:bg-[#d33c2d] text-white px-4 py-2 rounded-lg flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H1.5C.65 21 0 20.35 0 19.5v-15c0-.85.65-1.5 1.5-1.5h21c.85 0 1.5.65 1.5 1.5zm-1.5 0L12 10.5 1.5 4.5v1.5L12 12l10.5-6v-1.5z" />
                      </svg>
                      Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* My Referrals Tab */}
          {activeTab === 'my-referrals' && (
            <div className="max-w-5xl mx-auto">
              {/* Referral Stats Summary */}
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#ffeee3] p-5 rounded-lg">
                    <div className="text-sm text-[#ffeee3] mb-1">Total Referrals</div>
                    <div className="text-3xl font-bold text-[#2E2E2E]">{referralStats.totalReferrals}</div>
                    <div className="flex justify-between mt-2">
                      <div className="text-sm text-[#FF6B00]">
                        <span className="font-medium">{referralStats.activeReferrals}</span> Active
                      </div>
                      <div className="text-sm text-[#FF6B00]">
                        <span className="font-medium">{referralStats.pendingReferrals}</span> Pending
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#ffeee3] p-5 rounded-lg">
                    <div className="text-sm text-[#ffeee3] mb-1">Total Earned</div>
                    <div className="text-3xl font-bold text-[#2E2E2E]">${referralStats.totalEarned}</div>
                    <div className="text-sm text-[#FF6B00] mt-2">
                      <span className="font-medium">${referralStats.availableBalance}</span> Available for withdrawal
                    </div>
                  </div>
                  
                  <div className="bg-[#ffeee3] p-5 rounded-lg">
                    <div className="text-sm text-[#ffeee3] mb-1">Conversion Rate</div>
                    <div className="text-3xl font-bold text-[#2E2E2E]">
                      {Math.round((referralStats.activeReferrals / referralStats.totalReferrals) * 100)}%
                    </div>
                    <div className="text-sm text-[#FF6B00] mt-2">
                      Industry average: 35%
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Referral History */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-[#ffeee3]">
                  <h3 className="text-xl font-bold">Referral History</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#ffeee3]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">
                          Date Joined
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">
                          Earned
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {referralHistory.map((referral) => (
                        <tr key={referral.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-[#2E2E2E]">{referral.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-[#ffeee3]">{referral.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-[#ffeee3]">{referral.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              referral.status === 'Active'
                                ? 'bg-[#ffeee3] text-[#2E2E2E]'
                                : referral.status === 'Pending'
                                ? 'bg-[#ffeee3] text-[#2E2E2E]'
                                : 'bg-[#ffeee3] text-[#2E2E2E]'
                            }`}>
                              {referral.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-[#2E2E2E]">
                              ${referral.earned}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="px-6 py-4 border-t border-[#ffeee3]">
                  <button className="text-[#FF6B00] hover:text-[#2E2E2E] text-sm font-medium">
                    View All Referrals
                  </button>
                </div>
              </div>
              
              {/* No Referrals State (uncomment to use) */}
              {/* <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <Users className="h-16 w-16 mx-auto text-[#ffeee3] mb-4" />
                <h3 className="text-2xl font-bold text-[#2E2E2E] mb-2">No referrals yet</h3>
                <p className="text-[#ffeee3] mb-6">
                  Start inviting friends and colleagues to join the platform
                </p>
                <button
                  onClick={() => setActiveTab('overview')}
                  className="bg-[#FF6B00] text-white hover:bg-[#2E2E2E] font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  Start Referring
                </button>
              </div> */}
            </div>
          )}

          {/* Rewards Tab */}
          {activeTab === 'rewards' && (
            <div className="max-w-5xl mx-auto">
              {/* Available Rewards */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                <div className="p-6 border-b border-[#ffeee3]">
                  <h3 className="text-xl font-bold">Available Rewards</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  {availableRewards.map((reward) => (
                    <div
                      key={reward.id}
                      className="border border-[#ffeee3] rounded-lg p-6 hover:border-[#ffeee3] hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-lg font-bold mb-2">{reward.title}</h4>
                          <p className="text-[#2E2E2E] mb-4">{reward.description}</p>
                          {reward.perReferral ? (
                            <div className="flex items-center text-[#FF6B00] mb-2">
                              <Users className="h-4 w-4 mr-2" />
                              <span>Per successful referral</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-[#FF6B00] mb-2">
                              <Award className="h-4 w-4 mr-2" />
                              <span>Requires {reward.requirement}</span>
                            </div>
                          )}
                        </div>
                        <div className="bg-[#ffeee3] text-[#2E2E2E] p-3 rounded-lg">
                          {reward.type === 'Cash' ? (
                            <DollarSign className="h-6 w-6" />
                          ) : reward.type === 'Feature' ? (
                            <TrendingUp className="h-6 w-6" />
                          ) : reward.type === 'Membership' ? (
                            <Award className="h-6 w-6" />
                          ) : (
                            <Gift className="h-6 w-6" />
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-[#ffeee3]">
                          {reward.amount ? (
                            <span className="font-medium text-[#2E2E2E]">{reward.amount}</span>
                          ) : reward.requirement ? (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Unlock with {reward.requirement}</span>
                            </div>
                          ) : null}
                        </div>
                        <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          reward.type === 'Cash' || reward.perReferral
                            ? 'bg-[#FF6B00] text-white hover:bg-[#2E2E2E]'
                            : 'bg-[#ffeee3] text-[#ffeee3] cursor-not-allowed'
                        }`}>
                          {reward.perReferral ? 'Start Earning' : 'Unlock Reward'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Reward Tiers */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-[#ffeee3]">
                  <h3 className="text-xl font-bold">Reward Tiers</h3>
                </div>
                
                <div className="p-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="w-full border-t border-[#ffeee3]" />
                    </div>
                    
                    <div className="relative flex justify-between">
                      <div className="text-center">
                        <span className="bg-white px-4 py-2 rounded-full border border-[#ffeee3] text-sm font-medium text-[#2E2E2E] inline-flex items-center">
                          <span className="bg-[#FF6B00] text-white h-6 w-6 rounded-full flex items-center justify-center mr-2">1</span>
                          Starter
                        </span>
                        <div className="mt-3 text-sm text-[#ffeee3]">
                          1-5 referrals
                        </div>
                        <div className="mt-1 text-[#FF6B00] font-medium">
                          Cash rewards
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <span className="bg-white px-4 py-2 rounded-full border border-[#ffeee3] text-sm font-medium text-[#2E2E2E] inline-flex items-center">
                          <span className="bg-[#FF6B00] text-white h-6 w-6 rounded-full flex items-center justify-center mr-2">2</span>
                          Bronze
                        </span>
                        <div className="mt-3 text-sm text-[#ffeee3]">
                          5-10 referrals
                        </div>
                        <div className="mt-1 text-[#FF6B00] font-medium">
                          Featured profile
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <span className="bg-white px-4 py-2 rounded-full border border-[#ffeee3] text-sm font-medium text-[#2E2E2E] inline-flex items-center">
                          <span className="bg-[#FF6B00] text-white h-6 w-6 rounded-full flex items-center justify-center mr-2">3</span>
                          Silver
                        </span>
                        <div className="mt-3 text-sm text-[#ffeee3]">
                          10-15 referrals
                        </div>
                        <div className="mt-1 text-[#FF6B00] font-medium">
                          Premium account
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <span className="bg-white px-4 py-2 rounded-full border border-[#ffeee3] text-sm font-medium text-[#2E2E2E] inline-flex items-center">
                          <span className="bg-[#FF6B00] text-white h-6 w-6 rounded-full flex items-center justify-center mr-2">4</span>
                          Gold
                        </span>
                        <div className="mt-3 text-sm text-[#ffeee3]">
                          15+ referrals
                        </div>
                        <div className="mt-1 text-[#FF6B00] font-medium">
                          Reduced fees
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-12 max-w-3xl mx-auto">
                    <div className="bg-[#ffeee3] rounded-lg p-6">
                      <h4 className="text-lg font-bold mb-3">You are currently at: Starter Tier</h4>
                      <p className="text-[#2E2E2E] mb-4">
                        Invite {referralStats.nextMilestone - referralStats.totalReferrals} more active referrals to reach the Bronze Tier and unlock featured profile benefits.
                      </p>
                      <div className="flex justify-end">
                        <button
                          onClick={() => setActiveTab('overview')}
                          className="bg-[#FF6B00] text-white hover:bg-[#2E2E2E] font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Invite Friends
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-2">Who can I refer to the platform?</h3>
                <p className="text-[#2E2E2E]">
                  You can refer both freelancers and clients to our platform. Any professional looking for freelance work or any business seeking talented freelancers can be referred.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-2">When do I receive my referral rewards?</h3>
                <p className="text-[#2E2E2E]">
                  Cash rewards are credited to your account once your referred user completes their first project on the platform. Non-cash rewards like premium features are unlocked as soon as you reach the required referral milestone.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-2">Is there a limit to how many people I can refer?</h3>
                <p className="text-[#2E2E2E]">
                  There's no limit to the number of people you can refer. The more quality professionals you bring to the platform, the more rewards you'll earn.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-2">How can I withdraw my referral earnings?</h3>
                <p className="text-[#2E2E2E]">
                  You can withdraw your referral earnings through the same payment methods available for your regular freelance earnings. Simply go to your wallet section and select "Withdraw" to transfer your available balance.
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
            <h2 className="text-3xl font-bold mb-6">Start Earning Through Referrals</h2>
            <p className="text-xl opacity-90 mb-8">
              Share your unique code today and earn rewards when talented professionals join our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveTab('overview')}
                className="bg-white text-[#FF6B00] hover:bg-[#ffeee3] font-medium px-8 py-4 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share Your Link Now
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

export default ReferralProgramPage;

















