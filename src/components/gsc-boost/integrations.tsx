import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Bot, Check, Globe, Minus, Puzzle, Smartphone, UserPlus, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { getAppPath } from "@/lib/app-links";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { BASE_URL, brandOrganization } from "@/lib/seo/schema";
import type { SchemaOutput } from "@/lib/types/seo";
import { KitHeading, KitSection, MarketingBadge, Accent, kitPrimaryBtn, type MarketingBadgeKind } from "@/components/kit";
import { appLink, c, type Copy } from "./copy";

/**
 * The ways to use AnotherSEOGuru App besides the web app: the iPhone app, the Chrome
 * extension, the WordPress plugin and the MCP server for AI assistants. All of
 * them sign in with the same AnotherSEOGuru account, and each sign-in is
 * listed (and can be disconnected) in the app under Settings → Connected apps.
 *
 * Product facts come from the app repo (gsc-gemini-boost): chrome-extension/
 * STORE_LISTING.md, wordpress-plugin/anotherseoguru/readme.txt and
 * packages/mcp/README.md. Keep these pages in step with those files.
 */

type L = SiteLocale;

export const INTEGRATIONS_PATH = "/platform/integrations";
export const CHROME_PATH = "/platform/chrome-extension";
export const WORDPRESS_PATH = "/platform/wordpress";
export const MCP_PATH = "/platform/mcp";

/** The plugin zip. The WordPress.org directory listing is not submitted yet. */
export const WORDPRESS_ZIP = getAppPath("/downloads/anotherseoguru.zip");
export const MCP_URL = "https://app.anotherseoguru.com/mcp";
export const MCP_PACKAGE = "@anotherseoguru/mcp";

export const SIGN_UP_FREE: Copy = c("Sign up free", "Δωρεάν εγγραφή");

/** "Sign up free": the primary CTA on every product page, into the app's sign-up. */
export function SignUpFree({ locale, source, className }: { readonly locale: L; readonly source: string; readonly className?: string }) {
  return (
    <a href={appLink("/signup", locale, source)} className={cn(kitPrimaryBtn, className)}>
      <UserPlus className="size-4" aria-hidden />
      {SIGN_UP_FREE[locale]}
    </a>
  );
}

/* ------------------------------------------------------------------ surfaces */

export type SurfaceId = "web" | "iphone" | "chrome" | "wordpress" | "mcp";

interface Surface {
  readonly id: SurfaceId;
  readonly path: string;
  readonly icon: ComponentType<{ className?: string }>;
  readonly name: Copy;
  readonly where: Copy;
  readonly text: Copy;
  readonly status: { readonly kind: MarketingBadgeKind; readonly label: Copy };
}

export const SURFACES: ReadonlyArray<Surface> = [
  {
    id: "web",
    path: "/platform",
    icon: Globe,
    name: c("Web app", "Εφαρμογή web"),
    where: c("app.anotherseoguru.com", "app.anotherseoguru.com"),
    text: c(
      "The full workspace: ranked fixes, performance, keywords, site audit, AI visibility, client reports. Plans and settings live here.",
      "Ο πλήρης χώρος εργασίας: διορθώσεις με σειρά, απόδοση, λέξεις-κλειδιά, έλεγχος ιστότοπου, ορατότητα σε AI, αναφορές πελατών. Εδώ ορίζετε πακέτο και ρυθμίσεις.",
    ),
    status: { kind: "live", label: c("Live", "Διαθέσιμο") },
  },
  {
    id: "iphone",
    path: "/platform/iphone",
    icon: Smartphone,
    name: c("iPhone app", "Εφαρμογή iPhone"),
    where: c("iPhone · TestFlight beta", "iPhone · TestFlight beta"),
    text: c(
      "This week's fixes, rank tracking, alerts and widgets on your phone, on the same account.",
      "Οι διορθώσεις της εβδομάδας, θέσεις, ειδοποιήσεις και widgets στο κινητό, με τον ίδιο λογαριασμό.",
    ),
    status: { kind: "new", label: c("Beta", "Beta") },
  },
  {
    id: "chrome",
    path: CHROME_PATH,
    icon: Puzzle,
    name: c("Chrome extension", "Επέκταση Chrome"),
    where: c("Any page, and Google results", "Κάθε σελίδα και τα αποτελέσματα της Google"),
    text: c(
      "Free on-page SEO checks without an account. Signed in, the page's own Search Console numbers and tasks.",
      "Δωρεάν έλεγχοι SEO σε κάθε σελίδα, χωρίς λογαριασμό. Με σύνδεση, τα νούμερα Search Console και οι εργασίες της σελίδας.",
    ),
    status: { kind: "new", label: c("Coming soon", "Έρχεται σύντομα") },
  },
  {
    id: "wordpress",
    path: WORDPRESS_PATH,
    icon: WordPressGlyph,
    name: c("WordPress SEO plugin", "Plugin SEO για WordPress"),
    where: c("Block and classic editor", "Block και classic editor"),
    text: c(
      "A full SEO plugin with a live Google preview, analysis, schema, sitemaps and redirects, plus Search Console data, keyword research and AI titles in every post.",
      "Πλήρες plugin SEO με ζωντανή προεπισκόπηση Google, ανάλυση, schema, sitemaps και ανακατευθύνσεις, συν Search Console, έρευνα λέξεων-κλειδιών και τίτλους με AI σε κάθε άρθρο.",
    ),
    status: { kind: "free", label: c("Free download", "Δωρεάν λήψη") },
  },
  {
    id: "mcp",
    path: MCP_PATH,
    icon: Bot,
    name: c("AI assistants (MCP)", "Βοηθοί AI (MCP)"),
    where: c("Claude, ChatGPT, Cursor, VS Code, Windsurf", "Claude, ChatGPT, Cursor, VS Code, Windsurf"),
    text: c(
      "Ask about your Search Console data, fix list, tasks and AI visibility, and let the assistant work through a task.",
      "Ρωτήστε για τα δεδομένα Search Console, τις διορθώσεις, τις εργασίες και την ορατότητα σε AI, και αφήστε τον βοηθό να δουλέψει μια εργασία.",
    ),
    status: { kind: "live", label: c("Live", "Διαθέσιμο") },
  },
];

