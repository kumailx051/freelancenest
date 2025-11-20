import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Star, 
  Award,
  Target,
  BarChart3,
  Briefcase,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

const FreelancerDashboard: React.FC = () => {
  const [availabilityStatus, setAvailabilityStatus] = useState(true);

  // Mock data
  const freelancerData = {
    name: 'Alex Thompson',
    title: 'Full Stack Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format',
    rating: 4.9,
    completedJobs: 47,
    responseTime: '2 hours',
    successRate: 98
  };

  const earningsData = {
    available: 2850.00,
    pending: 1200.00,
    escrow: 800.00,
    thisMonth: 4250.00,
    lastMonth: 3800.00,
    growth: 12
  };

  const activeProjects = [
    {
      id: 1,
      title: 'E-commerce Website Development',
      client: 'TechCorp Ltd.',
      budget: '$3,500',
      deadline: '2024-02-15',
      progress: 75,
      status: 'In Progress',
      nextMilestone: 'Frontend Implementation'
    },
    {
      id: 2,
      title: 'Mobile App UI/UX Design',
      client: 'StartupXYZ',
      budget: '$2,000',
      deadline: '2024-02-20',
      progress: 45,
      status: 'In Progress',
      nextMilestone: 'User Testing'
    }
  ];

  const todaysMatches = [
    {
      id: 1,
      title: 'React Native Developer Needed',
      budget: '$2,500 - $4,000',
      fitScore: 95,
      skills: ['React Native', 'JavaScript', 'Mobile Development'],
      postedTime: '2 hours ago',
      proposals: 12
    },
    {
      id: 2,
      title: 'Full Stack Web Application',
      budget: '$5,000 - $8,000',
      fitScore: 92,
      skills: ['React', 'Node.js', 'MongoDB'],
      postedTime: '4 hours ago',
      proposals: 8
    },
    {
      id: 3,
      title: 'API Integration Project',
      budget: '$1,500 - $2,500',
      fitScore: 88,
      skills: ['REST API', 'JavaScript', 'Python'],
      postedTime: '6 hours ago',
      proposals: 15
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      task: 'Submit milestone: Database design',
      project: 'E-commerce Website',
      dueTime: '2:00 PM',
      priority: 'high'
    },
    {
      id: 2,
      task: 'Client meeting: Project review',
      project: 'Mobile App UI/UX',
      dueTime: '4:30 PM',
      priority: 'medium'
    },
    {
      id: 3,
      task: 'Upload wireframes for approval',
      project: 'Mobile App UI/UX',
      dueTime: 'Tomorrow',
      priority: 'low'
    }
  ];

  const certifications = [
    {
      id: 1,
      name: 'React Development',
      progress: 100,
      badge: 'Completed',
      earnedDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Node.js Fundamentals',
      progress: 75,
      badge: 'In Progress',
      earnedDate: null
    },
    {
      id: 3,
      name: 'AWS Cloud Practitioner',
      progress: 0,
      badge: 'Available',
      earnedDate: null
    }
  ];

  return (
    <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <img 
                src={freelancerData.avatar} 
                alt={freelancerData.name}
                className="w-16 h-16 rounded-full object-cover border-3 border-[#FF6B00]"
              />
              <div>
                <h1 className="text-3xl font-bold text-[#2E2E2E]">
                  Welcome back, {freelancerData.name}!
                </h1>
                <p className="text-[#2E2E2E]/70 text-lg">{freelancerData.title}</p>
              </div>
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-[#2E2E2E] font-medium">Available for work:</span>
                <button
                  onClick={() => setAvailabilityStatus(!availabilityStatus)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    availabilityStatus ? 'bg-[#FF6B00]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      availabilityStatus ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                availabilityStatus 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {availabilityStatus ? 'Available' : 'Away'}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#2E2E2E]/60 text-sm font-medium">Available Balance</p>
                <p className="text-2xl font-bold text-[#2E2E2E]">${earningsData.available.toLocaleString()}</p>
              </div>
              <div className="bg-[#ffeee3] p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-[#FF6B00]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#2E2E2E]/60 text-sm font-medium">This Month</p>
                <p className="text-2xl font-bold text-[#2E2E2E]">${earningsData.thisMonth.toLocaleString()}</p>
                <p className="text-green-600 text-sm font-medium">+{earningsData.growth}% from last month</p>
              </div>
              <div className="bg-[#ffeee3] p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-[#FF6B00]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#2E2E2E]/60 text-sm font-medium">Active Projects</p>
                <p className="text-2xl font-bold text-[#2E2E2E]">{activeProjects.length}</p>
              </div>
              <div className="bg-[#ffeee3] p-3 rounded-lg">
                <Briefcase className="w-6 h-6 text-[#FF6B00]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#2E2E2E]/60 text-sm font-medium">Success Rate</p>
                <p className="text-2xl font-bold text-[#2E2E2E]">{freelancerData.successRate}%</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-[#2E2E2E]/60 text-sm">{freelancerData.rating} rating</span>
                </div>
              </div>
              <div className="bg-[#ffeee3] p-3 rounded-lg">
                <Award className="w-6 h-6 text-[#FF6B00]" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Today's AI Matches */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#2E2E2E] flex items-center">
                    <Target className="w-5 h-5 text-[#FF6B00] mr-2" />
                    Today's AI Matches
                  </h2>
                  <Link 
                    to="/freelancer/ai-matches"
                    className="text-[#FF6B00] hover:text-[#FF9F45] font-medium flex items-center"
                  >
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {todaysMatches.map((match) => (
                    <div key={match.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#FF6B00] transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#2E2E2E] mb-1">{match.title}</h3>
                          <p className="text-[#2E2E2E]/60 text-sm mb-2">{match.budget} • {match.proposals} proposals</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {match.skills.map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-[#ffeee3] text-[#FF6B00] text-xs rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mb-2">
                            {match.fitScore}% Match
                          </div>
                          <p className="text-[#2E2E2E]/60 text-xs">{match.postedTime}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Draft with AI
                        </button>
                        <Link 
                          to={`/freelancer/job-details/${match.id}`}
                          className="flex-1 border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Projects */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#2E2E2E] flex items-center">
                    <Briefcase className="w-5 h-5 text-[#FF6B00] mr-2" />
                    Active Projects
                  </h2>
                  <Link 
                    to="/freelancer/projects"
                    className="text-[#FF6B00] hover:text-[#FF9F45] font-medium flex items-center"
                  >
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {activeProjects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#2E2E2E] mb-1">{project.title}</h3>
                          <p className="text-[#2E2E2E]/60 text-sm mb-2">Client: {project.client}</p>
                          <p className="text-[#2E2E2E]/60 text-sm">Next: {project.nextMilestone}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#2E2E2E] mb-1">{project.budget}</p>
                          <p className="text-[#2E2E2E]/60 text-sm">Due: {project.deadline}</p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-[#2E2E2E]/60">Progress</span>
                          <span className="text-[#2E2E2E] font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#FF6B00] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <Link 
                        to={`/freelancer/project-workspace/${project.id}`}
                        className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center"
                      >
                        Open Workspace <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Today's Tasks */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-[#2E2E2E] flex items-center">
                  <Clock className="w-5 h-5 text-[#FF6B00] mr-2" />
                  Today's Tasks
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        task.priority === 'high' ? 'bg-red-500' :
                        task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-[#2E2E2E] font-medium text-sm">{task.task}</p>
                        <p className="text-[#2E2E2E]/60 text-xs">{task.project}</p>
                        <p className="text-[#FF6B00] text-xs font-medium">{task.dueTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link 
                  to="/freelancer/calendar"
                  className="block w-full text-center bg-[#ffeee3] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors mt-4"
                >
                  View Calendar
                </Link>
              </div>
            </div>

            {/* Earnings Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-[#2E2E2E] flex items-center">
                  <BarChart3 className="w-5 h-5 text-[#FF6B00] mr-2" />
                  Earnings Summary
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#2E2E2E]/60">Available</span>
                    <span className="font-semibold text-[#2E2E2E]">${earningsData.available.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#2E2E2E]/60">Pending</span>
                    <span className="font-semibold text-[#2E2E2E]">${earningsData.pending.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#2E2E2E]/60">In Escrow</span>
                    <span className="font-semibold text-[#2E2E2E]">${earningsData.escrow.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#2E2E2E]/60">Total</span>
                      <span className="font-bold text-[#2E2E2E] text-lg">
                        ${(earningsData.available + earningsData.pending + earningsData.escrow).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <Link 
                  to="/freelancer/earnings"
                  className="block w-full text-center bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors mt-4"
                >
                  View Earnings
                </Link>
              </div>
            </div>

            {/* Learning & Certifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-[#2E2E2E] flex items-center">
                  <Award className="w-5 h-5 text-[#FF6B00] mr-2" />
                  Learning Progress
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-[#2E2E2E] text-sm">{cert.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          cert.badge === 'Completed' ? 'bg-green-100 text-green-800' :
                          cert.badge === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {cert.badge}
                        </span>
                      </div>
                      {cert.progress > 0 && (
                        <div className="mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#FF6B00] h-2 rounded-full transition-all duration-300"
                              style={{ width: `${cert.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      {cert.earnedDate && (
                        <p className="text-[#2E2E2E]/60 text-xs">Earned: {cert.earnedDate}</p>
                      )}
                    </div>
                  ))}
                </div>
                <Link 
                  to="/freelancer/learning"
                  className="block w-full text-center bg-[#ffeee3] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors mt-4"
                >
                  Browse Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
