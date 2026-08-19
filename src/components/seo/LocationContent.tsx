'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Location } from '@/data/locations';
import { Service } from '@/data/services';
import { Industry } from '@/data/industries';
import { getLocationPack } from '@/data/location-content';
import { localizedPath, siteLocaleFromPath, type SiteLocale } from '@/lib/i18n/locale';
import { LocationContentGreek } from './LocationContentGreek';

interface LocationContentProps {
    location: Location;
    service?: Service;
    industry?: Industry;
    locale?: SiteLocale;
}

/** Maps each service to its most relevant English blog guide for contextual A->B internal linking. */
const SERVICE_GUIDE_EN: Record<string, { href: string; label: string }> = {
    'eshop-woocommerce': { href: '/blog/ecommerce-website-cost-guide', label: 'How much does an e-commerce website cost?' },
    'eshop-seo': { href: '/blog/ecommerce-website-cost-guide', label: 'How much does an e-commerce website cost?' },
    'website-creation': { href: '/blog/how-much-does-a-website-cost', label: 'How much does a website cost?' },
    'website-redesign': { href: '/blog/website-redesign-guide', label: 'Website redesign guide (without losing SEO)' },
    'seo-web-design': { href: '/blog/seo-web-design-development-platform', label: 'SEO web design & development guide' },
    'ai-visibility': { href: '/blog/ai-seo-agency-geo-aeo', label: 'AI SEO agency: GEO & AEO guide' },
    'local-seo': { href: '/blog/local-seo-guide', label: 'Ultimate guide to local SEO' },
    'seo-audits': { href: '/blog/technical-seo-guide', label: 'Technical SEO guide' },
    'link-building': { href: '/blog/link-building-guide', label: 'Link building guide' },
    'content-creation': { href: '/blog/seo-content-guide', label: 'SEO content guide' },
    'speed-optimization': { href: '/blog/how-much-does-seo-cost', label: 'How much does SEO cost?' },
    'logo-design': { href: '/blog/how-much-does-a-website-cost', label: 'How much does a website cost?' },
};

