"use client";

import { useCallback, useState } from "react";
import { Loader2, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/cn";
import type { SiteLocale } from "@/lib/i18n/locale";
import type { SiteInfo } from "@/lib/scan/site-info";

/**
 * "Fetch my details": reads the visitor's homepage through /api/site-info and
 * hands back the name, description, logo, phone and email it finds, so the
 * form can fill its empty fields and the lead arrives with the site's own
 * details attached. Shared by the free audit form and the website brief.
 */

const COPY = {
  en: {
    fetch: "Fetch my details",
    fetching: "Fetching...",
    failed: "We couldn't read that site. Please fill in your details yourself.",
    needUrl: "Enter your website first, like your-business.com.",
    found: "Found on your site",
    filled: "We filled the empty fields for you. Check and edit anything.",
    dismiss: "Dismiss",
    logoAlt: (name: string) => `${name} logo`,
  },
  el: {
    fetch: "Φέρε τα στοιχεία μου",
    fetching: "Φέρνουμε τα στοιχεία...",
    failed: "Δεν μπορέσαμε να διαβάσουμε την ιστοσελίδα. Συμπληρώστε τα στοιχεία σας χειροκίνητα.",
    needUrl: "Γράψτε πρώτα την ιστοσελίδα σας, π.χ. h-epixeirisi-sas.gr.",
    found: "Βρήκαμε στην ιστοσελίδα σας",
    filled: "Συμπληρώσαμε τα κενά πεδία. Ελέγξτε τα και αλλάξτε ό,τι χρειάζεται.",
    dismiss: "Κλείσιμο",
    logoAlt: (name: string) => `Λογότυπο ${name}`,
  },
} as const;

export type { SiteInfo };

type FetchState = "idle" | "loading" | "failed" | "need-url";

/** Looks like a domain: something.tld, with or without the scheme. */
export function looksLikeUrl(value: string): boolean {
  return /^[^\s]+\.[a-z]{2,}/i.test(value.trim().replace(/^https?:\/\//i, ""));
}

export function useSiteDetails() {
  const [info, setInfo] = useState<SiteInfo | null>(null);
  const [state, setState] = useState<FetchState>("idle");

  const fetchFor = useCallback(async (url: string): Promise<SiteInfo | null> => {
    if (!looksLikeUrl(url)) {
      setState("need-url");
      return null;
    }
    setState("loading");
    try {
      const res = await fetch("/api/site-info", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const json = (await res.json().catch(() => null)) as SiteInfo | { error: string } | null;
      if (!res.ok || !json || "error" in json) {
        setState("failed");
        return null;
      }
      const useful = json.siteName || json.title || json.description || json.logo || json.phone || json.email;
      if (!useful) {
        setState("failed");
        return null;
      }
      setInfo(json);
      setState("idle");
      return json;
    } catch {
      setState("failed");
      return null;
    }
  }, []);

  const dismiss = useCallback(() => setInfo(null), []);

  return { info, state, fetchFor, dismiss };
}

export function FetchDetailsButton({
  locale,
  state,
  onClick,
  className,
}: {
  locale: SiteLocale;
  state: FetchState;
  onClick: () => void;
  className?: string;
}) {
  const t = COPY[locale];
  const loading = state === "loading";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      aria-busy={loading}
      className={cn(
        "inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl border border-brand/40 bg-brand/10 px-4 font-display text-sm font-semibold text-foreground transition-colors hover:border-brand/70 hover:bg-brand/15 disabled:opacity-80",
        className,
      )}
    >
      {loading ? <Loader2 className="size-4 shrink-0 animate-spin text-brand" aria-hidden /> : <Sparkles className="size-4 shrink-0 text-brand" aria-hidden />}
      {loading ? t.fetching : t.fetch}
    </button>
  );
}

/** Error line under the website field when the fetch could not run or read anything. */
export function FetchDetailsNote({ locale, state }: { locale: SiteLocale; state: FetchState }) {
  const t = COPY[locale];
  if (state !== "failed" && state !== "need-url") return null;
  return (
    <p className="text-[13px] text-muted-foreground" role="status">
      {state === "failed" ? t.failed : t.needUrl}
    </p>
  );
}

export function SiteDetailsCard({ locale, info, onDismiss, className }: { locale: SiteLocale; info: SiteInfo; onDismiss: () => void; className?: string }) {
  const t = COPY[locale];
  const [logoFailed, setLogoFailed] = useState(false);
  const host = info.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const name = info.siteName ?? host;
  const image = !logoFailed ? (info.logo ?? info.icon) : null;
  return (
    <div className={cn("relative flex min-w-0 gap-4 rounded-2xl border border-brand/30 bg-background/50 p-4 pr-11 text-left", className)} role="status">
      <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-hairline bg-white p-1.5">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element -- third-party logo of unknown size and host
          <img src={image} alt={t.logoAlt(name)} className="max-h-full max-w-full object-contain" loading="lazy" referrerPolicy="no-referrer" onError={() => setLogoFailed(true)} />
        ) : (
          <span className="font-display text-lg font-semibold text-neutral-700">{name.slice(0, 1).toUpperCase()}</span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand">{t.found}</p>
        <p className="mt-0.5 truncate font-display text-base font-semibold tracking-[-0.02em] text-foreground">{name}</p>
        {info.title && info.title !== name && <p className="mt-0.5 line-clamp-1 break-words text-[13px] text-foreground/80">{info.title}</p>}
        {info.description && <p className="mt-1 line-clamp-2 break-words text-[13px] leading-relaxed text-muted-foreground">{info.description}</p>}
        <p className="mt-2 text-[12px] text-muted-foreground">{t.filled}</p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label={t.dismiss}
        className="absolute right-2 top-2 grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
      >
        <X className="size-4" aria-hidden />
      </button>
    </div>
  );
}

/** The block appended to the lead's message so the team sees what the site says about itself. */
export function siteDetailsMessage(info: SiteInfo | null): string {
  if (!info) return "";
  const lines = [
    info.siteName && `Name: ${info.siteName}`,
    info.title && `Title: ${info.title}`,
    info.description && `Description: ${info.description}`,
    info.logo && `Logo: ${info.logo}`,
    info.phone && `Phone on site: ${info.phone}`,
    info.email && `Email on site: ${info.email}`,
    info.language && `Language: ${info.language}`,
  ].filter(Boolean);
  return lines.length ? `Website details:\n${lines.join("\n")}` : "";
}

/** Flat copy of the same details for the Formspree backup email. */
export function siteDetailsFields(info: SiteInfo | null): Record<string, string> {
  if (!info) return {};
  const out: Record<string, string> = {};
  if (info.siteName) out.site_name = info.siteName;
  if (info.title) out.site_title = info.title;
  if (info.description) out.site_description = info.description;
  if (info.logo) out.site_logo = info.logo;
  return out;
}
