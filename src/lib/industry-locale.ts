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

const EN_INDUSTRY_META: Record<string, { title: string; description: string }> = {
  hotels: {
    title: 'Hotel Website Design & SEO Agency',
    description:
      'Hotel website design with booking CTAs, room galleries and tourism SEO. Built to win direct bookings back from the OTAs. Request a quote.',
  },
  'rent-a-car': {
    title: 'Rent-a-Car Website Design & SEO',
    description:
      'Car rental website design with fleet pages, booking funnels and local SEO for airports and islands. Free EUR quote.',
  },
  'tour-operators': {
    title: 'Tour Operator Website Design & SEO',
    description:
      'Tour operator websites with excursion catalogs, booking CTAs and destination SEO. Built for Google and AI search.',
  },
};

export function getIndustryMeta(industry: LocalizedIndustry, locale: SiteLocale) {
  if (locale === 'en') {
    const override = EN_INDUSTRY_META[industry.slug];
    if (override) return override;
    return {
      title: `${industry.name} Website Design & SEO`,
      description: industry.metaDescription,
    };
  }
  return {
    title: `${industry.name} - Ιστοσελίδες & SEO`,
    description: industry.metaDescription,
  };
}
