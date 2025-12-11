import React from "react";

export default function ServiceSelector({ services, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {services.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className="p-5 rounded-xl border bg-white hover:shadow-lg transition-all flex flex-col items-center gap-4"
        >
          <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
            <item.icon className="w-7 h-7 text-blue-600" />
          </div>

          <h3 className="font-semibold">{item.label}</h3>
          {item.desc && (
            <p className="text-xs text-gray-600 text-center">{item.desc}</p>
          )}
        </button>
      ))}
    </div>
  );
}
