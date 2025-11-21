import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Calendar,
  Eye,
  Heart,
  Star,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  User,
  Briefcase,
  Clock,
  Award,
  Tag
} from 'lucide-react';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';

interface ProjectDetails {
  id: string;
  title: string;
  description: string;
  category: string;
  client: string;
  budget: string;
  duration: string;
  completedDate: string;
  images: string[];
  thumbnail: string;
  tags: string[];
  technologies: string[];
  features: string[];
  testimonial: string;
  liveUrl: string;
  githubUrl: string;
  rating: number;
  views: number;
  likes: number;
  featured: boolean;
  status: string;
  userId: string;
  createdAt: any;
  updatedAt: any;
}

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProjectDetails();
    }
  }, [id]);

  const fetchProjectDetails = async () => {
    if (!id) return;

    try {
      const projectDoc = await getDoc(doc(db, 'portfolio_project', id));
      
      if (projectDoc.exists()) {
        const projectData = {
          id: projectDoc.id,
          ...projectDoc.data()
        } as ProjectDetails;
        
        setProject(projectData);
        console.log('Fetched project details:', projectData);
      } else {
        console.error('Project not found');
        navigate('/freelancer/portfolio');
      }
    } catch (error) {
      console.error('Error fetching project details:', error);
      navigate('/freelancer/portfolio');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!project || !confirm('Are you sure you want to delete this project?')) return;

    setDeleteLoading(true);
    try {
      await deleteDoc(doc(db, 'portfolio_project', project.id));
      navigate('/freelancer/portfolio');
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const nextImage = () => {
    if (project && project.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (project && project.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.images.length - 1 : prev - 1
      );
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [project]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
            <span className="ml-3 text-gray-600">Loading project details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-[#2E2E2E] mb-4">Project Not Found</h2>
            <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been deleted.</p>
            <Link
              to="/freelancer/portfolio"
              className="inline-flex items-center px-6 py-3 bg-[#FF6B00] text-white rounded-lg hover:bg-[#FF6B00]/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link
              to="/freelancer/portfolio"
              className="flex items-center text-[#2E2E2E]/60 hover:text-[#FF6B00] transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Portfolio
            </Link>
            <div className="h-6 border-l border-gray-300 mr-4"></div>
            <h1 className="text-2xl font-bold text-[#2E2E2E]">{project.title}</h1>
          </div>

          {/* Actions */}
          {currentUser?.uid === project.userId && (
            <div className="flex items-center space-x-3">
              <Link
                to={`/freelancer/portfolio/edit/${project.id}`}
                className="flex items-center px-4 py-2 text-[#2E2E2E]/70 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Project
              </Link>
              <button
                onClick={handleDeleteProject}
                disabled={deleteLoading}
                className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              >
                {deleteLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
                ) : (
                  <Trash2 className="w-4 h-4 mr-2" />
                )}
                Delete Project
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative">
                {project.images && project.images.length > 0 ? (
                  <>
                    <img
                      src={project.images[currentImageIndex]}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-96 object-cover"
                    />
                    
                    {project.images.length > 1 && (
                      <>
                        {/* Navigation Arrows */}
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>

                        {/* Image Counter */}
                        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                          {currentImageIndex + 1} / {project.images.length}
                        </div>
                      </>
                    )}

                    {project.featured && (
                      <div className="absolute top-4 left-4 bg-[#FF6B00] text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </div>
                    )}
                  </>
                ) : (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-96 object-cover"
                  />
                )}
              </div>

              {/* Image Thumbnails */}
              {project.images && project.images.length > 1 && (
                <div className="p-4 bg-gray-50 border-t">
                  <div className="flex space-x-3 overflow-x-auto">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          index === currentImageIndex
                            ? 'border-[#FF6B00]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Project Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-[#2E2E2E] mb-4">Project Description</h2>
              <div className="prose max-w-none">
                <p className="text-[#2E2E2E]/80 leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Technologies & Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#ffeee3] text-[#FF6B00] rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-[#FF6B00] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-[#2E2E2E]/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Client Testimonial */}
            {project.testimonial && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Client Testimonial</h3>
                <div className="bg-[#ffeee3]/50 rounded-lg p-4">
                  <p className="text-[#2E2E2E]/80 italic leading-relaxed">
                    "{project.testimonial}"
                  </p>
                  {project.client && (
                    <p className="text-[#FF6B00] font-medium mt-3">
                      - {project.client}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Project Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-[#2E2E2E]/60">
                    <Eye className="w-4 h-4 mr-2" />
                    Views
                  </span>
                  <span className="font-medium text-[#2E2E2E]">{project.views || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-[#2E2E2E]/60">
                    <Heart className="w-4 h-4 mr-2" />
                    Likes
                  </span>
                  <span className="font-medium text-[#2E2E2E]">{project.likes || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-[#2E2E2E]/60">
                    <Star className="w-4 h-4 mr-2" />
                    Rating
                  </span>
                  <span className="font-medium text-[#2E2E2E]">{project.rating || 0}/5</span>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Project Details</h3>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <span className="flex items-center text-[#2E2E2E]/60">
                    <Tag className="w-4 h-4 mr-2" />
                    Category
                  </span>
                  <span className="font-medium text-[#2E2E2E] text-right">{project.category}</span>
                </div>
                
                {project.client && (
                  <div className="flex items-start justify-between">
                    <span className="flex items-center text-[#2E2E2E]/60">
                      <User className="w-4 h-4 mr-2" />
                      Client
                    </span>
                    <span className="font-medium text-[#2E2E2E] text-right">{project.client}</span>
                  </div>
                )}

                {project.budget && (
                  <div className="flex items-start justify-between">
                    <span className="flex items-center text-[#2E2E2E]/60">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Budget
                    </span>
                    <span className="font-medium text-[#2E2E2E] text-right">{project.budget}</span>
                  </div>
                )}

                {project.duration && (
                  <div className="flex items-start justify-between">
                    <span className="flex items-center text-[#2E2E2E]/60">
                      <Clock className="w-4 h-4 mr-2" />
                      Duration
                    </span>
                    <span className="font-medium text-[#2E2E2E] text-right">{project.duration}</span>
                  </div>
                )}

                <div className="flex items-start justify-between">
                  <span className="flex items-center text-[#2E2E2E]/60">
                    <Calendar className="w-4 h-4 mr-2" />
                    Completed
                  </span>
                  <span className="font-medium text-[#2E2E2E] text-right">
                    {new Date(project.completedDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <span className="flex items-center text-[#2E2E2E]/60">
                    <Award className="w-4 h-4 mr-2" />
                    Status
                  </span>
                  <span className={`font-medium text-right capitalize ${
                    project.status === 'published' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Project Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-[#2E2E2E]/70 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;