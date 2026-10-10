import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

/**
 * The founder, as confirmed by the owner (2026-10).
 *
 * Same rule as `company-facts.ts`: nothing here may be aspirational. These
 * four facts (name, base, years, projects delivered) are everything that is
 * on record. No certifications, awards, clients or reviews until the owner
 * supplies them. No founding year either: the claim is "10+ years".
 *
 * Kept free of heavy imports (no portfolio) because the client-side Footer
 * reads the consultant path from here.
 */
export const FOUNDER = {
  name: 'George K',
  nameEl: 'Γιώργος Κ.',
  /** Accusative, for «γνωρίστε τον Γιώργο Κ.». */
  nameElAcc: 'Γιώργο Κ.',
  jobTitle: 'SEO Consultant',
  jobTitleEl: 'Σύμβουλος SEO',
  city: 'Athens',
  cityEl: 'Αθήνα',
  country: 'GR',
} as const;

/** Years of SEO experience, shown as "10+". */
export const FOUNDER_YEARS = 10;

/** Projects delivered in total (the /work portfolio shows a live subset). */
export const PROJECTS_DELIVERED = 200;

const SITE = 'https://anotherseoguru.com';

/** Stable JSON-LD id, shared by the Person node and Organization.founder. */
export const FOUNDER_SCHEMA_ID = `${SITE}/#founder`;

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
