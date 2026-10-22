import type { ReactNode } from "react";
import Link from "next/link";
import { GoogleTile } from "@/components/kit";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { homeCopy } from "@/components/pages/home/copy";
import { appLink } from "@/components/gsc-boost/copy";
import type { GscFaqItem } from "@/components/gsc-boost/faq";
import { getAppPath } from "@/lib/app-links";
import { FOUNDER_YEARS, PROJECTS_DELIVERED } from "@/data/founder";
import { MARKET_COUNT, RESPONSE_HOURS } from "@/data/company-facts";
import { WHATSAPP_HREF } from "@/lib/contact-info";
import { cn } from "@/lib/cn";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { generateFAQSchema } from "@/lib/seo/schema";

/**
 * Homepage design language (wave 1) for the platform pages.
 * Accent words use the same inline-block, end padding and
 * box-decoration-break: clone treatment as the homepage, so a wrapped
 * gradient word does not clip the last glyph.
 */

export const wavePrimaryBtn =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-5 py-3 text-center font-display text-[15px] font-semibold asg-primary-action shadow-[inset_0_1px_0_0_oklch(1_0_0/18%),0_10px_28px_-12px_color-mix(in_oklab,var(--primary)_75%,transparent)] transition-[transform,background-color] duration-200 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

export const waveGhostBtn =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-hairline bg-surface/50 px-5 py-3 text-center text-[15px] font-semibold text-foreground backdrop-blur transition-colors hover:border-brand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60";

/** Shared field chrome for contact and get-started. States use brand tokens. */
export const waveField =
  "block min-h-12 w-full min-w-0 rounded-2xl border border-hairline bg-background px-4 py-3 text-[16px] text-foreground shadow-[inset_0_1px_0_0_color-mix(in_oklab,var(--foreground)_6%,transparent)] transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-muted-foreground/70 hover:border-primary/35 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 aria-[invalid=true]:border-destructive aria-[invalid=true]:bg-destructive/5 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-destructive/25 disabled:cursor-not-allowed disabled:bg-surface/70 disabled:opacity-60";

export function WaveAccent({ children }: { readonly children: ReactNode }) {
  return (
    <span className="inline-block max-w-full bg-[linear-gradient(90deg,var(--primary),var(--signal))] bg-clip-text pr-[0.22em] italic text-transparent box-decoration-clone [-webkit-box-decoration-break:clone]">
      {children}
    </span>
  );
}

export function WaveEyebrow({ children }: { readonly children: ReactNode }) {
  return <div className="font-code text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">{children}</div>;
}

export function WaveMark({ kind, label }: { readonly kind: "yes" | "some" | "no"; readonly label: string }) {
  const glyph = kind === "yes" ? "✓" : kind === "some" ? "~" : "-";
  const tone =
    kind === "yes" ? "bg-success/15 text-success" : kind === "some" ? "bg-warning/15 text-warning" : "bg-foreground/10 text-muted-foreground";
  return (
    <span role="img" aria-label={label} className={`inline-grid size-[22px] shrink-0 place-items-center rounded-full text-[13px] font-bold ${tone}`}>
      {glyph}
    </span>
  );
}

export function WaveSection({
  id,
  shot,
  tinted = false,
  className,
  children,
}: {
  readonly id?: string;
  readonly shot: string;
  readonly tinted?: boolean;
  readonly className?: string;
  readonly children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-shot={shot}
      className={cn("scroll-mt-28", tinted && "border-y border-hairline bg-surface/35", className)}
    >
      <div className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">{children}</div>
    </section>
  );
}

export function WaveHeading({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  readonly eyebrow?: ReactNode;
  readonly title: ReactNode;
  readonly lead?: ReactNode;
  readonly align?: "left" | "center";
}) {
  return (
    <div className={cn("min-w-0", align === "center" && "mx-auto max-w-[760px] text-center")}>
      {eyebrow ? <WaveEyebrow>{eyebrow}</WaveEyebrow> : null}
      <h2 className="mt-4 text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
        {title}
      </h2>
      {lead ? <p className="mt-5 text-pretty text-[17px] leading-[1.7] text-muted-foreground">{lead}</p> : null}
    </div>
  );
}

