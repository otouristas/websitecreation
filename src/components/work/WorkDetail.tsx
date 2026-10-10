import Link from 'next/link';
import {
  getPortfolioBySlug,
  PORTFOLIO_CATEGORIES,
  portfolioProjects,
  type PortfolioProject,
} from '@/data/portfolio';
import { PortfolioThumbnail } from '@/components/landing/PortfolioThumbnail';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { ArrowRight, Compass, FileText, Target, TrendingUp } from 'lucide-react';
import {
  AppWindow,
  CheckList,
  CtaBand,
  KitHeading,
  KitSection,
  Stage,
  kitPrimaryBtn,
  kitSecondaryBtn,
} from '@/components/kit';
import { CardGrid, ChipLinks, InfoCard, LinkCard, PageHero, accentTail } from '@/components/page-kit';
import { generateArticleSchema, generateBreadcrumbSchema, combineSchemas } from '@/lib/seo/schema';
import { schemaTypeForPortfolioCategory } from '@/data/ai-mode-tags';
import { buildProjectCaseStudy } from '@/lib/portfolio-case-study';
import { getServiceEl } from '@/data/services-i18n';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { generateBreadcrumbs } from '@/lib/linking';
import { GENERATED_CONTENT_PUBLISHED, GENERATED_CONTENT_UPDATED } from '@/lib/seo/content-dates';

interface WorkDetailProps {
  project: PortfolioProject;
  locale?: SiteLocale;
}

function CaseStudyBlock({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="reveal rounded-2xl border border-hairline bg-surface/60 p-6">
      <h2 className="font-display text-[20px] font-semibold tracking-[-0.025em] text-foreground">{title}</h2>
      <CheckList size="sm" className="mt-4" items={items} />
    </div>
  );
}

