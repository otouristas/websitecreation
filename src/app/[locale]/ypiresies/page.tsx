import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HomePageView } from '@/components/pages/HomePageView';
import { buildMetadata } from '@/lib/seo';
import { AGENCY_HOME_EL } from '@/lib/site-split';
import { withExactTitle } from '../services/_lib/exact-title';

type PageProps = { params: Promise<{ locale: string }> };

/**
 * The agency's Greek landing page: websites and SEO done for you. The site
 * homepage is the product (AnotherSEOGuru App); this page becomes the
 * homepage of anotherseoguru.gr when the agency moves there. English
 * visitors are sent here by the middleware (src/lib/site-split.ts).
 */
export function generateStaticParams() {
  return [{ locale: 'el' }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'el') return {};
  // Exact SERP title: this page owns «εταιρεία SEO»; «υπηρεσίες SEO»
  // belongs to /el/seo-services. Built from the Google top 3 for «εταιρεία
  // SEO» (2026-10-23): all lead with «Εταιρεία SEO», plus Ελλάδα and a free check.
  const title = 'Εταιρεία SEO στην Ελλάδα, με Δωρεάν Έλεγχο | AnotherSEOGuru';
  return withExactTitle(
    buildMetadata({
      title,
      description:
        'Εταιρεία SEO στην Ελλάδα για ξενοδοχεία, rent-a-car και τοπικές επιχειρήσεις: τεχνικό SEO, GEO/AEO και μέτρηση σε αιτήματα. Ζητήστε δωρεάν έλεγχο.',
      path: AGENCY_HOME_EL,
      primaryKeyword: 'εταιρεία SEO',
    }),
    title,
  );
}

export default async function AgencyHomePage({ params }: PageProps) {
  const { locale } = await params;
  if (locale !== 'el') notFound();
  return <HomePageView locale="el" />;
}
