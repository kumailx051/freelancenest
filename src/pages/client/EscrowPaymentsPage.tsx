import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EscrowPaymentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  
  // Use selectedPayment to avoid unused variable warning
  console.log('Selected payment:', selectedPayment);

  const escrowBalance = 15750;
  const totalEarnings = 45230;
  const pendingReleases = 3200;

  const transactions = [
    {
      id: '1',
      type: 'deposit',
      amount: 2500,
      date: '2024-01-15',
      description: 'Milestone 1 - E-commerce Website Development',
      status: 'completed',
      freelancer: 'John Smith',
      project: 'E-commerce Website Development'
    },
    {
      id: '2',
      type: 'release',
      amount: 1200,
      date: '2024-01-12',
      description: 'Mobile App UI Design - Final Payment',
      status: 'pending_approval',
      freelancer: 'Sarah Johnson',
      project: 'Mobile App UI Design'
    },
    {
      id: '3',
      type: 'deposit',
      amount: 800,
      date: '2024-01-10',
      description: 'Logo Design Project - Milestone 2',
      status: 'held',
      freelancer: 'Mike Chen',
      project: 'Brand Identity Package'
    },
    {
      id: '4',
      type: 'release',
      amount: 1500,
      date: '2024-01-08',
      description: 'Content Writing - Article Series',
      status: 'completed',
      freelancer: 'Emma Wilson',
      project: 'Blog Content Creation'
    }
  ];

  const activeContracts = [
    {
      id: '1',
      freelancer: 'John Smith',
      project: 'E-commerce Website Development',
      totalValue: 5000,
      paidAmount: 2500,
      milestones: [
        { title: 'Project Setup', amount: 1250, status: 'completed', releaseDate: '2024-01-05' },
        { title: 'Frontend Development', amount: 1250, status: 'completed', releaseDate: '2024-01-15' },
        { title: 'Backend Development', amount: 1500, status: 'in_progress', dueDate: '2024-02-01' },
        { title: 'Testing & Deployment', amount: 1000, status: 'pending', dueDate: '2024-02-15' }
      ]
    },
    {
      id: '2',
      freelancer: 'Sarah Johnson',
      project: 'Mobile App UI Design',
      totalValue: 3000,
      paidAmount: 1800,
      milestones: [
        { title: 'Wireframes', amount: 800, status: 'completed', releaseDate: '2023-12-20' },
        { title: 'Design System', amount: 1000, status: 'completed', releaseDate: '2024-01-05' },
        { title: 'Final Designs', amount: 1200, status: 'awaiting_approval', completedDate: '2024-01-12' }
      ]
    }
  ];

  const paymentMethods = [
    {
      id: '1',
      type: 'credit_card',
      last4: '4532',
      brand: 'Visa',
      isDefault: true
    },
    {
      id: '2',
      type: 'paypal',
      email: 'client@example.com',
      isDefault: false
    },
    {
      id: '3',
      type: 'bank_account',
      last4: '7890',
      bank: 'Chase Bank',
      isDefault: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending_approval': return 'text-yellow-600 bg-yellow-100';
      case 'awaiting_approval': return 'text-yellow-600 bg-yellow-100';
      case 'held': return 'text-blue-600 bg-blue-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Escrow & Payments</h1>
            <p className="text-xl mb-8 text-[#ffeee3]">
              Manage your project payments, escrow funds, and transaction history securely.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-[#ffeee3] text-sm mb-2">Escrow Balance</div>
                <div className="text-3xl font-bold text-white">${escrowBalance.toLocaleString()}</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-[#ffeee3] text-sm mb-2">Total Spent</div>
                <div className="text-3xl font-bold text-white">${totalEarnings.toLocaleString()}</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-[#ffeee3] text-sm mb-2">Pending Releases</div>
                <div className="text-3xl font-bold text-[#FF6B00]">${pendingReleases.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            {/* Navigation Tabs */}
            <div className="flex flex-wrap border-b border-[#ffeee3] mb-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'transactions', label: 'Transaction History' },
                { id: 'contracts', label: 'Active Contracts' },
                { id: 'methods', label: 'Payment Methods' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-[#FF6B00] border-b-2 border-[#FF6B00]'
                      : 'text-[#2E2E2E] hover:text-[#FF6B00]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                  <h2 className="text-xl font-bold text-[#2E2E2E] mb-6">Recent Payment Activity</h2>
                  <div className="space-y-4">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 bg-[#ffeee3]/30 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-2 h-2 rounded-full ${
                            transaction.type === 'deposit' ? 'bg-blue-500' : 'bg-green-500'
                          }`}></div>
                          <div>
                            <div className="font-medium text-[#2E2E2E]">{transaction.description}</div>
                            <div className="text-sm text-[#2E2E2E]/60">{transaction.freelancer} • {transaction.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold ${
                            transaction.type === 'deposit' ? 'text-blue-600' : 'text-green-600'
                          }`}>
                            {transaction.type === 'deposit' ? '-' : '+'}${transaction.amount}
                          </div>
                          <div className={`text-xs px-2 py-1 rounded ${getStatusColor(transaction.status)}`}>
                            {transaction.status.replace('_', ' ')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link 
                    to="#"
                    onClick={() => setActiveTab('transactions')}
                    className="inline-block mt-4 text-[#FF6B00] hover:text-[#FF9F45] font-medium"
                  >
                    View all transactions →
                  </Link>
                </div>

                {/* Pending Actions */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                  <h2 className="text-xl font-bold text-[#2E2E2E] mb-6">Actions Required</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div>
                        <div className="font-medium text-[#2E2E2E]">Milestone approval needed</div>
                        <div className="text-sm text-[#2E2E2E]/60">Sarah Johnson completed "Final Designs" milestone</div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg font-medium transition-colors">
                          Review & Release
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div>
                        <div className="font-medium text-[#2E2E2E]">Escrow funding needed</div>
                        <div className="text-sm text-[#2E2E2E]/60">Backend Development milestone starts in 3 days</div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg font-medium transition-colors">
                          Fund Escrow
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div className="bg-white rounded-xl shadow-sm border border-[#ffeee3]">
                <div className="p-6 border-b border-[#ffeee3]">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <h2 className="text-xl font-bold text-[#2E2E2E] mb-4 md:mb-0">Transaction History</h2>
                    <div className="flex space-x-3">
                      <select className="px-4 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]">
                        <option>All Types</option>
                        <option>Deposits</option>
                        <option>Releases</option>
                        <option>Refunds</option>
                      </select>
                      <select className="px-4 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]">
                        <option>Last 30 days</option>
                        <option>Last 3 months</option>
                        <option>Last 6 months</option>
                        <option>All time</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#ffeee3]/30">
                      <tr>
                        <th className="text-left p-4 font-medium text-[#2E2E2E]">Date</th>
                        <th className="text-left p-4 font-medium text-[#2E2E2E]">Description</th>
                        <th className="text-left p-4 font-medium text-[#2E2E2E]">Freelancer</th>
                        <th className="text-left p-4 font-medium text-[#2E2E2E]">Amount</th>
                        <th className="text-left p-4 font-medium text-[#2E2E2E]">Status</th>
                        <th className="text-left p-4 font-medium text-[#2E2E2E]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="border-t border-[#ffeee3]">
                          <td className="p-4 text-[#2E2E2E]">{transaction.date}</td>
                          <td className="p-4">
                            <div className="font-medium text-[#2E2E2E]">{transaction.description}</div>
                            <div className="text-sm text-[#2E2E2E]/60">{transaction.project}</div>
                          </td>
                          <td className="p-4 text-[#2E2E2E]">{transaction.freelancer}</td>
                          <td className="p-4">
                            <span className={`font-semibold ${
                              transaction.type === 'deposit' ? 'text-blue-600' : 'text-green-600'
                            }`}>
                              {transaction.type === 'deposit' ? '-' : '+'}${transaction.amount}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs ${getStatusColor(transaction.status)}`}>
                              {transaction.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => setSelectedPayment(transaction.id)}
                              className="text-[#FF6B00] hover:text-[#FF9F45] font-medium"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Active Contracts Tab */}
            {activeTab === 'contracts' && (
              <div className="space-y-6">
                {activeContracts.map((contract) => (
                  <div key={contract.id} className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-[#2E2E2E] mb-2">{contract.project}</h3>
                        <p className="text-[#2E2E2E]/60">with {contract.freelancer}</p>
                      </div>
                      <div className="text-right mt-4 md:mt-0">
                        <div className="text-sm text-[#2E2E2E]/60">Total Contract Value</div>
                        <div className="text-2xl font-bold text-[#FF6B00]">${contract.totalValue}</div>
                        <div className="text-sm text-[#2E2E2E]/60">Paid: ${contract.paidAmount}</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {contract.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-[#ffeee3]/30 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`w-3 h-3 rounded-full ${
                              milestone.status === 'completed' ? 'bg-green-500' :
                              milestone.status === 'in_progress' ? 'bg-blue-500' :
                              milestone.status === 'awaiting_approval' ? 'bg-yellow-500' :
                              'bg-gray-300'
                            }`}></div>
                            <div>
                              <div className="font-medium text-[#2E2E2E]">{milestone.title}</div>
                              <div className="text-sm text-[#2E2E2E]/60">
                                {milestone.status === 'completed' ? `Released on ${(milestone as any).releaseDate}` :
                                 milestone.status === 'awaiting_approval' ? `Completed on ${(milestone as any).completedDate}` :
                                 (milestone as any).dueDate ? `Due: ${(milestone as any).dueDate}` : 'Pending'
                                }
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="font-semibold text-[#2E2E2E]">${milestone.amount}</div>
                              <div className={`text-xs px-2 py-1 rounded ${getStatusColor(milestone.status)}`}>
                                {milestone.status.replace('_', ' ')}
                              </div>
                            </div>
                            {milestone.status === 'awaiting_approval' && (
                              <button className="px-3 py-1 bg-[#FF6B00] hover:bg-[#FF9F45] text-white text-sm rounded font-medium transition-colors">
                                Review
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === 'methods' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#2E2E2E]">Payment Methods</h2>
                    <button className="px-4 py-2 bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg font-medium transition-colors">
                      Add Payment Method
                    </button>
                  </div>

                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-4 border border-[#ffeee3] rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-8 bg-[#ffeee3] rounded flex items-center justify-center">
                            {method.type === 'credit_card' && (
                              <svg className="w-6 h-6 text-[#FF6B00]" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                              </svg>
                            )}
                            {method.type === 'paypal' && (
                              <span className="font-bold text-[#FF6B00] text-xs">PP</span>
                            )}
                            {method.type === 'bank_account' && (
                              <svg className="w-6 h-6 text-[#FF6B00]" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"/>
                              </svg>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-[#2E2E2E]">
                              {method.type === 'credit_card' && `${method.brand} ending in ${method.last4}`}
                              {method.type === 'paypal' && `PayPal - ${method.email}`}
                              {method.type === 'bank_account' && `${method.bank} ending in ${method.last4}`}
                            </div>
                            {method.isDefault && (
                              <span className="text-xs text-[#FF6B00] font-medium">Default</span>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {!method.isDefault && (
                            <button className="text-[#FF6B00] hover:text-[#FF9F45] font-medium">
                              Set as Default
                            </button>
                          )}
                          <button className="text-red-500 hover:text-red-700 font-medium">
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">Security & Protection</h3>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span>All payments are protected by 256-bit SSL encryption</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span>Funds held in secure escrow until work is completed</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span>Dispute resolution available for all transactions</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span>PCI DSS compliant payment processing</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EscrowPaymentsPage;
