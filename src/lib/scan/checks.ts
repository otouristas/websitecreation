/**
 * The ten-ish checks the instant scan runs against a homepage.
 *
 * Pure functions over the HTML string and the response facts, so they can be
 * exercised without a network. Each check carries a weight; the score is the
 * sum of the weights that passed (see score.ts). Labels and hints ship in both
 * locales because the widget renders them straight from the API response.
 */

export type ScanCheckId =
  | 'https'
  | 'status'
  | 'title'
  | 'description'
  | 'h1'
  | 'canonical'
  | 'viewport'
  | 'hreflang'
  | 'jsonld'
  | 'opengraph'
  | 'img_alt'
  | 'robots'
  | 'ttfb';

export interface LocalizedText {
  readonly en: string;
  readonly el: string;
}

export interface ScanCheck {
  readonly id: ScanCheckId;
  readonly label: LocalizedText;
  readonly pass: boolean;
  readonly weight: number;
  /** Short factual detail, same in both locales (values, counts). */
  readonly detail?: string;
  /** What to do when it fails. */
  readonly hint: LocalizedText;
}

export interface ScanContext {
  readonly https: boolean;
  readonly status: number;
  readonly ttfbMs: number;
}

export interface ScanMeta {
  readonly title: string | null;
  readonly description: string | null;
  readonly h1Count: number;
  readonly canonical: string | null;
  readonly hreflangCount: number;
  readonly jsonLdTypes: readonly string[];
  readonly imageCount: number;
  readonly imagesWithAlt: number;
  readonly lang: string | null;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Attribute map for a single start tag's attribute string. */
function attrs(tag: string): Record<string, string> {
  const out: Record<string, string> = {};
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(tag))) {
    const name = m[1].toLowerCase();
    if (name === 'meta' || name === 'link' || name === 'img') continue;
    out[name] = decodeEntities(m[2] ?? m[3] ?? m[4] ?? '');
  }
  return out;
}

function stripNoise(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (s) =>
      /application\/ld\+json/i.test(s) ? s : '',
    )
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, '')
    .replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, '');
}

