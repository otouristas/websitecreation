import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { services, getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import { getServiceEl } from '@/data/services-i18n';
import { getIndustriesForLocale } from '@/data/industries';
import { industriesEl } from '@/data/industries-i18n';
import { getIndexableServiceLocations } from '@/data/locations';
import { isCityPageService } from '@/lib/indexability/service-location';
import { isIndustryServiceIndexable } from '@/lib/indexability/industry-service';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { buildMetadata, buildServiceMetadata, generateArticleSchema, generateBreadcrumbSchema, generateServiceSchema, generateFAQSchema, combineSchemas } from '@/lib/seo';
import { getAiVisibilityPillarCopy } from '@/data/ai-visibility-pillar';
import { SchemaMarkup } from '@/components/seo';
import { MapPin } from 'lucide-react';
import { CtaBand, FeatureRow, KitHeading, KitSection, Stage } from '@/components/kit';
import {
    AccentTitle,
    AddOnCards,
    ChipLinks,
    DiyRow,
    FaqBlock,
    LinkCards,
    PriceTiers,
    ProcessGrid,
    ProofGrid,
    ServiceHero,
    getServiceKit,
    pick,
} from '@/components/service-kit';
import { resolvePriceTokens } from '@/data/pricing';
import { NotForYou } from '@/components/positioning/NotForYou';
import { SeoTimeline } from '@/components/positioning/SeoTimeline';
import { getServiceBreadcrumbs, getServiceHubRelatedPaths } from '@/lib/linking';
import { getServiceFaqs } from '@/data/service-faq-data';
import { getServiceHubCommercial } from '@/data/service-hub-commercial';
import { getFeaturedPortfolio, portfolioProjects } from '@/data/portfolio';
import RelatedPages from '@/components/seo/RelatedPages';
import { getBespokeServicePage } from '@/components/services/registry';
import { GENERATED_CONTENT_PUBLISHED, GENERATED_CONTENT_UPDATED } from '@/lib/seo/content-dates';

interface PageProps {
    params: Promise<{ locale: string; service: string }>;
}

// ISR: Revalidate every hour
export const revalidate = 3600;



// Generate static paths for all services
export async function generateStaticParams() {
    return getAllServiceSlugs().map((slug) => ({
        service: slug,
    }));
}

// Generate metadata for each service
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale, service: serviceSlug } = await params;
    if (!isValidLocale(locale)) return {};
    const service = getServiceBySlug(serviceSlug);

    if (!service) {
        return { title: 'Service Not Found' };
    }

    if (serviceSlug === 'ai-visibility') {
        const t = getAiVisibilityPillarCopy(locale as SiteLocale);
        return buildMetadata({
            title: t.metaTitle,
            description: t.metaDescription,
            path: localizedPath(locale as SiteLocale, '/services/ai-visibility'),
            hreflangPath: '/services/ai-visibility',
            primaryKeyword: t.primaryKeyword,
        });
    }

    return buildServiceMetadata(service, locale as SiteLocale);
}

