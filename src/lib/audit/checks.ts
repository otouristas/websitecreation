import type { Signals } from './signals';
import { AI_AGENTS, SEARCH_AGENTS, type AgentVerdict, type RobotsFile } from './robots';
import type { AuditCheck, CheckState, Localized, Pillar, PillarScore } from './types';
import { PILLARS } from './types';

/**
 * The verdicts.
 *
 * Thresholds are the ones we would defend to a client on a call, not the ones
 * that make a score look generous: 800 ms TTFB because that is where Google's
 * own guidance sits, 65 characters of title because that is roughly where
 * desktop SERP truncation starts, 80% alt coverage because a handful of
 * decorative images legitimately carry `alt=""`.
 *
 * Three states rather than two. A binary pass/fail on a 63-character title is
 * a lie in both directions, and `warn` earning half its weight is what keeps
 * the number honest without flattening real problems into "needs attention".
 */

export interface CheckInput {
  readonly signals: Signals;
  readonly https: boolean;
  readonly status: number;
  readonly ttfbMs: number;
  readonly downloadMs: number;
  readonly htmlBytes: number;
  readonly redirectHops: number;
  readonly compression: string | null;
  readonly hsts: boolean;
  readonly xRobotsTag: string | null;
  readonly robots: RobotsFile;
  readonly sitemapUrls: number | null;
  readonly llmsTxt: boolean;
  readonly notFoundStatus: number | null;
  readonly aiAccess: readonly AgentVerdict[];
  readonly searchAccess: readonly AgentVerdict[];
}

interface Spec {
  readonly id: string;
  readonly pillar: Pillar;
  readonly weight: number;
  readonly state: CheckState;
  readonly label: Localized;
  readonly value?: string;
  readonly fix: Localized;
}

/** `pass` when true, `fail` when false, `warn` when the middle case holds. */
function grade(ok: boolean, nearly = false): CheckState {
  return ok ? 'pass' : nearly ? 'warn' : 'fail';
}

function kb(bytes: number): string {
  return `${Math.round(bytes / 1024)} KB`;
}

