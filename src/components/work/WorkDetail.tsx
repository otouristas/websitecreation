import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Globe2, Monitor, MousePointer2, Search } from "lucide-react";
import { getPortfolioBySlug, PORTFOLIO_CATEGORIES, portfolioProjects, type PortfolioProject } from "@/data/portfolio";
import { PROJECT_RESEARCH } from "@/data/portfolio-research";
import { projectStory } from "@/data/portfolio-stories";
import { MOBILE_CAPTURES } from "@/data/portfolio-mobile";
import { ProjectCard } from "./ProjectCard";
import { ClientSearchResults } from "./ClientSearchResults";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateArticleSchema, generateBreadcrumbSchema, combineSchemas } from "@/lib/seo/schema";
import { getServiceEl } from "@/data/services-i18n";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { generateBreadcrumbs } from "@/lib/linking";
import { GENERATED_CONTENT_PUBLISHED, GENERATED_CONTENT_UPDATED } from "@/lib/seo/content-dates";
import { WaveEyebrow, WaveSection, waveGhostBtn, wavePrimaryBtn } from "@/components/pages/platform-wave/ui";
import { accentEnd } from "@/components/pages/services-wave/ui";
import { cn } from "@/lib/cn";

export function WorkDetail({ project, locale = "en" }: { project: PortfolioProject; locale?: SiteLocale }) {
  const el = locale === "el";
  const tx = (en: string, gr: string) => (el ? gr : en);
  const lp = (path: string) => localizedPath(locale, path);
  const brief = PROJECT_RESEARCH[project.slug];
  const story = projectStory(project.slug, locale);
  const category = PORTFOLIO_CATEGORIES[project.category];
  const mobile = MOBILE_CAPTURES.includes(project.slug);
  const domain = project.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  const related = portfolioProjects
    .filter((p) => p.slug !== project.slug && !p.liveStatus)
    .sort((a, b) => Number(b.category === project.category) - Number(a.category === project.category))
    .slice(0, 2);
  const breadcrumbs = generateBreadcrumbs(
    [
      { name: tx("Work", "Έργα"), url: "/work" },
      { name: project.name, url: `/work/${project.slug}` },
    ],
    locale,
  );
  const article = generateArticleSchema({
    headline: `${project.name} | ${story.headline}`,
    description: brief.overview[locale],
    datePublished: GENERATED_CONTENT_PUBLISHED,
    dateModified: GENERATED_CONTENT_UPDATED,
    author: { name: "AnotherSEOGuru", url: "https://anotherseoguru.com" },
    image: { url: `https://anotherseoguru.com${project.screenshot}`, width: 1200, height: 750 },
    ...(!project.liveStatus ? { about: { type: "Organization", name: project.name, url: project.url } } : {}),
  });
  const services = project.services
    .map((s) => (el ? getServiceEl(s)?.shortName ?? s.replace(/-/g, " ") : s.replace(/-/g, " ")))
    .join(" · ");

  return (
    <>
      <SchemaMarkup schemas={combineSchemas(article, generateBreadcrumbSchema({ items: breadcrumbs }))} />
      <section data-shot="hero" className="hero-below-header relative overflow-x-clip">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="kit-grid absolute inset-0 [mask-image:radial-gradient(ellipse_80%_65%_at_50%_0%,black_40%,transparent_100%)]" />
          <div className="absolute left-[-10%] top-[-120px] size-[min(520px,80vw)] rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute right-[-8%] top-[180px] size-[min(460px,70vw)] rounded-full bg-signal/15 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1240px] px-5 pb-16 pt-6 lg:px-8 lg:pb-24 lg:pt-10">
          <Link href={lp("/work")} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="size-4" aria-hidden />
            {tx("Back to our work", "Πίσω στα έργα")}
          </Link>
          <div className="mb-10 mt-8 grid min-w-0 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="min-w-0">
              <WaveEyebrow>
                {el ? category.labelEl : category.label}
                <span className="mx-2 text-muted-foreground">/</span>
                {tx("A closer look", "Το έργο από κοντά")}
              </WaveEyebrow>
              <h1 className="mt-5 text-balance font-display text-[1.85rem] font-bold leading-[1.05] tracking-[-0.04em] text-foreground min-[400px]:text-[2.2rem] sm:text-[3rem] lg:text-[3.6rem]">
                {accentEnd(project.name, 2)}
              </h1>
            </div>
            <div className="min-w-0">
              <p className="text-pretty font-display text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl">{story.headline}</p>
              <p className="mt-4 max-w-xl text-pretty text-[15px] leading-7 text-muted-foreground">{brief.overview[locale]}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                {project.liveStatus === "offline" ? (
                  <span className="text-sm text-muted-foreground">{tx("Archived project", "Παλαιότερο έργο")}</span>
                ) : (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    {tx("Visit the website", "Δείτε την ιστοσελίδα")}
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                )}
                <a href="#project-story" className="text-sm text-muted-foreground underline decoration-hairline underline-offset-4">
                  {tx("Explore the project", "Γνωρίστε το έργο")}
                </a>
              </div>
            </div>
          </div>
          <div className="relative isolate overflow-hidden rounded-[22px] border border-hairline bg-gradient-to-br from-primary/10 via-surface to-signal/10 px-[5%] pb-[6%] pt-[5%] shadow-[0_30px_80px_-36px_color-mix(in_oklab,var(--primary)_50%,transparent)] sm:px-[7%]">
            <div className={cn("relative overflow-hidden rounded-xl border border-hairline bg-background shadow-2xl", mobile ? "w-[90%]" : "w-full")}>
              <div className="flex h-9 items-center gap-1.5 border-b border-hairline bg-surface px-4">
                <i className="size-2 rounded-full bg-muted-foreground/30" />
                <i className="size-2 rounded-full bg-muted-foreground/30" />
                <i className="size-2 rounded-full bg-muted-foreground/30" />
                <span className="mx-auto min-w-0 truncate font-code text-[10px] text-muted-foreground">{domain}</span>
                <Globe2 className="size-3 shrink-0 text-muted-foreground" aria-hidden />
              </div>
              <div className="relative aspect-[16/10]">
                <Image
                  src={project.screenshot}
                  alt={tx(`${project.name} desktop website`, `Η ιστοσελίδα ${project.name} σε υπολογιστή`)}
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 1100px"
                  className="object-cover object-top"
                />
              </div>
            </div>
            {mobile ? (
              <div className="absolute bottom-[3%] right-[3%] top-[28%] w-[24%] overflow-hidden rounded-[1.3rem] border-[5px] border-foreground/80 bg-background shadow-2xl sm:rounded-[2rem] sm:border-[7px]">
                <Image
                  src={`/portfolio/mobile/${project.slug}.webp`}
                  alt={tx(`${project.name} mobile website`, `Η ιστοσελίδα ${project.name} σε κινητό`)}
                  fill
                  sizes="300px"
                  className="object-cover object-top"
                />
              </div>
            ) : null}
          </div>
          <div className="mt-7 grid min-w-0 gap-6 border-b border-hairline pb-8 sm:grid-cols-3">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{tx("Project", "Έργο")}</p>
              <p className="mt-2 text-sm font-medium text-foreground">{project.name}</p>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{tx("Scope", "Υπηρεσίες")}</p>
              <p className="mt-2 text-pretty text-sm leading-6 text-foreground">{services}</p>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{tx("Website", "Ιστοσελίδα")}</p>
              <p className="mt-2 break-all text-sm text-muted-foreground">{domain}</p>
              {project.liveStatus ? (
                <p className="mt-1 text-xs text-muted-foreground">{tx("Imagery retained from the project archive.", "Οι εικόνες προέρχονται από το αρχείο του έργου.")}</p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <WaveSection id="project-story" shot="context">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[0.65fr_1.35fr]">
          <div className="min-w-0">
            <WaveEyebrow>01 / {tx("The context", "Η αφετηρία")}</WaveEyebrow>
            <h2 className="mt-4 whitespace-pre-line text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.6rem]">
              {tx("A real business.\nA specific audience.", "Μια επιχείρηση.\nΈνα συγκεκριμένο κοινό.")}
            </h2>
          </div>
          <div className="min-w-0">
            <p className="max-w-3xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">{story.context}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {brief.features[locale].map((feature) => (
                <span key={feature} className="rounded-full border border-hairline bg-surface px-3.5 py-2 text-xs text-foreground">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </WaveSection>

      <WaveSection shot="experience" tinted>
        <div className="grid min-w-0 items-center gap-10 lg:grid-cols-2">
          <div className="relative min-w-0 overflow-hidden rounded-[22px] border border-hairline bg-surface p-5 sm:p-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-hairline">
              <Image
                src={project.screenshot}
                alt={tx(`A closer look at ${project.name}`, `Λεπτομέρεια από το ${project.name}`)}
                fill
                sizes="(max-width: 768px) 90vw, 560px"
                className="object-cover object-[55%_20%]"
              />
            </div>
            <p className="mt-4 flex items-center gap-2 font-code text-[10px] text-muted-foreground">
              <Monitor className="size-3 shrink-0" aria-hidden />
              {tx("A closer look at the published website", "Λεπτομέρεια από την ιστοσελίδα")}
            </p>
          </div>
          <div className="min-w-0">
            <WaveEyebrow>02 / {tx("The experience", "Η εμπειρία")}</WaveEyebrow>
            <h2 className="mt-4 text-balance font-display text-[2rem] font-bold leading-tight tracking-[-0.03em] text-foreground sm:text-[2.6rem]">{story.headline}</h2>
            <p className="mt-6 text-pretty text-base leading-8 text-muted-foreground">{story.experience}</p>
            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-hairline bg-background/70 p-5">
              <MousePointer2 className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
              <p className="text-pretty text-sm leading-7 text-muted-foreground">{brief.journey[locale]}</p>
            </div>
          </div>
        </div>
      </WaveSection>

      <WaveSection shot="search">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[0.65fr_1.35fr]">
          <div className="min-w-0">
            <WaveEyebrow>03 / {tx("Discoverability", "Η αναζήτηση")}</WaveEyebrow>
            <h2 className="mt-4 text-balance font-display text-[2rem] font-bold tracking-[-0.03em] text-foreground sm:text-[2.6rem]">
              {tx("The language of the customer.", "Η γλώσσα του πελάτη.")}
            </h2>
          </div>
          <div className="min-w-0">
            <p className="text-pretty text-base leading-8 text-muted-foreground">{brief.audience[locale]}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {brief.keywords[locale].map((keyword) => (
                <span key={keyword} className="inline-flex max-w-full items-center gap-2 rounded-xl border border-hairline bg-background px-4 py-3 text-sm text-foreground">
                  <Search className="size-4 shrink-0 text-primary" aria-hidden />
                  <span className="min-w-0 break-words">{keyword}</span>
                </span>
              ))}
            </div>
            <p className="mt-4 text-pretty text-xs leading-6 text-muted-foreground">
              {tx(
                "Search topics relevant to the business, not ranking or traffic claims.",
                "Σχετικά θέματα αναζήτησης για την επιχείρηση, χωρίς ισχυρισμούς κατάταξης ή επισκεψιμότητας.",
              )}
            </p>
          </div>
        </div>
        <ClientSearchResults locale={locale} slug={project.slug} className="mt-10" />
        {project.relatedUrls ? (
          <div className="mt-8 flex flex-wrap gap-4">
            {project.relatedUrls.map((url) => (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="inline-flex max-w-full items-center gap-2 break-all text-sm text-primary">
                {url.replace(/^https?:\/\//, "")}
                <ArrowUpRight className="size-4 shrink-0" aria-hidden />
              </a>
            ))}
          </div>
        ) : null}
      </WaveSection>

      <WaveSection shot="related" tinted>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div className="min-w-0">
            <WaveEyebrow>{tx("More perspectives", "Περισσότερες ιστορίες")}</WaveEyebrow>
            <h2 className="mt-3 text-balance font-display text-[2rem] font-bold tracking-[-0.03em] text-foreground sm:text-[2.6rem]">
              {tx("Keep exploring.", "Συνεχίστε την περιήγηση.")}
            </h2>
          </div>
          <Link href={lp("/work")} className="inline-flex items-center gap-2 text-sm font-medium text-primary">
            {tx("All projects", "Όλα τα έργα")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="grid min-w-0 gap-8 md:grid-cols-2">
          {related.map((item) => (
            <ProjectCard key={item.slug} project={item} locale={locale} />
          ))}
        </div>
      </WaveSection>

      <WaveSection shot="close">
        <div className="rounded-[22px] border border-hairline bg-gradient-to-br from-primary/10 via-surface to-signal/10 p-8 shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_16%,transparent)] sm:p-14">
          <WaveEyebrow>{tx("Your next project", "Το επόμενο έργο")}</WaveEyebrow>
          <h2 className="mt-5 max-w-2xl text-balance font-display text-[2rem] font-bold leading-tight tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
            {tx("Your business deserves a story of its own.", "Η επιχείρησή σας αξίζει τη δική της ιστορία.")}
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-muted-foreground">
            {tx(
              "Tell us what you do, who you serve and what you want your website to make possible.",
              "Πείτε μας τι κάνετε, σε ποιον απευθύνεστε και τι θέλετε να πετύχετε με την ιστοσελίδα σας.",
            )}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={lp(`/get-started?project=${project.category}`)} className={cn(wavePrimaryBtn, "w-full sm:w-auto")}>
              {tx("Discuss your project", "Συζητήστε το έργο σας")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            {!project.liveStatus ? (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className={cn(waveGhostBtn, "w-full sm:w-auto")}>
                {tx("Visit " + project.name, "Δείτε το " + project.name)}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            ) : null}
          </div>
        </div>
      </WaveSection>
    </>
  );
}

export function getWorkStaticParams() {
  return portfolioProjects.map((p) => ({ slug: p.slug }));
}

export function getWorkProject(slug: string) {
  return getPortfolioBySlug(slug);
}
