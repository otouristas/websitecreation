import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
    title: 'Google Business Profile Masterclass: Dominate Local Search | AnotherSEOGuru',
    description: 'Step-by-step guide to optimizing your Google Business Profile. Get more calls from Maps by optimizing categories, photos, and reviews.',
    path: '/blog/google-business-profile-masterclass',
});

export default function GBPMasterclass() {
    return (
        <>
            <Header />
            <main className="pt-32 pb-20">
                <article className="container max-w-4xl">
                    <header className="mb-12 text-center">
                        <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium mb-6">
                            Tactical Guide
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                            Google Business Profile Masterclass: How to Dominate the Map Pack
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            50% of local searches result in a visit within 24 hours. Here is how to make sure they visit YOU.
                        </p>
                    </header>

                    <div className="prose prose-lg max-w-none text-gray-700">
                        <p>
                            Your website is important, but for local services, your Google Business Profile (GBP) is the star of the show.
                            It shows up <em>before</em> the organic results. If you optimize this one asset correctly, you can double your leads
                            without writing a single new blog post.
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Step 1: The "Perfect" Category</h2>
                        <p>
                            Google asks for a "Primary Category". This is the specific ranking factor. Be specific.
                        </p>
                        <ul className="list-disc pl-6 mb-8">
                            <li><strong>bad:</strong> "Contractor"</li>
                            <li><strong>Good:</strong> "Plumber"</li>
                            <li><strong>Best:</strong> "Emergency Plumber" (if that exists) or specific niche like "Drainage Service" if applicable.</li>
                        </ul>
                        <p>
                            <strong>Pro Tip:</strong> Look at what category your top-ranking competitor is using and match it.
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Step 2: Service Areas vs. Physical Address</h2>
                        <p>
                            If you go to customers (like a plumber), set up as a "Service Area Business" (SAB). Hide your address if you work from home.
                            Define your service areas by City (Chula Vista, San Diego, National City) or Zip Code.
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Step 3: The "Posts" Secret Weapon</h2>
                        <p>
                            Most business owners set it and forget it. But you can post updates on GBP just like Facebook.
                        </p>
                        <ul className="list-disc pl-6 mb-8">
                            <li>Post "Offers" (e.g., "$50 off water heater flush").</li>
                            <li>Post "Updates" with photos of completed jobs.</li>
                            <li>Post "Events" if you are hosting one.</li>
                        </ul>
                        <p>
                            These posts expire after 6 months (formerly 7 days), but they send "freshness" signals to Google.
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Step 4: Q&A Seeding</h2>
                        <p>
                            Did you know you can ask AND answer your own questions on your profile? This is 100% allowed by Google.
                        </p>
                        <p>
                            <strong>Do this:</strong> Post common questions like "Do you offer 24/7 service?" or "Do you give free estimates?"
                            and answer them yourself. It populates the profile with keywords.
                        </p>

                        <div className="bg-red-50 border-l-4 border-red-600 p-8 my-12 rounded-r-xl">
                            <h3 className="text-xl font-bold text-red-900 mb-2">Want Us to Manage This For You?</h3>
                            <p className="text-red-800 mb-4">
                                We optimize hundreds of GBPs. We know exactly what moves the needle for home service businesses.
                            </p>
                            <Link href="/services/local-seo" className="inline-block bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition">
                                Check Our Local SEO Plans
                            </Link>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </>
    );
}
