import type { Location } from '@/data/locations';
import {
  MIN_FAQS,
  MIN_INTRO_WORDS,
  MIN_NEIGHBORHOODS,
  MONEY_SERVICES,
  wordCount,
  type LocationContentLocale,
  type LocationContentPack,
} from './types';
import { LOCATION_PACKS_EL } from './packs-el';
import { LOCATION_PACKS_EN } from './packs-en';

/** Hubs that must ship website-creation + local-seo depth before indexing. */
export const MONEY_HUB_SLUGS = new Set([
  'athens-gr',
  'thessaloniki-gr',
  'heraklion-gr',
  'santorini-gr',
  'mykonos-gr',
  'paros-gr',
  'naxos-gr',
  'crete-gr',
  'rethymno-gr',
  'chania-gr',
  'kos-gr',
  'rhodes-gr',
  'corfu-gr',
  'zakynthos-gr',
  'london-uk',
]);

export function getLocationPack(
  slug: string,
  locale: LocationContentLocale,
): LocationContentPack | undefined {
  return locale === 'el' ? LOCATION_PACKS_EL[slug] : LOCATION_PACKS_EN[slug];
}

export interface LocationContentGateResult {
  ok: boolean;
  reasons: string[];
}

/**
 * Uniqueness gate: a location may be indexed / sitemap-listed for a locale
 * only when the pack + Location entity facts pass these checks.
 */
export function evaluateLocationContent(
  location: Location,
  locale: LocationContentLocale,
): LocationContentGateResult {
  const reasons: string[] = [];
  const pack = getLocationPack(location.slug, locale);

  if (!pack) {
    reasons.push('missing-content-pack');
    return { ok: false, reasons };
  }

  if (wordCount(pack.intro) < MIN_INTRO_WORDS) {
    reasons.push(`intro-too-short:${wordCount(pack.intro)}<${MIN_INTRO_WORDS}`);
  }

  const neighborhoods = location.neighborhoods?.length ?? 0;
  if (neighborhoods < MIN_NEIGHBORHOODS) {
    reasons.push(`neighborhoods:${neighborhoods}<${MIN_NEIGHBORHOODS}`);
  }

  if (locale === 'el' && location.countryCode === 'GR' && !location.cityLocal?.trim()) {
    reasons.push('missing-cityLocal');
  }

  if (!Number.isFinite(location.latitude) || !Number.isFinite(location.longitude)) {
    reasons.push('missing-coordinates');
  }

  if (!location.currency) {
    reasons.push('missing-currency');
  }

  const faqCount = pack.faqs?.length ?? 0;
  if (faqCount < MIN_FAQS) {
    reasons.push(`faqs:${faqCount}<${MIN_FAQS}`);
  }

  if (MONEY_HUB_SLUGS.has(location.slug)) {
    for (const svc of MONEY_SERVICES) {
      if (!pack.serviceDepth?.[svc]?.trim()) {
        reasons.push(`missing-serviceDepth:${svc}`);
      }
    }
  }

  return { ok: reasons.length === 0, reasons };
}

export function hasLocationContent(
  location: Location,
  locale: LocationContentLocale,
): boolean {
  return evaluateLocationContent(location, locale).ok;
}
