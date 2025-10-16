import React, { useState, forwardRef, useImperativeHandle } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ShoppingBag,
  Wrench,
  Stethoscope,
  GraduationCap,
  Utensils,
  Building2,
  CalendarCheck,
  CreditCard,
  Users,
  FileText,
  HelpCircle,
  BarChart3,
  Store,
  X,
  ArrowRight,
  CheckCircle2,
  Circle,
} from "lucide-react";

/**
 * SmartPlanner v3 – Unique Card-Based Wizard Design
 * Completely different layout with numbered steps, progress bars, and card animations
 */

// ---------------- Analytics stub ----------------
function track(event, payload = {}) {
  console.log(`[analytics] ${event}`, payload);
}

// ---------------- Config: Six Core Categories ----------------
const CATEGORIES = [
  { id: "services", label: "Professional Services", icon: Wrench },
  { id: "retail", label: "Retailers & Wholesalers", icon: ShoppingBag },
  { id: "health", label: "Healthcare & Wellness", icon: Stethoscope },
  { id: "education", label: "Education & Training", icon: GraduationCap },
  { id: "hospitality", label: "Hospitality & Lifestyle", icon: Utensils },
  { id: "corporate", label: "Travel, Immigration & Organization", icon: Building2 },
];

// Colorful styles per category for better visual connection
const CATEGORY_STYLES = {
  services: {
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500",
    text: "text-blue-600",
    border: "border-blue-400"},
  retail: {
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-500",
    text: "text-amber-600",
    border: "border-amber-400"},
  health: {
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-500",
    text: "text-emerald-600",
    border: "border-emerald-400"},
  education: {
    gradient: "from-indigo-500 to-purple-500",
    bg: "bg-indigo-500",
    text: "text-indigo-600",
    border: "border-indigo-400"},
  hospitality: {
    gradient: "from-rose-500 to-pink-500",
    bg: "bg-rose-500",
    text: "text-rose-600",
    border: "border-rose-400"},
  corporate: {
    gradient: "from-violet-500 to-purple-500",
    bg: "bg-violet-500",
    text: "text-violet-600",
    border: "border-violet-400"}};

// Category short descriptions (single-line, comma-separated)
const CATEGORY_DESC = {
  services: "Legal, Finance, IT & Creative Professionals",
  retail: "Shops, Distributors & Online Sellers",
  health: "Clinics, Labs & Wellness Centers",
  education: "Schools, Coaching & EdTech",
  hospitality: "Restaurants, Salons & Travel",
  corporate: "Travel, Immigration & Organizations"};

// ---------------- Motion presets ----------------
const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.3 } }, exit: { opacity: 0, transition: { duration: 0.2 } } };
const scaleIn = { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } }, exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } } };
const slideUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }, exit: { opacity: 0, y: -20, transition: { duration: 0.2 } } };