export function WorkDetail({ project, locale = 'en' }: WorkDetailProps) {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);
  const cat = PORTFOLIO_CATEGORIES[project.category];
  const caseStudy = buildProjectCaseStudy(project, locale);
  const related = portfolioProjects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  const articleSchema = generateArticleSchema({
    headline: `${project.name} - ${isEl ? 'Μελέτη περίπτωσης' : 'Case Study'}`,
    description: isEl && project.summaryEl ? project.summaryEl : project.summary,
    datePublished: GENERATED_CONTENT_PUBLISHED,
    dateModified: GENERATED_CONTENT_UPDATED,
    author: { name: 'AnotherSEOGuru', url: 'https://anotherseoguru.com' },
    image: {
      url: `https://anotherseoguru.com${project.screenshot}`,
      width: 1200,
      height: 630,
    },
    // Say what the business is, not just that we wrote about it. Without this
    // the page names a real company and describes its market while asserting
    // nothing machine-readable about the company existing.
    //
    // Identity only: type, name, url, and the coarse markets already recorded
    // in portfolio.ts. No address, phone, geo, hours, price or rating - we do
    // not hold those for clients, and nothing here may be aspirational.
    // Skipped entirely when the site is offline: four of these domains are
    // dead, one is a parked for-sale page, and asserting a live business for a
    // parked domain is the class of untruth this repo keeps removing.
    ...(project.liveStatus === 'offline'
      ? {}
      : {
          about: {
            type: schemaTypeForPortfolioCategory(project.category),
            name: project.name,
            url: project.url,
            areaServed: project.markets,
          },
        }),
  });
  const breadcrumbs = generateBreadcrumbs(
    [
      { name: isEl ? 'Έργα' : 'Work', url: '/work' },
      { name: project.name, url: `/work/${project.slug}` },
    ],
    locale,
  );
  const breadcrumbSchema = generateBreadcrumbSchema({ items: breadcrumbs });

  const tx = (en: string, el: string) => (isEl ? el : en);
  const domain = project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

  return (
    <>
      <SchemaMarkup schemas={combineSchemas(articleSchema, breadcrumbSchema)} />
      <PageHero
        locale={locale}
        size="md"
        breadcrumbs={breadcrumbs}
        pill={{
          href: lp('/work'),
          kind: project.liveStatus === 'offline' ? 'save' : 'live',
          tag: isEl ? cat.labelEl : cat.label,
          text: tx('Case study', 'Μελέτη περίπτωσης'),
        }}
        title={accentTail(project.name)}
        lead={isEl && project.summaryEl ? project.summaryEl : project.summary}
        meta={
          <ul className="flex flex-wrap justify-center gap-1.5">
            {project.markets.map((m) => (
              <li key={m} className="rounded-md border border-hairline bg-surface/70 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                {m}
              </li>
            ))}
            {project.languages.map((l) => (
              <li key={l} className="rounded-md border border-hairline bg-surface/70 px-2 py-0.5 font-mono text-[11px] uppercase text-muted-foreground">
                {l}
              </li>
            ))}
          </ul>
        }
        actions={
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            {/* Four projects' domains no longer serve - one is a parked
                for-sale page. Sending a visitor to a parking page under
                "View live site" is worse than saying so. */}
            {project.liveStatus === 'offline' ? (
              <span className={`${kitSecondaryBtn} pointer-events-none opacity-70`}>
                {isEl ? 'Η ιστοσελίδα δεν είναι πλέον ενεργή' : 'Site no longer live'}
              </span>
            ) : (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className={kitSecondaryBtn}>
                {isEl ? 'Δείτε τη ζωντανή ιστοσελίδα' : 'View live site'} ↗
              </a>
            )}
            <Link href={localizedPath(isEl ? 'el' : 'en', `/get-started?project=${project.category}`)} className={kitPrimaryBtn}>
              {isEl ? 'Ζητήστε παρόμοιο έργο' : 'Get a similar project'}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        }
        trust={
          project.relatedUrls && project.relatedUrls.length > 0 ? (
            <p className="text-[13px] text-muted-foreground">
              <span className="font-medium text-foreground">{isEl ? 'Σχετικοί ιστότοποι: ' : 'Related domains: '}</span>
              {project.relatedUrls.map((u, i) => (
                <span key={u}>
                  {i > 0 ? ', ' : ''}
                  <a href={u} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">
                    {u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                  </a>
                </span>
              ))}
            </p>
          ) : null
        }
      >
        <div className="mx-auto mt-12 w-full max-w-[1000px] px-3 sm:px-6">
          <AppWindow url={domain} label={isEl ? `${project.name} - αρχική σελίδα` : `${project.name} homepage`}>
            <div className="relative aspect-[16/10] overflow-hidden">
              <PortfolioThumbnail src={project.screenshot} alt={isEl ? `${project.name} - αρχική σελίδα` : `${project.name} homepage`} />
            </div>
          </AppWindow>
        </div>
      </PageHero>

      <KitSection>
        <div className="grid gap-4 md:grid-cols-3">
          <InfoCard as="h2" icon={<FileText />} title={isEl ? 'Επισκόπηση έργου' : 'Project overview'} text={caseStudy.overview} />
          <InfoCard as="h2" icon={<Target />} title={isEl ? 'Πρόκληση' : 'Challenge'} text={caseStudy.challenge} />
          <InfoCard as="h2" icon={<Compass />} title={isEl ? 'Προσέγγιση' : 'Approach'} text={caseStudy.approach} />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <CaseStudyBlock title={caseStudy.seo.title} items={caseStudy.seo.items} />
          <CaseStudyBlock title={caseStudy.geoAeo.title} items={caseStudy.geoAeo.items} />
          <CaseStudyBlock title={caseStudy.technical.title} items={caseStudy.technical.items} />
          <CaseStudyBlock title={caseStudy.content.title} items={caseStudy.content.items} />
        </div>
      </KitSection>

      <KitSection tinted>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <KitHeading
              eyebrow={tx('Results', 'Αποτελέσματα')}
              eyebrowIcon={<TrendingUp />}
              title={isEl ? 'Αποτελέσματα' : 'Outcomes'}
            />
            <CheckList className="mt-6" items={caseStudy.outcomes} />
            <h2 className="mt-12 font-display text-[22px] font-semibold tracking-[-0.025em] text-foreground">
              {isEl ? 'Υπηρεσίες που παραδόθηκαν' : 'Services delivered'}
            </h2>
            <ChipLinks
              className="mt-4"
              items={project.services.map((sv) => ({
                href: localizedPath(isEl ? 'el' : 'en', `/services/${sv}`),
                label: isEl ? getServiceEl(sv)?.shortName ?? sv.replace(/-/g, ' ') : sv.replace(/-/g, ' '),
                key: sv,
              }))}
            />
            <p className="mt-8 text-[14px] text-muted-foreground">
              {isEl ? 'Φιλοξενία: ' : 'Hosting: '}
              <a
                href="https://dailyhost.gr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline underline-offset-4 hover:text-brand"
              >
                Dailyhost.gr
              </a>
            </p>
          </div>
          {(project.seoTitle || project.seoDescription) && (
            <div className="min-w-0">
              <Stage>
                <div className="rounded-xl border border-hairline bg-background p-5 sm:p-6">
                  <h2 className="font-display text-[20px] font-semibold tracking-[-0.025em] text-foreground">
                    {isEl ? 'Στιγμιότυπο SEO' : 'Live SEO snapshot'}
                  </h2>
                  <div className="mt-4 rounded-lg border border-hairline bg-surface/60 p-4">
                    <p className="truncate font-mono text-[12px] text-muted-foreground">{domain}</p>
                    {project.seoTitle && (
                      <p className="mt-1 text-[15.5px] font-medium leading-snug text-link">
                        <span className="sr-only">{isEl ? 'Τίτλος:' : 'Title:'} </span>
                        {project.seoTitle}
                      </p>
                    )}
                    {project.seoDescription && (
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
                        <span className="sr-only">{isEl ? 'Meta περιγραφή:' : 'Meta:'} </span>
                        {project.seoDescription}
                      </p>
                    )}
                  </div>
                </div>
              </Stage>
            </div>
          )}
        </div>
      </KitSection>

      {related.length > 0 && (
        <KitSection>
          <KitHeading eyebrow={isEl ? cat.labelEl : cat.label} title={isEl ? 'Σχετικά έργα' : 'Related projects'} />
          <CardGrid className="mt-10">
            {related.map((p) => (
              <LinkCard key={p.slug} href={lp(`/work/${p.slug}`)} title={p.name} text={isEl && p.summaryEl ? p.summaryEl : p.summary} />
            ))}
          </CardGrid>
        </KitSection>
      )}

      <CtaBand locale={locale} source={`work-${project.slug}`} />
    </>
  );
}

export function getWorkStaticParams() {
  return portfolioProjects.map((p) => ({ slug: p.slug }));
}

export function getWorkProject(slug: string) {
  return getPortfolioBySlug(slug);
}