/** lucide has no WordPress mark; a plain "W" in a circle stands in for it. */
export function WordPressGlyph({ className }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="m6.5 8.5 3 8 2.5-6 2.5 6 3-8" />
    </svg>
  );
}

/** One card per way to use the account, linking to its page. */
export function IntegrationCards({
  locale,
  exclude,
  className,
}: {
  readonly locale: L;
  readonly exclude?: SurfaceId;
  readonly className?: string;
}) {
  const items = SURFACES.filter((s) => s.id !== exclude);
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2", items.length === 5 ? "lg:grid-cols-3" : "lg:grid-cols-4", className)}>
      {items.map(({ id, path, icon: Icon, name, where, text, status }) => (
        <li key={id} className="reveal">
          <Link
            href={localizedPath(locale, path)}
            className="group flex h-full flex-col rounded-2xl border border-hairline bg-surface/60 p-6 transition-colors hover:border-brand/40 hover:bg-surface"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-brand/15 text-brand">
                <Icon className="size-4" />
              </span>
              <MarketingBadge kind={status.kind}>{status.label[locale]}</MarketingBadge>
            </div>
            <h3 className="mt-4 text-[16px] font-semibold text-foreground">{name[locale]}</h3>
            <p className="mt-0.5 text-[12.5px] text-muted-foreground/80">{where[locale]}</p>
            <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-muted-foreground">{text[locale]}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-link">
              {locale === "el" ? "Περισσότερα" : "Learn more"}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** The closing "same account everywhere" block on each product page. */
export function OtherWaysSection({ locale, current, tinted = false }: { readonly locale: L; readonly current: SurfaceId; readonly tinted?: boolean }) {
  const isEl = locale === "el";
  return (
    <KitSection tinted={tinted} id="one-login">
      <KitHeading
        eyebrow={isEl ? "Ένας λογαριασμός" : "One login"}
        title={
          <>
            {isEl ? "Ο ίδιος λογαριασμός," : "The same account,"} <Accent>{isEl ? "παντού" : "everywhere"}</Accent>
          </>
        }
        description={
          isEl
            ? "Οι εργασίες, οι ιστότοποι και τα δεδομένα σας συγχρονίζονται σε web, iPhone, Chrome, WordPress και βοηθούς AI. Στο Ρυθμίσεις → Συνδεδεμένες εφαρμογές βλέπετε κάθε σύνδεση και την αποσυνδέετε με ένα κλικ."
            : "Your tasks, sites and data sync across the web app, iPhone, Chrome, WordPress and AI assistants. Settings → Connected apps lists every connection and disconnects any of them in one click."
        }
      />
      <IntegrationCards locale={locale} exclude={current} className="mt-12" />
      <p className="mt-8 text-[14px]">
        <Link href={localizedPath(locale, INTEGRATIONS_PATH)} className="inline-flex items-center gap-1.5 font-medium text-link hover:underline">
          {isEl ? "Όλες οι ενσωματώσεις" : "All integrations"}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </p>
    </KitSection>
  );
}

/* ------------------------------------------------------------------ comparison table */

export type Cell = boolean | Copy;

/** Two-column feature comparison; true/false render as marks, Copy as text. */
export function CompareTable({
  locale,
  caption,
  columns,
  rows,
  note,
}: {
  readonly locale: L;
  readonly caption: Copy;
  readonly columns: readonly [Copy, Copy];
  readonly rows: ReadonlyArray<{ readonly label: Copy; readonly ours: Cell; readonly theirs: Cell }>;
  readonly note?: Copy;
}) {
  const cell = (v: Cell, strong: boolean): ReactNode => {
    if (v === true)
      return (
        <span className="inline-flex size-6 items-center justify-center rounded-full bg-brand/15 text-brand">
          <Check className="size-3.5" strokeWidth={3} aria-hidden />
          <span className="sr-only">{locale === "el" ? "Ναι" : "Yes"}</span>
        </span>
      );
    if (v === false)
      return (
        <span className="inline-flex size-6 items-center justify-center rounded-full border border-hairline text-muted-foreground">
          <Minus className="size-3.5" aria-hidden />
          <span className="sr-only">{locale === "el" ? "Όχι" : "No"}</span>
        </span>
      );
    return <span className={cn("text-[13.5px]", strong ? "text-foreground" : "text-muted-foreground")}>{v[locale]}</span>;
  };
  return (
    <div className="reveal mt-12">
      <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[560px] border-collapse text-left text-[14px]">
          <caption className="sr-only">{caption[locale]}</caption>
          <thead>
            <tr className="border-b border-hairline text-[13px] text-muted-foreground">
              <th scope="col" className="w-[52%] py-3 pr-4 font-medium">
                {locale === "el" ? "Δυνατότητα" : "Feature"}
              </th>
              <th scope="col" className="py-3 pr-4 font-semibold text-foreground">
                {columns[0][locale]}
              </th>
              <th scope="col" className="py-3 font-medium">
                {columns[1][locale]}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label.en} className="border-b border-hairline/70">
                <th scope="row" className="py-3.5 pr-4 font-normal text-foreground/90">
                  {r.label[locale]}
                </th>
                <td className="py-3.5 pr-4">{cell(r.ours, true)}</td>
                <td className="py-3.5">{cell(r.theirs, false)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note ? <p className="mt-4 text-[13px] text-muted-foreground">{note[locale]}</p> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ small bits */

/** A monospace snippet block (commands, URLs, config). */
export function CodeBlock({ children, label, className }: { readonly children: string; readonly label?: string; readonly className?: string }) {
  return (
    <figure className={cn("overflow-hidden rounded-xl border border-hairline bg-background", className)}>
      {label ? <figcaption className="border-b border-hairline bg-surface px-4 py-2 font-mono text-[11.5px] text-muted-foreground">{label}</figcaption> : null}
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed text-foreground">
        <code>{children}</code>
      </pre>
    </figure>
  );
}

/** Icon + title + text grid, as on the iPhone page's feature list. */
export function FeatureGrid({
  locale,
  items,
  className,
}: {
  readonly locale: L;
  readonly items: ReadonlyArray<{ icon: LucideIcon; title: Copy; text: Copy }>;
  readonly className?: string;
}) {
  return (
    <ul className={cn("mt-12 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map(({ icon: Icon, title, text }) => (
        <li key={title.en} className="bg-background p-6 sm:p-7">
          <span className="flex size-9 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <Icon className="size-4" aria-hidden />
          </span>
          <h3 className="mt-4 text-[16px] font-semibold text-foreground">{title[locale]}</h3>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-foreground">{text[locale]}</p>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ schema */

/**
 * SoftwareApplication for one integration, tied to the AnotherSEOGuru App app and the
 * organization. No ratings or user counts: we have none to report.
 */
export function integrationAppSchema(input: {
  readonly locale: L;
  readonly path: string;
  readonly name: string;
  readonly alternateName?: string;
  readonly description: Copy;
  readonly operatingSystem: string;
  readonly applicationCategory: string;
  readonly applicationSubCategory?: string;
  readonly free?: boolean;
  readonly downloadUrl?: string;
  readonly softwareRequirements?: string;
  readonly featureList?: ReadonlyArray<string>;
}): SchemaOutput {
  const { locale, path } = input;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${BASE_URL}${path}#app`,
    name: input.name,
    ...(input.alternateName ? { alternateName: input.alternateName } : {}),
    description: input.description[locale],
    url: `${BASE_URL}${localizedPath(locale, path)}`,
    applicationCategory: input.applicationCategory,
    ...(input.applicationSubCategory ? { applicationSubCategory: input.applicationSubCategory } : {}),
    operatingSystem: input.operatingSystem,
    inLanguage: ["en", "el"],
    ...(input.downloadUrl ? { downloadUrl: input.downloadUrl } : {}),
    ...(input.softwareRequirements ? { softwareRequirements: input.softwareRequirements } : {}),
    ...(input.featureList ? { featureList: [...input.featureList] } : {}),
    ...(input.free ? { offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } } : {}),
    isPartOf: { "@type": "SoftwareApplication", name: "AnotherSEOGuru App", url: `${BASE_URL}${localizedPath(locale, "/platform")}` },
    provider: brandOrganization(),
  };
}
