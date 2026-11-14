import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Container } from '@/components/kit';
import { PageHero } from '@/components/page-kit';
import { AGENCY_GUIDE_GROUPS } from '@/data/agency-guides';
import { getAllBlogPosts } from '@/lib/blog';
import { buildMetadata } from '@/lib/seo';
import { agencyHref } from '@/lib/site-split';

type PageProps = { params: Promise<{ locale: string }> };

const title = 'Οδηγοί για ιστοσελίδες και SEO';
const description = 'Τι να υπολογίσετε πριν φτιάξετε ιστοσελίδα ή e-shop, πώς να συγκρίνετε προσφορές SEO και τι αξίζει να βελτιώσετε για να σας βρίσκουν οι πελάτες σας.';

export function generateStaticParams() {
  return [{ locale: 'el' }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'el') return {};
  return buildMetadata({ title, description, path: '/el/odigoi', hreflangLocales: ['el'] });
}

export default async function AgencyGuidesPage({ params }: PageProps) {
  const { locale } = await params;
  if (locale !== 'el') notFound();

  const postsBySlug = new Map(getAllBlogPosts('el').map((post) => [post.slug, post]));
  return (
    <>
      <Header locale="el" />
      <main className="blueprint-grid">
        <PageHero
          locale="el"
          breadcrumbs={[
            { name: 'Υπηρεσίες', url: agencyHref('/el/ypiresies') },
            { name: 'Οδηγοί', url: agencyHref('/el/odigoi') },
          ]}
          title={title}
          lead={description}
          size="md"
          actions={null}
          trust={null}
        />
        <Container className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-5xl divide-y divide-hairline">
            {AGENCY_GUIDE_GROUPS.map((group) => (
              <section key={group.title} className="grid gap-6 py-9 sm:py-12 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
                <div>
                  <h2 className="font-display text-[23px] font-semibold leading-tight tracking-[-0.025em] text-foreground sm:text-[28px]">
                    {group.title}
                  </h2>
                  <p className="mt-3 max-w-md text-pretty text-[15px] leading-relaxed text-muted-foreground">
                    {group.description}
                  </p>
                  <Link
                    href={agencyHref(group.related.href)}
                    className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-link underline-offset-4 hover:underline"
                  >
                    {group.related.label}
                    <ArrowRight className="size-4 shrink-0" aria-hidden />
                  </Link>
                </div>
                <ul className="divide-y divide-hairline rounded-2xl border border-hairline bg-surface px-5">
                  {group.slugs.map((slug) => {
                    const post = postsBySlug.get(slug);
                    if (!post) throw new Error(`Missing Greek agency guide: ${slug}`);
                    return (
                      <li key={slug}>
                        <Link
                          href={agencyHref(`/el/blog/${slug}`)}
                          className="flex min-h-11 items-center justify-between gap-4 py-3.5 text-[15px] leading-snug text-foreground transition-colors hover:text-link"
                        >
                          {post.title}
                          <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </Container>
      </main>
      <Footer locale="el" />
    </>
  );
}
