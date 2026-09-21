# Third-party notices

## LibreCrawl

`src/lib/audit/crawl.ts` and `src/lib/audit/site-checks.ts` adapt work from
**LibreCrawl** — <https://github.com/PhialsBasement/LibreCrawl>.

What is adapted, specifically:

- The crawl model: a frontier keyed by normalised URL, a depth recorded per
  entry, a worker pool draining it, and sitemap URLs seeded into the frontier
  alongside the homepage.
- The near-duplicate page detector: a weighted Dice comparison over title,
  meta-description and H1 token sets (0.35 / 0.35 / 0.20), a word-count length
  term (0.10), and the short-circuit that abandons a pair as soon as the
  remaining weights cannot reach the threshold.
- The shape of the per-page issue set, which informed which findings are worth
  reporting.

It is a rewrite rather than a port: LibreCrawl is Python, threaded,
database-backed, renders JavaScript through Playwright and crawls without a
fixed bound; ours is TypeScript, runs inside a single serverless request, and
is bounded by URL count, depth and wall clock. No LibreCrawl source is
vendored in this repository.

```
MIT License

Copyright (c) 2025 Phiality

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
