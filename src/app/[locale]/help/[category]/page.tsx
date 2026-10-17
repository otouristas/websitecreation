import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { ArticleBody } from "@/components/help/ArticleBody";
import { ContactCard, SUPPORT_EMAIL, helpCopy } from "@/components/help/HelpShell";
import { DocsPage } from "@/components/docs/DocsPage";
import { DocsShell } from "@/components/docs/DocsShell";
import { SignupCard } from "@/components/docs/SignupCard";
import { categoryIcon, tabForCategory } from "@/lib/docs/nav";
import { IPHONE_CATEGORY, helpContent, helpMetaDescription, helpPath, type Block, type Shot } from "@/data/help";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { combineSchemas, generateBreadcrumbSchema, generateCollectionPageSchema } from "@/lib/seo/schema";

type PageProps = { params: Promise<{ locale: string; category: string }> };

export function generateStaticParams({ params }: { params: { locale: string } }) {
  const locale: SiteLocale = isValidLocale(params.locale) ? params.locale : "en";
  return helpContent(locale).map((c) => ({ category: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isValidLocale(locale)) return {};
  const cat = helpContent(locale).find((c) => c.slug === category);
  if (!cat) return {};
  const meta = buildMetadata({
    title: `${cat.title} · ${helpCopy(locale).home}`,
    description: helpMetaDescription(cat.description, locale),
    path: helpPath(locale, cat.slug),
    hreflangPath: `/help/${cat.slug}`,
    hreflangLocales: ["en", "el"],
  });
  return { ...meta, alternates: { ...meta.alternates, types: { "text/markdown": `https://anotherseoguru.com${helpPath(locale, cat.slug)}.md` } } };
}

/** Every iPhone screenshot used in the guides, once, for the overview gallery. */
function iphoneShots(blocks: ReadonlyArray<Block>): Shot[] {
  return blocks.flatMap((b): Shot[] =>
    b.type === "image" && b.device === "iphone" ? [b] : b.type === "gallery" ? [...b.items] : b.type === "steps" ? b.items.flatMap((i) => (typeof i !== "string" && i.image?.device === "iphone" ? [i.image] : [])) : b.type === "tabs" ? b.items.flatMap((t) => iphoneShots(t.blocks)) : [],
  );
}

export default async function HelpCategoryPage({ params }: PageProps) {
  const { locale: raw, category } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const cat = helpContent(locale).find((c) => c.slug === category);
  if (!cat) notFound();
  const t = helpCopy(locale);
  const el = locale === "el";
  const isIphone = cat.slug === IPHONE_CATEGORY;
  const path = helpPath(locale, cat.slug);
  const crumbs = [
    { name: t.homeCrumb, url: localizedPath(locale, "/") },
    { name: t.short, url: helpPath(locale) },
    { name: cat.title, url: path },
  ];
  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: crumbs }),
    generateCollectionPageSchema({
      name: cat.title,
      description: cat.description,
      url: `https://anotherseoguru.com${path}`,
      inLanguage: locale,
      items: cat.articles.map((a) => ({ name: a.title, url: `https://anotherseoguru.com${helpPath(locale, cat.slug, a.slug)}`, itemType: "TechArticle" })),
    }),
  );

  const seen = new Set<string>();
  const shots = isIphone
    ? cat.articles.flatMap((a) => iphoneShots(a.body)).filter((s) => (seen.has(s.src) ? false : (seen.add(s.src), true))).slice(0, 6)
    : [];
  const blocks: Block[] = [
    { type: "h2", id: "articles", text: el ? "Οδηγοί" : "Guides" },
    { type: "cards", cols: 2, items: cat.articles.map((a) => ({ title: a.title, text: a.description, href: helpPath(locale, cat.slug, a.slug), icon: categoryIcon(cat.slug) })) },
    ...(shots.length
      ? ([
          { type: "h2", id: "screens", text: el ? "Οθόνες από τη beta" : "Screens from the beta" },
          { type: "gallery", items: shots.slice(0, 3) },
          ...(shots.length > 3 ? [{ type: "gallery", items: shots.slice(3, 6) } as Block] : []),
        ] as Block[])
      : []),
  ];

  return (
    <DocsShell locale={locale} tab={tabForCategory(cat.slug)} alternateHref={helpPath(el ? "en" : "el", cat.slug)}>
      <SchemaMarkup schemas={schemas} />
      <DocsPage
        locale={locale}
        eyebrow={isIphone ? "Beta" : t.short}
        title={cat.title}
        description={cat.description}
        path={path}
        headings={[
          { id: "articles", text: el ? "Οδηγοί" : "Guides", level: 2 },
          ...(shots.length ? [{ id: "screens", text: el ? "Οθόνες από τη beta" : "Screens from the beta", level: 2 as const }] : []),
        ]}
        rail={<SignupCard locale={locale} source={`help-category-${cat.slug}`} />}
      >
        {isIphone ? (
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("iPhone beta access")}`}
            className="mt-6 flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/[0.07] px-5 py-4 text-[15px] text-foreground hover:border-primary/60"
          >
            <Mail className="size-4.5 shrink-0 text-primary-glow" aria-hidden />
            <span className="flex-1">
              {el ? "Η εφαρμογή είναι σε beta στο TestFlight. Ζητήστε πρόσκληση με ένα email." : "The app is in beta on TestFlight. Ask for an invite with one email."}
            </span>
            <span className="font-semibold text-primary-glow">{el ? "Ζητήστε πρόσβαση" : "Request access"}</span>
          </a>
        ) : null}
        <ArticleBody blocks={blocks} locale={locale} />
        <ContactCard locale={locale} className="mt-12" />
      </DocsPage>
    </DocsShell>
  );
}
