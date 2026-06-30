'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localizedPath, siteLocaleFromPath, type SiteLocale } from '@/lib/i18n/locale';
import { getNavDictionary } from '@/lib/i18n/get-dictionary';
import { trackCtaClick } from '@/lib/analytics';

export function StickyMobileCta() {
  const pathname = usePathname() ?? '/en';
  const locale = siteLocaleFromPath(pathname);
  const nav = getNavDictionary(locale);
  const lp = (path: string) => localizedPath(locale, path);

  if (pathname.includes('/get-started') || pathname.includes('/contact')) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[80%] max-w-sm sm:max-w-md backdrop-blur-xl bg-background/70 dark:bg-background/50 border border-white/20 dark:border-neutral-800/80 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.3)] dark:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.6)] rounded-2xl p-2 lg:hidden transition-transform duration-300 hover:scale-102">
      <div className="flex gap-2 w-full">
        <Link
          href={lp('/get-started')}
          onClick={() => trackCtaClick('sticky_mobile_quote')}
          className="btn btn-gradient flex-1 py-3 text-xs sm:text-sm font-bold justify-center rounded-xl shadow-md"
        >
          {nav.getQuote}
        </Link>
        <Link
          href={lp('/work')}
          onClick={() => trackCtaClick('sticky_mobile_work')}
          className="btn btn-outline flex-1 py-3 text-xs sm:text-sm font-bold justify-center rounded-xl bg-background/30"
        >
          {nav.ourWork}
        </Link>
      </div>
    </div>
  );
}

export default StickyMobileCta;
