import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { services } from '@/data/services';
import { industries, getIndustryBySlug, getAllIndustrySlugs } from '@/data/industries';
import { tier1Locations } from '@/data/locations';
import { buildIndustryMetadata } from '@/lib/seo';

interface PageProps {
    params: Promise<{ industry: string }>;
}

// Generate static paths for all industries
export async function generateStaticParams() {
    return getAllIndustrySlugs().map((slug) => ({
        industry: slug,
    }));
}

// Generate metadata for each industry
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { industry: industrySlug } = await params;
    const industry = getIndustryBySlug(industrySlug);

    if (!industry) {
        return { title: 'Industry Not Found' };
    }

    return buildIndustryMetadata(industry);
}

export default async function IndustryPage({ params }: PageProps) {
    const { industry: industrySlug } = await params;
    const industry = getIndustryBySlug(industrySlug);

    if (!industry) {
        notFound();
    }

    // Related industries
    const relatedIndustries = industries.filter((i) => i.slug !== industrySlug).slice(0, 4);

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
                                <Link href="/solutions" className="hover:text-primary">Solutions</Link>
                                <span>/</span>
                                <span className="text-foreground">{industry.name}</span>
                            </nav>

                            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                                Website Solutions for {industry.name}
                            </h1>

                            {/* Description under H1 */}
                            <p className="text-lg text-muted-foreground mb-8">
                                {industry.description}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link href="/contact" className="btn btn-gradient">
                                    Get {industry.name} Quote
                                </Link>
                                <Link href="#services" className="btn btn-outline">
                                    View Services
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pain Points */}
                <section className="section">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            What {industry.name} Websites Need
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl">
                            We understand the unique challenges and requirements of {industry.name.toLowerCase()} businesses.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {industry.painPoints.map((point, i) => (
                                <div key={i} className="card p-6 text-center hover-glow">
                                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white mx-auto mb-4">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="font-medium">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services for Industry */}
                <section className="section bg-muted/30" id="services">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            Services for {industry.name}
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl">
                            Choose the service that best fits your {industry.name.toLowerCase()} business needs.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service) => (
                                <Link
                                    key={service.slug}
                                    href={`/solutions/${industrySlug}/${service.slug}`}
                                    className="card p-6 hover-glow"
                                >
                                    <h3 className="font-semibold mb-2">{service.name}</h3>
                                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                                    <span className="text-primary text-sm font-medium">
                                        Learn more →
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Locations */}
                <section className="section">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            {industry.name} Websites by City
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Local {industry.name.toLowerCase()} website services across the USA.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {tier1Locations.slice(0, 18).map((location) => (
                                <Link
                                    key={location.slug}
                                    href={`/services/website-creation/${location.slug}`}
                                    className="px-3 py-2 text-sm text-center rounded-lg border border-border hover:border-primary hover:text-primary bg-background transition-smooth"
                                >
                                    {location.city}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Related Industries */}
                <section className="section bg-muted/30">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Related Industries</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {relatedIndustries.map((related) => (
                                <Link
                                    key={related.slug}
                                    href={`/solutions/${related.slug}`}
                                    className="card p-4 text-center hover-glow"
                                >
                                    <span className="font-medium">{related.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="section gradient-primary text-white">
                    <div className="container text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready to Build Your {industry.name} Website?
                        </h2>
                        <p className="text-white/80 mb-8">
                            Get a custom quote for your {industry.name.toLowerCase()} business.
                        </p>
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
