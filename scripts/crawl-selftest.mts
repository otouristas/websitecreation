/**
 * Self-test for the bounded site crawl.
 *
 * Run with `npm run test:crawl`.
 *
 * Boots a fixture site on loopback that contains, on purpose, one of each
 * thing the crawl exists to find: a broken internal link, a redirect, two
 * pages sharing a title, two more sharing a description, a near-duplicate
 * pair, a page listed in the sitemap that nothing links to, a noindexed page,
 * a thin page, and a section disallowed in robots.txt. Then it drives the real
 * crawler over a real socket and asserts every one of them is reported.
 *
 * A crawler is the kind of code that looks right and silently crawls three
 * pages, or the same page forty times. Only a fixture with known answers
 * catches that.
 */

import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { runCrawl } from '../src/lib/audit/crawl-run';
import { crawlKey, extractCrawlableLinks } from '../src/lib/audit/crawl';
import type { CrawlResult } from '../src/lib/audit/crawl-run';

let failures = 0;
let checks = 0;

function ok(label: string, condition: boolean, detail?: unknown): void {
  checks += 1;
  if (condition) console.log(`  ✓ ${label}`);
  else {
    failures += 1;
    console.log(`  ✗ ${label}${detail === undefined ? '' : ` — got ${JSON.stringify(detail)}`}`);
  }
}

function eq(label: string, actual: unknown, expected: unknown): void {
  ok(`${label} = ${JSON.stringify(expected)}`, Object.is(actual, expected), actual);
}

const WORDS = (n: number, seed: string) =>
  Array.from({ length: n }, (_, i) => `${seed}${i}`).join(' ');

function page(opts: {
  title: string;
  description?: string;
  h1?: string;
  body: string;
  links?: string[];
  noindex?: boolean;
  canonical?: string;
}): string {
  return `<!doctype html><html lang="el"><head>
<meta charset="utf-8"><title>${opts.title}</title>
${opts.description ? `<meta name="description" content="${opts.description}">` : ''}
${opts.noindex ? '<meta name="robots" content="noindex">' : ''}
${opts.canonical ? `<link rel="canonical" href="${opts.canonical}">` : ''}
</head><body><main>
<h1>${opts.h1 ?? opts.title}</h1>
<p>${opts.body}</p>
<nav>${(opts.links ?? []).map((h) => `<a href="${h}">${h}</a>`).join('')}</nav>
</main></body></html>`;
}

