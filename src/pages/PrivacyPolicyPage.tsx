import React from 'react';
import { ArrowLeft, Shield, Eye, Database, Users, Lock, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
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
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-[#ffeee3]">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
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
                <Eye className="w-6 h-6 text-[#FF6B00] mr-3" />
                Introduction
              </h2>
              <p className="text-[#2E2E2E]/80 leading-relaxed mb-4">
                Welcome to FreelanceNest. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. We are committed to protecting your privacy and ensuring the security of your personal information.
              </p>
              <p className="text-[#2E2E2E]/80 leading-relaxed">
                By using FreelanceNest, you consent to the data practices described in this policy. If you do not agree with the practices described in this policy, please do not use our services.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#2E2E2E] mb-4 flex items-center">
                <Database className="w-6 h-6 text-[#FF6B00] mr-3" />
                Information We Collect
              </h2>
              
              <div className="bg-[#ffeee3] p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-[#2E2E2E] mb-3">Personal Information</h3>
                <ul className="list-disc list-inside space-y-2 text-[#2E2E2E]/80">
                  <li>Name, email address, and phone number</li>
                  <li>Profile information including skills, experience, and portfolio</li>
                  <li>Payment information and billing details</li>
                  <li>Identity verification documents</li>
                  <li>Communication preferences</li>
                </ul>
              </div>

              <div className="bg-[#ffeee3] p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-[#2E2E2E] mb-3">Usage Information</h3>
                <ul className="list-disc list-inside space-y-2 text-[#2E2E2E]/80">
                  <li>Device information and IP address</li>
                  <li>Browser type and operating system</li>
                  <li>Pages visited and time spent on our platform</li>
                  <li>Search queries and interaction data</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#2E2E2E] mb-4 flex items-center">
                <Users className="w-6 h-6 text-[#FF6B00] mr-3" />
                How We Use Your Information
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-[#FF6B00] pl-4">
                  <h3 className="font-semibold text-[#2E2E2E] mb-2">Service Provision</h3>
                  <p className="text-[#2E2E2E]/80">To provide, maintain, and improve our freelancing platform and match clients with freelancers.</p>
                </div>
                <div className="border-l-4 border-[#FF6B00] pl-4">
                  <h3 className="font-semibold text-[#2E2E2E] mb-2">Communication</h3>
                  <p className="text-[#2E2E2E]/80">To send you important updates, notifications, and respond to your inquiries.</p>
                </div>
                <div className="border-l-4 border-[#FF6B00] pl-4">
                  <h3 className="font-semibold text-[#2E2E2E] mb-2">Security & Fraud Prevention</h3>
                  <p className="text-[#2E2E2E]/80">To protect our platform and users from fraudulent activities and security threats.</p>
                </div>
                <div className="border-l-4 border-[#FF6B00] pl-4">
                  <h3 className="font-semibold text-[#2E2E2E] mb-2">Analytics & Improvement</h3>
                  <p className="text-[#2E2E2E]/80">To analyze usage patterns and improve our services and user experience.</p>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#2E2E2E] mb-4 flex items-center">
                <Lock className="w-6 h-6 text-[#FF6B00] mr-3" />
                Data Security
              </h2>
              <p className="text-[#2E2E2E]/80 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#ffeee3] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#2E2E2E] mb-2">Encryption</h4>
                  <p className="text-[#2E2E2E]/80 text-sm">All data transmission is encrypted using SSL/TLS protocols.</p>
                </div>
                <div className="bg-[#ffeee3] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#2E2E2E] mb-2">Access Controls</h4>
                  <p className="text-[#2E2E2E]/80 text-sm">Strict access controls and authentication measures.</p>
                </div>
                <div className="bg-[#ffeee3] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#2E2E2E] mb-2">Regular Audits</h4>
                  <p className="text-[#2E2E2E]/80 text-sm">Regular security audits and vulnerability assessments.</p>
                </div>
                <div className="bg-[#ffeee3] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#2E2E2E] mb-2">Data Backups</h4>
                  <p className="text-[#2E2E2E]/80 text-sm">Secure and regular data backups to prevent data loss.</p>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#2E2E2E] mb-4 flex items-center">
                <Bell className="w-6 h-6 text-[#FF6B00] mr-3" />
                Your Rights
              </h2>
              <p className="text-[#2E2E2E]/80 leading-relaxed mb-4">
                You have certain rights regarding your personal information:
              </p>
              <div className="bg-[#2E2E2E] p-6 rounded-lg text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-[#FF6B00] mb-2">Access & Portability</h4>
                    <p className="text-[#ffeee3] text-sm">Request access to your personal data and receive a copy in a portable format.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#FF6B00] mb-2">Correction</h4>
                    <p className="text-[#ffeee3] text-sm">Request correction of inaccurate or incomplete personal information.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#FF6B00] mb-2">Deletion</h4>
                    <p className="text-[#ffeee3] text-sm">Request deletion of your personal data under certain circumstances.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#FF6B00] mb-2">Opt-out</h4>
                    <p className="text-[#ffeee3] text-sm">Opt-out of marketing communications and certain data processing activities.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-[#FF6B00] p-8 rounded-lg text-white">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
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

export default PrivacyPolicyPage;