import { markdownFor, markdownPaths } from "@/lib/docs/markdown";

/** Markdown twin of each docs page. Reached through the ".md" rewrite in middleware. */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return markdownPaths().map((slug) => ({ slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const body = markdownFor(slug);
  if (!body) return new Response("Not found", { status: 404 });
  return new Response(body, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "x-robots-tag": "noindex",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
