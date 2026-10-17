import { getAppPath } from "@/lib/app-links";
import type { SiteLocale } from "@/lib/i18n/locale";

/**
 * Shared helpers for the GSC Boost marketing pages (/platform/**).
 *
 * GSC Boost is the website's name for the app at app.anotherseoguru.com (the
 * app itself still calls itself AnotherSEOGuru). Copy on these pages is
 * adapted from the app's own marketing source (src/marketing/** in
 * gsc-gemini-boost) and its Greek dictionary (src/lib/i18n/el/*.ts), so the
 * website and the product describe the same features in the same words.
 */

export type Copy = { readonly en: string; readonly el: string };

export const c = (en: string, el: string): Copy => ({ en, el });

/** Replace `{name}` placeholders, as the app's t() does. */
export function fill(text: string, vars: Readonly<Record<string, string | number>>): string {
  return text.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

export const PRODUCT = "GSC Boost";
export const PRODUCT_FULL = "GSC Boost by AnotherSEOGuru";

/**
 * A link into the app that carries the visitor's language and where on the
 * website they clicked, the same query string SoftwareCtas sends.
 */
export function appLink(
  path: string,
  locale: SiteLocale,
  source: string,
  extra: Readonly<Record<string, string>> = {},
): string {
  const qs = new URLSearchParams({ ...extra, lang: locale, utm_source: "website", utm_content: source });
  return `${getAppPath(path)}?${qs.toString()}`;
}

const TAG: Record<SiteLocale, string> = { en: "en-US", el: "el-GR" };

export function formatNumber(locale: SiteLocale, n: number, digits = 0): string {
  return new Intl.NumberFormat(TAG[locale], { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(n);
}

/** Plan prices are in US dollars, as in the app. */
export function formatUsd(locale: SiteLocale, n: number, digits = 0): string {
  return new Intl.NumberFormat(TAG[locale], {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n);
}

export function formatCredits(locale: SiteLocale, credits: number): string {
  if (credits === 0) return locale === "el" ? "Δωρεάν" : "Free";
  const n = formatNumber(locale, credits);
  if (locale === "el") return `${n} ${credits === 1 ? "μονάδα" : "μονάδες"}`;
  return `${n} ${credits === 1 ? "credit" : "credits"}`;
}