export function WaveHero({
  shot = "hero",
  pill,
  title,
  lead,
  actions,
  trust,
  panel,
  panelNote,
  extra,
  titleClassName,
}: {
  readonly shot?: string;
  readonly pill?: ReactNode;
  readonly title: ReactNode;
  readonly lead: ReactNode;
  readonly actions?: ReactNode;
  readonly trust?: ReactNode;
  readonly panel: ReactNode;
  readonly panelNote?: ReactNode;
  /** Second paragraph under the lead. Service pages already had one. */
  readonly extra?: ReactNode;
  readonly titleClassName?: string;
}) {
  return (
    <section data-shot={shot} className="hero-below-header relative overflow-x-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="kit-grid absolute inset-0 [mask-image:radial-gradient(ellipse_80%_65%_at_50%_0%,black_40%,transparent_100%)]" />
        <div className="absolute left-[-10%] top-[-120px] size-[min(520px,80vw)] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-[-8%] top-[140px] size-[min(460px,70vw)] rounded-full bg-signal/15 blur-3xl" />
      </div>
      <div className="relative mx-auto grid max-w-[1320px] grid-cols-[minmax(0,1fr)] items-center gap-10 px-5 pb-16 pt-6 sm:pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-12 lg:px-8 lg:pb-24 lg:pt-10">
        <div className="min-w-0">
          {pill}
          <h1 className={cn("mt-6 text-balance font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.04em] text-foreground min-[400px]:text-[2.35rem] sm:text-[3.25rem] lg:text-[3.75rem]", titleClassName)}>
            {title}
          </h1>
          <p className="mt-6 max-w-[540px] text-pretty text-[17px] leading-[1.65] text-muted-foreground">{lead}</p>
          {extra ? <p className="mt-4 max-w-[540px] text-pretty text-[15px] leading-relaxed text-muted-foreground">{extra}</p> : null}
          {actions ? <div className="mt-8">{actions}</div> : null}
          {trust ? <div className="mt-8">{trust}</div> : null}
        </div>
        <div className="min-w-0">
          {panel}
          {panelNote ? <div className="mt-4 text-center text-[13px] leading-relaxed text-muted-foreground">{panelNote}</div> : null}
        </div>
      </div>
    </section>
  );
}

/** Browser chrome around a product preview, matching the homepage app window. */
export function AppPanel({
  url,
  badge,
  caption,
  children,
}: {
  readonly url: string;
  readonly badge: string;
  readonly caption: string;
  readonly children: ReactNode;
}) {
  return (
    <figure className="relative min-w-0 overflow-hidden rounded-[22px] border border-hairline bg-surface/80 shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_25%,transparent),0_30px_80px_-24px_color-mix(in_oklab,var(--primary)_45%,transparent)]">
      <figcaption className="sr-only">{caption}</figcaption>
      <div className="flex items-center gap-2 border-b border-hairline px-3 py-3 sm:px-4">
        <span className="size-2.5 shrink-0 rounded-full bg-[#FF5F57]" aria-hidden />
        <span className="size-2.5 shrink-0 rounded-full bg-[#FEBC2E]" aria-hidden />
        <span className="size-2.5 shrink-0 rounded-full bg-[#28C840]" aria-hidden />
        <div className="ml-2 min-w-0 flex-1 truncate rounded-md bg-foreground/5 px-3 py-1 font-code text-[11px] text-muted-foreground">{url}</div>
        <span className="shrink-0 whitespace-nowrap rounded-full border border-warning/40 bg-warning/10 px-2 py-0.5 text-[10.5px] font-medium text-warning">
          {badge}
        </span>
      </div>
      <div className="min-w-0 p-3 sm:p-4">{children}</div>
    </figure>
  );
}

