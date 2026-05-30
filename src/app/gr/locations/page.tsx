import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { greeceLocations, getLocationsByCountry } from '@/data/locations';
import { services } from '@/data/services';
import { getServiceEl } from '@/data/services-i18n';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
    title: 'Πόλεις — Κατασκευή Ιστοσελίδων Ελλάδα',
    description:
        'Κατασκευή ιστοσελίδων, SEO, GEO και AEO σε Αθήνα, Θεσσαλονίκη, Πάτρα, Ηράκλειο και όλη την Ελλάδα. Πλούσιες τοπικές σελίδες, όχι thin content. Δωρεάν προσφορά.',
    path: '/gr/locations',
    primaryKeyword: 'κατασκευή ιστοσελίδων',
});

export default function GreekLocationsPage() {
    const grCities = getLocationsByCountry('GR');

    return (
        <>
            <Header />
            <main className="main-below-header" lang="el">
                <section className="border-b border-border bg-primary/5 py-3">
                    <div className="container text-center text-sm text-muted-foreground">
                        Ελληνικές πόλεις ·{' '}
                        <Link href="/locations" hrefLang="en" className="font-medium text-primary hover:underline">
                            Global locations (English)
                        </Link>
                    </div>
                </section>

                <section className="section-compact gradient-hero">
                    <div className="container max-w-3xl">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                            Κατασκευή ιστοσελίδων ανά πόλη — Ελλάδα
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8">
                            Εξειδικευμένες τοπικές σελίδες για {grCities.length} πόλεις: SEO, GEO, AEO, ταχύτητα
                            και σχεδιασμός που μετατρέπει — όχι thin content.
                        </p>
                        <Link href="/contact" className="btn btn-gradient">
                            Δωρεάν προσφορά
                        </Link>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <h2 className="text-2xl font-bold mb-8">Επιλέξτε την πόλη σας</h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {greeceLocations.map((loc) => (
                                <Link
                                    key={loc.slug}
                                    href={`/gr/services/website-creation/${loc.slug}`}
                                    className="card p-6 hover-glow text-center"
                                >
                                    <div className="text-xl font-bold">{loc.cityLocal ?? loc.city}</div>
                                    <div className="text-sm text-muted-foreground mt-1">{loc.state}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section bg-muted/30">
                    <div className="container">
                        <h2 className="text-2xl font-bold mb-6 text-center">Όλες οι υπηρεσίες ανά πόλη</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {services.map((service) => {
                                const el = getServiceEl(service.slug);
                                return (
                                    <div key={service.slug} className="card p-6">
                                        <h3 className="font-semibold mb-3">{el?.name ?? service.name}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {greeceLocations.map((loc) => (
                                                <Link
                                                    key={loc.slug}
                                                    href={`/gr/services/${service.slug}/${loc.slug}`}
                                                    className="text-xs text-muted-foreground hover:text-primary"
                                                >
                                                    {loc.cityLocal ?? loc.city}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="container max-w-2xl text-center">
                        <h2 className="text-2xl font-bold mb-4">Διαβάστε επίσης</h2>
                        <Link href="/blog/geo-aeo-ellada" className="text-primary font-medium hover:underline">
                            Οδηγός GEO &amp; AEO για την Ελλάδα →
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
