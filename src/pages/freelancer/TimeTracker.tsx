import React, { useState, useEffect } from 'react';
import { 
  Play,
  Pause,
  Square,
  Clock,
  BarChart3,
  Download,
  Edit,
  Trash2,
  Plus,
  Target,
  DollarSign,
  TrendingUp,
  Settings,
  Search,
  Filter
} from 'lucide-react';

const TimeTracker: React.FC = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTask, setCurrentTask] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  const projects = [
    { id: 1, name: 'E-commerce Platform', client: 'TechCorp Solutions', rate: 50 },
    { id: 2, name: 'SaaS Dashboard', client: 'InnovateTech Inc', rate: 60 },
    { id: 3, name: 'Analytics Dashboard', client: 'DataViz Solutions', rate: 55 },
    { id: 4, name: 'React Native App', client: 'MobileFirst Co', rate: 45 }
  ];

  const timeEntries = [
    {
      id: 1,
      project: 'E-commerce Platform',
      client: 'TechCorp Solutions',
      task: 'Implementing payment gateway integration',
      date: '2025-08-30',
      startTime: '09:00',
      endTime: '12:30',
      duration: 210, // minutes
      rate: 50,
      billable: true,
      status: 'completed'
    },
    {
      id: 2,
      project: 'E-commerce Platform',
      client: 'TechCorp Solutions',
      task: 'Bug fixes and code review',
      date: '2025-08-30',
      startTime: '14:00',
      endTime: '16:45',
      duration: 165,
      rate: 50,
      billable: true,
      status: 'completed'
    },
    {
      id: 3,
      project: 'SaaS Dashboard',
      client: 'InnovateTech Inc',
      task: 'Dashboard components development',
      date: '2025-08-29',
      startTime: '10:30',
      endTime: '15:00',
      duration: 270,
      rate: 60,
      billable: true,
      status: 'completed'
    },
    {
      id: 4,
      project: 'Analytics Dashboard',
      client: 'DataViz Solutions',
      task: 'Chart implementation and data visualization',
      date: '2025-08-29',
      startTime: '16:00',
      endTime: '18:30',
      duration: 150,
      rate: 55,
      billable: true,
      status: 'completed'
    },
    {
      id: 5,
      project: 'E-commerce Platform',
      client: 'TechCorp Solutions',
      task: 'Client meeting and requirements discussion',
      date: '2025-08-28',
      startTime: '11:00',
      endTime: '12:00',
      duration: 60,
      rate: 50,
      billable: false,
      status: 'completed'
    }
  ];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const calculateEarnings = (duration: number, rate: number) => {
    return ((duration / 60) * rate).toFixed(2);
  };

  const startTracking = () => {
    if (!selectedProject || !currentTask.trim()) {
      alert('Please select a project and enter a task description');
      return;
    }
    setIsTracking(true);
  };

  const stopTracking = () => {
    setIsTracking(false);
    // Here you would save the time entry
    if (currentTime > 0) {
      // Save logic would go here
      setCurrentTime(0);
      setCurrentTask('');
    }
  };

  const weeklyStats = {
    totalHours: timeEntries.reduce((acc, entry) => acc + entry.duration, 0) / 60,
    billableHours: timeEntries.filter(entry => entry.billable).reduce((acc, entry) => acc + entry.duration, 0) / 60,
    totalEarnings: timeEntries.filter(entry => entry.billable).reduce((acc, entry) => acc + (entry.duration / 60) * entry.rate, 0),
    projectsWorked: new Set(timeEntries.map(entry => entry.project)).size
  };

  const todayEntries = timeEntries.filter(entry => entry.date === new Date().toISOString().split('T')[0]);

  return (
    <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2E2E2E]">Time Tracker</h1>
            <p className="text-[#2E2E2E]/70">Track your time and boost productivity</p>
          </div>
          <div className="flex space-x-3">
            <button className="border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
            <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timer Section */}
          <div className="lg:col-span-2">
            {/* Active Timer */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Current Timer</h3>
              
              <div className="text-center mb-6">
                <div className="text-6xl font-mono font-bold text-[#2E2E2E] mb-2">
                  {formatTime(currentTime)}
                </div>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  isTracking ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    isTracking ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                  {isTracking ? 'Tracking' : 'Stopped'}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Project</label>
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                    disabled={isTracking}
                  >
                    <option value="">Select a project</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.name}>
                        {project.name} - {project.client}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Task Description</label>
                  <input
                    type="text"
                    value={currentTask}
                    onChange={(e) => setCurrentTask(e.target.value)}
                    placeholder="What are you working on?"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                    disabled={isTracking}
                  />
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={startTracking}
                  disabled={isTracking}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start
                </button>
                <button
                  onClick={() => setIsTracking(false)}
                  disabled={!isTracking}
                  className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
                >
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </button>
                <button
                  onClick={stopTracking}
                  disabled={!isTracking}
                  className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
                >
                  <Square className="w-5 h-5 mr-2" />
                  Stop
                </button>
              </div>
            </div>

            {/* Today's Entries */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#2E2E2E]">Today's Time Entries</h3>
                <button className="text-[#FF6B00] hover:text-[#FF9F45] flex items-center">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Manual Entry
                </button>
              </div>

              <div className="space-y-3">
                {todayEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <span className="font-medium text-[#2E2E2E]">{entry.project}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          entry.billable ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {entry.billable ? 'Billable' : 'Non-billable'}
                        </span>
                      </div>
                      <p className="text-sm text-[#2E2E2E]/70">{entry.task}</p>
                      <div className="flex items-center space-x-2 text-xs text-[#2E2E2E]/60 mt-1">
                        <span>{entry.startTime} - {entry.endTime}</span>
                        <span>•</span>
                        <span>{formatDuration(entry.duration)}</span>
                        {entry.billable && (
                          <>
                            <span>•</span>
                            <span>${calculateEarnings(entry.duration, entry.rate)}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-[#2E2E2E]/60 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Entries List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#2E2E2E]">Recent Time Entries</h3>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search entries..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                    />
                  </div>
                  <button className="border border-gray-300 text-[#2E2E2E] hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {timeEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-medium text-[#2E2E2E]">{entry.project}</span>
                        <span className="text-sm text-[#2E2E2E]/60">{entry.client}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          entry.billable ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {entry.billable ? 'Billable' : 'Non-billable'}
                        </span>
                      </div>
                      <p className="text-[#2E2E2E]/80 mb-2">{entry.task}</p>
                      <div className="flex items-center space-x-4 text-sm text-[#2E2E2E]/60">
                        <span>{entry.date}</span>
                        <span>{entry.startTime} - {entry.endTime}</span>
                        <span>{formatDuration(entry.duration)}</span>
                        {entry.billable && (
                          <span className="font-medium text-green-600">
                            ${calculateEarnings(entry.duration, entry.rate)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-[#2E2E2E]/60 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Weekly Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">This Week</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#ffeee3] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-[#FF6B00]" />
                    <span className="font-medium text-[#2E2E2E]">Total Hours</span>
                  </div>
                  <span className="text-xl font-bold text-[#2E2E2E]">
                    {weeklyStats.totalHours.toFixed(1)}h
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-[#2E2E2E]">Billable Hours</span>
                  </div>
                  <span className="text-xl font-bold text-[#2E2E2E]">
                    {weeklyStats.billableHours.toFixed(1)}h
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-[#2E2E2E]">Earnings</span>
                  </div>
                  <span className="text-xl font-bold text-[#2E2E2E]">
                    ${weeklyStats.totalEarnings.toFixed(0)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-[#2E2E2E]">Projects</span>
                  </div>
                  <span className="text-xl font-bold text-[#2E2E2E]">
                    {weeklyStats.projectsWorked}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-[#FF6B00] hover:bg-[#FF9F45] text-white p-3 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </button>
                <button className="w-full border border-gray-300 text-[#2E2E2E] hover:bg-gray-50 p-3 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export Timesheet
                </button>
                <button className="w-full border border-gray-300 text-[#2E2E2E] hover:bg-gray-50 p-3 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Timer Settings
                </button>
              </div>
            </div>

            {/* Project Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Project Breakdown</h3>
              <div className="space-y-3">
                {projects.map((project) => {
                  const projectEntries = timeEntries.filter(entry => entry.project === project.name);
                  const totalHours = projectEntries.reduce((acc, entry) => acc + entry.duration, 0) / 60;
                  const earnings = projectEntries.filter(entry => entry.billable).reduce((acc, entry) => acc + (entry.duration / 60) * entry.rate, 0);
                  
                  return (
                    <div key={project.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-[#2E2E2E] text-sm">{project.name}</span>
                        <span className="text-sm text-[#2E2E2E]/60">{totalHours.toFixed(1)}h</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-[#2E2E2E]/60">
                        <span>{project.client}</span>
                        <span>${earnings.toFixed(0)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;
