import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { KitBreadcrumbs } from "@/components/page-kit";
import { ContactCard, HelpShell, helpCopy } from "@/components/help/HelpShell";
import { CATEGORY_ICON, helpContent, helpMetaDescription, helpPath } from "@/data/help";
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
  return buildMetadata({
    title: `${cat.title} · ${helpCopy(locale).home}`,
    description: helpMetaDescription(cat.description, locale),
    path: helpPath(locale, cat.slug),
    hreflangPath: `/help/${cat.slug}`,
    hreflangLocales: ["en", "el"],
  });
}

export default async function HelpCategoryPage({ params }: PageProps) {
  const { locale: raw, category } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const cat = helpContent(locale).find((c) => c.slug === category);
  if (!cat) notFound();
  const t = helpCopy(locale);
  const Icon = CATEGORY_ICON[cat.slug];
  const crumbs = [
    { name: t.homeCrumb, url: localizedPath(locale, "/") },
    { name: t.short, url: helpPath(locale) },
    { name: cat.title, url: helpPath(locale, cat.slug) },
  ];
  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: crumbs }),
    generateCollectionPageSchema({
      name: cat.title,
      description: cat.description,
      url: `https://anotherseoguru.com${helpPath(locale, cat.slug)}`,
      inLanguage: locale,
      items: cat.articles.map((a) => ({ name: a.title, url: `https://anotherseoguru.com${helpPath(locale, cat.slug, a.slug)}`, itemType: "TechArticle" })),
    }),
  );

  return (
    <HelpShell locale={locale} current={cat.slug}>
      <SchemaMarkup schemas={schemas} />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-8 lg:py-12">
        <KitBreadcrumbs items={crumbs} align="left" />
        <div className="mt-7 flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary-glow">{Icon ? <Icon className="size-6" aria-hidden /> : null}</span>
          <div>
            <h1 className="font-display text-[34px] font-semibold leading-tight tracking-[-0.035em] text-foreground">{cat.title}</h1>
            <p className="mt-2 text-[17px] leading-relaxed text-muted-foreground">{cat.description}</p>
          </div>
        </div>
        <ul className="mt-10 grid gap-3">
          {cat.articles.map((a) => (
            <li key={a.slug}>
              <Link href={helpPath(locale, cat.slug, a.slug)} className="group flex items-center gap-4 rounded-2xl border border-hairline bg-surface px-6 py-5 transition-colors hover:border-primary/40">
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[16.5px] font-semibold tracking-[-0.015em] text-foreground">{a.title}</span>
                  <span className="mt-1 block text-[14px] leading-relaxed text-muted-foreground">{a.description}</span>
                </span>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
        <ContactCard locale={locale} className="mt-12" />
      </div>
    </HelpShell>
  );
}
