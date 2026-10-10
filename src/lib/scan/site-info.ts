/**
 * Business details read from a homepage: the name, title, description, logo,
 * icon, phone and email a visitor would otherwise type into our forms.
 *
 * Pure and dependency-free so it can be checked against an HTML string; the
 * network side (SSRF gate, redirects, byte cap) lives in fetch-page.ts.
 * Sources, best first:
 *   name         og:site_name, JSON-LD Organization/LocalBusiness/Hotel name, WebSite name, <title> segment
 *   title        <title>, og:title
 *   description  meta description, og:description, JSON-LD description
 *   logo         JSON-LD logo, an <img> marked as a logo, og:image (last resort)
 *   icon         apple-touch-icon, rel=icon
 *   phone/email  JSON-LD telephone/email, first tel: / mailto: link
 */

export interface SiteInfo {
  url: string;
  siteName: string | null;
  title: string | null;
  description: string | null;
  logo: string | null;
  icon: string | null;
  phone: string | null;
  email: string | null;
  language: string | null;
}

const NAMED: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  ndash: '–',
  mdash: '—',
  middot: '·',
  bull: '•',
  laquo: '«',
  raquo: '»',
  lsquo: '‘',
  rsquo: '’',
  ldquo: '“',
  rdquo: '”',
  hellip: '…',
  copy: '©',
  reg: '®',
  trade: '™',
  euro: '€',
};

export function decodeHtml(s: string): string {
  return s
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, ent: string) => {
      if (ent[0] === '#') {
        const code = ent[1] === 'x' || ent[1] === 'X' ? parseInt(ent.slice(2), 16) : parseInt(ent.slice(1), 10);
        if (!Number.isFinite(code) || code <= 0 || code > 0x10ffff) return whole;
        try {
          return String.fromCodePoint(code);
        } catch {
          return whole;
        }
      }
      return NAMED[ent.toLowerCase()] ?? whole;
    })
    .replace(/\s+/g, ' ')
    .trim();
}

function clean(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const v = decodeHtml(value.replace(/<[^>]*>/g, ' '));
  if (!v) return null;
  return v.length > max ? `${v.slice(0, max - 1).trimEnd()}…` : v;
}

/** Attribute map of one start tag; values are entity-decoded. */
function attrs(tag: string): Record<string, string> {
  const out: Record<string, string> = {};
  const body = tag.replace(/^<\s*[a-z0-9]+/i, '');
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) {
    const name = m[1].toLowerCase();
    if (!(name in out)) out[name] = decodeHtml(m[2] ?? m[3] ?? m[4] ?? '');
  }
  return out;
}

function absolute(href: string | undefined | null, base: URL): string | null {
  if (!href) return null;
  const raw = href.trim();
  if (!raw || /^(data|javascript|blob):/i.test(raw)) return null;
  try {
    const u = new URL(raw, base);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    const s = u.toString();
    return s.length > 600 ? null : s;
  } catch {
    return null;
  }
}

const ORG_TYPES = new Set([
  'organization',
  'corporation',
  'localbusiness',
  'hotel',
  'lodgingbusiness',
  'resort',
  'bedandbreakfast',
  'hostel',
  'motel',
  'vacationrental',
  'restaurant',
  'foodestablishment',
  'store',
  'onlinestore',
  'professionalservice',
  'travelagency',
  'medicalbusiness',
  'dentist',
  'legalservice',
  'autorental',
  'automotivebusiness',
  'homeandconstructionbusiness',
  'healthandbeautybusiness',
  'sportsactivitylocation',
  'touristattraction',
  'educationalorganization',
  'ngo',
]);

type LdNode = Record<string, unknown>;

function collectNodes(value: unknown, out: LdNode[], depth = 0): void {
  if (depth > 6 || out.length > 200) return;
  if (Array.isArray(value)) {
    for (const v of value) collectNodes(v, out, depth + 1);
    return;
  }
  if (value && typeof value === 'object') {
    const node = value as LdNode;
    out.push(node);
    if (node['@graph']) collectNodes(node['@graph'], out, depth + 1);
  }
}

function types(node: LdNode): string[] {
  const t = node['@type'];
  const list = Array.isArray(t) ? t : [t];
  return list.filter((x): x is string => typeof x === 'string').map((x) => x.toLowerCase().replace(/^.*[/#:]/, ''));
}

function ldString(value: unknown): string | null {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return ldString(value[0]);
  return null;
}

function ldImage(value: unknown): string | null {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return ldImage(value[0]);
  if (value && typeof value === 'object') {
    const v = value as LdNode;
    return ldString(v.url) ?? ldString(v.contentUrl) ?? ldString(v['@id']);
  }
  return null;
}

const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[a-z]{2,}$/i;

function cleanEmail(value: string | null | undefined): string | null {
  if (!value) return null;
  let v = value.trim().replace(/^mailto:/i, '');
  v = v.split('?')[0];
  try {
    v = decodeURIComponent(v);
  } catch {
    /* keep as is */
  }
  v = v.trim().toLowerCase();
  return EMAIL_RE.test(v) && v.length <= 160 ? v : null;
}

function cleanPhone(value: string | null | undefined): string | null {
  if (!value) return null;
  let v = value.trim().replace(/^tel:/i, '');
  try {
    v = decodeURIComponent(v);
  } catch {
    /* keep as is */
  }
  v = v.replace(/\s+/g, ' ').trim();
  const digits = v.replace(/\D/g, '');
  if (digits.length < 6 || digits.length > 18) return null;
  if (!/^[+\d\s().\-/]+$/.test(v)) return null;
  return v.slice(0, 40);
}

const GENERIC_TITLE = /^(home|homepage|home page|welcome|index|start|αρχική|αρχικη|αρχική σελίδα|καλώς ήρθατε)$/i;

/** "Hotel Aria | Boutique stay in Oia" -> "Hotel Aria" when no better name exists. */
function nameFromTitle(title: string | null): string | null {
  if (!title) return null;
  const parts = title
    .split(/\s+[|–—·:•-]\s+/)
    .map((p) => p.trim())
    .filter((p) => p && !GENERIC_TITLE.test(p));
  if (parts.length === 0) return null;
  // Brand usually sits at one end; pick the shorter end segment.
  const candidate = parts.length === 1 ? parts[0] : [parts[0], parts[parts.length - 1]].sort((a, b) => a.length - b.length)[0];
  return candidate.length <= 60 ? candidate : null;
}

function stripNoise(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (s) => (/application\/ld\+json/i.test(s) ? s : ''))
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, '')
    .replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, '');
}

