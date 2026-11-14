import type { SiteLocale } from '@/lib/i18n/locale';

/**
 * Editorial metadata for the blog's pillar hubs.
 *
 * The `pillar` frontmatter field already grouped posts, but nothing surfaced
 * it: hubs never linked down to their spokes and spokes never linked up. These
 * entries turn each pillar into a real, indexable hub page.
 */
interface PillarCopy {
  readonly title: string;
  /** Page <title> when `title` alone is too short to describe the hub. */
  readonly seoTitle?: string;
  readonly heading: string;
  readonly intro: string;
}

export interface PillarMeta {
  readonly slug: string;
  readonly en: PillarCopy;
  readonly el: PillarCopy;
}

export const BLOG_PILLARS: readonly PillarMeta[] = [
  {
    slug: 'agency-playbooks',
    en: {
      title: 'Agency Playbooks',
      heading: 'Agency playbooks',
      intro:
        'Agree on what your fee covers, who will make the edits and how to report a month when results are mixed.',
    },
    el: {
      title: 'Οδηγοί για εταιρείες SEO',
      heading: 'Οδηγοί για εταιρείες SEO',
      intro:
        'Δείτε πώς να συμφωνήσετε με τον πελάτη τι καλύπτει η αμοιβή σας, ποιος εφαρμόζει τις αλλαγές και τι θα περιλαμβάνει κάθε μηνιαία αναφορά.',
    },
  },
  {
    slug: 'local-seo',
    en: {
      title: 'Local SEO',
      seoTitle: 'Local SEO guides & Google Business Profile',
      heading: 'Local SEO',
      intro:
        'Help people nearby find your opening hours, directions and services on Google. Start with your business listing, reviews and the areas you actually serve.',
    },
    el: {
      title: 'Τοπικό SEO',
      seoTitle: 'Οδηγοί τοπικού SEO και Google Maps',
      heading: 'Τοπικό SEO',
      intro:
        'Βοηθήστε τους πελάτες της περιοχής σας να βρουν το ωράριο, τη διεύθυνση και τις υπηρεσίες σας στην Google. Ξεκινήστε από την καταχώρισή σας στον χάρτη και τις περιοχές που εξυπηρετείτε.',
    },
  },
  {
    slug: 'industry-playbooks',
    en: {
      title: 'Industry Playbooks',
      heading: 'Industry playbooks',
      intro:
        'Choose your industry to see how search leads to a reservation, appointment or enquiry. A hotel room page has a different job from a law firm’s service page.',
    },
    el: {
      title: 'Οδηγοί ανά κλάδο',
      heading: 'Οδηγοί ανά κλάδο',
      intro:
        'Επιλέξτε τον κλάδο σας για να δείτε πώς η αναζήτηση συνδέεται με μια κράτηση, ένα ραντεβού ή ένα αίτημα προσφοράς.',
    },
  },
  {
    slug: 'technical-seo-in-house',
    en: {
      title: 'Technical SEO',
      seoTitle: 'Technical SEO guides for in-house teams',
      heading: 'Technical SEO for in-house teams',
      intro:
        'Check why a page is missing from Google, what slows it down and which URLs need redirects before a redesign.',
    },
    el: {
      title: 'Τεχνικό SEO',
      seoTitle: 'Οδηγοί τεχνικού SEO για εσωτερικές ομάδες SEO',
      heading: 'Τεχνικό SEO για εσωτερικές ομάδες SEO',
      intro:
        'Ελέγξτε γιατί μια σελίδα λείπει από την Google, τι την καθυστερεί στο κινητό και ποιες διευθύνσεις χρειάζονται ανακατεύθυνση σε έναν ανασχεδιασμό.',
    },
  },
  {
    slug: 'search-console-mastery',
    en: {
      title: 'Search Console Mastery',
      heading: 'Search Console mastery',
      intro:
        'Find the page behind a drop in clicks, the searches it appears for and the period that makes a fair comparison.',
    },
    el: {
      title: 'Google Search Console',
      heading: 'Μάθετε το Search Console',
      intro:
        'Βρείτε ποια σελίδα έχασε κλικ, για ποιες αναζητήσεις εμφανίζεται και με ποια περίοδο έχει νόημα να συγκρίνετε τα στοιχεία της.',
    },
  },
  {
    slug: 'ai-llm-visibility',
    en: {
      title: 'AI & LLM Visibility',
      heading: 'AI and LLM visibility',
      intro:
        'Check how ChatGPT, Perplexity, Gemini and Google AI Overviews answer a customer’s question. Record the wording and the sources so you can compare later.',
    },
    el: {
      title: 'Ορατότητα σε AI',
      heading: 'Ορατότητα σε AI και LLM',
      intro:
        'Ελέγξτε πώς απαντούν το ChatGPT, το Perplexity, το Gemini και τα AI Overviews σε μια ερώτηση πελάτη. Κρατήστε την απάντηση και τις πηγές της για να συγκρίνετε τι αλλάζει.',
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
