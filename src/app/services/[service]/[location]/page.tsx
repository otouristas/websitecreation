import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { services, getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import { industries } from '@/data/industries';
import {
    getLocationBySlug,
    getTier1LocationSlugs,
    formatLocationName,
    stateNames,
    getNearbyLocations,
    isGreekLocation,
} from '@/data/locations';
import {
    buildServiceLocationMetadata,
    generateBreadcrumbSchema,
    generateLocalBusinessSchema,
    generateServiceSchema,
    generateFAQSchema,
    combineSchemas,
    BASE_URL,
} from '@/lib/seo';
import { SchemaMarkup, Breadcrumbs, LocationContent } from '@/components/seo';
import { getServiceLocationBreadcrumbs } from '@/lib/linking';
import { grServiceLocationPath } from '@/lib/locale-paths';

interface PageProps {
    params: Promise<{ service: string; location: string }>;
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
    const { service: serviceSlug, location: locationSlug } = await params;
    const service = getServiceBySlug(serviceSlug);
    const location = getLocationBySlug(locationSlug);

    if (!service || !location) {
        return { title: 'Page Not Found' };
    }

    return buildServiceLocationMetadata(service, location);
}

export default async function ServiceLocationPage({ params }: PageProps) {
    const { service: serviceSlug, location: locationSlug } = await params;
    const service = getServiceBySlug(serviceSlug);
    const location = getLocationBySlug(locationSlug);

    if (!service || !location) {
        notFound();
    }

    const cityState = formatLocationName(location);
    const stateFull =
        location.countryCode === 'US'
            ? stateNames[location.stateCode] || location.state
            : location.state;
    const regionLabel =
        location.countryCode === 'US' ? stateFull : location.country;

    const nearbyCities = getNearbyLocations(location, 6);
    const relatedServices = services.filter((s) => s.slug !== serviceSlug).slice(0, 3);
    const breadcrumbs = getServiceLocationBreadcrumbs(service.name, serviceSlug, location.city, locationSlug);

    const pageUrl = `${BASE_URL}/services/${serviceSlug}/${locationSlug}`;

    const faqItems = [
        {
            question: `How fast can my ${location.city} website go live?`,
            answer: `Depending on scope, most ${service.name.toLowerCase()} projects in ${location.city} launch in 2–8 weeks once content and approvals are ready. We work in ${location.currency} and align timelines to your market.`,
        },
        {
            question: `Do you offer ${service.name.toLowerCase()} for local SEO in ${location.city}?`,
            answer: `Yes. We build location pages, internal links, schema, and GBP strategy so ${location.city} businesses rank for commercial and "near me" queries.`,
        },
        {
            question: `What makes your ${location.city} sites rank in Google and AI search?`,
            answer: `Technical SEO, semantic clustering from Search Console, GEO/AEO structured content, and fast Core Web Vitals — not thin template pages.`,
        },
    ];

    const schemas = combineSchemas(
        generateBreadcrumbSchema({ items: breadcrumbs }),
        generateFAQSchema({ faqs: faqItems }),
        generateLocalBusinessSchema({
            name: `${service.name} - ${cityState}`,
            description: `Professional ${service.name.toLowerCase()} services in ${cityState}`,
            url: pageUrl,
            address: {
                addressLocality: location.city,
                addressRegion: location.stateCode,
                addressCountry: location.countryCode,
            },
            geo: {
                latitude: location.latitude,
                longitude: location.longitude,
            },
        }),
        generateServiceSchema({
            name: service.name,
            description: service.description,
            provider: { name: 'AnotherSEOGuru', url: BASE_URL },
            areaServed: [location.city, location.country],
            serviceType: service.name,
        }),
    );

    return (
        <>
            <SchemaMarkup schemas={schemas} />
            <Header />
            <main className="main-below-header">
                <section className="section-compact gradient-hero">
                    <div className="container">
                        <div className="max-w-3xl">
                            <Breadcrumbs items={breadcrumbs} className="mb-6" />

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                                {service.name} in {cityState}
                            </h1>

                            <p className="text-lg text-muted-foreground mb-4">
                                Looking for professional {service.name.toLowerCase()} in {location.city},{' '}
                                {regionLabel}? We build fast, SEO-ready websites that rank in Google and AI
                                search — with transparent pricing in {location.currency}.
                            </p>

                            {isGreekLocation(location) && (
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
                                <Link href="/contact" className="btn btn-gradient">
                                    Get {location.city} Quote
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <Link href={`/services/${serviceSlug}`} className="btn btn-outline">
                                    All Locations
                                </Link>
                                <Link href="/locations" className="btn btn-outline">
                                    Browse Cities
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            What&apos;s Included in {location.city}
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl">
                            Our {service.name.toLowerCase()} services for {location.city} businesses include
                            everything you need for a high-performing website in {location.country}.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {service.features.map((feature, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                                    <svg className="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section bg-white">
                    <div className="container">
                        <LocationContent location={location} service={service} />
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            {service.name} for {location.city} Industries
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Specialized solutions for different business types in {location.city}.
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                            {industries.map((industry) => (
                                <Link
                                    key={industry.slug}
                                    href={`/solutions/${industry.slug}/${serviceSlug}`}
                                    className="px-4 py-3 text-sm text-center rounded-lg border border-border hover:border-primary hover:text-primary bg-background transition-smooth"
                                >
                                    {industry.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {nearbyCities.length > 0 && (
                    <section className="section bg-muted/30">
                        <div className="container">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                                Also Serving Nearby {regionLabel} Cities
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                                {nearbyCities.map((city) => (
                                    <Link
                                        key={city.slug}
                                        href={`/services/${serviceSlug}/${city.slug}`}
                                        className="px-3 py-2 text-sm text-center rounded-lg border border-border hover:border-primary hover:text-primary bg-background transition-smooth"
                                    >
                                        {city.city}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section className="section">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8">
                            Other Services in {location.city}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedServices.map((related) => (
                                <Link
                                    key={related.slug}
                                    href={`/services/${related.slug}/${locationSlug}`}
                                    className="card p-6 hover-glow"
                                >
                                    <h3 className="font-semibold mb-2">{related.name}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{related.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section bg-muted/30">
                    <div className="container max-w-3xl">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
                            Frequently Asked Questions — {location.city}
                        </h2>
                        <div className="space-y-4">
                            {faqItems.map((item) => (
                                <div key={item.question} className="card p-6">
                                    <h3 className="font-semibold mb-2">{item.question}</h3>
                                    <p className="text-muted-foreground text-sm">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section gradient-primary text-white">
                    <div className="container text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready for {service.name} in {location.city}?
                        </h2>
                        <p className="text-white/80 mb-8">
                            Get a free quote tailored for your {location.city} business — pricing in{' '}
                            {location.currency}.
                        </p>
                        <Link href="/contact" className="btn bg-white text-primary hover:bg-white/90">
                            Get Free {location.city} Quote
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
