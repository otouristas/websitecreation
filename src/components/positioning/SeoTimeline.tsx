import type { SiteLocale } from '@/lib/i18n/locale';
import { Section, SectionHeading } from '@/components/landing/primitives';

/**
 * SEO expectation setting.
 *
 * Deliberately phrased as indicative phases, never as a promise. This replaces
 * copy that stated "results in 2-3 months" as though it were a commitment.
 * Website *production* timelines are a separate thing and live on the pricing
 * cards - the two must never be presented as the same clock.
 */
export function SeoTimeline({ locale = 'en' }: { locale?: SiteLocale }) {
  const isEl = locale === 'el';

  const phases = isEl
    ? [
        {
          range: '0 - 3 μήνες',
          title: 'Θεμέλια',
          body: 'Τεχνικές διορθώσεις, ευρετηρίαση, αρχιτεκτονική, αντιστοίχιση λέξεων-κλειδιών και βελτίωση περιεχομένου. Εδώ φαίνονται τα πρώτα σήματα ορατότητας, όχι τα τελικά αποτελέσματα.',
        },
        {
          range: '3 - 6 μήνες',
          title: 'Ανάπτυξη',
          body: 'Πιθανή αύξηση σε σχετικές εμφανίσεις, κατατάξεις και ποιοτική οργανική επισκεψιμότητα, ανάλογα με τον ανταγωνισμό και το σημείο εκκίνησης.',
        },
        {
          range: '6 - 12+ μήνες',
          title: 'Σύνθετη απόδοση',
          body: 'Η οργανική ανάπτυξη συσσωρεύεται: μεγαλύτερο αποτύπωμα περιεχομένου, ισχυρότερο authority και σταθερότερη εμπορική ορατότητα.',
        },
      ]
    : [
        {
          range: '0 - 3 months',
          title: 'Foundations',
          body: 'Technical fixes, indexing, architecture, keyword mapping and content improvements. This is where early visibility signals appear, not final results.',
        },
        {
          range: '3 - 6 months',
          title: 'Growth',
          body: 'Potential growth in relevant impressions, rankings and qualified organic traffic, depending on competition and your starting point.',
        },
        {
          range: '6 - 12+ months',
          title: 'Compounding',
          body: 'Organic growth compounds: a larger content footprint, stronger authority and steadier commercial visibility.',
        },
      ];

  return (
    <Section id="timeline">
      <SectionHeading
        align="left"
        eyebrow={isEl ? 'Χρονοδιάγραμμα' : 'Timeline'}
        title={isEl ? 'Σε πόσο καιρό φέρνει αποτελέσματα το SEO;' : 'How long does SEO take?'}
        body={
          isEl
            ? 'Το SEO είναι μακροπρόθεσμη διαδικασία. Ο χρόνος που απαιτείται εξαρτάται από τον ανταγωνισμό, την υπάρχουσα κατάσταση του site, το authority, το περιεχόμενο και την ταχύτητα υλοποίησης.'
            : 'SEO is cumulative. The time required depends on competition, the technical condition of the site, authority, content quality and how quickly recommendations get implemented.'
        }
        className="mb-10"
      />

      <ol className="grid gap-4 md:grid-cols-3">
        {phases.map((p, i) => (
          <li key={p.range} className="reveal flex flex-col rounded-2xl border border-hairline bg-surface/60 p-6 sm:p-7">
            <span className="flex items-center justify-between gap-3">
              <span className="font-mono text-[12px] font-medium text-brand">0{i + 1}</span>
              <span className="rounded-full border border-hairline bg-background px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">{p.range}</span>
            </span>
            <p className="mt-4 text-[17px] font-semibold tracking-[-0.01em] text-foreground">
              {p.title}
            </p>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{p.body}</p>
          </li>
        ))}
      </ol>

      <p className="mt-6 text-sm text-muted-foreground">
        <strong className="font-medium text-foreground">
          {isEl ? 'Ενδεικτικές φάσεις, όχι εγγυημένα χρονοδιαγράμματα.' : 'These are indicative phases, not guaranteed timelines.'}
        </strong>{' '}
        {isEl
          ? 'Κανένα agency δεν ελέγχει τον αλγόριθμο της Google και κανείς δεν μπορεί να εγγυηθεί συγκεκριμένη θέση.'
          : 'No agency controls Google’s ranking systems, and nobody can legitimately guarantee a specific position.'}
      </p>
    </Section>
  );
}
