import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
    title: 'Medical SEO Guide: How to Grow Your Practice | AnotherSEOGuru',
    description: 'The complete guide to SEO for doctors, plastic surgeons, and med spas. Learn compliance-friendly marketing strategies to get more patients.',
    path: '/blog/medical-marketing',
});

export default function MedicalMarketingGuide() {
    return (
        <>
            <Header />
            <main className="pt-32 pb-20">
                <article className="container max-w-4xl">
                    <header className="mb-12 text-center">
                        <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-medium mb-6">
                            Healthcare Marketing
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                            Medical SEO: The Ultimate Guide for Growing Your Practice
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Why relying on ZocDoc and referrals is keeping your practice small—and how to take control of your patient flow.
                        </p>
                    </header>

                    <div className="prose prose-lg max-w-none text-gray-700">
                        <p>
                            Marketing a medical practice is different. You aren't just selling a product; you are asking for
                            immense trust. Whether you are a <Link href="/solutions/plastic-surgeons" className="text-blue-600 hover:underline">Plastic Surgeon</Link>
                            looking for rhinoplasty patients or a <Link href="/solutions/med-spas" className="text-blue-600 hover:underline">Med Spa</Link>
                            promoting Botox, your SEO strategy needs to be precise.
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Your Money or Your Life (YMYL)</h2>
                        <p>
                            Google treats medical websites differently. They fall under "YMYL" guidelines, meaning the bar for quality
                            is much higher. You cannot just write generic content. You need to demonstrate <strong>Experience, Expertise,
                                Authoritativeness, and Trust (E-E-A-T)</strong>.
                        </p>
                        <ul className="list-disc pl-6 mb-8">
                            <li><strong>Author Bios:</strong> Every article must be reviewed by a medical professional.</li>
                            <li><strong>Citations:</strong> Link to reputable sources (NIH, PubMed).</li>
                            <li><strong>Safety Info:</strong> Be transparent about risks and recovery times.</li>
                        </ul>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Local SEO for Patients</h2>
                        <p>
                            Patients want convenience. They search for "Botox near me" or "Best dermatologist in [City]".
                            Your Google Business Profile must be spotless, with photos of your clinic, updated hours, and
                            strict adherence to HIPAA when responding to reviews.
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. The Power of "Before & Afters"</h2>
                        <p>
                            For aesthetic practices, your results are your best marketing. However, you must optimize these images:
                        </p>
                        <ul className="list-disc pl-6 mb-8">
                            <li><strong>Alt Text:</strong> Describe the procedure (e.g., "Rhinoplasty before and after side profile").</li>
                            <li><strong>File Names:</strong> Don't use "IMG_123.jpg". Use "lip-filler-results-patient-1.jpg".</li>
                            <li><strong>load Speed:</strong> High-res photos hurt speed. Compress them without losing clarity.</li>
                        </ul>

                        <div className="bg-teal-50 border-l-4 border-teal-600 p-8 my-12 rounded-r-xl">
                            <h3 className="text-xl font-bold text-teal-900 mb-2">Specialized Medical SEO</h3>
                            <p className="text-teal-800 mb-4">
                                We understand HIPAA, AHPRA, and medical board advertising guidelines. Let us handle the compliance
                                while you handle the patients.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-4">
                                <Link href="/solutions/plastic-surgeons" className="btn bg-white text-teal-700 border border-teal-200 hover:bg-teal-50">
                                    Plastic Surgeons
                                </Link>
                                <Link href="/solutions/dentists" className="btn bg-white text-teal-700 border border-teal-200 hover:bg-teal-50">
                                    Dentists
                                </Link>
                                <Link href="/contact" className="btn bg-teal-600 text-white hover:bg-teal-700 border-transparent">
                                    Get a Strategy Audit
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
