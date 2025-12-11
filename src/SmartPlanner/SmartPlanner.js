// SmartPlanner/SmartPlanner.jsx

import React, { useState, useEffect } from "react";

// data
import CATEGORIES from "./data/categories";
import SERVICES_BY_CATEGORY from "./data/services";
import FEATURE_GROUPS from "./data/featureGroups";
import MODULES from "./data/modules";

// logic
import { detectInitialDarkMode, subscribeThemeChanges } from "./logic/themeDetector";

// hooks
import usePlannerSteps from "./hooks/usePlannerSteps";
import useCategory from "./hooks/useCategory";
import useService from "./hooks/useService";
import useFeatures from "./hooks/useFeatures";
import useQuantity from "./hooks/useQuantity";

// components
import CategorySelector from "./components/CategorySelector";
import ServiceSelector from "./components/ServiceSelector";
import FeatureSelector from "./components/FeatureSelector";
import ProgressTracker from "./components/ProgressTracker";

export default function SmartPlanner() {

  // theme detection
  const [isDark, setIsDark] = useState(detectInitialDarkMode());

  useEffect(() => {
    const unsubscribe = subscribeThemeChanges(setIsDark);
    return unsubscribe;
  }, []);

  // step control
  const {
    step,
    category,
    service,
    selectCategory,
    selectService,
    goBack,
    resetPlanner,
  } = usePlannerSteps();

  // categories list
  const { categories } = useCategory(CATEGORIES);

  // services list
  const { services } = useService(category, SERVICES_BY_CATEGORY);

  // feature selection
  const { selected, toggleFeature } = useFeatures(MODULES);

  // quantity control
  const { qty, getQuantity, updateQuantity } = useQuantity();

  // get groups for selected service
  const groups = FEATURE_GROUPS;

  return (
    <div className={`min-h-screen transition-colors duration-300 
      ${isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>

      <div className="max-w-4xl mx-auto py-8 px-4">

        <ProgressTracker step={step} goBack={goBack} reset={resetPlanner} />

        {step === 1 && (
          <CategorySelector
            categories={categories}
            onSelect={selectCategory}
          />
        )}

        {step === 2 && (
          <ServiceSelector
            services={services}
            onSelect={selectService}
            onBack={goBack}
          />
        )}

        {step === 3 && (
          <FeatureSelector
            groups={groups}
            selected={selected}
            onToggle={toggleFeature}
            getQuantity={getQuantity}
            updateQuantity={updateQuantity}
            onBack={goBack}
          />
        )}
      </div>
    </div>
  );
}
