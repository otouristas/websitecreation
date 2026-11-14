import type { Metadata } from 'next';
import { geistMono, inter } from '@/brand/typography';
import { THEME_INIT_SCRIPT } from '@/brand/theme';
import { notFound } from 'next/navigation';
import '../globals.css';
import CookieConsent from '@/components/CookieConsent';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import StickyMobileCta from '@/components/StickyMobileCta';
import WhatsAppPill from '@/components/WhatsAppPill';
import SecurityNotice from '@/components/SecurityNotice';
import { Analytics } from '@vercel/analytics/next';
import { isValidLocale } from '@/lib/i18n/locale';
import { CONTACT_EMAIL } from '@/lib/contact-info';
import { APP_ORIGIN, LEGAL_ENTITY_ID, LEGAL_ENTITY_NAME } from '@/data/legal-entity';

const SITE_URL = 'https://anotherseoguru.com';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'el' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEl = locale === 'el';

  // anotherseoguru.com is the product: AnotherSEOGuru App. The agency is a
  // separate business (src/lib/site-split.ts) and is not described here.
  const title = isEl
    ? 'Λογισμικό SEO από το Search Console | AnotherSEOGuru'
    : 'SEO Software for Search Console Fixes | AnotherSEOGuru';
  const description = isEl
    ? 'Δείτε ποιες σελίδες σας έχασαν κλικ στην Google. Ρωτήστε τον Aster AI τι δείχνουν τα στοιχεία του Search Console και επιλέξτε ποια αλλαγή θα κάνετε πρώτη.'
    : 'Find pages losing clicks in Google, ask Aster AI what changed and choose a page to improve. Try AnotherSEOGuru App on your site or explore a sample workspace.';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: '%s',
    },
    description,
    keywords: isEl
      ? [
          'λογισμικό SEO',
          'εργαλείο SEO',
          'Google Search Console',
          'έλεγχος ιστοσελίδας',
          'λέξεις-κλειδιά',
          'ορατότητα σε AI',
          'GEO',
          'AEO',
          'αναφορές SEO',
          'Aster AI',
        ]
      : [
          'SEO software',
          'SEO tool',
          'Google Search Console',
          'site audit',
          'rank tracking',
          'AI visibility',
          'GEO',
          'AEO',
          'white label SEO reports',
          'Aster AI',
        ],
    authors: [{ name: 'AnotherSEOGuru', url: SITE_URL }],
    creator: 'AnotherSEOGuru',
    publisher: 'AnotherSEOGuru',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: isEl ? 'el_GR' : 'en_US',
      alternateLocale: isEl ? ['en_US', 'en_GB'] : ['en_GB', 'el_GR'],
      url: `${SITE_URL}/${locale}`,
      siteName: 'AnotherSEOGuru',
      title,
      description,
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: 'AnotherSEOGuru App: SEO software built on Google Search Console',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@anotherseoguru',
      images: ['/opengraph-image.png'],
    },
    icons: {
      icon: [{ url: '/icon.svg', type: 'image/svg+xml' }, { url: '/favicon.ico' }],
      apple: '/apple-icon.png',
    },
    manifest: '/site.webmanifest',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: ['tkWhNe__BsE39YeIQM5fmGc8Y1W7hzw8RadiokDZquw', 'google57799cfd84f0e265'],
    },
  };
}

