'use client';

import { usePathname } from 'next/navigation';
import type { ReactElement } from 'react';
import { trackCtaClick } from '@/lib/analytics';
import { PHONE_DISPLAY, WHATSAPP_HREF } from '@/lib/contact-info';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { siteLocaleFromPath, type SiteLocale } from '@/lib/i18n/locale';

const COPY: Record<SiteLocale, { full: string; short: string; aria: string }> = {
  en: { full: 'Chat on WhatsApp', short: 'WhatsApp', aria: `Chat on WhatsApp ${PHONE_DISPLAY}` },
  el: { full: 'Μίλα μας στο WhatsApp', short: 'WhatsApp', aria: `WhatsApp ${PHONE_DISPLAY}` },
};

/**
 * Floating WhatsApp conversion CTA.
 *
 * Replaces two things: the square WhatsApp button that used to sit inside the
 * sticky mobile bar - where it read as one more bottom-navigation tab rather
 * than a conversion CTA - and the desktop-only circular bubble.
 *
 * It floats clear of everything else at the bottom of the viewport by stacking
 * on the `--chrome-*` variables the sticky bar and cookie banner publish, plus
 * the iOS safe-area inset. It is deliberately not full width: it is an
 * inline-size pill pinned to the right gutter, so it reads as a floating
 * action, not as chrome.
 *
 * The label collapses to "WhatsApp" under 360px, where a 24-character Greek
 * string would otherwise eat the full line.
 */
export function WhatsAppPill({ locale: localeProp }: { locale?: SiteLocale } = {}): ReactElement | null {
  const pathname = usePathname() ?? '/en';
  const locale = localeProp ?? siteLocaleFromPath(pathname);
  const copy = COPY[locale] ?? COPY.en;

  // The contact and quote pages are the conversion destination already; a
  // floating CTA there just covers the form it is asking people to fill in.
  if (pathname.includes('/get-started') || pathname.includes('/contact')) {
    return null;
  }

  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCtaClick('floating_whatsapp_pill')}
      aria-label={copy.aria}
      data-chrome="whatsapp-pill"
      style={{
        // The sticky bar already absorbs the safe-area inset, so take whichever
        // of the two is larger rather than adding both.
        bottom:
          'calc(max(var(--chrome-bottom-bar), var(--chrome-safe-bottom)) + var(--chrome-cookie-bar) + var(--chrome-gutter))',
      }}
      className="
        fixed right-4 z-[55] inline-flex h-12 min-h-12 items-center gap-2 rounded-full
        bg-[#25D366] pl-3.5 pr-4 text-[0.9375rem] font-semibold text-white
        shadow-[0_10px_30px_-8px_oklch(0_0_0_/_35%),0_2px_6px_-2px_oklch(0_0_0_/_25%)]
        ring-1 ring-black/5 transition-[transform,box-shadow] duration-200
        hover:-translate-y-0.5 hover:shadow-[0_16px_38px_-10px_oklch(0_0_0_/_40%)]
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]
        active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0
        sm:right-5 lg:right-6
      "
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      <span className="hidden whitespace-nowrap min-[360px]:inline">{copy.full}</span>
      <span className="whitespace-nowrap min-[360px]:hidden">{copy.short}</span>
    </a>
  );
}

export default WhatsAppPill;
