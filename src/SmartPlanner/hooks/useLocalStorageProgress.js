import { useEffect } from "react";

export default function useLocalStorageProgress(state, setState) {
  useEffect(() => {
    const saved = localStorage.getItem("planner-progress");
    if (saved) {
      const parsed = JSON.parse(saved);
      setState(parsed);
    }
  }, []);

  useEffect(() => {
    if (state) {
      localStorage.setItem("planner-progress", JSON.stringify(state));
    }
  }, [state]);
}
