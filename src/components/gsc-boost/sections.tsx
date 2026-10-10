import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Building2, FileText, MessageSquare, ShoppingBag, Users } from "lucide-react";
import { cn } from "@/lib/cn";
import { getAppPath } from "@/lib/app-links";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateFAQSchema } from "@/lib/seo/schema";
import {
  Accent,
  AgencyCtas,
  CheckList,
  Container,
  FeatureRow,
  FollowThroughMini,
  KitEyebrow,
  KitHeading,
  KitSection,
  NameStrip,
  PlanMini,
  PropertiesMini,
  SoftwareCtas,
  StepsGrid,
} from "@/components/kit";
import { appLink, formatCredits, type Copy } from "./copy";
import type { GscFaqItem } from "./faq";
import { MODULES, moduleById, planAvailability, type ModuleId, type ProductModule } from "./modules";
import { ModulePreview } from "./ModulePreview";
import type { CostLine } from "./plans";

type L = SiteLocale;

/* ------------------------------------------------------------------ module bits */

export function ModuleTitle({ m, locale }: { readonly m: ProductModule; readonly locale: L }) {
  const { lead, accent, tail } = m.title;
  const tailText = tail?.[locale] ?? "";
  return (
    <>
      {lead[locale]} <Accent>{accent[locale]}</Accent>
      {tailText ? (tailText.startsWith(",") ? tailText : ` ${tailText}`) : null}
    </>
  );
}

/** The app landing's module tour: one alternating feature row per module. */
export function ModuleTour({
  locale,
  ids,
  source,
  className,
}: {
  readonly locale: L;
  readonly ids: ReadonlyArray<ModuleId>;
  readonly source: string;
  readonly className?: string;
}) {
  const lp = (p: string) => localizedPath(locale, p);
  return (
    <div className={cn("grid gap-24 sm:gap-32", className)}>
      {ids.map((id, i) => {
        const m = moduleById(id);
        const Icon = m.icon;
        return (
          <FeatureRow
            key={m.id}
            flip={i % 2 === 1}
            eyebrow={m.name[locale]}
            eyebrowIcon={<Icon />}
            title={<ModuleTitle m={m} locale={locale} />}
            body={m.summary[locale]}
            bullets={m.bullets.map((b) => b[locale])}
            links={[
              {
                href: appLink(m.demoPath, locale, `${source}-${m.id}`),
                label: locale === "el" ? "Δοκιμάστε το στην επίδειξη" : "Try it in the demo",
                primary: true,
              },
              { href: `${lp("/platform/features")}#${m.id}`, label: locale === "el" ? "Λεπτομέρειες και κόστος" : "Details and costs" },
            ]}
            note={m.plans.length < 3 ? planAvailability(m.plans)[locale] : undefined}
            preview={<ModulePreview id={m.id} locale={locale} />}
          />
        );
      })}
    </div>
  );
}

