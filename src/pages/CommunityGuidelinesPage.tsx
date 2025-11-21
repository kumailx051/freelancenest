import React from 'react';

// Guidelines categories
const guidelinesCategories = [
  {
    id: 1,
    title: "Conduct & Communication",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    guidelines: [
      {
        title: "Respectful Interaction",
        description: "Always communicate respectfully and professionally. Harassment, hate speech, or discriminatory language is strictly prohibited."
      },
      {
        title: "Constructive Feedback",
        description: "When providing feedback, focus on being constructive and specific. Personal attacks are never acceptable."
      },
      {
        title: "Response Timeliness",
        description: "Respond to messages and project communications within 24-48 hours to maintain effective collaboration."
      }
    ]
  },
  {
    id: 2,
    title: "Work Quality & Delivery",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    guidelines: [
      {
        title: "Honest Representation",
        description: "Only accept projects that match your actual skills and experience. Misrepresentation of capabilities is prohibited."
      },
      {
        title: "Quality Standards",
        description: "Deliver work that meets professional standards and aligns with industry best practices."
      },
      {
        title: "Deadline Adherence",
        description: "Meet agreed-upon deadlines. If delays are anticipated, communicate proactively with clients."
      }
    ]
  },
  {
    id: 3,
    title: "Payment & Billing",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    guidelines: [
      {
        title: "Platform Payments Only",
        description: "All payments must be processed through our platform. Circumventing our payment system violates our terms."
      },
      {
        title: "Fair Pricing",
        description: "Set fair prices that reflect the value of your work. Avoid significant price changes after agreements are made."
      },
      {
        title: "Clear Terms",
        description: "Establish clear payment terms and milestones before beginning work to avoid misunderstandings."
      }
    ]
  },
  {
    id: 4,
    title: "Privacy & Confidentiality",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    guidelines: [
      {
        title: "Confidentiality",
        description: "Respect the confidentiality of information shared during projects. Do not disclose sensitive data without explicit permission."
      },
      {
        title: "Intellectual Property",
        description: "Respect intellectual property rights. Only use content you have the rights to or have properly licensed."
      },
      {
        title: "Data Protection",
        description: "Handle personal and business data according to applicable laws and our platform's privacy policy."
      }
    ]
  },
  {
    id: 5,
    title: "Dispute Resolution",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
      </svg>
    ),
    guidelines: [
      {
        title: "Direct Resolution",
        description: "Attempt to resolve issues directly through professional communication before escalating to formal disputes."
      },
      {
        title: "Evidence Preparation",
        description: "Maintain records of all agreements, communications, and work delivered in case disputes arise."
      },
      {
        title: "Platform Mediation",
        description: "Use our platform's dispute resolution process when direct resolution fails. Abide by mediator decisions."
      }
    ]
  }
];

// Violation consequences
const violationConsequences = [
  {
    level: "Warning",
    description: "First-time or minor violations typically result in a warning and guidance on how to comply with our guidelines.",
    examples: ["Late responses to communications", "Minor quality issues", "First-time misunderstandings of platform rules"]
  },
  {
    level: "Restriction",
    description: "Repeated violations may result in temporary restrictions on certain platform activities.",
    examples: ["Temporary suspension of bidding privileges", "Required approval for new project postings", "Mandatory review periods for submitted work"]
  },
  {
    level: "Suspension",
    description: "Serious or repeated violations may lead to temporary account suspension.",
    examples: ["Multiple quality complaints", "Payment disputes", "Repeated violations after warnings"]
  },
  {
    level: "Termination",
    description: "The most severe violations result in permanent account termination and removal from the platform.",
    examples: ["Fraud or scam attempts", "Hate speech or harassment", "Identity theft or impersonation", "Payment circumvention"]
  }
];

const CommunityGuidelinesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-r from-primary-500 to-purple-600">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-sm font-semibold mb-3">
              Platform Standards
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Community Guidelines</h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              These guidelines ensure a safe, respectful, and productive environment for all platform users.
              Following them is essential to maintaining the integrity of our community.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#ffeee3] border-l-4 border-[#FF6B00] p-5 rounded-r-lg mb-8">
              <h2 className="text-2xl font-bold text-[#2E2E2E] mb-3">Our Commitment</h2>
              <p className="text-[#2E2E2E]">
                Our platform is built on trust and mutual respect. These guidelines apply to all users, 
                whether clients or freelancers, and cover all interactions on our platform. By using our services, 
                you agree to follow these guidelines and understand that violations may lead to consequences 
                ranging from warnings to account termination.
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-[#2E2E2E]">
              <p>
                We believe in fostering a professional environment where clients can find exceptional talent, 
                and freelancers can build successful careers. These guidelines are designed to help everyone understand 
                our expectations and contribute positively to our community.
              </p>
              <p>
                Please take the time to familiarize yourself with these guidelines. If you have any questions 
                or need clarification, our support team is available to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guidelines Categories Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block px-3 py-1 bg-[#ffeee3] text-[#FF6B00] rounded-full text-sm font-semibold mb-3">
              Platform Standards
            </div>
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">Core Guidelines</h2>
            <p className="text-xl text-[#2E2E2E] max-w-2xl mx-auto">
              Five key categories of guidelines that ensure a positive platform experience for all users
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {guidelinesCategories.map((category) => (
              <div key={category.id} className="group hover:scale-[1.02] transition-all duration-300">
                <div className="relative z-10 h-full flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden border border-[#ffeee3] hover:shadow-md transition-all">
                  {/* Top Decorative Gradient Bar */}
                  <div className="h-2 w-full bg-gradient-to-r from-primary-500 to-purple-500"></div>
                  
                  <div className="p-8 border-b border-[#ffeee3]">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl mr-4 shadow-inner">
                        <div className="text-[#FF6B00]">
                          {category.icon}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-[#2E2E2E]">{category.title}</h3>
                    </div>
                  </div>
                  
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div className="space-y-6">
                      {category.guidelines.map((guideline, index) => (
                        <div key={index} className="relative">
                          <div className="flex mb-2">
                            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold text-sm mr-3 flex-shrink-0">
                              {index + 1}
                            </div>
                            <h4 className="font-semibold text-lg text-[#2E2E2E]">{guideline.title}</h4>
                          </div>
                          <div className="pl-11">
                            <p className="text-[#2E2E2E] text-sm leading-relaxed">{guideline.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    

                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <a href="#" className="inline-flex items-center justify-center px-6 py-3 bg-[#FF6B00] hover:bg-[#FF9F45] rounded-lg text-white font-medium transition-colors duration-300">
              <span className="mr-2">Download Guidelines PDF</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Violation Consequences */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">Guideline Violation Consequences</h2>
            <p className="text-xl text-[#2E2E2E]">
              Our approach to handling violations is fair and proportionate
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {violationConsequences.map((consequence, index) => (
                <div key={index} className={`border-l-4 rounded-r-lg p-6 ${
                  index === 0 ? 'border-[#FF9F45] bg-[#ffeee3]' :
                  index === 1 ? 'border-orange-400 bg-orange-50' :
                  index === 2 ? 'border-[#FF6B00] bg-[#ffeee3]' :
                  'border-[#FF6B00] bg-[#ffeee3]'
                }`}>
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4">
                      <h3 className="text-xl font-bold mb-2 md:mb-0 text-[#2E2E2E]">{consequence.level}</h3>
                    </div>
                    <div className="md:w-3/4">
                      <p className="text-[#2E2E2E] mb-4">{consequence.description}</p>
                      <div>
                        <h4 className="font-medium text-[#2E2E2E] mb-2">Examples:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-[#2E2E2E]">
                          {consequence.examples.map((example, i) => (
                            <li key={i}>{example}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reporting Violations */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-[#FF6B00] text-white p-8">
                  <h3 className="text-2xl font-bold mb-4">Reporting Violations</h3>
                  <p className="opacity-90 mb-6">
                    If you encounter behavior that violates these guidelines, please report it immediately.
                  </p>
                  <button className="inline-block px-5 py-3 bg-white text-[#FF6B00] rounded-lg font-medium hover:bg-[#ffeee3] transition-colors">
                    Report a Violation
                  </button>
                </div>
                <div className="md:w-2/3 p-8">
                  <h4 className="text-xl font-bold mb-4 text-[#2E2E2E]">How to Report</h4>
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-3">
                        1
                      </div>
                      <div>
                        <p className="text-[#2E2E2E]">Use the "Report" button on the relevant project, message, or profile.</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-3">
                        2
                      </div>
                      <div>
                        <p className="text-[#2E2E2E]">Provide specific details about the violation, including screenshots if available.</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-3">
                        3
                      </div>
                      <div>
                        <p className="text-[#2E2E2E]">Our Trust & Safety team will review your report and take appropriate action.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guidelines Updates */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-[#2E2E2E]">Guidelines Updates</h2>
            <p className="text-[#2E2E2E] mb-8">
              These guidelines may be updated periodically. We'll notify you of any significant changes,
              but it's a good idea to review them regularly to stay informed.
            </p>
            <p className="text-sm text-[#ffeee3]">Last updated: August 15, 2025</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommunityGuidelinesPage;















