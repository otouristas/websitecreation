import { extractSignals } from './signals';
import { probe, tryProbe } from './probe';
import {
  ABSENT_ROBOTS,
  AI_AGENTS,
  SEARCH_AGENTS,
  judgeAgents,
  parseRobots,
  readSitemap,
  type RobotsFile,
} from './robots';
import { buildChecks, scorePillars } from './checks';
import type { AuditEvent, AuditMetrics, AuditResult } from './types';
import { normalizeUrl, ScanError } from '@/lib/scan/ssrf';

/**
 * The audit, as a stream of events.
 *
 * An async generator rather than one fat promise, because the point of this
 * feature is that the visitor watches real work happen. Every `step` event is
 * emitted at the moment that probe actually settles - nothing is paced, padded
 * or replayed on a timer. A slow host looks slow, which is itself the finding.
 *
 * Budget: the homepage gets the largest slice because it is the only probe
 * whose failure ends the audit; the satellite probes run concurrently after
 * robots.txt lands (it names the sitemap) and each one degrades to "absent"
 * rather than taking the audit down with it.
 */

const HOMEPAGE_TIMEOUT_MS = 10_000;
const SATELLITE_TIMEOUT_MS = 5_000;
const HOMEPAGE_MAX_BYTES = 1_500_000;

/** Yields each promise as it settles, so the slowest probe never gates the rest. */
async function* asSettled<T>(
  entries: readonly { id: string; run: Promise<T> }[],
): AsyncGenerator<{ id: string; value: T | null }> {
  const pending = new Map(
    entries.map((entry) => [
      entry.id,
      entry.run.then(
        (value) => ({ id: entry.id, value: value as T | null }),
        () => ({ id: entry.id, value: null }),
      ),
    ]),
  );
  while (pending.size > 0) {
    const settled = await Promise.race(pending.values());
    pending.delete(settled.id);
    yield settled;
  }
}

function originOf(url: URL): string {
  return `${url.protocol}//${url.host}`;
}

export interface RunAuditOptions {
  /** Test-only seam; see `ProbeOptions.guard`. The route never passes it. */
  readonly guard?: (hostname: string) => Promise<unknown>;
}