export function LocationContent({ location, service, industry, locale: localeProp }: LocationContentProps) {
    const pathname = usePathname() ?? '/en';
    const locale = localeProp ?? siteLocaleFromPath(pathname);
    
    if (locale === 'el') {
        return <LocationContentGreek location={location} service={service} locale={locale} />;
    }

    const lp = (path: string) => localizedPath(locale, path);
    const city = location.city;
    const state = location.state;
    const target = service ? service.name : (industry ? `${industry.name} SEO` : 'SEO');
    const pack = getLocationPack(location.slug, 'en');
    const serviceDepth =
        service && pack?.serviceDepth?.[service.slug] ? pack.serviceDepth[service.slug] : null;

    const currencyNote =
        location.countryCode === 'GB'
            ? 'Pricing quoted in GBP with UK local SEO and Google Business Profile optimization.'
            : location.countryCode === 'CA'
              ? 'Pricing quoted in CAD with bilingual-ready pages where needed.'
              : location.countryCode === 'GR' || location.currency === 'EUR'
                ? 'Pricing quoted in EUR with Greece and EU market SEO.'
                : location.countryCode === 'US'
                  ? 'Pricing quoted in USD with US local SEO best practices.'
                  : `Pricing in ${location.currency ?? 'USD'} for ${location.country ?? 'your market'}.`;

    return (
        <div className="prose prose-lg max-w-none text-foreground">
            <p className="text-sm font-medium text-primary not-prose mb-6">{currencyNote}</p>
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                    The Smart Choice for {city} Businesses
                </h2>
                <p className="mb-4">
                    Stop relying on outdated SEO tactics. At AnotherSEOGuru, we bring enterprise-grade search intelligence to {city}, {state}.
                    Whether you are in {location.neighborhoods && location.neighborhoods.length > 0 ? location.neighborhoods[0] : 'downtown'} or the surrounding areas,
                    our data-driven approach ensures your business dominates local search results.
                </p>
                <p>
                    We don&apos;t just &quot;guess&quot; what works. We analyze the exact signals Google uses to rank businesses in {city} and deploy
                    a custom {target.toLowerCase()} strategy designed for maximum ROI.
                </p>
                {pack?.intro ? (
                    <p className="mt-4">{pack.intro}</p>
                ) : null}
                {serviceDepth ? (
                    <p className="mt-4">{serviceDepth}</p>
                ) : null}
                <p className="mt-4">
                    <strong>Transparent pricing:</strong> websites start at €1.200 and monthly SEO from €400/mo - see our{' '}
                    <Link href={lp('/pricing')} className="text-primary underline">pricing &amp; packages</Link> or{' '}
                    <Link href={lp('/get-started')} className="text-primary underline">request a free quote</Link>.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-surface-raised p-8 rounded-xl border border-hairline">
                    <h3 className="text-xl font-bold text-primary mb-3">1. Data-Driven Research</h3>
                    <p className="text-muted-foreground">
                        We start by analyzing your top competitors in {city}. We identify the exact keywords driving their traffic and
                        reverse-engineer their success to give you a competitive advantage.
                    </p>
                </div>
                <div className="bg-surface-raised p-8 rounded-xl border border-hairline">
                    <h3 className="text-xl font-bold text-primary mb-3">2. Technical Foundation</h3>
                    <p className="text-muted-foreground">
                        Speed matters. We perform a deep technical audit to ensure your site loads instantly for users in {city},
                        passing all Core Web Vitals checks with flying colors.
                    </p>
                </div>
                <div className="bg-surface-raised p-8 rounded-xl border border-hairline">
                    <h3 className="text-xl font-bold text-primary mb-3">3. Semantic Authority</h3>
                    <p className="text-muted-foreground">
                        We optimize your pages for &quot;Entities&quot; and &quot;Topics&quot;, not just keywords. This modern approach helps
                        Google understand exactly what services you offer to the {city} community.
                    </p>
                </div>
                <div className="bg-surface-raised p-8 rounded-xl border border-hairline">
                    <h3 className="text-xl font-bold text-primary mb-3">4. Local Growth</h3>
                    <p className="text-muted-foreground">
                        From citation building to earning authoritative backlinks, we build the external signals that verify
                        your business as a trusted leader in the {state} market.
                    </p>
                </div>
            </div>

            {location.neighborhoods && location.neighborhoods.length > 0 && (
                <div className="mb-12 bg-primary/5 p-8 rounded-[10px]">
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                        Serving All of {city} & Surrounding Areas
                    </h3>
                    <p className="mb-6">
                        Local SEO is about hyper-local relevance. We help you rank not just for &quot;{target.toLowerCase()} in {city}&quot; but for specific
                        neighborhood searches where your customers actually live.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {location.neighborhoods.map((hood) => (
                            <span key={hood} className="px-4 py-2 bg-surface rounded-full text-sm font-medium text-primary shadow-sm border border-hairline">
                                {hood}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="not-prose mb-12">
                <h3 className="text-xl font-bold text-foreground mb-4">Explore more</h3>
                <div className="flex flex-wrap gap-3 text-sm">
                    {service ? (
                        <Link href={lp(`/services/${service.slug}`)} className="rounded-full border border-hairline px-4 py-2 text-primary hover:bg-primary/5">
                            {service.name} overview
                        </Link>
                    ) : null}
                    <Link href={lp('/services')} className="rounded-full border border-hairline px-4 py-2 text-primary hover:bg-primary/5">All services</Link>
                    <Link href={lp('/solutions')} className="rounded-full border border-hairline px-4 py-2 text-primary hover:bg-primary/5">Solutions by industry</Link>
                    <Link href={lp('/pricing')} className="rounded-full border border-hairline px-4 py-2 text-primary hover:bg-primary/5">Pricing &amp; packages</Link>
                    {(() => {
                        const guide = service ? SERVICE_GUIDE_EN[service.slug] : null;
                        const g = guide ?? { href: '/blog/how-much-does-seo-cost', label: 'How much does SEO cost?' };
                        return (
                            <Link href={lp(g.href)} className="rounded-full border border-hairline px-4 py-2 text-primary hover:bg-primary/5">{g.label}</Link>
                        );
                    })()}
                    <Link href={lp('/work')} className="rounded-full border border-hairline px-4 py-2 text-primary hover:bg-primary/5">See our work</Link>
                    {(pack?.portfolioSlugs ?? []).slice(0, 2).map((slug) => (
                        <Link key={slug} href={lp(`/work/${slug}`)} className="rounded-full border border-hairline px-4 py-2 text-primary hover:bg-primary/5">
                            Case: {slug.replace(/-/g, ' ')}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="text-center py-12 border-t border-hairline mt-12">
                <h3 className="text-2xl font-bold mb-4">Ready to Grow Your Business in {city}?</h3>
                <p className="mb-8 text-muted-foreground max-w-2xl mx-auto">
                    Don&apos;t settle for &quot;average&quot; results. Partner with the agency that understands the {city} market
                    and has the technology to get you to #1.
                </p>
                <Link
                    href={lp('/contact')}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-primary-foreground transition-all duration-200 bg-primary rounded-lg hover:bg-primary hover:shadow-lg transform hover:-translate-y-0.5"
                >
                    Get Your Free {city} SEO Proposal
                </Link>
            </div>
        </div>
    );
}