/** Site-wide Organization + WebSite JSON-LD (@graph) for rich results and entity clarity */
function buildStructuredDataGraph(isEl: boolean) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'AnotherSEOGuru',
        url: SITE_URL,
        parentOrganization: {
          '@type': 'Organization',
          '@id': LEGAL_ENTITY_ID,
          name: LEGAL_ENTITY_NAME,
        },
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/brand/asg-lockup-on-light@2x.png`,
        },
        description: isEl
          ? 'Το AnotherSEOGuru φτιάχνει το AnotherSEOGuru App: λογισμικό SEO πάνω στο Google Search Console, με διορθώσεις και εκτίμηση κλικ, λέξεις-κλειδιά, ελέγχους ιστοσελίδας, ορατότητα σε AI και τον βοηθό Aster AI. Στο web, iPhone, Android, Chrome και WordPress.'
          : 'AnotherSEOGuru makes AnotherSEOGuru App: SEO software built on Google Search Console, with ranked fixes and click estimates, keywords, site audits, AI visibility and the Aster AI assistant. On the web, iPhone, Android, Chrome and WordPress.',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: CONTACT_EMAIL,
          availableLanguage: ['Greek', 'English'],
        },
        sameAs: [
          'https://www.linkedin.com/company/anotherseoguru',
          'https://twitter.com/anotherseoguru',
          'https://www.youtube.com/@anotherseoguru',
        ],
        knowsAbout: [
          'Search engine optimization',
          'Google Search Console',
          'Technical SEO',
          'Keyword research',
          'Rank tracking',
          'Site audits',
          'Answer Engine Optimization (AEO)',
          'Generative Engine Optimization (GEO)',
          'Generative AI search visibility',
          'SEO reporting',
        ],
        makesOffer: {
          '@type': 'Offer',
          itemOffered: { '@id': `${SITE_URL}/#app` },
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/#app`,
        name: 'AnotherSEOGuru App',
        url: SITE_URL,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, iOS, Android',
        publisher: { '@id': `${SITE_URL}/#organization` },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
          description: isEl ? 'Δωρεάν πλάνο, με αναβάθμιση όποτε θέλετε' : 'Free plan, upgrade any time',
        },
      },
      {
        '@type': 'Organization',
        '@id': LEGAL_ENTITY_ID,
        name: LEGAL_ENTITY_NAME,
        legalName: LEGAL_ENTITY_NAME,
        url: SITE_URL,
        brand: { '@type': 'Brand', name: 'AnotherSEOGuru', url: SITE_URL },
        owns: [
          { '@type': 'WebSite', name: 'AnotherSEOGuru', url: SITE_URL },
          { '@type': 'SoftwareApplication', name: 'AnotherSEOGuru', url: APP_ORIGIN },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'AnotherSEOGuru',
        description: isEl
          ? 'Με το AnotherSEOGuru App βλέπετε ποιες σελίδες αξίζει να βελτιώσετε και ελέγχετε τα κλικ τους πριν και μετά την αλλαγή.'
          : 'AnotherSEOGuru App helps you choose a page to improve and compare its clicks before and after a change.',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: ['en', 'el'],
      },
    ],
  };
}

/**
 * Light is the default: the server renders `.light` on <html>. Only a visitor
 * who explicitly chose dark with the toggle (`theme=dark`) loses it, before
 * first paint so there is no flash. The system setting is ignored.
 */
const themeInitScript = THEME_INIT_SCRIPT;

/**
 * The consent banner is server-rendered so it paints with the page instead of
 * after hydration (as a late client-only mount it was the mobile LCP element,
 * ~7s on the Greek homepage). Visitors who already chose get `.consent-set`
 * before first paint, which hides it in CSS, so they never see a flash.
 */
const consentInitScript = `(function(){try{if(localStorage.getItem('cookie-consent')&&localStorage.getItem('ads-measurement-consent')){document.documentElement.classList.add('consent-set');}}catch(e){}})();`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const isEl = locale === 'el';

  return (
    <html
      lang={isEl ? 'el' : 'en'}
      data-asg-theme="light"
      // The next/font variables sit on <html> so they resolve everywhere,
      // including Tailwind's preflight font rule on the root element.
      className={`light ${inter.variable} ${geistMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: consentInitScript }} />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs documentation for AnotherSEOGuru" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredDataGraph(isEl)) }}
        />
      </head>
      <body className="relative antialiased">
        <GoogleAnalytics />
        <CookieConsent />
        {/* Bottom padding tracks the sticky bar's real height instead of a
            hardcoded 5rem, so content never hides behind it on a notched
            device and no dead space is reserved on pages without the bar. */}
        <div
          className="relative z-0 min-h-dvh"
          style={{ paddingBottom: 'var(--chrome-bottom-bar)' }}
          data-locale={locale}
        >
          {children}
        </div>
        <StickyMobileCta />
        <WhatsAppPill locale={isEl ? 'el' : 'en'} />
        <SecurityNotice />
        <Analytics />
      </body>
    </html>
  );
}
