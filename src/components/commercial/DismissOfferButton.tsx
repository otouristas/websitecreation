'use client';

import type { SiteLocale } from '@/lib/i18n/locale';

/** Hides the in-flow offer strip for the rest of the browser session. */
export function DismissOfferButton({ locale }: { readonly locale: SiteLocale }) {
  return (
    <button
      type="button"
      className="rounded-md px-2 py-1 text-muted-foreground hover:text-foreground motion-reduce:transition-none"
      onClick={() => {
        try {
          sessionStorage.setItem('asg-launch-offer', 'dismissed');
        } catch {
          /* Storage can be blocked. The class still hides it for this view. */
        }
        document.documentElement.classList.add('launch-offer-dismissed');
      }}
    >
      <span className="sr-only">{locale === 'el' ? 'Κλείσιμο' : 'Dismiss'}</span>
      <span aria-hidden>×</span>
    </button>
  );
}
