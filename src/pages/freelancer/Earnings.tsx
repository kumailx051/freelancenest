import React, { useState } from 'react';
import { 
  DollarSign,
  TrendingUp,
  Download,
  CreditCard,
  Wallet,
  Clock,
  ArrowUpRight,
  Eye,
  FileText,
  Settings,
  Star,
  Building,
  BarChart3,
  Target,
  Banknote,
  ArrowRight
} from 'lucide-react';

const Earnings: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const stats = {
    total: 48750.00,
    thisMonth: 12400.00,
    pending: 3250.00,
    available: 9150.00,
    lifetime: 156890.00,
    avgMonthly: 10450.00
  };

  const earnings = [
    {
      id: 1,
      client: 'TechCorp Solutions',
      project: 'E-commerce Platform Development',
      amount: 4500.00,
      type: 'milestone',
      status: 'completed',
      date: '2024-01-15',
      invoice: 'INV-2024-001',
      paymentMethod: 'Bank Transfer',
      description: 'Final milestone payment for React frontend development'
    },
    {
      id: 2,
      client: 'InnovateTech Inc',
      project: 'SaaS Dashboard Creation',
      amount: 2800.00,
      type: 'hourly',
      status: 'pending',
      date: '2024-01-14',
      invoice: 'INV-2024-002',
      paymentMethod: 'PayPal',
      description: 'Weekly payment for 56 hours worked'
    },
    {
      id: 3,
      client: 'DataViz Solutions',
      project: 'Analytics Dashboard',
      amount: 3200.00,
      type: 'milestone',
      status: 'completed',
      date: '2024-01-12',
      invoice: 'INV-2024-003',
      paymentMethod: 'Stripe',
      description: 'Milestone 2: Data visualization implementation'
    },
    {
      id: 4,
      client: 'MobileFirst Co',
      project: 'React Native App',
      amount: 1950.00,
      type: 'milestone',
      status: 'in-review',
      date: '2024-01-10',
      invoice: 'INV-2024-004',
      paymentMethod: 'Bank Transfer',
      description: 'Milestone 1: Core app functionality'
    },
    {
      id: 5,
      client: 'PerformancePro Ltd',
      project: 'Performance Optimization',
      amount: 2750.00,
      type: 'hourly',
      status: 'completed',
      date: '2024-01-08',
      invoice: 'INV-2024-005',
      paymentMethod: 'PayPal',
      description: 'Code optimization and performance improvements'
    }
  ];

  const monthlyData = [
    { month: 'Jul', amount: 8500 },
    { month: 'Aug', amount: 11200 },
    { month: 'Sep', amount: 9800 },
    { month: 'Oct', amount: 13400 },
    { month: 'Nov', amount: 10600 },
    { month: 'Dec', amount: 12400 }
  ];

  const topClients = [
    { name: 'TechCorp Solutions', earnings: 15400, projects: 3, rating: 4.9 },
    { name: 'InnovateTech Inc', earnings: 12800, projects: 2, rating: 4.8 },
    { name: 'DataViz Solutions', earnings: 8600, projects: 2, rating: 5.0 },
    { name: 'PerformancePro Ltd', earnings: 7200, projects: 1, rating: 4.7 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'in-review':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'hourly' ? <Clock className="w-4 h-4" /> : <Target className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2E2E2E]">Earnings</h1>
            <p className="text-[#2E2E2E]/70">Track your income and financial performance</p>
          </div>
          <div className="flex space-x-3">
            <button className="border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
            <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Payment Settings
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-green-600 text-sm font-medium flex items-center">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +15.3%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#2E2E2E] mb-1">
              ${stats.thisMonth.toLocaleString()}
            </h3>
            <p className="text-[#2E2E2E]/60 text-sm">This Month</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#ffeee3] p-3 rounded-lg">
                <Wallet className="w-6 h-6 text-[#FF6B00]" />
              </div>
              <span className="text-[#FF6B00] text-sm font-medium">Available</span>
            </div>
            <h3 className="text-2xl font-bold text-[#2E2E2E] mb-1">
              ${stats.available.toLocaleString()}
            </h3>
            <p className="text-[#2E2E2E]/60 text-sm">Ready to withdraw</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-yellow-600 text-sm font-medium">Pending</span>
            </div>
            <h3 className="text-2xl font-bold text-[#2E2E2E] mb-1">
              ${stats.pending.toLocaleString()}
            </h3>
            <p className="text-[#2E2E2E]/60 text-sm">In review</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-blue-600 text-sm font-medium">Lifetime</span>
            </div>
            <h3 className="text-2xl font-bold text-[#2E2E2E] mb-1">
              ${stats.lifetime.toLocaleString()}
            </h3>
            <p className="text-[#2E2E2E]/60 text-sm">Total earned</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Earnings Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-[#2E2E2E]">Earnings Trend</h3>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                >
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                  <option value="90days">Last 90 days</option>
                  <option value="12months">Last 12 months</option>
                </select>
              </div>
              
              {/* Simple Chart Visualization */}
              <div className="space-y-4">
                {monthlyData.map((data) => (
                  <div key={data.month} className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-[#2E2E2E] w-8">{data.month}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-[#FF6B00] to-[#FF9F45] h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(data.amount / 15000) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-[#2E2E2E] w-16">${data.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Earnings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-[#2E2E2E]">Recent Earnings</h3>
                <div className="flex space-x-2">
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  >
                    <option value="all">All Payments</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="milestone">Milestones</option>
                    <option value="hourly">Hourly</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {earnings.map((earning) => (
                  <div key={earning.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="bg-[#ffeee3] p-2 rounded-lg">
                          {getTypeIcon(earning.type)}
                        </div>
                        <div>
                          <h4 className="font-medium text-[#2E2E2E]">{earning.project}</h4>
                          <p className="text-sm text-[#2E2E2E]/60">{earning.client}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-[#2E2E2E]">
                          ${earning.amount.toLocaleString()}
                        </p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(earning.status)}`}>
                          {earning.status.charAt(0).toUpperCase() + earning.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-[#2E2E2E]/70 mb-3">{earning.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-[#2E2E2E]/60">
                      <div className="flex items-center space-x-4">
                        <span>{earning.date}</span>
                        <span className="flex items-center">
                          <CreditCard className="w-3 h-3 mr-1" />
                          {earning.paymentMethod}
                        </span>
                        <span className="flex items-center">
                          <FileText className="w-3 h-3 mr-1" />
                          {earning.invoice}
                        </span>
                      </div>
                      <button className="text-[#FF6B00] hover:text-[#FF9F45] flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <button className="border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] px-6 py-2 rounded-lg font-medium transition-colors">
                  Load More
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-[#FF6B00] hover:bg-[#FF9F45] text-white p-3 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <Banknote className="w-4 h-4 mr-2" />
                  Withdraw Funds
                </button>
                <button className="w-full border border-gray-300 text-[#2E2E2E] hover:bg-gray-50 p-3 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Invoice
                </button>
                <button className="w-full border border-gray-300 text-[#2E2E2E] hover:bg-gray-50 p-3 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </button>
              </div>
            </div>

            {/* Top Clients */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Top Clients</h3>
              <div className="space-y-4">
                {topClients.map((client, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-[#FF6B00] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-[#2E2E2E] text-sm">{client.name}</p>
                        <div className="flex items-center space-x-2 text-xs text-[#2E2E2E]/60">
                          <span>{client.projects} projects</span>
                          <span className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                            {client.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#2E2E2E] text-sm">
                        ${client.earnings.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Payment Methods</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded">
                      <Building className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-[#2E2E2E] text-sm">Bank Transfer</p>
                      <p className="text-xs text-[#2E2E2E]/60">••••1234</p>
                    </div>
                  </div>
                  <span className="text-green-600 text-xs">Primary</span>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded">
                      <CreditCard className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-[#2E2E2E] text-sm">PayPal</p>
                      <p className="text-xs text-[#2E2E2E]/60">user@email.com</p>
                    </div>
                  </div>
                </div>
                <button className="w-full border border-dashed border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] p-3 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Add Payment Method
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
