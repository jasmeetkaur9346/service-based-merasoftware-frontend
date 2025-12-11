import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import director from '../images/director.jpg';

export default function AboutUsPage() {
  const [visible, setVisible] = useState({});

  const sectionRefs = {
    intro: useRef(null),
    story: useRef(null)
  };

  // IntersectionObserver for slide-in animations
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible((prev) => ({ ...prev, [e.target.dataset.section]: true }));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    Object.values(sectionRefs).forEach((ref) => ref.current && io.observe(ref.current));
    return () => Object.values(sectionRefs).forEach((ref) => ref.current && io.unobserve(ref.current));
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">

<div className="relative bg-slate-900 dark:bg-slate-950 py-20 border-b border-slate-700 dark:border-slate-800 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://www.shutterstock.com/image-photo/panorama-shot-analyst-team-utilizing-260nw-2332286999.jpg"
            alt="Technology web background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/80 to-slate-900/80 dark:from-slate-950/95 dark:via-slate-900/80 dark:to-slate-950/80" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 text-sm mb-6">
            <a href="/" className="text-slate-300 hover:text-white transition-colors font-medium flex items-center gap-2 hover:gap-3">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Home
            </a>
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white font-semibold">About Us</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-white leading-tight">
              About Us
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
            padding-top: 5rem; 
            padding-bottom: 5rem; 
          } 
        }
        .divider { 
          height: 1px; 
          background: linear-gradient(90deg, rgba(15,23,42,0.03), rgba(15,23,42,0.08), rgba(15,23,42,0.03)); 
          margin: 0 auto;
          max-width: 90%;
        }
      `}</style>

      {/* Intro */}
      <section ref={sectionRefs.intro} data-section="intro" className="section bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 ">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Image with animation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={visible.intro ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="relative order-1">
              <div className="relative z-10 animate-float">
                <div className="bg-white rounded-2xl shadow-xl p-4 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:shadow-blue-900/20">
                  <img
                    loading="lazy"
                    src="https://www.scnsoft.com/blog-pictures/web-apps/web-application-vs-website-01.png"
                    alt="Web application dashboard"
                    className="rounded-xl w-full"
                  />
                </div>
              </div>
              <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500 to-cyan-900 rounded-3xl opacity-20 blur-2xl -z-10" />
            </motion.div>

            {/* Right - Content with animation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={visible.intro ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8 order-2">
              {/* <div className="inline-block mb-4">
                <span className="bg-gradient-to-br from-cyan-500 to-cyan-900 text-white text-sm font-bold px-8 py-2 rounded-full">
                  About Us
                </span>
              </div> */}

              <div className="space-y-5">
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight dark:text-slate-100">
                  About {' '}
                  <span className="text-blue-500 bg-clip-text dark:text-blue-400">
                    Mera Software
                  </span>
                </h2>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full" />
                </div>
              </div>

              <p className="text-2xl text-slate-800 font-bold leading-relaxed dark:text-slate-100">
               We don't assemble software — we engineer it.
              </p>

              <p className="text-lg text-slate-700 leading-relaxed max-w-xl dark:text-slate-300">
                <strong>We build pure coding-based software</strong> that not only showcases your business but actually works according to its real needs.
                <br/>
                <br/>
                 Tools like WordPress and Shopify make it easy to create software without coding knowledge — But they come with limitations that restrict true automation.
              </p>          

              {/* <div className="flex flex-wrap gap-4 pt-4">
                <div className="inline-flex items-center gap-2 bg-white border border-cyan-200 rounded-xl px-5 py-3 shadow-sm">
                  <span className="text-sm font-bold text-slate-800">No Data Loss</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-white border border-cyan-200 rounded-xl px-5 py-3 shadow-sm">
                  <span className="text-sm font-bold text-slate-800">Traceable Workflow</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-white border border-cyan-200 rounded-xl px-5 py-3 shadow-sm">
                  <span className="text-sm font-bold text-slate-800">Fully Coded Software</span>
                </div>
              </div> */}
            </motion.div>
          </div>


        </div>
      </section>

       <section ref={sectionRefs.story} data-section="story" className="section py-12 lg:py-16 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              The Story Behind Our Start
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              Our journey didn’t start with comfort — It started with a challenge that demanded change
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-16">

            {/* Left - Story Content with animation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={visible.story ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-5">
              <div>
                <h3 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                  We Almost Lost
                </h3>
                <div className="w-24 h-1 bg-cyan-600"></div>
              </div>

              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed hyphens-auto">
                <span className="font-semibold text-slate-900"></span> In 2016, we started IT solutions company focused on security and automation services. Business was running very well until the lockdown hit in 2020.
              </p>
              
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed hyphens-auto">
                With remote operations and no office routine, entire system collapsed, leaving us with two choices — shut down or start with a new method.
              </p>

              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed hyphens-auto">
                We rebuilt our system and automated all manual work which created a massive profit difference.
                </p>

                <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold leading-relaxed">Now we help other businesses avoid the same struggle.</p>
                 <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">From crisis to growth</span>
                </div>
              </div>

               {/* <div className="relative !mt-10">
                <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500 to-cyan-900 rounded-2xl opacity-10 blur-xl" />
                <div className="relative bg-gradient-to-br from-cyan-50 via-slate-50 to-cyan-50 rounded-2xl px-6 py-6 border-l-4 border-cyan-600 shadow-lg">
                  <p className="text-lg leading-relaxed text-slate-700 ">
                   That became our mission — to bring affordable automation to every small business so they can grow with the times.
                  </p>
                </div>
              </div> */}

              <div className="lg:hidden relative mt-6">
                <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format"
                    alt="Development Portal Dashboard"
                    className="w-full dark:opacity-80"
                  />
                </div>
                <div className="absolute -top-3 -right-3 bg-cyan-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-bold">
                  24/7 Access
                </div>
              </div>

              {/* <div className="pt-4 hidden lg:block">
                <h3 className="text-3xl font-bold text-slate-900 mb-3">
                  Why Cloud-Based is Better
                </h3>
                <div className="w-16 h-1 bg-cyan-600"></div>
              </div> */}
            </motion.div>

            {/* Right - Image with animation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={visible.story ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block">
              <div className="sticky top-8">
                <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format"
                    alt="Development Portal Dashboard"
                    className="w-full dark:opacity-80"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-lg shadow-lg px-3 py-2 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-600 rounded-full animate-pulse"></div>
                      <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">Live Updates</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-cyan-600 text-white px-4 py-2 rounded-lg shadow-lg">
                    <div className="text-lg font-black">24/7</div>
                    <div className="text-xs">Portal Access</div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

           {/* Director Section with animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible.story ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-3 ml-10">
                <div className="relative h-full min-h-[400px] flex items-center justify-center p-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-600 rounded-2xl rotate-3" />
                    <div className="relative w-[250px] h-[300px] bg-white rounded-2xl overflow-hidden shadow-xl">
                      <img
                        loading="lazy"
                        src={director}
                        alt="Director portrait"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-9 p-8 lg:p-12">
                <div className="h-full flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-1 h-10 bg-blue-600 rounded-full" />
                    <h4 className="text-2xl font-bold dark:text-slate-100">Director message</h4>
                  </div>
                  <div className="space-y-6">
                    <p className="text-xl leading-relaxed dark:text-slate-300">
                      At Mera Software, your service and satisfaction are our priority. To ensure you receive the attention you deserve, we built a special portal where you can connect in real time and access your developer directly.
                    </p>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl px-4 py-8  border-l-4 border-blue-600">
                      <p className="text-xl italic leading-relaxed dark:text-slate-300">
                        We take time to understand your specific needs and deliver solutions that fit your budget. Professional automation should feel simple and valuable, that is our commitment to you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

            {/* bridge section */}
           {/* <div className="mt-16 flex justify-center">
            <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 max-w-5xl text-center">
            <p className="text-lg font-semibold text-slate-800 flex items-center justify-center gap-1.5">
        See what fits your business and what it costs — with our <span className="text-cyan-600 font-semibold">Project Planner</span> below.
             </p>
            </div>
          </div> */}

        </div>
      </section>

      <div className="divider" />

      {/* Our Mission Section */}
      <section className="section bg-blue-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="text-center mb-16">

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Our Mission
            </h2>
            {/* <p className="text-xl text-slate-600 leading-relaxed">
              Empower Every Business to Automate
            </p> */}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left - Mission Content */}
            <div
              className="relative order-2 lg:order-1">
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-3xl opacity-20 blur-2xl" />
              <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 lg:p-10 border border-slate-200 dark:border-slate-800">
                <div className="space-y-5">
                  <p className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                    Empower Every Business <br/> to Automate
                  </p>

                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full" />

                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed hyphens-auto">
                    Our goal is to introduce every business to how software automation replaces manual work and drives growth.
                  </p>

                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed hyphens-auto">
                   We have watched businesses transform after implementing automation, and seeing that change is our greatest satisfaction.
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Mission Image */}
            <div
              className="relative order-1 lg:order-2">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl opacity-20 blur-2xl" />
              <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-3 border border-slate-200 dark:border-slate-800">
                <img
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&auto=format"
                  alt="Team collaboration and mission"
                  className="rounded-xl w-full h-[350px] object-cover dark:opacity-80"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Because we've walked the same path and know exactly what works
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-10">

            {/* Card 1 */}
            <div
              className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-sm hover:shadow-md dark:shadow-blue-900/20">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                We Get It
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Messy workflows, endless follow-ups, and wasted hours — we've been there. That's why we build tools that actually make your life easier.
              </p>
            </div>

            {/* Card 2 */}
            <div
              className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-sm hover:shadow-md dark:shadow-blue-900/20">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                Built Just for You
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                No cookie-cutter templates here. We write custom code that fits your business perfectly — because one size never fits all.
              </p>
            </div>

            {/* Card 3 */}
            <div
              className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-sm hover:shadow-md dark:shadow-blue-900/20">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                Always in the Loop
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Chat directly with your developer through our portal. See what's happening, when it's happening — no surprises, just progress.
              </p>
            </div>

            {/* Card 4 */}
            <div
              className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-sm hover:shadow-md dark:shadow-blue-900/20">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                Budget-Friendly, Always
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Great software doesn't need a big budget. We work with small businesses and make sure the price fits your reality.
              </p>
            </div>

          </div>

          {/* Bottom highlight box */}
          <div
            className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 rounded-xl opacity-10 blur-xl" />
            <div className="relative bg-white dark:bg-slate-900 rounded-xl p-6 lg:p-8 border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-blue-900/20">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    We Make Things Simple
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Our clients tell us the best part isn't just the software — it's the peace of mind that comes with it. Less chaos, more control.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Our Network Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our Network
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              We're part of a family of specialized companies, each focused on delivering excellence in their field
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Website Development */}
            <a
              href="/website-development-service"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-cyan-600 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&h=400&fit=crop&auto=format"
                  alt="Website Development"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    Website Development
                  </h3>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Custom websites and web portals built from scratch to match your exact requirements
                </p>
                {/* <div className="mt-4 flex items-center text-cyan-400 font-semibold">
                  <span>Visit Codeonwork</span>
                  <svg className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div> */}
              </div>
            </a>

            {/* Digital Marketing */}
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20"
            >
              <div className="aspect-video bg-gradient-to-br from-cyan-500 to-blue-600 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format"
                  alt="Digital Marketing"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    Digital Marketing
                  </h3>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Strategic campaigns and growth solutions to expand your online presence
                </p>
                {/* <div className="mt-4 flex items-center text-blue-400 font-semibold">
                  <span>Visit VA Computers</span>
                  <svg className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div> */}
              </div>
            </a>

            {/* IT Solutions */}
            <a
              href="https://www.3gdigital.net"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-cyan-500 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=400&fit=crop&auto=format"
                  alt="IT Solutions"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    IT Solutions
                  </h3>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Complete IT infrastructure, security systems, and automation services
                </p>
                {/* <div className="mt-4 flex items-center text-cyan-400 font-semibold">
                  <span>Visit 3G Digital</span>
                  <svg className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div> */}
              </div>
            </a>

          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-400 text-lg">
              Each company operates independently, bringing specialized expertise to serve you better
            </p>
          </div>

        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 lg:py-20 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">

          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              We've helped businesses like yours go from chaos to clarity. Let's see what we can build together.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-105"
            >
              <span>Let's Talk</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            <a
              href="/services"
              className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-xl font-semibold border-2 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            >
              <span>Explore Services</span>
            </a>
          </div>

          <div className="mt-10 pt-10 border-t border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Have questions? We're here to help — no pressure, just honest conversations.
            </p>
          </div>

        </div>
      </section>


      {/* 2. Our Story */}
      {/* <section className="py-14 lg:py-18">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6">
            <img
              src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1400&auto=format&fit=crop"
              alt="Empty office during lockdown"
              className="w-full h-72 object-cover rounded-xl shadow-md ring-1 ring-slate-100"
              loading="lazy"
            />
          </div>
          <div className="lg:col-span-6">
            <h2 className="text-2xl font-bold">Our story</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              We began in 2016 as an IT solutions team providing CCTV, alarm systems, fire hydrants, parking management, and office plus home automation.
              Client trust and a strong team kept growth steady until lockdown disrupted everything. Calls replaced coordination, attendance was uncertain, and productivity fell.
              The system itself became the problem.
            </p>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Being from the automation field we built a CRM based project management system to train, track, and empower the team we already had.
              In weeks the change was visible. In months productivity crossed pre lockdown levels.
            </p>
          </div>
        </div>
      </section> */}


      {/* 3. Our Breakthrough */}
      {/* <section className="mb-10 py-2 bg-white">
        <div className="max-w-6xl mx-auto px-6 ">
          <div className="">
            <h2 className="text-2xl font-bold">Our breakthrough</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Communication became smooth, reports turned automatic, and ownership became measurable.
              The founder no longer lived on constant calls. Even when away there was real time visibility of work in progress.
              Stress went down and freedom went up.
            </p>
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
                <p className="font-semibold">Clarity of work</p>
                <p className="mt-1 text-sm text-slate-600">Every task visible with clear ownership</p>
              </div>
              <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
                <p className="font-semibold">Reliable reporting</p>
                <p className="mt-1 text-sm text-slate-600">Automatic updates and timely summaries</p>
              </div>
              <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
                <p className="font-semibold">Faster onboarding</p>
                <p className="mt-1 text-sm text-slate-600">Teams trained in weeks not months</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1400&auto=format&fit=crop"
              alt="Team collaboration and planning"
              className="w-full h-72 object-cover rounded-xl shadow-md ring-1 ring-slate-100"
              loading="lazy"
            />
          </div>
        </div>
      </section> */}

      {/* 4. Our Vision */}
      {/* <section className="py-14 lg:py-18">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xl font-bold">A vision beyond one company</h3>
            <p className="mt-3 text-slate-600 leading-relaxed">
              After a year of internal use we realized it was more than software. It was a transformation.
              In 2022 we launched our software development division to bring the same results to other businesses.
              We began with local owners in Amritsar and saw the same pattern repeat. Less stress. More structure. Stronger growth.
            </p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xl font-bold">Our belief and mission</h3>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Change can feel uncomfortable. The right system removes friction instead of adding work.
              We want practical automation for every growing business so owners spend less time managing and more time creating and expanding.
            </p>
          </div>
        </div>
      </section> */}

      {/* 5. Our Ecosystem and CTA */}
      {/* <section className="py-14 lg:py-18 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white">Our ecosystem</h2>
          <p className="mt-2 text-slate-300">Explore the network that supports our clients.</p>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Main IT Solutions",
                url: "https://www.3gdigital.net",
                img: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1200&auto=format&fit=crop",
                desc: "Security, automation, and infrastructure"
              },
              {
                title: "Website Development",
                url: "https://codeonwork.com",
                img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
                desc: "Websites and custom portals"
              },
              {
                title: "Digital Marketing",
                url: "https://vacomputers.com",
                img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
                desc: "Growth strategy and campaigns"
              }
            ].map(card => (
              <a
                key={card.title}
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 hover:bg-slate-700 transition"
                title={card.title}
              >
                <img src={card.img} alt={card.title} className="w-full h-40 object-cover" loading="lazy" />
                <div className="p-5">
                  <p className="font-semibold text-white group-hover:text-cyan-200 transition">{card.title}</p>
                  <p className="mt-1 text-sm text-slate-300">{card.desc}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 p-8 ring-1 ring-cyan-200 shadow-md">
            <h3 className="text-2xl font-bold text-white">Ready to make operations feel light</h3>
            <p className="mt-2 text-cyan-50">
              Take a short break from the busy routine and see how a better system removes friction.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-white text-cyan-800 px-5 py-2.5 font-semibold ring-1 ring-white/60 hover:bg-cyan-50 transition"
              >
                Book a demo
              </a>
              <a
                href="/about-short"
                className="inline-flex items-center justify-center rounded-xl bg-cyan-700 text-white px-5 py-2.5 font-semibold ring-1 ring-white/60 hover:bg-cyan-800 transition"
              >
                Read a short version
              </a>
            </div>
          </div>
        </div>
      </section> */}

      <div className="h-6" />
    </main>
  );
}
