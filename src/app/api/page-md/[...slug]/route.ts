import { htmlToPageMarkdown } from "@/lib/markdown/page-markdown";

/**
 * Markdown twin of any localized page. Reached through middleware: /en/x.md,
 * /el.md, or the page URL with `Accept: text/markdown`. It renders the HTML
 * page and converts its main content, so it never drifts from the page.
 */
export const revalidate = 86400;

const SLUG = /^[a-z0-9-]{1,120}$/;

export async function GET(req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  if (!slug.length || (slug[0] !== "en" && slug[0] !== "el") || slug.length > 8 || !slug.every((s) => SLUG.test(s))) {
    return new Response("Not found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  }
  const origin = new URL(req.url).origin;
  const pageUrl = `${origin}/${slug.join("/")}`;
  const res = await fetch(pageUrl, { headers: { accept: "text/html", "x-asg-markdown": "1" }, redirect: "manual", next: { revalidate } });
  if (res.status !== 200 || !(res.headers.get("content-type") ?? "").includes("text/html")) {
    return new Response("Not found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  }
  const { body, canonical } = htmlToPageMarkdown(await res.text(), pageUrl);
  return new Response(body, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "x-robots-tag": "noindex",
      link: `<${canonical}>; rel="canonical"`,
      vary: "accept",
      "cache-control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
