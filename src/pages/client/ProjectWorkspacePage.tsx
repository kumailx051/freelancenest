import React, { useState } from 'react';

const ProjectWorkspacePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  
  // Use selectedFile to avoid unused variable warning
  console.log('Selected file:', selectedFile);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const project = {
    id: '1',
    title: 'E-commerce Website Development',
    freelancer: {
      name: 'John Smith',
      avatar: '/api/placeholder/40/40',
      status: 'online'
    },
    status: 'in_progress',
    progress: 65,
    deadline: '2024-02-20',
    startDate: '2024-01-01',
    milestones: [
      { title: 'Project Setup & Planning', status: 'completed', dueDate: '2024-01-15', progress: 100 },
      { title: 'Frontend Development', status: 'completed', dueDate: '2024-01-30', progress: 100 },
      { title: 'Backend Development', status: 'in_progress', dueDate: '2024-02-10', progress: 40 },
      { title: 'Testing & Deployment', status: 'pending', dueDate: '2024-02-20', progress: 0 }
    ]
  };

  const files = [
    {
      id: '1',
      name: 'Project Requirements.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadedBy: 'You',
      uploadDate: '2024-01-01',
      category: 'requirements'
    },
    {
      id: '2',
      name: 'Brand Guidelines.zip',
      type: 'zip',
      size: '15.2 MB',
      uploadedBy: 'You',
      uploadDate: '2024-01-02',
      category: 'design'
    },
    {
      id: '3',
      name: 'Homepage Mockup v1.fig',
      type: 'figma',
      size: '8.7 MB',
      uploadedBy: 'John Smith',
      uploadDate: '2024-01-10',
      category: 'design'
    },
    {
      id: '4',
      name: 'API Documentation.md',
      type: 'markdown',
      size: '156 KB',
      uploadedBy: 'John Smith',
      uploadDate: '2024-01-25',
      category: 'documentation'
    },
    {
      id: '5',
      name: 'Database Schema.sql',
      type: 'sql',
      size: '45 KB',
      uploadedBy: 'John Smith',
      uploadDate: '2024-01-28',
      category: 'code'
    }
  ];

  const activities = [
    {
      id: '1',
      type: 'file_upload',
      user: 'John Smith',
      action: 'uploaded',
      item: 'Database Schema.sql',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'milestone',
      user: 'John Smith',
      action: 'completed',
      item: 'Frontend Development milestone',
      timestamp: '1 day ago'
    },
    {
      id: '3',
      type: 'comment',
      user: 'You',
      action: 'commented on',
      item: 'Homepage Mockup v1.fig',
      timestamp: '2 days ago'
    },
    {
      id: '4',
      type: 'file_upload',
      user: 'John Smith',
      action: 'uploaded',
      item: 'API Documentation.md',
      timestamp: '3 days ago'
    }
  ];

  const timeTracking = [
    {
      date: '2024-01-29',
      hours: 8,
      description: 'Backend API development - User authentication system',
      status: 'approved'
    },
    {
      date: '2024-01-28',
      hours: 6.5,
      description: 'Database schema design and implementation',
      status: 'approved'
    },
    {
      date: '2024-01-27',
      hours: 7,
      description: 'Frontend integration with backend APIs',
      status: 'pending'
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 18h12V6l-4-4H4v16z"/></svg>;
      case 'zip':
        return <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 18h12V6l-4-4H4v16z"/></svg>;
      case 'figma':
        return <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 18h12V6l-4-4H4v16z"/></svg>;
      case 'markdown':
        return <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 18h12V6l-4-4H4v16z"/></svg>;
      case 'sql':
        return <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 18h12V6l-4-4H4v16z"/></svg>;
      default:
        return <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 18h12V6l-4-4H4v16z"/></svg>;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'file_upload':
        return <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"/></svg>;
      case 'milestone':
        return <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>;
      case 'comment':
        return <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"/></svg>;
      default:
        return <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/></svg>;
    }
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <div className="mb-6 lg:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
                <div className="flex items-center space-x-4 text-[#ffeee3]">
                  <div className="flex items-center space-x-2">
                    <img
                      src={project.freelancer.avatar}
                      alt={project.freelancer.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{project.freelancer.name}</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <span>•</span>
                  <span>Due: {project.deadline}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="text-3xl font-bold text-[#FF6B00] mb-2">{project.progress}%</div>
                <div className="w-32 bg-white/20 rounded-full h-2 mb-2">
                  <div
                    className="bg-[#FF6B00] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="text-sm text-[#ffeee3]">Overall Progress</div>
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
                { id: 'files', label: 'Files & Documents' },
                { id: 'time', label: 'Time Tracking' },
                { id: 'activity', label: 'Activity Feed' }
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Project Milestones */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                    <h2 className="text-xl font-bold text-[#2E2E2E] mb-6">Project Milestones</h2>
                    <div className="space-y-4">
                      {project.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-[#ffeee3]/30 rounded-lg">
                          <div className={`w-4 h-4 rounded-full ${
                            milestone.status === 'completed' ? 'bg-green-500' :
                            milestone.status === 'in_progress' ? 'bg-blue-500' :
                            'bg-gray-300'
                          }`}></div>
                          <div className="flex-1">
                            <div className="font-medium text-[#2E2E2E] mb-1">{milestone.title}</div>
                            <div className="text-sm text-[#2E2E2E]/60 mb-2">Due: {milestone.dueDate}</div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  milestone.status === 'completed' ? 'bg-green-500' :
                                  milestone.status === 'in_progress' ? 'bg-blue-500' :
                                  'bg-gray-300'
                                }`}
                                style={{ width: `${milestone.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-sm font-medium text-[#2E2E2E]">
                            {milestone.progress}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions & Stats */}
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                    <h3 className="font-bold text-[#2E2E2E] mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full p-3 bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg font-medium transition-colors">
                        Send Message
                      </button>
                      <button className="w-full p-3 bg-[#ffeee3] hover:bg-[#FF6B00] hover:text-white text-[#2E2E2E] rounded-lg font-medium transition-colors">
                        Schedule Meeting
                      </button>
                      <button 
                        onClick={() => setShowUploadModal(true)}
                        className="w-full p-3 bg-[#ffeee3] hover:bg-[#FF6B00] hover:text-white text-[#2E2E2E] rounded-lg font-medium transition-colors"
                      >
                        Upload File
                      </button>
                      <button className="w-full p-3 bg-[#ffeee3] hover:bg-[#FF6B00] hover:text-white text-[#2E2E2E] rounded-lg font-medium transition-colors">
                        Request Update
                      </button>
                    </div>
                  </div>

                  {/* Project Stats */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                    <h3 className="font-bold text-[#2E2E2E] mb-4">Project Stats</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-[#2E2E2E]/60">Files Shared</span>
                        <span className="font-medium text-[#2E2E2E]">{files.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2E2E2E]/60">Hours Logged</span>
                        <span className="font-medium text-[#2E2E2E]">
                          {timeTracking.reduce((sum, entry) => sum + entry.hours, 0)}h
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2E2E2E]/60">Messages</span>
                        <span className="font-medium text-[#2E2E2E]">47</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2E2E2E]/60">Last Activity</span>
                        <span className="font-medium text-[#2E2E2E]">2h ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Files Tab */}
            {activeTab === 'files' && (
              <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#2E2E2E] mb-4 md:mb-0">Files & Documents</h2>
                  <div className="flex space-x-3">
                    <select className="px-4 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]">
                      <option>All Categories</option>
                      <option>Requirements</option>
                      <option>Design</option>
                      <option>Code</option>
                      <option>Documentation</option>
                    </select>
                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="px-4 py-2 bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg font-medium transition-colors"
                    >
                      Upload File
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-[#ffeee3]">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="p-4 border border-[#ffeee3] rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedFile(file.id)}
                      >
                        <div className="flex items-start space-x-3">
                          {getFileIcon(file.type)}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-[#2E2E2E] truncate">{file.name}</div>
                            <div className="text-sm text-[#2E2E2E]/60">{file.size}</div>
                            <div className="text-xs text-[#2E2E2E]/50 mt-1">
                              {file.uploadedBy} • {file.uploadDate}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex space-x-2">
                          <button className="text-[#FF6B00] hover:text-[#FF9F45] text-sm font-medium">
                            Download
                          </button>
                          <button className="text-[#2E2E2E]/60 hover:text-[#2E2E2E] text-sm font-medium">
                            Share
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Time Tracking Tab */}
            {activeTab === 'time' && (
              <div className="bg-white rounded-xl shadow-sm border border-[#ffeee3]">
                <div className="p-6 border-b border-[#ffeee3]">
                  <h2 className="text-xl font-bold text-[#2E2E2E]">Time Tracking</h2>
                  <p className="text-[#2E2E2E]/60 mt-2">
                    Review and approve time entries logged by your freelancer.
                  </p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#ffeee3]/30">
                      <tr>
                        <th className="text-left p-4 font-medium text-[#2E2E2E]">Date</th>
                        <th className="text-left p-4 font-medium text-[#2E2E2E]">Hours</th>
                        <th className="text-left p-4 font-medium text-[#2E2E2E]">Description</th>
                        <th className="text-left p-4 font-medium text-[#2E2E2E]">Status</th>
                        <th className="text-left p-4 font-medium text-[#2E2E2E]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timeTracking.map((entry, index) => (
                        <tr key={index} className="border-t border-[#ffeee3]">
                          <td className="p-4 text-[#2E2E2E]">{entry.date}</td>
                          <td className="p-4 text-[#2E2E2E] font-medium">{entry.hours}h</td>
                          <td className="p-4 text-[#2E2E2E]">{entry.description}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              entry.status === 'approved' ? 'bg-green-100 text-green-600' :
                              entry.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-red-100 text-red-600'
                            }`}>
                              {entry.status}
                            </span>
                          </td>
                          <td className="p-4">
                            {entry.status === 'pending' && (
                              <div className="flex space-x-2">
                                <button className="text-green-600 hover:text-green-700 font-medium">
                                  Approve
                                </button>
                                <button className="text-red-600 hover:text-red-700 font-medium">
                                  Reject
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-6 border-t border-[#ffeee3] bg-[#ffeee3]/30">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-[#2E2E2E]">Total Hours This Week:</span>
                    <span className="text-2xl font-bold text-[#FF6B00]">21.5h</span>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                <h2 className="text-xl font-bold text-[#2E2E2E] mb-6">Activity Feed</h2>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-[#ffeee3]/30 rounded-lg">
                      <div className="p-2 bg-white rounded-full">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="text-[#2E2E2E]">
                          <span className="font-medium">{activity.user}</span>
                          {' '}{activity.action}{' '}
                          <span className="font-medium">{activity.item}</span>
                        </div>
                        <div className="text-sm text-[#2E2E2E]/60">{activity.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#2E2E2E]">Upload File</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-[#2E2E2E]/60 hover:text-[#2E2E2E]"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="border-2 border-dashed border-[#ffeee3] rounded-lg p-8 text-center mb-4">
              <svg className="w-12 h-12 text-[#2E2E2E]/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-[#2E2E2E]/60 mb-2">Drop files here or click to browse</p>
              <p className="text-sm text-[#2E2E2E]/40">Max file size: 50MB</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Category</label>
              <select className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]">
                <option>Select category</option>
                <option>Requirements</option>
                <option>Design</option>
                <option>Code</option>
                <option>Documentation</option>
              </select>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 border border-[#ffeee3] text-[#2E2E2E] rounded-lg hover:bg-[#ffeee3] transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg transition-colors">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectWorkspacePage;
