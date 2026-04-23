import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
    title: 'Pricing | Website Creation Packages',
    description: 'Transparent pricing for website creation, redesign, and SEO services. Choose the package that fits your business needs and budget.',
    path: '/pricing',
});

const packages = [
    {
        name: 'Starter',
        description: 'Perfect for small businesses and startups getting online',
        price: 899,
        originalPrice: 1499,
        features: [
            'Up to 5 pages',
            'Mobile responsive design',
            'Contact form',
            'Basic SEO setup',
            'Speed optimized',
            '1 revision round',
            '2-week delivery',
        ],
        cta: 'Get Started',
        popular: false,
    },
    {
        name: 'Professional',
        description: 'Ideal for growing businesses that need more features',
        price: 1799,
        originalPrice: 2999,
        features: [
            'Up to 10 pages',
            'Custom design',
            'Advanced contact forms',
            'Full SEO optimization',
            'Blog/News section',
            'Social media integration',
            '2 revision rounds',
            '3-week delivery',
            'Analytics setup',
        ],
        cta: 'Most Popular',
        popular: true,
    },
    {
        name: 'Business',
        description: 'Complete solution for established businesses',
        price: 2999,
        originalPrice: 4999,
        features: [
            'Up to 20 pages',
            'Premium custom design',
            'E-commerce ready',
            'Full SEO + local SEO',
            'CMS integration',
            'Email marketing setup',
            'Unlimited revisions',
            '4-week delivery',
            'Priority support',
            '3 months maintenance',
        ],
        cta: 'Go Business',
        popular: false,
    },
];

const addOns = [
    { name: 'Logo Design', price: 299 },
    { name: 'Content Writing (per page)', price: 99 },
    { name: 'Additional Pages', price: 149 },
    { name: 'E-commerce Setup', price: 499 },
    { name: 'Monthly Maintenance', price: 199 },
    { name: 'SEO Monthly Package', price: 399 },
];

export default function PricingPage() {
    return (
        <>
            <Header />
            <main className="main-below-header">
                {/* Hero */}
                <section className="section-compact gradient-hero">
                    <div className="container text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                            Simple, Transparent Pricing
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            No hidden fees. No surprises. Choose the package that fits your business
                            and get a fast, professional website that drives results.
                        </p>
                    </div>
                </section>

                {/* Pricing Cards */}
                <section className="section -mt-8">
                    <div className="container">
                        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {packages.map((pkg) => (
                                <div
                                    key={pkg.name}
                                    className={`card p-6 relative ${pkg.popular ? 'border-primary ring-2 ring-primary/20' : ''}`}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-primary text-white text-xs font-semibold">
                                            Most Popular
                                        </div>
                                    )}

                                    <div className="text-center mb-6">
                                        <h2 className="text-xl font-bold mb-2">{pkg.name}</h2>
                                        <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                                        <div className="flex flex-col items-center justify-center gap-0">
                                            {pkg.originalPrice && (
                                                <span className="text-lg text-muted-foreground line-through decoration-destructive/50 decoration-2">
                                                    ${pkg.originalPrice.toLocaleString()}
                                                </span>
                                            )}
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-4xl font-bold">${pkg.price.toLocaleString()}</span>
                                                <span className="text-muted-foreground text-sm">one-time</span>
                                            </div>
                                        </div>
                                    </div>

                                    <ul className="space-y-3 mb-6">
                                        {pkg.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-2 text-sm">
                                                <svg className="w-5 h-5 text-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href={`/get-started?package=${pkg.name.toLowerCase()}`}
                                        className={`btn w-full ${pkg.popular ? 'btn-gradient' : 'btn-outline'}`}
                                    >
                                        {pkg.cta}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Add-ons */}
                <section className="section bg-muted/30">
                    <div className="container">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Optional Add-ons</h2>
                            <p className="text-muted-foreground">
                                Enhance your package with additional services
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                            {addOns.map((addon) => (
                                <div key={addon.name} className="card p-4 flex items-center justify-between">
                                    <span className="font-medium">{addon.name}</span>
                                    <span className="text-primary font-semibold">${addon.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="section">
                    <div className="container max-w-3xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>

                        <div className="space-y-4">
                            <div className="card p-6">
                                <h3 className="font-semibold mb-2">What&apos;s included in the price?</h3>
                                <p className="text-sm text-muted-foreground">
                                    Each package includes design, development, basic SEO setup, mobile optimization,
                                    and hosting setup guidance. You&apos;ll receive all source files upon completion.
                                </p>
                            </div>
                            <div className="card p-6">
                                <h3 className="font-semibold mb-2">How long does it take?</h3>
                                <p className="text-sm text-muted-foreground">
                                    Delivery times vary by package: Starter (2 weeks), Professional (3 weeks),
                                    Business (4 weeks). These are from project kickoff after receiving all content.
                                </p>
                            </div>
                            <div className="card p-6">
                                <h3 className="font-semibold mb-2">What if I need changes later?</h3>
                                <p className="text-sm text-muted-foreground">
                                    Revisions during the project are included. After launch, you can purchase
                                    our monthly maintenance plan or request changes on an hourly basis.
                                </p>
                            </div>
                            <div className="card p-6">
                                <h3 className="font-semibold mb-2">Do I need to provide content?</h3>
                                <p className="text-sm text-muted-foreground">
                                    Yes, you&apos;ll need to provide text content and images. If you need help,
                                    we offer content writing services as an add-on.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="section gradient-primary text-white">
                    <div className="container text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                        <p className="text-white/80 mb-8">
                            Choose your package and launch your new website in weeks, not months.
                        </p>
                        <Link href="/get-started" className="btn bg-white text-primary hover:bg-white/90">
                            Start Your Project
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
