import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { services, getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import { industries, getIndustryBySlug, getAllIndustrySlugs } from '@/data/industries';
import { tier1Locations } from '@/data/locations';
import { buildIndustryServiceMetadata, generateArticleSchema, generateBreadcrumbSchema, generateServiceSchema, combineSchemas } from '@/lib/seo';
import { SchemaMarkup, Breadcrumbs } from '@/components/seo';
import { getIndustryServiceBreadcrumbs } from '@/lib/linking';

interface PageProps {
    params: Promise<{ industry: string; service: string }>;
}

// ISR: Revalidate every hour
export const revalidate = 3600;

// Generate static paths for industry × service combinations
export async function generateStaticParams() {
    const industrySlugs = getAllIndustrySlugs();
    const serviceSlugs = getAllServiceSlugs();

    const paths: { industry: string; service: string }[] = [];

    for (const industry of industrySlugs) {
        for (const service of serviceSlugs) {
            paths.push({ industry, service });
        }
    }

    return paths;
}

// Generate unique metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { industry: industrySlug, service: serviceSlug } = await params;
    const industry = getIndustryBySlug(industrySlug);
    const service = getServiceBySlug(serviceSlug);

    if (!industry || !service) {
        return { title: 'Page Not Found' };
    }

    return buildIndustryServiceMetadata(industry, service);
}

export default async function IndustryServicePage({ params }: PageProps) {
    const { industry: industrySlug, service: serviceSlug } = await params;
    const industry = getIndustryBySlug(industrySlug);
    const service = getServiceBySlug(serviceSlug);

    if (!industry || !service) {
        notFound();
    }

    // Related services for this industry
    const relatedServices = services.filter((s) => s.slug !== serviceSlug).slice(0, 3);

    // Related industries for this service
    const relatedIndustries = industries.filter((i) => i.slug !== industrySlug).slice(0, 4);

    // Generate breadcrumbs
    const breadcrumbs = getIndustryServiceBreadcrumbs(industry.name, industrySlug, service.name, serviceSlug);

    // Generate schemas
    const schemas = combineSchemas(
        generateBreadcrumbSchema({ items: breadcrumbs }),
        generateServiceSchema({
            name: `${service.name} for ${industry.name}`,
            description: `Professional ${service.name.toLowerCase()} for ${industry.name.toLowerCase()} businesses`,
            provider: { name: 'AnotherSEOGuru', url: 'https://anotherseoguru.com' },
            serviceType: 'Web Development',
        }),
        generateArticleSchema({
            headline: `${service.name} for ${industry.name}`,
            description: `Professional ${service.name.toLowerCase()} tailored for ${industry.name.toLowerCase()} businesses`,
            datePublished: new Date().toISOString(),
            dateModified: new Date().toISOString(),
            author: { name: 'AnotherSEOGuru' },
        })
    );

    return (
        <>
            <SchemaMarkup schemas={schemas} />
            <Header />
            <main className="pt-32">
                {/* Hero */}
                <section className="section gradient-hero">
                    <div className="container">
                        <div className="max-w-3xl">
                            {/* Breadcrumb */}
                            <Breadcrumbs items={breadcrumbs} className="mb-6" />

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                                {service.name} for {industry.name}
                            </h1>

                            {/* Description under H1 */}
                            <p className="text-lg text-muted-foreground mb-8">
                                Looking for professional {service.name.toLowerCase()} tailored specifically for
                                {industry.name.toLowerCase()} businesses? We build fast, SEO-optimized websites
                                that address the unique needs of the {industry.name.toLowerCase()} industry.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link href="/contact" className="btn btn-gradient">
                                    Get {industry.name} Quote
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <Link href={`/solutions/${industrySlug}`} className="btn btn-outline">
                                    All {industry.name} Services
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What's Included */}
                <section className="section">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            What&apos;s Included for {industry.name}
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl">
                            Our {service.name.toLowerCase()} for {industry.name.toLowerCase()} includes everything
                            needed for a high-performing, industry-specific website.
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

                {/* Industry Pain Points */}
                <section className="section bg-muted/30">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            Built for {industry.name} Needs
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            We understand the unique challenges of {industry.name.toLowerCase()} businesses.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {industry.painPoints.map((point, i) => (
                                <div key={i} className="card p-6 text-center">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="font-medium text-sm">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Locations */}
                <section className="section">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            {service.name} for {industry.name} by City
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Local services for {industry.name.toLowerCase()} businesses across the USA.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {tier1Locations.slice(0, 18).map((location) => (
                                <Link
                                    key={location.slug}
                                    href={`/services/${serviceSlug}/${location.slug}`}
                                    className="px-3 py-2 text-sm text-center rounded-lg border border-border hover:border-primary hover:text-primary bg-background transition-smooth"
                                >
                                    {location.city}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Other Services for Industry */}
                <section className="section bg-muted/30">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8">
                            Other Services for {industry.name}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedServices.map((related) => (
                                <Link
                                    key={related.slug}
                                    href={`/solutions/${industrySlug}/${related.slug}`}
                                    className="card p-6 hover-glow"
                                >
                                    <h3 className="font-semibold mb-2">{related.name}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{related.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Other Industries */}
                <section className="section">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8">
                            {service.name} for Other Industries
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {relatedIndustries.map((related) => (
                                <Link
                                    key={related.slug}
                                    href={`/solutions/${related.slug}/${serviceSlug}`}
                                    className="card p-4 text-center hover-glow"
                                >
                                    <span className="font-medium text-sm">{related.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="section gradient-primary text-white">
                    <div className="container text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready for {service.name}?
                        </h2>
                        <p className="text-white/80 mb-8">
                            Get a custom quote for your {industry.name.toLowerCase()} business today.
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
