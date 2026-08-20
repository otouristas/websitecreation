'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { COOKIE_CONSENT_KEY, loadGoogleAnalytics, trackPageView } from '@/lib/analytics';

function hasAnalyticsConsent(): boolean {
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
}

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    loadGoogleAnalytics();
  }, []);

  useEffect(() => {
    if (!hasAnalyticsConsent()) return;
    const query = searchParams?.toString();
    trackPageView(window.location.origin + pathname + (query ? `?${query}` : ''));
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalytics() {
  return (
    <Suspense fallback={null}>
      <PageViewTracker />
    </Suspense>
  );
}
