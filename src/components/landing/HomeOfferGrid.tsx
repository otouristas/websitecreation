import Link from 'next/link';
import { Globe, Search, ShoppingBag } from 'lucide-react';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

const OFFERS = [
  {
    n: '01',
    href: '/services/website-creation',
    icon: Globe,
    priceEn: 'From €899',
    priceEl: 'Από €899',
    titleEn: 'Website design',
    titleEl: 'Κατασκευή ιστοσελίδων',
    descEn: 'Custom sites that load fast, convert on mobile, and ship SEO-ready from day one.',
    descEl: 'Ιστοσελίδες στα μέτρα σας: γρήγορες, mobile-first και έτοιμες για SEO από την πρώτη μέρα.',
  },
  {
    n: '02',
    href: '/services/eshop-woocommerce',
    icon: ShoppingBag,
    priceEn: 'WooCommerce',
    priceEl: 'WooCommerce',
    titleEn: 'WooCommerce e-shops',
    titleEl: 'Κατασκευή e-shop',
    descEn: 'Product architecture, checkout, schema, and speed so organic traffic can actually sell.',
    descEl: 'Κατηγορίες, checkout, schema και ταχύτητα ώστε η οργανική επισκεψιμότητα να γίνεται πωλήσεις.',
  },
  {
    n: '03',
    href: '/services/ai-visibility',
    icon: Search,
    priceEn: 'From €299/mo',
    priceEl: 'Από €299/μήνα',
    titleEn: 'SEO, GEO & AEO',
    titleEl: 'SEO, GEO & AEO',
    descEn: 'Rank on Google and get cited in AI answers. Local SEO, technical work, content.',
    descEl: 'Κατάταξη στη Google και αναφορές σε AI απαντήσεις. Τοπικό SEO, τεχνικό έργο, περιεχόμενο.',
  },
] as const;

export function HomeOfferGrid({ locale = 'en' }: { locale?: SiteLocale }) {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);

  return (
    <section className="border-y border-border/80 bg-muted/20 py-[var(--marketing-section-y)]">
      <div className="container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            {isEl ? 'Τι κάνουμε' : 'What we do'}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {isEl
              ? 'Σχεδιασμός, e-shop και οργανική ανάπτυξη'
              : 'Design, commerce, and organic growth'}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {isEl
              ? 'Τρεις υπηρεσίες. Ένα αποτέλεσμα: περισσότερες κρατήσεις και leads χωρίς να πληρώνετε μόνο διαφημίσεις.'
              : 'Three offers. One outcome: more bookings and leads without living on ads.'}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {OFFERS.map((offer) => {
            const Icon = offer.icon;
            return (
              <Link
                key={offer.href}
                href={lp(offer.href)}
                className="card hover-glow group flex flex-col p-7"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {isEl ? offer.priceEl : offer.priceEn}
                  </span>
                </div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {offer.n}
                </p>
                <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                  {isEl ? offer.titleEl : offer.titleEn}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {isEl ? offer.descEl : offer.descEn}
                </p>
                <span className="mt-6 text-sm font-semibold text-primary">
                  {isEl ? 'Δείτε την υπηρεσία →' : 'Explore the service →'}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
