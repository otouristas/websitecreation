import { docsIndex, rankForQuestion } from "@/lib/docs/search";

/**
 * "Ask AI" in the docs. Picks the docs pages closest to the question, sends
 * them to Claude with the question and streams the answer back as plain text.
 * The pages it used travel in the x-sources header so the panel can link them.
 *
 * Needs ANTHROPIC_API_KEY. Without it the route answers 503 and the panel
 * falls back to search results plus "Ask ChatGPT / Claude" hand-offs.
 */
export const runtime = "nodejs";

const MODEL = process.env.ASK_AI_MODEL || "claude-haiku-5-5";
const HOURLY_LIMIT = Number(process.env.ASK_AI_HOURLY_LIMIT || 20);
const hits = new Map<string, { count: number; reset: number }>();

function limited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + 3_600_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > HOURLY_LIMIT;
}

export async function POST(req: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return Response.json({ error: "not_configured" }, { status: 503 });

  let body: { question?: unknown; locale?: unknown; page?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  const question = typeof body.question === "string" ? body.question.trim().slice(0, 600) : "";
  const locale = body.locale === "el" ? "el" : "en";
  if (question.length < 3) return Response.json({ error: "bad_request" }, { status: 400 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (limited(ip)) return Response.json({ error: "rate_limited" }, { status: 429 });

  const index = docsIndex(locale, 6000);
  const page = typeof body.page === "string" ? index.find((e) => e.href === body.page) : undefined;
  const ranked = rankForQuestion(index, question, 6);
  const sources = [...(page ? [page] : []), ...ranked.filter((e) => e.href !== page?.href)].slice(0, 6);

  const context = sources.map((s, i) => `<doc id="${i + 1}" title="${s.title}" url="https://anotherseoguru.com${s.href}">\n${s.description}\n${s.text}\n</doc>`).join("\n\n");
  const system = [
    "You answer questions about GSC Boost (by AnotherSEOGuru), an SEO platform built on Google Search Console with a web app and an iPhone app in TestFlight beta, and about SEO terms from its glossary.",
    "Answer only from the documents provided. If they don't cover the question, say so briefly and suggest contacting support@anotherseoguru.com.",
    `Reply in ${locale === "el" ? "Greek (keep industry terms such as Search Console, CTR or crawl budget in English)" : "English"}.`,
    "Be concise and practical: a direct answer first, then short steps if useful. Use Markdown lists and **bold** for UI labels. Do not invent features, prices or settings. Do not include URLs; the interface lists the sources.",
  ].join(" ");

  const upstream = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 700,
      stream: true,
      system,
      messages: [{ role: "user", content: `${context}\n\nQuestion: ${question}` }],
    }),
  });
  if (!upstream.ok || !upstream.body) return Response.json({ error: "upstream" }, { status: 502 });

  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const reader = upstream.body.getReader();
  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      let buffer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) >= 0) {
          const line = buffer.slice(0, nl).trim();
          buffer = buffer.slice(nl + 1);
          if (!line.startsWith("data:")) continue;
          try {
            const event = JSON.parse(line.slice(5));
            if (event.type === "content_block_delta" && event.delta?.type === "text_delta") controller.enqueue(encoder.encode(event.delta.text));
          } catch {
            // Ignore keep-alive and partial lines.
          }
        }
      }
      controller.close();
    },
    cancel() {
      void reader.cancel();
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-sources": encodeURIComponent(JSON.stringify(sources.map((s) => ({ href: s.href, title: s.title, section: s.section })))),
    },
  });
}
