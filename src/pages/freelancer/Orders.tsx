import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';

interface Order {
  id: string;
  orderNumber: string;
  gigId: string;
  gigTitle: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  packageType: string;
  packageTitle: string;
  price: number;
  serviceFee: number;
  totalAmount: number;
  status: 'pending' | 'accepted' | 'in_progress' | 'revision_requested' | 'completed' | 'cancelled' | 'rejected';
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  deliveryTime: string;
  revisions: string;
  requirements: string;
  createdAt: any;
  expectedDeliveryDate: any;
  conversationId: string;
  revisionCount: number;
  maxRevisions: number;
  features?: string[];
}

const Orders: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load orders from Firebase
  useEffect(() => {
    if (!currentUser) {
      setIsLoading(false);
      return;
    }

    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef,
      where('sellerId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData: Order[] = [];
      snapshot.forEach((doc) => {
        ordersData.push({
          id: doc.id,
          ...doc.data()
        } as Order);
      });
      
      // Sort by created date
      const sortedOrders = ordersData.sort((a, b) => {
        const aTime = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
        const bTime = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
        return bTime.getTime() - aTime.getTime();
      });
      
      setOrders(sortedOrders);
      setIsLoading(false);
    }, (error) => {
      console.error('Error fetching orders:', error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleAcceptOrder = async (orderId: string) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        status: 'accepted',
        acceptedAt: new Date()
      });
    } catch (error) {
      console.error('Error accepting order:', error);
      alert('Failed to accept order. Please try again.');
    }
  };

  const handleRejectOrder = async (orderId: string) => {
    if (!window.confirm('Are you sure you want to reject this order? This action cannot be undone.')) {
      return;
    }
    
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        status: 'rejected',
        rejectedAt: new Date()
      });
    } catch (error) {
      console.error('Error rejecting order:', error);
      alert('Failed to reject order. Please try again.');
    }
  };

  const handleStartWork = async (orderId: string) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        status: 'in_progress',
        startedAt: new Date()
      });
    } catch (error) {
      console.error('Error starting work:', error);
      alert('Failed to start work. Please try again.');
    }
  };

  const filterOptions = [
    { id: 'all', name: 'All Orders', count: orders.length },
    { id: 'pending', name: 'Pending', count: orders.filter(o => o.status === 'pending').length },
    { id: 'accepted', name: 'Accepted', count: orders.filter(o => o.status === 'accepted').length },
    { id: 'in_progress', name: 'In Progress', count: orders.filter(o => o.status === 'in_progress').length },
    { id: 'completed', name: 'Completed', count: orders.filter(o => o.status === 'completed').length },
    { id: 'revision_requested', name: 'Revisions', count: orders.filter(o => o.status === 'revision_requested').length }
  ];

  const filteredOrders = activeFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'accepted':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'in_progress':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'revision_requested':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'cancelled':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending Acceptance';
      case 'accepted':
        return 'Accepted';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'revision_requested':
        return 'Revision Requested';
      case 'rejected':
        return 'Rejected';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const getTimeRemaining = (dueDate: any) => {
    if (!dueDate) return 'N/A';
    const now = new Date();
    const due = dueDate.toDate ? dueDate.toDate() : new Date(dueDate);
    const diff = due.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) return 'Overdue';
    if (days === 0) return 'Due today';
    if (days === 1) return '1 day left';
    return `${days} days left`;
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

  const handleDeliverOrder = (orderId: string) => {
    console.log('Delivering order:', orderId);
    // Delivery logic here - navigate to delivery page
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
          <span className="ml-3 mt-4 text-[#2E2E2E]">Loading orders...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#2E2E2E] mb-2">Gig Orders</h1>
              <p className="text-gray-600">Manage your active gig orders and deliverables</p>
            </div>
            <div className="flex items-center gap-4">
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent">
                <option>Sort by: Due Date</option>
                <option>Sort by: Order Date</option>
                <option>Sort by: Price</option>
                <option>Sort by: Status</option>
              </select>
              <Link 
                to="/freelancer/gigs"
                className="px-4 py-2 bg-[#FF6B00] text-white rounded-lg hover:bg-[#FF9F45] transition-colors"
              >
                View Gigs
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Filter Orders</h3>
              <div className="space-y-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setActiveFilter(option.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      activeFilter === option.id
                        ? 'bg-[#ffeee3] text-[#FF6B00]'
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <span className="font-medium">{option.name}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      activeFilter === option.id
                        ? 'bg-[#FF6B00] text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {option.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Order Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Order Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Revenue</span>
                  <span className="font-bold text-[#FF6B00]">$1,150</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Avg. Order Value</span>
                  <span className="font-medium text-[#2E2E2E]">$287.50</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">On-Time Delivery</span>
                  <span className="font-medium text-green-600">95%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Avg. Rating</span>
                  <span className="font-medium text-yellow-500">⭐ 4.9</span>
                </div>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
                  <span className="text-6xl mb-4 block">📦</span>
                  <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">No Orders Found</h3>
                  <p className="text-gray-600 mb-4">
                    {activeFilter === 'all' 
                      ? "You don't have any orders yet. Create gigs to start receiving orders!"
                      : `No orders found for the ${activeFilter} status.`}
                  </p>
                  <Link 
                    to="/freelancer/gigs"
                    className="inline-block bg-[#FF6B00] text-white px-6 py-2 rounded-lg hover:bg-[#FF9F45] transition-colors"
                  >
                    View My Gigs
                  </Link>
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                          👤
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#2E2E2E] mb-1">{order.gigTitle}</h3>
                          <p className="text-gray-600 text-sm mb-2">
                            Ordered by {order.buyerName} • {order.packageType.toUpperCase()} Package
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>💰 ${order.totalAmount.toFixed(2)}</span>
                            <span>📅 Due: {formatDate(order.expectedDeliveryDate)}</span>
                            <span className={`font-medium ${
                              getTimeRemaining(order.expectedDeliveryDate).includes('Overdue') 
                                ? 'text-red-600' 
                                : getTimeRemaining(order.expectedDeliveryDate).includes('today') 
                                ? 'text-orange-600' 
                                : 'text-green-600'
                            }`}>
                              ⏰ {getTimeRemaining(order.expectedDeliveryDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                        <div className="mt-2 text-sm text-gray-500">
                          #{order.orderNumber}
                        </div>
                      </div>
                    </div>

                    {/* Pending Order Alert */}
                    {order.status === 'pending' && (
                      <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm font-medium text-yellow-800 mb-2">⏰ New order waiting for your response</p>
                        <p className="text-xs text-yellow-700">Please accept or reject this order within 24 hours</p>
                      </div>
                    )}

                    {/* Order Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Package Price</p>
                        <p className="text-sm font-medium">${order.price}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Revisions</p>
                        <p className="text-sm font-medium">{order.revisionCount}/{order.maxRevisions} used</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Payment Status</p>
                        <p className="text-sm font-medium capitalize">{order.paymentStatus}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Delivery Time</p>
                        <p className="text-sm font-medium">{order.deliveryTime} days</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                          className="text-[#FF6B00] hover:underline text-sm font-medium"
                        >
                          {selectedOrder === order.id ? 'Hide Details' : 'View Details'}
                        </button>
                        <Link 
                          to={`/freelancer/messages`}
                          className="text-[#FF6B00] hover:underline text-sm font-medium"
                        >
                          Message Buyer
                        </Link>
                        <Link 
                          to={`/freelancer/project-workspace/${order.id}`}
                          className="text-[#FF6B00] hover:underline text-sm font-medium"
                        >
                          Workspace
                        </Link>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {order.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleRejectOrder(order.id)}
                              className="border border-red-500 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                            >
                              Reject
                            </button>
                            <button 
                              onClick={() => handleAcceptOrder(order.id)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                            >
                              Accept Order
                            </button>
                          </>
                        )}
                        {order.status === 'accepted' && (
                          <button 
                            onClick={() => handleStartWork(order.id)}
                            className="bg-[#FF6B00] text-white px-4 py-2 rounded-lg hover:bg-[#FF9F45] transition-colors text-sm font-medium"
                          >
                            Start Working
                          </button>
                        )}
                        {order.status === 'in_progress' && (
                          <button 
                            onClick={() => handleDeliverOrder(order.id)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                          >
                            Deliver Work
                          </button>
                        )}
                        {order.status === 'revision_requested' && (
                          <button 
                            onClick={() => handleDeliverOrder(order.id)}
                            className="bg-[#FF6B00] text-white px-4 py-2 rounded-lg hover:bg-[#FF9F45] transition-colors text-sm font-medium"
                          >
                            Submit Revision
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedOrder === order.id && order.requirements && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h4 className="font-semibold text-[#2E2E2E] mb-3">Order Requirements</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{order.requirements}</p>
                        </div>
                        
                        {order.features && order.features.length > 0 && (
                          <div className="mt-4">
                            <h5 className="font-medium text-[#2E2E2E] mb-2">Package Features</h5>
                            <ul className="space-y-2">
                              {order.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                                  <span className="text-green-500">✓</span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {filteredOrders.length > 0 && (
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mt-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Showing 1-{filteredOrders.length} of {filteredOrders.length} orders</p>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Previous</button>
                    <span className="px-3 py-1 text-sm bg-[#FF6B00] text-white rounded">1</span>
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Next</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