/** Nine compact cards that jump to each module's section on /platform/features. */
export function ModuleIndex({ locale, onPage = true, className }: { readonly locale: L; readonly onPage?: boolean; readonly className?: string }) {
  const base = onPage ? "" : localizedPath(locale, "/platform/features");
  return (
    <ul className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {MODULES.map((m) => {
        const Icon = m.icon;
        return (
          <li key={m.id}>
            <Link
              href={`${base}#${m.id}`}
              className="group flex h-full items-start gap-3.5 rounded-xl border border-hairline bg-surface/60 p-4 text-left transition-colors hover:border-brand/40 hover:bg-surface"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
                <Icon className="size-4" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-2 text-[14px] font-semibold text-foreground">
                  {m.name[locale]}
                  <ArrowRight className="size-3.5 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
                </span>
                <span className="mt-1 block text-[13px] leading-5 text-muted-foreground">{m.tagline[locale]}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function CostTable({ costs, locale }: { readonly costs: ReadonlyArray<CostLine>; readonly locale: L }) {
  return (
    <dl className="divide-y divide-hairline overflow-hidden rounded-xl border border-hairline bg-surface/60">
      {costs.map((line) => (
        <div key={line.label.en} className="flex items-center justify-between gap-4 px-4 py-2.5 text-[13.5px]">
          <dt className="min-w-0 text-muted-foreground">{line.label[locale]}</dt>
          <dd className={cn("shrink-0 font-medium tabular-nums", line.credits === 0 ? "text-success" : "text-foreground")}>
            {formatCredits(locale, line.credits)}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** One module's full section on /platform/features. */
export function ModuleDetail({ m, locale, flip }: { readonly m: ProductModule; readonly locale: L; readonly flip: boolean }) {
  const Icon = m.icon;
  const isEl = locale === "el";
  return (
    <section id={m.id} className="scroll-mt-28 border-t border-hairline py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className={cn("reveal min-w-0 lg:col-span-5", flip && "lg:order-2")}>
          <KitEyebrow icon={<Icon />}>{m.name[locale]}</KitEyebrow>
          <h2 className="mt-4 text-balance font-display text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground sm:text-[38px]">
            <ModuleTitle m={m} locale={locale} />
          </h2>
          <p className="mt-4 text-pretty text-[16px] leading-relaxed text-muted-foreground">{m.summary[locale]}</p>

          <h3 className="mt-9 text-[13px] font-semibold text-foreground">{isEl ? "Τι κάνει" : "What it does"}</h3>
          <CheckList items={m.what.map((w) => w[locale])} size="sm" className="mt-3" />

          <h3 className="mt-8 text-[13px] font-semibold text-foreground">{isEl ? "Γιατί έχει σημασία" : "Why it matters"}</h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{m.why[locale]}</p>

          <h3 className="mt-8 flex items-baseline justify-between gap-3 text-[13px] font-semibold text-foreground">
            {isEl ? "Πόσο κοστίζει" : "What it costs"}
            <span className="rounded-full bg-brand/12 px-2 py-0.5 text-[12px] font-medium text-brand">{planAvailability(m.plans)[locale]}</span>
          </h3>
          <div className="mt-3">
            <CostTable costs={m.costs} locale={locale} />
          </div>

          <SoftwareCtas locale={locale} align="left" source={`features-${m.id}`} className="mt-8" />
          <a
            href={appLink(m.demoPath, locale, `features-${m.id}-demo`)}
            className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-link hover:underline hover:underline-offset-4"
          >
            {isEl ? "Δείτε το στη ζωντανή επίδειξη" : "See it in the live demo"}
            <ArrowRight className="size-4" />
          </a>
        </div>
        <div className={cn("min-w-0 lg:col-span-7", flip && "lg:order-1")}>
          <div className="reveal lg:sticky lg:top-32">
            <ModulePreview
              id={m.id}
              locale={locale}
              footnote={isEl ? "Δείγμα δεδομένων για έναν φανταστικό ιστότοπο." : "Sample data for a fictional site."}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ shared sections */

export function WorksWith({ locale }: { readonly locale: L }) {
  const isEl = locale === "el";
  return (
    <NameStrip
      heading={isEl ? "Συνεργάζεται με τα εργαλεία που ήδη χρησιμοποιείτε" : "Works with the tools you already use"}
      items={[
        { name: "Google Search Console", role: isEl ? "Δεδομένα απόδοσης" : "Performance data" },
        { name: "Google Analytics 4", role: isEl ? "Επισκεψιμότητα και μετατροπές" : "Traffic and conversions" },
        { name: "WordPress", role: isEl ? "Εισαγωγή και δημοσίευση" : "Import and publish" },
        { name: "ChatGPT", role: isEl ? "Ορατότητα στην AI" : "AI visibility" },
        { name: "Gemini", role: isEl ? "Ορατότητα στην AI" : "AI visibility" },
        { name: "Perplexity", role: isEl ? "Ορατότητα στην AI" : "AI visibility" },
      ]}
    />
  );
}

/** Connect, plan, ship: the three-step strip with the kit's mini previews. */
export function HowItWorks({ locale, source, tinted = false }: { readonly locale: L; readonly source: string; readonly tinted?: boolean }) {
  const isEl = locale === "el";
  return (
    <KitSection tinted={tinted}>
      <KitHeading
        align="center"
        eyebrow={isEl ? "Πώς λειτουργεί" : "How it works"}
        title={
          <>
            {isEl ? "Από τη σύνδεση σε πλάνο δράσης σε" : "From sign-in to a plan in"} <Accent>{isEl ? "τρία βήματα" : "three steps"}</Accent>
          </>
        }
      />
      <StepsGrid
        className="mt-14"
        steps={[
          {
            title: isEl ? "Συνδέστε τη Google" : "Connect Google",
            text: isEl
              ? "Συνδεθείτε με Google και εγκρίνετε πρόσβαση μόνο για ανάγνωση. Εμφανίζονται όλα τα properties στα οποία έχει πρόσβαση ο λογαριασμός σας· επιλέξτε από πού θα ξεκινήσετε."
              : "Sign in with Google and approve read-only access. Every property your account can see is listed; pick where to start.",
            preview: <PropertiesMini locale={locale} />,
          },
          {
            title: isEl ? "Πάρτε το πλάνο σας" : "Get your plan",
            text: isEl
              ? "Το GSC Boost αναλύει τις αναζητήσεις και τις σελίδες σας, εντοπίζει κάθε ευκαιρία και ταξινομεί τις διορθώσεις με βάση τα κλικ που μπορούν να φέρουν."
              : "GSC Boost analyzes your queries and pages, finds every opportunity and ranks the fixes by the clicks they could bring.",
            preview: <PlanMini locale={locale} />,
          },
          {
            title: isEl ? "Υλοποιήστε και μετρήστε" : "Ship and measure",
            text: isEl
              ? "Μετατρέψτε τις διορθώσεις σε εργασίες, σημειώστε στο γράφημα τι υλοποιήσατε και παρακολουθήστε το αποτέλεσμα ή βάλτε το σε μια αναφορά πελάτη."
              : "Turn fixes into tasks, mark what you shipped on the chart and watch the result, or put it in a client report.",
            preview: <FollowThroughMini locale={locale} />,
          },
        ]}
      />
      <SoftwareCtas locale={locale} source={source} className="mt-12" />
    </KitSection>
  );
}

/** "Or hire our team": the agency door for visitors who would rather not do it themselves. */
export function AgencyCrossSell({ locale, className }: { readonly locale: L; readonly className?: string }) {
  const isEl = locale === "el";
  const lp = (p: string) => localizedPath(locale, p);
  return (
    <section className={cn("border-t border-hairline py-20 sm:py-24", className)}>
      <Container>
        <div className="reveal grid items-center gap-10 rounded-3xl border border-hairline bg-surface/50 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <KitEyebrow icon={<MessageSquare />}>{isEl ? "Ή αναθέστε το στην ομάδα μας" : "Or hire our team"}</KitEyebrow>
            <h2 className="mt-4 text-balance font-display text-[28px] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground sm:text-[36px]">
              {isEl ? "Δεν έχετε χρόνο να το κάνετε μόνοι σας;" : "No time to do it yourself?"}{" "}
              <Accent>{isEl ? "Το κάνουμε εμείς" : "We’ll do it for you"}</Accent>
            </h2>
            <p className="mt-4 text-pretty text-[16px] leading-relaxed text-muted-foreground">
              {isEl
                ? "Το GSC Boost είναι το λογισμικό που χρησιμοποιεί καθημερινά η ομάδα SEO του AnotherSEOGuru. Αν προτιμάτε να αναλάβουμε εμείς τις διορθώσεις, ξεκινήστε με έναν δωρεάν έλεγχο: βλέπετε τα προβλήματα, τι διορθώνεται πρώτο και σταθερή τιμή, πριν δεσμευτείτε."
                : "GSC Boost is the software the AnotherSEOGuru SEO team uses every day. If you would rather we ship the fixes, start with a free audit: you get the problems, what to fix first and a fixed price before you commit."}
            </p>
            <AgencyCtas locale={locale} align="left" className="mt-7" />
          </div>
          <div className="grid gap-3 text-[14px]">
            {[
              { href: "/seo-services", label: isEl ? "Υπηρεσίες SEO" : "SEO services", text: isEl ? "Μηνιαίο SEO με σειρά βάσει εσόδων" : "Monthly SEO, ranked by revenue" },
              { href: "/services/ai-visibility", label: "GEO / AEO", text: isEl ? "Να σας προτείνουν ChatGPT και Gemini" : "Get recommended by ChatGPT and Gemini" },
              { href: "/pricing", label: isEl ? "Τιμές της εταιρείας" : "Agency pricing", text: isEl ? "Πακέτα με σταθερή τιμή" : "Fixed-price packages" },
            ].map((item) => (
              <Link
                key={item.href}
                href={lp(item.href)}
                className="group flex items-center justify-between gap-4 rounded-xl border border-hairline bg-background/70 px-4 py-3 transition-colors hover:border-brand/40"
              >
                <span className="min-w-0">
                  <span className="block font-semibold text-foreground">{item.label}</span>
                  <span className="block text-[13px] text-muted-foreground">{item.text}</span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

const PERSONAS: ReadonlyArray<{ path: string; icon: typeof Users; title: Copy; text: Copy }> = [
  {
    path: "/platform/for/agencies",
    icon: Building2,
    title: { en: "For agencies", el: "Για agencies" },
    text: { en: "Every client’s Search Console, CRM, tasks and white-label reports in one workspace.", el: "Το Search Console κάθε πελάτη, CRM, εργασίες και white-label αναφορές σε έναν χώρο εργασίας." },
  },
  {
    path: "/platform/for/in-house",
    icon: Users,
    title: { en: "For in-house teams", el: "Για in-house ομάδες" },
    text: { en: "One ranked list of fixes for your own site, and proof of what each change did.", el: "Μία λίστα διορθώσεων για τον δικό σας ιστότοπο και απόδειξη για το τι έφερε κάθε αλλαγή." },
  },
  {
    path: "/platform/for/ecommerce",
    icon: ShoppingBag,
    title: { en: "For e-commerce", el: "Για e-shop" },
    text: { en: "Product and category pages that rank on page two, found and ranked by clicks.", el: "Σελίδες προϊόντων και κατηγοριών στη δεύτερη σελίδα, εντοπισμένες και ταξινομημένες κατά κλικ." },
  },
];

export function PersonaLinks({ locale, exclude, className }: { readonly locale: L; readonly exclude?: string; readonly className?: string }) {
  const lp = (p: string) => localizedPath(locale, p);
  return (
    <ul className={cn("grid gap-4 md:grid-cols-3", className)}>
      {PERSONAS.filter((p) => p.path !== exclude).map((p) => {
        const Icon = p.icon;
        return (
          <li key={p.path} className="reveal">
            <Link href={lp(p.path)} className="group flex h-full flex-col rounded-2xl border border-hairline bg-surface/60 p-6 transition-colors hover:border-brand/40">
              <span className="flex size-9 items-center justify-center rounded-lg border border-hairline bg-surface text-brand">
                <Icon className="size-4" aria-hidden />
              </span>
              <span className="mt-4 text-[17px] font-semibold text-foreground">{p.title[locale]}</span>
              <span className="mt-1.5 flex-1 text-[14.5px] leading-relaxed text-muted-foreground">{p.text[locale]}</span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-link">
                {locale === "el" ? "Δείτε πώς" : "See how"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/* ------------------------------------------------------------------ FAQ */

function faqHref(item: GscFaqItem, locale: L): string | null {
  if (!item.link) return null;
  if (item.link.kind === "app") return `${getAppPath(item.link.path)}?lang=${locale}`;
  return localizedPath(locale, item.link.path);
}

/**
 * FAQ with FAQPage schema from the same strings. Native <details>, so it
 * works without JavaScript, in the kit's visual language.
 */
export function GscFaq({
  locale,
  items,
  title,
  description,
  id = "faq",
}: {
  readonly locale: L;
  readonly items: ReadonlyArray<GscFaqItem>;
  readonly title?: ReactNode;
  readonly description?: ReactNode;
  readonly id?: string;
}) {
  const isEl = locale === "el";
  const schema = generateFAQSchema({ faqs: items.map((f) => ({ question: f.q[locale], answer: f.a[locale] })) });
  return (
    <section id={id} className="scroll-mt-24 border-t border-hairline py-20 sm:py-28">
      <SchemaMarkup schemas={[schema]} />
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <KitHeading
          eyebrow="FAQ"
          title={
            title ?? (
              <>
                {isEl ? "Ερωτήσεις &" : "Questions,"} <Accent>{isEl ? "απαντήσεις" : "answered"}</Accent>
              </>
            )
          }
          description={description}
        />
        <div className="reveal divide-y divide-hairline rounded-2xl border border-hairline bg-surface/50 px-5 sm:px-7">
          {items.map((f) => {
            const href = faqHref(f, locale);
            return (
              <details key={f.q.en} className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 text-[16px] font-semibold text-foreground transition-colors hover:text-brand [&::-webkit-details-marker]:hidden">
                  <span>{f.q[locale]}</span>
                  <span
                    aria-hidden
                    className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-hairline text-muted-foreground transition-transform duration-200 group-open:rotate-45 group-open:border-brand/50 group-open:text-brand"
                  >
                    +
                  </span>
                </summary>
                <div className="pb-6 text-[15px] leading-relaxed text-muted-foreground">
                  <p>{f.a[locale]}</p>
                  {href && f.link ? (
                    f.link.kind === "app" ? (
                      <a href={href} className="mt-3 inline-flex items-center gap-1.5 font-medium text-link hover:underline">
                        {f.link.label[locale]}
                        <ArrowRight className="size-3.5" />
                      </a>
                    ) : (
                      <Link href={href} className="mt-3 inline-flex items-center gap-1.5 font-medium text-link hover:underline">
                        {f.link.label[locale]}
                        <ArrowRight className="size-3.5" />
                      </Link>
                    )
                  ) : null}
                </div>
              </details>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ misc */

/** A row of small text links to the other platform pages, for crawl paths. */
export function PlatformLinks({ locale, current }: { readonly locale: L; readonly current: string }) {
  const isEl = locale === "el";
  const lp = (p: string) => localizedPath(locale, p);
  const links = [
    { path: "/platform", label: "GSC Boost" },
    { path: "/platform/features", label: isEl ? "Δυνατότητες" : "Features" },
    { path: "/platform/pricing", label: isEl ? "Τιμές" : "Pricing" },
    { path: "/platform/for/agencies", label: isEl ? "Για agencies" : "For agencies" },
    { path: "/platform/for/in-house", label: isEl ? "Για in-house ομάδες" : "For in-house teams" },
    { path: "/platform/for/ecommerce", label: isEl ? "Για e-shop" : "For e-commerce" },
    { path: "/platform/security", label: isEl ? "Ασφάλεια" : "Security" },
    { path: "/get-started", label: isEl ? "Δωρεάν έλεγχος SEO" : "Free SEO audit" },
  ].filter((l) => l.path !== current);
  return (
    <section className="border-t border-hairline py-8">
      <Container>
        <nav aria-label={isEl ? "Σελίδες GSC Boost" : "GSC Boost pages"} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {links.map((l) => (
            <Link key={l.path} href={lp(l.path)} className="transition-colors hover:text-link">
              {l.label}
            </Link>
          ))}
          <a href={`${getAppPath("/")}?lang=${locale}`} className="inline-flex items-center gap-1 transition-colors hover:text-link">
            <FileText className="size-3.5" aria-hidden />
            app.anotherseoguru.com
          </a>
        </nav>
      </Container>
    </section>
  );
}
