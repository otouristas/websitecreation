import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { services, getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import { industries } from '@/data/industries';
import { allLocations, getLocationBySlug, getAllLocationSlugs, formatLocationName, stateNames } from '@/data/locations';
import { buildServiceLocationMetadata } from '@/lib/seo';

interface PageProps {
    params: Promise<{ service: string; location: string }>;
}

// Generate static paths for service × location combinations
export async function generateStaticParams() {
    const serviceSlugs = getAllServiceSlugs();
    const locationSlugs = getAllLocationSlugs();

    const paths: { service: string; location: string }[] = [];

    for (const service of serviceSlugs) {
        for (const location of locationSlugs) {
            paths.push({ service, location });
        }
    }

    return paths;
}

// Generate unique metadata for each page
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
    const stateFull = stateNames[location.stateCode] || location.state;

    // Nearby cities (same state, different city)
    const nearbyCities = allLocations
        .filter((l) => l.stateCode === location.stateCode && l.slug !== location.slug)
        .slice(0, 6);

    // Related services
    const relatedServices = services.filter((s) => s.slug !== serviceSlug).slice(0, 3);

    return (
        <>
            <Header />
            <main className="pt-32">
                {/* Hero */}
                <section className="section gradient-hero">
                    <div className="container">
                        <div className="max-w-3xl">
                            {/* Breadcrumb */}
                            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
                                <Link href="/" className="hover:text-primary">Home</Link>
                                <span>/</span>
                                <Link href="/services" className="hover:text-primary">Services</Link>
                                <span>/</span>
                                <Link href={`/services/${serviceSlug}`} className="hover:text-primary">{service.name}</Link>
                                <span>/</span>
                                <span className="text-foreground">{location.city}</span>
                            </nav>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                                {service.name} in {cityState}
                            </h1>

                            {/* Description under H1 - unique per location */}
                            <p className="text-lg text-muted-foreground mb-8">
                                Looking for professional {service.name.toLowerCase()} in {location.city}, {stateFull}?
                                We build fast, beautiful websites that rank well in search and convert visitors into customers.
                                Get a custom quote for your {location.city} business.
                            </p>

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
                            </div>
                        </div>
                    </div>
                </section>

                {/* What's Included */}
                <section className="section">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            What&apos;s Included in {location.city}
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl">
                            Our {service.name.toLowerCase()} services for {location.city} businesses include everything
                            you need for a high-performing website.
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

                {/* Why Local Matters */}
                <section className="section bg-muted/30">
                    <div className="container">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                                    Why Choose Us for {location.city}
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    As a business serving {location.city} and {stateFull}, your website needs to perform
                                    exceptionally in local search results while maintaining fast load times for all visitors.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Local SEO optimization for {location.city} search visibility</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Fast websites optimized for {stateFull} customers</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Schema markup for local business visibility</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Speed-optimized for fast load times</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="card p-8 text-center">
                                <div className="text-5xl font-bold gradient-text mb-2">500+</div>
                                <div className="text-muted-foreground mb-6">Websites Delivered</div>
                                <Link href="/get-started" className="btn btn-gradient w-full">
                                    Get Started in {location.city}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Industry Solutions */}
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

                {/* Nearby Cities */}
                {nearbyCities.length > 0 && (
                    <section className="section bg-muted/30">
                        <div className="container">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                                Also Serving Nearby {stateFull} Cities
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

                {/* Other Services */}
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

                {/* FAQ */}
                <section className="section bg-muted/30">
                    <div className="container max-w-3xl">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            <div className="card p-6">
                                <h3 className="font-semibold mb-2">How fast can my {location.city} website go live?</h3>
                                <p className="text-muted-foreground text-sm">
                                    Depending on the scope, a basic website can launch within 2-4 weeks once all assets and content are ready.
                                    More complex projects may take 4-8 weeks.
                                </p>
                            </div>
                            <div className="card p-6">
                                <h3 className="font-semibold mb-2">Do you handle content for {location.city} businesses?</h3>
                                <p className="text-muted-foreground text-sm">
                                    Yes! We offer content creation services including service pages, location pages, and blog content
                                    optimized for {location.city} search visibility.
                                </p>
                            </div>
                            <div className="card p-6">
                                <h3 className="font-semibold mb-2">What makes your websites fast?</h3>
                                <p className="text-muted-foreground text-sm">
                                    We use modern development practices and performance optimization techniques
                                    to ensure your website loads quickly on all devices.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="section gradient-primary text-white">
                    <div className="container text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready for {service.name} in {location.city}?
                        </h2>
                        <p className="text-white/80 mb-8">
                            Get a free quote tailored for your {location.city} business today.
                        </p>
                        <Link href="/contact" className="btn bg-white text-primary hover:bg-white/90">
                            Get Free {location.city} Quote
                        </Link>
                    </div>
                </section>
            </main >
            <Footer />
        </>
    );
}
