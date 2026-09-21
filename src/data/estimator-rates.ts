import { addOns, websitePackages, type Tier } from './pricing';

/**
 * The rate card the live estimator prices against.
 *
 * Everything with a published figure is read from `pricing.ts` rather than
 * restated here, for the same reason the price tokens exist: a number that
 * appears twice drifts. What this file adds is only what the price list does
 * not state - how many pages a tier covers before extra pages start, and how
 * much a second language costs - and those are written as named, documented
 * constants so they can be argued about and changed in one place instead of
 * hiding as literals inside a component.
 *
 * All figures are NET of Greek VAT, like every other price on the site.
 */

/** Pages a website tier covers before `extra-page` starts billing. */
export const INCLUDED_PAGES: Readonly<Record<string, number>> = {
  starter: 5,
  professional: 12,
  business: 25,
};

/**
 * A second language is not a second website: the design, build and technical
 * work are already paid for, so the additional cost is translation-ready
 * templating, hreflang wiring and the content pass. A third of the base is the
 * figure we have quoted in practice, and it is indicative - the brief moves it.
 */
export const EXTRA_LANGUAGE_SHARE = 0.35;

/**
 * The band the estimate is shown with.
 *
 * A single number implies a quote. Scope discovery routinely moves a project
 * by this much in either direction, so the UI shows the band and calls the
 * midpoint an estimate.
 */
export const ESTIMATE_BAND = 0.15;

/** Add-on lookup that fails loudly at module load if an id is renamed. */
export function addOnPrice(id: string): number {
  const found = addOns.find((a) => a.id === id);
  if (!found) throw new Error(`estimator: unknown add-on "${id}"`);
  return found.from;
}

/** The smallest website tier that can carry this scope. */
export function tierForScope(pages: number, languages: number): Tier {
  const [starter, professional, business] = websitePackages;
  if (pages > INCLUDED_PAGES.professional || languages >= 3) return business;
  if (pages > INCLUDED_PAGES.starter || languages >= 2) return professional;
  return starter;
}

/**
 * Optional website features, priced off the published add-ons where one
 * exists. `included` features carry no line of their own because every
 * package already ships them; they stay on the list so the brief records
 * what was asked for.
 */
export interface FeatureRate {
  readonly id: string;
  readonly labelEn: string;
  readonly labelEl: string;
  /** Net one-off, or null when the packages already cover it. */
  readonly net: number | null;
}

export const FEATURE_RATES: readonly FeatureRate[] = [
  { id: 'ecommerce', labelEn: 'Online shop / checkout', labelEl: 'Ηλεκτρονικό κατάστημα', net: addOnPrice('ecommerce') },
  { id: 'chatbot', labelEn: 'AI chatbot', labelEl: 'AI chatbot', net: addOnPrice('chatbot') },
  { id: 'logo', labelEn: 'Logo and brand basics', labelEl: 'Λογότυπο και βασικά brand', net: addOnPrice('logo') },
  { id: 'booking', labelEn: 'Booking / scheduling', labelEl: 'Κρατήσεις / ραντεβού', net: 450 },
  { id: 'members', labelEn: 'Member login area', labelEl: 'Περιοχή μελών', net: 400 },
  { id: 'blog', labelEn: 'Blog', labelEl: 'Ιστολόγιο', net: null },
  { id: 'contact-form', labelEn: 'Contact form', labelEl: 'Φόρμα επικοινωνίας', net: null },
  { id: 'gallery', labelEn: 'Gallery / portfolio', labelEl: 'Γκαλερί / portfolio', net: null },
];

export function featureRate(id: string): FeatureRate | undefined {
  return FEATURE_RATES.find((f) => f.id === id);
}
