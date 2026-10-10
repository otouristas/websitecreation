import type { SiteLocale } from '@/lib/i18n/locale';
import { getIndustryBySlug } from '@/data/industries';
import { industriesEl } from '@/data/industries-i18n';
import { fitDescription } from '@/lib/seo/description';

export interface LocalizedIndustry {
  slug: string;
  name: string;
  description: string;
  metaDescription: string;
  painPoints: string[];
  icon: string;
  /**
   * Accusative form for Greek. Anything rendered after "για" must use this:
   * "για Δικηγόροι" is ungrammatical, "για Δικηγόρους" is correct. Equals
   * `name` for English and for Greek nouns whose cases coincide.
   */
  nameFor: string;
}

export function getLocalizedIndustry(slug: string, locale: SiteLocale): LocalizedIndustry | undefined {
  const base = getIndustryBySlug(slug);
  if (!base) return undefined;
  if (locale === 'en') return { ...base, nameFor: base.name };
  const el = industriesEl[slug];
  if (!el) return { ...base, nameFor: base.name };
  return {
    ...base,
    name: el.name,
    /** Accusative: everything rendered after "για" must use this, not `name`. */
    nameFor: el.nameAccusative ?? el.name,
    description: el.description,
    metaDescription: el.metaDescription,
    painPoints: el.painPoints,
  };
}

/**
 * `exact: true` ships the title verbatim (no 43-char cut, no brand suffix).
 * Used for the Greek keyword map's titles, which are already sized to ≤60.
 */
type IndustryMeta = { title: string; description: string; exact?: boolean };

const EN_INDUSTRY_META: Record<string, IndustryMeta> = {
  hotels: {
    title: 'Hotel Website Design & SEO Agency',
    description:
      'Hotel website design with direct booking CTAs, room galleries, mobile speed and tourism SEO. Built to win direct bookings back from OTAs. Request a quote.',
  },
  'rent-a-car': {
    title: 'Rent-a-Car Website Design & SEO',
    description:
      'Car rental website design with fleet catalogs, booking funnels, mobile speed and local SEO for airports and islands. Request a free quote for your fleet.',
  },
  doctors: {
    title: 'SEO for Doctors & Medical Practices',
    description:
      'SEO for doctors and medical practices: local search, Google Business Profile, specialty pages, online booking and GDPR-aware forms. Request a free audit.',
  },
  'tour-operators': {
    title: 'Tour Operator Website Design & SEO',
    description:
      'Tour operator websites with excursion catalogs, booking funnels, mobile UX and destination SEO for Google and AI search visibility. Request a free quote.',
  },
};

const EL_INDUSTRY_META: Record<string, IndustryMeta> = {
  hotels: {
    title: 'Κατασκευή Ιστοσελίδας Ξενοδοχείου με Κρατήσεις & SEO',
    description:
      'Κατασκευή ιστοσελίδας ξενοδοχείου με μηχανή κρατήσεων, πολύγλωσσο περιεχόμενο και SEO για τον προορισμό σας, για περισσότερες άμεσες κρατήσεις.',
    exact: true,
  },
  'rent-a-car': {
    title: 'Κατασκευή Ιστοσελίδας Rent a Car με Online Κρατήσεις',
    description:
      'Ιστοσελίδα rent a car με στόλο, τιμές ανά εποχή και online κρατήσεις, στημένη για αναζητήσεις ανά νησί, λιμάνι και αεροδρόμιο.',
    exact: true,
  },
  'real-estate': {
    title: 'Κατασκευή Ιστοσελίδας για Μεσιτικά Γραφεία & SEO',
    description:
      'Ιστοσελίδες για μεσιτικά γραφεία με καταχώρηση ακινήτων, φίλτρα και σελίδες περιοχών, στημένες για τοπικό SEO ώστε να σας βρίσκουν αγοραστές.',
    exact: true,
  },
  doctors: {
    title: 'Ιατρικό SEO: SEO για Γιατρούς & Ιατρεία',
    description:
      'Ιατρικό SEO για γιατρούς και ιατρεία: τοπικό SEO, Google Business Profile, σελίδες ειδικοτήτων, online ραντεβού και φόρμες σύμφωνες με τον GDPR.',
    exact: true,
  },
  'tour-operators': {
    title: 'Tour Operators - Ιστοσελίδες & SEO',
    description:
      'Ιστοσελίδες για τουριστικά γραφεία και tour operators με καταλόγους εκδρομών, online κρατήσεις και SEO προορισμού για Google και AI search. Ζητήστε προσφορά.',
  },
  'plastic-surgeons': {
    title: 'Πλαστικοί Χειρουργοί - Ιστοσελίδες & SEO',
    description:
      'Κατασκευή ιστοσελίδων για πλαστικούς χειρουργούς με έμφαση στην εμπιστοσύνη ασθενών, αποτελέσματα πριν και μετά και ιατρικό SEO. Ζητήστε δωρεάν προσφορά.',
  },
  'financial-advisors': {
    title: 'Οικονομικοί Σύμβουλοι - Ιστοσελίδες & SEO',
    description:
      'Κατασκευή ιστοσελίδων για οικονομικούς συμβούλους και γραφεία με έμφαση στην αξιοπιστία, συμμόρφωση και τοπικό SEO. Ζητήστε δωρεάν προσφορά.',
  },
};