export function buildChecks(input: CheckInput): AuditCheck[] {
  const s = input.signals;
  const titleLen = s.title?.length ?? 0;
  const descLen = s.description?.length ?? 0;
  const altCoverage = s.images.total === 0 ? 1 : s.images.withAlt / s.images.total;
  const dimsCoverage = s.images.total === 0 ? 1 : s.images.withDimensions / s.images.total;
  const noindex =
    /noindex/i.test(s.metaRobots ?? '') || /noindex/i.test(input.xRobotsTag ?? '');
  const inlineBytes = s.scripts.inlineBytes + s.inlineStyleBytes;
  const googlebot = input.searchAccess.find((a) => a.id === 'googlebot');
  const aiAllowedWeight = input.aiAccess
    .filter((a) => a.allowed)
    .reduce((n, a) => n + a.weight, 0);
  const aiTotalWeight = input.aiAccess.reduce((n, a) => n + a.weight, 0);
  const aiShare = aiTotalWeight === 0 ? 1 : aiAllowedWeight / aiTotalWeight;
  const aiBlocked = input.aiAccess.filter((a) => !a.allowed);

  const specs: Spec[] = [
    // ---------------------------------------------------------------- technical
    {
      id: 'status',
      pillar: 'technical',
      weight: 10,
      state: grade(input.status >= 200 && input.status < 300),
      value: `HTTP ${input.status}`,
      label: { en: 'Homepage returns 200', el: 'Η αρχική επιστρέφει 200' },
      fix: {
        en: 'The homepage must answer 200. Anything else and crawlers stop at the door.',
        el: 'Η αρχική πρέπει να απαντά 200. Οτιδήποτε άλλο σταματά τα crawlers στην πόρτα.',
      },
    },
    {
      id: 'https',
      pillar: 'technical',
      weight: 10,
      state: grade(input.https),
      value: input.https ? 'https' : 'http',
      label: { en: 'Served over HTTPS', el: 'Σερβίρεται μέσω HTTPS' },
      fix: {
        en: 'Install a certificate and 301 every http:// URL to its https:// twin.',
        el: 'Εγκαταστήστε πιστοποιητικό και κάντε 301 κάθε http:// διεύθυνση στο https:// αντίστοιχό της.',
      },
    },
    {
      id: 'redirects',
      pillar: 'technical',
      weight: 4,
      state: grade(input.redirectHops <= 1, input.redirectHops === 2),
      value: `${input.redirectHops} hop${input.redirectHops === 1 ? '' : 's'}`,
      label: { en: 'Short redirect chain', el: 'Σύντομη αλυσίδα ανακατευθύνσεων' },
      fix: {
        en: 'Point every variant straight at the final URL instead of chaining www, slash and protocol hops.',
        el: 'Στείλτε κάθε παραλλαγή απευθείας στην τελική διεύθυνση, χωρίς αλυσίδες www, καθέτου και πρωτοκόλλου.',
      },
    },
    {
      id: 'indexable',
      pillar: 'technical',
      weight: 10,
      state: grade(!noindex),
      value: noindex ? 'noindex' : (s.metaRobots ?? 'index (default)'),
      label: { en: 'Indexable (no noindex)', el: 'Ευρετηριάσιμη (χωρίς noindex)' },
      fix: {
        en: 'Remove noindex from the robots meta tag and the X-Robots-Tag header.',
        el: 'Αφαιρέστε το noindex από τη meta ετικέτα robots και την κεφαλίδα X-Robots-Tag.',
      },
    },
    {
      id: 'canonical',
      pillar: 'technical',
      weight: 8,
      state: grade(!!s.canonical),
      value: s.canonical ? s.canonical.slice(0, 80) : 'missing',
      label: { en: 'Canonical URL declared', el: 'Δηλωμένη canonical διεύθυνση' },
      fix: {
        en: 'Declare a self-referencing canonical so www, trailing-slash and parameter duplicates consolidate.',
        el: 'Δηλώστε canonical προς την ίδια σελίδα ώστε τα διπλότυπα www, καθέτου και παραμέτρων να ενοποιηθούν.',
      },
    },
    {
      id: 'search_access',
      pillar: 'technical',
      weight: 10,
      state: grade(googlebot ? googlebot.allowed : true),
      value: googlebot?.allowed === false ? 'Googlebot blocked' : 'Googlebot allowed',
      label: { en: 'robots.txt lets Google in', el: 'Το robots.txt επιτρέπει στο Google' },
      fix: {
        en: 'Remove the Disallow rule that covers / for Googlebot. Nothing ranks while it stands.',
        el: 'Αφαιρέστε τον κανόνα Disallow που καλύπτει το / για το Googlebot. Τίποτα δεν κατατάσσεται όσο ισχύει.',
      },
    },
    {
      id: 'robots_txt',
      pillar: 'technical',
      weight: 4,
      state: grade(input.robots.present),
      value: input.robots.present ? `${input.robots.bytes} bytes` : 'missing',
      label: { en: 'robots.txt exists', el: 'Υπάρχει robots.txt' },
      fix: {
        en: 'Publish /robots.txt, even a permissive one, and declare your sitemap in it.',
        el: 'Δημοσιεύστε /robots.txt, έστω επιτρεπτικό, και δηλώστε μέσα το sitemap σας.',
      },
    },
    {
      id: 'sitemap',
      pillar: 'technical',
      weight: 8,
      state: grade((input.sitemapUrls ?? 0) > 0),
      value: input.sitemapUrls === null ? 'not found' : `${input.sitemapUrls} URLs`,
      label: { en: 'XML sitemap reachable', el: 'Προσβάσιμο XML sitemap' },
      fix: {
        en: 'Publish an XML sitemap listing every indexable page and submit it in Search Console.',
        el: 'Δημοσιεύστε XML sitemap με κάθε ευρετηριάσιμη σελίδα και υποβάλετέ το στο Search Console.',
      },
    },
    {
      id: 'sitemap_declared',
      pillar: 'technical',
      weight: 3,
      state: grade(input.robots.sitemaps.length > 0),
      value: `${input.robots.sitemaps.length} declared`,
      label: { en: 'Sitemap declared in robots.txt', el: 'Δήλωση sitemap στο robots.txt' },
      fix: {
        en: 'Add a `Sitemap:` line to robots.txt so every crawler finds it without being told.',
        el: 'Προσθέστε γραμμή `Sitemap:` στο robots.txt ώστε κάθε crawler να το βρίσκει μόνο του.',
      },
    },
    {
      id: 'viewport',
      pillar: 'technical',
      weight: 6,
      state: grade(!!s.viewport),
      value: s.viewport ?? 'missing',
      label: { en: 'Mobile viewport set', el: 'Ορισμένο viewport για κινητά' },
      fix: {
        en: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">.',
        el: 'Προσθέστε <meta name="viewport" content="width=device-width, initial-scale=1">.',
      },
    },
    {
      id: 'lang',
      pillar: 'technical',
      weight: 4,
      state: grade(!!s.lang),
      value: s.lang ?? 'missing',
      label: { en: 'Page language declared', el: 'Δηλωμένη γλώσσα σελίδας' },
      fix: {
        en: 'Set lang on <html> (lang="el" or lang="en") so search and assistive tech read it correctly.',
        el: 'Ορίστε lang στο <html> (lang="el" ή lang="en") ώστε αναζήτηση και υποστηρικτικές τεχνολογίες να το διαβάζουν σωστά.',
      },
    },
    {
      id: 'charset',
      pillar: 'technical',
      weight: 3,
      state: grade(!!s.charset),
      value: s.charset ?? 'missing',
      label: { en: 'Character set declared', el: 'Δηλωμένο σύνολο χαρακτήρων' },
      fix: {
        en: 'Declare <meta charset="utf-8"> first thing in <head>; Greek text garbles without it.',
        el: 'Δηλώστε <meta charset="utf-8"> στην αρχή του <head>. Χωρίς αυτό τα ελληνικά αλλοιώνονται.',
      },
    },
    {
      id: 'notfound',
      pillar: 'technical',
      weight: 4,
      state:
        input.notFoundStatus === null
          ? 'warn'
          : grade(input.notFoundStatus === 404 || input.notFoundStatus === 410),
      value: input.notFoundStatus === null ? 'not measured' : `HTTP ${input.notFoundStatus}`,
      label: { en: 'Missing pages return 404', el: 'Οι ανύπαρκτες σελίδες επιστρέφουν 404' },
      fix: {
        en: 'Return a real 404 for URLs that do not exist. A 200 on a "not found" page floods the index with duplicates.',
        el: 'Επιστρέψτε πραγματικό 404 για διευθύνσεις που δεν υπάρχουν. Ένα 200 σε σελίδα «δεν βρέθηκε» γεμίζει το ευρετήριο με διπλότυπα.',
      },
    },
    {
      id: 'hsts',
      pillar: 'technical',
      weight: 3,
      state: grade(input.hsts, input.https),
      value: input.hsts ? 'present' : 'absent',
      label: { en: 'HSTS header', el: 'Κεφαλίδα HSTS' },
      fix: {
        en: 'Send Strict-Transport-Security so browsers never try the insecure version again.',
        el: 'Στείλτε Strict-Transport-Security ώστε οι browsers να μην ξαναδοκιμάζουν τη μη ασφαλή έκδοση.',
      },
    },
    {
      id: 'hreflang',
      pillar: 'technical',
      weight: 3,
      state: s.hreflangCount > 0 ? (s.hasXDefault ? 'pass' : 'warn') : 'warn',
      value: `${s.hreflangCount} alternates`,
      label: { en: 'hreflang alternates', el: 'Εναλλακτικές hreflang' },
      fix: {
        en: 'Serving Greek and English? Link each version reciprocally and add an x-default.',
        el: 'Έχετε ελληνικά και αγγλικά; Συνδέστε αμφίδρομα κάθε έκδοση και προσθέστε x-default.',
      },
    },

    // ----------------------------------------------------------------- content
    {
      id: 'title',
      pillar: 'content',
      weight: 10,
      state: grade(titleLen >= 15 && titleLen <= 65, titleLen > 0 && titleLen <= 78),
      value: s.title ? `${titleLen} chars` : 'missing',
      label: { en: 'Title tag, 15-65 characters', el: 'Ετικέτα τίτλου, 15-65 χαρακτήρες' },
      fix: {
        en: 'One title per page naming the service and the place, under 65 characters.',
        el: 'Ένας τίτλος ανά σελίδα που ονομάζει υπηρεσία και τοποθεσία, κάτω από 65 χαρακτήρες.',
      },
    },
    {
      id: 'description',
      pillar: 'content',
      weight: 9,
      state: grade(descLen >= 70 && descLen <= 165, descLen >= 40 && descLen <= 200),
      value: s.description ? `${descLen} chars` : 'missing',
      label: { en: 'Meta description, 70-165 characters', el: 'Meta περιγραφή, 70-165 χαρακτήρες' },
      fix: {
        en: 'Answer the query in one sentence and close with a reason to click.',
        el: 'Απαντήστε στο ερώτημα σε μία πρόταση και κλείστε με λόγο για κλικ.',
      },
    },
    {
      id: 'h1',
      pillar: 'content',
      weight: 9,
      state: grade(s.headings.counts.h1 === 1, s.headings.counts.h1 === 2),
      value: `${s.headings.counts.h1} found`,
      label: { en: 'Exactly one H1', el: 'Ακριβώς ένα H1' },
      fix: {
        en: 'Keep a single H1 carrying the primary phrase; demote the rest to H2.',
        el: 'Κρατήστε ένα H1 με τη βασική φράση και υποβιβάστε τα υπόλοιπα σε H2.',
      },
    },
    {
      id: 'heading_structure',
      pillar: 'content',
      weight: 5,
      state: grade(s.headings.counts.h2 >= 2 && !s.headings.skipsLevel, s.headings.counts.h2 >= 1),
      value: `h2:${s.headings.counts.h2} h3:${s.headings.counts.h3}${s.headings.skipsLevel ? ' (skips a level)' : ''}`,
      label: { en: 'Heading outline holds up', el: 'Στέκει η ιεραρχία επικεφαλίδων' },
      fix: {
        en: 'Give the page a real outline: H2 per section, H3 beneath, no skipped levels.',
        el: 'Δώστε στη σελίδα πραγματική δομή: H2 ανά ενότητα, H3 από κάτω, χωρίς κενά επίπεδα.',
      },
    },
    {
      id: 'word_count',
      pillar: 'content',
      weight: 8,
      state: grade(s.wordCount >= 500, s.wordCount >= 250),
      value: `${s.wordCount} words`,
      label: { en: 'Enough copy to rank', el: 'Αρκετό κείμενο για κατάταξη' },
      fix: {
        en: 'A homepage under 250 words gives search engines nothing to match a query against. Write the proof, the offer and the place.',
        el: 'Μια αρχική κάτω από 250 λέξεις δεν δίνει στις μηχανές τίποτα να ταιριάξουν με ερώτημα. Γράψτε την απόδειξη, την προσφορά και την περιοχή.',
      },
    },
    {
      id: 'img_alt',
      pillar: 'content',
      weight: 6,
      state: grade(altCoverage >= 0.8, altCoverage >= 0.5),
      value: s.images.total ? `${s.images.withAlt}/${s.images.total} with alt` : 'no images',
      label: { en: 'Images carry alt text', el: 'Οι εικόνες έχουν alt' },
      fix: {
        en: 'Describe every meaningful image in alt; leave decorative ones alt="".',
        el: 'Περιγράψτε κάθε ουσιαστική εικόνα στο alt και αφήστε τις διακοσμητικές με alt="".',
      },
    },
    {
      id: 'internal_links',
      pillar: 'content',
      weight: 6,
      state: grade(s.links.uniqueInternal >= 10, s.links.uniqueInternal >= 5),
      value: `${s.links.uniqueInternal} unique internal`,
      label: { en: 'Internal links out of the homepage', el: 'Εσωτερικοί σύνδεσμοι από την αρχική' },
      fix: {
        en: 'Link the homepage to every money page. Pages nothing links to get crawled last and rank worst.',
        el: 'Συνδέστε την αρχική με κάθε εμπορική σελίδα. Όσες δεν δέχονται συνδέσμους σαρώνονται τελευταίες και κατατάσσονται χειρότερα.',
      },
    },
    {
      id: 'opengraph',
      pillar: 'content',
      weight: 4,
      state: grade(s.ogTitle && s.ogImage, s.ogTitle || s.ogImage),
      value: `${s.ogTitle ? 'title' : 'no title'}, ${s.ogImage ? 'image' : 'no image'}`,
      label: { en: 'Open Graph title and image', el: 'Open Graph τίτλος και εικόνα' },
      fix: {
        en: 'Set og:title and a 1200x630 og:image so shares and AI previews carry your brand.',
        el: 'Ορίστε og:title και og:image 1200x630 ώστε κοινοποιήσεις και προεπισκοπήσεις AI να δείχνουν το brand σας.',
      },
    },
    {
      id: 'landmarks',
      pillar: 'content',
      weight: 3,
      state: grade(s.landmarks.includes('main') && s.landmarks.includes('nav'), s.landmarks.length >= 2),
      value: s.landmarks.join(', ') || 'none',
      label: { en: 'Semantic landmarks', el: 'Σημασιολογικά landmarks' },
      fix: {
        en: 'Wrap the page in <header>, <nav>, <main> and <footer> so parsers know what is content.',
        el: 'Τυλίξτε τη σελίδα σε <header>, <nav>, <main> και <footer> ώστε οι parsers να ξέρουν τι είναι περιεχόμενο.',
      },
    },
    {
      id: 'favicon',
      pillar: 'content',
      weight: 2,
      state: grade(s.favicon),
      value: s.favicon ? 'present' : 'missing',
      label: { en: 'Favicon declared', el: 'Δηλωμένο favicon' },
      fix: {
        en: 'Add a favicon; Google shows it next to your result on mobile.',
        el: 'Προσθέστε favicon. Το Google το δείχνει δίπλα στο αποτέλεσμά σας στο κινητό.',
      },
    },

    // ------------------------------------------------------------- performance
    {
      id: 'ttfb',
      pillar: 'performance',
      weight: 10,
      state: grade(input.ttfbMs < 800, input.ttfbMs < 1500),
      value: `${Math.round(input.ttfbMs)} ms`,
      label: { en: 'First byte under 800 ms', el: 'Πρώτο byte κάτω από 800 ms' },
      fix: {
        en: 'Cache the HTML at the edge or on the server. Slow first bytes hold back every other metric.',
        el: 'Βάλτε το HTML σε cache στο edge ή στον διακομιστή. Το αργό πρώτο byte καθυστερεί κάθε άλλη μετρική.',
      },
    },
    {
      id: 'download',
      pillar: 'performance',
      weight: 6,
      state: grade(input.downloadMs < 600, input.downloadMs < 1500),
      value: `${Math.round(input.downloadMs)} ms`,
      label: { en: 'HTML downloads fast', el: 'Γρήγορη λήψη HTML' },
      fix: {
        en: 'Shrink and compress the HTML document so the browser can start parsing sooner.',
        el: 'Μικρύνετε και συμπιέστε το HTML ώστε ο browser να αρχίσει νωρίτερα την ανάλυση.',
      },
    },
    {
      id: 'html_weight',
      pillar: 'performance',
      weight: 6,
      state: grade(input.htmlBytes < 150_000, input.htmlBytes < 400_000),
      value: kb(input.htmlBytes),
      label: { en: 'HTML document under 150 KB', el: 'Έγγραφο HTML κάτω από 150 KB' },
      fix: {
        en: 'Move inline styles and data blobs out of the document; ship markup, not a payload.',
        el: 'Βγάλτε inline στυλ και μπλοκ δεδομένων από το έγγραφο. Στείλτε markup, όχι φορτίο.',
      },
    },
    {
      id: 'compression',
      pillar: 'performance',
      weight: 6,
      state: grade(!!input.compression),
      value: input.compression ?? 'none',
      label: { en: 'Text compression on', el: 'Ενεργή συμπίεση κειμένου' },
      fix: {
        en: 'Enable brotli or gzip for HTML, CSS and JS. It is one server setting and it is free.',
        el: 'Ενεργοποιήστε brotli ή gzip για HTML, CSS και JS. Είναι μία ρύθμιση διακομιστή και δωρεάν.',
      },
    },
    {
      id: 'render_blocking',
      pillar: 'performance',
      weight: 8,
      state: grade(s.scripts.renderBlocking === 0, s.scripts.renderBlocking <= 2),
      value: `${s.scripts.renderBlocking} blocking`,
      label: { en: 'No render-blocking scripts', el: 'Χωρίς scripts που μπλοκάρουν' },
      fix: {
        en: 'Add defer or async to every <script src> in <head>, or move it before </body>.',
        el: 'Προσθέστε defer ή async σε κάθε <script src> μέσα στο <head>, ή μετακινήστε το πριν το </body>.',
      },
    },
    {
      id: 'third_party',
      pillar: 'performance',
      weight: 5,
      state: grade(s.scripts.thirdPartyHosts.length <= 4, s.scripts.thirdPartyHosts.length <= 8),
      value: `${s.scripts.thirdPartyHosts.length} hosts`,
      label: { en: 'Third-party scripts in check', el: 'Ελεγχόμενα scripts τρίτων' },
      fix: {
        en: 'Every extra third-party host is a DNS lookup, a handshake and a dependency. Drop the ones nobody reads.',
        el: 'Κάθε επιπλέον host τρίτου είναι ένα DNS lookup, μια χειραψία και μια εξάρτηση. Αφαιρέστε όσα δεν διαβάζει κανείς.',
      },
    },
    {
      id: 'inline_bloat',
      pillar: 'performance',
      weight: 4,
      state: grade(inlineBytes < 100_000, inlineBytes < 250_000),
      value: kb(inlineBytes),
      label: { en: 'Inline CSS and JS under control', el: 'Ελεγχόμενο inline CSS και JS' },
      fix: {
        en: 'Inline only the critical CSS. Everything else belongs in a cacheable file.',
        el: 'Κρατήστε inline μόνο το κρίσιμο CSS. Τα υπόλοιπα ανήκουν σε αρχείο που μπαίνει σε cache.',
      },
    },
    {
      id: 'image_dims',
      pillar: 'performance',
      weight: 5,
      state: grade(dimsCoverage >= 0.8, dimsCoverage >= 0.5),
      value: s.images.total ? `${s.images.withDimensions}/${s.images.total} sized` : 'no images',
      label: { en: 'Images declare width and height', el: 'Οι εικόνες δηλώνουν πλάτος και ύψος' },
      fix: {
        en: 'Set width and height on every <img>. Without them the layout jumps and CLS punishes you.',
        el: 'Ορίστε width και height σε κάθε <img>. Χωρίς αυτά η διάταξη αναπηδά και το CLS σας τιμωρεί.',
      },
    },
    {
      id: 'lazy_images',
      pillar: 'performance',
      weight: 4,
      state:
        s.images.total <= 8
          ? 'pass'
          : grade(s.images.lazy >= s.images.total / 2, s.images.lazy > 0),
      value: `${s.images.lazy}/${s.images.total} lazy`,
      label: { en: 'Below-the-fold images lazy-load', el: 'Οι εικόνες εκτός οθόνης φορτώνουν lazy' },
      fix: {
        en: 'Add loading="lazy" to images below the fold, never to the hero image.',
        el: 'Προσθέστε loading="lazy" στις εικόνες εκτός πρώτης οθόνης, ποτέ στην κεντρική.',
      },
    },
    {
      id: 'modern_images',
      pillar: 'performance',
      weight: 3,
      state:
        s.images.total <= 4 ? 'pass' : grade(s.images.modernFormats > 0, false),
      value: `${s.images.modernFormats} webp/avif`,
      label: { en: 'Modern image formats', el: 'Σύγχρονες μορφές εικόνας' },
      fix: {
        en: 'Serve WebP or AVIF with a fallback. Same picture, a third of the bytes.',
        el: 'Σερβίρετε WebP ή AVIF με εναλλακτική. Ίδια εικόνα, το ένα τρίτο των bytes.',
      },
    },

    // ---------------------------------------------------------------------- ai
    {
      id: 'ai_access',
      pillar: 'ai',
      weight: 12,
      state: grade(aiShare >= 0.99, aiShare >= 0.6),
      value:
        aiBlocked.length === 0
          ? 'all allowed'
          : `blocked: ${aiBlocked.map((a) => a.token).join(', ')}`,
      label: { en: 'AI answer engines can crawl you', el: 'Οι μηχανές απαντήσεων AI μπορούν να σας σαρώσουν' },
      fix: {
        en: 'Your robots.txt blocks crawlers that feed AI answers. Allow the ones you want to be quoted by.',
        el: 'Το robots.txt σας μπλοκάρει crawlers που τροφοδοτούν απαντήσεις AI. Επιτρέψτε όσους θέλετε να σας αναφέρουν.',
      },
    },
    {
      id: 'jsonld',
      pillar: 'ai',
      weight: 10,
      state: grade(
        s.jsonLd.blocks > 0 && s.jsonLd.invalidBlocks === 0,
        s.jsonLd.blocks > 0,
      ),
      value: s.jsonLd.types.length ? s.jsonLd.types.slice(0, 4).join(', ') : 'none',
      label: { en: 'Structured data (JSON-LD)', el: 'Δομημένα δεδομένα (JSON-LD)' },
      fix: {
        en: 'Add valid JSON-LD matching what is on the page. It is how machines read a page without guessing.',
        el: 'Προσθέστε έγκυρο JSON-LD που αντιστοιχεί στο ορατό περιεχόμενο. Έτσι διαβάζουν οι μηχανές χωρίς εικασίες.',
      },
    },
    {
      id: 'entity_schema',
      pillar: 'ai',
      weight: 8,
      state: grade(s.jsonLd.hasEntity),
      value: s.jsonLd.hasEntity ? 'declared' : 'missing',
      label: { en: 'Organization or LocalBusiness schema', el: 'Schema Organization ή LocalBusiness' },
      fix: {
        en: 'Declare who you are: Organization or LocalBusiness with name, address, phone and logo. Without it you are not an entity an assistant can name.',
        el: 'Δηλώστε ποιοι είστε: Organization ή LocalBusiness με όνομα, διεύθυνση, τηλέφωνο και λογότυπο. Χωρίς αυτό δεν είστε οντότητα που μπορεί να ονομάσει ένας βοηθός.',
      },
    },
    {
      id: 'sameas',
      pillar: 'ai',
      weight: 4,
      state: grade(s.jsonLd.hasSameAs),
      value: s.jsonLd.hasSameAs ? 'present' : 'missing',
      label: { en: 'sameAs profile links', el: 'Σύνδεσμοι sameAs' },
      fix: {
        en: 'List your Google Business, Facebook, Instagram and LinkedIn URLs in sameAs so the profiles resolve to one entity.',
        el: 'Παραθέστε Google Business, Facebook, Instagram και LinkedIn στο sameAs ώστε τα προφίλ να δείχνουν μία οντότητα.',
      },
    },
    {
      id: 'faq_schema',
      pillar: 'ai',
      weight: 5,
      state: grade(s.jsonLd.hasFaq),
      value: s.jsonLd.hasFaq ? 'present' : 'missing',
      label: { en: 'FAQ or Q&A schema', el: 'Schema FAQ ή Q&A' },
      fix: {
        en: 'Mark your real questions up as FAQPage. Answer engines lift question-and-answer pairs first.',
        el: 'Σημάνετε τις πραγματικές ερωτήσεις σας ως FAQPage. Οι μηχανές απαντήσεων παίρνουν πρώτα ζεύγη ερώτησης-απάντησης.',
      },
    },
    {
      id: 'question_headings',
      pillar: 'ai',
      weight: 5,
      state: grade(s.headings.questionCount >= 2, s.headings.questionCount >= 1),
      value: `${s.headings.questionCount} question headings`,
      label: { en: 'Content answers real questions', el: 'Το περιεχόμενο απαντά σε πραγματικές ερωτήσεις' },
      fix: {
        en: 'Head sections with the question a customer asks, then answer it in the first two sentences.',
        el: 'Βάλτε ως επικεφαλίδα την ερώτηση που κάνει ο πελάτης και απαντήστε στις δύο πρώτες προτάσεις.',
      },
    },
    {
      id: 'server_text',
      pillar: 'ai',
      weight: 8,
      state: grade(s.wordCount >= 300, s.wordCount >= 120),
      value: `${s.wordCount} words in the HTML`,
      label: { en: 'Text present without JavaScript', el: 'Κείμενο χωρίς JavaScript' },
      fix: {
        en: 'Render your copy server-side. Most AI crawlers do not run JavaScript, so a client-rendered shell reads as an empty page.',
        el: 'Αποδώστε το κείμενο από τον διακομιστή. Τα περισσότερα AI crawlers δεν εκτελούν JavaScript, οπότε ένα κέλυφος που γεμίζει στον browser διαβάζεται ως κενή σελίδα.',
      },
    },
    {
      id: 'breadcrumb',
      pillar: 'ai',
      weight: 3,
      state: grade(s.jsonLd.hasBreadcrumb),
      value: s.jsonLd.hasBreadcrumb ? 'present' : 'missing',
      label: { en: 'Breadcrumb schema', el: 'Schema breadcrumb' },
      fix: {
        en: 'Add BreadcrumbList so results and assistants show where the page sits in your site.',
        el: 'Προσθέστε BreadcrumbList ώστε αποτελέσματα και βοηθοί να δείχνουν πού βρίσκεται η σελίδα στο site σας.',
      },
    },
    {
      id: 'llms_txt',
      pillar: 'ai',
      weight: 3,
      state: input.llmsTxt ? 'pass' : 'warn',
      value: input.llmsTxt ? 'present' : 'absent',
      label: { en: 'llms.txt published', el: 'Δημοσιευμένο llms.txt' },
      fix: {
        en: 'Publish /llms.txt summarising what you do and linking your key pages. Cheap to add, and the convention is spreading.',
        el: 'Δημοσιεύστε /llms.txt με σύνοψη του τι κάνετε και συνδέσμους στις βασικές σελίδες. Φθηνό και η σύμβαση εξαπλώνεται.',
      },
    },
  ];

  return specs.map((spec) => ({
    id: spec.id,
    pillar: spec.pillar,
    weight: spec.weight,
    state: spec.state,
    label: spec.label,
    value: spec.value,
    fix: spec.fix,
  }));
}

