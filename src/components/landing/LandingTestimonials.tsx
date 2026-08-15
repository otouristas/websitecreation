import { Section, SectionHeading } from './primitives';
import type { SiteLocale } from '@/lib/i18n/locale';

const EN = [
  { name: 'Aggelos Rentals', role: 'Rent-a-car, Paros',
    text: 'Our new site handles fleet browsing and island SEO properly - bookings come directly instead of only through aggregators.' },
  { name: 'Villa Olivia Clara', role: 'Luxury villa, Greece',
    text: 'The design matches our brand and ranks for international villa searches. Inquiry quality improved within the first season.' },
  { name: 'Discover Cyclades', role: 'Travel guide',
    text: 'Content hubs and internal linking brought steady organic growth across island pages - exactly the architecture we needed.' },
] as const;

const EL = [
  { name: 'Aggelos Rentals', role: 'Ενοικίαση αυτοκινήτου, Πάρος',
    text: 'Η νέα ιστοσελίδα δείχνει τον στόλο σωστά και κατατάσσεται για αναζητήσεις στο νησί - περισσότερες άμεσες κρατήσεις.' },
  { name: 'Villa Olivia Clara', role: 'Πολυτελής βίλα',
    text: 'Σχεδιασμός που ταιριάζει στο brand μας και κατάταξη για διεθνείς αναζητήσεις. Καλύτερα leads από την πρώτη σεζόν.' },
  { name: 'Discover Cyclades', role: 'Ταξιδιωτικός οδηγός',
    text: 'Οι θεματικοί κόμβοι και η εσωτερική διασύνδεση έφεραν σταθερή οργανική ανάπτυξη στις σελίδες των νησιών.' },
] as const;

export function LandingTestimonials({ locale = 'en' }: { locale?: SiteLocale }) {
  const isEl = locale === 'el';
  const items = isEl ? EL : EN;

  return (
    <Section id="proof">
      <SectionHeading
        eyebrow={isEl ? 'Πελάτες' : 'Proof'}
        title={isEl ? 'Τι λένε οι πελάτες μας' : 'What our clients say'}
      />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {items.map((t) => (
          <figure key={t.name} className="flex h-full flex-col rounded-[14px] border border-hairline bg-surface p-6">
            <div className="flex items-center gap-0.5" aria-label={isEl ? '5 στα 5' : '5 out of 5'}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" className="size-3.5 fill-brand text-brand" aria-hidden>
                  <path d="M10 1.5l2.35 5.1 5.55.7-4.15 3.85 1.15 5.45L10 13.9 5.1 16.6l1.15-5.45L2.1 7.3l5.55-.7L10 1.5z" />
                </svg>
              ))}
            </div>
            <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
              {t.text}
            </blockquote>
            <figcaption className="mt-6 border-t border-hairline pt-5">
              <div className="font-display text-sm font-medium text-foreground">{t.name}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{t.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
