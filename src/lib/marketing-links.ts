import { getAppPath } from "@/lib/app-links";

/**
 * Map Vite marketing paths embedded in glossary / legacy copy to Next or app URLs.
 */
export function resolveMarketingPath(path: string): string {
  if (path.startsWith("/features/")) {
    const slug = path.replace(/^\/features\//, "");
    return `/platform/features/${slug}`;
  }
  if (path.startsWith("/free-tools/") || path.startsWith("/help/")) {
    return getAppPath(path);
  }
  return path;
}
