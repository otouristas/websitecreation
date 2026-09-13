'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { enableGoogleAnalytics } from '@/lib/analytics';
import { localizedPath, siteLocaleFromPath } from '@/lib/i18n/locale';

export default function CookieConsent() {
  const pathname = usePathname() ?? '/en';
  const locale = siteLocaleFromPath(pathname);
  const isEl = locale === 'el';
  const [show, setShow] = useState(false);

  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Post-mount sync is the point here: consent lives in localStorage, unreadable during SSR,
      // so the first paint has to be the SSR value and this corrects it.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true);
    }
  }, []);

  /**
   * Publish the height this banner occupies so the floating WhatsApp pill can
   * sit above it instead of behind it. It has to be measured rather than
   * assumed: the copy wraps to two, three or four lines depending on viewport
   * width and language, so the banner is anywhere between ~5rem and ~9rem tall.
   */
  useEffect(() => {
    const root = document.documentElement;
    const el = bannerRef.current;
    if (!show || !el) {
      root.style.setProperty('--chrome-cookie-bar', '0px');
      return;
    }
    const publish = () => {
      root.style.setProperty('--chrome-cookie-bar', `${Math.round(el.getBoundingClientRect().height)}px`);
    };
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.style.setProperty('--chrome-cookie-bar', '0px');
    };
  }, [show]);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    enableGoogleAnalytics();
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-labelledby="cookie-consent-title"
      data-chrome="cookie-consent"
      style={{ bottom: 'max(var(--chrome-bottom-bar), var(--chrome-safe-bottom))' }}
      className="fixed inset-x-0 z-[60] border-t border-hairline bg-background/85 px-4 py-3 shadow-[0_-8px_32px_-12px_color-mix(in_oklab,var(--primary)_25%,transparent)] backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p id="cookie-consent-title" className="text-sm font-semibold text-foreground">
            {isEl ? 'Cookies για μετρήσεις' : 'Analytics cookies'}
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {isEl
              ? 'Χρησιμοποιούμε cookies μόνο για στατιστικά, μετά την αποδοχή σας.'
              : 'We use cookies only for analytics, after you accept.'}{' '}
            <Link
              href={localizedPath(locale, '/privacy')}
              className="font-medium text-primary underline underline-offset-2 hover:text-primary/80"
            >
              {isEl ? 'Πολιτική απορρήτου' : 'Privacy policy'}
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={decline}
            className="btn btn-outline h-10 px-4 text-sm"
          >
            {isEl ? 'Όχι' : 'Decline'}
          </button>
          <button
            type="button"
            onClick={accept}
            className="btn btn-primary h-10 px-4 text-sm"
          >
            {isEl ? 'Αποδοχή' : 'Accept'}
          </button>
        </div>
      </div>
    </div>
  );
}
