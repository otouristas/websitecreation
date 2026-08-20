'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

/**
 * Pageviews are sent manually (the tag is configured with
 * `send_page_view: false`) so client-side route changes are counted too.
 */
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams?.toString();
    trackPageView(window.location.origin + pathname + (query ? `?${query}` : ''));
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleTagPageView() {
  return (
    <Suspense fallback={null}>
      <PageViewTracker />
    </Suspense>
  );
}
