import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
    title: 'DIY SEO vs Hiring an Agency: What\'s Right for Your Local Business? | AnotherSEOGuru',
    description: 'Should you do your own SEO or hire an agency? We break down the costs, time commitment, and results of DIY vs professional Local SEO.',
    path: '/blog/diy-vs-agency',
});

export default function DiyVsAgency() {
    return (
        <>
            <Header />
            <main className="pt-32 pb-20">
                <article className="container max-w-4xl">
                    <header className="mb-12 text-center">
                        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
                            Business Strategy
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                            DIY SEO vs. Hiring an Agency: The Honest Truth for Business Owners
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            You know you need to be on Google. The question is: do you have the time to put yourself there?
                        </p>
                    </header>

                    <div className="prose prose-lg max-w-none text-gray-700">
                        <p>
                            Every small business owner reaches a crossroads. You've launched your website, but the phone isn't ringing.
                            You search for "how to rank on Google" and are hit with a mountain of information about keywords, backlinks,
                            and meta tags.
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Option 1: The DIY Approach</h2>
                        <p>
                            <strong>Best for:</strong> Solopreneurs, businesses under $200k/year, or those with more time than money.
                        </p>
                        <p>
                            The basics of Local SEO are not rocket science. Google wants to rank good businesses. If you are willing to
                            learn, you can do a lot of the groundwork yourself.
                        </p>
                        <h3 className="text-xl font-bold text-gray-900 mt-4">The Pros:</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Free (except for your time).</li>
                            <li>You maintain total control.</li>
                            <li>You learn a valuable skill.</li>
                        </ul>
                        <h3 className="text-xl font-bold text-gray-900 mt-4">The Cons:</h3>
                        <ul className="list-disc pl-6 mb-8">
                            <li><strong>Time Drain:</strong> Proper SEO takes 5-10 hours a week.</li>
                            <li><strong>Learning Curve:</strong> SEO changes daily (updates, new algorithms).</li>
                            <li><strong>Mistakes are Costly:</strong> Bad links or over-optimization can get you penalized.</li>
                        </ul>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Option 2: Hiring a Local SEO Agency</h2>
                        <p>
                            <strong>Best for:</strong> Established businesses ready to scale, or those who value their time at &gt;$50/hour.
                        </p>
                        <p>
                            An agency brings systems, tools, and experience that would take you years to acquire. They don't just "do SEO";
                            they build an asset for your business.
                        </p>
                        <h3 className="text-xl font-bold text-gray-900 mt-4">The Pros:</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Speed:</strong> Agencies can execute in a month what takes you a year.</li>
                            <li><strong>Expertise:</strong> They know what works <em>now</em>, not what worked in 2018.</li>
                            <li><strong>ROI Focus:</strong> Good agencies track leads and revenue, not just rankings.</li>
                        </ul>

                        <div className="bg-gray-50 border border-gray-200 p-8 my-12 rounded-xl text-center">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Looking for a Partner, Not a Vendor?</h3>
                            <p className="mb-6">
                                We work with Chula Vista businesses who are serious about growth. If you're ready to hand off the technical
                                work and focus on running your business, let's talk.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Link href="/get-started" className="btn btn-gradient text-white px-8 py-3 rounded-lg font-bold">
                                    Get a Proposal
                                </Link>
                                <Link href="/blog/local-seo-guide" className="btn border border-gray-300 px-8 py-3 rounded-lg font-bold hover:bg-white">
                                    Read Our SEO Guide
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </>
    );
}
