import React from 'react';
import { Mail, FileText } from 'lucide-react';

const HelpCenterPage: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-[#ffeee3]/30">
      {/* Hero Section */}
      <section className="pt-40 pb-16 relative">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#2E2E2E]/90"></div>
        </div>
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">How can we <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">help</span> you?</h1>
              <p className="text-xl text-[#ffeee3] mb-8">
                Find answers to frequently asked questions and get support
              </p>
            </div>
          </div>
        </div>
      </section>





      {/* FAQ Sections */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#2E2E2E] mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-12">
              {faqSections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-24">
                  <h3 className="text-2xl font-bold text-[#2E2E2E] mb-6">{section.title}</h3>
                  <div className="space-y-4">
                    {section.questions.map((faq, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-sm border border-[#ffeee3] hover:border-[#FF6B00] transition-colors duration-200 overflow-hidden">
                        <div className="p-6">
                          <h4 className="text-lg font-bold text-[#2E2E2E] mb-3">{faq.question}</h4>
                          <p className="text-[#2E2E2E]">{faq.answer}</p>
                        </div>
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
      <section className="py-16 bg-[#ffeee3]" id="contact">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#2E2E2E] mb-4">Need More Help?</h2>
              <p className="text-xl text-[#2E2E2E]">
                Our support team is just a few clicks away
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <div className="bg-orange-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-[#FF6B00]" />
                </div>
                <h3 className="text-xl font-bold text-[#2E2E2E] mb-3">Email Support</h3>
                <p className="text-[#2E2E2E] mb-6">
                  Send us an email and we'll get back to you within 24 hours.
                </p>
                <button className="w-full bg-[#FF6B00] hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition-colors duration-200">
                  Email Us
                </button>
                <p className="text-sm text-gray-500 mt-3">
                  Response within 24 hours
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <div className="bg-orange-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-[#FF6B00]" />
                </div>
                <h3 className="text-xl font-bold text-[#2E2E2E] mb-3">Submit a Ticket</h3>
                <p className="text-[#2E2E2E] mb-6">
                  Create a support ticket for complex issues requiring investigation.
                </p>
                <button className="w-full bg-[#FF6B00] hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition-colors duration-200">
                  Create Ticket
                </button>
                <p className="text-sm text-gray-500 mt-3">
                  Dedicated case manager
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HelpCenterPage;










