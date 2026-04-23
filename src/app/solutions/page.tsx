import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { industries } from '@/data/industries';
import { services } from '@/data/services';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
    title: 'Industry Solutions | Web Design by Business Type',
    description: 'Specialized website solutions for every industry. Find web design and SEO services tailored for restaurants, hotels, real estate, lawyers, doctors, and more.',
    path: '/solutions',
});

export default function SolutionsPage() {
    return (
        <>
            <Header />
            <main className="main-below-header">
                {/* Hero */}
                <section className="section-compact gradient-hero">
                    <div className="container">
                        <div className="max-w-3xl">
                            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                                <Link href="/" className="hover:text-primary">Home</Link>
                                <span>/</span>
                                <span className="text-foreground">Solutions</span>
                            </nav>

                            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                                Industry Solutions
                            </h1>
                            <p className="text-lg text-muted-foreground mb-8">
                                Every industry has unique needs. We build websites specifically designed
                                for your business type - with the features, design, and SEO focus that
                                helps you stand out and get found by your ideal customers.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link href="/pricing" className="btn btn-gradient">
                                    View Pricing
                                </Link>
                                <Link href="/get-started" className="btn btn-outline">
                                    Start Your Project
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Industries Grid */}
                <section className="section">
                    <div className="container">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {industries.map((industry) => (
                                <Link
                                    key={industry.slug}
                                    href={`/solutions/${industry.slug}`}
                                    className="card p-6 hover-glow group"
                                >
                                    <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-smooth">
                                        {industry.name}
                                    </h2>
                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                        {industry.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {industry.painPoints.slice(0, 3).map((point, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 text-xs bg-muted rounded"
                                            >
                                                {point}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-primary text-sm font-medium">
                                        View {industry.name} Solutions →
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services Cross-Reference */}
                <section className="section bg-muted/30">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
                            Our Services
                        </h2>
                        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                            Every industry solution includes access to our full range of services
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                            {services.map((service) => (
                                <Link
                                    key={service.slug}
                                    href={`/services/${service.slug}`}
                                    className="p-3 text-center rounded-lg border border-border hover:border-primary hover:text-primary bg-background transition-smooth text-sm"
                                >
                                    {service.shortName}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="section gradient-primary text-white">
                    <div className="container text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready to Build Your Industry Website?
                        </h2>
                        <p className="text-white/80 mb-8">
                            Get a custom quote tailored for your business type.
                        </p>
                        <Link href="/get-started" className="btn bg-white text-primary hover:bg-white/90">
                            Start Your Project
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
