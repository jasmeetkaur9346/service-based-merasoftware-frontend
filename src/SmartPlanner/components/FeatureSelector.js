import React from "react";

export default function FeatureSelector({
  groups,
  selected,
  onToggle,
  getQuantity,
  updateQuantity
}) {
  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <div key={group.id} className="border rounded-xl p-5 bg-white">
          <h3 className="font-bold mb-1 text-blue-600">{group.title}</h3>
          <p className="text-xs mb-4 text-gray-500">{group.desc}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {group.items.map((item) => {
              const isSelected = selected.has(item.key);
              const quantity = getQuantity(item);

              return (
                <div
                  key={item.key}
                  className={`border rounded-lg p-4 flex flex-col gap-3 transition-all
                    ${isSelected ? "bg-blue-50" : "bg-white"}`}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">{item.label}</h4>

                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggle(item.key)}
                      className="w-5 h-5"
                    />
                  </div>

                  {isSelected && (
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item, quantity - 1)}
                        className="px-2 py-1 border rounded"
                      >
                        -
                      </button>

                      <span className="w-6 text-center">{quantity}</span>

                      <button
                        onClick={() => updateQuantity(item, quantity + 1)}
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
