import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { tier1Locations, allLocations } from '@/data/locations';
import { services } from '@/data/services';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
    title: 'Locations | Web Design Services Across the USA',
    description: 'Professional website design and SEO services in 100+ US cities. Find web designers near you in New York, Los Angeles, Chicago, Houston, and more.',
    path: '/locations',
});

// Group locations by state
function groupByState(locations: typeof allLocations) {
    const grouped: Record<string, typeof allLocations> = {};
    locations.forEach((loc) => {
        if (!grouped[loc.state]) {
            grouped[loc.state] = [];
        }
        grouped[loc.state].push(loc);
    });
    return grouped;
}

export default function LocationsPage() {
    const locationsByState = groupByState(allLocations);
    const states = Object.keys(locationsByState).sort();

    return (
        <>
            <Header />
            <main className="pt-32">
                {/* Hero */}
                <section className="section gradient-hero">
                    <div className="container">
                        <div className="max-w-3xl">
                            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                                <Link href="/" className="hover:text-primary">Home</Link>
                                <span>/</span>
                                <span className="text-foreground">Locations</span>
                            </nav>

                            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                                Web Design Across the USA
                            </h1>
                            <p className="text-lg text-muted-foreground mb-8">
                                We serve businesses in {allLocations.length}+ cities across the United States.
                                Fast, beautiful websites optimized for local search - no matter where you are.
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

                {/* Top Cities */}
                <section className="section">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            Top US Cities
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Our most popular locations for website creation services
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {tier1Locations.map((location) => (
                                <Link
                                    key={location.slug}
                                    href={`/services/website-creation/${location.slug}`}
                                    className="card p-4 text-center hover-glow"
                                >
                                    <div className="font-semibold">{location.city}</div>
                                    <div className="text-xs text-muted-foreground">{location.stateCode}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* All Locations by State */}
                <section className="section bg-muted/30">
                    <div className="container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
                            All Locations by State
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {states.map((state) => (
                                <div key={state} className="card p-6">
                                    <h3 className="font-bold mb-4">{state}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {locationsByState[state].map((loc) => (
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
                    </div>
                </section>

                {/* Services */}
                <section className="section">
                    <div className="container text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            Available in Every City
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            All our services are available nationwide
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 max-w-4xl mx-auto">
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
                            Ready to Start Your Project?
                        </h2>
                        <p className="text-white/80 mb-8">
                            Get a custom quote for your city.
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