export function extractMeta(rawHtml: string): ScanMeta {
  const html = stripNoise(rawHtml);

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? decodeEntities(titleMatch[1]) : null;

  let description: string | null = null;
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];
  let robots: string | null = null;
  let viewport: string | null = null;
  let ogTitle = false;
  let ogImage = false;
  for (const tag of metaTags) {
    const a = attrs(tag);
    const name = (a.name ?? '').toLowerCase();
    const prop = (a.property ?? '').toLowerCase();
    if (name === 'description' && description === null) description = a.content ?? '';
    if (name === 'robots') robots = a.content ?? '';
    if (name === 'viewport') viewport = a.content ?? '';
    if (prop === 'og:title') ogTitle = true;
    if (prop === 'og:image') ogImage = true;
  }

  const linkTags = html.match(/<link\b[^>]*>/gi) ?? [];
  let canonical: string | null = null;
  let hreflangCount = 0;
  for (const tag of linkTags) {
    const a = attrs(tag);
    const rel = (a.rel ?? '').toLowerCase().split(/\s+/);
    if (rel.includes('canonical') && canonical === null) canonical = a.href ?? '';
    if (rel.includes('alternate') && a.hreflang) hreflangCount += 1;
  }

  const h1Count = (html.match(/<h1\b/gi) ?? []).length;

  const jsonLdTypes: string[] = [];
  const ldBlocks = html.match(/<script\b[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi) ?? [];
  for (const block of ldBlocks) {
    const inner = block.replace(/^<script\b[^>]*>/i, '').replace(/<\/script>$/i, '');
    try {
      const parsed: unknown = JSON.parse(inner);
      const nodes: unknown[] = Array.isArray(parsed)
        ? parsed
        : parsed && typeof parsed === 'object' && '@graph' in (parsed as Record<string, unknown>)
          ? ((parsed as Record<string, unknown>)['@graph'] as unknown[])
          : [parsed];
      for (const node of nodes) {
        if (node && typeof node === 'object') {
          const t = (node as Record<string, unknown>)['@type'];
          if (typeof t === 'string') jsonLdTypes.push(t);
          else if (Array.isArray(t)) for (const x of t) if (typeof x === 'string') jsonLdTypes.push(x);
        }
      }
    } catch {
      // Malformed JSON-LD counts as absent.
    }
  }

  const imgTags = html.match(/<img\b[^>]*>/gi) ?? [];
  let imagesWithAlt = 0;
  for (const tag of imgTags) {
    if (/\balt\s*=/i.test(tag)) imagesWithAlt += 1;
  }

  const langMatch = html.match(/<html\b[^>]*\blang\s*=\s*["']?([a-zA-Z-]+)/i);

  return {
    title,
    description,
    h1Count,
    canonical,
    hreflangCount,
    jsonLdTypes: Array.from(new Set(jsonLdTypes)),
    imageCount: imgTags.length,
    imagesWithAlt,
    lang: langMatch ? langMatch[1] : null,
    // These two are consumed by runChecks through a closure below; expose via
    // the returned object for the API response as well.
    ...({ robots, viewport, ogTitle, ogImage } as object),
  } as ScanMeta;
}

interface MetaExtras {
  robots?: string | null;
  viewport?: string | null;
  ogTitle?: boolean;
  ogImage?: boolean;
}

export function runChecks(meta: ScanMeta, ctx: ScanContext): ScanCheck[] {
  const extras = meta as ScanMeta & MetaExtras;
  const titleLen = meta.title?.length ?? 0;
  const descLen = meta.description?.length ?? 0;
  const altRatio = meta.imageCount === 0 ? 1 : meta.imagesWithAlt / meta.imageCount;
  const noindex = /noindex/i.test(extras.robots ?? '');

  const checks: ScanCheck[] = [
    {
      id: 'https',
      weight: 8,
      pass: ctx.https,
      label: { en: 'Served over HTTPS', el: 'Σερβίρεται μέσω HTTPS' },
      hint: {
        en: 'Install a certificate and redirect every http:// URL to https://.',
        el: 'Εγκαταστήστε πιστοποιητικό και ανακατευθύνετε κάθε http:// διεύθυνση σε https://.',
      },
    },
    {
      id: 'status',
      weight: 8,
      pass: ctx.status >= 200 && ctx.status < 300,
      detail: `HTTP ${ctx.status}`,
      label: { en: 'Homepage responds 200', el: 'Η αρχική απαντά με 200' },
      hint: {
        en: 'The homepage must return 200 without redirect chains or errors.',
        el: 'Η αρχική πρέπει να επιστρέφει 200 χωρίς αλυσίδες ανακατευθύνσεων ή σφάλματα.',
      },
    },
    {
      id: 'title',
      weight: 10,
      pass: titleLen >= 10 && titleLen <= 65,
      detail: meta.title ? `${titleLen} chars` : 'missing',
      label: { en: 'Title tag, 10-65 characters', el: 'Ετικέτα τίτλου, 10-65 χαρακτήρες' },
      hint: {
        en: 'Write one title per page that names the service and the place, under 65 characters.',
        el: 'Γράψτε έναν τίτλο ανά σελίδα που ονομάζει υπηρεσία και τοποθεσία, κάτω από 65 χαρακτήρες.',
      },
    },
    {
      id: 'description',
      weight: 10,
      pass: descLen >= 70 && descLen <= 165,
      detail: meta.description ? `${descLen} chars` : 'missing',
      label: { en: 'Meta description, 70-165 characters', el: 'Meta περιγραφή, 70-165 χαρακτήρες' },
      hint: {
        en: 'Add a description that answers the query in one sentence and ends with a reason to click.',
        el: 'Προσθέστε περιγραφή που απαντά στο ερώτημα σε μία πρόταση και κλείνει με λόγο για κλικ.',
      },
    },
    {
      id: 'h1',
      weight: 10,
      pass: meta.h1Count === 1,
      detail: `${meta.h1Count} found`,
      label: { en: 'Exactly one H1', el: 'Ακριβώς ένα H1' },
      hint: {
        en: 'Use a single H1 that carries the primary keyword; demote the rest to H2.',
        el: 'Χρησιμοποιήστε ένα μόνο H1 με τη βασική λέξη-κλειδί και κάντε τα υπόλοιπα H2.',
      },
    },
    {
      id: 'canonical',
      weight: 8,
      pass: !!meta.canonical,
      label: { en: 'Canonical URL declared', el: 'Δηλωμένη canonical διεύθυνση' },
      hint: {
        en: 'Declare a self-referencing canonical so duplicates (www, trailing slash, parameters) consolidate.',
        el: 'Δηλώστε canonical προς την ίδια σελίδα ώστε τα διπλότυπα (www, κάθετος, παράμετροι) να ενοποιηθούν.',
      },
    },
    {
      id: 'viewport',
      weight: 6,
      pass: !!extras.viewport,
      label: { en: 'Mobile viewport set', el: 'Ρυθμισμένο viewport για κινητά' },
      hint: {
        en: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">.',
        el: 'Προσθέστε <meta name="viewport" content="width=device-width, initial-scale=1">.',
      },
    },
    {
      id: 'hreflang',
      weight: 4,
      pass: meta.hreflangCount > 0,
      detail: `${meta.hreflangCount} alternates`,
      label: { en: 'hreflang alternates', el: 'Εναλλακτικές hreflang' },
      hint: {
        en: 'If you serve Greek and English, link each language version with reciprocal hreflang tags.',
        el: 'Αν έχετε ελληνικά και αγγλικά, συνδέστε κάθε έκδοση με αμφίδρομες ετικέτες hreflang.',
      },
    },
    {
      id: 'jsonld',
      weight: 10,
      pass: meta.jsonLdTypes.length > 0,
      detail: meta.jsonLdTypes.length ? meta.jsonLdTypes.slice(0, 4).join(', ') : 'none',
      label: { en: 'Structured data (JSON-LD)', el: 'Δομημένα δεδομένα (JSON-LD)' },
      hint: {
        en: 'Add Organization or LocalBusiness schema, plus the type that matches the page (Hotel, AutoRental, TouristTrip).',
        el: 'Προσθέστε schema Organization ή LocalBusiness και τον τύπο που ταιριάζει στη σελίδα (Hotel, AutoRental, TouristTrip).',
      },
    },
    {
      id: 'opengraph',
      weight: 6,
      pass: !!extras.ogTitle && !!extras.ogImage,
      label: { en: 'Open Graph title and image', el: 'Open Graph τίτλος και εικόνα' },
      hint: {
        en: 'Set og:title and a 1200x630 og:image so shares and AI previews carry your brand.',
        el: 'Ορίστε og:title και og:image 1200x630 ώστε οι κοινοποιήσεις και οι προεπισκοπήσεις AI να δείχνουν το brand σας.',
      },
    },
    {
      id: 'img_alt',
      weight: 6,
      pass: altRatio >= 0.8,
      detail: meta.imageCount ? `${meta.imagesWithAlt}/${meta.imageCount} with alt` : 'no images',
      label: { en: 'Images carry alt text', el: 'Οι εικόνες έχουν εναλλακτικό κείμενο' },
      hint: {
        en: 'Describe each meaningful image in its alt attribute; leave decorative ones alt="".',
        el: 'Περιγράψτε κάθε ουσιαστική εικόνα στο alt και αφήστε τις διακοσμητικές με alt="".',
      },
    },
    {
      id: 'robots',
      weight: 6,
      pass: !noindex,
      detail: extras.robots ?? 'default',
      label: { en: 'Indexable (no noindex)', el: 'Ευρετηριάσιμη (χωρίς noindex)' },
      hint: {
        en: 'Remove the noindex directive from the homepage robots meta tag.',
        el: 'Αφαιρέστε την οδηγία noindex από τη meta ετικέτα robots της αρχικής.',
      },
    },
    {
      id: 'ttfb',
      weight: 8,
      pass: ctx.ttfbMs < 800,
      detail: `${Math.round(ctx.ttfbMs)} ms`,
      label: { en: 'Server responds under 800 ms', el: 'Ο διακομιστής απαντά κάτω από 800 ms' },
      hint: {
        en: 'Cache the homepage at the edge or on the server; slow first bytes hold back every other metric.',
        el: 'Βάλτε την αρχική σε cache στο edge ή στον διακομιστή. Το αργό πρώτο byte καθυστερεί κάθε άλλη μετρική.',
      },
    },
  ];

  return checks;
}
