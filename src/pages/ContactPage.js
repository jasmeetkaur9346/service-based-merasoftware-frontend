import React, { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";

const INPUT_BASE_CLASSES =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-slate-700 placeholder:text-slate-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all";

const LABEL_STYLES = "block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 sm:mb-2";

const COUNTRY_OPTIONS = [
  { value: "IND", shortLabel: "IND", dialCode: "+91", flag: "🇮🇳" },
  { value: "USA", shortLabel: "USA", dialCode: "+1", flag: "🇺🇸" },
  { value: "AUS", shortLabel: "AUS", dialCode: "+61", flag: "🇦🇺" },
  { value: "CAN", shortLabel: "CAN", dialCode: "+1", flag: "🇨🇦" },
];

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState("idle");
  const [formError, setFormError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_OPTIONS[0].value);

  const selectedCountryOption = COUNTRY_OPTIONS.find((country) => country.value === selectedCountry) ?? COUNTRY_OPTIONS[0];
  const selectedDialCode = selectedCountryOption.dialCode;

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return false;
    const fakeEmails = ['test@gmail.com', 'example@gmail.com', 'test@test.com', 'fake@gmail.com', 'demo@gmail.com', 'sample@gmail.com'];
    if (fakeEmails.includes(email.toLowerCase())) return false;
    return true;
  };

  const handleEmailBlur = (e) => {
    const email = e.target.value.trim();
    if (!email) {
      setEmailError("");
      return;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError("Please enter a valid email format (e.g., example@gmail.com)");
      return;
    }
    const fakeEmails = ['test@gmail.com', 'example@gmail.com', 'test@test.com', 'fake@gmail.com', 'demo@gmail.com', 'sample@gmail.com'];
    if (fakeEmails.includes(email.toLowerCase())) {
      setEmailError("Please use a real email address, not a test email");
      return;
    }
    setEmailError("");
  };

  const handleEmailChange = () => {
    if (emailError) {
      setEmailError("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const serviceType = formData.get("serviceType");

    if (!validateEmail(email)) {
      setFormStatus("idle");
      setFormError("Please enter a valid email format (e.g., example@gmail.com)");
      return;
    }

    try {
      const response = await fetch("/api/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          phone: selectedDialCode + phone.trim(),
          serviceType: serviceType || "",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus("success");
        setSelectedCountry(COUNTRY_OPTIONS[0].value);
        e.currentTarget.reset();
      } else {
        setFormStatus("error");
        setFormError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Callback form error:", error);
      setFormStatus("error");
      setFormError("Unable to submit request. Please check your connection and try again.");
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero Section */}
      <div className="relative bg-slate-900 py-20 border-b border-slate-700 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://www.shutterstock.com/image-photo/panorama-shot-analyst-team-utilizing-260nw-2332286999.jpg"
            alt="Contact background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/80 to-slate-900/80" />
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
            <span className="text-white font-semibold">Contact Us</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-white leading-tight">
            Get in Touch
          </h1>
        </div>
      </div>

      {/* Form + Contact Info Section */}
      <section className="py-16 lg:py-20 bg-white" id="callback-form">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 mb-12">
            {/* Left: Callback Form */}
            <div className="relative bg-white rounded-2xl p-4 sm:p-8 shadow-xl border border-slate-200">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-t-2xl" />

              {formStatus === "success" ? (
                <div className="flex flex-col items-center justify-center text-center py-8">
                  <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-600/10 to-cyan-500/10 flex items-center justify-center mb-3 sm:mb-4 border-2 border-blue-600">
                    <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold mb-2 text-slate-900">Message Sent Successfully</h3>
                  <p className="text-xs sm:text-base text-slate-600 mb-3 sm:mb-4">We will reach out within 24 hours</p>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all text-xs sm:text-base"
                  >
                    Send another message
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-3 sm:mb-6">
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-0.5 sm:mb-2">Request a callback</h3>
                    <p className="text-[11px] sm:text-sm text-slate-600">We'll reach out within 24 hours</p>
                  </div>

                  <div onSubmit={onSubmit} className="space-y-2.5 sm:space-y-5">
                    {formStatus === "error" && formError && (
                      <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs sm:text-sm">
                        {formError}
                      </div>
                    )}

                    <div className="grid gap-2.5 sm:gap-5 sm:grid-cols-2">
                      <div className="group">
                        <label className={LABEL_STYLES}>
                          <span className="flex items-center gap-1">
                            Full Name
                            <span className="text-blue-600">*</span>
                          </span>
                        </label>
                        <input
                          name="name"
                          required
                          type="text"
                          placeholder="John Doe"
                          className={INPUT_BASE_CLASSES}
                        />
                      </div>

                      <div className="group">
                        <label className={LABEL_STYLES}>
                          <span className="flex items-center gap-1">
                            Email Address
                            <span className="text-blue-600">*</span>
                          </span>
                        </label>
                        <input
                          name="email"
                          required
                          type="email"
                          placeholder="john@example.com"
                          className={INPUT_BASE_CLASSES}
                          onBlur={handleEmailBlur}
                          onChange={handleEmailChange}
                        />
                        {emailError && (
                          <p className="mt-1.5 text-xs sm:text-sm text-red-600">
                            {emailError}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-2.5 sm:gap-5 sm:grid-cols-2">
                      <div className="group">
                        <label className={LABEL_STYLES}>
                          <span className="flex items-center gap-1">
                            Phone Number
                            <span className="text-blue-600">*</span>
                          </span>
                        </label>
                        <div className="relative">
                          <div className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 sm:gap-2 z-10">
                            <div className="relative">
                              <select
                                value={selectedCountry}
                                onChange={(event) => setSelectedCountry(event.target.value)}
                                className="appearance-none bg-transparent border-none outline-none cursor-pointer pr-3.5 sm:pr-5 text-sm sm:text-base font-medium text-slate-700"
                                style={{ width: '45px' }}
                              >
                                {COUNTRY_OPTIONS.map((country) => (
                                  <option key={country.value} value={country.value}>
                                    {country.flag}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 -translate-y-1/2 text-slate-400" />
                            </div>
                            <span className="text-[11px] sm:text-sm font-semibold text-slate-500 border-l border-slate-300 pl-1 sm:pl-2">
                              {selectedDialCode}
                            </span>
                          </div>
                          <input
                            name="phone"
                            required
                            type="tel"
                            inputMode="tel"
                            placeholder="98765 43210"
                            className={`${INPUT_BASE_CLASSES} pl-24 sm:pl-32`}
                          />
                        </div>
                      </div>

                      <div className="group">
                        <label className={LABEL_STYLES}>Service Type</label>
                        <div className="relative">
                          <select name="serviceType" className={`${INPUT_BASE_CLASSES} appearance-none pr-8 sm:pr-10`}>
                            <option value="">Select a service</option>
                            <option value="Web Application Development">Web Application Development</option>
                            <option value="Cloud Software Solutions">Cloud Software Solutions</option>
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-2.5 sm:right-4 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-slate-400" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 sm:pt-6">
                      <button
                        onClick={onSubmit}
                        disabled={formStatus === "submitting"}
                        className="group relative w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:from-slate-400 disabled:to-slate-500 text-white py-2.5 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-xs sm:text-base shadow-lg hover:shadow-xl disabled:shadow-none transition-all flex items-center justify-center gap-2 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative flex items-center gap-2">
                          {formStatus === "submitting" ? (
                            <>
                              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Request Callback
                              <ArrowRight className="w-3.5 sm:w-5 h-3.5 sm:h-5 transition-transform group-hover:translate-x-1" />
                            </>
                          )}
                        </span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Right: Contact Info */}
            <div className="space-y-6">
              {/* Address */}
              <div className="rounded-2xl h-52 border border-slate-200 bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Our Address</h3>
                    <p className="text-slate-700 text-sm">Ground Floor, of Vast Academy, <br />Sohiyan Road, Majitha, Amritsar, <br /> Punjab 143601</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="rounded-2xl h-52 border border-slate-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Email Us</h3>
                    <p className="text-slate-700 text-sm">contact@merasoftware.com<br/>info@merasoftware.com</p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              {/* <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.92 7.02C17.45 6.18 16.48 5.74 15.54 5.74c-.85 0-1.69.32-2.36.97l-2.91 2.91c-.46.46-.71 1.08-.71 1.73s.25 1.27.71 1.73l2.5 2.5c.46.46.71 1.08.71 1.73 0 .65-.25 1.27-.71 1.73l-2.91 2.91c-.67.65-1.51.97-2.36.97-.85 0-1.69-.32-2.36-.97L2.44 15.9c-.67-.65-1.02-1.59-1.02-2.54 0-.95.35-1.89 1.02-2.54l2.91-2.91C6.04 7.02 6.88 6.7 7.73 6.7c.85 0 1.69.32 2.36.97l2.91 2.91c.46.46.71 1.08.71 1.73 0 .65-.25 1.27-.71 1.73l-2.5 2.5c-.46.46-.71 1.08-.71 1.73 0 .65.25 1.27.71 1.73l2.91 2.91c.67.65 1.51.97 2.36.97s1.69-.32 2.36-.97l2.91-2.91c.46-.46.71-1.08.71-1.73 0-.65-.25-1.27-.71-1.73l-2.5-2.5c-.46-.46-.71-1.08-.71-1.73 0-.65.25-1.27.71-1.73l2.91-2.91z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Call Us</h3>
                    <p className="text-slate-700 text-sm">+91 93563-93094</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-12" />

          {/* Map + FAQ Section */}
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Map */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md h-[400px]">
              <iframe
                title="Mera Software on Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13569.480505387803!2d74.95006156546785!3d31.76038949677353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39196189f617a1b1%3A0x866333ec3727c42b!2sVA%20Computers!5e0!3m2!1sen!2sin!4v1765695474605!5m2!1sen!2sin"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* FAQ */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <div className="divide-y divide-slate-200">
                {[
                  {
                    q: "How soon can you start?",
                    a: "For most projects we can start within 5–7 working days after the scope is finalised.",
                  },
                  {
                    q: "Do you work with fixed budgets?",
                    a: "Yes. We'll suggest the cleanest way to meet your goals and offer a fixed quote with clear milestones.",
                  },
                  {
                    q: "Will you maintain our site/app?",
                    a: "Absolutely. We provide maintenance plans with SLAs for updates, uptime and quick issue resolution.",
                  },
                ].map((item, i) => (
                  <details key={i} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between text-slate-900 hover:text-blue-600 transition-colors">
                      <span className="font-semibold text-base">{item.q}</span>
                      <span className="ml-4 flex-shrink-0 w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-500 transition group-open:rotate-45 group-open:border-blue-500 group-open:text-blue-600">
                        <span className="text-lg font-light">+</span>
                      </span>
                    </summary>
                    <p className="mt-3 text-base text-slate-600 leading-relaxed pr-8">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      {/* <section className="py-16 lg:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Part of the 3G Digital Family
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Mera Software is a specialized unit of 3G Digital, bringing you professional web development and automation solutions backed by years of IT expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Mera Software</h3>
              <p className="text-base text-slate-700 mb-4 leading-relaxed">
                Specialized in custom web development, web applications, and business automation solutions.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Custom Web Development</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Business Process Automation</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Client Portal & Dashboard Solutions</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-100 rounded-2xl p-8 border border-slate-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">3G Digital (Parent Company)</h3>
              <p className="text-base text-slate-700 mb-4 leading-relaxed">
                Complete IT solutions provider with expertise in security systems, infrastructure, and enterprise services.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-slate-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>IT Security & Surveillance</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-slate-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Network Infrastructure</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-slate-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Enterprise IT Solutions</span>
                </li>
              </ul>
              <a
                href="https://www.3gdigital.net"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-blue-600 font-semibold hover:gap-3 transition-all"
              >
                Visit 3G Digital
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
}