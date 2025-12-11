import React, { useState, forwardRef, useImperativeHandle, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Briefcase,
  Stethoscope,
  GraduationCap,
  Utensils,
  Plane,
  CalendarCheck,
  CreditCard,
  Users,
  Globe2,
  HelpCircle,
  BarChart3,
  Store,
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Minus,
  Plus,
  Bot,
  Lock,
} from "lucide-react";

const ProgressTracker = React.memo(({
  className = '',
  progressTrackClass,
  progressLeft,
  progressWidth,
  stepsLabels,
  currentIndex,
  stepInactiveCircleClass,
  stepLabelActive,
  stepLabelInactive,
}) => (
  <div
    className={`relative w-full max-w-3xl px-4 ${className}`}
    aria-label={`Progress: step ${currentIndex + 1} of ${stepsLabels.length}`}
  >
    <div
      className={`absolute top-1/2 h-3 rounded-full ${progressTrackClass} z-0`}
      style={{ left: progressLeft, right: progressLeft, transform: 'translateY(calc(-50% - 14px))' }}
    />
    <motion.div
      className="absolute top-1/2 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full z-0"
      initial={{ width: 0 }}
      animate={{ left: progressLeft, width: progressWidth }}
      transition={{ duration: 0.3 }}
      style={{ left: progressLeft, width: progressWidth, transform: 'translateY(calc(-50% - 14px))' }}
    />
    <div
      className="grid px-2 relative z-10"
      style={{ gridTemplateColumns: `repeat(${stepsLabels.length}, minmax(0,1fr))` }}
    >
      {stepsLabels.map((label, i) => (
        <div
          key={label}
          className="flex flex-col items-center gap-2 justify-self-center"
          aria-current={i === currentIndex ? 'step' : undefined}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              i <= currentIndex
                ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50'
                : stepInactiveCircleClass
            }`}
          >
            {i < currentIndex ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
          </div>
          <span
            className={`text-xs font-medium ${
              i <= currentIndex ? stepLabelActive : stepLabelInactive
            }`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  </div>
));

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
  { id: "services", label: "Professional & Business Services", icon: Briefcase },
  { id: "retail", label: "Retail, Wholesale & E-Commerce", icon: ShoppingBag },
  { id: "health", label: "Healthcare, Wellness & Hospitals", icon: Stethoscope },
  { id: "education", label: "Schools, Colleges, Universities & Institutes", icon: GraduationCap },
  { id: "hospitality", label: "Hotels, Restaurants & Lifestyle Services", icon: Utensils },
  { id: "corporate", label: "Travel, Immigration & Organizations", icon: Plane },
];

// Category short descriptions (single-line, comma-separated)
const CATEGORY_DESC = {
  services: "Legal, Finance, IT & Creative Professionals",
  retail: "Shops, Distributors & Online Sellers",
  health: "Clinics, Labs & Wellness Centers",
  education: "Schools, Coaching & EdTech",
  hospitality: "Restaurants, Salons & Travel",
  corporate: "Travel, Immigration & Organizations"};

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
    gradient: "from-indigo-500 to-teal-500",
    bg: "bg-indigo-500",
    text: "text-indigo-600",
    border: "border-indigo-400"},
  hospitality: {
    gradient: "from-rose-500 to-pink-500",
    bg: "bg-rose-500",
    text: "text-rose-600",
    border: "border-rose-400"},
  corporate: {
    gradient: "from-emerald-500 to-green-500",
    bg: "bg-emerald-500",
    text: "text-emerald-600",
    border: "border-emerald-400"}};


const MIN_PAGES = 5;
const MAX_PAGES = 30;
const INTRO_STORAGE_KEY = 'planner_skip_intro';
const INTRO_EXPIRY_MS = 60 * 60 * 1000; // 1 hour
const PROGRESS_EXPIRY_MS = 60 * 60 * 1000; // 1 hour
const DEFAULT_QUOTE_MESSAGE = "I'm sending you the plan I've created according to my requirement and I want to discuss and build the software. Please arrange a callback for me.";
const TIP_INITIAL_DELAY = 1000;
const TIP_SHOW_DURATION = 10000;
const TIP_HIDE_DURATION = 5000;
const PROGRESS_STORAGE_KEY = 'planner_progress_state';
const BOOKING_BASE_PRICE = 29000;
const ECOM_BASE_PRICE = 15000;
const ECOM_DEFAULT_MODULE_PRICE = 1800;

const SERVICES_OPTIONS = {
  services: [
    { id: "biz_website", label: "Creative Website for Presentation", icon: Globe2, gradient: "from-blue-600 to-blue-500", desc: "Get your website built with effects and animations to showcase your services, expertise, and achievements." },
    { id: "mgmt_software", label: "Management Software System", icon: BarChart3, gradient: "from-cyan-600 to-cyan-500", desc: "Automate client records, billing, and daily operations." },
    { id: "client_interaction", label: "Client Interaction & Booking", icon: Users, gradient: "from-indigo-600 to-indigo-500", desc: "Let clients book appointments, share files, and communicate directly." },
  ],
  health: [
    { id: "health_website", label: "Healthcare Website or Online Presence", icon: Globe2, desc: "Create a credible digital presence for your healthcare practice." },
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
    { id: "edu_website", label: "Educational Website or Online Presence", icon: Globe2, desc: "Create a credible digital presence and take your institute online." },
    { id: "book_store", label: "Online Book Store or Delivery System", icon: CreditCard, desc: "Sell books or study material online with easy checkout and doorstep delivery." },
    { id: "student_interaction", label: "Student Interaction System", icon: Users, desc: "Allow students to book courses, schedule appointments, and access records or results." },
    { id: "edu_mgmt", label: "Educational Management System", icon: BarChart3, desc: "Manage staff, operations, and student data; automate workflows with LMS and CMS." },
  ],
  hospitality: [
    { id: "hosp_website", label: "Restaurant or Hotel Website", icon: Globe2, gradient: "from-rose-600 to-pink-600", desc: "Create a credible online presence for your hotel, restaurant, salon, or fitness brand." },
    { id: "hosp_booking", label: "Online Booking or Reservation System", icon: CalendarCheck, gradient: "from-rose-600 to-pink-600", desc: "Accept and manage room, table, or service bookings with confirmation and automated communication." },
    { id: "hosp_mgmt", label: "Hospitality Management System", icon: BarChart3, gradient: "from-rose-600 to-pink-600", desc: "Handle operations, billing, staff, and schedules through a complete PMS or ERP-based platform." },
  ],
  corporate: [
    { id: "travel_website", label: "Travel or Immigration Website or Online Presence", icon: Globe2, gradient: "from-emerald-600 to-green-600", desc: "Build trust and showcase your tours, visa services, and client success stories online." },
    { id: "booking_visa_system", label: "Online Booking or Visa Application System", icon: CalendarCheck, gradient: "from-emerald-600 to-green-600", desc: "Allow users to book trips, apply for visas, and submit required data with real-time status updates." },
    { id: "travel_mgmt", label: "Travel Management System", icon: BarChart3, gradient: "from-emerald-600 to-green-600", desc: "Manage leads, clients, staff, and documentation efficiently using ERP and automation tools." },
  ],
};

const CATEGORY_LOOKUP = new Map(CATEGORIES.map((c) => [c.id, c]));
const SERVICE_LOOKUP = buildServiceLookup(SERVICES_OPTIONS);

const WEBSITE_SERVICE_IDS = new Set([
  'biz_website',
  'health_website',
  'biz_catalog',
  'edu_website',
  'hosp_website',
  'travel_website',
]);

const ECOM_SERVICE_IDS = new Set(['online_ordering', 'online_pharmacy', 'book_store', 'hosp_booking']);
const BOOKING_SERVICE_IDS = new Set(['client_interaction']);

// old components portfolio: add each commerce module here once, then reuse everywhere
// E-commerce components (retail, education online store, hospitality booking)
const ECOM_COMPONENTS = [
  { key: 'product', label: 'Product Management', desc: 'Add products, categories, inventory, and pricing.', primary: true, deps: ['adminPanel'], group: 'foundation', price: 15000, hidden: true },
  { key: 'cart', label: 'Cart & Checkout', desc: 'Cart, coupons, and checkout flows with taxes.', primary: false, deps: ['product', 'adminPanel'], group: 'experience', price: 7000, hidden: true },
  { key: 'order', label: 'Order Management', desc: 'Order lifecycle, returns, cancellations, and SLAs.', primary: false, deps: ['cart', 'adminPanel'], group: 'fulfillment', price: 23000, hidden: true },
  { key: 'shipping', label: 'Shipping & Logistics', desc: 'Courier partners, rate cards, tracking, and slots.', primary: false, deps: ['order'], group: 'fulfillment', price: 25000, hidden: true },
  { key: 'discounts', label: 'Discounts & Offers', desc: 'Promo codes, bundles, flash sales, and campaigns.', primary: false, deps: ['cart'], group: 'experience', price: 22000, hidden: true },
  { key: 'loyalty', label: 'Loyalty & Referral', desc: 'Points, referrals, wallets, and rewards.', primary: false, deps: ['user', 'order'], group: 'engagement', price: 18000, hidden: true },
];

const ECOM_GROUPS_CONFIG = [
  { id: 'foundation', title: 'Store Systems', desc: 'The control room powering catalog, staff, and policies.', accent: 'from-amber-500 to-orange-500', items: ['adminPanel', 'product', 'security'] },
  { id: 'experience', title: 'Shopping Journey', desc: 'Everything customers touch before paying.', accent: 'from-sky-500 to-cyan-500', items: ['user', 'cart', 'discounts'] },
  { id: 'fulfillment', title: 'Orders & Payments', desc: 'Capture, verify, and deliver every order.', accent: 'from-indigo-500 to-blue-500', items: ['order', 'payment', 'shipping'] },
  { id: 'engagement', title: 'Engagement & Trust', desc: 'Conversations, loyalty, and social proof.', accent: 'from-emerald-500 to-teal-500', items: ['notifications', 'reviews', 'loyalty'] },
  { id: 'insights', title: 'Growth & SEO', desc: 'Visibility, reporting, and smart decisions.', accent: 'from-teal-500 to-cyan-500', items: ['seo', 'analytics'] },
];

// old components portfolio: add each client interaction module here once, then reuse everywhere
// Booking/Client Interaction components (client portals & scheduling)
const BOOKING_COMPONENTS = [
  { key: 'adminPanel', label: 'Admin Panel', desc: 'Dashboard for managing business', primary: true, deps: [], price: 15000 },
  { key: 'bookingPortal', label: 'Booking Portal', desc: 'Frontend booking interface', primary: true, deps: ['adminPanel'], price: 5000 },
  { key: 'serviceCatalog', label: 'Service Catalog', desc: 'Manage services offered', primary: true, deps: ['adminPanel'], price: 15000 },
  { key: 'availability', label: 'Availability & Calendar', desc: 'Schedule and time slots', primary: false, deps: ['adminPanel'], price: 12000, hidden: true },
  { key: 'user', label: 'User Accounts', desc: 'Customer registration & login', primary: false, deps: ['adminPanel', 'security'], price: 18000, hidden: true },
  { key: 'booking', label: 'Booking Management', desc: 'Manage bookings & reservations', primary: true, deps: ['bookingPortal','serviceCatalog','availability','user'], price: 12000 },
  { key: 'payment', label: 'Payment Gateway', desc: 'Online payment processing', primary: false, deps: ['booking'], price: 5000, hidden: true },
  { key: 'manualPayment', label: 'Manual Payment System', desc: 'Capture offline payments, upload proofs, and reconcile invoices.', primary: false, deps: ['booking'], price: 6000, hidden: true },
  // new components: booking systems
  { key: 'bookingEngine', label: 'Booking Engine System', desc: 'Booking system, smart slot system, waiting list system, location selection system.', primary: false, deps: ['booking'], price: 11500, hidden: true },
  { key: 'priorityBooking', label: 'Priority Booking System', desc: 'VIP marking, urgent booking tag, priority label in booking list, fast track handling.', primary: false, deps: ['booking', 'paymentSystem', 'selfManageBooking'], price: 9200 },
  { key: 'selfManageBooking', label: 'Self Manage Booking System', desc: 'Client side reschedule option, client side cancel option, secure link or portal based changes.', primary: false, deps: ['booking'], price: 8200 },
  { key: 'tokenQueue', label: 'Token and Queue System', desc: 'Token number generation, current token display, client position in queue, live queue updates.', primary: false, deps: ['booking'], price: 7100 },
  // new components: client services
  { key: 'interactionSystem', label: 'Interaction System', desc: 'Client forms and inquiries, document or file uploads, service portal access, appointment booking.', primary: false, deps: ['bookingPortal','user'], price: 10800 },
  { key: 'notifications', label: 'Notifications', desc: 'Email/SMS alerts', primary: true, deps: ['booking'], price: 5000 },
  { key: 'staff', label: 'Staff Management', desc: 'Manage team members', primary: false, deps: ['adminPanel'], price: 25000, hidden: true },
  // new components: staff and work systems
  { key: 'staffRoleSystem', label: 'Staff Role System', desc: 'Role based staff login for reception, consultant, manager, admin, todays tasks, booking details with notes and internal flags. Staff roles with role based powers like manager, reception, HR and others as needed.', primary: false, deps: ['staff', 'booking'], price: 12000 },
  { key: 'reviews', label: 'Reviews & Ratings', desc: 'Customer feedback system', primary: false, deps: ['bookingPortal','user'], price: 12000, hidden: true },
  { key: 'feedbackSystem', label: 'Feedback System', desc: 'Client reviews, comments, polls, star rating.', primary: false, deps: ['bookingPortal','user'], price: 6700 },
  // new components: client side systems
  { key: 'clientAccess', label: 'Client Access System', desc: 'Client login, upcoming bookings, basic booking history.', primary: false, deps: ['bookingPortal','user'], price: 8900 },
  { key: 'clientRecord', label: 'Client Record System', desc: 'Visit history, notes, files, feedback linked with each client.', primary: false, deps: ['booking'], price: 11800 },
  { key: 'mapLocation', label: 'Map and Location System', desc: 'Show branches on map, directions link, multi location display.', primary: false, deps: ['bookingPortal'], price: 7800 },
  // new components: communication systems
  { key: 'whatsappAlerts', label: 'WhatsApp Alerts', desc: 'Booking updates, reminders, status messages on WhatsApp.', primary: false, deps: ['notifications'], price: 9200 },
  { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Booking updates, reminders, status messages through SMS.', primary: false, deps: ['notifications'], price: 8700 },
  { key: 'emailAlerts', label: 'Email Alerts', desc: 'Booking updates, reminders, status messages through email.', primary: false, deps: ['notifications'], price: 7800 },
  { key: 'webNotifications', label: 'Web Alerts', desc: 'In browser alerts and booking status for logged in users.', primary: false, deps: ['notifications'], price: 6600 },
  { key: 'reminderControl', label: 'Reminder Controls', desc: 'Custom reminder timing before visit, follow up reminders.', primary: false, deps: ['booking','notifications'], price: 9400 },
  // new components: payment systems
  { key: 'paymentSystem', label: 'Payment System', desc: 'Payment gateway connection, API keys setup, checkout from booking, advance or full payment, live status update, auto update inside booking, complete payment history storage.', primary: false, deps: ['payment'], price: 12000 },
  { key: 'manualUpiCash', label: 'Manual UPI Payment and Cash Collection System', desc: 'Manual UPI entry, cash collection entry, reference number logging, admin verification.', primary: false, deps: ['manualPayment'], price: 8500 },
  { key: 'refundSystem', label: 'Refund System', desc: 'Full or partial refunds, refund status update, refund records linked with booking.', primary: false, deps: ['payment'], price: 9800 },
  { key: 'crm', label: 'CRM Integration', desc: 'Customer relationship management', primary: false, deps: ['booking'], price: 20000, hidden: true },
  { key: 'analytics', label: 'Reports & Analytics', desc: 'Business insights & reports', primary: false, deps: ['booking'], price: 11000, hidden: true },
  { key: 'seo', label: 'SEO & Sitemap', desc: 'Search engine optimization', primary: false, deps: ['bookingPortal'], price: 5000, hidden: true },
  { key: 'security', label: 'Security & Roles', desc: 'Access control & permissions', primary: false, deps: ['adminPanel', 'user'], price: 8000, hidden: true },
];

const BOOKING_GROUPS_CONFIG = [
  { id: 'coreSystems', title: 'Core Systems', desc: 'Always-on modules powering every booking & interaction flow.', accent: 'from-indigo-600 to-cyan-600', items: ['adminPanel', 'bookingPortal', 'serviceCatalog', 'booking', 'notifications'] },
  { id: 'bookingSystems', title: 'Booking Systems', desc: 'Smart booking flows, priorities, and live queue automation.', accent: 'from-indigo-500 to-cyan-500', items: ['bookingEngine', 'priorityBooking', 'selfManageBooking', 'tokenQueue'] },
  { id: 'clientServices', title: 'Client Services', desc: 'Portals and feedback tools to capture every interaction.', accent: 'from-sky-500 to-blue-500', items: ['interactionSystem', 'feedbackSystem'] },
  { id: 'clientSide', title: 'Client Side Systems', desc: 'Self-serve upgrades for clients to access data and locations.', accent: 'from-emerald-500 to-teal-500', items: ['clientAccess', 'clientRecord', 'mapLocation'] },
  { id: 'communication', title: 'Communication Systems', desc: 'Multi-channel alerts, reminders, and notification controls.', accent: 'from-amber-500 to-orange-500', items: ['whatsappAlerts', 'smsAlerts', 'emailAlerts', 'webNotifications', 'reminderControl'] },
  { id: 'staffWork', title: 'Staff & Work Systems', desc: 'Role-based tools for reception, consultants, and managers.', accent: 'from-emerald-500 to-green-500', items: ['staffRoleSystem'] },
  { id: 'paymentSystems', title: 'Payment Systems', desc: 'Collect, verify, and refund payments with full history.', accent: 'from-rose-500 to-red-500', items: ['paymentSystem', 'manualUpiCash', 'refundSystem'] },
];

const ECOM_GRAPH = createComponentGraph(ECOM_COMPONENTS);
const {
  depsMap: ECOM_DEPS_MAP,
  dependentsMap: ECOM_DEPENDENTS_MAP,
  primary: ECOM_PRIMARY_SET,
  labelMap: ECOM_LABEL_MAP,
  componentMap: ECOM_COMPONENT_MAP,
} = ECOM_GRAPH;

const BOOKING_GRAPH = createComponentGraph(BOOKING_COMPONENTS);
const {
  depsMap: BOOK_DEPS_MAP,
  dependentsMap: BOOK_DEPENDENTS_MAP,
  primary: BOOK_PRIMARY_SET,
  labelMap: BOOK_LABEL_MAP,
  componentMap: BOOK_COMPONENT_MAP,
} = BOOKING_GRAPH;

const BOOKING_PRICE_MAP = createPriceMap(BOOKING_COMPONENTS);
const ECOM_PRICE_MAP = createPriceMap(ECOM_COMPONENTS);
const BOOKING_GROUPS = buildComponentGroups(BOOKING_GROUPS_CONFIG, BOOK_COMPONENT_MAP);
const ECOM_GROUPS = buildComponentGroups(ECOM_GROUPS_CONFIG, ECOM_COMPONENT_MAP);
const UNIVERSAL_GROUPS = buildUniversalGroups(BOOKING_GROUPS, ECOM_GROUPS);
const UNIVERSAL_MODULE_TOTAL = UNIVERSAL_GROUPS.reduce((sum, group) => sum + group.items.length, 0);

function buildServiceLookup(servicesByCategory) {
  const map = new Map();
  Object.entries(servicesByCategory).forEach(([categoryId, list]) => {
    list.forEach((svc) => {
      map.set(svc.id, { service: svc, categoryId });
    });
  });
  return map;
}

function createComponentGraph(components) {
  const depsMap = new Map();
  const dependentsMap = new Map();
  const primary = new Set();
  const labelMap = new Map();
  const componentMap = new Map();

  components.forEach((component) => {
    const { key, deps = [], primary: isPrimary, label } = component;
    depsMap.set(key, deps);
    componentMap.set(key, component);
    labelMap.set(key, label);
    dependentsMap.set(key, []);
    if (isPrimary) {
      primary.add(key);
    }
  });

  components.forEach(({ key, deps = [] }) => {
    deps.forEach((depKey) => {
      if (!dependentsMap.has(depKey)) {
        dependentsMap.set(depKey, []);
      }
      dependentsMap.get(depKey).push(key);
    });
  });

  return { depsMap, dependentsMap, primary, labelMap, componentMap };
}

function createPriceMap(components) {
  const map = new Map();
  components.forEach((item) => {
    if (!item.primary) {
      map.set(item.key, typeof item.price === 'number' ? item.price : 2000);
    }
  });
  return map;
}

function buildComponentGroups(config, componentMap) {
  return config
    .map((group) => ({
      ...group,
      items: group.items
        .map((key) => componentMap.get(key))
        .filter((item) => item && !item.hidden),
    }))
    .filter((group) => group.items.length > 0);
}

function buildUniversalGroups(bookingGroups, commerceGroups) {
  const seen = new Set();
  const attachSource = (groups, source) =>
    groups
      .map((group) => {
        const items = group.items
          .filter(Boolean)
          .filter((item) => {
            if (seen.has(item.key)) return false;
            seen.add(item.key);
            return true;
          })
          .map((item) => ({ ...item, source }));
        if (!items.length) return null;
        const prefix = source === 'commerce' ? 'Commerce · ' : '';
        return {
          ...group,
          title: `${prefix}${group.title}`,
          items,
          source,
        };
      })
      .filter(Boolean);
  return [
    ...attachSource(bookingGroups, 'interaction'),
    ...attachSource(commerceGroups, 'commerce'),
  ];
}

function getEcommerceComponentDescription(key, serviceId) {
  if (key === 'product') {
    if (serviceId === 'hosp_booking') return 'Services, categories, schedules';
    if (serviceId === 'online_pharmacy') return 'Medicines, categories, prescriptions';
    if (serviceId === 'book_store') return 'Titles, authors, ISBN, categories';
  }
  return ECOM_COMPONENT_MAP.get(key)?.desc || 'Setup & controls';
}

// ---------------- Motion presets ----------------
const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.3 } }, exit: { opacity: 0, transition: { duration: 0.2 } } };
const scaleIn = { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } }, exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } } };

// ---------------- Main Component ----------------
const SmartPlanner = forwardRef(({ showHero = true, mode = 'modal', onBusinessSelect }, ref) => {
  const isPageMode = mode === 'page';
  // Modal state
  const [isOpen, setIsOpen] = useState(() => isPageMode);
  const prevFocusRef = React.useRef(null);
  const modalRef = React.useRef(null);
  const timeoutsRef = React.useRef([]);
  // Auto theme from global theme system (matches website header toggle)
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });

  React.useEffect(() => {
    if (typeof document === 'undefined' || typeof MutationObserver === 'undefined') return;

    // Watch for changes to the 'dark' class on html element
    const observer = new MutationObserver(() => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      console.log('[SmartPlanner] Theme changed:', isDarkMode ? 'dark' : 'light');
      setIsDark(isDarkMode);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Ensure standalone page always starts scrolled to top
  useEffect(() => {
    if (!isPageMode || typeof window === 'undefined' || typeof window.scrollTo !== 'function') return;
    const frame = window.requestAnimationFrame
      ? window.requestAnimationFrame
      : (cb) => setTimeout(cb, 0);
    frame(() => {
      try {
        window.scrollTo({ top: 0, behavior: 'auto' });
      } catch {
        window.scrollTo(0, 0);
      }
    });
  }, [isPageMode]);

  // Step and forward/back logic (1 = categories, 2 = services, 3 = features)
  const [step, setStep] = useState(1);
  const [maxVisitedStep, setMaxVisitedStep] = useState(1);
  const [category, setCategory] = useState(null);
  const [service, setService] = useState(null);
  const [introEnabled, setIntroEnabled] = useState(false);
  const [dismissedTips, setDismissedTips] = useState({});
  const [tipVisible, setTipVisible] = useState(false);
  const tipTimersRef = React.useRef({ show: null, hide: null });
  // Website feature selection state (for services > biz_website)
  const [pagesCount, setPagesCount] = useState(5); // min 5, max 30
  const [dynamicGallery, setDynamicGallery] = useState(false);
  const [dynamicPagesCount, setDynamicPagesCount] = useState(0);
  const [liveChatEnabled, setLiveChatEnabled] = useState(false);
  const [appointmentBooking, setAppointmentBooking] = useState(false);
  const [estimating, setEstimating] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [hasPersistedProgress, setHasPersistedProgress] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: DEFAULT_QUOTE_MESSAGE,
  });
  const cartFooterSentinelRef = React.useRef(null);
  const [cartBottomLift, setCartBottomLift] = useState(0);
  const hoveredItemRef = React.useRef(null);
  const [rightPanelPosition, setRightPanelPosition] = useState({ top: 84 });

  const clearPersistedProgress = useCallback(() => {
    setHasPersistedProgress(false);
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
    } catch (error) {
      console.warn('[SmartPlanner] Failed to clear progress', error);
    }
  }, []);

  // Cart state management
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [moduleQuantities, setModuleQuantities] = useState({});
  const getModuleQuantityValue = useCallback(
    (item, fallbackSource = null) => {
      if (!item || !item.key) return 1;
      const source = item.source || fallbackSource || 'booking';
      const key = `${source}-${item.key}`;
      return moduleQuantities[key] || 1;
    },
    [moduleQuantities],
  );
  const [collapsedGroups, setCollapsedGroups] = useState({});

  // New states for keyboard navigation and preview panel (Step 3 redesign)
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [previewContent, setPreviewContent] = useState(null);
  const componentRefs = React.useRef([]);

  // Auto-focus first component when Step 3 opens
  useEffect(() => {
    if (step === 3) {
      const metrics = getUniversalMetrics(service?.id === 'client_interaction' ? 'interaction' : service?.id ? 'commerce' : null);
      if (metrics && metrics.groups && metrics.groups.length > 0) {
        const flatList = metrics.groups.flatMap(group => group.items.map(item => ({ ...item, groupTitle: group.title })));
        if (flatList.length > 0) {
          setFocusedIndex(0);
          setPreviewContent(flatList[0]);
        }
      }
    } else {
      setFocusedIndex(-1);
      setPreviewContent(null);
    }
  }, [step, service]);

  // Auto-scroll focused item to center
  useEffect(() => {
    if (focusedIndex >= 0 && componentRefs.current[focusedIndex]) {
      componentRefs.current[focusedIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
  }, [focusedIndex]);

  // Keyboard navigation for Step 3 (Component selection)
  useEffect(() => {
    if (step !== 3) return; // Only active in Step 3

    const handleKeyDown = (e) => {
      // Get current flat component list from Step 3
      const metrics = getUniversalMetrics(service?.id === 'client_interaction' ? 'interaction' : service?.id ? 'commerce' : null);
      if (!metrics || !metrics.groups || metrics.groups.length === 0) return;

      const flatList = metrics.groups.flatMap(group =>
        group.items.map(item => ({
          ...item,
          groupTitle: group.title
        }))
      );

      if (flatList.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = prev + 1 >= flatList.length ? 0 : prev + 1;
            setPreviewContent(flatList[next]);
            return next;
          });
          break;

        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = prev - 1 < 0 ? flatList.length - 1 : prev - 1;
            setPreviewContent(flatList[next]);
            return next;
          });
          break;

        case 'Enter':
          if (focusedIndex >= 0 && focusedIndex < flatList.length) {
            e.preventDefault();
            const item = flatList[focusedIndex];
            if (item.source === 'commerce') {
              toggleEcomComponent(item.key);
            } else {
              toggleBookingComponent(item.key);
            }
          }
          break;

        case 'Escape':
          e.preventDefault();
          setFocusedIndex(-1);
          setPreviewContent(null);
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, focusedIndex, service]);

  // Services configuration to reduce duplication while preserving visuals
  useEffect(() => {
    if (typeof onBusinessSelect === 'function') {
      onBusinessSelect(category);
    }
  }, [category, onBusinessSelect]);
  const clearTipTimers = useCallback(() => {
    const timers = tipTimersRef.current;
    if (timers.show) clearTimeout(timers.show);
    if (timers.hide) clearTimeout(timers.hide);
    tipTimersRef.current = { show: null, hide: null };
  }, []);
  const handleDismissTip = useCallback((tipKey) => {
    if (!tipKey) return;
    setDismissedTips(prev => (prev[tipKey] ? prev : { ...prev, [tipKey]: true }));
    setTipVisible(false);
    clearTipTimers();
  }, [clearTipTimers]);
  const updatePagesCount = (value) => {
    const parsed = typeof value === 'number' ? value : parseInt(value, 10);
    const safeValue = Number.isNaN(parsed) ? MIN_PAGES : parsed;
    const clamped = Math.max(MIN_PAGES, Math.min(MAX_PAGES, safeValue));
    setPagesCount(clamped);
    setDynamicPagesCount((prev) => Math.max(0, Math.min(prev, Math.max(0, clamped - 2))));
  };
  const updateDynamicPagesCount = (value) => {
    const maxDynamic = Math.max(0, pagesCount - 2);
    const parsed = typeof value === 'number' ? value : parseInt(value, 10);
    const safeValue = Number.isNaN(parsed) ? 0 : parsed;
    const clamped = Math.max(0, Math.min(maxDynamic, safeValue));
    setDynamicPagesCount(clamped);
  };
  // Ecommerce feature selection (for retail > online_ordering)
  const [bookingSelected, setBookingSelected] = useState(new Set());
  React.useEffect(() => { setBookingSelected(new Set(BOOK_PRIMARY_SET)); }, []);
  function bookingAutoSelectDependencies(key, setRef = bookingSelected){
    const newly=[]; (function dfs(k){ const deps=BOOK_DEPS_MAP.get(k)||[]; for(const d of deps){ if(!setRef.has(d)){ setRef.add(d); newly.push(d); dfs(d);} } })(key);
    return newly; // used for messaging if needed
  }
  function toggleBookingComponent(key){
    const next=new Set(bookingSelected);
    if(BOOK_PRIMARY_SET.has(key)){
      // lock primaries
      return;
    }
    if(next.has(key)){
      // deselect key, then cascade remove dependents that are no longer justified
      next.delete(key);
      const removed=[key]; const q=[key]; const seen=new Set([key]);
      while(q.length){
        const cur=q.shift();
        const deps=(BOOK_DEPENDENTS_MAP.get(cur)||[]);
        for(const d of deps){ if(seen.has(d)) continue; seen.add(d); if(next.has(d) && !BOOK_PRIMARY_SET.has(d)){ next.delete(d); removed.push(d); q.push(d);} }
      }
      setBookingSelected(new Set(next));
    } else {
      next.add(key);
      const autoDeps = bookingAutoSelectDependencies(key, next);
      setBookingSelected(new Set(next));
      if(autoDeps.length){
        const addedLabels = autoDeps.map((depKey) => BOOK_COMPONENT_MAP.get(depKey)?.label || depKey);
        const parentLabel = BOOK_COMPONENT_MAP.get(key)?.label || key;
        setSelectionToast({
          title: 'Auto dependencies',
          message: `${parentLabel} enabled: ${addedLabels.join(', ')}`,
        });
      }
    }
  }
  const [ecomSelected, setEcomSelected] = useState(new Set());
  const [selectionToast, setSelectionToast] = useState(null); // {title, message}
  React.useEffect(() => { setEcomSelected(new Set(ECOM_PRIMARY_SET)); }, []);
  React.useEffect(() => { if(!selectionToast) return; const t=setTimeout(()=>setSelectionToast(null), 2200); return ()=>clearTimeout(t); }, [selectionToast]);
  function ecomAutoSelectDependencies(key, setRef = ecomSelected) {
    const newly = [];
    (function dfs(k){
      const deps = ECOM_DEPS_MAP.get(k)||[];
      for(const d of deps){ if(!setRef.has(d)){ setRef.add(d); newly.push(d); dfs(d);} }
    })(key);
    if(newly.length>0){
      const prim = newly.filter(k=>ECOM_PRIMARY_SET.has(k));
      const msg = prim.length>0 ? `Primary auto-enabled: ${ECOM_LABEL_MAP.get(prim[0])}` : `Dependencies: ${newly.map(k=>ECOM_LABEL_MAP.get(k)).join(', ')}`;
      setSelectionToast({title:'Auto dependencies', message: msg});
    }
  }
  function toggleEcomComponent(key){
    const next = new Set(ecomSelected);
    if(ECOM_PRIMARY_SET.has(key)){
      if(next.has(key)){
        setSelectionToast({title:'Required', message:`${ECOM_LABEL_MAP.get(key)} is required for core e-commerce.`});
      } else { next.add(key); }
      setEcomSelected(new Set(next));
      return;
    }
    const cascadeRemove = (rootKey, setRef) => {
      const removed=[]; const q=[rootKey]; const seen=new Set();
      while(q.length){ const cur=q.shift(); const deps=(ECOM_DEPENDENTS_MAP.get(cur)||[]); for(const d of deps){ if(seen.has(d)) continue; seen.add(d); if(setRef.has(d) && !ECOM_PRIMARY_SET.has(d)){ setRef.delete(d); removed.push(d); q.push(d);} } }
      return removed;
    };
    if(next.has(key)){
      next.delete(key);
      const removed = cascadeRemove(key, next);
      setEcomSelected(new Set(next));
      const msg = removed.length ? `Removed dependents: ${removed.map(k=>ECOM_LABEL_MAP.get(k)).join(', ')}` : `Removed ${ECOM_LABEL_MAP.get(key)}`;
      setSelectionToast({title:'Updated', message: msg});
      return;
    } else {
      next.add(key);
      ecomAutoSelectDependencies(key, next);
      setEcomSelected(new Set(next));
      return;
    }
  }

  const markIntroAccepted = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage?.setItem(INTRO_STORAGE_KEY, JSON.stringify({ timestamp: Date.now() }));
    } catch (e) {}
  }, []);

  const hasValidIntroAgreement = useCallback(() => {
    if (typeof window === 'undefined') return false;
    try {
      const stored = window.localStorage?.getItem(INTRO_STORAGE_KEY);
      if (!stored) return false;
      let timestamp = null;
      try {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object' && typeof parsed.timestamp === 'number') {
          timestamp = parsed.timestamp;
        } else if (typeof parsed === 'number') {
          timestamp = parsed;
        }
      } catch {
        const numeric = Number(stored);
        if (!Number.isNaN(numeric)) {
          timestamp = numeric;
        }
      }
      if (typeof timestamp !== 'number' || !Number.isFinite(timestamp)) return false;
      return Date.now() - timestamp < INTRO_EXPIRY_MS;
    } catch (e) {
      return false;
    }
  }, []);

  const resetPlanner = useCallback(() => {
    setStep(1);
    setMaxVisitedStep(1);
    setCategory(null);
    setService(null);
    setTipVisible(false);
    clearTipTimers();
  }, [clearTipTimers]);

  const openPlanner = useCallback((options) => {
    const preserveStateRequested = Boolean(
      options &&
        typeof options === 'object' &&
        'preserveState' in options &&
        options.preserveState
    );
    const introAccepted = hasValidIntroAgreement();
    const shouldRestoreState = preserveStateRequested && introAccepted;
    const showIntro = !introAccepted;

    if (!shouldRestoreState) {
      if (preserveStateRequested && !introAccepted) {
        clearPersistedProgress();
      }
      setIntroEnabled(showIntro);
      setCategory(null);
      setService(null);
      setStep(showIntro ? 0 : 1);
      setMaxVisitedStep(showIntro ? 0 : 1);
    } else {
      setIntroEnabled(false);
    }
    try { prevFocusRef.current = document.activeElement; } catch {}
    setIsOpen(true);
    track("planner_open");
  }, [hasValidIntroAgreement, clearPersistedProgress]);

  const closePlanner = useCallback(() => {
    setIsOpen(false);
    resetPlanner();
    clearPersistedProgress();
    track("planner_close");
    try { if (prevFocusRef.current && prevFocusRef.current.focus) prevFocusRef.current.focus(); } catch {}
  }, [resetPlanner, clearPersistedProgress]);

  useImperativeHandle(ref, () => ({
    open: openPlanner,
    close: closePlanner
  }));

  useEffect(() => {
    return () => clearTipTimers();
  }, [clearTipTimers]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setProgressLoaded(true);
      return;
    }
    let restored = false;
    try {
      const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        const savedAt = data && typeof data.savedAt === 'number' && Number.isFinite(data.savedAt) ? data.savedAt : null;
        const isFresh = typeof savedAt === 'number' ? (Date.now() - savedAt) < PROGRESS_EXPIRY_MS : false;
        if (!isFresh) {
          try {
            window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
          } catch (err) {
            console.warn('[SmartPlanner] Failed to drop expired progress', err);
          }
        } else if (data && typeof data === 'object') {
          const savedStep = typeof data.step === 'number' ? Math.max(1, Math.min(3, data.step)) : null;
          const savedMax = typeof data.maxVisitedStep === 'number' ? Math.max(1, Math.min(3, data.maxVisitedStep)) : null;
          if (savedStep !== null) {
            setStep(savedStep);
            restored = true;
          }
          if (savedMax !== null) {
            setMaxVisitedStep(savedMax);
          } else if (savedStep !== null) {
            setMaxVisitedStep(savedStep);
          }
          if (data.categoryId) {
            const cat = CATEGORY_LOOKUP.get(data.categoryId);
            if (cat) {
              setCategory(cat);
              restored = true;
            }
          }
          if (data.serviceId) {
            const svcEntry = SERVICE_LOOKUP.get(data.serviceId);
            if (svcEntry?.service) {
              setService(svcEntry.service);
              restored = true;
              if (!data.categoryId && svcEntry.categoryId) {
                const fallbackCategory = CATEGORY_LOOKUP.get(svcEntry.categoryId);
                if (fallbackCategory) {
                  setCategory(fallbackCategory);
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.warn('[SmartPlanner] Failed to load progress', error);
    } finally {
      setHasPersistedProgress(restored);
      setProgressLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!progressLoaded) return;
    if (isPageMode) {
      openPlanner(hasPersistedProgress ? { preserveState: true } : undefined);
    }
  }, [isPageMode, progressLoaded, hasPersistedProgress, openPlanner]);

  const updateRightPanelPosition = useCallback(() => {
    if (!hoveredItemRef.current || typeof window === 'undefined') return;

    const itemRect = hoveredItemRef.current.getBoundingClientRect();
    const headerHeight = isPageMode ? (window.innerWidth >= 1024 ? 124 : window.innerWidth >= 640 ? 104 : 84) : 80;
    const viewportHeight = window.innerHeight;
    const panelHeight = 400; // approximate panel height

    const itemTop = itemRect.top;
    const itemBottom = itemRect.bottom;

    // Check if there's space below the item
    const spaceBelow = viewportHeight - itemBottom;
    const spaceAbove = itemTop - headerHeight;

    let position = {};

    if (spaceBelow >= panelHeight || spaceBelow >= spaceAbove) {
      // Position below/aligned with item
      position = { top: Math.max(headerHeight, itemTop), bottom: 'auto' };
    } else {
      // Position above (align bottom with item top)
      position = { bottom: Math.max(20, viewportHeight - itemTop), top: 'auto' };
    }

    setRightPanelPosition(position);
  }, [isPageMode]);

  useEffect(() => {
    updateRightPanelPosition();

    const handleScroll = () => {
      updateRightPanelPosition();
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [previewContent, updateRightPanelPosition]);

  useEffect(() => {
    if (typeof window === 'undefined' || !progressLoaded) return;
    try {
      window.localStorage.setItem(
        PROGRESS_STORAGE_KEY,
        JSON.stringify({
          step,
          maxVisitedStep,
          categoryId: category?.id ?? null,
          serviceId: service?.id ?? null,
          savedAt: Date.now(),
        }),
      );
    } catch (error) {
      console.warn('[SmartPlanner] Failed to persist progress', error);
    }
  }, [step, maxVisitedStep, category, service, progressLoaded]);

  // Handlers
  const onPickCategory = useCallback((c) => {
    setCategory(c);
    setService(null);
    setStep(2);
    setMaxVisitedStep(2);
    track("pick_category", { id: c.id });
  }, []);

  const onBack = useCallback(() => {
    if (step > 1) {
      setStep((s) => s - 1);
      track("back", { step });
    }
  }, [step]);

  const onForward = useCallback(() => {
    if (step < maxVisitedStep) {
      setStep((s) => s + 1);
      track("forward", { to: step + 1 });
    }
  }, [step, maxVisitedStep]);


  const renderServiceButtons = () => {
    if (!category) return null;

    if (category.id === "services" || category.id === "hospitality" || category.id === "corporate") {
      const items = SERVICES_OPTIONS[category.id];
      const defaultIconColor = category.id === 'services'
        ? 'text-blue-400'
        : category.id === 'hospitality'
          ? 'text-rose-400'
          : 'text-teal-400';
      return (
        <div className={`flex-1 min-h-0 pr-1 sm:pr-2 custom-scrollbar ${!isPageMode ? 'overflow-y-auto' : ''}`}>
          <div className="flex flex-col gap-3 w-full">
            {items.map((s, idx) => {
              const isSelected = service?.id === s.id;
              const baseCardClass = isDark
                ? 'bg-slate-800/80 border border-slate-600/60 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-50 shadow-lg shadow-slate-900/40'
                : 'bg-white border border-slate-200 hover:border-cyan-500/40 hover:shadow-lg text-slate-900';
              const selectedCardClass = `bg-gradient-to-br ${s.gradient} text-white border-transparent shadow-2xl`;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                  const requiresFeatures = WEBSITE_SERVICE_IDS.has(s.id) || ECOM_SERVICE_IDS.has(s.id) || BOOKING_SERVICE_IDS.has(s.id);
                    setService(s);
                    setMaxVisitedStep(requiresFeatures ? 3 : 2);
                    if (requiresFeatures) {
                      setStep(3);
                    }
                    track("pick_service", { category: category.id, id: s.id });
                  }}
                  className={`relative group w-full rounded-2xl p-5 sm:p-6 text-left transition-all duration-300 overflow-hidden min-h-[180px] flex flex-col items-center justify-center gap-4 text-center ${focusRing} ${
                    isSelected ? selectedCardClass : baseCardClass
                  }`}
                >
                  {isSelected && (
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.gradient} opacity-40 blur-2xl -z-10`} />
                  )}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isSelected ? 'bg-white/20' : (isDark ? 'bg-slate-800' : 'bg-slate-100')}`}>
                    <s.icon className={`w-8 h-8 ${isSelected ? 'text-white' : defaultIconColor}`} />
                  </div>
                  <div className="space-y-2">
                    <h3 className={`text-lg font-bold leading-snug ${isSelected ? 'text-white' : (isDark ? 'text-slate-100' : 'text-slate-900')}`}>
                      {s.label}
                    </h3>
                    {s.desc && (
                      <p className={`text-sm ${isSelected ? 'text-white/90' : textMuted}`}>
                        {s.desc}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
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
          : 'from-indigo-600 to-teal-600';
      const defaultIconColor = isHealth
        ? 'text-emerald-400'
        : isRetail
          ? 'text-amber-400'
          : 'text-indigo-400';

      return (
        <div className={`flex-1 min-h-0 flex flex-col space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-3 lg:gap-4 pr-1 sm:pr-2 custom-scrollbar ${!isPageMode ? 'overflow-y-auto' : ''}`}>
          {items.map((s, idx) => {
            const isSelected = service?.id === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  const requiresFeatures = WEBSITE_SERVICE_IDS.has(s.id) || ECOM_SERVICE_IDS.has(s.id) || BOOKING_SERVICE_IDS.has(s.id);
                  setService(s);
                  setMaxVisitedStep(requiresFeatures ? 3 : 2);
                  if (requiresFeatures) {
                    setStep(3);
                  }
                  track("pick_service", { category: category.id, id: s.id });
                }}
                className={`relative rounded-xl sm:rounded-2xl p-3 sm:p-4 text-left transition-all overflow-hidden flex-1 sm:flex-none ${focusRing} ${
                  isSelected
                    ? `bg-gradient-to-br ${selectedGradient} shadow-xl border-2 border-white/20`
                    : (isDark ? 'bg-slate-800/50 border-2 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/80' : 'bg-white border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg')
                }`}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center ${
                    isSelected ? 'bg-white/20' : (isDark ? 'bg-slate-700/50' : 'bg-slate-100')
                  }`}>
                    <s.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${isSelected ? 'text-white' : defaultIconColor}`} />
                  </div>
                  <div className="min-w-0">
                    <h3 className={`text-base sm:text-lg font-bold mb-1 ${isSelected ? 'text-white' : (isDark ? 'text-slate-200' : 'text-slate-800')}`}>{s.label}</h3>
                    {s.desc && (
                      <p className={`text-xs sm:text-sm ${isSelected ? 'text-white/90' : textMuted}`}>{s.desc}</p>
                    )}
                  </div>
                </div>
                </button>
            );
          })}
        </div>
      );
    }

    return (
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <div className="text-center py-12">
          <div className={emptyBoxClass}>
            <HelpCircle className="w-10 h-10 text-slate-500" />
          </div>
          <p className={emptyTitleClass}>Services Coming Soon</p>
          <p className={emptySubClass}>This category will be available shortly</p>
        </div>
      </div>
    );
  };

  // Progress calculation with optional Welcome step - memoized for performance
  const { stepsLabels, currentIndex, progress, stepsCount, progressLeft, progressWidth } = useMemo(() => {
    const labels = introEnabled ? ['Welcome', 'Category', 'Services', 'Features'] : ['Category', 'Services', 'Features'];
    const index = Math.max(0, Math.min(introEnabled ? step : step - 1, labels.length - 1));
    const prog = ((index + 1) / labels.length) * 100;
    const count = labels.length;
    const left = `calc(100% / (2 * ${count}))`;
    const width = `calc((100% * ${index}) / ${count})`;
    return { stepsLabels: labels, currentIndex: index, progress: prog, stepsCount: count, progressLeft: left, progressWidth: width };
  }, [introEnabled, step]);

  // Theme-aware utility classes used in a few key places
  const heroBg = isDark
    ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800'
    : 'bg-gradient-to-br from-white via-slate-50 to-white';
  const heroSubText = isDark ? 'text-slate-400' : 'text-slate-600';
  const heroFeatureText = isDark ? 'text-slate-300' : 'text-slate-700';
  // Planner theme helpers
  const textHeading = isDark ? 'text-white' : 'text-slate-900';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-600';
  const textSecondary = isDark ? 'text-slate-300' : 'text-slate-700';
  const plannerCard = 'bg-transparent border-0 shadow-none';
  const closeBtnClass = isDark
    ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 text-white'
    : 'bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-slate-300 text-slate-700';
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
  const forwardButtonDisabled = useMemo(() => {
    if (introEnabled && step === 0) return true;
    if (step === 1) return step >= maxVisitedStep || !category;
    if (step === 2) return step >= maxVisitedStep || !service;
    if (step === 3) return step >= maxVisitedStep || !service;
    return step >= maxVisitedStep;
  }, [introEnabled, step, maxVisitedStep, category, service]);
  const pageCardWrapper = isPageMode
    ? 'relative flex flex-col'
    : 'relative flex flex-col bg-transparent border-0 shadow-none';
  const pageInnerPadding = isPageMode
    ? 'flex-1 flex flex-col min-h-0 p-2 sm:p-3 md:p-4 lg:p-5'
    : 'flex-1 flex flex-col min-h-0 p-4 sm:p-6 md:p-8 lg:p-10';
  const pageFixedHeight = 'min-h-[640px] sm:min-h-[680px] lg:min-h-[720px]';
  const serviceCardCount = category ? (SERVICES_OPTIONS[category?.id]?.length || 0) : 0;
  const isCreativeWebsite = service?.id === 'biz_website';
  const serviceSectionWidthClass = isCreativeWebsite ? 'max-w-3xl' : (serviceCardCount >= 4 ? 'max-w-6xl' : 'max-w-3xl');
  const progressTrackerProps = useMemo(() => ({
    progressTrackClass,
    progressLeft,
    progressWidth,
    stepsLabels,
    currentIndex,
    stepInactiveCircleClass,
    stepLabelActive,
    stepLabelInactive,
  }), [
    progressTrackClass,
    progressLeft,
    progressWidth,
    stepsLabels,
    currentIndex,
    stepInactiveCircleClass,
    stepLabelActive,
    stepLabelInactive,
  ]);
  const universalSelectedModules = useMemo(() => (
    UNIVERSAL_GROUPS.flatMap((group) =>
      group.items.filter((item) => (
        item.source === 'commerce'
          ? ecomSelected.has(item.key)
          : bookingSelected.has(item.key)
      ))
    )
  ), [bookingSelected, ecomSelected]);
  const universalOptionalModules = useMemo(() => universalSelectedModules.filter((item) => {
    const primarySet = item.source === 'commerce' ? ECOM_PRIMARY_SET : BOOK_PRIMARY_SET;
    return !primarySet.has(item.key);
  }), [universalSelectedModules]);
  const universalOptionalCost = useMemo(() => universalOptionalModules.reduce((sum, item) => {
    const priceMap = item.source === 'commerce' ? ECOM_PRICE_MAP : BOOKING_PRICE_MAP;
    const fallback = item.source === 'commerce' ? ECOM_DEFAULT_MODULE_PRICE : 2000;
    const unitPrice = priceMap.get(item.key) ?? fallback;
    const quantity = getModuleQuantityValue(item);
    return sum + unitPrice * quantity;
  }, 0), [universalOptionalModules, getModuleQuantityValue]);
  const universalPrimaryCount = universalSelectedModules.length - universalOptionalModules.length;
  const universalSelectionRatio = UNIVERSAL_MODULE_TOTAL > 0
    ? Math.max(0, Math.min(1, universalSelectedModules.length / UNIVERSAL_MODULE_TOTAL))
    : 0;
  const optionalSelectionCount = universalOptionalModules.length;
  const prevOptionalCountRef = React.useRef(optionalSelectionCount);

  useEffect(() => {
    const prevCount = prevOptionalCountRef.current;
    if (optionalSelectionCount > 0 && prevCount === 0) {
      setIsCartOpen(true);
    } else if (optionalSelectionCount === 0 && prevCount > 0) {
      setIsCartOpen(false);
    }
    prevOptionalCountRef.current = optionalSelectionCount;
  }, [optionalSelectionCount]);

  const updateCartBottomLift = useCallback(() => {
    if (!isPageMode || typeof window === 'undefined' || !cartFooterSentinelRef.current) {
      if (cartBottomLift !== 0) setCartBottomLift(0);
      return;
    }
    const rect = cartFooterSentinelRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    const overlap = Math.max(0, viewportHeight - rect.top);
    const newLift = overlap > 0 ? overlap : 0;
    if (Math.abs(newLift - cartBottomLift) > 1) {
      setCartBottomLift(newLift);
    } else if (newLift === 0 && cartBottomLift !== 0) {
      setCartBottomLift(0);
    }
  }, [cartBottomLift, isPageMode]);

  useEffect(() => {
    if (typeof window === 'undefined' || !isPageMode) return undefined;
    updateCartBottomLift();
    const handle = () => updateCartBottomLift();
    window.addEventListener('scroll', handle, { passive: true });
    window.addEventListener('resize', handle);
    return () => {
      window.removeEventListener('scroll', handle);
      window.removeEventListener('resize', handle);
    };
  }, [isPageMode, updateCartBottomLift]);

  const openQuoteModal = useCallback(() => {
    setQuoteForm((prev) => ({
      ...prev,
      message: prev.message && prev.message.trim().length > 0 ? prev.message : DEFAULT_QUOTE_MESSAGE,
    }));
    setQuoteModalOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setQuoteModalOpen(false);
  }, []);

  const handleQuoteInputChange = useCallback((field, value) => {
    setQuoteForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleQuoteSubmit = useCallback((event) => {
    event.preventDefault();
    track('quote_submit', quoteForm);
    setQuoteModalOpen(false);
  }, [quoteForm]);
  const getUniversalMetrics = useCallback((filterSource) => {
    if (filterSource === 'commerce') {
      const groups = UNIVERSAL_GROUPS.filter((group) => group.source === 'commerce');
      if (!groups.length) return null;
      const items = groups.flatMap((group) => group.items);
      const selectedModules = items.filter((item) => ecomSelected.has(item.key));
      const optionalModules = selectedModules.filter((item) => !ECOM_PRIMARY_SET.has(item.key));
      const optionalCost = optionalModules.reduce((sum, item) => {
        const unitPrice = ECOM_PRICE_MAP.get(item.key) ?? ECOM_DEFAULT_MODULE_PRICE;
        const quantity = getModuleQuantityValue(item, 'commerce');
        return sum + unitPrice * quantity;
      }, 0);
      const primaryCount = selectedModules.length - optionalModules.length;
      const selectionRatio = ECOM_COMPONENTS.length
        ? Math.max(0, Math.min(1, ecomSelected.size / ECOM_COMPONENTS.length))
        : 0;
      return {
        groups,
        selectedModules,
        optionalModules,
        optionalCost,
        primaryCount,
        selectionRatio,
        basePrice: ECOM_BASE_PRICE,
        source: 'commerce',
      };
    }
    if (filterSource === 'interaction') {
      const groups = UNIVERSAL_GROUPS.filter((group) => group.source === 'interaction');
      if (!groups.length) return null;
      const items = groups.flatMap((group) => group.items);
      const selectedModules = items.filter((item) => bookingSelected.has(item.key));
      const optionalModules = selectedModules.filter((item) => !BOOK_PRIMARY_SET.has(item.key));
      const optionalCost = optionalModules.reduce((sum, item) => {
        const unitPrice = BOOKING_PRICE_MAP.get(item.key) ?? 2000;
        const quantity = getModuleQuantityValue(item, 'interaction');
        return sum + unitPrice * quantity;
      }, 0);
      const primaryCount = selectedModules.length - optionalModules.length;
      const selectionRatio = BOOKING_COMPONENTS.length
        ? Math.max(0, Math.min(1, bookingSelected.size / BOOKING_COMPONENTS.length))
        : 0;
      return {
        groups,
        selectedModules,
        optionalModules,
        optionalCost,
        primaryCount,
        selectionRatio,
        basePrice: BOOKING_BASE_PRICE,
        source: 'interaction',
      };
    }
    return {
      groups: UNIVERSAL_GROUPS,
      selectedModules: universalSelectedModules,
      optionalModules: universalOptionalModules,
      optionalCost: universalOptionalCost,
      primaryCount: universalPrimaryCount,
      selectionRatio: universalSelectionRatio,
      basePrice: BOOKING_BASE_PRICE,
      source: 'all',
    };
  }, [
    UNIVERSAL_GROUPS,
    universalSelectedModules,
    universalOptionalModules,
    universalOptionalCost,
    universalPrimaryCount,
    universalSelectionRatio,
    ecomSelected,
    bookingSelected,
    getModuleQuantityValue,
  ]);
  

  const getStepTipMessage = () => {
    if (introEnabled && step === 0) return null;
    if (step === 1) return "Use this tool anytime, as many times as you need — it's completely free.";
    if (step === 2) return 'Each service has different features and pricing flows. Review them carefully before you continue.';
    if (step === 3) return 'Toggle different feature combinations to see live price changes before you share final requirements.';
    return null;
  };
  const stepTipMessage = getStepTipMessage();
  const currentTipKey = stepTipMessage ? `step-${step}` : null;
  const isCurrentTipDismissed = currentTipKey ? Boolean(dismissedTips[currentTipKey]) : false;

  useEffect(() => {
    if (!isOpen || !stepTipMessage || isCurrentTipDismissed) {
      setTipVisible(false);
      clearTipTimers();
      return;
    }

    clearTipTimers();
    setTipVisible(false);

    const scheduleCycle = (delay) => {
      tipTimersRef.current.show = setTimeout(() => {
        setTipVisible(true);
        tipTimersRef.current.hide = setTimeout(() => {
          setTipVisible(false);
          scheduleCycle(TIP_HIDE_DURATION);
        }, TIP_SHOW_DURATION);
      }, delay);
    };

    scheduleCycle(TIP_INITIAL_DELAY);

    return () => clearTipTimers();
  }, [isOpen, stepTipMessage, isCurrentTipDismissed, clearTipTimers]);

  const renderStepTip = () => {
    const shouldShowTip = Boolean(stepTipMessage) && tipVisible && !isCurrentTipDismissed;
    const dismissCurrentTip = () => {
      if (currentTipKey) {
        handleDismissTip(currentTipKey);
      }
    };
    return (
      <AnimatePresence mode="wait">
        {shouldShowTip && (
          <motion.div
            key={`tip-${step}`}
            initial={{ opacity: 0, y: 24, scale: 0.6, rotate: -4 }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: [ -4, 2, -1, 0 ],
              scale: [ 0.6, 1.1, 0.96, 1 ],
            }}
            exit={{
              opacity: [1, 0.9, 0],
              scale: [1, 1.2, 0.8],
              rotate: [0, 4, -6],
              y: [0, -6, -14],
              filter: ['blur(0px)', 'blur(1px)', 'blur(3px)']
            }}
            transition={{ duration: 0.4, times: [0, 0.6, 1], ease: 'easeInOut' }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[1500]"
          >
            <div className="flex flex-col items-end gap-6">
              <div
                className="relative mr-16 cursor-pointer select-none"
                onClick={dismissCurrentTip}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dismissCurrentTip();
                  }
                }}
              >
                <div
                  className={`overflow-hidden rounded-3xl border shadow-2xl pr-12 ${
                    isDark
                      ? 'bg-slate-900/95 border-slate-700 text-slate-100 shadow-blue-900/40'
                      : 'bg-white border-blue-100 text-slate-700 shadow-blue-500/30'
                  } w-[min(80vw,26rem)]`}
                >
                  <div className="px-6 pt-4 pb-5 text-base leading-relaxed">
                    <p className="text-base sm:text-lg leading-relaxed">{stepTipMessage}</p>
                  </div>
                  <span
                    className={`pointer-events-none absolute -bottom-3 right-16 h-4 w-4 rounded-full ${
                      isDark ? 'bg-slate-900/95' : 'bg-white'
                    }`}
                  />
                  <span
                    className={`pointer-events-none absolute -bottom-6 right-10 h-3 w-3 rounded-full ${
                      isDark ? 'bg-slate-900/80' : 'bg-white/90'
                    }`}
                  />
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); dismissCurrentTip(); }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      e.stopPropagation();
                      dismissCurrentTip();
                    }
                  }}
                  className={`absolute -top-3 -right-3 h-8 w-8 flex items-center justify-center rounded-full border shadow-lg transition-colors ${
                    isDark ? 'bg-slate-900 text-slate-200 border-slate-800 hover:bg-slate-800' : 'bg-white text-slate-500 border-blue-100 hover:bg-blue-50'
                  }`}
                  aria-label="Dismiss tip"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div
                className={`flex items-center justify-center rounded-3xl border-4 ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-cyan-200 shadow-[0_18px_30px_rgba(15,23,42,0.6)]'
                    : 'bg-white border-blue-100 text-blue-600 shadow-[0_18px_30px_rgba(59,130,246,0.35)]'
                } h-16 w-16`}
              >
                <Bot className="h-8 w-8" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const navTopClass = isPageMode ? 'sm:top-2' : 'sm:top-12';
  const progressTopClass = isPageMode ? 'top-6' : 'top-10';

  const StepNavButtons = React.memo(({ disableBack, disableForward }) => (
    <div className={`flex items-center gap-1 sm:gap-1.5 px-1 mb-2 sm:px-0 sm:mb-0 sm:absolute ${navTopClass} sm:left-6 sm:z-20`}>
      <button
        onClick={onBack}
        disabled={disableBack}
        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all ${
          disableBack
            ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 shadow-lg'
        }`}
      >
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={onForward}
        disabled={disableForward}
        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all ${
          disableForward
            ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
            : 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
        }`}
      >
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  ));
  const StepperControl = React.memo(({ value, min, max, onChange, ariaLabel, step = 1, compact = false }) => {
    const [displayValue, setDisplayValue] = React.useState(String(value));
    React.useEffect(() => {
      setDisplayValue(String(value));
    }, [value]);
    const decreaseDisabled = value <= min;
    const increaseDisabled = value >= max;
    const commitValue = (raw) => {
      const parsed = parseInt(raw, 10);
      const safeValue = Number.isNaN(parsed) ? min : parsed;
      const clamped = Math.max(min, Math.min(max, safeValue));
      setDisplayValue(String(clamped));
      onChange(clamped);
    };
    const handleInputChange = (e) => {
      const digitsOnly = e.target.value.replace(/[^\d]/g, '');
      setDisplayValue(digitsOnly);
    };
    const handleBlur = () => {
      commitValue(displayValue);
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        commitValue(displayValue);
      }
    };
    const handleDecrease = () => {
      if (decreaseDisabled) return;
      const next = Math.max(min, value - step);
      onChange(next);
    };
    const handleIncrease = () => {
      if (increaseDisabled) return;
      const next = Math.min(max, value + step);
      onChange(next);
    };
    const wrapperClass = compact
      ? (isDark
          ? 'inline-flex items-center gap-1 rounded-lg border-2 border-slate-700 bg-slate-900/60 px-1 py-0.5 sm:px-1.5 sm:py-1'
          : 'inline-flex items-center gap-1 rounded-lg border-2 border-slate-200 bg-white px-1 py-0.5 sm:px-1.5 sm:py-1')
      : (isDark
          ? 'inline-flex items-center gap-0.5 sm:gap-2 rounded-lg sm:rounded-xl border-2 border-slate-700 bg-slate-900/70 px-1 py-0.5 sm:px-2 sm:py-1.5'
          : 'inline-flex items-center gap-0.5 sm:gap-2 rounded-lg sm:rounded-xl border-2 border-slate-200 bg-white px-1 py-0.5 sm:px-2 sm:py-1.5');
    const activeBtnClass = isDark
      ? 'bg-slate-800 border-2 border-slate-700 text-white hover:bg-slate-700'
      : 'bg-slate-100 border-2 border-slate-200 text-slate-700 hover:bg-slate-200';
    const disabledBtnClass = isDark
      ? 'bg-slate-800/60 border-2 border-slate-700 text-slate-500 cursor-not-allowed'
      : 'bg-slate-100/70 border-2 border-slate-200 text-slate-400 cursor-not-allowed';
    const buttonSizeClass = compact ? 'w-6 h-6 sm:w-9 sm:h-9' : 'w-7 h-7 sm:w-12 sm:h-12';
    const iconSizeClass = compact ? 'w-3.5 h-3.5 sm:w-4 sm:h-4' : 'w-3.5 h-3.5 sm:w-5 sm:h-5';
    const inputClass = compact
      ? (isDark
          ? 'w-8 sm:w-12 text-center text-sm font-semibold text-white bg-transparent outline-none'
          : 'w-8 sm:w-12 text-center text-sm font-semibold text-slate-900 bg-transparent outline-none')
      : (isDark
          ? 'w-8 sm:w-16 text-center text-sm sm:text-base font-semibold text-white bg-transparent outline-none'
          : 'w-8 sm:w-16 text-center text-sm sm:text-base font-semibold text-slate-900 bg-transparent outline-none');
    return (
      <div className={wrapperClass}>
        <button
          type="button"
          onClick={handleDecrease}
          disabled={decreaseDisabled}
          aria-label={`Decrease ${ariaLabel}`}
          className={`${buttonSizeClass} rounded-md sm:rounded-lg flex items-center justify-center transition ${decreaseDisabled ? disabledBtnClass : activeBtnClass}`}
        >
          <Minus className={iconSizeClass} />
        </button>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          aria-label={ariaLabel}
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={inputClass}
        />
        <button
          type="button"
          onClick={handleIncrease}
          disabled={increaseDisabled}
          aria-label={`Increase ${ariaLabel}`}
          className={`${buttonSizeClass} rounded-md sm:rounded-lg flex items-center justify-center transition ${increaseDisabled ? disabledBtnClass : activeBtnClass}`}
        >
          <Plus className={iconSizeClass} />
        </button>
      </div>
    );
  });
  const handleEstimateRequest = () => {
    if (!canEstimate || !service || estimating) return;
    setEstimating(true);
    setEstimatedPrice(null);

    const minDelay = 500;
    const maxDelay = 3000;
    const jitter = Math.floor(Math.random() * 201) - 100;
    const runEstimate = (ratio, computeTotal) => {
      const safeRatio = Math.max(0, Math.min(1, ratio));
      const delay = Math.max(minDelay, Math.min(maxDelay, Math.round(minDelay + safeRatio * (maxDelay - minDelay) + jitter)));
      scheduleTimeout(() => {
        setEstimatedPrice(computeTotal());
        setEstimating(false);
      }, delay);
    };

    if (isWebsiteService) {
      const maxDynamic = Math.max(0, pagesCount - 2);
      const pagesNorm = Math.max(0, Math.min(1, (pagesCount - MIN_PAGES) / (MAX_PAGES - MIN_PAGES)));
      const dynamicNorm = maxDynamic > 0 ? Math.max(0, Math.min(1, Math.min(dynamicPagesCount, maxDynamic) / maxDynamic)) : 0;
      const galleryNorm = dynamicGallery ? 1 : 0;
      const liveChatNorm = liveChatEnabled ? 1 : 0;
      const appointmentNorm = appointmentBooking ? 1 : 0;
      const ratio = (pagesNorm + dynamicNorm + galleryNorm + liveChatNorm + appointmentNorm) / 5;
      runEstimate(ratio, () => {
        const base = 5000;
        const perPage = 300;
        const perDynamic = 400;
        const galleryCost = dynamicGallery ? 1000 : 0;
        const liveChatCost = liveChatEnabled ? 3000 : 0;
        const appointmentBookingCost = appointmentBooking ? 5000 : 0;
        return base + (pagesCount * perPage) + (dynamicPagesCount * perDynamic) + galleryCost + liveChatCost + appointmentBookingCost;
      });
      return;
    }

    if (isEcommerceService) {
      const ratio = Math.max(0, Math.min(1, ecomSelected.size / ECOM_COMPONENTS.length));
      runEstimate(ratio, () => {
        const optionalCost = Array.from(ecomSelected).reduce((sum, key) => {
          if (ECOM_PRIMARY_SET.has(key)) return sum;
          return sum + (ECOM_PRICE_MAP.get(key) ?? ECOM_DEFAULT_MODULE_PRICE);
        }, 0);
        return ECOM_BASE_PRICE + optionalCost;
      });
      return;
    }

    if (isBookingService) {
      const ratio = Math.max(0, Math.min(1, bookingSelected.size / BOOKING_COMPONENTS.length));
      runEstimate(ratio, () => {
        const base = 15000;
        const perModule = 1800;
        return base + (bookingSelected.size * perModule);
      });
      return;
    }

    setEstimating(false);
  };
  const sectionCardClass = isDark
    ? 'rounded-2xl border border-slate-700/60 bg-slate-800/80 p-3 sm:p-6 shadow-lg shadow-slate-900/30'
    : 'rounded-2xl border-2 border-slate-200 bg-white p-3 sm:p-6';
  const switchTrackClass = isDark ? 'bg-slate-600' : 'bg-slate-300';
  const overlayBackdrop = isDark ? 'bg-slate-950/80' : 'bg-slate-900/30';
  const overlayCardClass = isDark
    ? 'relative z-10 w-full max-w-md rounded-2xl border border-slate-600/70 bg-slate-800/90 p-8 text-center shadow-2xl shadow-slate-900/40'
    : 'relative z-10 w-full max-w-md rounded-2xl border-2 border-slate-200 bg-white p-8 text-center shadow-xl';
  const toastClass = isDark
    ? 'rounded-xl bg-slate-900 text-white px-4 py-3 shadow-lg border-2 border-slate-700'
    : 'rounded-xl bg-white text-slate-900 px-4 py-3 shadow-lg border-2 border-slate-200';
  const toastMsgClass = isDark ? 'text-xs text-slate-300 mt-0.5' : 'text-xs text-slate-600 mt-0.5';
  const emptyBoxClass = isDark
    ? 'w-20 h-20 rounded-2xl bg-slate-800/50 border-2 border-slate-700 flex items-center justify-center mx-auto mb-4'
    : 'w-20 h-20 rounded-2xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center mx-auto mb-4';
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
  const formatINR = useCallback((v) => (typeof v === 'number' ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v) : ''), []);
  const isWebsiteService = service ? WEBSITE_SERVICE_IDS.has(service.id) : false;
  const isEcommerceService = service ? ECOM_SERVICE_IDS.has(service.id) : false;
  const isBookingService = service ? BOOKING_SERVICE_IDS.has(service.id) : false;
  const canEstimate = Boolean(service && (isWebsiteService || isEcommerceService || isBookingService));
  const shouldDelayPageRender = isPageMode && !progressLoaded;

  React.useEffect(() => {
    if (!isOpen || isPageMode) return;
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
  }, [isOpen, isPageMode, closePlanner]);

  React.useEffect(() => () => { try { timeoutsRef.current.forEach(clearTimeout); timeoutsRef.current = []; } catch {} }, []);
  const scheduleTimeout = (cb, delay) => { const id = setTimeout(cb, delay); try { timeoutsRef.current.push(id); } catch {} return id; };
  const renderUniversalModulesSection = ({
    filterSource = null,
    heading,
    description,
    cartTitle,
    estimateGradient,
  } = {}) => {
    const metrics = getUniversalMetrics(filterSource);
    if (!metrics || !metrics.groups.length) {
      return (
        <div className="flex-1 min-h-0 flex items-center justify-center">
          <div className="text-center py-12">
            <div className={emptyBoxClass}>
              <HelpCircle className="w-10 h-10 text-slate-500" />
            </div>
            <p className={emptyTitleClass}>Feature selection coming soon</p>
            <p className={emptySubClass}>We'll tailor options to your chosen service</p>
          </div>
        </div>
      );
    }

    const {
      groups,
      selectedModules,
      optionalModules,
      primaryCount,
      optionalCost,
      selectionRatio,
      basePrice,
    } = metrics;
    const estimateTotal = basePrice + optionalCost;
    const effectiveHeading = heading || (
      filterSource === 'commerce'
        ? (service?.label || 'Commerce Modules')
        : filterSource === 'interaction'
          ? 'Client Interaction & Booking Components'
          : 'Universal Modules'
    );
    const effectiveDescription = description || (
      filterSource === 'commerce'
        ? 'Modules reused from the Client Interaction blueprint - no duplicated code.'
        : filterSource === 'interaction'
          ? 'Browse booking, client services, communication, staff, and payment systems in one place.'
          : 'Every component we use across booking, ordering, and commerce - no duplicates.'
    );
    const cartLabel = cartTitle || (
      filterSource === 'commerce'
        ? 'Commerce Cart'
        : filterSource === 'interaction'
          ? 'Client Interaction Cart'
          : 'Universal Cart'
    );
    const estimateGradientClass = estimateGradient || (
      filterSource === 'commerce'
        ? 'from-orange-500 via-amber-500 to-yellow-500'
        : 'from-cyan-500 via-blue-500 to-indigo-500'
    );
    const cartBackgroundClass = filterSource === 'commerce'
      ? (isDark ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-b from-white via-amber-50/40 to-white border-amber-100')
      : (isDark ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-b from-white via-cyan-50/40 to-white border-cyan-100');
    const cartIconBg = filterSource === 'commerce'
      ? 'bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/40'
      : 'bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/40';
    const cartIcon = filterSource === 'commerce' ? ShoppingBag : Users;
    const highlightColor = filterSource === 'commerce' ? 'text-amber-500' : 'text-cyan-400';

    const handleToggle = (item) => {
      if (item.source === 'commerce') {
        toggleEcomComponent(item.key);
      } else {
        toggleBookingComponent(item.key);
      }
    };
    const totalBlueprintModules = groups.reduce((sum, currentGroup) => sum + currentGroup.items.length, 0);
    const addOnSelectionCount = Math.max(0, selectedModules.length - primaryCount);
    const heroPanelClass = isDark
      ? 'rounded-3xl border border-slate-700/80 bg-gradient-to-br from-slate-950/90 via-slate-900/70 to-cyan-950/40 shadow-[0_25px_60px_rgba(3,7,18,0.85)]'
      : 'rounded-3xl border border-cyan-100 bg-gradient-to-br from-white via-cyan-50 to-white shadow-[0_30px_60px_rgba(14,165,233,0.25)]';
    const heroStatTileClass = isDark
      ? 'bg-slate-900/70 border-slate-700 text-slate-100'
      : 'bg-white/90 border-white text-slate-900';
    const heroStatLabelClass = isDark ? 'text-slate-400' : 'text-slate-500';
    const heroStatValueClass = isDark ? 'text-white' : 'text-slate-900';

    // Flatten all items for keyboard navigation
    const flatComponentList = groups.flatMap(group =>
      group.items.map(item => ({
        ...item,
        groupTitle: group.title,
        groupAccent: group.accent
      }))
    );

    // Helper to get item dependencies
    const getItemDependencies = (item) => {
      if (!item) return [];
      const isCommerceModule = item.source === 'commerce';
      const componentData = isCommerceModule
        ? ECOM_COMPONENTS.find(c => c.key === item.key)
        : BOOKING_COMPONENTS.find(c => c.key === item.key);

      if (!componentData || !componentData.deps || componentData.deps.length === 0) return [];

      const depsMap = isCommerceModule ? ECOM_DEPS_MAP : BOOK_DEPS_MAP;
      const allComponents = isCommerceModule ? ECOM_COMPONENTS : BOOKING_COMPONENTS;

      return componentData.deps
        .map(depKey => allComponents.find(c => c.key === depKey))
        .filter(Boolean)
        .map(dep => dep.label);
    };

    // Reset All functionality
    const handleResetAll = () => {
      const newBookingSelected = new Set(
        Array.from(bookingSelected).filter(key => BOOK_PRIMARY_SET.has(key))
      );
      const newEcomSelected = new Set(
        Array.from(ecomSelected).filter(key => ECOM_PRIMARY_SET.has(key))
      );

      setBookingSelected(newBookingSelected);
      setEcomSelected(newEcomSelected);
      setModuleQuantities({});

      // Successfully cleared (toast notification removed to avoid dependency)
      console.log('All optional selections cleared');
    };

    return (
      <>
      {/* 2-Column Layout: Left (Component List) | Right (Preview - Conditional) */}
      <div className={`flex-1 ${isPageMode ? '' : 'min-h-0'} flex flex-col md:flex-row gap-1 p-3 sm:p-5`}>

        {/* LEFT PANEL - Component List (60-70%) */}
        <div className={`${previewContent ? 'w-full md:w-[65%] lg:w-[65%]' : 'w-full'} flex flex-col`}>
          {/* Component List - NO HEADING */}
          <div className={`flex-1 ${isPageMode ? '' : 'overflow-y-auto'} custom-scrollbar rounded-2xl border p-3 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
            {groups.map((group, groupIndex) => (
              <div
                key={`${group.title}-${group.source}`}
                className={groupIndex > 0 ? `pt-3 mt-3 border-t ${isDark ? 'border-slate-700/70' : 'border-slate-200/80'} border-dashed` : ''}
              >
                {/* Group Header */}
                <div className="mb-2">
                  {(() => {
                    const headingClass = [
                      'text-sm',
                      'sm:text-base',
                      'font-bold',
                      'tracking-[0.2em]',
                      group.source === 'commerce'
                        ? 'text-amber-600 dark:text-amber-300'
                        : 'text-teal-700 dark:text-cyan-200',
                    ].join(' ');
                    return (
                      <p className={headingClass}>
                        {group.title}
                      </p>
                    );
                  })()}
                </div>

                {/* Vertical Plate List - Modern Engineered Design */}
                <div className="space-y-3">
                  {group.items.map((item, itemIndex) => {
                    const globalIndex = flatComponentList.findIndex(
                      fi => fi.key === item.key && fi.source === item.source
                    );
                    const isCommerceModule = item.source === 'commerce';
                    const isPrimary = isCommerceModule ? ECOM_PRIMARY_SET.has(item.key) : BOOK_PRIMARY_SET.has(item.key);
                    const isSelected = isCommerceModule
                      ? ecomSelected.has(item.key)
                      : bookingSelected.has(item.key);
                    const showSelectedState = isSelected || isPrimary;
                    const isFocused = focusedIndex === globalIndex;

                    // Modern engineered styling (reduced scale to prevent overflow)
                    const plateClass = showSelectedState
                      ? (isDark
                          ? 'border-teal-500/80 bg-gradient-to-r from-teal-900/30 to-teal-800/20 shadow-lg shadow-teal-500/20'
                          : 'border-teal-400 bg-gradient-to-r from-teal-50 to-cyan-50 shadow-lg shadow-teal-500/20')
                      : isFocused
                      ? (isDark
                          ? 'border-teal-400 bg-gradient-to-r from-slate-800/80 to-slate-800/60 ring-4 ring-teal-400/30 shadow-xl shadow-teal-500/30'
                          : 'border-teal-400 bg-gradient-to-r from-white to-teal-50/30 ring-4 ring-teal-400/30 shadow-xl shadow-teal-500/30')
                      : (isDark
                          ? 'border-slate-700/50 hover:border-teal-500/60 bg-gradient-to-r from-slate-900/40 to-slate-800/30 hover:shadow-lg'
                          : 'border-slate-200 hover:border-teal-300 bg-gradient-to-r from-white to-slate-50/50 hover:shadow-lg');

                    return (
                      <button
                        key={`${item.source}-${item.key}`}
                        ref={(el) => {
                          componentRefs.current[globalIndex] = el;
                          if (previewContent && previewContent.key === item.key && previewContent.source === item.source) {
                            hoveredItemRef.current = el;
                          }
                        }}
                        type="button"
                        onClick={() => handleToggle(item)}
                        onMouseEnter={(e) => {
                          hoveredItemRef.current = e.currentTarget;
                          setPreviewContent(item);
                          updateRightPanelPosition();
                        }}
                        onFocus={(e) => {
                          hoveredItemRef.current = e.currentTarget;
                          setFocusedIndex(globalIndex);
                          setPreviewContent(item);
                          updateRightPanelPosition();
                        }}
                        className={`w-full rounded-xl border-2 px-5 py-4 transition-all duration-300 flex items-center justify-between gap-3 focus-visible:outline-none ${isPrimary ? 'cursor-not-allowed' : 'cursor-pointer'} ${plateClass}`}
                        tabIndex={0}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {/* Icon - Larger & More Prominent */}
                          {item.icon && React.createElement(item.icon, {
                            className: `w-6 h-6 flex-shrink-0 transition-all duration-300 ${
                              showSelectedState
                                ? 'text-teal-500 drop-shadow-lg'
                                : isFocused
                                ? (isDark ? 'text-teal-400' : 'text-teal-500')
                                : (isDark ? 'text-slate-400' : 'text-slate-600')
                            }`
                          })}
                          {/* Label - Larger Text (xl) */}
                          <span className={`text-xl font-semibold truncate transition-all duration-300 ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}>
                            {item.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          {/* Status Icon - Larger */}
                          {isPrimary ? (
                            <div className={`p-1.5 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                              <Lock className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                            </div>
                          ) : isSelected ? (
                            <div className="p-1.5 rounded-full bg-teal-500/20">
                              <CheckCircle2 className="w-5 h-5 text-teal-500" />
                            </div>
                          ) : null}
                          {/* Arrow - Animated */}
                          <ArrowRight className={`w-5 h-5 transition-all duration-300 ${
                            isFocused ? 'translate-x-1' : ''
                          } ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL - Preview Box (35%) - Fixed Position Like Cart */}
        {previewContent && (
          <div className="hidden md:block w-full md:w-[35%] lg:w-[35%]">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              style={{
                top: rightPanelPosition.top !== 'auto' ? `${rightPanelPosition.top}px` : 'auto',
                bottom: rightPanelPosition.bottom !== 'auto' ? `${rightPanelPosition.bottom}px` : 'auto',
                maxHeight: rightPanelPosition.bottom !== 'auto'
                  ? `calc(100vh - ${rightPanelPosition.bottom}px - 20px)`
                  : 'calc(100vh - 160px)'
              }}
              className={`fixed right-3 sm:right-5 md:right-6 lg:right-8 xl:right-[max(2rem,calc((100vw-1280px)/2+2rem))] w-[calc(35%-0.5rem)] md:w-[calc(35%-0.75rem)] max-w-[420px] overflow-y-auto custom-scrollbar rounded-2xl border-2 p-6 shadow-xl z-30 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <div className="flex flex-col space-y-3">
                {/* Large Icon */}
                <div className="text-center">
                  {previewContent.icon && React.createElement(previewContent.icon, {
                    className: `w-16 h-16 mx-auto ${isDark ? 'text-teal-400' : 'text-teal-500'}`
                  })}
                </div>

                {/* Component Name */}
                <h3 className={`text-2xl font-bold text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {previewContent.label}
                </h3>

                {/* Description */}
                <div>
                  <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Description:
                  </h4>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {previewContent.desc || 'No description available.'}
                  </p>
                </div>

                {/* Dependencies */}
                {(() => {
                  const deps = getItemDependencies(previewContent);
                  if (deps.length > 0) {
                    return (
                      <div>
                        <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          Auto-selected Dependencies:
                        </h4>
                        <ul className={`text-sm space-y-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {deps.map((depLabel, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-teal-500">•</span>
                              <span>{depLabel}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  return null;
                })()}

                {/* Instruction */}
                <div className={`pt-4 border-t ${isDark ? 'border-slate-700' : 'border-slate-200'} text-center`}>
                  <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                    💡 Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-xs font-mono">Enter</kbd> or click to select
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

      </div>

      {/* CART SIDEBAR - Original Position (Sticky on Right Edge, Outside Main Layout) */}
      {(() => {
        const optionalModules = selectedModules.filter((item) => {
          const isCommerceModule = item.source === 'commerce';
          const isPrimary = isCommerceModule ? ECOM_PRIMARY_SET.has(item.key) : BOOK_PRIMARY_SET.has(item.key);
          return !isPrimary;
        });

        const cartPositionClass = isPageMode
          ? 'top-28 sm:top-32 md:top-36 bottom-6'
          : 'top-16 bottom-4';
        const cartTransform = `${isCartOpen ? 'translateX(0)' : 'translateX(calc(100% - 1.5rem))'}${cartBottomLift ? ` translateY(-${cartBottomLift}px)` : ''}`;
        const cartInlineStyle = {
          transition: cartBottomLift ? 'none' : 'transform 0.3s ease-in-out',
          transform: cartTransform,
        };

        return (
          <>
            {/* Cart Sidebar */}
            {optionalModules.length > 0 && (
              <div
                className={`fixed right-0 ${cartPositionClass} w-[280px] z-[50] shadow-2xl ${isDark ? 'bg-slate-900 border-l border-slate-700' : 'bg-white border-l border-slate-200'}`}
                style={cartInlineStyle}
              >
                <div className="relative flex flex-col h-full">
                  {/* Toggle Button */}
                  <button
                    onClick={() => setIsCartOpen((prev) => !prev)}
                    className={`absolute -left-6 top-1/2 -translate-y-1/2 transform z-[60] w-12 h-12 rounded-full shadow-2xl flex items-center justify-center border transition ${isDark ? 'bg-slate-900 border-slate-700 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                    aria-label={isCartOpen ? 'Hide cart' : 'Show cart'}
                  >
                    {React.createElement(isCartOpen ? ArrowRight : ArrowLeft, { className: `w-5 h-5 ${highlightColor}` })}
                  </button>

                  {/* Cart Header */}
                  <div className={`p-3 border-b flex-shrink-0 ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                    <div className="flex items-center gap-2">
                      <ShoppingBag className={`w-4 h-4 ${highlightColor}`} />
                      <h3 className={`text-sm font-bold ${textHeading}`}>Your Selection</h3>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                        {optionalModules.length}
                      </span>
                    </div>
                  </div>

                  {/* Cart Items - Scrollable */}
                  <div className="flex-1 overflow-y-auto p-2 space-y-1.5 custom-scrollbar">
                    {optionalModules.length === 0 ? (
                      <div className="text-center py-8">
                        <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                          No components selected yet
                        </p>
                      </div>
                    ) : (
                      optionalModules.map((item) => {
                        return (
                          <div
                            key={`cart-${item.source}-${item.key}`}
                            className={`rounded-lg border p-2 ${isDark ? 'bg-slate-900/50 border-slate-700/50' : 'bg-slate-50 border-slate-200'}`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <p className={`text-xs font-semibold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                  {item.label}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleToggle(item)}
                                className={`flex-shrink-0 p-0.5 rounded transition ${isDark ? 'text-red-400 hover:bg-red-500/10' : 'text-red-600 hover:bg-red-500/10'}`}
                                aria-label={`Remove ${item.label}`}
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Cart Footer */}
                  <div className={`p-2 border-t space-y-2 flex-shrink-0 ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                    {/* Total Count */}
                    <div className="text-center">
                      <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Total: {optionalModules.length} modules
                      </p>
                    </div>

                    {/* Reset All Button */}
                    {optionalModules.length > 0 && (
                      <button
                        onClick={handleResetAll}
                        className={`w-full py-2 px-3 text-xs font-semibold rounded-lg border-2 transition ${isDark ? 'border-red-500/50 text-red-400 hover:bg-red-500/10' : 'border-red-400 text-red-600 hover:bg-red-50'}`}
                      >
                        Reset All
                      </button>
                    )}

                    {/* Get Estimate Button */}
                    <button
                      onClick={() => {
                        setEstimating(true);
                        setEstimatedPrice(null);
                        const minDelay = 500;
                        const maxDelay = 3000;
                        const jitter = Math.floor(Math.random() * 201) - 100;
                        const delay = Math.max(minDelay, Math.min(maxDelay, Math.round(minDelay + selectionRatio * (maxDelay - minDelay) + jitter)));
                        scheduleTimeout(() => {
                          setEstimatedPrice(estimateTotal);
                          setEstimating(false);
                        }, delay);
                      }}
                      disabled={estimating || optionalModules.length === 0}
                      className={`w-full py-2 px-3 text-xs font-semibold rounded-lg bg-gradient-to-r ${estimateGradientClass} text-white shadow-md transition ${estimating || optionalModules.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:scale-[1.02]'}`}
                    >
                      {estimating ? 'Calculating...' : 'Get Estimate'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        );
      })()}
      </>
    );
  };
  const modalContainerMotion = isPageMode ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 } } : fadeIn;
  const modalCardMotion = isPageMode ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 } } : scaleIn;
  const modalContainerClass = isPageMode
    ? 'relative z-0 flex w-full justify-center items-start min-h-screen px-4 sm:px-6 lg:px-8 py-10 sm:py-16'
    : 'fixed inset-0 z-[1000] flex items-stretch sm:items-center justify-center p-3 sm:p-4 overflow-y-auto';
  const modalCardClass = isPageMode
    ? 'relative w-full max-w-7xl mx-auto flex flex-col gap-8'
    : 'relative z-10 w-full max-w-xl md:max-w-xl lg:max-w-2xl xl:max-w-2xl flex flex-col h-full sm:h-auto sm:max-h-[92vh] md:max-h-[90vh] lg:max-h-[88vh]';

  if (shouldDelayPageRender) {
    return (
      <div className={isDark ? 'dark' : 'light'}>
        <div className="min-h-screen flex items-center justify-center px-6 py-24">
          <div className={`inline-flex items-center gap-2 text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Preparing your saved planner...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={isDark ? 'dark' : 'light'}>
      {showHero && (
        <div className={`relative min-h-screen ${heroBg} ${isOpen && !isPageMode ? "pointer-events-none" : ""}`}>
        {/* Animated gradient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-gradient-to-br from-blue-600/30 to-cyan-500/30 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-gradient-to-tr from-cyan-600/30 to-blue-500/30 blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
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
              className="text-4xl sm:text-6xl md:text-7xl font-black mb-6"
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
              onClick={openPlanner}
              aria-label="Start Planning"
              className={`group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-7 sm:px-10 py-4 sm:py-5 text-lg font-bold shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 ${focusRing}`}
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
              className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
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

      {/* Planner Content */}
      <AnimatePresence>
        {(isPageMode || isOpen) && (
          <motion.div
            {...modalContainerMotion}
            className={modalContainerClass}
            aria-modal={isPageMode ? undefined : 'true'}
            role={isPageMode ? undefined : 'dialog'}
          >
            {!isPageMode && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={closePlanner} />
            )}

            <motion.div
              {...modalCardMotion}
              className={modalCardClass}
              ref={modalRef}
            >
              {!isPageMode && (
                <button
                  onClick={closePlanner}
                  aria-label="Close planner"
                  className={`absolute top-2 right-2 sm:-top-4 sm:-right-4 z-20 inline-flex items-center justify-center rounded-md sm:rounded-full w-7 h-7 sm:w-12 sm:h-12 shadow-2xl hover:scale-110 hover:rotate-90 transition-all duration-300 ${closeBtnClass} ${focusRing}`}
                >
                  <X className="h-3.5 w-3.5 sm:h-6 sm:w-6" />
                </button>
              )}

              <div className={isPageMode ? 'flex flex-col gap-6' : 'flex flex-col flex-1 min-h-0 gap-0 sm:gap-4 md:gap-3'}>
              <div className={
                  isPageMode
                ? `${pageCardWrapper} ${pageFixedHeight}`
                : `relative flex flex-col flex-1 min-h-[640px] ${plannerCard}`
                }>
                  {!(introEnabled && step === 0) && (
                    <>
                      <StepNavButtons disableBack={step <= 1} disableForward={forwardButtonDisabled} />
                      <div className={`hidden sm:flex absolute ${progressTopClass} left-0 right-0 justify-center z-10`}>
                        <ProgressTracker className="px-0" {...progressTrackerProps} />
                      </div>
                      <div className="sm:hidden flex justify-center px-4 pt-4">
                        <ProgressTracker {...progressTrackerProps} />
                      </div>
                    </>
                  )}
                  <div className={
                    isPageMode
                      ? `${pageInnerPadding}`
                      : 'flex-1 flex flex-col min-h-0 p-4 sm:p-4 md:p-5 lg:p-6'
                  }>
                    <div className="flex-1 min-h-0 overflow-y-auto">
                      {introEnabled && step === 0 && (
                        <div>
                        {/* Welcome Screen */}
                        <div className={`text-center py-8 sm:py-12 ${isDark ? 'bg-slate-900/20' : 'bg-white/20'} rounded-2xl`}>
                          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-600 shadow-2xl shadow-blue-500/50 mb-6 sm:mb-8 relative">
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-600 animate-pulse opacity-50" />
                            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-white relative z-10" />
                          </div>

                          <h2 className={`text-3xl sm:text-4xl md:text-3xl lg:text-4xl font-black mb-3 sm:mb-4 ${textHeading}`}>Welcome to Smart Planner</h2>
                          <p className={`text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 ${textMuted}`}>
                            This intelligent wizard will guide you through selecting your business category and recommended services. Let's get started!
                          </p>

                          <div className={`rounded-2xl border-2 p-4 sm:p-6 md:p-5 lg:p-6 mb-6 sm:mb-8 max-w-2xl mx-auto text-left ${
                            isDark
                              ? 'border-blue-500/40 bg-blue-500/10'
                              : 'border-blue-400/30 bg-blue-50/50'
                          }`}>
                            <div className="text-left space-y-1.5 sm:space-y-2">
                              <h3 className={`text-sm sm:text-base font-semibold ${textHeading}`}>Important Tip</h3>
                              <p className={`text-sm sm:text-base leading-relaxed ${textSecondary}`}>
                                This is a <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>planning tool only</span>. <span className={`font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>No orders will be created automatically</span>. You can go back and change your selections anytime.
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => { markIntroAccepted(); setIntroEnabled(false); setStep(1); setMaxVisitedStep((m) => Math.max(m, 1)); track("planner_intro_continue"); }}
                            className="group relative inline-flex items-center gap-2 sm:gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 hover:scale-105 transition-all duration-300"
                          >
                            <span>I Agree, Let's Start</span>
                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="h-full flex flex-col lg:pb-4 xl:pb-6 lg:min-h-[52vh] xl:min-h-[56vh]">
                        <div className={isPageMode ? 'relative flex flex-col min-h-0 py-4 sm:py-6 lg:py-8 px-2 sm:px-4 lg:px-6' : 'relative flex-1 flex flex-col min-h-0'}>
                          <div className="relative flex-1 flex flex-col min-h-0">
                            <div className="mb-2 sm:mb-3 md:mb-3 lg:mb-4 pt-2 sm:pt-14 md:pt-16 lg:pt-16 flex-shrink-0">
                              <h2 className={`text-xl sm:text-2xl md:text-xl lg:text-xl xl:text-2xl font-black mb-1 sm:mb-6 text-center ${textHeading}`}>Select your business type to customize features and view pricing </h2>
                            </div>

                            <div className={`flex-1 min-h-0 pr-1 sm:pr-2 lg:pb-4 xl:pb-6 custom-scrollbar ${!isPageMode ? 'overflow-y-auto' : ''} grid grid-cols-1 sm:grid-cols-2 ${isPageMode ? 'lg:grid-cols-3 xl:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-4' : 'md:grid-cols-2 gap-2 sm:gap-3 md:gap-3'}`}>
                              {CATEGORIES.map((c, idx) => {
                                const styles = CATEGORY_STYLES[c.id];
                                const isSelected = category?.id === c.id;
                                const baseCardClass = isDark
                                  ? 'bg-slate-800/80 border border-slate-600/60 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-50 shadow-md shadow-slate-900/30'
                                  : 'bg-white/80 border border-slate-200 hover:border-cyan-500/50 hover:bg-white text-slate-900 shadow-sm hover:shadow-xl';
                                const selectedCardClass = `bg-gradient-to-br ${styles.gradient} text-white border-transparent shadow-2xl`;

                                return (
                                  <button
                                    key={c.id}
                                    onClick={() => onPickCategory(c)}
                                    className={`relative group w-full rounded-2xl p-7 sm:p-8 text-center transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/50 flex flex-col items-center space-y-5 ${
                                      isSelected ? selectedCardClass : baseCardClass
                                    }`}
                                  >
                                    <div
                                      className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                                        isSelected
                                          ? 'bg-white/15 backdrop-blur-sm shadow-inner'
                                          : `bg-gradient-to-br ${styles.gradient} text-white shadow-lg`
                                      }`}
                                    >
                                      <c.icon className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-white'}`} />
                                    </div>

                                    <div className="space-y-3">
                                      <h3 className="text-lg font-bold leading-tight tracking-tight">
                                        {c.id === 'retail' ? (
                                          <>
                                            <span className="block">Retail, Wholesale &amp;</span>
                                            <span className="block leading-tight">E-Commerce</span>
                                          </>
                                        ) : (
                                          c.label
                                        )}
                                      </h3>
                                      <p className={`text-sm ${isSelected ? 'text-white/80' : isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                        {CATEGORY_DESC[c.id]}
                                      </p>
                                    </div>
                                    <div className="mt-6 w-full" />
                                  </button>
                                );
                              })}
                            </div>

                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="h-full flex flex-col lg:pb-4 xl:pb-6 lg:min-h-[52vh] xl:min-h-[56vh]">
                        <div className="relative flex-1 flex flex-col min-h-0">
                          <div className={`w-full ${serviceSectionWidthClass} mx-auto flex-1 flex flex-col min-h-0`}>
                            {/* Services Selection */}
                            <div className="mb-4 sm:mb-6 md:mb-6 lg:mb-8 pt-4 sm:pt-18 md:pt-20 lg:pt-20 flex-shrink-0">
                              <div className="text-center mb-1 sm:mb-6">
                                <h2 className={`text-2xl sm:text-2xl md:text-xl lg:text-xl xl:text-2xl font-black ${textHeading}`}>Plan the services you need for your business</h2>
                                <p className={`text-sm sm:text-sm md:text-xs lg:text-sm ${textMuted}`}></p>
                              </div>
                            </div>

                            {renderServiceButtons()}
                          </div>
                        </div>
                      </div>
                    )}
                    {step === 3 && (
                      <div className="h-full flex flex-col lg:pb-4 xl:pb-6 lg:min-h-[52vh] xl:min-h-[56vh]">
                        <div className="relative flex-1 flex flex-col min-h-0">
                          <div className="mb-2 sm:mb-3 md:mb-3 lg:mb-4 pt-2 sm:pt-14 md:pt-16 lg:pt-16 flex-shrink-0">
                            <h2 className={`text-xl sm:text-2xl md:text-xl lg:text-xl xl:text-2xl font-black mb-1 sm:mb-1.5 text-center ${textHeading}`}>{service?.label || 'Features & Functionality'}</h2>
                            <p className={`text-xs sm:text-sm md:text-xs lg:text-sm text-center ${textMuted}`}>Configure features based on your current service</p>
                          </div>

                          {/* Content placeholder */}
                          {service && WEBSITE_SERVICE_IDS.has(service.id) ? (
                            <div className={`${isCreativeWebsite ? 'max-w-3xl mx-auto w-full' : ''} flex-1 min-h-0 pr-1 sm:pr-2 custom-scrollbar ${!isPageMode ? 'overflow-y-auto' : ''}`}>
                              <div className={`grid grid-cols-1 ${isWebsiteService ? 'gap-2 sm:gap-4' : 'gap-2.5 sm:gap-6'}`}>
                                {/* Static & dynamic pages */}
                                {(() => {
                                  const maxDynamic = Math.max(0, pagesCount - 2);
                                  const renderStaticPages = () => (
                                    <>
                                      <div className="flex items-center justify-between mb-2 sm:mb-2">
                                        <h3 className={`${isWebsiteService ? 'text-sm sm:text-base' : 'text-sm sm:text-lg'} font-bold ${textHeading}`}>Website Pages</h3>
                                        <span className={`${isWebsiteService ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'} text-cyan-400 font-semibold`}>{pagesCount} pages</span>
                                      </div>
                                      <p className={`${isWebsiteService ? 'text-xs sm:text-xs' : 'text-xs sm:text-sm'} mb-2 sm:mb-4 ${textMuted}`}>Min {MIN_PAGES}, max {MAX_PAGES} pages.</p>
                                      <div className={`flex items-center ${isWebsiteService ? 'gap-2 sm:gap-2.5' : 'gap-2 sm:gap-3'} flex-wrap`}>
                                        <StepperControl
                                          value={pagesCount}
                                          min={MIN_PAGES}
                                          max={MAX_PAGES}
                                          ariaLabel="Total website pages"
                                          onChange={updatePagesCount}
                                          compact={isWebsiteService}
                                        />
                                        <span className={`${isWebsiteService ? 'text-xs sm:text-xs' : 'text-xs sm:text-sm'} font-medium ${textSecondary}`}>pages</span>
                                        <span className={`text-xs ${textMuted}`}>Range {MIN_PAGES} - {MAX_PAGES}</span>
                                      </div>
                                    </>
                                  );

                                  const renderDynamicPages = () => (
                                    <>
                                      <div className="flex items-center justify-between mb-2 sm:mb-2">
                                        <h3 className={`${isWebsiteService ? 'text-sm sm:text-base' : 'text-sm sm:text-lg'} font-bold ${textHeading}`}>Dynamic Pages</h3>
                                        <span className={`${isWebsiteService ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'} text-cyan-400 font-semibold`}>{dynamicPagesCount} pages</span>
                                      </div>
                                      <p className={`${isWebsiteService ? 'text-xs sm:text-xs' : 'text-xs sm:text-sm'} mb-2 sm:mb-4 ${textMuted}`}>Max <span className={`${textSecondary} font-semibold`}>{maxDynamic}</span> dynamic pages.</p>
                                      <div className={`flex items-center ${isWebsiteService ? 'gap-2 sm:gap-2.5' : 'gap-2 sm:gap-3'} flex-wrap`}>
                                        <StepperControl
                                          value={Math.min(dynamicPagesCount, maxDynamic)}
                                          min={0}
                                          max={maxDynamic}
                                          ariaLabel="Dynamic pages count"
                                          onChange={updateDynamicPagesCount}
                                          compact={isWebsiteService}
                                        />
                                        <span className={`${isWebsiteService ? 'text-xs sm:text-xs' : 'text-xs sm:text-sm'} font-medium ${textSecondary}`}>pages</span>
                                        <span className={`text-xs ${textMuted}`}>Max {maxDynamic}</span>
                                      </div>
                                    </>
                                  );

                                  if (isWebsiteService) {
                                    return (
                                      <div className={`${sectionCardClass} p-2 sm:p-4`}>
                                        <div className="space-y-3 sm:space-y-4">
                                          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                                            <div>{renderStaticPages()}</div>
                                            <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700/60 sm:pt-0 sm:border-t-0 sm:border-l sm:border-slate-200/70 sm:pl-4 dark:sm:border-slate-700/60">
                                              {renderDynamicPages()}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }

                                  return (
                                    <>
                                      <div className={sectionCardClass}>
                                        {renderStaticPages()}
                                      </div>
                                      <div className={sectionCardClass}>
                                        {renderDynamicPages()}
                                      </div>
                                    </>
                                  );
                                })()}

                                {/* Dynamic gallery, chat & booking */}
                                {(() => {
                                  const featureToggles = [
                                    {
                                      key: 'dynamicGallery',
                                      title: 'Dynamic Gallery',
                                      description: 'Image/video gallery.',
                                      checked: dynamicGallery,
                                      onToggle: setDynamicGallery,
                                    },
                                    {
                                      key: 'liveChat',
                                      title: 'Live Chat Support',
                                      description: 'Real-time chat integration.',
                                      checked: liveChatEnabled,
                                      onToggle: setLiveChatEnabled,
                                    },
                                    {
                                      key: 'appointmentBooking',
                                      title: 'Appointment Booking System',
                                      description: 'Online appointment scheduling.',
                                      checked: appointmentBooking,
                                      onToggle: setAppointmentBooking,
                                    },
                                  ];

                                  const renderToggle = (feature) => (
                                    <div className={`flex items-center ${isWebsiteService ? 'gap-2 sm:gap-3' : 'gap-3 sm:gap-4'}`}>
                                      <div className="flex-1">
                                        <h3 className={`${isWebsiteService ? 'text-sm sm:text-base' : 'text-sm sm:text-lg'} font-bold ${textHeading}`}>{feature.title}</h3>
                                        <p className={`${isWebsiteService ? 'text-xs sm:text-xs' : 'text-xs sm:text-sm'} ${textMuted}`}>{feature.description}</p>
                                      </div>
                                      <label className="inline-flex items-center cursor-pointer ml-auto flex-shrink-0">
                                        <input
                                          type="checkbox"
                                          checked={feature.checked}
                                          onChange={(e) => feature.onToggle(e.target.checked)}
                                          className="sr-only peer"
                                        />
                                        <div className={`${isWebsiteService ? 'w-12 h-7 sm:w-10 sm:h-6' : 'w-12 h-7 sm:w-12 sm:h-7'} ${switchTrackClass} peer-focus:outline-none rounded-full peer peer-checked:bg-cyan-600 relative transition-colors`}>
                                          <div className={`absolute top-1 left-1 w-5 h-5 ${isWebsiteService ? 'sm:w-4 sm:h-4' : 'sm:w-5 sm:h-5'} bg-white rounded-full transition-transform ${feature.checked ? (isWebsiteService ? 'translate-x-5 sm:translate-x-3' : 'translate-x-5 sm:translate-x-5') : ''}`} />
                                        </div>
                                      </label>
                                    </div>
                                  );

                                  if (isWebsiteService) {
                                    return (
                                      <div className={`${sectionCardClass} p-2 sm:p-4`}>
                                        <div className="space-y-3 sm:space-y-4">
                                          {featureToggles.map((feature, index) => (
                                            <div
                                              key={feature.key}
                                              className={index > 0 ? 'pt-3 sm:pt-4 border-t border-slate-200/70 dark:border-slate-700/60' : ''}
                                            >
                                              {renderToggle(feature)}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    );
                                  }

                                  return featureToggles.map((feature) => (
                                    <div key={feature.key} className={sectionCardClass}>
                                      {renderToggle(feature)}
                                    </div>
                                  ));
                                })()}

                                {/* Get Price */}
                                <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between ${isWebsiteService ? 'gap-2 sm:gap-2.5' : 'gap-2.5 sm:gap-3'} mt-1 sm:mt-0`}>
                                  <button
                                    onClick={() => {
                                      setEstimating(true);
                                      setEstimatedPrice(null);
                                      // Processing time scales with selections: 0.5s to 3s
                                      const minDelay = 500; // ms
                                      const maxDelay = 3000; // ms
                                      const maxDynamic = Math.max(0, pagesCount - 2);
                                      const pagesNorm = Math.max(0, Math.min(1, (pagesCount - MIN_PAGES) / (MAX_PAGES - MIN_PAGES)));
                                      const dynamicNorm = maxDynamic > 0 ? Math.max(0, Math.min(1, Math.min(dynamicPagesCount, maxDynamic) / maxDynamic)) : 0;
                                      const galleryNorm = dynamicGallery ? 1 : 0;
                                      const liveChatNorm = liveChatEnabled ? 1 : 0;
                                      const appointmentNorm = appointmentBooking ? 1 : 0;
                                      const ratio = Math.max(0, Math.min(1, (pagesNorm + dynamicNorm + galleryNorm + liveChatNorm + appointmentNorm) / 5));
                                      const jitter = Math.floor(Math.random() * 201) - 100; // -100..100 ms
                                      const delay = Math.max(minDelay, Math.min(maxDelay, Math.round(minDelay + ratio * (maxDelay - minDelay) + jitter)));
                                      scheduleTimeout(() => {
                                        const base = 5000;
                                        const perPage = 300;
                                        const perDynamic = 400;
                                        const galleryCost = dynamicGallery ? 1000 : 0;
                                        const liveChatCost = liveChatEnabled ? 3000 : 0;
                                        const appointmentBookingCost = appointmentBooking ? 5000 : 0;
                                        const total = base + (pagesCount * perPage) + (dynamicPagesCount * perDynamic) + galleryCost + liveChatCost + appointmentBookingCost;
                                        setEstimatedPrice(total);
                                        setEstimating(false);
                                      }, delay);
                                    }}
                                    disabled={estimating}
                                    className={`inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg transition ${estimating ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-cyan-500/40 hover:scale-[1.01]'}`}
                                  >
                                    <>Get Price Estimate</>
                                  </button>
                                  <div className="hidden sm:block"></div>
                                </div>
                              </div>
                            </div>
                          ) : (isEcommerceService) ? (
                            renderUniversalModulesSection({
                              filterSource: 'commerce',
                              heading: service?.label || 'Online Selling & Ordering System',
                              description: 'Modules reused from the Client Interaction blueprint - no duplicated code.',
                              cartTitle: 'Commerce Cart',
                              estimateGradient: 'from-orange-500 via-amber-500 to-yellow-500',
                            })
                          ) : (service?.id === 'client_interaction') ? (
                            renderUniversalModulesSection({
                              filterSource: 'interaction',
                              heading: 'Client Interaction & Booking Components',
                              description: 'Browse every booking, client service, communication, and payment module by category.',
                              cartTitle: 'Client Interaction Cart',
                              estimateGradient: 'from-cyan-500 via-blue-500 to-indigo-500',
                            })
                          ) : (
                            <div className="flex-1 min-h-0 flex items-center justify-center">
                              <div className="text-center py-12">
                                <div className={emptyBoxClass}>
                                  <HelpCircle className="w-10 h-10 text-slate-500" />
                                </div>
                                <p className={emptyTitleClass}>Feature selection coming soon</p>
                                <p className={emptySubClass}>We'll tailor options to your chosen service</p>
                              </div>
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
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 w-full">
                                    <button
                                      onClick={() => { setEstimatedPrice(null); setEstimating(false); track('estimate_reset'); }}
                                      className={`${navBackBtnClass} w-full sm:w-auto justify-center`}
                                    >
                                      Get Another Price Estimate
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEstimatedPrice(null);
                                        setEstimating(false);
                                        openQuoteModal();
                                        track('estimate_contact');
                                      }}
                                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 text-center"
                                    >
                                      Send Us The Quotation
                                    </button>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          </div>
                        )}
                        {selectionToast && (
                          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1300]">
                            <div className={toastClass} role="status" aria-live="polite">
                              <div className="text-sm font-semibold">{selectionToast.title}</div>
                              <div className={toastMsgClass}>{selectionToast.message}</div>
                            </div>
                          </div>
                        )}
                        </div>
                      )}
                    </div>
                    {quoteModalOpen && (
                      <div className="fixed inset-0 z-[1250] flex items-center justify-center">
                        <div className={`absolute inset-0 ${overlayBackdrop} backdrop-blur-sm`} onClick={closeQuoteModal} />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`${overlayCardClass} max-w-lg w-full space-y-5`}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className={`text-2xl font-bold ${textHeading}`}>Send Us The Quotation</h3>
                            <button
                              type="button"
                              onClick={closeQuoteModal}
                              className={`p-2 rounded-full ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
                              aria-label="Close quotation form"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          <p className={textMuted}>
                            Share your contact details and we will reach out to review the plan you created.
                          </p>
                          <form onSubmit={handleQuoteSubmit} className="space-y-4">
                            <div>
                              <label className={`text-sm font-semibold block mb-1 ${textSecondary}`} htmlFor="quote-name">
                                Full Name
                              </label>
                              <input
                                id="quote-name"
                                type="text"
                                value={quoteForm.name}
                                onChange={(e) => handleQuoteInputChange('name', e.target.value)}
                                className={`w-full rounded-xl border px-3 py-2 ${isDark ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                                placeholder="Enter your name"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className={`text-sm font-semibold block mb-1 ${textSecondary}`} htmlFor="quote-email">
                                  Email Address
                                </label>
                                <input
                                  id="quote-email"
                                  type="email"
                                  value={quoteForm.email}
                                  onChange={(e) => handleQuoteInputChange('email', e.target.value)}
                                  className={`w-full rounded-xl border px-3 py-2 ${isDark ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                                  placeholder="name@email.com"
                                  required
                                />
                              </div>
                              <div>
                                <label className={`text-sm font-semibold block mb-1 ${textSecondary}`} htmlFor="quote-phone">
                                  Phone Number
                                </label>
                                <input
                                  id="quote-phone"
                                  type="tel"
                                  value={quoteForm.phone}
                                  onChange={(e) => handleQuoteInputChange('phone', e.target.value)}
                                  className={`w-full rounded-xl border px-3 py-2 ${isDark ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                                  placeholder="+91 9876543210"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label className={`text-sm font-semibold block mb-1 ${textSecondary}`} htmlFor="quote-message">
                                Message
                              </label>
                              <textarea
                                id="quote-message"
                                rows={4}
                                value={quoteForm.message}
                                onChange={(e) => handleQuoteInputChange('message', e.target.value)}
                                className={`w-full rounded-xl border px-3 py-2 ${isDark ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                              />
                            </div>
                            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
                              <button
                                type="button"
                                onClick={closeQuoteModal}
                                className={`${navBackBtnClass} w-full sm:w-auto justify-center`}
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg"
                              >
                                Send Request
                              </button>
                            </div>
                          </form>
                        </motion.div>
                      </div>
                    )}
                    {renderStepTip()}
                    <div ref={cartFooterSentinelRef} className="h-1 w-full" />
                  </div>

                 {/* Navigation Footer removed: buttons moved to top-left */}
               </div>
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

