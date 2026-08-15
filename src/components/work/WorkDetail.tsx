import Link from 'next/link';
import {
  getPortfolioBySlug,
  PORTFOLIO_CATEGORIES,
  portfolioProjects,
  type PortfolioProject,
} from '@/data/portfolio';
import { PortfolioThumbnail } from '@/components/landing/PortfolioThumbnail';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { generateArticleSchema, generateBreadcrumbSchema, combineSchemas } from '@/lib/seo/schema';
import { buildProjectCaseStudy } from '@/lib/portfolio-case-study';
import { getServiceEl } from '@/data/services-i18n';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { generateBreadcrumbs } from '@/lib/linking';

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
    <div className="mb-10">
      <h2 className="mb-4 font-display text-2xl font-medium tracking-[-0.02em]">{title}</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-muted-foreground">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
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
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: { name: 'AnotherSEOGuru', url: 'https://anotherseoguru.com' },
    image: {
      url: `https://anotherseoguru.com${project.screenshot}`,
      width: 1200,
      height: 630,
    },
  });
  const breadcrumbs = generateBreadcrumbs(
    [
      { name: isEl ? 'Έργα' : 'Work', url: '/work' },
      { name: project.name, url: `/work/${project.slug}` },
    ],
    locale,
  );
  const breadcrumbSchema = generateBreadcrumbSchema({ items: breadcrumbs });

  return (
    <>
      <SchemaMarkup schemas={combineSchemas(articleSchema, breadcrumbSchema)} />
      <section className="section ">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {isEl ? cat.labelEl : cat.label}
              </span>
              <h1 className="mb-4 text-4xl font-bold">{project.name}</h1>
              <p className="mb-6 text-lg text-muted-foreground">
                {isEl && project.summaryEl ? project.summaryEl : project.summary}
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                {project.markets.map((m) => (
                  <span key={m} className="rounded-md border border-hairline px-2 py-1 text-xs">
                    {m}
                  </span>
                ))}
                {project.languages.map((l) => (
                  <span key={l} className="rounded-md border border-hairline px-2 py-1 text-xs uppercase">
                    {l}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  {isEl ? 'Δείτε τη ζωντανή ιστοσελίδα' : 'View live site'} ↗
                </a>
                <Link
                  href={localizedPath(isEl ? 'el' : 'en', `/get-started?project=${project.category}`)}
                  className="btn btn-primary"
                >
                  {isEl ? 'Ζητήστε παρόμοιο έργο' : 'Get a similar project'}
                </Link>
              </div>
              {project.relatedUrls && project.relatedUrls.length > 0 ? (
                <div className="mt-4 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {isEl ? 'Σχετικοί ιστότοποι: ' : 'Related domains: '}
                  </span>
                  {project.relatedUrls.map((u, i) => (
                    <span key={u}>
                      {i > 0 ? ', ' : ''}
                      <a
                        href={u}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 hover:text-primary"
                      >
                        {u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                      </a>
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] border border-hairline shadow-lg">
              <PortfolioThumbnail src={project.screenshot} alt={isEl ? `${project.name} - αρχική σελίδα` : `${project.name} homepage`} />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl">
          <h2 className="mb-4 font-display text-2xl font-medium tracking-[-0.02em]">{isEl ? 'Επισκόπηση έργου' : 'Project overview'}</h2>
          <p className="mb-8 text-muted-foreground">{caseStudy.overview}</p>

          <h2 className="mb-4 font-display text-2xl font-medium tracking-[-0.02em]">{isEl ? 'Πρόκληση' : 'Challenge'}</h2>
          <p className="mb-8 text-muted-foreground">{caseStudy.challenge}</p>

          <h2 className="mb-4 font-display text-2xl font-medium tracking-[-0.02em]">{isEl ? 'Προσέγγιση' : 'Approach'}</h2>
          <p className="mb-10 text-muted-foreground">{caseStudy.approach}</p>

          <CaseStudyBlock title={caseStudy.seo.title} items={caseStudy.seo.items} />
          <CaseStudyBlock title={caseStudy.geoAeo.title} items={caseStudy.geoAeo.items} />
          <CaseStudyBlock title={caseStudy.technical.title} items={caseStudy.technical.items} />
          <CaseStudyBlock title={caseStudy.content.title} items={caseStudy.content.items} />

          <h2 className="mb-4 font-display text-2xl font-medium tracking-[-0.02em]">{isEl ? 'Υπηρεσίες που παραδόθηκαν' : 'Services delivered'}</h2>
          <ul className="mb-10 flex flex-wrap gap-2">
            {project.services.map((s) => {
              const label = isEl ? getServiceEl(s)?.shortName ?? s.replace(/-/g, ' ') : s.replace(/-/g, ' ');
              return (
                <li key={s}>
                  <Link
                    href={localizedPath(isEl ? 'el' : 'en', `/services/${s}`)}
                    className="rounded-lg bg-muted px-3 py-1.5 text-sm hover:bg-primary/10 hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {(project.seoTitle || project.seoDescription) && (
            <div className="mb-10 rounded-[8px] border border-hairline bg-surface-raised/40 p-6">
              <h2 className="mb-4 font-display text-xl font-medium tracking-[-0.02em]">{isEl ? 'Στιγμιότυπο SEO' : 'Live SEO snapshot'}</h2>
              {project.seoTitle && (
                <p className="mb-2 text-sm">
                  <strong>{isEl ? 'Τίτλος:' : 'Title:'}</strong> {project.seoTitle}
                </p>
              )}
              {project.seoDescription && (
                <p className="text-sm text-muted-foreground">
                  <strong>{isEl ? 'Meta περιγραφή:' : 'Meta:'}</strong> {project.seoDescription}
                </p>
              )}
            </div>
          )}

          <h2 className="mb-4 font-display text-2xl font-medium tracking-[-0.02em]">{isEl ? 'Αποτελέσματα' : 'Outcomes'}</h2>
          <ul className="mb-10 list-disc space-y-2 pl-5 text-muted-foreground">
            {caseStudy.outcomes.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>

          <p className="text-sm text-muted-foreground">
            {isEl ? 'Φιλοξενία: ' : 'Hosting: '}
            <a
              href="https://dailyhost.gr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
            >
              Dailyhost.gr
            </a>
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section border-t border-hairline bg-surface-raised/40">
          <div className="container">
            <h2 className="mb-6 font-display text-2xl font-medium tracking-[-0.02em]">{isEl ? 'Σχετικά έργα' : 'Related projects'}</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} href={lp(`/work/${p.slug}`)} className="card p-4 hover:border-primary/40">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {isEl && p.summaryEl ? p.summaryEl : p.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export function getWorkStaticParams() {
  return portfolioProjects.map((p) => ({ slug: p.slug }));
}

export function getWorkProject(slug: string) {
  return getPortfolioBySlug(slug);
}
