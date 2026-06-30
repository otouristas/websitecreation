import type { SiteLocale } from '@/lib/i18n/locale';
import type { Industry } from '@/data/industries';
import { getIndustryBySlug } from '@/data/industries';
import { industriesEl } from '@/data/industries-i18n';

export interface LocalizedIndustry {
  slug: string;
  name: string;
  description: string;
  metaDescription: string;
  painPoints: string[];
  icon: string;
}

export function getLocalizedIndustry(slug: string, locale: SiteLocale): LocalizedIndustry | undefined {
  const base = getIndustryBySlug(slug);
  if (!base) return undefined;
  if (locale === 'en') return base;
  const el = industriesEl[slug];
  if (!el) return base;
  return {
    ...base,
    name: el.name,
    description: el.description,
    metaDescription: el.metaDescription,
    painPoints: el.painPoints,
  };
}

export function getIndustryMeta(industry: LocalizedIndustry, locale: SiteLocale) {
  return {
    title: locale === 'el' ? `${industry.name} — Ιστοσελίδες & SEO` : `Website Solutions for ${industry.name}`,
    description: industry.metaDescription,
  };
}
