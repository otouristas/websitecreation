import Link from "next/link";
import { notFound } from "next/navigation";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { DocsPage } from "@/components/docs/DocsPage";
import { DocsShell } from "@/components/docs/DocsShell";
import { GlossaryFilter } from "@/components/docs/GlossaryFilter";
import { SignupCard } from "@/components/docs/SignupCard";
import { categoryDescription, categoryTitle } from "@/components/glossary/category-labels";
import { glossaryCategories } from "@/data/glossary-data";
import { buildMetadata, generateDefinedTermSetSchema } from "@/lib/seo";
import { BASE_URL } from "@/lib/seo/schema";
import { getGlossaryUi } from "@/lib/i18n/get-dictionary";
import { isValidLocale, type SiteLocale } from "@/lib/i18n/locale";
import { allTerms, glossaryPath, termCopy } from "@/lib/docs/glossary";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const ui = getGlossaryUi(locale as SiteLocale);
  const meta = buildMetadata({
    title: ui.title,
    description: ui.metaDescription,
    path: glossaryPath(locale),
    hreflangPath: "/glossary",
    primaryKeyword: locale === "el" ? "SEO γλωσσάρι" : "SEO glossary",
  });
  return { ...meta, alternates: { ...meta.alternates, types: { "text/markdown": `${BASE_URL}${glossaryPath(locale)}.md` } } };
}

export default async function GlossaryPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const el = locale === "el";
  const ui = getGlossaryUi(locale);
  const refs = allTerms();

  const termSetSchema = generateDefinedTermSetSchema({
    name: ui.title,
    description: ui.metaDescription,
    url: `${BASE_URL}${glossaryPath(locale)}`,
    inLanguage: locale,
    terms: refs.map(({ term }) => ({ id: term.id, name: termCopy(term, locale).name, description: termCopy(term, locale).short })),
  });

  // A–Z: by the first letter of the English term, which is how people search for SEO jargon.
  const letters = new Map<string, typeof refs>();
  for (const r of [...refs].sort((a, b) => a.term.term.localeCompare(b.term.term))) {
    const l = /[a-z]/i.test(r.term.term[0]) ? r.term.term[0].toUpperCase() : "#";
    letters.set(l, [...(letters.get(l) ?? []), r]);
  }

  return (
    <DocsShell locale={locale} tab="glossary" alternateHref={glossaryPath(el ? "en" : "el")}>
      <SchemaMarkup schemas={[termSetSchema]} />
      <DocsPage
        locale={locale}
        eyebrow={el ? "Γλωσσάρι" : "Glossary"}
        title={ui.heroTitle}
        description={
          el
            ? `${refs.length} όροι για τεχνικό SEO, GEO, AEO, αναζήτηση με AI και Search Console, ο καθένας με ορισμό, παράδειγμα και τρόπο εφαρμογής.`
            : `${refs.length} terms for technical SEO, GEO, AEO, AI search and Search Console, each with a definition, an example and how to apply it.`
        }
        path={glossaryPath(locale)}
        headings={glossaryCategories.map((c) => ({ id: c.id, text: categoryTitle(c, locale), level: 2 as const }))}
        rail={<SignupCard locale={locale} source="glossary" />}
      >
        <GlossaryFilter
          terms={refs.map(({ category, term }) => {
            const t = termCopy(term, locale);
            return { id: term.id, name: t.name, short: t.short, href: glossaryPath(locale, term.id), section: categoryTitle(category, locale) };
          })}
          placeholder={ui.searchPlaceholder}
          empty={ui.noResults}
        />
        <nav aria-label="A–Z" className="mt-6 flex flex-wrap gap-1.5">
          {[...letters.keys()].map((l) => (
            <a key={l} href={`#letter-${l}`} className="grid size-8 place-items-center rounded-lg border border-hairline font-mono text-[13px] text-muted-foreground hover:border-primary/50 hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>

        {glossaryCategories.map((c) => (
          <section key={c.id} aria-labelledby={c.id}>
            <h2 id={c.id} className="mt-12 scroll-mt-[calc(var(--site-header-height)+1.5rem)] border-b border-hairline pb-3 font-display text-[22px] font-semibold tracking-[-0.025em] text-foreground">
              {categoryTitle(c, locale)}
            </h2>
            <p className="mt-2 text-[14.5px] text-muted-foreground">{categoryDescription(c, locale)}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {c.terms.map((term) => {
                const t = termCopy(term, locale);
                return (
                  <Link key={term.id} href={glossaryPath(locale, term.id)} className="group rounded-2xl border border-hairline bg-surface p-4 transition-colors hover:border-primary/50">
                    <span className="block font-display text-[15.5px] font-semibold text-foreground group-hover:text-primary-glow">{t.name}</span>
                    <span className="mt-1 line-clamp-2 block text-[13.5px] leading-relaxed text-muted-foreground">{t.short}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        <h2 id="a-z" className="mt-14 border-b border-hairline pb-3 font-display text-[22px] font-semibold tracking-[-0.025em] text-foreground">{el ? "Όλοι οι όροι Α–Ω" : "All terms A–Z"}</h2>
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          {[...letters].map(([l, list]) => (
            <div key={l} id={`letter-${l}`} className="scroll-mt-[calc(var(--site-header-height)+1.5rem)]">
              <p className="font-mono text-[13px] font-semibold text-primary-glow">{l}</p>
              <ul className="mt-2 grid gap-1">
                {list.map(({ term }) => (
                  <li key={term.id}>
                    <Link href={glossaryPath(locale, term.id)} className="text-[14.5px] text-muted-foreground hover:text-foreground">
                      {termCopy(term, locale).name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </DocsPage>
    </DocsShell>
  );
}
