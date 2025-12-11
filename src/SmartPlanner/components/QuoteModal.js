import React from "react";

export default function QuoteModal({ open, form, onClose, onChange, onSubmit }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl">

        <h2 className="font-bold text-lg mb-4">Request a Callback</h2>

        <form onSubmit={onSubmit} className="space-y-3">

          <input
            placeholder="Name"
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
          />

          <input
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
          />

          <input
            placeholder="Phone"
            className="w-full border p-2 rounded"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />

          <textarea
            className="w-full border p-2 rounded min-h-[100px]"
            value={form.message}
            onChange={(e) => onChange("message", e.target.value)}
          />

          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Send
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
