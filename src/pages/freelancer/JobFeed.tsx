import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Heart,
  MapPin,
  Clock,
  DollarSign,
  Eye,
  Send,
  Briefcase
} from 'lucide-react';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  skills: string[];
  budget: {
    type: string;
    amount?: number;
    min?: number;
    max?: number;
  };
  duration: string;
  experienceLevel: string;
  location?: string;
  postedDate: any;
  clientId: string;
  clientName?: string;
  clientAvatar?: string;
  status: string;
  proposalsCount?: number;
}

const JobFeed: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [bookmarkedJobs, setBookmarkedJobs] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Mobile Development', label: 'Mobile Development' },
    { value: 'Design & Creative', label: 'Design & Creative' },
    { value: 'Writing & Content', label: 'Writing & Content' },
    { value: 'Digital Marketing', label: 'Digital Marketing' },
    { value: 'Data Science', label: 'Data Science & Analytics' },
    { value: 'Video & Animation', label: 'Video & Animation' }
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterAndSortProjects();
  }, [projects, searchQuery, selectedCategory, sortBy]);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      // Fetch all published jobs from clientJobs collection
      const jobsQuery = query(
        collection(db, 'clientJobs'),
        where('status', '==', 'published')
      );
      
      const querySnapshot = await getDocs(jobsQuery);
      const projectsData: Project[] = [];

      for (const jobDoc of querySnapshot.docs) {
        const jobData = jobDoc.data();
        
        // Fetch client information
        let clientName = 'Client';
        let clientAvatar = '';
        
        if (jobData.clientId) {
          try {
            const clientDoc = await getDoc(doc(db, 'users', jobData.clientId));
            if (clientDoc.exists()) {
              const clientData = clientDoc.data();
              clientName = `${clientData.firstName || ''} ${clientData.lastName || ''}`.trim() || 'Client';
              clientAvatar = clientData.profilePictureUrl || '';
            }
          } catch (error) {
            console.error('Error fetching client info:', error);
          }
        }

        projectsData.push({
          id: jobDoc.id,
          title: jobData.jobTitle || 'Untitled Project',
          description: jobData.jobDescription || '',
          category: jobData.category || 'Other',
          skills: jobData.skills || [],
          budget: jobData.budget || { type: 'fixed', amount: 0 },
          duration: jobData.projectDuration || 'Not specified',
          experienceLevel: jobData.experienceLevel || 'Intermediate',
          location: jobData.location || 'Remote',
          postedDate: jobData.createdAt || new Date(),
          clientId: jobData.clientId || '',
          clientName,
          clientAvatar,
          status: jobData.status || 'published',
          proposalsCount: jobData.proposalsCount || 0
        });
      }

      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortProjects = () => {
    let filtered = [...projects];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Sort projects
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => {
          const dateA = a.postedDate?.seconds || 0;
          const dateB = b.postedDate?.seconds || 0;
          return dateB - dateA;
        });
        break;
      case 'oldest':
        filtered.sort((a, b) => {
          const dateA = a.postedDate?.seconds || 0;
          const dateB = b.postedDate?.seconds || 0;
          return dateA - dateB;
        });
        break;
      case 'budget-high':
        filtered.sort((a, b) => {
          const budgetA = a.budget.amount || a.budget.max || 0;
          const budgetB = b.budget.amount || b.budget.max || 0;
          return budgetB - budgetA;
        });
        break;
      case 'budget-low':
        filtered.sort((a, b) => {
          const budgetA = a.budget.amount || a.budget.min || 0;
          const budgetB = b.budget.amount || b.budget.min || 0;
          return budgetA - budgetB;
        });
        break;
      case 'proposals':
        filtered.sort((a, b) => (b.proposalsCount || 0) - (a.proposalsCount || 0));
        break;
    }

    setFilteredProjects(filtered);
  };

  const handleBookmark = (projectId: string) => {
    setBookmarkedJobs(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const formatBudget = (budget: Project['budget']) => {
    if (budget.type === 'fixed' && budget.amount) {
      return `$${budget.amount.toLocaleString()}`;
    } else if (budget.type === 'hourly' && budget.min && budget.max) {
      return `$${budget.min}-$${budget.max}/hr`;
    }
    return 'Budget not specified';
  };

  const formatDate = (date: any) => {
    if (!date) return 'Recently';
    if (date.seconds) {
      const projectDate = new Date(date.seconds * 1000);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - projectDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      return `${Math.floor(diffDays / 30)} months ago`;
    }
    return 'Recently';
  };

  const handleSendProposal = (projectId: string) => {
    navigate(`/freelancer/proposal-composer/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2E2E2E] mb-2">Find Your Next Project</h1>
          <p className="text-[#2E2E2E]/70">Discover opportunities that match your skills</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-[#ffeee3] p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E]/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="w-full lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="w-full lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="budget-high">Budget: High to Low</option>
                <option value="budget-low">Budget: Low to High</option>
                <option value="proposals">Most Proposals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[#2E2E2E]/70">
            {isLoading ? 'Loading...' : `${filteredProjects.length} ${filteredProjects.length === 1 ? 'project' : 'projects'} found`}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
            <span className="ml-3 text-[#2E2E2E]">Loading projects...</span>
          </div>
        )}

        {/* No Projects Found */}
        {!isLoading && filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <Briefcase className="w-16 h-16 text-[#2E2E2E]/30 mx-auto mb-4" />
            <p className="text-[#2E2E2E]/60 text-lg">No projects found matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 text-[#FF6B00] hover:text-[#FF9F45] font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Project Cards Grid */}
        {!isLoading && filteredProjects.length > 0 && (
          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-sm border border-[#ffeee3] overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  {/* Header with Client Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {project.clientAvatar ? (
                        <img
                          src={project.clientAvatar}
                          alt={project.clientName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[#FF6B00] flex items-center justify-center">
                          <span className="text-white text-lg font-bold">
                            {project.clientName?.charAt(0) || 'C'}
                          </span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-[#2E2E2E]">{project.clientName}</h3>
                        <p className="text-sm text-[#2E2E2E]/60">{formatDate(project.postedDate)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleBookmark(project.id)}
                      className="p-2 hover:bg-[#ffeee3] rounded-full transition-colors"
                    >
                      <Heart 
                        className={`w-5 h-5 ${bookmarkedJobs.includes(project.id) ? 'fill-red-500 text-red-500' : 'text-[#2E2E2E]/40'}`} 
                      />
                    </button>
                  </div>

                  {/* Project Title */}
                  <h2 className="text-xl font-bold text-[#2E2E2E] mb-3 hover:text-[#FF6B00] cursor-pointer">
                    {project.title}
                  </h2>

                  {/* Project Description */}
                  <p className="text-[#2E2E2E]/70 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Project Details */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-[#2E2E2E]/70">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-medium text-[#2E2E2E]">{formatBudget(project.budget)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{project.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{project.experienceLevel}</span>
                    </div>
                    {project.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Skills Tags */}
                  {project.skills && project.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.slice(0, 5).map((skill, index) => (
                        <span
                          key={index}
                          className="bg-[#ffeee3] text-[#FF6B00] text-xs px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {project.skills.length > 5 && (
                        <span className="bg-[#ffeee3]/50 text-[#2E2E2E]/70 text-xs px-3 py-1 rounded-full">
                          +{project.skills.length - 5} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="bg-[#FF6B00] text-white text-xs px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>

                  {/* Footer with Proposals Count and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#ffeee3]">
                    <div className="text-sm text-[#2E2E2E]/60">
                      <span className="font-medium text-[#2E2E2E]">{project.proposalsCount || 0}</span> proposals
                    </div>
                    <div className="flex gap-3">
                      <Link to={`/freelancer/job-details/${project.id}`}>
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#FF6B00] text-[#FF6B00] rounded-lg hover:bg-[#ffeee3] transition-colors">
                          <Eye className="w-4 h-4" />
                          View Project
                        </button>
                      </Link>
                      <button
                        onClick={() => handleSendProposal(project.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg transition-colors"
                      >
                        <Send className="w-4 h-4" />
                        Send Proposal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!isLoading && filteredProjects.length > 0 && (
          <div className="flex justify-center mt-12">
            <button 
              onClick={fetchProjects}
              className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Refresh Projects
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobFeed;
