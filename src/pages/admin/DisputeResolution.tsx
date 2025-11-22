import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Eye, 
  CheckCircle, 
  XCircle,
  Search,
  Filter,
  MoreHorizontal,
  User
} from 'lucide-react';

interface Dispute {
  id: string;
  title: string;
  description: string;
  disputeType: 'payment' | 'quality' | 'deadline' | 'communication' | 'breach' | 'other';
  status: 'open' | 'investigating' | 'resolved' | 'escalated' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  clientName: string;
  freelancerName: string;
  projectTitle: string;
  disputeAmount: number;
  createdAt: any;
  lastUpdated: any;
  assignedTo?: string;
  resolution?: string;
  evidence: string[];
}

const DisputeResolution: React.FC = () => {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [filteredDisputes, setFilteredDisputes] = useState<Dispute[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedDisputes, setSelectedDisputes] = useState<string[]>([]);
  const [showActions, setShowActions] = useState<string | null>(null);

  const disputeTypes = [
    { value: 'payment', label: 'Payment Issue' },
    { value: 'quality', label: 'Work Quality' },
    { value: 'deadline', label: 'Deadline Dispute' },
    { value: 'communication', label: 'Communication' },
    { value: 'breach', label: 'Contract Breach' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    fetchDisputes();
  }, []);

  useEffect(() => {
    filterDisputes();
  }, [disputes, searchTerm, statusFilter, typeFilter, priorityFilter]);

  const fetchDisputes = async () => {
    try {
      setIsLoading(true);
      
      // Mock data since we don't have a disputes collection yet
      const mockDisputes: Dispute[] = [
        {
          id: '1',
          title: 'Payment Not Released',
          description: 'Client completed project but payment has not been released from escrow after 7 days.',
          disputeType: 'payment',
          status: 'open',
          priority: 'high',
          clientName: 'TechCorp Inc.',
          freelancerName: 'Sarah Johnson',
          projectTitle: 'E-commerce Website Development',
          disputeAmount: 2500,
          createdAt: new Date('2025-11-20'),
          lastUpdated: new Date('2025-11-22'),
          evidence: ['contract.pdf', 'completion_proof.png']
        },
        {
          id: '2',
          title: 'Work Quality Dispute',
          description: 'Client claims the delivered work does not meet the agreed specifications.',
          disputeType: 'quality',
          status: 'investigating',
          priority: 'medium',
          clientName: 'StartupXYZ',
          freelancerName: 'Mike Chen',
          projectTitle: 'Mobile App UI Design',
          disputeAmount: 1200,
          createdAt: new Date('2025-11-18'),
          lastUpdated: new Date('2025-11-21'),
          assignedTo: 'Admin Team',
          evidence: ['original_requirements.pdf', 'delivered_work.zip']
        },
        {
          id: '3',
          title: 'Deadline Extension Dispute',
          description: 'Freelancer requesting deadline extension due to scope creep, client disagrees.',
          disputeType: 'deadline',
          status: 'escalated',
          priority: 'medium',
          clientName: 'Digital Solutions Ltd',
          freelancerName: 'Emily Davis',
          projectTitle: 'Data Analytics Dashboard',
          disputeAmount: 3000,
          createdAt: new Date('2025-11-15'),
          lastUpdated: new Date('2025-11-20'),
          assignedTo: 'Senior Mediator',
          evidence: ['scope_changes.pdf', 'timeline_communication.png']
        },
        {
          id: '4',
          title: 'Communication Breakdown',
          description: 'Both parties claim lack of communication from the other side.',
          disputeType: 'communication',
          status: 'resolved',
          priority: 'low',
          clientName: 'Creative Agency',
          freelancerName: 'David Wilson',
          projectTitle: 'Brand Identity Design',
          disputeAmount: 800,
          createdAt: new Date('2025-11-10'),
          lastUpdated: new Date('2025-11-18'),
          resolution: 'Mediation successful. Both parties agreed to improve communication protocols.',
          evidence: ['chat_logs.pdf']
        },
        {
          id: '5',
          title: 'Contract Breach Allegation',
          description: 'Client alleges freelancer violated exclusivity clause by working on similar project.',
          disputeType: 'breach',
          status: 'open',
          priority: 'critical',
          clientName: 'Innovation Corp',
          freelancerName: 'Lisa Garcia',
          projectTitle: 'SaaS Platform Development',
          disputeAmount: 5000,
          createdAt: new Date('2025-11-22'),
          lastUpdated: new Date('2025-11-22'),
          evidence: ['contract_agreement.pdf', 'evidence_screenshots.zip']
        }
      ];
      
      setDisputes(mockDisputes);
    } catch (error) {
      console.error('Error fetching disputes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterDisputes = () => {
    let filtered = disputes;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(dispute => 
        dispute.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dispute.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dispute.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dispute.freelancerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dispute.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(dispute => dispute.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(dispute => dispute.disputeType === typeFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(dispute => dispute.priority === priorityFilter);
    }

    setFilteredDisputes(filtered);
  };

  const handleDisputeAction = async (disputeId: string, action: 'investigate' | 'resolve' | 'escalate' | 'close') => {
    try {
      const updatedDisputes = disputes.map(dispute => {
        if (dispute.id === disputeId) {
          switch (action) {
            case 'investigate':
              return { ...dispute, status: 'investigating' as const, assignedTo: 'Admin Team', lastUpdated: new Date() };
            case 'resolve':
              return { ...dispute, status: 'resolved' as const, lastUpdated: new Date() };
            case 'escalate':
              return { ...dispute, status: 'escalated' as const, priority: 'high' as const, lastUpdated: new Date() };
            case 'close':
              return { ...dispute, status: 'closed' as const, lastUpdated: new Date() };
            default:
              return dispute;
          }
        }
        return dispute;
      });
      
      setDisputes(updatedDisputes);
      setShowActions(null);
    } catch (error) {
      console.error('Error updating dispute:', error);
      alert('Failed to update dispute. Please try again.');
    }
  };

  const handleBulkAction = async (action: 'investigate' | 'resolve' | 'escalate' | 'close') => {
    if (selectedDisputes.length === 0) return;
    
    try {
      const updatedDisputes = disputes.map(dispute => {
        if (selectedDisputes.includes(dispute.id)) {
          switch (action) {
            case 'investigate':
              return { ...dispute, status: 'investigating' as const, assignedTo: 'Admin Team', lastUpdated: new Date() };
            case 'resolve':
              return { ...dispute, status: 'resolved' as const, lastUpdated: new Date() };
            case 'escalate':
              return { ...dispute, status: 'escalated' as const, priority: 'high' as const, lastUpdated: new Date() };
            case 'close':
              return { ...dispute, status: 'closed' as const, lastUpdated: new Date() };
            default:
              return dispute;
          }
        }
        return dispute;
      });
      
      setDisputes(updatedDisputes);
      setSelectedDisputes([]);
    } catch (error) {
      console.error('Error performing bulk action:', error);
      alert('Failed to perform bulk action. Please try again.');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      open: 'bg-[#ffeee3] text-[#FF6B00]',
      investigating: 'bg-[#ffeee3] text-[#FF6B00]',
      resolved: 'bg-[#ffeee3] text-[#2E2E2E]',
      escalated: 'bg-[#ffeee3] text-[#2E2E2E] font-semibold',
      closed: 'bg-[#ffeee3] text-[#2E2E2E]/70'
    };
    return styles[status as keyof typeof styles] || 'bg-[#ffeee3] text-[#2E2E2E]';
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      low: 'bg-[#ffeee3] text-[#2E2E2E]/70',
      medium: 'bg-[#ffeee3] text-[#FF6B00]',
      high: 'bg-[#ffeee3] text-[#FF6B00] font-semibold',
      critical: 'bg-[#ffeee3] text-[#2E2E2E] font-bold'
    };
    return styles[priority as keyof typeof styles] || 'bg-[#ffeee3] text-[#2E2E2E]';
  };

  const getTypeBadge = (type: string) => {
    const typeLabels = {
      payment: 'Payment',
      quality: 'Quality',
      deadline: 'Deadline',
      communication: 'Communication',
      breach: 'Breach',
      other: 'Other'
    };
    return typeLabels[type as keyof typeof typeLabels] || type;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffeee3] pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
            <span className="ml-3 text-[#2E2E2E]">Loading disputes...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffeee3] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2E2E2E]">Dispute Resolution</h1>
            <p className="text-[#2E2E2E]/70">Manage and resolve platform disputes and complaints</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#FF6B00] rounded-full"></div>
              <span className="text-sm text-[#2E2E2E]/70">
                {disputes.filter(d => d.status === 'open').length} Open
              </span>
            </div>
            <span className="text-sm text-[#2E2E2E]/50">
              {filteredDisputes.length} of {disputes.length} disputes
            </span>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-[#ffeee3] p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-8 w-8 text-[#FF6B00]" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-[#2E2E2E]/70">Open Disputes</p>
                <p className="text-2xl font-semibold text-[#2E2E2E]">
                  {disputes.filter(d => d.status === 'open').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-[#ffeee3] p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Eye className="h-8 w-8 text-[#FF6B00]" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-[#2E2E2E]/70">Investigating</p>
                <p className="text-2xl font-semibold text-[#2E2E2E]">
                  {disputes.filter(d => d.status === 'investigating').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-[#ffeee3] p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-[#FF6B00]" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-[#2E2E2E]/70">Resolved</p>
                <p className="text-2xl font-semibold text-[#2E2E2E]">
                  {disputes.filter(d => d.status === 'resolved').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-[#ffeee3] p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <XCircle className="h-8 w-8 text-[#FF6B00]" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-[#2E2E2E]/70">Critical</p>
                <p className="text-2xl font-semibold text-[#2E2E2E]">
                  {disputes.filter(d => d.priority === 'critical').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-[#ffeee3] mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FF6B00] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search disputes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                />
              </div>

              {/* Filters */}
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-[#FF6B00]" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-[#ffeee3] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  >
                    <option value="all">All Status</option>
                    <option value="open">Open</option>
                    <option value="investigating">Investigating</option>
                    <option value="resolved">Resolved</option>
                    <option value="escalated">Escalated</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="border border-[#ffeee3] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                >
                  <option value="all">All Types</option>
                  {disputeTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="border border-[#ffeee3] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                >
                  <option value="all">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedDisputes.length > 0 && (
              <div className="mt-4 p-4 bg-[#ffeee3] rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#2E2E2E]">
                    {selectedDisputes.length} disputes selected
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleBulkAction('investigate')}
                      className="px-3 py-1 bg-[#FF6B00] text-white text-sm rounded hover:bg-[#FF6B00]/90"
                    >
                      Investigate
                    </button>
                    <button
                      onClick={() => handleBulkAction('resolve')}
                      className="px-3 py-1 bg-[#FF6B00] text-white text-sm rounded hover:bg-[#FF6B00]/90"
                    >
                      Resolve
                    </button>
                    <button
                      onClick={() => handleBulkAction('escalate')}
                      className="px-3 py-1 bg-[#2E2E2E] text-white text-sm rounded hover:bg-[#2E2E2E]/90"
                    >
                      Escalate
                    </button>
                    <button
                      onClick={() => handleBulkAction('close')}
                      className="px-3 py-1 bg-[#2E2E2E] text-white text-sm rounded hover:bg-[#2E2E2E]/90"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Disputes List */}
        <div className="bg-white rounded-lg shadow-sm border border-[#ffeee3] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#ffeee3]">
              <thead className="bg-[#ffeee3]/50">
                <tr>
                  <th className="w-12 px-4 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedDisputes.length === filteredDisputes.length && filteredDisputes.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDisputes(filteredDisputes.map(dispute => dispute.id));
                        } else {
                          setSelectedDisputes([]);
                        }
                      }}
                      className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#2E2E2E] uppercase tracking-wider w-1/4">
                    Dispute
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-[#2E2E2E] uppercase tracking-wider w-24">
                    Type
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-[#2E2E2E] uppercase tracking-wider w-24">
                    Priority
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-[#2E2E2E] uppercase tracking-wider w-28">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#2E2E2E] uppercase tracking-wider w-48">
                    Parties
                  </th>
                  <th className="px-4 py-4 text-right text-xs font-semibold text-[#2E2E2E] uppercase tracking-wider w-32">
                    Amount
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-[#2E2E2E] uppercase tracking-wider w-28">
                    Created
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-[#2E2E2E] uppercase tracking-wider w-20">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#ffeee3]">
                {filteredDisputes.map((dispute) => (
                  <tr key={dispute.id} className="hover:bg-[#ffeee3]/10 transition-colors">
                    <td className="px-4 py-5 text-center">
                      <input
                        type="checkbox"
                        checked={selectedDisputes.includes(dispute.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDisputes([...selectedDisputes, dispute.id]);
                          } else {
                            setSelectedDisputes(selectedDisputes.filter(id => id !== dispute.id));
                          }
                        }}
                        className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
                      />
                    </td>
                    <td className="px-6 py-5">
                      <div className="">
                        <div className="text-sm font-semibold text-[#2E2E2E] leading-tight">
                          {dispute.title}
                        </div>
                        <div className="text-xs text-[#2E2E2E]/60 mt-1 leading-tight">
                          {dispute.projectTitle}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-[#ffeee3] text-[#FF6B00] border border-[#FF6B00]/20">
                        {getTypeBadge(dispute.disputeType)}
                      </span>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getPriorityBadge(dispute.priority)} ${dispute.priority === 'critical' ? 'border-[#2E2E2E]/20' : 'border-[#FF6B00]/20'}`}>
                        {dispute.priority}
                      </span>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusBadge(dispute.status)} ${dispute.status === 'resolved' || dispute.status === 'closed' ? 'border-[#2E2E2E]/20' : 'border-[#FF6B00]/20'}`}>
                        {dispute.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-[#2E2E2E]">
                          <div className="w-5 h-5 bg-[#FF6B00]/20 rounded-full flex items-center justify-center mr-2">
                            <User className="w-3 h-3 text-[#FF6B00]" />
                          </div>
                          <span className="font-medium">{dispute.clientName}</span>
                        </div>
                        <div className="flex items-center text-sm text-[#2E2E2E]">
                          <div className="w-5 h-5 bg-[#FF6B00]/20 rounded-full flex items-center justify-center mr-2">
                            <User className="w-3 h-3 text-[#FF6B00]" />
                          </div>
                          <span className="font-medium">{dispute.freelancerName}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-right">
                      <div className="text-sm font-semibold text-[#2E2E2E]">
                        ${dispute.disputeAmount.toLocaleString()}
                      </div>
                      <div className="text-xs text-[#2E2E2E]/50 mt-1">
                        USD
                      </div>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <div className="text-sm text-[#2E2E2E] font-medium">
                        {dispute.createdAt.toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <div className="relative">
                        <button
                          onClick={() => setShowActions(showActions === dispute.id ? null : dispute.id)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#ffeee3] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                        
                        {showActions === dispute.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-[#ffeee3] overflow-hidden">
                            <div className="py-1">
                              <button
                                onClick={() => handleDisputeAction(dispute.id, 'investigate')}
                                className="flex items-center w-full px-4 py-3 text-sm text-[#2E2E2E] hover:bg-[#ffeee3]/50 transition-colors"
                              >
                                <Eye className="w-4 h-4 mr-3 text-[#FF6B00]" />
                                Investigate
                              </button>
                              <button
                                onClick={() => handleDisputeAction(dispute.id, 'resolve')}
                                className="flex items-center w-full px-4 py-3 text-sm text-[#2E2E2E] hover:bg-[#ffeee3]/50 transition-colors"
                              >
                                <CheckCircle className="w-4 h-4 mr-3 text-[#FF6B00]" />
                                Resolve
                              </button>
                              <button
                                onClick={() => handleDisputeAction(dispute.id, 'escalate')}
                                className="flex items-center w-full px-4 py-3 text-sm text-[#2E2E2E] hover:bg-[#ffeee3]/50 transition-colors"
                              >
                                <AlertTriangle className="w-4 h-4 mr-3 text-[#FF6B00]" />
                                Escalate
                              </button>
                              <button
                                onClick={() => handleDisputeAction(dispute.id, 'close')}
                                className="flex items-center w-full px-4 py-3 text-sm text-[#2E2E2E] hover:bg-[#ffeee3]/50 transition-colors border-t border-[#ffeee3]"
                              >
                                <XCircle className="w-4 h-4 mr-3 text-[#FF6B00]" />
                                Close
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredDisputes.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="mx-auto h-12 w-12 text-[#2E2E2E]/30" />
              <h3 className="mt-2 text-sm font-medium text-[#2E2E2E]">No disputes found</h3>
              <p className="mt-1 text-sm text-[#2E2E2E]/50">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisputeResolution;