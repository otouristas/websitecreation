import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getServiceBySlug } from '@/data/services';
import { getServiceEl, serviceCityCopyEl, type CityCopyContext } from '@/data/services-i18n';
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
import type { ReactNode } from 'react';
import { SchemaMarkup, LocationContent } from '@/components/seo';
import { KitBreadcrumbs } from '@/components/page-kit';
import { AddOnCards, ChipLinks, LinkCards, PriceTiers, getServiceKit } from '@/components/service-kit';
import {
    AnnouncePill,
    AppPanel,
    WaveChoice,
    WaveClose,
    WaveHeading,
    WaveHero,
    WaveMark,
    WaveSection,
    WaveStats,
} from '@/components/pages/platform-wave/ui';
import { accentEnd, ManagedFaq, ServiceHeroActions } from '@/components/pages/services-wave/ui';
import { accentSuffix, IndustryAppPanel, WorkCards } from '@/components/pages/industry-wave/ui';
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
import { currentPrice, entrySeoNet, entryWebsiteNet, formatPrice, resolvePriceTokens, seoPackages, websitePackages } from '@/data/pricing';

import { TopicSections } from '@/components/services/topic-sections';
import { withExactTitle } from '../../_lib/exact-title';
import type { Location } from '@/data/locations';

/** Accent a real suffix when the page already names one. Otherwise the last two words. */
function accented(text: string, phrase?: string): ReactNode {
    if (phrase && text.endsWith(phrase) && text.length > phrase.length) {
        return accentSuffix(text, phrase);
    }
    return accentEnd(text, 2);
}

