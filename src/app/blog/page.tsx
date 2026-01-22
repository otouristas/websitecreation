import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
    title: 'Local SEO & Marketing Blog | AnotherSEOGuru',
    description: 'Insights, guides, and masterclasses on growing your local business with SEO. Read our latest articles.',
    path: '/blog',
});

const articles = [
    {
        slug: 'local-seo-guide',
        title: 'The Ultimate Guide to Local SEO for Home Services',
        excerpt: 'How plumbers, HVAC techs, and contractors can stop chasing leads and start attracting them with Google Maps. A complete breakdown of the strategy.',
        category: 'Local SEO',
        color: 'bg-blue-100 text-blue-700',
    },
    {
        slug: 'google-business-profile-masterclass',
        title: 'Google Business Profile Masterclass: Dominate Local Search',
        excerpt: 'Step-by-step guide to optimizing your Google Business Profile. Categories, photos, reviews, and the secret "Posts" strategy.',
        category: 'Tactical Guide',
        color: 'bg-red-100 text-red-700',
    },
    {
        slug: 'diy-vs-agency',
        title: 'DIY SEO vs. Hiring an Agency: The Honest Truth',
        excerpt: 'Should you do your own SEO or hire an agency? We break down the costs, time commitment, and results of DIY vs professional services.',
        category: 'Business Strategy',
        color: 'bg-green-100 text-green-700',
    },
    {
        slug: 'medical-marketing',
        title: 'Medical SEO: The Ultimate Guide for Growing Your Practice',
        excerpt: 'The complete guide to SEO for doctors, plastic surgeons, and med spas. Learn compliance-friendly marketing strategies to get more patients.',
        category: 'Healthcare Marketing',
        color: 'bg-teal-100 text-teal-700',
    },
];

export default function BlogIndex() {
    return (
        <>
            <Header />
            <main className="pt-32 pb-20">
                <section className="container">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Local SEO Insights</h1>
                        <p className="text-xl text-gray-600">
                            Actionable advice to help you grow your business, dominate your local market, and get more leads.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <Link key={article.slug} href={`/blog/${article.slug}`} className="group card p-0 overflow-hidden hover-glow block h-full">
                                <div className="p-8 flex flex-col h-full">
                                    <div className="mb-4">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${article.color}`}>
                                            {article.category}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                                        {article.title}
                                    </h2>
                                    <p className="text-gray-600 mb-6 flex-grow">
                                        {article.excerpt}
                                    </p>
                                    <div className="font-bold text-blue-600 flex items-center mt-auto">
                                        Read Article
                                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
