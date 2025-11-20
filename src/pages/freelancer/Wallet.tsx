import React, { useState } from 'react';

const Wallet: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [autoWithdrawEnabled, setAutoWithdrawEnabled] = useState(false);

  const transactions = [
    {
      id: 1,
      type: 'payment',
      description: 'E-commerce Website Development',
      client: 'TechStart Inc.',
      amount: 2500.00,
      fee: -125.00,
      net: 2375.00,
      status: 'completed',
      date: '2024-01-15',
      method: 'Bank Transfer'
    },
    {
      id: 2,
      type: 'withdrawal',
      description: 'Withdrawal to Bank Account',
      amount: -1800.00,
      fee: -5.00,
      net: -1805.00,
      status: 'processing',
      date: '2024-01-14',
      method: 'Bank Transfer'
    },
    {
      id: 3,
      type: 'payment',
      description: 'Mobile App UI Design',
      client: 'Creative Agency',
      amount: 1200.00,
      fee: -60.00,
      net: 1140.00,
      status: 'pending',
      date: '2024-01-13',
      method: 'PayPal'
    },
    {
      id: 4,
      type: 'refund',
      description: 'Project Cancellation Refund',
      client: 'StartupCo',
      amount: -500.00,
      fee: 25.00,
      net: -475.00,
      status: 'completed',
      date: '2024-01-12',
      method: 'Original Payment Method'
    },
    {
      id: 5,
      type: 'hold',
      description: 'Escrow Hold - Web Development',
      client: 'BigCorp Ltd.',
      amount: 3000.00,
      status: 'held',
      date: '2024-01-10',
      releaseDate: '2024-01-25'
    }
  ];

  const walletStats = {
    available: 4567.89,
    pending: 2345.67,
    inEscrow: 3000.00,
    totalEarned: 45678.90,
    totalWithdrawn: 38543.12,
    totalFees: 1234.56
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return '💰';
      case 'withdrawal':
        return '🏦';
      case 'refund':
        return '↩️';
      case 'hold':
        return '🔒';
      default:
        return '📄';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'processing':
        return 'text-blue-600 bg-blue-50';
      case 'held':
        return 'text-orange-600 bg-orange-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2E2E2E] mb-2">Wallet & Transactions</h1>
          <p className="text-gray-600">Manage your earnings, withdrawals, and transaction history</p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#2E2E2E]">Available Balance</h3>
              <div className="p-2 bg-green-50 rounded-lg">
                <span className="text-green-600 text-xl">💵</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              ${walletStats.available.toLocaleString()}
            </div>
            <p className="text-sm text-gray-500">Ready for withdrawal</p>
            <button className="w-full mt-4 bg-[#FF6B00] text-white py-2 px-4 rounded-lg hover:bg-[#FF9F45] transition-colors">
              Withdraw Funds
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#2E2E2E]">Pending Clearance</h3>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <span className="text-yellow-600 text-xl">⏳</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              ${walletStats.pending.toLocaleString()}
            </div>
            <p className="text-sm text-gray-500">Processing payments</p>
            <p className="text-xs text-gray-400 mt-2">Available in 3-5 business days</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#2E2E2E]">In Escrow</h3>
              <div className="p-2 bg-blue-50 rounded-lg">
                <span className="text-blue-600 text-xl">🔒</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              ${walletStats.inEscrow.toLocaleString()}
            </div>
            <p className="text-sm text-gray-500">Project milestone funds</p>
            <p className="text-xs text-gray-400 mt-2">Released upon completion</p>
          </div>
        </div>

        {/* Auto-Withdraw Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Auto-Withdrawal Settings</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#2E2E2E] font-medium">Automatic Withdrawal</p>
              <p className="text-sm text-gray-500">Automatically withdraw when balance reaches threshold</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoWithdrawEnabled}
                onChange={(e) => setAutoWithdrawEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B00]"></div>
            </label>
          </div>
          {autoWithdrawEnabled && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Withdrawal Threshold
                  </label>
                  <input
                    type="number"
                    placeholder="500"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Withdrawal Method
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent">
                    <option>Bank Transfer</option>
                    <option>PayPal</option>
                    <option>Payoneer</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="text-lg font-semibold text-[#2E2E2E]">Transaction History</h3>
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
                  <option value="all">All time</option>
                </select>
                <button className="px-4 py-2 text-[#FF6B00] border border-[#FF6B00] rounded-lg hover:bg-[#ffeee3] transition-colors">
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{getTransactionIcon(transaction.type)}</span>
                        <div>
                          <div className="text-sm font-medium text-[#2E2E2E]">
                            {transaction.description}
                          </div>
                          {transaction.client && (
                            <div className="text-sm text-gray-500">{transaction.client}</div>
                          )}
                          {transaction.method && (
                            <div className="text-xs text-gray-400">{transaction.method}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2E2E2E]">
                      <span className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      {transaction.fee ? `$${Math.abs(transaction.fee).toFixed(2)}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2E2E2E]">
                      {transaction.net && (
                        <span className={transaction.net > 0 ? 'text-green-600' : 'text-red-600'}>
                          {transaction.net > 0 ? '+' : ''}${Math.abs(transaction.net).toLocaleString()}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                      {transaction.releaseDate && (
                        <div className="text-xs text-gray-400">
                          Release: {new Date(transaction.releaseDate).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Showing 1-5 of 142 transactions</p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Previous</button>
                <span className="px-3 py-1 text-sm bg-[#FF6B00] text-white rounded">1</span>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">2</button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">3</button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <h4 className="text-lg font-semibold text-[#2E2E2E] mb-2">Total Earned</h4>
            <div className="text-2xl font-bold text-green-600">
              ${walletStats.totalEarned.toLocaleString()}
            </div>
            <p className="text-sm text-gray-500 mt-1">Lifetime earnings</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <h4 className="text-lg font-semibold text-[#2E2E2E] mb-2">Total Withdrawn</h4>
            <div className="text-2xl font-bold text-blue-600">
              ${walletStats.totalWithdrawn.toLocaleString()}
            </div>
            <p className="text-sm text-gray-500 mt-1">Successfully withdrawn</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <h4 className="text-lg font-semibold text-[#2E2E2E] mb-2">Total Fees</h4>
            <div className="text-2xl font-bold text-gray-600">
              ${walletStats.totalFees.toLocaleString()}
            </div>
            <p className="text-sm text-gray-500 mt-1">Platform & processing fees</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
