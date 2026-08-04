/**
 * Generates unique EN/EL case-study overrides + portfolio copy from
 * docs/portfolio-audits/_meta-corrections.json (scrape-led source of truth).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const index = JSON.parse(fs.readFileSync(path.join(root, '.firecrawl/work/_index.json'), 'utf8'));
const META = JSON.parse(
  fs.readFileSync(path.join(root, 'docs/portfolio-audits/_meta-corrections.json'), 'utf8'),
);

const SERVICE_EL = {
  'website-creation': 'κατασκευή ιστοσελίδας',
  'website-redesign': 'ανασχεδιασμός ιστοσελίδας',
  'seo-web-design': 'σχεδιασμός ιστοσελίδας με SEO',
  'local-seo': 'τοπικό SEO',
  'speed-optimization': 'βελτιστοποίηση ταχύτητας',
  'content-creation': 'δημιουργία περιεχομένου',
  'technical-seo': 'τεχνικό SEO',
  'ecommerce-seo': 'SEO ηλεκτρονικού καταστήματος',
};

const SERVICE_EN = {
  'website-creation': 'website creation',
  'website-redesign': 'website redesign',
  'seo-web-design': 'SEO web design',
  'local-seo': 'local SEO',
  'speed-optimization': 'speed optimization',
  'content-creation': 'content creation',
  'technical-seo': 'technical SEO',
  'ecommerce-seo': 'ecommerce SEO',
};

function scrapeStatus(slug) {
  const p = path.join(root, '.firecrawl/work', `${slug}.md`);
  if (!fs.existsSync(p) || fs.statSync(p).size < 40) {
    return { status: 'offline', snippet: '' };
  }
  const t = fs.readFileSync(p, 'utf8').replace(/\s+/g, ' ').trim();
  if (/sedoparking|parking\.com|Buy this domain|This domain is for sale/i.test(t)) {
    return { status: 'parked', snippet: t.slice(0, 280) };
  }
  if (t.length < 200 || (t.match(/undefined/g) || []).length >= 5) {
    return { status: 'thin', snippet: t.slice(0, 280) };
  }
  return { status: 'ok', snippet: t.slice(0, 280) };
}

function smartSlice(s, max) {
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const sp = cut.lastIndexOf(' ');
  return `${(sp > 80 ? cut.slice(0, sp) : cut).trimEnd()}…`;
}

function uniq(arr) {
  return [...new Set(arr.filter(Boolean))];
}

function servicesPhrase(services, lang) {
  const map = lang === 'el' ? SERVICE_EL : SERVICE_EN;
  const labels = (services || []).map((s) => map[s] || s).filter(Boolean);
  const and = lang === 'el' ? 'και' : 'and';
  if (!labels.length) return lang === 'el' ? 'κατασκευή ιστοσελίδας και SEO' : 'website creation and SEO';
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} ${and} ${labels[1]}`;
  return `${labels.slice(0, -1).join(', ')} ${and} ${labels[labels.length - 1]}`;
}

function websiteNoun(businessEl) {
  if (/ιστοσελίδα|πλατφόρμα|κατάστημα|κατάλογος|αγορά|κέντρο|στούντιο|ταβέρνα|ξενοδοχείο|ενοικίαση|διαχείριση|ακαδημία|οδηγός|υπηρεσία|brand|κομμωτήριο|ταξιδιωτικό|cocktail bar|καφέ|διαμεσολάβηση|προπόνηση|εκπαίδευση|διαιτολογία|απεντόμωση|κτήμα/i.test(businessEl)) {
    return businessEl;
  }
  return `ιστοσελίδα για ${businessEl}`;
}

/** Greek genitive-ish phrase for “paths to X” */
function ctaPathEl(ctaEl) {
  const map = {
    κράτηση: 'κράτησης',
    'κράτηση τραπεζιού': 'κράτησης τραπεζιού',
    'αίτημα προσφοράς': 'αιτήματος προσφοράς',
    παραγγελία: 'παραγγελίας',
    επικοινωνία: 'επικοινωνίας',
    εγγραφή: 'εγγραφής',
    επίδειξη: 'επίδειξης',
  };
  return map[ctaEl] || ctaEl;
}

function enWebsiteNoun(businessEn) {
  if (/website|platform|directory|marketplace|shop|store|portal|agency|academy|guide|service|salon|hotel|rental|taverna|cafe|bar|villa|estate|studio|center|centre/i.test(businessEn)) {
    return businessEn;
  }
  return `${businessEn} website`;
}

