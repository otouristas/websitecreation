export type SiteLocale = 'en' | 'el';

export const LOCALES: SiteLocale[] = ['en', 'el'];
export const DEFAULT_LOCALE: SiteLocale = 'en';

export const EN_PREFIX = '/en';
export const EL_PREFIX = '/el';
export const GREEK_PREFIX = EL_PREFIX;

export function localePrefix(locale: SiteLocale): string {
  return locale === 'el' ? EL_PREFIX : EN_PREFIX;
}

export function localizedPath(locale: SiteLocale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const prefix = localePrefix(locale);
  if (normalized === '/') return prefix;
  return `${prefix}${normalized}`;
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === '/en' || pathname === '/el') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3) || '/';
  if (pathname.startsWith('/el/')) return pathname.slice(3) || '/';
  return pathname;
}

export function isLocalizedPath(pathname: string): boolean {
  return (
    pathname === '/en' ||
    pathname === '/el' ||
    pathname.startsWith('/en/') ||
    pathname.startsWith('/el/')
  );
}

export function isGreekPath(pathname: string): boolean {
  return pathname === '/el' || pathname.startsWith('/el/');
}

export function isEnglishPath(pathname: string): boolean {
  return pathname === '/en' || pathname.startsWith('/en/');
}

export function siteLocaleFromPath(pathname: string): SiteLocale {
  if (isGreekPath(pathname)) return 'el';
  if (isEnglishPath(pathname)) return 'en';
  return DEFAULT_LOCALE;
}

export function swapLocaleInPath(pathname: string, target: SiteLocale): string {
  const bare = stripLocalePrefix(pathname);
  return localizedPath(target, bare);
}

export function isValidLocale(value: string): value is SiteLocale {
  return value === 'en' || value === 'el';
}
