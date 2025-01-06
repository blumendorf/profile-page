import { updateConsentState } from './analytics';

class CookieConsent {
  public updateConsent(consent: boolean) {
    // Update analytics consent
    updateConsentState(consent);

    // Store consent in localStorage
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('analyticsConsent', consent.toString());
  }

  public hasConsent(): boolean {
    return localStorage.getItem('cookieConsent') === 'true';
  }

  public hasAnalyticsConsent(): boolean {
    return localStorage.getItem('analyticsConsent') === 'true';
  }
}

export const cookieConsent = new CookieConsent();