export function parseSiteInfo(rawHtml: string, pageUrl: string | URL): SiteInfo {
  const base = typeof pageUrl === 'string' ? new URL(pageUrl) : pageUrl;
  const html = stripNoise(rawHtml);

  // <base href> changes how relative assets resolve.
  let assetBase = base;
  const baseTag = html.match(/<base\b[^>]*>/i);
  if (baseTag) {
    const href = absolute(attrs(baseTag[0]).href, base);
    if (href) assetBase = new URL(href);
  }

  const htmlTag = html.match(/<html\b[^>]*>/i);
  const language = htmlTag ? clean(attrs(htmlTag[0]).lang, 20) : null;

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  let title = titleMatch ? clean(titleMatch[1], 200) : null;

  const meta: Record<string, string> = {};
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const a = attrs(tag);
    const key = (a.property || a.name || a.itemprop || '').toLowerCase();
    if (key && a.content !== undefined && !(key in meta)) meta[key] = a.content;
  }

  // JSON-LD
  const nodes: LdNode[] = [];
  for (const block of html.match(/<script\b[^>]*application\/ld\+json[^>]*>[\s\S]*?<\/script>/gi) ?? []) {
    const inner = block.replace(/^<script\b[^>]*>/i, '').replace(/<\/script>$/i, '').trim();
    try {
      collectNodes(JSON.parse(inner), nodes);
    } catch {
      /* malformed block: skip */
    }
  }
  const org = nodes.find((n) => types(n).some((t) => ORG_TYPES.has(t)));
  const website = nodes.find((n) => types(n).includes('website'));

  const siteName =
    clean(meta['og:site_name'], 120) ??
    clean(ldString(org?.name), 120) ??
    clean(ldString(website?.name), 120) ??
    clean(meta['application-name'], 120) ??
    nameFromTitle(title);

  title = title ?? clean(meta['og:title'], 200);

  const description =
    clean(meta['description'], 400) ?? clean(meta['og:description'], 400) ?? clean(ldString(org?.description), 400);

  // Icons from <link>
  let appleIcon: string | null = null;
  let favicon: string | null = null;
  let faviconSize = -1;
  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    const a = attrs(tag);
    const rel = (a.rel ?? '').toLowerCase().split(/\s+/);
    if (rel.includes('apple-touch-icon') || rel.includes('apple-touch-icon-precomposed')) {
      appleIcon = appleIcon ?? absolute(a.href, assetBase);
    } else if (rel.includes('icon')) {
      const href = absolute(a.href, assetBase);
      const size = parseInt((a.sizes ?? '').split(/[x\s]/i)[0] ?? '', 10) || 0;
      if (href && size > faviconSize) {
        favicon = href;
        faviconSize = size;
      }
    }
  }
  const icon = appleIcon ?? favicon;

  // An <img> that says it is the logo.
  let imgLogo: string | null = null;
  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    const a = attrs(tag);
    const hay = `${a.class ?? ''} ${a.id ?? ''} ${a.alt ?? ''} ${a.src ?? ''}`.toLowerCase();
    if (!hay.includes('logo')) continue;
    const src = a.src && !/^data:/i.test(a.src) ? a.src : a['data-src'] || a['data-lazy-src'] || (a.srcset ?? '').split(',')[0]?.trim().split(/\s+/)[0];
    imgLogo = absolute(src, assetBase);
    if (imgLogo) break;
  }

  const logo =
    absolute(ldImage(org?.logo), assetBase) ??
    imgLogo ??
    absolute(meta['og:image'] ?? meta['og:image:url'] ?? meta['og:image:secure_url'], assetBase);

  // Contact details.
  let phone = cleanPhone(ldString(org?.telephone));
  let email = cleanEmail(ldString(org?.email));
  if (!phone || !email) {
    for (const tag of html.match(/<a\b[^>]*>/gi) ?? []) {
      const href = attrs(tag).href ?? '';
      if (!phone && /^tel:/i.test(href)) phone = cleanPhone(href);
      else if (!email && /^mailto:/i.test(href)) email = cleanEmail(href);
      if (phone && email) break;
    }
  }

  return {
    url: base.toString(),
    siteName,
    title,
    description,
    logo,
    icon,
    phone,
    email,
    language,
  };
}
