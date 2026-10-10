import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpenText, ListOrdered, Shuffle } from 'lucide-react';
import { PageShell } from '@/components/bespoke/PageShell';
import { SearchLayersStack } from '@/components/ai-search';
import {
  Accent,
  CheckList,
  CtaBand,
  KitEyebrow,
  KitHeading,
  KitSection,
  StepsGrid,
  kitPrimaryBtn,
  kitSecondaryBtn,
} from '@/components/kit';
import { ChipLinks, KitFaq, PageHero, accentTail } from '@/components/page-kit';
import {
  SEARCH_LAYERS,
  SEARCH_LAYERS_FAQS,
  SEARCH_LAYERS_PUBLISHED,
  SEARCH_LAYERS_UPDATED,
} from '@/data/search-layers';
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
 * The layer model: SEO, AEO, GEO, AIO, DEO, SXO on one URL.
 *
 * `docs/seo-2026/README.md` has "own «τι είναι το GEO» and «τι είναι το AEO»"
 * at P0: seven blog posts define these terms in parallel, so none of them can
 * win the definitional query and the commercial hub inherits nothing. This is
 * that owner - the framework, not the pitch. `/services/ai-visibility` stays
 * the page that sells the work, and every layer here links to whichever
 * service actually does it.
 *
 * English only, like the rest of `/resources`: next.config redirects
 * /el/resources/* to /en, so there is no Greek duplicate to canonicalise away.
 */

type PageProps = { params: Promise<{ locale: string }> };

const PATH = '/resources/search-optimization-layers';
const ANATOMY_PATH = '/resources/ai-search-page-anatomy';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildMetadata({
    title: 'Layers of Modern Search Optimization',
    description:
      'SEO, AEO, GEO, AIO, DEO and SXO in one model: what each layer optimizes for, what it asks of a page, and the signals that tell you whether it is working.',
    path: localizedPath(locale as SiteLocale, PATH),
    canonicalPath: localizedPath('en', PATH),
    primaryKeyword: 'search optimization layers',
  });
}

/** The order the layers have to be worked in, and why skipping ahead fails. */
const SEQUENCE = [
  {
    title: 'Access before anything',
    body: 'If a crawler cannot reach the page, render it without JavaScript and index it, no later layer has anything to work with. This is SEO, and it did not stop being the prerequisite.',
  },
  {
    title: 'Then the shape of the answer',
    body: 'Question-shaped headings, an answer in the first paragraph, tables where there are figures. AEO formatting is also what makes a passage retrievable, which is why GEO gets easier once it is done.',
  },
  {
    title: 'Then something worth quoting',
    body: 'A model can generate the definition already. Citations go to original data, named expertise and first-hand findings, so GEO is a publishing problem before it is a markup problem.',
  },
  {
    title: 'Then the facts it compares on',
    body: 'An assistant shortlisting suppliers needs price, availability, terms and reviews in a form it can read. AIO makes them parseable; DEO decides whether what it parses puts you on the list.',
  },
  {
    title: 'And conversion throughout',
    body: 'Every layer above delivers a visit or a mention. SXO is what that visit turns into, and it is the only layer whose result lands in the bank account.',
  },
] as const;

const CONSTANT = [
  'Crawlability, indexing and a site that renders server-side',
  'Content that answers the question it was written for',
  'One consistent set of facts about the business, everywhere',
  'Demonstrable expertise, named and credited',
  'Speed, clarity and a path to an enquiry',
] as const;

const CHANGED = [
  'The answer is often assembled before the click, so the snippet is the SERP',
  'Assistants quote a handful of sources and drop the rest of the page',
  'Entities are resolved across the whole web, not read off one page',
  'Structured facts decide who gets shortlisted by a model, not just ranked',
  'Fewer visits, each one further along the decision',
] as const;

