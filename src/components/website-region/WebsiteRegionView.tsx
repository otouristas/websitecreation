import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { KitBreadcrumbs } from '@/components/page-kit';
import { AnnouncePill, WaveAccent, WaveChoice, WaveClose, WaveHeading, WaveHero, WaveSection, WaveStats } from '@/components/pages/platform-wave/ui';
import { ManagedFaq, ServiceHeroActions } from '@/components/pages/services-wave/ui';
import { IndustryAppPanel, accentSuffix, WorkCards } from '@/components/pages/industry-wave/ui';
import { LinkCards, PriceTiers } from '@/components/service-kit';
import { RichText } from '@/components/place-seo/rich-text';
import { getPortfolioBySlug, type PortfolioProject } from '@/data/portfolio';
import { resolvePriceTokens } from '@/data/pricing';
import { websiteRegionPath, type WebsiteRegionPage } from '@/data/website-regions';
import { generateBreadcrumbSchema, generateFAQSchema, BASE_URL } from '@/lib/seo';
import type { SchemaOutput } from '@/lib/types/seo';

const ORG_ID = `${BASE_URL}/#organization`;
const t = (text: string) => resolvePriceTokens(text, 'el');

export function buildWebsiteRegionSchemas(page: WebsiteRegionPage): SchemaOutput[] {
  const path = websiteRegionPath(page.slug);
  const url = `${BASE_URL}${path}`;
  return [
    generateBreadcrumbSchema({
      items: [
        { name: 'Αρχική', url: '/el' },
        { name: 'Κατασκευή ιστοσελίδων', url: '/el/services/website-creation' },
        { name: page.name, url: path },
      ],
    }),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: page.h1,
      description: page.description,
      url,
      inLanguage: 'el',
      serviceType: 'Κατασκευή ιστοσελίδων',
      provider: { '@id': ORG_ID },
      areaServed: { '@type': 'AdministrativeArea', name: page.name },
      isRelatedTo: page.cities.map((city) => ({ '@type': 'Service', name: city.label, url: `${BASE_URL}${city.href}` })),
    },
    generateFAQSchema({ faqs: page.faqs.map((faq) => ({ question: faq.question, answer: t(faq.answer) })) }),
  ];
}

export function WebsiteRegionView({ page }: { readonly page: WebsiteRegionPage }) {
  const projects = page.workSlugs
    .map((slug) => getPortfolioBySlug(slug))
    .filter((project): project is PortfolioProject => Boolean(project) && project?.liveStatus !== 'offline');
  const path = websiteRegionPath(page.slug);
  const breadcrumbs = [
    { name: 'Αρχική', url: '/el' },
    { name: 'Κατασκευή ιστοσελίδων', url: '/el/services/website-creation' },
    { name: page.name, url: path },
  ];

  return (
    <>
      <SchemaMarkup schemas={buildWebsiteRegionSchemas(page)} />
      <Header locale="el" alternateHref="/en/services/website-creation" />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          pill={
            <div className="flex flex-col items-start gap-4">
              <KitBreadcrumbs items={breadcrumbs} align="left" />
              <AnnouncePill wrap href="/el/services/website-creation" tag={page.name} text={`Ιστοσελίδες με SEO ${page.locative}`} />
            </div>
          }
          title={accentSuffix(page.h1, page.h1Accent)}
          titleClassName="text-[1.7rem] min-[400px]:text-[1.9rem] sm:text-[2.35rem] lg:text-[2.85rem]"
          lead={t(page.lead)}
          actions={
            <ServiceHeroActions
              locale="el"
              primaryHref="/el/get-started"
              primaryLabel="Ζητήστε προσφορά"
              links={[
                { href: '/el/services/website-creation', label: 'Κατασκευή ιστοσελίδων' },
                { href: page.seoPlace.href, label: page.seoPlace.label },
                { href: '/el/pricing', label: 'Τιμές' },
              ]}
            />
          }
          panel={<IndustryAppPanel locale="el" kind="local" />}
          panelNote={`Δείγμα δεδομένων μέσα στο AnotherSEOGuru App, για μια επιχείρηση ${page.locative}. Δεν είναι στοιχεία πελάτη.`}
        />

        {page.sections.map((section, index) => (
          <WaveSection key={section.heading} shot={`story-${index}`} tinted={index % 2 === 1}>
            <h2 className="max-w-[860px] text-balance font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-0.03em] text-foreground sm:text-[2.2rem]">
              {section.heading}
            </h2>
            <div className="mt-6 max-w-[760px] space-y-5 text-pretty text-[16.5px] leading-[1.7] text-muted-foreground">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>
                  <RichText text={t(paragraph)} />
                </p>
              ))}
            </div>
          </WaveSection>
        ))}

        <WaveSection id="cities" shot="cities" tinted>
          <WaveHeading
            eyebrow="Πόλεις και νησιά"
            title={
              <>
                Κατασκευή ιστοσελίδων <WaveAccent>ανά περιοχή</WaveAccent>
              </>
            }
            lead="Κάθε σελίδα γράφει για τη δική της αγορά. Διαλέξτε εκεί όπου είναι η επιχείρησή σας."
          />
          <LinkCards
            className="mt-8"
            items={page.cities.map((city) => ({ href: city.href, title: city.label, body: city.body }))}
          />
        </WaveSection>

        {projects.length > 0 ? (
          <WaveSection shot="proof">
            <WaveHeading
              eyebrow="Έργα"
              title={
                <>
                  Ιστοσελίδες που έχουμε φτιάξει <WaveAccent>{page.locative}</WaveAccent>
                </>
              }
              lead="Μόνο έργα που υπάρχουν ήδη στη σελίδα Έργα. Χωρίς πρόσθετα νούμερα."
            />
            <WorkCards projects={projects} locale="el" />
          </WaveSection>
        ) : null}

        <WaveSection id="pricing" shot="pricing" tinted>
          <WaveHeading
            align="center"
            eyebrow="Τιμές"
            title={
              <>
                Πόσο κοστίζει μια ιστοσελίδα <WaveAccent>{page.locative}</WaveAccent>
              </>
            }
            lead="Τα πακέτα είναι τα ίδια με τη σελίδα τιμών, με σταθερή τιμή και γραπτή προσφορά."
          />
          <PriceTiers kind="website" locale="el" className="mt-12" />
          <p className="mt-10 text-center text-[14.5px]">
            <Link href="/el/pricing" className="font-medium text-primary underline-offset-4 hover:underline">
              Όλες οι τιμές και τα πακέτα
            </Link>
          </p>
        </WaveSection>

        <WaveChoice locale="el" source={`website-region-${page.slug}-choice`} />
        <WaveStats locale="el" />

        <ManagedFaq
          locale="el"
          title={
            <>
              Συχνές ερωτήσεις για ιστοσελίδες <WaveAccent>{page.locative}</WaveAccent>
            </>
          }
          faqs={page.faqs.map((faq) => ({ question: faq.question, answer: t(faq.answer) }))}
          askLabel="Μιλήστε στο WhatsApp"
        />

        <WaveClose
          locale="el"
          source={`website-region-${page.slug}`}
          title={
            <>
              Η ιστοσελίδα σας {page.locative} <WaveAccent>ξεκινά με μια κλήση</WaveAccent>
            </>
          }
          lead="Πείτε μας τι κάνει η επιχείρησή σας και πού. Θα λάβετε γραπτή προσφορά με σταθερή τιμή και χρονοδιάγραμμα."
        />
      </main>
      <Footer locale="el" />
    </>
  );
}
