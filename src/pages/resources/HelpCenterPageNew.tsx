import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MessageSquare, Mail, FileText, Users, CreditCard, Settings, Shield, ArrowRight } from 'lucide-react';

const HelpCenterPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Popular categories
  const popularCategories = [
    { 
      title: 'Getting Started', 
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-[#ffeee3] text-[#FF6B00]',
      href: '/resources/help/getting-started'
    },
    { 
      title: 'Account & Profile', 
      icon: <Users className="w-6 h-6" />,
      color: 'bg-[#ffeee3] text-[#FF6B00]',
      href: '/resources/help/account-profile'
    },
    { 
      title: 'Payments & Finances', 
      icon: <CreditCard className="w-6 h-6" />,
      color: 'bg-[#ffeee3] text-[#FF6B00]',
      href: '/resources/help/payments-finances'
    },
    { 
      title: 'Platform Settings', 
      icon: <Settings className="w-6 h-6" />,
      color: 'bg-[#ffeee3] text-[#FF6B00]',
      href: '/resources/help/platform-settings'
    },
    { 
      title: 'Security & Privacy', 
      icon: <Shield className="w-6 h-6" />,
      color: 'bg-[#ffeee3] text-[#FF6B00]',
      href: '/resources/help/security-privacy'
    },
    { 
      title: 'Contact Support', 
      icon: <Mail className="w-6 h-6" />,
      color: 'bg-[#ffeee3] text-[#FF6B00]',
      href: '/resources/help/contact-support'
    }
  ];

  // FAQ sections
  const faqSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      questions: [
        {
          question: 'How do I create a FreelanceNest account?',
          answer: 'Creating an account is easy! Click the "Sign Up" button in the top right corner of the homepage. You can register using your email address or continue with Google, Facebook, or Apple accounts. Follow the prompts to complete your profile setup.'
        },
        {
          question: 'Is it free to join FreelanceNest?',
          answer: 'Yes, creating a basic account on FreelanceNest is completely free. You can browse projects, create a profile, and submit proposals without any upfront costs. Service fees only apply when you successfully earn money on the platform.'
        },
        {
          question: 'What should I include in my profile?',
          answer: 'A strong profile should include a professional photo, comprehensive overview of your skills and experience, portfolio samples, certifications, education details, and work history. The more complete your profile is, the more likely clients will trust and hire you.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account & Profile',
      questions: [
        {
          question: 'How do I change my password?',
          answer: 'To change your password, go to "Account Settings" from your profile dropdown menu, select the "Security" tab, and click "Change Password." You\'ll need to enter your current password followed by your new password.'
        },
        {
          question: 'Can I have multiple freelancer profiles?',
          answer: 'No, FreelanceNest allows only one profile per user. However, you can showcase multiple skills and service offerings within your single profile. This helps maintain platform integrity and prevents confusion among clients.'
        },
        {
          question: 'How do I update my skills and expertise?',
          answer: 'Navigate to your profile page and click "Edit Profile." Under the "Skills & Expertise" section, you can add, remove, or reorder your skills. You can also take skill tests to earn badges that verify your proficiency.'
        }
      ]
    },
    {
      id: 'payments',
      title: 'Payments & Finances',
      questions: [
        {
          question: 'How and when do I get paid?',
          answer: 'For hourly contracts, payment is processed weekly. For fixed-price projects, payment is released from escrow when you complete project milestones. Once the funds are in your FreelanceNest account, you can withdraw them to your linked bank account, PayPal, or other supported payment methods.'
        },
        {
          question: 'What payment methods are accepted?',
          answer: 'FreelanceNest supports various payment methods including bank transfers, PayPal, Payoneer, and in some regions, direct deposit. Available withdrawal methods may vary depending on your country of residence.'
        },
        {
          question: 'What are the platform fees?',
          answer: 'FreelanceNest charges a sliding service fee starting at 20% for new client relationships. As you build a longer-term relationship with a client, the fee decreases to as low as 5%. Premium membership plans may offer reduced service fees.'
        }
      ]
    }
  ];

  // Sample Quick Help Articles
  const quickHelpArticles = [
    {
      title: "Getting Your First Client",
      excerpt: "Tips and strategies for winning your first project on FreelanceNest.",
      category: "Beginner Tips",
      readTime: "5 min",
      href: "#"
    },
    {
      title: "Setting Up Secure Payments",
      excerpt: "Learn how to configure your payment methods and ensure secure transactions.",
      category: "Payments",
      readTime: "3 min",
      href: "#"
    },
    {
      title: "Creating an Effective Portfolio",
      excerpt: "Showcase your work properly to attract more clients.",
      category: "Profile",
      readTime: "7 min",
      href: "#"
    },
    {
      title: "Understanding Platform Fees",
      excerpt: "A breakdown of FreelanceNest fees and when they apply.",
      category: "Finances",
      readTime: "4 min",
      href: "#"
    }
  ];

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-40 pb-16 relative">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#2E2E2E]/90"></div>
        </div>
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How can we <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">help</span> you?
            </h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Search our knowledge base or browse popular help topics
            </p>
            
            {/* Search Box */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#ffeee3]" />
              </div>
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-12 pr-4 py-4 w-full rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00] shadow-lg text-[#2E2E2E]"
              />
              <button 
                className="absolute inset-y-0 right-0 px-4 text-white bg-[#FF6B00] hover:bg-[#FF6B00]/90 rounded-r-xl transition-colors duration-200"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Help Categories */}
      <section className="py-16 bg-[#ffeee3]/30 -mt-8">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#2E2E2E] mb-4">
                Popular <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Help</span> Categories
              </h2>
              <p className="text-xl text-[#2E2E2E]/80">
                Find answers to the most common questions
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCategories.map((category, index) => (
                <Link 
                  to={category.href}
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md hover:border-[#FF6B00] border border-transparent transition-all duration-200 flex items-start gap-4"
                >
                  <div className={`p-3 rounded-lg ${category.color}`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#2E2E2E] mb-2">{category.title}</h3>
                    <div className="flex items-center text-[#FF6B00] font-medium">
                      Browse articles
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Help Articles */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#2E2E2E] mb-4">
                <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Quick</span> Help Articles
              </h2>
              <p className="text-xl text-[#2E2E2E]/80">
                Get started with these essential guides
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickHelpArticles.map((article, index) => (
                <div key={index} className="bg-[#ffeee3] rounded-xl overflow-hidden hover:shadow-md hover:border-[#FF6B00] border border-transparent transition-all duration-200">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-[#FF6B00] bg-white px-2 py-1 rounded">{article.category}</span>
                      <span className="text-xs text-[#2E2E2E]/60">{article.readTime} read</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#2E2E2E] mb-3">{article.title}</h3>
                    <p className="text-[#2E2E2E]/70 mb-4 text-sm">{article.excerpt}</p>
                    <a 
                      href={article.href}
                      className="inline-flex items-center text-[#FF6B00] font-medium hover:underline"
                    >
                      Read More
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20 bg-[#ffeee3]/30">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#2E2E2E] mb-4">
                Frequently Asked <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Questions</span>
              </h2>
              <p className="text-xl text-[#2E2E2E]/80">
                Find answers to common questions about our platform
              </p>
            </div>
            
            <div className="space-y-12">
              {faqSections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-24">
                  <h3 className="text-2xl font-bold text-[#2E2E2E] mb-6 flex items-center">
                    <span className="w-8 h-8 bg-[#FF6B00] text-white rounded-full flex items-center justify-center text-sm mr-3">
                      {section.id === 'getting-started' ? '1' : section.id === 'account' ? '2' : '3'}
                    </span>
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.questions.map((faq, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-sm border border-[#ffeee3] hover:border-[#FF6B00] transition-colors duration-200 overflow-hidden">
                        <details className="group">
                          <summary className="flex items-center justify-between p-6 cursor-pointer">
                            <h4 className="text-lg font-bold text-[#2E2E2E] flex items-center">
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#ffeee3] text-[#FF6B00] text-sm font-bold mr-4">Q</span>
                              {faq.question}
                            </h4>
                            <div className="w-6 h-6 flex-shrink-0 bg-[#ffeee3] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </summary>
                          <div className="px-6 pb-6 pt-2">
                            <div className="bg-[#ffeee3] border-l-4 border-[#FF6B00] pl-4 py-3">
                              <p className="text-[#2E2E2E]/80">{faq.answer}</p>
                            </div>
                          </div>
                        </details>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#2E2E2E] mb-4">
                Need <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">More</span> Help?
              </h2>
              <p className="text-xl text-[#2E2E2E]/80">
                Our support team is here to assist you 24/7
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#ffeee3] p-8 rounded-xl shadow-sm text-center hover:shadow-md hover:border-[#FF6B00] border border-transparent transition-all duration-200">
                <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-8 h-8 text-[#FF6B00]" />
                </div>
                <h3 className="text-xl font-bold text-[#2E2E2E] mb-3">Live Chat</h3>
                <p className="text-[#2E2E2E]/70 mb-6">
                  Chat with our support team in real-time for immediate assistance.
                </p>
                <button className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-medium py-3 rounded-lg transition-colors duration-200">
                  Start Chat
                </button>
                <p className="text-sm text-[#2E2E2E]/60 mt-3">
                  Available 24/7
                </p>
              </div>
              
              <div className="bg-[#ffeee3] p-8 rounded-xl shadow-sm text-center hover:shadow-md hover:border-[#FF6B00] border border-transparent transition-all duration-200">
                <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-[#FF6B00]" />
                </div>
                <h3 className="text-xl font-bold text-[#2E2E2E] mb-3">Email Support</h3>
                <p className="text-[#2E2E2E]/70 mb-6">
                  Send us an email and we'll get back to you within 24 hours.
                </p>
                <button className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-medium py-3 rounded-lg transition-colors duration-200">
                  Email Us
                </button>
                <p className="text-sm text-[#2E2E2E]/60 mt-3">
                  Response within 24 hours
                </p>
              </div>
              
              <div className="bg-[#ffeee3] p-8 rounded-xl shadow-sm text-center hover:shadow-md hover:border-[#FF6B00] border border-transparent transition-all duration-200">
                <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-[#FF6B00]" />
                </div>
                <h3 className="text-xl font-bold text-[#2E2E2E] mb-3">Submit a Ticket</h3>
                <p className="text-[#2E2E2E]/70 mb-6">
                  Create a support ticket for complex issues requiring investigation.
                </p>
                <button className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-medium py-3 rounded-lg transition-colors duration-200">
                  Create Ticket
                </button>
                <p className="text-sm text-[#2E2E2E]/60 mt-3">
                  Dedicated case manager
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Join Our <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Community</span>
            </h2>
            <p className="text-xl text-[#ffeee3] mb-8">
              Connect with other freelancers, share knowledge, and get advice from experts in our community forum.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="#" 
                className="bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90 font-medium px-8 py-4 rounded-lg transition-colors duration-200 text-center"
              >
                Visit Community Forum
              </Link>
              <Link 
                to="/resources/success-stories" 
                className="bg-transparent border border-[#ffeee3] text-white hover:bg-white/10 font-medium px-8 py-4 rounded-lg transition-colors duration-200 text-center"
              >
                Read Success Stories
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenterPage;
