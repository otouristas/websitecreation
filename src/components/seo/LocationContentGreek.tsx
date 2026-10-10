'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Location, countryNameEl } from '@/data/locations';
import { Service } from '@/data/services';
import { getServiceEl } from '@/data/services-i18n';
import { getLocationPack, getServiceCopyEl } from '@/data/location-content';
import { localizedPath, siteLocaleFromPath, type SiteLocale } from '@/lib/i18n/locale';
import { getGreekLocative } from '@/lib/greek-locative';
import { CheckList } from '@/components/kit/primitives';
import { kitSecondaryBtn } from '@/components/kit/sections';
import {
  accentCls,
  approachCard,
  closingBox,
  hoodChip,
  inlineLink,
  kitPrimaryBtn,
  localH2,
  localH3,
  localProse,
  neighbourhoodBox,
} from './location-styles';

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
  /** "στην Αθήνα" / "στο Ηράκλειο" / "στα Χανιά" - never the ungrammatical "στην {nominative}". */
  const inCity = getGreekLocative(location.slug, city);
  const country = countryNameEl(location);
  const serviceEl = service ? getServiceEl(service.slug) : null;
  /** Nominative, for headings and quoted search queries. */
  const target = serviceEl?.name ?? service?.name ?? 'SEO';
  /** Accusative, for running copy after "για" / "σε". */
  const targetFor = serviceEl?.nameAccusative ?? service?.name?.toLowerCase() ?? 'SEO';
  /** Short commercial keyword, for the "«keyword city»" query example. */
  const targetKeyword = serviceEl?.titleKeyword ?? serviceEl?.shortName ?? target;
  const neighborhoods = location.neighborhoodsLocal ?? location.neighborhoods;
  const pack = getLocationPack(location.slug, 'el');
  /**
   * Service-specific copy. The city `intro` describes the market and is shared
   * across all twelve services; this block is what makes an audit page read like
   * an audit page instead of a website-build pitch.
   */
  const serviceCopy = service
    ? getServiceCopyEl(service.slug, {
        inCity,
        city,
        neighborhoods: neighborhoods ?? [],
        tourism: pack?.tourism ?? false,
      })
    : null;
  const serviceDepth =
    service && pack?.serviceDepth?.[service.slug] ? pack.serviceDepth[service.slug] : null;

  const approach = [
    {
      title: '1. Έρευνα με δεδομένα',
      body: `Αναλύουμε ανταγωνιστές ${inCity}: keywords, σελίδες που φέρνουν traffic και ευκαιρίες «striking distance» από το Search Console - όχι εικασίες.`,
    },
    {
      title: '2. Τεχνική βάση',
      body: `Core Web Vitals, indexability και καθαρή αρχιτεκτονική ώστε το site να φορτώνει γρήγορα για χρήστες ${inCity} και σε κινητά.`,
    },
    {
      title: '3. GEO & AEO',
      body: 'Δομημένο περιεχόμενο, schema και οντότητες για ChatGPT Search, Perplexity και Gemini - ώστε η μάρκα σας να εμφανίζεται στις απαντήσεις AI, όχι μόνο στα blue links.',
    },
    {
      title: '4. Τοπική ανάπτυξη',
      body: 'Google Business Profile, τοπικές σελίδες και εσωτερική σύνδεση με γειτονικές περιοχές - κρίσιμο για ελληνικές αναζητήσεις «κοντά μου».',
    },
  ];

  return (
    <div className="text-foreground" lang="el">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="min-w-0">
          <h2 className={localH2}>
            Η έξυπνη επιλογή για <span className={accentCls}>επιχειρήσεις {inCity}</span>
          </h2>
          <div className={localProse}>
            <p>
              Στην AnotherSEOGuru συνδυάζουμε πλατφόρμα SEO με Google Search Console, GEO (Generative Engine
              Optimization) και AEO (Answer Engine Optimization) {inCity} ({country}). Δεν χρησιμοποιούμε
              παλιές τακτικές - αναλύουμε τα πραγματικά σήματα κατάταξης και χτίζουμε στρατηγική για{' '}
              {targetFor} με μετρήσιμο ROI.
            </p>
            <p>
              Έχουμε εμπειρία με ελληνικές αγορές φιλοξενίας και τουρισμού (π.χ. ξενοδοχεία, ενοικιάσεις
              οχημάτων) - κατανοούμε πώς η τοπική αναζήτηση και η ορατότητα σε AI αλλάζουν τις κρατήσεις και
              τα αιτήματα πελατών {inCity}.
            </p>
            {pack?.intro ? <p>{pack.intro}</p> : null}
            {pack?.intro && pack.tourism ? (
              <p>
                Εξειδικευόμαστε σε{' '}
                <Link href={lp('/solutions/hotels/website-creation')} className={inlineLink}>
                  κατασκευή ιστοσελίδας ξενοδοχείου
                </Link>{' '}
                και{' '}
                <Link href={lp('/solutions/hotels')} className={inlineLink}>
                  SEO για ξενοδοχεία
                </Link>{' '}
                - δείτε και τον{' '}
                <Link href={lp('/blog/kataskevi-istoselidas-xenodoxeia')} className={inlineLink}>
                  οδηγό μας για ιστοσελίδες ξενοδοχείων
                </Link>
                .
              </p>
            ) : null}
          </div>
          {serviceCopy ? (
            <div className="mt-10">
              <h3 className={localH3}>{serviceCopy.heading}</h3>
              <div className={localProse}>
                {serviceCopy.paragraphs.map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
              <CheckList items={serviceCopy.deliverables} className="mt-6 sm:grid-cols-2" />
            </div>
          ) : null}
          {serviceDepth ? (
            <div className={localProse}>
              <p>
                {serviceDepth}{' '}
                <Link href={lp('/pricing')} className={inlineLink}>
                  Δείτε τιμές
                </Link>{' '}
                ή{' '}
                <Link href={lp('/get-started')} className={inlineLink}>
                  ζητήστε δωρεάν προσφορά
                </Link>
                .
              </p>
            </div>
          ) : null}
        </div>

        <ol className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {approach.map((a) => (
            <li key={a.title} className={approachCard}>
              <h3 className="text-[16px] font-semibold text-foreground">{a.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{a.body}</p>
            </li>
          ))}
        </ol>
      </div>

      {neighborhoods && neighborhoods.length > 0 && (
        <div className={neighbourhoodBox}>
          <h3 className={localH3}>Καλύπτουμε όλες τις γειτονιές {inCity}</h3>
          <p className="mt-3 max-w-3xl text-[15.5px] leading-relaxed text-muted-foreground">
            Το τοπικό SEO δεν είναι μόνο «{targetKeyword} {city}» - στοχεύουμε γειτονιές και
            micro-intent όπου βρίσκονται οι πελάτες σας.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {neighborhoods.map((hood) => (
              <li key={hood} className={hoodChip}>
                {hood}
              </li>
            ))}
          </ul>
        </div>
      )}

      {service && SERVICE_GUIDE[service.slug] ? (
        <div className={neighbourhoodBox}>
          <h3 className={localH3}>Χρήσιμος οδηγός πριν ξεκινήσετε</h3>
          <p className="mt-3 max-w-3xl text-[15.5px] leading-relaxed text-muted-foreground">
            Διαβάστε τον αναλυτικό μας οδηγό ώστε να ξέρετε ακριβώς τι να περιμένετε σε κόστος, χρόνο και
            αποτέλεσμα για {targetFor} {inCity}.
          </p>
          <Link href={lp(SERVICE_GUIDE[service.slug].href)} className={`${inlineLink} mt-4 inline-block`}>
            {SERVICE_GUIDE[service.slug].label} →
          </Link>
        </div>
      ) : null}

      <div className={closingBox}>
        <h3 className="text-balance font-display text-[24px] font-semibold tracking-[-0.03em] text-foreground sm:text-[28px]">
          Έτοιμοι να αναπτύξετε την επιχείρησή σας {inCity};
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-[15.5px] leading-relaxed text-muted-foreground">
          Ζητήστε δωρεάν προσφορά - ή ξεκινήστε δοκιμή 7 ημερών της πλατφόρμας SEO μας.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={lp('/contact')} className={kitPrimaryBtn}>
            Δωρεάν προσφορά - {city}
          </Link>
          <Link href={lp('/blog/geo-aeo-ellada')} className={kitSecondaryBtn}>
            Οδηγός GEO &amp; AEO Ελλάδα
          </Link>
        </div>
      </div>
    </div>
  );
}
