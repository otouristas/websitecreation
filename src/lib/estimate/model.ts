import {
  VAT_RATE,
  addOns,
  currentPrice,
  isOfferActive,
  seoPackages,
  websitePackages,
  withVat,
  type Tier,
} from '@/data/pricing';
import { SEO_MIN_TERM_MONTHS } from '@/data/company-facts';
import {
  ESTIMATE_BAND,
  EXTRA_LANGUAGE_SHARE,
  INCLUDED_PAGES,
  addOnPrice,
  featureRate,
  tierForScope,
} from '@/data/estimator-rates';

/**
 * The live cost model.
 *
 * Pure: inputs in, line items out, no clock of its own beyond the one the
 * offer window needs and no formatting. That matters because the same function
 * runs on every keystroke in the browser and once more on the server when the
 * brief is filed, and the two have to agree to the cent.
 *
 * Every line is traceable to a published figure. Where the price list has no
 * figure - extra pages beyond a tier, a second language - the multiplier lives
 * in `estimator-rates.ts` with the reasoning attached, not inline here.
 */

export type Track = 'website' | 'seo' | 'both';
export type SeoTierId = 'foundations' | 'growth' | 'authority';
export type AuditDepth = 'none' | 'technical' | 'advanced';

export interface EstimateInput {
  readonly track: Track;
  readonly pages: number;
  readonly languages: number;
  readonly features: readonly string[];
  readonly seoTier: SeoTierId;
  readonly contentPagesPerMonth: number;
  readonly auditDepth: AuditDepth;
  readonly maintenance: boolean;
}

export type LineKind = 'oneoff' | 'monthly';

export interface EstimateLine {
  readonly id: string;
  readonly labelEn: string;
  readonly labelEl: string;
  readonly kind: LineKind;
  /** Net of VAT. */
  readonly net: number;
  /** How the figure was reached, shown under the line. */
  readonly noteEn?: string;
  readonly noteEl?: string;
}

export interface Estimate {
  readonly lines: readonly EstimateLine[];
  readonly oneOffNet: number;
  readonly monthlyNet: number;
  readonly oneOffGross: number;
  readonly monthlyGross: number;
  readonly vatRate: number;
  /**
   * The scoping band, on the one-off only.
   *
   * The build is the figure a brief actually moves; the retainer is a
   * published list price plus a page rate, so bracketing it would imply a
   * vagueness that is not there.
   */
  readonly oneOffLowNet: number;
  readonly oneOffHighNet: number;
  /**
   * Build plus the contractual minimum term, for OUR qualification only.
   *
   * It travels with the brief and is never rendered to the visitor. Putting a
   * multiplied figure on screen turns a monthly decision into a five-figure
   * one, and the visitor declines a number they were never being asked for.
   * The minimum term itself is stated in words, exactly as /pricing states it.
   */
  readonly minTermNet: number;
  readonly minTermMonths: number;
  /** True when there is a retainer, so the term note applies. */
  readonly hasRetainer: boolean;
  readonly offerActive: boolean;
  /** What the active promotion takes off the packaged prices. */
  readonly savingNet: number;
  readonly websiteTier: Tier | null;
  readonly seoTier: Tier | null;
}

export const DEFAULT_ESTIMATE_INPUT: EstimateInput = {
  track: 'both',
  pages: 8,
  languages: 1,
  features: ['contact-form'],
  seoTier: 'growth',
  contentPagesPerMonth: 2,
  auditDepth: 'technical',
  maintenance: false,
};

export const PAGE_RANGE = { min: 1, max: 60 } as const;
export const LANGUAGE_RANGE = { min: 1, max: 5 } as const;
export const CONTENT_RANGE = { min: 0, max: 8 } as const;

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.round(value)));
}

/** Guards the model against whatever a URL, a slider or a stale draft supplies. */
export function normalizeInput(input: Partial<EstimateInput>): EstimateInput {
  const base = { ...DEFAULT_ESTIMATE_INPUT, ...input };
  return {
    track: base.track === 'website' || base.track === 'seo' ? base.track : 'both',
    pages: clamp(base.pages, PAGE_RANGE.min, PAGE_RANGE.max),
    languages: clamp(base.languages, LANGUAGE_RANGE.min, LANGUAGE_RANGE.max),
    features: Array.from(new Set(base.features)).filter((id) => featureRate(id) !== undefined),
    seoTier:
      base.seoTier === 'foundations' || base.seoTier === 'authority' ? base.seoTier : 'growth',
    contentPagesPerMonth: clamp(base.contentPagesPerMonth, CONTENT_RANGE.min, CONTENT_RANGE.max),
    auditDepth:
      base.auditDepth === 'none' || base.auditDepth === 'advanced' ? base.auditDepth : 'technical',
    maintenance: !!base.maintenance,
  };
}

function seoTierById(id: SeoTierId): Tier {
  const found = seoPackages.find((t) => t.id === id);
  if (!found) throw new Error(`estimator: unknown SEO tier "${id}"`);
  return found;
}

