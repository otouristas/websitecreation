'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Location, getLocationBySlug, formatLocationNameEl } from '@/data/locations';
import { Service } from '@/data/services';
import { getServiceEl } from '@/data/services-i18n';
import { getLocationPack } from '@/data/location-content';
import { localizedPath, siteLocaleFromPath, type SiteLocale } from '@/lib/i18n/locale';

interface LocationContentGreekProps {
  location: Location;
  service?: Service;
  locale?: SiteLocale;
}

/** Maps each service to its most relevant Greek blog guide for contextual A->B internal linking. */
const SERVICE_GUIDE: Record<string, { href: string; label: string }> = {
  'eshop-woocommerce': { href: '/blog/kataskevi-eshop-odigos', label: 'Οδηγός: Κατασκευή E-shop & Κόστος 2026' },
  'eshop-seo': { href: '/blog/kataskevi-eshop-odigos', label: 'Οδηγός: Κατασκευή E-shop & Κόστος 2026' },
  'website-creation': { href: '/blog/poso-kostizei-mia-istoselida', label: 'Πόσο κοστίζει μια ιστοσελίδα το 2026' },
  'website-redesign': { href: '/blog/anasxediasmos-istoselidas', label: 'Οδηγός ανασχεδιασμού ιστοσελίδας χωρίς απώλεια SEO' },
  'local-seo': { href: '/blog/poso-kostizei-to-seo', label: 'Πόσο κοστίζει το τοπικό SEO στην Ελλάδα' },
  'seo-audits': { href: '/blog/techniko-seo', label: 'Οδηγός τεχνικού SEO' },
  'seo-web-design': { href: '/blog/poso-kostizei-to-seo', label: 'Πόσο κοστίζει το SEO στην Ελλάδα' },
  'ai-visibility': { href: '/blog/geo-aeo-ellada', label: 'Οδηγός GEO & AEO για την Ελλάδα' },
  'link-building': { href: '/blog/poso-kostizei-to-seo', label: 'Πόσο κοστίζει το SEO στην Ελλάδα' },
  'content-creation': { href: '/blog/poso-kostizei-to-seo', label: 'Πόσο κοστίζει το SEO στην Ελλάδα' },
  'speed-optimization': { href: '/blog/poso-kostizei-to-seo', label: 'Πόσο κοστίζει το SEO στην Ελλάδα' },
};

