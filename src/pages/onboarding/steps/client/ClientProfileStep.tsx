import React, { useState, useEffect } from 'react';
import { X, Building, Camera, Loader } from 'lucide-react';
import { useAuth } from '../../../../contexts/AuthContext';
import { FreelanceFirestoreService } from '../../../../lib/firestoreService';
import { ImageUploadService, ImageUploadError } from '../../../../lib/imageUpload';

interface ClientProfileStepProps {
  user: any;
  onNext: (data?: any) => void;
  onBack: () => void;
}

const ClientProfileStep: React.FC<ClientProfileStepProps> = ({ 
  user, 
  onNext, 
  onBack 
}) => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.displayName || user?.name || '',
    jobTitle: '',
    companyName: '',
    companySize: '',
    industry: '',
    companyWebsite: '',
    location: '',
    description: '',
    profilePicture: null as File | null,
    profilePicturePreview: '' as string,
    profilePictureUrl: '' as string,
    companyLogo: null as File | null,
    companyLogoPreview: '' as string,
    companyLogoUrl: '' as string
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      if (formData.profilePicturePreview) {
        ImageUploadService.revokePreviewUrl(formData.profilePicturePreview);
      }
      if (formData.companyLogoPreview) {
        ImageUploadService.revokePreviewUrl(formData.companyLogoPreview);
      }
    };
  }, []); // Empty dependency array means this runs on unmount

  const companySizeOptions = [
    { value: 'solo', label: 'Solo Entrepreneur' },
    { value: 'small', label: 'Small Business (2-10 employees)' },
    { value: 'medium', label: 'Medium Business (11-50 employees)' },
    { value: 'large', label: 'Large Business (51-200 employees)' },
    { value: 'enterprise', label: 'Enterprise (201+ employees)' }
  ];

  const industryOptions = [
    'Technology & Software',
    'E-commerce & Retail',
    'Healthcare & Medical',
    'Finance & Banking',
    'Education & Training',
    'Marketing & Advertising',
    'Media & Entertainment',
    'Travel & Hospitality',
    'Real Estate & Construction',
    'Manufacturing & Industrial',
    'Non-profit & Charity',
    'Other'
  ];



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Set preview immediately
      setFormData({
        ...formData,
        profilePicture: file,
        profilePicturePreview: ImageUploadService.createPreviewUrl(file)
      });
      
      // Clear any previous errors
      if (errors.profilePicture) {
        setErrors({ ...errors, profilePicture: '' });
      }
      
      // Upload to ImageBB
      setUploadingProfile(true);
      try {
        const result = await ImageUploadService.uploadToImageBB(file, { maxSizeInMB: 5 });
        setFormData(prev => ({
          ...prev,
          profilePictureUrl: result.url
        }));
      } catch (error) {
        if (error instanceof ImageUploadError) {
          setErrors({ ...errors, profilePicture: error.message });
        } else {
          setErrors({ ...errors, profilePicture: 'Failed to upload image. Please try again.' });
        }
      } finally {
        setUploadingProfile(false);
      }
    }
  };

  const removeProfilePicture = () => {
    // Revoke the preview URL to free memory
    if (formData.profilePicturePreview) {
      ImageUploadService.revokePreviewUrl(formData.profilePicturePreview);
    }
    
    setFormData({
      ...formData,
      profilePicture: null,
      profilePicturePreview: '',
      profilePictureUrl: ''
    });
    if (errors.profilePicture) {
      setErrors({ ...errors, profilePicture: '' });
    }
  };

  const handleCompanyLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Set preview immediately
      setFormData({
        ...formData,
        companyLogo: file,
        companyLogoPreview: ImageUploadService.createPreviewUrl(file)
      });
      
      // Clear any previous errors
      if (errors.companyLogo) {
        setErrors({ ...errors, companyLogo: '' });
      }
      
      // Upload to ImageBB
      setUploadingLogo(true);
      try {
        const result = await ImageUploadService.uploadToImageBB(file, { maxSizeInMB: 5 });
        setFormData(prev => ({
          ...prev,
          companyLogoUrl: result.url
        }));
      } catch (error) {
        if (error instanceof ImageUploadError) {
          setErrors({ ...errors, companyLogo: error.message });
        } else {
          setErrors({ ...errors, companyLogo: 'Failed to upload image. Please try again.' });
        }
      } finally {
        setUploadingLogo(false);
      }
    }
  };

  const removeCompanyLogo = () => {
    // Revoke the preview URL to free memory
    if (formData.companyLogoPreview) {
      ImageUploadService.revokePreviewUrl(formData.companyLogoPreview);
    }
    
    setFormData({
      ...formData,
      companyLogo: null,
      companyLogoPreview: '',
      companyLogoUrl: ''
    });
    if (errors.companyLogo) {
      setErrors({ ...errors, companyLogo: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.location) newErrors.location = 'Location is required';
    
    // Company name is required only if they've filled out other company details
    if ((formData.companyWebsite || formData.companySize || formData.industry || formData.companyLogoPreview) && !formData.companyName) {
      newErrors.companyName = 'Company name is required if you provide company details';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = document.querySelector('[aria-invalid="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    if (!currentUser) {
      setErrors({ ...errors, submit: 'You must be logged in to continue' });
      return;
    }

    setLoading(true);
    try {
      // Prepare client profile data for Firebase
      const clientProfileData = {
        userId: currentUser.uid,
        email: currentUser.email,
        userType: 'client',
        profile: {
          fullName: formData.fullName,
          jobTitle: formData.jobTitle,
          location: formData.location,
          profilePictureUrl: formData.profilePictureUrl,
          profileCompleted: true,
        },
        company: {
          name: formData.companyName,
          size: formData.companySize,
          industry: formData.industry,
          website: formData.companyWebsite,
          description: formData.description,
          logoUrl: formData.companyLogoUrl,
        },
        onboardingStep: 'completed',
        profileStep: 'completed',
        isActive: true,
      };

      // Save to Firebase
      const existingProfile = await FreelanceFirestoreService.getUserProfile(currentUser.uid);
      
      if (existingProfile && existingProfile.length > 0) {
        // Update existing profile
        await FreelanceFirestoreService.update('users', existingProfile[0].id, clientProfileData);
      } else {
        // Create new profile
        await FreelanceFirestoreService.create('users', clientProfileData);
      }

      // Pass the data to the next step
      onNext({
        ...formData,
        profileSaved: true,
        userId: currentUser.uid
      });
      
    } catch (error) {
      console.error('Error saving client profile:', error);
      setErrors({ 
        ...errors, 
        submit: 'Failed to save profile. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Complete Your Client Profile</h2>

      <div className="space-y-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center md:flex-row md:items-start gap-6 mb-8">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 relative">
              {formData.profilePicturePreview ? (
                <div className="w-full h-full rounded-full overflow-hidden relative bg-[#ffeee3]">
                  <img 
                    src={formData.profilePicturePreview} 
                    alt="Profile Preview" 
                    className="w-full h-full object-cover"
                  />
                  {uploadingProfile && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                      <Loader className="animate-spin text-white" size={24} />
                    </div>
                  )}
                  <button 
                    onClick={removeProfilePicture}
                    className="absolute top-0 right-0 bg-[#FF6B00] hover:bg-[#FF9F45] text-white p-1 rounded-full transition-colors"
                    disabled={uploadingProfile}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="w-full h-full rounded-full bg-[#ffeee3] flex items-center justify-center border-2 border-dashed border-[#FF6B00]">
                  <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full hover:bg-[#fff5eb] transition-colors rounded-full">
                    {uploadingProfile ? (
                      <Loader className="animate-spin text-[#FF6B00]" size={24} />
                    ) : (
                      <>
                        <Camera size={24} className="text-[#FF6B00]" />
                        <span className="text-xs text-[#FF6B00] mt-1 font-medium">Upload Photo</span>
                      </>
                    )}
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleProfilePictureChange}
                      disabled={uploadingProfile}
                    />
                  </label>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center max-w-[120px]">
              Upload your profile picture (max 5MB)
            </p>
            {errors.profilePicture && (
              <p className="text-xs text-[#FF6B00] mt-1 text-center">{errors.profilePicture}</p>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-2">Personal Details</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none ${
                    errors.fullName ? 'border-[#FF6B00]' : 'border-[#ffeee3]'
                  }`}
                  aria-invalid={!!errors.fullName}
                />
                {errors.fullName && <p className="mt-1 text-sm text-[#FF6B00]">{errors.fullName}</p>}
              </div>
              
              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                  Job Title (Optional)
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g. Project Manager"
                  className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="border-t border-[#ffeee3] pt-6">
          <div className="flex items-center mb-4">
            <Building size={20} className="text-[#FF6B00] mr-2" />
            <h3 className="text-lg font-medium">Company Information (Optional)</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <div className="flex items-start gap-4">
                {/* Company Logo */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 relative flex-shrink-0">
                    {formData.companyLogoPreview ? (
                      <div className="w-full h-full rounded-lg overflow-hidden relative bg-[#ffeee3]">
                        <img 
                          src={formData.companyLogoPreview} 
                          alt="Company Logo Preview" 
                          className="w-full h-full object-contain"
                        />
                        {uploadingLogo && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                            <Loader className="animate-spin text-white" size={20} />
                          </div>
                        )}
                        <button 
                          onClick={removeCompanyLogo}
                          className="absolute top-0 right-0 bg-[#FF6B00] hover:bg-[#FF9F45] text-white p-1 rounded-full transition-colors"
                          disabled={uploadingLogo}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-full rounded-lg bg-[#ffeee3] flex items-center justify-center border-2 border-dashed border-[#FF6B00]">
                        <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full hover:bg-[#fff5eb] transition-colors rounded-lg">
                          {uploadingLogo ? (
                            <Loader className="animate-spin text-[#FF6B00]" size={20} />
                          ) : (
                            <>
                              <Building size={20} className="text-[#FF6B00]" />
                              <span className="text-xs text-[#FF6B00] mt-1 font-medium">Upload Logo</span>
                            </>
                          )}
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleCompanyLogoChange}
                            disabled={uploadingLogo}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    Company logo (optional)
                  </p>
                  {errors.companyLogo && (
                    <p className="text-xs text-[#FF6B00] mt-1 text-center">{errors.companyLogo}</p>
                  )}
                </div>
                
                <div className="flex-1">
                  <label htmlFor="companyName" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none ${
                      errors.companyName ? 'border-[#FF6B00]' : 'border-[#ffeee3]'
                    }`}
                    aria-invalid={!!errors.companyName}
                  />
                  {errors.companyName && <p className="mt-1 text-sm text-[#FF6B00]">{errors.companyName}</p>}
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="companySize" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                Company Size
              </label>
              <select
                id="companySize"
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
              >
                <option value="">Select company size</option>
                {companySizeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                Industry
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
              >
                <option value="">Select industry</option>
                {industryOptions.map(industry => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="companyWebsite" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                Company Website
              </label>
              <input
                type="url"
                id="companyWebsite"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. New York, USA"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none ${
                  errors.location ? 'border-[#FF6B00]' : 'border-[#ffeee3]'
                }`}
                aria-invalid={!!errors.location}
              />
              {errors.location && <p className="mt-1 text-sm text-[#FF6B00]">{errors.location}</p>}
            </div>
          </div>
        </div>
        
        {/* Company Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-[#2E2E2E] mb-1">
            About Your Company (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
            placeholder="Tell freelancers about your company, its mission, and the kind of work you typically need..."
          />
        </div>
      </div>

      {/* Error Display */}
      {errors.submit && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{errors.submit}</p>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <button
          onClick={onBack}
          disabled={loading}
          className="order-2 md:order-1 w-full md:w-auto border border-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3] font-medium px-8 py-3 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading || uploadingProfile || uploadingLogo}
          className="order-1 md:order-2 w-full md:flex-1 bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium px-8 py-3 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="animate-spin" size={20} />
              Saving Profile...
            </>
          ) : (
            'Save & Continue'
          )}
        </button>
      </div>
    </div>
  );
};

export default ClientProfileStep;












