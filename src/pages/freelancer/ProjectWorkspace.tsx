import React, { useState } from 'react';
import { 
  Play,
  Pause,
  FileText,
  Upload,
  Download,
  MessageSquare,
  Calendar,
  CheckCircle,
  DollarSign,
  Settings,
  MoreHorizontal,
  Search,
  Filter,
  Star,
  Share2,
  Eye,
  Edit,
  FolderOpen,
  File,
  Image,
  Video
} from 'lucide-react';

const ProjectWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeTracking, setTimeTracking] = useState(false);
  const [currentTime] = useState('00:00:00');

  const project = {
    id: 1,
    title: 'E-commerce Platform Development',
    client: {
      name: 'Sarah Johnson',
      company: 'TechCorp Solutions',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face&auto=format'
    },
    status: 'in-progress',
    budget: 5000,
    earned: 2500,
    deadline: '2024-02-15',
    progress: 65,
    description: 'Build a comprehensive e-commerce platform with React frontend, Node.js backend, and payment integration.',
    milestones: [
      {
        id: 1,
        title: 'Project Setup & Authentication',
        amount: 1000,
        status: 'completed',
        dueDate: '2024-01-10',
        deliverables: ['User authentication system', 'Project structure setup', 'Database design']
      },
      {
        id: 2,
        title: 'Product Catalog & Shopping Cart',
        amount: 1500,
        status: 'in-progress',
        dueDate: '2024-01-25',
        deliverables: ['Product listing pages', 'Shopping cart functionality', 'Search and filtering']
      },
      {
        id: 3,
        title: 'Payment Integration',
        amount: 1500,
        status: 'pending',
        dueDate: '2024-02-08',
        deliverables: ['Stripe integration', 'Order processing', 'Email notifications']
      },
      {
        id: 4,
        title: 'Testing & Deployment',
        amount: 1000,
        status: 'pending',
        dueDate: '2024-02-15',
        deliverables: ['Unit tests', 'Integration tests', 'Production deployment']
      }
    ]
  };

  const files = [
    {
      id: 1,
      name: 'Project Requirements.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: '2024-01-05',
      category: 'requirements'
    },
    {
      id: 2,
      name: 'Design Mockups.fig',
      type: 'figma',
      size: '15.8 MB',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: '2024-01-08',
      category: 'design'
    },
    {
      id: 3,
      name: 'Database Schema.sql',
      type: 'sql',
      size: '45 KB',
      uploadedBy: 'You',
      uploadedAt: '2024-01-12',
      category: 'development'
    },
    {
      id: 4,
      name: 'Frontend Prototype',
      type: 'folder',
      size: '125 MB',
      uploadedBy: 'You',
      uploadedAt: '2024-01-18',
      category: 'development'
    },
    {
      id: 5,
      name: 'Demo Video.mp4',
      type: 'video',
      size: '89 MB',
      uploadedBy: 'You',
      uploadedAt: '2024-01-20',
      category: 'deliverable'
    }
  ];

  const timeEntries = [
    {
      id: 1,
      date: '2024-01-20',
      description: 'Implemented product catalog API endpoints',
      duration: '4h 30m',
      billable: true
    },
    {
      id: 2,
      date: '2024-01-19',
      description: 'Frontend component development for shopping cart',
      duration: '6h 15m',
      billable: true
    },
    {
      id: 3,
      date: '2024-01-18',
      description: 'Client meeting and requirements clarification',
      duration: '1h 30m',
      billable: false
    },
    {
      id: 4,
      date: '2024-01-17',
      description: 'Database optimization and indexing',
      duration: '3h 45m',
      billable: true
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'figma':
        return <Image className="w-5 h-5 text-purple-500" />;
      case 'sql':
        return <File className="w-5 h-5 text-blue-500" />;
      case 'video':
        return <Video className="w-5 h-5 text-green-500" />;
      case 'folder':
        return <FolderOpen className="w-5 h-5 text-yellow-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'milestones', label: 'Milestones' },
    { id: 'files', label: 'Files' },
    { id: 'time', label: 'Time Tracking' },
    { id: 'communication', label: 'Communication' }
  ];

  return (
    <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-[#2E2E2E] mb-2">{project.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-[#2E2E2E]/60">
                <div className="flex items-center space-x-2">
                  <img
                    src={project.client.avatar}
                    alt={project.client.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{project.client.name} • {project.client.company}</span>
                </div>
                <span>•</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {project.status.replace('-', ' ')}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
              <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
            </div>
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#ffeee3] p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#2E2E2E]/70">Budget</span>
                <DollarSign className="w-4 h-4 text-[#FF6B00]" />
              </div>
              <p className="text-xl font-bold text-[#2E2E2E]">${project.budget.toLocaleString()}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#2E2E2E]/70">Earned</span>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-xl font-bold text-[#2E2E2E]">${project.earned.toLocaleString()}</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#2E2E2E]/70">Progress</span>
                <Star className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-xl font-bold text-[#2E2E2E]">{project.progress}%</p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#2E2E2E]/70">Deadline</span>
                <Calendar className="w-4 h-4 text-yellow-600" />
              </div>
              <p className="text-xl font-bold text-[#2E2E2E]">Feb 15</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#FF6B00] text-[#FF6B00]'
                      : 'border-transparent text-[#2E2E2E]/60 hover:text-[#2E2E2E] hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">Project Description</h3>
                  <p className="text-[#2E2E2E]/70">{project.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">Progress Overview</h3>
                  <div className="bg-gray-200 rounded-full h-3 mb-4">
                    <div 
                      className="bg-gradient-to-r from-[#FF6B00] to-[#FF9F45] h-3 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-[#2E2E2E] mb-2">Current Phase</h4>
                      <p className="text-[#2E2E2E]/70">Product Catalog & Shopping Cart Development</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-[#2E2E2E] mb-2">Next Milestone</h4>
                      <p className="text-[#2E2E2E]/70">Payment Integration - Due Feb 8</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-[#2E2E2E]">Milestone 1 Completed</p>
                        <p className="text-sm text-[#2E2E2E]/60">Project setup and authentication system delivered</p>
                      </div>
                      <span className="text-sm text-[#2E2E2E]/60 ml-auto">2 days ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Upload className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-[#2E2E2E]">Demo Video Uploaded</p>
                        <p className="text-sm text-[#2E2E2E]/60">Shopping cart functionality demonstration</p>
                      </div>
                      <span className="text-sm text-[#2E2E2E]/60 ml-auto">1 day ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Milestones Tab */}
            {activeTab === 'milestones' && (
              <div className="space-y-4">
                {project.milestones.map((milestone) => (
                  <div key={milestone.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">{milestone.title}</h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getMilestoneStatusColor(milestone.status)}`}>
                          {milestone.status.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-[#2E2E2E]">${milestone.amount.toLocaleString()}</p>
                        <p className="text-sm text-[#2E2E2E]/60">Due: {milestone.dueDate}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-[#2E2E2E] mb-2">Deliverables:</h4>
                      <ul className="list-disc list-inside space-y-1 text-[#2E2E2E]/70">
                        {milestone.deliverables.map((deliverable, index) => (
                          <li key={index}>{deliverable}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {milestone.status === 'in-progress' && (
                      <div className="mt-4 flex space-x-3">
                        <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors">
                          Submit for Review
                        </button>
                        <button className="border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] px-4 py-2 rounded-lg font-medium transition-colors">
                          Upload Files
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Files Tab */}
            {activeTab === 'files' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search files..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      />
                    </div>
                    <button className="border border-gray-300 text-[#2E2E2E] hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </button>
                  </div>
                  <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Files
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        {getFileIcon(file.type)}
                        <div>
                          <h3 className="font-medium text-[#2E2E2E]">{file.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-[#2E2E2E]/60">
                            <span>{file.size}</span>
                            <span>•</span>
                            <span>Uploaded by {file.uploadedBy}</span>
                            <span>•</span>
                            <span>{file.uploadedAt}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          file.category === 'requirements' ? 'bg-blue-100 text-blue-700' :
                          file.category === 'design' ? 'bg-purple-100 text-purple-700' :
                          file.category === 'development' ? 'bg-green-100 text-green-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {file.category}
                        </span>
                        <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-[#2E2E2E]/60 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Time Tracking Tab */}
            {activeTab === 'time' && (
              <div className="space-y-6">
                {/* Timer */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[#2E2E2E]">Time Tracker</h3>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-mono font-bold text-[#2E2E2E]">{currentTime}</span>
                      <button
                        onClick={() => setTimeTracking(!timeTracking)}
                        className={`p-3 rounded-lg font-medium transition-colors flex items-center ${
                          timeTracking 
                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                            : 'bg-[#FF6B00] hover:bg-[#FF9F45] text-white'
                        }`}
                      >
                        {timeTracking ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  
                  <input
                    type="text"
                    placeholder="What are you working on?"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  />
                </div>

                {/* Time Entries */}
                <div>
                  <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Recent Time Entries</h3>
                  <div className="space-y-3">
                    {timeEntries.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <span className="text-sm font-medium text-[#2E2E2E]/60">{entry.date}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              entry.billable ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {entry.billable ? 'Billable' : 'Non-billable'}
                            </span>
                          </div>
                          <p className="text-[#2E2E2E]">{entry.description}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-semibold text-[#2E2E2E]">{entry.duration}</span>
                          <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Communication Tab */}
            {activeTab === 'communication' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#ffeee3] p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-[#2E2E2E]">Messages</h3>
                      <MessageSquare className="w-5 h-5 text-[#FF6B00]" />
                    </div>
                    <p className="text-[#2E2E2E]/70 mb-4">
                      Stay connected with your client through direct messaging.
                    </p>
                    <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Open Chat
                    </button>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-[#2E2E2E]">Video Calls</h3>
                      <Video className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-[#2E2E2E]/70 mb-4">
                      Schedule or start video calls for better collaboration.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Start Call
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Project Updates</h3>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <textarea
                        placeholder="Share an update about your progress..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent resize-none"
                        rows={4}
                      />
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex space-x-2">
                          <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                            <Upload className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                            <Image className="w-4 h-4" />
                          </button>
                        </div>
                        <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors">
                          Post Update
                        </button>
                      </div>
                    </div>
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

export default ProjectWorkspace;
