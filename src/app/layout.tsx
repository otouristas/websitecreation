import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MarketingPopup from "@/components/MarketingPopup";
import CookieConsent from "@/components/CookieConsent";
import { MarketingPageBackground } from "@/components/marketing";

const SITE_URL = "https://anotherseoguru.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AnotherSEOGuru | SEO Software & Agency for Search Console Teams",
    template: "%s",
  },
  description:
    "GSC-native SEO software with clustering, rank tracking, audits, and AI workflows — plus agency programs for technical SEO, content, and sites that convert. 500+ teams served.",
  keywords: [
    "SEO software",
    "Google Search Console",
    "SEO agency",
    "keyword clustering",
    "rank tracking",
    "technical SEO",
    "AI SEO",
    "local SEO",
    "Core Web Vitals",
    "content strategy",
  ],
  authors: [{ name: "AnotherSEOGuru", url: SITE_URL }],
  creator: "AnotherSEOGuru",
  publisher: "AnotherSEOGuru",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "AnotherSEOGuru",
    title: "AnotherSEOGuru | SEO Software & Agency for Search Console Teams",
    description:
      "GSC-native SEO platform with clustering, audits, and AI workflows — plus agency delivery when you want execution done for you.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "AnotherSEOGuru — SEO software and agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnotherSEOGuru | SEO Software & Agency for Search Console Teams",
    description:
      "GSC-native SEO platform with clustering, audits, and AI workflows — plus agency programs when you want hands-on execution.",
    creator: "@anotherseoguru",
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "tkWhNe__BsE39YeIQM5fmGc8Y1W7hzw8RadiokDZquw",
  },
};

/** Site-wide Organization + WebSite JSON-LD (@graph) for rich results and entity clarity */
const structuredDataGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "AnotherSEOGuru",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
      description:
        "Data-driven SEO agency and software company specializing in technical SEO, Search Console operations, content strategy, link building, and AI-assisted workflows.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "info@anotherseoguru.com",
        availableLanguage: ["English", "Greek"],
      },
      sameAs: [
        "https://www.linkedin.com/company/anotherseoguru",
        "https://twitter.com/anotherseoguru",
        "https://www.youtube.com/@anotherseoguru",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "150",
      },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      knowsAbout: [
        "Technical SEO",
        "Google Search Console",
        "Semantic keyword clustering",
        "Generative AI search visibility",
        "Local SEO",
        "Core Web Vitals",
        "Conversion rate optimization",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "SEO Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Technical SEO",
              description: "Comprehensive site audits and Core Web Vitals optimization",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Content Strategy",
              description: "AI-powered content planning and keyword research",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Link Building",
              description: "White-hat link acquisition and digital PR",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "AnotherSEOGuru",
      description:
        "SEO software for Search Console teams and full-service SEO agency programs — platform, execution, and websites in one partner ecosystem.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs documentation for AnotherSEOGuru" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FGFJEKZHB1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FGFJEKZHB1');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} relative antialiased`}>
        <MarketingPopup />
        <CookieConsent />
        <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
          <MarketingPageBackground />
        </div>
        <div className="relative z-0 min-h-dvh">{children}</div>
      </body>
    </html>
  );
}
