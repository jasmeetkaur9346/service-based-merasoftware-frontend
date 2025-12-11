import React from "react";

export default function CategorySelector({ categories, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className="p-5 rounded-xl border bg-white hover:shadow-lg transition-all flex flex-col items-center gap-3"
        >
          <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
            <item.icon className="w-7 h-7 text-blue-600" />
          </div>

          <p className="text-center font-semibold">{item.label}</p>
          <p className="text-xs text-gray-500">{item.desc}</p>
        </button>
      ))}
    </div>
  );
}
