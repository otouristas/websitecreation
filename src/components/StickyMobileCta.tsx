'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactElement } from 'react';
import { ArrowRight } from 'lucide-react';
import { localizedPath, siteLocaleFromPath } from '@/lib/i18n/locale';
import { getNavDictionary } from '@/lib/i18n/get-dictionary';
import { trackCtaClick } from '@/lib/analytics';
import { PHONE_DISPLAY, WHATSAPP_HREF } from '@/lib/contact-info';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { appLink } from '@/components/gsc-boost/copy';

/**
 * Space the floating pill takes at the bottom of the viewport: 3.5rem pill +
 * 0.75rem gap above the safe-area inset (or 0.75rem when there is none).
 */
const BAR_HEIGHT = 'calc(4.25rem + max(0.75rem, env(safe-area-inset-bottom, 0px)))';

/**
 * Server-rendered so the value is right on the first paint. The height and the
 * bar itself apply only once a cookie choice exists (html.consent-set). Until
 * then the consent dialog owns the bottom edge and the bar stays hidden, which
 * keeps it from covering the dialog or the other way around. Scoped to the
 * breakpoint where the pill shows.
 */
const BAR_HEIGHT_STYLE = `@media (max-width:1023.98px){[data-chrome="sticky-cta"]{display:none}html.consent-set{--chrome-bottom-bar:${BAR_HEIGHT}}html.consent-set [data-chrome="sticky-cta"]{display:flex}}`;

const WHATSAPP_ARIA = {
  en: `Chat on WhatsApp ${PHONE_DISPLAY}`,
  el: `Μιλήστε μας στο WhatsApp ${PHONE_DISPLAY}`,
} as const;

/**
 * Mobile conversion bar: one floating glass pill holding sign-up (primary),
 * the quote and WhatsApp, in the iOS "liquid glass" style. It replaces the old
 * full-width bottom bar plus the separate green WhatsApp pill, which stacked
 * on top of each other and covered the page. On desktop only the WhatsApp
 * pill (WhatsAppPill) remains.
 */
export function StickyMobileCta(): ReactElement | null {
  const pathname = usePathname() ?? '/en';
  const locale = siteLocaleFromPath(pathname);
  const nav = getNavDictionary(locale);
  const lp = (path: string) => localizedPath(locale, path);

  // The quote and contact pages are the destination; a CTA there covers the form.
  if (pathname.includes('/get-started') || pathname.includes('/contact')) {
    return null;
  }

  return (
    <>
      <style>{BAR_HEIGHT_STYLE}</style>
      <div
        data-chrome="sticky-cta"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
      >
        <div
          className="
            pointer-events-auto relative flex w-full max-w-[24rem] items-center gap-1.5 rounded-full p-1.5
            border border-white/25 bg-[color-mix(in_oklab,var(--background)_42%,transparent)]
            shadow-[inset_0_1px_0_0_oklch(1_0_0/35%),inset_0_-1px_0_0_oklch(1_0_0/8%),0_18px_40px_-14px_oklch(0_0_0/55%),0_4px_12px_-4px_oklch(0_0_0/30%)]
            backdrop-blur-2xl backdrop-saturate-[1.8]
            light:border-white/70 light:bg-white/55
          "
        >
          {/* Specular sheen across the top half, the "glass" highlight. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-3 top-0 h-1/2 rounded-t-full bg-[linear-gradient(to_bottom,oklch(1_0_0/18%),transparent)]"
          />
          <a
            href={appLink('/signup', locale, 'sticky-mobile')}
            onClick={() => trackCtaClick('sticky_mobile_signup')}
            className="relative flex h-12 min-w-0 flex-[1.15] items-center justify-center gap-1.5 rounded-full asg-primary-action px-3 font-display text-[0.875rem] font-semibold text-primary-foreground shadow-[inset_0_1px_0_0_oklch(1_0_0/25%),0_6px_18px_-8px_color-mix(in_oklab,var(--primary)_90%,transparent)] active:scale-[0.98] min-[400px]:text-[0.9375rem] motion-reduce:active:scale-100"
          >
            <span className="truncate">{locale === "el" ? nav.signUpShort : nav.signUp}</span>
          </a>
          <Link
            href={lp('/get-started')}
            onClick={() => trackCtaClick('sticky_mobile_quote')}
            className="relative flex h-12 min-w-0 flex-1 items-center justify-center gap-1 rounded-full border border-white/20 px-3 text-[0.875rem] font-semibold text-foreground active:scale-[0.98] light:border-black/10 min-[400px]:text-[0.9375rem] motion-reduce:active:scale-100"
          >
            <span className="truncate">{nav.getQuoteShort}</span>
            <ArrowRight className="size-4 shrink-0 max-[359px]:hidden" aria-hidden />
          </Link>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCtaClick('sticky_mobile_whatsapp')}
            aria-label={WHATSAPP_ARIA[locale] ?? WHATSAPP_ARIA.en}
            className="relative grid size-12 shrink-0 place-items-center rounded-full bg-[#25D366] text-[#062a14] shadow-[inset_0_1px_0_0_oklch(1_0_0/35%)] active:scale-[0.98] motion-reduce:active:scale-100"
          >
            <WhatsAppIcon className="size-5 shrink-0" />
          </a>
        </div>
      </div>
    </>
  );
}

export default StickyMobileCta;
