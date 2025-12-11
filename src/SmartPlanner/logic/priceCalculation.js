// priceCalculation.js
// Generic pricing helpers for your planner

/**
 * modules: [
 *   { key: "booking", price: 12000 },
 *   { key: "payment", price: 8000 },
 *   ...
 * ]
 *
 * selected: Set of keys
 * quantities: { [key]: number }
 */
export function calculateModulesTotal({
  modules,
  selected,
  quantities = {},
  basePrice = 0,
}) {
  let total = basePrice;

  modules.forEach((mod) => {
    if (!selected.has(mod.key)) return;

    const unitPrice = typeof mod.price === "number" ? mod.price : 0;
    const qty = quantities[mod.key] || 1;

    total += unitPrice * qty;
  });

  return total;
}

/**
 * Optional helper:
 * returns detailed breakdown:
 * [
 *   { key, label, unitPrice, quantity, lineTotal }
 * ]
 */
export function getPriceBreakdown({
  modules,
  selected,
  quantities = {},
}) {
  const rows = [];

  modules.forEach((mod) => {
    if (!selected.has(mod.key)) return;

    const unitPrice = typeof mod.price === "number" ? mod.price : 0;
    const quantity = quantities[mod.key] || 1;
    const lineTotal = unitPrice * quantity;

    rows.push({
      key: mod.key,
      label: mod.label || mod.key,
      unitPrice,
      quantity,
      lineTotal,
    });
  });

  return rows;
}
