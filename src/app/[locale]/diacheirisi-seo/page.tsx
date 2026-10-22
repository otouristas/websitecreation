import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ManagedSeoView } from '@/components/managed-seo/ManagedSeoView';
import { MANAGED_SEO_EL_PATH, managedLanguageAlternates, managedSeoMeta } from '@/data/managed-seo';
import { buildMetadata } from '@/lib/seo';
import { withExactTitle } from '../services/_lib/exact-title';

export const revalidate = 3600;

/** Greek managed SEO page. English visitors stay on /en/managed-seo. */
export function generateStaticParams() {
  return [{ locale: 'el' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'el') return {};
  const meta = managedSeoMeta(MANAGED_SEO_EL_PATH);
  const metadata = buildMetadata({
    title: meta.title,
    description: meta.description,
    path: MANAGED_SEO_EL_PATH,
    languages: managedLanguageAlternates(),
  });
  return withExactTitle(metadata, meta.title);
}

export default async function DiacheirisiSeoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== 'el') notFound();
  return <ManagedSeoView locale="el" />;
}
