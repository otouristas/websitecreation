import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getServiceBySlug } from '@/data/services';
import { getServiceEl } from '@/data/services-i18n';
import {
    getLocationBySlug,
    formatLocationName,
    countryNameEl,
    stateNames,
    getNearbyLocations,
    isGreekLocation,
    isServiceLocationIndexable,
} from '@/data/locations';
import { getLocationPack, packFaqsForService } from '@/data/location-content';
import { getPortfolioBySlug } from '@/data/portfolio';
import {
    buildServiceLocationMetadata,
    generateBreadcrumbSchema,
    generateServiceSchema,
    combineSchemas,
    BASE_URL,
} from '@/lib/seo';
import { SchemaMarkup, LocationContent } from '@/components/seo';
import { MapPin } from 'lucide-react';
import { CtaBand, FeatureRow, KitHeading, KitSection, Stage } from '@/components/kit';
import { AccentTitle, ChipLinks, FaqBlock, LinkCards, ProofGrid, ServiceHero, getServiceKit } from '@/components/service-kit';
import { getServiceLocationBreadcrumbs } from '@/lib/linking';
import { grServiceLocationPath } from '@/lib/locale-paths';
import {
    CITY_PAGE_SERVICES,
    isServiceLocationKept,
    listKeptServiceLocations,
} from '@/lib/indexability/service-location';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { getGreekLocative } from '@/lib/greek-locative';
import { getServiceFaqs } from '@/data/service-faq-data';
import { currentPrice, entrySeoNet, entryWebsiteNet, formatPrice, seoPackages, websitePackages } from '@/data/pricing';

interface PageProps {
    params: Promise<{ locale: string; service: string; location: string }>;
}

export const revalidate = 3600;
/**
 * Only the kept service × city pages exist (2026-10 city cut, see
 * `src/lib/indexability/service-location.ts`). Every other combination is
 * answered with 410 Gone by `src/middleware.ts` before it reaches this route;
 * `dynamicParams = false` plus the `notFound()` below are the backstop if the
 * middleware is ever bypassed.
 */
export const dynamicParams = false;

export async function generateStaticParams({ params }: { params: { locale: string } }) {
    if (!isValidLocale(params.locale)) return [];
    return listKeptServiceLocations(params.locale as SiteLocale);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale, service: serviceSlug, location: locationSlug } = await params;
    if (!isValidLocale(locale)) return {};
    const service = getServiceBySlug(serviceSlug);
    const location = getLocationBySlug(locationSlug);

    if (!service || !location || !isServiceLocationIndexable(serviceSlug, location, locale as SiteLocale)) {
        return { title: 'Page Not Found' };
    }

    return buildServiceLocationMetadata(service, location, locale as SiteLocale);
}

