import { useEffect, useState } from 'react';
import { setAnalyticsConsent } from '../utils/analytics';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  const hasConsent = localStorage.getItem('cookieConsent');
  console.log('hasConsent', hasConsent);

  const updateConsent = (consent: boolean) => {
    localStorage.setItem('cookieConsent', consent.toString());
    setAnalyticsConsent(consent);
  };

  useEffect(() => {
    // Show banner if no consent has been given
    if (hasConsent === null) {
      setIsVisible(true);
      setAnalyticsConsent(false); // Default to denied
    } else {
      // Restore previous consent
      setAnalyticsConsent(hasConsent === 'true');
    }
  }, [hasConsent]);

  const handleAcceptAll = () => {
    updateConsent(true);
    setIsVisible(false);
  };

  const handleDeclineAll = () => {
    updateConsent(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div id="cookie-banner" role="dialog" aria-label="Cookie banner">
      <div className="max-w-4xl mx-auto flex flex-col gap-4 p-4">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <p className="mb-2">
            We respect your privacy and are committed to transparency. We use cookies to enhance your experience and
            analyze site traffic.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleDeclineAll}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            Decline All
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 text-sm bg-accent hover:bg-accent-dark text-white rounded-lg transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}