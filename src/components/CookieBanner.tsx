import { useEffect, useState } from 'react';
import { cookieConsent } from '../utils/cookieConsent';
import '../styles/cookieBanner.css';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(cookieConsent.hasAnalyticsConsent());

  useEffect(() => {
    // Show banner if no consent has been given
    if (!cookieConsent.hasConsent()) {
      setIsVisible(true);
    }

    // If analytics consent exists, initialize it
    if (cookieConsent.hasAnalyticsConsent()) {
      cookieConsent.updateConsent(true);
    }
  }, []);

  const handleCustomize = () => {
    setShowDetails(true);
  };

  const handleAcceptAll = () => {
    setAnalyticsEnabled(true);
    cookieConsent.updateConsent(true);
    setIsVisible(false);
  };

  const handleDeclineAll = () => {
    setAnalyticsEnabled(false);
    cookieConsent.updateConsent(false);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    cookieConsent.updateConsent(analyticsEnabled);
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
          <div className={showDetails ? 'mt-4 space-y-4' : 'hidden mt-4 space-y-4'}>
            <div>
              <div className="flex items-center gap-2">
                <input
                  id="essential-cookies"
                  type="checkbox"
                  checked={true}
                  disabled
                  className="rounded text-accent cursor-not-allowed opacity-50"
                />
                <label htmlFor="essential-cookies">
                  <h4 className="font-semibold">Essential Cookies</h4>
                  <p className="text-xs">Required for the website to function properly. Always active.</p>
                </label>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <input
                  id="analytics-cookies"
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="rounded text-accent"
                />
                <label htmlFor="analytics-cookies">
                  <h4 className="font-semibold">Analytics Cookies</h4>
                  <p className="text-xs">Help us understand how visitors interact with our website.</p>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {!showDetails && (
            <button
              onClick={handleCustomize}
              className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              Customize
            </button>
          )}
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
          {showDetails && (
            <button
              onClick={handleSavePreferences}
              className="px-4 py-2 text-sm bg-accent hover:bg-accent-dark text-white rounded-lg transition-colors"
            >
              Save Preferences
            </button>
          )}
        </div>
      </div>
    </div>
  );
}