import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  Link as LinkIcon, 
  FileText, 
  AlertTriangle,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  ExternalLink,
  Shield,
  Search,
  X
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

interface User {
  id: string;
  displayName: string;
  email: string;
  role: string;
  photoURL?: string;
}

interface Warning {
  id?: string;
  userId: string;
  userEmail: string;
  userName: string;
  reportId: string;
  reportSubject: string;
  warningText: string;
  adminId: string;
  adminEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReportDetails: React.FC = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [resolution, setResolution] = useState('');
  const [showResolutionForm, setShowResolutionForm] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [warningText, setWarningText] = useState('');
  const [isSendingWarning, setIsSendingWarning] = useState(false);

  useEffect(() => {
    if (reportId) {
      fetchReportDetails();
    }
  }, [reportId]);

  useEffect(() => {
    if (showWarningModal) {
      fetchUsers();
    }
  }, [showWarningModal]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = users.filter(user => 
        user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  const fetchReportDetails = async () => {
    try {
      setIsLoading(true);
      const reportData = await FirestoreService.get('reports', reportId!);
      
      if (reportData) {
        const transformedReport: Report = {
          ...reportData,
          submittedAt: reportData.submittedAt?.toDate ? reportData.submittedAt.toDate() : new Date(reportData.submittedAt),
          updatedAt: reportData.updatedAt?.toDate ? reportData.updatedAt.toDate() : new Date(reportData.updatedAt),
        } as Report;
        
        setReport(transformedReport);
        setResolution(transformedReport.resolution || '');
      } else {
        console.error('Report not found');
        navigate('/admin/dispute-resolution');
      }
    } catch (error) {
      console.error('Error fetching report details:', error);
      navigate('/admin/dispute-resolution');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: Report['status'], newPriority?: Report['priority']) => {
    if (!report) return;
    
    try {
      setIsUpdating(true);
      
      const updateData: any = {
        status: newStatus,
        updatedAt: new Date()
      };

      if (newPriority) {
        updateData.priority = newPriority;
      }

      if (newStatus === 'under_review') {
        updateData.assignedTo = 'Admin Team';
      }

      if (newStatus === 'resolved' && resolution.trim()) {
        updateData.resolution = resolution.trim();
      }

      await FirestoreService.update('reports', report.id, updateData);
      
      // Update local state
      setReport(prev => prev ? {
        ...prev,
        status: newStatus,
        priority: newPriority || prev.priority,
        assignedTo: newStatus === 'under_review' ? 'Admin Team' : prev.assignedTo,
        resolution: newStatus === 'resolved' && resolution.trim() ? resolution.trim() : prev.resolution,
        updatedAt: new Date()
      } : null);

      setShowResolutionForm(false);
      
      // Show success message
      const statusText = newStatus === 'under_review' ? 'moved to review' : newStatus;
      alert(`Report has been ${statusText} successfully.`);
      
    } catch (error) {
      console.error('Error updating report:', error);
      alert('Failed to update report. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const getCategoryInfo = (category: string) => {
    const categories = {
      'user-behavior': {
        label: 'User Behavior',
        color: 'bg-[#ffeee3] text-[#2E2E2E]',
        icon: <User className="w-4 h-4" />
      },
      'fraud': {
        label: 'Fraud or Scam',
        color: 'bg-[#ffeee3] text-[#2E2E2E]',
        icon: <AlertTriangle className="w-4 h-4" />
      },
      'content': {
        label: 'Inappropriate Content',
        color: 'bg-[#ffeee3] text-[#FF6B00]',
        icon: <FileText className="w-4 h-4" />
      },
      'intellectual-property': {
        label: 'Intellectual Property',
        color: 'bg-[#ffeee3] text-[#FF6B00]',
        icon: <FileText className="w-4 h-4" />
      },
      'platform': {
        label: 'Platform Issue',
        color: 'bg-[#ffeee3] text-[#FF6B00]',
        icon: <AlertTriangle className="w-4 h-4" />
      },
      'other': {
        label: 'Other Concern',
        color: 'bg-[#ffeee3] text-[#2E2E2E]',
        icon: <FileText className="w-4 h-4" />
      }
    };
    return categories[category as keyof typeof categories] || categories.other;
  };

  const getStatusInfo = (status: string) => {
    const statuses = {
      'submitted': {
        label: 'Submitted',
        color: 'bg-[#ffeee3] text-[#FF6B00]',
        icon: <Clock className="w-4 h-4" />
      },
      'under_review': {
        label: 'Under Review',
        color: 'bg-[#ffeee3] text-[#FF6B00]',
        icon: <Eye className="w-4 h-4" />
      },
      'resolved': {
        label: 'Resolved',
        color: 'bg-[#ffeee3] text-[#2E2E2E]',
        icon: <CheckCircle className="w-4 h-4" />
      },
      'closed': {
        label: 'Closed',
        color: 'bg-[#ffeee3] text-[#2E2E2E]/70',
        icon: <XCircle className="w-4 h-4" />
      }
    };
    return statuses[status as keyof typeof statuses] || statuses.submitted;
  };

  const getPriorityInfo = (priority: string) => {
    const priorities = {
      'low': {
        label: 'Low',
        color: 'bg-[#ffeee3] text-[#2E2E2E]/70'
      },
      'normal': {
        label: 'Normal',
        color: 'bg-[#ffeee3] text-[#FF6B00]'
      },
      'high': {
        label: 'High',
        color: 'bg-[#ffeee3] text-[#FF6B00] font-semibold'
      },
      'urgent': {
        label: 'Urgent',
        color: 'bg-[#ffeee3] text-[#2E2E2E] font-bold'
      }
    };
    return priorities[priority as keyof typeof priorities] || priorities.normal;
  };

  const fetchUsers = async () => {
    try {
      const usersData = await FirestoreService.getMany('users');
      const transformedUsers: User[] = usersData.map(user => ({
        id: user.id,
        displayName: user.displayName || user.name || 'Unknown User',
        email: user.email,
        role: user.role || 'user',
        photoURL: user.photoURL
      }));
      setUsers(transformedUsers);
      setFilteredUsers(transformedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSendWarning = async () => {
    if (!selectedUser || !warningText.trim() || !report) return;
    
    try {
      setIsSendingWarning(true);
      
      const warningData: Warning = {
        userId: selectedUser.id,
        userEmail: selectedUser.email,
        userName: selectedUser.displayName,
        reportId: report.id,
        reportSubject: report.reportSubject,
        warningText: warningText.trim(),
        adminId: 'admin-user-id', // You might want to get this from auth context
        adminEmail: 'admin@freelancenest.com', // You might want to get this from auth context
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await FirestoreService.create('warnings', warningData);
      
      alert(`Warning sent to ${selectedUser.displayName} successfully.`);
      
      // Reset form
      setShowWarningModal(false);
      setSelectedUser(null);
      setWarningText('');
      setSearchTerm('');
      
    } catch (error) {
      console.error('Error sending warning:', error);
      alert('Failed to send warning. Please try again.');
    } finally {
      setIsSendingWarning(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffeee3] pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
            <span className="ml-3 text-[#2E2E2E]">Loading report details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-[#ffeee3] pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <AlertTriangle className="mx-auto h-12 w-12 text-[#2E2E2E]/30" />
            <h3 className="mt-2 text-lg font-medium text-[#2E2E2E]">Report not found</h3>
            <p className="mt-1 text-sm text-[#2E2E2E]/50">
              The report you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate('/admin/dispute-resolution')}
              className="mt-4 bg-[#FF6B00] text-white px-4 py-2 rounded-lg hover:bg-[#FF6B00]/90"
            >
              Back to Reports
            </button>
          </div>
        </div>
      </div>
    );
  }

  const categoryInfo = getCategoryInfo(report.category);
  const statusInfo = getStatusInfo(report.status);
  const priorityInfo = getPriorityInfo(report.priority);

  return (
    <div className="min-h-screen bg-[#ffeee3] pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/admin/dispute-resolution')}
              className="flex items-center text-[#FF6B00] hover:text-[#2E2E2E] transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Reports
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2E2E2E]">Report Details</h1>
              <p className="text-[#2E2E2E]/70">Reference: {report.referenceNumber}</p>
            </div>
          </div>
          
          {/* Status and Priority */}
          <div className="flex items-center space-x-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${priorityInfo.color}`}>
              {priorityInfo.label} Priority
            </span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
              {statusInfo.icon}
              <span className="ml-1">{statusInfo.label}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Report Information */}
            <div className="bg-white rounded-lg shadow-sm border border-[#ffeee3] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#2E2E2E]">Report Information</h2>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${categoryInfo.color}`}>
                  {categoryInfo.icon}
                  <span className="ml-1">{categoryInfo.label}</span>
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-[#2E2E2E] mb-1">Subject</h3>
                  <p className="text-[#2E2E2E] text-lg font-medium">{report.reportSubject}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-[#2E2E2E] mb-2">Description</h3>
                  <div className="bg-[#ffeee3]/30 rounded-lg p-4">
                    <p className="text-[#2E2E2E] whitespace-pre-wrap leading-relaxed">{report.reportDescription}</p>
                  </div>
                </div>

                {report.urlLink && (
                  <div>
                    <h3 className="text-sm font-medium text-[#2E2E2E] mb-2">Related URL</h3>
                    <a
                      href={report.urlLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#FF6B00] hover:text-[#2E2E2E] transition-colors"
                    >
                      <LinkIcon className="w-4 h-4 mr-2" />
                      {report.urlLink}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                )}

                {/* Attachments */}
                {report.attachments && report.attachments.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-[#2E2E2E] mb-2">Attachments ({report.attachments.length})</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {report.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center p-3 bg-[#ffeee3]/30 rounded-lg">
                          <FileText className="w-5 h-5 text-[#FF6B00] mr-3" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#2E2E2E] truncate">
                              Attachment {index + 1}
                            </p>
                            <p className="text-xs text-[#2E2E2E]/50">Image file</p>
                          </div>
                          <a
                            href={attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 p-1 text-[#FF6B00] hover:text-[#2E2E2E] transition-colors"
                            title="View attachment"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Resolution Section */}
            {(report.status === 'resolved' || report.status === 'closed') && report.resolution && (
              <div className="bg-white rounded-lg shadow-sm border border-[#ffeee3] p-6">
                <h2 className="text-lg font-semibold text-[#2E2E2E] mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#FF6B00] mr-2" />
                  Resolution
                </h2>
                <div className="bg-[#ffeee3]/50 rounded-lg p-4">
                  <p className="text-[#2E2E2E] whitespace-pre-wrap leading-relaxed">{report.resolution}</p>
                </div>
              </div>
            )}

            {/* Resolution Form */}
            {showResolutionForm && (
              <div className="bg-white rounded-lg shadow-sm border border-[#ffeee3] p-6">
                <h2 className="text-lg font-semibold text-[#2E2E2E] mb-4">Add Resolution</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="resolution" className="block text-sm font-medium text-[#2E2E2E] mb-2">
                      Resolution Details
                    </label>
                    <textarea
                      id="resolution"
                      rows={4}
                      value={resolution}
                      onChange={(e) => setResolution(e.target.value)}
                      className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      placeholder="Describe how this report was resolved..."
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleStatusUpdate('resolved')}
                      disabled={isUpdating || !resolution.trim()}
                      className="bg-[#FF6B00] text-white px-4 py-2 rounded-lg hover:bg-[#FF6B00]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUpdating ? 'Resolving...' : 'Mark as Resolved'}
                    </button>
                    <button
                      onClick={() => setShowResolutionForm(false)}
                      className="bg-[#ffeee3] text-[#2E2E2E] px-4 py-2 rounded-lg hover:bg-[#ffeee3]/70"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Reporter Information */}
            <div className="bg-white rounded-lg shadow-sm border border-[#ffeee3] p-6">
              <h2 className="text-lg font-semibold text-[#2E2E2E] mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Reporter Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#FF6B00]/20 rounded-full flex items-center justify-center mr-3">
                    <User className="w-5 h-5 text-[#FF6B00]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#2E2E2E]">{report.userName}</p>
                    <p className="text-sm text-[#2E2E2E]/70">Reporter</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-[#FF6B00] mr-3" />
                  <a
                    href={`mailto:${report.userEmail}`}
                    className="text-[#FF6B00] hover:text-[#2E2E2E] transition-colors"
                  >
                    {report.userEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-sm border border-[#ffeee3] p-6">
              <h2 className="text-lg font-semibold text-[#2E2E2E] mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Timeline
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-[#FF6B00] rounded-full mt-2 mr-3"></div>
                  <div>
                    <p className="font-medium text-[#2E2E2E]">Report Submitted</p>
                    <p className="text-sm text-[#2E2E2E]/70">
                      {report.submittedAt.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                
                {report.updatedAt.getTime() !== report.submittedAt.getTime() && (
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#2E2E2E] rounded-full mt-2 mr-3"></div>
                    <div>
                      <p className="font-medium text-[#2E2E2E]">Last Updated</p>
                      <p className="text-sm text-[#2E2E2E]/70">
                        {report.updatedAt.toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                )}

                {report.assignedTo && (
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#FF6B00] rounded-full mt-2 mr-3"></div>
                    <div>
                      <p className="font-medium text-[#2E2E2E]">Assigned To</p>
                      <p className="text-sm text-[#2E2E2E]/70">{report.assignedTo}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            {report.status !== 'closed' && (
              <div className="bg-white rounded-lg shadow-sm border border-[#ffeee3] p-6">
                <h2 className="text-lg font-semibold text-[#2E2E2E] mb-4">Actions</h2>
                <div className="space-y-3">
                  {report.status === 'submitted' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate('under_review')}
                        disabled={isUpdating}
                        className="w-full flex items-center justify-center px-4 py-2 bg-[#FF6B00] text-white rounded-lg hover:bg-[#FF6B00]/90 disabled:opacity-50"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {isUpdating ? 'Processing...' : 'Start Review'}
                      </button>
                      <button
                        onClick={() => setShowWarningModal(true)}
                        disabled={isUpdating}
                        className="w-full flex items-center justify-center px-4 py-2 bg-[#2E2E2E] text-white rounded-lg hover:bg-[#2E2E2E]/90 disabled:opacity-50"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Send Warning
                      </button>
                    </>
                  )}
                  
                  {report.status === 'under_review' && (
                    <>
                      <button
                        onClick={() => setShowResolutionForm(true)}
                        disabled={isUpdating}
                        className="w-full flex items-center justify-center px-4 py-2 bg-[#FF6B00] text-white rounded-lg hover:bg-[#FF6B00]/90 disabled:opacity-50"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Resolve Report
                      </button>
                      <button
                        onClick={() => handleStatusUpdate('under_review', 'urgent')}
                        disabled={isUpdating}
                        className="w-full flex items-center justify-center px-4 py-2 bg-[#2E2E2E] text-white rounded-lg hover:bg-[#2E2E2E]/90 disabled:opacity-50"
                      >
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Mark as Urgent
                      </button>
                      <button
                        onClick={() => setShowWarningModal(true)}
                        disabled={isUpdating}
                        className="w-full flex items-center justify-center px-4 py-2 bg-[#FF6B00] text-white rounded-lg hover:bg-[#FF6B00]/90 disabled:opacity-50"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Send Warning
                      </button>
                    </>
                  )}

                  {report.status === 'resolved' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate('closed')}
                        disabled={isUpdating}
                        className="w-full flex items-center justify-center px-4 py-2 bg-[#2E2E2E] text-white rounded-lg hover:bg-[#2E2E2E]/90 disabled:opacity-50"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        {isUpdating ? 'Processing...' : 'Close Report'}
                      </button>
                      <button
                        onClick={() => setShowWarningModal(true)}
                        disabled={isUpdating}
                        className="w-full flex items-center justify-center px-4 py-2 bg-[#FF6B00] text-white rounded-lg hover:bg-[#FF6B00]/90 disabled:opacity-50"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Send Warning
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Warning Modal */}
        {showWarningModal && (
          <div className="fixed inset-0 bg-[#2E2E2E]/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#ffeee3]">
                <h2 className="text-xl font-bold text-[#2E2E2E]">Send Warning</h2>
                <button
                  onClick={() => {
                    setShowWarningModal(false);
                    setSelectedUser(null);
                    setWarningText('');
                    setSearchTerm('');
                  }}
                  className="p-2 hover:bg-[#ffeee3] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#2E2E2E]" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6 max-h-[calc(90vh-200px)] overflow-y-auto">
                {/* Report Context */}
                <div className="bg-[#ffeee3]/30 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-[#2E2E2E] mb-2">Report Context</h3>
                  <p className="text-[#2E2E2E] font-medium">{report?.reportSubject}</p>
                  <p className="text-sm text-[#2E2E2E]/70 mt-1">Reference: {report?.referenceNumber}</p>
                </div>

                {/* User Search */}
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Search User to Send Warning
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FF6B00] w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Selected User */}
                {selectedUser && (
                  <div className="bg-[#ffeee3]/30 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-[#2E2E2E] mb-2">Selected User</h3>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#FF6B00]/20 rounded-full flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-[#FF6B00]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#2E2E2E]">{selectedUser.displayName}</p>
                        <p className="text-sm text-[#2E2E2E]/70">{selectedUser.email}</p>
                        <p className="text-xs text-[#2E2E2E]/50 capitalize">{selectedUser.role}</p>
                      </div>
                      <button
                        onClick={() => setSelectedUser(null)}
                        className="ml-auto p-1 hover:bg-[#ffeee3] rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-[#2E2E2E]" />
                      </button>
                    </div>
                  </div>
                )}

                {/* User List */}
                {!selectedUser && filteredUsers.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-[#2E2E2E] mb-3">
                      Select User ({filteredUsers.length} found)
                    </h3>
                    <div className="max-h-64 overflow-y-auto border border-[#ffeee3] rounded-lg">
                      {filteredUsers.map((user) => (
                        <button
                          key={user.id}
                          onClick={() => setSelectedUser(user)}
                          className="w-full flex items-center p-3 hover:bg-[#ffeee3]/30 transition-colors border-b border-[#ffeee3] last:border-b-0"
                        >
                          <div className="w-8 h-8 bg-[#FF6B00]/20 rounded-full flex items-center justify-center mr-3">
                            <User className="w-4 h-4 text-[#FF6B00]" />
                          </div>
                          <div className="text-left flex-1">
                            <p className="font-medium text-[#2E2E2E]">{user.displayName}</p>
                            <p className="text-sm text-[#2E2E2E]/70">{user.email}</p>
                            <p className="text-xs text-[#2E2E2E]/50 capitalize">{user.role}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Warning Text */}
                {selectedUser && (
                  <div>
                    <label htmlFor="warningText" className="block text-sm font-medium text-[#2E2E2E] mb-2">
                      Warning Message
                    </label>
                    <textarea
                      id="warningText"
                      rows={4}
                      value={warningText}
                      onChange={(e) => setWarningText(e.target.value)}
                      className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent resize-none"
                      placeholder="Describe the offense and warning details..."
                    />
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-3 p-6 border-t border-[#ffeee3] bg-[#ffeee3]/20">
                <button
                  onClick={() => {
                    setShowWarningModal(false);
                    setSelectedUser(null);
                    setWarningText('');
                    setSearchTerm('');
                  }}
                  className="px-4 py-2 text-[#2E2E2E] bg-[#ffeee3] hover:bg-[#ffeee3]/70 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendWarning}
                  disabled={!selectedUser || !warningText.trim() || isSendingWarning}
                  className="px-6 py-2 bg-[#FF6B00] text-white rounded-lg hover:bg-[#FF6B00]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSendingWarning ? 'Sending...' : 'Send Warning'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDetails;