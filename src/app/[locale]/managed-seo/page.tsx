import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ManagedSeoView } from '@/components/managed-seo/ManagedSeoView';
import { MANAGED_SEO_EN_PATH, managedLanguageAlternates, managedSeoMeta } from '@/data/managed-seo';
import { buildMetadata } from '@/lib/seo';
import { withExactTitle } from '../services/_lib/exact-title';

export const revalidate = 3600;

/** English managed SEO page. Greek visitors stay on /el/diacheirisi-seo. */
export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'en') return {};
  const meta = managedSeoMeta(MANAGED_SEO_EN_PATH);
  const metadata = buildMetadata({
    title: meta.title,
    description: meta.description,
    path: MANAGED_SEO_EN_PATH,
    languages: managedLanguageAlternates(),
  });
  return withExactTitle(metadata, meta.title);
}

export default async function ManagedSeoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== 'en') notFound();
  return <ManagedSeoView locale="en" />;
}
