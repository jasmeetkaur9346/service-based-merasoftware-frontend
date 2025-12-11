import { useState } from "react";

export default function usePlannerSteps() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState(null);
  const [service, setService] = useState(null);

  const selectCategory = (item) => {
    setCategory(item);
    setStep(2);
  };

  const selectService = (item) => {
    setService(item);
    setStep(3);
  };

  const goBack = () => setStep((prev) => Math.max(1, prev - 1));
  const resetPlanner = () => {
    setStep(1);
    setCategory(null);
    setService(null);
  };

  return {
    step,
    category,
    service,
    selectCategory,
    selectService,
    goBack,
    resetPlanner,
  };
}
