import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  DollarSign, 
  Star, 
  MapPin, 
  Calendar,
  Users,
  Eye,
  Bookmark,
  Share2,
  Flag,
  CheckCircle,
  TrendingUp,
  Award,
  MessageSquare,
  ArrowLeft,
  Shield,
  CreditCard,
  Briefcase
} from 'lucide-react';

const JobDetails: React.FC = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock job data - in real app, fetch based on id
  const job = {
    id: 1,
    title: 'Full Stack React Developer for E-commerce Platform',
    description: `We are looking for an experienced React developer to build a modern e-commerce platform with advanced features. This is a comprehensive project that will involve both frontend and backend development.

The ideal candidate should have extensive experience with React, Node.js, and modern web technologies. You'll be working on creating a scalable, user-friendly platform that can handle high traffic and complex transactions.

Key responsibilities include:
- Developing responsive frontend components using React and TypeScript
- Building robust backend APIs with Node.js and Express
- Implementing secure payment processing with Stripe
- Creating efficient database schemas with MongoDB
- Ensuring optimal performance and security
- Writing comprehensive tests and documentation

We value clean code, attention to detail, and the ability to work independently while meeting deadlines. This is a great opportunity to work on a cutting-edge project with potential for long-term collaboration.`,
    
    client: {
      name: 'TechCorp Solutions',
      location: 'United States',
      rating: 4.8,
      reviewsCount: 127,
      verified: true,
      paymentVerified: true,
      memberSince: 'January 2020',
      totalSpent: '$125,000',
      hireRate: '92%',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&h=160&fit=crop&crop=face&auto=format',
      about: 'TechCorp Solutions is a leading software development company specializing in enterprise solutions and e-commerce platforms. We work with clients ranging from startups to Fortune 500 companies.',
      recentProjects: 24
    },
    
    budget: {
      type: 'fixed',
      min: 3000,
      max: 5000,
      currency: 'USD'
    },
    
    timeline: {
      duration: '2-3 months',
      startDate: 'ASAP',
      commitment: 'Part-time (20-30 hrs/week)'
    },
    
    requirements: {
      experienceLevel: 'Expert',
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS', 'Stripe API', 'Express.js', 'REST API'],
      languages: ['English (Native or Fluent)'],
      certifications: [],
      portfolio: true
    },
    
    projectDetails: {
      category: 'Web Development',
      subcategory: 'Full Stack Development',
      projectType: 'Ongoing project',
      complexity: 'Complex',
      attachments: [
        { name: 'Project Requirements.pdf', size: '2.4 MB' },
        { name: 'Wireframes.fig', size: '15.2 MB' },
        { name: 'Brand Guidelines.pdf', size: '3.1 MB' }
      ]
    },
    
    activity: {
      postedTime: '2 hours ago',
      lastViewed: '30 minutes ago',
      proposals: 12,
      messaged: 3,
      hired: 0,
      interviewing: 2
    },
    
    similar: [
      {
        id: 2,
        title: 'React Developer for SaaS Platform',
        budget: '$2,500 - $4,000',
        proposals: 8
      },
      {
        id: 3,
        title: 'Full Stack Developer - E-learning Platform',
        budget: '$3,500 - $6,000',
        proposals: 15
      }
    ],
    
    fitScore: 95,
    whyMatch: [
      'Your React expertise matches perfectly',
      'Strong background in e-commerce development',
      'Experience with similar budget range',
      'Client preference for your skill set'
    ]
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link 
            to="/freelancer/job-feed"
            className="inline-flex items-center text-[#FF6B00] hover:text-[#FF9F45] font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Job Feed
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-[#2E2E2E] mb-2">{job.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-[#2E2E2E]/60">
                    <span>Posted {job.activity.postedTime}</span>
                    <span>•</span>
                    <span>{job.projectDetails.category}</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {job.activity.proposals} proposals
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleBookmark}
                    className={`p-2 rounded-lg transition-colors ${
                      isBookmarked
                        ? 'text-[#FF6B00] bg-[#ffeee3]'
                        : 'text-gray-400 hover:text-[#FF6B00] hover:bg-[#ffeee3]'
                    }`}
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Flag className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Key Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-[#ffeee3]/50 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign className="w-5 h-5 text-[#FF6B00]" />
                  </div>
                  <p className="text-lg font-semibold text-[#2E2E2E]">
                    ${job.budget.min.toLocaleString()} - ${job.budget.max.toLocaleString()}
                  </p>
                  <p className="text-sm text-[#2E2E2E]/60">Fixed Price</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 text-[#FF6B00]" />
                  </div>
                  <p className="text-lg font-semibold text-[#2E2E2E]">{job.timeline.duration}</p>
                  <p className="text-sm text-[#2E2E2E]/60">Duration</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="w-5 h-5 text-[#FF6B00]" />
                  </div>
                  <p className="text-lg font-semibold text-[#2E2E2E]">{job.requirements.experienceLevel}</p>
                  <p className="text-sm text-[#2E2E2E]/60">Experience</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Calendar className="w-5 h-5 text-[#FF6B00]" />
                  </div>
                  <p className="text-lg font-semibold text-[#2E2E2E]">{job.timeline.startDate}</p>
                  <p className="text-sm text-[#2E2E2E]/60">Start Date</p>
                </div>
              </div>

              {/* AI Match Score */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-[#2E2E2E] flex items-center">
                    <Award className="w-5 h-5 text-green-600 mr-2" />
                    AI Match Score: {job.fitScore}%
                  </h3>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Excellent Match
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {job.whyMatch.map((reason, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-[#2E2E2E]">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apply Section */}
              <div className="flex space-x-4">
                <Link
                  to={`/freelancer/proposal-composer?job=${job.id}`}
                  className="flex-1 bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium py-3 px-6 rounded-lg transition-colors text-center"
                >
                  Apply Now
                </Link>
                <Link
                  to={`/freelancer/proposal-composer?job=${job.id}&ai=true`}
                  className="flex-1 border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] font-medium py-3 px-6 rounded-lg transition-colors text-center"
                >
                  Draft with AI
                </Link>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-[#2E2E2E] mb-4">Project Description</h2>
              <div className="prose prose-gray max-w-none">
                {job.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-[#2E2E2E]/80 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Skills Required */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-[#2E2E2E] mb-4">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-3">
                {job.requirements.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-[#ffeee3] text-[#FF6B00] rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Attachments */}
            {job.projectDetails.attachments.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-[#2E2E2E] mb-4">Project Files</h2>
                <div className="space-y-3">
                  {job.projectDetails.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#ffeee3] rounded-lg flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-[#FF6B00]" />
                        </div>
                        <div>
                          <p className="font-medium text-[#2E2E2E]">{file.name}</p>
                          <p className="text-sm text-[#2E2E2E]/60">{file.size}</p>
                        </div>
                      </div>
                      <button className="text-[#FF6B00] hover:text-[#FF9F45] font-medium">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Similar Jobs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-[#2E2E2E] mb-4">Similar Jobs</h2>
              <div className="space-y-4">
                {job.similar.map((similarJob) => (
                  <div key={similarJob.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#FF6B00] transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-[#2E2E2E] hover:text-[#FF6B00] cursor-pointer">
                          {similarJob.title}
                        </h3>
                        <p className="text-sm text-[#2E2E2E]/60">
                          {similarJob.budget} • {similarJob.proposals} proposals
                        </p>
                      </div>
                      <Link
                        to={`/freelancer/job-details/${similarJob.id}`}
                        className="text-[#FF6B00] hover:text-[#FF9F45] font-medium text-sm"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">About the Client</h3>
              
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={job.client.avatar}
                  alt={job.client.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-[#2E2E2E]">{job.client.name}</h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-[#2E2E2E]/60 ml-1">
                        {job.client.rating} ({job.client.reviewsCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#FF6B00]" />
                  <span className="text-sm text-[#2E2E2E]/80">{job.client.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#FF6B00]" />
                  <span className="text-sm text-[#2E2E2E]/80">Member since {job.client.memberSince}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-[#FF6B00]" />
                  <span className="text-sm text-[#2E2E2E]/80">{job.client.totalSpent} total spent</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-[#FF6B00]" />
                  <span className="text-sm text-[#2E2E2E]/80">{job.client.recentProjects} recent projects</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                {job.client.verified && (
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">Verified</span>
                  </div>
                )}
                {job.client.paymentVerified && (
                  <div className="flex items-center space-x-1">
                    <CreditCard className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-blue-600 font-medium">Payment Verified</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-[#2E2E2E]/70 mb-4">{job.client.about}</p>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-[#ffeee3] rounded-lg">
                  <p className="text-lg font-semibold text-[#2E2E2E]">{job.client.hireRate}</p>
                  <p className="text-xs text-[#2E2E2E]/60">Hire Rate</p>
                </div>
                <div className="p-3 bg-[#ffeee3] rounded-lg">
                  <p className="text-lg font-semibold text-[#2E2E2E]">{job.activity.interviewing}</p>
                  <p className="text-xs text-[#2E2E2E]/60">Interviewing</p>
                </div>
              </div>
            </div>

            {/* Job Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Job Activity</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-[#2E2E2E]/60">Proposals</span>
                  <span className="text-sm font-medium text-[#2E2E2E]">{job.activity.proposals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#2E2E2E]/60">Last viewed</span>
                  <span className="text-sm font-medium text-[#2E2E2E]">{job.activity.lastViewed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#2E2E2E]/60">Interviewing</span>
                  <span className="text-sm font-medium text-[#2E2E2E]">{job.activity.interviewing}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#2E2E2E]/60">Hired</span>
                  <span className="text-sm font-medium text-[#2E2E2E]">{job.activity.hired}</span>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Project Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-[#2E2E2E]/60">Category</p>
                  <p className="text-sm font-medium text-[#2E2E2E]">{job.projectDetails.category}</p>
                </div>
                <div>
                  <p className="text-sm text-[#2E2E2E]/60">Subcategory</p>
                  <p className="text-sm font-medium text-[#2E2E2E]">{job.projectDetails.subcategory}</p>
                </div>
                <div>
                  <p className="text-sm text-[#2E2E2E]/60">Project Type</p>
                  <p className="text-sm font-medium text-[#2E2E2E]">{job.projectDetails.projectType}</p>
                </div>
                <div>
                  <p className="text-sm text-[#2E2E2E]/60">Complexity</p>
                  <p className="text-sm font-medium text-[#2E2E2E]">{job.projectDetails.complexity}</p>
                </div>
              </div>
            </div>

            {/* Contact Client */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <button className="w-full bg-[#ffeee3] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Message Client
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