export default async function SearchOptimizationLayersPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const siteLocale = locale as SiteLocale;
  const lp = (path: string) => localizedPath(siteLocale, path);

  const breadcrumbItems = generateBreadcrumbs(
    [
      { name: 'Resources', url: '/resources' },
      { name: 'Search optimization layers', url: PATH },
    ],
    'en',
  );

  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: breadcrumbItems }),
    generateArticleSchema({
      headline: 'The layers of modern search optimization',
      description:
        'SEO, AEO, GEO, AIO, DEO and SXO: what each layer optimizes for, what it asks of a page, and how it is measured.',
      datePublished: SEARCH_LAYERS_PUBLISHED,
      dateModified: SEARCH_LAYERS_UPDATED,
      inLanguage: 'en',
      mainEntityOfPage: `${BASE_URL}${localizedPath('en', PATH)}`,
      author: { name: 'AnotherSEOGuru', url: BASE_URL },
    }),
    // Five questions, written for this page, visible on it, on no other URL.
    generateFAQSchema({ faqs: [...SEARCH_LAYERS_FAQS] }),
  );

  return (
    <PageShell locale={siteLocale} signatureHue={240} schemas={schemas}>
      <PageHero
        locale={siteLocale}
        breadcrumbs={breadcrumbItems}
        pill={{ href: lp(ANATOMY_PATH), kind: 'ai', tag: 'Framework', text: 'From discovery to decision' }}
        title={accentTail('The layers of modern search optimization', 2)}
        size="md"
        /* Answer-first: the whole model in one liftable paragraph. */
        lead="SEO, AEO, GEO, AIO, DEO and SXO are not six competing strategies. They are six successive moments in the same journey: being found, being quoted, being cited, being understood, being recommended, and being chosen. Each one asks something different of the same page, and none of them replaces the one below it."
        meta={
          <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            From discovery to decision. Below, each layer gets its goal, what it optimizes for,
            what it needs from your content, and the signals that tell you whether it is working.
          </p>
        }
        actions={
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={lp('/get-started')} className={kitPrimaryBtn}>
              Get a visibility audit
            </Link>
            <Link href={lp('/services/ai-visibility')} className={kitSecondaryBtn}>
              How we work on AI visibility
            </Link>
          </div>
        }
        trust={
          /* The six, as anchors, so a reader can jump and a link can land. */
          <ul className="flex flex-wrap justify-center gap-2">
            {SEARCH_LAYERS.map((layer) => (
              <li key={layer.abbr}>
                <a
                  href={`#${layer.id}`}
                  className="inline-flex min-h-10 items-baseline gap-2 rounded-full border border-hairline bg-surface/60 px-3.5 py-2 text-sm transition-colors hover:border-brand/50 hover:bg-surface-raised/80"
                >
                  <span className="font-display font-semibold text-foreground">{layer.abbr}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {layer.goal}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        }
      />

      <KitSection className="!pt-14">
        <SearchLayersStack locale={siteLocale} />
      </KitSection>

      <KitSection tinted>
        <KitHeading
          eyebrow="Order of operations"
          eyebrowIcon={<ListOrdered />}
          title={accentTail('The layers stack, so the work does too', 3)}
          description="Nobody buys their way to a citation while the site is uncrawlable. This is the sequence, and the reason each step is where it is."
        />
        <StepsGrid className="mt-10" steps={SEQUENCE.map((step) => ({ title: step.title, text: step.body }))} />
      </KitSection>

      <KitSection>
        <KitHeading
          eyebrow="What actually changed"
          eyebrowIcon={<Shuffle />}
          title={accentTail('New acronyms, older obligations', 2)}
          description="Most of the list on the left has been true for a decade. The list on the right is what the answer engines added to it."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-hairline bg-surface/70 p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-foreground">Unchanged since 2015</h3>
            <CheckList className="mt-5" items={CONSTANT} />
          </div>
          <div className="rounded-2xl border border-primary/30 bg-surface/70 p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-foreground">New since generative answers</h3>
            <CheckList className="mt-5" items={CHANGED} />
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          No engine exposes a ranking lever, and none of this makes a citation owed to anyone. The
          layers describe what you can control.
        </p>
      </KitSection>

      <KitSection className="!pt-0">
        <div className="rounded-3xl border border-hairline bg-surface/70 p-8 md:p-10">
          <KitEyebrow icon={<BookOpenText />}>Companion piece</KitEyebrow>
          <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em] text-foreground md:text-3xl">
            What the layers look like on <Accent>one page</Accent>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            The model says what to optimize for. The anatomy shows where it lands in the HTML:
            title and URL, the answer above the fold, extractable passages, tables, original data,
            schema, author and freshness, annotated block by block on a sample page.
          </p>
          <div className="mt-6">
            <Link href={lp(ANATOMY_PATH)} className={kitSecondaryBtn}>
              Read the page anatomy &rarr;
            </Link>
          </div>
        </div>
      </KitSection>

      <KitFaq
        items={[...SEARCH_LAYERS_FAQS]}
        title={accentTail('Questions this model gets asked', 2)}
        description="Short answers. Longer ones live on the service pages each layer links to."
      />

      <KitSection className="!pb-0">
        <KitHeading
          align="center"
          title={accentTail('Where does your site sit on the stack?', 2)}
          description="An audit tells you which layer is actually blocking the next one, which is usually not the layer people arrive worried about."
        />
        <ChipLinks
          align="center"
          className="mt-8"
          items={[
            { href: lp('/get-started'), label: 'Request an audit' },
            { href: lp('/services/ai-visibility'), label: 'AI visibility' },
            { href: lp('/glossary'), label: 'SEO glossary' },
          ]}
        />
      </KitSection>

      <CtaBand locale={siteLocale} source="resources-layers-band" />
    </PageShell>
  );
}
