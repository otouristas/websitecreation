import { ArrowRight } from "lucide-react";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { Bloom, Eyebrow, GhostButtonLink, PrimaryButtonLink, Section, SectionHeading } from "./primitives";
import { Reveal } from "@/components/motion/Reveal";

/**
 * "One search, three places to be found": a classic Google result, an AI
 * Overview, and a chat answer, each showing where a well-structured tourism
 * site appears. Illustrative markup for a placeholder domain - the point is
 * the shape of each surface, not a claimed placement.
 */
const COPY = {
  en: {
    eyebrow: "GEO / AEO",
    title: (
      <>
        One search. <span className="gradient-text">Three places</span> to be found.
      </>
    ),
    body: "Travellers still click blue links. They also read the AI summary above them, and they ask ChatGPT before they book. We build pages that work in all three, and we measure the trend instead of promising a citation.",
    cols: [
      { label: "Google search", hint: "The classic result" },
      { label: "AI Overview", hint: "The summary above it" },
      { label: "ChatGPT · Perplexity", hint: "The answer that names you" },
    ],
    query: "boutique hotel Paros near the port",
    serp: {
      title: "Boutique hotel by Parikia port · Your Hotel Paros",
      url: "your-hotel.gr › rooms",
      snippet: "Nine rooms 300 m from the ferry. Free port pickup, breakfast on the terrace, direct-booking rates from …",
      others: ["booking.com › paros", "tripadvisor.com › Hotels-Paros"],
    },
    aio: {
      lead: "For a boutique stay near Parikia port, travellers often shortlist:",
      bullets: ["Your Hotel Paros - 300 m from the ferry, free port pickup", "Two larger properties on the ring road"],
      sources: ["your-hotel.gr", "booking.com", "greeka.com"],
    },
    chat: {
      q: "Which boutique hotel in Paros is closest to the port?",
      a: "Your Hotel Paros sits about 300 m from Parikia's ferry terminal and offers a free pickup. Rooms start from the direct-booking rate on their site [1].",
      cite: "[1] your-hotel.gr/rooms",
    },
    caveat: "No engine guarantees a citation. Our work makes your pages usable by one, and tracks where you appear month over month.",
    tool: "Try it with your own keyword",
    cta: "How we do GEO & AEO",
  },
  el: {
    eyebrow: "GEO / AEO",
    title: (
      <>
        Μία αναζήτηση. <span className="gradient-text">Τρία σημεία</span> για να σας βρουν.
      </>
    ),
    body: "Οι ταξιδιώτες εξακολουθούν να κάνουν κλικ στα μπλε αποτελέσματα. Διαβάζουν όμως και την περίληψη AI από πάνω, και ρωτούν το ChatGPT πριν κλείσουν. Φτιάχνουμε σελίδες που δουλεύουν και στα τρία, και μετράμε την τάση αντί να υποσχόμαστε αναφορές.",
    cols: [
      { label: "Αναζήτηση Google", hint: "Το κλασικό αποτέλεσμα" },
      { label: "AI Overview", hint: "Η περίληψη από πάνω" },
      { label: "ChatGPT · Perplexity", hint: "Η απάντηση που σας ονομάζει" },
    ],
    query: "boutique ξενοδοχείο Πάρος κοντά στο λιμάνι",
    serp: {
      title: "Boutique ξενοδοχείο στο λιμάνι της Παροικιάς · Your Hotel Paros",
      url: "your-hotel.gr › δωμάτια",
      snippet: "Εννέα δωμάτια 300 μ. από το πλοίο. Δωρεάν παραλαβή από το λιμάνι, πρωινό στη βεράντα, τιμές απευθείας κράτησης από …",
      others: ["booking.com › paros", "tripadvisor.com › Hotels-Paros"],
    },
    aio: {
      lead: "Για boutique διαμονή κοντά στο λιμάνι της Παροικιάς, οι ταξιδιώτες συχνά ξεχωρίζουν:",
      bullets: ["Your Hotel Paros - 300 μ. από το πλοίο, δωρεάν παραλαβή", "Δύο μεγαλύτερα καταλύματα στον περιφερειακό"],
      sources: ["your-hotel.gr", "booking.com", "greeka.com"],
    },
    chat: {
      q: "Ποιο boutique ξενοδοχείο στην Πάρο είναι πιο κοντά στο λιμάνι;",
      a: "Το Your Hotel Paros βρίσκεται περίπου 300 μ. από τον σταθμό των πλοίων της Παροικιάς και προσφέρει δωρεάν παραλαβή. Οι τιμές ξεκινούν από την τιμή απευθείας κράτησης στην ιστοσελίδα του [1].",
      cite: "[1] your-hotel.gr/rooms",
    },
    caveat: "Καμία μηχανή δεν εγγυάται αναφορά. Η δουλειά μας κάνει τις σελίδες σας αξιοποιήσιμες από μηχανές απάντησης και παρακολουθεί πού εμφανίζεστε κάθε μήνα.",
    tool: "Δοκιμάστε το με τη δική σας λέξη-κλειδί",
    cta: "Πώς κάνουμε GEO & AEO",
  },
} as const;

