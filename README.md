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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
