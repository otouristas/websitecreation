import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
    title: 'Terms of Service | AnotherSEOGuru',
    description: 'Terms and conditions for using AnotherSEOGuru services.',
    path: '/terms',
});

export default function TermsPage() {
    return (
        <>
            <Header />
            <main className="pt-32 pb-20">
                <div className="container max-w-4xl">
                    <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                    <div className="prose prose-lg text-gray-700">
                        <p className="mb-4">Last Updated: January 1, 2026</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
                        <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">2. Services</h2>
                        <p>AnotherSEOGuru provides digital marketing, SEO, and web design services. All deliverables are subject to the specific service agreements signed by clients.</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">3. Intellectual Property</h2>
                        <p>All content on this site is the property of AnotherSEOGuru. Client deliverables become client property upon full payment.</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">4. Limitation of Liability</h2>
                        <p>We make no guarantees regarding specific search engine rankings, as these are controlled by third-party algorithms (Google).</p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
