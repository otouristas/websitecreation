'use client';

import { useEffect, useState, type ReactElement } from 'react';
import { usePathname } from 'next/navigation';
import { ShieldCheck, X } from 'lucide-react';
import { getCommonDictionary } from '@/lib/i18n/get-dictionary';
import { siteLocaleFromPath } from '@/lib/i18n/locale';

const DISMISS_KEY = 'security-notice-dismissed';

/**
 * Where the card sits in the bottom-chrome stack (see `--chrome-*` in
 * globals.css). Below `lg` it waits for a cookie choice, like the sticky bar,
 * then floats above that bar. From `lg` up it takes the left corner (WhatsApp
 * owns the right) above the cookie banner, or above the small cookie
 * preferences button once a choice exists.
 */
const PLACEMENT_STYLE = `[data-chrome="security-notice"]{bottom:calc(max(var(--chrome-bottom-bar),var(--chrome-safe-bottom)) + var(--chrome-cookie-bar) + var(--chrome-gutter))}@media (max-width:1023.98px){html:not(.consent-set) [data-chrome="security-notice"]{display:none}}@media (min-width:1024px){html.consent-set [data-chrome="security-notice"]{bottom:calc(var(--chrome-safe-bottom) + 3.25rem + var(--chrome-gutter))}}`;

/**
 * Small dismissible notice about automated content copying.
 *
 * Nothing is server-rendered: the card is not part of the indexed page and adds
 * nothing to <head>. It is fixed-position, so it shifts no layout, and it mounts
 * on the visitor's first scroll, tap or key press. Largest Contentful Paint
 * stops recording at that first input, so the card can never become the LCP
 * element the way the late consent banner once did.
 */
export function SecurityNotice(): ReactElement | null {
  const pathname = usePathname() ?? '/en';
  const copy = getCommonDictionary(siteLocaleFromPath(pathname)).securityNotice;
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY)) return;
    } catch { /* Storage unavailable: show the notice, it just will not stay closed. */ }

    const events = ['scroll', 'pointerdown', 'keydown', 'touchstart'] as const;
    const reveal = () => {
      for (const type of events) window.removeEventListener(type, reveal);
      setShow(true);
    };
    for (const type of events) window.addEventListener(type, reveal, { passive: true });
    return () => {
      for (const type of events) window.removeEventListener(type, reveal);
    };
  }, []);

  if (!show) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch { /* Closed for this page view only. */ }
    setShow(false);
  };

  return (
    <>
      <style>{PLACEMENT_STYLE}</style>
      <aside
        aria-labelledby="security-notice-title"
        data-chrome="security-notice"
        className="fixed inset-x-3 z-[45] rounded-2xl border border-hairline bg-background/90 p-4 pr-11 shadow-[0_10px_30px_-12px_oklch(0_0_0_/_35%)] backdrop-blur-md sm:inset-x-auto sm:left-4 sm:max-w-sm"
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label={copy.close}
          title={copy.close}
          className="absolute right-2 top-2 grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <X className="size-4" aria-hidden />
        </button>
        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
          <ShieldCheck className="mr-1.5 inline size-4 align-[-0.2em] text-primary" aria-hidden />
          <strong id="security-notice-title" className="font-semibold text-foreground">
            {copy.title}
          </strong>{' '}
          {copy.body}
        </p>
        <p className="mt-2 text-xs font-medium text-foreground sm:text-sm">{copy.signature}</p>
      </aside>
    </>
  );
}

export default SecurityNotice;
