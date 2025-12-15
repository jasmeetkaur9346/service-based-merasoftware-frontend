import React from 'react';
import { Shield, Lock, UserX, Mail, FileText, Clock, Users, Database, CheckCircle } from 'lucide-react';

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: FileText,
      title: "Introduction",
      content: "WorkOps – Work Operations App respects your privacy. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data. By using this app, you agree to the practices described in this policy."
    },
    {
      icon: Database,
      title: "Information We Collect",
      content: "We collect only the minimum information required for authentication.",
      details: {
        collected: [
          "Your name",
          "Your email address",
          "Your Google account ID"
        ],
        notCollected: [
          "Phone number",
          "Contacts",
          "Location data",
          "Payment information",
          "Personal files or media"
        ]
      }
    },
    {
      icon: CheckCircle,
      title: "How We Use Your Information",
      content: "The collected information is used only for authentication and account identification purposes, such as:",
      list: [
        "Logging you into the app",
        "Identifying your account securely",
        "Maintaining your session"
      ],
      note: "We do not use your data for advertising, tracking, or analytics."
    },
    {
      icon: Users,
      title: "Data Sharing",
      content: "We do not sell, rent, or share your personal data with any third parties. Your data is not shared with advertisers, marketers, or external services."
    },
    {
      icon: Lock,
      title: "Data Storage and Security",
      content: "Your data is stored securely using industry-standard security practices. We take reasonable measures to protect your information from unauthorized access, misuse, or loss."
    },
    {
      icon: UserX,
      title: "Data Deletion",
      content: "You are always in control of your data. You may request deletion of your account and associated data at any time by contacting us via the support details provided below. Upon request, we will permanently delete your data within a reasonable time."
    },
    {
      icon: Shield,
      title: "Children's Privacy",
      content: "This app is not intended for children under the age of 13. We do not knowingly collect data from children."
    },
    {
      icon: Clock,
      title: "Changes to This Privacy Policy",
      content: "We may update this Privacy Policy from time to time.",
      list: [
        "The updated policy will be published on this page",
        "The \"Last updated\" date will be revised"
      ],
      note: "Continued use of the app means you accept the updated policy."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Privacy Policy</h1>
          <p className="text-blue-100 text-center text-lg">WorkOps – Work Operations App</p>
          <p className="text-blue-200 text-center mt-2">Last updated: 15 December 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8 border border-slate-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">{section.title}</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">{section.content}</p>
                    
                    {section.details && (
                      <div className="space-y-4 mt-6">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="font-semibold text-green-800 mb-3">When you sign in using Google Sign-In, we may receive:</p>
                          <ul className="space-y-2">
                            {section.details.collected.map((item, i) => (
                              <li key={i} className="flex items-center text-green-700">
                                <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                          <p className="font-semibold text-slate-800 mb-3">We do not collect:</p>
                          <ul className="space-y-2">
                            {section.details.notCollected.map((item, i) => (
                              <li key={i} className="flex items-center text-slate-600">
                                <UserX className="w-4 h-4 mr-2 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    
                    {section.list && (
                      <ul className="space-y-2 mt-4">
                        {section.list.map((item, i) => (
                          <li key={i} className="flex items-start text-slate-600">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {section.note && (
                      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                        <p className="text-slate-700 italic">{section.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg p-8 text-white">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-blue-100 leading-relaxed mb-4">
                If you have any questions or concerns about this Privacy Policy or your data, you can contact us at:
              </p>
              <a 
                href="mailto:support@workops.app" 
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
                contact@merasoftware.com
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>© 2025 WorkOps. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}