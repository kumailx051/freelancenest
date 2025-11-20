import React, { useState } from 'react';

const TalkToSalesPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    teamSize: '',
    industry: '',
    message: '',
    agreeToTerms: false
  });

  const industries = [
    'Technology',
    'Finance & Banking',
    'Healthcare',
    'Education',
    'E-commerce & Retail',
    'Manufacturing',
    'Media & Entertainment',
    'Government',
    'Non-profit',
    'Other'
  ];

  const teamSizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, we would send this data to the server
    console.log('Form submitted with data:', formData);
    // Show success message
    alert('Thank you for your interest! Our enterprise team will contact you shortly.');
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-r from-primary-500 to-purple-600">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Talk to Our Enterprise Sales Team</h1>
            <p className="text-xl text-[#ffeee3] mb-4">
              Get a personalized consultation for your organization's specific needs and learn how we can help scale your workforce.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="md:flex">
                {/* Left Side - Form */}
                <div className="md:w-2/3 p-8 md:p-10">
                  <h2 className="text-2xl font-bold mb-6">Request a Consultation</h2>
                  <form onSubmit={handleSubmit}>
                    {/* Name Fields - Two Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block text-[#2E2E2E] font-medium mb-2">First Name *</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-[#2E2E2E] font-medium mb-2">Last Name *</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>

                    {/* Company & Email */}
                    <div className="mb-6">
                      <label htmlFor="companyName" className="block text-[#2E2E2E] font-medium mb-2">Company Name *</label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                        placeholder="Enter your company name"
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="email" className="block text-[#2E2E2E] font-medium mb-2">Work Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                        placeholder="name@company.com"
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="phoneNumber" className="block text-[#2E2E2E] font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                        placeholder="+1 (123) 456-7890"
                      />
                    </div>

                    {/* Company Size & Industry - Two Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="teamSize" className="block text-[#2E2E2E] font-medium mb-2">Team Size *</label>
                        <select
                          id="teamSize"
                          name="teamSize"
                          value={formData.teamSize}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] appearance-none"
                          required
                        >
                          <option value="">Select team size</option>
                          {teamSizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="industry" className="block text-[#2E2E2E] font-medium mb-2">Industry *</label>
                        <select
                          id="industry"
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] appearance-none"
                          required
                        >
                          <option value="">Select industry</option>
                          {industries.map(industry => (
                            <option key={industry} value={industry}>{industry}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-[#2E2E2E] font-medium mb-2">How can we help?</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                        placeholder="Tell us about your needs and how we can assist you."
                      ></textarea>
                    </div>

                    {/* Agreement */}
                    <div className="mb-8">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="agreeToTerms"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                          className="mt-1 h-4 w-4 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                          required
                        />
                        <label htmlFor="agreeToTerms" className="ml-2 text-sm text-[#2E2E2E]">
                          I agree to receive communications from FreelanceNest. I understand I can unsubscribe at any time.
                          By submitting this form, I agree to the <a href="#" className="text-[#FF6B00] hover:underline">Privacy Policy</a> and
                          <a href="#" className="text-[#FF6B00] hover:underline"> Terms of Service</a>.
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium py-3 rounded-lg transition-colors duration-200"
                    >
                      Submit Request
                    </button>
                  </form>
                </div>

                {/* Right Side - Info */}
                <div className="md:w-1/3 bg-[#FF6B00] text-white p-8 md:p-10">
                  <h3 className="text-xl font-bold mb-6">Why Talk to Sales?</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Dedicated Support</h4>
                      <p className="text-[#ffeee3]">Get a dedicated account manager to guide you through the entire process.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Custom Solutions</h4>
                      <p className="text-[#ffeee3]">Receive a tailored enterprise plan designed for your specific needs.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Volume Discounts</h4>
                      <p className="text-[#ffeee3]">Access special pricing and terms designed for enterprise clients.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials Below Form */}
            <div className="mt-16">
              <h3 className="text-xl font-semibold text-center mb-8">What Our Enterprise Clients Say</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center mb-4">
                    <img
                      src="https://randomuser.me/api/portraits/women/32.jpg"
                      alt="Sarah Johnson"
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold">Sarah Johnson</h4>
                      <p className="text-sm text-[#2E2E2E]">CTO, TechInnovate</p>
                    </div>
                  </div>
                  <blockquote className="text-[#2E2E2E] italic">
                    "The sales team took the time to understand our unique requirements. They didn't just sell us access to talent, they built a comprehensive solution that addressed our specific workflow challenges."
                  </blockquote>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center mb-4">
                    <img
                      src="https://randomuser.me/api/portraits/men/41.jpg"
                      alt="Michael Chen"
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold">Michael Chen</h4>
                      <p className="text-sm text-[#2E2E2E]">VP of Engineering, DataFlow</p>
                    </div>
                  </div>
                  <blockquote className="text-[#2E2E2E] italic">
                    "From our initial sales consultation to ongoing support, we've been impressed with the level of expertise and personal attention. The custom reporting tools they built for us have been game-changers."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#ffeee3] border-t border-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-2">What happens after I submit this form?</h3>
                <p className="text-[#2E2E2E]">
                  Our enterprise team will review your request and contact you within 1 business day to schedule a consultation call. We'll discuss your needs in detail and create a custom proposal for your organization.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Do you offer enterprise-specific features?</h3>
                <p className="text-[#2E2E2E]">
                  Yes, our enterprise solutions include custom workflow development, API access, SSO implementation, dedicated account management, enhanced security features, and customized reporting tools.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-2">What industries do you specialize in?</h3>
                <p className="text-[#2E2E2E]">
                  We work with enterprises across all major industries including technology, finance, healthcare, retail, manufacturing, and more. Our solutions are customized for each industry's specific needs and compliance requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TalkToSalesPage;










