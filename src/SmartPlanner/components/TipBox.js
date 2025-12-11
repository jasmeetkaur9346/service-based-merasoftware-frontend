import React from "react";

export default function TipBox({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 p-5 bg-white border rounded-lg shadow-xl max-w-sm">
      <p className="text-sm">{message}</p>

      <button
        onClick={onClose}
        className="mt-3 text-xs text-blue-600 underline"
      >
        Dismiss
      </button>
    </div>
  );
}
