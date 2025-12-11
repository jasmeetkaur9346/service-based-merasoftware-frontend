import React from "react";

export default function ProgressTracker({ step }) {
  const steps = ["Category", "Services", "Features"];

  return (
    <div className="w-full max-w-3xl mx-auto mb-6 px-4">
      <div className="flex justify-between items-center">
        {steps.map((label, index) => {
          const active = index + 1 <= step;

          return (
            <div key={label} className="flex-1 flex flex-col items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold 
                ${active ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}
              >
                {index + 1}
              </div>
              <span
                className={`mt-2 text-xs font-medium 
                ${active ? "text-blue-600" : "text-gray-500"}`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="relative mt-4 h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full transition-all"
          style={{ width: `${(step / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
