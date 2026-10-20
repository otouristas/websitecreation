import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Compass, MousePointer2, Search, Target } from 'lucide-react';
import { getPortfolioBySlug, PORTFOLIO_CATEGORIES, portfolioProjects, type PortfolioProject } from '@/data/portfolio';
import { PROJECT_RESEARCH } from '@/data/portfolio-research';
import { PortfolioThumbnail } from '@/components/landing/PortfolioThumbnail';
import { ClientSearchResults } from './ClientSearchResults';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { AppWindow, CtaBand, KitHeading, KitSection, kitPrimaryBtn, kitSecondaryBtn } from '@/components/kit';
import { CardGrid, ChipLinks, LinkCard, PageHero, accentTail } from '@/components/page-kit';
import { generateArticleSchema, generateBreadcrumbSchema, combineSchemas } from '@/lib/seo/schema';
import { getServiceEl } from '@/data/services-i18n';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { generateBreadcrumbs } from '@/lib/linking';
import { GENERATED_CONTENT_PUBLISHED, GENERATED_CONTENT_UPDATED } from '@/lib/seo/content-dates';

export function WorkDetail({ project, locale = 'en' }: {project: PortfolioProject; locale?: SiteLocale}) {
  const isEl = locale === 'el', lp = (path: string) => localizedPath(locale, path);
  const tx = (en: string, el: string) => isEl ? el : en;
  const brief = PROJECT_RESEARCH[project.slug];
  const cat = PORTFOLIO_CATEGORIES[project.category];
  const related = portfolioProjects.filter(p => p.category === project.category && p.slug !== project.slug && !p.liveStatus).slice(0,3);
  const domain = project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  const breadcrumbs = generateBreadcrumbs([{name:tx('Work','Έργα'),url:'/work'},{name:project.name,url:`/work/${project.slug}`}],locale);
  const article = generateArticleSchema({
    headline: `${project.name} | ${tx('Website project','Παρουσίαση έργου')}`,
    description:brief.overview[locale], datePublished:GENERATED_CONTENT_PUBLISHED, dateModified:GENERATED_CONTENT_UPDATED,
    author:{name:'AnotherSEOGuru',url:'https://anotherseoguru.com'},
    image:{url:`https://anotherseoguru.com${project.screenshot}`,width:1200,height:750},
    // Coarse identity only. A hotel directory is not itself a hotel or a licensed travel agency.
    ...(!project.liveStatus ? {about:{type:'Organization',name:project.name,url:project.url}} : {}),
  });
  return <>
    <SchemaMarkup schemas={combineSchemas(article,generateBreadcrumbSchema({items:breadcrumbs}))} />
    <PageHero locale={locale} size="md" breadcrumbs={breadcrumbs}
      pill={{href:lp('/work'),kind:project.liveStatus ? 'save' : 'live',tag:isEl ? cat.labelEl : cat.label,text:tx('Website project','Παρουσίαση έργου')}}
      title={accentTail(project.name)} lead={brief.overview[locale]}
      meta={<p className="font-mono text-xs text-muted-foreground">{domain}</p>}
      actions={<div className="flex flex-wrap justify-center gap-3">
        {project.liveStatus === 'offline' ? <span className={kitSecondaryBtn}>{tx('Archived project','Παλαιότερο έργο')}</span> : <a href={project.url} target="_blank" rel="noopener noreferrer" className={kitSecondaryBtn}>{tx('Visit website','Δείτε την ιστοσελίδα')}<ArrowUpRight className="size-4" aria-hidden /></a>}
        <Link href={lp(`/get-started?project=${project.category}`)} className={kitPrimaryBtn}>{tx('Build a project like this','Σχεδιάστε το δικό σας έργο')}<ArrowRight className="size-4" aria-hidden /></Link>
      </div>}
    >
      <div className="mx-auto mt-12 w-full max-w-[1120px] px-3 sm:px-6">
        <AppWindow url={domain} label={`${project.name} ${tx('homepage','αρχική σελίδα')}`}><div className="relative aspect-[3/2] overflow-hidden"><PortfolioThumbnail hero src={project.screenshot} alt={`${project.name} · ${tx('website design','σχεδιασμός ιστοσελίδας')}`} /></div></AppWindow>
        {project.liveStatus && <p className="mt-3 text-center text-xs text-muted-foreground">{tx('Project archive screenshot.','Στιγμιότυπο από το αρχείο του έργου.')}</p>}
      </div>
    </PageHero>
    <KitSection>
      <div className="grid gap-4 md:grid-cols-3">{brief.features[locale].map((feature,i)=><div key={feature} className="flex items-start gap-4 rounded-2xl border border-hairline bg-surface/70 p-6"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-link"><Check className="size-5" aria-hidden /></span><div><span className="font-mono text-[10px] text-muted-foreground">0{i+1}</span><h2 className="mt-1 text-base font-semibold text-foreground">{feature}</h2></div></div>)}</div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-hairline bg-surface/60 p-7 sm:p-9"><Target className="size-6 text-link" aria-hidden /><h2 className="mt-5 font-display text-2xl font-semibold tracking-tight">{tx('Built around the visitor','Με αφετηρία τον επισκέπτη')}</h2><p className="mt-4 leading-7 text-muted-foreground">{brief.audience[locale]}</p></article>
        <article className="rounded-3xl border border-hairline bg-gradient-to-br from-primary/10 via-surface to-surface p-7 sm:p-9"><MousePointer2 className="size-6 text-link" aria-hidden /><h2 className="mt-5 font-display text-2xl font-semibold tracking-tight">{tx('From discovery to action','Από την αναζήτηση στην ενέργεια')}</h2><p className="mt-4 leading-7 text-muted-foreground">{brief.journey[locale]}</p></article>
      </div>
      <div className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl border border-hairline bg-surface/40 p-5"><Search className="size-4 text-link" aria-hidden /><h2 className="mr-2 text-sm font-medium">{tx('Search topics','Θέματα αναζήτησης')}</h2>{brief.keywords[locale].map(keyword=><span key={keyword} className="rounded-full border border-hairline bg-background px-3 py-1.5 text-xs text-muted-foreground">{keyword}</span>)}</div>
    </KitSection>
    <KitSection tinted>
      <ClientSearchResults locale={locale} slug={project.slug} />
      <div className="mt-8 flex flex-wrap items-start justify-between gap-6"><div><div className="inline-flex items-center gap-2 text-link"><Compass className="size-4" aria-hidden /><h2 className="font-display text-lg font-semibold">{tx('Project services','Υπηρεσίες έργου')}</h2></div><ChipLinks className="mt-4" items={project.services.map(sv=>({href:lp(`/services/${sv}`),label:isEl ? getServiceEl(sv)?.shortName ?? sv.replace(/-/g,' ') : sv.replace(/-/g,' '),key:sv}))} /></div>{project.relatedUrls && <div className="text-sm text-muted-foreground"><p>{tx('Related project websites','Σχετικές ιστοσελίδες του έργου')}</p>{project.relatedUrls.map(url=><a key={url} href={url} rel="noopener noreferrer" target="_blank" className="mt-2 block text-link hover:underline">{url.replace(/^https?:\/\//,'')} ↗</a>)}</div>}</div>
    </KitSection>
    {related.length > 0 && <KitSection><KitHeading eyebrow={isEl ? cat.labelEl : cat.label} title={tx('Explore related projects','Δείτε σχετικά έργα')} /><CardGrid className="mt-10">{related.map(p=><LinkCard key={p.slug} href={lp(`/work/${p.slug}`)} title={p.name} text={isEl ? p.summaryEl || p.summary : p.summary} />)}</CardGrid></KitSection>}
    <CtaBand locale={locale} source={`work-${project.slug}`} />
  </>;
}
export function getWorkStaticParams(){return portfolioProjects.map(p=>({slug:p.slug}));}
export function getWorkProject(slug:string){return getPortfolioBySlug(slug);}
