import { initializeConsentMode } from './analytics';
import { cookieConsent } from './cookieConsent';

export function initializeTracking(): void {
  // Initialize consent mode
  initializeConsentMode();

  // Initialize cookie consent
  const cookieBanner = document.getElementById('cookie-banner');
  if (!cookieBanner) return;

  // Add event listeners
  const customizeBtn = document.getElementById('customize-button');
  const acceptAllBtn = document.getElementById('accept-all');
  const declineAllBtn = document.getElementById('decline-all');
  const savePreferencesBtn = document.getElementById('save-preferences');

  // Show/hide cookie settings panel
  customizeBtn?.addEventListener('click', () => {
    const settingsPanel = document.getElementById('cookie-settings');
    if (settingsPanel) {
      settingsPanel.style.display = settingsPanel.style.display === 'none' ? 'block' : 'none';
    }
  });

  acceptAllBtn?.addEventListener('click', () => cookieConsent.updateConsent(true));
  declineAllBtn?.addEventListener('click', () => cookieConsent.updateConsent(false));

  // Save preferences (same as accepting all for now)
  savePreferencesBtn?.addEventListener('click', () => cookieConsent.updateConsent(true));
}