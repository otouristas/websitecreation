import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileCta from '@/components/StickyMobileCta';
import { WorkIndexClient } from '@/components/work/WorkIndexClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Portfolio — Tourism, Hotels & Rent-a-car',
  description:
    '55+ live websites for hotels, rent-a-car, tours, villas and travel AI. Browse our portfolio of SEO-optimized tourism projects across Greece, UK, US, Canada and Europe.',
  path: '/work',
  primaryKeyword: 'tourism website portfolio',
  hreflangPath: '/work',
});

export default function WorkPage() {
  return (
    <>
      <Header />
      <main className="main-below-header">
        <section className="section gradient-hero">
          <div className="container max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Our work</h1>
            <p className="text-lg text-muted-foreground">
              Live websites we designed, built and optimized for tourism, hospitality, rent-a-car and travel AI —
              across Greece, UK, US, Canada and Europe.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <WorkIndexClient />
          </div>
        </section>
      </main>
      <StickyMobileCta />
      <Footer />
    </>
  );
}