/** Vary EL summary endings so they are not identical across 71 projects */
const EL_ENDINGS = [
  (m) => `με καθαρή διαδρομή προς ${m.ctaEl}`,
  (m) => `με έμφαση σε ${m.angleEl}`,
  (m) => `βελτιστοποιημένη για κινητά και τοπική αναζήτηση`,
  (m) => `με δομή περιεχομένου για «${m.kwEl[0]}»`,
  (m) => `έτοιμη για οργανική ανάπτυξη στη ${m.locationEl}`,
  (m) => `με τεχνικό SEO από την πρώτη μέρα`,
  (m) => `με ξεκάθαρα σήματα εμπιστοσύνης και ${m.ctaEl}`,
];

const EN_ENDINGS = [
  (m) => `with a clear path to ${m.ctaEn}`,
  (m) => `focused on ${m.angleEn}`,
  (m) => `optimized for mobile and local search`,
  (m) => `structured around “${m.kwEn[0]}”`,
  (m) => `ready for organic growth in ${m.locationEn}`,
  (m) => `with technical SEO from day one`,
  (m) => `with trust signals and a clear ${m.ctaEn} path`,
];

function hashSlug(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

function buildCase(p) {
  const m = META[p.slug];
  if (!m) throw new Error(`Missing META for ${p.slug}`);
  const servicesEl = servicesPhrase(p.services, 'el');
  const servicesEn = servicesPhrase(p.services, 'en');
  const { status } = scrapeStatus(p.slug);
  const liveHintEl =
    status === 'ok' ? ' Τα σήματα του ζωντανού site καθόρισαν τις προτεραιότητες περιεχομένου.' : '';
  const liveHintEn =
    status === 'ok' ? ' Live site signals informed content priorities.' : '';

  const prep = m.locationPrepEl || 'στη';
  const bizEl = websiteNoun(m.businessEl);
  const bizEn = enWebsiteNoun(m.businessEn);
  const endEl = EL_ENDINGS[hashSlug(p.slug) % EL_ENDINGS.length](m);
  const endEn = EN_ENDINGS[hashSlug(p.slug) % EN_ENDINGS.length](m);
  const kw2El = m.kwEl[1] || m.kwEl[0];
  const kw2En = m.kwEn[1] || m.kwEn[0];

  const overview = {
    en: `${p.name} is a live ${bizEn} project for ${m.locationEn}. We delivered ${servicesEn}, targeting “${m.kwEn[0]}” and related commercial intents.`,
    el: `Το ${p.name} είναι ζωντανό έργο ${bizEl} ${prep} ${m.locationEl}. Παραδώσαμε ${servicesEl}, με στόχο «${m.kwEl[0]}» και σχετικές εμπορικές προθέσεις.`,
  };

  const challenge = {
    en: `In ${m.locationEn}, competitors compete for “${m.kwEn[0]}” and related queries. ${p.name} needed a site that stands out through ${m.angleEn}, ranks locally, and turns visitors into a ${m.ctaEn}—without looking generic.`,
    el: `${prep.charAt(0).toUpperCase() + prep.slice(1)} ${m.locationEl}, ο ανταγωνισμός διεκδικεί αναζητήσεις όπως «${m.kwEl[0]}». Το ${p.name} χρειαζόταν ιστοσελίδα που ξεχωρίζει χάρη σε ${m.angleEl}, εμφανίζεται στην τοπική αναζήτηση και οδηγεί επισκέπτες σε ${m.ctaEl} — χωρίς εμφάνιση έτοιμου προτύπου.`,
  };

  const approach = {
    en: `We mapped search intent around ${m.locationEn}, structured pages for ${m.kwEn.slice(0, 2).join(' and ')}, and shipped mobile-first UX with technical SEO, schema and clear calls to action. ${m.angleEn.charAt(0).toUpperCase() + m.angleEn.slice(1)}.${liveHintEn}`,
    el: `Χαρτογραφήσαμε τις προθέσεις αναζήτησης ${prep} ${m.locationEl}, δομήσαμε σελίδες για «${m.kwEl[0]}» και «${kw2El}» και παραδώσαμε διεπαφή πρώτα για κινητά με τεχνικό SEO, σήμανση schema και ξεκάθαρες κλήσεις σε ενέργεια. ${m.angleEl.charAt(0).toUpperCase() + m.angleEl.slice(1)}.${liveHintEl}`,
  };

  const seo = {
    en: uniq([
      `Primary keyword focus: ${m.kwEn[0]}`,
      ...m.kwEn.slice(1, 3).map((k) => `Supporting topic: ${k}`),
      `Unique titles and headings for ${p.name} in ${m.locationEn}`,
      `Internal links from informational pages to ${m.ctaEn} pages`,
      `Relevant schema aligned to ${m.businessEn}`,
    ]),
    el: uniq([
      `Κύρια λέξη-κλειδί: ${m.kwEl[0]}`,
      ...m.kwEl.slice(1, 3).map((k) => `Υποστηρικτικό θέμα: ${k}`),
      `Μοναδικοί τίτλοι και επικεφαλίδες για ${p.name} ${prep} ${m.locationEl}`,
      `Εσωτερικοί σύνδεσμοι από ενημερωτικές σελίδες προς σελίδες ${m.ctaEl}`,
      `Σχετική σήμανση schema για ${m.businessEl}`,
    ]),
  };

  const geoAeo = {
    en: [
      `Clear entity intro for ${p.name}, ${m.locationEn}, and the core ${m.businessEn} offer`,
      `FAQ answering “${m.kwEn[0]}” style questions for AI Overviews`,
      `Structured facts (location, services, languages) for answer engines`,
      `About and how-it-works copy written for extraction`,
    ],
    el: [
      `Ξεκάθαρη παρουσίαση οντότητας: ${p.name}, ${m.locationEl}, προσφορά ${m.businessEl}`,
      `Συχνές ερωτήσεις τύπου «${m.kwEl[0]}» για απαντήσεις τεχνητής νοημοσύνης`,
      `Δομημένα στοιχεία (τοποθεσία, υπηρεσίες, γλώσσες) για μηχανές απαντήσεων`,
      `Κείμενα «σχετικά» και «πώς λειτουργεί» έτοιμα για εξαγωγή`,
    ],
  };

  const technical = {
    en: [
      `Mobile-first build for people researching ${m.locationEn} on phones`,
      `Media optimized for Core Web Vitals on ${p.name} galleries and product assets`,
      `Clean URLs, sitemap, robots and Search Console-ready launch`,
      `Event tracking for ${m.ctaEn} actions specific to ${m.businessEn}`,
    ],
    el: [
      `Υλοποίηση πρώτα για κινητά για όσους ερευνούν ${prep} ${m.locationEl} από το τηλέφωνο`,
      `Πολυμέσα βελτιστοποιημένα για ταχύτητα στις συλλογές και τα στοιχεία του ${p.name}`,
      `Καθαρά URL, sitemap, robots και έτοιμο άνοιγμα για Search Console`,
      `Παρακολούθηση ενεργειών ${m.ctaEl} προσαρμοσμένη στο ${m.businessEl}`,
    ],
  };

  const content = {
    en: [
      `Conversion copy emphasizing ${m.angleEn}`,
      `Trust modules tailored to ${m.businessEn} in ${m.locationEn}`,
      p.languages?.includes('el') && p.languages?.includes('en')
        ? 'English and Greek content paths with consistent contact details and offers'
        : `Content localized for ${(p.languages || ['en']).join(' / ').toUpperCase()}`,
      `Call-to-action hierarchy matched to the ${p.name} ${m.ctaEn} journey`,
    ],
    el: [
      `Κείμενα μετατροπής με έμφαση σε ${m.angleEl}`,
      `Ενότητες εμπιστοσύνης προσαρμοσμένες στο ${m.businessEl} ${prep} ${m.locationEl}`,
      p.languages?.includes('el') && p.languages?.includes('en')
        ? 'Διαδρομές ελληνικών και αγγλικών με συνεπή στοιχεία επικοινωνίας και προσφορές'
        : `Τοπικό περιεχόμενο για ${(p.languages || ['el']).join(' / ').toUpperCase()}`,
      `Ιεραρχία κλήσεων σε ενέργεια για τη διαδρομή ${m.ctaEl} του ${p.name}`,
    ],
  };

  const outcomes = {
    en: [
      `Location-specific narrative for ${m.locationEn} and “${m.kwEn[0]}”`,
      `Service and product architecture mapped to ${m.businessEn} intents`,
      `Schema and technical SEO baseline for ${p.name}`,
      `Mobile ${m.ctaEn} paths ready for peak demand`,
    ],
    el: [
      `Τοπική αφήγηση για ${m.locationEl} με έμφαση σε «${m.kwEl[0]}»`,
      `Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ${m.businessEl}`,
      `Βάση σήμανσης schema και τεχνικού SEO για ${p.name}`,
      `Διαδρομές ${ctaPathEl(m.ctaEl)} από κινητό έτοιμες για περιόδους αιχμής`,
    ],
  };

  const summary = {
    en: `${p.name}: ${bizEn} for ${m.locationEn}, SEO for “${m.kwEn[0]}”, ${endEn}.`,
    el: `${p.name}: ${bizEl} ${prep} ${m.locationEl}, SEO για «${m.kwEl[0]}», ${endEl}.`,
  };

  const results = [
    `${m.locationEn}: pages aimed at “${m.kwEn[0]}” and “${kw2En}”`,
    `Differentiation: ${m.angleEn}`,
    `Stack: ${(p.services || []).slice(0, 3).map((s) => SERVICE_EN[s] || s).join(', ') || 'website + SEO'}`,
  ];

  const titleKwEn = m.kwEn.find((k) => k.toLowerCase() !== p.name.toLowerCase()) || m.kwEn[0];
  const titleKwEl = m.kwEl.find((k) => k.toLowerCase() !== p.name.toLowerCase()) || m.kwEl[0];

  return {
    slug: p.slug,
    category: m.category || p.category,
    caseStudy: {
      overview,
      challenge,
      approach,
      seo,
      geoAeo,
      technical,
      content,
      outcomes,
      primaryKeywords: { en: m.kwEn, el: m.kwEl },
    },
    summary: summary.en,
    summaryEl: summary.el,
    results,
    resultsEl: outcomes.el,
    seoTitle: smartSlice(`${p.name} | ${titleKwEn}`, 60),
    seoDescription: smartSlice(
      `${p.name} — ${m.businessEn} in ${m.locationEn}. SEO for “${m.kwEn[0]}”.`,
      160,
    ),
    seoTitleEl: smartSlice(`${p.name} | ${titleKwEl}`, 60),
    seoDescriptionEl: smartSlice(
      `${p.name} — ${m.businessEl} ${prep} ${m.locationEl}. SEO για «${m.kwEl[0]}».`,
      160,
    ),
  };
}

const missing = index.filter((p) => !META[p.slug]).map((p) => p.slug);
if (missing.length) {
  console.error('Missing META for:', missing.join(', '));
  process.exit(1);
}

const built = index.map(buildCase);

const overs = built.map((b) => b.caseStudy.overview.en);
const chall = built.map((b) => b.caseStudy.challenge.en);
const oversEl = built.map((b) => b.caseStudy.overview.el);
function dups(arr) {
  const s = new Set();
  const d = new Set();
  for (const x of arr) {
    if (s.has(x)) d.add(x);
    s.add(x);
  }
  return [...d];
}
const od = dups(overs);
const cd = dups(chall);
const odEl = dups(oversEl);
if (od.length || cd.length || odEl.length) {
  console.error('Duplicate overviews EN', od.length, 'challenges', cd.length, 'overviews EL', odEl.length);
  process.exit(1);
}

// Banned EL tokens
const banned = [/rankάρει/i, /generic template/i, /\bCTAs?\b/, /mobile UX/i, /buyer journey/i];
for (const b of built) {
  const elBlob = [
    b.summaryEl,
    b.caseStudy.overview.el,
    b.caseStudy.challenge.el,
    b.caseStudy.approach.el,
    ...(b.resultsEl || []),
  ].join(' ');
  for (const re of banned) {
    if (re.test(elBlob)) {
      console.error(`Banned EL token in ${b.slug}: ${re}`);
      process.exit(1);
    }
  }
  if (/ιστοσελίδα ιστοσελίδα/i.test(elBlob)) {
    console.error(`Duplicate ιστοσελίδα in ${b.slug}`);
    process.exit(1);
  }
}

const outTs = `import type { PortfolioCaseStudyMap } from './portfolio-case-study-types';

/** Unique EN/EL case-study overrides. Source: docs/portfolio-audits/_meta-corrections.json */
export const PORTFOLIO_CASE_STUDIES: PortfolioCaseStudyMap = ${JSON.stringify(
  Object.fromEntries(built.map((b) => [b.slug, b.caseStudy])),
  null,
  2,
)};
`;

fs.writeFileSync(path.join(root, 'src/data/portfolio-case-studies.ts'), outTs);
fs.writeFileSync(path.join(root, '.firecrawl/work/_generated-copy.json'), JSON.stringify(built, null, 2));

const scrapeLabel = {
  ok: 'yes',
  offline: 'site offline at scrape time — used portfolio metadata',
  parked: 'domain parked / for-sale page at scrape time — used portfolio metadata',
  thin: 'thin or broken page content at scrape time — used portfolio metadata',
};

fs.mkdirSync(path.join(root, 'docs/portfolio-audits'), { recursive: true });
for (const p of index) {
  const m = META[p.slug];
  const { status, snippet } = scrapeStatus(p.slug);
  const md = `# ${p.name} (${p.slug})

- URL: ${p.url}
- Category: ${m.category || p.category}
- Business: ${m.businessEn} / ${m.businessEl}
- Location: ${m.locationEn} / ${m.locationEl}
- Keywords EN: ${m.kwEn.join('; ')}
- Keywords EL: ${m.kwEl.join('; ')}
- Angle: ${m.angleEn}
- CTA: ${m.ctaEl}
- Scrape: ${scrapeLabel[status]}
${m.notes ? `- Notes: ${m.notes}\n` : ''}
${snippet ? `## Snippet\n\n${snippet}\n` : ''}
`;
  fs.writeFileSync(path.join(root, 'docs/portfolio-audits', `${p.slug}.md`), md);
}

console.log('Wrote case studies for', built.length, 'projects');
console.log('Audits refreshed in docs/portfolio-audits/');
