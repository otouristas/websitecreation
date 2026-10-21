'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactElement } from 'react';
import { ArrowRight } from 'lucide-react';
import { localizedPath, siteLocaleFromPath } from '@/lib/i18n/locale';
import { getNavDictionary } from '@/lib/i18n/get-dictionary';
import { trackCtaClick } from '@/lib/analytics';
import { PHONE_DISPLAY, WHATSAPP_HREF } from '@/lib/contact-info';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { appLink } from '@/components/gsc-boost/copy';
import { cn } from '@/lib/cn';

/**
 * Space the floating pill takes at the bottom of the viewport: a 3rem pill
 * (4px padding + 40px controls) plus at least 0.5rem, or the safe-area inset
 * when that is taller.
 */
const BAR_HEIGHT = 'calc(3rem + max(0.5rem, env(safe-area-inset-bottom, 0px)))';

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
 * the quote and WhatsApp. On desktop only the WhatsApp pill (WhatsAppPill)
 * remains. The bar slides away while the hero actions or the footer are on
 * screen, so it does not stack on top of those controls.
 */
export function StickyMobileCta(): ReactElement | null {
  const pathname = usePathname() ?? '/en';
  const locale = siteLocaleFromPath(pathname);
  const nav = getNavDictionary(locale);
  const lp = (path: string) => localizedPath(locale, path);
  const [suppressed, setSuppressed] = useState(false);

  // The quote and contact pages are the destination; a CTA there covers the form.
  const hiddenRoute = pathname.includes('/get-started') || pathname.includes('/contact');

  useEffect(() => {
    if (hiddenRoute) return;
    const nodes = [document.querySelector('[data-hero-cta]'), document.querySelector('footer')].filter(
      (node): node is Element => node instanceof Element,
    );
    if (nodes.length === 0) return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setSuppressed(visible.size > 0);
      },
      // Any overlap counts. A tall footer never reaches a 25% ratio inside
      // one viewport, so a higher threshold left the bar covering it.
      // The shrunken bottom edge waits until the footer or the hero actions
      // actually meet the pill.
      { threshold: 0, rootMargin: '0px 0px -48px 0px' },
    );
    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [hiddenRoute, pathname]);

  if (hiddenRoute) {
    return null;
  }

  return (
    <>
      <style>{BAR_HEIGHT_STYLE}</style>
      <div
        data-chrome="sticky-cta"
        aria-hidden={suppressed || undefined}
        inert={suppressed ? true : undefined}
        className={cn(
          'pointer-events-none fixed inset-x-0 bottom-0 z-50 justify-center px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] transition-transform duration-300 ease-out lg:hidden motion-reduce:transition-none',
          suppressed ? 'translate-y-[calc(100%+0.75rem)]' : 'translate-y-0',
        )}
      >
        <div
          className={cn(
            'pointer-events-auto relative flex w-full max-w-[23.5rem] items-center gap-1 rounded-full p-1',
            'border border-[color-mix(in_oklab,var(--foreground)_16%,transparent)]',
            'bg-[color-mix(in_oklab,var(--background)_68%,transparent)]',
            'shadow-[inset_0_1px_0_0_oklch(1_0_0/32%),0_14px_36px_-16px_oklch(0_0_0/48%),0_2px_8px_-4px_oklch(0_0_0/28%)]',
            'backdrop-blur-2xl backdrop-saturate-150',
            'supports-[backdrop-filter]:bg-[color-mix(in_oklab,var(--background)_58%,transparent)]',
            suppressed && 'pointer-events-none',
          )}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-4 top-0 h-px bg-[linear-gradient(90deg,transparent,oklch(1_0_0/55%),transparent)]"
          />
          <a
            href={appLink('/signup', locale, 'sticky-mobile')}
            onClick={() => trackCtaClick('sticky_mobile_signup')}
            className="relative flex h-10 min-w-0 flex-1 items-center justify-center rounded-full px-3 font-display text-[13.5px] font-semibold tracking-[-0.01em] asg-primary-action shadow-[inset_0_1px_0_0_oklch(1_0_0/22%)] active:scale-[0.98] motion-reduce:active:scale-100"
          >
            <span className="truncate">{locale === 'el' ? nav.signUpShort : nav.signUp}</span>
          </a>
          <Link
            href={lp('/get-started')}
            onClick={() => trackCtaClick('sticky_mobile_quote')}
            className="relative flex h-10 min-w-0 flex-1 items-center justify-center gap-1 rounded-full border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-[color-mix(in_oklab,var(--foreground)_8%,var(--surface))] px-3 text-[13.5px] font-semibold tracking-[-0.01em] text-foreground shadow-[inset_0_1px_0_0_oklch(1_0_0/18%)] active:scale-[0.98] motion-reduce:active:scale-100"
          >
            <span className="truncate">{nav.getQuoteShort}</span>
            <ArrowRight className="size-3.5 shrink-0 max-[379px]:hidden" aria-hidden />
          </Link>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCtaClick('sticky_mobile_whatsapp')}
            aria-label={WHATSAPP_ARIA[locale] ?? WHATSAPP_ARIA.en}
            className="relative grid size-8 shrink-0 place-items-center rounded-full bg-[#25D366] text-[#062a14] shadow-[inset_0_1px_0_0_oklch(1_0_0/40%),0_4px_10px_-4px_oklch(0.45_0.14_150/55%)] active:scale-[0.98] motion-reduce:active:scale-100"
          >
            <WhatsAppIcon className="size-[1.05rem] shrink-0" />
          </a>
        </div>
      </div>
    </>
  );
}

export default StickyMobileCta;
