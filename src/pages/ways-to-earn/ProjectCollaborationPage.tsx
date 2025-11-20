import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Filter, Search, UserPlus, MessageSquare, Calendar, DollarSign, CheckCircle, Star } from 'lucide-react';

const ProjectCollaborationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'find' | 'my-teams' | 'create'>('find');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<{
    skills: string[];
    projectSize: string[];
    projectDuration: string[];
    teamSize: string[];
  }>({
    skills: [],
    projectSize: [],
    projectDuration: [],
    teamSize: [],
  });
  
  // Sample collaboration projects
  const collaborationProjects = [
    {
      id: 1,
      title: 'E-commerce Platform Development',
      description: 'We\'re building a modern e-commerce platform with React, Node.js, and MongoDB. Looking for frontend developers, backend developers, and UX/UI designers.',
      skills: ['React', 'Node.js', 'MongoDB', 'UX/UI Design'],
      budget: '$8,000 - $15,000',
      duration: '3-4 months',
      teamSize: 5,
      currentMembers: 2,
      projectLead: {
        name: 'Alexandra Chen',
        role: 'Full Stack Developer',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 4.9,
        completedProjects: 37
      },
      postedDate: '2 days ago'
    },
    {
      id: 2,
      title: 'AI Content Recommendation Engine',
      description: 'Developing an AI-powered content recommendation system for a media company. Need machine learning specialists, Python developers, and data scientists.',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Science'],
      budget: '$12,000 - $20,000',
      duration: '2-3 months',
      teamSize: 4,
      currentMembers: 2,
      projectLead: {
        name: 'Marcus Williams',
        role: 'ML Engineer',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 4.8,
        completedProjects: 24
      },
      postedDate: '5 days ago'
    },
    {
      id: 3,
      title: 'Mobile App for Fitness Tracking',
      description: 'Creating a comprehensive fitness tracking app for iOS and Android. Looking for React Native developers, UI/UX designers, and backend developers.',
      skills: ['React Native', 'Firebase', 'UI/UX Design', 'Node.js'],
      budget: '$10,000 - $18,000',
      duration: '4-6 months',
      teamSize: 6,
      currentMembers: 3,
      projectLead: {
        name: 'Sophia Rodriguez',
        role: 'Product Manager',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        rating: 4.7,
        completedProjects: 19
      },
      postedDate: '1 week ago'
    }
  ];
  
  // Sample teams
  const myTeams = [
    {
      id: 1,
      name: 'Web3 Wallet Development',
      role: 'Frontend Developer',
      status: 'In Progress',
      completionPercentage: 65,
      members: 5,
      nextMeeting: 'Tomorrow, 10:00 AM',
      tasks: [
        { id: 1, title: 'Implement wallet connection', completed: true },
        { id: 2, title: 'Create transaction history UI', completed: true },
        { id: 3, title: 'Add token swap functionality', completed: false },
        { id: 4, title: 'Implement responsive design', completed: false }
      ],
      recentActivity: [
        { id: 1, user: 'John', action: 'added new task', time: '2 hours ago' },
        { id: 2, user: 'Sarah', action: 'completed UI designs', time: '1 day ago' }
      ]
    },
    {
      id: 2,
      name: 'Healthcare Management System',
      role: 'Backend Developer',
      status: 'In Progress',
      completionPercentage: 42,
      members: 8,
      nextMeeting: 'Friday, 3:00 PM',
      tasks: [
        { id: 1, title: 'Set up API endpoints', completed: true },
        { id: 2, title: 'Implement authentication', completed: true },
        { id: 3, title: 'Create database schema', completed: false },
        { id: 4, title: 'Develop patient record system', completed: false }
      ],
      recentActivity: [
        { id: 1, user: 'Alex', action: 'merged pull request', time: '5 hours ago' },
        { id: 2, user: 'You', action: 'completed API documentation', time: '2 days ago' }
      ]
    }
  ];

  // Toggle filter selections
  const toggleFilter = (category: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(item => item !== value);
      } else {
        newFilters[category] = [...newFilters[category], value];
      }
      return newFilters;
    });
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-r from-primary-500 to-purple-600">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Project Collaboration</h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Team up with other talented freelancers to take on bigger projects and expand your skillset
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveTab('find')}
                className="bg-white text-[#FF6B00] hover:bg-[#ffeee3] font-medium px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Search className="h-5 w-5 mr-2" />
                Find Collaboration Projects
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className="bg-transparent border border-white text-white hover:bg-white/10 font-medium px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Start New Collaboration
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="section-container">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white p-1 rounded-lg shadow-sm">
              <button
                onClick={() => setActiveTab('find')}
                className={`px-6 py-2 rounded-md font-medium ${
                  activeTab === 'find'
                    ? 'bg-[#FF6B00] text-white'
                    : 'text-[#2E2E2E] hover:bg-[#ffeee3]'
                } transition-colors duration-200`}
              >
                Find Projects
              </button>
              <button
                onClick={() => setActiveTab('my-teams')}
                className={`px-6 py-2 rounded-md font-medium ${
                  activeTab === 'my-teams'
                    ? 'bg-[#FF6B00] text-white'
                    : 'text-[#2E2E2E] hover:bg-[#ffeee3]'
                } transition-colors duration-200`}
              >
                My Teams
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`px-6 py-2 rounded-md font-medium ${
                  activeTab === 'create'
                    ? 'bg-[#FF6B00] text-white'
                    : 'text-[#2E2E2E] hover:bg-[#ffeee3]'
                } transition-colors duration-200`}
              >
                Create Project
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'find' && (
            <div>
              {/* Search and Filter */}
              <div className="max-w-5xl mx-auto mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-2/3">
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full bg-white border border-[#ffeee3] rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                        placeholder="Search for collaboration projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Search className="absolute left-4 top-3.5 h-5 w-5 text-[#ffeee3]" />
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 flex gap-4">
                    <div className="dropdown w-full">
                      <button className="w-full bg-white border border-[#ffeee3] rounded-lg px-4 py-3 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <span className="flex items-center text-[#2E2E2E]">
                          <Filter className="h-5 w-5 mr-2 text-[#ffeee3]" />
                          Filters
                        </span>
                        <span className={`${
                          Object.values(selectedFilters).some(arr => arr.length > 0)
                            ? 'bg-[#ffeee3] text-[#2E2E2E]'
                            : 'bg-[#ffeee3] text-[#2E2E2E]'
                          } text-xs rounded-full w-6 h-6 flex items-center justify-center`}>
                          {Object.values(selectedFilters).reduce((acc, arr) => acc + arr.length, 0)}
                        </span>
                      </button>
                      <div className="dropdown-menu hidden absolute bg-white mt-2 p-4 rounded-lg shadow-lg z-10 w-80">
                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-[#2E2E2E] mb-2">Skills</h3>
                          <div className="space-y-1">
                            {['React', 'Node.js', 'Python', 'UI/UX Design', 'Data Science', 'Mobile Development'].map((skill) => (
                              <div key={skill} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`skill-${skill}`}
                                  className="mr-2"
                                  checked={selectedFilters.skills.includes(skill)}
                                  onChange={() => toggleFilter('skills', skill)}
                                />
                                <label htmlFor={`skill-${skill}`} className="text-sm text-[#2E2E2E]">
                                  {skill}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-[#2E2E2E] mb-2">Project Size</h3>
                          <div className="space-y-1">
                            {['Small ($1k-$5k)', 'Medium ($5k-$15k)', 'Large ($15k+)'].map((size) => (
                              <div key={size} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`size-${size}`}
                                  className="mr-2"
                                  checked={selectedFilters.projectSize.includes(size)}
                                  onChange={() => toggleFilter('projectSize', size)}
                                />
                                <label htmlFor={`size-${size}`} className="text-sm text-[#2E2E2E]">
                                  {size}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-[#2E2E2E] mb-2">Duration</h3>
                          <div className="space-y-1">
                            {['Less than 1 month', '1-3 months', '3-6 months', '6+ months'].map((duration) => (
                              <div key={duration} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`duration-${duration}`}
                                  className="mr-2"
                                  checked={selectedFilters.projectDuration.includes(duration)}
                                  onChange={() => toggleFilter('projectDuration', duration)}
                                />
                                <label htmlFor={`duration-${duration}`} className="text-sm text-[#2E2E2E]">
                                  {duration}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-[#2E2E2E] mb-2">Team Size</h3>
                          <div className="space-y-1">
                            {['2-3 members', '4-6 members', '7+ members'].map((size) => (
                              <div key={size} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`team-${size}`}
                                  className="mr-2"
                                  checked={selectedFilters.teamSize.includes(size)}
                                  onChange={() => toggleFilter('teamSize', size)}
                                />
                                <label htmlFor={`team-${size}`} className="text-sm text-[#2E2E2E]">
                                  {size}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <button
                            className="text-sm text-[#ffeee3] hover:text-[#2E2E2E]"
                            onClick={() => setSelectedFilters({
                              skills: [],
                              projectSize: [],
                              projectDuration: [],
                              teamSize: [],
                            })}
                          >
                            Clear all
                          </button>
                          <button className="text-sm bg-[#FF6B00] text-white px-4 py-2 rounded hover:bg-[#2E2E2E]">
                            Apply Filters
                          </button>
                        </div>
                      </div>
                    </div>
                    <button className="bg-[#FF6B00] text-white hover:bg-[#2E2E2E] rounded-lg px-4 flex-shrink-0">
                      <Search className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Project Listing */}
              <div className="max-w-5xl mx-auto space-y-6">
                {collaborationProjects.map((project) => (
                  <div key={project.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl font-bold text-[#2E2E2E] mb-2">{project.title}</h2>
                        <span className="text-sm text-[#ffeee3]">{project.postedDate}</span>
                      </div>
                      <p className="text-[#2E2E2E] mb-4">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.skills.map((skill, idx) => (
                          <span key={idx} className="bg-[#ffeee3] text-[#2E2E2E] text-sm px-3 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center">
                          <DollarSign className="h-5 w-5 text-[#ffeee3] mr-2" />
                          <div>
                            <div className="text-sm text-[#ffeee3]">Budget</div>
                            <div className="font-medium">{project.budget}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-[#ffeee3] mr-2" />
                          <div>
                            <div className="text-sm text-[#ffeee3]">Duration</div>
                            <div className="font-medium">{project.duration}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-[#ffeee3] mr-2" />
                          <div>
                            <div className="text-sm text-[#ffeee3]">Team</div>
                            <div className="font-medium">
                              {project.currentMembers}/{project.teamSize} members
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-[#ffeee3]">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                            <img src={project.projectLead.avatar} alt={project.projectLead.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="font-medium">{project.projectLead.name}</div>
                            <div className="text-sm text-[#ffeee3]">
                              {project.projectLead.role} Â· {project.projectLead.rating} <Star className="inline-block h-3 w-3 text-[#FF9F45] fill-yellow-400" />
                            </div>
                          </div>
                        </div>
                        <button className="bg-[#FF6B00] hover:bg-[#2E2E2E] text-white px-5 py-2 rounded-lg flex items-center">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Apply to Join
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'my-teams' && (
            <div className="max-w-5xl mx-auto">
              {myTeams.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 mx-auto text-[#ffeee3] mb-4" />
                  <h3 className="text-2xl font-bold text-[#2E2E2E] mb-2">No active teams</h3>
                  <p className="text-[#ffeee3] mb-6">You haven't joined any collaboration projects yet</p>
                  <button
                    onClick={() => setActiveTab('find')}
                    className="bg-[#FF6B00] text-white hover:bg-[#2E2E2E] font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                  >
                    Find Projects to Join
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {myTeams.map(team => (
                    <div key={team.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div>
                            <h2 className="text-xl font-bold text-[#2E2E2E] mb-1">{team.name}</h2>
                            <div className="text-[#2E2E2E] mb-2">Your role: {team.role}</div>
                            <div className="flex items-center">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                team.status === 'Completed' ? 'bg-[#ffeee3] text-[#2E2E2E]' : 'bg-[#ffeee3] text-[#FF6B00]'
                              }`}>
                                {team.status}
                              </span>
                              <span className="text-sm text-[#ffeee3] mx-2">â€¢</span>
                              <span className="text-sm text-[#ffeee3]">{team.members} team members</span>
                            </div>
                          </div>
                          <div className="md:text-right mt-4 md:mt-0">
                            <div className="text-sm text-[#ffeee3] mb-1">Project Progress</div>
                            <div className="flex items-center md:justify-end">
                              <div className="w-full md:w-48 bg-[#ffeee3] rounded-full h-2.5 mr-2">
                                <div
                                  className="bg-[#FF6B00] h-2.5 rounded-full"
                                  style={{ width: `${team.completionPercentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-[#2E2E2E]">{team.completionPercentage}%</span>
                            </div>
                            <div className="flex items-center md:justify-end mt-2">
                              <Calendar className="h-4 w-4 text-[#ffeee3] mr-1" />
                              <span className="text-sm text-[#ffeee3]">Next meeting: {team.nextMeeting}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-medium mb-3">Your Tasks</h3>
                            <div className="space-y-2">
                              {team.tasks.map(task => (
                                <div key={task.id} className="flex items-center p-3 bg-[#ffeee3] rounded-lg">
                                  <div className={`h-5 w-5 rounded-full flex items-center justify-center mr-3 ${
                                    task.completed ? 'bg-[#ffeee3] text-[#FF6B00]' : 'bg-[#ffeee3] text-[#ffeee3]'
                                  }`}>
                                    {task.completed ? <CheckCircle className="h-4 w-4" /> : <div className="h-2 w-2 rounded-full bg-[#ffeee3]"></div>}
                                  </div>
                                  <span className={`${task.completed ? 'line-through text-[#ffeee3]' : 'text-[#2E2E2E]'}`}>
                                    {task.title}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium mb-3">Recent Activity</h3>
                            <div className="space-y-3">
                              {team.recentActivity.map(activity => (
                                <div key={activity.id} className="flex items-start">
                                  <div className="h-8 w-8 rounded-full bg-[#ffeee3] text-[#FF6B00] flex items-center justify-center mr-3 flex-shrink-0">
                                    {activity.user.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="text-[#2E2E2E]">
                                      <span className="font-medium">{activity.user}</span> {activity.action}
                                    </div>
                                    <div className="text-xs text-[#ffeee3]">{activity.time}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-6 pt-4 border-t border-[#ffeee3]">
                          <button className="text-[#2E2E2E] hover:text-[#2E2E2E] font-medium mr-4 flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            Team Space
                          </button>
                          <button className="bg-[#FF6B00] hover:bg-[#2E2E2E] text-white px-5 py-2 rounded-lg flex items-center">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Chat with Team
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'create' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Create New Collaboration Project</h2>
                
                <form>
                  <div className="mb-6">
                    <label htmlFor="project-title" className="block text-[#2E2E2E] font-medium mb-2">Project Title*</label>
                    <input
                      type="text"
                      id="project-title"
                      placeholder="E.g. E-commerce Platform Development, AI Chatbot Creation"
                      className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="project-description" className="block text-[#2E2E2E] font-medium mb-2">Project Description*</label>
                    <textarea
                      id="project-description"
                      rows={5}
                      placeholder="Describe the project in detail. What are you building? What problem does it solve? What skills are needed?"
                      className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-[#2E2E2E] font-medium mb-2">Project Budget*</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 py-3 text-[#ffeee3] bg-[#ffeee3] border border-r-0 border-[#ffeee3] rounded-l-lg">
                          $
                        </span>
                        <input
                          type="text"
                          placeholder="Min"
                          className="w-1/2 px-4 py-3 border border-[#ffeee3] focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <span className="inline-flex items-center px-3 py-3 text-[#ffeee3] border-t border-b border-[#ffeee3]">
                          -
                        </span>
                        <input
                          type="text"
                          placeholder="Max"
                          className="w-1/2 px-4 py-3 border border-[#ffeee3] rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[#2E2E2E] font-medium mb-2">Project Duration*</label>
                      <select className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                        <option>Less than 1 month</option>
                        <option>1-3 months</option>
                        <option>3-6 months</option>
                        <option>6+ months</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-[#2E2E2E] font-medium mb-2">Required Skills*</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {['React', 'Node.js'].map((skill) => (
                        <span key={skill} className="inline-flex items-center bg-[#ffeee3] text-[#2E2E2E] text-sm px-3 py-1 rounded-full">
                          {skill}
                          <button className="ml-1 text-[#FF6B00] hover:text-[#2E2E2E]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Add skills (e.g. React, Python, UI Design)"
                        className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button className="ml-2 px-4 py-3 bg-[#ffeee3] text-[#FF6B00] rounded-lg">
                        Add
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-[#2E2E2E] font-medium mb-2">Team Size*</label>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="px-3 py-1 bg-[#ffeee3] text-[#2E2E2E] rounded-l-lg border border-[#ffeee3]"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        defaultValue="4"
                        className="w-16 text-center py-1 border-t border-b border-[#ffeee3]"
                      />
                      <button
                        type="button"
                        className="px-3 py-1 bg-[#ffeee3] text-[#2E2E2E] rounded-r-lg border border-[#ffeee3]"
                      >
                        +
                      </button>
                      <span className="ml-3 text-[#ffeee3]">team members (including you)</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-[#2E2E2E] font-medium mb-2">Roles Needed</label>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="text"
                          placeholder="Role (e.g. Frontend Developer, UI Designer)"
                          className="w-1/2 px-4 py-3 border border-[#ffeee3] rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                          type="number"
                          placeholder="How many?"
                          className="w-1/4 px-4 py-3 border-t border-b border-[#ffeee3] focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                          type="button"
                          className="w-1/4 px-4 py-3 bg-[#ffeee3] text-[#FF6B00] rounded-r-lg"
                        >
                          Add Role
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-[#2E2E2E] font-medium mb-2">Project Visibility</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="public"
                          name="visibility"
                          className="mr-2"
                          defaultChecked
                        />
                        <label htmlFor="public">
                          <div className="font-medium">Public</div>
                          <div className="text-sm text-[#ffeee3]">Anyone can find and apply to join your project</div>
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="private"
                          name="visibility"
                          className="mr-2"
                        />
                        <label htmlFor="private">
                          <div className="font-medium">Private</div>
                          <div className="text-sm text-[#ffeee3]">Only people you invite can join your project</div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-[#ffeee3] pt-6 flex justify-end">
                    <button
                      type="button"
                      className="bg-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3] font-medium px-6 py-3 rounded-lg transition-colors duration-200 mr-4"
                    >
                      Save as Draft
                    </button>
                    <button
                      type="submit"
                      className="bg-[#FF6B00] text-white hover:bg-[#2E2E2E] font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                    >
                      Create Project
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">Benefits of Project Collaboration</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-[#FF6B00] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Access Larger Projects</h3>
                <p className="text-[#2E2E2E]">
                  Join forces with other skilled freelancers to tackle larger, higher-value projects that would be difficult to handle alone.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-[#FF6B00] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Learn New Skills</h3>
                <p className="text-[#2E2E2E]">
                  Collaborate with professionals from different backgrounds and expand your knowledge by working alongside experts in complementary fields.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-[#FF6B00] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Expand Your Network</h3>
                <p className="text-[#2E2E2E]">
                  Build lasting professional relationships with other freelancers that can lead to more work opportunities and referrals in the future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#FF6B00] text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Collaborate?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join forces with other talented professionals to tackle exciting projects and grow your freelance career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveTab('find')}
                className="bg-white text-[#FF6B00] hover:bg-[#ffeee3] font-medium px-8 py-4 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Search className="h-5 w-5 mr-2" />
                Find Projects Now
              </button>
              <Link to="/ways-to-earn" className="bg-transparent border border-white text-white hover:bg-white/10 font-medium px-8 py-4 rounded-lg text-lg transition-colors duration-200 inline-block">
                Explore More Ways to Earn
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectCollaborationPage;















