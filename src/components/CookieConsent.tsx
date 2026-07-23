'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { loadGoogleAnalytics } from '@/lib/analytics';
import { localizedPath, siteLocaleFromPath } from '@/lib/i18n/locale';

export default function CookieConsent() {
  const pathname = usePathname() ?? '/en';
  const locale = siteLocaleFromPath(pathname);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    loadGoogleAnalytics();
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm rounded-xl border border-border bg-background p-6 shadow-2xl animate-fade-in-up">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <div>
          <h3 className="mb-1 font-bold text-foreground">We value your privacy</h3>
          <p className="mb-4 text-sm text-foreground/80">
            We use cookies for analytics to improve your experience. See our{' '}
            <Link
              href={localizedPath(locale, '/privacy')}
              className="font-medium text-primary underline underline-offset-2 hover:text-primary/80"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={accept}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:opacity-90"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={decline}
              className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-bold text-foreground transition hover:bg-muted"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
