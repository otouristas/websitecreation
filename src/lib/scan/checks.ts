import { parse } from 'node-html-parser';

/** Thirteen observations of one fetched HTML response, not a ranking audit. */
export type ScanCheckId =
  | 'https' | 'status' | 'title' | 'description' | 'h1' | 'canonical'
  | 'viewport' | 'hreflang' | 'jsonld' | 'opengraph' | 'img_alt' | 'robots' | 'ttfb';
export interface LocalizedText { readonly en: string; readonly el: string }
export interface ScanCheck {
  readonly id: ScanCheckId;
  readonly label: LocalizedText;
  readonly pass: boolean;
  readonly weight: number;
  /** A reproducible value from this response, not a model-generated finding. */
  readonly detail?: string;
  readonly hint: LocalizedText;
  readonly severity?: 'issue' | 'advisory' | 'info';
}
export interface ScanContext {
  readonly https: boolean;
  readonly status: number;
  readonly ttfbMs: number;
  readonly xRobotsTag?: string | null;
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
  readonly robots?: string | null;
  readonly googlebotRobots?: string | null;
  readonly viewport?: string | null;
  readonly ogTitle?: boolean;
  readonly ogImage?: boolean;
}
function text(value: string | undefined): string | null {
  return value?.replace(/\s+/g, ' ').trim() || null;
}
export function extractMeta(rawHtml: string): ScanMeta {
  const root = parse(rawHtml, { comment: false });
  root.querySelectorAll('template, noscript, style').forEach((node) => node.remove());
  const jsonLdTypes: string[] = [];
  const collectTypes = (value: unknown, depth = 0): void => {
    if (depth > 10) return;
    if (Array.isArray(value)) { value.forEach((v) => collectTypes(v, depth + 1)); return; }
    if (!value || typeof value !== 'object') return;
    const node = value as Record<string, unknown>;
    const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
    for (const type of types) if (typeof type === 'string' && type.trim()) jsonLdTypes.push(type);
    if (node['@graph']) collectTypes(node['@graph'], depth + 1);
  };
  for (const script of root.querySelectorAll('script')) {
    if (script.getAttribute('type')?.trim().toLowerCase() === 'application/ld+json') {
      try { collectTypes(JSON.parse(script.rawText)); } catch { /* No claim of valid schema. */ }
    }
    script.remove();
  }
  let description: string | null = null;
  let viewport: string | null = null;
  let ogTitle = false;
  let ogImage = false;
  const robots: string[] = [];
  const googlebotRobots: string[] = [];
  for (const node of root.querySelectorAll('meta')) {
    const name = node.getAttribute('name')?.trim().toLowerCase();
    const property = node.getAttribute('property')?.trim().toLowerCase();
    const content = text(node.getAttribute('content'));
    if (name === 'description' && description === null) description = content;
    if (name === 'robots' && content) robots.push(content);
    if (name === 'googlebot' && content) googlebotRobots.push(content);
    if (name === 'viewport') viewport = content;
    if (property === 'og:title' && content) ogTitle = true;
    if (property === 'og:image' && content) ogImage = true;
  }
  let canonical: string | null = null;
  let hreflangCount = 0;
  for (const node of root.querySelectorAll('link')) {
    const rel = (node.getAttribute('rel') ?? '').toLowerCase().split(/\s+/);
    if (rel.includes('canonical') && canonical === null) canonical = text(node.getAttribute('href'));
    if (rel.includes('alternate') && text(node.getAttribute('hreflang')) && text(node.getAttribute('href'))) hreflangCount += 1;
  }
  const images = root.querySelectorAll('img');
  return {
    title: text(root.querySelector('title')?.text), description,
    h1Count: root.querySelectorAll('h1').length, canonical, hreflangCount,
    jsonLdTypes: Array.from(new Set(jsonLdTypes)), imageCount: images.length,
    // An explicit empty alt is valid for decoration; data-alt is not alt.
    imagesWithAlt: images.filter((image) => image.hasAttribute('alt')).length,
    lang: text(root.querySelector('html')?.getAttribute('lang')),
    robots: robots.join(', ') || null, googlebotRobots: googlebotRobots.join(', ') || null,
    viewport, ogTitle, ogImage,
  };
}
function hasNoindex(value: string | null | undefined): boolean {
  return /(?:^|[\s,;])(?:noindex|none)(?=$|[\s,;])/i.test(value ?? '');
}
/** Respect crawler scopes in combined X-Robots-Tag headers. */
export function headerBlocksGoogleIndexing(header: string | null | undefined): boolean {
  let applies = true;
  for (const part of (header ?? '').split(',')) {
    let rules = part.trim();
    const scoped = rules.match(/^([a-z][a-z0-9_-]*)\s*:\s*(.*)$/i);
    // These are directives with values, not user-agent prefixes.
    if (scoped && !/^(?:max-snippet|max-image-preview|max-video-preview|unavailable_after)$/i.test(scoped[1])) {
      applies = scoped[1].toLowerCase() === 'googlebot';
      rules = scoped[2];
    }
    if (applies && hasNoindex(rules)) return true;
  }
  return false;
}
export function runChecks(meta: ScanMeta, ctx: ScanContext): ScanCheck[] {
  const noindex = hasNoindex(meta.robots) || hasNoindex(meta.googlebotRobots) || headerBlocksGoogleIndexing(ctx.xRobotsTag);
  return [
    {
      id: 'https', weight: 8, severity: 'issue', pass: ctx.https,
      label: { en: 'Final URL uses HTTPS', el: 'Η τελική διεύθυνση χρησιμοποιεί HTTPS' },
      detail: ctx.https ? 'https:' : 'http:',
      hint: { en: 'If this public page should use HTTPS, configure a valid certificate and an HTTP redirect.', el: 'Αν αυτή η δημόσια σελίδα πρέπει να λειτουργεί μέσω HTTPS, ρυθμίστε έγκυρο πιστοποιητικό και ανακατεύθυνση από HTTP.' },
    },
    {
      id: 'status', weight: 12, severity: 'issue', pass: ctx.status >= 200 && ctx.status < 300,
      detail: `HTTP ${ctx.status}`,
      label: { en: 'Requested page returns a successful HTTP status', el: 'Η σελίδα που ζητήσατε επιστρέφει επιτυχή κωδικό HTTP' },
      hint: { en: 'Review the actual response status for this URL. A scanner response does not establish what Googlebot receives.', el: 'Ελέγξτε τον πραγματικό κωδικό απόκρισης αυτής της διεύθυνσης. Η απόκριση προς τον έλεγχο δεν αποδεικνύει τι λαμβάνει το Googlebot.' },
    },
    {
      id: 'title', weight: 10, severity: 'issue', pass: !!meta.title,
      detail: meta.title ? `${Array.from(meta.title).length}: ${meta.title.slice(0, 180)}` : '0',
      label: { en: 'Non-empty title tag in fetched HTML', el: 'Title tag με περιεχόμενο στο HTML που ελέγχθηκε' },
      hint: { en: 'Add a concise, descriptive page title. Google has no fixed character limit; this check does not judge relevance or search-result display.', el: 'Προσθέστε έναν σύντομο τίτλο που περιγράφει τη σελίδα. Η Google δεν ορίζει σταθερό όριο χαρακτήρων. Ο έλεγχος δεν αξιολογεί τη συνάφεια ή την εμφάνιση στα αποτελέσματα.' },
    },
    {
      id: 'description', weight: 4, severity: 'advisory', pass: !!meta.description,
      detail: meta.description ? `${Array.from(meta.description).length}: ${meta.description.slice(0, 200)}` : '0',
      label: { en: 'Meta description present', el: 'Υπάρχει meta description' },
      hint: { en: 'Consider a useful, page-specific description. Google can choose page content instead and has no fixed description character limit.', el: 'Εξετάστε μια χρήσιμη περιγραφή ειδικά για αυτή τη σελίδα. Η Google μπορεί να επιλέξει κείμενο από τη σελίδα και δεν ορίζει σταθερό όριο χαρακτήρων.' },
    },
    {
      id: 'h1', weight: 4, severity: 'advisory', pass: meta.h1Count > 0, detail: `H1: ${meta.h1Count}`,
      label: { en: 'H1 heading found', el: 'Βρέθηκε επικεφαλίδα H1' },
      hint: { en: 'Review whether the visible main heading clearly describes the page. Multiple H1 elements alone do not establish an SEO error.', el: 'Ελέγξτε αν η κύρια ορατή επικεφαλίδα περιγράφει καθαρά τη σελίδα. Η παρουσία πολλών H1 δεν αποδεικνύει από μόνη της σφάλμα SEO.' },
    },
    {
      id: 'canonical', weight: 2, severity: 'advisory', pass: !!meta.canonical,
      detail: meta.canonical ?? 'rel=canonical: 0',
      label: { en: 'HTML canonical declaration found', el: 'Βρέθηκε δήλωση canonical στο HTML' },
      hint: { en: 'If duplicate URLs exist, review the preferred canonical. Absence here is not proof of duplication; HTTP canonical headers and Google-selected canonicals were not checked.', el: 'Αν υπάρχουν διπλότυπες διευθύνσεις, ελέγξτε ποια canonical προτιμάτε. Η απουσία εδώ δεν αποδεικνύει διπλότυπο. Δεν ελέγχθηκαν οι HTTP canonical headers ή η επιλογή της Google.' },
    },
    {
      id: 'viewport', weight: 6, severity: 'issue', pass: !!meta.viewport,
      detail: meta.viewport ?? 'viewport: 0',
      label: { en: 'Mobile viewport declaration found', el: 'Βρέθηκε δήλωση viewport για κινητά' },
      hint: { en: 'Consider width=device-width, initial-scale=1, then test the actual mobile layout. Presence alone does not verify mobile usability.', el: 'Εξετάστε τη ρύθμιση width=device-width, initial-scale=1 και δοκιμάστε την εμφάνιση σε κινητό. Η παρουσία της ετικέτας δεν αρκεί για να επιβεβαιώσει την ευχρηστία.' },
    },
    {
      // This page alone cannot establish whether other language variants exist.
      id: 'hreflang', weight: 0, severity: 'info', pass: true,
      detail: `HTML hreflang: ${meta.hreflangCount}`,
      label: { en: 'hreflang observation (optional)', el: 'Καταγραφή hreflang (προαιρετικό)' },
      hint: { en: 'Only relevant for equivalent language or regional versions. None in this HTML is not an error; sitemap/header annotations and reciprocity were not checked.', el: 'Αφορά αντίστοιχες γλωσσικές ή τοπικές εκδόσεις. Η απουσία στο HTML δεν αποτελεί σφάλμα. Δεν ελέγχθηκαν δηλώσεις σε sitemap ή headers ούτε η αμφίδρομη σύνδεση.' },
    },
    {
      id: 'jsonld', weight: 1, severity: 'advisory', pass: meta.jsonLdTypes.length > 0,
      detail: meta.jsonLdTypes.length ? meta.jsonLdTypes.slice(0, 6).join(', ') : 'JSON-LD @type: 0',
      label: { en: 'JSON-LD types found (optional)', el: 'Βρέθηκαν τύποι JSON-LD (προαιρετικό)' },
      hint: { en: 'Add structured data only where a supported type fits the visible content. Presence does not verify schema validity or guarantee rich results; other markup formats were not checked.', el: 'Προσθέστε structured data όταν ένας υποστηριζόμενος τύπος ταιριάζει στο ορατό περιεχόμενο. Η παρουσία δεν επιβεβαιώνει εγκυρότητα schema ούτε εγγυάται rich results. Δεν ελέγχθηκαν άλλες μορφές σήμανσης.' },
    },
    {
      id: 'opengraph', weight: 1, severity: 'advisory', pass: !!meta.ogTitle && !!meta.ogImage,
      detail: `og:title=${Number(!!meta.ogTitle)}; og:image=${Number(!!meta.ogImage)}`,
      label: { en: 'Open Graph title and image found', el: 'Βρέθηκαν τίτλος και εικόνα Open Graph' },
      hint: { en: 'Consider an Open Graph title and image for social sharing. Their absence does not establish a Google ranking problem; the image was not fetched.', el: 'Εξετάστε τίτλο και εικόνα Open Graph για κοινοποιήσεις. Η απουσία τους δεν αποδεικνύει πρόβλημα κατάταξης στη Google. Η εικόνα δεν ελέγχθηκε.' },
    },
    {
      id: 'img_alt', weight: 6, severity: 'issue', pass: meta.imagesWithAlt === meta.imageCount,
      detail: `alt: ${meta.imagesWithAlt}/${meta.imageCount}`,
      label: { en: 'Fetched image tags declare alt attributes', el: 'Οι εικόνες στο HTML δηλώνουν alt' },
      hint: { en: 'Describe meaningful images in alt; use alt="" for decorative ones. This checks attribute presence, not description quality or images added by JavaScript.', el: 'Περιγράψτε τις ουσιαστικές εικόνες στο alt και χρησιμοποιήστε alt="" για διακοσμητικές. Ελέγχεται η παρουσία του alt, όχι η ποιότητά του ή εικόνες που προσθέτει η JavaScript.' },
    },
    {
      id: 'robots', weight: 20, severity: 'issue', pass: !noindex,
      detail: `robots=${meta.robots ?? '∅'}; googlebot=${meta.googlebotRobots ?? '∅'}; X-Robots-Tag=${ctx.xRobotsTag ?? '∅'}`,
      label: { en: 'No Google noindex directive found in this response', el: 'Δεν βρέθηκε οδηγία noindex για τη Google στην απόκριση' },
      hint: { en: 'If this page should appear in Google, review noindex/none in robots or googlebot meta tags and X-Robots-Tag. Intentional exclusions can be correct. This is not proof of indexing; robots.txt was not checked.', el: 'Αν αυτή η σελίδα πρέπει να εμφανίζεται στη Google, ελέγξτε τα noindex/none στις meta ετικέτες robots ή googlebot και στο X-Robots-Tag. Ένας σκόπιμος αποκλεισμός μπορεί να είναι σωστός. Δεν επιβεβαιώνεται το indexing και δεν ελέγχθηκε το robots.txt.' },
    },
    {
      id: 'ttfb', weight: 1, severity: 'advisory', pass: ctx.ttfbMs < 800,
      detail: `${Math.round(ctx.ttfbMs)} ms`,
      label: { en: 'Response headers received within 800 ms (single request)', el: 'Λήψη headers σε λιγότερο από 800 ms (μία μέτρηση)' },
      hint: { en: 'Repeat performance measurements from relevant regions before changing hosting or caching. This single server request is not a Core Web Vitals or page-load test.', el: 'Επαναλάβετε μετρήσεις από σχετικές περιοχές πριν αλλάξετε hosting ή cache. Αυτή η μία απόκριση προς τον διακομιστή δεν είναι έλεγχος Core Web Vitals ή χρόνου φόρτωσης.' },
    },
  ];
}
