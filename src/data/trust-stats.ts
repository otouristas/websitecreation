import type { SiteLocale } from '@/lib/i18n/locale';

/** Single source of truth for the truthful proof numbers reused across hero, mega menu, mobile nav. */
export interface TrustStat {
  value: string;
  label: string;
}

export function getTrustStats(locale: SiteLocale): TrustStat[] {
  if (locale === 'el') {
    return [
      { value: '55+', label: 'Ολοκληρωμένα έργα' },
      { value: '5', label: 'Αγορές' },
      { value: 'EL/EN', label: 'Γλώσσες' },
      { value: '24 ώρες', label: 'Χρόνος απάντησης' },
    ];
  }
  return [
    { value: '55+', label: 'Projects delivered' },
    { value: '5', label: 'Markets' },
    { value: 'EN/EL', label: 'Languages' },
    { value: '24h', label: 'Response time' },
  ];
}

/** Compact trust chips for nav surfaces (menu headers, mobile). */
export function getTrustChips(locale: SiteLocale): string[] {
  return locale === 'el'
    ? ['55+ έργα', 'Απάντηση σε 24 ώρες', 'EL/EN']
    : ['55+ projects', '24h response', 'EN/EL'];
}

export const MARKETS_LABEL: Record<SiteLocale, string> = {
  en: 'Greece · UK · US · Canada · Europe',
  el: 'Ελλάδα · Ην. Βασίλειο · ΗΠΑ · Καναδάς · Ευρώπη',
};
