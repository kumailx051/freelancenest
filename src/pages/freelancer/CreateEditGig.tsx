import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Upload, 
  X, 
  Plus, 
  Save, 
  Eye, 
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  GripVertical,
  Star
} from 'lucide-react';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDoc, 
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';

const CreateEditGig: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser: user } = useAuth();
  const isEditing = Boolean(id);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadSuccess, setUploadSuccess] = useState<string>('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newTag, setNewTag] = useState('');
  const [gigId, setGigId] = useState<string | null>(id || null);
  const [gigData, setGigData] = useState({
    title: '',
    category: '',
    subcategory: '',
    searchTags: [] as string[],
    description: '',
    packages: {
      basic: { title: 'Basic', description: '', price: '5', delivery: '3', revisions: '1', features: [] as string[] },
      standard: { title: 'Standard', description: '', price: '10', delivery: '5', revisions: '2', features: [] as string[] },
      premium: { title: 'Premium', description: '', price: '20', delivery: '7', revisions: '3', features: [] as string[] }
    },
    gallery: [] as string[],
    faqs: [] as { question: string; answer: string }[],
    requirements: [] as string[],
    extras: [] as { title: string; description: string; price: string; delivery: string }[],
    status: 'draft' as 'draft' | 'active' | 'paused' | 'under_review',
    views: 0,
    orders: 0,
    rating: 0,
    createdAt: null as Timestamp | null,
    updatedAt: null as Timestamp | null,
    userId: user?.uid || ''
  });
  
  const [newFeature, setNewFeature] = useState({ basic: '', standard: '', premium: '' });
  const [newRequirement, setNewRequirement] = useState('');

  // Update userId in gigData when user changes
  useEffect(() => {
    console.log('User changed in CreateEditGig:', user);
    if (user?.uid) {
      console.log('Setting gigData userId to:', user.uid);
      setGigData(prev => ({
        ...prev,
        userId: user.uid
      }));
    }
  }, [user]);

  // Load existing gig data if editing
  useEffect(() => {
    const loadGigData = async () => {
      if (isEditing && id) {
        try {
          setIsLoading(true);
          const gigDoc = await getDoc(doc(db, 'gigs', id));
          if (gigDoc.exists()) {
            const data = gigDoc.data();
            const loadedGigData = {
              ...gigData,
              ...data,
              userId: user?.uid || data.userId || ''
            };
            setGigData(loadedGigData);
            console.log('Loaded gig data:', loadedGigData);
            console.log('Gallery images loaded:', loadedGigData.gallery);
          } else {
            console.error('Gig not found');
            navigate('/freelancer/gigs');
          }
        } catch (error) {
          console.error('Error loading gig:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (user) {
      loadGigData();
    }
  }, [id, isEditing, user, navigate]);

  // Show loading spinner while loading existing gig data
  if (isEditing && isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gig data...</p>
        </div>
      </div>
    );
  }

  // Auto-save function to save progress after each step
  const autoSaveGig = async (data = gigData) => {
    if (!user?.uid || isSaving) return; // Prevent multiple simultaneous saves

    try {
      setIsSaving(true);
      console.log('Auto-saving gig with userId:', user.uid);
      console.log('Current user object:', user);
      const gigDataToSave = {
        ...data,
        userId: user.uid, // Always use the authenticated user's ID
        updatedAt: serverTimestamp(),
        ...(gigId ? {} : { createdAt: serverTimestamp() }) // Always add createdAt for new gigs
      };
      console.log('Gig data being saved:', { ...gigDataToSave, updatedAt: 'timestamp', createdAt: 'timestamp' });

      if (gigId && gigId.trim() !== '') {
        // Update existing gig
        await updateDoc(doc(db, 'gigs', gigId), gigDataToSave);
        console.log('Updated existing gig:', gigId);
      } else {
        // Create new gig only if we don't have an ID yet
        const docRef = await addDoc(collection(db, 'gigs'), gigDataToSave);
        setGigId(docRef.id);
        console.log('Created new gig:', docRef.id);
      }
    } catch (error) {
      console.error('Error auto-saving gig:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Upload image to ImageBB
  const uploadImageToImageBB = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    
    // Optional: Add expiration (in seconds)
    // formData.append('expiration', '2592000'); // 30 days
    
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=af89815a37ad8b0ac30f6e34839d6735`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`ImageBB API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      if (data.success && data.data && data.data.url) {
        console.log('ImageBB upload successful:', data.data.url);
        return data.data.url;
      } else {
        console.error('ImageBB upload failed:', data);
        throw new Error(data.error?.message || 'ImageBB upload failed - no URL returned');
      }
    } catch (error) {
      console.error('Error uploading to ImageBB:', error);
      
      // Provide more specific error messages
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error - please check your internet connection');
      } else if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unknown error occurred during image upload');
      }
    }
  };

  const categories = [
    { id: 'programming', name: 'Programming & Tech', subcategories: ['Website Development', 'Mobile Apps', 'Desktop Applications', 'APIs & Integrations'] },
    { id: 'design', name: 'Graphics & Design', subcategories: ['Logo Design', 'Web Design', 'UI/UX Design', 'Print Design'] },
    { id: 'marketing', name: 'Digital Marketing', subcategories: ['Social Media Marketing', 'SEO', 'Content Marketing', 'Email Marketing'] },
    { id: 'writing', name: 'Writing & Translation', subcategories: ['Content Writing', 'Copywriting', 'Technical Writing', 'Translation'] },
    { id: 'video', name: 'Video & Animation', subcategories: ['Video Editing', 'Animation', 'Whiteboard Videos', 'Intro Videos'] }
  ];

  const steps = [
    { number: 1, title: 'Overview', description: 'Basic gig information' },
    { number: 2, title: 'Pricing', description: 'Package details and pricing' },
    { number: 3, title: 'Description', description: 'Detailed description and gallery' },
    { number: 4, title: 'Requirements', description: 'FAQs and requirements' },
    { number: 5, title: 'Publish', description: 'Review and publish' }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!gigData.title.trim()) newErrors.title = 'Title is required';
        if (gigData.title.length < 15) newErrors.title = 'Title must be at least 15 characters';
        if (!gigData.category) newErrors.category = 'Category is required';
        if (!gigData.subcategory) newErrors.subcategory = 'Subcategory is required';
        if (gigData.searchTags.length === 0) newErrors.tags = 'At least one tag is required';
        break;
      case 2:
        if (!gigData.packages.basic.description.trim()) newErrors.basicDescription = 'Basic package description is required';
        if (parseInt(gigData.packages.basic.price) < 5) newErrors.basicPrice = 'Minimum price is $5';
        break;
      case 3:
        if (!gigData.description.trim()) newErrors.description = 'Description is required';
        if (gigData.description.length < 120) newErrors.description = 'Description must be at least 120 characters';
        if (gigData.gallery.length === 0) newErrors.images = 'At least one image is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validateStep(currentStep) && currentStep < 5) {
      // Auto-save progress before moving to next step
      if (!isSaving) {
        await autoSaveGig();
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async (asDraft = false) => {
    if (!user?.uid || isLoading || isSaving) {
      console.error('User not authenticated or already saving. User:', user);
      return;
    }

    setIsLoading(true);
    try {
      console.log('Saving gig with userId:', user.uid);
      console.log('Current user object:', user);
      const updatedGigData = {
        ...gigData,
        status: asDraft ? 'draft' : 'active',
        userId: user.uid, // Always use the authenticated user's ID
        updatedAt: serverTimestamp(),
        ...(gigId ? {} : { createdAt: serverTimestamp() }) // Only add createdAt for new gigs
      };
      console.log('Gig data being saved:', { ...updatedGigData, updatedAt: 'timestamp', createdAt: 'timestamp' });

      if (gigId && gigId.trim() !== '') {
        // Update existing gig
        await updateDoc(doc(db, 'gigs', gigId), updatedGigData);
        console.log('Updated existing gig:', gigId);
      } else {
        // Create new gig
        const docRef = await addDoc(collection(db, 'gigs'), updatedGigData);
        setGigId(docRef.id);
        console.log('Created new gig:', docRef.id);
      }

      if (!asDraft) {
        navigate('/freelancer/gigs');
      } else {
        // Show success message for draft save
        console.log('Draft saved successfully', gigId || 'new gig');
      }
    } catch (error) {
      console.error('Error saving gig:', error);
      // You could show an error toast here
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!validateStep(currentStep)) return;
    
    // Validate all required fields before publishing
    const allStepsValid = [1, 2, 3].every(step => validateStep(step));
    if (!allStepsValid) {
      console.error('Please complete all required fields');
      return;
    }

    await handleSave(false);
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || !user?.uid) return;
    
    const filesToUpload = Array.from(files).slice(0, 5 - gigData.gallery.length);
    if (filesToUpload.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    setUploadSuccess('');
    
    // Clear any previous image upload errors
    if (errors.images) {
      setErrors(prev => {
        const { images, ...rest } = prev;
        return rest;
      });
    }
    
    try {
      const uploadedUrls: string[] = [];
      
      for (let i = 0; i < filesToUpload.length; i++) {
        const file = filesToUpload[i];
        
        if (file.type.startsWith('image/')) {
          // Validate file size (max 10MB for ImageBB)
          if (file.size > 10 * 1024 * 1024) {
            console.warn(`File ${file.name} is too large (max 10MB)`);
            continue;
          }
          
          try {
            const imageUrl = await uploadImageToImageBB(file);
            uploadedUrls.push(imageUrl);
            
            // Update progress
            setUploadProgress(((i + 1) / filesToUpload.length) * 100);
          } catch (error) {
            console.error(`Failed to upload ${file.name}:`, error);
          }
        }
      }
      
      if (uploadedUrls.length > 0) {
        const updatedGigData = {
          ...gigData,
          gallery: [...gigData.gallery, ...uploadedUrls]
        };
        
        // Update state first
        setGigData(updatedGigData);
        
        // Wait a bit then auto-save to ensure state is updated
        setTimeout(async () => {
          if (!isSaving) {
            await autoSaveGig(updatedGigData);
          }
        }, 100);
        
        // Show success message
        setUploadSuccess(`Successfully uploaded ${uploadedUrls.length} image${uploadedUrls.length > 1 ? 's' : ''}`);
        
        // Clear success message after 3 seconds
        setTimeout(() => setUploadSuccess(''), 3000);
        
        console.log('Gallery updated with URLs:', uploadedUrls);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      setErrors(prev => ({
        ...prev,
        images: 'Failed to upload some images. Please try again.'
      }));
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const removeImage = async (index: number) => {
    // Note: ImageBB doesn't require manual deletion of images
    // Images will be automatically managed by ImageBB
    
    const updatedGigData = {
      ...gigData,
      gallery: gigData.gallery.filter((_, i) => i !== index)
    };
    
    setGigData(updatedGigData);
    
    // Auto-save the updated data with a small delay
    setTimeout(async () => {
      if (!isSaving) {
        await autoSaveGig(updatedGigData);
      }
    }, 100);
  };

  // Drag and drop functions
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newGallery = [...gigData.gallery];
    const draggedImage = newGallery[draggedIndex];
    
    // Remove the dragged image from its original position
    newGallery.splice(draggedIndex, 1);
    
    // Insert it at the new position
    newGallery.splice(dropIndex, 0, draggedImage);

    const updatedGigData = {
      ...gigData,
      gallery: newGallery
    };
    
    setGigData(updatedGigData);
    setDraggedIndex(null);
    setDragOverIndex(null);
    
    // Auto-save the updated data with a small delay
    setTimeout(async () => {
      if (!isSaving) {
        await autoSaveGig(updatedGigData);
      }
    }, 100);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const addTag = async () => {
    if (newTag.trim() && gigData.searchTags.length < 5 && !gigData.searchTags.includes(newTag.trim())) {
      const updatedGigData = {
        ...gigData,
        searchTags: [...gigData.searchTags, newTag.trim()]
      };
      setGigData(updatedGigData);
      setNewTag('');
      
      // Auto-save the updated data with a small delay
      setTimeout(async () => {
        if (!isSaving) {
          await autoSaveGig(updatedGigData);
        }
      }, 500);
    }
  };

  const removeTag = async (tagToRemove: string) => {
    const updatedGigData = {
      ...gigData,
      searchTags: gigData.searchTags.filter(tag => tag !== tagToRemove)
    };
    setGigData(updatedGigData);
    
    // Auto-save the updated data with a small delay
    setTimeout(async () => {
      if (!isSaving) {
        await autoSaveGig(updatedGigData);
      }
    }, 500);
  };

  const addFeature = (packageType: 'basic' | 'standard' | 'premium') => {
    const feature = newFeature[packageType].trim();
    if (feature) {
      setGigData(prev => ({
        ...prev,
        packages: {
          ...prev.packages,
          [packageType]: {
            ...prev.packages[packageType],
            features: [...prev.packages[packageType].features, feature]
          }
        }
      }));
      setNewFeature(prev => ({ ...prev, [packageType]: '' }));
    }
  };

  const removeFeature = (packageType: 'basic' | 'standard' | 'premium', index: number) => {
    setGigData(prev => ({
      ...prev,
      packages: {
        ...prev.packages,
        [packageType]: {
          ...prev.packages[packageType],
          features: prev.packages[packageType].features.filter((_, i) => i !== index)
        }
      }
    }));
  };

  const addFAQ = () => {
    setGigData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const removeFAQ = (index: number) => {
    setGigData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setGigData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    setGigData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/freelancer/gigs')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditing ? 'Edit Gig' : 'Create New Gig'}
              </h1>
              <p className="text-gray-600">
                {isEditing ? 'Update your service offering' : 'Create a new service offering'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {isSaving && (
              <div className="flex items-center text-sm text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#FF6B00] mr-2"></div>
                Saving...
              </div>
            )}
            <button
              onClick={() => handleSave(true)}
              disabled={isLoading || isSaving}
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </button>
            <button
              onClick={handlePublish}
              disabled={isLoading}
              className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center disabled:opacity-50"
            >
              <Eye className="w-4 h-4 mr-2" />
              {isLoading ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.number
                      ? 'bg-[#FF6B00] text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium text-gray-900">{step.title}</div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-4 ${
                    currentStep > step.number ? 'bg-[#FF6B00]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Step 1: Overview */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Gig Overview</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gig Title *
                </label>
                <input
                  type="text"
                  value={gigData.title}
                  onChange={(e) => setGigData({...gigData, title: e.target.value})}
                  placeholder="I will..."
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                  maxLength={80}
                />
                <div className="flex justify-between mt-1">
                  {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
                  <span className="text-gray-500 text-sm">{gigData.title.length}/80</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={gigData.category}
                    onChange={(e) => setGigData({...gigData, category: e.target.value, subcategory: ''})}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                      errors.category ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory *
                  </label>
                  <select
                    value={gigData.subcategory}
                    onChange={(e) => setGigData({...gigData, subcategory: e.target.value})}
                    disabled={!gigData.category}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent disabled:bg-gray-100 ${
                      errors.subcategory ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a subcategory</option>
                    {gigData.category && categories.find(c => c.id === gigData.category)?.subcategories.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                  {errors.subcategory && <span className="text-red-500 text-sm">{errors.subcategory}</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Tags * (up to 5)
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {gigData.searchTags.map((tag) => (
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
                {gigData.searchTags.length < 5 && (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
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
            </div>
          )}

          {/* Step 2: Pricing */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing & Packages</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {Object.entries(gigData.packages).map(([packageType, packageData]) => (
                  <div key={packageType} className="border border-gray-200 rounded-lg p-4">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">{packageType}</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Package Name
                        </label>
                        <input
                          type="text"
                          value={packageData.title}
                          onChange={(e) => setGigData({
                            ...gigData,
                            packages: {
                              ...gigData.packages,
                              [packageType]: { ...packageData, title: e.target.value }
                            }
                          })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description *
                        </label>
                        <textarea
                          value={packageData.description}
                          onChange={(e) => setGigData({
                            ...gigData,
                            packages: {
                              ...gigData.packages,
                              [packageType]: { ...packageData, description: e.target.value }
                            }
                          })}
                          rows={3}
                          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                            packageType === 'basic' && errors.basicDescription ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {packageType === 'basic' && errors.basicDescription && (
                          <span className="text-red-500 text-sm">{errors.basicDescription}</span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price ($) *
                          </label>
                          <input
                            type="number"
                            min="5"
                            value={packageData.price}
                            onChange={(e) => setGigData({
                              ...gigData,
                              packages: {
                                ...gigData.packages,
                                [packageType]: { ...packageData, price: e.target.value }
                              }
                            })}
                            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                              packageType === 'basic' && errors.basicPrice ? 'border-red-300' : 'border-gray-300'
                            }`}
                          />
                          {packageType === 'basic' && errors.basicPrice && (
                            <span className="text-red-500 text-sm">{errors.basicPrice}</span>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Delivery (days)
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={packageData.delivery}
                            onChange={(e) => setGigData({
                              ...gigData,
                              packages: {
                                ...gigData.packages,
                                [packageType]: { ...packageData, delivery: e.target.value }
                              }
                            })}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Revisions
                        </label>
                        <select
                          value={packageData.revisions}
                          onChange={(e) => setGigData({
                            ...gigData,
                            packages: {
                              ...gigData.packages,
                              [packageType]: { ...packageData, revisions: e.target.value }
                            }
                          })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                        >
                          <option value="1">1 Revision</option>
                          <option value="2">2 Revisions</option>
                          <option value="3">3 Revisions</option>
                          <option value="unlimited">Unlimited</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Features
                        </label>
                        <div className="space-y-2">
                          {packageData.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <span className="flex-1 text-sm">{feature}</span>
                              <button
                                onClick={() => removeFeature(packageType as 'basic' | 'standard' | 'premium', index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={newFeature[packageType as keyof typeof newFeature]}
                              onChange={(e) => setNewFeature(prev => ({ 
                                ...prev, 
                                [packageType]: e.target.value 
                              }))}
                              placeholder="Add feature"
                              className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
                            />
                            <button
                              onClick={() => addFeature(packageType as 'basic' | 'standard' | 'premium')}
                              className="bg-[#FF6B00] text-white px-2 py-1 rounded text-sm hover:bg-[#FF9F45]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Description & Gallery */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description & Gallery</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gig Description *
                </label>
                <textarea
                  value={gigData.description}
                  onChange={(e) => setGigData({...gigData, description: e.target.value})}
                  placeholder="Describe your service in detail..."
                  rows={8}
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                <div className="flex justify-between mt-1">
                  {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
                  <span className="text-gray-500 text-sm">{gigData.description.length} characters</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gig Gallery * (up to 5 images)
                </label>
                
                {/* Upload Section */}
                <div className="mb-6">
                  {gigData.gallery.length < 5 && (
                    <label className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors block ${
                      isUploading 
                        ? 'border-[#FF6B00] bg-[#ffeee3]/30 cursor-not-allowed' 
                        : 'border-gray-300 cursor-pointer hover:border-[#FF6B00]'
                    }`}>
                      <div className="flex flex-col items-center">
                        {isUploading ? (
                          <>
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B00] mb-2"></div>
                            <span className="text-sm text-[#FF6B00] font-medium">
                              Uploading... {Math.round(uploadProgress)}%
                            </span>
                            {uploadProgress > 0 && (
                              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                <div 
                                  className="bg-[#FF6B00] h-1.5 rounded-full transition-all duration-300"
                                  style={{ width: `${uploadProgress}%` }}
                                ></div>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-600">Click to upload images</span>
                            <span className="text-xs text-gray-400 mt-1">Max 10MB per image • {5 - gigData.gallery.length} more images allowed</span>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files)}
                        className="hidden"
                        disabled={isUploading}
                      />
                    </label>
                  )}
                </div>

                {/* Empty State */}
                {gigData.gallery.length === 0 && !isUploading && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-sm mb-2">No images uploaded yet</p>
                    <p className="text-gray-400 text-xs">Upload at least one image to showcase your gig</p>
                  </div>
                )}

                {/* Gallery Display */}
                {gigData.gallery && gigData.gallery.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-700">Uploaded Images ({gigData.gallery.length})</h4>
                      <span className="text-xs text-gray-500">Drag to reorder • First image is the main thumbnail</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {gigData.gallery.map((image, index) => (
                        <div
                          key={`${image}-${index}`}
                          draggable
                          onDragStart={(e) => handleDragStart(e, index)}
                          onDragOver={(e) => handleDragOver(e, index)}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, index)}
                          onDragEnd={handleDragEnd}
                          className={`relative group cursor-move rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            draggedIndex === index 
                              ? 'opacity-50 scale-95 border-gray-300 shadow-lg' 
                              : 'border-transparent hover:border-[#FF6B00]/30'
                          } ${
                            dragOverIndex === index && draggedIndex !== index 
                              ? 'border-[#FF6B00] bg-[#ffeee3]/20 scale-105 shadow-lg' 
                              : ''
                          }`}
                        >
                          {/* Main Thumbnail Badge */}
                          {index === 0 && (
                            <div className="absolute top-2 left-2 bg-[#FF6B00] text-white px-2 py-1 rounded-full text-xs font-medium flex items-center z-10">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Main
                            </div>
                          )}
                          
                          {/* Drag Handle */}
                          <div className="absolute top-2 right-8 bg-black/50 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <GripVertical className="w-4 h-4" />
                          </div>
                          
                          {/* Remove Button */}
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                            title="Remove image"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          
                          {/* Image */}
                          <div className="aspect-video relative overflow-hidden">
                            <img
                              src={image}
                              alt={`Gig image ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                              loading="lazy"
                            />
                            
                            {/* Image Index */}
                            <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                              {index + 1} of {gigData.gallery.length}
                            </div>
                          </div>
                          
                          {/* Drag Overlay */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                      ))}
                    </div>
                    
                    {/* Main Thumbnail Preview */}
                    {gigData.gallery.length > 0 && (
                      <div className="bg-[#ffeee3]/30 border border-[#FF6B00]/20 rounded-lg p-4">
                        <h5 className="text-sm font-medium text-[#2E2E2E] mb-3 flex items-center">
                          <Star className="w-4 h-4 text-[#FF6B00] mr-2 fill-current" />
                          Main Thumbnail Preview
                        </h5>
                        <div className="flex items-center space-x-4">
                          <div className="w-20 h-12 rounded-lg overflow-hidden border border-gray-200">
                            <img
                              src={gigData.gallery[0]}
                              alt="Main thumbnail"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600">
                              This image will appear as your gig thumbnail in search results and listings.
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Drag any image to the first position to make it the main thumbnail.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Instructions */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-start">
                        <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                        <div className="text-sm text-blue-700">
                          <p className="font-medium mb-1">Image Gallery Tips:</p>
                          <ul className="text-xs space-y-1">
                            <li>• The first image will be used as your main gig thumbnail</li>
                            <li>• Drag and drop images to reorder them</li>
                            <li>• High-quality images perform better in search results</li>
                            <li>• Show different angles or examples of your work</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {errors.images && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                    <p className="text-red-600 text-sm font-medium">Upload Error</p>
                    <p className="text-red-500 text-sm">{errors.images}</p>
                  </div>
                )}
                
                {uploadSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                    <p className="text-green-600 text-sm font-medium">✓ {uploadSuccess}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Requirements & FAQ */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements & FAQs</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buyer Requirements
                </label>
                <p className="text-sm text-gray-500 mb-3">
                  What information do you need from buyers to get started?
                </p>
                
                <div className="space-y-2 mb-3">
                  {gigData.requirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <span className="flex-1 text-sm">{req}</span>
                      <button
                        onClick={() => removeRequirement(index)}
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
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    placeholder="e.g., Please provide your company logo"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  />
                  <button
                    onClick={addRequirement}
                    className="bg-[#FF6B00] text-white px-4 py-2 rounded-lg hover:bg-[#FF9F45] transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Frequently Asked Questions
                  </label>
                  <button 
                    onClick={addFAQ}
                    className="bg-[#FF6B00] text-white px-4 py-2 rounded-lg hover:bg-[#FF9F45] transition-colors"
                  >
                    Add FAQ
                  </button>
                </div>
                
                <div className="space-y-4">
                  {gigData.faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">FAQ {index + 1}</h4>
                        <button
                          onClick={() => removeFAQ(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Question"
                          value={faq.question}
                          onChange={(e) => {
                            const newFaqs = [...gigData.faqs];
                            newFaqs[index].question = e.target.value;
                            setGigData({...gigData, faqs: newFaqs});
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                        />
                        <textarea
                          placeholder="Answer"
                          value={faq.answer}
                          onChange={(e) => {
                            const newFaqs = [...gigData.faqs];
                            newFaqs[index].answer = e.target.value;
                            setGigData({...gigData, faqs: newFaqs});
                          }}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review & Publish */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Review & Publish</h2>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Gig Preview</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">{gigData.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{gigData.category} &gt; {gigData.subcategory}</p>
                    
                    {gigData.gallery.length > 0 && (
                      <img
                        src={gigData.gallery[0]}
                        alt="Gig preview"
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {gigData.searchTags.map((tag) => (
                        <span key={tag} className="bg-[#ffeee3] text-[#FF6B00] px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">Basic Package</h5>
                      <p className="text-2xl font-bold text-gray-900 mb-2">${gigData.packages.basic.price}</p>
                      <p className="text-sm text-gray-600 mb-3">{gigData.packages.basic.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{gigData.packages.basic.delivery} days delivery</span>
                        <span>{gigData.packages.basic.revisions} revisions</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-600 line-clamp-3">{gigData.description}</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-medium text-blue-900">Ready to publish?</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Your gig will be reviewed and published within 24 hours. Make sure all information is accurate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            {currentStep > 1 ? (
              <button
                onClick={handlePrevious}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handlePublish}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {isLoading ? 'Publishing...' : 'Publish Gig'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEditGig;
