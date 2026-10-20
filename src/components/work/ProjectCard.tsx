import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_CATEGORIES, type PortfolioProject } from '@/data/portfolio';
import { projectStory } from '@/data/portfolio-stories';
import { MOBILE_CAPTURES } from '@/data/portfolio-mobile';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

export function ProjectCard({ project, locale, compact = false }: { project: PortfolioProject; locale: SiteLocale; compact?: boolean }) {
  const el = locale === 'el', category = PORTFOLIO_CATEGORIES[project.category];
  const mobile = MOBILE_CAPTURES.includes(project.slug);
  return <Link href={localizedPath(locale, `/work/${project.slug}`)} className="group block h-full rounded-[1.6rem] outline-offset-4 focus-visible:outline-2 focus-visible:outline-brand">
    <div className={`relative isolate overflow-hidden rounded-[1.6rem] border border-hairline bg-gradient-to-br from-brand/10 via-surface to-primary/10 ${compact ? 'aspect-[16/11]' : 'aspect-[16/11] sm:aspect-[16/10]'}`}>
      <span className="absolute left-5 top-5 z-10 rounded-full border border-hairline bg-background/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground backdrop-blur">{el ? category.labelEl : category.label}</span>
      <span className="absolute right-5 top-5 z-10 grid size-9 place-items-center rounded-full border border-hairline bg-background/90 text-foreground transition-colors group-hover:bg-brand group-hover:text-background"><ArrowUpRight className="size-4" aria-hidden /></span>
      <div className={`absolute bottom-[-4%] left-[7%] top-[24%] overflow-hidden rounded-t-xl border border-hairline bg-background shadow-2xl transition-transform duration-500 motion-safe:group-hover:-translate-y-2 ${mobile ? 'w-[79%]' : 'w-[86%]'}`}>
        <div className="flex h-7 items-center gap-1.5 border-b border-hairline bg-surface px-3"><i className="size-1.5 rounded-full bg-muted-foreground/30"/><i className="size-1.5 rounded-full bg-muted-foreground/30"/><i className="size-1.5 rounded-full bg-muted-foreground/30"/><span className="ml-2 truncate font-mono text-[8px] text-muted-foreground">{project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</span></div>
        <div className="relative h-full"><Image src={project.screenshot} alt={el ? `Η ιστοσελίδα ${project.name}` : `${project.name} website`} fill sizes="(max-width: 640px) 80vw, 520px" className="object-cover object-top"/></div>
      </div>
      {mobile && <div className="absolute bottom-[-7%] right-[5%] top-[38%] w-[24%] overflow-hidden rounded-[1.1rem] border-[4px] border-foreground/80 bg-background shadow-2xl transition-transform duration-500 motion-safe:group-hover:-translate-y-1"><Image src={`/portfolio/mobile/${project.slug}.webp`} alt={el ? `${project.name} σε κινητό` : `${project.name} on mobile`} fill sizes="160px" className="object-cover object-top"/></div>}
      {project.liveStatus && <span className="absolute bottom-4 left-5 rounded-full bg-background/90 px-2.5 py-1 text-[10px] text-muted-foreground">{el ? 'Από το αρχείο έργων' : 'From the project archive'}</span>}
    </div>
    <div className="flex items-start justify-between gap-4 px-1 pb-3 pt-5"><div><h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{project.name}</h3><p className="mt-2 max-w-lg text-[14px] leading-6 text-muted-foreground">{projectStory(project.slug, locale).headline}</p></div><span className="mt-1.5 hidden shrink-0 text-[11px] text-link sm:block">{el ? 'Δείτε το έργο' : 'Explore project'} ↗</span></div>
  </Link>;
}
