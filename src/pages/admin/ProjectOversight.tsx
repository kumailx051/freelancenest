import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { 
  Briefcase, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Trash2, 
  CheckCircle,
  XCircle,
  ExternalLink,
  Star
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  budget?: string;
  client?: string;
  completedDate: string;
  duration: string;
  status: 'published' | 'draft' | 'under_review' | 'rejected';
  rating: number;
  technologies: string[];
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
  userId: string;
  createdAt: any;
  featured?: boolean;
  views?: number;
  likes?: number;
}

const ProjectOversight: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [showActions, setShowActions] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const categories = [
    'Web Development',
    'Mobile Development',
    'Dashboard',
    'Data Visualization',
    'CMS',
    'E-commerce',
    'API Development',
    'UI/UX Design',
    'Desktop Application',
    'Game Development',
    'Machine Learning',
    'Blockchain'
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, statusFilter, categoryFilter]);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const projectsQuery = query(collection(db, 'portfolio_project'), orderBy('createdAt', 'desc'));
      const projectsSnapshot = await getDocs(projectsQuery);
      
      const projectsData: Project[] = [];
      projectsSnapshot.forEach((doc) => {
        const projectData = doc.data();
        projectsData.push({
          id: doc.id,
          title: projectData.title || '',
          description: projectData.description || '',
          category: projectData.category || '',
          budget: projectData.budget || '',
          client: projectData.client || '',
          completedDate: projectData.completedDate || '',
          duration: projectData.duration || '',
          status: projectData.status || 'published',
          rating: projectData.rating || 0,
          technologies: projectData.technologies || [],
          thumbnail: projectData.thumbnail || '',
          liveUrl: projectData.liveUrl || '',
          githubUrl: projectData.githubUrl || '',
          userId: projectData.userId || '',
          createdAt: projectData.createdAt,
          featured: projectData.featured || false,
          views: projectData.views || 0,
          likes: projectData.likes || 0
        });
      });
      
      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = projects;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(project => project.category === categoryFilter);
    }

    setFilteredProjects(filtered);
  };

  const handleProjectAction = async (projectId: string, action: 'approve' | 'reject' | 'feature' | 'unfeature' | 'delete') => {
    try {
      const projectRef = doc(db, 'portfolio_project', projectId);
      
      switch (action) {
        case 'approve':
          await updateDoc(projectRef, { 
            status: 'published',
            approvedAt: new Date()
          });
          break;
        case 'reject':
          await updateDoc(projectRef, { 
            status: 'rejected',
            rejectedAt: new Date()
          });
          break;
        case 'feature':
          await updateDoc(projectRef, { featured: true });
          break;
        case 'unfeature':
          await updateDoc(projectRef, { featured: false });
          break;
        case 'delete':
          if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            await deleteDoc(projectRef);
          }
          break;
      }
      
      fetchProjects(); // Refresh the list
      setShowActions(null);
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project. Please try again.');
    }
  };

  const handleBulkAction = async (action: 'approve' | 'reject' | 'feature' | 'delete') => {
    if (selectedProjects.length === 0) return;
    
    if (action === 'delete' && !window.confirm(`Are you sure you want to delete ${selectedProjects.length} projects?`)) {
      return;
    }

    try {
      const promises = selectedProjects.map(projectId => {
        const projectRef = doc(db, 'portfolio_project', projectId);
        if (action === 'delete') {
          return deleteDoc(projectRef);
        } else {
          const updateData: any = {};
          if (action === 'approve') updateData.status = 'published';
          if (action === 'reject') updateData.status = 'rejected';
          if (action === 'feature') updateData.featured = true;
          return updateDoc(projectRef, updateData);
        }
      });
      
      await Promise.all(promises);
      setSelectedProjects([]);
      fetchProjects();
    } catch (error) {
      console.error('Error performing bulk action:', error);
      alert('Failed to perform bulk action. Please try again.');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-[#ffeee3] text-[#FF6B00]',
      draft: 'bg-[#ffeee3] text-[#2E2E2E]/70',
      under_review: 'bg-[#ffeee3] text-[#FF6B00]',
      rejected: 'bg-[#ffeee3] text-[#2E2E2E]'
    };
    return styles[status as keyof typeof styles] || 'bg-[#ffeee3] text-[#2E2E2E]';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffeee3] pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
            <span className="ml-3 text-[#2E2E2E]">Loading projects...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffeee3] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2E2E2E]">Project Oversight</h1>
            <p className="text-[#2E2E2E]/70">Monitor and manage all platform projects</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded text-sm ${viewMode === 'table' ? 'bg-white shadow' : ''}`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded text-sm ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
              >
                Grid
              </button>
            </div>
            <span className="text-sm text-gray-500">
              {filteredProjects.length} of {projects.length} projects
            </span>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                />
              </div>

              {/* Filters */}
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-[#FF6B00]" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-[#ffeee3] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="under_review">Under Review</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="border border-[#ffeee3] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedProjects.length > 0 && (
              <div className="mt-4 p-4 bg-[#ffeee3] rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#2E2E2E]">
                    {selectedProjects.length} projects selected
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleBulkAction('approve')}
                      className="px-3 py-1 bg-[#FF6B00] text-white text-sm rounded hover:bg-[#FF6B00]/90"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleBulkAction('reject')}
                      className="px-3 py-1 bg-[#2E2E2E] text-white text-sm rounded hover:bg-[#2E2E2E]/90"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleBulkAction('feature')}
                      className="px-3 py-1 bg-[#FF6B00] text-white text-sm rounded hover:bg-[#FF6B00]/90"
                    >
                      Feature
                    </button>
                    <button
                      onClick={() => handleBulkAction('delete')}
                      className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Projects Display */}
        {viewMode === 'table' ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedProjects.length === filteredProjects.length && filteredProjects.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProjects(filteredProjects.map(project => project.id));
                          } else {
                            setSelectedProjects([]);
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stats
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedProjects.includes(project.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedProjects([...selectedProjects, project.id]);
                            } else {
                              setSelectedProjects(selectedProjects.filter(id => id !== project.id));
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            {project.thumbnail ? (
                              <img 
                                src={project.thumbnail} 
                                alt={project.title}
                                className="h-12 w-12 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-lg bg-gray-300 flex items-center justify-center">
                                <Briefcase className="w-6 h-6 text-gray-600" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">
                                {project.title}
                              </div>
                              {project.featured && (
                                <Star className="w-4 h-4 text-yellow-500 ml-2 fill-current" />
                              )}
                            </div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {project.description}
                            </div>
                            {project.client && (
                              <div className="text-xs text-gray-400 mt-1">
                                Client: {project.client}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-[#ffeee3] text-[#FF6B00]">
                          {project.category}
                        </span>
                        {project.budget && (
                          <div className="text-xs text-gray-500 mt-1">{project.budget}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(project.status)}`}>
                          {project.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {project.views || 0}
                          </span>
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1" />
                            {project.rating}/5
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {project.createdAt ? new Date(project.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 relative">
                        <button
                          onClick={() => setShowActions(showActions === project.id ? null : project.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        
                        {showActions === project.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                            <div className="py-1">
                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  View Live
                                </a>
                              )}
                              
                              {project.status === 'under_review' && (
                                <>
                                  <button
                                    onClick={() => handleProjectAction(project.id, 'approve')}
                                    className="flex items-center px-4 py-2 text-sm text-green-700 hover:bg-green-50 w-full text-left"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => handleProjectAction(project.id, 'reject')}
                                    className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full text-left"
                                  >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Reject
                                  </button>
                                </>
                              )}
                              
                              {project.featured ? (
                                <button
                                  onClick={() => handleProjectAction(project.id, 'unfeature')}
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                  <Star className="w-4 h-4 mr-2" />
                                  Unfeature
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleProjectAction(project.id, 'feature')}
                                  className="flex items-center px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50 w-full text-left"
                                >
                                  <Star className="w-4 h-4 mr-2" />
                                  Feature
                                </button>
                              )}
                              
                              <button
                                onClick={() => handleProjectAction(project.id, 'delete')}
                                className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full text-left"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No projects found matching your criteria</p>
              </div>
            )}
          </div>
        ) : (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  {project.thumbnail ? (
                    <img 
                      src={project.thumbnail} 
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                      <Briefcase className="w-12 h-12 text-gray-600" />
                    </div>
                  )}
                  {project.featured && (
                    <div className="absolute top-2 right-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(project.status)}`}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 truncate">{project.title}</h3>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{project.category}</span>
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {project.views || 0}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        {project.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectOversight;