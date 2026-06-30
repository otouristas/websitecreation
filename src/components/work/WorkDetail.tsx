import Link from 'next/link';
import {
  getPortfolioBySlug,
  PORTFOLIO_CATEGORIES,
  portfolioProjects,
  type PortfolioProject,
} from '@/data/portfolio';
import { PortfolioThumbnail } from '@/components/landing/PortfolioThumbnail';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { generateArticleSchema } from '@/lib/seo/schema';
import { buildProjectCaseStudy } from '@/lib/portfolio-case-study';
import { getServiceEl } from '@/data/services-i18n';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

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
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
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
    headline: `${project.name} — ${isEl ? 'Case Study' : 'Case Study'}`,
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

  return (
    <>
      <SchemaMarkup schemas={[articleSchema]} />
      <section className="section gradient-hero">
        <div className="container">
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href={lp('/')} className="hover:text-primary">
              {isEl ? 'Αρχική' : 'Home'}
            </Link>
            <span>/</span>
            <Link href={lp('/work')} className="hover:text-primary">
              {isEl ? 'Έργα' : 'Work'}
            </Link>
            <span>/</span>
            <span className="text-foreground">{project.name}</span>
          </nav>
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
                  <span key={m} className="rounded-md border border-border px-2 py-1 text-xs">
                    {m}
                  </span>
                ))}
                {project.languages.map((l) => (
                  <span key={l} className="rounded-md border border-border px-2 py-1 text-xs uppercase">
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
                  {isEl ? 'Δείτε live site' : 'View live site'} ↗
                </a>
                <Link
                  href={localizedPath(isEl ? 'el' : 'en', `/get-started?project=${project.category}`)}
                  className="btn btn-gradient"
                >
                  {isEl ? 'Ζητήστε παρόμοιο έργο' : 'Get a similar project'}
                </Link>
              </div>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border shadow-lg">
              <PortfolioThumbnail src={project.screenshot} alt={`${project.name} homepage`} />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold">{isEl ? 'Επισκόπηση έργου' : 'Project overview'}</h2>
          <p className="mb-8 text-muted-foreground">{caseStudy.overview}</p>

          <h2 className="mb-4 text-2xl font-bold">{isEl ? 'Πρόκληση' : 'Challenge'}</h2>
          <p className="mb-8 text-muted-foreground">{caseStudy.challenge}</p>

          <h2 className="mb-4 text-2xl font-bold">{isEl ? 'Προσέγγιση' : 'Approach'}</h2>
          <p className="mb-10 text-muted-foreground">{caseStudy.approach}</p>

          <CaseStudyBlock title={caseStudy.seo.title} items={caseStudy.seo.items} />
          <CaseStudyBlock title={caseStudy.geoAeo.title} items={caseStudy.geoAeo.items} />
          <CaseStudyBlock title={caseStudy.technical.title} items={caseStudy.technical.items} />
          <CaseStudyBlock title={caseStudy.content.title} items={caseStudy.content.items} />

          <h2 className="mb-4 text-2xl font-bold">{isEl ? 'Υπηρεσίες που παραδόθηκαν' : 'Services delivered'}</h2>
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
            <div className="mb-10 rounded-xl border border-border bg-muted/30 p-6">
              <h2 className="mb-4 text-xl font-bold">{isEl ? 'Live SEO snapshot' : 'Live SEO snapshot'}</h2>
              {project.seoTitle && (
                <p className="mb-2 text-sm">
                  <strong>Title:</strong> {project.seoTitle}
                </p>
              )}
              {project.seoDescription && (
                <p className="text-sm text-muted-foreground">
                  <strong>Meta:</strong> {project.seoDescription}
                </p>
              )}
            </div>
          )}

          <h2 className="mb-4 text-2xl font-bold">{isEl ? 'Αποτελέσματα' : 'Outcomes'}</h2>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            {caseStudy.outcomes.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section border-t border-border bg-muted/20">
          <div className="container">
            <h2 className="mb-6 text-2xl font-bold">{isEl ? 'Σχετικά έργα' : 'Related projects'}</h2>
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
