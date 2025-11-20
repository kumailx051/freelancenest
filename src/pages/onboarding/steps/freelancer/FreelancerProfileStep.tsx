import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { FreelanceFirestoreService } from '../../../../lib/firestoreService';

interface FreelancerProfileStepProps {
  user: any;
  onNext: (data?: any) => void;
  onBack: () => void;
}

const FreelancerProfileStep: React.FC<FreelancerProfileStepProps> = ({ 
  user, 
  onNext, 
  onBack 
}) => {
  const [formData, setFormData] = useState({
    fullName: user.name || '',
    profileTitle: '',
    bio: '',
    location: '',
    education: [{ school: '', degree: '', fieldOfStudy: '', graduationYear: '' }],
    experience: [{ title: '', company: '', location: '', from: '', to: '', current: false, description: '' }],
    hourlyRate: '',
    profilePicture: null as File | null,
    profilePicturePreview: '' as string,
    profilePictureUrl: '' as string
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [name]: value };
    setFormData({ ...formData, education: newEducation });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { school: '', degree: '', fieldOfStudy: '', graduationYear: '' }]
    });
  };

  const removeEducation = (index: number) => {
    const newEducation = [...formData.education];
    newEducation.splice(index, 1);
    setFormData({ ...formData, education: newEducation });
  };

  const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    const newExperience = [...formData.experience];
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      newExperience[index] = { ...newExperience[index], [name]: checked };
    } else {
      newExperience[index] = { ...newExperience[index], [name]: value };
    }
    
    setFormData({ ...formData, experience: newExperience });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { title: '', company: '', location: '', from: '', to: '', current: false, description: '' }]
    });
  };

  const removeExperience = (index: number) => {
    const newExperience = [...formData.experience];
    newExperience.splice(index, 1);
    setFormData({ ...formData, experience: newExperience });
  };

  const uploadToImageBB = async (file: File): Promise<string> => {
    const API_KEY = 'af89815a37ad8b0ac30f6e34839d6735';
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', API_KEY);

    try {
      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        return result.data.url;
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('ImageBB upload error:', error);
      throw error;
    }
  };

  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploading(true);
      
      try {
        // Upload to ImageBB
        const imageUrl = await uploadToImageBB(file);
        
        setFormData({
          ...formData,
          profilePicture: file,
          profilePicturePreview: URL.createObjectURL(file),
          profilePictureUrl: imageUrl
        });
        
        // Clear any previous upload errors
        if (errors.profilePicture) {
          setErrors({ ...errors, profilePicture: '' });
        }
      } catch (error) {
        setErrors({ ...errors, profilePicture: 'Failed to upload image. Please try again.' });
      } finally {
        setUploading(false);
      }
    }
  };

  const removeProfilePicture = () => {
    setFormData({
      ...formData,
      profilePicture: null,
      profilePicturePreview: '',
      profilePictureUrl: ''
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.profileTitle) newErrors.profileTitle = 'Professional title is required';
    if (!formData.bio) newErrors.bio = 'A short bio is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.hourlyRate) newErrors.hourlyRate = 'Hourly rate is required';
    
    // Only check first education entry if it exists
    if (formData.education.length > 0) {
      const firstEdu = formData.education[0];
      if (firstEdu.school && (!firstEdu.degree || !firstEdu.fieldOfStudy || !firstEdu.graduationYear)) {
        newErrors['education'] = 'Please complete all education fields';
      }
    }

    // Only check first experience entry if it exists
    if (formData.experience.length > 0) {
      const firstExp = formData.experience[0];
      if (firstExp.company && (!firstExp.title || !firstExp.from)) {
        newErrors['experience'] = 'Please complete all required experience fields';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setSaving(true);
      
      try {
        // Get user ID from localStorage
        const userId = localStorage.getItem('userId');
        
        if (userId) {
          // Prepare profile data for Firebase
          const profileData = {
            fullName: formData.fullName,
            profileTitle: formData.profileTitle,
            bio: formData.bio,
            location: formData.location,
            hourlyRate: parseFloat(formData.hourlyRate) || 0,
            profilePictureUrl: formData.profilePictureUrl,
            education: formData.education.filter(edu => 
              edu.school && edu.degree && edu.fieldOfStudy && edu.graduationYear
            ),
            experience: formData.experience.filter(exp => 
              exp.title && exp.company && exp.from
            ),
            profileCompleted: true,
            profileStep: 'completed',
            updatedAt: new Date()
          };

          // Update user profile in Firestore
          await FreelanceFirestoreService.updateUserProfile(userId, profileData);
          
          // Pass data to next step
          onNext({ ...formData, ...profileData });
        } else {
          throw new Error('User ID not found');
        }
      } catch (error) {
        console.error('Error saving profile:', error);
        setErrors({ 
          ...errors, 
          submit: 'Failed to save profile. Please try again.' 
        });
      } finally {
        setSaving(false);
      }
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
      <h2 className="text-2xl font-bold mb-6">Complete Your Profile</h2>

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
                  className="absolute top-0 right-0 bg-[#FF6B00] text-white p-1 rounded-full hover:bg-[#FF9F45] transition-colors"
                  disabled={uploading}
                >
                  <X size={16} />
                </button>
                {uploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full rounded-full bg-[#ffeee3] flex items-center justify-center border-2 border-dashed border-[#FF6B00] hover:border-[#FF9F45] transition-colors">
                <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-center p-2">
                  {uploading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-[#FF6B00] border-t-transparent rounded-full animate-spin mb-2"></div>
                      <span className="text-xs text-[#FF6B00] font-medium">Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={24} className="text-[#FF6B00] mb-1" />
                      <span className="text-xs text-[#FF6B00] font-medium">Upload</span>
                      <span className="text-xs text-[#FF6B00]">Profile</span>
                    </>
                  )}
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleProfilePictureChange}
                    disabled={uploading}
                  />
                </label>
              </div>
            )}
          </div>
          
          {/* Profile Picture Error */}
          {errors.profilePicture && (
            <div className="text-red-500 text-sm mt-2">
              {errors.profilePicture}
            </div>
          )}
          
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-2">Profile Details</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                  Full Name
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
                <label htmlFor="profileTitle" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                  Professional Title
                </label>
                <input
                  type="text"
                  id="profileTitle"
                  name="profileTitle"
                  value={formData.profileTitle}
                  onChange={handleChange}
                  placeholder="e.g. Full Stack Developer"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none ${
                    errors.profileTitle ? 'border-[#FF6B00]' : 'border-[#ffeee3]'
                  }`}
                  aria-invalid={!!errors.profileTitle}
                />
                {errors.profileTitle && <p className="mt-1 text-sm text-[#FF6B00]">{errors.profileTitle}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-[#2E2E2E] mb-1">
            Professional Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            placeholder="Describe your experience, skills, and what makes you unique..."
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none ${
              errors.bio ? 'border-[#FF6B00]' : 'border-[#ffeee3]'
            }`}
            aria-invalid={!!errors.bio}
          />
          {errors.bio && <p className="mt-1 text-sm text-[#FF6B00]">{errors.bio}</p>}
          <p className="mt-1 text-sm text-[#ffeee3]">
            Write a short professional bio that highlights your expertise and experience.
          </p>
        </div>

        {/* Location & Rate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-[#2E2E2E] mb-1">
              Location
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
          
          <div>
            <label htmlFor="hourlyRate" className="block text-sm font-medium text-[#2E2E2E] mb-1">
              Hourly Rate (USD)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-[#ffeee3] sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="hourlyRate"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleChange}
                placeholder="0.00"
                className={`w-full pl-7 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none ${
                  errors.hourlyRate ? 'border-[#FF6B00]' : 'border-[#ffeee3]'
                }`}
                aria-invalid={!!errors.hourlyRate}
              />
            </div>
            {errors.hourlyRate && <p className="mt-1 text-sm text-[#FF6B00]">{errors.hourlyRate}</p>}
          </div>
        </div>

        {/* Education */}
        <div className="border-t border-[#ffeee3] pt-6">
          <h3 className="text-lg font-medium mb-4">Education</h3>
          
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-4 p-4 border border-[#ffeee3] rounded-lg bg-[#ffeee3]">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Education #{index + 1}</h4>
                {index > 0 && (
                  <button 
                    type="button" 
                    onClick={() => removeEducation(index)}
                    className="text-[#FF6B00] hover:text-[#2E2E2E]"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`education.${index}.school`} className="block text-sm font-medium text-[#2E2E2E] mb-1">
                    School/University
                  </label>
                  <input
                    type="text"
                    id={`education.${index}.school`}
                    name="school"
                    value={edu.school}
                    onChange={(e) => handleEducationChange(index, e)}
                    className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor={`education.${index}.degree`} className="block text-sm font-medium text-[#2E2E2E] mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    id={`education.${index}.degree`}
                    name="degree"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, e)}
                    className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor={`education.${index}.fieldOfStudy`} className="block text-sm font-medium text-[#2E2E2E] mb-1">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    id={`education.${index}.fieldOfStudy`}
                    name="fieldOfStudy"
                    value={edu.fieldOfStudy}
                    onChange={(e) => handleEducationChange(index, e)}
                    className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor={`education.${index}.graduationYear`} className="block text-sm font-medium text-[#2E2E2E] mb-1">
                    Graduation Year
                  </label>
                  <input
                    type="text"
                    id={`education.${index}.graduationYear`}
                    name="graduationYear"
                    value={edu.graduationYear}
                    onChange={(e) => handleEducationChange(index, e)}
                    className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
          
          {errors.education && <p className="mt-1 text-sm text-[#FF6B00]">{errors.education}</p>}
          
          <button
            type="button"
            onClick={addEducation}
            className="mt-2 text-[#FF6B00] hover:text-[#2E2E2E] font-medium flex items-center"
          >
            + Add Education
          </button>
        </div>

        {/* Experience */}
        <div className="border-t border-[#ffeee3] pt-6">
          <h3 className="text-lg font-medium mb-4">Work Experience</h3>
          
          {formData.experience.map((exp, index) => (
            <div key={index} className="mb-4 p-4 border border-[#ffeee3] rounded-lg bg-[#ffeee3]">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Experience #{index + 1}</h4>
                {index > 0 && (
                  <button 
                    type="button" 
                    onClick={() => removeExperience(index)}
                    className="text-[#FF6B00] hover:text-[#2E2E2E]"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`experience.${index}.title`} className="block text-sm font-medium text-[#2E2E2E] mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    id={`experience.${index}.title`}
                    name="title"
                    value={exp.title}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor={`experience.${index}.company`} className="block text-sm font-medium text-[#2E2E2E] mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    id={`experience.${index}.company`}
                    name="company"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor={`experience.${index}.location`} className="block text-sm font-medium text-[#2E2E2E] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id={`experience.${index}.location`}
                    name="location"
                    value={exp.location}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                  />
                </div>
                
                <div className="flex items-center mt-6">
                  <input
                    type="checkbox"
                    id={`experience.${index}.current`}
                    name="current"
                    checked={exp.current}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="h-4 w-4 text-[#FF6B00] border-[#ffeee3] rounded"
                  />
                  <label htmlFor={`experience.${index}.current`} className="ml-2 block text-sm text-[#2E2E2E]">
                    I currently work here
                  </label>
                </div>
                
                <div>
                  <label htmlFor={`experience.${index}.from`} className="block text-sm font-medium text-[#2E2E2E] mb-1">
                    From
                  </label>
                  <input
                    type="month"
                    id={`experience.${index}.from`}
                    name="from"
                    value={exp.from}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                  />
                </div>
                
                {!exp.current && (
                  <div>
                    <label htmlFor={`experience.${index}.to`} className="block text-sm font-medium text-[#2E2E2E] mb-1">
                      To
                    </label>
                    <input
                      type="month"
                      id={`experience.${index}.to`}
                      name="to"
                      value={exp.to}
                      onChange={(e) => handleExperienceChange(index, e)}
                      className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                    />
                  </div>
                )}
              </div>
              
              <div className="mt-4">
                <label htmlFor={`experience.${index}.description`} className="block text-sm font-medium text-[#2E2E2E] mb-1">
                  Description
                </label>
                <textarea
                  id={`experience.${index}.description`}
                  name="description"
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, e)}
                  rows={3}
                  className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>
            </div>
          ))}
          
          {errors.experience && <p className="mt-1 text-sm text-[#FF6B00]">{errors.experience}</p>}
          
          <button
            type="button"
            onClick={addExperience}
            className="mt-2 text-[#FF6B00] hover:text-[#2E2E2E] font-medium flex items-center"
          >
            + Add Experience
          </button>
        </div>
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          <p className="text-sm font-medium">{errors.submit}</p>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <button
          onClick={onBack}
          disabled={saving}
          className="order-2 md:order-1 w-full md:w-auto border border-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3] font-medium px-8 py-3 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={saving || uploading}
          className="order-1 md:order-2 w-full md:flex-1 bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium px-8 py-3 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving Profile...
            </div>
          ) : (
            'Save & Continue'
          )}
        </button>
      </div>
    </div>
  );
};

export default FreelancerProfileStep;














