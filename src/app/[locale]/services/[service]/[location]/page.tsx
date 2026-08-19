import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { services, getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import { getServiceEl } from '@/data/services-i18n';
import { industries } from '@/data/industries';
import { industriesEl } from '@/data/industries-i18n';
import {
    getLocationBySlug,
    getTier1LocationSlugs,
    formatLocationName,
    countryNameEl,
    stateNames,
    getNearbyLocations,
    isGreekLocation,
} from '@/data/locations';
import { getLocationPack, packFaqsForService } from '@/data/location-content';
import {
    buildServiceLocationMetadata,
    generateBreadcrumbSchema,
    generateServiceSchema,
    generateFAQSchema,
    combineSchemas,
    BASE_URL,
} from '@/lib/seo';
import { SchemaMarkup, Breadcrumbs, LocationContent } from '@/components/seo';
import { getServiceLocationBreadcrumbs } from '@/lib/linking';
import { grServiceLocationPath } from '@/lib/locale-paths';
import { isIndustryServiceIndexable } from '@/lib/indexability/industry-service';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { getGreekLocative } from '@/lib/greek-locative';
import { getServiceFaqs } from '@/data/service-faq-data';

interface PageProps {
    params: Promise<{ locale: string; service: string; location: string }>;
}

export const revalidate = 3600;
export const dynamicParams = true;

/** Pre-render tier-1 hubs only; all other combos use on-demand ISR */
export async function generateStaticParams() {
    const serviceSlugs = getAllServiceSlugs();
    const locationSlugs = getTier1LocationSlugs();

    return serviceSlugs.flatMap((service) =>
        locationSlugs.map((location) => ({ service, location })),
    );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale, service: serviceSlug, location: locationSlug } = await params;
    if (!isValidLocale(locale)) return {};
    const service = getServiceBySlug(serviceSlug);
    const location = getLocationBySlug(locationSlug);

    if (!service || !location) {
        return { title: 'Page Not Found' };
    }

    return buildServiceLocationMetadata(service, location, locale as SiteLocale);
}

