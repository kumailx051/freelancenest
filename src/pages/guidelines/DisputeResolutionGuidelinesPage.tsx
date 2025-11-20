import React from 'react';
import { Link } from 'react-router-dom';

// Dispute prevention tips
const preventionTips = [
  {
    title: "Clear Contracts",
    description: "Start with detailed contracts that outline deliverables, timelines, payment terms, and revision policies.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    title: "Regular Updates",
    description: "Provide frequent progress updates and request feedback early to catch misalignments before they grow into disputes.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    )
  },
  {
    title: "Milestone Payments",
    description: "Break projects into milestones with partial payments to reduce risk and maintain momentum for both parties.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  },
  {
    title: "Document Everything",
    description: "Keep records of all communications, agreements, and changes to project scope or deadlines.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
      </svg>
    )
  }
];

// Resolution steps
const resolutionSteps = [
  {
    number: 1,
    title: "Direct Communication",
    description: "Discuss the issue directly with the other party. Many disputes can be resolved through calm, professional conversation.",
    tips: [
      "Clearly articulate your concerns without accusatory language",
      "Listen actively to the other party's perspective",
      "Focus on finding solutions rather than placing blame",
      "Document the conversation and any agreements made"
    ],
    color: "blue"
  },
  {
    number: 2,
    title: "Formal Resolution Request",
    description: "If direct communication doesn't resolve the issue, file a formal resolution request through our platform.",
    tips: [
      "Provide a clear timeline of events",
      "Include all relevant communications",
      "Explain what outcome you're seeking",
      "Remain factual and professional in your description"
    ],
    color: "green"
  },
  {
    number: 3,
    title: "Mediation",
    description: "A neutral platform representative will review the case and help facilitate a resolution.",
    tips: [
      "Be responsive to mediator questions",
      "Consider reasonable compromise solutions",
      "Provide any additional evidence promptly when requested",
      "Understand that the goal is fair resolution, not 'winning'"
    ],
    color: "purple"
  },
  {
    number: 4,
    title: "Final Decision",
    description: "If mediation is unsuccessful, our dispute resolution team will make a binding decision based on all evidence.",
    tips: [
      "Accept that the decision is based on platform terms and available evidence",
      "Understand that decisions aim to be fair to both parties",
      "Use the experience to improve future contract terms",
      "Take steps to prevent similar disputes in the future"
    ],
    color: "orange"
  }
];

// Common dispute types
const disputeTypes = [
  {
    type: "Scope Creep",
    description: "Additional work requests not covered in the original agreement",
    prevention: "Document initial scope thoroughly; require formal approval for scope changes; charge appropriately for additions"
  },
  {
    type: "Payment Disputes",
    description: "Disagreements about payment timing, amount, or release conditions",
    prevention: "Use the platform's milestone system; clearly document payment terms; specify exactly what deliverables trigger payment"
  },
  {
    type: "Quality Concerns",
    description: "Work delivered doesn't meet the expected quality standards",
    prevention: "Set clear quality expectations upfront; provide examples; establish a revision policy; get approval on early samples"
  },
  {
    type: "Missed Deadlines",
    description: "Project deliverables not completed within the agreed timeframe",
    prevention: "Set realistic deadlines with buffer time; communicate delays early; document factors affecting timeline changes"
  },
  {
    type: "Communication Issues",
    description: "Misunderstandings due to poor or infrequent communication",
    prevention: "Establish regular check-in schedule; document all discussions; confirm understanding of key points; respond promptly"
  }
];

const DisputeResolutionGuidelinesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-r from-orange-500 to-red-600">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-sm font-semibold mb-3">
              Community Guidelines
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Dispute Resolution</h1>
            <p className="text-xl text-orange-100 mb-8">
              Conflicts happen, but with the right approach, they can be resolved professionally while maintaining working relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Prevention First Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2 order-2 md:order-1">
                <div className="inline-block px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm font-semibold mb-3">
                  The Best Approach
                </div>
                <h2 className="text-3xl font-bold mb-6 text-[#2E2E2E]">Prevention Is Better Than Resolution</h2>
                <div className="space-y-4 text-[#2E2E2E]">
                  <p>
                    While our platform offers robust dispute resolution processes, the best strategy is 
                    preventing disputes before they occur. Clear communication, thorough documentation, 
                    and professional work habits can help avoid most conflicts.
                  </p>
                  <p>
                    When both freelancers and clients establish clear expectations from the beginning and 
                    maintain open lines of communication throughout the project, successful outcomes are much more likely.
                  </p>
                  <div className="mt-6">
                    <Link to="/how-to-find-work/successful-contracts" className="inline-block px-5 py-2.5 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg font-medium transition-colors">
                      Learn About Successful Contracts â†’
                    </Link>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Successful collaboration" 
                  className="rounded-xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention Tips Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm font-semibold mb-3">
              Smart Practices
            </div>
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">Dispute Prevention Tips</h2>
            <p className="text-xl text-[#2E2E2E] max-w-2xl mx-auto">
              Follow these practices to minimize the risk of disputes in your projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {preventionTips.map((tip, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-[#ffeee3] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 p-3 rounded-lg mr-4 text-orange-600">
                    {tip.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#2E2E2E]">{tip.title}</h3>
                </div>
                <p className="text-[#2E2E2E]">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resolution Process Section */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm font-semibold mb-3">
              When Issues Arise
            </div>
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">The Dispute Resolution Process</h2>
            <p className="text-xl text-[#2E2E2E] max-w-2xl mx-auto">
              Our structured approach to resolving disputes ensures fair outcomes for all parties
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#ffeee3] transform -translate-x-1/2 z-0"></div>
              
              {/* Steps */}
              <div className="space-y-12">
                {resolutionSteps.map((step, index) => (
                  <div key={index} className="relative z-10">
                    <div className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                      {/* Step number */}
                      <div className="flex-shrink-0">
                        <div className={`w-16 h-16 rounded-full bg-${step.color}-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg`}>
                          {step.number}
                        </div>
                      </div>
                      
                      {/* Step content */}
                      <div className={`bg-white p-6 rounded-xl border border-[#ffeee3] shadow-sm flex-grow md:w-[calc(50%-2rem)]`}>
                        <h3 className={`text-xl font-bold mb-3 text-${step.color}-600`}>{step.title}</h3>
                        <p className="text-[#2E2E2E] mb-4">{step.description}</p>
                        <div className="bg-[#ffeee3] p-4 rounded-lg">
                          <h4 className="text-sm font-semibold text-[#ffeee3] uppercase tracking-wider mb-3">Tips:</h4>
                          <ul className="space-y-2">
                            {step.tips.map((tip, i) => (
                              <li key={i} className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-${step.color}-500 mr-2 flex-shrink-0 mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-[#2E2E2E] text-sm">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Resolution timeframe */}
            <div className="bg-orange-50 border border-orange-100 p-6 rounded-xl mt-12">
              <h3 className="text-lg font-bold text-[#2E2E2E] mb-3">Resolution Timeframe Expectations</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-1/3 font-medium text-[#2E2E2E]">Direct Communication:</div>
                  <div className="w-2/3 text-[#2E2E2E]">Varies by response time of parties</div>
                </div>
                <div className="flex items-center">
                  <div className="w-1/3 font-medium text-[#2E2E2E]">Formal Resolution Request:</div>
                  <div className="w-2/3 text-[#2E2E2E]">Typically acknowledged within 1-2 business days</div>
                </div>
                <div className="flex items-center">
                  <div className="w-1/3 font-medium text-[#2E2E2E]">Mediation:</div>
                  <div className="w-2/3 text-[#2E2E2E]">Usually begins within 3-5 business days of request</div>
                </div>
                <div className="flex items-center">
                  <div className="w-1/3 font-medium text-[#2E2E2E]">Final Decision:</div>
                  <div className="w-2/3 text-[#2E2E2E]">Typically issued within 5-7 business days after mediation</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-[#ffeee3]">
                Note: Complex cases may require additional time. All parties will be kept informed of any delays.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Disputes Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm font-semibold mb-3">
              Knowledge Is Power
            </div>
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">Common Types of Disputes</h2>
            <p className="text-xl text-[#2E2E2E] max-w-2xl mx-auto">
              Understanding typical conflicts helps you avoid them in your own projects
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-xl border border-[#ffeee3]">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#ffeee3]">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">Description</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">Prevention</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {disputeTypes.map((dispute, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-[#ffeee3]'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2E2E2E]">{dispute.type}</td>
                      <td className="px-6 py-4 text-sm text-[#ffeee3]">{dispute.description}</td>
                      <td className="px-6 py-4 text-sm text-[#ffeee3]">{dispute.prevention}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block px-3 py-1 bg-[#2E2E2E] text-[#2E2E2E] rounded-full text-sm font-semibold mb-3">
              Success Stories
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">Resolution Success Stories</h2>
            <p className="text-xl text-[#ffeee3] max-w-2xl mx-auto">
              How platform users turned potential conflicts into positive outcomes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#2E2E2E] p-8 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <p className="italic mb-6 text-[#ffeee3]">
                "What started as a major disagreement about project scope turned into a valuable learning experience. 
                The platform mediator helped us find middle ground, and now the client and I have completed three more projects together."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-[#ffeee3] flex items-center justify-center text-xl font-bold text-white mr-3">
                  M
                </div>
                <div>
                  <h4 className="font-semibold text-white">Michael T.</h4>
                  <p className="text-sm text-[#ffeee3]">Web Developer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#2E2E2E] p-8 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <p className="italic mb-6 text-[#ffeee3]">
                "I was ready to write off the project as a loss, but the dispute resolution team helped us 
                restructure the deliverables and timeline. The freelancer completed the revised project on time,
                and I was completely satisfied with the results."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-[#ffeee3] flex items-center justify-center text-xl font-bold text-white mr-3">
                  S
                </div>
                <div>
                  <h4 className="font-semibold text-white">Sarah K.</h4>
                  <p className="text-sm text-[#ffeee3]">Small Business Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Escalation Warning */}
      <section className="py-12 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border-l-4 border-[#FF6B00] p-5 rounded-r-lg shadow-sm">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-[#2E2E2E] mb-2">Important Note About External Escalation</h4>
                  <p className="text-[#2E2E2E] mb-3">
                    Our platform's dispute resolution process is designed to be fair and comprehensive. Taking disputes to external
                    platforms like social media can violate our terms of service and may result in:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-[#2E2E2E]">
                    <li>Account restrictions or suspension</li>
                    <li>Removal from ongoing dispute resolution</li>
                    <li>Potential legal implications for defamation</li>
                  </ul>
                  <p className="mt-3 text-[#2E2E2E]">
                    We encourage all users to work through our official channels to resolve any issues.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-orange-600">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Need Help With a Dispute?</h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Our support team is ready to assist with any dispute resolution needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/community-guidelines" className="px-6 py-3 bg-white text-orange-600 hover:bg-orange-50 rounded-lg font-medium transition-colors">
                Return to Guidelines
              </Link>
              <Link to="/report-problem" className="px-6 py-3 bg-orange-700 text-white hover:bg-orange-800 rounded-lg font-medium transition-colors">
                Report a Problem
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
            <Link to="/guidelines/conduct" className="group">
              <div className="bg-[#ffeee3] p-6 rounded-xl border border-[#ffeee3] hover:border-orange-300 hover:shadow-md transition-all h-full">
                <div className="bg-[#ffeee3] p-3 rounded-lg inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#2E2E2E] mb-2">Conduct & Communication</h3>
                <p className="text-[#2E2E2E] mb-4">Guidelines for professional interactions and communication</p>
                <span className="text-orange-600 font-medium group-hover:translate-x-2 inline-block transition-transform">Learn more â†’</span>
              </div>
            </Link>
            <Link to="/guidelines/payment" className="group">
              <div className="bg-[#ffeee3] p-6 rounded-xl border border-[#ffeee3] hover:border-orange-300 hover:shadow-md transition-all h-full">
                <div className="bg-[#ffeee3] p-3 rounded-lg inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#2E2E2E] mb-2">Payment & Billing</h3>
                <p className="text-[#2E2E2E] mb-4">Guidelines for secure and fair payment practices</p>
                <span className="text-orange-600 font-medium group-hover:translate-x-2 inline-block transition-transform">Learn more â†’</span>
              </div>
            </Link>
            <Link to="/guidelines/privacy" className="group">
              <div className="bg-[#ffeee3] p-6 rounded-xl border border-[#ffeee3] hover:border-orange-300 hover:shadow-md transition-all h-full">
                <div className="bg-[#ffeee3] p-3 rounded-lg inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#2E2E2E] mb-2">Privacy & Confidentiality</h3>
                <p className="text-[#2E2E2E] mb-4">Protocols for protecting sensitive information</p>
                <span className="text-orange-600 font-medium group-hover:translate-x-2 inline-block transition-transform">Learn more â†’</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DisputeResolutionGuidelinesPage;