export function AnnouncePill({ href, tag, text, wrap = false }: { readonly href: string; readonly tag: string; readonly text: string; readonly wrap?: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-flex max-w-full items-center gap-2 rounded-full border border-hairline bg-surface/80 py-1.5 pl-1.5 pr-4 text-[13px] text-muted-foreground backdrop-blur transition-colors hover:border-brand/40 hover:text-foreground ${wrap ? "whitespace-normal" : ""}`}
    >
      <span className="shrink-0 rounded-full bg-[linear-gradient(90deg,var(--primary),var(--signal))] px-2.5 py-0.5 text-[11px] font-bold text-primary-foreground">
        {tag}
      </span>
      <span className={`min-w-0 ${wrap ? "text-pretty" : "truncate"}`}>{text}</span>
      <span className="text-primary" aria-hidden>
        →
      </span>
    </Link>
  );
}

/** Same destinations as SoftwareCtas: Google sign-up and the public demo. */
export function WaveSoftwareActions({
  locale,
  source,
  align = "left",
}: {
  readonly locale: SiteLocale;
  readonly source: string;
  readonly align?: "left" | "center";
}) {
  const copy = homeCopy(locale);
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:flex-wrap", align === "center" && "items-stretch sm:justify-center")}>
      <a href={appLink("/signup", locale, source)} className={wavePrimaryBtn}>
        <GoogleTile className="size-6 rounded-full" />
        {copy.signup}
      </a>
      <a href={appLink("/demo", locale, source)} className={waveGhostBtn}>
        {copy.demo}
      </a>
    </div>
  );
}

export function TrustMarks({ items, yesLabel }: { readonly items: readonly string[]; readonly yesLabel: string }) {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <WaveMark kind="yes" label={yesLabel} />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function WaveSteps({
  id,
  shot = "steps",
  eyebrow,
  title,
  steps,
  actions,
  lead,
}: {
  readonly id?: string;
  readonly shot?: string;
  readonly eyebrow: string;
  readonly title: ReactNode;
  readonly steps: readonly { readonly n: string; readonly title: string; readonly body: string }[];
  readonly actions?: ReactNode;
  readonly lead?: ReactNode;
}) {
  return (
    <section id={id} data-shot={shot} className="relative scroll-mt-28 overflow-x-clip border-y border-hairline bg-surface/35">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[280px] w-[min(700px,100%)] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
        <WaveHeading align="center" eyebrow={eyebrow} title={title} lead={lead} />
        <ol className={cn("relative mt-14 grid gap-8", steps.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "lg:grid-cols-3")}>
          <div aria-hidden className="absolute left-[12%] right-[12%] top-[34px] hidden h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent lg:block" />
          {steps.map((step) => (
            <li key={step.n} className="relative min-w-0 text-center lg:text-left">
              <div
                className={cn(
                  "relative z-10 mx-auto grid size-[68px] place-items-center rounded-2xl border bg-background font-code text-[18px] lg:mx-0",
                  step.n === "03" || step.n === "04" ? "border-success/40 text-success" : "border-primary/40 text-primary",
                )}
              >
                {step.n}
              </div>
              <h3 className="mt-6 text-balance text-[22px] font-bold text-foreground">{step.title}</h3>
              <p className="mt-3 text-pretty text-[15.5px] leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
        {actions ? <div className="mt-12 flex justify-center">{actions}</div> : null}
      </div>
    </section>
  );
}

/** App, agency, or both. Copy matches the homepage choice block. */
export function WaveChoice({ locale, source }: { readonly locale: SiteLocale; readonly source: string }) {
  const copy = homeCopy(locale);
  const signup = appLink("/signup", locale, `${source}-signup`);
  const demo = appLink("/demo", locale, `${source}-demo`);
  const audit = `${localizedPath(locale, "/get-started")}#free-audit`;
  return (
    <WaveSection shot="choice">
      <WaveHeading
        align="center"
        eyebrow={copy.waysEyebrow}
        title={
          <>
            {copy.waysTitleBefore}
            <WaveAccent>{copy.waysAccent}</WaveAccent>
          </>
        }
        lead={copy.waysLead}
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <article className="min-w-0 rounded-[22px] border border-hairline bg-surface/60 p-7 lg:p-10">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[12px] font-semibold text-primary">{copy.appBadge}</span>
          <h3 className="mt-6 text-balance text-[1.7rem] font-bold leading-tight tracking-tight text-foreground sm:text-[1.85rem]">{copy.appTitle}</h3>
          <p className="mt-3 text-pretty text-[15.5px] leading-relaxed text-muted-foreground">{copy.appLead}</p>
          <ul className="mt-7 space-y-3.5 text-[15px] text-foreground">
            {copy.appPoints.map((point) => (
              <li key={point} className="flex gap-3">
                <WaveMark kind="yes" label={copy.markYes} />
                <span className="min-w-0">{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={signup} className={wavePrimaryBtn}>
              <GoogleTile className="size-6 rounded-full" />
              {copy.signup}
            </a>
            <a href={demo} className={waveGhostBtn}>
              {copy.demo}
            </a>
          </div>
        </article>
        <article className="min-w-0 rounded-[22px] border border-primary/30 bg-[linear-gradient(160deg,color-mix(in_oklab,var(--primary)_18%,transparent),var(--surface)_55%)] p-7 lg:p-10">
          <span className="inline-flex rounded-full bg-success/12 px-3 py-1 text-[12px] font-semibold text-success">{copy.agencyBadge}</span>
          <h3 className="mt-6 text-balance text-[1.7rem] font-bold leading-tight tracking-tight text-foreground sm:text-[1.85rem]">{copy.agencyTitle}</h3>
          <p className="mt-3 text-pretty text-[15.5px] leading-relaxed text-muted-foreground">{copy.agencyLead}</p>
          <ul className="mt-7 space-y-3.5 text-[15px] text-foreground">
            {copy.agencyPoints.map((point) => (
              <li key={point} className="flex gap-3">
                <WaveMark kind="yes" label={copy.markYes} />
                <span className="min-w-0">{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={audit} className={wavePrimaryBtn}>
              {copy.audit}
            </Link>
            <Link href={localizedPath(locale, "/pricing")} className={waveGhostBtn}>
              {copy.pricing}
            </Link>
          </div>
        </article>
      </div>
      <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-[22px] border border-hairline bg-surface/70 px-6 py-6 text-center backdrop-blur sm:px-8 md:flex-row md:text-left">
        <p className="min-w-0 text-pretty text-muted-foreground">
          <span className="font-bold text-foreground">{copy.bothTitle}</span> {copy.bothBody}
        </p>
        <Link href={localizedPath(locale, "/get-started")} className={`${waveGhostBtn} shrink-0`}>
          {copy.quote} →
        </Link>
      </div>
    </WaveSection>
  );
}

export function WaveStats({ locale }: { readonly locale: SiteLocale }) {
  const copy = homeCopy(locale);
  const stats = [
    { value: String(FOUNDER_YEARS), suffix: "+", label: copy.statYears },
    { value: String(PROJECTS_DELIVERED), suffix: "+", label: copy.statProjects },
    { value: String(MARKET_COUNT), suffix: "", label: copy.statMarkets },
    { value: String(RESPONSE_HOURS), suffix: copy.hoursSuffix, label: copy.statReply },
  ];
  return (
    <WaveSection shot="stats">
      <WaveHeading
        align="center"
        eyebrow={copy.numbersEyebrow}
        title={
          <>
            {copy.numbersTitleBefore}
            <WaveAccent>{copy.numbersAccent}</WaveAccent>
            {copy.numbersTitleAfter}
          </>
        }
        lead={copy.numbersLead}
      />
      <dl className="mt-12 grid grid-cols-2 overflow-hidden rounded-[22px] border border-hairline lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="min-w-0 border-hairline bg-background px-3 py-7 text-center max-lg:border-b max-lg:odd:border-r max-lg:[&:nth-child(n+3)]:border-b-0 sm:p-8 lg:border-r lg:p-10 lg:last:border-r-0"
          >
            <dt className="sr-only">{stat.label}</dt>
            <dd className="font-display text-[2.4rem] font-bold leading-none tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
              {stat.value}
              {stat.suffix ? (
                <span className="inline-block bg-[linear-gradient(90deg,var(--primary),var(--signal))] bg-clip-text pr-[0.22em] italic text-transparent box-decoration-clone [-webkit-box-decoration-break:clone]">
                  {stat.suffix}
                </span>
              ) : null}
            </dd>
            <dd className="mt-2 text-pretty text-[14px] text-muted-foreground">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </WaveSection>
  );
}

function faqHref(item: GscFaqItem, locale: SiteLocale): string | null {
  if (!item.link) return null;
  if (item.link.kind === "app") return `${getAppPath(item.link.path)}?lang=${locale}`;
  return localizedPath(locale, item.link.path);
}

export function WaveFaq({
  locale,
  items,
  title,
  lead,
}: {
  readonly locale: SiteLocale;
  readonly items: readonly GscFaqItem[];
  readonly title: ReactNode;
  readonly lead: string;
}) {
  const copy = homeCopy(locale);
  const schema = generateFAQSchema({ faqs: items.map((item) => ({ question: item.q[locale], answer: item.a[locale] })) });
  return (
    <section id="faq" data-shot="faq" className="scroll-mt-28 border-t border-hairline bg-surface/35">
      <SchemaMarkup schemas={[schema]} />
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:px-8 lg:py-28">
        <div className="min-w-0">
          <WaveEyebrow>{copy.faqEyebrow}</WaveEyebrow>
          <h2 className="mt-4 text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.6rem]">{title}</h2>
          <p className="mt-5 text-pretty text-[16px] leading-relaxed text-muted-foreground">{lead}</p>
          <a href={WHATSAPP_HREF} className={`${waveGhostBtn} mt-8`} rel="noopener noreferrer">
            <WhatsAppIcon className="size-5 text-[#25D366]" />
            {copy.whatsapp}
          </a>
        </div>
        <div className="min-w-0 divide-y divide-hairline rounded-[22px] border border-hairline bg-background/70">
          {items.map((item, index) => {
            const href = faqHref(item, locale);
            return (
              <details key={item.q.en} className="group p-5 sm:p-6" open={index === 0 ? true : undefined}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-semibold text-foreground sm:text-[17px] [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0 text-pretty">{item.q[locale]}</span>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-hairline text-primary transition-transform duration-200 group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <div className="mt-4 text-pretty text-[15.5px] leading-relaxed text-muted-foreground">
                  <p>{item.a[locale]}</p>
                  {href && item.link ? (
                    item.link.kind === "app" ? (
                      <a href={href} className="mt-3 inline-flex items-center gap-1.5 font-medium text-primary hover:text-foreground">
                        {item.link.label[locale]} →
                      </a>
                    ) : (
                      <Link href={href} className="mt-3 inline-flex items-center gap-1.5 font-medium text-primary hover:text-foreground">
                        {item.link.label[locale]} →
                      </Link>
                    )
                  ) : null}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Agency doors, in the homepage card style. Managed SEO is an extra door. */
export function WaveAgencyDoor({ locale }: { readonly locale: SiteLocale }) {
  const isEl = locale === "el";
  const lp = (path: string) => localizedPath(locale, path);
  const links = [
    { href: lp("/seo-services"), label: isEl ? "Υπηρεσίες SEO" : "SEO services", text: isEl ? "Μηνιαίο SEO με σειρά βάσει εσόδων" : "Monthly SEO, ranked by revenue" },
    { href: lp("/services/ai-visibility"), label: "GEO / AEO", text: isEl ? "Να σας προτείνουν ChatGPT και Gemini" : "Get recommended by ChatGPT and Gemini" },
    { href: lp("/pricing"), label: isEl ? "Τιμές της εταιρείας" : "Agency pricing", text: isEl ? "Πακέτα με σταθερή τιμή" : "Fixed-price packages" },
    {
      href: isEl ? "/el/diacheirisi-seo" : "/en/managed-seo",
      label: isEl ? "Διαχείριση SEO" : "Managed SEO",
      text: isEl ? "Η ομάδα κάνει τη μηνιαία δουλειά μέσα στο App" : "The team does the monthly work inside the App",
    },
  ];
  return (
    <WaveSection shot="agency">
      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="min-w-0">
          <WaveEyebrow>{isEl ? "Ή αναθέστε το στην ομάδα μας" : "Or hire our team"}</WaveEyebrow>
          <h2 className="mt-4 text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.6rem]">
            {isEl ? "Δεν έχετε χρόνο να το κάνετε μόνοι σας; " : "No time to do it yourself? "}
            <WaveAccent>{isEl ? "Το κάνουμε εμείς" : "We’ll do it for you"}</WaveAccent>
          </h2>
          <p className="mt-4 text-pretty text-[16px] leading-relaxed text-muted-foreground">
            {isEl
              ? "Το AnotherSEOGuru App είναι το λογισμικό που χρησιμοποιεί καθημερινά η ομάδα SEO του AnotherSEOGuru. Αν προτιμάτε να αναλάβουμε εμείς τις διορθώσεις, ξεκινήστε με έναν δωρεάν έλεγχο: βλέπετε τα προβλήματα, τι διορθώνεται πρώτο και σταθερή τιμή, πριν δεσμευτείτε."
              : "AnotherSEOGuru App is the software the AnotherSEOGuru SEO team uses every day. If you would rather we ship the fixes, start with a free audit: you get the problems, what to fix first and a fixed price before you commit."}
          </p>
        </div>
        <ul className="grid min-w-0 gap-3">
          {links.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="flex items-center justify-between gap-4 rounded-[22px] border border-hairline bg-surface/70 px-5 py-4 transition-colors hover:border-primary/40">
                <span className="min-w-0">
                  <span className="block font-semibold text-foreground">{item.label}</span>
                  <span className="block text-[13px] text-muted-foreground">{item.text}</span>
                </span>
                <span className="shrink-0 text-primary" aria-hidden>
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </WaveSection>
  );
}

export function WaveClose({
  locale,
  source,
  title,
  lead,
}: {
  readonly locale: SiteLocale;
  readonly source: string;
  readonly title: ReactNode;
  readonly lead?: ReactNode;
}) {
  const copy = homeCopy(locale);
  const signup = appLink("/signup", locale, `${source}-signup`);
  const demo = appLink("/demo", locale, `${source}-demo`);
  const audit = `${localizedPath(locale, "/get-started")}#free-audit`;
  return (
    <section data-shot="cta" className="relative overflow-x-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="kit-grid absolute inset-0 rotate-180 [mask-image:radial-gradient(ellipse_80%_65%_at_50%_100%,black_30%,transparent_100%)]" />
        <div className="absolute bottom-[-180px] left-1/2 h-[420px] w-[min(900px,140%)] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-[1240px] px-5 py-20 text-center lg:px-8 lg:py-28">
        <h2 className="mx-auto max-w-[900px] text-balance font-display text-[2.1rem] font-bold leading-[1.05] tracking-[-0.035em] text-foreground sm:text-[3.4rem]">
          {title}
        </h2>
        {lead ? <p className="mx-auto mt-5 max-w-[720px] text-pretty text-[17px] leading-relaxed text-muted-foreground">{lead}</p> : null}
        <div className="mx-auto mt-12 grid max-w-[1080px] gap-5 text-left md:grid-cols-2">
          <div className="min-w-0 rounded-[22px] border border-hairline bg-surface/75 p-6 backdrop-blur sm:p-8">
            <div className="text-[12px] font-semibold uppercase tracking-wider text-success">{copy.doneEyebrow}</div>
            <div className="mt-3 text-balance text-[21px] font-bold text-foreground">{copy.doneTitle}</div>
            <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted-foreground">{copy.doneBody}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={audit} className={wavePrimaryBtn}>
                {copy.audit}
              </Link>
              <a href={WHATSAPP_HREF} className={waveGhostBtn} rel="noopener noreferrer">
                <WhatsAppIcon className="size-5 text-[#25D366]" />
                {copy.whatsapp}
              </a>
            </div>
          </div>
          <div className="min-w-0 rounded-[22px] border border-hairline bg-surface/75 p-6 backdrop-blur sm:p-8">
            <div className="text-[12px] font-semibold uppercase tracking-wider text-primary">{copy.selfEyebrow}</div>
            <div className="mt-3 text-balance text-[21px] font-bold text-foreground">{copy.selfTitle}</div>
            <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted-foreground">{copy.selfBody}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={signup} className={wavePrimaryBtn}>
                <GoogleTile className="size-6 rounded-full" />
                {copy.signup}
              </a>
              <a href={demo} className={waveGhostBtn}>
                {copy.demo}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
