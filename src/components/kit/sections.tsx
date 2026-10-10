import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Clock3, CreditCard, LockKeyhole, MessageCircle, RotateCcw, ShieldCheck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { getAppPath } from "@/lib/app-links";
import { WHATSAPP_HREF } from "@/lib/contact-info";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Accent, CheckList, Container, KitEyebrow, MarketingBadge, type MarketingBadgeKind } from "./primitives";

/* ------------------------------------------------------------------ buttons */

export const kitPrimaryBtn =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-center font-display text-[15px] font-semibold text-primary-foreground bg-[linear-gradient(180deg,var(--primary),var(--primary-deep))] shadow-[inset_0_1px_0_0_oklch(1_0_0/18%),0_0_0_1px_color-mix(in_oklab,var(--primary-glow)_35%,transparent),0_10px_30px_-12px_color-mix(in_oklab,var(--primary)_80%,transparent)] transition-[transform,box-shadow] duration-200 hover:-translate-y-px motion-reduce:transition-none motion-reduce:hover:translate-y-0";

export const kitSecondaryBtn =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-hairline bg-surface/70 px-5 py-2.5 text-center text-[15px] font-medium text-foreground backdrop-blur transition-colors hover:border-brand/50 hover:bg-surface-raised";

/** Lime "software" button. Lime always means GSC Boost, the product. */
export const kitSoftwareBtn =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl py-2 pl-2 pr-5 text-center font-display text-[15px] font-semibold text-signal-foreground bg-signal shadow-[inset_0_1px_0_0_oklch(1_0_0/30%),0_10px_30px_-14px_color-mix(in_oklab,var(--signal)_70%,transparent)] transition-[transform,filter] duration-200 hover:-translate-y-px hover:brightness-105 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

