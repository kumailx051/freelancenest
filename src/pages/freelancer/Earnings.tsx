import React, { useState, useEffect } from 'react';
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
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const Earnings: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total: 0,
    thisMonth: 0,
    pending: 0,
    available: 0,
    lifetime: 0,
    avgMonthly: 0
  });

  const [earnings, setEarnings] = useState<any[]>([]);
  const [topClients, setTopClients] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<Array<{ month: string; amount: number }>>([]);

  // Fetch earnings data from Firebase
  useEffect(() => {
    const fetchEarningsData = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);
        
        // Fetch user's available balance from their profile
        let userAvailableBalance = 0;
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            userAvailableBalance = userData.availableBalance || 0;
          }
        } catch (error) {
          console.error('Error fetching user balance:', error);
        }
        
        // Fetch all orders for this freelancer
        const ordersQuery = query(
          collection(db, 'orders'),
          where('sellerId', '==', currentUser.uid)
        );
        const ordersSnap = await getDocs(ordersQuery);
        
        let totalEarnings = 0;
        let completedEarnings = 0;
        let pendingEarnings = 0;
        let thisMonthEarnings = 0;
        const earningsData: any[] = [];
        const clientEarningsMap = new Map<string, { name: string; earnings: number; projects: number; rating: number; avatar: string }>();
        const monthlyEarningsMap = new Map<string, number>();
        
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        
        // Initialize last 6 months
        for (let i = 5; i >= 0; i--) {
          const date = new Date(currentYear, currentMonth - i, 1);
          const monthKey = date.toLocaleString('default', { month: 'short' });
          monthlyEarningsMap.set(monthKey, 0);
        }
        
        for (const docSnap of ordersSnap.docs) {
          const orderData = docSnap.data();
          const amount = orderData.totalAmount || orderData.price || 0;
          
          // Calculate totals
          if (orderData.status === 'completed') {
            completedEarnings += amount;
            totalEarnings += amount;
          } else if (orderData.status === 'delivered' || orderData.status === 'in_progress') {
            pendingEarnings += amount;
          }
          
          // Calculate this month's earnings
          const orderDate = orderData.completedAt?.toDate ? orderData.completedAt.toDate() : 
                           orderData.createdAt?.toDate ? orderData.createdAt.toDate() : new Date();
          if (orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear) {
            if (orderData.status === 'completed') {
              thisMonthEarnings += amount;
            }
          }
          
          // Track monthly earnings for trend chart (last 6 months)
          if (orderData.status === 'completed' && orderData.completedAt) {
            const completedDate = orderData.completedAt.toDate ? orderData.completedAt.toDate() : new Date(orderData.completedAt);
            const monthsDiff = (currentYear - completedDate.getFullYear()) * 12 + (currentMonth - completedDate.getMonth());
            
            if (monthsDiff >= 0 && monthsDiff < 6) {
              const monthKey = completedDate.toLocaleString('default', { month: 'short' });
              const currentAmount = monthlyEarningsMap.get(monthKey) || 0;
              monthlyEarningsMap.set(monthKey, currentAmount + amount);
            }
          }
          
          // Fetch client and gig details
          let clientName = 'Unknown Client';
          let clientAvatar = '';
          let gigTitle = 'Unknown Project';
          
          if (orderData.buyerId) {
            try {
              const clientDoc = await getDoc(doc(db, 'users', orderData.buyerId));
              if (clientDoc.exists()) {
                const clientData = clientDoc.data();
                clientName = `${clientData.firstName || ''} ${clientData.lastName || ''}`.trim() || 'Unknown';
                clientAvatar = clientData.profilePictureUrl || clientData.profile?.profilePictureUrl || '';
                
                // Track client earnings
                const existing = clientEarningsMap.get(orderData.buyerId) || {
                  name: clientName,
                  earnings: 0,
                  projects: 0,
                  rating: 0,
                  avatar: clientAvatar
                };
                existing.earnings += orderData.status === 'completed' ? amount : 0;
                existing.projects += 1;
                clientEarningsMap.set(orderData.buyerId, existing);
              }
            } catch (error) {
              console.error('Error fetching client:', error);
            }
          }
          
          if (orderData.gigId) {
            try {
              const gigDoc = await getDoc(doc(db, 'gigs', orderData.gigId));
              if (gigDoc.exists()) {
                gigTitle = gigDoc.data().title || 'Unknown Project';
              }
            } catch (error) {
              console.error('Error fetching gig:', error);
            }
          }
          
          earningsData.push({
            id: docSnap.id,
            client: clientName,
            project: gigTitle,
            amount: amount,
            type: orderData.packageType === 'hourly' ? 'hourly' : 'milestone',
            status: orderData.status === 'completed' ? 'completed' : 
                   orderData.status === 'delivered' ? 'in-review' : 'pending',
            date: orderDate.toLocaleDateString(),
            invoice: orderData.orderNumber || 'N/A',
            paymentMethod: orderData.paymentMethod || 'Card',
            description: orderData.requirements || gigTitle
          });
        }
        
        // Sort earnings by date (most recent first)
        earningsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        // Convert client map to array and sort by earnings
        const topClientsData = Array.from(clientEarningsMap.values())
          .sort((a, b) => b.earnings - a.earnings)
          .slice(0, 4)
          .map(client => ({
            ...client,
            rating: 5.0 // Default rating, can be calculated from reviews if needed
          }));
        
        // Convert monthly earnings map to array for chart
        const monthlyChartData = Array.from(monthlyEarningsMap.entries()).map(([month, amount]) => ({
          month,
          amount: Math.round(amount)
        }));
        
        setStats({
          total: Math.round(totalEarnings * 100) / 100,
          thisMonth: Math.round(thisMonthEarnings * 100) / 100,
          pending: Math.round(pendingEarnings * 100) / 100,
          available: Math.round(userAvailableBalance * 100) / 100,
          lifetime: Math.round(totalEarnings * 100) / 100,
          avgMonthly: Math.round((totalEarnings / 12) * 100) / 100
        });
        
        setEarnings(earningsData);
        setTopClients(topClientsData);
        setMonthlyData(monthlyChartData);
      } catch (error) {
        console.error('Error fetching earnings data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarningsData();
  }, [currentUser]);

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
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00] mx-auto mb-4"></div>
                    <p className="text-[#2E2E2E]/60">Loading earnings...</p>
                  </div>
                ) : earnings.length === 0 ? (
                  <div className="text-center py-12">
                    <DollarSign className="w-16 h-16 mx-auto mb-4 text-[#2E2E2E]/20" />
                    <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">No Earnings Yet</h3>
                    <p className="text-[#2E2E2E]/60">Complete projects to start earning!</p>
                  </div>
                ) : earnings.map((earning) => (
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

              {!loading && earnings.length > 0 && (
                <div className="text-center mt-6">
                  <button className="border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] px-6 py-2 rounded-lg font-medium transition-colors">
                    Load More
                  </button>
                </div>
              )}
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
              </div>
            </div>

            {/* Top Clients */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Top Clients</h3>
              <div className="space-y-4">
                {topClients.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-[#2E2E2E]/60 text-sm">No clients yet</p>
                  </div>
                ) : topClients.map((client, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {client.avatar ? (
                        <img 
                          src={client.avatar} 
                          alt={client.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="bg-[#FF6B00] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                          {client.name.charAt(0)}
                        </div>
                      )}
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
