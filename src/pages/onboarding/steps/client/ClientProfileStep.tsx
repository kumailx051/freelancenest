import React, { useState } from 'react';
import { Upload, X, Building } from 'lucide-react';

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
  const [formData, setFormData] = useState({
    fullName: user.name || '',
    jobTitle: '',
    companyName: '',
    companySize: '',
    industry: '',
    companyWebsite: '',
    location: '',
    description: '',
    profilePicture: null as File | null,
    profilePicturePreview: '' as string,
    companyLogo: null as File | null,
    companyLogoPreview: '' as string
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        profilePicture: file,
        profilePicturePreview: URL.createObjectURL(file)
      });
    }
  };

  const removeProfilePicture = () => {
    setFormData({
      ...formData,
      profilePicture: null,
      profilePicturePreview: ''
    });
  };

  const handleCompanyLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        companyLogo: file,
        companyLogoPreview: URL.createObjectURL(file)
      });
    }
  };

  const removeCompanyLogo = () => {
    setFormData({
      ...formData,
      companyLogo: null,
      companyLogoPreview: ''
    });
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

  const handleSubmit = () => {
    if (validateForm()) {
      onNext(formData);
    } else {
      // Scroll to first error
      const firstErrorField = document.querySelector('[aria-invalid="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Complete Your Client Profile</h2>

      <div className="space-y-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center md:flex-row md:items-start gap-6 mb-8">
          <div className="w-32 h-32 relative">
            {formData.profilePicturePreview ? (
              <div className="w-full h-full rounded-full overflow-hidden relative bg-[#ffeee3]">
                <img 
                  src={formData.profilePicturePreview} 
                  alt="Profile Preview" 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={removeProfilePicture}
                  className="absolute top-0 right-0 bg-[#FF6B00] text-white p-1 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="w-full h-full rounded-full bg-[#ffeee3] flex items-center justify-center border-2 border-dashed border-[#ffeee3]">
                <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                  <Upload size={24} className="text-[#ffeee3]" />
                  <span className="text-xs text-[#ffeee3] mt-1">Upload</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleProfilePictureChange}
                  />
                </label>
              </div>
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
              <div className="flex items-center gap-4">
                {/* Company Logo */}
                <div className="w-24 h-24 relative flex-shrink-0">
                  {formData.companyLogoPreview ? (
                    <div className="w-full h-full rounded-lg overflow-hidden relative bg-[#ffeee3]">
                      <img 
                        src={formData.companyLogoPreview} 
                        alt="Company Logo Preview" 
                        className="w-full h-full object-contain"
                      />
                      <button 
                        onClick={removeCompanyLogo}
                        className="absolute top-0 right-0 bg-[#FF6B00] text-white p-1 rounded-full"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-full h-full rounded-lg bg-[#ffeee3] flex items-center justify-center border-2 border-dashed border-[#ffeee3]">
                      <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                        <Upload size={20} className="text-[#ffeee3]" />
                        <span className="text-xs text-[#ffeee3] mt-1">Logo</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*" 
                          onChange={handleCompanyLogoChange}
                        />
                      </label>
                    </div>
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

      {/* Navigation buttons */}
      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <button
          onClick={onBack}
          className="order-2 md:order-1 w-full md:w-auto border border-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3] font-medium px-8 py-3 rounded-lg transition-colors duration-300"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="order-1 md:order-2 w-full md:flex-1 bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium px-8 py-3 rounded-lg transition-colors duration-300"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default ClientProfileStep;












