import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getServiceBySlug, getAllServiceSlugs, services } from '@/data/services';
import { getServiceEl } from '@/data/services-i18n';
import {
    getLocationBySlug,
    formatLocationNameEl,
    getNearbyLocations,
    greeceLocations,
    isGreekLocation,
} from '@/data/locations';
import {
    buildServiceLocationMetadataEl,
    generateBreadcrumbSchema,
    generateLocalBusinessSchema,
    generateServiceSchema,
    generateFAQSchema,
    combineSchemas,
    BASE_URL,
} from '@/lib/seo';
import { SchemaMarkup, Breadcrumbs, LocationContentGreek } from '@/components/seo';
import { enServiceLocationPath } from '@/lib/locale-paths';

interface PageProps {
    params: Promise<{ service: string; location: string }>;
}

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
    const serviceSlugs = getAllServiceSlugs();
    const greekSlugs = greeceLocations.map((l) => l.slug);

    return serviceSlugs.flatMap((service) =>
        greekSlugs.map((location) => ({ service, location })),
    );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { service: serviceSlug, location: locationSlug } = await params;
    const serviceEn = getServiceBySlug(serviceSlug);
    const serviceEl = getServiceEl(serviceSlug);
    const location = getLocationBySlug(locationSlug);

    if (!serviceEn || !serviceEl || !location || !isGreekLocation(location)) {
        return { title: 'Δεν βρέθηκε' };
    }

    return buildServiceLocationMetadataEl(
        { name: serviceEl.name, slug: serviceSlug },
        location,
    );
}

export default async function GreekServiceLocationPage({ params }: PageProps) {
    const { service: serviceSlug, location: locationSlug } = await params;
    const serviceEn = getServiceBySlug(serviceSlug);
    const serviceEl = getServiceEl(serviceSlug);
    const location = getLocationBySlug(locationSlug);

    if (!serviceEn || !serviceEl || !location || !isGreekLocation(location)) {
        notFound();
    }

    const place = formatLocationNameEl(location);
    const nearby = getNearbyLocations(location, 6);
    const relatedServices = services.filter((s) => s.slug !== serviceSlug).slice(0, 3);

    const breadcrumbs = [
        { name: 'Αρχική', url: `${BASE_URL}/gr` },
        { name: 'Υπηρεσίες', url: `${BASE_URL}/services` },
        { name: serviceEl.name, url: `${BASE_URL}/services/${serviceSlug}` },
        { name: place, url: `${BASE_URL}/gr/services/${serviceSlug}/${locationSlug}` },
    ];

    const pageUrl = `${BASE_URL}/gr/services/${serviceSlug}/${locationSlug}`;

    const faqItems = [
        {
            question: `Πόσο διαρκεί ${serviceEl.name.toLowerCase()} στην ${location.cityLocal ?? location.city};`,
            answer: `Συνήθως 2–8 εβδομάδες ανάλογα με το project. Τιμολόγηση σε ${location.currency} με σαφή deliverables.`,
        },
        {
            question: `Κάνετε τοπικό SEO και Google Business Profile;`,
            answer: `Ναι — ιδιαίτερα για ελληνικές αγορές φιλοξενίας, ιατρικής αισθητικής και B2B στην ${location.cityLocal ?? location.city}.`,
        },
        {
            question: `Τι είναι GEO και AEO;`,
            answer: `Βελτιστοποίηση για απαντήσεις AI (ChatGPT, Perplexity, Gemini) και generative citations — συμπληρωματικά στο κλασικό SEO.`,
        },
    ];

    const schemas = combineSchemas(
        generateBreadcrumbSchema({ items: breadcrumbs }),
        generateFAQSchema({ faqs: faqItems }),
        generateLocalBusinessSchema({
            name: `${serviceEl.name} - ${place}`,
            description: `${serviceEl.description} — ${place}`,
            url: pageUrl,
            address: {
                addressLocality: location.cityLocal ?? location.city,
                addressRegion: location.stateCode,
                addressCountry: 'GR',
            },
            geo: {
                latitude: location.latitude,
                longitude: location.longitude,
            },
        }),
        generateServiceSchema({
            name: serviceEl.name,
            description: serviceEl.description,
            provider: { name: 'AnotherSEOGuru', url: BASE_URL },
            areaServed: [location.cityLocal ?? location.city, 'Greece'],
            serviceType: serviceEl.name,
        }),
    );

    return (
        <>
            <SchemaMarkup schemas={schemas} />
            <Header />
            <main className="main-below-header" lang="el">
                <section className="border-b border-border bg-primary/5 py-3">
                    <div className="container text-center text-sm text-muted-foreground">
                        Ελληνική σελίδα ·{' '}
                        <Link
                            href={enServiceLocationPath(serviceSlug, locationSlug)}
                            hrefLang="en"
                            className="font-medium text-primary hover:underline"
                        >
                            English version
                        </Link>
                    </div>
                </section>

                <section className="section-compact gradient-hero">
                    <div className="container">
                        <div className="max-w-3xl">
                            <Breadcrumbs items={breadcrumbs} className="mb-6" />

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                                {serviceEl.name} στην {place}
                            </h1>

                            <p className="text-lg text-muted-foreground mb-8">
                                {serviceEl.description} Τιμολόγηση σε {location.currency}. SEO, GEO, AEO και
                                πλατφόρμα με Google Search Console — για επιχειρήσεις στην{' '}
                                {location.cityLocal ?? location.city}.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link href="/contact" className="btn btn-gradient">
                                    Δωρεάν προσφορά — {location.cityLocal ?? location.city}
                                </Link>
                                <Link href="/gr/locations" className="btn btn-outline">
                                    Όλες οι πόλεις
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <h2 className="text-2xl font-bold mb-6">Τι περιλαμβάνεται</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {serviceEn.features.map((feature, i) => (
                                <div key={i} className="flex gap-3 p-4 rounded-xl bg-muted/50 text-sm">
                                    <span className="text-success">✓</span>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section bg-white">
                    <div className="container">
                        <LocationContentGreek location={location} service={serviceEn} />
                    </div>
                </section>

                {nearby.length > 0 && (
                    <section className="section bg-muted/30">
                        <div className="container">
                            <h2 className="text-2xl font-bold mb-4">Κοντινές πόλεις</h2>
                            <div className="flex flex-wrap gap-3">
                                {nearby.map((city) => (
                                    <Link
                                        key={city.slug}
                                        href={`/gr/services/${serviceSlug}/${city.slug}`}
                                        className="px-3 py-2 text-sm rounded-lg border border-border hover:border-primary hover:text-primary bg-background"
                                    >
                                        {city.cityLocal ?? city.city}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section className="section">
                    <div className="container">
                        <h2 className="text-2xl font-bold mb-6">Άλλες υπηρεσίες στην {location.cityLocal ?? location.city}</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedServices.map((related) => {
                                const relEl = getServiceEl(related.slug);
                                return (
                                    <Link
                                        key={related.slug}
                                        href={`/gr/services/${related.slug}/${locationSlug}`}
                                        className="card p-6 hover-glow"
                                    >
                                        <h3 className="font-semibold mb-2">{relEl?.name ?? related.name}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {relEl?.description ?? related.description}
                                        </p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="section gradient-primary text-white">
                    <div className="container text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            {serviceEl.name} στην {location.cityLocal ?? location.city}
                        </h2>
                        <Link href="/contact" className="btn bg-white text-primary hover:bg-white/90">
                            Ζητήστε προσφορά
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
