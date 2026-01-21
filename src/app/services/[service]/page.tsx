import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { services, getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import { industries } from '@/data/industries';
import { tier1Locations } from '@/data/locations';
import { buildServiceMetadata } from '@/lib/seo';

interface PageProps {
    params: Promise<{ service: string }>;
}

// Generate static paths for all services
export async function generateStaticParams() {
    return getAllServiceSlugs().map((slug) => ({
        service: slug,
    }));
}

// Generate metadata for each service
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { service: serviceSlug } = await params;
    const service = getServiceBySlug(serviceSlug);

    if (!service) {
        return { title: 'Service Not Found' };
    }

    return buildServiceMetadata(service);
}

export default async function ServicePage({ params }: PageProps) {
    const { service: serviceSlug } = await params;
    const service = getServiceBySlug(serviceSlug);

    if (!service) {
        notFound();
    }

    // Related services (excluding current)
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
                            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                                <Link href="/" className="hover:text-primary">Home</Link>
                                <span>/</span>
                                <Link href="/services" className="hover:text-primary">Services</Link>
                                <span>/</span>
                                <span className="text-foreground">{service.name}</span>
                            </nav>

                            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                                {service.name}
                            </h1>

                            {/* Description under H1 */}
                            <p className="text-lg text-muted-foreground mb-8">
                                {service.description}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link href="/contact" className="btn btn-gradient">
                                    Get a Quote
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <Link href="#locations" className="btn btn-outline">
                                    View by Location
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="section">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8">What&apos;s Included</h2>
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

                {/* Location Pages */}
                <section className="section bg-muted/30" id="locations">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            {service.name} by City
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl">
                            We provide {service.name.toLowerCase()} services to businesses across the United States.
                            Select your city for local pricing and availability.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {tier1Locations.slice(0, 30).map((location) => (
                                <Link
                                    key={location.slug}
                                    href={`/services/${serviceSlug}/${location.slug}`}
                                    className="px-3 py-2 text-sm text-center rounded-lg border border-border hover:border-primary hover:text-primary bg-background transition-smooth"
                                >
                                    {location.city}
                                </Link>
                            ))}
                        </div>
                        <div className="text-center mt-6">
                            <Link href="/locations" className="text-primary hover:underline text-sm font-medium">
                                View all 100+ cities →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Industry Pages */}
                <section className="section">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            {service.name} for Industries
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl">
                            Specialized {service.name.toLowerCase()} tailored for specific business types and niches.
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

                {/* Related Services */}
                <section className="section bg-muted/30">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Related Services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedServices.map((related) => (
                                <Link
                                    key={related.slug}
                                    href={`/services/${related.slug}`}
                                    className="card p-6 hover-glow"
                                >
                                    <h3 className="font-semibold mb-2">{related.name}</h3>
                                    <p className="text-sm text-muted-foreground">{related.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="section gradient-primary text-white">
                    <div className="container text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
                        <p className="text-white/80 mb-8">Get a free quote for {service.name.toLowerCase()} today.</p>
                        <Link href="/contact" className="btn bg-white text-primary hover:bg-white/90">
                            Get Free Quote
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
