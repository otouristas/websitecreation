'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Location } from '@/data/locations';
import { Service } from '@/data/services';
import { Industry } from '@/data/industries';
import { localizedPath, siteLocaleFromPath, type SiteLocale } from '@/lib/i18n/locale';
import { LocationContentGreek } from './LocationContentGreek';

interface LocationContentProps {
    location: Location;
    service?: Service;
    industry?: Industry;
    locale?: SiteLocale;
}

/** Hand-written intros for high-value markets (keyed by location slug). Others use the generic body. */
const EN_CITY_INTROS: Record<string, string> = {
    'new-york-ny': 'New York is the most competitive local market in the world - law firms, medical practices, restaurants and startups all fight for the same first-page spots. A beautiful website is not enough here: you need technical SEO, speed, and content that answers exactly what New Yorkers search for. We work from real Google Search Console data and build pages that target specific boroughs and buyer intent.',
    'los-angeles-ca': 'Los Angeles is a sprawling, neighborhood-driven market where "near me" searches decide who gets the call. From Santa Monica to Downtown, we build fast, mobile-first websites and local SEO that put you in the Google map pack for the neighborhoods that matter to your business.',
    'chicago-il': 'Chicago businesses compete across dozens of distinct neighborhoods and a huge metro area. We build location-aware pages and a technical foundation that helps you rank for commercial and "near me" searches across the city and suburbs.',
    'houston-tx': 'Houston is one of the fastest-growing metros in the US, and its businesses are increasingly won or lost online. With the right technical SEO and local strategy, a Houston business can dominate its category before competitors catch up.',
    'miami-fl': 'Miami is a bilingual, tourism-heavy market where speed and mobile experience decide conversions. We build fast, English/Spanish-ready websites with local SEO and GEO/AEO so you show up in Google and in AI assistants that travelers now use to plan.',
    'austin-tx': 'Austin’s booming, tech-savvy market means your customers research thoroughly before they buy. We build SEO-ready websites and content that earn trust early and rank for the high-intent searches that bring Austin customers to you.',
    'san-diego-ca': 'San Diego blends strong local demand with a competitive services market. We build location pages, Google Business Profile strategy, and fast websites so your business wins the map pack and the organic results across the county.',
    'dallas-tx': 'Dallas-Fort Worth is a massive, competitive metro where local SEO and site speed separate the leaders from the rest. We reverse-engineer what is ranking today and build the technical and content foundation to get you there.',
    'seattle-wa': 'Seattle customers are research-driven and mobile-first. We build fast, technically sound websites and content that answer their questions and rank in both Google and AI search.',
    'boston-ma': 'Boston’s professional-services and education-heavy market rewards authority and trust. We build content and technical SEO that establish your expertise and rank for the competitive terms your Boston customers search.',
    'london-uk': 'London is one of the most competitive search markets in Europe. We build fast, SEO-ready websites with local strategy and GEO/AEO so you rank across boroughs and in the AI answers your customers increasingly rely on. Pricing quoted in EUR/GBP.',
    'toronto-ca': 'Toronto is a diverse, competitive metro where local relevance and site speed drive conversions. We build location-aware, bilingual-ready websites and local SEO that win the map pack across the GTA.',
    'sydney-au': 'Sydney businesses compete across a wide, suburb-driven metro. We build fast, mobile-first websites and local SEO that rank for the suburbs and services your Sydney customers actually search.',
    'dublin-ie': 'Dublin is a fast-growing, English-speaking hub for both local and international business. We build SEO-ready websites with local strategy and GEO/AEO so you rank in Google and in AI search across Ireland and the EU.',
    'portland-or': 'Portland is a design-conscious, mobile-first market where a slow or dated website costs you customers fast. We build fast, SEO-ready sites and local strategy that rank across the metro - and we handle website redesigns with a safe SEO migration so you keep the rankings you already have.',
    'aurora-co': 'Aurora and the greater Denver metro are growing fast, and local search decides who gets the call. We reverse-engineer what ranks today and build the technical SEO, Google Business Profile strategy, and content that put Aurora businesses in the map pack.',
    'toledo-oh': 'Toledo is a market where strong local SEO still beats bigger budgets. With a fast website, a well-optimized Google Business Profile, and location-focused content, a Toledo business can own its category in the local results.',
    'tampa-fl': 'Tampa Bay is a competitive, high-growth market where speed and mobile experience drive conversions. We build fast, SEO-ready websites and local strategy - including website redesigns that keep your existing rankings - so you win across the metro.',
    'brisbane-au': 'Brisbane businesses compete across a wide, suburb-driven metro. We build fast, mobile-first websites and local SEO that rank for the suburbs and services your Brisbane customers actually search. Pricing quoted in AUD/EUR.',
    'philadelphia-pa': 'Philadelphia is a dense, neighborhood-driven market where local relevance and authority win. We build location pages, earn authoritative backlinks, and structure content so Philly businesses rank for competitive commercial and "near me" searches.',
};

