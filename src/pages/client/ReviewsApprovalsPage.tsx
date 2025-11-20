import React, { useState } from 'react';

const ReviewsApprovalsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const pendingReviews = [
    {
      id: '1',
      type: 'milestone',
      title: 'Frontend Development Milestone',
      freelancer: {
        name: 'John Smith',
        avatar: '/api/placeholder/40/40'
      },
      project: 'E-commerce Website Development',
      submittedDate: '2024-01-30',
      dueDate: '2024-02-01',
      amount: 1250,
      description: 'Complete frontend development with React components, responsive design, and user authentication.',
      deliverables: [
        { name: 'Homepage Component', status: 'completed', file: 'homepage.tsx' },
        { name: 'Product Listing Page', status: 'completed', file: 'products.tsx' },
        { name: 'User Authentication', status: 'completed', file: 'auth.tsx' },
        { name: 'Responsive Design', status: 'completed', file: 'styles.css' }
      ],
      files: [
        { name: 'frontend-build.zip', size: '15.2 MB', type: 'zip' },
        { name: 'demo-screenshots.pdf', size: '3.4 MB', type: 'pdf' },
        { name: 'README.md', size: '2.1 KB', type: 'markdown' }
      ],
      priority: 'high'
    },
    {
      id: '2',
      type: 'deliverable',
      title: 'Final UI Designs',
      freelancer: {
        name: 'Sarah Johnson',
        avatar: '/api/placeholder/40/40'
      },
      project: 'Mobile App UI Design',
      submittedDate: '2024-01-28',
      dueDate: '2024-01-30',
      amount: 800,
      description: 'Complete UI design package including all screens, components, and design system.',
      deliverables: [
        { name: 'Design System', status: 'completed', file: 'design-system.fig' },
        { name: 'App Screens (iOS)', status: 'completed', file: 'ios-screens.fig' },
        { name: 'App Screens (Android)', status: 'completed', file: 'android-screens.fig' },
        { name: 'Icon Set', status: 'completed', file: 'icons.svg' }
      ],
      files: [
        { name: 'Final-Designs.fig', size: '28.7 MB', type: 'figma' },
        { name: 'Assets-Export.zip', size: '12.3 MB', type: 'zip' },
        { name: 'Style-Guide.pdf', size: '5.1 MB', type: 'pdf' }
      ],
      priority: 'medium'
    },
    {
      id: '3',
      type: 'revision',
      title: 'Logo Design Revisions',
      freelancer: {
        name: 'Mike Chen',
        avatar: '/api/placeholder/40/40'
      },
      project: 'Brand Identity Package',
      submittedDate: '2024-01-29',
      dueDate: '2024-02-02',
      amount: 300,
      description: 'Logo revisions based on client feedback - updated color scheme and typography.',
      deliverables: [
        { name: 'Logo Variations', status: 'completed', file: 'logo-variations.ai' },
        { name: 'Color Palette', status: 'completed', file: 'colors.pdf' },
        { name: 'Typography Guide', status: 'completed', file: 'typography.pdf' }
      ],
      files: [
        { name: 'logo-final-v3.ai', size: '8.9 MB', type: 'illustrator' },
        { name: 'logo-exports.zip', size: '4.2 MB', type: 'zip' }
      ],
      priority: 'low'
    }
  ];

  const completedReviews = [
    {
      id: '4',
      type: 'milestone',
      title: 'Project Setup & Planning',
      freelancer: {
        name: 'John Smith',
        avatar: '/api/placeholder/40/40'
      },
      project: 'E-commerce Website Development',
      completedDate: '2024-01-15',
      approvedDate: '2024-01-16',
      amount: 500,
      rating: 5,
      feedback: 'Excellent work on the project setup. Very thorough documentation and clear development plan.',
      status: 'approved'
    },
    {
      id: '5',
      type: 'deliverable',
      title: 'Initial Wireframes',
      freelancer: {
        name: 'Sarah Johnson',
        avatar: '/api/placeholder/40/40'
      },
      project: 'Mobile App UI Design',
      completedDate: '2024-01-10',
      approvedDate: '2024-01-12',
      amount: 600,
      rating: 4,
      feedback: 'Good wireframes with clear user flow. Minor adjustments needed for better navigation.',
      status: 'approved'
    }
  ];

  const [reviewForm, setReviewForm] = useState({
    decision: '',
    rating: 0,
    feedback: '',
    requestChanges: false,
    changeRequests: ''
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-600';
      case 'medium': return 'bg-yellow-100 text-yellow-600';
      case 'low': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'figma':
        return <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 18h12V6l-4-4H4v16z"/></svg>;
      case 'zip':
        return <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 18h12V6l-4-4H4v16z"/></svg>;
      case 'pdf':
        return <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 18h12V6l-4-4H4v16z"/></svg>;
      case 'illustrator':
        return <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 18h12V6l-4-4H4v16z"/></svg>;
      default:
        return <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 18h12V6l-4-4H4v16z"/></svg>;
    }
  };

  const selectedReview = pendingReviews.find(review => review.id === selectedItem);

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Reviews & Approvals</h1>
            <p className="text-xl mb-8 text-[#ffeee3]">
              Review completed work, approve milestones, and provide feedback to your freelancers.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-[#ffeee3] text-sm mb-2">Pending Reviews</div>
                <div className="text-3xl font-bold text-white">{pendingReviews.length}</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-[#ffeee3] text-sm mb-2">This Month</div>
                <div className="text-3xl font-bold text-white">{completedReviews.length + pendingReviews.length}</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-[#ffeee3] text-sm mb-2">Avg. Review Time</div>
                <div className="text-3xl font-bold text-[#FF6B00]">1.2 days</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            {/* Navigation Tabs */}
            <div className="flex flex-wrap border-b border-[#ffeee3] mb-8">
              {[
                { id: 'pending', label: 'Pending Reviews', count: pendingReviews.length },
                { id: 'completed', label: 'Completed Reviews', count: completedReviews.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-[#FF6B00] border-b-2 border-[#FF6B00]'
                      : 'text-[#2E2E2E] hover:text-[#FF6B00]'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* Pending Reviews */}
            {activeTab === 'pending' && (
              <div className="space-y-6">
                {pendingReviews.length > 0 ? (
                  pendingReviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6">
                        <div className="flex-1 mb-4 lg:mb-0">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-bold text-[#2E2E2E]">{review.title}</h3>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(review.priority)}`}>
                                  {review.priority} priority
                                </span>
                              </div>
                              <p className="text-[#2E2E2E]/60 mb-2">{review.project}</p>
                              <div className="flex items-center space-x-4 text-sm text-[#2E2E2E]/80">
                                <div className="flex items-center space-x-2">
                                  <img
                                    src={review.freelancer.avatar}
                                    alt={review.freelancer.name}
                                    className="w-6 h-6 rounded-full"
                                  />
                                  <span>{review.freelancer.name}</span>
                                </div>
                                <span>Submitted: {review.submittedDate}</span>
                                <span className="text-red-600">Due: {review.dueDate}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-[#FF6B00]">${review.amount}</div>
                              <div className="text-sm text-[#2E2E2E]/60 capitalize">{review.type}</div>
                            </div>
                          </div>
                          
                          <p className="text-[#2E2E2E]/80 mb-4">{review.description}</p>

                          {/* Deliverables */}
                          <div className="mb-4">
                            <h4 className="font-medium text-[#2E2E2E] mb-2">Deliverables:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {review.deliverables.map((deliverable, index) => (
                                <div key={index} className="flex items-center space-x-2 text-sm">
                                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                  </svg>
                                  <span className="text-[#2E2E2E]">{deliverable.name}</span>
                                  <span className="text-[#2E2E2E]/60">({deliverable.file})</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Files */}
                          <div>
                            <h4 className="font-medium text-[#2E2E2E] mb-2">Attached Files:</h4>
                            <div className="flex flex-wrap gap-3">
                              {review.files.map((file, index) => (
                                <div key={index} className="flex items-center space-x-2 p-2 bg-[#ffeee3]/30 rounded-lg">
                                  {getFileIcon(file.type)}
                                  <div>
                                    <div className="font-medium text-[#2E2E2E] text-sm">{file.name}</div>
                                    <div className="text-xs text-[#2E2E2E]/60">{file.size}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-3 lg:ml-6">
                          <button
                            onClick={() => {
                              setSelectedItem(review.id);
                              setShowReviewModal(true);
                            }}
                            className="px-6 py-3 bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg font-medium transition-colors"
                          >
                            Review & Approve
                          </button>
                          <button className="px-6 py-3 bg-[#ffeee3] hover:bg-[#FF6B00] hover:text-white text-[#2E2E2E] rounded-lg font-medium transition-colors">
                            Preview Files
                          </button>
                          <button className="px-6 py-3 text-[#2E2E2E]/60 hover:text-[#2E2E2E] border border-[#ffeee3] rounded-lg font-medium transition-colors">
                            Request Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-[#2E2E2E]/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-[#2E2E2E] mb-2">No pending reviews</h3>
                    <p className="text-[#2E2E2E]/60">All submitted work has been reviewed. Great job!</p>
                  </div>
                )}
              </div>
            )}

            {/* Completed Reviews */}
            {activeTab === 'completed' && (
              <div className="space-y-6">
                {completedReviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                      <div className="flex-1 mb-4 lg:mb-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-[#2E2E2E] mb-1">{review.title}</h3>
                            <p className="text-[#2E2E2E]/60 mb-2">{review.project}</p>
                            <div className="flex items-center space-x-4 text-sm text-[#2E2E2E]/80">
                              <div className="flex items-center space-x-2">
                                <img
                                  src={review.freelancer.avatar}
                                  alt={review.freelancer.name}
                                  className="w-6 h-6 rounded-full"
                                />
                                <span>{review.freelancer.name}</span>
                              </div>
                              <span>Completed: {review.completedDate}</span>
                              <span>Approved: {review.approvedDate}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">${review.amount}</div>
                            <div className="text-sm text-green-600">Approved</div>
                          </div>
                        </div>
                        
                        {/* Rating */}
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-sm font-medium text-[#2E2E2E]">Your Rating:</span>
                          <div className="flex">
                            {[1,2,3,4,5].map((star) => (
                              <svg
                                key={star}
                                className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                              </svg>
                            ))}
                          </div>
                        </div>

                        {/* Feedback */}
                        <div className="p-3 bg-[#ffeee3]/30 rounded-lg">
                          <p className="text-sm text-[#2E2E2E]">
                            <span className="font-medium">Your Feedback:</span> {review.feedback}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-3 lg:ml-6">
                        <button className="px-6 py-3 bg-[#ffeee3] hover:bg-[#FF6B00] hover:text-white text-[#2E2E2E] rounded-lg font-medium transition-colors">
                          View Details
                        </button>
                        <button className="px-6 py-3 text-[#2E2E2E]/60 hover:text-[#2E2E2E] border border-[#ffeee3] rounded-lg font-medium transition-colors">
                          Download Files
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Review Modal */}
      {showReviewModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#2E2E2E]">Review: {selectedReview.title}</h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-[#2E2E2E]/60 hover:text-[#2E2E2E]"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#2E2E2E] mb-3">Decision</label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="decision"
                      value="approve"
                      checked={reviewForm.decision === 'approve'}
                      onChange={(e) => setReviewForm({...reviewForm, decision: e.target.value})}
                      className="h-4 w-4 text-[#FF6B00] border-[#ffeee3] focus:ring-[#FF6B00]"
                    />
                    <span className="text-[#2E2E2E]">Approve and release payment</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="decision"
                      value="request_changes"
                      checked={reviewForm.decision === 'request_changes'}
                      onChange={(e) => setReviewForm({...reviewForm, decision: e.target.value})}
                      className="h-4 w-4 text-[#FF6B00] border-[#ffeee3] focus:ring-[#FF6B00]"
                    />
                    <span className="text-[#2E2E2E]">Request changes</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="decision"
                      value="reject"
                      checked={reviewForm.decision === 'reject'}
                      onChange={(e) => setReviewForm({...reviewForm, decision: e.target.value})}
                      className="h-4 w-4 text-[#FF6B00] border-[#ffeee3] focus:ring-[#FF6B00]"
                    />
                    <span className="text-[#2E2E2E]">Reject submission</span>
                  </label>
                </div>
              </div>

              {reviewForm.decision === 'approve' && (
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-3">Rate the Work</label>
                  <div className="flex space-x-1">
                    {[1,2,3,4,5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({...reviewForm, rating: star})}
                        className={`w-8 h-8 ${star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400`}
                      >
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                  {reviewForm.decision === 'request_changes' ? 'Change Requests' : 'Feedback'}
                </label>
                <textarea
                  value={reviewForm.feedback}
                  onChange={(e) => setReviewForm({...reviewForm, feedback: e.target.value})}
                  className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  rows={4}
                  placeholder={
                    reviewForm.decision === 'request_changes' 
                      ? "Please describe the changes needed..."
                      : "Share your feedback about the work..."
                  }
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 px-4 py-3 border border-[#ffeee3] text-[#2E2E2E] rounded-lg hover:bg-[#ffeee3] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsApprovalsPage;
