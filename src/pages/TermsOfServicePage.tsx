import React from 'react';
import { ArrowLeft, FileText, Users, Shield, AlertTriangle, Gavel, Ban } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#2E2E2E] py-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-[#FF6B00] hover:text-[#FF9F45] transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <div className="flex justify-center mb-6">
              <div className="bg-[#FF6B00] p-4 rounded-full">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-[#ffeee3]">
              Please read these terms carefully before using our platform.
            </p>
            <div className="text-[#ffeee3] mt-4">
              Last updated: November 22, 2025
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section-container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#2E2E2E] mb-4 flex items-center">
                <FileText className="w-6 h-6 text-[#FF6B00] mr-3" />
                Agreement to Terms
              </h2>
              <p className="text-[#2E2E2E]/80 leading-relaxed mb-4">
                These Terms of Service ("Terms") govern your use of FreelanceNest's website and services. By accessing or using our platform, you agree to be bound by these Terms and all applicable laws and regulations.
              </p>
              <p className="text-[#2E2E2E]/80 leading-relaxed">
                If you do not agree with any of these Terms, you are prohibited from using or accessing this site and our services.
              </p>
            </div>

            {/* User Accounts */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#2E2E2E] mb-4 flex items-center">
                <Users className="w-6 h-6 text-[#FF6B00] mr-3" />
                User Accounts and Responsibilities
              </h2>
              
              <div className="bg-[#ffeee3] p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-[#2E2E2E] mb-3">Account Creation</h3>
                <ul className="list-disc list-inside space-y-2 text-[#2E2E2E]/80">
                  <li>You must be at least 18 years old to create an account</li>
                  <li>Provide accurate and complete information during registration</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>You are responsible for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
              </div>

              <div className="bg-[#ffeee3] p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-[#2E2E2E] mb-3">User Conduct</h3>
                <p className="text-[#2E2E2E]/80 mb-3">Users must not:</p>
                <ul className="list-disc list-inside space-y-2 text-[#2E2E2E]/80">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Engage in fraudulent or deceptive practices</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Post inappropriate or offensive content</li>
                  <li>Attempt to circumvent platform fees</li>
                </ul>
              </div>
            </div>

            {/* Services and Platform */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#2E2E2E] mb-4 flex items-center">
                <Shield className="w-6 h-6 text-[#FF6B00] mr-3" />
                Platform Services
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-[#FF6B00] pl-4">
                  <h3 className="font-semibold text-[#2E2E2E] mb-2">For Clients</h3>
                  <p className="text-[#2E2E2E]/80">Access to freelancer profiles, project posting capabilities, secure payment processing, and dispute resolution services.</p>
                </div>
                <div className="border-l-4 border-[#FF6B00] pl-4">
                  <h3 className="font-semibold text-[#2E2E2E] mb-2">For Freelancers</h3>
                  <p className="text-[#2E2E2E]/80">Profile creation, project bidding, gig marketplace access, payment processing, and professional development tools.</p>
                </div>
                <div className="border-l-4 border-[#FF6B00] pl-4">
                  <h3 className="font-semibold text-[#2E2E2E] mb-2">Platform Features</h3>
                  <p className="text-[#2E2E2E]/80">Messaging system, file sharing, time tracking, milestone management, and AI-powered matching algorithms.</p>
                </div>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#2E2E2E] mb-4 flex items-center">
                <Gavel className="w-6 h-6 text-[#FF6B00] mr-3" />
                Payment Terms
              </h2>
              <div className="bg-[#2E2E2E] p-6 rounded-lg text-white mb-6">
                <h3 className="text-xl font-semibold text-[#FF6B00] mb-3">Platform Fees</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-[#ffeee3] mb-2">For Clients</h4>
                    <p className="text-[#ffeee3] text-sm">5% processing fee on all payments made through the platform.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#ffeee3] mb-2">For Freelancers</h4>
                    <p className="text-[#ffeee3] text-sm">5% service fee deducted from earnings, plus payment processing fees.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#ffeee3] p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#2E2E2E] mb-3">Payment Processing</h3>
                <ul className="list-disc list-inside space-y-2 text-[#2E2E2E]/80">
                  <li>All payments are processed through secure third-party payment processors</li>
                  <li>Escrow protection for milestone-based projects</li>
                  <li>Funds are released according to project agreements</li>
                  <li>Dispute resolution available for payment-related issues</li>
                  <li>Refunds subject to our refund policy and terms</li>
                </ul>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#2E2E2E] mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 text-[#FF6B00] mr-3" />
                Intellectual Property Rights
              </h2>
              <p className="text-[#2E2E2E]/80 leading-relaxed mb-4">
                The FreelanceNest platform, including all content, features, and functionality, is owned by us and protected by international copyright, trademark, and other intellectual property laws.
              </p>
              <div className="space-y-4">
                <div className="bg-[#ffeee3] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#2E2E2E] mb-2">User Content</h4>
                  <p className="text-[#2E2E2E]/80 text-sm">You retain ownership of content you create, but grant us a license to use it for platform operations.</p>
                </div>
                <div className="bg-[#ffeee3] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#2E2E2E] mb-2">Work Product</h4>
                  <p className="text-[#2E2E2E]/80 text-sm">Intellectual property rights in work products are determined by the agreement between client and freelancer.</p>
                </div>
              </div>
            </div>

            {/* Prohibited Activities */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#2E2E2E] mb-4 flex items-center">
                <Ban className="w-6 h-6 text-[#FF6B00] mr-3" />
                Prohibited Activities
              </h2>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <p className="text-red-700 font-medium mb-2">The following activities are strictly prohibited:</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#ffeee3] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#2E2E2E] mb-2">Platform Misuse</h4>
                  <ul className="text-[#2E2E2E]/80 text-sm space-y-1">
                    <li>• Creating fake accounts</li>
                    <li>• Manipulating reviews or ratings</li>
                    <li>• Spamming or harassment</li>
                  </ul>
                </div>
                <div className="bg-[#ffeee3] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#2E2E2E] mb-2">Fraudulent Activities</h4>
                  <ul className="text-[#2E2E2E]/80 text-sm space-y-1">
                    <li>• Payment fraud or chargebacks</li>
                    <li>• Identity theft or impersonation</li>
                    <li>• Money laundering</li>
                  </ul>
                </div>
                <div className="bg-[#ffeee3] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#2E2E2E] mb-2">Content Violations</h4>
                  <ul className="text-[#2E2E2E]/80 text-sm space-y-1">
                    <li>• Posting illegal or harmful content</li>
                    <li>• Copyright infringement</li>
                    <li>• Adult or offensive material</li>
                  </ul>
                </div>
                <div className="bg-[#ffeee3] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#2E2E2E] mb-2">System Abuse</h4>
                  <ul className="text-[#2E2E2E]/80 text-sm space-y-1">
                    <li>• Hacking or unauthorized access</li>
                    <li>• Malware or virus distribution</li>
                    <li>• System interference</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-[#FF6B00] p-8 rounded-lg text-white">
              <h2 className="text-2xl font-bold mb-4">Questions About Terms</h2>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> freelancenestteam@gmail.com</p>
                <p><strong>Phone:</strong> +92 316 3028236</p>
                <p><strong>Address:</strong> Islamabad, Pakistan</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;