export default async function ServiceLocationPage({ params }: PageProps) {
    const { locale, service: serviceSlug, location: locationSlug } = await params;
    if (!isValidLocale(locale)) notFound();
    const service = getServiceBySlug(serviceSlug);
    const location = getLocationBySlug(locationSlug);

    if (!service || !location || !isServiceLocationIndexable(serviceSlug, location, locale as SiteLocale)) {
        notFound();
    }

    const lp = (path: string) => localizedPath(locale as SiteLocale, path);
    const isEl = locale === 'el';

    const serviceEl = isEl ? getServiceEl(serviceSlug) : null;
    const serviceName = serviceEl?.name ?? service.name;
    /**
     * Greek inflects: `serviceName` is nominative and reads broken after "για"/"σε"
     * ("για Υπηρεσίες SEO & Τεχνικός Έλεγχος"). Use this in running copy instead.
     */
    const serviceFor = serviceEl?.nameAccusative ?? service.name.toLowerCase();
    const serviceDesc = serviceEl?.description ?? service.description;
    const serviceFeatures = serviceEl?.features ?? service.features;

    // English pages use the Latin name only: formatLocationName renders Greek
    // cities as "Τρίπολη (Tripoli)", which put two scripts in the English H1.
    const cityState = isEl && location.cityLocal
        ? `${location.cityLocal}, ${countryNameEl(location)}`
        : location.countryCode === 'US'
          ? formatLocationName(location)
          : `${location.city}, ${location.country}`;

    const cityName = isEl && location.cityLocal ? location.cityLocal : location.city;
    const cityLocative = isEl
        ? getGreekLocative(locationSlug, cityName)
        : `in ${cityState}`;
    
    const stateFull =
        location.countryCode === 'US'
            ? stateNames[location.stateCode] || location.state
            : location.state;
    const regionLabel =
        location.countryCode === 'US' ? stateFull : location.country;

    const siteLocale = locale as SiteLocale;
    const otherLocale: SiteLocale = isEl ? 'en' : 'el';
    // Real neighbours only (same region, short distance) that have a live page.
    const nearbyCities = getNearbyLocations(location, serviceSlug, siteLocale, 4);
    // Other kept services for this city. The old list was the first three
    // services in the catalogue, most of which no longer have city pages.
    const relatedServices = CITY_PAGE_SERVICES
        .filter((slug) => slug !== serviceSlug && isServiceLocationKept(siteLocale, slug, locationSlug))
        .map((slug) => getServiceBySlug(slug))
        .filter((s): s is NonNullable<typeof s> => Boolean(s));
    const hasOtherLocaleTwin = isServiceLocationKept(otherLocale, serviceSlug, locationSlug);
    // Language switch: the twin page when it exists, otherwise the service hub,
    // so the switcher never links to a removed (410) city URL.
    const alternateHref = localizedPath(
        otherLocale,
        hasOtherLocaleTwin ? `/services/${serviceSlug}/${locationSlug}` : `/services/${serviceSlug}`,
    );
    // Local proof: portfolio projects the city packs already reference.
    const proofProjects = Array.from(
        new Set([
            ...(getLocationPack(location.slug, 'en')?.portfolioSlugs ?? []),
            ...(getLocationPack(location.slug, 'el')?.portfolioSlugs ?? []),
        ]),
    )
        .map((slug) => getPortfolioBySlug(slug))
        .filter((p): p is NonNullable<typeof p> => Boolean(p) && p?.liveStatus !== 'offline')
        .slice(0, 3);
    
    // Breadcrumbs translated
    const breadcrumbs = getServiceLocationBreadcrumbs(
        serviceName,
        serviceSlug,
        cityName,
        locationSlug,
        locale as SiteLocale,
    );


    const t = isEl ? {
        heroTitle: `${serviceName} ${cityLocative}`,
        heroDesc: `Ψάχνετε για ${serviceFor} ${cityLocative}; Δουλεύουμε με δεδομένα από το Google Search Console και παραδίδουμε αποτελέσματα που κατατάσσονται ψηλά στη Google και σε μηχανές αναζήτησης AI - με διαφανείς τιμές σε ${location.currency === 'EUR' ? 'Ευρώ (€)' : location.currency}.`,
        getQuote: `Προσφορά για ${cityName}`,
        allLocations: 'Όλες οι Τοποθεσίες',
        browseCities: 'Πλοήγηση σε Πόλεις',
        whatsIncludedTitle: `Τι Περιλαμβάνεται ${cityLocative}`,
        whatsIncludedDesc: `Το πακέτο μας για ${serviceFor} καλύπτει όσα χρειάζονται οι επιχειρήσεις ${cityLocative} για μετρήσιμα αποτελέσματα ${location.countryCode === 'GR' ? 'στην Ελλάδα' : 'στη χώρα εξυπηρέτησης'}.`,
        proofTitle: 'Σχετικά έργα μας',
        proofDesc: 'Ιστοσελίδες που έχουμε φτιάξει για επιχειρήσεις με παρόμοιο κοινό.',
        nearbyTitle: 'Κοντινές περιοχές που εξυπηρετούμε',
        otherServicesTitle: `Άλλες Υπηρεσίες ${cityLocative}`,
        faqTitle: `Συχνές Ερωτήσεις - ${cityName}`,
        ctaTitle: `Έτοιμοι για ${serviceFor} ${cityLocative};`,
        ctaDesc: `Ζητήστε μια δωρεάν προσφορά προσαρμοσμένη για τη δική σας επιχείρηση ${cityLocative} - τιμές σε ${location.currency === 'EUR' ? 'Ευρώ' : location.currency}.`,
        ctaBtn: `Δωρεάν Προσφορά για ${cityName}`,
    } : {
        heroTitle: `${service.name} in ${cityState}`,
        heroDesc: `Looking for professional ${service.name.toLowerCase()} in ${location.city}, ${regionLabel}? We work from Google Search Console data and deliver work that ranks in Google and AI search - with transparent pricing in ${location.currency}.`,
        getQuote: `Get ${location.city} Quote`,
        allLocations: 'All Locations',
        browseCities: 'Browse Cities',
        whatsIncludedTitle: `What's Included in ${location.city}`,
        whatsIncludedDesc: `Our ${service.name.toLowerCase()} engagements for ${location.city} businesses cover everything you need to compete in ${location.country}.`,
        proofTitle: 'Related client work',
        proofDesc: 'Websites we have built for businesses with a similar audience.',
        nearbyTitle: 'Nearby areas we also serve',
        otherServicesTitle: `Other Services in ${location.city}`,
        faqTitle: `Frequently Asked Questions - ${location.city}`,
        ctaTitle: `Ready for ${service.name} in ${location.city}?`,
        ctaDesc: `Get a free quote tailored for your ${location.city} business - pricing in ${location.currency}.`,
        ctaBtn: `Get Free ${location.city} Quote`,
    };

    const hubFaqSlugs = new Set([
        'website-creation',
        'local-seo',
        'seo-audits',
        'eshop-woocommerce',
        'ai-visibility',
    ]);

    const cityFaqItems: { key?: string; question: string; answer: string }[] = isEl ? [
        {
            question: `Πόσο γρήγορα ξεκινάει το project μου ${cityLocative};`,
            answer: `Ανάλογα με το εύρος, τα περισσότερα projects για ${serviceFor} ${cityLocative} ξεκινούν μέσα σε λίγες ημέρες και αποδίδουν τα πρώτα παραδοτέα σε 2-8 εβδομάδες. Οι τιμές μας είναι σε ${location.currency === 'EUR' ? 'Ευρώ (€)' : location.currency}.`,
        },
        {
            question: `Συνδυάζετε ${serviceFor} με τοπικό SEO ${cityLocative};`,
            answer: `Ναι. Σχεδιάζουμε τοπικές σελίδες, δομή εσωτερικών συνδέσμων, schema markup και στρατηγική Google Business Profile ώστε οι επιχειρήσεις ${cityLocative} να κατατάσσονται ψηλά για τοπικές αναζητήσεις.`,
        },
        {
            question: `Τι κάνει τις ιστοσελίδες μας να ξεχωρίζουν σε Google και AI αναζήτηση;`,
            answer: `Το τεχνικό SEO, το semantic clustering από το Search Console, το GEO/AEO βελτιστοποιημένο περιεχόμενο και οι κορυφαίες επιδόσεις Core Web Vitals - όχι οι απλές, λεπτές σελίδες προτύπων.`,
        },
        {
            key: 'pricing',
            question: `Ποιο είναι το κόστος για ${serviceFor} ${cityLocative};`,
            answer: ['local-seo', 'seo-audits', 'ai-visibility', 'link-building', 'eshop-seo', 'content-creation'].includes(serviceSlug)
                ? `Τα πακέτα SEO ξεκινούν από €${formatPrice(entrySeoNet(), 'el')}/μήνα (Foundations), €${formatPrice(currentPrice(seoPackages[1]), 'el')}/μήνα (Growth) και €${formatPrice(currentPrice(seoPackages[2]), 'el')}/μήνα (Authority). Η τιμή εξαρτάται από τον ανταγωνισμό ${cityLocative} και τους στόχους σας. Δείτε αναλυτικές τιμές στη σελίδα τιμών μας ή ζητήστε δωρεάν προσφορά.`
                : `Οι ιστοσελίδες ξεκινούν από €${formatPrice(entryWebsiteNet(), 'el')} (Starter, έως 5 σελίδες), €${formatPrice(currentPrice(websitePackages[1]), 'el')} (Professional, έως 10 σελίδες) και €${formatPrice(currentPrice(websitePackages[2]), 'el')} (Business, έως 20 σελίδες). Χωρίς κρυφές χρεώσεις - όλες οι τιμές σε Ευρώ. Ζητήστε δωρεάν προσφορά για ${cityName}.`,
        },
        {
            question: `Θα εμφανίζεται η επιχείρησή μου σε ChatGPT και AI αναζητήσεις;`,
            answer: `Ναι. Με βελτιστοποίηση GEO/AEO - schema, οντότητες και δομημένο περιεχόμενο - στοχεύουμε να αναφέρεται η μάρκα σας στις απαντήσεις των ChatGPT Search, Perplexity και Gemini, όχι μόνο στα παραδοσιακά αποτελέσματα της Google ${cityLocative}.`,
        },
    ] : [
        {
            question: `How fast can my ${location.city} website go live?`,
            answer: `Depending on scope, most ${service.name.toLowerCase()} projects in ${location.city} launch in 2-8 weeks once content and approvals are ready. We work in ${location.currency} and align timelines to your market.`,
        },
        {
            question: `Do you offer ${service.name.toLowerCase()} for local SEO in ${location.city}?`,
            answer: `Yes. We build location pages, internal links, schema, and GBP strategy so ${location.city} businesses rank for commercial and "near me" queries.`,
        },
        {
            question: `What makes your ${location.city} sites rank in Google and AI search?`,
            answer: `Technical SEO, semantic clustering from Search Console, GEO/AEO structured content, and fast Core Web Vitals - not thin template pages.`,
        },
        {
            key: 'pricing',
            question: `How much does ${service.name.toLowerCase()} cost in ${location.city}?`,
            answer: ['local-seo', 'seo-audits', 'ai-visibility', 'link-building', 'eshop-seo', 'content-creation'].includes(serviceSlug)
                ? `SEO packages start at €${formatPrice(entrySeoNet(), 'en')}/mo (Foundations), €${formatPrice(currentPrice(seoPackages[1]), 'en')}/mo (Growth), and €${formatPrice(currentPrice(seoPackages[2]), 'en')}/mo (Authority). The price depends on competition in ${location.city} and your goals. All pricing is transparent - see our pricing page or request a free quote.`
                : `Websites start at €${formatPrice(entryWebsiteNet(), 'en')} (Starter, up to 5 pages), €${formatPrice(currentPrice(websitePackages[1]), 'en')} (Professional, up to 10 pages), and €${formatPrice(currentPrice(websitePackages[2]), 'en')} (Business, up to 20 pages). No hidden fees. Request a free quote for ${location.city}.`,
        },
        {
            question: `Will my business show up in ChatGPT and AI search?`,
            answer: `Yes. With GEO/AEO optimization - schema, entities, and structured content - we work to get your brand cited in ChatGPT Search, Perplexity, and Gemini answers, not just the traditional Google results in ${location.city}.`,
        },
    ];

    // City FAQs are filtered by topic: the unfiltered merge put website-build
    // questions on audit pages and shipped the mismatch as FAQPage schema.
    const packFaqs = packFaqsForService(
        getLocationPack(location.slug, isEl ? 'el' : 'en')?.faqs,
        serviceSlug,
    );

    const faqItems = hubFaqSlugs.has(serviceSlug)
        ? [
            ...getServiceFaqs(serviceSlug, isEl ? 'el' : 'en'),
            cityFaqItems.find((f) => f.key === 'pricing') ?? cityFaqItems[0],
            ...packFaqs,
          ]
        : [...packFaqs, ...cityFaqItems];

    const schemas = combineSchemas(
        generateBreadcrumbSchema({ items: breadcrumbs }),
        // No FAQPage. `getServiceFaqs` falls back to one shared DEFAULT_EL /
        // DEFAULT_EN block for any service without its own entry, so the same
        // Q&A pairs were marked up across hundreds of city URLs. FAQ rich
        // results have been restricted to authoritative government and health
        // sites since 2023, so there was no result to win in exchange - only
        // duplicate structured data at template scale. The visible FAQ stays:
        // that copy is what earns People Also Ask and AI-answer citations.
        // No LocalBusiness here on purpose. We have no physical premises in these
        // cities, and LocalBusiness + PostalAddress asserts exactly that. Service
        // with areaServed is the correct markup for a service-area business and
        // keeps the structured data aligned with what the page actually claims.
        generateServiceSchema({
            name: serviceName,
            description: serviceDesc,
            provider: { name: 'AnotherSEOGuru', url: BASE_URL },
            areaServed: [cityName, isEl ? countryNameEl(location) : location.country],
            serviceType: serviceName,
        }),
    );

    const kit = getServiceKit(serviceSlug);
    const heroAccent = isEl ? cityLocative : `in ${cityState}`;
    const local = isEl
        ? {
            pillTag: 'Τοπικά',
            pillText: `Δουλεύουμε ${cityLocative} και στις γύρω περιοχές`,
            included: 'Παραδοτέα',
            local: 'Τοπικά',
            work: 'Έργα',
            nearby: 'Περιοχές',
            more: 'Περισσότερα',
          }
        : {
            pillTag: 'Local',
            pillText: `Serving ${location.city} and the surrounding areas`,
            included: 'Deliverables',
            local: 'Local',
            work: 'Work',
            nearby: 'Nearby',
            more: 'More',
          };

    return (
        <>
            <SchemaMarkup schemas={schemas} />
            <Header locale={siteLocale} alternateHref={alternateHref} />
            <main className="blueprint-grid relative z-0">
                <ServiceHero
                    locale={siteLocale}
                    breadcrumbs={breadcrumbs}
                    pill={{ kind: 'live', tag: local.pillTag, text: local.pillText, href: lp('/locations') }}
                    h1={t.heroTitle}
                    h1Accent={heroAccent}
                    lead={t.heroDesc}
                    extra={
                        isGreekLocation(location) && !isEl && hasOtherLocaleTwin ? (
                            <Link
                                href={grServiceLocationPath(serviceSlug, locationSlug)}
                                hrefLang="el"
                                className="font-medium text-link hover:underline"
                            >
                                Διαβάστε αυτή τη σελίδα στα Ελληνικά →
                            </Link>
                        ) : undefined
                    }
                    primaryLabel={t.getQuote}
                    primaryHref={lp('/get-started')}
                    links={[
                        { href: lp(`/services/${serviceSlug}`), label: t.allLocations },
                        { href: lp('/locations'), label: t.browseCities },
                    ]}
                    visual={kit.hero(siteLocale, cityName)}
                    visualLabel={kit.heroLabel[siteLocale]}
                />

                <KitSection className="mt-6 sm:mt-10">
                    <FeatureRow
                        eyebrow={local.included}
                        eyebrowIcon={<kit.icon />}
                        title={<AccentTitle text={t.whatsIncludedTitle} />}
                        body={t.whatsIncludedDesc}
                        bullets={serviceFeatures}
                        preview={<Stage>{kit.detail(siteLocale)}</Stage>}
                    />
                </KitSection>

                <KitSection tinted id="local">
                    <LocationContent location={location} service={service} locale={siteLocale} />
                </KitSection>

                {proofProjects.length > 0 && (
                    <KitSection>
                        <KitHeading eyebrow={local.work} title={<AccentTitle text={t.proofTitle} />} description={t.proofDesc} />
                        <ProofGrid className="mt-12" projects={proofProjects} locale={siteLocale} />
                    </KitSection>
                )}

                {(nearbyCities.length > 0 || relatedServices.length > 0) && (
                    <KitSection tinted={proofProjects.length > 0} id="nearby">
                        {nearbyCities.length > 0 && (
                            <div className={relatedServices.length > 0 ? 'mb-20' : undefined}>
                                <KitHeading eyebrow={local.nearby} eyebrowIcon={<MapPin />} title={<AccentTitle text={t.nearbyTitle} />} />
                                <ChipLinks
                                    className="mt-10"
                                    items={nearbyCities.map((city) => ({
                                        href: lp(`/services/${serviceSlug}/${city.slug}`),
                                        label: isEl && city.cityLocal ? city.cityLocal : city.city,
                                    }))}
                                />
                            </div>
                        )}
                        {relatedServices.length > 0 && (
                            <>
                                <KitHeading eyebrow={local.more} title={<AccentTitle text={t.otherServicesTitle} />} />
                                <LinkCards
                                    className="mt-10"
                                    items={relatedServices.map((related) => {
                                        const relEl = isEl ? getServiceEl(related.slug) : null;
                                        return {
                                            href: lp(`/services/${related.slug}/${locationSlug}`),
                                            title: relEl?.name ?? related.name,
                                            body: relEl?.description ?? related.description,
                                        };
                                    })}
                                />
                            </>
                        )}
                    </KitSection>
                )}

                <FaqBlock
                    locale={siteLocale}
                    title={<AccentTitle text={t.faqTitle} />}
                    faqs={faqItems.map((item) => ({ question: item.question, answer: item.answer }))}
                />

                <CtaBand
                    locale={siteLocale}
                    source={`city-${serviceSlug}`}
                    title={<AccentTitle text={t.ctaTitle} />}
                    description={t.ctaDesc}
                />
            </main>
            <Footer locale={siteLocale} />
        </>
    );
}
