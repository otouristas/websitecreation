import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { services, getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import { getServiceEl } from '@/data/services-i18n';
import { industries } from '@/data/industries';
import { industriesEl } from '@/data/industries-i18n';
import { greeceLocations, getIndexableServiceLocationSlugs, getLocationBySlug } from '@/data/locations';
import { isIndustryServiceIndexable } from '@/lib/indexability/industry-service';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { buildServiceMetadata, generateArticleSchema, generateBreadcrumbSchema, generateServiceSchema, generateFAQSchema, combineSchemas } from '@/lib/seo';
import { SchemaMarkup, Breadcrumbs, FAQSection } from '@/components/seo';
import ServiceHubCommercialBody from '@/components/seo/ServiceHubCommercialBody';
import { Section, SectionHeading, Bloom, PrimaryButtonLink, GhostButtonLink, MeshGrid, Tick } from '@/components/landing/primitives';
import { NotForYou } from '@/components/positioning/NotForYou';
import { SeoTimeline } from '@/components/positioning/SeoTimeline';
import { getServiceBreadcrumbs, getServiceHubRelatedPaths } from '@/lib/linking';
import { getServiceFaqs } from '@/data/service-faq-data';
import { getServiceHubCommercial } from '@/data/service-hub-commercial';
import { getFeaturedPortfolio, portfolioProjects } from '@/data/portfolio';
import RelatedPages from '@/components/seo/RelatedPages';
import { getBespokeServicePage } from '@/components/services/registry';

interface PageProps {
    params: Promise<{ locale: string; service: string }>;
}

// ISR: Revalidate every hour
export const revalidate = 3600;

/** Stable content dates for Article schema on generated service hubs. */
const SERVICE_CONTENT_PUBLISHED = '2026-02-01T00:00:00.000Z';
const SERVICE_CONTENT_UPDATED = '2026-08-15T00:00:00.000Z';

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
    const serviceEl = isEl ? getServiceEl(serviceSlug) : null;

    const displayName = serviceEl?.name ?? service.name;
    const displayDesc = serviceEl?.description ?? service.description;
    const displayFeatures = serviceEl?.features ?? service.features;

    const t = isEl
        ? {
            whatsIncluded: 'Τι Περιλαμβάνεται',
            byCity: `${displayName} ανά Πόλη`,
            byCityDesc: `Παρέχουμε υπηρεσίες ${displayName} σε επιχειρήσεις σε όλη την Ελλάδα και διεθνώς. Επιλέξτε την πόλη σας για τοπικές λεπτομέρειες.`,
            allCities: 'Δείτε όλες τις τοποθεσίες →',
            forIndustries: `${displayName} για Κλάδους & Επιχειρήσεις`,
            forIndustriesDesc: `Εξειδικευμένες λύσεις ${displayName} προσαρμοσμένες στις ανάγκες της δικής σας δραστηριότητας.`,
            relatedServices: 'Σχετικές Υπηρεσίες',
            ctaTitle: 'Έτοιμοι να ξεκινήσουμε;',
            ctaDesc: `Ζητήστε μια δωρεάν προσφορά για ${displayName} σήμερα.`,
            ctaButton: 'Δωρεάν Προσφορά',
            getQuote: 'Ζητήστε Προσφορά',
            viewByLocation: 'Δείτε ανά Τοποθεσία',
            faqTitle: 'Συχνές Ερωτήσεις',
            proofTitle: 'Σχετικά έργα',
            pricingLink: 'Δείτε τιμές & πακέτα →',
          }
        : {
            whatsIncluded: "What's Included",
            byCity: `${displayName} by City`,
            byCityDesc: `We provide ${displayName.toLowerCase()} services to businesses across the United States and internationally. Select your city for local pricing and availability.`,
            allCities: 'View all 100+ cities →',
            forIndustries: `${displayName} for Industries`,
            forIndustriesDesc: `Specialized ${displayName.toLowerCase()} tailored for specific business types and niches.`,
            relatedServices: 'Related Services',
            ctaTitle: 'Ready to Start?',
            ctaDesc: `Get a free quote for ${displayName.toLowerCase()} today.`,
            ctaButton: 'Get Free Quote',
            getQuote: 'Get a Quote',
            viewByLocation: 'View by Location',
            faqTitle: 'Frequently Asked Questions',
            proofTitle: 'Related work',
            pricingLink: 'See pricing & packages →',
          };

    const lp = (path: string) => localizedPath(locale as SiteLocale, path);

    // Related services (excluding current)
    const relatedServices = services.filter((s) => s.slug !== serviceSlug).slice(0, 3);

    // Generate breadcrumbs for navigation
    const breadcrumbs = getServiceBreadcrumbs(displayName, service.slug, locale as SiteLocale);

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
            description: displayDesc,
            provider: { name: 'AnotherSEOGuru', url: 'https://anotherseoguru.com' },
            serviceType: 'Web Development',
        }),
        // Stable dates. These were `new Date().toISOString()`, so every hourly
        // ISR revalidate republished the page with a fresh datePublished.
        generateArticleSchema({
            headline: displayName,
            description: displayDesc,
            datePublished: SERVICE_CONTENT_PUBLISHED,
            dateModified: SERVICE_CONTENT_UPDATED,
            author: { name: 'AnotherSEOGuru' },
        }),
        generateFAQSchema({ faqs: faqItems })
    );

    const locationsToShow = isEl
        ? greeceLocations
        : getIndexableServiceLocationSlugs()
            .map((slug) => getLocationBySlug(slug))
            .filter((loc): loc is NonNullable<typeof loc> => Boolean(loc))
            .slice(0, 30);
    const hubRelated = getServiceHubRelatedPaths(serviceSlug).map((p) => ({
        slug: lp(p.path),
        title: isEl ? p.titleEl : p.titleEn,
    }));
    const commercial = getServiceHubCommercial(serviceSlug, isEl ? 'el' : 'en');
    // SEO retainers get the expectation-setting timeline; one-off builds do not.
    const isSeoService = ['local-seo', 'seo-audits', 'eshop-seo', 'ai-visibility', 'link-building', 'content-creation'].includes(serviceSlug);

    return (
        <>
            <SchemaMarkup schemas={schemas} />
            <Header locale={locale as SiteLocale} />
            <main className="blueprint-grid relative z-0">
                <section className="relative overflow-hidden border-b border-hairline">
                    <Bloom className="left-1/2 top-[-8rem] h-[26rem] w-[58rem] -translate-x-1/2" />
                    <div className="main-below-header relative mx-auto max-w-6xl px-6 pb-14 pt-6">
                        <Breadcrumbs items={breadcrumbs} className="mb-6" />
                        <h1 className="rise-in max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-foreground md:text-6xl">
                            {displayName}
                        </h1>
                        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                            {displayDesc}
                        </p>
                        <div className="mt-9 flex flex-wrap gap-3">
                            <PrimaryButtonLink href={lp('/get-started')}>{t.getQuote}</PrimaryButtonLink>
                            <GhostButtonLink href="#locations">{t.viewByLocation}</GhostButtonLink>
                            <GhostButtonLink href={lp('/pricing')}>{t.pricingLink}</GhostButtonLink>
                        </div>
                    </div>
                </section>

                {commercial ? (
                    <ServiceHubCommercialBody commercial={commercial} locale={locale as SiteLocale} />
                ) : null}

                {/* Features */}
                <Section>
                    <SectionHeading align="left" eyebrow={isEl ? 'Παραδοτέα' : 'Deliverables'} title={t.whatsIncluded} className="mb-10" />
                    <div>
                        <MeshGrid className="md:grid-cols-2 lg:grid-cols-3">
                            {displayFeatures.map((feature, i) => (
                                <div key={i} className="flex items-start gap-3 bg-surface p-6">
                                    <Tick />
                                    <span className="text-sm leading-relaxed text-muted-foreground">{feature}</span>
                                </div>
                            ))}
                        </MeshGrid>
                    </div>
                </Section>

                <NotForYou locale={locale as SiteLocale} />

                {isSeoService ? <SeoTimeline locale={locale as SiteLocale} /> : null}

                {/* Location Pages */}
                <Section id="locations">
                    <SectionHeading align="left" eyebrow={isEl ? 'Περιοχές' : 'Locations'} title={t.byCity} body={t.byCityDesc} className="mb-10" />
                    <div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {locationsToShow.map((location) => (
                                <Link
                                    key={location.slug}
                                    href={lp(`/services/${serviceSlug}/${location.slug}`)}
                                    className="glass-card hover-glow px-3 py-2 text-sm text-center rounded-lg border border-border transition-smooth"
                                >
                                    {isEl && location.cityLocal ? location.cityLocal : location.city}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-8">
                            <Link href={lp("/locations")} className="text-sm font-medium text-primary hover:underline">
                                {t.allCities}
                            </Link>
                        </div>
                    </div>
                </Section>

                {/* Industry Pages */}
                <section className="section">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            {t.forIndustries}
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl">
                            {t.forIndustriesDesc}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                            {industries.map((industry) => {
                                const indName = isEl
                                  ? (industriesEl[industry.slug]?.name ?? industry.name)
                                  : industry.name;
                                return (
                                    <Link
                                        key={industry.slug}
                                        href={lp(
                                            isIndustryServiceIndexable(industry.slug, serviceSlug, locale as SiteLocale)
                                                ? `/solutions/${industry.slug}/${serviceSlug}`
                                                : `/solutions/${industry.slug}`,
                                        )}
                                        className="glass-card hover-glow px-4 py-3 text-sm text-center rounded-lg border border-border transition-smooth"
                                    >
                                        {indName}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Related Services */}
                <section className="section bg-muted/30">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8">{t.relatedServices}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedServices.map((related) => {
                                const relEl = isEl ? getServiceEl(related.slug) : null;
                                const relName = relEl?.name ?? related.name;
                                const relDesc = relEl?.description ?? related.description;
                                return (
                                    <Link
                                        key={related.slug}
                                        href={lp(`/services/${related.slug}`)}
                                        className="glass-card hover-glow card p-6"
                                    >
                                        <h3 className="font-semibold mb-2">{relName}</h3>
                                        <p className="text-sm text-muted-foreground">{relDesc}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Money-page internal links */}
                <section className="section">
                    <div className="container max-w-3xl">
                        <RelatedPages
                            title={isEl ? 'Εξερευνήστε επίσης' : 'Also explore'}
                            pages={hubRelated}
                        />
                    </div>
                </section>

                {/* Portfolio proof */}
                <section className="section bg-muted/20">
                    <div className="container">
                        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                            <h2 className="text-2xl sm:text-3xl font-bold">{t.proofTitle}</h2>
                            <Link href={lp('/work')} className="text-sm font-medium text-primary hover:underline">
                                {isEl ? 'Όλα τα έργα →' : 'View all work →'}
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {proofProjects.map((project) => (
                                <Link
                                    key={project.slug}
                                    href={lp(`/work/${project.slug}`)}
                                    className="glass-card hover-glow card overflow-hidden"
                                >
                                    <div className="aspect-[16/10] bg-muted">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={project.screenshot}
                                            alt={`${project.name} homepage`}
                                            className="h-full w-full object-cover object-top"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold">{project.name}</h3>
                                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                            {isEl && project.summaryEl ? project.summaryEl : project.summary}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="section bg-muted/30">
                    <div className="container max-w-3xl">
                        <FAQSection faqs={faqItems} title={t.faqTitle} />
                    </div>
                </section>

                {/* CTA */}
                <section className="section gradient-primary text-white">
                    <div className="container text-center">
                        <h2 className="text-3xl font-bold mb-4">{t.ctaTitle}</h2>
                        <p className="text-white/80 mb-8">{t.ctaDesc}</p>
                        <Link href={lp(`/get-started?service=${serviceSlug}`)} className="btn bg-white text-primary hover:bg-white/90">
                            {t.ctaButton}
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
