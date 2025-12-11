// SmartPlanner/data/modules.js

const MODULES = [
  // Booking Modules
  {
    key: "slot_view",
    label: "Public Slot View",
    price: 2000,
    domain: "booking",
    deps: [],
  },
  {
    key: "simple_booking_form",
    label: "Simple Booking Form",
    price: 4000,
    domain: "booking",
    deps: ["slot_view"],
  },
  {
    key: "priority_booking",
    label: "Priority Booking",
    price: 2500,
    domain: "booking",
    deps: ["simple_booking_form"],
  },
  {
    key: "self_manage_booking",
    label: "Self Manage Booking",
    price: 3000,
    domain: "booking",
    deps: ["simple_booking_form"],
  },
  {
    key: "smart_slots",
    label: "Smart Slot Logic",
    price: 3500,
    domain: "booking",
    deps: ["simple_booking_form"],
  },
  {
    key: "waitlist_system",
    label: "Waiting List System",
    price: 2500,
    domain: "booking",
    deps: ["simple_booking_form"],
  },
  {
    key: "multi_location",
    label: "Multi Location",
    price: 3000,
    domain: "booking",
    deps: ["simple_booking_form"],
  },
  {
    key: "token_queue",
    label: "Token and Queue",
    price: 3000,
    domain: "booking",
    deps: ["simple_booking_form"],
  },


  // Ecommerce Modules
  {
    key: "product_listing",
    label: "Product Listing",
    price: 3000,
    domain: "ecommerce",
    deps: [],
  },
  {
    key: "cart",
    label: "Shopping Cart",
    price: 3000,
    domain: "ecommerce",
    deps: ["product_listing"],
  },
  {
    key: "checkout",
    label: "Checkout + Orders",
    price: 4000,
    domain: "ecommerce",
    deps: ["cart"],
  },
  {
    key: "delivery",
    label: "Delivery Module",
    price: 3500,
    domain: "ecommerce",
    deps: ["checkout"],
  },


  // CRM Modules
  {
    key: "leads",
    label: "Lead Management",
    price: 3000,
    domain: "crm",
    deps: [],
  },
  {
    key: "followups",
    label: "Follow Ups",
    price: 2000,
    domain: "crm",
    deps: ["leads"],
  },
  {
    key: "tasks",
    label: "Task Management",
    price: 3000,
    domain: "crm",
    deps: ["leads"],
  },


  // Inventory Modules
  {
    key: "stock",
    label: "Stock Management",
    price: 4000,
    domain: "inventory",
    deps: [],
  },
  {
    key: "purchase",
    label: "Purchase Management",
    price: 2500,
    domain: "inventory",
    deps: ["stock"],
  },
  {
    key: "gst_billing",
    label: "GST Billing",
    price: 3500,
    domain: "inventory",
    deps: ["stock"],
  },


  // LMS Modules
  {
    key: "courses",
    label: "Courses",
    price: 4000,
    domain: "education",
    deps: [],
  },
  {
    key: "tests",
    label: "Tests & Assessments",
    price: 2500,
    domain: "education",
    deps: ["courses"],
  },

  // Custom Modules (open style)
  {
    key: "custom_requirement",
    label: "Custom Requirement Module",
    price: 0,
    domain: "custom",
    deps: [],
  },
];

export default MODULES;
