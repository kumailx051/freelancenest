import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, addDoc, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Plus, 
  Save, 
  Eye, 
  Calendar,
  Star,
  CheckCircle,
  Image as ImageIcon
} from 'lucide-react';

interface ProjectData {
  title: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail: string;
  images: string[];
  liveUrl: string;
  githubUrl: string;
  client: string;
  completedDate: string;
  duration: string;
  budget: string;
  technologies: string[];
  features: string[];
  testimonial: string;
  rating: number;
  userId?: string;
  createdAt?: any;
  updatedAt?: any;
  status?: 'published' | 'draft';
}

const AddProject: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useAuth();
  const isEditing = Boolean(id);

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newTechnology, setNewTechnology] = useState('');
  const [newFeature, setNewFeature] = useState('');

  const [projectData, setProjectData] = useState<ProjectData>({
    title: '',
    description: '',
    category: '',
    tags: [],
    thumbnail: '',
    images: [],
    liveUrl: '',
    githubUrl: '',
    client: '',
    completedDate: '',
    duration: '',
    budget: '',
    technologies: [],
    features: [],
    testimonial: '',
    rating: 5,
    status: 'published'
  });

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

  const durationOptions = [
    '1 week',
    '2 weeks', 
    '3 weeks',
    '1 month',
    '2 months',
    '3 months',
    '4 months',
    '5 months',
    '6 months',
    '6+ months'
  ];

  // ImageBB API configuration
  const IMAGEBB_API_KEY = 'af89815a37ad8b0ac30f6e34839d6735';

  const uploadToImageBB = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', IMAGEBB_API_KEY);

    try {
      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (error) {
      console.error('ImageBB upload failed:', error);
      throw new Error('Failed to upload image. Please try again.');
    }
  };

  // Load existing project data if editing
  useEffect(() => {
    const loadProject = async () => {
      if (!isEditing || !id || !currentUser?.uid) return;

      setIsLoading(true);
      try {
        const projectDoc = await getDoc(doc(db, 'portfolio_projects', id));
        if (projectDoc.exists()) {
          const data = projectDoc.data();
          // Verify the project belongs to the current user
          if (data.userId === currentUser.uid) {
            setProjectData({
              ...data,
              completedDate: data.completedDate || '',
              duration: data.duration || '',
              budget: data.budget || '',
              liveUrl: data.liveUrl || '',
              githubUrl: data.githubUrl || '',
              client: data.client || '',
              testimonial: data.testimonial || '',
              rating: data.rating || 5,
              status: data.status || 'published'
            } as ProjectData);
          } else {
            navigate('/freelancer/portfolio');
          }
        } else {
          navigate('/freelancer/portfolio');
        }
      } catch (error) {
        console.error('Error loading project:', error);
        navigate('/freelancer/portfolio');
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [id, isEditing, currentUser, navigate]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!projectData.title.trim()) newErrors.title = 'Project title is required';
    if (!projectData.description.trim()) newErrors.description = 'Project description is required';
    if (projectData.description.length < 100) newErrors.description = 'Description must be at least 100 characters';
    if (!projectData.category) newErrors.category = 'Category is required';
    if (projectData.tags.length === 0) newErrors.tags = 'At least one tag is required';
    if (!projectData.thumbnail) newErrors.thumbnail = 'Thumbnail image is required';
    if (!projectData.completedDate) newErrors.completedDate = 'Completion date is required';
    if (!projectData.duration) newErrors.duration = 'Project duration is required';
    if (projectData.technologies.length === 0) newErrors.technologies = 'At least one technology is required';
    if (projectData.features.length === 0) newErrors.features = 'At least one feature is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = async (files: FileList | null, type: 'thumbnail' | 'gallery') => {
    if (!files) return;
    
    setIsUploading(true);
    try {
      const uploadPromises = Array.from(files)
        .filter(file => file.type.startsWith('image/'))
        .map(file => uploadToImageBB(file));

      const imageUrls = await Promise.all(uploadPromises);
      
      if (type === 'thumbnail' && imageUrls.length > 0) {
        setProjectData(prev => ({ ...prev, thumbnail: imageUrls[0] }));
      } else if (type === 'gallery') {
        setProjectData(prev => ({
          ...prev,
          images: [...prev.images, ...imageUrls].slice(0, 10) // Limit to 10 images
        }));
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      setErrors(prev => ({
        ...prev,
        upload: error instanceof Error ? error.message : 'Failed to upload images'
      }));
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setProjectData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && projectData.tags.length < 10 && !projectData.tags.includes(newTag.trim())) {
      setProjectData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setProjectData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const addTechnology = () => {
    if (newTechnology.trim() && !projectData.technologies.includes(newTechnology.trim())) {
      setProjectData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }));
      setNewTechnology('');
    }
  };

  const removeTechnology = (tech: string) => {
    setProjectData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setProjectData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setProjectData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    if (!validateForm() || !currentUser?.uid) return;

    setIsLoading(true);
    try {
      const projectDataToSave = {
        ...projectData,
        userId: currentUser.uid,
        updatedAt: serverTimestamp()
      };

      if (isEditing && id) {
        // Update existing project
        await updateDoc(doc(db, 'portfolio_projects', id), projectDataToSave);
        console.log('Project updated successfully');
        setSuccessMessage('Project updated successfully!');
      } else {
        // Create new project
        projectDataToSave.createdAt = serverTimestamp();
        const docRef = await addDoc(collection(db, 'portfolio_projects'), projectDataToSave);
        console.log('Project created successfully with ID:', docRef.id);
        setSuccessMessage('Project added successfully!');
      }
      
      // Show success message briefly before navigating
      setTimeout(() => {
        navigate('/freelancer/portfolio');
      }, 1500);
    } catch (error) {
      console.error('Error saving project:', error);
      setErrors(prev => ({
        ...prev,
        save: 'Failed to save project. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect if user is not authenticated
  if (!currentUser) {
    navigate('/login');
    return null;
  };

  // Show loading state when fetching project data
  if (isLoading && isEditing) {
    return (
      <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
            <span className="ml-3 text-gray-600">Loading project...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/freelancer/portfolio')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-[#2E2E2E]">
                {isEditing ? 'Edit Project' : 'Add New Project'}
              </h1>
              <p className="text-[#2E2E2E]/70">
                {isEditing ? 'Update your project details' : 'Showcase your work to potential clients'}
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => navigate('/freelancer/portfolio')}
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading || isUploading}
              className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? 'Update Project' : 'Add Project'}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="text-green-700 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              {successMessage}
            </div>
          </div>
        )}

        {/* Error Display */}
        {(errors.save || errors.upload) && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="text-red-700">
              {errors.save && <p>{errors.save}</p>}
              {errors.upload && <p>{errors.upload}</p>}
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-[#2E2E2E] mb-6 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-[#FF6B00]" />
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={projectData.title}
                    onChange={(e) => setProjectData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter your project title"
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                      errors.title ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.title && <span className="text-red-500 text-sm mt-1">{errors.title}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={projectData.category}
                    onChange={(e) => setProjectData(prev => ({ ...prev, category: e.target.value }))}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                      errors.category ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && <span className="text-red-500 text-sm mt-1">{errors.category}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={projectData.client}
                    onChange={(e) => setProjectData(prev => ({ ...prev, client: e.target.value }))}
                    placeholder="Client or company name"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    value={projectData.description}
                    onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your project in detail..."
                    rows={4}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                      errors.description ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  <div className="flex justify-between mt-1">
                    {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
                    <span className="text-gray-500 text-sm">{projectData.description.length} characters</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div>
              <h2 className="text-xl font-semibold text-[#2E2E2E] mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-[#FF6B00]" />
                Project Details
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Completion Date *
                  </label>
                  <input
                    type="date"
                    value={projectData.completedDate}
                    onChange={(e) => setProjectData(prev => ({ ...prev, completedDate: e.target.value }))}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                      errors.completedDate ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.completedDate && <span className="text-red-500 text-sm mt-1">{errors.completedDate}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration *
                  </label>
                  <select
                    value={projectData.duration}
                    onChange={(e) => setProjectData(prev => ({ ...prev, duration: e.target.value }))}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                      errors.duration ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select duration</option>
                    {durationOptions.map((duration) => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                  {errors.duration && <span className="text-red-500 text-sm mt-1">{errors.duration}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget
                  </label>
                  <input
                    type="text"
                    value={projectData.budget}
                    onChange={(e) => setProjectData(prev => ({ ...prev, budget: e.target.value }))}
                    placeholder="e.g., $5,000"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Live URL
                  </label>
                  <input
                    type="url"
                    value={projectData.liveUrl}
                    onChange={(e) => setProjectData(prev => ({ ...prev, liveUrl: e.target.value }))}
                    placeholder="https://example.com"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={projectData.githubUrl}
                    onChange={(e) => setProjectData(prev => ({ ...prev, githubUrl: e.target.value }))}
                    placeholder="https://github.com/..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Rating
                  </label>
                  <select
                    value={projectData.rating}
                    onChange={(e) => setProjectData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  >
                    <option value={5}>5.0 - Excellent</option>
                    <option value={4.9}>4.9 - Outstanding</option>
                    <option value={4.8}>4.8 - Very Good</option>
                    <option value={4.7}>4.7 - Good</option>
                    <option value={4.6}>4.6 - Above Average</option>
                    <option value={4.5}>4.5 - Average</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Images */}
            <div>
              <h2 className="text-xl font-semibold text-[#2E2E2E] mb-6 flex items-center">
                <ImageIcon className="w-5 h-5 mr-2 text-[#FF6B00]" />
                Project Images
              </h2>
              
              <div className="space-y-6">
                {/* Thumbnail */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thumbnail Image * (Main project image)
                  </label>
                  {projectData.thumbnail ? (
                    <div className="relative inline-block">
                      <img
                        src={projectData.thumbnail}
                        alt="Thumbnail"
                        className="w-48 h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        onClick={() => setProjectData(prev => ({ ...prev, thumbnail: '' }))}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <label className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#FF6B00] transition-colors block ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      {isUploading ? (
                        <>
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B00] mx-auto mb-2"></div>
                          <span className="text-gray-600">Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <span className="text-gray-600">Click to upload thumbnail</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files, 'thumbnail')}
                        className="hidden"
                        disabled={isUploading}
                      />
                    </label>
                  )}
                  {errors.thumbnail && <span className="text-red-500 text-sm mt-1">{errors.thumbnail}</span>}
                </div>

                {/* Gallery */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Images (up to 10)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {projectData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    {projectData.images.length < 10 && (
                      <label className={`border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#FF6B00] transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {isUploading ? (
                          <>
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#FF6B00] mx-auto mb-1"></div>
                            <span className="text-xs text-gray-600">Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                            <span className="text-xs text-gray-600">Add Image</span>
                          </>
                        )}
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e.target.files, 'gallery')}
                          className="hidden"
                          disabled={isUploading}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h2 className="text-xl font-semibold text-[#2E2E2E] mb-6 flex items-center">
                <Star className="w-5 h-5 mr-2 text-[#FF6B00]" />
                Tags & Technologies
              </h2>
              
              <div className="space-y-6">
                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags * (up to 10)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {projectData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-2 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  {projectData.tags.length < 10 && (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                        placeholder="Add a tag"
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      />
                      <button
                        onClick={addTag}
                        className="bg-[#FF6B00] text-white px-4 py-2 rounded-lg hover:bg-[#FF9F45] transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  )}
                  {errors.tags && <span className="text-red-500 text-sm">{errors.tags}</span>}
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Technologies Used *
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {projectData.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {tech}
                        <button
                          onClick={() => removeTechnology(tech)}
                          className="ml-2 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newTechnology}
                      onChange={(e) => setNewTechnology(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTechnology()}
                      placeholder="Add a technology"
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                    />
                    <button
                      onClick={addTechnology}
                      className="bg-[#FF6B00] text-white px-4 py-2 rounded-lg hover:bg-[#FF9F45] transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  {errors.technologies && <span className="text-red-500 text-sm">{errors.technologies}</span>}
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-semibold text-[#2E2E2E] mb-6 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-[#FF6B00]" />
                Project Features
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Features *
                </label>
                <div className="space-y-2 mb-3">
                  {projectData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <span className="flex-1 text-sm">{feature}</span>
                      <button
                        onClick={() => removeFeature(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                    placeholder="Add a feature"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  />
                  <button
                    onClick={addFeature}
                    className="bg-[#FF6B00] text-white px-4 py-2 rounded-lg hover:bg-[#FF9F45] transition-colors"
                  >
                    Add
                  </button>
                </div>
                {errors.features && <span className="text-red-500 text-sm">{errors.features}</span>}
              </div>
            </div>

            {/* Testimonial */}
            <div>
              <h2 className="text-xl font-semibold text-[#2E2E2E] mb-6 flex items-center">
                <Star className="w-5 h-5 mr-2 text-[#FF6B00]" />
                Client Testimonial
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Testimonial (Optional)
                </label>
                <textarea
                  value={projectData.testimonial}
                  onChange={(e) => setProjectData(prev => ({ ...prev, testimonial: e.target.value }))}
                  placeholder="What did your client say about this project?"
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                />
              </div>
            </div>

            {/* Preview Section */}
            {projectData.title && projectData.description && (
              <div>
                <h2 className="text-xl font-semibold text-[#2E2E2E] mb-6 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-[#FF6B00]" />
                  Preview
                </h2>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    {projectData.thumbnail && (
                      <img
                        src={projectData.thumbnail}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">{projectData.title}</h3>
                    <span className="text-sm text-[#FF6B00] font-medium mb-2 block">{projectData.category}</span>
                    <p className="text-[#2E2E2E]/70 text-sm mb-3 line-clamp-2">{projectData.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {projectData.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="bg-[#ffeee3] text-[#FF6B00] px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                      {projectData.tags.length > 3 && (
                        <span className="text-xs text-[#2E2E2E]/60">+{projectData.tags.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProject;