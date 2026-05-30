import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { services } from '@/data/services';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
    title: 'Our Services | SEO Web Design Agency',
    description: 'Explore our comprehensive web design and SEO services. From custom website creation to speed optimization and AI visibility.',
    path: '/services',
});

export default function ServicesPage() {
    return (
        <>
            <Header />
            <main className="main-below-header min-h-screen pb-16">
                <section className="container">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                            Our <span className="gradient-text">Services</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Comprehensive digital solutions to help your business grow.
                            From stunning web design to technical SEO optimization.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className="card p-8 hover-glow group flex flex-col h-full"
                            >
                                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-smooth shadow-lg shadow-primary/20">
                                    {/* We can map the icon string to an actual SVG if needed, but for now reusing the logic from Home/Header or just a generic icon if the icon string isn't directly usable as an icon component. 
                      However, in the home page it seemed they might be using a generic icon or the icon field wasn't fully utilized in the snippet I saw.
                      Actually, looking at Home page (line 108), it uses a hardcoded path for the icon in the map? 
                      No, line 108 in Home page has a static SVG path: "M13 10V3L4 14h7v7l9-11h-7z".
                      Realistically I should use the `icon` field from service object if I can map it, but I don't see an Icon component map. 
                      I'll stick to a nice generic icon or try to use lucide-react if available?
                      The project seems to use SVGs directly.
                      I'll use a generic "layer" or "grid" icon for all, or just the same lightning icon as home page for consistency until better icons are available.
                   */}
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>

                                <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                    {service.name}
                                </h2>

                                <p className="text-muted-foreground mb-6 flex-grow">
                                    {service.description}
                                </p>

                                <div className="space-y-2 mb-6">
                                    {service.features.slice(0, 3).map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            {feature}
                                        </div>
                                    ))}
                                    {service.features.length > 3 && (
                                        <div className="text-xs text-muted-foreground pl-3.5">+ {service.features.length - 3} more features</div>
                                    )}
                                </div>

                                <div className="flex items-center text-primary font-medium mt-auto group-hover:translate-x-1 transition-transform">
                                    Learn more
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container mt-24">
                    <div className="bg-muted/30 rounded-3xl p-8 sm:p-12 text-center border border-border relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-4">Not sure what you need?</h2>
                            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                                Book a free consultation with our experts. We'll analyze your current online presence and recommend the best strategy for your growth.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/contact" className="btn btn-gradient px-8 py-3">
                                    Get a Free Quote
                                </Link>
                                <Link href="/pricing" className="btn btn-outline px-8 py-3 bg-background">
                                    View Pricing
                                </Link>
                            </div>
                        </div>

                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
