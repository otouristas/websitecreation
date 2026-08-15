import Link from 'next/link';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

const OFFERS = [
  {
    n: '01',
    href: '/services/website-creation',
    titleEn: 'Website design',
    titleEl: 'Κατασκευή ιστοσελίδων',
    descEn: 'Custom sites that load fast, convert on mobile, and ship SEO-ready from day one. From €899.',
    descEl: 'Ιστοσελίδες στα μέτρα σας: γρήγορες, mobile-first και έτοιμες για SEO από την πρώτη μέρα. Από €899.',
  },
  {
    n: '02',
    href: '/services/eshop-woocommerce',
    titleEn: 'WooCommerce e-shops',
    titleEl: 'Κατασκευή e-shop',
    descEn: 'Product architecture, checkout, schema, and speed so organic traffic can actually sell.',
    descEl: 'Κατηγορίες, checkout, schema και ταχύτητα ώστε η οργανική επισκεψιμότητα να γίνεται πωλήσεις.',
  },
  {
    n: '03',
    href: '/services/ai-visibility',
    titleEn: 'SEO, GEO & AEO',
    titleEl: 'SEO, GEO & AEO',
    descEn: 'Rank on Google and get cited in AI answers. Local SEO, technical work, content. From €299/mo.',
    descEl: 'Κατάταξη στη Google και αναφορές σε AI απαντήσεις. Τοπικό SEO, τεχνικό έργο, περιεχόμενο. Από €299/μήνα.',
  },
] as const;

export function HomeOfferGrid({ locale = 'en' }: { locale?: SiteLocale }) {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);

  return (
    <section className="border-y border-border bg-card/60 py-[var(--marketing-section-y)]">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {isEl ? 'Τι κάνουμε' : 'What we do'}
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {isEl
              ? 'Σχεδιασμός, e-shop και οργανική ανάπτυξη'
              : 'Design, commerce, and organic growth'}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {isEl
              ? 'Τρεις υπηρεσίες. Ένα αποτέλεσμα: περισσότερες κρατήσεις και leads χωρίς να πληρώνετε μόνο διαφημίσεις.'
              : 'Three offers. One outcome: more bookings and leads without living on ads.'}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {OFFERS.map((offer) => (
            <Link
              key={offer.href}
              href={lp(offer.href)}
              className="group flex flex-col rounded-2xl border border-border bg-background p-7 transition hover:border-foreground/25 hover:shadow-medium"
            >
              <span className="mb-6 font-mono text-xs text-muted-foreground">{offer.n}</span>
              <h3 className="font-display text-2xl font-semibold text-foreground">
                {isEl ? offer.titleEl : offer.titleEn}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {isEl ? offer.descEl : offer.descEn}
              </p>
              <span className="mt-6 text-sm font-semibold text-primary group-hover:underline">
                {isEl ? 'Δείτε την υπηρεσία' : 'Explore the service'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
