import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
    allLocations,
    groupLocationsByCountry,
    groupUSLocationsByState,
    COUNTRY_LABELS,
    globalTier1Locations,
} from '@/data/locations';
import { services } from '@/data/services';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
    title: 'Locations | Web Design & SEO Services Worldwide',
    description:
        'Professional website creation, SEO, GEO and AEO services in 120+ cities across the USA, Greece, UK, Canada, Australia, and global hubs. Find your city.',
    path: '/locations',
    primaryKeyword: 'website creation by city',
});

const REGION_ORDER = ['US', 'GR', 'GB', 'CA', 'AU', 'FR', 'DE', 'IT', 'JP', 'AE', 'SG'] as const;

export default function LocationsPage() {
    const byCountry = groupLocationsByCountry();
    const usByState = groupUSLocationsByState();
    const usStates = Object.keys(usByState).sort();

    return (
        <>
            <Header />
            <main className="main-below-header">
                <section className="section-compact gradient-hero">
                    <div className="container">
                        <div className="max-w-3xl">
                            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                                <Link href="/" className="hover:text-primary">Home</Link>
                                <span>/</span>
                                <span className="text-foreground">Locations</span>
                            </nav>

                            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                                Website Creation by City — Worldwide
                            </h1>
                            <p className="text-lg text-muted-foreground mb-4">
                                We provide website creation, SEO web design, GEO/AEO, and development services
                                to businesses in {allLocations.length}+ cities across the United States, Greece,
                                Europe, and global hubs.
                            </p>
                            <p className="text-sm text-muted-foreground mb-8">
                                <Link href="/gr/locations" hrefLang="el" className="text-primary font-medium hover:underline">
                                    Πόλεις στην Ελλάδα (Ελληνικά) →
                                </Link>
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link href="/get-started" className="btn btn-gradient">
                                    Get Started
                                </Link>
                                <Link href="/pricing" className="btn btn-outline">
                                    View Pricing
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Top Cities Globally</h2>
                        <p className="text-muted-foreground mb-8">
                            Select your city for local pricing, availability, and service pages
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {globalTier1Locations.slice(0, 36).map((location) => (
                                <Link
                                    key={location.slug}
                                    href={`/services/website-creation/${location.slug}`}
                                    className="card p-4 text-center hover-glow"
                                >
                                    <div className="font-semibold">{location.city}</div>
                                    <div className="text-xs text-muted-foreground">
                                        {location.countryCode === 'US'
                                            ? location.stateCode
                                            : location.countryCode}
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <p className="text-center mt-6 text-sm text-muted-foreground">
                            Showing 36 of {globalTier1Locations.length} priority cities
                        </p>
                    </div>
                </section>

                {REGION_ORDER.filter((code) => byCountry[code]?.length).map((countryCode) => (
                    <section
                        key={countryCode}
                        className={`section ${countryCode === 'US' ? '' : 'bg-muted/30'}`}
                    >
                        <div className="container">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                                {COUNTRY_LABELS[countryCode] ?? countryCode}
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                {byCountry[countryCode].length} cities · All services available
                            </p>

                            {countryCode === 'US' ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {usStates.map((state) => (
                                        <div key={state} className="card p-6">
                                            <h3 className="font-bold mb-4">{state}</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {usByState[state].map((loc) => (
                                                    <Link
                                                        key={loc.slug}
                                                        href={`/services/website-creation/${loc.slug}`}
                                                        className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                                                    >
                                                        {loc.city}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-3">
                                    {byCountry[countryCode].map((loc) => (
                                        <Link
                                            key={loc.slug}
                                            href={`/services/website-creation/${loc.slug}`}
                                            className="px-4 py-2 rounded-lg border border-border hover:border-primary hover:text-primary bg-background text-sm"
                                        >
                                            {loc.city}
                                            {loc.cityLocal ? ` (${loc.cityLocal})` : ''}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                ))}

                <section className="section">
                    <div className="container text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Available in Every City</h2>
                        <p className="text-muted-foreground mb-8">Every service × every location we cover</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
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

                <section className="section gradient-primary text-white">
                    <div className="container text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
                        <p className="text-white/80 mb-8">Get a custom quote for your city.</p>
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
