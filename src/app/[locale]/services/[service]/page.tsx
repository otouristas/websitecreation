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
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { buildServiceMetadata, generateArticleSchema, generateBreadcrumbSchema, generateServiceSchema, generateFAQSchema, combineSchemas } from '@/lib/seo';
import { SchemaMarkup, Breadcrumbs, FAQSection } from '@/components/seo';
import ServiceHubCommercialBody from '@/components/seo/ServiceHubCommercialBody';
import { getServiceBreadcrumbs, getServiceHubRelatedPaths } from '@/lib/linking';
import { getServiceFaqs } from '@/data/service-faq-data';
import { getServiceHubCommercial } from '@/data/service-hub-commercial';
import { getFeaturedPortfolio } from '@/data/portfolio';
import RelatedPages from '@/components/seo/RelatedPages';

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

    return buildServiceMetadata(service, locale as SiteLocale);
}

export default async function ServicePage({ params }: PageProps) {
    const { locale, service: serviceSlug } = await params;
    if (!isValidLocale(locale)) notFound();
    const service = getServiceBySlug(serviceSlug);

    if (!service) {
        notFound();
    }

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
    const proofProjects = getFeaturedPortfolio(3);

    // Generate schema markup
    const schemas = combineSchemas(
        generateBreadcrumbSchema({ items: breadcrumbs }),
        generateServiceSchema({
            name: displayName,
            description: displayDesc,
            provider: { name: 'AnotherSEOGuru', url: 'https://anotherseoguru.com' },
            serviceType: 'Web Development',
        }),
        generateArticleSchema({
            headline: displayName,
            description: displayDesc,
            datePublished: new Date().toISOString(),
            dateModified: new Date().toISOString(),
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

    return (
        <>
            <SchemaMarkup schemas={schemas} />
            <Header />
            <main className="main-below-header">
                {/* Hero */}
                <section className="section-compact gradient-hero">
                    <div className="container">
                        <div className="max-w-3xl">
                            {/* Breadcrumb */}
                            <Breadcrumbs items={breadcrumbs} className="mb-6" />

                            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                                {displayName}
                            </h1>

                            {/* Description under H1 */}
                            <p className="text-lg text-muted-foreground mb-8">
                                {displayDesc}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link href={lp(`/get-started?service=${serviceSlug}`)} className="btn btn-gradient">
                                    {t.getQuote}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <Link href="#locations" className="btn btn-outline">
                                    {t.viewByLocation}
                                </Link>
                                <Link href={lp('/pricing')} className="btn btn-outline">
                                    {t.pricingLink}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {commercial ? (
                    <ServiceHubCommercialBody commercial={commercial} locale={locale as SiteLocale} />
                ) : null}

                {/* Features */}
                <section className="section">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8">{t.whatsIncluded}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {displayFeatures.map((feature, i) => (
                                <div key={i} className="glass-card hover-glow flex items-start gap-3 p-4 rounded-xl">
                                    <svg className="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Location Pages */}
                <section className="section bg-muted/30" id="locations">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            {t.byCity}
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl">
                            {t.byCityDesc}
                        </p>

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
                        <div className="text-center mt-6">
                            <Link href={lp("/locations")} className="text-primary hover:underline text-sm font-medium">
                                {t.allCities}
                            </Link>
                        </div>
                    </div>
                </section>

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
                                        href={lp(`/solutions/${industry.slug}/${serviceSlug}`)}
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
