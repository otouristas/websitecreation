import Link from 'next/link';
import { Location } from '@/data/locations';
import { Service } from '@/data/services';
import { Industry } from '@/data/industries';
import { ServiceAreaMap } from './ServiceAreaMap';

interface LocationContentProps {
    location: Location;
    service?: Service;
    industry?: Industry;
}

export function LocationContent({ location, service, industry }: LocationContentProps) {
    const city = location.city;
    const state = location.state;
    const target = service ? service.name : (industry ? `${industry.name} SEO` : 'SEO');
    const targetShort = service ? service.shortName : (industry ? industry.name : 'SEO');

    return (
        <div className="prose prose-lg max-w-none text-gray-700">
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

            {/* Section 4: CTA - Adapted from Competitor's "Ready to Grow?" */}
            <div className="text-center py-12 border-t border-gray-100 mt-12">
                <h3 className="text-2xl font-bold mb-4">Ready to Grow Your Business in {city}?</h3>
                <p className="mb-8 text-gray-600 max-w-2xl mx-auto">
                    Don't settle for "average" results. Partner with the agency that understands the {city} market
                    and has the technology to get you to #1.
                </p>
                <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                    Get Your Free {city} SEO Proposal
                </Link>
            </div>
        </div>
    );
}
