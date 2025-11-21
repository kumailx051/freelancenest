import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FirestoreService } from '../../lib/firestoreService';
import { useAuth } from '../../contexts/AuthContext';
import { CheckCircle, AlertCircle } from 'lucide-react';

const MyJobsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();
  const location = useLocation();

  // Check for success message from job posting
  useEffect(() => {
    if (location.state?.message) {
      // You could show a toast notification here
      console.log(location.state.message);
    }
  }, [location]);

  // Load jobs from Firebase
  useEffect(() => {
    const loadJobs = async () => {
      if (!currentUser) {
        console.log('No current user, skipping job load');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log('Loading jobs for client:', currentUser.uid);
        console.log('Current user email:', currentUser.email);
        
        // Test basic Firestore connectivity
        console.log('Testing Firestore connectivity...');
        
        const clientJobs = await FirestoreService.getClientJobs(currentUser.uid);
        console.log('Loaded client jobs:', clientJobs);
        console.log('Number of jobs found:', clientJobs.length);
        
        setJobs(clientJobs || []);
        
        if (!clientJobs || clientJobs.length === 0) {
          console.log('No jobs found for client - this is normal if no jobs have been created yet');
        }
      } catch (error) {
        console.error('Error loading jobs:', error);
        console.error('Error details:', {
          name: error instanceof Error ? error.name : 'Unknown',
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : 'No stack trace'
        });
        setError(`Failed to load jobs: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to ensure currentUser is fully loaded
    const timeoutId = setTimeout(loadJobs, 100);
    return () => clearTimeout(timeoutId);
  }, [currentUser]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      case 'review':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: any) => {
    if (!date) return 'Unknown';
    
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - dateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const filteredJobs = jobs.filter(job => 
    filterStatus === 'all' || job.status?.toLowerCase() === filterStatus.toLowerCase()
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
            <h3 className="font-semibold text-[#2E2E2E] mb-1">{job.title || 'Untitled Job'}</h3>
            <p className="text-sm text-[#2E2E2E]/60">
              {job.budget || 'Budget not set'} • {job.applicants?.length || 0} applications
            </p>
            {job.category && (
              <p className="text-xs text-[#FF6B00] mt-1">{job.category}</p>
            )}
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
          {job.status || 'Draft'}
        </span>
      </div>
      
      {job.description && (
        <div className="mb-4">
          <p className="text-sm text-[#2E2E2E]/80 line-clamp-2">{job.description}</p>
        </div>
      )}

      {job.skills && job.skills.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {job.skills.slice(0, 3).map((skill: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-[#ffeee3] text-[#2E2E2E] text-xs rounded">
                {skill}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="px-2 py-1 bg-[#ffeee3] text-[#2E2E2E] text-xs rounded">
                +{job.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between pt-4 border-t border-[#ffeee3]">
        <div className="text-sm text-[#2E2E2E]/60">
          Posted {formatDate(job.createdAt)} • {job.timeline || 'Timeline not set'}
        </div>
        <div className="flex items-center space-x-2">
          <Link 
            to={`/client/job/${job.id}`}
            className="text-[#FF6B00] hover:text-[#FF9F45] text-sm font-medium"
          >
            View Details
          </Link>
          {job.status === 'draft' && (
            <Link 
              to={`/client/post-job?edit=${job.id}`}
              className="text-[#2E2E2E]/60 hover:text-[#2E2E2E] text-sm font-medium"
            >
              Edit
            </Link>
          )}
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
            
            {/* Success Message */}
            {location.state?.message && (
              <div className="mb-6 flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <p className="text-green-800">{location.state.message}</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="mb-6 flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                  <p className="text-red-800">{error}</p>
                </div>
                <button
                  onClick={() => {
                    if (currentUser) {
                      setError(null);
                      const loadJobs = async () => {
                        try {
                          setLoading(true);
                          const clientJobs = await FirestoreService.getClientJobs(currentUser.uid);
                          setJobs(clientJobs || []);
                        } catch (error) {
                          console.error('Retry failed:', error);
                          setError(`Failed to load jobs: ${error instanceof Error ? error.message : 'Unknown error'}`);
                        } finally {
                          setLoading(false);
                        }
                      };
                      loadJobs();
                    }
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-medium"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00] mx-auto mb-4"></div>
                <p className="text-[#2E2E2E]/60">Loading your jobs...</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-[#2E2E2E]/40 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-[#2E2E2E] mb-2">
                  {filterStatus === 'all' ? 'No jobs found' : `No ${filterStatus} jobs found`}
                </h3>
                <p className="text-[#2E2E2E]/60 mb-6">
                  {filterStatus === 'all' 
                    ? "You haven't posted any jobs yet. Start by creating your first job post."
                    : `You don't have any ${filterStatus} jobs at the moment.`
                  }
                </p>
                {filterStatus === 'all' && (
                  <Link 
                    to="/client/post-job"
                    className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Post Your First Job
                  </Link>
                )}
              </div>
            ) : (
              <>
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
                              {job.title || 'Untitled Job'}
                            </Link>
                          </div>
                          <div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                              {job.status || 'Draft'}
                            </span>
                          </div>
                          <div className="text-[#2E2E2E]/80">{job.budget || 'Not set'}</div>
                          <div className="text-[#2E2E2E]/80">{job.applicants?.length || 0}</div>
                          <div className="text-[#2E2E2E]/80">{formatDate(job.createdAt)}</div>
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
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyJobsPage;