export function LocationContentGreek({ location, service, locale: localeProp }: LocationContentGreekProps) {
  const pathname = usePathname() ?? '/el';
  const locale = localeProp ?? siteLocaleFromPath(pathname);
  const lp = (path: string) => localizedPath(locale, path);
  const city = location.cityLocal ?? location.city;
  const place = formatLocationNameEl(location);
  const serviceEl = service ? getServiceEl(service.slug) : null;
  const target = serviceEl?.name ?? (service?.name ?? 'SEO');
  const pack = getLocationPack(location.slug, 'el');
  const serviceDepth =
    service && pack?.serviceDepth?.[service.slug] ? pack.serviceDepth[service.slug] : null;

  return (
    <div className="prose prose-lg max-w-none text-foreground" lang="el">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-6">
          Η έξυπνη επιλογή για επιχειρήσεις στην {city}
        </h2>
        <p className="mb-4">
          Στην AnotherSEOGuru συνδυάζουμε πλατφόρμα SEO με Google Search Console, GEO (Generative Engine
          Optimization) και AEO (Answer Engine Optimization) για την {place}. Δεν χρησιμοποιούμε παλιές
          τακτικές - αναλύουμε τα πραγματικά σήματα κατάταξης και εφαρμόζουμε στρατηγική {target}{' '}
          με μετρήσιμο ROI.
        </p>
        <p>
          Έχουμε εμπειρία με ελληνικές αγορές φιλοξενίας και τουρισμού (π.χ. ξενοδοχεία, ενοικιάσεις
          οχημάτων) - κατανοούμε πώς η τοπική αναζήτηση και η ορατότητα σε AI αλλάζουν τις κρατήσεις και
          τα αιτήματα πελατών στην {city}.
        </p>
        {pack?.intro ? (
          <>
            <p className="mt-4">{pack.intro}</p>
            {pack.tourism ? (
              <p className="mt-4">
                Εξειδικευόμαστε σε{' '}
                <Link href={lp('/solutions/hotels/website-creation')} className="text-primary underline">
                  κατασκευή ιστοσελίδας ξενοδοχείου
                </Link>{' '}
                και{' '}
                <Link href={lp('/solutions/hotels')} className="text-primary underline">
                  SEO για ξενοδοχεία
                </Link>{' '}
                - δείτε και τον{' '}
                <Link href={lp('/blog/kataskevi-istoselidas-xenodoxeia')} className="text-primary underline">
                  οδηγό μας για ιστοσελίδες ξενοδοχείων
                </Link>
                .
              </p>
            ) : null}
          </>
        ) : null}
        {serviceDepth ? (
          <p className="mt-4">
            {serviceDepth}{' '}
            <Link href={lp('/pricing')} className="text-primary underline">
              Δείτε τιμές
            </Link>{' '}
            ή{' '}
            <Link href={lp('/get-started')} className="text-primary underline">
              ζητήστε δωρεάν προσφορά
            </Link>
            .
          </p>
        ) : null}
        {pack?.nearbySlugs && pack.nearbySlugs.length > 0 ? (
          <p className="mt-4 text-sm">
            Δείτε επίσης υπηρεσίες σε κοντινές αγορές:{' '}
            {pack.nearbySlugs.slice(0, 4).map((slug, i) => {
              const nearby = getLocationBySlug(slug);
              const label = nearby ? formatLocationNameEl(nearby) : slug;
              return (
                <span key={slug}>
                  {i > 0 ? ', ' : null}
                  <Link
                    href={lp(`/services/${service?.slug ?? 'website-creation'}/${slug}`)}
                    className="text-primary underline"
                  >
                    {label}
                  </Link>
                </span>
              );
            })}
            .
          </p>
        ) : null}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-surface-raised p-8 rounded-xl border border-hairline">
          <h3 className="text-xl font-bold text-primary mb-3">1. Έρευνα με δεδομένα</h3>
          <p className="text-muted-foreground">
            Αναλύουμε ανταγωνιστές στην {city}: keywords, σελίδες που φέρνουν traffic και ευκαιρίες
            «striking distance» από το Search Console - όχι εικασίες.
          </p>
        </div>
        <div className="bg-surface-raised p-8 rounded-xl border border-hairline">
          <h3 className="text-xl font-bold text-primary mb-3">2. Τεχνική βάση</h3>
          <p className="text-muted-foreground">
            Core Web Vitals, indexability και καθαρή αρχιτεκτονική ώστε το site να φορτώνει γρήγορα για
            χρήστες στην {city} και σε κινητά.
          </p>
        </div>
        <div className="bg-surface-raised p-8 rounded-xl border border-hairline">
          <h3 className="text-xl font-bold text-primary mb-3">3. GEO &amp; AEO</h3>
          <p className="text-muted-foreground">
            Δομημένο περιεχόμενο, schema και οντότητες για ChatGPT Search, Perplexity και Gemini - ώστε η
            μάρκα σας να εμφανίζεται στις απαντήσεις AI, όχι μόνο στα blue links.
          </p>
        </div>
        <div className="bg-surface-raised p-8 rounded-xl border border-hairline">
          <h3 className="text-xl font-bold text-primary mb-3">4. Τοπική ανάπτυξη</h3>
          <p className="text-muted-foreground">
            Google Business Profile, τοπικές σελίδες και εσωτερική σύνδεση με γειτονικές περιοχές - κρίσιμο
            για ελληνικές αναζητήσεις «κοντά μου».
          </p>
        </div>
      </div>

      {location.neighborhoods && location.neighborhoods.length > 0 && (
        <div className="mb-12 bg-primary/5 p-8 rounded-[10px]">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Καλύπτουμε όλη την {city} και τις γειτονιές
          </h3>
          <p className="mb-6">
            Το τοπικό SEO δεν είναι μόνο «{target} {city}» - στοχεύουμε γειτονιές και
            micro-intent όπου βρίσκονται οι πελάτες σας.
          </p>
          <div className="flex flex-wrap gap-3">
            {location.neighborhoods.map((hood) => (
              <span
                key={hood}
                className="px-4 py-2 bg-surface rounded-full text-sm font-medium text-primary shadow-sm border border-hairline"
              >
                {hood}
              </span>
            ))}
          </div>
        </div>
      )}

      {service && SERVICE_GUIDE[service.slug] ? (
        <div className="mb-12 bg-surface-raised p-8 rounded-[10px] border border-hairline not-prose">
          <h3 className="text-xl font-bold text-foreground mb-3">Χρήσιμος οδηγός πριν ξεκινήσετε</h3>
          <p className="text-muted-foreground mb-4">
            Διαβάστε τον αναλυτικό μας οδηγό ώστε να ξέρετε ακριβώς τι να περιμένετε σε κόστος, χρόνο και
            αποτέλεσμα για {target} στην {city}.
          </p>
          <Link href={lp(SERVICE_GUIDE[service.slug].href)} className="text-primary underline font-medium">
            {SERVICE_GUIDE[service.slug].label} →
          </Link>
        </div>
      ) : null}

      <div className="text-center py-12 border-t border-hairline mt-12">
        <h3 className="text-2xl font-bold mb-4">Έτοιμοι να αναπτύξετε την επιχείρησή σας στην {city};</h3>
        <p className="mb-8 text-muted-foreground max-w-2xl mx-auto">
          Ζητήστε δωρεάν προσφορά - ή ξεκινήστε δοκιμή 7 ημερών της πλατφόρμας SEO μας.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={lp('/contact')}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-primary-foreground bg-primary rounded-lg hover:bg-primary"
          >
            Δωρεάν προσφορά - {city}
          </Link>
          <Link href={lp('/blog/geo-aeo-ellada')} className="btn btn-outline text-lg px-8 py-4">
            Οδηγός GEO &amp; AEO Ελλάδα
          </Link>
        </div>
      </div>
    </div>
  );
}
