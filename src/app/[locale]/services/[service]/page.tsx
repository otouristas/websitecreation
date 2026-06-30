import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { services, getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import { getServiceEl } from '@/data/services-i18n';
import { industries } from '@/data/industries';
import { tier1Locations, greeceLocations } from '@/data/locations';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { buildServiceMetadata, generateArticleSchema, generateBreadcrumbSchema, generateServiceSchema, combineSchemas } from '@/lib/seo';
import { SchemaMarkup, Breadcrumbs } from '@/components/seo';
import { getServiceBreadcrumbs } from '@/lib/linking';

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
            byCityDesc: `Παρέχουμε υπηρεσίες ${displayName.toLowerCase()} σε επιχειρήσεις σε όλη την Ελλάδα και διεθνώς. Επιλέξτε την πόλη σας για τοπικές λεπτομέρειες.`,
            allCities: 'Δείτε όλες τις τοποθεσίες →',
            forIndustries: `${displayName} για Κλάδους & Επιχειρήσεις`,
            forIndustriesDesc: `Εξειδικευμένες λύσεις ${displayName.toLowerCase()} προσαρμοσμένες στις ανάγκες της δικής σας δραστηριότητας.`,
            relatedServices: 'Σχετικές Υπηρεσίες',
            ctaTitle: 'Έτοιμοι να ξεκινήσουμε;',
            ctaDesc: `Ζητήστε μια δωρεάν προσφορά για ${displayName.toLowerCase()} σήμερα.`,
            ctaButton: 'Δωρεάν Προσφορά',
            getQuote: 'Ζητήστε Προσφορά',
            viewByLocation: 'Δείτε ανά Τοποθεσία',
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
          };

    const lp = (path: string) => localizedPath(locale as SiteLocale, path);

    // Related services (excluding current)
    const relatedServices = services.filter((s) => s.slug !== serviceSlug).slice(0, 3);

    // Generate breadcrumbs for navigation
    const breadcrumbs = getServiceBreadcrumbs(displayName, service.slug);

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
        })
    );

    const locationsToShow = isEl ? greeceLocations : tier1Locations.slice(0, 30);

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
                                <Link href={lp("/contact")} className="btn btn-gradient">
                                    {t.getQuote}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <Link href="#locations" className="btn btn-outline">
                                    {t.viewByLocation}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

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
                                const indName = isEl && industry.slug === 'rent-a-car'
                                  ? 'Rent-a-Car'
                                  : (isEl && industry.slug === 'hotels'
                                    ? 'Ξενοδοχεία'
                                    : (isEl && industry.slug === 'tour-operators'
                                      ? 'Εκδρομές & Tours'
                                      : industry.name));
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

                {/* CTA */}
                <section className="section gradient-primary text-white">
                    <div className="container text-center">
                        <h2 className="text-3xl font-bold mb-4">{t.ctaTitle}</h2>
                        <p className="text-white/80 mb-8">{t.ctaDesc}</p>
                        <Link href={lp("/contact")} className="btn bg-white text-primary hover:bg-white/90">
                            {t.ctaButton}
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
