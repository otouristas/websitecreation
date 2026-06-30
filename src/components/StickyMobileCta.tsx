'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localizedPath, siteLocaleFromPath } from '@/lib/i18n/locale';
import { getNavDictionary } from '@/lib/i18n/get-dictionary';

export function StickyMobileCta() {
  const pathname = usePathname() ?? '/en';
  const locale = siteLocaleFromPath(pathname);
  const nav = getNavDictionary(locale);
  const lp = (path: string) => localizedPath(locale, path);

  if (pathname.includes('/get-started') || pathname.includes('/contact')) {
    return null;
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background p-3 md:hidden">
      <div className="flex gap-2">
        <Link href={lp('/get-started')} className="btn btn-gradient flex-1 py-3 text-sm font-semibold">
          {nav.getQuote}
        </Link>
        <Link href={lp('/work')} className="btn btn-outline flex-1 py-3 text-sm font-semibold">
          {nav.ourWork}
        </Link>
      </div>
    </div>
  );
}

export default StickyMobileCta;
