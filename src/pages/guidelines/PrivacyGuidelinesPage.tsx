import React from 'react';
import { Link } from 'react-router-dom';

// Privacy best practices
const privacyPractices = [
  {
    title: "Client Confidentiality",
    description: "Respect client confidentiality by not sharing project details, communications, or proprietary information with unauthorized parties.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  },
  {
    title: "Secure Data Handling",
    description: "Store and transfer client data using secure methods. Use encryption and password protection where appropriate.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    )
  },
  {
    title: "Clear Ownership Terms",
    description: "Establish clear terms regarding intellectual property ownership and usage rights before project commencement.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    title: "Limit Personal Information",
    description: "Only share personal information necessary for the project. Avoid sharing sensitive information like financial details via insecure channels.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  }
];

// NDA categories
const ndaTypes = [
  {
    name: "Mutual NDA",
    description: "Both parties agree not to disclose confidential information to third parties. Use when both sides will be sharing sensitive information.",
    keyElements: [
      "Defines what constitutes confidential information",
      "Outlines permitted uses of shared information",
      "Specifies duration of confidentiality obligations",
      "Details exclusions from confidentiality requirements"
    ]
  },
  {
    name: "One-Way NDA",
    description: "One party (usually the client) discloses confidential information while the other party (usually the freelancer) agrees to maintain confidentiality.",
    keyElements: [
      "Clearly identifies the disclosing and receiving parties",
      "Specifically defines the scope of protected information",
      "Includes reasonable exceptions to confidentiality",
      "States the specific purpose for which information may be used"
    ]
  },
  {
    name: "Project-Specific NDA",
    description: "Tailored to a specific project with detailed terms about what information is confidential and how it can be used.",
    keyElements: [
      "Project-specific confidentiality terms",
      "Clear project scope definition",
      "Post-project confidentiality obligations",
      "Project-specific permitted use cases"
    ]
  }
];

// Do's and Don'ts
const dosAndDonts = {
  dos: [
    "Use our platform's secure messaging system for all project communications",
    "Request NDAs for projects involving sensitive information",
    "Store client files in secure, password-protected locations",
    "Delete sensitive information when it's no longer needed",
    "Inform clients immediately of any data breaches or security issues",
    "Clarify what client information you need to retain for your records"
  ],
  donts: [
    "Share client information with other clients or third parties without permission",
    "Use client work in your portfolio without explicit approval",
    "Store passwords or access credentials in plaintext documents",
    "Discuss confidential client details on public forums or social media",
    "Retain unnecessary client data after project completion",
    "Transfer sensitive files via unsecured methods"
  ]
};

const PrivacyGuidelinesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-r from-indigo-600 to-purple-700">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-sm font-semibold mb-3">
              Community Guidelines
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy & Confidentiality</h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Protecting sensitive information builds trust and ensures professional relationships thrive in our community.
            </p>
          </div>
        </div>
      </section>

      {/* Why Privacy Matters Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1576444356170-66073046b1bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Data Privacy" 
                  className="rounded-xl shadow-lg w-full"
                />
              </div>
              <div className="md:w-1/2">
                <div className="inline-block px-3 py-1 bg-[#ffeee3] text-[#FF6B00] rounded-full text-sm font-semibold mb-3">
                  Foundation of Trust
                </div>
                <h2 className="text-3xl font-bold mb-6 text-[#2E2E2E]">Why Privacy Matters in Freelancing</h2>
                <div className="space-y-6 text-[#2E2E2E]">
                  <p>
                    In the freelancing world, you often gain access to sensitive business information, 
                    creative assets, and proprietary data. Protecting this information is essential for:
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-[#ffeee3] p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Building Client Trust</h3>
                        <p>
                          Respecting confidentiality demonstrates professionalism and builds the trust 
                          necessary for long-term client relationships.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-[#ffeee3] p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Legal Protection</h3>
                        <p>
                          Protecting client data isn't just ethicalâ€”it may be a legal requirement depending 
                          on your industry and location.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-[#ffeee3] p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Competitive Advantage</h3>
                        <p>
                          A reputation for confidentiality makes you more attractive to clients working 
                          with sensitive information or in competitive industries.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Best Practices Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block px-3 py-1 bg-[#ffeee3] text-[#FF6B00] rounded-full text-sm font-semibold mb-3">
              Key Requirements
            </div>
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">Privacy Best Practices</h2>
            <p className="text-xl text-[#2E2E2E] max-w-2xl mx-auto">
              Follow these essential practices to protect your clients' sensitive information
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {privacyPractices.map((practice, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-[#ffeee3] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-[#ffeee3] p-3 rounded-lg mr-4 text-[#FF6B00]">
                    {practice.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#2E2E2E]">{practice.title}</h3>
                </div>
                <p className="text-[#2E2E2E]">{practice.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NDAs Section */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block px-3 py-1 bg-[#ffeee3] text-[#FF6B00] rounded-full text-sm font-semibold mb-3">
              Protection Tools
            </div>
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">Understanding NDAs</h2>
            <p className="text-xl text-[#2E2E2E] max-w-2xl mx-auto">
              Non-Disclosure Agreements are valuable tools for protecting confidential information
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {ndaTypes.map((nda, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden border border-[#ffeee3] shadow-sm">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-6 text-white md:w-1/3 flex items-center">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{nda.name}</h3>
                      <p className="opacity-80 text-sm">NDA Type</p>
                    </div>
                  </div>
                  <div className="p-6 md:w-2/3">
                    <p className="text-[#2E2E2E] mb-4">{nda.description}</p>
                    <div className="bg-[#ffeee3] p-4 rounded-lg">
                      <h4 className="text-sm uppercase text-[#ffeee3] tracking-wider mb-3">Key Elements</h4>
                      <ul className="space-y-2 text-[#2E2E2E]">
                        {nda.keyElements.map((element, i) => (
                          <li key={i} className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{element}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-[#ffeee3] p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold text-[#2E2E2E] mb-4">Need an NDA Template?</h3>
              <p className="text-[#2E2E2E] mb-6">
                Our platform provides customizable NDA templates to help protect your confidential information.
              </p>
              <Link to="/resources/legal-templates" className="inline-block px-6 py-3 bg-[#FF6B00] text-white hover:bg-[#ffeee3] rounded-lg font-medium transition-colors">
                Access NDA Templates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Do's and Don'ts Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block px-3 py-1 bg-[#ffeee3] text-[#FF6B00] rounded-full text-sm font-semibold mb-3">
              Privacy Guidelines
            </div>
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">Privacy Do's and Don'ts</h2>
            <p className="text-xl text-[#2E2E2E] max-w-2xl mx-auto">
              Follow these guidelines to maintain confidentiality in your freelance practice
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
            <div className="md:w-1/2">
              <div className="bg-[#ffeee3] border border-[#FF6B00] rounded-xl overflow-hidden h-full">
                <div className="bg-[#FF6B00] p-4 text-white">
                  <h3 className="text-xl font-bold flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Do's
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {dosAndDonts.dos.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-[#ffeee3] p-1 rounded-full mr-3 flex-shrink-0 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[#2E2E2E]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-[#ffeee3] border border-[#FF6B00] rounded-xl overflow-hidden h-full">
                <div className="bg-[#FF6B00] p-4 text-white">
                  <h3 className="text-xl font-bold flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Don'ts
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {dosAndDonts.donts.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-[#ffeee3] p-1 rounded-full mr-3 flex-shrink-0 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <span className="text-[#2E2E2E]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Breach Section */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-[#FF6B00] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-4 text-[#2E2E2E]">What To Do If a Data Breach Occurs</h2>
                <div className="space-y-4 text-[#2E2E2E]">
                  <p>
                    Despite best precautions, data breaches can occur. If you discover a breach affecting client information:
                  </p>
                  <ol className="space-y-3">
                    <li className="flex items-start">
                      <span className="bg-white w-6 h-6 rounded-full flex items-center justify-center mr-3 font-bold text-[#FF6B00] flex-shrink-0 mt-0.5">1</span>
                      <span><strong>Act immediately.</strong> Identify what information was compromised and take steps to secure remaining data.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-white w-6 h-6 rounded-full flex items-center justify-center mr-3 font-bold text-[#FF6B00] flex-shrink-0 mt-0.5">2</span>
                      <span><strong>Notify your client.</strong> Be transparent about what happened, what information was affected, and what steps you've taken.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-white w-6 h-6 rounded-full flex items-center justify-center mr-3 font-bold text-[#FF6B00] flex-shrink-0 mt-0.5">3</span>
                      <span><strong>Contact platform support.</strong> Our team can provide guidance on next steps and assist with securing your account.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-white w-6 h-6 rounded-full flex items-center justify-center mr-3 font-bold text-[#FF6B00] flex-shrink-0 mt-0.5">4</span>
                      <span><strong>Document everything.</strong> Keep records of what happened, when, and how you responded for future reference.</span>
                    </li>
                  </ol>
                  <div className="mt-6">
                    <Link to="/report-problem" className="inline-block px-6 py-3 bg-[#FF6B00] text-white hover:bg-[#ffeee3] rounded-lg font-medium transition-colors">
                      Report a Security Incident
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#FF6B00]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Need More Information on Privacy Practices?</h2>
            <p className="text-xl text-[#FF6B00] mb-8 max-w-2xl mx-auto">
              Our help center offers additional resources on data security and confidentiality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/community-guidelines" className="px-6 py-3 bg-white text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg font-medium transition-colors">
                Return to Guidelines
              </Link>
              <Link to="/resources/help-center" className="px-6 py-3 bg-[#ffeee3] text-white hover:bg-[#ffeee3] rounded-lg font-medium transition-colors">
                Privacy Resource Center
              </Link>
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
            <Link to="/guidelines/payment" className="group">
              <div className="bg-[#ffeee3] p-6 rounded-xl border border-[#ffeee3] hover:border-[#ffeee3] hover:shadow-md transition-all h-full">
                <div className="bg-[#ffeee3] p-3 rounded-lg inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#2E2E2E] mb-2">Payment & Billing</h3>
                <p className="text-[#2E2E2E] mb-4">Guidelines for secure and fair payment practices</p>
                <span className="text-[#FF6B00] font-medium group-hover:translate-x-2 inline-block transition-transform">Learn more â†’</span>
              </div>
            </Link>
            <Link to="/guidelines/conduct" className="group">
              <div className="bg-[#ffeee3] p-6 rounded-xl border border-[#ffeee3] hover:border-[#ffeee3] hover:shadow-md transition-all h-full">
                <div className="bg-[#ffeee3] p-3 rounded-lg inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#2E2E2E] mb-2">Conduct & Communication</h3>
                <p className="text-[#2E2E2E] mb-4">Guidelines for professional interactions and communication</p>
                <span className="text-[#FF6B00] font-medium group-hover:translate-x-2 inline-block transition-transform">Learn more â†’</span>
              </div>
            </Link>
            <Link to="/guidelines/dispute-resolution" className="group">
              <div className="bg-[#ffeee3] p-6 rounded-xl border border-[#ffeee3] hover:border-[#ffeee3] hover:shadow-md transition-all h-full">
                <div className="bg-[#ffeee3] p-3 rounded-lg inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#2E2E2E] mb-2">Dispute Resolution</h3>
                <p className="text-[#2E2E2E] mb-4">Procedures for resolving conflicts and disagreements</p>
                <span className="text-[#FF6B00] font-medium group-hover:translate-x-2 inline-block transition-transform">Learn more â†’</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyGuidelinesPage;














