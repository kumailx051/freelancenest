import React, { useState } from 'react';

const InvoicesTaxCenterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('invoices');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [invoiceFilter, setInvoiceFilter] = useState('all');

  const invoices = [
    {
      id: 'INV-2024-001',
      date: '2024-01-30',
      dueDate: '2024-02-13',
      freelancer: 'John Smith',
      project: 'E-commerce Website Development',
      amount: 1250,
      tax: 125,
      total: 1375,
      status: 'paid',
      paymentDate: '2024-01-28',
      description: 'Frontend Development Milestone',
      downloadUrl: '/invoices/inv-2024-001.pdf'
    },
    {
      id: 'INV-2024-002',
      date: '2024-01-25',
      dueDate: '2024-02-08',
      freelancer: 'Sarah Johnson',
      project: 'Mobile App UI Design',
      amount: 800,
      tax: 80,
      total: 880,
      status: 'paid',
      paymentDate: '2024-01-26',
      description: 'Final UI Designs',
      downloadUrl: '/invoices/inv-2024-002.pdf'
    },
    {
      id: 'INV-2024-003',
      date: '2024-01-20',
      dueDate: '2024-02-03',
      freelancer: 'Mike Chen',
      project: 'Brand Identity Package',
      amount: 500,
      tax: 50,
      total: 550,
      status: 'overdue',
      paymentDate: null,
      description: 'Logo Design Milestone',
      downloadUrl: '/invoices/inv-2024-003.pdf'
    },
    {
      id: 'INV-2024-004',
      date: '2024-01-15',
      dueDate: '2024-01-29',
      freelancer: 'Emma Wilson',
      project: 'Content Marketing Strategy',
      amount: 600,
      tax: 60,
      total: 660,
      status: 'pending',
      paymentDate: null,
      description: 'Content Strategy Document',
      downloadUrl: '/invoices/inv-2024-004.pdf'
    }
  ];

  const taxDocuments = [
    {
      id: '1',
      type: '1099-NEC',
      year: '2023',
      freelancer: 'John Smith',
      totalPaid: 12500,
      downloadUrl: '/tax/1099-nec-john-smith-2023.pdf',
      issued: '2024-01-31'
    },
    {
      id: '2',
      type: '1099-NEC',
      year: '2023',
      freelancer: 'Sarah Johnson',
      totalPaid: 8900,
      downloadUrl: '/tax/1099-nec-sarah-johnson-2023.pdf',
      issued: '2024-01-31'
    },
    {
      id: '3',
      type: '1099-NEC',
      year: '2023',
      freelancer: 'Mike Chen',
      totalPaid: 6750,
      downloadUrl: '/tax/1099-nec-mike-chen-2023.pdf',
      issued: '2024-01-31'
    }
  ];

  const taxSummary = {
    '2023': {
      totalPaid: 28150,
      totalTax: 2815,
      totalFreelancers: 8,
      q1: 7200,
      q2: 6900,
      q3: 8100,
      q4: 5950
    },
    '2024': {
      totalPaid: 3150,
      totalTax: 315,
      totalFreelancers: 4,
      q1: 3150,
      q2: 0,
      q3: 0,
      q4: 0
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-600';
      case 'pending': return 'bg-yellow-100 text-yellow-600';
      case 'overdue': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    if (invoiceFilter === 'all') return true;
    return invoice.status === invoiceFilter;
  });

  const currentTaxSummary = taxSummary[selectedYear as keyof typeof taxSummary];

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Invoices & Tax Center</h1>
            <p className="text-xl mb-8 text-[#ffeee3]">
              Manage your invoices, track expenses, and access tax documents for your freelance projects.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-[#ffeee3] text-sm mb-2">Total Paid (2024)</div>
                <div className="text-3xl font-bold text-white">${currentTaxSummary.totalPaid.toLocaleString()}</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-[#ffeee3] text-sm mb-2">Tax Withheld</div>
                <div className="text-3xl font-bold text-white">${currentTaxSummary.totalTax.toLocaleString()}</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-[#ffeee3] text-sm mb-2">Active Freelancers</div>
                <div className="text-3xl font-bold text-white">{currentTaxSummary.totalFreelancers}</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-[#ffeee3] text-sm mb-2">Pending Invoices</div>
                <div className="text-3xl font-bold text-[#FF6B00]">
                  {invoices.filter(inv => inv.status === 'pending' || inv.status === 'overdue').length}
                </div>
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
                { id: 'invoices', label: 'Invoices' },
                { id: 'tax-summary', label: 'Tax Summary' },
                { id: 'tax-documents', label: 'Tax Documents' },
                { id: 'expense-tracking', label: 'Expense Tracking' }
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

            {/* Invoices Tab */}
            {activeTab === 'invoices' && (
              <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#2E2E2E] mb-4 md:mb-0">Invoice Management</h2>
                  <div className="flex space-x-3">
                    <select
                      value={invoiceFilter}
                      onChange={(e) => setInvoiceFilter(e.target.value)}
                      className="px-4 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                    >
                      <option value="all">All Invoices</option>
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="overdue">Overdue</option>
                    </select>
                    <button className="px-4 py-2 bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg font-medium transition-colors">
                      Export All
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-[#ffeee3] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#ffeee3]/30">
                        <tr>
                          <th className="text-left p-4 font-medium text-[#2E2E2E]">Invoice</th>
                          <th className="text-left p-4 font-medium text-[#2E2E2E]">Freelancer</th>
                          <th className="text-left p-4 font-medium text-[#2E2E2E]">Project</th>
                          <th className="text-left p-4 font-medium text-[#2E2E2E]">Amount</th>
                          <th className="text-left p-4 font-medium text-[#2E2E2E]">Status</th>
                          <th className="text-left p-4 font-medium text-[#2E2E2E]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInvoices.map((invoice) => (
                          <tr key={invoice.id} className="border-t border-[#ffeee3]">
                            <td className="p-4">
                              <div className="font-medium text-[#2E2E2E]">{invoice.id}</div>
                              <div className="text-sm text-[#2E2E2E]/60">
                                Issued: {invoice.date}
                                {invoice.status !== 'paid' && (
                                  <span className="block">Due: {invoice.dueDate}</span>
                                )}
                              </div>
                            </td>
                            <td className="p-4 text-[#2E2E2E]">{invoice.freelancer}</td>
                            <td className="p-4">
                              <div className="font-medium text-[#2E2E2E]">{invoice.project}</div>
                              <div className="text-sm text-[#2E2E2E]/60">{invoice.description}</div>
                            </td>
                            <td className="p-4">
                              <div className="font-medium text-[#2E2E2E]">${invoice.total.toLocaleString()}</div>
                              <div className="text-sm text-[#2E2E2E]/60">
                                ${invoice.amount} + ${invoice.tax} tax
                              </div>
                            </td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded text-xs ${getStatusColor(invoice.status)}`}>
                                {invoice.status}
                              </span>
                              {invoice.paymentDate && (
                                <div className="text-xs text-[#2E2E2E]/60 mt-1">
                                  Paid: {invoice.paymentDate}
                                </div>
                              )}
                            </td>
                            <td className="p-4">
                              <div className="flex space-x-2">
                                <a
                                  href={invoice.downloadUrl}
                                  className="text-[#FF6B00] hover:text-[#FF9F45] font-medium text-sm"
                                  download
                                >
                                  Download
                                </a>
                                {invoice.status !== 'paid' && (
                                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                    Pay Now
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Tax Summary Tab */}
            {activeTab === 'tax-summary' && (
              <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#2E2E2E] mb-4 md:mb-0">Tax Summary</h2>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="px-4 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  >
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Annual Summary */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                    <h3 className="text-lg font-bold text-[#2E2E2E] mb-6">Annual Summary ({selectedYear})</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-[#2E2E2E]/60">Total Payments</span>
                        <span className="font-medium text-[#2E2E2E]">${currentTaxSummary.totalPaid.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2E2E2E]/60">Tax Withheld (10%)</span>
                        <span className="font-medium text-[#2E2E2E]">${currentTaxSummary.totalTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2E2E2E]/60">Active Freelancers</span>
                        <span className="font-medium text-[#2E2E2E]">{currentTaxSummary.totalFreelancers}</span>
                      </div>
                      <div className="flex justify-between pt-4 border-t border-[#ffeee3]">
                        <span className="font-medium text-[#2E2E2E]">Net Business Expense</span>
                        <span className="font-bold text-[#FF6B00]">${(currentTaxSummary.totalPaid + currentTaxSummary.totalTax).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quarterly Breakdown */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                    <h3 className="text-lg font-bold text-[#2E2E2E] mb-6">Quarterly Breakdown</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[#2E2E2E]/60">Q1 {selectedYear}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-[#FF6B00] h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(currentTaxSummary.q1 / currentTaxSummary.totalPaid) * 100}%` }}
                            ></div>
                          </div>
                          <span className="font-medium text-[#2E2E2E] w-20 text-right">${currentTaxSummary.q1.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#2E2E2E]/60">Q2 {selectedYear}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-[#FF6B00] h-2 rounded-full transition-all duration-300"
                              style={{ width: `${currentTaxSummary.totalPaid > 0 ? (currentTaxSummary.q2 / currentTaxSummary.totalPaid) * 100 : 0}%` }}
                            ></div>
                          </div>
                          <span className="font-medium text-[#2E2E2E] w-20 text-right">${currentTaxSummary.q2.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#2E2E2E]/60">Q3 {selectedYear}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-[#FF6B00] h-2 rounded-full transition-all duration-300"
                              style={{ width: `${currentTaxSummary.totalPaid > 0 ? (currentTaxSummary.q3 / currentTaxSummary.totalPaid) * 100 : 0}%` }}
                            ></div>
                          </div>
                          <span className="font-medium text-[#2E2E2E] w-20 text-right">${currentTaxSummary.q3.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#2E2E2E]/60">Q4 {selectedYear}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-[#FF6B00] h-2 rounded-full transition-all duration-300"
                              style={{ width: `${currentTaxSummary.totalPaid > 0 ? (currentTaxSummary.q4 / currentTaxSummary.totalPaid) * 100 : 0}%` }}
                            ></div>
                          </div>
                          <span className="font-medium text-[#2E2E2E] w-20 text-right">${currentTaxSummary.q4.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tax Tips */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                  <h3 className="font-semibold text-blue-900 mb-3">💡 Tax Tips for Clients</h3>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>• Freelancer payments are generally tax-deductible business expenses</li>
                    <li>• Keep detailed records of all project payments and descriptions</li>
                    <li>• 1099-NEC forms are automatically generated for freelancers paid $600+ annually</li>
                    <li>• Consult with a tax professional for specific advice on your situation</li>
                    <li>• Download annual summaries before tax filing deadlines</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tax Documents Tab */}
            {activeTab === 'tax-documents' && (
              <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#2E2E2E] mb-4 md:mb-0">Tax Documents</h2>
                  <button className="px-4 py-2 bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg font-medium transition-colors">
                    Generate All 1099s
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-[#ffeee3]">
                  <div className="p-6 border-b border-[#ffeee3]">
                    <h3 className="font-semibold text-[#2E2E2E]">1099-NEC Forms</h3>
                    <p className="text-sm text-[#2E2E2E]/60 mt-1">
                      Tax forms for freelancers paid $600 or more in a calendar year
                    </p>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#ffeee3]/30">
                        <tr>
                          <th className="text-left p-4 font-medium text-[#2E2E2E]">Form Type</th>
                          <th className="text-left p-4 font-medium text-[#2E2E2E]">Freelancer</th>
                          <th className="text-left p-4 font-medium text-[#2E2E2E]">Tax Year</th>
                          <th className="text-left p-4 font-medium text-[#2E2E2E]">Total Paid</th>
                          <th className="text-left p-4 font-medium text-[#2E2E2E]">Issued Date</th>
                          <th className="text-left p-4 font-medium text-[#2E2E2E]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {taxDocuments.map((doc) => (
                          <tr key={doc.id} className="border-t border-[#ffeee3]">
                            <td className="p-4 font-medium text-[#2E2E2E]">{doc.type}</td>
                            <td className="p-4 text-[#2E2E2E]">{doc.freelancer}</td>
                            <td className="p-4 text-[#2E2E2E]">{doc.year}</td>
                            <td className="p-4 font-medium text-[#2E2E2E]">${doc.totalPaid.toLocaleString()}</td>
                            <td className="p-4 text-[#2E2E2E]">{doc.issued}</td>
                            <td className="p-4">
                              <div className="flex space-x-2">
                                <a
                                  href={doc.downloadUrl}
                                  className="text-[#FF6B00] hover:text-[#FF9F45] font-medium text-sm"
                                  download
                                >
                                  Download
                                </a>
                                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                  Email
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
                  <h3 className="font-semibold text-yellow-900 mb-3">📋 Important Deadlines</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-800">
                    <div>
                      <strong>January 31:</strong> 1099-NEC forms must be sent to freelancers
                    </div>
                    <div>
                      <strong>February 28:</strong> 1099-NEC forms must be filed with IRS (paper)
                    </div>
                    <div>
                      <strong>March 31:</strong> 1099-NEC forms must be filed with IRS (electronic)
                    </div>
                    <div>
                      <strong>April 15:</strong> Business tax return filing deadline
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Expense Tracking Tab */}
            {activeTab === 'expense-tracking' && (
              <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#2E2E2E] mb-4 md:mb-0">Expense Tracking</h2>
                  <button className="px-4 py-2 bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg font-medium transition-colors">
                    Export Expense Report
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Expense Categories */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                    <h3 className="text-lg font-bold text-[#2E2E2E] mb-6">Expense Categories ({selectedYear})</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[#2E2E2E]/60">Freelancer Payments</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-[#FF6B00] h-2 rounded-full transition-all duration-300" style={{ width: '85%' }}></div>
                          </div>
                          <span className="font-medium text-[#2E2E2E] w-20 text-right">${currentTaxSummary.totalPaid.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#2E2E2E]/60">Platform Fees</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: '15%' }}></div>
                          </div>
                          <span className="font-medium text-[#2E2E2E] w-20 text-right">${Math.round(currentTaxSummary.totalPaid * 0.03).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#2E2E2E]/60">Payment Processing</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: '10%' }}></div>
                          </div>
                          <span className="font-medium text-[#2E2E2E] w-20 text-right">${Math.round(currentTaxSummary.totalPaid * 0.029).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-[#ffeee3]">
                      <div className="flex justify-between">
                        <span className="font-medium text-[#2E2E2E]">Total Business Expenses</span>
                        <span className="font-bold text-[#FF6B00]">
                          ${(currentTaxSummary.totalPaid + Math.round(currentTaxSummary.totalPaid * 0.059)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Deduction Opportunities */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                    <h3 className="text-lg font-bold text-[#2E2E2E] mb-6">Potential Deductions</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="font-medium text-green-800 mb-1">✅ Freelancer Payments</div>
                        <div className="text-sm text-green-700">
                          ${currentTaxSummary.totalPaid.toLocaleString()} - Fully deductible as business expense
                        </div>
                      </div>
                      
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="font-medium text-green-800 mb-1">✅ Platform Service Fees</div>
                        <div className="text-sm text-green-700">
                          ${Math.round(currentTaxSummary.totalPaid * 0.03).toLocaleString()} - Business service fees are deductible
                        </div>
                      </div>
                      
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="font-medium text-green-800 mb-1">✅ Payment Processing Fees</div>
                        <div className="text-sm text-green-700">
                          ${Math.round(currentTaxSummary.totalPaid * 0.029).toLocaleString()} - Transaction fees are deductible
                        </div>
                      </div>
                      
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="font-medium text-blue-800 mb-1">💡 Additional Considerations</div>
                        <div className="text-sm text-blue-700">
                          Consider deducting home office, software subscriptions, and professional development costs
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3] mt-8">
                  <h3 className="text-lg font-bold text-[#2E2E2E] mb-6">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="p-4 border border-[#ffeee3] rounded-lg hover:bg-[#ffeee3]/30 transition-colors text-left">
                      <div className="font-medium text-[#2E2E2E] mb-1">📊 Annual Summary Report</div>
                      <div className="text-sm text-[#2E2E2E]/60">Download comprehensive expense report</div>
                    </button>
                    
                    <button className="p-4 border border-[#ffeee3] rounded-lg hover:bg-[#ffeee3]/30 transition-colors text-left">
                      <div className="font-medium text-[#2E2E2E] mb-1">📄 QuickBooks Export</div>
                      <div className="text-sm text-[#2E2E2E]/60">Export data for accounting software</div>
                    </button>
                    
                    <button className="p-4 border border-[#ffeee3] rounded-lg hover:bg-[#ffeee3]/30 transition-colors text-left">
                      <div className="font-medium text-[#2E2E2E] mb-1">🧾 Receipt Management</div>
                      <div className="text-sm text-[#2E2E2E]/60">Upload and organize receipts</div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvoicesTaxCenterPage;
