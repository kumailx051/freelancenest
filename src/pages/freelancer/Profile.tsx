import React, { useState } from 'react';
import { 
  Camera,
  MapPin,
  Mail,
  Phone,
  Globe,
  Star,
  DollarSign,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  ExternalLink,
  Clock,
  Users,
  CheckCircle,
  Settings,
  Eye,
  Share2
} from 'lucide-react';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    title: 'Senior Full Stack Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face&auto=format',
    location: 'San Francisco, CA',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    website: 'alexjohnson.dev',
    timezone: 'PST (UTC-8)',
    bio: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies. I love turning complex problems into simple, beautiful solutions.',
    hourlyRate: 75,
    availability: 'Available',
    languages: ['English (Native)', 'Spanish (Conversational)', 'French (Basic)'],
    responseTime: '2 hours',
    completionRate: 98
  });

  const skills = [
    { name: 'React', level: 95, category: 'Frontend' },
    { name: 'Node.js', level: 90, category: 'Backend' },
    { name: 'TypeScript', level: 88, category: 'Language' },
    { name: 'Python', level: 85, category: 'Language' },
    { name: 'MongoDB', level: 82, category: 'Database' },
    { name: 'PostgreSQL', level: 80, category: 'Database' },
    { name: 'AWS', level: 78, category: 'Cloud' },
    { name: 'Docker', level: 75, category: 'DevOps' }
  ];

  const certifications = [
    {
      id: 1,
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2024-06-15',
      credentialId: 'AWS-CSA-2024-001',
      verified: true
    },
    {
      id: 2,
      name: 'React Developer Certification',
      issuer: 'Meta',
      date: '2024-03-20',
      credentialId: 'META-REACT-2024-078',
      verified: true
    },
    {
      id: 3,
      name: 'Professional Scrum Master I',
      issuer: 'Scrum.org',
      date: '2023-11-10',
      credentialId: 'PSM-I-2023-4567',
      verified: true
    }
  ];

  const education = [
    {
      id: 1,
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Stanford University',
      year: '2015-2019',
      description: 'Graduated Magna Cum Laude with focus on Software Engineering and AI'
    },
    {
      id: 2,
      degree: 'Full Stack Web Development Bootcamp',
      institution: 'General Assembly',
      year: '2019',
      description: 'Intensive 12-week program covering modern web development technologies'
    }
  ];

  const workExperience = [
    {
      id: 1,
      position: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      duration: '2021 - Present',
      description: 'Lead development of microservices architecture serving 1M+ users. Mentored junior developers and improved system performance by 40%.'
    },
    {
      id: 2,
      position: 'Full Stack Developer',
      company: 'StartupXYZ',
      duration: '2019 - 2021',
      description: 'Built and maintained React/Node.js applications. Implemented CI/CD pipelines and reduced deployment time by 60%.'
    }
  ];

  const stats = {
    totalEarnings: 156890,
    completedProjects: 47,
    clientSatisfaction: 4.9,
    repeatClients: 85,
    onTimeDelivery: 98,
    avgProjectValue: 3340
  };

  const getSkillColor = (category: string) => {
    switch (category) {
      case 'Frontend':
        return 'bg-blue-100 text-blue-700';
      case 'Backend':
        return 'bg-green-100 text-green-700';
      case 'Language':
        return 'bg-purple-100 text-purple-700';
      case 'Database':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cloud':
        return 'bg-cyan-100 text-cyan-700';
      case 'DevOps':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'skills', label: 'Skills & Expertise' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' }
  ];

  return (
    <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-[#FF6B00] to-[#FF9F45] relative">
            <div className="absolute top-4 right-4 flex space-x-2">
              <button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                <Share2 className="w-4 h-4 mr-2" />
                Share Profile
              </button>
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 -mt-16">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-32 h-32 rounded-xl border-4 border-white shadow-lg object-cover"
                />
                <button className="absolute bottom-2 right-2 bg-[#FF6B00] hover:bg-[#FF9F45] text-white p-2 rounded-lg shadow-lg transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Basic Info */}
              <div className="flex-1 mt-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-[#2E2E2E] mb-1">{profile.name}</h1>
                    <p className="text-xl text-[#2E2E2E]/70 mb-2">{profile.title}</p>
                    <div className="flex items-center space-x-4 text-sm text-[#2E2E2E]/60">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {profile.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {profile.timezone}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        {stats.clientSatisfaction} ({stats.completedProjects} reviews)
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-4 sm:mt-0">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                    <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-[#ffeee3] p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-[#2E2E2E]">${profile.hourlyRate}</div>
                    <div className="text-sm text-[#2E2E2E]/60">Hourly Rate</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-[#2E2E2E]">{profile.completionRate}%</div>
                    <div className="text-sm text-[#2E2E2E]/60">Job Success</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-[#2E2E2E]">{stats.completedProjects}</div>
                    <div className="text-sm text-[#2E2E2E]/60">Projects</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-[#2E2E2E]">{profile.responseTime}</div>
                    <div className="text-sm text-[#2E2E2E]/60">Response Time</div>
                  </div>
                </div>
              </div>
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
                {/* Bio */}
                <div>
                  <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">About Me</h3>
                  {isEditing ? (
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent resize-none"
                      rows={4}
                    />
                  ) : (
                    <p className="text-[#2E2E2E]/70 leading-relaxed">{profile.bio}</p>
                  )}
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-[#FF6B00]" />
                        <span className="text-[#2E2E2E]">{profile.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-[#FF6B00]" />
                        <span className="text-[#2E2E2E]">{profile.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-[#FF6B00]" />
                        <a href={`https://${profile.website}`} className="text-[#FF6B00] hover:text-[#FF9F45]">
                          {profile.website}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">Languages</h3>
                    <div className="space-y-2">
                      {profile.languages.map((language, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-[#2E2E2E]">{language}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Performance Stats */}
                <div>
                  <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">Performance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#ffeee3] p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#2E2E2E]/70">Total Earnings</span>
                        <DollarSign className="w-4 h-4 text-[#FF6B00]" />
                      </div>
                      <p className="text-2xl font-bold text-[#2E2E2E]">${stats.totalEarnings.toLocaleString()}</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#2E2E2E]/70">On-Time Delivery</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-[#2E2E2E]">{stats.onTimeDelivery}%</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#2E2E2E]/70">Repeat Clients</span>
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold text-[#2E2E2E]">{stats.repeatClients}%</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[#2E2E2E]">Skills & Expertise</h3>
                  {isEditing && (
                    <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Skill
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium text-[#2E2E2E]">{skill.name}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillColor(skill.category)}`}>
                            {skill.category}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-[#2E2E2E]">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[#FF6B00] to-[#FF9F45] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[#2E2E2E]">Work Experience</h3>
                  {isEditing && (
                    <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Experience
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {workExperience.map((exp) => (
                    <div key={exp.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-[#2E2E2E]">{exp.position}</h4>
                          <p className="text-[#FF6B00] font-medium">{exp.company}</p>
                          <p className="text-sm text-[#2E2E2E]/60">{exp.duration}</p>
                        </div>
                        {isEditing && (
                          <div className="flex space-x-2">
                            <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-[#2E2E2E]/60 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="text-[#2E2E2E]/70">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Tab */}
            {activeTab === 'education' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[#2E2E2E]">Education</h3>
                  {isEditing && (
                    <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Education
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-[#2E2E2E]">{edu.degree}</h4>
                          <p className="text-[#FF6B00] font-medium">{edu.institution}</p>
                          <p className="text-sm text-[#2E2E2E]/60">{edu.year}</p>
                        </div>
                        {isEditing && (
                          <div className="flex space-x-2">
                            <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-[#2E2E2E]/60 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="text-[#2E2E2E]/70">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications Tab */}
            {activeTab === 'certifications' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[#2E2E2E]">Certifications</h3>
                  {isEditing && (
                    <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Certification
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-[#2E2E2E]">{cert.name}</h4>
                            {cert.verified && (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                          <p className="text-[#FF6B00] font-medium mb-1">{cert.issuer}</p>
                          <p className="text-sm text-[#2E2E2E]/60 mb-1">Issued: {cert.date}</p>
                          <p className="text-xs text-[#2E2E2E]/50">ID: {cert.credentialId}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          {isEditing && (
                            <>
                              <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-[#2E2E2E]/60 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save Button when editing */}
            {isEditing && (
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setIsEditing(false)}
                  className="border border-gray-300 text-[#2E2E2E] hover:bg-gray-50 px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
