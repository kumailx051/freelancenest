import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyJobsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample job data
  const jobs = [
    {
      id: '1',
      title: 'E-commerce Website Development',
      status: 'Active',
      budget: '$2,500',
      proposals: 12,
      postedDate: '2 days ago',
      deadline: '2 weeks',
      freelancer: 'John Smith',
      progress: 65
    },
    {
      id: '2',
      title: 'Mobile App UI/UX Design',
      status: 'In Progress',
      budget: '$1,800',
      proposals: 8,
      postedDate: '1 week ago',
      deadline: '10 days',
      freelancer: 'Sarah Johnson',
      progress: 30
    },
    {
      id: '3',
      title: 'Content Writing for Blog',
      status: 'Completed',
      budget: '$500',
      proposals: 15,
      postedDate: '3 weeks ago',
      deadline: 'Completed',
      freelancer: 'Mike Brown',
      progress: 100
    },
    {
      id: '4',
      title: 'Logo Design Project',
      status: 'Review',
      budget: '$300',
      proposals: 6,
      postedDate: '5 days ago',
      deadline: '3 days',
      freelancer: 'Emma Davis',
      progress: 90
    },
    {
      id: '5',
      title: 'Social Media Marketing',
      status: 'Draft',
      budget: '$1,200',
      proposals: 0,
      postedDate: 'Draft',
      deadline: 'Not set',
      freelancer: null,
      progress: 0
    }
  ];

  const statusColors: { [key: string]: string } = {
    'Active': 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Completed': 'bg-green-100 text-green-800',
    'Review': 'bg-purple-100 text-purple-800',
    'Draft': 'bg-gray-100 text-gray-800',
    'Paused': 'bg-orange-100 text-orange-800'
  };

  const filteredJobs = filterStatus === 'all' ? jobs : jobs.filter(job => 
    job.status.toLowerCase() === filterStatus.toLowerCase()
  );

  const handleSelectJob = (jobId: string) => {
    setSelectedJobs(prev => 
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleSelectAll = () => {
    setSelectedJobs(
      selectedJobs.length === filteredJobs.length 
        ? [] 
        : filteredJobs.map(job => job.id)
    );
  };

  const JobCard = ({ job }: { job: any }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3] hover:border-[#FF6B00] transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={selectedJobs.includes(job.id)}
            onChange={() => handleSelectJob(job.id)}
            className="mt-1 h-4 w-4 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
          />
          <div>
            <h3 className="font-semibold text-[#2E2E2E] mb-1">{job.title}</h3>
            <p className="text-sm text-[#2E2E2E]/60">{job.budget} • {job.proposals} proposals</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
          {job.status}
        </span>
      </div>
      
      {job.freelancer && (
        <div className="mb-4">
          <p className="text-sm text-[#2E2E2E]/60 mb-2">Assigned to: <span className="font-medium text-[#2E2E2E]">{job.freelancer}</span></p>
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-[#2E2E2E]/60">Progress</span>
                <span className="font-medium text-[#2E2E2E]">{job.progress}%</span>
              </div>
              <div className="w-full bg-[#ffeee3] rounded-full h-2">
                <div 
                  className="bg-[#FF6B00] h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${job.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between pt-4 border-t border-[#ffeee3]">
        <div className="text-sm text-[#2E2E2E]/60">
          Posted {job.postedDate} • Due {job.deadline}
        </div>
        <div className="flex items-center space-x-2">
          <Link 
            to={`/client/job/${job.id}`}
            className="text-[#FF6B00] hover:text-[#FF9F45] text-sm font-medium"
          >
            View Details
          </Link>
          <button className="text-[#2E2E2E]/60 hover:text-[#2E2E2E] text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">My Jobs</h1>
                <p className="text-xl text-[#ffeee3] mb-6 md:mb-0">
                  Manage all your job posts and track their progress in one place.
                </p>
              </div>
              <Link 
                to="/client/post-job"
                className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                Post New Job
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="py-8 bg-white border-b border-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              {/* View Toggle */}
              <div className="flex items-center space-x-4">
                <div className="flex bg-[#ffeee3] rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-[#FF6B00] text-white' 
                        : 'text-[#2E2E2E] hover:bg-[#FF6B00] hover:text-white'
                    }`}
                  >
                    List View
                  </button>
                  <button
                    onClick={() => setViewMode('board')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'board' 
                        ? 'bg-[#FF6B00] text-white' 
                        : 'text-[#2E2E2E] hover:bg-[#FF6B00] hover:text-white'
                    }`}
                  >
                    Board View
                  </button>
                </div>

                {/* Bulk Actions */}
                {selectedJobs.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-[#2E2E2E]/60">
                      {selectedJobs.length} selected
                    </span>
                    <button className="px-3 py-1 bg-[#FF6B00] text-white text-sm rounded-md hover:bg-[#FF9F45] transition-colors">
                      Archive
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors">
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="review">Review</option>
                  <option value="draft">Draft</option>
                </select>
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    className="pl-10 pr-4 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-[#2E2E2E]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            
            {viewMode === 'list' ? (
              <div>
                {/* Table Header */}
                <div className="bg-white rounded-t-xl border border-[#ffeee3] p-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedJobs.length === filteredJobs.length && filteredJobs.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                    />
                    <div className="flex-1 grid grid-cols-6 gap-4 text-sm font-medium text-[#2E2E2E]/80">
                      <div>Job Title</div>
                      <div>Status</div>
                      <div>Budget</div>
                      <div>Proposals</div>
                      <div>Posted</div>
                      <div>Actions</div>
                    </div>
                  </div>
                </div>

                {/* Table Body */}
                <div className="bg-white rounded-b-xl border-x border-b border-[#ffeee3] divide-y divide-[#ffeee3]">
                  {filteredJobs.map((job) => (
                    <div key={job.id} className="p-4 hover:bg-[#ffeee3]/30 transition-colors">
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedJobs.includes(job.id)}
                          onChange={() => handleSelectJob(job.id)}
                          className="h-4 w-4 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                        />
                        <div className="flex-1 grid grid-cols-6 gap-4 text-sm">
                          <div>
                            <Link to={`/client/job/${job.id}`} className="font-medium text-[#2E2E2E] hover:text-[#FF6B00]">
                              {job.title}
                            </Link>
                          </div>
                          <div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                              {job.status}
                            </span>
                          </div>
                          <div className="text-[#2E2E2E]/80">{job.budget}</div>
                          <div className="text-[#2E2E2E]/80">{job.proposals}</div>
                          <div className="text-[#2E2E2E]/80">{job.postedDate}</div>
                          <div>
                            <Link 
                              to={`/client/job/${job.id}`}
                              className="text-[#FF6B00] hover:text-[#FF9F45] font-medium"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Board View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-[#2E2E2E]/40 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-[#2E2E2E] mb-2">No jobs found</h3>
                <p className="text-[#2E2E2E]/60 mb-6">You haven't posted any jobs yet. Start by creating your first job post.</p>
                <Link 
                  to="/client/post-job"
                  className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Post Your First Job
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyJobsPage;
