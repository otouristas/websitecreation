/**
 * The ranking-guide cluster.
 *
 * English slugs are canonical. A Greek slug is set when the counterpart is a
 * real article that is not declared with `translationOf` (strategy, links,
 * Maps). The hub skips any slug whose file is not in `content/blog` yet, so
 * guides added later show up without a second edit to the page.
 */
export const SEO_GUIDES_PATH = '/seo-guides';

export interface SeoGuideRef {
  readonly id: string;
  readonly en?: string;
  readonly el?: string;
}

export interface SeoGuideGroup {
  readonly id: string;
  readonly titleEn: string;
  readonly titleEl: string;
  readonly refs: readonly SeoGuideRef[];
}

/**
 * First live post wins. `how-to-rank-higher-on-google` is the ranking pillar;
 * until that file exists, the live SEO pillar is What is SEO / the Greek
 * beginners guide.
 */
export const SEO_GUIDE_PILLARS: readonly SeoGuideRef[] = [
  { id: 'rank-higher', en: 'how-to-rank-higher-on-google' },
  { id: 'what-is-seo', en: 'what-is-seo', el: 'seo-gia-arxarious' },
];

export const SEO_GUIDE_GROUPS: readonly SeoGuideGroup[] = [
  {
    id: 'foundations',
    titleEn: 'Start here',
    titleEl: 'Ξεκινήστε από εδώ',
    refs: [
      { id: 'beginners', en: 'seo-for-beginners', el: 'seo-gia-arxarious' },
      { id: 'what-is-seo', en: 'what-is-seo', el: 'seo-gia-arxarious' },
      { id: 'strategies', en: 'seo-strategies', el: 'seo-stratigiki-mikres-epicheiriseis' },
      { id: 'organic-traffic', en: 'how-to-increase-organic-traffic' },
    ],
  },
  {
    id: 'on-page',
    titleEn: 'On-page and technical SEO',
    titleEl: 'On-page και τεχνικό SEO',
    refs: [
      { id: 'on-page', en: 'on-page-seo', el: 'on-page-seo-el' },
      { id: 'content', en: 'seo-content-guide' },
      { id: 'keywords', en: 'keyword-research-guide', el: 'lexeis-kleidia-seo' },
      { id: 'clustering', en: 'semantic-keyword-clustering' },
      { id: 'technical', en: 'technical-seo-guide', el: 'techniko-seo' },
      { id: 'checklist', en: 'seo-checklist' },
      { id: 'ranking-factors', en: 'google-ranking-factors' },
    ],
  },
  {
    id: 'authority',
    titleEn: 'Links and local SEO',
    titleEl: 'Backlinks και τοπικό SEO',
    refs: [
      { id: 'off-page', en: 'off-page-seo' },
      { id: 'links', en: 'link-building-guide', el: 'ti-einai-ta-backlinks' },
      { id: 'local', en: 'local-seo-guide' },
      { id: 'gbp', en: 'google-business-profile-masterclass' },
      { id: 'maps', el: 'epixeirisi-sto-google-maps' },
    ],
  },
];

/** Topic hubs that hold this cluster, plus the wider articles around them. */
export const SEO_GUIDE_TOPIC_PILLARS = [
  'agency-playbooks',
  'technical-seo-in-house',
  'local-seo',
  'search-console-mastery',
] as const;

export const SEO_GUIDES_COPY = {
  en: {
    title: 'SEO guides',
    seoTitle: 'SEO guides: rankings, on-page, technical',
    description:
      'SEO guides in one index: the main ranking guide, then keywords, on-page, technical SEO, links and local search. Start with the guide that matches the job.',
    heading: 'SEO guides',
    intro:
      'Working on a page that has slipped in Google? Start with the guide to rankings. If you already know the issue, go straight to keywords, technical SEO or local search.',
    pillarEyebrow: 'Main guide',
    pillarTitle: 'Start with the main guide',
    topicsEyebrow: 'Topic hubs',
    topicsTitle: 'The same guides, grouped by topic',
    topicsBody:
      'Explore related articles on Google Maps, Search Console and the technical issues that can affect your pages.',
    servicesLead: 'When you want the work done for you, see',
    servicesLabel: 'SEO services',
    pricingLabel: 'pricing',
    blogLabel: 'All articles',
  },
  el: {
    title: 'Οδηγοί SEO',
    seoTitle: 'Οδηγοί SEO: κατάταξη, on-page, τεχνικό',
    description:
      'Ένας κόμβος για τους οδηγούς SEO. Ξεκινήστε από τον βασικό οδηγό και συνεχίστε σε λέξεις-κλειδιά, on-page, τεχνικό SEO, backlinks και τοπικό SEO.',
    heading: 'Οδηγοί SEO',
    intro:
      'Έπεσε μια σελίδα σας στη Google; Ξεκινήστε από τον οδηγό για την κατάταξη. Αν ξέρετε ήδη τι θέλετε να ελέγξετε, περάστε κατευθείαν στις λέξεις-κλειδιά, στο τεχνικό SEO ή στην τοπική αναζήτηση.',
    pillarEyebrow: 'Βασικός οδηγός',
    pillarTitle: 'Ξεκινήστε από τον βασικό οδηγό',
    topicsEyebrow: 'Θεματικοί κόμβοι',
    topicsTitle: 'Οι ίδιοι οδηγοί, ανά θέμα',
    topicsBody:
      'Βρείτε περισσότερα άρθρα για το Google Maps, το Search Console και τα τεχνικά θέματα που επηρεάζουν τις σελίδες σας.',
    servicesLead: 'Αν θέλετε να το αναλάβουμε εμείς, δείτε τις',
    servicesLabel: 'υπηρεσίες SEO',
    pricingLabel: 'τιμές',
    blogLabel: 'Όλα τα άρθρα',
  },
} as const;

export function allSeoGuideRefs(): readonly SeoGuideRef[] {
  return [...SEO_GUIDE_PILLARS, ...SEO_GUIDE_GROUPS.flatMap((group) => group.refs)];
}
