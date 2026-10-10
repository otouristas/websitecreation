import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Compass, ListChecks, ScanSearch, ShieldAlert } from 'lucide-react';
import { PageShell } from '@/components/bespoke/PageShell';
import { AiPageAnatomy } from '@/components/ai-search';
import {
  Accent,
  CheckList,
  CtaBand,
  KitHeading,
  KitSection,
  StepsGrid,
  kitPrimaryBtn,
  kitSecondaryBtn,
} from '@/components/kit';
import { ChipLinks, KitFaq, PageHero, accentTail } from '@/components/page-kit';
import { ANATOMY_FAQS, ANATOMY_PUBLISHED, ANATOMY_UPDATED } from '@/data/ai-page-anatomy';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { buildMetadata } from '@/lib/seo';
import {
  BASE_URL,
  combineSchemas,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/lib/seo/schema';
import { generateBreadcrumbs } from '@/lib/linking';

/**
 * The on-page checklist, rebuilt for the moment the reader is a model deciding
 * what to cite rather than a person deciding what to click.
 *
 * The companion to `/resources/search-optimization-layers`: that page says what
 * each layer optimizes for, this one shows where it lands in the HTML. It is
 * deliberately built as markup rather than shipped as the infographic it came
 * from - a picture of good structure is the one format that fails every point
 * it makes.
 *
 * English only, like the rest of `/resources`.
 */

type PageProps = { params: Promise<{ locale: string }> };

const PATH = '/resources/ai-search-page-anatomy';
const LAYERS_PATH = '/resources/search-optimization-layers';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildMetadata({
    title: 'Anatomy of a Page Built for AI Search',
    description:
      'The on-page checklist for AI search: answer-first openings, extractable passages, tables, original data, schema and crawler access, annotated block by block.',
    path: localizedPath(locale as SiteLocale, PATH),
    canonicalPath: localizedPath('en', PATH),
    primaryKeyword: 'AI search page optimization',
  });
}

/**
 * Reading the page as a machine does. Deliberately not a restatement of the
 * twelve notes - the diagram already carries those in full, and printing them
 * a second time on the same URL would be one more page that repeats itself.
 */
const AUDIT_STEPS = [
  {
    title: 'Read the HTML the server sent',
    body: 'View source rather than the inspector, or fetch the URL with curl. What is in that response is what a crawler that does not run JavaScript gets. Anything missing from it is missing, full stop.',
  },
  {
    title: 'Check who is allowed in',
    body: 'Open /robots.txt and look for GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot and Google-Extended by name. A blanket allow covers them; a blanket disallow with a Googlebot exception does not.',
  },
  {
    title: 'Lift a paragraph out at random',
    body: 'Copy one from the middle of the page and read it with nothing around it. If it needs the paragraph above to make sense, a retrieval system cannot use it either.',
  },
  {
    title: 'Look for the number',
    body: 'Find the one figure on the page that nobody else could have published, and check that its sample size, period and method are next to it. If there is no such figure, that is the finding.',
  },
  {
    title: 'Compare the markup with the copy',
    body: 'Run the page through a structured-data test and read what it asserts. Every claim in the JSON-LD has to appear in the visible text, and anything the text says that the markup omits is a free signal left on the table.',
  },
] as const;

/** What this page is not, said early, because the diagram invites the opposite. */
const NOT_A_SCORE = [
  'There is no score here and nothing to hit 100 on',
  'Doing all twelve does not make a citation owed to you',
  'A page that needs every one of them is usually two pages',
  'The example content is fiction, including every figure in it',
] as const;

export default async function AiSearchPageAnatomyPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const siteLocale = locale as SiteLocale;
  const lp = (path: string) => localizedPath(siteLocale, path);

  const breadcrumbItems = generateBreadcrumbs(
    [
      { name: 'Resources', url: '/resources' },
      { name: 'AI search page anatomy', url: PATH },
    ],
    'en',
  );

  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: breadcrumbItems }),
    generateArticleSchema({
      headline: 'Anatomy of a page built for AI search',
      description:
        'Twelve parts of a page that decide whether an answer engine can read it, quote it and cite it, annotated on a worked example.',
      datePublished: ANATOMY_PUBLISHED,
      dateModified: ANATOMY_UPDATED,
      inLanguage: 'en',
      mainEntityOfPage: `${BASE_URL}${localizedPath('en', PATH)}`,
      author: { name: 'AnotherSEOGuru', url: BASE_URL },
    }),
    generateFAQSchema({ faqs: [...ANATOMY_FAQS] }),
  );

  return (
    <PageShell locale={siteLocale} signatureHue={262} schemas={schemas}>
      <PageHero
        locale={siteLocale}
        breadcrumbs={breadcrumbItems}
        pill={{ href: lp(LAYERS_PATH), kind: 'ai', tag: 'AEO', text: 'Answer engine optimization' }}
        title={accentTail('Anatomy of a page built for AI search', 2)}
        size="md"
        /* Answer-first, and practising what the page preaches. */
        lead="The classic on-page checklist assumed a person scanning results and deciding what to click. This one assumes a language model deciding what to quote. The two want different things from the same HTML: liftable answers rather than clever introductions, tables rather than prose, attributed numbers rather than adjectives, and text the server sent rather than text a browser drew."
        meta={
          <p className="text-[15px] text-muted-foreground">
            Twelve parts of a page, each one annotated on a worked example below.
          </p>
        }
        actions={
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={lp('/get-started')} className={kitPrimaryBtn}>
              Get your pages audited
            </Link>
            <Link href={lp(LAYERS_PATH)} className={kitSecondaryBtn}>
              The six layers &rarr;
            </Link>
          </div>
        }
      />

      <KitSection className="!pt-14">
        <KitHeading
          eyebrow="The page, annotated"
          eyebrowIcon={<ScanSearch />}
          title={accentTail('Twelve parts of one page', 2)}
          description="A worked example in the middle, the notes in the margins. Everything in the sample is invented, including the figures; the points around it are not."
        />
        <AiPageAnatomy className="mt-12" />
      </KitSection>

      <KitSection tinted>
        <KitHeading
          eyebrow="How to check a page"
          eyebrowIcon={<ListChecks />}
          title={accentTail('Auditing one of your own, in five minutes', 2)}
          description="Read the page the way a retrieval system does rather than the way its author does. Most of what is wrong shows up in the first two steps."
        />
        <StepsGrid className="mt-10" steps={AUDIT_STEPS.map((step) => ({ title: step.title, text: step.body }))} />
      </KitSection>

      <KitSection>
        <div className="mx-auto max-w-3xl">
          <KitHeading
            eyebrow="Honest limits"
            eyebrowIcon={<ShieldAlert />}
            title={<>What this is <Accent>not</Accent></>}
            description="Checklists turn into scorecards, and scorecards turn into pages written for a machine that nobody wants to read."
          />
          <div className="mt-8 rounded-2xl border border-hairline bg-surface/70 p-6 sm:p-8">
            <CheckList items={NOT_A_SCORE} />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              The order the effort pays in is set out on{' '}
              <Link href={lp(LAYERS_PATH)} className="text-primary underline-offset-4 hover:underline">
                the layer model
              </Link>
              : access first, then the shape of the answer, then the material worth quoting.
            </p>
          </div>
        </div>
      </KitSection>

      <KitFaq
        items={[...ANATOMY_FAQS]}
        title={accentTail('Questions about writing for answer engines', 2)}
        description="Asked often enough to belong on the page rather than in a reply."
      />

      <KitSection className="!pb-0">
        <KitHeading
          align="center"
          eyebrow="Keep going"
          eyebrowIcon={<Compass />}
          title={accentTail('Run this over your own pages', 2)}
          description="We audit the pages that already have demand, fix what blocks retrieval, and track which assistants start citing them."
        />
        <ChipLinks
          align="center"
          className="mt-8"
          items={[
            { href: lp('/get-started'), label: 'Request an audit' },
            { href: lp('/tools/llm-citation-tracking'), label: 'LLM citation tracking' },
            { href: lp(LAYERS_PATH), label: 'The layers of search optimization' },
          ]}
        />
      </KitSection>

      <CtaBand locale={siteLocale} source="resources-anatomy-band" />
    </PageShell>
  );
}