/** Greek city context for `serviceCityCopyEl`. */
function cityContextEl(location: Location): CityCopyContext {
    const city = location.cityLocal ?? location.city;
    const hoods = (location.neighborhoodsLocal ?? location.neighborhoods ?? []).slice(0, 3);
    const hoodList = hoods.length > 1 ? `${hoods.slice(0, -1).join(', ')} και ${hoods[hoods.length - 1]}` : (hoods[0] ?? '');
    return { city, inCity: getGreekLocative(location.slug, city), slug: location.slug, hoods: hoodList };
}

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

    const metadata = buildServiceLocationMetadata(service, location, locale as SiteLocale);
    // Greek city pages use the keyword map's one-phrase-per-service titles.
    const cityCopy = locale === 'el' ? serviceCityCopyEl[serviceSlug] : undefined;
    if (!cityCopy) return metadata;
    const ctx = cityContextEl(location);
    const description = cityCopy.description(ctx);
    return withExactTitle(
        {
            ...metadata,
            description,
            openGraph: { ...(metadata.openGraph ?? {}), description },
            twitter: { ...(metadata.twitter ?? {}), description },
        },
        cityCopy.title(ctx),
    );
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


    const cityCopy = isEl ? serviceCityCopyEl[serviceSlug] : undefined;
    const cityCtx = isEl ? cityContextEl(location) : null;

    const t = isEl ? {
        heroTitle: `${serviceName} ${cityLocative}`,
        heroDesc: `Ψάχνετε για ${serviceFor} ${cityLocative}; Δουλεύουμε με δεδομένα από το Google Search Console και παραδίδουμε αποτελέσματα που κατατάσσονται ψηλά στη Google και σε μηχανές αναζήτησης AI - με διαφανείς τιμές σε ${location.currency === 'EUR' ? 'ευρώ (€)' : location.currency}.`,
        getQuote: `Προσφορά για ${cityName}`,
        allLocations: 'Όλες οι τοποθεσίες',
        browseCities: 'Πλοήγηση ανά πόλη',
        whatsIncludedTitle: `Τι περιλαμβάνεται ${cityLocative}`,
        whatsIncludedDesc: `Το πακέτο μας για ${serviceFor} καλύπτει όσα χρειάζονται οι επιχειρήσεις ${cityLocative} για μετρήσιμα αποτελέσματα ${location.countryCode === 'GR' ? 'στην Ελλάδα' : 'στη χώρα εξυπηρέτησης'}.`,
        proofTitle: 'Σχετικά έργα μας',
        proofDesc: 'Ιστοσελίδες που έχουμε φτιάξει για επιχειρήσεις με παρόμοιο κοινό.',
        nearbyTitle: 'Κοντινές περιοχές που εξυπηρετούμε',
        otherServicesTitle: `Άλλες υπηρεσίες ${cityLocative}`,
        faqTitle: `Συχνές ερωτήσεις - ${cityName}`,
        ctaTitle: `Έτοιμοι για ${serviceFor} ${cityLocative};`,
        ctaDesc: `Ζητήστε μια δωρεάν προσφορά προσαρμοσμένη για τη δική σας επιχείρηση ${cityLocative} - τιμές σε ${location.currency === 'EUR' ? 'ευρώ' : location.currency}.`,
        ctaBtn: `Δωρεάν προσφορά για ${cityName}`,
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
    if (cityCopy && cityCtx) {
        t.heroTitle = cityCopy.h1(cityCtx);
        t.heroDesc = resolvePriceTokens(cityCopy.lead(cityCtx), siteLocale);
        t.whatsIncludedTitle = cityCopy.includedTitle(cityCtx);
        t.ctaTitle = cityCopy.ctaTitle(cityCtx);
    }

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
            answer: `Ανάλογα με το εύρος, τα περισσότερα projects για ${serviceFor} ${cityLocative} ξεκινούν μέσα σε λίγες ημέρες και αποδίδουν τα πρώτα παραδοτέα σε 2-8 εβδομάδες. Οι τιμές μας είναι σε ${location.currency === 'EUR' ? 'ευρώ (€)' : location.currency}.`,
        },
        {
            question: `Συνδυάζετε ${serviceFor} με τοπικό SEO ${cityLocative};`,
            answer: `Ναι. Σχεδιάζουμε τοπικές σελίδες, δομή εσωτερικών συνδέσμων, schema markup και στρατηγική Google Business Profile ώστε οι επιχειρήσεις ${cityLocative} να κατατάσσονται ψηλά για τοπικές αναζητήσεις.`,
        },
        {
            question: `Τι κάνει τις ιστοσελίδες μας να ξεχωρίζουν στη Google και στην αναζήτηση με AI;`,
            answer: `Το τεχνικό SEO, το semantic clustering από το Search Console, το GEO/AEO βελτιστοποιημένο περιεχόμενο και οι κορυφαίες επιδόσεις Core Web Vitals - όχι οι απλές, λεπτές σελίδες προτύπων.`,
        },
        {
            key: 'pricing',
            question: cityCopy && cityCtx ? cityCopy.pricingQuestion(cityCtx) : `Ποιο είναι το κόστος για ${serviceFor} ${cityLocative};`,
            answer: ['local-seo', 'seo-audits', 'ai-visibility', 'link-building', 'eshop-seo', 'content-creation'].includes(serviceSlug)
                ? `Τα πακέτα SEO ξεκινούν από €${formatPrice(entrySeoNet(), 'el')}/μήνα (Foundations), €${formatPrice(currentPrice(seoPackages[1]), 'el')}/μήνα (Growth) και €${formatPrice(currentPrice(seoPackages[2]), 'el')}/μήνα (Authority). Η τιμή εξαρτάται από τον ανταγωνισμό ${cityLocative} και τους στόχους σας. Δείτε αναλυτικές τιμές στη σελίδα τιμών μας ή ζητήστε δωρεάν προσφορά.`
                : `Οι ιστοσελίδες ξεκινούν από €${formatPrice(entryWebsiteNet(), 'el')} (Starter, έως 5 σελίδες), €${formatPrice(currentPrice(websitePackages[1]), 'el')} (Professional, έως 10 σελίδες) και €${formatPrice(currentPrice(websitePackages[2]), 'el')} (Business, έως 20 σελίδες). Χωρίς κρυφές χρεώσεις - όλες οι τιμές σε ευρώ. Ζητήστε δωρεάν προσφορά για ${cityName}.`,
        },
        {
            question: `Θα εμφανίζεται η επιχείρησή μου στο ChatGPT και στις αναζητήσεις με AI;`,
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

    // Greek city pages answer the cost question once, in the keyword map's
    // wording («Πόσο κοστίζει μια ιστοσελίδα στην Αθήνα;»), instead of three
    // near-identical cost questions from the hub, the template and the pack.
    const notCost = (f: { question: string }) => !(cityCopy && /κοστίζ/i.test(f.question));
    const faqItems = hubFaqSlugs.has(serviceSlug)
        ? [
            ...getServiceFaqs(serviceSlug, isEl ? 'el' : 'en').filter(notCost),
            cityFaqItems.find((f) => f.key === 'pricing') ?? cityFaqItems[0],
            ...packFaqs.filter(notCost),
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
    const heroAccent = cityCopy && cityCtx ? cityCopy.h1Accent(cityCtx) : isEl ? cityLocative : `in ${cityState}`;
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

    const sampleNote = isEl
        ? `Δείγμα δεδομένων μέσα στο AnotherSEOGuru App, για μια επιχείρηση ${cityLocative}. Δεν είναι στοιχεία πελάτη.`
        : `Sample data inside AnotherSEOGuru App, for a business in ${location.city}. This is not a client account.`;
    const yesLabel = isEl ? 'Περιλαμβάνεται' : 'Included';
    const greekTwin = isGreekLocation(location) && !isEl && hasOtherLocaleTwin;

    return (
        <>
            <SchemaMarkup schemas={schemas} />
            <Header locale={siteLocale} alternateHref={alternateHref} />
            <main className="blueprint-grid relative z-0 overflow-x-clip">
                <WaveHero
                    pill={
                        <div className="flex flex-col items-start gap-4">
                            <KitBreadcrumbs items={breadcrumbs} align="left" />
                            <AnnouncePill wrap href={lp('/locations')} tag={local.pillTag} text={local.pillText} />
                        </div>
                    }
                    title={accented(t.heroTitle, heroAccent)}
                    titleClassName={
                        t.heroTitle.length > 42
                            ? 'text-[1.65rem] min-[400px]:text-[1.85rem] sm:text-[2.3rem] lg:text-[2.75rem]'
                            : undefined
                    }
                    lead={t.heroDesc}
                    extra={
                        greekTwin ? (
                            <Link
                                href={grServiceLocationPath(serviceSlug, locationSlug)}
                                hrefLang="el"
                                className="font-medium text-primary underline-offset-4 hover:underline"
                            >
                                Διαβάστε αυτή τη σελίδα στα ελληνικά →
                            </Link>
                        ) : undefined
                    }
                    actions={
                        <ServiceHeroActions
                            locale={siteLocale}
                            primaryHref={lp('/get-started')}
                            primaryLabel={t.getQuote}
                            links={[
                                { href: lp(`/services/${serviceSlug}`), label: t.allLocations },
                                { href: lp('/locations'), label: t.browseCities },
                            ]}
                        />
                    }
                    panel={<IndustryAppPanel locale={siteLocale} kind="local" />}
                    panelNote={sampleNote}
                />

                <WaveSection shot="included">
                    <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
                        <div className="min-w-0">
                            <WaveHeading
                                eyebrow={local.included}
                                title={accented(t.whatsIncludedTitle, isEl ? cityLocative : location.city)}
                                lead={t.whatsIncludedDesc}
                            />
                            <ul className="mt-8 space-y-3.5">
                                {serviceFeatures.map((feature) => (
                                    <li key={feature} className="flex gap-3 text-[15.5px] leading-relaxed text-foreground">
                                        <WaveMark kind="yes" label={yesLabel} />
                                        <span className="min-w-0 text-pretty">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="min-w-0">
                            <AppPanel
                                url={`app.anotherseoguru.com/sample/${serviceSlug}`}
                                badge={isEl ? 'Δείγμα δεδομένων' : 'Sample data'}
                                caption={sampleNote}
                            >
                                {kit.detail(siteLocale)}
                            </AppPanel>
                        </div>
                    </div>
                </WaveSection>

                {cityCopy && cityCtx ? (
                    <div data-shot="topics">
                        <TopicSections topics={cityCopy.topics(cityCtx)} locale={siteLocale} id="topics" />
                    </div>
                ) : null}

                {cityCopy && cityCtx ? (
                    <WaveSection id="pricing" shot="pricing" tinted>
                        <WaveHeading
                            align="center"
                            eyebrow="Τιμές"
                            title={accented(cityCopy.pricingTitle(cityCtx), cityLocative)}
                        />
                        {kit.addOns.length > 0 ? (
                            <AddOnCards ids={kit.addOns} locale={siteLocale} className="mx-auto mt-12 max-w-3xl" />
                        ) : null}
                        {kit.pricing ? <PriceTiers kind={kit.pricing} locale={siteLocale} className="mt-12" /> : null}
                        <p className="mt-10 text-center text-[14.5px]">
                            <Link href={lp('/pricing')} className="font-medium text-primary underline-offset-4 hover:underline">
                                Δείτε όλες τις τιμές και τα πακέτα →
                            </Link>
                        </p>
                    </WaveSection>
                ) : null}

                <WaveSection id="local" shot="local" tinted={!cityCopy}>
                    <LocationContent location={location} service={service} locale={siteLocale} />
                </WaveSection>

                {proofProjects.length > 0 ? (
                    <WaveSection shot="proof">
                        <WaveHeading
                            eyebrow={local.work}
                            title={accented(t.proofTitle)}
                            lead={t.proofDesc}
                        />
                        <WorkCards projects={proofProjects} locale={siteLocale} />
                    </WaveSection>
                ) : null}

                {nearbyCities.length > 0 || relatedServices.length > 0 ? (
                    <WaveSection id="nearby" shot="nearby" tinted={proofProjects.length > 0}>
                        {nearbyCities.length > 0 ? (
                            <div className={relatedServices.length > 0 ? 'mb-16' : undefined}>
                                <WaveHeading eyebrow={local.nearby} title={accented(t.nearbyTitle)} />
                                <ChipLinks
                                    className="mt-8"
                                    items={nearbyCities.map((city) => ({
                                        href: lp(`/services/${serviceSlug}/${city.slug}`),
                                        label: isEl && city.cityLocal ? city.cityLocal : city.city,
                                    }))}
                                />
                            </div>
                        ) : null}
                        {relatedServices.length > 0 ? (
                            <>
                                <WaveHeading
                                    eyebrow={local.more}
                                    title={accented(t.otherServicesTitle, isEl ? cityLocative : location.city)}
                                />
                                <LinkCards
                                    className="mt-8"
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
                        ) : null}
                    </WaveSection>
                ) : null}

                <ManagedFaq
                    locale={siteLocale}
                    title={accented(t.faqTitle, cityName)}
                    faqs={faqItems.map((item) => ({ question: item.question, answer: item.answer }))}
                    askLabel={isEl ? 'Μιλήστε στο WhatsApp' : 'Talk on WhatsApp'}
                />

                <WaveChoice locale={siteLocale} source={`city-${serviceSlug}-choice`} />
                <WaveStats locale={siteLocale} />

                <WaveClose
                    locale={siteLocale}
                    source={`city-${serviceSlug}`}
                    title={accented(t.ctaTitle, isEl ? cityLocative : location.city)}
                    lead={t.ctaDesc}
                />
            </main>
            <Footer locale={siteLocale} />
        </>
    );
}
