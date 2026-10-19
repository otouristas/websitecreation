/**
 * Greek-only commercial pages under /el/seo-tourismou: one page per tourism
 * vertical («Υπηρεσίες SEO για ξενοδοχεία», rent a car, βίλες...), plus the hub.
 *
 * Each page owns exactly one primary keyword. The informational guides stay on
 * the blog and the website-design pages stay on /el/solutions; both link here
 * for the service intent and this page links back to them.
 *
 * Regions are not separate URLs. A vertical × city page would repeat the same
 * offer with a town name swapped in, which is a doorway page. Each vertical
 * instead says, in a sentence per region, what actually changes there, and
 * links to the existing /el/seo/<place> page for that place.
 */

export interface TourismSection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
}

export interface TourismFaq {
  readonly question: string;
  readonly answer: string;
}

export interface TourismRegion {
  readonly label: string;
  /** An existing /el/seo/<place> page or a Greek guide. */
  readonly href: string;
  /** What changes for this vertical in this region. Unique per vertical. */
  readonly note: string;
}

export interface TourismCard {
  readonly title: string;
  readonly body: string;
}

export interface TourismLink {
  readonly href: string;
  readonly title: string;
  readonly body: string;
}

export interface TourismVertical {
  /** URL segment: /el/seo-tourismou/<slug> */
  readonly slug: string;
  /** Short name for cards and breadcrumbs: «Ξενοδοχεία». */
  readonly name: string;
  /** The one query this URL owns. */
  readonly primaryKeyword: string;
  /** SERP title, shipped verbatim (≤ 60 chars, Title Case). */
  readonly title: string;
  readonly description: string;
  readonly h1: string;
  /** Suffix of h1 set in the serif accent. */
  readonly h1Accent: string;
  /** One sentence on the hub card. */
  readonly blurb: string;
  readonly lead: string;
  readonly sections: readonly TourismSection[];
  /** Real search patterns the work targets, shown as chips. */
  readonly searches: readonly string[];
  readonly deliverables: readonly TourismCard[];
  readonly regions: readonly TourismRegion[];
  readonly faqs: readonly TourismFaq[];
  /** Guide, website-design hub and neighbouring service. Locale-prefixed paths. */
  readonly related: readonly TourismLink[];
  /** Slugs from src/data/portfolio.ts. */
  readonly workSlugs: readonly string[];
  /** Closest English page, for the header language switch. */
  readonly enAlternate: string;
  /** schema.org serviceType. */
  readonly serviceType: string;
}
