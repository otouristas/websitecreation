import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { Bloom, GhostButtonLink, Section } from './primitives';

/**
 * "What makes us different" - a single asymmetric split card with numbered
 * rows, ported from the Growth OS `Different` section.
 */
const REASONS = [
  {
    titleEn: 'We run on our own software',
    titleEl: 'Δουλεύουμε με το δικό μας λογισμικό',
    bodyEn: 'Our platform is Search Console-native, so decisions come from your real query data rather than a third-party estimate.',
    bodyEl: 'Η πλατφόρμα μας συνδέεται στο Search Console, οπότε οι αποφάσεις βγαίνουν από τα πραγματικά σας δεδομένα.',
  },
  {
    titleEn: 'Tourism is our proving ground',
    titleEl: 'Ο τουρισμός είναι το πεδίο μας',
    bodyEn: 'Hotels, rent-a-car and tours across the Cyclades, Crete and Athens - seasonal demand, multilingual sites, direct bookings.',
    bodyEl: 'Ξενοδοχεία, ενοικίαση αυτοκινήτου και εκδρομές σε Κυκλάδες, Κρήτη και Αθήνα, με έμφαση σε απευθείας κρατήσεις.',
  },
  {
    titleEn: 'Build and rank in one team',
    titleEl: 'Κατασκευή και SEO από μία ομάδα',
    bodyEn: 'The people writing the SEO strategy are the people building the site, so nothing gets lost in a handover.',
    bodyEl: 'Όσοι σχεδιάζουν τη στρατηγική SEO είναι όσοι φτιάχνουν την ιστοσελίδα, χωρίς κενά στην παράδοση.',
  },
  {
    titleEn: 'AI visibility, measured',
    titleEl: 'Μετρήσιμη ορατότητα σε AI',
    bodyEn: 'GEO and AEO with citation tracking and a documented method, not acronyms on a slide.',
    bodyEl: 'GEO και AEO με παρακολούθηση αναφορών και τεκμηριωμένη μέθοδο, όχι απλώς ακρωνύμια.',
  },
  {
    titleEn: 'Greek and English, natively',
    titleEl: 'Ελληνικά και αγγλικά, σωστά',
    bodyEn: 'Both locales written properly, with reciprocal hreflang - not one language machine-translated into the other.',
    bodyEl: 'Και οι δύο γλώσσες γραμμένες σωστά, με hreflang, όχι αυτόματη μετάφραση.',
  },
] as const;

export function Different({ locale = 'en' }: { locale?: SiteLocale }) {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);

  return (
    <Section id="different">
      <div className="relative overflow-hidden rounded-[10px] border border-hairline bg-surface">
        <Bloom soft className="-left-24 top-1/3 h-72 w-96" />
        <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="border-hairline p-8 lg:border-r lg:p-12">
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
              {isEl ? 'Γιατί εμείς' : 'Why us'}
            </span>
            <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-foreground md:text-5xl">
              {isEl ? (
                <>
                  Τι μας κάνει
                  <br />
                  <span className="text-primary">διαφορετικούς;</span>
                </>
              ) : (
                <>
                  What makes us
                  <br />
                  <span className="text-primary">different?</span>
                </>
              )}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {isEl
                ? 'Δεν είμαστε ούτε μόνο agency ούτε μόνο λογισμικό. Είμαστε και τα δύο, και αυτό αλλάζει τον τρόπο που δουλεύουμε.'
                : 'We are not only an agency, and not only software. We are both, and that changes how the work gets done.'}
            </p>
            <div className="mt-8">
              <GhostButtonLink href={lp('/about')}>
                {isEl ? 'Ποιοι είμαστε' : 'About us'}
              </GhostButtonLink>
            </div>
          </div>

          <div>
            {REASONS.map((r, i) => (
              <div
                key={r.titleEn}
                className={`flex gap-6 p-8 lg:p-10 ${i > 0 ? 'border-t border-hairline' : ''}`}
              >
                <span className="font-display text-sm tabular-nums text-brand/70">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-medium tracking-[-0.02em] text-foreground">
                    {isEl ? r.titleEl : r.titleEn}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {isEl ? r.bodyEl : r.bodyEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
