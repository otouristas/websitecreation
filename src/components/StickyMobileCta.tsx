'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactElement } from 'react';
import { localizedPath, siteLocaleFromPath } from '@/lib/i18n/locale';
import { getNavDictionary } from '@/lib/i18n/get-dictionary';
import { trackCtaClick } from '@/lib/analytics';

/**
 * Height this bar occupies, expressed in CSS so it stays correct with the iOS
 * safe-area inset: 0.5rem top padding + 3rem control + max(0.75rem, inset).
 */
const BAR_HEIGHT = 'calc(3.5rem + max(0.75rem, env(safe-area-inset-bottom, 0px)))';

/**
 * Server-rendered so the value is right on the first paint. The cookie banner
 * and the WhatsApp pill stack on top of this, and measuring it in an effect
 * instead would make both of them jump once on every page load. It is scoped
 * to the same breakpoint as the bar itself, and it simply is not emitted on
 * the pages where the bar does not render.
 */
const BAR_HEIGHT_STYLE = `@media (max-width:1023.98px){:root{--chrome-bottom-bar:${BAR_HEIGHT}}}`;

export function StickyMobileCta(): ReactElement | null {
  const pathname = usePathname() ?? '/en';
  const locale = siteLocaleFromPath(pathname);
  const nav = getNavDictionary(locale);
  const lp = (path: string) => localizedPath(locale, path);

  if (pathname.includes('/get-started') || pathname.includes('/contact')) {
    return null;
  }

  return (
    <>
      <style>{BAR_HEIGHT_STYLE}</style>
      <div
        data-chrome="sticky-cta"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-background/85 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden"
      >
        {/* One destination only. WhatsApp used to share this row as a square
            icon button, which turned a conversion bar into something that read
            like a two-tab bottom navigation; it is a floating pill now. */}
        <div className="mx-auto max-w-lg">
          <Link
            href={lp('/get-started')}
            onClick={() => trackCtaClick('sticky_mobile_quote')}
            className="btn btn-gradient flex h-12 w-full items-center justify-center text-sm"
          >
            {nav.getQuote}
          </Link>
        </div>
      </div>
    </>
  );
}

export default StickyMobileCta;
