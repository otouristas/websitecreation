import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HubView } from '@/components/place-seo/HubView';
import { BASE_URL, buildMetadata } from '@/lib/seo';

const DESCRIPTION =
  'SEO σε όλη την Ελλάδα: μία σελίδα ανά πόλη και νησί, με υπηρεσίες SEO και προώθηση ιστοσελίδων. Δείτε την περιοχή σας. Ζητήστε δωρεάν έλεγχο.';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'el') return {};
  return buildMetadata({
    title: 'SEO σε όλη την Ελλάδα',
    description: DESCRIPTION,
    path: '/el/seo',
    languages: {
      el: `${BASE_URL}/el/seo`,
      'x-default': `${BASE_URL}/el/seo`,
    },
  });
}

export default async function SeoHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== 'el') notFound();
  return <HubView />;
}
