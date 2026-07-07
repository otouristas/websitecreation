'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { loadGoogleAnalytics, trackPageView } from '@/lib/analytics';

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    loadGoogleAnalytics();
  }, []);

  useEffect(() => {
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
