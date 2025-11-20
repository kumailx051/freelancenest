import React from 'react';
import { Link } from 'react-router-dom';

// Quality standards
const qualityStandards = [
  {
    title: "Accuracy & Precision",
    description: "Work delivered must be free of errors and meet the specified requirements. This includes accuracy in calculations, code functionality, design specifications, and written content.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Timeliness",
    description: "Meeting agreed-upon deadlines is essential. If delays are anticipated, communicate proactively with clients well before the deadline.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Professionalism",
    description: "Work should be well-organized, properly documented, and presented in a professional manner appropriate for business use.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "Industry Standards",
    description: "Work must comply with relevant industry standards, best practices, and regulations applicable to the specific field or project.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    )
  }
];

// Delivery process tips
const deliveryTips = [
  {
    title: "Set Clear Milestones",
    description: "Break projects into smaller, manageable deliverables with their own deadlines.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  },
  {
    title: "Document Everything",
    description: "Maintain detailed records of requirements, changes, and approvals throughout the project.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    title: "Include Usage Instructions",
    description: "Provide clear documentation on how to use, implement, or maintain the delivered work.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    title: "Test Before Delivery",
    description: "Thoroughly test work before delivery to ensure it meets all requirements and functions as expected.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
      </svg>
    )
  },
  {
    title: "Format Professionally",
    description: "Present deliverables in a clean, organized format with proper naming conventions and structure.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )
  },
  {
    title: "Follow Up After Delivery",
    description: "Check in with clients after delivery to address any questions or make necessary adjustments.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    )
  }
];

// Quality measurement table
const qualityMetrics = [
  {
    category: "Software Development",
    criteria: [
      "Code functions as specified with no critical bugs",
      "Code is well-structured and follows clean coding principles",
      "Includes proper error handling and edge case coverage",
      "Code is properly commented and documented",
      "Passes all specified tests and quality checks"
    ]
  },
  {
    category: "Design Work",
    criteria: [
      "Meets all specified visual and functional requirements",
      "Files are properly organized and use appropriate formats",
      "Design is responsive and works across required devices/browsers",
      "Includes source files that allow for future modifications",
      "Design elements are consistent and follow brand guidelines"
    ]
  },
  {
    category: "Content Creation",
    criteria: [
      "Content is free from grammatical and spelling errors",
      "Information is accurate and properly sourced when needed",
      "Meets specified length, tone, and style requirements",
      "Content is original and passes plagiarism checks",
      "Formatting and structure follow the specified guidelines"
    ]
  }
];

const WorkQualityGuidelinesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-r from-primary-500 to-purple-600">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-sm font-semibold mb-3">
              Community Guidelines
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Work Quality & Delivery</h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Maintaining high standards in your work quality and delivery process is essential
              for building a strong reputation and long-term success on our platform.
            </p>
          </div>
        </div>
      </section>

      {/* Quality Standards Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block px-3 py-1 bg-[#ffeee3] text-[#FF6B00] rounded-full text-sm font-semibold mb-3">
              Core Standards
            </div>
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">Quality Standards</h2>
            <p className="text-xl text-[#2E2E2E] max-w-2xl mx-auto">
              All work delivered on our platform must meet these fundamental quality criteria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {qualityStandards.map((standard, index) => (
              <div key={index} className="bg-[#ffeee3] p-8 rounded-xl border border-[#ffeee3] hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4 text-primary-600">
                    {standard.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#2E2E2E]">{standard.title}</h3>
                </div>
                <p className="text-[#2E2E2E]">{standard.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Metrics Table */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block px-3 py-1 bg-[#ffeee3] text-[#FF6B00] rounded-full text-sm font-semibold mb-3">
              Field-Specific Criteria
            </div>
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">Quality Measurement</h2>
            <p className="text-xl text-[#2E2E2E] max-w-2xl mx-auto">
              Industry-specific quality criteria for common project types
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {qualityMetrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="bg-primary-600 px-6 py-4">
                  <h3 className="text-lg font-semibold text-white">{metric.category}</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {metric.criteria.map((criterion, i) => (
                      <li key={i} className="flex items-start">
                        <div className="bg-primary-100 p-1 rounded-full mr-3 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[#2E2E2E]">{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Process Tips */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block px-3 py-1 bg-[#ffeee3] text-[#FF6B00] rounded-full text-sm font-semibold mb-3">
              Best Practices
            </div>
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">Delivery Process Tips</h2>
            <p className="text-xl text-[#2E2E2E] max-w-2xl mx-auto">
              Follow these recommendations to ensure a smooth delivery process and client satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {deliveryTips.map((tip, index) => (
              <div key={index} className="bg-[#ffeee3] p-6 rounded-xl border border-[#ffeee3] hover:shadow-md transition-shadow">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-lg inline-block mb-4">
                  <div className="text-white">
                    {tip.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#2E2E2E] mb-2">{tip.title}</h3>
                <p className="text-[#2E2E2E]">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-8 bg-gradient-to-r from-blue-500 to-purple-600">
                <h2 className="text-2xl font-bold text-white mb-2">Case Study: Excellence in Delivery</h2>
                <p className="text-[#ffeee3]">
                  An example of how high-quality work and professional delivery creates long-term success
                </p>
              </div>
              <div className="p-8">
                <div className="prose prose-lg max-w-none text-[#2E2E2E]">
                  <p>
                    <span className="font-semibold">The Scenario:</span> A freelance developer was hired to build a custom e-commerce plugin for a client's website. The project had a tight deadline and complex requirements.
                  </p>
                  
                  <h3>Quality Approach:</h3>
                  <ul>
                    <li>Started with a detailed requirements analysis document that was approved by the client</li>
                    <li>Set up weekly progress demos to get feedback early and often</li>
                    <li>Created a test plan with both automated tests and manual test scenarios</li>
                    <li>Documented all code thoroughly with comments and a separate developer guide</li>
                    <li>Included performance optimization as part of the development process</li>
                  </ul>
                  
                  <h3>Delivery Process:</h3>
                  <ul>
                    <li>Broke the project into four milestone deliverables with clear acceptance criteria</li>
                    <li>Delivered each milestone on time, with comprehensive test results</li>
                    <li>Created video tutorials for the client's team on how to use and maintain the plugin</li>
                    <li>Provided a 30-day support period after final delivery</li>
                  </ul>
                  
                  <h3>Results:</h3>
                  <p>
                    The client was so impressed with the quality and delivery process that they:
                  </p>
                  <ul>
                    <li>Left a perfect 5-star review</li>
                    <li>Immediately hired the freelancer for two additional projects</li>
                    <li>Referred the freelancer to three business partners</li>
                  </ul>
                  
                  <div className="bg-[#ffeee3] p-4 border-l-4 border-[#FF6B00] mt-6">
                    <p className="italic">
                      "This was the most professional development experience we've ever had. The quality of work was exceptional, and the delivery process was smooth and transparent throughout. We'll definitely be working together again."
                    </p>
                    <p className="font-semibold text-right mt-2">â€” Client Testimonial</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-600">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Ready to Elevate Your Work Quality?</h2>
            <p className="text-xl text-[#ffeee3] mb-8 max-w-2xl mx-auto">
              Access our resources to further enhance your skills and deliver exceptional work on our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/community-guidelines" className="px-6 py-3 bg-white text-primary-600 hover:bg-[#ffeee3] rounded-lg font-medium transition-colors">
                Return to Guidelines
              </Link>
              <a href="#" className="px-6 py-3 bg-primary-700 text-white hover:bg-primary-800 rounded-lg font-medium transition-colors">
                Skill Development Resources
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Guidelines */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl font-bold mb-4 text-[#2E2E2E]">Related Guidelines</h2>
            <p className="text-[#2E2E2E]">
              Explore other community guidelines to ensure a successful experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Link to="/guidelines/conduct" className="group">
              <div className="bg-[#ffeee3] p-6 rounded-xl border border-[#ffeee3] hover:border-[#FF6B00] hover:shadow-md transition-all h-full">
                <div className="bg-[#ffeee3] p-3 rounded-lg inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#2E2E2E] mb-2">Conduct & Communication</h3>
                <p className="text-[#2E2E2E] mb-4">Guidelines for professional interactions and communication</p>
                <span className="text-primary-600 font-medium group-hover:translate-x-2 inline-block transition-transform">Learn more â†’</span>
              </div>
            </Link>
            <Link to="/guidelines/payment" className="group">
              <div className="bg-[#ffeee3] p-6 rounded-xl border border-[#ffeee3] hover:border-[#FF6B00] hover:shadow-md transition-all h-full">
                <div className="bg-[#ffeee3] p-3 rounded-lg inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#2E2E2E] mb-2">Payment & Billing</h3>
                <p className="text-[#2E2E2E] mb-4">Guidelines for transparent, fair, and secure financial transactions</p>
                <span className="text-primary-600 font-medium group-hover:translate-x-2 inline-block transition-transform">Learn more â†’</span>
              </div>
            </Link>
            <Link to="/guidelines/privacy" className="group">
              <div className="bg-[#ffeee3] p-6 rounded-xl border border-[#ffeee3] hover:border-[#FF6B00] hover:shadow-md transition-all h-full">
                <div className="bg-[#ffeee3] p-3 rounded-lg inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#2E2E2E] mb-2">Privacy & Confidentiality</h3>
                <p className="text-[#2E2E2E] mb-4">Protocols for protecting sensitive information and intellectual property</p>
                <span className="text-primary-600 font-medium group-hover:translate-x-2 inline-block transition-transform">Learn more â†’</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkQualityGuidelinesPage;












