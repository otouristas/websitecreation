/** One Greek place page under /el/seo. Shared pricing and process are not stored here. */

export type PlaceRegionId =
  | 'attica'
  | 'macedonia'
  | 'peloponnese'
  | 'crete'
  | 'cyclades'
  | 'dodecanese'
  | 'ionian';

export type AreaServedType = 'City' | 'AdministrativeArea';

export interface PlaceSection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
}

export interface PlaceFaq {
  readonly question: string;
  readonly answer: string;
}

export interface PlaceLink {
  readonly label: string;
  readonly href: string;
}

export interface PlacePageData {
  /** URL segment: /el/seo/<slug> */
  readonly slug: string;
  /** Old service × city location segment, used only for 301s. */
  readonly legacySlug: string;
  /** Nominative, as in the title: «SEO Αθήνα». */
  readonly name: string;
  /** Locative phrase: «στην Αθήνα», «στον Πειραιά». */
  readonly locative: string;
  readonly title: string;
  readonly description: string;
  readonly h1: string;
  /** Suffix of h1 set in the serif accent. */
  readonly h1Accent: string;
  readonly region: PlaceRegionId;
  readonly areaServedType: AreaServedType;
  /** One sentence on the hub card. Not counted toward the place-page word minimum. */
  readonly blurb: string;
  readonly lead: string;
  readonly sections: readonly PlaceSection[];
  readonly areas: readonly string[];
  readonly faqs: readonly PlaceFaq[];
  /** Two or three neighbouring place pages, or the live Rethymno URL. */
  readonly nearby: readonly PlaceLink[];
  /** Slugs from src/data/portfolio.ts. Empty when the catalogue has no local project. */
  readonly workSlugs: readonly string[];
}

export const PLACE_REGION_LABEL: Record<PlaceRegionId, string> = {
  attica: 'Αττική',
  macedonia: 'Μακεδονία',
  peloponnese: 'Πελοπόννησος',
  crete: 'Κρήτη',
  cyclades: 'Κυκλάδες',
  dodecanese: 'Δωδεκάνησα',
  ionian: 'Ιόνια νησιά',
};

export const PLACE_REGION_ORDER: readonly PlaceRegionId[] = [
  'attica',
  'macedonia',
  'peloponnese',
  'crete',
  'cyclades',
  'dodecanese',
  'ionian',
];

export const H1_ACCENT = 'προώθηση ιστοσελίδων';

export function placeTitle(name: string): string {
  return `SEO ${name}: Υπηρεσίες SEO & Προώθηση Ιστοσελίδων`;
}

export function placeH1(locative: string): string {
  return `SEO ${locative}: υπηρεσίες SEO και ${H1_ACCENT}`;
}
