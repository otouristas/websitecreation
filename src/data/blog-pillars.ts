import type { SiteLocale } from '@/lib/i18n/locale';

/**
 * Editorial metadata for the blog's pillar hubs.
 *
 * The `pillar` frontmatter field already grouped posts, but nothing surfaced
 * it: hubs never linked down to their spokes and spokes never linked up. These
 * entries turn each pillar into a real, indexable hub page.
 */
export interface PillarMeta {
  readonly slug: string;
  readonly en: { title: string; heading: string; intro: string };
  readonly el: { title: string; heading: string; intro: string };
}

export const BLOG_PILLARS: readonly PillarMeta[] = [
  {
    slug: 'agency-playbooks',
    en: {
      title: 'Agency Playbooks',
      heading: 'Agency playbooks',
      intro:
        'How SEO retainers actually get delivered: scoping, reporting that clients read, pricing, and knowing when to walk away from a project.',
    },
    el: {
      title: 'Οδηγοί για Agencies',
      heading: 'Οδηγοί για agencies',
      intro:
        'Πώς παραδίδεται στην πράξη μια συνεργασία SEO: εύρος έργου, αναφορές που διαβάζονται, τιμολόγηση και πότε να πείτε όχι σε ένα project.',
    },
  },
  {
    slug: 'industry-playbooks',
    en: {
      title: 'Industry Playbooks',
      heading: 'Industry playbooks',
      intro:
        'Vertical-specific SEO: hotels, rent-a-car, restaurants, clinics and law firms. What ranks in each, and what the generic advice gets wrong.',
    },
    el: {
      title: 'Οδηγοί ανά Κλάδο',
      heading: 'Οδηγοί ανά κλάδο',
      intro:
        'SEO ανά κατηγορία: ξενοδοχεία, ενοικίαση αυτοκινήτου, εστιατόρια, ιατρεία και δικηγορικά γραφεία. Τι αποδίδει σε κάθε κλάδο στην πράξη.',
    },
  },
  {
    slug: 'technical-seo-in-house',
    en: {
      title: 'Technical SEO',
      heading: 'Technical SEO for in-house teams',
      intro:
        'Crawling, indexing, Core Web Vitals, hosting and migrations. The technical groundwork that has to be right before content can work.',
    },
    el: {
      title: 'Τεχνικό SEO',
      heading: 'Τεχνικό SEO για in-house ομάδες',
      intro:
        'Ευρετηρίαση, Core Web Vitals, hosting και μεταπτώσεις. Τα τεχνικά θεμέλια που πρέπει να είναι σωστά πριν αποδώσει το περιεχόμενο.',
    },
  },
  {
    slug: 'search-console-mastery',
    en: {
      title: 'Search Console Mastery',
      heading: 'Search Console mastery',
      intro:
        'Reading Google Search Console properly: striking-distance queries, cannibalisation, index coverage and turning impressions into clicks.',
    },
    el: {
      title: 'Google Search Console',
      heading: 'Μάθετε το Search Console',
      intro:
        'Πώς διαβάζεται σωστά το Google Search Console: όροι σε απόσταση βολής, αλληλοεπικάλυψη σελίδων και πώς οι εμφανίσεις γίνονται κλικ.',
    },
  },
  {
    slug: 'ai-llm-visibility',
    en: {
      title: 'AI & LLM Visibility',
      heading: 'AI and LLM visibility',
      intro:
        'GEO and AEO in practice: getting cited by ChatGPT, Perplexity, Gemini and AI Overviews, and measuring it without inventing scores.',
    },
    el: {
      title: 'Ορατότητα σε AI',
      heading: 'Ορατότητα σε AI και LLM',
      intro:
        'GEO και AEO στην πράξη: πώς σας αναφέρουν ChatGPT, Perplexity, Gemini και AI Overviews, και πώς μετριέται χωρίς πλασματικά σκορ.',
    },
  },
];

export function getPillarMeta(slug: string): PillarMeta | undefined {
  return BLOG_PILLARS.find((p) => p.slug === slug);
}

export function getPillarCopy(slug: string, locale: SiteLocale) {
  const meta = getPillarMeta(slug);
  if (!meta) return undefined;
  return locale === 'el' ? meta.el : meta.en;
}
