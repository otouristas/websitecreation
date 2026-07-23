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
    <div className="prose prose-lg max-w-none text-gray-700" lang="el">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
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
                <Link href={lp('/solutions/hotels/website-creation')} className="text-blue-600 underline">
                  κατασκευή ιστοσελίδας ξενοδοχείου
                </Link>{' '}
                και{' '}
                <Link href={lp('/solutions/hotels')} className="text-blue-600 underline">
                  SEO για ξενοδοχεία
                </Link>{' '}
                - δείτε και τον{' '}
                <Link href={lp('/blog/kataskevi-istoselidas-xenodoxeia')} className="text-blue-600 underline">
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
            <Link href={lp('/pricing')} className="text-blue-600 underline">
              Δείτε τιμές
            </Link>{' '}
            ή{' '}
            <Link href={lp('/get-started')} className="text-blue-600 underline">
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
                    className="text-blue-600 underline"
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
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
          <h3 className="text-xl font-bold text-blue-600 mb-3">1. Έρευνα με δεδομένα</h3>
          <p className="text-gray-600">
            Αναλύουμε ανταγωνιστές στην {city}: keywords, σελίδες που φέρνουν traffic και ευκαιρίες
            «striking distance» από το Search Console - όχι εικασίες.
          </p>
        </div>
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
          <h3 className="text-xl font-bold text-blue-600 mb-3">2. Τεχνική βάση</h3>
          <p className="text-gray-600">
            Core Web Vitals, indexability και καθαρή αρχιτεκτονική ώστε το site να φορτώνει γρήγορα για
            χρήστες στην {city} και σε κινητά.
          </p>
        </div>
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
          <h3 className="text-xl font-bold text-blue-600 mb-3">3. GEO &amp; AEO</h3>
          <p className="text-gray-600">
            Δομημένο περιεχόμενο, schema και οντότητες για ChatGPT Search, Perplexity και Gemini - ώστε η
            μάρκα σας να εμφανίζεται στις απαντήσεις AI, όχι μόνο στα blue links.
          </p>
        </div>
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
          <h3 className="text-xl font-bold text-blue-600 mb-3">4. Τοπική ανάπτυξη</h3>
          <p className="text-gray-600">
            Google Business Profile, τοπικές σελίδες και εσωτερική σύνδεση με γειτονικές περιοχές - κρίσιμο
            για ελληνικές αναζητήσεις «κοντά μου».
          </p>
        </div>
      </div>

      {location.neighborhoods && location.neighborhoods.length > 0 && (
        <div className="mb-12 bg-blue-50 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Καλύπτουμε όλη την {city} και τις γειτονιές
          </h3>
          <p className="mb-6">
            Η τοπική SEO δεν είναι μόνο «{target} {city}» - στοχεύουμε γειτονιές και
            micro-intent όπου βρίσκονται οι πελάτες σας.
          </p>
          <div className="flex flex-wrap gap-3">
            {location.neighborhoods.map((hood) => (
              <span
                key={hood}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-blue-800 shadow-sm border border-blue-100"
              >
                {hood}
              </span>
            ))}
          </div>
        </div>
      )}

      {service && SERVICE_GUIDE[service.slug] ? (
        <div className="mb-12 bg-gray-50 p-8 rounded-2xl border border-gray-100 not-prose">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Χρήσιμος οδηγός πριν ξεκινήσετε</h3>
          <p className="text-gray-600 mb-4">
            Διαβάστε τον αναλυτικό μας οδηγό ώστε να ξέρετε ακριβώς τι να περιμένετε σε κόστος, χρόνο και
            αποτέλεσμα για {target} στην {city}.
          </p>
          <Link href={lp(SERVICE_GUIDE[service.slug].href)} className="text-blue-600 underline font-medium">
            {SERVICE_GUIDE[service.slug].label} →
          </Link>
        </div>
      ) : null}

      <div className="text-center py-12 border-t border-gray-100 mt-12">
        <h3 className="text-2xl font-bold mb-4">Έτοιμοι να αναπτύξετε την επιχείρησή σας στην {city};</h3>
        <p className="mb-8 text-gray-600 max-w-2xl mx-auto">
          Ζητήστε δωρεάν προσφορά - ή ξεκινήστε δοκιμή 7 ημερών της πλατφόρμας SEO μας.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={lp('/contact')}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
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
