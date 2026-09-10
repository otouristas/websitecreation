import type { SiteLocale } from '@/lib/i18n/locale';
import { portfolioProjects } from '@/data/portfolio';
import { MARKET_COUNT } from '@/data/company-facts';

/**
 * Derived from the portfolio so the count can never drift from what /work
 * lists. The growth blueprint flagged inconsistent "55+" vs "70+" claims across
 * templates as a P0 trust issue.
 */
export const PROJECT_COUNT = portfolioProjects.length;

/** Single source of truth for the truthful proof numbers reused across hero, mega menu, mobile nav. */
export interface TrustStat {
  value: string;
  label: string;
}

export function getTrustStats(locale: SiteLocale): TrustStat[] {
  if (locale === 'el') {
    return [
      { value: `${PROJECT_COUNT}`, label: 'Ολοκληρωμένα έργα' },
      { value: `${MARKET_COUNT}`, label: 'Αγορές' },
      { value: 'EL/EN', label: 'Γλώσσες' },
      { value: '24 ώρες', label: 'Χρόνος απάντησης' },
    ];
  }
  return [
    { value: `${PROJECT_COUNT}`, label: 'Projects delivered' },
    { value: `${MARKET_COUNT}`, label: 'Markets' },
    { value: 'EN/EL', label: 'Languages' },
    { value: '24h', label: 'Response time' },
  ];
}

/** Compact trust chips for nav surfaces (menu headers, mobile). */
export function getTrustChips(locale: SiteLocale): string[] {
  return locale === 'el'
    ? [`${PROJECT_COUNT} έργα`, 'Απάντηση σε 24 ώρες', 'EL/EN']
    : [`${PROJECT_COUNT} projects`, '24h response', 'EN/EL'];
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