async function main(): Promise<void> {
  const NAV = ['/', '/rooms', '/prices', '/contact'];

  const server = createServer((req, res) => {
    const path = (req.url ?? '/').split('?')[0];
    const html = (body: string, status = 200) => {
      res.writeHead(status, { 'content-type': 'text/html; charset=utf-8' });
      res.end(body);
    };

    switch (path) {
      case '/':
        return html(page({
          title: 'Ξενοδοχείο στα Χανιά',
          description: 'Μικρό ξενοδοχείο στα Χανιά με θέα και πρωινό στο δωμάτιο κάθε πρωί για τους επισκέπτες.',
          body: WORDS(300, 'a'),
          links: [...NAV, '/offers', '/old-page', '/hidden/secret', '/twin-a', '/twin-b', '/thin', '/noindexed', '/missing'],
        }));
      case '/rooms':
        return html(page({ title: 'Δωμάτια', description: 'Τα δωμάτιά μας με θέα στη θάλασσα και όλες τις ανέσεις που χρειάζεστε.', body: WORDS(300, 'b'), links: NAV }));
      case '/prices':
        // Shares a title with /contact, and a description with /twin-a.
        return html(page({ title: 'Πληροφορίες', description: 'Η ίδια περιγραφή παντού σε αυτό το site χωρίς καμία απολύτως διαφοροποίηση.', body: WORDS(300, 'c'), links: NAV }));
      case '/contact':
        return html(page({ title: 'Πληροφορίες', description: 'Η ίδια περιγραφή παντού σε αυτό το site χωρίς καμία απολύτως διαφοροποίηση.', body: WORDS(300, 'd'), links: NAV }));
      case '/twin-a':
        return html(page({ title: 'Ενοικίαση σκάφους Χανιά', description: 'Ενοικίαση σκάφους στα Χανιά με καπετάνιο ή χωρίς, καθημερινές αναχωρήσεις από το λιμάνι.', h1: 'Ενοικίαση σκάφους Χανιά', body: WORDS(200, 'e'), links: NAV }));
      case '/twin-b':
        return html(page({ title: 'Ενοικίαση σκάφους Χανιά', description: 'Ενοικίαση σκάφους στα Χανιά με καπετάνιο ή χωρίς, καθημερινές αναχωρήσεις από το λιμάνι.', h1: 'Ενοικίαση σκάφους Χανιά', body: WORDS(205, 'f'), links: NAV }));
      case '/thin':
        return html(page({ title: 'Λίγα λόγια', description: 'Μια σελίδα με ελάχιστο περιεχόμενο που δεν δίνει τίποτα στις μηχανές αναζήτησης.', body: WORDS(20, 'g'), links: NAV }));
      case '/noindexed':
        return html(page({ title: 'Κρυφή σελίδα', description: 'Αυτή η σελίδα φέρει noindex και δεν πρέπει να εμφανίζεται στο ευρετήριο ποτέ.', body: WORDS(300, 'h'), noindex: true, links: NAV }));
      case '/orphan':
        // In the sitemap, linked from nowhere.
        return html(page({ title: 'Ορφανή σελίδα', description: 'Υπάρχει στο sitemap αλλά καμία σελίδα δεν τη συνδέει πουθενά στο site.', body: WORDS(300, 'i'), links: NAV }));
      case '/old-page':
        res.writeHead(301, { location: '/offers' });
        return res.end();
      case '/offers':
        return html(page({ title: 'Προσφορές', description: 'Οι τρέχουσες προσφορές μας για διαμονή με πρωινό και δωρεάν ακύρωση έως την άφιξη.', body: WORDS(300, 'j'), links: NAV }));
      case '/hidden/secret':
        return html(page({ title: 'Δεν πρέπει να σαρωθεί', body: WORDS(300, 'k'), links: NAV }));
      case '/robots.txt':
        res.writeHead(200, { 'content-type': 'text/plain' });
        return res.end(`User-agent: *\nDisallow: /hidden/\n\nSitemap: http://${req.headers.host}/sitemap.xml\n`);
      case '/sitemap.xml': {
        const urls = ['/', '/rooms', '/prices', '/contact', '/offers', '/twin-a', '/twin-b', '/thin', '/orphan'];
        res.writeHead(200, { 'content-type': 'application/xml' });
        return res.end(
          `<?xml version="1.0"?><urlset>${urls.map((u) => `<url><loc>http://${req.headers.host}${u}</loc></url>`).join('')}</urlset>`,
        );
      }
      default:
        return html('<!doctype html><title>404</title><h1>Not found</h1>', 404);
    }
  });

  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address() as AddressInfo;
  const base = `http://127.0.0.1:${port}`;
  const guard = async (hostname: string): Promise<void> => {
    if (hostname !== '127.0.0.1') throw new Error('self-test guard: loopback only');
  };

  try {
    console.log('\nrunCrawl against the fixture site');
    const phases: string[] = [];
    const pageEvents: string[] = [];
    let result: CrawlResult | null = null;
    let error: string | null = null;

    for await (const event of runCrawl(base, { maxUrls: 40, guard })) {
      if (event.type === 'result') result = event.result;
      else if (event.type === 'error') error = event.code;
      else if (event.type === 'phase' && event.state !== 'start') phases.push(`${event.id}:${event.state}`);
      else if (event.type === 'page') pageEvents.push(new URL(event.page.url).pathname);
    }

    ok('no error event', error === null, error);
    if (!result) {
      console.log('  ✗ crawl produced no result');
      failures += 1;
      return;
    }

    ok('every phase reported', ['resolve', 'robots', 'sitemap', 'crawl', 'analyse'].every((id) => phases.some((p) => p.startsWith(`${id}:`))), phases);
    ok('pages streamed as they landed', pageEvents.length === result.pages.length, [pageEvents.length, result.pages.length]);

    const paths = result.pages.map((p) => new URL(p.url).pathname).sort();
    console.log(`  · crawled ${paths.length}: ${paths.join(' ')}`);

    // ------------------------------------------------------- crawl mechanics
    console.log('\ncrawl mechanics');
    ok('followed links beyond the homepage', result.pages.length >= 9, result.pages.length);
    ok('no URL crawled twice', new Set(paths).size === paths.length, paths);
    eq('sitemap found', result.sitemapFound, true);
    eq('sitemap URLs read', result.sitemapUrlCount, 9);
    ok('robots.txt honoured: /hidden/ never fetched', !paths.includes('/hidden/secret'), paths);
    ok('robots disallow counted', result.report.summary.blockedByRobots >= 1, result.report.summary.blockedByRobots);
    ok('the orphan was still reached, via the sitemap', paths.includes('/orphan'), paths);
    ok('depth recorded beyond the root', result.report.stats.maxDepth >= 1, result.report.stats.maxDepth);
    ok('stopped cleanly', result.report.summary.stoppedBy === 'exhausted', result.report.summary.stoppedBy);

    // --------------------------------------------------- site-wide findings
    console.log('\nsite-wide findings');
    const found = new Map(result.report.issues.map((i) => [i.id, i]));
    const has = (id: string) => found.has(id);

    ok('broken internal link reported', has('broken_links'), [...found.keys()]);
    ok('  …and it names /missing', (found.get('broken_links')?.urls ?? []).some((u) => u.includes('/missing')), found.get('broken_links')?.urls);
    ok('  …and names the page that links it', (found.get('broken_links')?.urls ?? []).some((u) => u.includes('from')), found.get('broken_links')?.urls);
    ok('redirect reported', has('internal_redirects'), found.get('internal_redirects')?.urls);
    ok('duplicate titles reported', has('duplicate_titles'), found.get('duplicate_titles')?.urls);
    ok('duplicate descriptions reported', has('duplicate_descriptions'), found.get('duplicate_descriptions')?.urls);
    ok('near-duplicate pair reported', has('near_duplicate_content'), found.get('near_duplicate_content')?.urls);
    ok(
      '  …and it is twin-a ≈ twin-b',
      (found.get('near_duplicate_content')?.urls ?? []).some((u) => u.includes('twin-a') && u.includes('twin-b')),
      found.get('near_duplicate_content')?.urls,
    );
    ok('orphan page reported', has('orphan_pages'), found.get('orphan_pages')?.urls);
    ok('  …and it is /orphan', (found.get('orphan_pages')?.urls ?? []).some((u) => u.includes('/orphan')), found.get('orphan_pages')?.urls);
    ok('noindex reported', has('noindexed_pages'), found.get('noindexed_pages')?.urls);
    ok('thin page reported', has('thin_content'), found.get('thin_content')?.urls);
    ok('  …and it is /thin', (found.get('thin_content')?.urls ?? []).some((u) => u.includes('/thin')), found.get('thin_content')?.urls);
    ok('missing canonicals reported', has('missing_canonicals'), found.get('missing_canonicals')?.count);
    ok('no structured data reported', has('no_structured_data'), found.get('no_structured_data')?.count);
    ok('critical findings sort first', result.report.issues[0]?.severity === 'critical', result.report.issues.map((i) => i.severity));

    // A page that is fine must NOT be flagged.
    ok(
      '/rooms is not called thin',
      !(found.get('thin_content')?.urls ?? []).some((u) => u.includes('/rooms')),
      found.get('thin_content')?.urls,
    );
    ok(
      'unique titles are not called duplicates',
      !(found.get('duplicate_titles')?.urls ?? []).some((u) => u.includes('Δωμάτια')),
      found.get('duplicate_titles')?.urls,
    );

    console.log('\nstats');
    ok('average TTFB measured', result.report.stats.avgTtfbMs >= 0 && result.report.stats.avgTtfbMs < 3000, result.report.stats.avgTtfbMs);
    ok('average word count measured', result.report.stats.avgWordCount > 50, result.report.stats.avgWordCount);
    eq('broken count', result.report.stats.broken, 1);
    ok('bytes accumulated', result.report.stats.totalBytes > 1000, result.report.stats.totalBytes);

    // ------------------------------------------------------------- budgets
    console.log('\nbudgets');
    let capped = 0;
    for await (const event of runCrawl(base, { maxUrls: 5, guard })) {
      if (event.type === 'page') capped += 1;
    }
    eq('a URL cap is obeyed', capped, 5);

    console.log('\nthe SSRF guard still holds');
    let guardCode: string | null = null;
    for await (const event of runCrawl(base)) {
      if (event.type === 'error') guardCode = event.code;
    }
    eq('loopback refused without the test seam', guardCode, 'blocked_host');
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }

  // ------------------------------------------------------ URL normalisation
  console.log('\nURL normalisation');
  const k = (u: string) => crawlKey(new URL(u));
  eq('trailing slash collapses', k('https://a.gr/about/'), k('https://a.gr/about'));
  eq('hash is dropped', k('https://a.gr/about#top'), k('https://a.gr/about'));
  eq('tracking params are dropped', k('https://a.gr/about?utm_source=x&fbclid=y'), k('https://a.gr/about'));
  eq('real params are kept', k('https://a.gr/s?q=1'), 'https://a.gr/s?q=1');
  eq('param order does not matter', k('https://a.gr/s?b=2&a=1'), k('https://a.gr/s?a=1&b=2'));
  ok('root keeps its slash', k('https://a.gr/') === 'https://a.gr/', k('https://a.gr/'));

  console.log('\nlink extraction');
  const root = new URL('https://a.gr/');
  const links = extractCrawlableLinks(
    `<a href="/one">1</a><a href="https://a.gr/two">2</a><a href="https://www.a.gr/three">3</a>
     <a href="https://other.gr/x">x</a><a href="/img.png">img</a><a href="mailto:a@b.gr">m</a>
     <a href="#top">t</a><a href="/one/">dup</a><a href="/style.css">css</a>`,
    'https://a.gr/page',
    root,
  );
  ok('internal pages kept', links.some((l) => l.endsWith('/one')) && links.some((l) => l.endsWith('/two')), links);
  ok('www treated as the same site', links.some((l) => l.includes('/three')), links);
  ok('external dropped', !links.some((l) => l.includes('other.gr')), links);
  ok('assets dropped', !links.some((l) => /\.(png|css)$/.test(l)), links);
  ok('mailto and anchors dropped', !links.some((l) => l.includes('mailto') || l.includes('#')), links);
  eq('slash variants collapse to one entry', links.filter((l) => l.endsWith('/one')).length, 1);

  console.log(`\n${checks - failures}/${checks} passed`);
  if (failures > 0) {
    console.log(`${failures} FAILED`);
    process.exitCode = 1;
  }
}

await main();
