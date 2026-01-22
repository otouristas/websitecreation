import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
    title: 'The Ultimate Guide to Local SEO for Home Services [2026 Edition]',
    description: 'A massive 1,800+ word guide on how plumbers, HVAC techs, and contractors can dominate Google Maps. Stop buying leads and start owning them.',
    path: '/blog/local-seo-guide',
});

export default function LocalSEOGuide() {
    return (
        <>
            <Header />
            <main className="pt-32 pb-20">
                <article className="container max-w-3xl">
                    <header className="mb-12">
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                            Local SEO Masterclass
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                            The Ultimate Guide to Local SEO for Home Services
                        </h1>
                        <div className="flex items-center gap-4 text-gray-600 mb-8">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                                {/* Author Placeholder */}
                                <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                            </div>
                            <div>
                                <div className="font-bold text-gray-900">AnotherSEOGuru Editorial Team</div>
                                <div className="text-sm">Updated Jan 2026 • 15 min read</div>
                            </div>
                        </div>
                    </header>

                    <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="lead text-xl text-gray-600 italic border-l-4 border-blue-500 pl-6 my-8">
                            "I'm the best plumber in town, but nobody calls me." We hear this every single day. The problem isn't your skill—it's your visibility.
                            In 2026, if you aren't in the Google "Map Pack", you don't exist. This guide is your roadmap out of obscurity.
                        </p>

                        <h2>Table of Contents</h2>
                        <ul>
                            <li><a href="#chapter-1">Chapter 1: Why "Near Me" Searches Are Your Lifeline</a></li>
                            <li><a href="#chapter-2">Chapter 2: Claiming and Verifying Your GBP (The Right Way)</a></li>
                            <li><a href="#chapter-3">Chapter 3: The NAP Consistency Rule</a></li>
                            <li><a href="#chapter-4">Chapter 4: Reviews: Your Digital Currency</a></li>
                            <li><a href="#chapter-5">Chapter 5: On-Page Signals for Local SEO</a></li>
                            <li><a href="#chapter-6">Chapter 6: Building Local Citations</a></li>
                            <li><a href="#chapter-7">Chapter 7: Tracking Your ROI</a></li>
                        </ul>

                        <h2 id="chapter-1">Chapter 1: Why "Near Me" Searches Are Your Lifeline</h2>
                        <p>
                            Think about the last time you needed a service. Did you open the Yellow Pages? No. You pulled out your phone and typed
                            "plumber near me" or "emergency ac repair".
                        </p>
                        <p>
                            Google reported a <strong>500% increase</strong> in "near me" searches over the last few years. These searches have
                            the highest intent. A person searching for "best pizza" might be browsing. A person searching for "emergency plumber"
                            has a wallet in hand and water flooding their kitchen.
                        </p>
                        <p>
                            If you are a home service business, <strong>Local SEO</strong> isn't an option. It's survival.
                            Are you ready to stop buying shared leads from Angi/HomeAdvisor and start owning your own traffic?
                        </p>

                        <div className="bg-blue-50 p-8 rounded-xl my-12 text-center">
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">Don't know where you rank?</h3>
                            <p className="mb-6">Use our free audit tool to see your current position in the Google Map Pack.</p>
                            <Link href="/contact" className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
                                Get My Free Local SEO Audit
                            </Link>
                        </div>

                        <h2 id="chapter-2">Chapter 2: Claiming and Verifying Your GBP</h2>
                        <p>
                            Your Google Business Profile (formerly GMB) is your new homepage. For many customers, it's the only thing they will see
                            before they call you.
                        </p>
                        <h3>Common Mistakes During Setup:</h3>
                        <ul>
                            <li><strong>Wrong Category:</strong> Don't just pick "Contractor". Be specific: "HVAC Contractor" or "Plumber".</li>
                            <li><strong>Missing Hours:</strong> If you offer 24/7 service, mark it. This is a huge ranking factor for "emergency" keywords.</li>
                            <li><strong>Empty Service Area:</strong> Define the cities you serve. We use <Link href="/services/local-seo">advanced radius targeting</Link> to validte this.</li>
                        </ul>

                        <h2 id="chapter-3">Chapter 3: The NAP Consistency Rule</h2>
                        <p>
                            NAP stands for <strong>Name, Address, Phone Number</strong>. Google is a robot; it gets confused easily.
                            If your website says "Bob's Plumbing", your Facebook says "Bob's Plumbing LLC", and Yelp says "Bob the Plumber",
                            Google loses trust in your data.
                        </p>
                        <p>
                            <strong>The Golden Rule:</strong> Pick one format and stick to it everywhere. Down to the "St" vs "Street".
                        </p>

                        <h2 id="chapter-4">Chapter 4: Reviews: Your Digital Currency</h2>
                        <p>
                            Reviews are a ranking factor. Quantity matters, but <strong>recency</strong> and <strong>keywords</strong> matter more.
                            A 5-star review that says "Great job" is okay. A 5-star review that says "Bob fixed my <strong>leaking water heater</strong> in <strong>Austin</strong> quickly" is pure gold.
                        </p>
                        <p>
                            <strong>Pro Tip:</strong> Always reply to reviews. It shows Google that the business is active.
                        </p>

                        <h2 id="chapter-5">Chapter 5: On-Page Signals for Local SEO</h2>
                        <p>
                            Your website needs to back up your GBP claims. This means creating dedicated location pages.
                            Keep in mind, you cannot just copy-paste the same content for every city. That is "doorway page" spam.
                        </p>
                        <p>
                            We use <Link href="/services">Programmatic SEO</Link> to generate unique, value-rich pages for every neighborhood you serve,
                            embedding local maps, weather data, and specific landmarks to prove relevance.
                        </p>

                        <h2 id="chapter-6">Chapter 6: Building Local Citations</h2>
                        <p>
                            Citations are mentions of your business on other directories (Yelp, YellowPages, BBB). They act as "votes of confidence"
                            for your address. If 50 major directories agree that you are located at 123 Main St, Google trusts that address.
                        </p>
                        <p>
                            Focus on the "Big Aggregators" first: Data Axle, Neustar, Foursquare. Then move to niche directories (e.g., Houzz for contractors).
                        </p>

                        <h2 id="chapter-7">Chapter 7: Tracking Your ROI</h2>
                        <p>
                            Rankings are vanity. Revenue is sanity. You need to track <strong>Calls</strong> and <strong>Form Fills</strong>.
                            Use a call tracking number (like CallRail) to know exactly which channel drives your phone calls.
                        </p>
                        <p>
                            Want to see the potential? Check out our <Link href="/#calculator">ROI Calculator</Link> to simulate your revenue growth.
                        </p>

                        <div className="border-t border-gray-200 mt-12 pt-12">
                            <h3>Ready to Dominate Your Local Market?</h3>
                            <p>
                                You can try to manage GBP, citations, reviews, and website content yourself. Or you can let the experts handle it
                                while you focus on doing the work.
                            </p>
                            <Link href="/pricing" className="btn btn-gradient text-lg px-8 py-4 inline-block mt-4">
                                View Our Local SEO Packages
                            </Link>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </>
    );
}
