// Initialize dataLayer array if it doesn't exist
if (!window.dataLayer) {
  window.dataLayer = [];
}

// Create dummy gtag function if not loaded
if (!window.gtag) {
  window.gtag = function (command: Parameters<Window['gtag']>[0], action: string, params?: Parameters<Window['gtag']>[2]) {
    const event: DataLayerEvent = {
      event: command,
      action: action,
      ...params
    };
    window.dataLayer.push(event);
  };
}

// Initialize analytics with consent mode
export function initializeGoogleAnalytics(): void {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
  document.head.appendChild(script);

  script.onload = function () {
    if (!window.dataLayer) {
      window.dataLayer = [];
    }
    window.gtag('js', new Date().toISOString());
    window.gtag('config', 'G-XXXXXXXXXX', {
      'anonymize_ip': true // IP anonymization for GDPR
    });
  };
}

// Set default consent mode settings
export function initializeConsentMode(): void {
  window.gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied',
    'security_storage': 'granted' // Required for basic functionality
  });
}

// Update consent settings
export function updateConsentState(consent: boolean): void {
  // Update consent state
  window.gtag('consent', 'update', {
    'analytics_storage': consent ? 'granted' : 'denied',
    'functionality_storage': 'granted', // Essential cookies always allowed
    'personalization_storage': consent ? 'granted' : 'denied'
  });

  // Initialize analytics if consent is granted
  if (consent && !document.querySelector('script[src*="googletagmanager"]')) {
    initializeGoogleAnalytics();
  }
}