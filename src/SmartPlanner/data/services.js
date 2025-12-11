// SmartPlanner/data/services.js

const SERVICES_BY_CATEGORY = {
  booking: [
    {
      id: "simple_booking",
      label: "Simple Booking Software",
      desc: "Basic appointment system",
      icon: null,
    },
    {
      id: "smart_booking",
      label: "Smart Booking System",
      desc: "Priority slots, waitlist and automation",
      icon: null,
    },
  ],

  ecommerce: [
    {
      id: "online_store",
      label: "Online Store",
      desc: "Products, cart, checkout",
      icon: null,
    },
    {
      id: "delivery_system",
      label: "Store + Delivery System",
      desc: "Rider app, delivery flow",
      icon: null,
    },
  ],

  crm: [
    {
      id: "basic_crm",
      label: "Basic CRM",
      desc: "Leads, follow-ups, notes",
      icon: null,
    },
    {
      id: "advanced_crm",
      label: "Advanced CRM",
      desc: "Tasks, reminders, teams",
      icon: null,
    },
  ],

  inventory: [
    {
      id: "inventory_billing",
      label: "Inventory + Billing",
      desc: "Stock, purchase, invoices",
      icon: null,
    },
  ],

  education: [
    {
      id: "lms",
      label: "LMS Software",
      desc: "Courses, videos, tests",
      icon: null,
    },
  ],

  custom: [
    {
      id: "custom_dev",
      label: "Custom Development",
      desc: "Fully tailored solution",
      icon: null,
    },
  ],
};

export default SERVICES_BY_CATEGORY;
