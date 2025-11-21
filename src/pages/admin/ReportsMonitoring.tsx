import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Flag,
  Trash2,
  MoreVertical,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';

interface Report {
  id: string;
  type: 'user' | 'project' | 'message' | 'payment' | 'other';
  title: string;
  description: string;
  reportedBy: string;
  reporterEmail: string;
  reportedItem: string;
  reportedItemId: string;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: any;
  resolvedAt?: any;
  adminNotes?: string;
  evidence?: string[];
  category: string;
}

const ReportsMonitoring: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [showActions, setShowActions] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  const reportTypes = [
    { value: 'user', label: 'User Report' },
    { value: 'project', label: 'Project Report' },
    { value: 'message', label: 'Message Report' },
    { value: 'payment', label: 'Payment Issue' },
    { value: 'other', label: 'Other' }
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
      
      // Generate mock data since we don't have a reports collection yet
      const mockReports: Report[] = [
        {
          id: '1',
          type: 'user',
          title: 'Suspicious User Activity',
          description: 'User has been posting multiple fake projects and requesting upfront payments',
          reportedBy: 'John Doe',
          reporterEmail: 'john@example.com',
          reportedItem: 'User: jane_fake_123',
          reportedItemId: 'user_123',
          status: 'pending',
          priority: 'high',
          createdAt: { toDate: () => new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
          category: 'Fraud',
          evidence: ['screenshot1.jpg', 'chat_log.txt']
        },
        {
          id: '2',
          type: 'project',
          title: 'Inappropriate Project Content',
          description: 'Project contains adult content not suitable for the platform',
          reportedBy: 'Sarah Wilson',
          reporterEmail: 'sarah@example.com',
          reportedItem: 'Project: Adult Website Design',
          reportedItemId: 'project_456',
          status: 'investigating',
          priority: 'medium',
          createdAt: { toDate: () => new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
          category: 'Inappropriate Content'
        },
        {
          id: '3',
          type: 'payment',
          title: 'Payment Not Released',
          description: 'Client completed project but payment has not been released for over a week',
          reportedBy: 'Mike Johnson',
          reporterEmail: 'mike@example.com',
          reportedItem: 'Contract: #CON-789',
          reportedItemId: 'contract_789',
          status: 'resolved',
          priority: 'high',
          createdAt: { toDate: () => new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) },
          resolvedAt: { toDate: () => new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
          category: 'Payment Dispute',
          adminNotes: 'Payment was held due to client dispute. Resolved after mediation.'
        },
        {
          id: '4',
          type: 'message',
          title: 'Harassment in Messages',
          description: 'Receiving threatening and inappropriate messages from another user',
          reportedBy: 'Lisa Chen',
          reporterEmail: 'lisa@example.com',
          reportedItem: 'User: aggressive_client_99',
          reportedItemId: 'user_999',
          status: 'pending',
          priority: 'critical',
          createdAt: { toDate: () => new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
          category: 'Harassment'
        },
        {
          id: '5',
          type: 'other',
          title: 'Copyright Infringement',
          description: 'User is using copyrighted images in their portfolio without permission',
          reportedBy: 'David Park',
          reporterEmail: 'david@example.com',
          reportedItem: 'Portfolio: Creative Designer 2024',
          reportedItemId: 'portfolio_111',
          status: 'dismissed',
          priority: 'low',
          createdAt: { toDate: () => new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
          resolvedAt: { toDate: () => new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
          category: 'Copyright Violation',
          adminNotes: 'User provided proper licensing documentation.'
        }
      ];
      
      setReports(mockReports);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterReports = () => {
    let filtered = reports;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(report => 
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reportedItem.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(report => report.type === typeFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(report => report.priority === priorityFilter);
    }

    setFilteredReports(filtered);
  };

  const handleReportAction = async (reportId: string, action: 'investigate' | 'resolve' | 'dismiss' | 'escalate' | 'delete') => {
    try {
      // In a real app, you would update the Firebase document
      const updatedReports = reports.map(report => {
        if (report.id === reportId) {
          const updatedReport = { ...report };
          switch (action) {
            case 'investigate':
              updatedReport.status = 'investigating';
              break;
            case 'resolve':
              updatedReport.status = 'resolved';
              updatedReport.resolvedAt = { toDate: () => new Date() };
              break;
            case 'dismiss':
              updatedReport.status = 'dismissed';
              updatedReport.resolvedAt = { toDate: () => new Date() };
              break;
            case 'escalate':
              updatedReport.priority = 'critical';
              break;
            case 'delete':
              return null; // Will be filtered out
          }
          return updatedReport;
        }
        return report;
      }).filter(Boolean) as Report[];
      
      setReports(updatedReports);
      setShowActions(null);
    } catch (error) {
      console.error('Error updating report:', error);
      alert('Failed to update report. Please try again.');
    }
  };

  const handleBulkAction = async (action: 'investigate' | 'resolve' | 'dismiss' | 'delete') => {
    if (selectedReports.length === 0) return;
    
    if (action === 'delete' && !window.confirm(`Are you sure you want to delete ${selectedReports.length} reports?`)) {
      return;
    }

    try {
      const updatedReports = reports.map(report => {
        if (selectedReports.includes(report.id)) {
          if (action === 'delete') return null;
          
          const updatedReport = { ...report };
          switch (action) {
            case 'investigate':
              updatedReport.status = 'investigating';
              break;
            case 'resolve':
              updatedReport.status = 'resolved';
              updatedReport.resolvedAt = { toDate: () => new Date() };
              break;
            case 'dismiss':
              updatedReport.status = 'dismissed';
              updatedReport.resolvedAt = { toDate: () => new Date() };
              break;
          }
          return updatedReport;
        }
        return report;
      }).filter(Boolean) as Report[];
      
      setReports(updatedReports);
      setSelectedReports([]);
    } catch (error) {
      console.error('Error performing bulk action:', error);
      alert('Failed to perform bulk action. Please try again.');
    }
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    return styles[priority as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      investigating: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
      dismissed: 'bg-gray-100 text-gray-800'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const saveAdminNotes = () => {
    if (selectedReport) {
      const updatedReports = reports.map(report => 
        report.id === selectedReport.id 
          ? { ...report, adminNotes: adminNotes }
          : report
      );
      setReports(updatedReports);
      setSelectedReport({ ...selectedReport, adminNotes });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading reports...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Monitoring</h1>
            <p className="text-gray-600">Monitor and resolve platform reports and issues</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                {reports.filter(r => r.priority === 'critical' && r.status === 'pending').length} Critical
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {filteredReports.length} of {reports.length} reports
            </span>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {reports.filter(r => r.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Investigating</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {reports.filter(r => r.status === 'investigating').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {reports.filter(r => r.status === 'resolved').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Flag className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Critical</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {reports.filter(r => r.priority === 'critical').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filters */}
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="investigating">Investigating</option>
                    <option value="resolved">Resolved</option>
                    <option value="dismissed">Dismissed</option>
                  </select>
                </div>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  {reportTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            {selectedReports.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-800">
                    {selectedReports.length} reports selected
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleBulkAction('investigate')}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      Investigate
                    </button>
                    <button
                      onClick={() => handleBulkAction('resolve')}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      Resolve
                    </button>
                    <button
                      onClick={() => handleBulkAction('dismiss')}
                      className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                    >
                      Dismiss
                    </button>
                    <button
                      onClick={() => handleBulkAction('delete')}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedReports.length === filteredReports.length && filteredReports.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedReports(filteredReports.map(report => report.id));
                        } else {
                          setSelectedReports([]);
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reported By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedReports.includes(report.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedReports([...selectedReports, report.id]);
                          } else {
                            setSelectedReports(selectedReports.filter(id => id !== report.id));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          {report.title}
                        </div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {report.description}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {report.reportedItem}
                        </div>
                        <div className="text-xs text-blue-600 mt-1">
                          {report.category}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {reportTypes.find(t => t.value === report.type)?.label || report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(report.priority)}`}>
                        {report.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>{report.reportedBy}</div>
                      <div className="text-xs text-gray-500">{report.reporterEmail}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {report.createdAt ? report.createdAt.toDate().toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 relative">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedReport(report);
                            setAdminNotes(report.adminNotes || '');
                            setShowDetails(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowActions(showActions === report.id ? null : report.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                      
                      {showActions === report.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                          <div className="py-1">
                            {report.status === 'pending' && (
                              <button
                                onClick={() => handleReportAction(report.id, 'investigate')}
                                className="flex items-center px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 w-full text-left"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Investigate
                              </button>
                            )}
                            
                            {(report.status === 'pending' || report.status === 'investigating') && (
                              <>
                                <button
                                  onClick={() => handleReportAction(report.id, 'resolve')}
                                  className="flex items-center px-4 py-2 text-sm text-green-700 hover:bg-green-50 w-full text-left"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Resolve
                                </button>
                                <button
                                  onClick={() => handleReportAction(report.id, 'dismiss')}
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Dismiss
                                </button>
                              </>
                            )}
                            
                            {report.priority !== 'critical' && (
                              <button
                                onClick={() => handleReportAction(report.id, 'escalate')}
                                className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full text-left"
                              >
                                <Flag className="w-4 h-4 mr-2" />
                                Escalate
                              </button>
                            )}
                            
                            <button
                              onClick={() => handleReportAction(report.id, 'delete')}
                              className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full text-left"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No reports found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Report Detail Modal */}
        {showDetails && selectedReport && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Report Details</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedReport.title}</h4>
                  <p className="text-gray-600 mt-1">{selectedReport.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <p className="text-sm text-gray-900">{reportTypes.find(t => t.value === selectedReport.type)?.label}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <p className="text-sm text-gray-900">{selectedReport.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(selectedReport.priority)}`}>
                      {selectedReport.priority}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(selectedReport.status)}`}>
                      {selectedReport.status}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Reported Item</label>
                  <p className="text-sm text-gray-900">{selectedReport.reportedItem}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Reported By</label>
                  <p className="text-sm text-gray-900">{selectedReport.reportedBy} ({selectedReport.reporterEmail})</p>
                </div>
                
                {selectedReport.evidence && selectedReport.evidence.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Evidence</label>
                    <div className="mt-1">
                      {selectedReport.evidence.map((evidence, index) => (
                        <span key={index} className="inline-block bg-gray-100 rounded px-2 py-1 text-xs text-gray-700 mr-2 mb-1">
                          {evidence}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes</label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add your notes about this report..."
                  />
                  <button
                    onClick={saveAdminNotes}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Notes
                  </button>
                </div>
                
                <div className="flex justify-end space-x-2">
                  {selectedReport.status === 'pending' && (
                    <button
                      onClick={() => {
                        handleReportAction(selectedReport.id, 'investigate');
                        setShowDetails(false);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Start Investigation
                    </button>
                  )}
                  
                  {(selectedReport.status === 'pending' || selectedReport.status === 'investigating') && (
                    <>
                      <button
                        onClick={() => {
                          handleReportAction(selectedReport.id, 'resolve');
                          setShowDetails(false);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Resolve
                      </button>
                      <button
                        onClick={() => {
                          handleReportAction(selectedReport.id, 'dismiss');
                          setShowDetails(false);
                        }}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                      >
                        Dismiss
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsMonitoring;