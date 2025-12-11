// themeDetector.js
// Detect and subscribe to global dark / light theme changes

export function detectInitialDarkMode() {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

/**
 * callback(isDark) is called whenever theme changes.
 * Returns an unsubscribe function.
 */
export function subscribeThemeChanges(callback) {
  if (typeof document === "undefined" || typeof MutationObserver === "undefined") {
    return () => {};
  }

  const observer = new MutationObserver(() => {
    const isDark = document.documentElement.classList.contains("dark");
    callback(isDark);
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => observer.disconnect();
}
