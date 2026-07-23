import { getAppPath } from "@/lib/app-links";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";

/**
 * Map Vite marketing paths embedded in glossary / legacy copy to Next or app URLs.
 * Internal site paths are locale-prefixed so they do not trigger middleware 307 hops.
 */
export function resolveMarketingPath(path: string, locale: SiteLocale = "en"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  if (path.startsWith("/features/")) {
    const slug = path.replace(/^\/features\//, "");
    return localizedPath(locale, `/platform/features/${slug}`);
  }
  if (path.startsWith("/free-tools/") || path.startsWith("/help/")) {
    return getAppPath(path);
  }
  if (!path.startsWith("/")) {
    return path;
  }
  const firstSeg = path.split(/[/?#]/)[1] ?? "";
  if (firstSeg === "en" || firstSeg === "el") {
    return path;
  }
  return localizedPath(locale, path);
}
