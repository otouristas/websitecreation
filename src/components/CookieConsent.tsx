'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { readConsent, setConsent } from '@/lib/analytics';
import { localizedPath, siteLocaleFromPath } from '@/lib/i18n/locale';

export default function CookieConsent() {
  const pathname = usePathname() ?? '/en';
  const locale = siteLocaleFromPath(pathname);
  const isEl = locale === 'el';
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!readConsent()) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    setConsent('accepted');
    setShow(false);
  };

  const decline = () => {
    setConsent('declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-0 bottom-[4.75rem] z-[60] border-t border-border bg-background/95 px-4 py-3 shadow-[0_-8px_32px_-12px_hsl(217_91%_60%_/_0.18)] backdrop-blur-md lg:bottom-0"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p id="cookie-consent-title" className="text-sm font-semibold text-foreground">
            {isEl ? 'Cookies μετρήσεων & διαφημίσεων' : 'Analytics & advertising cookies'}
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {isEl
              ? 'Χρησιμοποιούμε cookies για στατιστικά και μέτρηση διαφημίσεων (Google Analytics, Google Ads), μόνο μετά την αποδοχή σας.'
              : 'We use cookies for analytics and advertising measurement (Google Analytics, Google Ads), only after you accept.'}{' '}
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
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-bold text-foreground transition hover:bg-muted"
          >
            {isEl ? 'Όχι' : 'Decline'}
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:opacity-90"
          >
            {isEl ? 'Αποδοχή' : 'Accept'}
          </button>
        </div>
      </div>
    </div>
  );
}
