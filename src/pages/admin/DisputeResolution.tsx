import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { FirestoreService } from '../../lib/firestoreService';

interface Report {
  id: string;
  category: string;
  categoryLabel: string;
  userName: string;
  userEmail: string;
  reportSubject: string;
  reportDescription: string;
  urlLink?: string | null;
  attachments: string[];
  referenceNumber: string;
  status: 'submitted' | 'under_review' | 'resolved' | 'closed';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  assignedTo?: string | null;
  resolution?: string | null;
  submittedAt: any;
  updatedAt: any;
}

const DisputeResolution: React.FC = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedDisputes, setSelectedDisputes] = useState<string[]>([]);
  const [showActions, setShowActions] = useState<string | null>(null);

  const reportCategories = [
    { value: 'user-behavior', label: 'User Behavior' },
    { value: 'fraud', label: 'Fraud or Scam' },
    { value: 'content', label: 'Inappropriate Content' },
    { value: 'intellectual-property', label: 'Intellectual Property' },
    { value: 'platform', label: 'Platform Issue' },
    { value: 'other', label: 'Other Concern' }
  ];

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, searchTerm, statusFilter, typeFilter, priorityFilter]);

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      
      // Fetch reports from Firestore
      const reportsData = await FirestoreService.getMany('reports');
      
      // Transform Firestore data to match our interface
      const transformedReports: Report[] = reportsData.map(report => ({
        ...report,
        submittedAt: report.submittedAt?.toDate ? report.submittedAt.toDate() : new Date(report.submittedAt),
        updatedAt: report.updatedAt?.toDate ? report.updatedAt.toDate() : new Date(report.updatedAt),
      })) as Report[];
      
      setReports(transformedReports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      // Fallback to empty array on error
      setReports([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterReports = () => {
    let filtered = reports;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(report => 
        report.reportSubject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reportDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(report => report.category === typeFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(report => report.priority === priorityFilter);
    }

    setFilteredReports(filtered);
  };

  const handleReportAction = async (reportId: string, action: 'investigate' | 'resolve' | 'escalate' | 'close') => {
    try {
      // Update in Firebase
      const statusMap = {
        'investigate': 'under_review' as const,
        'resolve': 'resolved' as const,
        'escalate': 'under_review' as const,
        'close': 'closed' as const
      };
      
      const priorityMap = {
        'investigate': 'normal' as const,
        'resolve': 'normal' as const,
        'escalate': 'urgent' as const,
        'close': 'normal' as const
      };
      
      await FirestoreService.update('reports', reportId, {
        status: statusMap[action],
        priority: priorityMap[action],
        assignedTo: action === 'investigate' || action === 'escalate' ? 'Admin Team' : null,
        updatedAt: new Date()
      });
      
      // Update local state
      const updatedReports = reports.map(report => {
        if (report.id === reportId) {
          return { 
            ...report, 
            status: statusMap[action], 
            priority: priorityMap[action],
            assignedTo: action === 'investigate' || action === 'escalate' ? 'Admin Team' : null,
            updatedAt: new Date() 
          };
        }
        return report;
      });
      
      setReports(updatedReports);
      setShowActions(null);
    } catch (error) {
      console.error('Error updating report:', error);
      alert('Failed to update report. Please try again.');
    }
  };

  const handleBulkAction = async (action: 'investigate' | 'resolve' | 'escalate' | 'close') => {
    if (selectedDisputes.length === 0) return;
    
    try {
      const statusMap = {
        'investigate': 'under_review' as const,
        'resolve': 'resolved' as const,
        'escalate': 'under_review' as const,
        'close': 'closed' as const
      };
      
      const priorityMap = {
        'investigate': 'normal' as const,
        'resolve': 'normal' as const,
        'escalate': 'urgent' as const,
        'close': 'normal' as const
      };
      
      // Update in Firebase for each selected report
      const updatePromises = selectedDisputes.map(reportId => 
        FirestoreService.update('reports', reportId, {
          status: statusMap[action],
          priority: priorityMap[action],
          assignedTo: action === 'investigate' || action === 'escalate' ? 'Admin Team' : null,
          updatedAt: new Date()
        })
      );
      
      await Promise.all(updatePromises);
      
      // Update local state
      const updatedReports = reports.map(report => {
        if (selectedDisputes.includes(report.id)) {
          return {
            ...report,
            status: statusMap[action],
            priority: priorityMap[action],
            assignedTo: action === 'investigate' || action === 'escalate' ? 'Admin Team' : null,
            updatedAt: new Date()
          };
        }
        return report;
      });
      
      setReports(updatedReports);
      setSelectedDisputes([]);
    } catch (error) {
      console.error('Error performing bulk action:', error);
      alert('Failed to perform bulk action. Please try again.');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      submitted: 'bg-[#ffeee3] text-[#FF6B00]',
      under_review: 'bg-[#ffeee3] text-[#FF6B00]',
      resolved: 'bg-[#ffeee3] text-[#2E2E2E]',
      closed: 'bg-[#ffeee3] text-[#2E2E2E]/70'
    };
    return styles[status as keyof typeof styles] || 'bg-[#ffeee3] text-[#2E2E2E]';
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      low: 'bg-[#ffeee3] text-[#2E2E2E]/70',
      normal: 'bg-[#ffeee3] text-[#FF6B00]',
      high: 'bg-[#ffeee3] text-[#FF6B00] font-semibold',
      urgent: 'bg-[#ffeee3] text-[#2E2E2E] font-bold'
    };
    return styles[priority as keyof typeof styles] || 'bg-[#ffeee3] text-[#2E2E2E]';
  };

  const getTypeBadge = (type: string) => {
    const typeLabels = {
      'user-behavior': 'User Behavior',
      'fraud': 'Fraud',
      'content': 'Content',
      'intellectual-property': 'IP',
      'platform': 'Platform',
      'other': 'Other'
    };
    return typeLabels[type as keyof typeof typeLabels] || type;
  };

  const handleReportClick = (reportId: string) => {
    navigate(`/admin/report-details/${reportId}`);
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
            <h1 className="text-3xl font-bold text-[#2E2E2E]">Report Management</h1>
            <p className="text-[#2E2E2E]/70">Manage and resolve platform reports and user complaints</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#FF6B00] rounded-full"></div>
              <span className="text-sm text-[#2E2E2E]/70">
                {reports.filter(r => r.status === 'submitted').length} Submitted
              </span>
            </div>
            <span className="text-sm text-[#2E2E2E]/50">
              {filteredReports.length} of {reports.length} reports
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
                <p className="text-sm font-medium text-[#2E2E2E]/70">Submitted</p>
                <p className="text-2xl font-semibold text-[#2E2E2E]">
                  {reports.filter(r => r.status === 'submitted').length}
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
                <p className="text-sm font-medium text-[#2E2E2E]/70">Under Review</p>
                <p className="text-2xl font-semibold text-[#2E2E2E]">
                  {reports.filter(r => r.status === 'under_review').length}
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
                  {reports.filter(r => r.status === 'resolved').length}
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
                <p className="text-sm font-medium text-[#2E2E2E]/70">Urgent</p>
                <p className="text-2xl font-semibold text-[#2E2E2E]">
                  {reports.filter(r => r.priority === 'urgent').length}
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
                  placeholder="Search reports..."
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
                    <option value="submitted">Submitted</option>
                    <option value="under_review">Under Review</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="border border-[#ffeee3] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                >
                  <option value="all">All Types</option>
                  {reportCategories.map(type => (
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
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedDisputes.length > 0 && (
              <div className="mt-4 p-4 bg-[#ffeee3] rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#2E2E2E]">
                    {selectedDisputes.length} reports selected
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
                      checked={selectedDisputes.length === filteredReports.length && filteredReports.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDisputes(filteredReports.map(report => report.id));
                        } else {
                          setSelectedDisputes([]);
                        }
                      }}
                      className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#2E2E2E] uppercase tracking-wider w-1/4">
                    Report
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-[#2E2E2E] uppercase tracking-wider w-24">
                    Category
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-[#2E2E2E] uppercase tracking-wider w-24">
                    Priority
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-[#2E2E2E] uppercase tracking-wider w-28">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#2E2E2E] uppercase tracking-wider w-48">
                    Reporter
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-[#2E2E2E] uppercase tracking-wider w-32">
                    Reference
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-[#2E2E2E] uppercase tracking-wider w-28">
                    Submitted
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-[#2E2E2E] uppercase tracking-wider w-20">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#ffeee3]">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-[#ffeee3]/10 transition-colors cursor-pointer" onClick={() => handleReportClick(report.id)}>
                    <td className="px-4 py-5 text-center" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedDisputes.includes(report.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDisputes([...selectedDisputes, report.id]);
                          } else {
                            setSelectedDisputes(selectedDisputes.filter(id => id !== report.id));
                          }
                        }}
                        className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
                      />
                    </td>
                    <td className="px-6 py-5">
                      <div className="">
                        <div className="text-sm font-semibold text-[#2E2E2E] leading-tight hover:text-[#FF6B00] transition-colors">
                          {report.reportSubject}
                        </div>
                        <div className="text-xs text-[#2E2E2E]/60 mt-1 leading-tight line-clamp-2">
                          {report.reportDescription}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-[#ffeee3] text-[#FF6B00] border border-[#FF6B00]/20">
                        {getTypeBadge(report.category)}
                      </span>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getPriorityBadge(report.priority)} ${report.priority === 'urgent' ? 'border-[#2E2E2E]/20' : 'border-[#FF6B00]/20'}`}>
                        {report.priority}
                      </span>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusBadge(report.status)} ${report.status === 'resolved' || report.status === 'closed' ? 'border-[#2E2E2E]/20' : 'border-[#FF6B00]/20'}`}>
                        {report.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-[#2E2E2E]">
                          <div className="w-5 h-5 bg-[#FF6B00]/20 rounded-full flex items-center justify-center mr-2">
                            <User className="w-3 h-3 text-[#FF6B00]" />
                          </div>
                          <span className="font-medium">{report.userName}</span>
                        </div>
                        <div className="text-xs text-[#2E2E2E]/60 mt-1">
                          {report.userEmail}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <div className="text-sm font-semibold text-[#2E2E2E]">
                        {report.referenceNumber}
                      </div>
                      {report.attachments && report.attachments.length > 0 && (
                        <div className="text-xs text-[#2E2E2E]/50 mt-1">
                          {report.attachments.length} files
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-5 text-center">
                      <div className="text-sm text-[#2E2E2E] font-medium">
                        {report.submittedAt.toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-5 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="relative">
                        <button
                          onClick={() => setShowActions(showActions === report.id ? null : report.id)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#ffeee3] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                        
                        {showActions === report.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-[#ffeee3] overflow-hidden">
                            <div className="py-1">
                              <button
                                onClick={() => handleReportAction(report.id, 'investigate')}
                                className="flex items-center w-full px-4 py-3 text-sm text-[#2E2E2E] hover:bg-[#ffeee3]/50 transition-colors"
                              >
                                <Eye className="w-4 h-4 mr-3 text-[#FF6B00]" />
                                Review
                              </button>
                              <button
                                onClick={() => handleReportAction(report.id, 'resolve')}
                                className="flex items-center w-full px-4 py-3 text-sm text-[#2E2E2E] hover:bg-[#ffeee3]/50 transition-colors"
                              >
                                <CheckCircle className="w-4 h-4 mr-3 text-[#FF6B00]" />
                                Resolve
                              </button>
                              <button
                                onClick={() => handleReportAction(report.id, 'escalate')}
                                className="flex items-center w-full px-4 py-3 text-sm text-[#2E2E2E] hover:bg-[#ffeee3]/50 transition-colors"
                              >
                                <AlertTriangle className="w-4 h-4 mr-3 text-[#FF6B00]" />
                                Escalate
                              </button>
                              <button
                                onClick={() => handleReportAction(report.id, 'close')}
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

          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="mx-auto h-12 w-12 text-[#2E2E2E]/30" />
              <h3 className="mt-2 text-sm font-medium text-[#2E2E2E]">No reports found</h3>
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