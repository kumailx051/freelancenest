import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Users,
  Briefcase,
  Calendar,
  BarChart3,
  Download,
  RefreshCw
} from 'lucide-react';

interface AnalyticsData {
  totalUsers: number;
  totalProjects: number;
  totalRevenue: number;
  activeJobs: number;
  userGrowth: number;
  projectGrowth: number;
  revenueGrowth: number;
  jobGrowth: number;
  usersByMonth: { month: string; users: number; }[];
  projectsByCategory: { category: string; count: number; }[];
  revenueByMonth: { month: string; revenue: number; }[];
  topFreelancers: { name: string; earnings: number; projects: number; }[];
  topClients: { name: string; spent: number; projects: number; }[];
}

const AnalyticsReporting: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState('last30days');
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange]);

  const fetchAnalyticsData = async () => {
    try {
      setIsLoading(true);
      
      // In a real app, you would fetch actual data from Firebase
      // For now, we'll use mock data
      const mockData: AnalyticsData = {
        totalUsers: 12547,
        totalProjects: 8932,
        totalRevenue: 2847593,
        activeJobs: 1247,
        userGrowth: 12.5,
        projectGrowth: 8.3,
        revenueGrowth: 15.7,
        jobGrowth: -2.1,
        usersByMonth: [
          { month: 'Jan', users: 8500 },
          { month: 'Feb', users: 9200 },
          { month: 'Mar', users: 10100 },
          { month: 'Apr', users: 10800 },
          { month: 'May', users: 11500 },
          { month: 'Jun', users: 12547 }
        ],
        projectsByCategory: [
          { category: 'Web Development', count: 2847 },
          { category: 'Mobile Development', count: 1923 },
          { category: 'UI/UX Design', count: 1456 },
          { category: 'Data Science', count: 987 },
          { category: 'Digital Marketing', count: 823 },
          { category: 'Writing & Translation', count: 896 }
        ],
        revenueByMonth: [
          { month: 'Jan', revenue: 428000 },
          { month: 'Feb', revenue: 465000 },
          { month: 'Mar', revenue: 523000 },
          { month: 'Apr', revenue: 589000 },
          { month: 'May', revenue: 634000 },
          { month: 'Jun', revenue: 708593 }
        ],
        topFreelancers: [
          { name: 'Sarah Johnson', earnings: 45680, projects: 23 },
          { name: 'Mike Chen', earnings: 38920, projects: 18 },
          { name: 'Emily Davis', earnings: 32150, projects: 21 },
          { name: 'David Wilson', earnings: 28750, projects: 15 },
          { name: 'Lisa Garcia', earnings: 25980, projects: 19 }
        ],
        topClients: [
          { name: 'TechCorp Inc.', spent: 125680, projects: 8 },
          { name: 'StartupXYZ', spent: 98500, projects: 12 },
          { name: 'Digital Solutions', spent: 87300, projects: 6 },
          { name: 'Creative Agency', spent: 76200, projects: 15 },
          { name: 'E-commerce Plus', spent: 65800, projects: 9 }
        ]
      };
      
      setAnalyticsData(mockData);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = async () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      const dataStr = JSON.stringify(analyticsData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `freelancenest_analytics_${dateRange}_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      setIsExporting(false);
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading analytics...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500">Failed to load analytics data</p>
            <button
              onClick={fetchAnalyticsData}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Reporting</h1>
            <p className="text-gray-600">Platform performance insights and metrics</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="last7days">Last 7 Days</option>
                <option value="last30days">Last 30 Days</option>
                <option value="last90days">Last 90 Days</option>
                <option value="last6months">Last 6 Months</option>
                <option value="lastyear">Last Year</option>
              </select>
            </div>
            
            <button
              onClick={fetchAnalyticsData}
              className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
            
            <button
              onClick={exportData}
              disabled={isExporting}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? 'Exporting...' : 'Export'}
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{analyticsData.totalUsers.toLocaleString()}</p>
              </div>
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {analyticsData.userGrowth >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${analyticsData.userGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(analyticsData.userGrowth)}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last period</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-semibold text-gray-900">{analyticsData.totalProjects.toLocaleString()}</p>
              </div>
              <div className="flex-shrink-0">
                <Briefcase className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {analyticsData.projectGrowth >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${analyticsData.projectGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(analyticsData.projectGrowth)}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last period</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(analyticsData.totalRevenue)}</p>
              </div>
              <div className="flex-shrink-0">
                <DollarSign className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {analyticsData.revenueGrowth >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${analyticsData.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(analyticsData.revenueGrowth)}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last period</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-2xl font-semibold text-gray-900">{analyticsData.activeJobs.toLocaleString()}</p>
              </div>
              <div className="flex-shrink-0">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {analyticsData.jobGrowth >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${analyticsData.jobGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(analyticsData.jobGrowth)}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last period</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Growth Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth Trend</h3>
            <div className="h-64">
              <div className="flex items-end justify-between h-48 border-b border-gray-200">
                {analyticsData.usersByMonth.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="bg-blue-600 rounded-t w-8 mb-2"
                      style={{ height: `${(data.users / Math.max(...analyticsData.usersByMonth.map(d => d.users))) * 160}px` }}
                    ></div>
                    <span className="text-xs text-gray-600">{data.month}</span>
                    <span className="text-xs text-gray-500">{data.users.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
            <div className="h-64">
              <div className="flex items-end justify-between h-48 border-b border-gray-200">
                {analyticsData.revenueByMonth.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="bg-green-600 rounded-t w-8 mb-2"
                      style={{ height: `${(data.revenue / Math.max(...analyticsData.revenueByMonth.map(d => d.revenue))) * 160}px` }}
                    ></div>
                    <span className="text-xs text-gray-600">{data.month}</span>
                    <span className="text-xs text-gray-500">{formatCurrency(data.revenue)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Projects by Category */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Projects by Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analyticsData.projectsByCategory.map((category, index) => {
                const maxCount = Math.max(...analyticsData.projectsByCategory.map(c => c.count));
                const percentage = (category.count / maxCount) * 100;
                
                return (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{category.category}</p>
                      <p className="text-2xl font-semibold text-blue-600">{category.count.toLocaleString()}</p>
                    </div>
                    <div className="w-16 h-16">
                      <div className="relative w-16 h-16">
                        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                        <div
                          className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent"
                          style={{
                            transform: `rotate(${(percentage / 100) * 360}deg)`,
                            transition: 'transform 0.5s ease-in-out'
                          }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-semibold text-gray-700">
                            {Math.round((category.count / analyticsData.totalProjects) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Freelancers */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Freelancers</h3>
              <div className="space-y-4">
                {analyticsData.topFreelancers.map((freelancer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">#{index + 1}</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{freelancer.name}</p>
                        <p className="text-xs text-gray-500">{freelancer.projects} projects</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-green-600">{formatCurrency(freelancer.earnings)}</p>
                      <p className="text-xs text-gray-500">total earnings</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Clients */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Clients</h3>
              <div className="space-y-4">
                {analyticsData.topClients.map((client, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-green-600">#{index + 1}</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{client.name}</p>
                        <p className="text-xs text-gray-500">{client.projects} projects</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-blue-600">{formatCurrency(client.spent)}</p>
                      <p className="text-xs text-gray-500">total spent</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReporting;