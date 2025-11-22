import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReportService } from '../lib/reportService';
import { ImageUploadService, ImageUploadError } from '../lib/imageUpload';

// Report problem categories
const reportCategories = [
  {
    id: "user-behavior",
    label: "User Behavior",
    description: "Report harassment, unprofessional conduct, or inappropriate communication",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    )
  },
  {
    id: "fraud",
    label: "Fraud or Scam",
    description: "Report suspicious payment requests, identity theft, or misrepresentation",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  },
  {
    id: "content",
    label: "Inappropriate Content",
    description: "Report listings, portfolios, or messages that violate our guidelines",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: "intellectual-property",
    label: "Intellectual Property",
    description: "Report copyright infringement, stolen work, or unauthorized use of assets",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    )
  },
  {
    id: "platform",
    label: "Platform Issue",
    description: "Report technical problems, bugs, or difficulties using the platform",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    id: "other",
    label: "Other Concern",
    description: "Report other issues not covered by the categories above",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

interface AttachmentFile {
  id: string;
  file: File;
  preview: string;
  uploading: boolean;
  uploaded: boolean;
  url?: string;
  error?: string;
}

const ReportProblemPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [reportSubject, setReportSubject] = useState<string>("");
  const [reportDescription, setReportDescription] = useState<string>("");
  const [urlLink, setUrlLink] = useState<string>("");
  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [reportId, setReportId] = useState<string>("");

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      attachments.forEach(att => ImageUploadService.revokePreviewUrl(att.preview));
    };
  }, [attachments]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: AttachmentFile[] = [];
    Array.from(files).forEach((file, index) => {
      if (attachments.length + newAttachments.length < 5) {
        const id = `${Date.now()}-${index}`;
        const preview = ImageUploadService.createPreviewUrl(file);
        newAttachments.push({
          id,
          file,
          preview,
          uploading: false,
          uploaded: false
        });
      }
    });

    setAttachments(prev => [...prev, ...newAttachments]);
    // Reset the input
    e.target.value = '';
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => {
      const attachment = prev.find(att => att.id === id);
      if (attachment) {
        ImageUploadService.revokePreviewUrl(attachment.preview);
      }
      return prev.filter(att => att.id !== id);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (!files) return;

    const newAttachments: AttachmentFile[] = [];
    Array.from(files).forEach((file, index) => {
      if (attachments.length + newAttachments.length < 5) {
        // Check file type
        if (file.type.startsWith('image/') || file.type === 'application/pdf') {
          const id = `${Date.now()}-${index}`;
          const preview = ImageUploadService.createPreviewUrl(file);
          newAttachments.push({
            id,
            file,
            preview,
            uploading: false,
            uploaded: false
          });
        }
      }
    });

    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const uploadAttachments = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    
    for (const attachment of attachments) {
      if (attachment.uploaded && attachment.url) {
        uploadedUrls.push(attachment.url);
        continue;
      }

      try {
        setAttachments(prev => prev.map(att => 
          att.id === attachment.id ? { ...att, uploading: true, error: undefined } : att
        ));

        const result = await ImageUploadService.uploadToImageBB(attachment.file);
        
        setAttachments(prev => prev.map(att => 
          att.id === attachment.id ? { 
            ...att, 
            uploading: false, 
            uploaded: true, 
            url: result.url 
          } : att
        ));

        uploadedUrls.push(result.url);
      } catch (error) {
        const errorMessage = error instanceof ImageUploadError 
          ? error.message 
          : 'Failed to upload image';
        
        setAttachments(prev => prev.map(att => 
          att.id === attachment.id ? { 
            ...att, 
            uploading: false, 
            error: errorMessage 
          } : att
        ));
      }
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!selectedCategory || !userName.trim() || !userEmail.trim() || !reportSubject.trim() || !reportDescription.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Upload attachments first
      const attachmentUrls = await uploadAttachments();
      
      // Check if any attachments failed to upload
      const failedAttachments = attachments.filter(att => att.error && !att.uploaded);
      if (failedAttachments.length > 0) {
        const proceed = window.confirm(
          `${failedAttachments.length} attachment(s) failed to upload. Do you want to submit the report without these attachments?`
        );
        if (!proceed) {
          setIsSubmitting(false);
          return;
        }
      }
      
      // Prepare report data
      const reportData = {
        category: selectedCategory!,
        categoryLabel: reportCategories.find(cat => cat.id === selectedCategory)?.label || '',
        userName: userName.trim(),
        userEmail: userEmail.trim(),
        reportSubject: reportSubject.trim(),
        reportDescription: reportDescription.trim(),
        urlLink: urlLink.trim() || null,
        attachments: attachmentUrls
      };

      // Save to Firebase using ReportService
      const result = await ReportService.submitReport(reportData);
      setReportId(result.referenceNumber);
      setIsSubmitted(true);
      
      console.log('Report submitted successfully with ID:', result.id);
    } catch (error) {
      console.error('Error submitting report:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit report. Please try again.';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E]/90">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-sm font-semibold mb-3">
              Trust & Safety
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Report a Problem</h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Help us maintain a safe and trustworthy environment by reporting issues. 
              Our team will investigate promptly.
            </p>
          </div>
        </div>
      </section>

      {isSubmitted ? (
        // Success message after submission
        <section className="py-20 bg-white">
          <div className="section-container">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-[#2E2E2E] mb-4">Report Submitted Successfully</h2>
              <p className="text-xl text-[#2E2E2E] mb-8">
                Thank you for helping us maintain a safe environment. Our team will review your report and take appropriate action.
              </p>
                <div className="bg-[#ffeee3] p-6 rounded-lg border border-[#ffeee3] mb-8">
                  <div className="text-left">
                    <p className="text-[#2E2E2E] mb-1">Reference Number:</p>
                    <p className="text-[#2E2E2E] font-semibold mb-4">{reportId}</p>
                    <p className="text-[#2E2E2E] mb-1">Submitted On:</p>
                    <p className="text-[#2E2E2E] font-semibold">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
              <div className="space-x-4">
                <button 
                  onClick={() => {
                    // Reset all form states
                    setIsSubmitted(false);
                    setSelectedCategory(null);
                    setUserName("");
                    setUserEmail("");
                    setReportSubject("");
                    setReportDescription("");
                    setUrlLink("");
                    setReportId("");
                    // Clean up attachment previews
                    attachments.forEach(att => ImageUploadService.revokePreviewUrl(att.preview));
                    setAttachments([]);
                  }} 
                  className="px-6 py-3 bg-white border border-[#ffeee3] rounded-lg text-[#2E2E2E] font-medium hover:bg-[#ffeee3] transition-colors"
                >
                  Submit Another Report
                </button>
                <button 
                  className="px-6 py-3 bg-[#FF6B00] text-white rounded-lg font-medium hover:bg-[#2E2E2E] transition-colors"
                  onClick={() => window.location.href = '/'}
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        // Report Form
        <section className="py-16 bg-white">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              {!selectedCategory ? (
                // Step 1: Select category
                <div>
                  <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold mb-4 text-[#2E2E2E]">Select Report Category</h2>
                    <p className="text-[#2E2E2E]">
                      Please choose the category that best describes the issue you're reporting
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reportCategories.map((category) => (
                      <div 
                        key={category.id} 
                        className="bg-[#ffeee3] rounded-xl border border-[#ffeee3] hover:border-[#FF6B00] p-6 cursor-pointer transition-all hover:shadow-md"
                        onClick={() => handleCategorySelect(category.id)}
                      >
                        <div className="text-[#FF6B00] mb-4">
                          {category.icon}
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-[#2E2E2E]">{category.label}</h3>
                        <p className="text-sm text-[#2E2E2E]">{category.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // Step 2: Report form
                <form onSubmit={handleSubmit}>
                  <div className="bg-[#ffeee3] p-6 rounded-xl mb-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-[#FF6B00] mr-3">
                          {reportCategories.find(cat => cat.id === selectedCategory)?.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#2E2E2E]">
                            {reportCategories.find(cat => cat.id === selectedCategory)?.label}
                          </h3>
                          <p className="text-sm text-[#2E2E2E]">
                            {reportCategories.find(cat => cat.id === selectedCategory)?.description}
                          </p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setSelectedCategory(null)} 
                        className="text-[#FF6B00] hover:text-[#2E2E2E] text-sm font-medium"
                      >
                        Change Category
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Contact Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-[#2E2E2E]">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-[#2E2E2E] mb-1">Your Name</label>
                          <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                            placeholder="Enter your name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-[#2E2E2E] mb-1">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                            placeholder="your@email.com"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Report Details */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-[#2E2E2E]">Report Details</h3>
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-[#2E2E2E] mb-1">Subject</label>
                          <input
                            type="text"
                            id="subject"
                            className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                            placeholder="Brief description of the issue"
                            value={reportSubject}
                            onChange={(e) => setReportSubject(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="url" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                            Relevant URL (Optional)
                          </label>
                          <input
                            type="url"
                            id="url"
                            className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                            placeholder="https://..."
                            value={urlLink}
                            onChange={(e) => setUrlLink(e.target.value)}
                          />
                        </div>
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-[#2E2E2E] mb-1">Detailed Description</label>
                          <textarea
                            id="description"
                            rows={6}
                            className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                            placeholder="Please provide as much detail as possible about the issue you're reporting..."
                            value={reportDescription}
                            onChange={(e) => setReportDescription(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Attachments */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-[#2E2E2E]">Attachments (Optional)</h3>
                      <div 
                        className="border-2 border-dashed border-[#ffeee3] rounded-lg p-6 text-center hover:border-[#FF6B00] transition-colors"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        {attachments.length > 0 ? (
                          <div className="space-y-3">
                            {attachments.map((attachment) => (
                              <div key={attachment.id} className="bg-[#ffeee3] p-3 rounded-lg flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                  {attachment.file.type.startsWith('image/') && (
                                    <img 
                                      src={attachment.preview} 
                                      alt="Preview" 
                                      className="w-10 h-10 object-cover rounded"
                                    />
                                  )}
                                  <div className="text-left">
                                    <span className="text-sm text-[#2E2E2E] block">{attachment.file.name}</span>
                                    <span className="text-xs text-[#2E2E2E]/70">
                                      {(attachment.file.size / 1024 / 1024).toFixed(2)} MB
                                    </span>
                                    {attachment.uploading && (
                                      <span className="text-xs text-[#FF6B00] block">Uploading...</span>
                                    )}
                                    {attachment.uploaded && (
                                      <span className="text-xs text-green-600 block">✓ Uploaded</span>
                                    )}
                                    {attachment.error && (
                                      <span className="text-xs text-red-600 block">{attachment.error}</span>
                                    )}
                                  </div>
                                </div>
                                <button 
                                  type="button" 
                                  onClick={() => removeAttachment(attachment.id)}
                                  className="text-[#FF6B00] hover:text-[#2E2E2E]"
                                  disabled={attachment.uploading}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            ))}
                            {attachments.length < 5 && (
                              <label className="inline-block cursor-pointer">
                                <input
                                  type="file"
                                  multiple
                                  accept="image/*,.pdf"
                                  onChange={handleFileSelect}
                                  className="hidden"
                                />
                                <span className="text-[#FF6B00] hover:text-[#2E2E2E] text-sm font-medium">
                                  + Add More Attachments (maximum 5)
                                </span>
                              </label>
                            )}
                          </div>
                        ) : (
                          <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#2E2E2E] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-[#2E2E2E] mb-2">Drag & drop files here, or click to select files</p>
                            <p className="text-[#2E2E2E] text-sm">Supports: JPG, PNG, PDF (Max 5 files, 5MB each)</p>
                            <label className="inline-block cursor-pointer mt-4">
                              <input
                                type="file"
                                multiple
                                accept="image/*,.pdf"
                                onChange={handleFileSelect}
                                className="hidden"
                              />
                              <span className="px-4 py-2 bg-[#ffeee3] text-[#FF6B00] rounded-lg text-sm font-medium hover:bg-[#FF6B00] hover:text-white transition-colors">
                                Select Files
                              </span>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Submit Section */}
                    <div className="border-t border-[#ffeee3] pt-6 flex flex-col sm:flex-row-reverse justify-between items-center">
                      <button 
                        type="submit" 
                        className={`px-6 py-3 rounded-lg font-medium text-white w-full sm:w-auto mb-4 sm:mb-0 ${isSubmitting ? 'bg-[#ffeee3] cursor-not-allowed' : 'bg-[#FF6B00] hover:bg-[#2E2E2E]'}`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </span>
                        ) : 'Submit Report'}
                      </button>
                      <p className="text-sm text-[#2E2E2E]">
                        By submitting this report, you agree to our <Link to="/terms-of-service" className="text-[#FF6B00] hover:underline">Terms of Service</Link> and <Link to="/privacy-policy" className="text-[#FF6B00] hover:underline">Privacy Policy</Link>.
                      </p>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Additional Information */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#ffeee3]">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-4 text-[#2E2E2E]">Emergency Contact</h3>
                  <p className="text-[#2E2E2E] mb-6">
                    If you're reporting an issue that requires immediate attention, please contact our emergency support line.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6B00] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-[#2E2E2E]">03163028236</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6B00] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-[#2E2E2E]">freelancenestteam@gmail.com</span>
                    </div>
                  </div>
                </div>
                <div className="p-8 bg-[#ffeee3]">
                  <h3 className="text-xl font-bold mb-4 text-[#2E2E2E]">What Happens Next</h3>
                  <ol className="space-y-4">
                    <li className="flex">
                      <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        1
                      </div>
                      <p className="text-[#2E2E2E]">Our team will review your report within 24-48 hours.</p>
                    </li>
                    <li className="flex">
                      <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        2
                      </div>
                      <p className="text-[#2E2E2E]">You'll receive a confirmation email with your report reference number.</p>
                    </li>
                    <li className="flex">
                      <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        3
                      </div>
                      <p className="text-[#2E2E2E]">We may contact you for additional information if needed.</p>
                    </li>
                    <li className="flex">
                      <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        4
                      </div>
                      <p className="text-[#2E2E2E]">You'll be notified of any actions taken as a result of your report.</p>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReportProblemPage;













