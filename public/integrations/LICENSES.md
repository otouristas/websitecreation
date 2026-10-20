# Licenses and attributions for the vendored brand marks

The marks in `marks.tsx` are copied from two open-source icon packs. Metadata (`<title>`, `style`,
`width`/`height`, `xmlns`) is stripped, `viewBox` is kept, gradient ids are namespaced per instance and
repeated path data is shared. Path geometry is unchanged. Each mark in `marks.tsx` is preceded by a comment
naming its source file. The full MIT notice also sits in a `/*! @license */` header at the top of `marks.tsx`,
so it survives minification into the built chunk.

How marks are colored at render time (`paint` in `marks.tsx`, applied by `BrandLogo.tsx`):

- Multi-color marks (Gemini, Copilot, Bing, Google, Mistral, Microsoft) keep their own fills.
- Single-color marks are painted with the brand color from `brands.ts`. That includes the LobeHub
  `meta.svg` and `metaai.svg` marks, which are painted `#0866FF`, and the Claude, Perplexity and DeepSeek marks.
- Black or near-black marks (ChatGPT, Grok, xAI, Anthropic, X, TikTok, Apple, Threads, Medium, Vercel,
  GitHub, ...) are painted with `currentColor`, so they follow the text color and stay visible in dark mode.
- Mid-dark brand colors that would fall below 3:1 on the dark card surface (for example Baidu, Google News,
  Pinterest) get a lighter tint of the same hue in dark mode only.
- The `mono` variant paints any mark as a single-color silhouette in `currentColor`.

All product names, logos and brands are property of their respective owners; used only to identify platforms.

## @lobehub/icons-static-svg 1.95.1 (MIT)

Source: https://github.com/lobehub/lobe-icons (npm: `@lobehub/icons-static-svg`).

Marks used: `claude` (claude-color.svg), `gemini` (gemini-color.svg + gemini.svg), `perplexity`
(perplexity-color.svg), `copilot` (copilot-color.svg + copilot.svg), `bing` (bing-color.svg + bing.svg),
`google` (google-color.svg + google.svg), `deepseek` (deepseek-color.svg), `mistral` (mistral-color.svg +
mistral.svg), `microsoft` (microsoft-color.svg + microsoft.svg), `chatgpt` (openai.svg), `grok` (grok.svg),
`xai` (xai.svg), `meta` (meta.svg), `meta_ai` (metaai.svg).

The npm package ships without a separate LICENSE file; its `package.json` declares `"license": "MIT"` and
its README states "Copyright (c) 2023 LobeHub. This project is MIT licensed." The standard MIT text follows.

```
MIT License

Copyright (c) 2023 LobeHub

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

## simple-icons 16.34.0 (CC0 1.0)

Source: https://github.com/simple-icons/simple-icons (npm: `simple-icons`). The Simple Icons project is
released under CC0 1.0 Universal (public domain dedication, https://creativecommons.org/publicdomain/zero/1.0/),
so no attribution is required; it is given here as a courtesy. Simple Icons stresses that CC0 covers the
project, not the trademarks the icons depict. Their disclaimer
(https://github.com/simple-icons/simple-icons/blob/develop/DISCLAIMER.md) asks users to respect each brand's
guidelines; none of the icons used here carries a custom license entry in the pack's `simple-icons.json`.

The monochrome Simple Icons paths are painted with the brand hex from `simple-icons.json` (see `brands.ts`);
near-black marks use `currentColor` so they stay visible in dark mode.

Marks used: `google_search_console` (googlesearchconsole.svg), `google_analytics` (googleanalytics.svg),
`google_maps` (googlemaps.svg), `google_ads` (googleads.svg), `google_news` (googlenews.svg), `google_play`
(googleplay.svg), `app_store` (appstore.svg), `apple` (apple.svg), `gmail` (gmail.svg), `youtube`
(youtube.svg), `reddit` (reddit.svg), `facebook` (facebook.svg), `instagram` (instagram.svg), `x` (x.svg),
`tiktok` (tiktok.svg), `pinterest` (pinterest.svg), `duckduckgo` (duckduckgo.svg), `baidu` (baidu.svg),
`naver` (naver.svg), `brave` (brave.svg), `ecosia` (ecosia.svg), `startpage` (startpage.svg), `qwant`
(qwant.svg), `kagi` (kagi.svg), `wordpress` (wordpress.svg), `shopify` (shopify.svg), `semrush`
(semrush.svg), `trustpilot` (trustpilot.svg), `tripadvisor` (tripadvisor.svg), `anthropic` (anthropic.svg),
`vercel` (vercel.svg), `supabase` (supabase.svg), `stripe` (stripe.svg), `similarweb` (similarweb.svg),
`whatsapp` (whatsapp.svg), `telegram` (telegram.svg), `discord` (discord.svg), `threads` (threads.svg),
`bluesky` (bluesky.svg), `medium` (medium.svg), `quora` (quora.svg), `substack` (substack.svg),
`hacker_news` (ycombinator.svg), `product_hunt` (producthunt.svg), `stack_overflow` (stackoverflow.svg),
`github` (github.svg), `g2` (g2.svg), `ebay` (ebay.svg).

## Brands drawn as initials tiles

These brands render as a plain initials tile on an approximate brand color (text color chosen for at least
4.5:1 contrast). We do not draw imitations of their logos.

- Ahrefs, DataForSEO, LinkedIn, Yahoo, Amazon and Walmart are in neither pack.
- Yandex (in `@lobehub/icons-static-svg`) and Booking.com (in `simple-icons`) are in the packs but are not
  vendored yet; they are deliberately shown as initials tiles until they are copied in like the other marks.

## Google AI Overviews and Google AI Mode

Neither has a mark of its own in either pack. Both show the unmodified Google mark (`google-color.svg`), with
their own names as the accessible label. We do not crop or combine marks into a new emblem, and the Gemini
mark stays reserved for the Gemini engine.

## Updating

Re-copy marks from newer pack versions rather than redrawing them, re-check each icon's license entry in
`simple-icons.json`, and update the versions here and in the `@license` header of `marks.tsx`.

## Task handoff marks

Cursor, Codex and Antigravity are vendored from LobeHub lobe-icons at commit `bcdb7c82792a854c2967f7328e11a30205ea584d` (MIT), respectively `cursor.svg`, `codex.svg`, `antigravity-color.svg`. Vector sources are in `public/brands/task-ai/` and `ios/docs/service-logo-sources/`. Native 96px PNGs are rendered from those exact vectors. Cursor/Codex use adaptive monochrome; Antigravity retains its original colors. The existing MIT notice above applies.
