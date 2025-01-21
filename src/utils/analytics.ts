import ReactGA from 'react-ga4';

declare global {
  interface Window {
    dataLayer: unknown[][];
    gtag: (...args: unknown[]) => void;
  }
}

export const initializeGoogleAnalytics = (measurementId: string): void => {
  ReactGA.initialize(measurementId, {
    // testMode: process.env.NODE_ENV === 'development',
  });
};

export const setAnalyticsConsent = (consent: boolean): void => {
  ReactGA.gtag('consent', 'update', {
    analytics_storage: consent ? 'granted' : 'denied',
    ad_storage: consent ? 'granted' : 'denied',
    ad_personalization: consent ? 'granted' : 'denied',
    ad_consent: consent ? 'granted' : 'denied',
  });
};