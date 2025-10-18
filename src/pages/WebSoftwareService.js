import React, { useState, useRef } from 'react';
import {
  Code,
  HelpCircle,
  CheckCircle2,
  MessageCircle,
  Calculator,
  Sparkles,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import SmartPlanner from './ProjectPlanner';

const WebSoftwareService = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [selectedNeed, setSelectedNeed] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const plannerRef = useRef(null);
  
  const businessTypes = [
    'Professional Services',
    'Medical & Healthcare',
    'Education & E-learning',
    'IT Sector & Technology',
    'E-commerce & Retail',
    'Hospitality & Tourism',
    'Manufacturing & Industry',
    'Finance & Banking'
  ];

  const needTypes = [
    'Web Application',
    'Management Software'
  ];

  const webApplications = [
    'E-commerce Store',
    'Booking & Reservation System',
    'Social Media Platform',
    'Portfolio & Business Website',
    'Job Portal',
    'News & Media Portal'
  ];

  const managementSoftware = [
    'Customer Relationship Management (CRM)',
    'Enterprise Resource Planning (ERP)',
    'Human Resource Management System (HRMS)',
    'Inventory Management System',
    'Project Management Software',
    'Point of Sale (POS) System'
  ];

  const isFormComplete = selectedBusiness && selectedNeed && selectedType;

  const handleSubmit = () => setSubmitted(true);
  const handleReset = () => {
    setSelectedBusiness('');
    setSelectedNeed('');
    setSelectedType('');
    setSubmitted(false);
  };
   const openPlannerModal = () => {
    if (plannerRef.current && typeof plannerRef.current.open === 'function') {
      plannerRef.current.open();
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Path with Dashboard Image Section */}
      <div className="relative bg-slate-900 py-20 border-b border-slate-700 overflow-hidden dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100">
        <div className="absolute inset-0">
          <img 
            src="https://www.shutterstock.com/image-photo/panorama-shot-analyst-team-utilizing-260nw-2332286999.jpg" 
            alt="Technology web background"
            className="w-full h-full object-cover dark:opacity-80 dark:saturate-75 dark:brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-cyan-900/80 to-slate-900/80 dark:from-slate-950/90 dark:via-cyan-800/75 dark:to-slate-950/90" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 text-sm mb-6">
            <a href="/" className="text-slate-300 hover:text-white transition-colors font-medium flex items-center gap-2 hover:gap-3 dark:text-slate-300 dark:hover:text-cyan-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Home
            </a>
            <svg className="w-4 h-4 text-slate-500 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <a href="/services" className="text-slate-300 hover:text-white transition-colors font-medium dark:text-slate-300 dark:hover:text-cyan-400">
              Services
            </a>
            <svg className="w-4 h-4 text-slate-500 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white font-semibold dark:text-white">Web Application Development</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-white leading-tight dark:text-white">
              Cloud-Based Management Softwares
            </h1>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .section { 
          padding-top: 5rem; 
          padding-bottom: 5rem; 
        }
        @media (min-width:1024px){ 
          .section { 
            padding-top: 8rem; 
            padding-bottom: 8rem; 
          } 
        }
        .divider { 
          height: 1px; 
          background: linear-gradient(90deg, rgba(15,23,42,0.03), rgba(15,23,42,0.08), rgba(15,23,42,0.03)); 
          margin: 0 auto;
          max-width: 90%;
        }
      `}</style>

      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100 dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-850 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-1">
              <div className="relative z-10 animate-float">
                <div className="bg-white rounded-2xl shadow-xl p-4 border border-slate-200 dark:bg-slate-900/80 dark:border-slate-800 dark:shadow-cyan-900/20 relative overflow-hidden">
                  <img
                    loading="lazy"
                    src="https://www.scnsoft.com/blog-pictures/web-apps/web-application-vs-website-01.png"
                    alt="Web application dashboard"
                    className="rounded-xl w-full dark:opacity-90"
                  />
                  <div className="pointer-events-none hidden dark:block absolute inset-0 bg-gradient-to-br from-slate-950/50 via-cyan-900/40 to-slate-900/45 mix-blend-multiply" />
                </div>
              </div>
              <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500 to-cyan-900 rounded-3xl opacity-20 blur-2xl -z-10 dark:from-slate-950 dark:via-cyan-900 dark:to-slate-900 dark:opacity-45" />
            </div>

            <div className="space-y-8 order-2">
              <div className="inline-block mb-4">
                <span className="bg-gradient-to-br from-cyan-500 to-cyan-900 text-white text-sm font-bold px-8 py-2 rounded-full dark:from-cyan-900 dark:via-cyan-800 dark:to-cyan-700 dark:text-white">
                  Custom Management Software
                </span>
              </div>

              <div className="space-y-5">
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight dark:text-slate-100">
                  Cloud-Based{' '}
                  <span className="text-cyan-600 bg-clip-text dark:text-cyan-400">
                    Management Softwares
                  </span>
                </h2>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-cyan-900 rounded-full dark:from-slate-950 dark:to-cyan-700" />
                </div>
              </div>

              <p className="text-2xl text-slate-800 font-bold leading-relaxed dark:text-slate-100">
                Built to grow your business through automation
              </p>

              <p className="text-lg text-slate-700 leading-relaxed max-w-xl dark:text-slate-300">
                Get a management software that automates your business, eliminates manual work, and keeps operations running even when you're away — with real-time reports at your fingertips.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="inline-flex items-center gap-2 bg-white border border-cyan-200 rounded-xl px-5 py-3 shadow-sm dark:bg-slate-900/70 dark:border-cyan-700 dark:shadow-cyan-900/20">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">No Data Loss</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-white border border-cyan-200 rounded-xl px-5 py-3 shadow-sm dark:bg-slate-900/70 dark:border-cyan-700 dark:shadow-cyan-900/20">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">Traceable Workflow</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-white border border-cyan-200 rounded-xl px-5 py-3 shadow-sm dark:bg-slate-900/70 dark:border-cyan-700 dark:shadow-cyan-900/20">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">Fully Coded Software</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="py-12 lg:py-16 bg-white relative overflow-hidden dark:bg-slate-950 dark:text-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 dark:text-slate-100">
              Cloud-Based Solutions
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed dark:text-slate-300">
              We understand how important your data is — Discover why cloud-based solutions matter
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-16">    

            <div className="space-y-5">
              <div>
                <h3 className="text-4xl font-bold text-slate-900 mb-3 dark:text-slate-100">
                  Management Software
                </h3>
                <div className="w-16 h-1 bg-cyan-600 dark:bg-cyan-500"></div>
              </div>

              <p className="text-lg text-slate-700 leading-relaxed dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-slate-100"></span> Management software helps businesses handle everyday tasks like sales tracking, staff management, and inventory — keeping everything organized and easy to manage from one place. Popular examples include CRM, CMS, LMS, and project management systems.
              </p>
              
              <p className="text-lg text-slate-700 leading-relaxed dark:text-slate-300">
                Cloud-based solutions make any software more effective, secure, and easy to access from anywhere — the main benefits are listed below.
              </p>

               <div className="relative !mt-10">
                <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500 to-cyan-900 rounded-2xl opacity-10 blur-xl dark:from-slate-900 dark:via-cyan-900/50 dark:to-slate-900 dark:opacity-20 dark:blur-2xl" />
                <div className="relative bg-gradient-to-br from-cyan-50 via-slate-50 to-cyan-50 rounded-2xl px-6 py-6 border-l-4 border-cyan-600 shadow-lg dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:border-cyan-600 dark:shadow-none">
                  <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-200">
                   Adding management software marks the start of a bigger journey.
                  </p>
                </div>
              </div>

              <div className="lg:hidden relative mt-6">
                <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:shadow-cyan-900/20">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format" 
                    alt="Development Portal Dashboard"
                    className="w-full dark:opacity-90"
                  />
                </div>
                <div className="absolute -top-3 -right-3 bg-cyan-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-bold dark:shadow-cyan-900/40">
                  24/7 Access
                </div>
              </div>

              {/* <div className="pt-4 hidden lg:block">
                <h3 className="text-3xl font-bold text-slate-900 mb-3 dark:text-slate-100">
                  Why Cloud-Based is Better
                </h3>
                <div className="w-16 h-1 bg-cyan-600 dark:bg-cyan-500"></div>
              </div> */}
            </div> 
            
            <div className="relative hidden lg:block">
              <div className="sticky top-8">
                <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:shadow-cyan-900/25">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format" 
                    alt="Development Portal Dashboard"
                    className="w-full dark:opacity-90"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg px-3 py-2 border border-slate-200 dark:bg-slate-900/80 dark:border-slate-700 dark:text-slate-100 dark:shadow-cyan-900/30">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-600 rounded-full animate-pulse"></div>
                      <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">Live Updates</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-cyan-600 text-white px-4 py-2 rounded-lg shadow-lg dark:shadow-cyan-900/40">
                    <div className="text-lg font-black">24/7</div>
                    <div className="text-xs">Portal Access</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className=" mb-8">
            <h3 className="text-3xl font-bold text-slate-900 mb-3 dark:text-slate-100">
              Why Smart Businesses Are Moving to the Cloud
            </h3>
            <div className="w-16 h-1 bg-cyan-600 dark:bg-cyan-500"></div>
          </div>

          <div className="max-w-6xl mx-auto lg:ml-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              <div className="group bg-slate-50 hover:bg-cyan-50 rounded-lg p-5 border border-slate-200 hover:border-cyan-300 transition-all duration-300 dark:bg-slate-900/70 dark:hover:bg-slate-900/50 dark:border-slate-800 dark:hover:border-cyan-700 dark:shadow-cyan-900/20">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 text-white rounded-lg flex items-center justify-center font-bold text-sm mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1 dark:text-slate-100">No Data Loss</h4>
                    <p className="text-base text-slate-600 leading-snug dark:text-slate-300">
                      Automatic cloud backups and secure storage keep your data safe.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-slate-50 hover:bg-cyan-50 rounded-lg p-5 border border-slate-200 hover:border-cyan-300 transition-all duration-300 dark:bg-slate-900/70 dark:hover:bg-slate-900/50 dark:border-slate-800 dark:hover:border-cyan-700 dark:shadow-cyan-900/20">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 text-white rounded-lg flex items-center justify-center font-bold text-sm mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1 dark:text-slate-100">Access Anywhere</h4>
                    <p className="text-base text-slate-600 leading-snug dark:text-slate-300">
                      Work from any device — your business stays connected.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-slate-50 hover:bg-cyan-50 rounded-lg p-5 border border-slate-200 hover:border-cyan-300 transition-all duration-300 dark:bg-slate-900/70 dark:hover:bg-slate-900/50 dark:border-slate-800 dark:hover:border-cyan-700 dark:shadow-cyan-900/20">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 text-white rounded-lg flex items-center justify-center font-bold text-sm mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1 dark:text-slate-100">Team Collaboration</h4>
                    <p className="text-base text-slate-600 leading-snug dark:text-slate-300">
                      Role-based access and real-time updates for seamless teamwork.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-slate-50 hover:bg-cyan-50 rounded-lg p-5 border border-slate-200 hover:border-cyan-300 transition-all duration-300 dark:bg-slate-900/70 dark:hover:bg-slate-900/50 dark:border-slate-800 dark:hover:border-cyan-700 dark:shadow-cyan-900/20">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 text-white rounded-lg flex items-center justify-center font-bold text-sm mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1 dark:text-slate-100">No Maintenance</h4>
                    <p className="text-base text-slate-600 leading-snug dark:text-slate-300">
                      Everything runs online and stays automatically managed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-slate-50 hover:bg-cyan-50 rounded-lg p-5 border border-slate-200 hover:border-cyan-300 transition-all duration-300 dark:bg-slate-900/70 dark:hover:bg-slate-900/50 dark:border-slate-800 dark:hover:border-cyan-700 dark:shadow-cyan-900/20">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 text-white rounded-lg flex items-center justify-center font-bold text-sm mt-0.5">
                    5
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1 dark:text-slate-100">Cost Efficient</h4>
                    <p className="text-base text-slate-600 leading-snug dark:text-slate-300">
                      Save on servers and IT costs — pay only for what you use.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-slate-50 hover:bg-cyan-50 rounded-lg p-5 border border-slate-200 hover:border-cyan-300 transition-all duration-300 dark:bg-slate-900/70 dark:hover:bg-slate-900/50 dark:border-slate-800 dark:hover:border-cyan-700 dark:shadow-cyan-900/20">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 text-white rounded-lg flex items-center justify-center font-bold text-sm mt-0.5">
                    6
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1 dark:text-slate-100">Disaster-Proof</h4>
                    <p className="text-base text-slate-600 leading-snug dark:text-slate-300">
                      Your data remains secure and instantly recoverable from the cloud.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* bridge section */}
           <div className="mt-16 flex justify-center">
            <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 max-w-5xl text-center dark:bg-slate-900 dark:border-slate-800 dark:shadow-cyan-900/20">
            <p className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-1.5">
        See what fits your business and what it costs — with our <span className="text-cyan-600 font-semibold dark:text-cyan-400">Project Planner</span> below.
             </p>
            </div>
          </div>

        </div>
      </section>


      <div className="divider" />

     {/* Project Planner */}
      <section id="project-planner" className="section bg-gradient-to-br from-slate-50 via-cyan-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            {/* <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-900 text-white px-8 py-2 rounded-full font-bold mb-4 shadow-lg">
              <Calculator className="w-4 h-4" />
              The Project Planner
            </div> */}
            {/* <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5 leading-tight">
              Plan Your Project
            </h2>
            <p className="text-2xl text-slate-600 font-medium mb-2">
              Discover what your business needs and plan your project instantly.
            </p>
            <p className="text-sm text-blue-600 font-semibold">
              Exclusive tool by Mera Software
            </p> */}
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Left Info Box - Project Planning Tool Intro */}
            <aside className="lg:col-span-4">
              <div className="bg-gradient-to-br from-cyan-50 via-white to-slate-50 rounded-2xl shadow-xl border-2 border-cyan-200 p-8 sticky top-6">
                {/* Icon with Animation */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-900 rounded-2xl flex items-center justify-center shadow-2xl mx-auto animate-pulse">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-cyan-900 rounded-2xl opacity-20 blur-xl" />
                </div>

                {/* Heading */}
                <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                  Try Our Smart Project Planning Tool
                </h3>

                {/* Description */}
                <p className="text-base text-slate-700 leading-relaxed mb-6 text-center">
                  An intelligent wizard that helps you select your business category, explore features, and get instant AI-powered recommendations with pricing estimates.
                </p>

                {/* Features List */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-cyan-600" />
                    </div>
                    <p className="text-sm text-slate-600 font-medium">6 Business Categories with Smart Recommendations</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-cyan-600" />
                    </div>
                    <p className="text-sm text-slate-600 font-medium">Interactive Feature Selection & Configuration</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-cyan-600" />
                    </div>
                    <p className="text-sm text-slate-600 font-medium">Instant Price Estimation & Project Preview</p>
                  </div>
                </div>

                {/* Call to Action Button */}
                <a
                  href="/practice"
                  className="group relative inline-flex items-center justify-center gap-3 w-full rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-900 text-white px-6 py-4 text-base font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <span>Launch Planning Tool</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-900 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-lg" />
                </a>

                {/* Note */}
                <p className="text-xs text-slate-500 text-center mt-4">
                  No orders will be created automatically
                </p>
              </div>
            </aside>

            {/* Main Planner */}
            <div className="lg:col-span-8">
              <div className="rounded-2xl p-8">
                <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-gradient-to-br from-cyan-500 to-cyan-900 text-white px-8 py-2 rounded-full font-bold mb-4 shadow-lg">
              <Calculator className="w-4 h-4" />
              The Project Planner
            </div>
            </div>

                {/* Heading */}
                <h1 className="text-5xl md:text-6xl font-black mb-6 text-center">
                  <span className="bg-gradient-to-r from-slate-900 via-cyan-800 to-cyan-800 bg-clip-text text-transparent">
                    Build Your
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-600 via-cyan-800 to-cyan-600 bg-clip-text text-transparent">
                    Next Project
                  </span>
                </h1>

                {/* Description */}
                <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 text-center leading-relaxed">
                  Intelligent wizard to guide you through selecting business categories and services with AI-powered recommendations
                </p>

                {/* CTA Button */}
                <div className="text-center mb-8">
                  <button
                    type="button"
                    onClick={openPlannerModal}
                    className="group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-cyan-500 text-white px-10 py-5 text-lg font-bold shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300 hover:scale-105"
                  >
                    <span>Start Planning</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />
                  </button>
                </div>

              </div>

                   <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 sm:p-12">
                    {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <div className="flex items-center justify-center gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-cyan-500" />
                    <span className="text-sm font-medium">6 Business Categories</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-cyan-500" />
                    <span className="text-sm font-medium">Smart Recommendations</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-cyan-500" />
                    <span className="text-sm font-medium">Instant Preview</span>
                  </div>
                </div>
                   </div>

            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="process" className="section bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-br from-cyan-500 to-cyan-900 text-white text-sm font-bold px-8 py-2 rounded-full">
                Our Process
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight dark:text-slate-100">
              How We Turn Plans Into Systems
            </h2>
            <p className="text-2xl text-slate-600 font-medium dark:text-slate-300">
              A clear process built for clarity, speed, and results.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 dark:text-slate-100">Plan</h3>
              <p className="text-slate-600 text-lg dark:text-slate-300">Use the Project Planner to scope needs and budget.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 dark:text-slate-100">Discuss</h3>
              <p className="text-slate-600 text-lg dark:text-slate-300">We discuss and document your exact requirements.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 dark:text-slate-100">Build</h3>
              <p className="text-slate-600 text-lg dark:text-slate-300">Development will begin after 30% advance with portal access.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 dark:text-slate-100">Launch</h3>
              <p className="text-slate-600 text-lg dark:text-slate-300">You'll get the source code and support after deployment.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="bg-gradient-to-br from-cyan-500 to-cyan-900 text-white text-xs font-bold px-6 py-2 rounded-full inline-block mb-3">
              Your Project Portal
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
              Introducing the <span className="text-cyan-500 bg-clip-text">Client Portal </span> —  Built for You
            </h2>
            <p className="text-2xl text-slate-300 max-w-7xl mx-auto">
            We built this portal to make you feel part of every milestone — Take a look at how it keeps you involved.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
            
            <div className="space-y-6">
              <div className="relative">
                <div className="bg-slate-700 rounded-xl shadow-2xl p-3 border border-slate-600">
                  <img
                    loading="lazy"
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop&auto=format"
                    alt="Customer portal dashboard"
                    className="rounded-lg w-full"
                  />
                </div>
                <div className="absolute -inset-6 bg-gradient-to-r from-cyan-500 to-cyan-900 rounded-2xl opacity-20 blur-2xl -z-10" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gradient-to-br from-cyan-900 to-cyan-800 border border-cyan-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-200">0-100%</div>
                  <div className="text-xs text-slate-300 font-medium">Live Progress</div>
                </div>
                <div className="bg-gradient-to-br from-slate-700 to-slate-600 border border-slate-500 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-slate-200">24/7</div>
                  <div className="text-xs text-slate-300 font-medium">Access</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-900 to-cyan-800 border border-cyan-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-200">Free</div>
                  <div className="text-xs text-slate-300 font-medium">Demo</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl p-6 border-l-4 border-cyan-500">
                <h3 className="text-lg font-bold text-white mb-3">Getting Portal Access:</h3>
                <div className="space-y-2 text-sm text-slate-200">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Access Created:</strong> Your portal ID is shared after project discussion.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Demo Access:</strong> Get a glimpse of your final product.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Always in Touch:</strong> Stay updated at every step.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-4">Portal Features:</h3>
              
              <div className="grid grid-cols-2 gap-3">
                
                <div className="bg-gradient-to-br from-cyan-800 to-cyan-900 border border-cyan-700 rounded-xl p-5 text-white relative">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Live Project Progress</h4>
                  <p className="text-sm text-cyan-100">Monitor your project's journey from 0—100% completion.</p>
                </div>

                <div className="bg-gradient-to-br from-cyan-800 to-cyan-900 border border-cyan-700 rounded-xl p-5 text-white">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Dedicated Developer</h4>
                  <p className="text-sm text-cyan-100">Work directly with the developer building your project.</p>
                </div>

                <div className="bg-gradient-to-br from-cyan-800 to-cyan-900 border border-cyan-700 rounded-xl p-5 text-white">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Easy Data Sharing</h4>
                  <p className="text-sm text-cyan-100">Share all your project information securely with your developer.</p>
                </div>

                <div className="bg-gradient-to-br from-cyan-800 to-cyan-900 border border-cyan-700 rounded-xl p-5 text-white">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Instant Support</h4>
                  <p className="text-sm text-cyan-100">Raise a support ticket anytime for quick and guaranteed resolution.</p>
                </div>

              </div>

              <div className="bg-slate-700 rounded-xl p-5 border border-slate-600">
                <h4 className="text-lg font-bold text-white mb-3">Additional Features You'll Find Useful:</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-200 text-md font-bold">Feature & Update Store</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-200 text-md font-bold">Notifications & Alerts</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-200 text-md font-bold">Payment & Billing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-200 text-md font-bold">Purchase History</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-cyan-800 to-cyan-900 border border-cyan-700 rounded-xl p-6 text-center mt-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Already Customer ?
                </h3>
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-2 bg-white text-cyan-700 px-8 py-3 rounded-lg font-bold text-base hover:bg-slate-100 hover:shadow-lg transition-all"
                >
                  Login To Your Portal
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="section bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-cyan-500 to-cyan-900 text-white text-sm font-bold px-8 py-2 rounded-full">
                GET STARTED
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Ready to Start?
            </h2>
            <p className="text-xl text-slate-600 font-medium">
              Get a free consultation and a detailed proposal.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-cyan-500 via-cyan-700 to-cyan-900 rounded-2xl p-8 sm:p-12 shadow-lg border border-cyan-400">
              {!formSubmitted ? (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-white mb-2">Let's Build Together</h3>
                    <p className="text-cyan-100 text-lg">Fill out the form and we'll be in touch within 24 hours</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full px-5 py-4 rounded-xl bg-white/10 backdrop-blur border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all font-medium" 
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full px-5 py-4 rounded-xl bg-white/10 backdrop-blur border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all font-medium" 
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      className="w-full px-5 py-4 rounded-xl bg-white/10 backdrop-blur border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all md:col-span-2 font-medium" 
                    />
                    <textarea 
                      rows={5} 
                      placeholder="Tell us about your project..." 
                      className="w-full px-5 py-4 rounded-xl bg-white/10 backdrop-blur border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all md:col-span-2 resize-none font-medium" 
                    />
                  </div>
                  
                  <button 
                    onClick={() => setFormSubmitted(true)} 
                    className="bg-white text-cyan-700 px-10 py-5 rounded-xl font-bold text-lg hover:bg-slate-100 hover:shadow-lg transition-all w-full shadow-lg"
                  >
                    Get Free Consultation
                  </button>
                  
                  <p className="text-center text-cyan-100 text-sm">
                    ðŸ”’ Your information is secure and will never be shared
                  </p>
                </div>
              ) : (
                <div className="text-center py-8 animate-fadeIn">
                  <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-12 h-12 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-4xl font-bold mb-4 text-white">Thank you!</h4>
                  <p className="text-xl text-cyan-100 mb-8 font-medium max-w-md mx-auto">
                    We'll contact you within 24 hours with a detailed proposal.
                  </p>
                  <button 
                    onClick={() => setFormSubmitted(false)} 
                    className="text-white hover:text-cyan-100 underline font-semibold text-lg transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <SmartPlanner ref={plannerRef} showHero={false} />
    </div>
  );
};

export default WebSoftwareService;