export default async function ServiceLocationPage({ params }: PageProps) {
    const { locale, service: serviceSlug, location: locationSlug } = await params;
    if (!isValidLocale(locale)) notFound();
    const service = getServiceBySlug(serviceSlug);
    const location = getLocationBySlug(locationSlug);

    if (!service || !location) {
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

    const cityState = isEl && location.cityLocal
        ? `${location.cityLocal}, ${countryNameEl(location)}`
        : formatLocationName(location);

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

    const nearbyCities = getNearbyLocations(location, 6);
    const relatedServices = services.filter((s) => s.slug !== serviceSlug).slice(0, 3);
    
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
        industriesTitle: `${serviceName} για Κλάδους ${cityLocative}`,
        industriesDesc: `Εξειδικευμένες λύσεις για διαφορετικούς τύπους επιχειρήσεων ${cityLocative}.`,
        nearbyTitle: `Επίσης Εξυπηρετούμε Κοντινές Περιοχές ${cityLocative}`,
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
        industriesTitle: `${service.name} for ${location.city} Industries`,
        industriesDesc: `Specialized solutions for different business types in ${location.city}.`,
        nearbyTitle: `Also Serving Nearby ${regionLabel} Cities`,
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
                ? `Τα πακέτα SEO ξεκινούν από €400/μήνα (Starter), €720/μήνα (Growth) και €1.200/μήνα (Scale). Η τιμή εξαρτάται από τον ανταγωνισμό ${cityLocative} και τους στόχους σας. Δείτε αναλυτικές τιμές στη σελίδα τιμών μας ή ζητήστε δωρεάν προσφορά.`
                : `Οι ιστοσελίδες ξεκινούν από €1.200 (Starter, έως 5 σελίδες), €2.000 (Professional, έως 10 σελίδες) και €3.200 (Business, έως 20 σελίδες). Χωρίς κρυφές χρεώσεις - όλες οι τιμές σε Ευρώ. Ζητήστε δωρεάν προσφορά για ${cityName}.`,
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
                ? `SEO packages start at €400/mo (Starter), €720/mo (Growth), and €1.200/mo (Scale). The price depends on competition in ${location.city} and your goals. All pricing is transparent - see our pricing page or request a free quote.`
                : `Websites start at €1.200 (Starter, up to 5 pages), €2,000 (Professional, up to 10 pages), and €3,200 (Business, up to 20 pages). No hidden fees. Request a free quote for ${location.city}.`,
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
        generateFAQSchema({ faqs: faqItems }),
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

    return (
        <>
            <SchemaMarkup schemas={schemas} />
            <Header />
            <main className="blueprint-grid relative z-0 main-below-header">
                <section className="section-compact ">
                    <div className="container">
                        <div className="max-w-3xl">
                            <Breadcrumbs items={breadcrumbs} className="mb-6" />

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                                {t.heroTitle}
                            </h1>

                            <p className="text-lg text-muted-foreground mb-4">
                                {t.heroDesc}
                            </p>

                            {isGreekLocation(location) && !isEl && (
                                <p className="text-sm text-muted-foreground mb-6">
                                    <Link
                                        href={grServiceLocationPath(serviceSlug, locationSlug)}
                                        hrefLang="el"
                                        className="text-primary font-medium hover:underline"
                                    >
                                        Διαβάστε αυτή τη σελίδα στα Ελληνικά →
                                    </Link>
                                </p>
                            )}

                            <div className="flex flex-wrap gap-4">
                                <Link href={lp("/get-started")} className="btn btn-primary">
                                    {t.getQuote}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <Link href={lp(`/services/${serviceSlug}`)} className="btn btn-outline">
                                    {t.allLocations}
                                </Link>
                                <Link href={lp("/locations")} className="btn btn-outline">
                                    {t.browseCities}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <h2 className="font-display text-2xl font-medium tracking-[-0.03em] sm:text-3xl mb-4">
                            {t.whatsIncludedTitle}
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl">
                            {t.whatsIncludedDesc}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {serviceFeatures.map((feature, i) => (
                                <div key={i} className="card card-interactive flex items-start gap-3 p-4 rounded-[8px]">
                                    <svg className="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section bg-surface-raised/40">
                    <div className="container">
                        <LocationContent location={location} service={service} locale={locale as SiteLocale} />
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <h2 className="font-display text-2xl font-medium tracking-[-0.03em] sm:text-3xl mb-4">
                            {t.industriesTitle}
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            {t.industriesDesc}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                            {industries.map((industry) => {
                                const indEl = isEl ? industriesEl[industry.slug] : null;
                                const indName = indEl?.name ?? industry.name;
                                return (
                                    <Link
                                        key={industry.slug}
                                        href={lp(
                                            isIndustryServiceIndexable(industry.slug, serviceSlug, locale as SiteLocale)
                                                ? `/solutions/${industry.slug}/${serviceSlug}`
                                                : `/solutions/${industry.slug}`,
                                        )}
                                        className="card card-interactive px-4 py-3 text-sm text-center rounded-lg border border-hairline transition-smooth"
                                    >
                                        {indName}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {nearbyCities.length > 0 && (
                    <section className="section bg-surface-raised/40">
                        <div className="container">
                            <h2 className="font-display text-2xl font-medium tracking-[-0.03em] sm:text-3xl mb-4">
                                {t.nearbyTitle}
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                                {nearbyCities.map((city) => (
                                    <Link
                                        key={city.slug}
                                        href={lp(`/services/${serviceSlug}/${city.slug}`)}
                                        className="card card-interactive px-3 py-2 text-sm text-center rounded-lg border border-hairline transition-smooth"
                                    >
                                        {isEl && city.cityLocal ? city.cityLocal : city.city}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section className="section">
                    <div className="container">
                        <h2 className="font-display text-2xl font-medium tracking-[-0.03em] sm:text-3xl mb-8">
                            {t.otherServicesTitle}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedServices.map((related) => {
                                const relEl = isEl ? getServiceEl(related.slug) : null;
                                const relName = relEl?.name ?? related.name;
                                const relDesc = relEl?.description ?? related.description;
                                return (
                                    <Link
                                        key={related.slug}
                                        href={lp(`/services/${related.slug}/${locationSlug}`)}
                                        className="card card-interactive card p-6"
                                    >
                                        <h3 className="font-semibold mb-2">{relName}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{relDesc}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="section bg-surface-raised/40">
                    <div className="container max-w-3xl">
                        <h2 className="font-display text-2xl font-medium tracking-[-0.03em] sm:text-3xl mb-8 text-center">
                            {t.faqTitle}
                        </h2>
                        <div className="space-y-4">
                            {faqItems.map((item) => (
                                <div key={item.question} className="card card-interactive card p-6">
                                    <h3 className="font-semibold mb-2">{item.question}</h3>
                                    <p className="text-muted-foreground text-sm">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section gradient-primary text-white">
                    <div className="container text-center">
                        <h2 className="font-display text-3xl font-medium tracking-[-0.03em] mb-4">
                            {t.ctaTitle}
                        </h2>
                        <p className="text-white/80 mb-8">
                            {t.ctaDesc}
                        </p>
                        <Link href={lp("/get-started")} className="btn bg-white text-primary hover:bg-white/90">
                            {t.ctaBtn}
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