const STATE_CREDIT: Record<CheckState, number> = { pass: 1, warn: 0.5, fail: 0 };

export function scorePillars(checks: readonly AuditCheck[]): {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  pillars: PillarScore[];
  priorities: AuditCheck[];
} {
  const pillars: PillarScore[] = PILLARS.map((pillar) => {
    const group = checks.filter((c) => c.pillar === pillar);
    const weight = group.reduce((n, c) => n + c.weight, 0);
    const earned = group.reduce((n, c) => n + c.weight * STATE_CREDIT[c.state], 0);
    return {
      pillar,
      score: weight === 0 ? 0 : Math.round((earned / weight) * 100),
      passed: group.filter((c) => c.state === 'pass').length,
      total: group.length,
      failed: group.filter((c) => c.state === 'fail').length,
    };
  });

  const totalWeight = checks.reduce((n, c) => n + c.weight, 0);
  const earned = checks.reduce((n, c) => n + c.weight * STATE_CREDIT[c.state], 0);
  const score = totalWeight === 0 ? 0 : Math.round((earned / totalWeight) * 100);

  const priorities = checks
    .filter((c) => c.state !== 'pass')
    .sort((a, b) => {
      const byState = (a.state === 'fail' ? 0 : 1) - (b.state === 'fail' ? 0 : 1);
      return byState !== 0 ? byState : b.weight - a.weight;
    })
    .slice(0, 6);

  const grade =
    score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : score >= 40 ? 'D' : 'F';

  return { score, grade, pillars, priorities };
}

export { AI_AGENTS, SEARCH_AGENTS };
