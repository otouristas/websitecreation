/**
 * Self-test for the live audit and the cost estimator.
 *
 * Run with `npm run test:audit`.
 *
 * The audit's whole value is that its numbers are measured rather than
 * modelled, which makes it exactly the kind of code that cannot be checked by
 * reading it. So this boots a fixture site on loopback with a known-bad
 * homepage, a robots.txt that blocks two answer engines, a sitemap and an
 * llms.txt, drives the real generator against it over a real socket, and
 * asserts on what comes back.
 *
 * The SSRF guard is what stops a visitor pointing the scanner at a private
 * address, so the fixture server is reached through the documented test seam
 * and the last case here asserts that without that seam loopback is refused.
 */

import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { runAudit } from '../src/lib/audit/run';
import { parseRobots, isAllowed, judgeAgents, AI_AGENTS } from '../src/lib/audit/robots';
import { extractSignals } from '../src/lib/audit/signals';
import { judgeItemList, groundingProfileFor } from '../src/data/ai-mode-tags';
import type { AuditResult } from '../src/lib/audit/types';
import { buildEstimate, normalizeInput } from '../src/lib/estimate/model';
import { recommendFromAudit } from '../src/lib/estimate/recommend';
import { withVat, currentPrice, websitePackages, seoPackages } from '../src/data/pricing';
import { SEO_MIN_TERM_MONTHS } from '../src/data/company-facts';

let failures = 0;
let checks = 0;

function ok(label: string, condition: boolean, detail?: unknown): void {
  checks += 1;
  if (condition) {
    console.log(`  ✓ ${label}`);
  } else {
    failures += 1;
    console.log(`  ✗ ${label}${detail === undefined ? '' : ` — got ${JSON.stringify(detail)}`}`);
  }
}

function eq(label: string, actual: unknown, expected: unknown): void {
  ok(`${label} = ${JSON.stringify(expected)}`, Object.is(actual, expected), actual);
}

// ---------------------------------------------------------------- fixtures

const GOOD_HTML = `<!doctype html>
<html lang="el">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ενοικιάσεις σκαφών στην Κρήτη | Fixture Marine</title>
<meta name="description" content="Ενοικιάσεις σκαφών με ή χωρίς καπετάνιο σε Χανιά και Ρέθυμνο. Καθημερινές αναχωρήσεις, ασφάλεια και καύσιμα στην τιμή, κρατήσεις online σε δύο λεπτά.">
<link rel="canonical" href="http://HOSTPORT/">
<link rel="alternate" hreflang="el" href="http://HOSTPORT/">
<link rel="alternate" hreflang="en" href="http://HOSTPORT/en/">
<link rel="alternate" hreflang="x-default" href="http://HOSTPORT/">
<link rel="icon" href="/favicon.ico">
<meta property="og:title" content="Fixture Marine">
<meta property="og:image" content="http://HOSTPORT/og.jpg">
<script src="/blocking-a.js"></script>
<script src="/blocking-b.js"></script>
<script src="/fine.js" defer></script>
<script src="https://cdn.example.net/widget.js" async></script>
<script type="application/ld+json">
{"@context":"https://schema.org","@graph":[
 {"@type":"LocalBusiness","name":"Fixture Marine","sameAs":["https://facebook.com/fixture"]},
 {"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Πόσο κοστίζει;"}]},
 {"@type":"BreadcrumbList","itemListElement":[]}
]}
</script>
</head>
<body>
<header><nav><a href="/skafi">Σκάφη</a><a href="/times">Τιμές</a><a href="/epikoinonia">Επικοινωνία</a><a href="https://instagram.com/fixture">Instagram</a></nav></header>
<main>
<h1>Ενοικιάσεις σκαφών στην Κρήτη</h1>
<h2>Πώς γίνεται η κράτηση;</h2>
<p>PLACEHOLDER</p>
<h3>Τι περιλαμβάνεται;</h3>
<p>PLACEHOLDER</p>
<img src="/a.webp" alt="Σκάφος" width="800" height="600">
<img src="/b.jpg" alt="Λιμάνι" width="800" height="600">
<img src="/c.jpg">
</main>
<footer><a href="/oroi">Όροι</a></footer>
</body></html>`;

const ROBOTS = `User-agent: *
Disallow: /wp-admin/

User-agent: GPTBot
Disallow: /

User-agent: PerplexityBot
Disallow: /

Sitemap: http://HOSTPORT/sitemap.xml
`;

const SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from({ length: 14 }, (_, i) => `<url><loc>http://HOSTPORT/p${i}</loc></url>`).join('\n')}
</urlset>`;

/** ~520 words of filler so the word-count check has something real to count. */
const FILLER = Array.from({ length: 260 }, (_, i) => `λέξη${i}`).join(' ');

async function main(): Promise<void> {
  const server = createServer((req, res) => {
    const host = req.headers.host ?? '127.0.0.1';
    const path = (req.url ?? '/').split('?')[0];
    const swap = (s: string) => s.replaceAll('HOSTPORT', host).replaceAll('PLACEHOLDER', FILLER);

    if (path === '/') {
      const body = swap(GOOD_HTML);
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      res.end(body);
      return;
    }
    if (path === '/robots.txt') {
      res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
      res.end(swap(ROBOTS));
      return;
    }
    if (path === '/sitemap.xml') {
      res.writeHead(200, { 'content-type': 'application/xml; charset=utf-8' });
      res.end(swap(SITEMAP));
      return;
    }
    if (path === '/llms.txt') {
      res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
      res.end('# Fixture Marine\nBoat rentals in Crete.\n');
      return;
    }
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
    res.end('<!doctype html><title>404</title>');
  });

  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address() as AddressInfo;
  const base = `http://127.0.0.1:${port}`;
  const loopbackGuard = async (hostname: string): Promise<void> => {
    if (hostname !== '127.0.0.1') throw new Error('self-test guard: loopback only');
  };

  try {
    // -------------------------------------------------- 1. the real generator
    console.log('\nrunAudit against the fixture site');
    const events: string[] = [];
    let result: AuditResult | null = null;
    let error: string | null = null;
    for await (const event of runAudit(base, { guard: loopbackGuard })) {
      if (event.type === 'result') result = event.result;
      else if (event.type === 'error') error = event.code;
      else if (event.type === 'step' && event.state !== 'start') events.push(`${event.id}:${event.state}`);
    }

    ok('no error event', error === null, error);
    if (!result) {
      console.log('  ✗ audit produced no result; the rest cannot run');
      failures += 1;
      return;
    }

    ok(
      'every step reported',
      ['resolve', 'homepage', 'parse', 'robots', 'sitemap', 'ai', 'notfound', 'score'].every((id) =>
        events.some((e) => e.startsWith(`${id}:`)),
      ),
      events,
    );

    // ------------------------------------------------------- 2. real metrics
    console.log('\nmeasured metrics');
    const m = result.metrics;
    ok('TTFB measured', m.ttfbMs >= 0 && m.ttfbMs < 5000, m.ttfbMs);
    ok('HTML bytes measured', m.htmlBytes > 3000, m.htmlBytes);
    eq('redirect hops', m.redirectHops, 0);
    eq('sitemap URLs', m.sitemapUrls, 14);
    eq('sitemap is an index', m.sitemapIsIndex, false);
    eq('llms.txt found', m.llmsTxt, true);
    eq('404 status', m.notFoundStatus, 404);
    eq('robots.txt found', m.robotsPresent, true);
    eq('lang', m.lang, 'el');
    eq('images counted', m.imageCount, 3);
    eq('alt coverage', m.altCoverage, 0.67);
    eq('render-blocking scripts', m.renderBlockingScripts, 2);
    eq('third-party hosts', m.thirdPartyHosts.length, 1);
    eq('hreflang alternates', m.hreflangCount, 3);
    ok('word count is real', m.wordCount > 500, m.wordCount);
    ok('internal links counted', m.internalLinks >= 4, m.internalLinks);
    ok('JSON-LD types read', m.jsonLdTypes.includes('LocalBusiness'), m.jsonLdTypes);

    // -------------------------------------------------------- 3. the verdicts
    console.log('\nchecks and scoring');
    const byId = new Map(result.checks.map((c) => [c.id, c]));
    eq('status check', byId.get('status')?.state, 'pass');
    eq('https check fails on http', byId.get('https')?.state, 'fail');
    eq('sitemap check', byId.get('sitemap')?.state, 'pass');
    eq('notfound check', byId.get('notfound')?.state, 'pass');
    eq('render-blocking check warns at two', byId.get('render_blocking')?.state, 'warn');
    eq('entity schema found', byId.get('entity_schema')?.state, 'pass');
    eq('faq schema found', byId.get('faq_schema')?.state, 'pass');
    eq('llms.txt check', byId.get('llms_txt')?.state, 'pass');
    eq('ai access degraded by the two blocks', byId.get('ai_access')?.state, 'warn');
    eq('img alt warns', byId.get('img_alt')?.state, 'warn');
    // The fixture's LocalBusiness carries a name and a sameAs and nothing
    // else, which is the common real-world shape: type declared, identity
    // absent.
    eq('entity block is thin', byId.get('entity_completeness')?.state, 'fail');
    // Its only item list is an empty BreadcrumbList, which this check
    // deliberately does not count as a published collection.
    eq('no collection to read', byId.get('collection_shape')?.state, 'fail');
    // Two of the three images carry alt and dimensions; the third has neither.
    eq('two usable images warns', byId.get('media_assets')?.state, 'warn');
    ok('score in range', result.score > 0 && result.score < 100, result.score);
    // Four, not five. The AI Mode checks went into the existing ai pillar
    // rather than adding a bar the widget's two-column grid cannot fill.
    eq('pillars reported', result.pillars.length, 4);
    ok(
      'priorities are the non-passing checks',
      result.priorities.every((p) => p.state !== 'pass'),
      result.priorities.map((p) => `${p.id}:${p.state}`),
    );

    console.log('\nAI crawler verdicts');
    const blocked = result.aiAccess.filter((a) => !a.allowed).map((a) => a.token).sort();
    ok('GPTBot and PerplexityBot blocked', JSON.stringify(blocked) === '["GPTBot","PerplexityBot"]', blocked);
    eq('Googlebot still allowed', result.searchAccess.find((a) => a.id === 'googlebot')?.allowed, true);

    // ------------------------------------------------ 4. the SSRF guard holds
    console.log('\nSSRF guard (no seam)');
    let guardCode: string | null = null;
    for await (const event of runAudit(base)) {
      if (event.type === 'error') guardCode = event.code;
    }
    eq('loopback refused without the test seam', guardCode, 'blocked_host');

    // ------------------------------------------------- 5. audit -> estimate
    console.log('\nrecommendation from the measurement');
    const rec = recommendFromAudit(result);
    eq('pages seeded from the sitemap', rec.input.pages, 14);
    ok('reasons cite real figures', rec.reasons.length >= 2, rec.reasons.length);
    ok(
      'the blocked crawlers are named in a reason',
      rec.reasons.some((r) => r.en.includes('GPTBot')),
      rec.reasons.map((r) => r.en),
    );
    // The visitor's own choice of track survives the measurement. Escalating
    // to a rebuild is allowed and says why; silently dropping someone off the
    // website track because their technical score was fine is not.
    eq('a sound site does not move the track', rec.input.track, undefined);
    ok(
      'a website-track visitor keeps it',
      normalizeInput({ track: 'website', ...rec.input }).track === 'website',
      normalizeInput({ track: 'website', ...rec.input }).track,
    );
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }

  // ------------------------------------------------------- 6. robots parsing
  console.log('\nrobots.txt matching');
  const tricky = parseRobots(`
User-agent: *
Disallow: /

User-agent: Googlebot
Allow: /
Disallow: /private/

User-agent: ClaudeBot
Disallow:
`);
  eq('wildcard block applies to an unlisted agent', isAllowed(tricky, 'Bingbot', '/'), false);
  eq('Googlebot allowed by its own group', isAllowed(tricky, 'Googlebot', '/'), true);
  eq('Googlebot still blocked on /private/', isAllowed(tricky, 'Googlebot', '/private/x'), false);
  eq('empty Disallow means allow all', isAllowed(tricky, 'ClaudeBot', '/'), true);
  eq('no robots.txt means allow all', isAllowed(parseRobots(''), 'GPTBot', '/'), true);
  eq(
    'longest match wins',
    isAllowed(parseRobots('User-agent: *\nDisallow: /a/\nAllow: /a/b/'), '*', '/a/b/c'),
    true,
  );
  eq('verdicts cover every listed agent', judgeAgents(tricky, AI_AGENTS).length, AI_AGENTS.length);

  // ------------------------------------------------- 7. a JS shell reads thin
  console.log('\nclient-rendered shell');
  const shell = extractSignals(
    '<!doctype html><html><head><title>App</title></head><body><div id="root"></div><script src="/app.js"></script></body></html>',
    'https://shell.test/',
  );
  eq('no server-rendered words', shell.wordCount, 0);
  eq('no structured data', shell.jsonLd.blocks, 0);

  // ------------------------------------------- 7b. the two AI Mode render rules
  //
  // Three children of one type, or the container is not read as a set. These
  // are the only two claims in the source that are measurable on a page, so
  // the boundary is the thing worth pinning down: two items must fail where
  // three pass, and a mixed list must fail however long it is.
  console.log('\nitem list shape');
  const listMarkup = (items: string) =>
    `<!doctype html><html><body><script type="application/ld+json">
     {"@context":"https://schema.org","@type":"ItemList","itemListElement":[${items}]}
     </script></body></html>`;
  const entry = (type: string, i: number) =>
    `{"@type":"ListItem","position":${i},"item":{"@type":"${type}","name":"n${i}"}}`;

  const three = extractSignals(
    listMarkup([1, 2, 3].map((i) => entry('LodgingBusiness', i)).join(',')),
    'https://list.test/',
  );
  const threeVerdict = judgeItemList(
    three.jsonLd.itemLists[0]?.childTypes ?? [],
    three.jsonLd.itemLists[0]?.count ?? 0,
  );
  ok('three of one type is a readable set', threeVerdict.homogeneous && threeVerdict.meetsThreshold, threeVerdict);

  const two = extractSignals(
    listMarkup([1, 2].map((i) => entry('LodgingBusiness', i)).join(',')),
    'https://list.test/',
  );
  const twoVerdict = judgeItemList(
    two.jsonLd.itemLists[0]?.childTypes ?? [],
    two.jsonLd.itemLists[0]?.count ?? 0,
  );
  eq('two is below the threshold', twoVerdict.meetsThreshold, false);
  eq('two of one type is still homogeneous', twoVerdict.homogeneous, true);

  const mixed = extractSignals(
    listMarkup([entry('LodgingBusiness', 1), entry('Restaurant', 2), entry('Event', 3)].join(',')),
    'https://list.test/',
  );
  const mixedVerdict = judgeItemList(
    mixed.jsonLd.itemLists[0]?.childTypes ?? [],
    mixed.jsonLd.itemLists[0]?.count ?? 0,
  );
  eq('mixed types are not homogeneous', mixedVerdict.homogeneous, false);
  eq('mixed types still meet the count', mixedVerdict.meetsThreshold, true);

  const untyped = extractSignals(
    listMarkup([1, 2, 3].map((i) => `{"@type":"ListItem","position":${i},"url":"/u${i}"}`).join(',')),
    'https://list.test/',
  );
  const untypedVerdict = judgeItemList(
    untyped.jsonLd.itemLists[0]?.childTypes ?? [],
    untyped.jsonLd.itemLists[0]?.count ?? 0,
  );
  eq('entries with no type are untyped', untypedVerdict.typed, false);

  // A breadcrumb is an item list. Counting it would make every site with a
  // breadcrumb look like it publishes a collection.
  const crumb = extractSignals(
    `<!doctype html><html><body><script type="application/ld+json">
     {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"https://a.test/"},
      {"@type":"ListItem","position":2,"name":"Rooms","item":"https://a.test/rooms"},
      {"@type":"ListItem","position":3,"name":"Suite","item":"https://a.test/rooms/suite"}]}
     </script></body></html>`,
    'https://a.test/',
  );
  eq('breadcrumbs are not a collection', crumb.jsonLd.itemLists.length, 0);
  eq('but they are still a breadcrumb', crumb.jsonLd.hasBreadcrumb, true);

  console.log('\nentity completeness and tables');
  const filled = extractSignals(
    `<!doctype html><html><body><script type="application/ld+json">
     {"@context":"https://schema.org","@type":"Hotel","name":"N","url":"https://h.test/",
      "address":{"@type":"PostalAddress","addressLocality":"Chania"},"telephone":"+30",
      "priceRange":"EUR","sameAs":["https://facebook.com/h"]}
     </script>
     <table><tr><th>Model</th><th>Seats</th></tr><tr><td>A</td><td>4</td></tr><tr><td>B</td><td>5</td></tr></table>
     <table><tr><td>layout</td></tr></table>
     </body></html>`,
    'https://h.test/',
  );
  eq('entity type is recorded verbatim', filled.jsonLd.entityType, 'Hotel');
  ok(
    'a Hotel is measured against the lodging profile',
    groundingProfileFor(filled.jsonLd.entityType ?? '')?.schemaType === 'LodgingBusiness',
    groundingProfileFor(filled.jsonLd.entityType ?? '')?.schemaType,
  );
  ok(
    'its filled properties are counted',
    filled.jsonLd.entityProps.length >= 5,
    filled.jsonLd.entityProps,
  );
  eq('only the parallel table counts', filled.dataTables, 1);

  // ------------------------------------------------------- 8. the cost model
  console.log('\ncost model');
  const websiteOnly = buildEstimate({
    track: 'website',
    pages: 5,
    languages: 1,
    features: [],
    auditDepth: 'none',
    maintenance: false,
  });
  eq(
    'five pages price as the entry tier',
    websiteOnly.oneOffNet,
    currentPrice(websitePackages[0]),
  );
  eq('no retainer, no monthly', websiteOnly.monthlyNet, 0);
  eq('VAT applied to the one-off', websiteOnly.oneOffGross, withVat(websiteOnly.oneOffNet));

  const bigger = buildEstimate({
    track: 'website',
    pages: 8,
    languages: 1,
    features: [],
    auditDepth: 'none',
    maintenance: false,
  });
  eq(
    'eight pages move up a tier',
    bigger.websiteTier?.id,
    websitePackages[1].id,
  );
  ok('and cost more', bigger.oneOffNet > websiteOnly.oneOffNet, [websiteOnly.oneOffNet, bigger.oneOffNet]);

  const extraPages = buildEstimate({
    track: 'website',
    pages: 30,
    languages: 1,
    features: [],
    auditDepth: 'none',
    maintenance: false,
  });
  eq('thirty pages land on the top tier', extraPages.websiteTier?.id, websitePackages[2].id);
  eq(
    'five pages past the top tier bill at the page rate',
    extraPages.oneOffNet,
    currentPrice(websitePackages[2]) + 5 * 180,
  );

  const seoOnly = buildEstimate({
    track: 'seo',
    seoTier: 'growth',
    contentPagesPerMonth: 2,
    auditDepth: 'technical',
    maintenance: false,
  });
  eq('retainer matches the price list', seoOnly.monthlyNet, currentPrice(seoPackages[1]) + 2 * 180);
  eq('audit is a one-off', seoOnly.oneOffNet, 450);
  eq('a retainer is flagged', seoOnly.hasRetainer, true);
  eq('the band sits on the build, not the retainer', seoOnly.oneOffHighNet, Math.round(450 * 1.15));

  // The regression that matters commercially: no figure the visitor sees may
  // be a multiple of the retainer. The minimum-term value exists for our own
  // qualification and travels with the brief, never onto the screen.
  eq('minimum term matches company policy', seoOnly.minTermMonths, SEO_MIN_TERM_MONTHS);
  eq(
    'the qualification figure is build plus the minimum term',
    seoOnly.minTermNet,
    seoOnly.oneOffNet + seoOnly.monthlyNet * SEO_MIN_TERM_MONTHS,
  );
  const visitorFacing = [
    seoOnly.oneOffNet,
    seoOnly.monthlyNet,
    seoOnly.oneOffGross,
    seoOnly.monthlyGross,
    seoOnly.oneOffLowNet,
    seoOnly.oneOffHighNet,
  ];
  ok(
    'nothing on screen multiplies the retainer',
    visitorFacing.every((figure) => figure < seoOnly.monthlyNet * 2),
    visitorFacing,
  );

  const websiteNoRetainer = buildEstimate({ track: 'website', pages: 5, auditDepth: 'none' });
  eq('a build-only scope has no retainer', websiteNoRetainer.hasRetainer, false);

  const clamped = buildEstimate({ track: 'seo', pages: -5, contentPagesPerMonth: 99 });
  ok(
    'out-of-range input is clamped, not crashed',
    clamped.monthlyNet === currentPrice(seoPackages[1]) + 8 * 180,
    clamped.monthlyNet,
  );

  const ecommerce = buildEstimate({
    track: 'website',
    pages: 5,
    features: ['ecommerce', 'blog'],
    auditDepth: 'none',
  });
  eq(
    'e-commerce bills, blog does not',
    ecommerce.oneOffNet,
    currentPrice(websitePackages[0]) + 1200,
  );

  console.log(`\n${checks - failures}/${checks} passed`);
  if (failures > 0) {
    console.log(`${failures} FAILED`);
    process.exitCode = 1;
  }
}

await main();
