/**
 * Initialize theme by ensuring dark class is present.
 * Call this early in the app lifecycle.
 */
export function initializeTheme() {
  document.documentElement.classList.add('dark');
}
