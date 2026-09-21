import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageShell, ShellCrumbs } from '@/components/bespoke/PageShell';
import FAQSection from '@/components/seo/FAQSection';
import { SearchLayersStack } from '@/components/ai-search';
import {
  Section,
  SectionHeading,
  Bloom,
  Eyebrow,
  PrimaryButtonLink,
  GhostButtonLink,
  Tick,
} from '@/components/landing/primitives';
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
      <section className="relative overflow-hidden border-b border-hairline">
        <Bloom className="left-1/2 top-[-12rem] h-[30rem] w-[56rem] -translate-x-1/2" />
        <div className="relative mx-auto max-w-3xl px-6 pb-16 pt-6">
          <ShellCrumbs items={breadcrumbItems} />
          <Eyebrow>Framework</Eyebrow>
          <h1 className="mt-4 font-display text-[2.4rem] font-medium leading-[1.05] tracking-[-0.04em] sm:text-5xl">
            The layers of modern search optimization
          </h1>
          {/* Answer-first: the whole model in one liftable paragraph. */}
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            SEO, AEO, GEO, AIO, DEO and SXO are not six competing strategies. They are six
            successive moments in the same journey: being found, being quoted, being cited, being
            understood, being recommended, and being chosen. Each one asks something different of
            the same page, and none of them replaces the one below it.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            From discovery to decision. Below, each layer gets its goal, what it optimizes for,
            what it needs from your content, and the signals that tell you whether it is working.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButtonLink href={lp('/get-started')}>Get a visibility audit</PrimaryButtonLink>
            <GhostButtonLink href={lp('/services/ai-visibility')}>
              How we work on AI visibility
            </GhostButtonLink>
          </div>

          {/* The six, as anchors, so a reader can jump and a link can land. */}
          <ul className="mt-10 flex flex-wrap gap-2">
            {SEARCH_LAYERS.map((layer) => (
              <li key={layer.abbr}>
                <a
                  href={`#${layer.id}`}
                  className="inline-flex items-baseline gap-2 rounded-full border border-hairline bg-surface/60 px-3.5 py-2 text-sm transition-colors hover:border-brand/50 hover:bg-surface-raised/80"
                >
                  <span className="font-display font-semibold text-foreground">{layer.abbr}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {layer.goal}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section className="max-w-6xl">
        <SearchLayersStack locale={siteLocale} />
      </Section>

      <Section className="border-t border-hairline">
        <SectionHeading
          eyebrow="Order of operations"
          title="The layers stack, so the work does too"
          body="Nobody buys their way to a citation while the site is uncrawlable. This is the sequence, and the reason each step is where it is."
        />
        <ol className="mx-auto mt-10 max-w-2xl space-y-6">
          {SEQUENCE.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-hairline font-display text-sm text-brand">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-lg font-medium text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="border-t border-hairline">
        <SectionHeading
          eyebrow="What actually changed"
          title="New acronyms, older obligations"
          body="Most of the list on the left has been true for a decade. The list on the right is what the answer engines added to it."
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-display text-lg font-medium text-foreground">
              Unchanged since 2015
            </h3>
            <ul className="mt-4 space-y-3">
              {CONSTANT.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
                  <Tick />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-2xl p-6">
            <h3 className="font-display text-lg font-medium text-foreground">
              New since generative answers
            </h3>
            <ul className="mt-4 space-y-3">
              {CHANGED.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
                  <Tick className="text-signature" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          No engine exposes a ranking lever, and none of this makes a citation owed to anyone. The
          layers describe what you can control.
        </p>
      </Section>

      <Section className="border-t border-hairline">
        <div className="glass rounded-2xl p-8 md:p-10">
          <Eyebrow>Companion piece</Eyebrow>
          <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em] text-foreground md:text-3xl">
            What the layers look like on one page
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            The model says what to optimize for. The anatomy shows where it lands in the HTML:
            title and URL, the answer above the fold, extractable passages, tables, original data,
            schema, author and freshness, annotated block by block on a sample page.
          </p>
          <div className="mt-6">
            <GhostButtonLink href={lp(ANATOMY_PATH)}>
              Read the page anatomy &rarr;
            </GhostButtonLink>
          </div>
        </div>
      </Section>

      <Section className="border-t border-hairline">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions this model gets asked"
          body="Short answers. Longer ones live on the service pages each layer links to."
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <FAQSection faqs={[...SEARCH_LAYERS_FAQS]} title="" locale="en" />
        </div>
      </Section>

      <Section className="border-t border-hairline">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-foreground">
            Where does your site sit on the stack?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            An audit tells you which layer is actually blocking the next one, which is usually not
            the layer people arrive worried about.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryButtonLink href={lp('/get-started')}>Request an audit</PrimaryButtonLink>
            <GhostButtonLink href={lp('/services/ai-visibility')}>AI visibility</GhostButtonLink>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            More definitions in the{' '}
            <Link href={lp('/glossary')} className="text-link underline-offset-4 hover:underline">
              SEO glossary
            </Link>
            .
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
