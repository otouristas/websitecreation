import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
    title: 'Privacy Policy | AnotherSEOGuru',
    description: 'How we collect, use, and protect your data.',
    path: '/privacy',
});

export default function PrivacyPage() {
    return (
        <>
            <Header />
            <main className="main-below-header pb-20">
                <div className="container max-w-4xl">
                    <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                    <div className="prose prose-lg text-gray-700">
                        <p className="mb-4">Last Updated: January 1, 2026</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us, such as when you fill out a contact form, request a quote, or sign up for our newsletter.</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
                        <p>We use the information we collect to provide, maintain, and improve our services, and to communicate with you.</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">3. Cookies</h2>
                        <p>We use cookies to analyze website traffic and optimize your website experience. You can instruct your browser to refuse all cookies.</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">4. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us at info@anotherseoguru.com.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
