import React, { useState } from 'react';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');

  const overviewStats = {
    proposalWinRate: 42,
    averageResponseTime: '2.4 hours',
    onTimeDelivery: 96,
    clientSatisfaction: 4.8,
    totalProjects: 127,
    totalEarnings: 45678.90,
    averageProjectValue: 1250,
    repeatClientRate: 38
  };

  const proposalData = {
    sent: 65,
    viewed: 58,
    interviewed: 18,
    hired: 12,
    winRate: 18.5,
    averageResponse: '2.4 hours'
  };

  const skillsPerformance = [
    { skill: 'React Development', projects: 23, earnings: 12500, avgRate: 65, demand: 'High' },
    { skill: 'UI/UX Design', projects: 18, earnings: 9800, avgRate: 55, demand: 'High' },
    { skill: 'Node.js', projects: 15, earnings: 8200, avgRate: 60, demand: 'Medium' },
    { skill: 'Mobile Development', projects: 12, earnings: 7800, avgRate: 70, demand: 'High' },
    { skill: 'Digital Marketing', projects: 8, earnings: 4200, avgRate: 45, demand: 'Medium' },
  ];

  const clientFeedback = [
    {
      metric: 'Communication',
      score: 4.9,
      trend: '+0.2',
      feedback: 'Excellent communication throughout the project'
    },
    {
      metric: 'Quality of Work',
      score: 4.8,
      trend: '+0.1',
      feedback: 'Delivered high-quality work that exceeded expectations'
    },
    {
      metric: 'Adherence to Schedule',
      score: 4.7,
      trend: '+0.3',
      feedback: 'Always met deadlines and kept me updated on progress'
    },
    {
      metric: 'Expertise',
      score: 4.9,
      trend: '+0.1',
      feedback: 'Deep technical knowledge and great problem-solving skills'
    }
  ];

  const monthlyTrends = [
    { month: 'Aug', proposals: 12, interviews: 4, hires: 2, earnings: 3200 },
    { month: 'Sep', proposals: 15, interviews: 6, hires: 3, earnings: 4100 },
    { month: 'Oct', proposals: 18, interviews: 7, hires: 4, earnings: 5200 },
    { month: 'Nov', proposals: 20, interviews: 8, hires: 5, earnings: 6800 },
    { month: 'Dec', proposals: 22, interviews: 9, hires: 6, earnings: 7500 },
    { month: 'Jan', proposals: 25, interviews: 11, hires: 7, earnings: 8900 }
  ];

  const topClients = [
    {
      name: 'TechStart Inc.',
      projects: 8,
      earnings: 8200,
      rating: 5.0,
      lastProject: '2024-01-15',
      repeat: true
    },
    {
      name: 'Creative Agency',
      projects: 6,
      earnings: 6500,
      rating: 4.9,
      lastProject: '2024-01-10',
      repeat: true
    },
    {
      name: 'E-commerce Plus',
      projects: 5,
      earnings: 5800,
      rating: 4.8,
      lastProject: '2024-01-08',
      repeat: false
    },
    {
      name: 'Digital Solutions',
      projects: 4,
      earnings: 4200,
      rating: 4.7,
      lastProject: '2024-01-05',
      repeat: true
    }
  ];

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High':
        return 'text-green-600 bg-green-50';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'Low':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend.startsWith('+') ? '📈' : trend.startsWith('-') ? '📉' : '➡️';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#2E2E2E] mb-2">Analytics Dashboard</h1>
              <p className="text-gray-600">Track your performance and identify growth opportunities</p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="1year">Last year</option>
              </select>
              <button className="px-4 py-2 bg-[#FF6B00] text-white rounded-lg hover:bg-[#FF9F45] transition-colors">
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Proposal Win Rate</h3>
              <span className="text-2xl">🎯</span>
            </div>
            <div className="text-3xl font-bold text-[#FF6B00] mb-2">{overviewStats.proposalWinRate}%</div>
            <p className="text-sm text-green-600">+5% from last month</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Avg Response Time</h3>
              <span className="text-2xl">⚡</span>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">{overviewStats.averageResponseTime}</div>
            <p className="text-sm text-green-600">-20min from last month</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">On-Time Delivery</h3>
              <span className="text-2xl">📅</span>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">{overviewStats.onTimeDelivery}%</div>
            <p className="text-sm text-green-600">+2% from last month</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Client Satisfaction</h3>
              <span className="text-2xl">⭐</span>
            </div>
            <div className="text-3xl font-bold text-yellow-500 mb-2">{overviewStats.clientSatisfaction}/5</div>
            <p className="text-sm text-green-600">+0.1 from last month</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Proposal Funnel */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-6">Proposal Funnel</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Proposals Sent</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-[#FF6B00] h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <span className="text-sm font-medium">{proposalData.sent}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Proposals Viewed</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(proposalData.viewed / proposalData.sent) * 100}%` }}></div>
                  </div>
                  <span className="text-sm font-medium">{proposalData.viewed}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Interviews</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(proposalData.interviewed / proposalData.sent) * 100}%` }}></div>
                  </div>
                  <span className="text-sm font-medium">{proposalData.interviewed}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Projects Hired</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(proposalData.hired / proposalData.sent) * 100}%` }}></div>
                  </div>
                  <span className="text-sm font-medium">{proposalData.hired}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-6">6-Month Trends</h3>
            <div className="space-y-4">
              {monthlyTrends.map((month) => (
                <div key={month.month} className="flex items-center justify-between">
                  <span className="text-gray-600 w-12">{month.month}</span>
                  <div className="flex-1 mx-4">
                    <div className="flex items-center gap-1 text-xs">
                      <div className="w-8 text-center">{month.proposals}</div>
                      <div className="w-8 text-center">{month.interviews}</div>
                      <div className="w-8 text-center">{month.hires}</div>
                      <div className="w-16 text-right">${month.earnings.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between text-xs font-medium text-gray-500 pt-2 border-t">
                <span className="w-12">Month</span>
                <div className="flex-1 mx-4">
                  <div className="flex items-center gap-1">
                    <div className="w-8 text-center">Sent</div>
                    <div className="w-8 text-center">Int.</div>
                    <div className="w-8 text-center">Hired</div>
                    <div className="w-16 text-right">Earnings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Performance */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-[#2E2E2E] mb-6">Skills Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Skill</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Projects</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Earnings</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Avg Rate</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Demand</th>
                </tr>
              </thead>
              <tbody>
                {skillsPerformance.map((skill) => (
                  <tr key={skill.skill} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-[#2E2E2E]">{skill.skill}</div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{skill.projects}</td>
                    <td className="py-4 px-4 text-gray-600">${skill.earnings.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-600">${skill.avgRate}/hr</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getDemandColor(skill.demand)}`}>
                        {skill.demand}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Client Feedback */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-6">Client Feedback Trends</h3>
            <div className="space-y-4">
              {clientFeedback.map((item) => (
                <div key={item.metric} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-[#2E2E2E]">{item.metric}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{item.score}</span>
                        <span className="text-sm text-green-600">{getTrendIcon(item.trend)} {item.trend}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-[#FF6B00] h-2 rounded-full"
                        style={{ width: `${(item.score / 5) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500">{item.feedback}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Clients */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-6">Top Clients</h3>
            <div className="space-y-4">
              {topClients.map((client) => (
                <div key={client.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FF6B00] rounded-full flex items-center justify-center text-white font-bold">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-[#2E2E2E] flex items-center gap-2">
                        {client.name}
                        {client.repeat && <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Repeat</span>}
                      </div>
                      <div className="text-sm text-gray-500">
                        {client.projects} projects • Last: {new Date(client.lastProject).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#2E2E2E]">${client.earnings.toLocaleString()}</div>
                    <div className="text-sm text-yellow-500 flex items-center gap-1">
                      ⭐ {client.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
