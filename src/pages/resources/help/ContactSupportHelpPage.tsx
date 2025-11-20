import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Mail, Phone, Globe, Clock, Users, HelpCircle, Video, FileText, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';

// Support channels data
const supportChannels = [
  {
    title: "Email Support",
    description: "Get assistance directly to your inbox",
    icon: <Mail className="w-6 h-6" />,
    color: "bg-[#ffeee3] text-[#FF6B00]",
    contactInfo: "freelancenestteam@gmail.com",
    responseTime: "Within 24 hours",
    availableFor: ["Account issues", "Billing questions", "Feature requests", "Bug reports"]
  },
  {
    title: "Live Chat",
    description: "Real-time assistance from our support team",
    icon: <MessageSquare className="w-6 h-6" />,
    color: "bg-[#ffeee3] text-[#FF6B00]",
    contactInfo: "Available in-app",
    responseTime: "Usually within minutes",
    availableFor: ["Quick questions", "Navigation help", "General inquiries", "Status updates"]
  },
  {
    title: "Phone Support",
    description: "Talk to our support specialists directly",
    icon: <Phone className="w-6 h-6" />,
    color: "bg-[#ffeee3] text-[#FF6B00]",
    contactInfo: "+1 (800) 123-4567",
    responseTime: "Business hours only",
    availableFor: ["Complex issues", "Account verification", "Emergency support", "Billing disputes"]
  },
  {
    title: "Support Tickets",
    description: "Submit detailed requests for investigation",
    icon: <FileText className="w-6 h-6" />,
    color: "bg-[#ffeee3] text-[#FF6B00]",
    contactInfo: "Via Help Center",
    responseTime: "Within 48 hours",
    availableFor: ["Technical problems", "Account recovery", "Payment issues", "Policy violations"]
  }
];

// Support hour data
const supportHours = [
  { day: "Monday - Friday", hours: "6:00 AM - 10:00 PM", timezone: "Pacific Time (PT)" },
  { day: "Saturday", hours: "8:00 AM - 6:00 PM", timezone: "Pacific Time (PT)" },
  { day: "Sunday", hours: "8:00 AM - 5:00 PM", timezone: "Pacific Time (PT)" }
];

// Common questions
const commonQuestions = [
  {
    question: "How quickly can I expect a response?",
    answer: "Response times vary by support channel. Live chat typically responds within minutes during business hours, email support within 24 hours, and support tickets within 48 hours. Premium support plans receive priority response times."
  },
  {
    question: "Can I get help outside regular business hours?",
    answer: "Yes! While our full support team operates during business hours, we offer 24/7 emergency support for critical issues. Additionally, our help documentation and AI assistant are available any time."
  },
  {
    question: "How do I escalate an urgent issue?",
    answer: "For urgent issues, use live chat or phone support and specify that your issue is time-sensitive. If you need to escalate an existing support ticket, reply to the ticket with 'URGENT' in the subject line and explain why the issue requires immediate attention."
  },
  {
    question: "Will I always speak to the same support agent?",
    answer: "We assign consistent representatives for ongoing issues when possible, especially for Premium and Enterprise clients. For general inquiries, you may interact with different support specialists based on availability and expertise."
  },
  {
    question: "What information should I provide when contacting support?",
    answer: "Please include your account username, detailed description of the issue, steps to reproduce the problem, any error messages, screenshots if applicable, and what you've already tried to resolve the issue. This helps us assist you more efficiently."
  }
];

// Premium support tiers
const premiumSupport = [
  {
    tier: "Standard Support",
    included: "Free with all accounts",
    features: [
      "Email support",
      "Live chat during business hours",
      "Help center access",
      "Community forum access"
    ]
  },
  {
    tier: "Professional Support",
    included: "Included with Professional memberships",
    features: [
      "Priority email & chat support",
      "Phone support during business hours",
      "4-hour response guarantee",
      "Dedicated support specialist"
    ]
  },
  {
    tier: "Enterprise Support",
    included: "Included with Enterprise plans",
    features: [
      "24/7 priority support",
      "Dedicated account manager",
      "1-hour response guarantee",
      "Custom onboarding & training"
    ]
  }
];

const ContactSupportHelpPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-r from-cyan-600 to-teal-600">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/resources/help-center" 
              className="inline-flex items-center text-[#ffeee3] hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Help Center
            </Link>
            <div>
              <span className="bg-[#FF6B00]/30 text-white text-sm font-medium px-3 py-1 rounded-full">Help Center</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">Contact Support</h1>
              <p className="text-xl text-[#ffeee3] max-w-3xl">
                Get help from our support team through multiple channels and learn how to resolve issues efficiently
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Overview */}
      <section className="py-16 -mt-8">
        <div className="section-container">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-[#2E2E2E] mb-6">Here to Help You Succeed</h2>
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-7/12">
                <p className="text-[#2E2E2E] mb-6">
                  Our dedicated support team is available to help you resolve any issues, answer questions, 
                  and ensure you get the most out of FreelanceNest. We offer multiple support channels to 
                  accommodate your needs and preferences.
                </p>
                
                <div className="flex items-center p-4 bg-[#ffeee3] rounded-lg mb-6">
                  <Clock className="h-8 w-8 text-[#FF6B00] mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#2E2E2E]">Average Response Times</h3>
                    <p className="text-[#2E2E2E] text-sm">
                      Most inquiries receive a first response within 2 hours during business hours.
                      97% of all support cases are resolved within 24 hours.
                    </p>
                  </div>
                </div>

                <h3 className="font-bold text-[#2E2E2E] mb-3">Before Contacting Support:</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-[#2E2E2E]">
                      Check our <Link to="/resources/help-center" className="text-[#FF6B00] hover:underline">Help Center</Link> for tutorials and frequently asked questions
                    </p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-[#2E2E2E]">
                      Search the <Link to="/community/forum" className="text-[#FF6B00] hover:underline">Community Forum</Link> where other users may have encountered and solved similar issues
                    </p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-[#2E2E2E]">
                      Try the solutions in our <Link to="/resources/help/troubleshooting" className="text-[#FF6B00] hover:underline">Troubleshooting Guide</Link> for common problems
                    </p>
                  </div>
                </div>
                
                <div className="bg-[#ffeee3] border-l-4 border-[#FF9F45] p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-[#FF6B00]" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-[#2E2E2E]">Account Security Note</h4>
                      <div className="mt-2 text-sm text-[#2E2E2E]">
                        <p>
                          FreelanceNest support representatives will never ask for your password or full credit card details.
                          Only share information through our official support channels.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-5/12">
                <div className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <HelpCircle className="h-8 w-8" />
                    </div>
                    <div className="bg-[#FF6B00] px-3 py-1 rounded-full text-xs font-semibold">Online</div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Need Help Right Now?</h3>
                  <p className="text-[#ffeee3] text-sm mb-6">Get immediate assistance through these channels:</p>
                  
                  <div className="space-y-4">
                    <button className="w-full flex justify-between items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                      <div className="flex items-center">
                        <MessageSquare className="h-5 w-5 mr-3" />
                        <span>Start Live Chat</span>
                      </div>
                      <ExternalLink className="h-4 w-4" />
                    </button>
                    
                    <button className="w-full flex justify-between items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-3" />
                        <span>Call Support</span>
                      </div>
                      <ExternalLink className="h-4 w-4" />
                    </button>
                    
                    <button className="w-full flex justify-between items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-3" />
                        <span>Email Support</span>
                      </div>
                      <ExternalLink className="h-4 w-4" />
                    </button>
                    
                    <button className="w-full flex justify-between items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-3" />
                        <span>Submit a Ticket</span>
                      </div>
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Support Channels */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Support Channels</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {supportChannels.map((channel, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className={`${channel.color} p-6`}>
                    <div className="flex items-center mb-2">
                      <div className="bg-white/20 p-2 rounded-lg mr-3">
                        {channel.icon}
                      </div>
                      <h3 className="text-xl font-bold">{channel.title}</h3>
                    </div>
                    <p className="opacity-90">{channel.description}</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-[#ffeee3] uppercase mb-1">Contact</h4>
                      <p className="text-[#2E2E2E] font-medium">{channel.contactInfo}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-[#ffeee3] uppercase mb-1">Response Time</h4>
                      <p className="text-[#2E2E2E] font-medium">{channel.responseTime}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-[#ffeee3] uppercase mb-2">Best For</h4>
                      <div className="flex flex-wrap gap-2">
                        {channel.availableFor.map((item, i) => (
                          <span key={i} className="inline-block bg-[#ffeee3] px-3 py-1 rounded-full text-sm text-[#2E2E2E]">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Support Hours */}
      <section className="py-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Support Hours</h2>
            <p className="text-lg text-center mb-12 max-w-2xl mx-auto opacity-90">
              Our support team is available during the following hours. Critical issues can be addressed 24/7 
              through our emergency support line for Enterprise clients.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
                {supportHours.map((schedule, index) => (
                  <div key={index} className="p-6 text-center">
                    <div className="inline-block bg-white/20 p-2 rounded-full mb-4">
                      <Clock className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{schedule.day}</h3>
                    <p className="text-lg mb-1">{schedule.hours}</p>
                    <p className="text-sm opacity-75">{schedule.timezone}</p>
                  </div>
                ))}
              </div>
              
              <div className="p-6 bg-[#FF6B00]">
                <div className="flex items-center justify-center">
                  <Globe className="h-6 w-6 mr-3" />
                  <span className="text-lg font-medium">
                    Need to convert to your local time? <Link to="/timezone-converter" className="underline hover:text-[#ffeee3]">Use our timezone calculator</Link>
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-10 flex items-center justify-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <AlertTriangle className="h-6 w-6 mr-4" />
              <p>
                Holiday schedules may vary. Check our <Link to="/status" className="underline hover:text-[#ffeee3]">status page</Link> for 
                current availability and announcements about modified support hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Support Options */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Premium Support Options</h2>
            <p className="text-lg text-[#2E2E2E] text-center mb-12 max-w-3xl mx-auto">
              Upgrade your support experience with priority access, faster response times, and dedicated support representatives
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {premiumSupport.map((tier, index) => (
                <div key={index} className={`rounded-xl overflow-hidden shadow-sm border ${
                  index === 0 ? 'border-[#ffeee3]' : 
                  index === 1 ? 'border-[#ffeee3]' : 
                  'border-[#ffeee3]'
                }`}>
                  <div className={`p-6 ${
                    index === 0 ? 'bg-[#ffeee3]' : 
                    index === 1 ? 'bg-[#ffeee3]' : 
                    'bg-[#ffeee3]'
                  }`}>
                    <h3 className={`text-xl font-bold mb-2 ${
                      index === 0 ? 'text-[#2E2E2E]' : 
                      index === 1 ? 'text-[#2E2E2E]' : 
                      'text-[#2E2E2E]'
                    }`}>{tier.tier}</h3>
                    <p className="text-[#2E2E2E]">{tier.included}</p>
                  </div>
                  
                  <div className="p-6">
                    <ul className="space-y-3">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className={`h-5 w-5 mr-2 flex-shrink-0 ${
                            index === 0 ? 'text-[#ffeee3]' : 
                            index === 1 ? 'text-[#FF6B00]' : 
                            'text-[#FF6B00]'
                          }`} />
                          <span className="text-[#2E2E2E]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6">
                      {index === 0 ? (
                        <span className="block text-center text-[#ffeee3] text-sm">Available with all accounts</span>
                      ) : (
                        <Link 
                          to={index === 1 ? "/pricing/professional" : "/pricing/enterprise"}
                          className={`block text-center py-2 rounded-lg transition-colors ${
                            index === 1 
                              ? 'bg-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3]' 
                              : 'bg-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3]'
                          }`}
                        >
                          Learn More
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 bg-[#ffeee3] rounded-xl p-6 border border-[#ffeee3]">
              <div className="md:flex items-center justify-between">
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold mb-2">Need Custom Support Solutions?</h3>
                  <p className="text-[#2E2E2E]">
                    Our enterprise team can create a tailored support plan specific to your organization's needs,
                    including dedicated representatives, custom training, and personalized onboarding.
                  </p>
                </div>
                <div className="md:w-1/3 text-center mt-4 md:mt-0">
                  <Link 
                    to="/enterprise/contact"
                    className="inline-block px-6 py-3 bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium rounded-lg transition-colors"
                  >
                    Contact Enterprise Team
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Self-Service Support */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Self-Service Support Resources</h2>
            <p className="text-lg text-[#2E2E2E] text-center mb-12 max-w-3xl mx-auto">
              Find answers and solutions instantly through our comprehensive self-service options
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col h-full">
                <div className="bg-[#ffeee3] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-[#FF6B00]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Help Documentation</h3>
                <p className="text-[#2E2E2E] mb-6 flex-grow">
                  Our comprehensive knowledge base includes step-by-step guides, tutorials, and documentation 
                  covering all aspects of the FreelanceNest platform.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0" />
                    <p className="text-[#2E2E2E]">Searchable articles and guides</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0" />
                    <p className="text-[#2E2E2E]">Video tutorials and walkthroughs</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0" />
                    <p className="text-[#2E2E2E]">Detailed screenshots and examples</p>
                  </div>
                </div>
                <Link 
                  to="/resources/help-center"
                  className="inline-flex items-center text-[#FF6B00] hover:text-[#2E2E2E] font-medium"
                >
                  Browse Help Center
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col h-full">
                <div className="bg-[#ffeee3] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-[#FF6B00]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Community Forum</h3>
                <p className="text-[#2E2E2E] mb-6 flex-grow">
                  Connect with other FreelanceNest users to share experiences, get advice, and learn tips 
                  and tricks from the community.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0" />
                    <p className="text-[#2E2E2E]">User discussions and advice</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0" />
                    <p className="text-[#2E2E2E]">Staff-monitored threads</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0" />
                    <p className="text-[#2E2E2E]">Verified solutions and workflows</p>
                  </div>
                </div>
                <Link 
                  to="/community/forum"
                  className="inline-flex items-center text-[#FF6B00] hover:text-[#2E2E2E] font-medium"
                >
                  Visit Community Forum
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col h-full">
                <div className="bg-[#ffeee3] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-[#FF6B00]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Video Tutorials</h3>
                <p className="text-[#2E2E2E] mb-6 flex-grow">
                  Watch step-by-step video guides that walk you through features, processes, 
                  and best practices on our platform.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0" />
                    <p className="text-[#2E2E2E]">Platform navigation tutorials</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0" />
                    <p className="text-[#2E2E2E]">Feature demonstrations</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0" />
                    <p className="text-[#2E2E2E]">Success strategies and tips</p>
                  </div>
                </div>
                <Link 
                  to="/resources/video-tutorials"
                  className="inline-flex items-center text-[#FF6B00] hover:text-[#2E2E2E] font-medium"
                >
                  Watch Tutorials
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col h-full">
                <div className="bg-[#ffeee3] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <HelpCircle className="h-6 w-6 text-[#FF6B00]" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI Assistant</h3>
                <p className="text-[#2E2E2E] mb-6 flex-grow">
                  Get instant answers to common questions through our AI-powered assistant, available 
                  24/7 directly in your dashboard.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0" />
                    <p className="text-[#2E2E2E]">Instant responses to common questions</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0" />
                    <p className="text-[#2E2E2E]">Contextual help based on your account</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0" />
                    <p className="text-[#2E2E2E]">Seamless escalation to human support</p>
                  </div>
                </div>
                <Link 
                  to="/dashboard"
                  className="inline-flex items-center text-[#FF6B00] hover:text-[#2E2E2E] font-medium"
                >
                  Chat with AI Assistant
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {commonQuestions.map((item, index) => (
                <div key={index} className="bg-[#ffeee3] rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-3">{item.question}</h3>
                  <p className="text-[#2E2E2E]">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Help Us Improve Our Support</h2>
            <p className="text-lg text-[#2E2E2E] text-center mb-12 max-w-3xl mx-auto">
              Your feedback helps us enhance our support services. Share your experience or suggestions:
            </p>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Rate Your Experience</h3>
                  <p className="text-[#2E2E2E] mb-6">
                    After each support interaction, you'll receive a brief survey asking about your experience. 
                    Your ratings and comments help us recognize excellent support and identify areas for improvement.
                  </p>
                  <div className="flex items-center space-x-2 mb-8">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} className="w-10 h-10 rounded-full bg-[#ffeee3] hover:bg-[#ffeee3] flex items-center justify-center transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ffeee3] hover:text-[#FF6B00]" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  <button className="px-4 py-2 bg-[#FF6B00] hover:bg-[#2E2E2E] text-white rounded-lg transition-colors text-sm">
                    Submit Feedback
                  </button>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Suggest Improvements</h3>
                  <p className="text-[#2E2E2E] mb-6">
                    Have ideas on how we can make our support better? We'd love to hear your suggestions 
                    for new features, documentation, or support channels.
                  </p>
                  <div className="mb-4">
                    <label htmlFor="feedback" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                      Your Suggestion
                    </label>
                    <textarea 
                      id="feedback" 
                      rows={4} 
                      className="w-full border border-[#ffeee3] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Share your ideas for improving our support services..."
                    ></textarea>
                  </div>
                  <button className="px-4 py-2 bg-[#FF6B00] hover:bg-[#2E2E2E] text-white rounded-lg transition-colors text-sm">
                    Submit Suggestion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Support?</h2>
            <p className="text-xl text-[#2E2E2E] mb-8">
              Choose the support option that works best for your situation
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/contact" 
                className="px-6 py-3 bg-[#FF6B00] hover:bg-[#2E2E2E] text-white font-medium rounded-lg transition-colors"
              >
                Contact Support Now
              </Link>
              <Link 
                to="/resources/help-center" 
                className="px-6 py-3 bg-white border border-[#ffeee3] hover:bg-[#ffeee3] text-[#2E2E2E] font-medium rounded-lg transition-colors"
              >
                Browse Help Resources
              </Link>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-8">
              <Link 
                to="/resources/help-center" 
                className="flex items-center text-[#FF6B00] hover:text-[#2E2E2E] font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Return to Help Center
              </Link>
              
              <span className="hidden sm:block text-[#ffeee3]">|</span>
              
              <Link 
                to="/resources/help/security-privacy" 
                className="flex items-center text-[#FF6B00] hover:text-[#2E2E2E] font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Previous: Security & Privacy
              </Link>
            </div>
            
            <div className="mt-12 bg-white rounded-xl p-6 shadow-sm flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-[#FF6B00] mr-3" />
              <p className="text-[#2E2E2E]">
                Still can't find what you need? <Link to="/contact" className="text-[#FF6B00] font-medium">Contact us directly</Link> and we'll help you out.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactSupportHelpPage;















