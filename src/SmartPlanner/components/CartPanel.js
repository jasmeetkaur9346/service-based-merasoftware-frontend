import React from "react";

export default function CartPanel({ modules, total, open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white border-l shadow-xl p-5 overflow-y-auto">

      <h2 className="font-bold text-lg mb-4">Selected Features</h2>

      {modules.length === 0 && (
        <p className="text-gray-500 text-sm">No features selected</p>
      )}

      {modules.map((m) => (
        <div key={m.key} className="border-b py-3">
          <p className="font-medium">{m.label}</p>
          <p className="text-xs text-gray-600">₹ {m.price}</p>
        </div>
      ))}

      <div className="mt-4 font-semibold">
        Total: ₹ {total}
      </div>

      <button
        onClick={onClose}
        className="mt-5 w-full bg-blue-600 text-white py-2 rounded"
      >
        Close
      </button>
    </div>
  );
}
