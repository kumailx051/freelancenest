import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Orders: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  const orders = [
    {
      id: 1,
      gigTitle: 'I will develop a responsive React web application',
      buyerName: 'John Smith',
      buyerAvatar: '👤',
      package: 'Standard Package',
      price: 300,
      status: 'in-progress',
      orderDate: '2024-01-10',
      dueDate: '2024-01-17',
      deliveryTime: '7 days',
      progress: 65,
      requirements: [
        { question: 'What is your business name?', answer: 'TechStart Solutions' },
        { question: 'Do you have a logo?', answer: 'Yes, I will provide it' },
        { question: 'Preferred colors?', answer: 'Blue and white theme' }
      ],
      messages: 12,
      revisions: 1,
      maxRevisions: 3,
      files: ['design-mockup.pdf', 'requirements.docx']
    },
    {
      id: 2,
      gigTitle: 'I will design a modern logo for your business',
      buyerName: 'Sarah Johnson',
      buyerAvatar: '👩',
      package: 'Premium Package',
      price: 150,
      status: 'delivered',
      orderDate: '2024-01-05',
      dueDate: '2024-01-08',
      deliveryTime: '3 days',
      progress: 100,
      deliveredDate: '2024-01-08',
      requirements: [
        { question: 'Company name?', answer: 'Creative Studio' },
        { question: 'Industry?', answer: 'Design Agency' }
      ],
      messages: 8,
      revisions: 0,
      maxRevisions: 2,
      files: ['logo-final.ai', 'logo-variants.pdf'],
      rating: 5,
      review: 'Excellent work! Very professional and delivered on time.'
    },
    {
      id: 3,
      gigTitle: 'I will create a complete brand identity package',
      buyerName: 'Mike Chen',
      buyerAvatar: '👨',
      package: 'Basic Package',
      price: 200,
      status: 'new',
      orderDate: '2024-01-15',
      dueDate: '2024-01-20',
      deliveryTime: '5 days',
      progress: 0,
      requirements: [
        { question: 'Business description?', answer: 'Tech startup focused on AI solutions' },
        { question: 'Target audience?', answer: 'Business professionals and developers' },
        { question: 'Inspiration examples?', answer: 'Modern, clean, technology-focused brands' }
      ],
      messages: 3,
      revisions: 0,
      maxRevisions: 2,
      files: []
    },
    {
      id: 4,
      gigTitle: 'I will develop a mobile-responsive website',
      buyerName: 'Emma Wilson',
      buyerAvatar: '👩‍💼',
      package: 'Premium Package',
      price: 500,
      status: 'revision',
      orderDate: '2024-01-08',
      dueDate: '2024-01-22',
      deliveryTime: '14 days',
      progress: 85,
      requirements: [
        { question: 'Website purpose?', answer: 'Portfolio website for photography business' },
        { question: 'Number of pages?', answer: '5 pages: Home, About, Portfolio, Services, Contact' }
      ],
      messages: 15,
      revisions: 1,
      maxRevisions: 3,
      files: ['website-v1.zip', 'feedback.docx'],
      revisionNote: 'Please adjust the color scheme and add more portfolio images'
    }
  ];

  const filterOptions = [
    { id: 'all', name: 'All Orders', count: orders.length },
    { id: 'new', name: 'New', count: orders.filter(o => o.status === 'new').length },
    { id: 'in-progress', name: 'In Progress', count: orders.filter(o => o.status === 'in-progress').length },
    { id: 'delivered', name: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
    { id: 'revision', name: 'Revisions', count: orders.filter(o => o.status === 'revision').length },
    { id: 'completed', name: 'Completed', count: orders.filter(o => o.status === 'completed').length }
  ];

  const filteredOrders = activeFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'in-progress':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'delivered':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'revision':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'completed':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'cancelled':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new':
        return 'New Order';
      case 'in-progress':
        return 'In Progress';
      case 'delivered':
        return 'Delivered';
      case 'revision':
        return 'Revision Requested';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const getTimeRemaining = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) return 'Overdue';
    if (days === 0) return 'Due today';
    if (days === 1) return '1 day left';
    return `${days} days left`;
  };

  const handleDeliverOrder = (orderId: number) => {
    console.log('Delivering order:', orderId);
    // Delivery logic here
  };

  const handleRequestRevision = (orderId: number) => {
    console.log('Requesting revision for order:', orderId);
    // Revision logic here
  };

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
                          {order.buyerAvatar}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#2E2E2E] mb-1">{order.gigTitle}</h3>
                          <p className="text-gray-600 text-sm mb-2">
                            Ordered by {order.buyerName} • {order.package}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>💰 ${order.price}</span>
                            <span>📅 Due: {new Date(order.dueDate).toLocaleDateString()}</span>
                            <span className={`font-medium ${
                              getTimeRemaining(order.dueDate).includes('Overdue') 
                                ? 'text-red-600' 
                                : getTimeRemaining(order.dueDate).includes('today') 
                                ? 'text-orange-600' 
                                : 'text-green-600'
                            }`}>
                              ⏰ {getTimeRemaining(order.dueDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                        <div className="mt-2 text-sm text-gray-500">
                          Order #{order.id}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {order.status === 'in-progress' && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span>{order.progress}% Complete</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#FF6B00] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${order.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Order Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Messages</p>
                        <p className="text-sm font-medium">{order.messages} messages</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Revisions</p>
                        <p className="text-sm font-medium">{order.revisions}/{order.maxRevisions} used</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Files</p>
                        <p className="text-sm font-medium">{order.files.length} files</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Delivery Time</p>
                        <p className="text-sm font-medium">{order.deliveryTime}</p>
                      </div>
                    </div>

                    {/* Revision Note */}
                    {order.status === 'revision' && order.revisionNote && (
                      <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <p className="text-sm font-medium text-orange-800 mb-1">Revision Requested:</p>
                        <p className="text-sm text-orange-700">{order.revisionNote}</p>
                      </div>
                    )}

                    {/* Review (for delivered orders) */}
                    {order.status === 'delivered' && order.rating && (
                      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-sm ${i < order.rating! ? 'text-yellow-500' : 'text-gray-300'}`}>
                                ⭐
                              </span>
                            ))}
                          </div>
                          <span className="text-sm font-medium text-green-800">{order.rating}/5</span>
                        </div>
                        <p className="text-sm text-green-700">{order.review}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                          className="text-[#FF6B00] hover:underline text-sm font-medium"
                        >
                          View Details
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
                        {order.status === 'new' && (
                          <button className="bg-[#FF6B00] text-white px-4 py-2 rounded-lg hover:bg-[#FF9F45] transition-colors text-sm">
                            Start Working
                          </button>
                        )}
                        {order.status === 'in-progress' && (
                          <button 
                            onClick={() => handleDeliverOrder(order.id)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            Deliver Work
                          </button>
                        )}
                        {order.status === 'revision' && (
                          <button 
                            onClick={() => handleRequestRevision(order.id)}
                            className="bg-[#FF6B00] text-white px-4 py-2 rounded-lg hover:bg-[#FF9F45] transition-colors text-sm"
                          >
                            Submit Revision
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedOrder === order.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h4 className="font-semibold text-[#2E2E2E] mb-3">Order Requirements</h4>
                        <div className="space-y-3">
                          {order.requirements.map((req, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm font-medium text-[#2E2E2E] mb-1">{req.question}</p>
                              <p className="text-sm text-gray-600">{req.answer}</p>
                            </div>
                          ))}
                        </div>
                        
                        {order.files.length > 0 && (
                          <div className="mt-4">
                            <h5 className="font-medium text-[#2E2E2E] mb-2">Attached Files</h5>
                            <div className="flex flex-wrap gap-2">
                              {order.files.map((file, index) => (
                                <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                  📎 {file}
                                </span>
                              ))}
                            </div>
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
