import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, DollarSign, PieChart, Calendar, Clock, Shield, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

// Payment methods
const paymentMethods = [
  {
    name: "Direct Bank Transfer",
    description: "Transfer funds directly to your bank account",
    processingTime: "3-5 business days",
    minimumAmount: "$50",
    fees: "No fees for transfers over $100",
    availability: "Most countries",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    </svg>
  },
  {
    name: "PayPal",
    description: "Receive funds in your PayPal account",
    processingTime: "Instant to 24 hours",
    minimumAmount: "$1",
    fees: "2% of withdrawal amount",
    availability: "200+ countries",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  },
  {
    name: "Payoneer",
    description: "Transfer to your Payoneer prepaid card or account",
    processingTime: "1-2 business days",
    minimumAmount: "$20",
    fees: "1-2% of withdrawal amount",
    availability: "150+ countries",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  },
  {
    name: "Wise (formerly TransferWise)",
    description: "International transfers with competitive rates",
    processingTime: "1-3 business days",
    minimumAmount: "$20",
    fees: "Varies by country, typically 0.5-1.5%",
    availability: "80+ countries",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  }
];

// Service fee structure
const serviceFees = [
  {
    tier: "Standard",
    projectSize: "First $500",
    feePercentage: "20%",
    example: "$100 earned = $80 net",
    color: "border-orange-300"
  },
  {
    tier: "Reduced",
    projectSize: "$501 to $10,000",
    feePercentage: "10%",
    example: "$1,000 earned = $900 net",
    color: "border-[#FF6B00]"
  },
  {
    tier: "Premium",
    projectSize: "$10,001+",
    feePercentage: "5%",
    example: "$15,000 earned = $14,250 net",
    color: "border-[#ffeee3]"
  },
  {
    tier: "Enterprise",
    projectSize: "Enterprise contracts",
    feePercentage: "Customized",
    example: "Negotiated based on contract value",
    color: "border-[#ffeee3]"
  }
];

// Payment timeline steps
const paymentTimeline = [
  {
    stage: "Work Completed",
    description: "You deliver the completed milestone or track time for hourly work",
    icon: <CheckCircle className="h-6 w-6" />
  },
  {
    stage: "Client Approval",
    description: "For fixed-price: Client reviews and approves the work\nFor hourly: Work time is automatically approved after review period",
    icon: <Clock className="h-6 w-6" />
  },
  {
    stage: "Payment Processing",
    description: "Funds are released from escrow to your FreelanceNest account",
    icon: <DollarSign className="h-6 w-6" />
  },
  {
    stage: "Available Balance",
    description: "Funds appear in your Available Balance, ready for withdrawal",
    icon: <CreditCard className="h-6 w-6" />
  },
  {
    stage: "Withdrawal Request",
    description: "You request withdrawal to your preferred payment method",
    icon: <Calendar className="h-6 w-6" />
  },
  {
    stage: "Funds Received",
    description: "Money arrives in your selected payment account",
    icon: <CheckCircle className="h-6 w-6" />
  }
];

// Invoice tips
const invoiceTips = [
  "Include your legal name and address as the service provider",
  "Add your client's company name and address",
  "Use sequential invoice numbers for tracking",
  "Clearly list all services provided with descriptions",
  "Include dates when services were provided",
  "Detail rates, quantities, and total amounts",
  "Specify payment terms and acceptable methods",
  "Include tax information if applicable",
  "Add your payment details for direct transfers"
];

const PaymentsFinancesHelpPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-r from-green-500 to-teal-600">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/resources/help-center" 
              className="inline-flex items-center text-[#2E2E2E] hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Help Center
            </Link>
            <div>
              <span className="bg-[#ffeee3]/30 text-white text-sm font-medium px-3 py-1 rounded-full">Help Center</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">Payments & Finances</h1>
              <p className="text-xl text-[#2E2E2E] max-w-3xl">
                Everything you need to know about getting paid, payment methods, fees, and managing your finances on FreelanceNest
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 -mt-8">
        <div className="section-container">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-[#2E2E2E] mb-6">Payment Methods</h2>
            <p className="text-[#2E2E2E] mb-8">
              FreelanceNest offers multiple secure payment methods to ensure you can easily receive your earnings wherever you are located.
            </p>
            
            <div className="space-y-6">
              {paymentMethods.map((method, index) => (
                <div key={index} className="bg-[#ffeee3] rounded-lg p-6 border border-[#ffeee3]">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="mb-4 md:mb-0 md:mr-6 bg-[#ffeee3] p-3 rounded-full w-14 h-14 flex items-center justify-center text-[#FF6B00] flex-shrink-0">
                      {method.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-[#2E2E2E] mb-1">{method.name}</h3>
                      <p className="text-[#2E2E2E] mb-3">{method.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-[#ffeee3]" />
                          <span className="text-[#2E2E2E]">Processing: {method.processingTime}</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-2 text-[#ffeee3]" />
                          <span className="text-[#2E2E2E]">Min. Amount: {method.minimumAmount}</span>
                        </div>
                        <div className="flex items-center">
                          <PieChart className="h-4 w-4 mr-2 text-[#ffeee3]" />
                          <span className="text-[#2E2E2E]">Fees: {method.fees}</span>
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#ffeee3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-[#2E2E2E]">Available in: {method.availability}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-[#ffeee3] p-5 rounded-lg border-l-4 border-[#FF6B00]">
              <div className="flex">
                <div className="flex-shrink-0">
                  <HelpCircle className="h-5 w-5 text-[#FF6B00]" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-[#2E2E2E]">Country-Specific Availability</h4>
                  <p className="mt-2 text-sm text-[#FF6B00]">
                    Payment method availability varies by country. To see which options are available to you,
                    go to Account Settings &gt; Payment Methods for a personalized list.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Fees */}
      <section className="py-16" id="service-fees">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Service Fee Structure</h2>
            <p className="text-lg text-[#2E2E2E] text-center mb-12">
              FreelanceNest charges service fees on payments you receive. Our tiered fee structure rewards long-term relationships.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {serviceFees.map((tier, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-xl overflow-hidden shadow-sm border-t-4 ${tier.color}`}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2E2E2E] mb-1">{tier.tier} Fee</h3>
                    <p className="text-sm text-[#ffeee3] mb-4">For {tier.projectSize}</p>
                    
                    <div className="flex items-end mb-4">
                      <span className="text-4xl font-bold text-[#2E2E2E]">{tier.feePercentage}</span>
                      <span className="text-[#2E2E2E] ml-2 mb-1">service fee</span>
                    </div>
                    
                    <div className="bg-[#ffeee3] p-4 rounded-lg">
                      <p className="text-[#2E2E2E] font-medium">Example:</p>
                      <p className="text-[#2E2E2E]">{tier.example}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-[#ffeee3] p-6 rounded-lg">
              <h3 className="text-lg font-bold text-[#2E2E2E] mb-3">Long-Term Client Benefit</h3>
              <p className="text-[#2E2E2E] mb-4">
                When you work with the same client for an extended period, the fee structure becomes even more favorable:
              </p>
              <ul className="space-y-3 text-[#2E2E2E]">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF6B00] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>After $1,000 lifetime billing with a client: 15% fee</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF6B00] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>After $5,000 lifetime billing with a client: 10% fee</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF6B00] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>After $10,000 lifetime billing with a client: 5% fee</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-6 text-center">
              <Link 
                to="/fees-calculator" 
                className="inline-flex items-center text-[#FF6B00] hover:text-[#2E2E2E] font-medium"
              >
                Try our Fee Calculator
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Timeline */}
      <section className="py-16 bg-[#ffeee3]" id="payment-timeline">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Payment Timeline</h2>
            <p className="text-lg text-[#2E2E2E] text-center mb-12">
              Understanding how and when you'll get paid for your work
            </p>
            
            <div className="relative">
              {/* Vertical line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#ffeee3] transform -translate-x-1/2 z-0"></div>
              
              {/* Timeline items */}
              <div className="space-y-12">
                {paymentTimeline.map((step, index) => (
                  <div key={index} className="relative z-10">
                    <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                      {/* Step icon */}
                      <div className="flex-shrink-0 mb-4 md:mb-0">
                        <div className="w-16 h-16 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-lg">
                          {step.icon}
                        </div>
                      </div>
                      
                      {/* Step content */}
                      <div className="md:w-5/12 bg-white p-6 rounded-xl border border-[#ffeee3] shadow-sm flex-grow md:flex-grow-0">
                        <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">{step.stage}</h3>
                        <p className="text-[#2E2E2E] whitespace-pre-line">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-12 bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#2E2E2E]">Typical Timeline Duration:</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-[#ffeee3] p-2 rounded-full mr-3 flex-shrink-0">
                    <Clock className="h-5 w-5 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2E2E2E] mb-1">Hourly Contracts</h4>
                    <p className="text-[#2E2E2E]">
                      Payment is processed weekly for all approved hours. The review period is 7 days from the end of the work week. 
                      Once approved, funds typically appear in your FreelanceNest account within 24 hours.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#ffeee3] p-2 rounded-full mr-3 flex-shrink-0">
                    <Clock className="h-5 w-5 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2E2E2E] mb-1">Fixed-Price Contracts</h4>
                    <p className="text-[#2E2E2E]">
                      Payment is released after client approval of deliverables. Clients have 14 days to review and approve 
                      work. If no action is taken, the system prompts them again. Funds are available in your account within 
                      24 hours after approval.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#ffeee3] p-2 rounded-full mr-3 flex-shrink-0">
                    <Clock className="h-5 w-5 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2E2E2E] mb-1">Withdrawal Processing</h4>
                    <p className="text-[#2E2E2E]">
                      Withdrawal processing times vary by payment method, ranging from instant (for some digital wallets) 
                      to 3-5 business days (for bank transfers). See the Payment Methods section for specific timeframes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Invoicing */}
      <section className="py-16 bg-white" id="invoicing">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Invoicing Best Practices</h2>
                <p className="text-[#2E2E2E] mb-6">
                  For most freelancers on our platform, FreelanceNest automatically generates compliant invoices. 
                  However, depending on your location and tax requirements, you might need to issue your own invoices.
                </p>
                
                <div className="bg-[#ffeee3] p-6 rounded-xl mb-8">
                  <h3 className="text-lg font-bold mb-3">Essential Invoice Elements:</h3>
                  <ul className="space-y-2">
                    {invoiceTips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF6B00] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[#2E2E2E]">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link 
                  to="/resources/invoice-templates" 
                  className="inline-flex items-center px-5 py-2.5 bg-[#FF6B00] hover:bg-[#ffeee3] text-white rounded-lg transition-colors"
                >
                  Download Invoice Templates
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              
              <div className="lg:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Invoice Example" 
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Tips */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Payment Security Tips</h2>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8 border-b border-[#ffeee3]">
                <div className="flex items-center mb-6">
                  <div className="bg-[#ffeee3] p-3 rounded-full mr-4">
                    <Shield className="h-6 w-6 text-[#FF6B00]" />
                  </div>
                  <h3 className="text-2xl font-bold">Protect Your Earnings</h3>
                </div>
                <p className="text-[#2E2E2E]">
                  Follow these important guidelines to ensure your payments remain secure and protected on FreelanceNest.
                </p>
              </div>
              
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="bg-[#ffeee3] p-2 rounded-full mr-3 flex-shrink-0 mt-1">
                    <AlertTriangle className="h-5 w-5 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2E2E2E] mb-1">Never Accept Off-Platform Payments</h4>
                    <p className="text-[#2E2E2E] text-sm">
                      Always process payments through FreelanceNest. Taking payments outside the platform 
                      circumvents our protection systems and violates our terms of service.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#ffeee3] p-2 rounded-full mr-3 flex-shrink-0 mt-1">
                    <AlertTriangle className="h-5 w-5 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2E2E2E] mb-1">Verify Client Payment Method</h4>
                    <p className="text-[#2E2E2E] text-sm">
                      Before starting work, ensure the client has a verified payment method on file. 
                      Check for the "Payment Verified" badge on their profile.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#ffeee3] p-2 rounded-full mr-3 flex-shrink-0 mt-1">
                    <AlertTriangle className="h-5 w-5 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2E2E2E] mb-1">Use Milestone Payments</h4>
                    <p className="text-[#2E2E2E] text-sm">
                      For larger projects, use milestone payments to ensure you're paid incrementally 
                      as you complete portions of the work.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#ffeee3] p-2 rounded-full mr-3 flex-shrink-0 mt-1">
                    <AlertTriangle className="h-5 w-5 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2E2E2E] mb-1">Beware of Suspicious Requests</h4>
                    <p className="text-[#2E2E2E] text-sm">
                      Be cautious of clients requesting unusual payment arrangements or asking for 
                      personal financial information. Report suspicious activity immediately.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#ffeee3] p-2 rounded-full mr-3 flex-shrink-0 mt-1">
                    <AlertTriangle className="h-5 w-5 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2E2E2E] mb-1">Document All Agreements</h4>
                    <p className="text-[#2E2E2E] text-sm">
                      Keep all payment terms, rates, and deliverables documented in the platform's 
                      messaging system for clear records and dispute protection.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#ffeee3] p-2 rounded-full mr-3 flex-shrink-0 mt-1">
                    <AlertTriangle className="h-5 w-5 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2E2E2E] mb-1">Enable Two-Factor Authentication</h4>
                    <p className="text-[#2E2E2E] text-sm">
                      Protect your account and earnings by enabling two-factor authentication 
                      for all login and withdrawal requests.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#ffeee3] p-6">
                <div className="flex items-center">
                  <Shield className="h-6 w-6 text-[#FF6B00] mr-3" />
                  <p className="text-[#2E2E2E] font-medium">
                    If you encounter any payment security issues, contact FreelanceNest Support immediately at 
                    <a href="mailto:security@freelancenest.com" className="text-[#FF6B00] ml-1">security@freelancenest.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Payment Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-[#ffeee3] rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">What happens if a client doesn't approve my work?</h3>
                <p className="text-[#2E2E2E]">
                  If a client doesn't approve work within 14 days, we send them reminders. If they remain unresponsive 
                  or there's a dispute about the quality of work, you can raise a dispute through our Resolution Center. 
                  Our mediation team will review the case and make a determination based on the evidence provided.
                </p>
              </div>
              
              <div className="bg-[#ffeee3] rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">How do I change my primary payment method?</h3>
                <p className="text-[#2E2E2E]">
                  To change your payment method, go to Account Settings {'->'} Payment Methods. Click "Add Method" to add a 
                  new payment option, or select an existing method and click "Set as Primary." Verification may be required 
                  for new payment methods before they can be used.
                </p>
              </div>
              
              <div className="bg-[#ffeee3] rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Are there any withdrawal limits?</h3>
                <p className="text-[#2E2E2E]">
                  Yes, withdrawal limits vary by payment method and account age. New accounts typically have lower limits 
                  that increase over time. Most payment methods have minimum withdrawal amounts (typically $20-$50). 
                  There may also be monthly maximum limits for security purposes.
                </p>
              </div>
              
              <div className="bg-[#ffeee3] rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">How do taxes work for freelancers?</h3>
                <p className="text-[#2E2E2E]">
                  FreelanceNest doesn't withhold taxes from your earnings. You're responsible for reporting income and 
                  paying taxes according to your local tax laws. At the end of the year, you can download an Annual 
                  Earnings Summary from your dashboard to help with tax filing. Consult a tax professional for guidance 
                  specific to your situation.
                </p>
              </div>
              
              <div className="bg-[#ffeee3] rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">What should I do if my withdrawal is delayed?</h3>
                <p className="text-[#2E2E2E]">
                  If your withdrawal takes longer than the expected processing time for your payment method, first check 
                  your email for any verification requests or issues. You can also check the Withdrawal Status in your 
                  account. If there's no apparent reason for the delay, contact FreelanceNest Support with your withdrawal 
                  reference number.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Paid?</h2>
            <p className="text-xl text-[#2E2E2E] mb-8">
              Set up your payment methods and start earning on FreelanceNest
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/account/payment-settings" 
                className="px-6 py-3 bg-[#FF6B00] hover:bg-[#ffeee3] text-white font-medium rounded-lg transition-colors"
              >
                Set Up Payment Methods
              </Link>
              <Link 
                to="/resources/help-center" 
                className="px-6 py-3 bg-white border border-[#ffeee3] hover:bg-[#ffeee3] text-[#2E2E2E] font-medium rounded-lg transition-colors"
              >
                Explore More Help Topics
              </Link>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-8">
              <Link 
                to="/resources/help/platform-settings" 
                className="flex items-center text-[#FF6B00] hover:text-[#2E2E2E] font-medium"
              >
                Next Topic: Platform Settings
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
              
              <span className="hidden sm:block text-[#ffeee3]">|</span>
              
              <Link 
                to="/resources/help/account-profile" 
                className="flex items-center text-[#FF6B00] hover:text-[#2E2E2E] font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Previous: Account & Profile
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentsFinancesHelpPage;