export async function* runAudit(
  input: string,
  options: RunAuditOptions = {},
): AsyncGenerator<AuditEvent> {
  const startedAll = performance.now();
  const { guard } = options;

  // ------------------------------------------------------------- 1. resolve
  yield { type: 'step', id: 'resolve', state: 'start' };
  let target: URL;
  try {
    target = normalizeUrl(input);
  } catch (err) {
    yield { type: 'error', code: err instanceof ScanError ? err.code : 'invalid_url' };
    return;
  }
  yield { type: 'step', id: 'resolve', state: 'done', detail: target.hostname };

  // ------------------------------------------------------------ 2. homepage
  yield { type: 'step', id: 'homepage', state: 'start' };
  let home;
  try {
    home = await probe(target, {
      timeoutMs: HOMEPAGE_TIMEOUT_MS,
      maxBytes: HOMEPAGE_MAX_BYTES,
      guard,
    });
  } catch (err) {
    yield { type: 'error', code: err instanceof ScanError ? err.code : 'unreachable' };
    return;
  }

  const contentType = home.headers['content-type'] ?? '';
  if (!/text\/html|application\/xhtml\+xml/i.test(contentType)) {
    yield { type: 'error', code: 'not_html' };
    return;
  }

  const finalUrl = new URL(home.url);
  const origin = originOf(finalUrl);
  yield {
    type: 'step',
    id: 'homepage',
    state: 'done',
    detail: `HTTP ${home.status} · ${Math.round(home.ttfbMs)} ms`,
  };
  yield { type: 'metric', id: 'ttfbMs', value: String(Math.round(home.ttfbMs)) };

  // --------------------------------------------------------------- 3. parse
  yield { type: 'step', id: 'parse', state: 'start' };
  const signals = extractSignals(home.body, home.url);
  yield {
    type: 'step',
    id: 'parse',
    state: 'done',
    detail: `${signals.wordCount} words · ${signals.images.total} images · ${signals.links.internal} links`,
  };

  // -------------------------------------------------------------- 4. robots
  yield { type: 'step', id: 'robots', state: 'start' };
  const robotsProbe = await tryProbe(`${origin}/robots.txt`, {
    timeoutMs: SATELLITE_TIMEOUT_MS,
    maxBytes: 300_000,
    accept: 'text/plain,*/*;q=0.5',
    guard,
  });
  const robotsOk =
    robotsProbe !== null &&
    robotsProbe.status >= 200 &&
    robotsProbe.status < 300 &&
    !/text\/html/i.test(robotsProbe.headers['content-type'] ?? '');
  const robots: RobotsFile = robotsOk ? parseRobots(robotsProbe.body) : ABSENT_ROBOTS;
  yield {
    type: 'step',
    id: 'robots',
    state: robots.present ? 'done' : 'skip',
    detail: robots.present
      ? `${robots.groups.length} groups · ${robots.sitemaps.length} sitemaps`
      : 'no robots.txt',
  };

  // ------------------------------------------- 5-7. sitemap, llms.txt, 404
  const sitemapUrl = robots.sitemaps[0] ?? `${origin}/sitemap.xml`;
  const probeUrl = `${origin}/aseo-audit-${Date.now().toString(36)}-404`;

  yield { type: 'step', id: 'sitemap', state: 'start' };
  yield { type: 'step', id: 'ai', state: 'start' };
  yield { type: 'step', id: 'notfound', state: 'start' };

  let sitemapUrls: number | null = null;
  let sitemapIsIndex = false;
  let llmsTxt = false;
  let notFoundStatus: number | null = null;

  const satellites = asSettled([
    {
      id: 'sitemap',
      run: tryProbe(sitemapUrl, {
        timeoutMs: SATELLITE_TIMEOUT_MS,
        maxBytes: 600_000,
        accept: 'application/xml,text/xml,*/*;q=0.5',
        guard,
      }),
    },
    {
      id: 'ai',
      run: tryProbe(`${origin}/llms.txt`, {
        timeoutMs: SATELLITE_TIMEOUT_MS,
        maxBytes: 100_000,
        accept: 'text/plain,text/markdown,*/*;q=0.5',
        guard,
      }),
    },
    {
      id: 'notfound',
      run: tryProbe(probeUrl, {
        timeoutMs: SATELLITE_TIMEOUT_MS,
        maxBytes: 4_000,
        maxRedirects: 2,
        guard,
      }),
    },
  ]);

  for await (const settled of satellites) {
    const res = settled.value;
    if (settled.id === 'sitemap') {
      const usable =
        res !== null &&
        res.status >= 200 &&
        res.status < 300 &&
        !/text\/html/i.test(res.headers['content-type'] ?? '') &&
        /<(urlset|sitemapindex)[\s>]/i.test(res.body);
      if (usable && res) {
        const parsed = readSitemap(res.body);
        sitemapUrls = parsed.urls;
        sitemapIsIndex = parsed.isIndex;
      }
      yield {
        type: 'step',
        id: 'sitemap',
        state: sitemapUrls === null ? 'skip' : 'done',
        detail: sitemapUrls === null ? 'no sitemap found' : `${sitemapUrls} URLs${sitemapIsIndex ? ' (index)' : ''}`,
      };
      continue;
    }

    if (settled.id === 'ai') {
      llmsTxt = res !== null && res.status >= 200 && res.status < 300 && !/text\/html/i.test(res.headers['content-type'] ?? '');
      const blocked = judgeAgents(robots, AI_AGENTS).filter((a) => !a.allowed);
      yield {
        type: 'step',
        id: 'ai',
        state: 'done',
        detail: blocked.length === 0 ? 'all answer engines allowed' : `${blocked.length} blocked`,
      };
      continue;
    }

    // A 404 probe that redirects to a real page is a soft 404; the status we
    // report is the one finally served, which is exactly the problem.
    notFoundStatus = res?.status ?? null;
    yield {
      type: 'step',
      id: 'notfound',
      state: notFoundStatus === null ? 'skip' : 'done',
      detail: notFoundStatus === null ? 'not measured' : `HTTP ${notFoundStatus}`,
    };
  }

  // --------------------------------------------------------------- 8. score
  yield { type: 'step', id: 'score', state: 'start' };

  const aiAccess = judgeAgents(robots, AI_AGENTS);
  const searchAccess = judgeAgents(robots, SEARCH_AGENTS);

  const declaredLength = Number(home.headers['content-length'] ?? NaN);
  const compression =
    home.headers['content-encoding'] ??
    (Number.isFinite(declaredLength) && declaredLength > 0 && declaredLength < home.decodedBytes * 0.9
      ? 'gzip/br (inferred)'
      : null);

  const checks = buildChecks({
    signals,
    https: finalUrl.protocol === 'https:',
    status: home.status,
    ttfbMs: home.ttfbMs,
    downloadMs: Math.max(0, home.totalMs - home.ttfbMs),
    htmlBytes: home.decodedBytes,
    redirectHops: home.redirects.length,
    compression,
    hsts: !!home.headers['strict-transport-security'],
    xRobotsTag: home.headers['x-robots-tag'] ?? null,
    robots,
    sitemapUrls,
    llmsTxt,
    notFoundStatus,
    aiAccess,
    searchAccess,
  });

  const { score, grade, pillars, priorities } = scorePillars(checks);

  const metrics: AuditMetrics = {
    ttfbMs: Math.round(home.ttfbMs),
    downloadMs: Math.round(Math.max(0, home.totalMs - home.ttfbMs)),
    totalMs: Math.round(home.totalMs),
    redirectHops: home.redirects.length,
    htmlBytes: home.decodedBytes,
    transferBytes: home.transferBytes,
    compression,
    server: home.headers.server ?? null,
    wordCount: signals.wordCount,
    textRatio: Math.round(signals.textRatio * 1000) / 1000,
    imageCount: signals.images.total,
    altCoverage:
      signals.images.total === 0 ? 1 : Math.round((signals.images.withAlt / signals.images.total) * 100) / 100,
    renderBlockingScripts: signals.scripts.renderBlocking,
    externalScripts: signals.scripts.external,
    thirdPartyHosts: signals.scripts.thirdPartyHosts,
    stylesheets: signals.stylesheets,
    inlineBytes: signals.scripts.inlineBytes + signals.inlineStyleBytes,
    internalLinks: signals.links.uniqueInternal,
    externalLinks: signals.links.external,
    headings: signals.headings.counts,
    jsonLdTypes: signals.jsonLd.types,
    hreflangCount: signals.hreflangCount,
    robotsPresent: robots.present,
    sitemapUrls,
    sitemapIsIndex,
    llmsTxt,
    notFoundStatus,
    title: signals.title,
    description: signals.description,
    lang: signals.lang,
  };

  const result: AuditResult = {
    url: input,
    finalUrl: home.url,
    scannedAt: new Date().toISOString(),
    score,
    grade,
    pillars,
    checks,
    priorities,
    metrics,
    aiAccess,
    searchAccess,
    elapsedMs: Math.round(performance.now() - startedAll),
  };

  yield { type: 'step', id: 'score', state: 'done', detail: `${score}/100` };
  yield { type: 'result', result };
}
