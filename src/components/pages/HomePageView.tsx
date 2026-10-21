import Image from 'next/image';
import Link from 'next/link';
import {
  BarChart3,
  ListChecks,
  MonitorSmartphone,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { GoogleTile } from '@/components/kit';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { homeCopy, type HomeCopy } from '@/components/pages/home/copy';
import { SampleWindow } from '@/components/pages/home/SampleWindow';
import { appLink } from '@/components/gsc-boost/copy';
import { portfolioProjects } from '@/data/portfolio';
import { FOUNDER_YEARS, PROJECTS_DELIVERED } from '@/data/founder';
import { LEGAL_ENTITY_ID, LEGAL_ENTITY_NAME } from '@/data/legal-entity';
import { MARKET_COUNT, RESPONSE_HOURS } from '@/data/company-facts';
import { WHATSAPP_HREF } from '@/lib/contact-info';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { BASE_URL } from '@/lib/seo/description';
import { generateFAQSchema, generateOrganizationSchema } from '@/lib/seo/schema';

const SHOWCASE = [
  { slug: 'cyclades-rentacar', categoryEn: 'Rent-a-car', categoryEl: 'Rent-a-car' },
  { slug: 'onoma-hotel', categoryEn: 'Hotels', categoryEl: 'Ξενοδοχεία' },
  { slug: 'helicro', categoryEn: 'Travel', categoryEl: 'Ταξίδια' },
] as const;

const TRUST_DOMAINS = [
  { host: 'cycladesrentacar.com', slug: 'cyclades-rentacar' },
  { host: 'onomahotel.com', slug: 'onoma-hotel' },
  { host: 'projectshadow.ai', slug: 'project-shadow-ai' },
  { host: 'thenutrinest.gr', slug: 'thenutrinest' },
  { host: 'vwanaki.gr', slug: 'vwanaki' },
  { host: 'helicro.be', slug: 'helicro' },
] as const;

const CARD_ICONS = [TrendingUp, BarChart3, Sparkles, ListChecks, Sparkles, MonitorSmartphone] as const;

const primaryBtn =
  'inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-5 py-3 text-center font-display text-[15px] font-semibold asg-primary-action shadow-[inset_0_1px_0_0_oklch(1_0_0/18%),0_10px_28px_-12px_color-mix(in_oklab,var(--primary)_75%,transparent)] transition-[transform,background-color] duration-200 hover:-translate-y-px motion-reduce:transition-none motion-reduce:hover:translate-y-0';

const ghostBtn =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-hairline bg-surface/50 px-5 py-3 text-center text-[15px] font-semibold text-foreground backdrop-blur transition-colors hover:border-brand/50';

function Accent({ children }: { readonly children: string }) {
  return (
    <span className="bg-[linear-gradient(90deg,var(--primary),var(--signal))] bg-clip-text italic text-transparent">
      {children}
    </span>
  );
}

function Eyebrow({ children }: { readonly children: string }) {
  return (
    <div className="font-code text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">{children}</div>
  );
}

function Mark({ kind, label }: { readonly kind: 'yes' | 'some' | 'no'; readonly label: string }) {
  const glyph = kind === 'yes' ? '✓' : kind === 'some' ? '~' : '-';
  const tone =
    kind === 'yes'
      ? 'bg-success/15 text-success'
      : kind === 'some'
        ? 'bg-warning/15 text-warning'
        : 'bg-foreground/10 text-muted-foreground';
  return (
    <span role="img" aria-label={label} className={`inline-grid size-[22px] place-items-center rounded-full text-[13px] font-bold ${tone}`}>
      {glyph}
    </span>
  );
}

function IntegrationIcon({ icon }: { readonly icon: HomeCopy['integrations'][number]['icon'] }) {
  if (icon === 'gsc' || icon === 'ga' || icon === 'wp') {
    const src =
      icon === 'gsc'
        ? '/integrations/service-google_search_console.svg'
        : icon === 'ga'
          ? '/integrations/service-google_analytics.svg'
          : '/integrations/service-wordpress.svg';
    return <img src={src} alt="" width={20} height={20} className={`size-5 ${icon === 'wp' ? 'rounded-full bg-white p-px' : ''}`} />;
  }
  if (icon === 'chrome') {
    return (
      <svg className="size-5 text-foreground/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 8.5h8M8.9 13.8 4.6 6.6M15 13.8l-4 7" />
      </svg>
    );
  }
  if (icon === 'iphone') {
    return (
      <svg className="size-5 text-foreground/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <path d="M11 18.5h2" />
      </svg>
    );
  }
  return (
    <span className="grid size-5 place-items-center rounded bg-foreground/10 font-code text-[9px] text-foreground/80" aria-hidden>
      {'{ }'}
    </span>
  );
}

/**
 * Homepage in the approved 2026 layout. Header, footer, consent and the
 * WhatsApp pill stay the site-wide components. Figures in the product window
 * are labelled sample data. Proof numbers come from company-facts.
 */
export function HomePageView({ locale }: { readonly locale: SiteLocale }) {
  const copy = homeCopy(locale);
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);
  const signup = appLink('/signup', locale, 'home-signup');
  const demo = appLink('/demo', locale, 'home-demo');
  const audit = `${lp('/get-started')}#free-audit`;
  const projects = SHOWCASE.map((item) => {
    const project = portfolioProjects.find((entry) => entry.slug === item.slug);
    if (!project) return null;
    return {
      ...item,
      name: project.name,
      summary: isEl ? project.summaryEl : project.summary,
      screenshot: project.screenshot,
      category: isEl ? item.categoryEl : item.categoryEn,
    };
  }).filter((item): item is NonNullable<typeof item> => item !== null);

  const orgSchema = generateOrganizationSchema({
    id: `${BASE_URL}/#organization`,
    name: 'AnotherSEOGuru',
    parentOrganization: { id: LEGAL_ENTITY_ID, name: LEGAL_ENTITY_NAME },
    url: BASE_URL,
    logo: `${BASE_URL}/brand/asg-lockup-on-light@2x.png`,
    description: isEl
      ? 'AnotherSEOGuru - ελληνική εταιρεία SEO και κατασκευής ιστοσελίδων. Τεχνικό SEO, τοπικό SEO, GEO/AEO, e-shop και δική της πλατφόρμα συνδεδεμένη με το Google Search Console.'
      : 'AnotherSEOGuru - Greek SEO and web design agency. Technical SEO, local SEO, GEO/AEO, e-shops, plus a Search Console-native SEO platform.',
  });
  const faqSchema = generateFAQSchema({
    faqs: copy.faqs.map((item) => ({ question: item.q, answer: item.a })),
  });

  const stats = [
    { value: String(FOUNDER_YEARS), suffix: '+', label: copy.statYears },
    { value: String(PROJECTS_DELIVERED), suffix: '+', label: copy.statProjects },
    { value: String(MARKET_COUNT), suffix: '', label: copy.statMarkets },
    { value: String(RESPONSE_HOURS), suffix: copy.hoursSuffix, label: copy.statReply },
  ];

  return (
    <>
      <SchemaMarkup schemas={[orgSchema, faqSchema]} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <section className="hero-below-header relative overflow-x-clip">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="kit-grid absolute inset-0 [mask-image:radial-gradient(ellipse_80%_65%_at_50%_0%,black_40%,transparent_100%)]" />
            <div className="absolute left-[-10%] top-[-120px] size-[min(520px,80vw)] rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute right-[-8%] top-[140px] size-[min(460px,70vw)] rounded-full bg-signal/15 blur-3xl" />
          </div>
          <div className="relative mx-auto grid max-w-[1320px] grid-cols-[minmax(0,1fr)] items-center gap-10 px-5 pb-16 pt-6 sm:pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-12 lg:px-8 lg:pb-28 lg:pt-10">
            <div className="min-w-0">
              <Link
                href={lp('/platform')}
                className="inline-flex max-w-full items-center gap-2 rounded-full border border-hairline bg-surface/80 py-1.5 pl-1.5 pr-4 text-[13px] text-muted-foreground backdrop-blur transition-colors hover:border-brand/40 hover:text-foreground"
              >
                <span className="shrink-0 rounded-full bg-[linear-gradient(90deg,var(--primary),var(--signal))] px-2.5 py-0.5 text-[11px] font-bold text-primary-foreground">
                  {copy.announceTag}
                </span>
                <span className="min-w-0 truncate">{copy.announce}</span>
                <span className="text-primary" aria-hidden>→</span>
              </Link>
              <h1 className="mt-6 text-balance font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.04em] text-foreground min-[400px]:text-[2.35rem] sm:text-[3.25rem] lg:text-[3.75rem]">
                <span className="block">{copy.h1Line1}</span>
                <span className="block">
                  {copy.h1Line2Before}
                  <Accent>{copy.h1Accent}</Accent>
                  {copy.h1Line2After}
                </span>
              </h1>
              <p className="mt-6 max-w-[540px] text-pretty text-[17px] leading-[1.65] text-muted-foreground">{copy.lead}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={signup} className={primaryBtn}>
                  <GoogleTile className="size-6 rounded-full" />
                  {copy.signup}
                </a>
                <Link href={audit} className={ghostBtn}>{copy.audit}</Link>
                <a href={WHATSAPP_HREF} className="inline-flex min-h-12 items-center gap-2 rounded-full px-3 text-[15px] font-medium text-success hover:text-foreground" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-5" />
                  {copy.whatsapp}
                </a>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-muted-foreground">
                {copy.trust.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Mark kind="yes" label={copy.markYes} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <SampleWindow copy={copy} />
          </div>
        </section>

        <section className="border-y border-hairline bg-surface/40">
          <div className="mx-auto max-w-[1240px] px-5 py-9 lg:px-8">
            <div className="flex flex-col items-center gap-7 lg:flex-row lg:justify-between">
              <p className="shrink-0 text-center text-[13px] text-muted-foreground lg:max-w-[200px] lg:text-left">{copy.trustIntro}</p>
              <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[15px] font-semibold tracking-tight text-muted-foreground">
                {TRUST_DOMAINS.map((domain) => (
                  <li key={domain.slug}>
                    <Link href={lp(`/work/${domain.slug}`)} className="hover:text-foreground">{domain.host}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="my-7 h-px bg-[linear-gradient(90deg,transparent,var(--hairline),transparent)]" />
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[13.5px] text-muted-foreground">
              <li className="text-muted-foreground/80">{copy.worksWith}</li>
              {copy.integrations.map((item) => (
                <li key={item.label}>
                  <Link href={lp(item.href)} className="inline-flex items-center gap-2 hover:text-foreground">
                    <IntegrationIcon icon={item.icon} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-end">
            <div className="min-w-0">
              <Eyebrow>{copy.platformEyebrow}</Eyebrow>
              <h2 className="mt-4 text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
                {copy.platformTitleBefore}
                <Accent>{copy.platformAccent}</Accent>
                {copy.platformTitleAfter}
              </h2>
            </div>
            <p className="text-pretty text-[17px] leading-[1.7] text-muted-foreground">{copy.platformLead}</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {copy.cards.map((card, index) => {
              const Icon = CARD_ICONS[index] ?? Sparkles;
              return (
                <article key={card.title} className="rounded-[22px] border border-hairline bg-surface/60 p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7">
                  <div className="grid size-11 place-items-center rounded-xl bg-primary/12 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-[19px] font-bold text-foreground">{card.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{card.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="relative overflow-x-clip border-y border-hairline bg-surface/35">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[280px] w-[min(700px,100%)] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-[760px] text-center">
              <Eyebrow>{copy.stepsEyebrow}</Eyebrow>
              <h2 className="mt-4 text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
                {copy.stepsTitleBefore}
                <Accent>{copy.stepsAccent}</Accent>
                {copy.stepsTitleAfter}
              </h2>
            </div>
            <ol className="relative mt-14 grid gap-8 lg:grid-cols-3">
              <div aria-hidden className="absolute left-[16%] right-[16%] top-[34px] hidden h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent lg:block" />
              {copy.steps.map((step) => (
                <li key={step.n} className="relative min-w-0 text-center lg:text-left">
                  <div className={`relative z-10 mx-auto grid size-[68px] place-items-center rounded-2xl border bg-background font-code text-[18px] lg:mx-0 ${step.n === '03' ? 'border-success/40 text-success' : 'border-primary/40 text-primary'}`}>
                    {step.n}
                  </div>
                  <h3 className="mt-6 text-[22px] font-bold text-foreground">{step.title}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-[760px] text-center">
            <Eyebrow>{copy.waysEyebrow}</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
              {copy.waysTitleBefore}
              <Accent>{copy.waysAccent}</Accent>
            </h2>
            <p className="mt-5 text-pretty text-[17px] leading-relaxed text-muted-foreground">{copy.waysLead}</p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="rounded-[22px] border border-hairline bg-surface/60 p-7 lg:p-10">
              <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[12px] font-semibold text-primary">{copy.appBadge}</span>
              <h3 className="mt-6 text-balance text-[1.7rem] font-bold leading-tight tracking-tight text-foreground sm:text-[1.85rem]">{copy.appTitle}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-muted-foreground">{copy.appLead}</p>
              <ul className="mt-7 space-y-3.5 text-[15px] text-foreground">
                {copy.appPoints.map((point) => (
                  <li key={point} className="flex gap-3"><Mark kind="yes" label={copy.markYes} /><span>{point}</span></li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={signup} className={primaryBtn}>{copy.signup}</a>
                <a href={demo} className={ghostBtn}>{copy.demo}</a>
              </div>
            </article>
            <article className="rounded-[22px] border border-primary/30 bg-[linear-gradient(160deg,color-mix(in_oklab,var(--primary)_18%,transparent),var(--surface)_55%)] p-7 lg:p-10">
              <span className="inline-flex rounded-full bg-success/12 px-3 py-1 text-[12px] font-semibold text-success">{copy.agencyBadge}</span>
              <h3 className="mt-6 text-balance text-[1.7rem] font-bold leading-tight tracking-tight text-foreground sm:text-[1.85rem]">{copy.agencyTitle}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-muted-foreground">{copy.agencyLead}</p>
              <ul className="mt-7 space-y-3.5 text-[15px] text-foreground">
                {copy.agencyPoints.map((point) => (
                  <li key={point} className="flex gap-3"><Mark kind="yes" label={copy.markYes} /><span>{point}</span></li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={audit} className={primaryBtn}>{copy.audit}</Link>
                <Link href={lp('/pricing')} className={ghostBtn}>{copy.pricing}</Link>
              </div>
            </article>
          </div>
          <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-[22px] border border-hairline bg-surface/70 px-6 py-6 text-center backdrop-blur sm:px-8 md:flex-row md:text-left">
            <p className="text-pretty text-muted-foreground">
              <span className="font-bold text-foreground">{copy.bothTitle}</span> {copy.bothBody}
            </p>
            <Link href={lp('/get-started')} className={`${ghostBtn} shrink-0`}>{copy.quote} →</Link>
          </div>
        </section>

        <section className="border-y border-hairline bg-surface/35">
          <div className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-end">
              <div className="min-w-0">
                <Eyebrow>{copy.whyEyebrow}</Eyebrow>
                <h2 className="mt-4 text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
                  {copy.whyTitleBefore}
                  <Accent>{copy.whyAccent}</Accent>
                </h2>
              </div>
              <p className="text-pretty text-[17px] leading-[1.7] text-muted-foreground">{copy.whyLead}</p>
            </div>
            <div className="mt-12 max-w-full overflow-x-auto rounded-[22px] border border-hairline">
              <table className="w-full min-w-[20rem] text-left text-[13.5px] sm:text-[15px]">
                <caption className="sr-only">{copy.whyEyebrow}</caption>
                <thead>
                  <tr className="border-b border-hairline text-[13px] text-muted-foreground">
                    <th className="px-3 py-4 font-medium sm:px-6" scope="col"><span className="sr-only">{copy.whyEyebrow}</span></th>
                    <th className="px-2 py-4 text-center font-medium" scope="col">
                      <span className="sm:hidden">{copy.colAgencyShort}</span>
                      <span className="hidden sm:inline">{copy.colAgency}</span>
                    </th>
                    <th className="px-2 py-4 text-center font-medium" scope="col">
                      <span className="sm:hidden">{copy.colToolShort}</span>
                      <span className="hidden sm:inline">{copy.colTool}</span>
                    </th>
                    <th className="bg-primary/[0.06] px-2 py-4 text-center" scope="col">
                      <img src="/brand/asg-lockup-on-dark.svg" alt="AnotherSEOGuru" width={140} height={28} className="mx-auto hidden h-7 w-auto [.light_&]:hidden sm:block" />
                      <img src="/brand/asg-lockup-on-light.svg" alt="AnotherSEOGuru" width={140} height={28} className="mx-auto hidden h-7 w-auto sm:[.light_&]:block" />
                      <img src="/brand/asg-mark.svg" alt="AnotherSEOGuru" width={24} height={24} className="mx-auto size-6 sm:hidden" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {copy.compare.map((row) => (
                    <tr key={row.label} className="border-b border-hairline last:border-0">
                      <th className="py-3.5 pl-3 pr-2 text-left text-[13.5px] font-medium text-foreground sm:px-6 sm:text-[15px]" scope="row">{row.label}</th>
                      <td className="px-1 text-center"><Mark kind={row.agency} label={row.agency === 'yes' ? copy.markYes : row.agency === 'some' ? copy.markSome : copy.markNo} /></td>
                      <td className="px-1 text-center"><Mark kind={row.tool} label={row.tool === 'yes' ? copy.markYes : row.tool === 'some' ? copy.markSome : copy.markNo} /></td>
                      <td className="bg-primary/[0.06] px-1 text-center"><Mark kind="yes" label={copy.markYes} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[12.5px] text-muted-foreground">{copy.footnote}</p>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-[860px] text-center">
            <Eyebrow>{copy.numbersEyebrow}</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
              {copy.numbersTitleBefore}
              <Accent>{copy.numbersAccent}</Accent>
              {copy.numbersTitleAfter}
            </h2>
            <p className="mt-5 text-pretty text-[17px] leading-relaxed text-muted-foreground">{copy.numbersLead}</p>
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[22px] border border-hairline bg-hairline lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background px-3 py-7 text-center sm:p-8 lg:p-10">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-[2.4rem] font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
                  {stat.value}
                  {stat.suffix ? <span className="bg-[linear-gradient(90deg,var(--primary),var(--signal))] bg-clip-text italic text-transparent">{stat.suffix}</span> : null}
                </dd>
                <dd className="mt-1 text-[14px] text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>{copy.idealEyebrow}</Eyebrow>
              <h3 className="mt-3 text-balance text-[1.45rem] font-bold tracking-tight text-foreground sm:text-[1.6rem]">{copy.idealTitle}</h3>
            </div>
            <Link href={lp('/work')} className="shrink-0 text-[14.5px] font-semibold text-primary hover:text-foreground">
              {copy.allProjects} →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.slug} href={lp(`/work/${project.slug}`)} className="group block min-w-0 overflow-hidden rounded-[22px] border border-hairline bg-surface/60 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-raised">
                  <Image
                    src={project.screenshot}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-top transition duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
                <div className="p-6">
                  <div className="text-[12px] font-semibold uppercase tracking-wider text-primary">{project.category}</div>
                  <div className="mt-1.5 text-[18px] font-bold text-foreground">{project.name}</div>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{project.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-hairline bg-surface/35">
          <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:px-8 lg:py-28">
            <div className="min-w-0">
              <Eyebrow>{copy.faqEyebrow}</Eyebrow>
              <h2 className="mt-4 text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.6rem]">
                {copy.faqTitleBefore}
                <Accent>{copy.faqAccent}</Accent>
              </h2>
              <p className="mt-5 text-pretty text-[16px] leading-relaxed text-muted-foreground">{copy.faqLead}</p>
              <a href={WHATSAPP_HREF} className={`${ghostBtn} mt-8`} rel="noopener noreferrer">{copy.whatsapp}</a>
            </div>
            <div className="min-w-0 divide-y divide-hairline rounded-[22px] border border-hairline bg-background/70">
              {copy.faqs.map((item, index) => (
                <details key={item.q} className="group p-5 sm:p-6" open={index === 0 ? true : undefined}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-semibold text-foreground sm:text-[17px] [&::-webkit-details-marker]:hidden">
                    <span className="min-w-0">{item.q}</span>
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-hairline text-primary transition-transform duration-200 group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-x-clip">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="kit-grid absolute inset-0 rotate-180 [mask-image:radial-gradient(ellipse_80%_65%_at_50%_100%,black_30%,transparent_100%)]" />
            <div className="absolute bottom-[-180px] left-1/2 h-[420px] w-[min(900px,140%)] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-[1240px] px-5 py-20 text-center lg:px-8 lg:py-28">
            <h2 className="mx-auto max-w-[900px] text-balance font-display text-[2.1rem] font-bold leading-[1.05] tracking-[-0.035em] text-foreground sm:text-[3.4rem]">
              {copy.finalTitleBefore}
              <Accent>{copy.finalAccent}</Accent>
            </h2>
            <div className="mx-auto mt-12 grid max-w-[1080px] gap-5 text-left md:grid-cols-2">
              <div className="rounded-[22px] border border-hairline bg-surface/75 p-6 backdrop-blur sm:p-8">
                <div className="text-[12px] font-semibold uppercase tracking-wider text-success">{copy.doneEyebrow}</div>
                <div className="mt-3 text-[21px] font-bold text-foreground">{copy.doneTitle}</div>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{copy.doneBody}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={audit} className={primaryBtn}>{copy.audit}</Link>
                  <a href={WHATSAPP_HREF} className={ghostBtn} rel="noopener noreferrer">{copy.whatsapp}</a>
                </div>
              </div>
              <div className="rounded-[22px] border border-hairline bg-surface/75 p-6 backdrop-blur sm:p-8">
                <div className="text-[12px] font-semibold uppercase tracking-wider text-primary">{copy.selfEyebrow}</div>
                <div className="mt-3 text-[21px] font-bold text-foreground">{copy.selfTitle}</div>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{copy.selfBody}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={signup} className={primaryBtn}>{copy.signup}</a>
                  <a href={demo} className={ghostBtn}>{copy.demo}</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
