import { useState, useEffect } from "react";
import servicesData from "../data/services";

export default function useService(category) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (!category) return;
    setServices(servicesData[category.id] || []);
  }, [category]);

  return { services };
}