function Frame({
  label,
  hint,
  children,
  delay,
}: {
  label: string;
  hint: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="glass flex h-full flex-col rounded-2xl p-5">
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand">{label}</span>
          <span className="truncate text-[11px] text-muted-foreground">{hint}</span>
        </div>
        {children}
      </div>
    </Reveal>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-signal/15 px-1 py-0.5 text-foreground ring-1 ring-signal/30">
      {children}
    </span>
  );
}

export function AiSearchSplit({ locale = "en" }: { locale?: SiteLocale }) {
  const c = COPY[locale];
  const lp = (path: string) => localizedPath(locale, path);

  return (
    <Section id="ai-search" className="relative">
      <Bloom soft className="left-1/2 top-0 h-[24rem] w-[60rem] -translate-x-1/2" />
      <SectionHeading eyebrow={c.eyebrow} title={c.title} body={c.body} />

      {/* Shared query */}
      <div className="mx-auto mt-12 flex max-w-xl items-center gap-3 rounded-full border border-hairline bg-surface/60 px-5 py-3 text-sm text-foreground backdrop-blur-md">
        <svg viewBox="0 0 20 20" aria-hidden className="size-4 shrink-0 text-brand">
          <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M13.5 13.5 17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span className="truncate">{c.query}</span>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Google result */}
        <Frame label={c.cols[0].label} hint={c.cols[0].hint} delay={0}>
          <div className="space-y-4 text-[13px]">
            <div className="rounded-xl border border-signal/30 bg-signal/5 p-3">
              <p className="font-mono text-[10px] text-muted-foreground">{c.serp.url}</p>
              <p className="mt-1 font-medium leading-snug text-link">{c.serp.title}</p>
              <p className="mt-1.5 leading-relaxed text-muted-foreground">{c.serp.snippet}</p>
            </div>
            {c.serp.others.map((o) => (
              <div key={o} className="px-3 opacity-60">
                <p className="font-mono text-[10px] text-muted-foreground">{o}</p>
                <div className="mt-1.5 h-2 w-3/4 rounded bg-foreground/15" />
                <div className="mt-1.5 h-2 w-full rounded bg-foreground/10" />
              </div>
            ))}
          </div>
        </Frame>

        {/* AI Overview */}
        <Frame label={c.cols[1].label} hint={c.cols[1].hint} delay={0.08}>
          <div className="rounded-xl border border-hairline bg-[linear-gradient(135deg,color-mix(in_oklab,var(--primary)_14%,transparent),color-mix(in_oklab,var(--brand)_10%,transparent))] p-3 text-[13px]">
            <p className="mb-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-brand">
              <svg viewBox="0 0 16 16" aria-hidden className="size-3">
                <path d="M8 1l1.8 4.6L14 7.4l-4.2 1.8L8 14l-1.8-4.8L2 7.4l4.2-1.8z" fill="currentColor" />
              </svg>
              AI Overview
            </p>
            <p className="leading-relaxed text-foreground">{c.aio.lead}</p>
            <ul className="mt-2 space-y-1.5 text-muted-foreground">
              {c.aio.bullets.map((b, i) => (
                <li key={b} className="flex gap-2">
                  <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
                  <span>{i === 0 ? <Highlight>{b}</Highlight> : b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {c.aio.sources.map((s, i) => (
                <span
                  key={s}
                  className={
                    i === 0
                      ? "rounded-full bg-signal/15 px-2 py-0.5 font-mono text-[10px] text-foreground ring-1 ring-signal/30"
                      : "rounded-full border border-hairline px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                  }
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Frame>

        {/* Chat answer */}
        <Frame label={c.cols[2].label} hint={c.cols[2].hint} delay={0.16}>
          <div className="flex flex-col gap-2 text-[13px]">
            <p className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-primary px-3 py-2 leading-relaxed text-primary-foreground">
              {c.chat.q}
            </p>
            <div className="mr-auto max-w-[94%] rounded-2xl rounded-bl-md border border-hairline bg-surface/70 px-3 py-2 leading-relaxed text-muted-foreground">
              <p>{c.chat.a}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] text-signal">
                <span className="live-dot" aria-hidden />
                {c.chat.cite}
              </p>
            </div>
          </div>
        </Frame>
      </div>

      <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-5 text-center">
        <p className="text-sm leading-relaxed text-muted-foreground">{c.caveat}</p>
        {/* The panels above are a worked example. The tool runs the same three
            for a keyword the visitor types, against live data. */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <PrimaryButtonLink href={lp("/ai-visibility-check")}>
            {c.tool}
            <ArrowRight className="size-4" aria-hidden />
          </PrimaryButtonLink>
          <GhostButtonLink href={lp("/services/ai-visibility")}>
            {c.cta}
            <ArrowRight className="size-4" aria-hidden />
          </GhostButtonLink>
        </div>
      </div>
      <Eyebrow className="sr-only">{c.eyebrow}</Eyebrow>
    </Section>
  );
}