export default async function ServicePage({ params }: PageProps) {
    const { locale, service: serviceSlug } = await params;
    if (!isValidLocale(locale)) notFound();
    const service = getServiceBySlug(serviceSlug);

    if (!service) {
        notFound();
    }

    // Each service hub gets its own hand-built page. Slugs not yet rebuilt fall
    // through to the shared template so the rollout can ship in waves.
    // Registry lookup, not a component defined during render: the module-level
    // map is stable across renders. react-hooks cannot see that through the call.
    const Bespoke = getBespokeServicePage(serviceSlug);
    // eslint-disable-next-line react-hooks/static-components
    if (Bespoke) return <Bespoke locale={locale as SiteLocale} />;


    const isEl = locale === 'el';
    const siteLocale = locale as SiteLocale;
    const serviceEl = isEl ? getServiceEl(serviceSlug) : null;

    const displayName = serviceEl?.name ?? service.name;
    const displayDesc = resolvePriceTokens(serviceEl?.description ?? service.description, siteLocale);
    const displayFeatures = serviceEl?.features ?? service.features;
    const kit = getServiceKit(serviceSlug);

    const t = isEl
        ? {
            whatsIncluded: 'Τι Περιλαμβάνεται',
            byCity: `${displayName} ανά Πόλη`,
            byCityDesc: `Επιλέξτε την πόλη σας για τοπικές λεπτομέρειες.`,
            allCities: 'Δείτε όλες τις τοποθεσίες →',
            forIndustries: `${displayName} για Κλάδους & Επιχειρήσεις`,
            forIndustriesDesc: `Εξειδικευμένες λύσεις ${displayName} προσαρμοσμένες στις ανάγκες της δικής σας δραστηριότητας.`,
            relatedServices: 'Σχετικές Υπηρεσίες',
            ctaTitle: 'Έτοιμοι να ξεκινήσουμε;',
            ctaDesc: `Ζητήστε μια δωρεάν προσφορά για ${displayName} σήμερα.`,
            getQuote: 'Ζητήστε Προσφορά',
            viewByLocation: 'Δείτε ανά Τοποθεσία',
            faqTitle: 'Συχνές Ερωτήσεις',
            proofTitle: 'Σχετικά έργα',
            pricingLink: 'Δείτε τιμές & πακέτα →',
            pricingTitle: 'Τιμές & πακέτα',
            deliverables: 'Παραδοτέα',
            process: 'Διαδικασία',
            pricing: 'Τιμές',
            audience: 'Για ποιον',
            locations: 'Περιοχές',
            industries: 'Κλάδοι',
            work: 'Έργα',
            allWork: 'Όλα τα έργα →',
            more: 'Περισσότερα',
            alsoExplore: 'Εξερευνήστε επίσης',
          }
        : {
            whatsIncluded: "What's Included",
            byCity: `${displayName} by City`,
            byCityDesc: `Select your city for local details.`,
            allCities: 'View all locations →',
            forIndustries: `${displayName} for Industries`,
            forIndustriesDesc: `Specialized ${displayName.toLowerCase()} tailored for specific business types and niches.`,
            relatedServices: 'Related Services',
            ctaTitle: 'Ready to Start?',
            ctaDesc: `Get a free quote for ${displayName.toLowerCase()} today.`,
            getQuote: 'Get a Quote',
            viewByLocation: 'View by Location',
            faqTitle: 'Frequently Asked Questions',
            proofTitle: 'Related work',
            pricingLink: 'See pricing & packages →',
            pricingTitle: 'Pricing & packages',
            deliverables: 'Deliverables',
            process: 'Process',
            pricing: 'Pricing',
            audience: 'Who it is for',
            locations: 'Locations',
            industries: 'Industries',
            work: 'Work',
            allWork: 'View all work →',
            more: 'More',
            alsoExplore: 'Also explore',
          };

    const lp = (path: string) => localizedPath(siteLocale, path);

    // Related services (excluding current)
    const relatedServices = services.filter((s) => s.slug !== serviceSlug).slice(0, 3);

    // Generate breadcrumbs for navigation
    const breadcrumbs = getServiceBreadcrumbs(displayName, service.slug, siteLocale);

    const faqItems = getServiceFaqs(serviceSlug, isEl ? 'el' : 'en').map((f) => ({
        question: f.question,
        answer: f.answer,
    }));
    // Proof filtered to projects that actually used this service, so a local-SEO
    // page does not illustrate itself with a logo-design project.
    const matching = portfolioProjects.filter((p) => p.services?.includes(serviceSlug) && p.featured);
    const proofProjects = (matching.length >= 3 ? matching : getFeaturedPortfolio(6)).slice(0, 3);

    // Generate schema markup
    const schemas = combineSchemas(
        generateBreadcrumbSchema({ items: breadcrumbs }),
        generateServiceSchema({
            name: displayName,
            description: serviceEl?.description ?? service.description,
            provider: { name: 'AnotherSEOGuru', url: 'https://anotherseoguru.com' },
            serviceType: 'Web Development',
        }),
        // Stable dates. These were `new Date().toISOString()`, so every hourly
        // ISR revalidate republished the page with a fresh datePublished.
        generateArticleSchema({
            headline: displayName,
            description: serviceEl?.description ?? service.description,
            datePublished: GENERATED_CONTENT_PUBLISHED,
            dateModified: GENERATED_CONTENT_UPDATED,
            author: { name: 'AnotherSEOGuru' },
        }),
        generateFAQSchema({ faqs: faqItems })
    );

    // Only services that kept city pages list cities, and only the live ones.
    // The EL branch used to link all 45 Greek cities for every service.
    const locationsToShow = isCityPageService(serviceSlug)
        ? getIndexableServiceLocations(isEl ? 'el' : 'en')
        : [];
    const hubRelated = getServiceHubRelatedPaths(serviceSlug, siteLocale).map((p) => ({
        slug: lp(p.path),
        title: isEl ? p.titleEl : p.titleEn,
    }));
    const commercial = getServiceHubCommercial(serviceSlug, isEl ? 'el' : 'en');
    // SEO retainers get the expectation-setting timeline; one-off builds do not.
    const isSeoService = ['local-seo', 'seo-audits', 'eshop-seo', 'ai-visibility', 'link-building', 'content-creation'].includes(serviceSlug);

    const quoteHref = lp(`/get-started?service=${serviceSlug}`);
    const heroLinks = [
        { href: lp('/pricing'), label: t.pricingLink.replace(' →', '') },
        ...(locationsToShow.length > 0 ? [{ href: '#locations', label: t.viewByLocation }] : []),
    ];

    return (
        <>
            <SchemaMarkup schemas={schemas} />
            <Header locale={siteLocale} />
            <main className="blueprint-grid relative z-0">
                <ServiceHero
                    locale={siteLocale}
                    breadcrumbs={breadcrumbs}
                    pill={{
                        kind: kit.pill.kind,
                        tag: pick(kit.pill.tag, siteLocale),
                        text: kit.pill.text[siteLocale],
                        href: lp(kit.pill.href),
                    }}
                    h1={displayName}
                    lead={displayDesc}
                    primaryLabel={kit.cta === 'quote' ? t.getQuote : undefined}
                    primaryHref={kit.cta === 'quote' ? quoteHref : `${quoteHref}#free-audit`}
                    links={heroLinks}
                    visual={kit.hero(siteLocale)}
                    visualLabel={kit.heroLabel[siteLocale]}
                    wideVisual={kit.wide}
                />

                {/* What it is + deliverables */}
                <KitSection className="mt-6 sm:mt-10">
                    <FeatureRow
                        eyebrow={t.deliverables}
                        eyebrowIcon={<kit.icon />}
                        title={<AccentTitle text={t.whatsIncluded} />}
                        body={commercial?.definition}
                        bullets={displayFeatures}
                        links={[
                            { href: lp('/pricing'), label: t.pricingLink.replace(' →', ''), primary: true },
                            { href: lp('/work'), label: t.allWork.replace(' →', '') },
                        ]}
                        preview={<Stage>{kit.detail(siteLocale)}</Stage>}
                    />
                </KitSection>

                {commercial ? (
                    <KitSection tinted id="process">
                        <KitHeading eyebrow={t.process} title={<AccentTitle text={commercial.processTitle} />} />
                        <ProcessGrid
                            className="mt-12"
                            steps={commercial.process.map((step) => ({ title: step }))}
                        />
                    </KitSection>
                ) : null}

                {/* Pricing, straight from src/data/pricing.ts */}
                <KitSection id="pricing">
                    <KitHeading
                        align="center"
                        eyebrow={t.pricing}
                        title={<AccentTitle text={t.pricingTitle} />}
                        description={commercial?.pricingTeaser}
                    />
                    {kit.addOns.length > 0 ? (
                        <AddOnCards ids={kit.addOns} locale={siteLocale} className="mx-auto mt-12 max-w-3xl" />
                    ) : null}
                    {kit.pricing ? <PriceTiers kind={kit.pricing} locale={siteLocale} className="mt-12" /> : null}
                    <p className="mt-10 text-center text-[14px]">
                        <Link href={lp('/pricing')} className="font-medium text-link underline-offset-4 hover:underline">
                            {t.pricingLink}
                        </Link>
                    </p>
                </KitSection>

                {commercial ? (
                    <KitSection id="audience" className="border-t border-hairline pb-0 sm:pb-0">
                        <KitHeading
                            eyebrow={t.audience}
                            title={<AccentTitle text={commercial.audienceTitle} />}
                            description={commercial.audience}
                        />
                    </KitSection>
                ) : null}

                <NotForYou locale={siteLocale} />

                {isSeoService ? <SeoTimeline locale={siteLocale} /> : null}

                {kit.diy ? <DiyRow locale={siteLocale} source={`service-${serviceSlug}`} /> : null}

                {/* Locations and industries */}
                <KitSection id="locations" tinted={!kit.diy}>
                    {locationsToShow.length > 0 ? (
                        <div className="mb-20">
                            <KitHeading eyebrow={t.locations} eyebrowIcon={<MapPin />} title={<AccentTitle text={t.byCity} />} description={t.byCityDesc} />
                            <ChipLinks
                                className="mt-10"
                                items={locationsToShow.map((location) => ({
                                    href: lp(`/services/${serviceSlug}/${location.slug}`),
                                    label: isEl && location.cityLocal ? location.cityLocal : location.city,
                                }))}
                            />
                            <p className="mt-8 text-[14px]">
                                <Link href={lp('/locations')} className="font-medium text-link underline-offset-4 hover:underline">
                                    {t.allCities}
                                </Link>
                            </p>
                        </div>
                    ) : null}
                    <KitHeading eyebrow={t.industries} title={<AccentTitle text={t.forIndustries} />} description={t.forIndustriesDesc} />
                    <ChipLinks
                        className="mt-10"
                        items={getIndustriesForLocale(isEl ? 'el' : 'en').map((industry) => ({
                            href: lp(
                                isIndustryServiceIndexable(industry.slug, serviceSlug, siteLocale)
                                    ? `/solutions/${industry.slug}/${serviceSlug}`
                                    : `/solutions/${industry.slug}`,
                            ),
                            label: isEl ? (industriesEl[industry.slug]?.name ?? industry.name) : industry.name,
                        }))}
                    />
                </KitSection>

                {/* Portfolio proof */}
                <KitSection>
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <KitHeading eyebrow={t.work} title={<AccentTitle text={t.proofTitle} />} />
                        <Link href={lp('/work')} className="text-[14px] font-medium text-link underline-offset-4 hover:underline">
                            {t.allWork}
                        </Link>
                    </div>
                    <ProofGrid className="mt-12" projects={proofProjects} locale={siteLocale} />
                </KitSection>

                {/* Related services and money-page links */}
                <KitSection tinted>
                    <KitHeading eyebrow={t.more} title={<AccentTitle text={t.relatedServices} />} />
                    <LinkCards
                        className="mt-12"
                        items={relatedServices.map((related) => {
                            const relEl = isEl ? getServiceEl(related.slug) : null;
                            return {
                                href: lp(`/services/${related.slug}`),
                                title: relEl?.name ?? related.name,
                                body: resolvePriceTokens(relEl?.description ?? related.description, siteLocale),
                            };
                        })}
                    />
                    <div className="mt-12 max-w-3xl">
                        <RelatedPages title={t.alsoExplore} pages={hubRelated} />
                    </div>
                </KitSection>

                <FaqBlock locale={siteLocale} title={<AccentTitle text={t.faqTitle} />} faqs={faqItems} />

                <CtaBand
                    locale={siteLocale}
                    source={`service-${serviceSlug}`}
                    title={<AccentTitle text={t.ctaTitle} />}
                    description={t.ctaDesc}
                />
            </main>
            <Footer locale={siteLocale} />
        </>
    );
}
