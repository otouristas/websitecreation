'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cookie } from 'lucide-react';
import { ADS_CONSENT_KEY, applyMeasurementConsent } from '@/lib/analytics';
import { OPEN_COOKIE_PREFERENCES_EVENT } from '@/lib/cookie-preferences';
import { localizedPath, siteLocaleFromPath } from '@/lib/i18n/locale';

export default function CookieConsent() {
  const pathname = usePathname() ?? '/en';
  const locale = siteLocaleFromPath(pathname);
  const isEl = locale === 'el';
  // Rendered on the server so the banner paints with the page. Returning visitors are hidden
  // before first paint by `.consent-set` (layout's consentInitScript) and closed here.
  const [show, setShow] = useState(true);

  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let consent: string | null = null;
    let adsConsent: string | null = null;
    try {
      consent = localStorage.getItem('cookie-consent');
      adsConsent = localStorage.getItem(ADS_CONSENT_KEY);
    } catch { /* Optional measurement stays off when storage is unavailable. */ }
    if (consent && adsConsent) {
      // Consent lives in localStorage, unreadable during SSR, so the server shows the banner
      // and this closes it for visitors who already chose.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(false);
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

  const choose = (analytics: boolean, ads: boolean) => {
    applyMeasurementConsent(analytics, ads);
    // Same class the first-paint script adds for returning visitors, so the
    // sticky bar can come back without a reload. Storage is unchanged.
    document.documentElement.classList.add('consent-set');
    setShow(false);
  };

  const reopen = () => {
    document.documentElement.classList.remove('consent-set');
    setShow(true);
  };

  useEffect(() => {
    const onOpen = () => {
      document.documentElement.classList.remove('consent-set');
      setShow(true);
    };
    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, onOpen);
  }, []);

  const preferencesLabel = isEl ? 'Προτιμήσεις cookies' : 'Cookie preferences';

  // Phones already have a full-width bar in this corner. The reopen control
  // lives in the footer below the `lg` breakpoint and only floats, as a small
  // icon on the left, where the sticky bar is gone and WhatsApp sits on the right.
  if (!show) {
    return (
      <button
        type="button"
        onClick={reopen}
        aria-label={preferencesLabel}
        title={preferencesLabel}
        data-chrome="cookie-preferences"
        style={{ bottom: 'calc(1rem + var(--chrome-safe-bottom))' }}
        className="fixed left-4 z-40 hidden size-9 items-center justify-center rounded-full border border-hairline bg-background/80 text-muted-foreground shadow-sm backdrop-blur-md transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:inline-flex"
      >
        <Cookie className="size-4" aria-hidden />
      </button>
    );
  }

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
            {isEl ? 'Προαιρετικά cookies μετρήσεων' : 'Optional measurement cookies'}
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {isEl
              ? 'Επιλέξτε στατιστικά επισκέψεων ή και μέτρηση Google Ads, ώστε να γνωρίζουμε ποιες διαφημίσεις φέρνουν αιτήματα. Χωρίς εξατομίκευση διαφημίσεων. Μπορείτε να ανακαλέσετε την επιλογή σας ανά πάσα στιγμή.'
              : 'Choose visit analytics, or also Google Ads measurement to learn which ads bring enquiries. No ad personalization. You can withdraw your choice at any time.'}{' '}
            <Link
              href={localizedPath(locale, '/privacy')}
              className="font-medium text-primary underline underline-offset-2 hover:text-primary/80"
            >
              {isEl ? 'Πολιτική απορρήτου' : 'Privacy policy'}
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => choose(false, false)}
            className="btn btn-outline h-10 px-4 text-sm"
          >
            {isEl ? 'Απόρριψη προαιρετικών' : 'Decline optional'}
          </button>
          <button type="button" onClick={() => choose(true, false)} className="btn btn-outline h-10 px-4 text-sm">
            {isEl ? 'Μόνο στατιστικά' : 'Analytics only'}
          </button>
          <button
            type="button"
            onClick={() => choose(true, true)}
            className="btn btn-primary h-10 px-4 text-sm"
          >
            {isEl ? 'Αποδοχή και των δύο' : 'Accept both'}
          </button>
        </div>
      </div>
    </div>
  );
}
