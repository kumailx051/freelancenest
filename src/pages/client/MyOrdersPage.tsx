import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Clock, 
  Package, 
  DollarSign, 
  MessageCircle, 
  Star, 
  Calendar,
  ChevronRight,
  Filter,
  Search,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  gigId: string;
  gigTitle: string;
  sellerId: string;
  sellerName: string;
  packageType: string;
  packageTitle: string;
  price: number;
  serviceFee: number;
  totalAmount: number;
  status: 'pending' | 'in_progress' | 'revision_requested' | 'completed' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  deliveryTime: string;
  revisions: string;
  requirements: string;
  createdAt: any;
  expectedDeliveryDate: any;
  conversationId: string;
  revisionCount: number;
  maxRevisions: number;
}

const MyOrdersPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed' | 'cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Check for success message from order placement
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message after showing it
      setTimeout(() => setSuccessMessage(''), 5000);
    }
  }, [location.state]);

  useEffect(() => {
    if (!currentUser) {
      console.log('No current user found');
      setIsLoading(false);
      return;
    }

    console.log('Loading orders for user:', currentUser.uid, currentUser.email);
    const ordersRef = collection(db, 'orders');
    
    // Try without orderBy first to see if orders exist
    const q = query(
      ordersRef,
      where('buyerId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log('Orders snapshot received, docs count:', snapshot.docs.length);
      const ordersData: Order[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        console.log('Order data:', { id: doc.id, buyerId: data.buyerId, currentUserId: currentUser.uid });
        ordersData.push({
          id: doc.id,
          ...data
        } as Order);
      });
      // Sort orders manually by createdAt
      const sortedOrders = ordersData.sort((a, b) => {
        const aTime = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
        const bTime = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
        return bTime.getTime() - aTime.getTime();
      });
      
      console.log('Processed orders:', sortedOrders.length);
      setOrders(sortedOrders);
      setIsLoading(false);
    }, (error) => {
      console.error('Error fetching orders:', error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'in_progress':
        return <Package className="w-4 h-4 text-blue-500" />;
      case 'revision_requested':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'revision_requested': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysRemaining = (expectedDeliveryDate: any) => {
    if (!expectedDeliveryDate) return null;
    const deliveryDate = expectedDeliveryDate.toDate ? expectedDeliveryDate.toDate() : new Date(expectedDeliveryDate);
    const today = new Date();
    const diffTime = deliveryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch = order.gigTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleContactSeller = (order: Order) => {
    // Navigate to messages page and let it handle finding/creating conversation
    navigate('/client/messages', { 
      state: { 
        recipientId: order.sellerId,
        recipientName: order.sellerName,
        orderId: order.id,
        gigId: order.gigId,
        gigTitle: order.gigTitle
      } 
    });
  };

  const handleViewGig = (gigId: string) => {
    navigate(`/client/gig/${gigId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffeee3] flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
          <span className="ml-3 mt-4 text-[#2E2E2E]">Loading your orders...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      <div className="section-container py-8">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg text-green-800">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              {successMessage}
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2E2E2E] mb-2">My Orders</h1>
          <p className="text-[#2E2E2E]/70">Track and manage your freelance orders</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-[#FF6B00]/20 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Status Filter */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#2E2E2E]" />
                <span className="text-sm font-medium text-[#2E2E2E]">Filter:</span>
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 border border-[#FF6B00]/20 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="revision_requested">Revision Requested</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E]/50" />
              <input
                type="text"
                placeholder="Search orders, gigs, or sellers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-[#FF6B00]/20 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent w-full md:w-80"
              />
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#FF6B00]/20 p-12 text-center">
            <Package className="w-16 h-16 text-[#2E2E2E]/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#2E2E2E] mb-2">
              {orders.length === 0 ? 'No orders yet' : 'No orders match your filters'}
            </h3>
            <p className="text-[#2E2E2E]/60 mb-6">
              {orders.length === 0 
                ? 'Start browsing gigs to place your first order'
                : 'Try adjusting your filters or search terms'
              }
            </p>
            {orders.length === 0 && (
              <button
                onClick={() => navigate('/client/hire-gig')}
                className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Browse Gigs
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const daysRemaining = getDaysRemaining(order.expectedDeliveryDate);
              return (
                <div key={order.id} className="bg-white rounded-lg border border-[#FF6B00]/20 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-[#2E2E2E] hover:text-[#FF6B00] cursor-pointer"
                              onClick={() => handleViewGig(order.gigId)}>
                            {order.gigTitle}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                            {formatStatus(order.status)}
                          </span>
                        </div>
                        <p className="text-[#2E2E2E]/60 text-sm mb-2">
                          Order #{order.orderNumber} • {order.packageType.toUpperCase()} Package
                        </p>
                        <div className="flex items-center gap-4 text-sm text-[#2E2E2E]/70">
                          <span>Seller: {order.sellerName}</span>
                          <span>•</span>
                          <span>Ordered: {formatDate(order.createdAt)}</span>
                          {daysRemaining !== null && order.status === 'in_progress' && (
                            <>
                              <span>•</span>
                              <span className={daysRemaining <= 1 ? 'text-red-600 font-medium' : ''}>
                                {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Overdue'}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#2E2E2E]">${order.totalAmount.toFixed(2)}</p>
                        <p className="text-sm text-[#2E2E2E]/60">
                          ${order.price} + ${order.serviceFee.toFixed(2)} fee
                        </p>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-[#ffeee3]/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#FF6B00]" />
                        <span className="text-sm text-[#2E2E2E]">
                          {order.deliveryTime} day{parseInt(order.deliveryTime) !== 1 ? 's' : ''} delivery
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#FF6B00]" />
                        <span className="text-sm text-[#2E2E2E]">
                          {order.revisionCount}/{order.maxRevisions} revisions used
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-[#FF6B00]" />
                        <span className="text-sm text-[#2E2E2E]">
                          Payment: {order.paymentStatus}
                        </span>
                      </div>
                    </div>

                    {/* Requirements Preview */}
                    {order.requirements && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-[#2E2E2E] mb-1">Requirements:</p>
                        <p className="text-sm text-[#2E2E2E]/70 bg-gray-50 p-3 rounded-lg">
                          {order.requirements.length > 150 
                            ? `${order.requirements.substring(0, 150)}...` 
                            : order.requirements
                          }
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#FF6B00]/10">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleContactSeller(order)}
                          className="flex items-center gap-2 px-4 py-2 bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Contact Seller
                        </button>
                        <button
                          onClick={() => handleViewGig(order.gigId)}
                          className="flex items-center gap-2 px-4 py-2 border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors"
                        >
                          View Gig
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => navigate(`/client/order/${order.id}`)}
                          className="flex items-center gap-2 px-3 py-2 text-[#2E2E2E] hover:bg-[#ffeee3] rounded-lg transition-colors">
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;