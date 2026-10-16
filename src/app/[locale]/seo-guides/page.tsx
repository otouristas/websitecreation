import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, Layers } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { PostCard } from '@/components/blog/PostCard';
import { PillarGrid } from '@/components/blog/PillarGrid';
import { CtaBand, KitHeading, KitSection, kitSecondaryBtn } from '@/components/kit';
import { PageHero, accentTail } from '@/components/page-kit';
import { SEO_GUIDES_COPY, SEO_GUIDES_PATH, SEO_GUIDE_TOPIC_PILLARS } from '@/data/seo-guides';
import { getPillarSummary } from '@/lib/blog';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { generateBreadcrumbs } from '@/lib/linking';
import { getSeoGuideHub } from '@/lib/seo-guides';
import { buildMetadata } from '@/lib/seo';
import {
  BASE_URL,
  combineSchemas,
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
} from '@/lib/seo/schema';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const copy = SEO_GUIDES_COPY[locale];
  return buildMetadata({
    title: copy.seoTitle,
    description: copy.description,
    path: localizedPath(locale, SEO_GUIDES_PATH),
    hreflangPath: SEO_GUIDES_PATH,
    primaryKeyword: copy.title,
  });
}

export default async function SeoGuidesPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const siteLocale = locale as SiteLocale;
  const isEl = siteLocale === 'el';
  const copy = SEO_GUIDES_COPY[siteLocale];
  const lp = (path: string) => localizedPath(siteLocale, path);
  const hub = getSeoGuideHub(siteLocale);
  if (hub.posts.length === 0) notFound();

  const topicPillars = getPillarSummary(siteLocale).filter((pillar) =>
    (SEO_GUIDE_TOPIC_PILLARS as readonly string[]).includes(pillar.pillar),
  );

  const breadcrumbItems = generateBreadcrumbs([{ name: copy.title, url: SEO_GUIDES_PATH }], siteLocale);

  const schemas = combineSchemas(
    generateCollectionPageSchema({
      name: copy.heading,
      description: copy.intro,
      url: `${BASE_URL}${lp(SEO_GUIDES_PATH)}`,
      inLanguage: siteLocale,
      items: hub.posts.map((post) => ({
        url: `${BASE_URL}${lp(`/blog/${post.slug}`)}`,
        name: post.title,
        itemType: 'BlogPosting',
      })),
    }),
    generateBreadcrumbSchema({ items: breadcrumbItems }),
  );

  const guideCount = isEl
    ? `${hub.posts.length} ${hub.posts.length === 1 ? 'οδηγός' : 'οδηγοί'}`
    : `${hub.posts.length} ${hub.posts.length === 1 ? 'guide' : 'guides'}`;

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={siteLocale} />
      <main className="blueprint-grid relative z-0">
        <PageHero
          locale={siteLocale}
          breadcrumbs={breadcrumbItems}
          pill={{
            href: lp('/blog'),
            kind: 'new',
            tag: isEl ? 'Κόμβος' : 'Hub',
            text: isEl ? 'Όλα τα άρθρα του blog' : 'Browse the whole blog',
          }}
          title={accentTail(copy.heading, 1)}
          lead={copy.intro}
          meta={
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-brand">
              {guideCount}
            </p>
          }
          actions={null}
          trust={null}
          size="md"
        />

        <KitSection className="!pt-14">
          {hub.pillar ? (
            <div>
              <KitHeading
                eyebrow={copy.pillarEyebrow}
                eyebrowIcon={<BookOpen />}
                title={accentTail(copy.pillarTitle, 1)}
              />
              <div className="mt-10">
                <PostCard post={hub.pillar} locale={siteLocale} featured />
              </div>
            </div>
          ) : null}

          {hub.groups.map((group) => (
            <div key={group.id} className="mt-16">
              <h2 className="font-display text-[22px] font-semibold tracking-[-0.025em] text-foreground">
                {group.title}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.posts.map((post) => (
                  <PostCard key={post.slug} post={post} locale={siteLocale} />
                ))}
              </div>
            </div>
          ))}

          <p className="mt-12 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            {copy.servicesLead}{' '}
            <Link href={lp('/seo-services')} className="text-foreground underline decoration-brand/50 underline-offset-4 hover:text-brand">
              {copy.servicesLabel}
            </Link>{' '}
            {isEl ? 'και τις' : 'and'}{' '}
            <Link href={lp('/pricing')} className="text-foreground underline decoration-brand/50 underline-offset-4 hover:text-brand">
              {copy.pricingLabel}
            </Link>
            .
          </p>
        </KitSection>

        {topicPillars.length > 0 ? (
          <KitSection>
            <KitHeading
              eyebrow={copy.topicsEyebrow}
              eyebrowIcon={<Layers />}
              title={accentTail(copy.topicsTitle, 1)}
              description={copy.topicsBody}
            />
            <div className="mt-10">
              <PillarGrid pillars={topicPillars} locale={siteLocale} />
            </div>
            <div className="mt-10 flex justify-center">
              <Link href={lp('/blog')} className={kitSecondaryBtn}>
                {copy.blogLabel}
              </Link>
            </div>
          </KitSection>
        ) : null}

        <CtaBand locale={siteLocale} source="seo-guides-band" />
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
