'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getPortfolioBySlug } from '@/data/portfolio';
import { HOME_WORK_SLUGS } from '@/data/home-content';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { ProjectCard } from '@/components/work/ProjectCard';

export function WorkRail({ locale = 'en' }: { locale?: SiteLocale }) {
  const el = locale === 'el', rail = useRef<HTMLDivElement>(null), [active, setActive] = useState(0);
  const projects = HOME_WORK_SLUGS.map(getPortfolioBySlug).filter((p): p is NonNullable<typeof p> => !!p && !p.liveStatus);
  function move(direction: number) {
    const node = rail.current, card = node?.firstElementChild;
    if (!node || !card) return;
    node.scrollBy({ left: direction * (card.getBoundingClientRect().width + 24), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  return <section id="in-action" className="overflow-hidden border-y border-hairline bg-surface/25 py-20 sm:py-28" aria-label={el ? 'Επιλεγμένα έργα' : 'Selected projects'}>
    <div className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-8 px-5 sm:px-8">
      <div className="max-w-2xl"><p className="text-[11px] font-medium uppercase tracking-[0.22em] text-link">{el ? 'ΙΣΤΟΣΕΛΙΔΕΣ ΜΕ ΧΑΡΑΚΤΗΡΑ' : 'DIGITAL EXPERIENCES WITH CHARACTER'}</p><h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-6xl">{el ? <>Κάθε έργο,<br/><span className="text-brand">μια δική του ιστορία.</span></> : <>Every project.<br/><span className="text-brand">A story of its own.</span></>}</h2><p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">{el ? 'Από μια βίλα στη Σίφνο μέχρι ένα ψηφιακό προϊόν. Δείτε την επιχείρηση, την εμπειρία και τη σκέψη πίσω από κάθε ιστοσελίδα.' : 'From a villa on Sifnos to a digital product. Meet the business, explore the experience and see the thinking behind each website.'}</p></div>
      <div className="flex items-center gap-3"><button type="button" aria-label={el ? 'Προηγούμενα έργα' : 'Previous projects'} onClick={() => move(-1)} className="grid size-12 place-items-center rounded-full border border-hairline bg-surface text-foreground transition-colors hover:border-brand hover:text-brand"><ArrowLeft className="size-5"/></button><button type="button" aria-label={el ? 'Επόμενα έργα' : 'Next projects'} onClick={() => move(1)} className="grid size-12 place-items-center rounded-full border border-hairline bg-surface text-foreground transition-colors hover:border-brand hover:text-brand"><ArrowRight className="size-5"/></button></div>
    </div>
    <div ref={rail} tabIndex={0} onScroll={e => { const n=e.currentTarget, w=n.firstElementChild?.getBoundingClientRect().width ?? 1; setActive(Math.min(projects.length-1,Math.round(n.scrollLeft/(w+24)))); }} className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-2 outline-offset-[-2px] scrollbar-none [scroll-padding-inline:1.25rem] sm:px-[max(2rem,calc((100vw-1200px)/2+2rem))]">
      {projects.map(project => <article key={project.slug} className="w-[84vw] max-w-[600px] shrink-0 snap-start sm:w-[560px]"><ProjectCard project={project} locale={locale}/></article>)}
    </div>
    <div className="mx-auto mt-7 flex max-w-[1200px] items-center gap-5 px-5 sm:px-8"><span className="font-mono text-xs tabular-nums text-muted-foreground">{String(active+1).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}</span><div className="h-px flex-1 bg-hairline"><div className="h-px bg-brand transition-[width] motion-reduce:transition-none" style={{width:`${(active+1)/projects.length*100}%`}}/></div><Link href={localizedPath(locale,'/work')} className="inline-flex items-center gap-2 text-sm text-link">{el ? 'Όλα τα έργα' : 'Explore all projects'}<ArrowRight className="size-4"/></Link></div>
  </section>;
}
