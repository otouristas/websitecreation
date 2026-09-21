# AnotherSEOGuru marketing site (Next.js)

**Canonical repo:** [github.com/otouristas/websitecreation](https://github.com/otouristas/websitecreation)  
**Production:** [anotherseoguru.com](https://anotherseoguru.com)

This folder is a clone of `websitecreation`, nested inside the `gsc-gemini-boost` monorepo for convenience.  
The **Vite app** in the parent repo (`npm run dev:app`) is the product dashboard — **not** the public marketing site.

## Local development

From this folder:

```bash
cp .env.local.example .env.local   # if missing
npm install
npm run dev
```

Open **http://localhost:8080** (marketing).

From the parent `gsc-gemini-boost` repo:

```bash
npm run dev          # same — starts this Next.js site on :8080
npm run dev:app      # Vite dashboard on http://localhost:8081
npm run dev:all      # marketing + dashboard together
```

Edit the homepage in `src/app/page.tsx`. Deploy from this repo to Vercel (see `websitecreation-seven.vercel.app`).

## Design system

The whole visual language lives in `src/app/globals.css` (Tailwind v4, CSS-first: tokens in `@theme inline`, dark theme on `:root`, light theme on `.light`, `@utility` recipes for the ground, blooms, glass and reveals) and in `src/components/landing/primitives.tsx`. Dark is the default; the toggle adds `.light` to `<html>`.

Fonts load through [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) in `src/app/[locale]/layout.tsx`: Inter Tight (display), Inter (text) and JetBrains Mono (micro-labels). All three ship Greek subsets.

The homepage's instant scan posts to `src/app/api/scan/route.ts`, which fetches the visitor's homepage server-side (public hosts only) and scores thirteen checks from `src/lib/scan/`.

The AI-visibility check at `/[locale]/ai-visibility-check` posts to `src/app/api/search-preview/route.ts`, which runs one keyword through DataForSEO (`src/lib/search-preview/`) and returns three panels: the Google organic results, the AI Overview above them, and a ChatGPT answer with its citations. It needs `DATAFORSEO_LOGIN` and `DATAFORSEO_PASSWORD`; without them the tool renders its worked example and says live checks are off. Every check is a paid API call, so the route caches per keyword for twelve hours, limits each IP to six an hour, and stops at `SEARCH_PREVIEW_DAILY_LIMIT` (120) checks a day.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
