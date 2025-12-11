import { useState } from "react";

export default function useTips() {
  const [tip, setTip] = useState(null);

  const showTip = (text) => setTip(text);
  const dismiss = () => setTip(null);

  return { tip, showTip, dismiss };
}
