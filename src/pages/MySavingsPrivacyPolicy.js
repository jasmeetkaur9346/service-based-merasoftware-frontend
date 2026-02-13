import React from 'react';
import { Shield, Lock, Eye, UserX, Mail, FileText, CheckCircle, XCircle } from 'lucide-react';

const MySavingsPrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <Shield className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-gray-600 mt-1">Savingo: Ledger, Money Manager</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Last updated: January 8, 2026</span>
            {/* <span>•</span>
            <span>Effective Date: February 13, 2026</span> */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Introduction */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-start space-x-3 mb-4">
            <FileText className="w-6 h-6 text-indigo-600 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Savingo: Ledger, Money Manager app respects your privacy. This Privacy Policy explains what information we collect, how it is used, and your rights related to your data. By using this app, you agree to the practices described in this policy.
              </p>
            </div>
          </div>
        </section>

        {/* Information We Collect */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-start space-x-3 mb-4">
            <Eye className="w-6 h-6 text-indigo-600 mt-1" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We collect only the minimum information required for user authentication and account identification.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* What We Collect */}
                <div className="border-l-4 border-green-500 bg-green-50 p-5 rounded-r-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-gray-900">When you sign in using Google Sign-In, we may receive:</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                      <span>Your name</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                      <span>Your email address</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                      <span>Your Google account ID</span>
                    </li>
                  </ul>
                </div>

                {/* What We Don't Collect */}
                <div className="border-l-4 border-red-500 bg-red-50 p-5 rounded-r-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <h3 className="font-semibold text-gray-900">We do not collect:</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                      <span>Phone number</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                      <span>Contacts</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                      <span>Location data</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                      <span>Payment information</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                      <span>Personal files or media</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-start space-x-3 mb-4">
            <Lock className="w-6 h-6 text-indigo-600 mt-1" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The collected information is used strictly for core app functionality, including:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                  <span className="text-gray-700">Secure login authentication</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                  <span className="text-gray-700">Identifying your account</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                  <span className="text-gray-700">Maintaining your active session</span>
                </li>
              </ul>
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <p className="text-indigo-900 font-medium">
                  We do not use your data for advertising, tracking, profiling, or analytics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Sharing */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-start space-x-3 mb-4">
            <UserX className="w-6 h-6 text-indigo-600 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sharing</h2>
              <p className="text-gray-900 font-semibold mb-3">
                We do not sell, rent, or share your personal data with any third parties.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Your information is not shared with advertisers, marketers, or external data services.
              </p>
            </div>
          </div>
        </section>

        {/* Data Storage and Security */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-start space-x-3 mb-4">
            <Shield className="w-6 h-6 text-indigo-600 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Storage and Security</h2>
              <p className="text-gray-700 leading-relaxed">
                Your data is stored securely using industry-standard security measures. We take reasonable steps to protect your information from unauthorized access, misuse, alteration, or loss.
              </p>
            </div>
          </div>
        </section>

        {/* Data Deletion */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-start space-x-3 mb-4">
            <UserX className="w-6 h-6 text-indigo-600 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Deletion</h2>
              <p className="text-gray-700 leading-relaxed">
                You remain in full control of your data. You may request deletion of your account and associated data at any time by contacting us through the support details below. Upon request, we will permanently delete your data within a reasonable timeframe.
              </p>
            </div>
          </div>
        </section>

        {/* Children's Privacy */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-start space-x-3 mb-4">
            <Shield className="w-6 h-6 text-indigo-600 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                My Savings & Khata App is not intended for children under the age of 13. We do not knowingly collect personal data from children.
              </p>
            </div>
          </div>
        </section>

        {/* Changes to This Privacy Policy */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-start space-x-3 mb-4">
            <FileText className="w-6 h-6 text-indigo-600 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy when required.
              </p>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                  <span className="text-gray-700">Any changes will be published on this page</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                  <span className="text-gray-700">The "Last updated" date will be revised</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Continued use of the app after updates indicates acceptance of the revised policy.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Us */}
        <section className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg shadow-lg p-8 text-white">
          <div className="flex items-start space-x-3 mb-4">
            <Mail className="w-6 h-6 mt-1" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="leading-relaxed mb-6">
                If you have any questions or concerns regarding this Privacy Policy or your data, you can contact us at:
              </p>
              <a 
                href="mailto:contact@merasoftware.com" 
                className="inline-flex items-center space-x-2 bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>contact@merasoftware.com</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm border-t border-gray-200 pt-8">
          <p>© 2026 Savingo: Ledger, Money Manager App. All rights reserved.</p>
          <p className="mt-2">Developed by Mera Software</p>
        </div>
      </div>
    </div>
  );
};

export default MySavingsPrivacyPolicy;
