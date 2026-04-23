/**
 * Product SPA base URL (dashboard, auth, interactive tools).
 * Set `NEXT_PUBLIC_APP_ORIGIN` in `.env.local` (e.g. https://app.anotherseoguru.com).
 */
export function getAppOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_APP_ORIGIN;
  if (typeof raw === "string" && raw.length > 0) {
    return raw.replace(/\/$/, "");
  }
  return "https://app.anotherseoguru.com";
}

export function getAppPath(path: string): string {
  const base = getAppOrigin();
  if (!path || path === "/") {
    return `${base}/`;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
