import { useState } from "react";

export default function useQuantity() {
  const [qty, setQty] = useState({});

  const getQuantity = (item) => qty[item.key] || 1;

  const updateQuantity = (item, value) => {
    if (value < 1) return;
    setQty((prev) => ({ ...prev, [item.key]: value }));
  };

  return {
    qty,
    getQuantity,
    updateQuantity,
  };
}
