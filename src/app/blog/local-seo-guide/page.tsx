import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
    title: 'The Ultimate Guide to Local SEO for Home Services | AnotherSEOGuru',
    description: 'Learn how to dominate local search results for plumbers, electricians, and HVAC companies. A complete guide to Google Business Profile, citations, and reviews.',
    path: '/blog/local-seo-guide',
});

export default function LocalSEOGuide() {
    return (
        <>
            <Header />
            <main className="pt-32 pb-20">
                <article className="container max-w-4xl">
                    {/* Article Header */}
                    <header className="mb-12 text-center">
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                            Local SEO Strategy
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                            The Ultimate Guide to Local SEO for Home Service Businesses
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            How plumbers, HVAC techs, and contractors can stop chasing leads and start attracting them with Google Maps.
                        </p>
                    </header>

                    {/* Article Content */}
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <p>
                            For home service businesses, "Local SEO" isn't just a marketing buzzword—it's survival.
                            When a homeowner in your city has a burst pipe or a broken AC unit, they don't browse social media.
                            They go to Google and type <strong>"plumber near me"</strong>.
                        </p>
                        <p>
                            If your business doesn't appear in that "Map Pack" (the top 3 map results), you are invisible to
                            <span className="font-semibold text-blue-600"> 70% of your potential customers</span>.
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. The Core: Google Business Profile (GBP)</h2>
                        <p>
                            Your Google Business Profile (formerly GMB) is your new homepage. It's often the only thing a customer sees
                            before calling you. Optimization here is critical.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-8">
                            <li><strong>Claim and Verify:</strong> Ensure you own your listing.</li>
                            <li><strong>NAP Consistency:</strong> Your Name, Address, and Phone number must actly match your website.</li>
                            <li><strong>Categories:</strong> Choose the most specific primary category (e.g., "Plumber" vs "Contractor").</li>
                            <li><strong>Photos:</strong> Upload real photos of your team and trucks. Stock photos kill trust.</li>
                        </ul>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Local Citations: Building Authority</h2>
                        <p>
                            Citations are mentions of your business across the web (Yelp, YellowPages, BBB). Google uses these to
                            verify that you are a legitimate local business. Consistency is key here—if your address is "123 Main St"
                            on Google but "123 Main Street" on Yelp, it can confuse the algorithm.
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. The Power of Reviews</h2>
                        <p>
                            Ranking gets you seen; reviews get you the call. Actively solicit reviews from every satisfied customer.
                            Respond to EVERY review, positive or negative. It shows Google (and prospects) that you are active and care.
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. Location Pages</h2>
                        <p>
                            If you serve multiple cities (e.g., Chula Vista, National City, Eastlake), you need dedicated landing pages
                            for each. Don't just list them in a footer. unique content for each location tells Google you are relevant
                            in that specific area.
                        </p>

                        <div className="bg-blue-50 border-l-4 border-blue-600 p-8 my-12 rounded-r-xl">
                            <h3 className="text-xl font-bold text-blue-900 mb-2">Need Professional Help?</h3>
                            <p className="text-blue-800 mb-4">
                                Managing Local SEO while running a business is hard. Our dedicated Local SEO plans handle everything
                                from GBP posts to citation audits.
                            </p>
                            <Link href="/services/local-seo" className="inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition">
                                View Local SEO Packages
                            </Link>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </>
    );
}
