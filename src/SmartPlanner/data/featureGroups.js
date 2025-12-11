// SmartPlanner/data/featureGroups.js
import MODULES from "./modules";

const FEATURE_GROUPS = [
  {
    id: "booking",
    title: "Booking Features",
    desc: "Complete booking & appointment modules",
    items: MODULES.filter(m => m.domain === "booking"),
  },
  {
    id: "ecommerce",
    title: "Ecommerce Features",
    desc: "Store, products, checkout and delivery",
    items: MODULES.filter(m => m.domain === "ecommerce"),
  },
  {
    id: "crm",
    title: "CRM Features",
    desc: "Leads, follow-ups, tasks & teams",
    items: MODULES.filter(m => m.domain === "crm"),
  },
  {
    id: "inventory",
    title: "Inventory Features",
    desc: "Stock, purchase, GST billing",
    items: MODULES.filter(m => m.domain === "inventory"),
  },
  {
    id: "education",
    title: "LMS Features",
    desc: "Courses and assessments",
    items: MODULES.filter(m => m.domain === "education"),
  },
];

export default FEATURE_GROUPS;
