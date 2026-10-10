import type { SiteLocale } from '@/lib/i18n/locale';
import { MARKET_COUNT, PROJECTS_DELIVERED_LABEL } from '@/data/company-facts';

/** Single source of truth for the truthful proof numbers reused across hero, mega menu, mobile nav. */
export interface TrustStat {
  value: string;
  label: string;
}

export function getTrustStats(locale: SiteLocale): TrustStat[] {
  if (locale === 'el') {
    return [
      { value: PROJECTS_DELIVERED_LABEL, label: 'Ολοκληρωμένα έργα' },
      { value: `${MARKET_COUNT}`, label: 'Αγορές' },
      { value: 'EL/EN', label: 'Γλώσσες' },
      { value: '24 ώρες', label: 'Χρόνος απάντησης' },
    ];
  }
  return [
    { value: PROJECTS_DELIVERED_LABEL, label: 'Projects delivered' },
    { value: `${MARKET_COUNT}`, label: 'Markets' },
    { value: 'EN/EL', label: 'Languages' },
    { value: '24h', label: 'Response time' },
  ];
}

/** Compact trust chips for nav surfaces (menu headers, mobile). */
export function getTrustChips(locale: SiteLocale): string[] {
  return locale === 'el'
    ? [`${PROJECTS_DELIVERED_LABEL} έργα`, 'Απάντηση σε 24 ώρες', 'EL/EN']
    : [`${PROJECTS_DELIVERED_LABEL} projects`, '24h response', 'EN/EL'];
}

/**
 * The markets actually represented in the portfolio. `MARKET_COUNT` computes to
 * 4 (GR, EU, UK, US) - no project carries `CA`, so the previous "5 markets" and
 * the Canada entry were both unsupported, and they sat directly beside the
 * project count as proof.
 */
export const MARKETS_LABEL: Record<SiteLocale, string> = {
  en: 'Greece · UK · US · Europe',
  el: 'Ελλάδα · Ην. Βασίλειο · ΗΠΑ · Ευρώπη',
};
