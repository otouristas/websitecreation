'use client';

import { useEffect } from 'react';
import { hasAnalyticsConsent, loadGoogleAnalytics } from '@/lib/analytics';

export default function GoogleAnalytics() {
  useEffect(() => {
    if (hasAnalyticsConsent()) {
      loadGoogleAnalytics();
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'cookie-consent' && e.newValue === 'accepted') {
        loadGoogleAnalytics();
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return null;
}