export function buildEstimate(raw: Partial<EstimateInput>, now?: Date): Estimate {
  const input = normalizeInput(raw);
  const lines: EstimateLine[] = [];
  const wantsWebsite = input.track !== 'seo';
  const wantsSeo = input.track !== 'website';

  let websiteTier: Tier | null = null;
  let listPriceOfPackages = 0;
  let paidPriceOfPackages = 0;

  // ------------------------------------------------------------------ build
  if (wantsWebsite) {
    websiteTier = tierForScope(input.pages, input.languages);
    const base = currentPrice(websiteTier, now);
    listPriceOfPackages += websiteTier.regular;
    paidPriceOfPackages += base;
    lines.push({
      id: 'website-base',
      labelEn: websiteTier.name,
      labelEl: websiteTier.name,
      kind: 'oneoff',
      net: base,
      noteEn: `Covers up to ${INCLUDED_PAGES[websiteTier.id]} pages`,
      noteEl: `Καλύπτει έως ${INCLUDED_PAGES[websiteTier.id]} σελίδες`,
    });

    const included = INCLUDED_PAGES[websiteTier.id] ?? 0;
    const extraPages = Math.max(0, input.pages - included);
    if (extraPages > 0) {
      const rate = addOnPrice('website-page');
      lines.push({
        id: 'extra-pages',
        labelEn: `${extraPages} extra page${extraPages === 1 ? '' : 's'}`,
        labelEl: `${extraPages} επιπλέον σελίδ${extraPages === 1 ? 'α' : 'ες'}`,
        kind: 'oneoff',
        net: extraPages * rate,
        noteEn: 'Designed, written and built like the rest',
        noteEl: 'Σχεδιασμένες, γραμμένες και φτιαγμένες όπως οι υπόλοιπες',
      });
    }

    const extraLanguages = input.languages - 1;
    if (extraLanguages > 0) {
      const net = Math.round(base * EXTRA_LANGUAGE_SHARE * extraLanguages);
      lines.push({
        id: 'languages',
        labelEn: `${extraLanguages} extra language${extraLanguages === 1 ? '' : 's'}`,
        labelEl: `${extraLanguages} επιπλέον γλώσσ${extraLanguages === 1 ? 'α' : 'ες'}`,
        kind: 'oneoff',
        net,
        noteEn: 'Templating, hreflang and the content pass',
        noteEl: 'Templating, hreflang και πέρασμα περιεχομένου',
      });
    }

    for (const id of input.features) {
      const rate = featureRate(id);
      if (!rate || rate.net === null) continue;
      lines.push({
        id: `feature-${id}`,
        labelEn: rate.labelEn,
        labelEl: rate.labelEl,
        kind: 'oneoff',
        net: rate.net,
        noteEn: 'Scoped with you before anything is built',
        noteEl: 'Καθορίζεται μαζί σας πριν φτιαχτεί οτιδήποτε',
      });
    }
  }

  // ------------------------------------------------------------------- SEO
  let seoTier: Tier | null = null;
  if (wantsSeo) {
    seoTier = seoTierById(input.seoTier);
    const monthly = currentPrice(seoTier, now);
    listPriceOfPackages += seoTier.regular;
    paidPriceOfPackages += monthly;
    lines.push({
      id: 'seo-retainer',
      labelEn: `${seoTier.name} retainer`,
      labelEl: `Μηνιαία συνεργασία ${seoTier.name}`,
      kind: 'monthly',
      net: monthly,
      noteEn: 'Billed monthly',
      noteEl: 'Χρεώνεται μηνιαία',
    });

    if (input.contentPagesPerMonth > 0) {
      const rate = addOnPrice('content-page');
      lines.push({
        id: 'content',
        labelEn: `${input.contentPagesPerMonth} content page${input.contentPagesPerMonth === 1 ? '' : 's'} / month`,
        labelEl: `${input.contentPagesPerMonth} σελίδ${input.contentPagesPerMonth === 1 ? 'α' : 'ες'} περιεχομένου / μήνα`,
        kind: 'monthly',
        net: input.contentPagesPerMonth * rate,
        noteEn: 'Written against real search demand',
        noteEl: 'Γραμμένες με βάση την πραγματική ζήτηση αναζήτησης',
      });
    }
  }

  if (input.auditDepth !== 'none') {
    const id = input.auditDepth === 'advanced' ? 'advanced-audit' : 'technical-audit';
    const addon = addOns.find((a) => a.id === id);
    if (addon) {
      lines.push({
        id: `audit-${input.auditDepth}`,
        labelEn: addon.nameEn,
        labelEl: addon.nameEl,
        kind: 'oneoff',
        net: addon.from,
        noteEn: 'One-off, before the retainer starts',
        noteEl: 'Εφάπαξ, πριν ξεκινήσει η μηνιαία συνεργασία',
      });
    }
  }

  if (input.maintenance) {
    const rate = addOnPrice('maintenance');
    lines.push({
      id: 'maintenance',
      labelEn: 'Website maintenance',
      labelEl: 'Συντήρηση ιστοσελίδας',
      kind: 'monthly',
      net: rate,
      noteEn: 'Updates, backups, monitoring',
      noteEl: 'Ενημερώσεις, αντίγραφα, παρακολούθηση',
    });
  }

  // ---------------------------------------------------------------- totals
  const oneOffNet = lines.filter((l) => l.kind === 'oneoff').reduce((n, l) => n + l.net, 0);
  const monthlyNet = lines.filter((l) => l.kind === 'monthly').reduce((n, l) => n + l.net, 0);
  const hasRetainer = monthlyNet > 0;

  return {
    lines,
    oneOffNet,
    monthlyNet,
    oneOffGross: withVat(oneOffNet),
    monthlyGross: withVat(monthlyNet),
    vatRate: VAT_RATE,
    oneOffLowNet: Math.round(oneOffNet * (1 - ESTIMATE_BAND)),
    oneOffHighNet: Math.round(oneOffNet * (1 + ESTIMATE_BAND)),
    minTermNet: oneOffNet + monthlyNet * SEO_MIN_TERM_MONTHS,
    minTermMonths: SEO_MIN_TERM_MONTHS,
    hasRetainer,
    offerActive: isOfferActive(now),
    savingNet: Math.max(0, listPriceOfPackages - paidPriceOfPackages),
    websiteTier,
    seoTier,
  };
}

/** Every website tier, for the UI to name what the scope resolved to. */
export const WEBSITE_TIERS = websitePackages;
export const SEO_TIERS = seoPackages;
