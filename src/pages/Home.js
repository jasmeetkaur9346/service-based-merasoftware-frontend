import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, TrendingUp, UserCheck, HelpCircle, Download, CheckCircle2, MessageSquare, IndianRupee, Globe, Globe2 } from "lucide-react";
import { motion } from "framer-motion";
import { CgWebsite } from "react-icons/cg";
import { useAuth } from "../context/AuthContext";
import director from "../images/director.jpg"

// NOTE: TailwindCSS required. Framer Motion used for subtle reveals.
// Single <h1> for SEO, the rest are h2/h3.

const Homepage = () => {
  const [visible, setVisible] = useState({});
  const [formStatus, setFormStatus] = useState("idle"); // idle | submitting | success | error
  const { user, customerPortalUrl } = useAuth();
  const isAuthenticated = Boolean(user?._id);

  const sectionRefs = {
    hero: useRef(null),
    calculator: useRef(null),
    services: useRef(null),
    portal: useRef(null),
    reviews: useRef(null),
    about: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible((prev) => ({ ...prev, [e.target.dataset.section]: true }));
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    Object.values(sectionRefs).forEach((ref) => ref.current && io.observe(ref.current));
    return () => Object.values(sectionRefs).forEach((ref) => ref.current && io.unobserve(ref.current));
  }, []);


  const onSubmit = (e) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate request
    setTimeout(() => {
      setFormStatus("success");
      e.target.reset();
    }, 900);
  };

  const handleAccessPortal = () => {
    if (isAuthenticated) {
      const target = customerPortalUrl || "/";
      if (target.startsWith("http")) {
        window.open(target, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = target;
      }
      return;
    }

    window.dispatchEvent(new Event("client-portal:open-login"));
  };

  const handleShareExperience = () => {
    if (isAuthenticated) {
      window.alert("Thanks! This feature is coming soon.");
      return;
    }

    window.dispatchEvent(new Event("client-portal:open-login"));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Hero Section */}
      <section ref={sectionRefs.hero} data-section="hero" className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-900/30" />
          <div className="absolute -left-16 bottom-0 w-72 h-72 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-900/30" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={visible.hero ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-4 sm:space-y-8"
            >
              <div className="inline-block mb-3">
                <span className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-xs sm:text-sm font-bold px-4 sm:px-8 py-1.5 sm:py-2 rounded-full">
                  A system for growing startups
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight dark:text-white">
                  Custom Software Development for <span className="text-blue-600 dark:!text-cyan-500">Startups</span>
                </h1>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
              </div>

              <p className="text-base sm:text-base sm:text-xl text-slate-600 max-w-xl dark:text-slate-300">
                Build your next software with us and scale it endlessly as your business grows.
              </p>

              <div className="lg:hidden">
                <div className="relative z-10">
                  <div className="bg-white rounded-2xl shadow-xl p-3 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                    <img
                      loading="lazy"
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop&auto=format"
                      alt="Digital business dashboard"
                      className="rounded-xl w-full"
                    />
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl shadow-lg p-3 sm:p-4 w-full max-w-[180px] sm:max-w-[220px]">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center dark:bg-slate-900/20">
                          <IndianRupee className="w-4 h-4 sm:w-6 sm:h-6 dark:text-cyan-100" strokeWidth={2.5} />
                        </div>
                        <div className="text-white">
                          <div className="text-lg sm:text-xl font-bold">Free</div>
                          <div className="text-xs sm:text-sm font-medium">Project Estimate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 sm:pt-8">
                <div className="inline-block w-full sm:w-auto">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-5 bg-white/80 backdrop-blur rounded-2xl px-5 sm:px-8 py-4 border border-slate-200 shadow-lg dark:bg-slate-800/60 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:!text-cyan-500" />
                      <span className="text-slate-700 text-base font-medium dark:text-slate-200">Already a Client?</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleAccessPortal}
                      className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white w-full sm:w-auto px-5 sm:px-6 py-2.5 rounded-full font-semibold text-base shadow-md hover:shadow-lg transition-all"
                    >
                      Access Portal
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2 sm:pt-6 grid grid-cols-3 gap-2 sm:gap-4 max-w-xl">
                {[
                  { icon: <Globe2 className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-600 dark:text-cyan-400" />, t: "Portal", s: "Access", color: "cyan" },
                  { icon: <UserCheck className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-600 dark:text-cyan-400" />, t: "Dedicated", s: "Developer", color: "cyan" },
                  { icon: <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-600 dark:text-cyan-400" />, t: "Full Control", s: "Code Ownership", color: "cyan" }
                ].map((k) => (
                  <div key={k.t} className="bg-white rounded-xl p-2.5 sm:p-4 shadow-lg border border-slate-200 hover:shadow-xl transition-all group dark:bg-slate-800/60 dark:border-slate-700">
                    <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-1.5 sm:gap-3">
                      <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-${k.color}-50 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform dark:bg-slate-700`}>
                        {k.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">{k.t}</div>
                        <div className="text-[10px] sm:text-xs text-slate-600 mt-0.5 dark:text-slate-300">{k.s}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={visible.hero ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10">
                <div className="bg-white rounded-xl shadow-2xl p-3 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                  <img
                    loading="lazy"
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop&auto=format"
                    alt="Digital business dashboard"
                    className="rounded-xl w-full"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 z-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl shadow-2xl p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center dark:bg-slate-900/20">
                      <IndianRupee className="w-6 h-6 dark:text-cyan-100 " strokeWidth={2.5} />
                    </div>
                    <div className="text-white">
                      <div className="text-xl sm:text-2xl font-bold">Free</div>
                      <div className="text-sm font-medium">Project Estimate</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-8 -right-8 z-30">
                <div className="bg-white rounded-xl shadow-xl p-2 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                  <img
                    loading="lazy"
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=320&h=220&fit=crop&auto=format"
                    alt="Analytics charts"
                    className="rounded-xl w-32 h-24 object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Planner Section */}
      <section id="calculator" ref={sectionRefs.calculator} data-section="calculator" className="py-14 sm:py-20 lg:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16 lg:mb-20">
            <div className="inline-block mb-3 sm:mb-6">
              <span className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-xs sm:text-sm font-bold px-4 sm:px-8 py-1.5 sm:py-2 rounded-full">
                Interactive Project Planner
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 leading-tight dark:text-white">
              We Understand the Challenges
            </h2>
            <p className="text-base sm:text-xl text-blue-600 font-bold dark:text-cyan-500">
              It's never easy to manage expenses in a startup
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 sm:gap-14 lg:gap-20 items-center">
            <div className="space-y-5 sm:space-y-8">
              <div>
                <h3 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 leading-snug sm:leading-tight text-slate-900 dark:text-white">
                  <span className="sm:hidden">The biggest cost usually comes from software development</span>
                  <span className="hidden sm:block">
                    The biggest cost
                    <br /> usually comes from
                    <br /> software development
                  </span>
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
              </div>

              <p className="block dark:hidden text-base sm:text-xl font-bold text-blue-600 leading-snug">
                Know your budget before you start
              </p>
              <p className="hidden dark:block text-base sm:text-xl font-bold !text-cyan-500 leading-snug">
                Know your budget before you start
              </p>

              <div className="lg:hidden">
                <div className="mt-4 sm:mt-6 relative">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                    <img
                      loading="lazy"
                      src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&h=600&fit=crop&auto=format"
                      alt="Price calculator preview"
                      className="w-full"
                    />
                  </div>
                  <div className="absolute -top-4 right-4 bg-white rounded-xl shadow-lg p-3 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center border border-cyan-100 dark:bg-slate-700 dark:border-slate-600">
                        <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-600 font-semibold dark:text-slate-100">30 seconds</div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">Instant quote</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 sm:p-6 md:p-8 border-l-4 border-blue-600 shadow-sm dark:from-slate-800 dark:to-slate-800 dark:border-cyan-500">
                <p className="text-sm sm:text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Use our interactive <span className="font-bold text-blue-600 dark:!text-cyan-500">Project Planner</span> absolutely free
                </p>
              </div>

              <div className="space-y-3 sm:space-y-5 pt-1 sm:pt-2">
                <p className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                  A simple 3-step process from idea to project
                </p>
                {[
                  (<>
                    Choose your <span className="text-blue-700 dark:text-cyan-400 font-semibold">Service Type</span> below
                  </>),
                  (<>
                    Click <span className="text-blue-700 dark:text-cyan-400 font-semibold">Get Price Estimate</span> on the service page
                  </>),
                  (<>
                    After you decide to start, you get your <span className="text-blue-700 dark:text-cyan-400 font-semibold">Dedicated Portal</span>
                  </>),
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-2 sm:gap-4 group cursor-default">
                    <div className="w-8 h-8 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl text-white flex items-center justify-center flex-shrink-0 font-bold text-sm sm:text-lg shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all">
                      {i + 1}
                    </div>
                    <span className="text-xs sm:text-base md:text-lg font-medium pt-1 sm:pt-2 text-slate-700 leading-relaxed dark:text-slate-300">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl opacity-15 blur-2xl" />
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                <img
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&h=600&fit=crop&auto=format"
                  alt="Price calculator preview"
                  className="w-full"
                />
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 border border-slate-200 z-10 dark:bg-slate-800 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-cyan-50 rounded-xl flex items-center justify-center border border-cyan-100 dark:bg-slate-700 dark:border-slate-600">
                    <CheckCircle2 className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-600 font-semibold dark:text-slate-100">30 seconds</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">Instant quote</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl shadow-2xl p-6 z-10 text-center text-white min-w-[140px]">
                <div className="text-2xl font-black">100% Free</div>
                <div className="text-xs text-cyan-50 font-semibold mt-1.5">No obligations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={sectionRefs.services} data-section="services" className="py-14 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-3 text-slate-900 leading-tight dark:text-white">Choose your service type</h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto dark:text-slate-300">Select the solution that fits your business needs</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:gap-8 relative">
              {/* Left */}
              <Link to="/website-development-service" className="group block">
                <div className="relative bg-gradient-to-br from-blue-50/80 to-white rounded-2xl px-4 sm:px-6 py-5 sm:py-10 text-center shadow-lg border border-slate-200 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 h-full dark:from-slate-800 dark:to-slate-800 dark:border-slate-700 dark:hover:border-slate-600">
                  <div className="absolute inset-0 rounded-2xl transition-all group-hover:bg-blue-600/5" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="relative mb-5 sm:mb-8">
                      <div className="absolute inset-0 bg-blue-600 rounded-2xl blur-3xl opacity-15 group-hover:opacity-25 transition-opacity" />
                      <div className="relative w-14 h-14 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
                        <CgWebsite className="w-7 h-7 sm:w-12 sm:h-12 text-white" />
                      </div>
                    </div>
                    <h3 className="text-base sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-slate-900 group-hover:text-blue-600 transition-colors dark:text-white">
                      Dynamic web applications
                    </h3>
                    <p className="hidden sm:block text-xs sm:text-sm md:text-base text-slate-600 mb-5 sm:mb-8 max-w-xs sm:max-w-md leading-relaxed dark:text-slate-300">
                      Custom portals, interactive platforms, ecommerce, blogs, online booking
                    </p>
                    <div className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 text-blue-600 font-semibold text-xs sm:text-sm group-hover:gap-3 transition-all">
                      <span>Explore service</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Right */}
              <Link to="/cloud-software-service" className="group block">
                <div className="relative bg-gradient-to-br from-cyan-50/80 to-white rounded-2xl px-4 sm:px-6 py-5 sm:py-10 text-center shadow-lg border border-slate-200 hover:shadow-2xl hover:border-cyan-200 transition-all duration-300 h-full dark:from-slate-800 dark:to-slate-800 dark:border-slate-700 dark:hover:border-slate-600">
                  <div className="absolute inset-0 rounded-2xl transition-all group-hover:bg-cyan-600/5" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="relative mb-5 sm:mb-8">
                      <div className="absolute inset-0 bg-cyan-500 rounded-2xl blur-3xl opacity-15 group-hover:opacity-25 transition-opacity" />
                      <div className="relative w-14 h-14 sm:w-24 sm:h-24 bg-gradient-to-br from-cyan-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
                        <svg className="w-7 h-7 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-10 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-base sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-slate-900 group-hover:text-cyan-600 transition-colors dark:text-white">
                      Cloud-based software
                    </h3>
                    <p className="hidden sm:block text-xs sm:text-sm md:text-base text-slate-600 mb-5 sm:mb-8 max-w-xs sm:max-w-md leading-relaxed dark:text-slate-300">
                      CRM, CMS, LMS, inventory management, staff management
                    </p>
                    <div className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 text-cyan-600 font-semibold text-xs sm:text-sm group-hover:gap-3 transition-all">
                      <span>Explore service</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Client Portal Section */}
      <section ref={sectionRefs.portal} data-section="portal" className="py-16 sm:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Heading + sub */}
          <div className="text-center">
            <div className="inline-block mb-3 sm:mb-6">
              <span className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-xs sm:text-sm font-bold px-5 sm:px-8 py-1.5 sm:py-2 rounded-full">
                Dedicated Client Portal
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              You'll always stay informed and involved
            </h2>
            <p className="mt-2 text-sm sm:text-lg md:text-xl text-slate-200 max-w-2xl mx-auto">
              A dedicated portal keeps you informed and connected throughout development
            </p>
          </div>

          {/* Balanced two column layout: denser left visuals, crisper right copy */}
          <div className="mt-10 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* LEFT VISUALS (denser, never looks empty) */}
            <div className="relative">
              <div className="hidden sm:block absolute -inset-4 bg-gradient-to-r from-cyan-500/30 to-cyan-400/30 rounded-3xl blur-2xl" />

              {/* Main portal mock */}
              <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden min-h-[220px] sm:min-h-[320px] dark:bg-slate-800 dark:border-slate-700">
                <img
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&auto=format"
                  alt="Portal dashboard preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay 1: progress chip */}
              <div className="hidden sm:flex absolute -top-5 -right-5 bg-white rounded-xl shadow-lg border border-slate-200 px-4 py-3 items-center gap-3 dark:bg-slate-800 dark:border-slate-700">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-slate-800 dark:text-white">Milestone updated</div>
                  <div className="text-slate-500 dark:text-slate-400">Design handoff complete</div>
                </div>
              </div>

              {/* Overlay 2: chat mini card */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl border border-slate-200 w-[260px] p-4 dark:bg-slate-800 dark:border-slate-700">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-100 dark:bg-cyan-500/20 flex items-center justify-center">
                    <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-cyan-400" />
                  </div>
                  <div className="flex-1 text-sm">
                    <div className="font-semibold text-slate-800 dark:text-white">Direct access</div>
                    <p className="text-slate-500 dark:text-slate-400 leading-snug">Chat with your developer and share files in one place</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT (trimmed to essentials) */}
            <div className="space-y-5 sm:space-y-8">
              <div className="mb-3 sm:mb-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">What the portal gives you</h3>
                <div className="mt-2 w-20 sm:w-24 h-1 bg-cyan-500 rounded-full" />
              </div>

              {/* Three concise feature cards */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4 sm:p-5 hover:border-slate-600 transition-colors">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base text-white font-semibold">Direct developer access</div>
                      <p className="text-slate-300 text-xs sm:text-sm mt-1">No layers, faster responses, organised files</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4 sm:p-5 hover:border-slate-600 transition-colors">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base text-white font-semibold">Live progress tracking</div>
                      <p className="text-slate-300 text-xs sm:text-sm mt-1">See what is being built and when</p>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2 bg-slate-800/40 border border-slate-700 rounded-xl p-4 sm:p-5 hover:border-slate-600 transition-colors">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base text-white font-semibold">Requests and support</div>
                      <p className="text-slate-300 text-xs sm:text-sm mt-1">Raise issues, request changes, and track resolutions</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Small reassurance row */}
              <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-300">
                <div className="inline-flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  Real time updates
                </div>
                <div className="inline-flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  Centralised files
                </div>
                <div className="inline-flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  24/7 access
                </div>
              </div>

               <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-4 sm:gap-6 mt-3 sm:mt-4">
                <a href="#calculator" className="group relative inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-slate-800/40 border border-slate-700 text-sm sm:text-base text-white px-5 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
                  Read How It Works
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                </a>
                <button type="button" className="group relative inline-flex w-full sm:w-auto justify-center items-center gap-2 font-semibold text-sm sm:text-base text-white hover:shadow-xl transition-all hidden sm:flex">
                  Access Your Portal
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={sectionRefs.reviews} data-section="reviews" className="bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-4 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block mb-4 sm:mb-6">
              <span className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-xs sm:text-sm font-bold px-5 sm:px-8 py-1.5 sm:py-2 rounded-full">
                Client Testimonials
              </span>
            </div>
            <h2 className="text-4xl font-bold mb-3 dark:text-white">Client reviews</h2>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl font-bold dark:text-white">4.9</span>
              <div className="flex gap-0.5" aria-label="rating stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-500 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400">47 verified reviews</span>
            </div>
          </div>

          <div className="relative overflow-hidden mb-8">
            <div className="review-slider flex gap-6 animate-slide">
              {[
                { n: "Rajesh Kumar", by: "CEO, TechStart", t: "Outstanding service. Team delivered beyond expectations. Highly professional and responsive." },
                { n: "Priya Sharma", by: "Founder, DesignHub", t: "They understood our vision perfectly and executed with care. Strongly recommended." },
                { n: "Amit Patel", by: "Manager, WebCorp", t: "Quality and speed were impressive. Attention to detail was remarkable." },
                { n: "Sneha Kapoor", by: "Director, InnovateLabs", t: "Project finished on time and exceeded expectations. Very skilled team." },
                { n: "Vikram Gupta", by: "CTO, DataFlow", t: "Smooth collaboration with clear communication and technical depth." },
              ].map((r, idx) => (
                <div key={idx} className="min-w-[300px] sm:min-w-[350px] bg-white rounded-xl p-6 shadow-lg border border-slate-200 flex-shrink-0 dark:bg-slate-800 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {r.n.split(" ").map((p) => p[0]).join("")}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold dark:text-white">{r.n}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{r.by}</p>
                    </div>
                    <span className="text-xs text-slate-400 dark:text-slate-500">recent</span>
                  </div>
                  <div className="flex gap-0.5 mb-3">
            <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
                  <p className="text-slate-600 text-sm leading-relaxed dark:text-slate-300">{r.t}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              type="button"
              onClick={handleShareExperience}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <MessageSquare className="w-5 h-5" /> Share your experience
            </button>
            {/* <a href="#all-reviews" className="font-semibold text-blue-600 hover:text-cyan-600 transition-colors">
              View all reviews →
            </a> */}
          </div>
        </div>

        {/* CSS Animation just for this component */}
        <style>{`
          @keyframes slide { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-356px * 5)); } }
          .animate-slide { animation: slide 30s linear infinite; }
          .review-slider:hover { animation-play-state: paused; }
        `}</style>
      </section>

      {/* About Us Section */}
      <section ref={sectionRefs.about} data-section="about" className="py-14 sm:py-20 bg-white relative overflow-hidden dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-10 sm:mb-12 text-center">
            <div className="inline-block mb-4 sm:mb-6">
              <span className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-xs sm:text-sm font-bold px-5 sm:px-8 py-1.5 sm:py-2 rounded-full">
                About Us
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 uppercase dark:text-white">The story behind</h2>
            <p className="text-lg sm:text-2xl lg:text-3xl text-blue-600 font-bold uppercase dark:!text-cyan-500">Mera Software</p>
          </div>

          <div className="mb-12 sm:mb-20 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <div className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-wide">
                <div className="block w-full rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 text-center bg-blue-50 text-blue-600 border border-transparent transition-colors dark:!bg-cyan-500/20 dark:!text-cyan-300 dark:border-cyan-300">
                  Why we build this?
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 tracking-tight dark:text-white">We almost <span className="text-blue-600 dark:!text-cyan-500">lost it all</span>!</h3>
              <div className="space-y-4 sm:space-y-5">
                <p className="text-base sm:text-lg leading-relaxed dark:text-slate-200">
                  <span className="font-semibold">Our business nearly died during lockdown.</span> We rebuilt our system and automated all manual work which created a massive profit difference.
                </p>
                <p className="text-base sm:text-lg text-blue-600 font-semibold leading-relaxed dark:!text-cyan-500">Now we help other businesses avoid the same struggle.</p>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <Link
                  to="/about-us#story"
                  className="group inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Read full story
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="relative hidden sm:block">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1000&h=700&fit=crop"
                  alt="Business transformation"
                  className="w-full h-[240px] sm:h-[360px] lg:h-[260px] sm:h-[340px] lg:h-[400px] object-cover"
                />
                {/* <div className="absolute top-6 left-6 bg-white rounded-xl px-4 py-2 shadow-lg dark:bg-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm font-semibold dark:text-slate-200">Real story</span>
                  </div>
                </div> */}
              </div>
              <div className="hidden sm:block absolute -bottom-4 -right-4 w-32 h-32 bg-blue-100 rounded-2xl -z-10 dark:bg-cyan-900/40" />
              <div className="hidden sm:block absolute -top-4 -left-4 w-24 h-24 bg-orange-100 rounded-full -z-10 dark:bg-orange-900/40" />
            </div>
          </div>

          {/* Director */}
          <div className="bg-white rounded-2xl overflow-hidden dark:bg-slate-900">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-3 ml-0 lg:ml-10">
                <div className="relative h-full min-h-[260px] sm:min-h-[360px] flex items-center justify-center p-6 sm:p-8">
                  <div className="relative">
                    <div className="hidden sm:block absolute inset-0 bg-blue-600 dark:bg-cyan-500 rounded-2xl rotate-3" />
                    <div className="relative w-[200px] h-[260px] sm:w-[250px] sm:h-[300px] bg-white rounded-2xl overflow-hidden shadow-xl dark:bg-slate-800">
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

              <div className="lg:col-span-9 p-6 sm:p-8 lg:p-12">
                <div className="h-full flex flex-col justify-center">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-1 h-10 bg-blue-600 dark:bg-cyan-500 rounded-full" />
                    <h4 className="text-xl sm:text-2xl font-bold dark:text-white">Director message</h4>
                  </div>
                  <div className="space-y-5 sm:space-y-6">
                    <p className="text-base sm:text-lg leading-relaxed dark:text-slate-200">
                      At Mera Software, your service and satisfaction are our priority. To ensure you receive the attention you deserve, we built a special portal where you can connect in real time and access your developer directly.
                    </p>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl px-4 py-6 sm:py-8 border-l-4 border-blue-600 dark:from-slate-800 dark:to-slate-800 dark:border-cyan-500">
                      <p className="text-base sm:text-lg italic leading-relaxed dark:text-slate-200">
                        We take time to understand your specific needs and deliver solutions that fit your budget. Professional automation should feel simple and valuable, that is our commitment to you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={sectionRefs.contact} data-section="contact" className="py-14 sm:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-block mb-4 sm:mb-6">
              <span className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-xs sm:text-sm font-bold px-5 sm:px-8 py-1.5 sm:py-2 rounded-full">
                Get in touch
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-3 dark:text-white">Let us build something amazing</h2>
            <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto dark:text-slate-300">Ready to transform your business with modern software</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:bg-slate-900 dark:border-slate-700">
              {formStatus === "success" ? (
                <div className="text-center py-12 sm:py-16">
                  <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 dark:bg-emerald-900/30">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 dark:text-white">Message sent</h3>
                  <p className="text-slate-600 dark:text-slate-300">We will reach out within twenty four hours</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Full Name *</label>
                      <input required type="text" placeholder="Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:bg-slate-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                      <input required type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:bg-slate-900" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email Address *</label>
                    <input required type="email" placeholder="Email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:bg-slate-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Service interested in</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:focus:bg-slate-900">
                      <option value="">Select a service</option>
                      <option value="web">Web Application Development</option>
                      <option value="consultation">Cloud Software Solutions</option>
                    </select>
                  </div>
                  {/* <div>
                    <label className="block text-sm font-semibold mb-2">Project details *</label>
                    <textarea required rows="4" placeholder="Tell us about your project requirements" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all resize-none dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:bg-slate-900" />
                  </div> */}
                  <button disabled={formStatus === "submitting"} className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                    {formStatus === "submitting" ? (
                      <span className="animate-pulse">Sending…</span>
                    ) : (
                      <>
                        {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg> */}
                        Send message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map and quick contacts */}
            <div className="space-y-5 sm:space-y-6">
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-[260px] sm:h-[340px] lg:h-[400px] dark:bg-slate-900 dark:border-slate-700">
                <iframe
                  title="Office location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.1234567890!2d75.8573!3d30.9010!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDU0JzAzLjYiTiA3NcKwNTEnMjYuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h4 className="font-bold mb-1">Call us</h4>
                  <p className="text-sm text-slate-600">+91 98765 43210</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0z" />
                    </svg>
                  </div>
                  <h4 className="font-bold mb-1">Mail us</h4>
                  <p className="text-sm text-slate-600">hello@merasoftware.com</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;