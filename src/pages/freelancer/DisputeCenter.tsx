import React, { useState } from 'react';

const DisputeCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');

  const disputes = [
    {
      id: 1,
      title: 'E-commerce Website Payment Issue',
      client: 'TechStart Inc.',
      amount: 2500.00,
      status: 'under-review',
      createdDate: '2024-01-10',
      lastUpdate: '2024-01-14',
      description: 'Client is disputing the final payment for completed e-commerce website project.',
      category: 'payment',
      priority: 'high',
      evidence: 3,
      messages: 7
    },
    {
      id: 2,
      title: 'Project Scope Disagreement',
      client: 'Creative Agency',
      amount: 1200.00,
      status: 'mediation',
      createdDate: '2024-01-05',
      lastUpdate: '2024-01-12',
      description: 'Disagreement about additional features that were outside original scope.',
      category: 'scope',
      priority: 'medium',
      evidence: 5,
      messages: 12
    }
  ];

  const resolvedDisputes = [
    {
      id: 3,
      title: 'Mobile App Delivery Timeline',
      client: 'StartupCo',
      amount: 3000.00,
      status: 'resolved-favor',
      createdDate: '2023-12-15',
      resolvedDate: '2024-01-02',
      description: 'Client claimed project was delivered late, but evidence showed early delivery.',
      category: 'delivery',
      resolution: 'Freelancer favored - Full payment released',
      evidence: 4,
      messages: 15
    },
    {
      id: 4,
      title: 'Design Revision Dispute',
      client: 'BigCorp Ltd.',
      amount: 800.00,
      status: 'resolved-partial',
      createdDate: '2023-12-20',
      resolvedDate: '2024-01-08',
      description: 'Client wanted unlimited revisions, but contract specified 3 revisions.',
      category: 'revisions',
      resolution: 'Partial resolution - 75% payment released',
      evidence: 6,
      messages: 18
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'under-review':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'mediation':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'resolved-favor':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'resolved-partial':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'resolved-against':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'under-review':
        return 'Under Review';
      case 'mediation':
        return 'In Mediation';
      case 'resolved-favor':
        return 'Resolved in Your Favor';
      case 'resolved-partial':
        return 'Partially Resolved';
      case 'resolved-against':
        return 'Resolved Against';
      default:
        return status;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'payment':
        return '💰';
      case 'scope':
        return '📋';
      case 'delivery':
        return '📅';
      case 'revisions':
        return '🔄';
      case 'quality':
        return '⭐';
      default:
        return '📄';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2E2E2E] mb-2">Dispute Center</h1>
          <p className="text-gray-600">Manage and resolve project disputes with clients</p>
        </div>

        {/* Help Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <span className="text-2xl">ℹ️</span>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Dispute Resolution Process</h3>
              <p className="text-blue-700 mb-4">
                Our dispute resolution process ensures fair outcomes for both freelancers and clients. 
                We review all evidence, facilitate communication, and provide mediation when needed.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
                  <span>Submit dispute with evidence</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                  <span>Initial review (1-3 business days)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">3</span>
                  <span>Mediation if needed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">4</span>
                  <span>Final resolution</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'active', name: 'Active Disputes', count: disputes.length },
                { id: 'resolved', name: 'Resolved Disputes', count: resolvedDisputes.length },
                { id: 'guidelines', name: 'Guidelines & FAQ', count: null }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-[#FF6B00] text-[#FF6B00]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                  {tab.count !== null && (
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      activeTab === tab.id 
                        ? 'bg-[#FF6B00] text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Active Disputes Tab */}
            {activeTab === 'active' && (
              <div>
                {disputes.length === 0 ? (
                  <div className="text-center py-12">
                    <span className="text-6xl mb-4 block">🤝</span>
                    <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">No Active Disputes</h3>
                    <p className="text-gray-600">You currently have no active disputes. Keep up the great work!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {disputes.map((dispute) => (
                      <div key={dispute.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <span className="text-2xl">{getCategoryIcon(dispute.category)}</span>
                            <div>
                              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-1">{dispute.title}</h3>
                              <p className="text-gray-600 mb-2">with {dispute.client}</p>
                              <p className="text-sm text-gray-500">{dispute.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-[#2E2E2E] mb-2">
                              ${dispute.amount.toLocaleString()}
                            </div>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(dispute.status)}`}>
                              {getStatusText(dispute.status)}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Created</p>
                            <p className="text-sm font-medium">{new Date(dispute.createdDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Last Update</p>
                            <p className="text-sm font-medium">{new Date(dispute.lastUpdate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Evidence</p>
                            <p className="text-sm font-medium">{dispute.evidence} files</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Messages</p>
                            <p className="text-sm font-medium">{dispute.messages} messages</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Priority:</span>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(dispute.priority)}`}>
                              {dispute.priority.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button className="text-[#FF6B00] hover:underline text-sm font-medium">
                              View Details
                            </button>
                            <button className="text-[#FF6B00] hover:underline text-sm font-medium">
                              Add Evidence
                            </button>
                            <button className="bg-[#FF6B00] text-white px-4 py-2 rounded-lg hover:bg-[#FF9F45] transition-colors text-sm">
                              Send Message
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Resolved Disputes Tab */}
            {activeTab === 'resolved' && (
              <div>
                <div className="space-y-6">
                  {resolvedDisputes.map((dispute) => (
                    <div key={dispute.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <span className="text-2xl">{getCategoryIcon(dispute.category)}</span>
                          <div>
                            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-1">{dispute.title}</h3>
                            <p className="text-gray-600 mb-2">with {dispute.client}</p>
                            <p className="text-sm text-gray-500 mb-2">{dispute.description}</p>
                            <p className="text-sm font-medium text-green-600">{dispute.resolution}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-[#2E2E2E] mb-2">
                            ${dispute.amount.toLocaleString()}
                          </div>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(dispute.status)}`}>
                            {getStatusText(dispute.status)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Created</p>
                          <p className="text-sm font-medium">{new Date(dispute.createdDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Resolved</p>
                          <p className="text-sm font-medium">{new Date(dispute.resolvedDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Evidence</p>
                          <p className="text-sm font-medium">{dispute.evidence} files</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Messages</p>
                          <p className="text-sm font-medium">{dispute.messages} messages</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          Resolution time: {Math.ceil((new Date(dispute.resolvedDate).getTime() - new Date(dispute.createdDate).getTime()) / (1000 * 60 * 60 * 24))} days
                        </div>
                        <button className="text-[#FF6B00] hover:underline text-sm font-medium">
                          View Full History
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Guidelines Tab */}
            {activeTab === 'guidelines' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Dispute Resolution Guidelines</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-semibold text-[#2E2E2E] mb-2">When to File a Dispute</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Payment issues or delays beyond agreed terms</li>
                        <li>• Scope creep without additional compensation</li>
                        <li>• Unfair project cancellation</li>
                        <li>• Disagreements about deliverables or quality</li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-semibold text-[#2E2E2E] mb-2">Required Evidence</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Original project contract or agreement</li>
                        <li>• All communication with the client</li>
                        <li>• Delivered work files and timestamps</li>
                        <li>• Screenshots of project requirements</li>
                        <li>• Payment receipts and transaction history</li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-semibold text-[#2E2E2E] mb-2">Best Practices</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Document all project communications</li>
                        <li>• Set clear milestones and deliverables</li>
                        <li>• Use the platform's messaging system</li>
                        <li>• Request clarification for ambiguous requirements</li>
                        <li>• Keep backups of all work files</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-semibold text-[#2E2E2E] mb-2">How long does the dispute process take?</h4>
                      <p className="text-sm text-gray-600">
                        Most disputes are resolved within 5-7 business days. Complex cases requiring mediation may take longer.
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-semibold text-[#2E2E2E] mb-2">Can I appeal a dispute decision?</h4>
                      <p className="text-sm text-gray-600">
                        Yes, you can appeal within 14 days of the decision with additional evidence.
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-semibold text-[#2E2E2E] mb-2">What happens to my funds during a dispute?</h4>
                      <p className="text-sm text-gray-600">
                        Disputed funds are held in escrow until resolution. Partial payments may be released based on completed work.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-2xl">📞</span>
              <div className="text-left">
                <div className="font-medium text-[#2E2E2E]">Contact Support</div>
                <div className="text-sm text-gray-500">Get help from our team</div>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-2xl">📚</span>
              <div className="text-left">
                <div className="font-medium text-[#2E2E2E]">Help Center</div>
                <div className="text-sm text-gray-500">Browse articles and guides</div>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-2xl">💬</span>
              <div className="text-left">
                <div className="font-medium text-[#2E2E2E]">Community Forum</div>
                <div className="text-sm text-gray-500">Connect with other freelancers</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeCenter;
