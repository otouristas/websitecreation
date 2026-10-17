'use client';

import { usePathname } from 'next/navigation';
import { openCookiePreferences } from '@/lib/cookie-preferences';
import { siteLocaleFromPath, type SiteLocale } from '@/lib/i18n/locale';

const LABEL: Record<SiteLocale, string> = {
  el: 'Προτιμήσεις cookies',
  en: 'Cookie preferences',
};

/** In-flow reopen control. Callers hide it at `lg`, where a corner icon takes over. */
export function CookiePreferencesLink({
  locale,
  label,
  className,
}: {
  locale?: SiteLocale;
  label?: string;
  className?: string;
}) {
  const pathname = usePathname() ?? '/en';
  const resolved = locale ?? siteLocaleFromPath(pathname);
  return (
    <button
      type="button"
      data-chrome="cookie-preferences"
      onClick={openCookiePreferences}
      className={className}
    >
      {label ?? LABEL[resolved]}
    </button>
  );
}