/** Maps each service to its most relevant English blog guide for contextual A->B internal linking. */
const SERVICE_GUIDE_EN: Record<string, { href: string; label: string }> = {
    'eshop-woocommerce': { href: '/blog/ecommerce-website-cost-guide', label: 'How much does an e-commerce website cost?' },
    'eshop-seo': { href: '/blog/ecommerce-website-cost-guide', label: 'How much does an e-commerce website cost?' },
    'website-creation': { href: '/blog/how-much-does-a-website-cost', label: 'How much does a website cost?' },
    'website-redesign': { href: '/blog/website-redesign-guide', label: 'Website redesign guide (without losing SEO)' },
    'seo-web-design': { href: '/blog/seo-web-design-development-platform', label: 'SEO web design & development guide' },
    'ai-visibility': { href: '/blog/pillar-ai-llm-visibility', label: 'AI & LLM visibility playbook' },
    'local-seo': { href: '/blog/how-much-does-seo-cost', label: 'How much does SEO cost?' },
    'seo-audits': { href: '/blog/how-much-does-seo-cost', label: 'How much does SEO cost?' },
    'link-building': { href: '/blog/how-much-does-seo-cost', label: 'How much does SEO cost?' },
    'content-creation': { href: '/blog/how-much-does-seo-cost', label: 'How much does SEO cost?' },
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
    const targetShort = service ? service.shortName : (industry ? industry.name : 'SEO');

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
        <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-sm font-medium text-primary not-prose mb-6">{currencyNote}</p>
            {/* Section 1: The "Why Us" Intro - Replaces Competitor's "Since 2010" with Modern/AI Angle */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    The Smart Choice for {city} Businesses
                </h2>
                <p className="mb-4">
                    Stop relying on outdated SEO tactics. At AnotherSEOGuru, we bring enterprise-grade search intelligence to {city}, {state}.
                    Whether you are in {location.neighborhoods && location.neighborhoods.length > 0 ? location.neighborhoods[0] : 'downtown'} or the surrounding areas,
                    our data-driven approach ensures your business dominates local search results.
                </p>
                <p>
                    We don't just "guess" what works. We analyze the exact signals Google uses to rank businesses in {city} and deploy
                    a custom {target.toLowerCase()} strategy designed for maximum ROI.
                </p>
                {EN_CITY_INTROS[location.slug] ? (
                    <p className="mt-4">{EN_CITY_INTROS[location.slug]}</p>
                ) : null}
                <p className="mt-4">
                    <strong>Transparent pricing:</strong> websites start at €899 and monthly SEO from €299/mo - see our{' '}
                    <Link href={lp('/pricing')} className="text-blue-600 underline">pricing &amp; packages</Link> or{' '}
                    <Link href={lp('/get-started')} className="text-blue-600 underline">request a free quote</Link>.
                </p>
            </div>

            {/* Section 2: The Process - Adapted from Competitor's "Research/Audit/Content" */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                    <h3 className="text-xl font-bold text-blue-600 mb-3">1. Data-Driven Research</h3>
                    <p className="text-gray-600">
                        We start by analyzing your top competitors in {city}. We identify the exact keywords driving their traffic and
                        reverse-engineer their success to give you a competitive advantage.
                    </p>
                </div>
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                    <h3 className="text-xl font-bold text-blue-600 mb-3">2. Technical Foundation</h3>
                    <p className="text-gray-600">
                        Speed matters. We perform a deep technical audit to ensure your site loads instantly for users in {city},
                        passing all Core Web Vitals checks with flying colors.
                    </p>
                </div>
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                    <h3 className="text-xl font-bold text-blue-600 mb-3">3. Semantic Authority</h3>
                    <p className="text-gray-600">
                        We optimize your pages for "Entities" and "Topics", not just keywords. This modern approach helps
                        Google understand exactly what services you offer to the {city} community.
                    </p>
                </div>
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                    <h3 className="text-xl font-bold text-blue-600 mb-3">4. Local Growth</h3>
                    <p className="text-gray-600">
                        From citation building to earning authoritative backlinks, we build the external signals that verify
                        your business as a trusted leader in the {state} market.
                    </p>
                </div>
            </div>

            {/* Section 3: Neighborhood Dynamics - The "Micro-Local" Strategy */}
            {location.neighborhoods && location.neighborhoods.length > 0 && (
                <div className="mb-12 bg-blue-50 p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Serving All of {city} & Surrounding Areas
                    </h3>
                    <p className="mb-6">
                        local SEO is about hyper-local relevance. We help you rank not just for "plumber in {city}" but for specific
                        neighborhood searches where your customers actually live.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {location.neighborhoods.map((hood) => (
                            <span key={hood} className="px-4 py-2 bg-white rounded-full text-sm font-medium text-blue-800 shadow-sm border border-blue-100">
                                {hood}
                            </span>
                        ))}
                        <span className="px-4 py-2 bg-white/50 rounded-full text-sm text-gray-500 italic">
                            ...and more
                        </span>
                    </div>
                </div>
            )}

            {/* Internal links: distribute crawl equity + help users convert */}
            <div className="not-prose mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Explore more</h3>
                <div className="flex flex-wrap gap-3 text-sm">
                    {service ? (
                        <Link href={lp(`/services/${service.slug}`)} className="rounded-full border border-gray-200 px-4 py-2 text-blue-700 hover:bg-blue-50">
                            {service.name} overview
                        </Link>
                    ) : null}
                    <Link href={lp('/services')} className="rounded-full border border-gray-200 px-4 py-2 text-blue-700 hover:bg-blue-50">All services</Link>
                    <Link href={lp('/solutions')} className="rounded-full border border-gray-200 px-4 py-2 text-blue-700 hover:bg-blue-50">Solutions by industry</Link>
                    <Link href={lp('/pricing')} className="rounded-full border border-gray-200 px-4 py-2 text-blue-700 hover:bg-blue-50">Pricing &amp; packages</Link>
                    {(() => {
                        const guide = service ? SERVICE_GUIDE_EN[service.slug] : null;
                        const g = guide ?? { href: '/blog/how-much-does-seo-cost', label: 'How much does SEO cost?' };
                        return (
                            <Link href={lp(g.href)} className="rounded-full border border-gray-200 px-4 py-2 text-blue-700 hover:bg-blue-50">{g.label}</Link>
                        );
                    })()}
                    <Link href={lp('/work')} className="rounded-full border border-gray-200 px-4 py-2 text-blue-700 hover:bg-blue-50">See our work</Link>
                </div>
            </div>

            {/* Section 4: CTA - Adapted from Competitor's "Ready to Grow?" */}
            <div className="text-center py-12 border-t border-gray-100 mt-12">
                <h3 className="text-2xl font-bold mb-4">Ready to Grow Your Business in {city}?</h3>
                <p className="mb-8 text-gray-600 max-w-2xl mx-auto">
                    Don't settle for "average" results. Partner with the agency that understands the {city} market
                    and has the technology to get you to #1.
                </p>
                <Link
                    href={lp('/contact')}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                    Get Your Free {city} SEO Proposal
                </Link>
            </div>
        </div>
    );
}