// ---------------- Main Component ----------------
const SmartPlanner = forwardRef(({ showHero = true }, ref) => {
  // Modal state
  const [isOpen, setIsOpen] = useState(false);
  const prevFocusRef = React.useRef(null);
  const modalRef = React.useRef(null);
  const timeoutsRef = React.useRef([]);
  // Auto theme from browser preference
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return true;
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return true;
    }
  });
  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setIsDark(e.matches);
    // Safari < 14 support
    if (mq.addEventListener) mq.addEventListener('change', handler);
    else if (mq.addListener) mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler);
      else if (mq.removeListener) mq.removeListener(handler);
    };
  }, []);

  // Step and forward/back logic (1 = categories, 2 = services, 3 = features)
  const [step, setStep] = useState(1);
  const [maxVisitedStep, setMaxVisitedStep] = useState(1);
  const [category, setCategory] = useState(null);
  const [service, setService] = useState(null);
  const [introEnabled, setIntroEnabled] = useState(false);
  // Website feature selection state (for services > biz_website)
  const [pagesCount, setPagesCount] = useState(5); // min 5, max 30
  const [dynamicGallery, setDynamicGallery] = useState(false);
  const [dynamicPagesCount, setDynamicPagesCount] = useState(0);
  const [estimating, setEstimating] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  // Ecommerce feature selection (for retail > online_ordering)
  const ECOM_COMPONENTS = React.useMemo(() => ([
    { key: 'adminPanel', label: 'Admin Panel', primary: true, deps: [] },
    { key: 'product', label: 'Product Management', primary: true, deps: ['adminPanel'] },
    { key: 'user', label: 'User Accounts', primary: false, deps: ['adminPanel'] },
    { key: 'cart', label: 'Cart & Checkout', primary: false, deps: ['product', 'adminPanel'] },
    { key: 'order', label: 'Order Management', primary: false, deps: ['cart', 'adminPanel'] },
    { key: 'payment', label: 'Payment Gateway', primary: false, deps: ['cart', 'order'] },
    { key: 'shipping', label: 'Shipping Integration', primary: false, deps: ['order'] },
    { key: 'discounts', label: 'Discounts & Offers', primary: false, deps: ['cart'] },
    { key: 'reviews', label: 'Reviews & Ratings', primary: false, deps: ['product', 'user'] },
    { key: 'notifications', label: 'Notifications', primary: false, deps: ['order'] },
    { key: 'seo', label: 'SEO & Sitemap', primary: false, deps: ['product'] },
    { key: 'analytics', label: 'Reports & Analytics', primary: false, deps: ['order'] },
    { key: 'security', label: 'Security & Roles', primary: false, deps: ['adminPanel'] },
    { key: 'loyalty', label: 'Loyalty & Referral', primary: false, deps: ['user', 'order'] },
  ]), []);
  const ECOM_depsMap = React.useMemo(() => {
    const m = new Map();
    ECOM_COMPONENTS.forEach(c => m.set(c.key, c.deps));
    return m;
  }, [ECOM_COMPONENTS]);
  const ECOM_dependentsMap = React.useMemo(() => {
    const m = new Map();
    ECOM_COMPONENTS.forEach(c => m.set(c.key, []));
    ECOM_COMPONENTS.forEach(c => c.deps.forEach(d => { if(!m.has(d)) m.set(d, []); m.get(d).push(c.key); }));
    return m;
  }, [ECOM_COMPONENTS]);
  const ECOM_primary = React.useMemo(() => new Set(ECOM_COMPONENTS.filter(c=>c.primary).map(c=>c.key)), [ECOM_COMPONENTS]);
  const ECOM_label = React.useMemo(() => { const m=new Map(); ECOM_COMPONENTS.forEach(c=>m.set(c.key,c.label)); return m; }, [ECOM_COMPONENTS]);
  
  // Booking/Client Interaction components (for services > client_interaction)
  const BOOKING_COMPONENTS = React.useMemo(() => ([
    { key: 'adminPanel', label: 'Admin Panel', primary: true, deps: [] },
    { key: 'bookingPortal', label: 'Booking Portal', primary: true, deps: ['adminPanel'] },
    { key: 'serviceCatalog', label: 'Service Catalog', primary: false, deps: ['adminPanel'] },
    { key: 'availability', label: 'Availability & Calendar', primary: false, deps: ['adminPanel'] },
    { key: 'user', label: 'User Accounts', primary: false, deps: ['adminPanel'] },
    { key: 'booking', label: 'Booking Management', primary: false, deps: ['bookingPortal','serviceCatalog','availability','user'] },
    { key: 'payment', label: 'Payment Gateway', primary: false, deps: ['booking'] },
    { key: 'notifications', label: 'Notifications', primary: false, deps: ['booking'] },
    { key: 'staff', label: 'Staff Management', primary: false, deps: ['adminPanel'] },
    { key: 'reviews', label: 'Reviews & Ratings', primary: false, deps: ['bookingPortal','user'] },
    { key: 'crm', label: 'CRM Integration', primary: false, deps: ['booking'] },
    { key: 'analytics', label: 'Reports & Analytics', primary: false, deps: ['booking'] },
    { key: 'seo', label: 'SEO & Sitemap', primary: false, deps: ['bookingPortal'] },
    { key: 'security', label: 'Security & Roles', primary: false, deps: ['adminPanel'] },
  ]), []);
  const BOOK_depsMap = React.useMemo(() => {
    const m=new Map(); BOOKING_COMPONENTS.forEach(c=>m.set(c.key,c.deps)); return m;
  }, [BOOKING_COMPONENTS]);
  const BOOK_dependentsMap = React.useMemo(() => {
    const m = new Map(); BOOKING_COMPONENTS.forEach(c=>m.set(c.key,[]));
    BOOKING_COMPONENTS.forEach(c=>c.deps.forEach(d=>{ if(!m.has(d)) m.set(d,[]); m.get(d).push(c.key);}));
    return m;
  }, [BOOKING_COMPONENTS]);
  const BOOK_primary = React.useMemo(() => new Set(BOOKING_COMPONENTS.filter(c=>c.primary).map(c=>c.key)), [BOOKING_COMPONENTS]);
  const BOOK_label = React.useMemo(() => { const m=new Map(); BOOKING_COMPONENTS.forEach(c=>m.set(c.key,c.label)); return m; }, [BOOKING_COMPONENTS]);
  const [bookingSelected, setBookingSelected] = useState(new Set());
  React.useEffect(() => { setBookingSelected(new Set(BOOK_primary)); }, [BOOK_primary]);
  function bookingAutoSelectDependencies(key, setRef = bookingSelected){
    const newly=[]; (function dfs(k){ const deps=BOOK_depsMap.get(k)||[]; for(const d of deps){ if(!setRef.has(d)){ setRef.add(d); newly.push(d); dfs(d);} } })(key);
    return newly; // used for messaging if needed
  }
  function toggleBookingComponent(key){
    const next=new Set(bookingSelected);
    if(BOOK_primary.has(key)){
      // lock primaries
      return;
    }
    if(next.has(key)){
      // deselect key, then cascade remove dependents that are no longer justified
      next.delete(key);
      const removed=[key]; const q=[key]; const seen=new Set([key]);
      while(q.length){
        const cur=q.shift();
        const deps=(BOOK_dependentsMap.get(cur)||[]);
        for(const d of deps){ if(seen.has(d)) continue; seen.add(d); if(next.has(d) && !BOOK_primary.has(d)){ next.delete(d); removed.push(d); q.push(d);} }
      }
      setBookingSelected(new Set(next));
    } else {
      next.add(key);
      bookingAutoSelectDependencies(key, next);
      setBookingSelected(new Set(next));
    }
  }
  const [ecomSelected, setEcomSelected] = useState(new Set());
  const [ecomToast, setEcomToast] = useState(null); // {title, message}
  React.useEffect(() => { setEcomSelected(new Set(ECOM_primary)); }, [ECOM_primary]);
  React.useEffect(() => { if(!ecomToast) return; const t=setTimeout(()=>setEcomToast(null), 2200); return ()=>clearTimeout(t); }, [ecomToast]);
  function ecomAutoSelectDependencies(key, setRef = ecomSelected) {
    const newly = [];
    (function dfs(k){
      const deps = ECOM_depsMap.get(k)||[];
      for(const d of deps){ if(!setRef.has(d)){ setRef.add(d); newly.push(d); dfs(d);} }
    })(key);
    if(newly.length>0){
      const prim = newly.filter(k=>ECOM_primary.has(k));
      const msg = prim.length>0 ? `Primary auto-selected: ${ECOM_label.get(prim[0])}` : `Dependencies: ${newly.map(k=>ECOM_label.get(k)).join(', ')}`;
      setEcomToast({title:'Auto dependencies', message: msg});
    }
  }
  function toggleEcomComponent(key){
    const next = new Set(ecomSelected);
    if(ECOM_primary.has(key)){
      if(next.has(key)){
        setEcomToast({title:'Required', message:`${ECOM_label.get(key)} is required for core e-commerce.`});
      } else { next.add(key); }
      setEcomSelected(new Set(next));
      return;
    }
    const cascadeRemove = (rootKey, setRef) => {
      const removed=[]; const q=[rootKey]; const seen=new Set();
      while(q.length){ const cur=q.shift(); const deps=(ECOM_dependentsMap.get(cur)||[]); for(const d of deps){ if(seen.has(d)) continue; seen.add(d); if(setRef.has(d) && !ECOM_primary.has(d)){ setRef.delete(d); removed.push(d); q.push(d);} } }
      return removed;
    };
    if(next.has(key)){
      next.delete(key);
      const removed = cascadeRemove(key, next);
      setEcomSelected(new Set(next));
      const msg = removed.length ? `Removed dependents: ${removed.map(k=>ECOM_label.get(k)).join(', ')}` : `Removed ${ECOM_label.get(key)}`;
      setEcomToast({title:'Updated', message: msg});
      return;
    } else {
      next.add(key);
      ecomAutoSelectDependencies(key, next);
      setEcomSelected(new Set(next));
      return;
    }
  }

  const resetPlanner = () => {
    setStep(1);
    setMaxVisitedStep(1);
    setCategory(null);
    setService(null);
  };

  const openPlanner = () => {
    // Determine if intro should be shown for this browser
    let showIntro = false;
    try {
      const skip = typeof window !== 'undefined' && window.localStorage?.getItem('planner_skip_intro');
      showIntro = !skip;
    } catch (e) {
      showIntro = true;
    }

    setIntroEnabled(showIntro);
    setCategory(null);
    setService(null);
    setStep(showIntro ? 0 : 1);
    setMaxVisitedStep(showIntro ? 0 : 1);
    try { prevFocusRef.current = document.activeElement; } catch {}
    setIsOpen(true);
    track("planner_open");
  };

  const closePlanner = () => {
    setIsOpen(false);
    resetPlanner();
    track("planner_close");
    try { if (prevFocusRef.current && prevFocusRef.current.focus) prevFocusRef.current.focus(); } catch {}
  };

  React.useImperativeHandle(ref, () => ({
    open: openPlanner,
    close: closePlanner
  }));

  // Handlers
  const onPickCategory = (c) => {
    setCategory(c);
    setService(null);
    setStep(2);
    setMaxVisitedStep((m) => Math.max(m, 2));
    track("pick_category", { id: c.id });
  };

  const onBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
      track("back", { step });
    }
  };

  const onForward = () => {
    if (step < maxVisitedStep) {
      setStep((s) => s + 1);
      track("forward", { to: step + 1 });
    }
  };

  // Services configuration to reduce duplication while preserving visuals
  const SERVICES_OPTIONS = {
    services: [
      { id: "biz_website", label: "Business Website / Portfolio", icon: FileText, gradient: "from-blue-600 to-blue-500", desc: "Showcase your services, expertise, and achievements online." },
      { id: "mgmt_software", label: "Management Software System", icon: BarChart3, gradient: "from-cyan-600 to-cyan-500", desc: "Automate client records, billing, and daily operations." },
      { id: "client_interaction", label: "Client Interaction & Booking", icon: Users, gradient: "from-indigo-600 to-indigo-500", desc: "Let clients book appointments, share files, and communicate directly." },
    ],
    health: [
      { id: "health_website", label: "Healthcare Website or Online Presence", icon: FileText, desc: "Create a credible digital presence for your healthcare practice." },
      { id: "online_pharmacy", label: "Online Medicine Store or Delivery System", icon: CreditCard, desc: "Sell medicines or wellness products with doorstep delivery." },
      { id: "patient_interaction", label: "Patient Engagement & Appointment Platform", icon: Users, desc: "Allow patients to book consultations and access records online." },
      { id: "mgmt_software", label: "Hospital & Clinic Management System", icon: BarChart3, desc: "Manage staff, patients, and medical operations efficiently." },
    ],
    retail: [
      { id: "biz_catalog", label: "Business Website / Product Catalog", icon: Store, desc: "Build online presence; showcase products/portfolio." },
      { id: "online_ordering", label: "Online Selling & Ordering System", icon: CreditCard, desc: "Accept payments, manage orders, and track deliveries." },
      { id: "mgmt_software", label: "Management Software System", icon: BarChart3, desc: "Control inventory, suppliers, and sales performance." },
      { id: "dealer_portal", label: "Dealer & Customer Portal", icon: Users, desc: "Secure access for bulk orders and account tracking." },
    ],
    education: [
      { id: "edu_website", label: "Educational Website or Online Presence", icon: FileText, desc: "Create a credible digital presence and take your institute online." },
      { id: "book_store", label: "Online Book Store or Delivery System", icon: CreditCard, desc: "Sell books or study material online with easy checkout and doorstep delivery." },
      { id: "student_interaction", label: "Student Interaction System", icon: Users, desc: "Allow students to book courses, schedule appointments, and access records or results." },
      { id: "edu_mgmt", label: "Educational Management System", icon: BarChart3, desc: "Manage staff, operations, and student data; automate workflows with LMS and CMS." },
    ],
    hospitality: [
      { id: "hosp_website", label: "Restaurant or Hotel Website", icon: FileText, gradient: "from-rose-600 to-pink-600", desc: "Create a credible online presence for your hotel, restaurant, salon, or fitness brand." },
      { id: "hosp_booking", label: "Online Booking or Reservation System", icon: CalendarCheck, gradient: "from-rose-600 to-pink-600", desc: "Accept and manage room, table, or service bookings with confirmation and automated communication." },
      { id: "hosp_mgmt", label: "Hospitality Management System", icon: BarChart3, gradient: "from-rose-600 to-pink-600", desc: "Handle operations, billing, staff, and schedules through a complete PMS or ERP-based platform." },
    ],
    corporate: [
      { id: "travel_website", label: "Travel or Immigration Website or Online Presence", icon: FileText, gradient: "from-violet-600 to-purple-600", desc: "Build trust and showcase your tours, visa services, and client success stories online." },
      { id: "booking_visa_system", label: "Online Booking or Visa Application System", icon: CalendarCheck, gradient: "from-violet-600 to-purple-600", desc: "Allow users to book trips, apply for visas, and submit required data with real-time status updates." },
      { id: "travel_mgmt", label: "Travel Management System", icon: BarChart3, gradient: "from-violet-600 to-purple-600", desc: "Manage leads, clients, staff, and documentation efficiently using ERP and automation tools." },
    ],
  };

  // IDs of "website/presence" first services for each category
  const WEBSITE_SERVICE_IDS = new Set([
    'biz_website',        // Professional Services
    'health_website',     // Health
    'biz_catalog',        // Retail
    'edu_website',        // Education
    'hosp_website',       // Hospitality
    'travel_website',     // Corporate/Travel
  ]);

  const renderServiceButtons = () => {
    if (!category) return null;

    if (category.id === "services" || category.id === "hospitality" || category.id === "corporate") {
      const items = SERVICES_OPTIONS[category.id];
      const defaultIconColor = category.id === 'services' ? 'text-blue-400' : category.id === 'hospitality' ? 'text-rose-400' : 'text-violet-400';
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
          {items.map((s, idx) => {
            const isSelected = service?.id === s.id;
            return (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.0 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setService(s);
                  setMaxVisitedStep((m) => Math.max(m, 3));
                  if (WEBSITE_SERVICE_IDS.has(s.id) || s.id === 'online_ordering' || s.id === 'online_pharmacy' || s.id === 'book_store' || s.id === 'hosp_booking' || s.id === 'client_interaction') {
                    setStep(3);
                  }
                  track("pick_service", { category: category.id, id: s.id });
                }}
                className={`relative group rounded-2xl p-6 text-center transition-all duration-300 overflow-hidden ${focusRing} ${
                  isSelected
                    ? `bg-gradient-to-br ${s.gradient} shadow-2xl border-2 border-white/20`
                    : (isDark ? 'bg-slate-800/50 border-2 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/80' : 'bg-white border-2 border-slate-200 hover:border-slate-300')
                }`}
              >
                {isSelected && (
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.gradient} opacity-50 blur-xl -z-10`} />
                )}

                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                  isSelected ? 'bg-white/20 backdrop-blur-sm' : (isDark ? 'bg-slate-700/50' : 'bg-slate-100')
                }`}>
                  <s.icon className={`w-8 h-8 ${isSelected ? 'text-white' : defaultIconColor}`} />
                </div>

                <h3 className={`text-base font-bold mb-2 ${isSelected ? 'text-white' : (isDark ? 'text-slate-200' : 'text-slate-800')}`}>
                  {s.label}
                </h3>

                {s.desc && (
                  <p className={`text-sm ${isSelected ? (isDark ? 'text-white/80' : 'text-slate-500') : textMuted}`}>
                    {s.desc}
                  </p>
                )}

                {isSelected && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold text-white">Selected</span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      );
    }

    if (category.id === "health" || category.id === "retail" || category.id === "education") {
      const items = SERVICES_OPTIONS[category.id] || [];
      const isHealth = category.id === "health";
      const isRetail = category.id === "retail";
      const isEducation = category.id === "education";
      const selectedGradient = isHealth
        ? 'from-emerald-600 to-teal-600'
        : isRetail
          ? 'from-amber-600 to-orange-600'
          : 'from-indigo-600 to-purple-600';
      const defaultIconColor = isHealth
        ? 'text-emerald-400'
        : isRetail
          ? 'text-amber-400'
          : 'text-indigo-400';

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
          {items.map((s, idx) => {
            const isSelected = service?.id === s.id;
            return (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ scale: 1.0 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setService(s);
                  setMaxVisitedStep((m) => Math.max(m, 3));
                  if (WEBSITE_SERVICE_IDS.has(s.id) || s.id === 'online_ordering' || s.id === 'online_pharmacy' || s.id === 'book_store' || s.id === 'hosp_booking') {
                    setStep(3);
                  }
                  track("pick_service", { category: category.id, id: s.id });
                }}
                className={`relative rounded-2xl p-5 text-left transition-all overflow-hidden ${focusRing} ${
                  isSelected
                    ? `bg-gradient-to-br ${selectedGradient} shadow-xl border-2 border-white/20`
                    : (isDark ? 'bg-slate-800/50 border-2 border-slate-700/50 hover:bg-slate-800/80' : 'bg-white border-2 border-slate-200 hover:border-slate-300')
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-white/20' : (isDark ? 'bg-slate-700/50' : 'bg-slate-100')
                  }`}>
                    <s.icon className={`w-7 h-7 ${isSelected ? 'text-white' : defaultIconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold ${isSelected ? 'text-white' : (isDark ? 'text-slate-200' : 'text-slate-800')}`}>{s.label}</h3>
                    {s.desc && (
                      <p className={`text-sm ${isSelected ? (isDark ? 'text-white/80' : 'text-slate-500') : textMuted}`}>{s.desc}</p>
                    )}
                  </div>
                  {isSelected && <CheckCircle2 className="w-6 h-6 text-white" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      );
    }

    return (
      <div className="text-center py-12">
        <div className={emptyBoxClass}>
          <HelpCircle className="w-10 h-10 text-slate-500" />
        </div>
        <p className={emptyTitleClass}>Services Coming Soon</p>
        <p className={emptySubClass}>This category will be available shortly</p>
      </div>
    );
  };

  // Progress calculation with optional Welcome step
  const stepsLabels = introEnabled ? ['Welcome', 'Category', 'Services', 'Features'] : ['Category', 'Services', 'Features'];
  const currentIndex = Math.max(0, Math.min(introEnabled ? step : step - 1, stepsLabels.length - 1));
  const progress = ((currentIndex + 1) / stepsLabels.length) * 100;
  const stepsCount = stepsLabels.length;
  const progressLeft = `calc(100% / (2 * ${stepsCount}))`;
  const progressWidth = `calc((100% * ${currentIndex}) / ${stepsCount})`;

  // Theme-aware utility classes used in a few key places
  const heroBg = isDark
    ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
    : 'bg-gradient-to-br from-white via-slate-50 to-white';
  const heroSubText = isDark ? 'text-slate-400' : 'text-slate-600';
  const heroFeatureText = isDark ? 'text-slate-300' : 'text-slate-700';
  const modalBackdrop = isDark ? 'bg-slate-950/95' : 'bg-slate-900/40';
  // Planner theme helpers
  const textHeading = isDark ? 'text-white' : 'text-slate-900';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-600';
  const textSecondary = isDark ? 'text-slate-300' : 'text-slate-700';
  const plannerCard = isDark
    ? 'bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50'
    : 'bg-gradient-to-br from-white to-slate-50 border border-slate-200';
  const closeBtnClass = isDark
    ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 text-white'
    : 'bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-slate-300 text-slate-700';
  const progressWrapClass = isDark
    ? 'bg-slate-800/50 border border-slate-700/50'
    : 'bg-white/70 border border-slate-200';
  const progressTrackClass = isDark ? 'bg-slate-900/50' : 'bg-slate-100';
  const stepInactiveCircleClass = isDark
    ? 'bg-slate-800 text-slate-500 border border-slate-700'
    : 'bg-white text-slate-400 border border-slate-300';
  const stepLabelInactive = isDark ? 'text-slate-500' : 'text-slate-600';
  const stepLabelActive = isDark ? 'text-cyan-400' : 'text-cyan-700';
  const focusRing = isDark
    ? 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900'
    : 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white';
  const navBackBtnClass = isDark
    ? `inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${focusRing}`
    : `inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-800 border border-slate-300 font-semibold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${focusRing}`;
  const sectionCardClass = isDark
    ? 'rounded-2xl border border-slate-700 bg-slate-800/50 p-6'
    : 'rounded-2xl border border-slate-200 bg-white p-6';
  const switchTrackClass = isDark ? 'bg-slate-600' : 'bg-slate-300';
  const overlayBackdrop = isDark ? 'bg-slate-950/80' : 'bg-slate-900/30';
  const overlayCardClass = isDark
    ? 'relative z-10 w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 text-center shadow-2xl'
    : 'relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl';
  const toastClass = isDark
    ? 'rounded-xl bg-slate-900 text-white px-4 py-3 shadow-lg border border-slate-700'
    : 'rounded-xl bg-white text-slate-900 px-4 py-3 shadow-lg border border-slate-200';
  const toastMsgClass = isDark ? 'text-xs text-slate-300 mt-0.5' : 'text-xs text-slate-600 mt-0.5';
  const emptyBoxClass = isDark
    ? 'w-20 h-20 rounded-2xl bg-slate-800/50 border border-slate-700 flex items-center justify-center mx-auto mb-4'
    : 'w-20 h-20 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-4';
  const emptyTitleClass = isDark ? 'text-lg font-semibold text-slate-300' : 'text-lg font-semibold text-slate-800';
  const emptySubClass = isDark ? 'text-sm text-slate-500 mt-2' : 'text-sm text-slate-500 mt-2';
  const primaryBadgeClass = isDark
    ? 'ml-2 text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30'
    : 'ml-2 text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200';
  const heroTitleTopGrad = isDark
    ? 'bg-gradient-to-r from-white via-cyan-200 to-blue-200'
    : 'bg-gradient-to-r from-slate-900 via-blue-800 to-cyan-800';
  const heroTitleBottomGrad = isDark
    ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400'
    : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600';
  const heroBadgeTextColor = isDark ? 'text-cyan-200' : 'text-cyan-700';
  const formatINR = (v) => (typeof v === 'number' ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v) : '');

  React.useEffect(() => {
    if (!isOpen) return;
    const root = modalRef.current;
    const selector = [
      'a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])',
      'button:not([disabled])', 'iframe', 'object', 'embed', '[tabindex]:not([tabindex="-1"])', '[contenteditable]'
    ].join(',');
    const getFocusable = () => Array.from(root?.querySelectorAll(selector) || []).filter(el => el.offsetParent !== null);
    const focusables = getFocusable();
    if (focusables.length) focusables[0].focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); closePlanner(); return; }
      if (e.key !== 'Tab') return;
      const els = getFocusable();
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  React.useEffect(() => () => { try { timeoutsRef.current.forEach(clearTimeout); timeoutsRef.current = []; } catch {} }, []);
  const scheduleTimeout = (cb, delay) => { const id = setTimeout(cb, delay); try { timeoutsRef.current.push(id); } catch {} return id; };

  return (
    <div className={isDark ? 'dark' : 'light'}>
      {showHero && (
        <div className={`relative min-h-screen ${heroBg} ${isOpen ? "pointer-events-none" : ""}`}>
        {/* Animated gradient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-gradient-to-br from-blue-600/30 to-cyan-500/30 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-gradient-to-tr from-cyan-600/30 to-blue-500/30 blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className={`text-sm font-medium ${heroBadgeTextColor}`}>Smart Project Planning Tool</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-7xl font-black mb-6"
            >
              <span className={`${heroTitleTopGrad} bg-clip-text text-transparent`}>
                Build Your
              </span>
              <br />
              <span className={`${heroTitleBottomGrad} bg-clip-text text-transparent`}>
                Next Project
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-xl ${heroSubText} max-w-2xl mx-auto mb-10`}
            >
              Intelligent wizard to guide you through selecting business categories and services with AI-powered recommendations
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openPlanner}
              aria-label="Start Planning"
              className={`group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-5 text-lg font-bold shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 ${focusRing}`}
            >
              <span>Start Planning</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />
            </motion.button>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {[
                { icon: CheckCircle2, text: "6 Business Categories" },
                { icon: CheckCircle2, text: "Smart Recommendations" },
                { icon: CheckCircle2, text: "Instant Preview" }
              ].map((feature, i) => (
                <div key={i} className={`flex items-center justify-center gap-3 ${heroFeatureText}`}>
                  <feature.icon className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        </div>
      )}

      {/* Modal - Completely New Card-Based Design */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...fadeIn}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
          >
            {/* Backdrop */}
            <div className={`absolute inset-0 ${modalBackdrop} backdrop-blur-xl`} onClick={closePlanner} />

            {/* Modal Card */}
            <motion.div
              {...scaleIn}
              className="relative z-10 w-full max-w-5xl"
              ref={modalRef}
            >
              {/* Close Button */}
              <button
                onClick={closePlanner}
                aria-label="Close planner"
                className={`absolute -top-4 -right-4 z-20 inline-flex items-center justify-center rounded-full p-3 shadow-2xl hover:scale-110 hover:rotate-90 transition-all duration-300 ${closeBtnClass} ${focusRing}`}
              >
                <X className="h-6 w-6" />
              </button>

              {/* Progress Bar - hidden on Welcome */}
              {!(introEnabled && step === 0) && (
                <div className={`relative mb-6 rounded-full py-6 ${progressWrapClass}`} aria-label={`Progress: step ${currentIndex+1} of ${stepsLabels.length}`}>
                  {/* Base track behind nodes: only between first and last node centers */}
                  <div
                    className={`absolute top-1/2 h-3 rounded-full ${progressTrackClass} z-0`}
                    style={{ left: progressLeft, right: progressLeft, transform: 'translateY(calc(-50% - 12px))' }}
                  />
                  {/* Progress from first node center to current node center */}
                  <motion.div
                    className="absolute top-1/2 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full z-0"
                    initial={{ width: 0 }}
                    animate={{ left: progressLeft, width: progressWidth }}
                    transition={{ duration: 0.3 }}
                    style={{ left: progressLeft, width: progressWidth, transform: 'translateY(calc(-50% - 12px))' }}
                  />
                  <div className="grid px-2 relative z-10" style={{ gridTemplateColumns: `repeat(${stepsLabels.length}, minmax(0,1fr))` }}>
                    {stepsLabels.map((label, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 justify-self-center" aria-current={i === currentIndex ? 'step' : undefined}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                          i <= currentIndex
                            ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50'
                            : stepInactiveCircleClass
                        }`}>
                          {i < currentIndex ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                        </div>
                        <span className={`text-xs font-medium ${i <= currentIndex ? stepLabelActive : stepLabelInactive}`}>
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Main Card with Glassmorphism */}
              <div className={`rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden ${plannerCard}`}>
                <div className="p-8">
                  <AnimatePresence mode="wait">
                    {introEnabled && step === 0 && (
                      <motion.div key="step0" {...slideUp}>
                        {/* Welcome Screen */}
                        <div className="text-center py-12">
                          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-600 shadow-2xl shadow-blue-500/50 mb-8 relative">
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-600 animate-pulse opacity-50" />
                            <CheckCircle2 className="w-12 h-12 text-white relative z-10" />
                          </div>

                          <h2 className={`text-4xl font-black mb-4 ${textHeading}`}>Welcome to Smart Planner</h2>
                          <p className={`text-lg max-w-2xl mx-auto mb-8 ${textMuted}`}>
                            This intelligent wizard will guide you through selecting your business category and recommended services. Let's get started!
                          </p>

                          <div className="rounded-2xl border-2 border-blue-500/30 bg-blue-500/10 p-6 mb-8 max-w-2xl mx-auto">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <HelpCircle className="w-5 h-5 text-blue-400" />
                              </div>
                              <div className="text-left">
                                <p className={`text-sm leading-relaxed ${textSecondary}`}>
                                  This is a <span className="font-bold text-white">planning tool only</span>. <span className="font-bold text-red-400">No orders will be created automatically</span>. You can go back and change your selections anytime.
                                </p>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => { try { if (typeof window !== 'undefined') { window.localStorage?.setItem('planner_skip_intro','1'); } } catch (e) {} setIntroEnabled(false); setStep(1); setMaxVisitedStep((m) => Math.max(m, 1)); track("planner_intro_continue"); }}
                            className="group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-4 text-lg font-bold shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 hover:scale-105 transition-all duration-300"
                          >
                            <span>I Agree, Let's Start</span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 1 && (
                      <motion.div key="step1" {...slideUp}>
                        <div className="relative">
                          {/* Category Box Top-Left Navigation */}
                          <div className="absolute top-0 left-0 z-20 flex items-center gap-3">
                            <button
                              onClick={onBack}
                              disabled={step <= 1}
                              className={navBackBtnClass}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                              Back
                            </button>
                            <button
                              onClick={onForward}
                              disabled={step >= maxVisitedStep}
                              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${focusRing}`}
                            >
                              Next
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                          {/* Category Selection - Vertical Timeline Style */}
                          <div className="mb-8 pt-16">
                            <h2 className={`text-3xl font-black mb-2 text-center ${textHeading}`}>Choose Your Business Type</h2>
                            <p className={`text-center ${textMuted}`}>Select the category that best matches your business</p>
                          </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                          {CATEGORIES.map((c, idx) => {
                            const styles = CATEGORY_STYLES[c.id];
                            const isSelected = category?.id === c.id;

                            return (
                              <motion.button
                                key={c.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ scale: 1.0 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onPickCategory(c)}
                                className={`relative group rounded-2xl p-6 text-left transition-all duration-300 overflow-hidden ${
                                  isSelected
                                    ? `bg-gradient-to-br ${styles.gradient} shadow-2xl border-2 border-white/20`
                                    : (isDark ? 'bg-slate-800/50 border-2 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/80' : 'bg-white border-2 border-slate-200 hover:border-slate-300')
                                }`}
                              >
                                {/* Background Glow for Selected */}
                                {isSelected && (
                                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${styles.gradient} opacity-50 blur-xl -z-10`} />
                                )}

                                <div className="flex items-center gap-4">
                                  {/* Icon */}
                                  <div className={`relative flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                                    isSelected
                                      ? 'bg-white/20 backdrop-blur-sm'
                                      : (isDark ? `bg-slate-700/50 ${styles.border} border` : 'bg-slate-100 border border-slate-200')
                                  }`}>
                                    <c.icon className={`w-8 h-8 ${isSelected ? 'text-white' : styles.text}`} />
                                  </div>

                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                                    <h3 className={`text-lg font-bold mb-1 ${isSelected ? 'text-white' : (isDark ? 'text-slate-200' : 'text-slate-800')}`}>
                                      {c.label}
                                    </h3>
                                    <p className={`text-sm ${isSelected ? (isDark ? 'text-white/80' : 'text-slate-500') : textMuted}`}>
                                      {CATEGORY_DESC[c.id]}
                                    </p>
                                  </div>

                                  {/* Selection Indicator */}
                                  {isSelected ? (
                                    <CheckCircle2 className="w-8 h-8 text-white flex-shrink-0" />
                                  ) : (
                                    <Circle className={`w-8 h-8 flex-shrink-0 group-hover:text-slate-500 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
                                  )}
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>

                        <div className="mt-6 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
                          <p className={`text-sm text-center ${textSecondary}`}><span className="font-semibold">Tip:</span> We'll suggest the best services based on your selection</p>
                        </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div key="step2" {...slideUp}>
                        <div className="relative">
                          {/* Service Box Top-Left Navigation */}
                          <div className="absolute top-0 left-0 z-20 flex items-center gap-3">
                            <button
                              onClick={onBack}
                              disabled={step <= 1}
                              className={navBackBtnClass}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                              Back
                            </button>
                            <button
                              onClick={onForward}
                              disabled={step >= maxVisitedStep}
                              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${focusRing}`}
                            >
                              Next
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        {/* Services Selection */}
                        <div className="mb-6 pt-16">
                          {/* Selected Category Badge */}
                          {category && (
                            <motion.div
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 mb-6 shadow-xl"
                            >
                              <category.icon className="w-6 h-6 text-white" />
                              <span className="text-white font-bold">{category.label}</span>
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            </motion.div>
                          )}

                          <h2 className={`text-3xl font-black mb-2 ${textHeading}`}>Select Your Services</h2>
                          <p className={textMuted}>Choose the services you need for your business</p>
                        </div>

                        {renderServiceButtons()}

                        {/* Tip: mirror Step 1 tip box */}
                        <div className="mt-6 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
                          <p className={`text-sm text-center ${textSecondary}`}><span className="font-semibold">Tip:</span> We'll suggest the best services based on your selection</p>
                        </div>
                        </div>
                      </motion.div>
                    )}
                    {step === 3 && (
                      <motion.div key="step3" {...slideUp}>
                        <div className="relative">
                          {/* Features Box Top-Left Navigation */}
                          <div className="absolute top-0 left-0 z-20 flex items-center gap-3">
                            <button
                              onClick={onBack}
                              disabled={step <= 1}
                              className={navBackBtnClass}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                              Back
                            </button>
                            <button
                              onClick={onForward}
                              disabled={step >= maxVisitedStep}
                              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${focusRing}`}
                            >
                              Next
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>

                          <div className="mb-6 pt-16">
                            <h2 className={`text-3xl font-black mb-2 ${textHeading}`}>Features & Functionality</h2>
                            <p className={textMuted}>Configure features based on your selected service</p>
                          </div>

                          {/* Content placeholder */}
                          {service && WEBSITE_SERVICE_IDS.has(service.id) ? (
                            <div className="grid grid-cols-1 gap-6">
                              {/* Pages count */}
                              <div className={sectionCardClass}>
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className={`text-lg font-bold ${textHeading}`}>Website Pages</h3>
                                  <span className="text-cyan-400 font-semibold">{pagesCount} pages</span>
                                </div>
                                <p className={`text-sm mb-4 ${textMuted}`}>Select total pages for your website. Minimum 5, maximum 30.</p>
                                <input
                                  type="range"
                                  aria-label="Total website pages"
                                  min={5}
                                  max={30}
                                  step={1}
                                  value={pagesCount}
                                  onChange={(e) => {
                                    const val = Math.max(5, Math.min(30, Number(e.target.value)));
                                    setPagesCount(val);
                                    // Clamp dynamic pages to be at most (pages - 2)
                                    setDynamicPagesCount((prev) => Math.max(0, Math.min(prev, Math.max(0, val - 2))));
                                  }}
                                  className="w-full accent-cyan-500"
                                />
                                <div className="flex justify-between text-xs text-slate-500 mt-2">
                                  <span>5</span>
                                  <span>30</span>
                                </div>
                              </div>

                              {/* Dynamic gallery */}
                              <div className={sectionCardClass}>
                                <div className="flex items-center gap-4">
                                  <div>
                                    <h3 className={`text-lg font-bold ${textHeading}`}>Dynamic Gallery</h3>
                                    <p className={`text-sm ${textMuted}`}>Add a dynamic image/video gallery module.</p>
                                  </div>
                                  <label className="inline-flex items-center cursor-pointer ml-auto flex-shrink-0">
                                    <input
                                      type="checkbox"
                                      checked={dynamicGallery}
                                      onChange={(e) => setDynamicGallery(e.target.checked)}
                                      className="sr-only peer"
                                    />
                                    <div className={`w-12 h-7 ${switchTrackClass} peer-focus:outline-none rounded-full peer peer-checked:bg-cyan-600 relative transition-colors`}>
                                      <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${dynamicGallery ? 'translate-x-5' : ''}`} />
                                    </div>
                                  </label>
                                </div>
                              </div>

                              {/* Dynamic pages */}
                              <div className={sectionCardClass}>
                                {(() => {
                                  const maxDynamic = Math.max(0, pagesCount - 2);
                                  return (
                                    <>
                                      <div className="flex items-center justify-between mb-2">
                                        <h3 className={`text-lg font-bold ${textHeading}`}>Dynamic Pages</h3>
                                        <span className="text-cyan-400 font-semibold">{dynamicPagesCount} pages</span>
                                      </div>
                                      <p className={`text-sm mb-4 ${textMuted}`}>You can make up to <span className={`${textSecondary} font-semibold`}>{maxDynamic}</span> pages dynamic (always 2 less than total pages).</p>
                                      <input
                                        type="range"
                                        aria-label="Dynamic pages count"
                                        min={0}
                                        max={maxDynamic}
                                        step={1}
                                        value={Math.min(dynamicPagesCount, maxDynamic)}
                                        onChange={(e) => {
                                          const val = Math.max(0, Math.min(maxDynamic, Number(e.target.value)));
                                          setDynamicPagesCount(val);
                                        }}
                                        className="w-full accent-cyan-500"
                                      />
                                      <div className="flex justify-between text-xs text-slate-500 mt-2">
                                        <span>0</span>
                                        <span>{maxDynamic}</span>
                                      </div>
                                    </>
                                  );
                                })()}
                              </div>

                              {/* Get Price */}
                              <div className="flex items-center justify-between">
                                <button
                                  onClick={() => {
                                    setEstimating(true);
                                    setEstimatedPrice(null);
                                    // Processing time scales with selections: 0.5s to 3s
                                    const minDelay = 500; // ms
                                    const maxDelay = 3000; // ms
                                    const maxDynamic = Math.max(0, pagesCount - 2);
                                    const pagesNorm = Math.max(0, Math.min(1, (pagesCount - 5) / 25));
                                    const dynamicNorm = maxDynamic > 0 ? Math.max(0, Math.min(1, Math.min(dynamicPagesCount, maxDynamic) / maxDynamic)) : 0;
                                    const galleryNorm = dynamicGallery ? 1 : 0;
                                    const ratio = Math.max(0, Math.min(1, (pagesNorm + dynamicNorm + galleryNorm) / 3));
                                    const jitter = Math.floor(Math.random() * 201) - 100; // -100..100 ms
                                    const delay = Math.max(minDelay, Math.min(maxDelay, Math.round(minDelay + ratio * (maxDelay - minDelay) + jitter)));
                                    scheduleTimeout(() => {
                                      const base = 5000;
                                      const perPage = 300;
                                      const perDynamic = 400;
                                      const galleryCost = dynamicGallery ? 1000 : 0;
                                      const total = base + (pagesCount * perPage) + (dynamicPagesCount * perDynamic) + galleryCost;
                                      setEstimatedPrice(total);
                                      setEstimating(false);
                                    }, delay);
                                  }}
                                  disabled={estimating}
                                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all ${estimating ? 'opacity-60 cursor-not-allowed' : ''}`}
                                >
                                  <>Get Price Estimate</>
                                </button>
                                <div></div>
                              </div>
                            </div>
                          ) : (service?.id === 'online_ordering' || service?.id === 'online_pharmacy' || service?.id === 'book_store' || service?.id === 'hosp_booking') ? (
                            <div className="grid grid-cols-1 gap-6">
                              <div className={sectionCardClass}>
                                <h3 className={`text-lg font-bold mb-1 ${textHeading}`}>Basic E-commerce Core Functionality</h3>
                                <p className={`text-sm ${textMuted}`}>Primary features auto-selected. Toggle optional modules; dependencies resolve automatically.</p>
                                <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {ECOM_COMPONENTS.map(c => (
                                    <label key={c.key} className={`group relative flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition ${ecomSelected.has(c.key) ? (isDark ? 'border-cyan-600 ring-2 ring-cyan-600/30 bg-slate-800' : 'border-cyan-600 ring-2 ring-cyan-600/20 bg-cyan-50') : (isDark ? 'hover:border-slate-600 border-slate-700 bg-slate-900/40' : 'hover:border-slate-300 border-slate-200 bg-white')}`}>
                                      <input
                                        type="checkbox"
                                        className="mt-1 h-4 w-4"
                                        checked={ecomSelected.has(c.key)}
                                        onChange={() => toggleEcomComponent(c.key)}
                                      />
                                      <div>
                                        <div className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                                          {(service?.id === 'hosp_booking' && c.key === 'product') ? 'Service Management' : c.label} {c.primary && <span className={`${primaryBadgeClass}`}>Primary</span>}
                                        </div>
                                        <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                                          {(service?.id === 'hosp_booking' && c.key === 'product') ? 'Services, categories, schedules' :
                                           (service?.id === 'online_pharmacy' && c.key === 'product') ? 'Medicines, categories, prescriptions' :
                                           (service?.id === 'book_store' && c.key === 'product') ? 'Titles, authors, ISBN, categories' :
                                           c.key === 'product' ? 'Products, categories, stock' :
                                           c.key === 'cart' ? 'Add to cart, coupons, checkout' :
                                           c.key === 'order' ? 'Status, returns, history' :
                                           c.key === 'payment' ? 'UPI, cards, COD' :
                                           c.key === 'shipping' ? 'Rates, pincode, tracking' :
                                           c.key === 'discounts' ? 'Offers, combos' :
                                           c.key === 'reviews' ? 'Ratings & moderation' :
                                           c.key === 'notifications' ? 'Email/SMS/WhatsApp' :
                                           c.key === 'seo' ? 'Meta, sitemap' :
                                           c.key === 'analytics' ? 'Reports & KPIs' :
                                           c.key === 'security' ? 'RBAC & audits' :
                                           c.key === 'loyalty' ? 'Points & referrals' :
                                           'Setup & controls'}
                                        </p>
                                      </div>
                                    </label>
                                  ))}
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <button
                                  onClick={() => {
                                    setEstimating(true);
                                    setEstimatedPrice(null);
                                    const minDelay=500, maxDelay=3000;
                                    const ratio = Math.max(0, Math.min(1, ecomSelected.size / ECOM_COMPONENTS.length));
                                    const jitter = Math.floor(Math.random()*201)-100;
                                    const delay = Math.max(minDelay, Math.min(maxDelay, Math.round(minDelay + ratio*(maxDelay-minDelay) + jitter)));
                                    scheduleTimeout(()=>{
                                      const base = 15000;
                                      const perModule = 1800;
                                      const total = base + (ecomSelected.size * perModule);
                                      setEstimatedPrice(total);
                                      setEstimating(false);
                                    }, delay);
                                  }}
                                  disabled={estimating}
                                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all ${estimating ? 'opacity-60 cursor-not-allowed' : ''}`}
                                >
                                  <>Get Price Estimate</>
                                </button>
                                <div></div>
                              </div>
                            </div>
                          ) : (service?.id === 'client_interaction') ? (
                            <div className="grid grid-cols-1 gap-6">
                              <div className={sectionCardClass}>
                                <h3 className={`text-lg font-bold mb-1 ${textHeading}`}>Client Interaction & Booking Features</h3>
                                <p className={`text-sm ${textMuted}`}>Primary modules auto-selected. Toggle optional modules; dependencies resolve automatically.</p>
                                <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {BOOKING_COMPONENTS.map(c => (
                                    <label key={c.key} className={`group relative flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition ${bookingSelected.has(c.key) ? (isDark ? 'border-indigo-600 ring-2 ring-indigo-600/30 bg-slate-800' : 'border-indigo-600 ring-2 ring-indigo-600/20 bg-indigo-50') : (isDark ? 'hover:border-slate-600 border-slate-700 bg-slate-900/40' : 'hover:border-slate-300 border-slate-200 bg-white')}`}>
                                      <input
                                        type="checkbox"
                                        className="mt-1 h-4 w-4"
                                        checked={bookingSelected.has(c.key)}
                                        onChange={() => toggleBookingComponent(c.key)}
                                      />
                                      <div>
                                        <div className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                                          {c.label} {c.primary && <span className={`${primaryBadgeClass}`}>Primary</span>}
                                        </div>
                                        <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                                          {c.key === 'bookingPortal' ? 'Public booking UI with search, filters and checkout' :
                                           c.key === 'serviceCatalog' ? 'Define services, durations, pricing and add-ons' :
                                           c.key === 'availability' ? 'Calendar, slots, buffers, exceptions and timezones' :
                                           c.key === 'booking' ? 'Create/modify bookings, statuses, reschedule, cancel' :
                                           c.key === 'payment' ? 'UPI, cards, links, refunds' :
                                           c.key === 'notifications' ? 'Email, SMS, WhatsApp for events' :
                                           c.key === 'staff' ? 'Team, schedules, assignments, roles' :
                                           c.key === 'reviews' ? 'Ratings, photos, moderation' :
                                           c.key === 'crm' ? 'Leads, contacts, follow-ups sync' :
                                           c.key === 'analytics' ? 'Reports, funnels, KPIs' :
                                           c.key === 'seo' ? 'Meta, sitemap, slugs' :
                                           c.key === 'security' ? 'RBAC, audit logs' :
                                           'Setup & controls'}
                                        </p>
                                      </div>
                                    </label>
                                  ))}
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <button
                                  onClick={() => {
                                    setEstimating(true);
                                    setEstimatedPrice(null);
                                    const minDelay=500, maxDelay=3000;
                                    const ratio = Math.max(0, Math.min(1, bookingSelected.size / BOOKING_COMPONENTS.length));
                                    const jitter = Math.floor(Math.random()*201)-100;
                                    const delay = Math.max(minDelay, Math.min(maxDelay, Math.round(minDelay + ratio*(maxDelay-minDelay) + jitter)));
                                    scheduleTimeout(()=>{
                                      const base = 15000;
                                      const perModule = 1800;
                                      const total = base + (bookingSelected.size * perModule);
                                      setEstimatedPrice(total);
                                      setEstimating(false);
                                    }, delay);
                                  }}
                                  disabled={estimating}
                                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all ${estimating ? 'opacity-60 cursor-not-allowed' : ''}`}
                                >
                                  <>Get Price Estimate</>
                                </button>
                                <div></div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-12">
                              <div className={emptyBoxClass}>
                                <HelpCircle className="w-10 h-10 text-slate-500" />
                              </div>
                              <p className={emptyTitleClass}>Feature selection coming soon</p>
                              <p className={emptySubClass}>We'll tailor options to your chosen service</p>
                            </div>
                          )}
                        </div>

                        {/* Estimate Overlay (centered) */}
                        {(estimating || estimatedPrice != null) && (
                          <div className="fixed inset-0 z-[1200] flex items-center justify-center">
                            <div className={`absolute inset-0 ${overlayBackdrop} backdrop-blur-sm`} />
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={overlayCardClass}
                            >
                              {estimating ? (
                                <div className="flex flex-col items-center">
                                  <svg className="w-10 h-10 animate-spin text-cyan-400 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                  </svg>
                                  <p className={textSecondary}>Calculating your estimate...</p>
                                </div>
                              ) : (
                                <div>
                                  <h3 className={`text-xl font-bold mb-2 ${textHeading}`}>Estimated Price</h3>
                                  <div className="text-4xl font-black text-cyan-300 mb-6">{formatINR(estimatedPrice)}</div>
                                  <div className="flex items-center justify-center gap-3">
                                    <button
                                      onClick={() => { setEstimatedPrice(null); setEstimating(false); track('estimate_reset'); }}
                                      className={navBackBtnClass}
                                    >
                                      Get Another Price Estimate
                                    </button>
                                    <button
                                      onClick={() => { try { if (typeof window !== 'undefined') { window.location.href = '/contact'; } } catch (e) {} track('estimate_contact'); }}
                                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50"
                                    >
                                      Contact Us
                                    </button>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          </div>
                        )}
                        {ecomToast && (
                          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1300]">
                            <div className={toastClass} role="status" aria-live="polite">
                              <div className="text-sm font-semibold">{ecomToast.title}</div>
                              <div className={toastMsgClass}>{ecomToast.message}</div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Navigation Footer removed: buttons moved to top-left */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles (theme-aware) */}
      <style>{`
        .custom-scrollbar{ scrollbar-width: thin; scrollbar-color: ${isDark ? '#3b82f6 #0f172a' : '#2563eb #e2e8f0'}; }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: ${isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(226, 232, 240, 0.8)'}; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, ${isDark ? '#3b82f6, #06b6d4' : '#2563eb, #0891b2'}); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: linear-gradient(to bottom, ${isDark ? '#2563eb, #0891b2' : '#1d4ed8, #0e7490'}); }
      `}</style>
    </div>
  );
});
SmartPlanner.displayName = "SmartPlanner";
export default SmartPlanner;
