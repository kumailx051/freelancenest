import React from 'react';
import { Link } from 'react-router-dom';

// Examples of professional communication
const communicationExamples = [
  {
    type: "Professional",
    message: "I noticed that the project timeline might be at risk due to the recent API changes. Could we schedule a call to discuss potential solutions?",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    type: "Unprofessional",
    message: "This project is a disaster! You keep changing requirements and now we're going to miss the deadline!",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    type: "Professional",
    message: "Thank you for your feedback on the design. I've incorporated most of your suggestions, but had a question about the color scheme you requested. Could you clarify which shade of blue you prefer?",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    type: "Unprofessional",
    message: "I've spent hours on this design and you want to change everything? The blue color is obviously the best choice for your brand.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

// Do's and Don'ts
const dosAndDonts = [
  {
    do: "Address clients and team members by name and maintain a courteous tone in all communications.",
    dont: "Use overly casual language, slang, or offensive terms in professional communications."
  },
  {
    do: "Respond to messages within 24-48 hours, even if it's just to acknowledge receipt.",
    dont: "Ignore messages or wait several days before responding without explanation."
  },
  {
    do: "Provide constructive feedback focused on the work, not the person.",
    dont: "Make personal criticisms or use derogatory language when providing feedback."
  },
  {
    do: "Clearly communicate project updates, challenges, and timeline adjustments.",
    dont: "Hide problems or deliver unexpected news at the last minute."
  },
  {
    do: "Be mindful of different time zones and cultural communication styles.",
    dont: "Demand immediate responses outside of business hours or ignore cultural differences."
  }
];

// Best practices
const bestPractices = [
  {
    title: "Document Important Conversations",
    description: "Follow up verbal discussions with written summaries to maintain clear records of decisions and agreements.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    title: "Set Communication Expectations",
    description: "Establish preferred communication channels, response times, and meeting schedules at the start of a project.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "Use Visual Aids When Appropriate",
    description: "Include screenshots, mockups, or diagrams to clarify complex ideas or instructions.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "Practice Active Listening",
    description: "Confirm understanding by paraphrasing and asking clarifying questions when needed.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    )
  }
];

const ConductGuidelinesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-r from-primary-500 to-purple-600">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-sm font-semibold mb-3">
              Community Guidelines
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Conduct & Communication</h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Professional communication is the foundation of successful collaborations.
              Learn how to maintain respectful and effective interactions on our platform.
            </p>
          </div>
        </div>
      </section>

      {/* Key Principles Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <div className="inline-block px-3 py-1 bg-[#ffeee3] text-[#FF6B00] rounded-full text-sm font-semibold mb-3">
                  Core Principles
                </div>
                <h2 className="text-3xl font-bold mb-6 text-[#2E2E2E]">Maintaining Professional Standards</h2>
                <p className="text-[#2E2E2E] mb-6">
                  Our platform thrives when all members communicate professionally, 
                  transparently, and with mutual respect. These principles help create 
                  a positive environment where clients and freelancers can collaborate effectively.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-primary-100 p-1 rounded-full mr-3 mt-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[#2E2E2E]">Treat all community members with dignity and respect</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary-100 p-1 rounded-full mr-3 mt-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[#2E2E2E]">Maintain professional tone in all communications</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary-100 p-1 rounded-full mr-3 mt-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[#2E2E2E]">Respond to messages in a timely manner</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary-100 p-1 rounded-full mr-3 mt-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[#2E2E2E]">Provide constructive feedback focusing on the work</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary-100 p-1 rounded-full mr-3 mt-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[#2E2E2E]">Address conflicts directly and professionally</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Professional Communication" 
                  className="rounded-xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Communication Examples Section */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block px-3 py-1 bg-[#ffeee3] text-[#FF6B00] rounded-full text-sm font-semibold mb-3">
              Examples
            </div>
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">Communication Samples</h2>
            <p className="text-xl text-[#2E2E2E] max-w-2xl mx-auto">
              Compare professional and unprofessional communication styles to better understand our expectations
            </p>
          </div>

          <div className="space-y-6">
            {communicationExamples.map((example, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-xl ${example.type === "Professional" ? "bg-[#ffeee3] border-l-4 border-[#FF6B00]" : "bg-[#ffeee3] border-l-4 border-[#FF6B00]"}`}
              >
                <div className="flex items-center mb-3">
                  <div className={`p-2 rounded-full mr-3 ${example.type === "Professional" ? "bg-[#ffeee3] text-[#FF6B00]" : "bg-[#ffeee3] text-[#FF6B00]"}`}>
                    {example.icon}
                  </div>
                  <h3 className={`font-bold text-lg ${example.type === "Professional" ? "text-[#2E2E2E]" : "text-[#2E2E2E]"}`}>
                    {example.type} Example
                  </h3>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[#ffeee3] shadow-sm">
                  <p className="text-[#2E2E2E]">"{example.message}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Do's and Don'ts Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block px-3 py-1 bg-[#ffeee3] text-[#FF6B00] rounded-full text-sm font-semibold mb-3">
              Guidelines
            </div>
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">Do's and Don'ts</h2>
            <p className="text-xl text-[#2E2E2E] max-w-2xl mx-auto">
              Clear expectations for professional communication on our platform
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {dosAndDonts.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-[#ffeee3] p-6 rounded-xl border border-[#FF6B00] flex">
                  <div className="bg-[#ffeee3] p-2 rounded-full h-min mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2E2E2E] mb-1">Do</h4>
                    <p className="text-[#2E2E2E]">{item.do}</p>
                  </div>
                </div>
                <div className="bg-[#ffeee3] p-6 rounded-xl border border-[#FF6B00] flex">
                  <div className="bg-[#ffeee3] p-2 rounded-full h-min mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2E2E2E] mb-1">Don't</h4>
                    <p className="text-[#2E2E2E]">{item.dont}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block px-3 py-1 bg-[#ffeee3] text-[#FF6B00] rounded-full text-sm font-semibold mb-3">
              Expert Tips
            </div>
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">Communication Best Practices</h2>
            <p className="text-xl text-[#2E2E2E] max-w-2xl mx-auto">
              Implement these strategies to enhance your professional communication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {bestPractices.map((practice, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-[#ffeee3] hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4 text-primary-600">
                    {practice.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#2E2E2E]">{practice.title}</h3>
                </div>
                <p className="text-[#2E2E2E] ml-16">{practice.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-600">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Ready to Improve Your Communication?</h2>
            <p className="text-xl text-[#ffeee3] mb-8 max-w-2xl mx-auto">
              Professional communication skills are essential for success on our platform.
              Access our additional resources to further enhance your interactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/community-guidelines" className="px-6 py-3 bg-white text-primary-600 hover:bg-[#ffeee3] rounded-lg font-medium transition-colors">
                Return to Guidelines
              </Link>
              <a href="#" className="px-6 py-3 bg-primary-700 text-white hover:bg-primary-800 rounded-lg font-medium transition-colors">
                Communication Workshop
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
            <Link to="/guidelines/work-quality" className="group">
              <div className="bg-[#ffeee3] p-6 rounded-xl border border-[#ffeee3] hover:border-[#FF6B00] hover:shadow-md transition-all h-full">
                <div className="bg-[#ffeee3] p-3 rounded-lg inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#2E2E2E] mb-2">Work Quality & Delivery</h3>
                <p className="text-[#2E2E2E] mb-4">Standards for quality, deadlines, and professional deliverables</p>
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

export default ConductGuidelinesPage;














