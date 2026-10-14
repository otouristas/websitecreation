import { docsIndex } from "@/lib/docs/search";

/** The docs search index, fetched by the ⌘K palette the first time it opens. */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "el" }];
}

export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return Response.json(docsIndex(locale === "el" ? "el" : "en", 1500), {
    headers: { "cache-control": "public, max-age=3600, s-maxage=86400", "x-robots-tag": "noindex" },
  });
}
