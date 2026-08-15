import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { MeshGrid, Section, SectionHeading } from './primitives';

/**
 * Capability grid, rendered as a hairline mesh: the 1px grid gaps expose the
 * hairline background so cells are divided by rules rather than boxed in cards.
 *
 * The eight cells map to the service clusters in `docs/keyword-research/`.
 */
const FEATURES = [
  {
    href: '/services/local-seo',
    eyebrowEn: 'Organic', eyebrowEl: 'Οργανικά',
    titleEn: 'SEO services', titleEl: 'Υπηρεσίες SEO',
    bodyEn: 'Technical foundations, content and internal linking built around the queries that actually convert.',
    bodyEl: 'Τεχνικά θεμέλια, περιεχόμενο και εσωτερική διασύνδεση γύρω από τους όρους που φέρνουν πελάτες.',
  },
  {
    href: '/services/seo-audits',
    eyebrowEn: 'Diagnosis', eyebrowEl: 'Διάγνωση',
    titleEn: 'SEO audit', titleEl: 'Τεχνικός έλεγχος SEO',
    bodyEn: 'A full crawl, Search Console analysis and a prioritised fix list you can hand to any developer.',
    bodyEl: 'Πλήρης ανάλυση, δεδομένα Search Console και λίστα διορθώσεων με σειρά προτεραιότητας.',
  },
  {
    href: '/services/local-seo',
    eyebrowEn: 'Local', eyebrowEl: 'Τοπικά',
    titleEn: 'Local SEO', titleEl: 'Τοπικό SEO',
    bodyEn: 'Google Business Profile, local landing pages and the map pack for your city or island.',
    bodyEl: 'Google Business Profile, τοπικές σελίδες και χάρτης Google για την πόλη ή το νησί σας.',
  },
  {
    href: '/services/ai-visibility',
    eyebrowEn: 'AI search', eyebrowEl: 'Αναζήτηση με AI',
    titleEn: 'GEO & AEO', titleEl: 'GEO & AEO',
    bodyEn: 'Get cited in ChatGPT, Perplexity, Gemini and AI Overviews, then track it month over month.',
    bodyEl: 'Αναφορές σε ChatGPT, Perplexity, Gemini και AI Overviews, με παρακολούθηση κάθε μήνα.',
  },
  {
    href: '/services/website-creation',
    eyebrowEn: 'Build', eyebrowEl: 'Κατασκευή',
    titleEn: 'Website design', titleEl: 'Κατασκευή ιστοσελίδων',
    bodyEn: 'Fast, mobile-first sites with the SEO architecture in place before a single word is written.',
    bodyEl: 'Γρήγορες ιστοσελίδες, mobile-first, με αρχιτεκτονική SEO από την πρώτη μέρα.',
  },
  {
    href: '/services/eshop-woocommerce',
    eyebrowEn: 'Commerce', eyebrowEl: 'E-commerce',
    titleEn: 'E-shop development', titleEl: 'Κατασκευή e-shop',
    bodyEn: 'WooCommerce stores with product schema, clean category structure and a checkout that converts.',
    bodyEl: 'WooCommerce καταστήματα με schema προϊόντων, καθαρή δομή κατηγοριών και checkout που πουλά.',
  },
  {
    href: '/services/content-creation',
    eyebrowEn: 'Content', eyebrowEl: 'Περιεχόμενο',
    titleEn: 'Content & topical hubs', titleEl: 'Περιεχόμενο & θεματικοί κόμβοι',
    bodyEn: 'Answer-first articles clustered into hubs, so one page can rank for a whole family of queries.',
    bodyEl: 'Άρθρα με άμεση απάντηση, οργανωμένα σε κόμβους ώστε μία σελίδα να καλύπτει πολλές αναζητήσεις.',
  },
  {
    href: '/services/link-building',
    eyebrowEn: 'Authority', eyebrowEl: 'Κύρος',
    titleEn: 'Digital PR & links', titleEl: 'Digital PR & backlinks',
    bodyEn: 'Editorial mentions and relevant links, earned rather than bought, with every placement documented.',
    bodyEl: 'Αναφορές και σχετικά backlinks που κερδίζονται, όχι που αγοράζονται, με πλήρη τεκμηρίωση.',
  },
] as const;

export function HomeOfferGrid({ locale = 'en' }: { locale?: SiteLocale }) {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);

  return (
    <Section id="features">
      <SectionHeading
        eyebrow={isEl ? 'Τι κάνουμε' : 'What we do'}
        title={
          isEl ? (
            <>
              Ό,τι χρειάζεται για να <span className="text-primary">σας βρίσκουν</span>
            </>
          ) : (
            <>
              Everything it takes to <span className="text-primary">get found</span>
            </>
          )
        }
        body={
          isEl
            ? 'Μία ομάδα για κατασκευή, SEO και ορατότητα σε AI. Χωρίς να συντονίζετε τρεις διαφορετικούς συνεργάτες.'
            : 'One team for the build, the SEO and the AI visibility. No coordinating three separate suppliers.'
        }
      />

      <MeshGrid className="mt-14 md:grid-cols-2">
        {FEATURES.map((f) => (
          <Link
            key={f.titleEn}
            href={lp(f.href)}
            className="group bg-surface p-7 transition-colors hover:bg-surface-raised"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
                {isEl ? f.eyebrowEl : f.eyebrowEn}
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                aria-hidden
              />
            </div>
            <h3 className="mt-4 font-display text-xl font-medium tracking-[-0.02em] text-foreground">
              {isEl ? f.titleEl : f.titleEn}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {isEl ? f.bodyEl : f.bodyEn}
            </p>
          </Link>
        ))}
      </MeshGrid>
    </Section>
  );
}
