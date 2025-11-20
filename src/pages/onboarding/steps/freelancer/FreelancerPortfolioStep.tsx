import React, { useState, useEffect } from 'react';
import { Upload, Plus, Trash2, X, ExternalLink, Camera, FileText } from 'lucide-react';
import { FreelanceFirestoreService } from '../../../../lib/firestoreService';

interface FreelancerPortfolioStepProps {
  user: any;
  onNext: (data?: any) => void;
  onBack: () => void;
}

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  images: Array<{ id: string; url: string; file?: File }>;
  link?: string;
}

const FreelancerPortfolioStep: React.FC<FreelancerPortfolioStepProps> = ({ 
  user,
  onNext, 
  onBack 
}) => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    // Sample pre-filled portfolio item
    {
      id: '1',
      title: '',
      description: '',
      category: 'web-development',
      images: [],
      link: ''
    }
  ]);
  
  const [activeItem, setActiveItem] = useState<string>(portfolioItems[0].id);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Categories for portfolio
  const categories = [
    { id: 'web-development', name: 'Web Development' },
    { id: 'mobile-app', name: 'Mobile App Development' },
    { id: 'ui-design', name: 'UI/UX Design' },
    { id: 'graphic-design', name: 'Graphic Design' },
    { id: 'writing', name: 'Writing & Content' },
    { id: 'marketing', name: 'Marketing & SEO' },
    { id: 'video', name: 'Video & Animation' },
    { id: 'other', name: 'Other' }
  ];

  // Auto-save portfolio to Firebase (debounced)
  const autoSavePortfolio = async (portfolioData: PortfolioItem[]) => {
    try {
      const userId = user?.uid || localStorage.getItem('userId');
      if (userId && portfolioData.length > 0) {
        setSaving(true);
        
        // Filter out items that have meaningful data (title and either description or images)
        const validItems = portfolioData.filter((item: PortfolioItem) => 
          item.title.trim() || item.description.trim() || item.images.length > 0
        );

        const portfolioForFirestore = validItems.map((item: PortfolioItem) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          category: item.category,
          link: item.link || '',
          images: item.images.map((img: { id: string; url: string }) => ({
            id: img.id,
            url: img.url
          }))
        }));

        // Save to Firebase without blocking UI
        await FreelanceFirestoreService.updateUserPortfolio(userId, portfolioForFirestore);
        setLastSaved(new Date());
      }
    } catch (error) {
      console.error('Auto-save portfolio error:', error);
      // Don't show error to user for auto-save failures
    } finally {
      setSaving(false);
    }
  };

  // Load existing portfolio data on component mount
  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        const userId = user?.uid || localStorage.getItem('userId');
        if (userId) {
          const savedPortfolio = await FreelanceFirestoreService.getUserPortfolio(userId);
          if (savedPortfolio && savedPortfolio.length > 0) {
            const portfolioWithImages = savedPortfolio.map((item: any) => ({
              ...item,
              images: item.images || []
            }));
            
            setPortfolioItems(portfolioWithImages);
            setActiveItem(portfolioWithImages[0].id);
          }
        }
      } catch (error) {
        console.error('Error loading portfolio data:', error);
      }
    };

    loadPortfolioData();
  }, [user]);

  const getCurrentItem = () => {
    return portfolioItems.find(item => item.id === activeItem) || portfolioItems[0];
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    const updatedItems = portfolioItems.map(item => 
      item.id === activeItem ? { ...item, [name]: value } : item
    );
    
    setPortfolioItems(updatedItems);
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Auto-save after a short delay
    setTimeout(() => autoSavePortfolio(updatedItems), 1000);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setUploading(true);
    
    try {
      const files = Array.from(e.target.files || []);
      const newImages: Array<{ id: string; url: string }> = [];

      // Validate file types and sizes
      const validFiles = files.filter(file => {
        const isValidType = file.type.startsWith('image/');
        const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
        return isValidType && isValidSize;
      });

      if (validFiles.length === 0) {
        throw new Error('Please select valid image files (max 5MB each)');
      }

      // Upload each image to ImageBB
      for (const file of validFiles) {
        if (newImages.length >= 5) break; // Limit to 5 images total

        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(`https://api.imgbb.com/1/upload?key=46b63b5b6c2f3f7a0b7c4f8a4d2e1c9f`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          newImages.push({
            id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            url: data.data.url,
          });
        } else {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error?.message || 'Failed to upload image');
        }
      }

      if (newImages.length > 0) {
        const updatedItems = portfolioItems.map(item => 
          item.id === activeItem 
            ? { 
                ...item, 
                images: [...item.images, ...newImages].slice(0, 5) // Limit to 5 images
              } 
            : item
        );
        
        setPortfolioItems(updatedItems);
        
        // Auto-save after image upload
        setTimeout(() => autoSavePortfolio(updatedItems), 500);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      setErrors(prev => ({ 
        ...prev, 
        [`item_${portfolioItems.findIndex(i => i.id === activeItem)}_images`]: 'Failed to upload images. Please try again.' 
      }));
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (imageId: string) => {
    const updatedItems = portfolioItems.map(item => 
      item.id === activeItem 
        ? { 
            ...item, 
            images: item.images.filter(img => img.id !== imageId)
          } 
        : item
    );
    
    setPortfolioItems(updatedItems);
    
    // Auto-save after image removal
    setTimeout(() => autoSavePortfolio(updatedItems), 500);
  };

  const addPortfolioItem = () => {
    const newItem: PortfolioItem = {
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: '',
      description: '',
      category: 'web-development',
      images: []
    };
    
    const updatedItems = [...portfolioItems, newItem];
    setPortfolioItems(updatedItems);
    setActiveItem(newItem.id);
    
    // Auto-save after adding new item
    setTimeout(() => autoSavePortfolio(updatedItems), 500);
  };

  const removePortfolioItem = (id: string) => {
    const updatedItems = portfolioItems.filter(item => item.id !== id);
    setPortfolioItems(updatedItems);
    
    // If we're removing the active item, select the first remaining item
    if (id === activeItem && updatedItems.length > 0) {
      setActiveItem(updatedItems[0].id);
    }
    
    // Auto-save after removing item
    setTimeout(() => autoSavePortfolio(updatedItems), 500);
  };

  const validatePortfolio = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    // Only validate if there are items
    if (portfolioItems.length > 0) {
      // Check each item
      portfolioItems.forEach((item, index) => {
        if (!item.title) {
          newErrors[`item_${index}_title`] = `Title is required for portfolio item ${index + 1}`;
          isValid = false;
        }
        
        if (!item.category) {
          newErrors[`item_${index}_category`] = `Category is required for portfolio item ${index + 1}`;
          isValid = false;
        }
        
        if (item.images.length === 0) {
          newErrors[`item_${index}_images`] = `At least one image is required for portfolio item ${index + 1}`;
          isValid = false;
        }
      });
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    // Portfolio is optional, so we can continue even without validation
    // But we still validate to show any errors
    validatePortfolio();
    
    // Ensure final save to Firebase before proceeding
    setSaving(true);
    try {
      await autoSavePortfolio(portfolioItems);
    } catch (error) {
      console.error('Error saving portfolio on submit:', error);
    } finally {
      setSaving(false);
    }
    
    // Submit the data
    onNext({ portfolioItems });
  };

  const currentItem = getCurrentItem();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Showcase Your Work</h2>
      <p className="text-[#2E2E2E] mb-8">
        Add samples of your work to showcase your skills and attract potential clients.
        <br />
        <span className="text-sm text-[#FF6B00]">(This step is optional, you can add portfolio items later)</span>
      </p>
      
      {/* Saving indicator */}
      {saving && (
        <div className="mb-4 flex items-center text-sm text-[#FF6B00]">
          <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Saving portfolio...
        </div>
      )}

      {lastSaved && !saving && (
        <div className="mb-4 text-sm text-green-600">
          ✓ Last saved: {lastSaved.toLocaleTimeString()}
        </div>
      )}

      {/* Portfolio Tabs */}
      <div className="mb-6 flex items-center">
        <div className="flex space-x-2 overflow-x-auto pb-2 flex-grow">
          {portfolioItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors duration-200 ${
                item.id === activeItem 
                ? 'bg-[#FF6B00] text-white' 
                : 'bg-[#ffeee3] hover:bg-[#ffeee3] text-[#2E2E2E]'
              }`}
            >
              {item.title || `Project ${index + 1}`}
            </button>
          ))}
        </div>
        
        {portfolioItems.length < 5 && (
          <button
            onClick={addPortfolioItem}
            className="ml-2 p-2 bg-[#ffeee3] text-[#FF6B00] rounded-lg hover:bg-[#ffeee3] transition-colors"
            title="Add Portfolio Item"
          >
            <Plus size={20} />
          </button>
        )}
      </div>
      
      {/* Current Portfolio Item Form */}
      <div className="bg-white border border-[#ffeee3] rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            {currentItem.title ? currentItem.title : 'New Portfolio Item'}
          </h3>
          {portfolioItems.length > 1 && (
            <button
              onClick={() => removePortfolioItem(currentItem.id)}
              className="text-[#FF6B00] hover:text-[#2E2E2E] flex items-center text-sm"
            >
              <Trash2 size={16} className="mr-1" /> Remove
            </button>
          )}
        </div>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-[#2E2E2E] mb-1">
              Project Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={currentItem.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none ${
                errors[`item_${portfolioItems.findIndex(i => i.id === currentItem.id)}_title`] 
                  ? 'border-[#FF6B00]' 
                  : 'border-[#ffeee3]'
              }`}
              placeholder="e.g. E-commerce Website Redesign"
            />
            {errors[`item_${portfolioItems.findIndex(i => i.id === currentItem.id)}_title`] && (
              <p className="mt-1 text-sm text-[#FF6B00]">
                {errors[`item_${portfolioItems.findIndex(i => i.id === currentItem.id)}_title`]}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-[#2E2E2E] mb-1">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={currentItem.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none ${
                errors[`item_${portfolioItems.findIndex(i => i.id === currentItem.id)}_category`] 
                  ? 'border-[#FF6B00]' 
                  : 'border-[#ffeee3]'
              }`}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors[`item_${portfolioItems.findIndex(i => i.id === currentItem.id)}_category`] && (
              <p className="mt-1 text-sm text-[#FF6B00]">
                {errors[`item_${portfolioItems.findIndex(i => i.id === currentItem.id)}_category`]}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-[#2E2E2E] mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={currentItem.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
              placeholder="Describe your project, your role, and the results achieved..."
            />
          </div>
          
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-[#2E2E2E] mb-1">
              Project URL (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ExternalLink size={16} className="text-[#ffeee3]" />
              </div>
              <input
                type="url"
                id="link"
                name="link"
                value={currentItem.link || ''}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                placeholder="https://example.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
              Portfolio Images * <span className="text-[#ffeee3] text-xs">(Up to 5 images, max 5MB each)</span>
            </label>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
              {currentItem.images.map(image => (
                <div 
                  key={image.id} 
                  className="relative aspect-square border border-[#ffeee3] rounded-lg overflow-hidden group"
                >
                  <img 
                    src={image.url} 
                    alt={`Portfolio ${portfolioItems.findIndex(i => i.id === currentItem.id) + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(image.id)}
                    className="absolute top-2 right-2 p-1 bg-[#FF6B00] text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              
              {currentItem.images.length < 5 && (
                <div className="aspect-square border-2 border-dashed border-[#FF6B00] rounded-lg flex flex-col items-center justify-center bg-[#ffeee3] hover:bg-[#fff0e6] transition-colors cursor-pointer">
                  <input
                    id="imageUpload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                  <label 
                    htmlFor="imageUpload" 
                    className="cursor-pointer w-full h-full flex flex-col items-center justify-center p-2"
                  >
                    {uploading ? (
                      <div className="flex flex-col items-center justify-center">
                        <svg className="animate-spin h-6 w-6 text-[#FF6B00]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="mt-2 text-xs text-[#FF6B00] text-center">Uploading...</span>
                      </div>
                    ) : (
                      <>
                        <Upload size={20} className="text-[#FF6B00] mb-1" />
                        <span className="text-xs text-[#FF6B00] text-center font-medium">Upload Image</span>
                        <span className="text-xs text-gray-500 text-center mt-1">Click to select</span>
                      </>
                    )}
                  </label>
                </div>
              )}
            </div>
            
            {errors[`item_${portfolioItems.findIndex(i => i.id === currentItem.id)}_images`] && (
              <p className="mt-1 text-sm text-[#FF6B00]">
                {errors[`item_${portfolioItems.findIndex(i => i.id === currentItem.id)}_images`]}
              </p>
            )}
            
            <div className="flex items-center justify-center space-x-6 bg-[#ffeee3] p-4 rounded-lg">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-[#ffeee3] flex items-center justify-center mx-auto mb-2">
                  <Camera size={18} className="text-[#FF6B00]" />
                </div>
                <p className="text-sm text-[#2E2E2E]">Photos</p>
              </div>
              
              <div className="text-center opacity-50">
                <div className="w-10 h-10 rounded-full bg-[#ffeee3] flex items-center justify-center mx-auto mb-2">
                  <FileText size={18} className="text-[#2E2E2E]" />
                </div>
                <p className="text-sm text-[#2E2E2E]">Documents <span className="text-xs">(Coming soon)</span></p>
              </div>
              
              <div className="text-center opacity-50">
                <div className="w-10 h-10 rounded-full bg-[#ffeee3] flex items-center justify-center mx-auto mb-2">
                  <Upload size={18} className="text-[#2E2E2E]" />
                </div>
                <p className="text-sm text-[#2E2E2E]">Other Files <span className="text-xs">(Coming soon)</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="mt-8 space-y-4">
        {/* Main action buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={onBack}
            className="order-2 md:order-1 w-full md:w-auto border border-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3] font-medium px-8 py-3 rounded-lg transition-colors duration-300"
          >
            Back
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="order-1 md:order-2 w-full md:flex-1 bg-[#FF6B00] hover:bg-[#FF9F45] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium px-8 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              portfolioItems.some(item => item.title && item.images.length > 0) ? 'Save & Continue' : 'Next'
            )}
          </button>
        </div>
        
        {/* Skip option */}
        {portfolioItems.some(item => item.title && item.images.length > 0) && (
          <div className="text-center">
            <button
              onClick={() => onNext({ portfolioItems: [] })}
              className="text-sm text-gray-500 hover:text-[#FF6B00] underline transition-colors duration-200"
            >
              Skip for now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerPortfolioStep;














