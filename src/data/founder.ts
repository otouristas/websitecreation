import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

/**
 * Experience figures the owner confirmed (2026-10), plus the consultant-page
 * paths. The public entity is the company Touristas Technologies. Nothing
 * here names a person.
 *
 * Kept free of heavy imports (no portfolio) because the client-side Footer
 * reads the consultant path from here.
 */

/** Years of SEO experience, shown as "10+". */
export const FOUNDER_YEARS = 10;

/** Projects delivered in total (the /work portfolio shows a live subset). */
export const PROJECTS_DELIVERED = 200;

const SITE = 'https://anotherseoguru.com';

/** The consultant page has a different slug per locale. */
export const CONSULTANT_SLUG: Record<SiteLocale, string> = {
  en: '/seo-consultant',
  el: '/symvoulos-seo',
};

export function consultantPath(locale: SiteLocale): string {
  return localizedPath(locale, CONSULTANT_SLUG[locale]);
}

export function consultantUrl(locale: SiteLocale): string {
  return `${SITE}${consultantPath(locale)}`;
}