export function getIndustryMeta(industry: LocalizedIndustry, locale: SiteLocale): IndustryMeta {
  if (locale === 'en') {
    const override = EN_INDUSTRY_META[industry.slug];
    if (override) return override;

    const baseDesc = industry.metaDescription || `${industry.name} website design and SEO services.`;
    const composed = fitDescription(baseDesc, [
      'Built for search rankings, mobile conversion and direct customer leads. Request a free quote.',
      'Built for mobile conversion, search visibility and direct leads. Request a free quote.',
      'Built for mobile conversion and direct customer leads. Request a quote.',
      'Built for local search and direct customer leads. Request a free quote.',
      'Built for local SEO and direct customer leads. Request a free quote.',
      'Built for local search visibility and direct leads. Request a quote.',
      'Built for local SEO and direct leads. Request a free quote.',
      'Built for local search and direct leads. Request a quote.',
      'Built for direct customer leads. Request a free quote.',
      'Built for direct leads. Request a free quote today.',
      'Built for direct leads. Request a free quote.',
      'Request a free quote from our team today.',
      'Request a free quote for your business.',
      'Request a free quote from our team.',
      'Request a free quote today.',
    ]);
    return {
      title: `${industry.name} Website Design & SEO`,
      description: composed,
    };
  }

  const elOverride = EL_INDUSTRY_META[industry.slug];
  if (elOverride) return elOverride;

  const enBase = getIndustryBySlug(industry.slug)?.metaDescription ?? '';
  const elBase = industry.metaDescription || enBase || `Ιστοσελίδες και SEO για ${industry.name}.`;

  const composedEl = fitDescription(elBase, [
    'Σχεδιασμός για μετατροπές, τοπική ορατότητα και μετρήσιμα leads. Ζητήστε προσφορά.',
    'Σχεδιασμός για μετατροπές, τοπική ορατότητα και leads. Ζητήστε δωρεάν προσφορά.',
    'Σχεδιασμός για τοπική ορατότητα και μετρήσιμα leads. Ζητήστε δωρεάν προσφορά.',
    'Σχεδιασμός για τοπική ορατότητα και μετρήσιμα leads. Ζητήστε προσφορά.',
    'Σχεδιασμός για μετατροπές και μετρήσιμα leads. Ζητήστε δωρεάν προσφορά.',
    'Σχεδιασμός για μετατροπές και μετρήσιμα leads. Ζητήστε προσφορά.',
    'Σχεδιασμός για μετατροπές και τοπικά leads. Ζητήστε προσφορά.',
    'Σχεδιασμός για μετρήσιμα αποτελέσματα. Ζητήστε δωρεάν προσφορά.',
    'Σχεδιασμός για μετρήσιμα αποτελέσματα. Ζητήστε προσφορά.',
    'Σχεδιασμός για μετρήσιμα leads. Ζητήστε δωρεάν προσφορά.',
    'Σχεδιασμός για μετρήσιμα leads. Ζητήστε προσφορά.',
    'Ζητήστε δωρεάν προσφορά από την ομάδα μας σήμερα.',
    'Ζητήστε δωρεάν προσφορά για την επιχείρησή σας.',
    'Ζητήστε δωρεάν προσφορά από την ομάδα μας.',
    'Ζητήστε δωρεάν προσφορά σήμερα.',
  ]);
  return {
    title: `${industry.name} - Ιστοσελίδες & SEO`,
    description: composedEl,
  };
}
