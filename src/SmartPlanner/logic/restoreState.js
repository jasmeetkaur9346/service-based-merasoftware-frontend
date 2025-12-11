// restoreState.js
// Small helpers to load/save planner state in localStorage

const STORAGE_KEY = "smartPlanner_state";

export function loadPlannerState() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return parsed || null;
  } catch (err) {
    console.warn("[SmartPlanner] Failed to load state", err);
    return null;
  }
}

export function savePlannerState(state) {
  if (typeof window === "undefined") return;

  try {
    const serializable = state || {};
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
  } catch (err) {
    console.warn("[SmartPlanner] Failed to save state", err);
  }
}

export function clearPlannerState() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn("[SmartPlanner] Failed to clear state", err);
  }
}
