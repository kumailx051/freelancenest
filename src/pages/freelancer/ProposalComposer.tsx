import React, { useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft,
  Upload,
  X,
  Eye,
  Send,
  Bot,
  FileText,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Clock,
  Sparkles,
  Target,
  Lightbulb
} from 'lucide-react';

interface Milestone {
  title: string;
  description: string;
  amount: string;
  dueDate: string;
}

interface CheckResult {
  score: number;
  status: string;
  warnings?: string[];
}

const ProposalComposer: React.FC = () => {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('job');
  const useAI = searchParams.get('ai') === 'true';
  
  const [coverLetter, setCoverLetter] = useState('');
  const [proposedBudget, setProposedBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [milestones, setMilestones] = useState<Milestone[]>([
    { title: '', description: '', amount: '', dueDate: '' }
  ]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [riskCheck, setRiskCheck] = useState<CheckResult | null>(null);
  const [plagiarismCheck, setPlagiarismCheck] = useState<CheckResult | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock job data
  const job = {
    title: 'Full Stack React Developer for E-commerce Platform',
    client: 'TechCorp Solutions',
    budget: '$3,000 - $5,000',
    description: 'We are looking for an experienced React developer to build a modern e-commerce platform...',
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'],
    questions: [
      'How many years of experience do you have with React?',
      'Can you provide examples of e-commerce platforms you\'ve built?',
      'Are you available to start immediately?',
      'Do you have experience with payment gateway integration?'
    ]
  };

  const addMilestone = () => {
    setMilestones([...milestones, { title: '', description: '', amount: '', dueDate: '' }]);
  };

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const updateMilestone = (index: number, field: keyof Milestone, value: string) => {
    const updated = [...milestones];
    updated[index][field] = value;
    setMilestones(updated);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments([...attachments, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const generateAIProposal = async () => {
    setIsAIGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const aiProposal = `Dear ${job.client},

I'm excited about the opportunity to work on your ${job.title.toLowerCase()}. With over 5 years of experience in full-stack development and a proven track record of delivering high-quality e-commerce solutions, I'm confident I can bring your vision to life.

**Why I'm the right fit:**
• Extensive experience with React, Node.js, and MongoDB - exactly what your project requires
• Successfully delivered 15+ e-commerce platforms with similar complexity
• Strong background in payment integration (Stripe, PayPal) and security best practices
• Committed to clean, scalable code and comprehensive testing

**My approach:**
1. **Discovery & Planning** (Week 1): Detailed requirements analysis and technical specification
2. **Backend Development** (Weeks 2-4): API development, database design, and authentication
3. **Frontend Development** (Weeks 5-7): React components, responsive design, and user experience
4. **Integration & Testing** (Weeks 8-9): Payment integration, testing, and performance optimization
5. **Deployment & Support** (Week 10): Production deployment and documentation

I'm available to start immediately and can dedicate 30+ hours per week to ensure timely delivery. My proposed budget of $4,200 reflects the complexity and quality you're seeking.

I'd love to discuss your specific requirements in detail. When would be a good time for a brief call?

Best regards,
Alex Thompson`;

      setCoverLetter(aiProposal);
      setProposedBudget('4200');
      setTimeline('10 weeks');
      setIsAIGenerating(false);
    }, 3000);
  };

  const runChecks = () => {
    // Simulate plagiarism and risk checks
    setTimeout(() => {
      setPlagiarismCheck({ score: 98, status: 'pass' });
      setRiskCheck({ score: 85, status: 'low', warnings: [] });
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle proposal submission
    console.log('Submitting proposal...');
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to={`/freelancer/job-details/${jobId}`}
            className="inline-flex items-center text-[#FF6B00] hover:text-[#FF9F45] font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Job Details
          </Link>
          <h1 className="text-3xl font-bold text-[#2E2E2E] mb-2">
            {useAI ? 'AI-Assisted' : ''} Proposal Composer
          </h1>
          <p className="text-[#2E2E2E]/70">
            Create a compelling proposal for: <span className="font-semibold">{job.title}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Assistant */}
            {useAI && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#2E2E2E]">AI Proposal Assistant</h3>
                </div>
                <p className="text-[#2E2E2E]/70 mb-4">
                  Let AI analyze the job requirements and generate a personalized proposal based on your profile and experience.
                </p>
                <button
                  onClick={generateAIProposal}
                  disabled={isAIGenerating}
                  className="bg-[#FF6B00] hover:bg-[#FF9F45] disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
                >
                  {isAIGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate AI Proposal
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Cover Letter */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#2E2E2E]">Cover Letter</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => runChecks()}
                    className="text-sm text-[#FF6B00] hover:text-[#FF9F45] font-medium"
                  >
                    Run Checks
                  </button>
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="text-sm text-[#FF6B00] hover:text-[#FF9F45] font-medium flex items-center"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </button>
                </div>
              </div>
              
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Write a compelling cover letter that highlights your relevant experience and explains why you're the best fit for this project..."
                rows={12}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent resize-vertical"
              />
              
              <div className="flex items-center justify-between mt-3 text-sm">
                <span className={`${coverLetter.length < 100 ? 'text-red-500' : coverLetter.length > 1000 ? 'text-orange-500' : 'text-green-500'}`}>
                  {coverLetter.length} characters (min 100, recommended 300-800)
                </span>
                
                {/* Checks Results */}
                <div className="flex space-x-4">
                  {plagiarismCheck && (
                    <div className={`flex items-center space-x-1 ${plagiarismCheck.status === 'pass' ? 'text-green-600' : 'text-red-600'}`}>
                      <CheckCircle className="w-4 h-4" />
                      <span>Originality: {plagiarismCheck.score}%</span>
                    </div>
                  )}
                  {riskCheck && (
                    <div className={`flex items-center space-x-1 ${riskCheck.status === 'low' ? 'text-green-600' : 'text-orange-600'}`}>
                      <Target className="w-4 h-4" />
                      <span>Risk: {riskCheck.status}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Pricing & Timeline</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Proposed Budget ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="number"
                      value={proposedBudget}
                      onChange={(e) => setProposedBudget(e.target.value)}
                      placeholder="4000"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                    />
                  </div>
                  <p className="text-xs text-[#2E2E2E]/60 mt-1">
                    Client budget: {job.budget}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Estimated Timeline
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      placeholder="8-10 weeks"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#2E2E2E]">Project Milestones</h3>
                <button
                  onClick={addMilestone}
                  className="text-[#FF6B00] hover:text-[#FF9F45] font-medium text-sm"
                >
                  + Add Milestone
                </button>
              </div>
              
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-[#2E2E2E]">Milestone {index + 1}</h4>
                      {milestones.length > 1 && (
                        <button
                          onClick={() => removeMilestone(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <input
                        type="text"
                        placeholder="Milestone title"
                        value={milestone.title}
                        onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          placeholder="Amount"
                          value={milestone.amount}
                          onChange={(e) => updateMilestone(index, 'amount', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                        />
                        <input
                          type="date"
                          value={milestone.dueDate}
                          onChange={(e) => updateMilestone(index, 'dueDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <textarea
                      placeholder="Milestone description and deliverables"
                      value={milestone.description}
                      onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Attachments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Attachments</h3>
              
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#FF6B00] cursor-pointer transition-colors"
              >
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-[#2E2E2E]/60">
                  Drop files here or <span className="text-[#FF6B00] font-medium">browse</span>
                </p>
                <p className="text-xs text-[#2E2E2E]/40 mt-1">
                  PDF, DOC, Images up to 10MB each
                </p>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="hidden"
              />
              
              {attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-[#FF6B00]" />
                        <div>
                          <p className="text-sm font-medium text-[#2E2E2E]">{file.name}</p>
                          <p className="text-xs text-[#2E2E2E]/60">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeAttachment(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Client Questions */}
            {job.questions.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Client Questions</h3>
                <div className="space-y-4">
                  {job.questions.map((question, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                        {index + 1}. {question}
                      </label>
                      <textarea
                        placeholder="Your answer..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <p className="text-sm text-[#2E2E2E]/70">
                  Review your proposal carefully before submitting. You can edit it until the client responds.
                </p>
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="flex-1 border border-gray-300 text-[#2E2E2E] hover:bg-gray-50 font-medium py-3 rounded-lg transition-colors"
                >
                  Save as Draft
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Proposal
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Job Summary</h3>
              <h4 className="font-medium text-[#2E2E2E] mb-2">{job.title}</h4>
              <p className="text-sm text-[#2E2E2E]/70 mb-4">
                {job.description.substring(0, 150)}...
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#2E2E2E]/60">Budget:</span>
                  <span className="font-medium text-[#2E2E2E]">{job.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#2E2E2E]/60">Client:</span>
                  <span className="font-medium text-[#2E2E2E]">{job.client}</span>
                </div>
              </div>
            </div>

            {/* Required Skills */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-[#ffeee3] text-[#FF6B00] text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 text-blue-500 mr-2" />
                Proposal Tips
              </h3>
              <ul className="space-y-2 text-sm text-[#2E2E2E]/80">
                <li>• Personalize your proposal to the specific job</li>
                <li>• Highlight relevant experience and portfolio pieces</li>
                <li>• Ask clarifying questions to show engagement</li>
                <li>• Provide a clear timeline and milestones</li>
                <li>• Keep your proposal concise but comprehensive</li>
              </ul>
            </div>

            {/* Preview */}
            {showPreview && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Proposal Preview</h3>
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-sm text-[#2E2E2E]/80">
                    {coverLetter || 'Your cover letter will appear here...'}
                  </div>
                  {proposedBudget && (
                    <div className="mt-4 p-3 bg-[#ffeee3] rounded-lg">
                      <p className="text-sm font-medium text-[#2E2E2E]">
                        Proposed Budget: ${proposedBudget}
                      </p>
                      {timeline && (
                        <p className="text-sm text-[#2E2E2E]/70">
                          Timeline: {timeline}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalComposer;