/** The Google "G" on a white tile, as on the app's sign-in button. */
export function GoogleTile({ className }: { readonly className?: string }) {
  return (
    <span className={cn("grid size-8 shrink-0 place-items-center rounded-lg bg-white", className)} aria-hidden>
      <svg viewBox="0 0 24 24" className="size-[18px]">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.96 10.96 0 0 0 12 1 11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ copy */

type Copy = Record<SiteLocale, string>;
const c = (en: string, el: string): Copy => ({ en, el });

export const KIT_COPY = {
  freeAudit: c("Get a free SEO audit", "Δωρεάν έλεγχος SEO"),
  whatsapp: c("Talk on WhatsApp", "Μιλήστε στο WhatsApp"),
  startFree: c("Start free with Google", "Δωρεάν έναρξη με Google"),
  liveDemo: c("Explore the live demo", "Δείτε τη ζωντανή επίδειξη"),
  readOnly: c("Read-only Google access", "Πρόσβαση στη Google μόνο για ανάγνωση"),
  noCard: c("No credit card for the demo", "Χωρίς κάρτα για την επίδειξη"),
  cancel: c("Cancel anytime", "Ακύρωση οποτεδήποτε"),
  reply24: c("Reply within 24 hours", "Απάντηση σε 24 ώρες"),
  noContract: c("No lock-in contract", "Χωρίς δέσμευση"),
  realData: c("Built on your Search Console data", "Με βάση τα δικά σας δεδομένα Search Console"),
} as const;

/* ------------------------------------------------------------------ hero */

/** Grid texture plus a soft royal-blue glow behind a centered hero. */
export function HeroBackdrop({ className }: { readonly className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div className="kit-grid absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,black_30%,transparent_100%)]" />
      <div className="absolute left-1/2 top-[-320px] h-[640px] w-[1100px] max-w-[180vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_32%,transparent),transparent)]" />
    </div>
  );
}

/** The pill above a hero headline: a coloured tag, one line, an arrow. */
export function AnnouncePill({
  href,
  tag,
  text,
  kind = "new",
  className,
}: {
  readonly href: string;
  readonly tag: string;
  readonly text: string;
  readonly kind?: MarketingBadgeKind;
  readonly className?: string;
}) {
  const external = href.startsWith("http");
  const cls = cn(
    "group inline-flex max-w-full items-center gap-2 rounded-full border border-hairline bg-surface/80 py-1 pl-1 pr-3 text-[13px] text-muted-foreground backdrop-blur transition-colors hover:border-brand/40 hover:text-foreground",
    className,
  );
  const inner = (
    <>
      <MarketingBadge kind={kind} className="h-6 px-2 text-[10.5px]">
        {tag}
      </MarketingBadge>
      <span className="min-w-0 truncate">{text}</span>
      <ArrowRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
    </>
  );
  return external ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/**
 * Centered hero in the app landing's layout: announce pill, a big headline
 * with a serif accent, one paragraph, the CTAs, a trust line, then whatever
 * the page shows underneath (a product window, a form, a proof strip).
 */
export function HeroCentered({
  pill,
  title,
  lead,
  actions,
  trust,
  children,
  belowHeader = true,
  className,
}: {
  readonly pill?: ReactNode;
  readonly title: ReactNode;
  readonly lead?: ReactNode;
  readonly actions?: ReactNode;
  readonly trust?: ReactNode;
  readonly children?: ReactNode;
  readonly belowHeader?: boolean;
  readonly className?: string;
}) {
  return (
    <section className={cn("relative isolate overflow-hidden", belowHeader && "hero-below-header", className)}>
      <HeroBackdrop />
      <Container className="pt-6 text-center sm:pt-10">
        {pill ? <div className="rise-in">{pill}</div> : null}
        <h1 className="rise-in mx-auto mt-6 max-w-[16ch] text-balance break-words font-display text-[clamp(2.125rem,10vw,2.5rem)] font-semibold leading-[1.03] tracking-[-0.045em] text-foreground [animation-delay:60ms] sm:max-w-4xl sm:text-[60px] lg:text-[72px]">
          {title}
        </h1>
        {lead ? (
          <p className="rise-in mx-auto mt-5 max-w-2xl text-pretty text-[17px] leading-relaxed text-muted-foreground [animation-delay:140ms] sm:text-[19px]">
            {lead}
          </p>
        ) : null}
        {actions ? <div className="rise-in mt-8 [animation-delay:220ms]">{actions}</div> : null}
        {trust ? <div className="rise-in mt-5 [animation-delay:260ms]">{trust}</div> : null}
      </Container>
      {children ? <div className="rise-in [animation-delay:320ms]">{children}</div> : null}
    </section>
  );
}

/** Row of small reassurance items with icons. */
export function TrustLine({
  items,
  align = "center",
  className,
}: {
  readonly items: ReadonlyArray<{ icon: LucideIcon; label: string }>;
  readonly align?: "center" | "left";
  readonly className?: string;
}) {
  return (
    <ul
      className={cn(
        "flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted-foreground",
        align === "center" ? "justify-center" : "justify-start",
        className,
      )}
    >
      {items.map(({ icon: Icon, label }) => (
        <li key={label} className="inline-flex items-center gap-1.5">
          <Icon className="size-3.5 text-muted-foreground/70" aria-hidden />
          {label}
        </li>
      ))}
    </ul>
  );
}

export function agencyTrust(locale: SiteLocale) {
  return [
    { icon: Clock3, label: KIT_COPY.reply24[locale] },
    { icon: ShieldCheck, label: KIT_COPY.realData[locale] },
    { icon: RotateCcw, label: KIT_COPY.noContract[locale] },
  ];
}

export function softwareTrust(locale: SiteLocale) {
  return [
    { icon: LockKeyhole, label: KIT_COPY.readOnly[locale] },
    { icon: CreditCard, label: KIT_COPY.noCard[locale] },
    { icon: RotateCcw, label: KIT_COPY.cancel[locale] },
  ];
}

/* ------------------------------------------------------------------ CTAs */

const ctaRow = (align: "center" | "left") =>
  cn(
    "flex flex-col gap-3 sm:flex-row",
    align === "center" ? "items-stretch justify-center sm:items-center" : "items-stretch sm:items-center",
  );

/** Agency door: free audit (to the two-field form) plus WhatsApp. */
export function AgencyCtas({
  locale,
  align = "center",
  primaryLabel,
  primaryHref,
  className,
}: {
  readonly locale: SiteLocale;
  readonly align?: "center" | "left";
  readonly primaryLabel?: string;
  readonly primaryHref?: string;
  readonly className?: string;
}) {
  return (
    <div className={cn(ctaRow(align), className)}>
      <Link href={primaryHref ?? `${localizedPath(locale, "/get-started")}#free-audit`} className={kitPrimaryBtn}>
        {primaryLabel ?? KIT_COPY.freeAudit[locale]}
        <ArrowRight className="size-4" />
      </Link>
      <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className={kitSecondaryBtn}>
        <WhatsAppIcon className="size-4 text-[#25D366]" />
        {KIT_COPY.whatsapp[locale]}
      </a>
    </div>
  );
}

/** Software door: Google sign-up in the app plus the public demo. */
export function SoftwareCtas({
  locale,
  align = "center",
  source,
  className,
}: {
  readonly locale: SiteLocale;
  readonly align?: "center" | "left";
  /** Where on the website the sign-up came from, passed to the app. */
  readonly source?: string;
  readonly className?: string;
}) {
  const qs = new URLSearchParams({ lang: locale, ...(source ? { utm_source: "website", utm_content: source } : {}) });
  return (
    <div className={cn(ctaRow(align), className)}>
      <a href={`${getAppPath("/signup")}?${qs.toString()}`} className={kitSoftwareBtn}>
        <GoogleTile />
        {KIT_COPY.startFree[locale]}
      </a>
      <a href={`${getAppPath("/demo")}?${qs.toString()}`} className={kitSecondaryBtn}>
        {KIT_COPY.liveDemo[locale]}
        <ArrowRight className="size-4 text-muted-foreground" />
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ CTA band */

const BAND = {
  title: c("Your next customers are already searching.", "Οι επόμενοι πελάτες σας ήδη ψάχνουν."),
  accent: c("Let’s find them", "Ας τους βρούμε"),
  agencyTag: c("We do it for you", "Το αναλαμβάνουμε εμείς"),
  agencyTitle: c("A free SEO audit in 24 hours", "Δωρεάν έλεγχος SEO σε 24 ώρες"),
  agencyBody: c(
    "Send us your website. You get the issues that cost you customers, what to fix first and a fixed price, in your language.",
    "Στείλτε μας την ιστοσελίδα σας. Παίρνετε τα προβλήματα που σας κοστίζουν πελάτες, τι διορθώνεται πρώτο και σταθερή τιμή.",
  ),
  softwareTag: c("Do it yourself", "Μόνοι σας"),
  softwareTitle: c("GSC Boost: Search Console as a to-do list", "GSC Boost: το Search Console ως λίστα ενεργειών"),
  softwareBody: c(
    "Connect Google read-only and get the fixes that win the most clicks, ranked and estimated, for every site you manage.",
    "Συνδέστε τη Google μόνο για ανάγνωση και πάρτε τις διορθώσεις που φέρνουν τα περισσότερα κλικ, με σειρά και εκτίμηση.",
  ),
};

/**
 * Closing band with both doors. Every page ends here: the agency offer on
 * the left, the software on the right, so a visitor who isn't ready to hire
 * still has a free way in.
 */
export function CtaBand({
  locale,
  title,
  description,
  source,
  className,
}: {
  readonly locale: SiteLocale;
  readonly title?: ReactNode;
  readonly description?: ReactNode;
  readonly source?: string;
  readonly className?: string;
}) {
  return (
    <section className={cn("py-20 sm:py-28", className)}>
      <Container>
        <div className="reveal relative isolate overflow-hidden rounded-3xl border border-hairline bg-surface/60 px-5 py-14 sm:px-10 sm:py-16">
          <div aria-hidden className="kit-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_80%_at_50%_0%,black_20%,transparent_100%)]" />
          <div
            aria-hidden
            className="absolute left-1/2 top-0 -z-10 h-72 w-[760px] max-w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_35%,transparent),transparent)]"
          />
          <h2 className="mx-auto max-w-3xl text-balance break-words text-center font-display text-[30px] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-[46px]">
            {title ?? (
              <>
                {BAND.title[locale]} <Accent>{BAND.accent[locale]}</Accent>.
              </>
            )}
          </h2>
          {description ? (
            <p className="mx-auto mt-4 max-w-xl text-pretty text-center text-[16px] leading-relaxed text-muted-foreground sm:text-[18px]">
              {description}
            </p>
          ) : null}
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 text-left md:grid-cols-2">
            <div className="flex flex-col rounded-2xl border border-hairline bg-background/70 p-6">
              <KitEyebrow icon={<MessageCircle />}>{BAND.agencyTag[locale]}</KitEyebrow>
              <h3 className="mt-3 font-display text-[22px] font-semibold tracking-[-0.025em] text-foreground">{BAND.agencyTitle[locale]}</h3>
              <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-muted-foreground">{BAND.agencyBody[locale]}</p>
              <AgencyCtas locale={locale} align="left" className="mt-6 sm:!flex-col sm:!items-stretch" />
            </div>
            <div className="flex flex-col rounded-2xl border border-signal/30 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--signal)_7%,var(--background)),var(--background))] p-6">
              <KitEyebrow icon={<span className="size-1.5 rounded-full bg-signal" />} className="text-signal">
                {BAND.softwareTag[locale]}
              </KitEyebrow>
              <h3 className="mt-3 font-display text-[22px] font-semibold tracking-[-0.025em] text-foreground">{BAND.softwareTitle[locale]}</h3>
              <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-muted-foreground">{BAND.softwareBody[locale]}</p>
              <SoftwareCtas locale={locale} align="left" source={source ?? "cta-band"} className="mt-6 sm:!flex-col sm:!items-stretch" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ feature row */

/**
 * The app landing's module row: copy on one side (eyebrow with icon, a title
 * with a serif accent, a paragraph, three checks, links) and a preview on
 * the other. `flip` swaps the sides so a stack of rows alternates.
 */
export function FeatureRow({
  id,
  eyebrow,
  eyebrowIcon,
  title,
  body,
  bullets,
  links,
  note,
  preview,
  flip = false,
  className,
}: {
  readonly id?: string;
  readonly eyebrow: ReactNode;
  readonly eyebrowIcon?: ReactNode;
  readonly title: ReactNode;
  readonly body?: ReactNode;
  readonly bullets?: ReadonlyArray<ReactNode>;
  readonly links?: ReadonlyArray<{ href: string; label: string; primary?: boolean }>;
  readonly note?: ReactNode;
  readonly preview: ReactNode;
  readonly flip?: boolean;
  readonly className?: string;
}) {
  return (
    <div id={id} className={cn("scroll-mt-28 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16", className)}>
      <div className={cn("reveal min-w-0", flip && "lg:order-2")}>
        <KitEyebrow icon={eyebrowIcon} className="mb-4">
          {eyebrow}
        </KitEyebrow>
        <h3 className="text-balance font-display text-[28px] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground sm:text-[36px]">
          {title}
        </h3>
        {body ? <p className="mt-4 text-pretty text-[16px] leading-relaxed text-muted-foreground">{body}</p> : null}
        {bullets && bullets.length > 0 ? <CheckList items={bullets} className="mt-6" /> : null}
        {links && links.length > 0 ? (
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px] font-medium">
            {links.map((l) => {
              const cls = l.primary
                ? "inline-flex items-center gap-1.5 text-link hover:underline underline-offset-4"
                : "text-foreground/80 hover:text-foreground";
              const inner = (
                <>
                  {l.label}
                  {l.primary ? <ArrowRight className="size-4" /> : null}
                </>
              );
              return l.href.startsWith("http") ? (
                <a key={l.href + l.label} href={l.href} className={cls}>
                  {inner}
                </a>
              ) : (
                <Link key={l.href + l.label} href={l.href} className={cls}>
                  {inner}
                </Link>
              );
            })}
          </div>
        ) : null}
        {note ? <p className="mt-4 text-[12.5px] text-muted-foreground/80">{note}</p> : null}
      </div>
      <div className={cn("reveal min-w-0 [--rv:8%]", flip && "lg:order-1")}>{preview}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ before / after */

export function PanelLabel({
  tag,
  title,
  text,
  tone,
}: {
  readonly tag: string;
  readonly title: string;
  readonly text: string;
  readonly tone: "muted" | "brand";
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span
        className={cn(
          "rounded-md px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em]",
          tone === "brand" ? "bg-brand/15 text-brand" : "bg-foreground/8 text-muted-foreground",
        )}
      >
        {tag}
      </span>
      <div className="min-w-0">
        <div className="text-[14px] font-semibold text-foreground">{title}</div>
        <div className="text-[13px] text-muted-foreground">{text}</div>
      </div>
    </div>
  );
}

export function BeforeAfter({
  before,
  after,
}: {
  readonly before: { tag: string; title: string; text: string; node: ReactNode };
  readonly after: { tag: string; title: string; text: string; node: ReactNode };
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
      <div className="reveal min-w-0">
        <PanelLabel tag={before.tag} title={before.title} text={before.text} tone="muted" />
        {before.node}
      </div>
      <div className="hidden self-center lg:flex" aria-hidden>
        <span className="flex size-10 items-center justify-center rounded-full border border-hairline bg-surface text-muted-foreground">
          <ArrowRight className="size-4" />
        </span>
      </div>
      <div className="reveal min-w-0 [--rv:8%]">
        <PanelLabel tag={after.tag} title={after.title} text={after.text} tone="brand" />
        {after.node}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ small grids */

/** Three icon + title + text columns, as under the app's before/after. */
export function ValueTrio({
  items,
  className,
}: {
  readonly items: ReadonlyArray<{ icon: LucideIcon; title: string; text: string }>;
  readonly className?: string;
}) {
  return (
    <div className={cn("grid gap-8 sm:grid-cols-3", className)}>
      {items.map(({ icon: Icon, title, text }, i) => (
        <div key={title} className="reveal" style={{ ["--rv" as string]: `${i * 6}%` }}>
          <span className="flex size-9 items-center justify-center rounded-lg border border-hairline bg-surface text-brand">
            <Icon className="size-4" aria-hidden />
          </span>
          <h3 className="mt-4 text-[16px] font-semibold text-foreground">{title}</h3>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-foreground">{text}</p>
        </div>
      ))}
    </div>
  );
}

/** "How it works" cards: mono number, title, text and an optional mini preview. */
export function StepsGrid({
  steps,
  className,
}: {
  readonly steps: ReadonlyArray<{ title: string; text: string; preview?: ReactNode }>;
  readonly className?: string;
}) {
  return (
    <ol className={cn("grid gap-4 md:grid-cols-3", className)}>
      {steps.map((s, i) => (
        <li
          key={s.title}
          className="reveal flex flex-col rounded-2xl border border-hairline bg-surface/60 p-6"
          style={{ ["--rv" as string]: `${i * 6}%` }}
        >
          <span className="font-mono text-[12px] font-medium text-brand">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 text-[17px] font-semibold text-foreground">{s.title}</h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{s.text}</p>
          {s.preview ? <div className="mt-5 flex-1">{s.preview}</div> : null}
        </li>
      ))}
    </ol>
  );
}

/** The quiet strip of names under a hero ("Works with…", "Trusted by…"). */
export function NameStrip({
  heading,
  items,
  className,
}: {
  readonly heading: string;
  readonly items: ReadonlyArray<{ name: string; role?: string; href?: string }>;
  readonly className?: string;
}) {
  return (
    <section aria-label={heading} className={cn("mt-16 border-y border-hairline bg-surface/40 sm:mt-20", className)}>
      <Container className="py-10">
        <p className="text-center text-[13px] font-medium text-muted-foreground">{heading}</p>
        <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((w) => {
            const inner = (
              <>
                <div className="text-[15px] font-semibold tracking-[-0.015em] text-foreground/85">{w.name}</div>
                {w.role ? <div className="mt-1 text-[12px] text-muted-foreground/80">{w.role}</div> : null}
              </>
            );
            return (
              <li key={w.name} className="text-center">
                {w.href ? (
                  <Link href={w.href} className="block transition-opacity hover:opacity-80">
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

/** Plain section wrapper with the app landing's vertical rhythm. */
export function KitSection({
  id,
  children,
  className,
  tinted = false,
}: {
  readonly id?: string;
  readonly children: ReactNode;
  readonly className?: string;
  readonly tinted?: boolean;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-28", tinted && "border-y border-hairline bg-surface/35", className)}>
      <Container>{children}</Container>
    </section>
  );
}


