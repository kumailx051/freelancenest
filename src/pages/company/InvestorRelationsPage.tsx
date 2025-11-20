import React, { useState } from 'react';
import { Download, TrendingUp, DollarSign, Calendar, BarChart, PieChart, User, Mail, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const InvestorRelationsPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Financial highlights data
  const financialHighlights = [
    {
      metric: 'Annual Revenue',
      value: '$328M',
      growth: '+42%',
      isPositive: true
    },
    {
      metric: 'Gross Profit Margin',
      value: '75%',
      growth: '+5%',
      isPositive: true
    },
    {
      metric: 'EBITDA',
      value: '$89M',
      growth: '+63%',
      isPositive: true
    },
    {
      metric: 'Active Users',
      value: '2.5M',
      growth: '+38%',
      isPositive: true
    }
  ];

  // Financial reports data
  const financialReports = [
    {
      year: '2025',
      quarters: [
        { 
          title: 'Q2 2025 Financial Results', 
          date: 'July 15, 2025', 
          description: 'Record quarterly revenue of $92M, representing 45% year-over-year growth'
        },
        { 
          title: 'Q1 2025 Financial Results', 
          date: 'April 12, 2025', 
          description: 'Revenue of $85M with strong international expansion and enterprise client growth'
        }
      ]
    }
  ];

  // News and events data
  const newsAndEvents = [
    {
      date: 'August 15, 2025',
      title: 'FreelanceNest Announces Acquisition of SkillVerify',
      description: 'Strategic acquisition enhances our skill verification capabilities and expands our certification offerings.'
    },
    {
      date: 'July 25, 2025',
      title: 'Q2 2025 Earnings Call',
      description: 'Join our leadership team for a discussion of our Q2 financial results and strategic initiatives.'
    },
    {
      date: 'June 10, 2025',
      title: 'FreelanceNest Presents at Tech Growth Conference',
      description: 'CEO Sarah Johnson will discuss the future of work and our platform growth strategy.'
    },
    {
      date: 'May 22, 2025',
      title: 'FreelanceNest Expands Enterprise Solutions',
      description: 'New enterprise offerings provide Fortune 500 companies with enhanced talent management capabilities.'
    }
  ];

  // Investor FAQs
  const investorFaqs = [
    {
      question: "What is FreelanceNest's business model?",
      answer: "FreelanceNest operates a two-sided marketplace that connects businesses with freelance professionals. We generate revenue through service fees on transactions, subscription plans for enhanced features, and enterprise solutions for larger organizations seeking managed talent services."
    },
    {
      question: 'How does FreelanceNest approach international expansion?',
      answer: 'Our expansion strategy focuses on key growth markets with strong freelance ecosystems and business demand. We localize our platform, payment systems, and support services while adapting to regional regulations. We typically enter new markets with targeted marketing campaigns and strategic partnerships.'
    },
    {
      question: 'What competitive advantages does FreelanceNest have?',
      answer: 'Key differentiators include our proprietary skill verification technology, enterprise-grade security measures, AI-powered matching algorithms, and comprehensive freelancer success resources. Our platform also offers specialized solutions for high-demand sectors like technology, creative services, and business consulting.'
    },
    {
      question: 'How does FreelanceNest invest in future growth?',
      answer: 'We allocate significant resources to R&D, focusing on AI capabilities, user experience enhancements, and new service offerings. We also invest in strategic acquisitions that complement our platform, expand our talent pool, or add valuable technology capabilities.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Investor <span className="text-[#FF6B00]">Relations</span></h1>
            <p className="text-xl mb-8 text-[#ffeee3]">
              FreelanceNest is transforming the future of work by connecting global talent with opportunity. Explore our financial performance, growth strategy, and investment potential.
            </p>
          </div>
        </div>
      </section>

      {/* Financial Highlights */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Financial Highlights</h2>
            <p className="text-xl text-[#2E2E2E]">
              Key performance metrics for the fiscal year 2025
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {financialHighlights.map((highlight, index) => (
              <div key={index} className="bg-[#ffeee3] rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#ffeee3]">{highlight.metric}</span>
                  {highlight.metric === 'Annual Revenue' ? (
                    <DollarSign className="w-5 h-5 text-[#FF6B00]" />
                  ) : highlight.metric === 'Gross Profit Margin' ? (
                    <PieChart className="w-5 h-5 text-[#FF6B00]" />
                  ) : highlight.metric === 'EBITDA' ? (
                    <BarChart className="w-5 h-5 text-[#FF6B00]" />
                  ) : (
                    <User className="w-5 h-5 text-[#FF6B00]" />
                  )}
                </div>
                <div className="text-3xl font-bold mb-2">{highlight.value}</div>
                <div className={`flex items-center ${
                  highlight.isPositive ? 'text-[#FF6B00]' : 'text-[#FF6B00]'
                }`}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>{highlight.growth} YoY</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Reports */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Financial Reports</h2>
            <p className="text-xl text-[#2E2E2E] mb-6">
              Quarterly and annual financial statements
            </p>
          </div>

          {/* Reports for 2025 */}
          <div className="max-w-4xl mx-auto">
            {financialReports[0].quarters.map((quarter, index) => (
              <div 
                key={index} 
                className="bg-white shadow-sm rounded-xl mb-4 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <Calendar className="w-5 h-5 text-[#FF6B00] mr-2" />
                        <span className="text-[#2E2E2E]">{quarter.date}</span>
                      </div>
                      <h3 className="text-xl font-bold">{quarter.title}</h3>
                      <p className="text-[#2E2E2E] mt-2">{quarter.description}</p>
                    </div>
                    <div className="flex gap-3 self-start md:self-center">
                      <button className="px-4 py-2 bg-[#ffeee3] text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg text-sm font-medium transition-colors duration-200 flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        PDF
                      </button>
                      <button className="px-4 py-2 bg-[#ffeee3] text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg text-sm font-medium transition-colors duration-200">
                        Presentation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Strategy */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Growth Strategy</h2>
            <p className="text-xl text-[#2E2E2E]">
              Our approach to sustainable long-term growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#ffeee3] rounded-xl p-6">
              <div className="w-12 h-12 bg-[#ffeee3] rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Market Expansion</h3>
              <p className="text-[#2E2E2E] mb-4">
                Accelerating growth in key international markets across Asia-Pacific, Latin America, and Europe with localized platform experiences and payment solutions.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-[#2E2E2E]">
                  <div className="w-1.5 h-1.5 bg-[#2E2E2E] rounded-full mr-2"></div>
                  <span>20+ new markets by 2026</span>
                </li>
                <li className="flex items-center text-[#2E2E2E]">
                  <div className="w-1.5 h-1.5 bg-[#2E2E2E] rounded-full mr-2"></div>
                  <span>15 additional languages</span>
                </li>
                <li className="flex items-center text-[#2E2E2E]">
                  <div className="w-1.5 h-1.5 bg-[#2E2E2E] rounded-full mr-2"></div>
                  <span>Local payment integrations</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#ffeee3] rounded-xl p-6">
              <div className="w-12 h-12 bg-[#ffeee3] rounded-full flex items-center justify-center mb-4">
                <BarChart className="w-6 h-6 text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Enterprise Solutions</h3>
              <p className="text-[#2E2E2E] mb-4">
                Expanding our enterprise offering with managed talent services, compliance tools, and integration with major workforce management systems.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-[#2E2E2E]">
                  <div className="w-1.5 h-1.5 bg-[#2E2E2E] rounded-full mr-2"></div>
                  <span>Fortune 500 client growth</span>
                </li>
                <li className="flex items-center text-[#2E2E2E]">
                  <div className="w-1.5 h-1.5 bg-[#2E2E2E] rounded-full mr-2"></div>
                  <span>VMS/ATS integrations</span>
                </li>
                <li className="flex items-center text-[#2E2E2E]">
                  <div className="w-1.5 h-1.5 bg-[#2E2E2E] rounded-full mr-2"></div>
                  <span>Compliance management</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#ffeee3] rounded-xl p-6">
              <div className="w-12 h-12 bg-[#ffeee3] rounded-full flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Service Expansion</h3>
              <p className="text-[#2E2E2E] mb-4">
                Developing new service categories and monetization models to increase platform engagement and transaction value.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-[#2E2E2E]">
                  <div className="w-1.5 h-1.5 bg-[#2E2E2E] rounded-full mr-2"></div>
                  <span>Skill certification program</span>
                </li>
                <li className="flex items-center text-[#2E2E2E]">
                  <div className="w-1.5 h-1.5 bg-[#2E2E2E] rounded-full mr-2"></div>
                  <span>Project management tools</span>
                </li>
                <li className="flex items-center text-[#2E2E2E]">
                  <div className="w-1.5 h-1.5 bg-[#2E2E2E] rounded-full mr-2"></div>
                  <span>Financial services for freelancers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* News and Events */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">News & Events</h2>
            <p className="text-xl text-[#2E2E2E]">
              Latest announcements and upcoming investor events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {newsAndEvents.map((item, index) => (
              <div 
                key={index} 
                className="bg-white shadow-sm hover:shadow-md rounded-xl p-6 transition-shadow duration-200"
              >
                <div className="text-[#ffeee3] mb-2">{item.date}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-[#2E2E2E] mb-4">{item.description}</p>
                <Link 
                  to="#" 
                  className="text-[#FF6B00] hover:text-[#FF9F45] font-medium inline-flex items-center"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link 
              to="#" 
              className="px-6 py-3 bg-[#ffeee3] hover:bg-[#ffeee3] text-[#2E2E2E] rounded-lg font-medium transition-colors duration-200"
            >
              View all news & events
            </Link>
          </div>
        </div>
      </section>

      {/* Investor FAQs */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Investor <span className="text-[#FF6B00]">FAQs</span></h2>
            <p className="text-xl text-[#2E2E2E]">
              Common questions from our investors and stakeholders
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {investorFaqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white border border-[#FF6B00]/20 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#ffeee3]/30 transition-colors duration-200"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-lg font-bold text-[#2E2E2E] pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-[#FF6B00]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#FF6B00]" />
                    )}
                  </div>
                </button>
                
                {expandedFaq === index && (
                  <div className="px-6 pb-6 border-t border-[#FF6B00]/10">
                    <div className="pt-4">
                      <p className="text-[#2E2E2E]/80 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-[#ffeee3] rounded-lg border border-[#FF6B00]/20">
              <Mail className="w-5 h-5 text-[#FF6B00] mr-3" />
              <span className="text-[#2E2E2E]">Have more questions? Contact our investor relations team</span>
            </div>
          </div>
        </div>
      </section>

      {/* Investor Contact */}
      <section className="py-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Investor Contact</h2>
                <p className="mb-8 text-[#ffeee3]">
                  For investor relations inquiries, please contact our team. We're here to provide the information you need.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-[#ffeee3]" />
                    <div>investors@freelancenest.com</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Stay Informed</h3>
                <p className="mb-6 text-[#ffeee3]">
                  Subscribe to receive investor updates, earnings announcements, and news releases.
                </p>
                
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/20"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/20"
                      placeholder="Your email address"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-white text-[#FF9F45] hover:bg-[#ffeee3] py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvestorRelationsPage;


















