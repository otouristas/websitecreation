import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { hoodChip, localH2, localProse } from '@/components/seo/location-styles';
import { CtaBand, KitHeading, KitSection } from '@/components/kit';
import { AccentTitle, ChipLinks, FaqBlock, getServiceKit, PriceTiers, ProcessGrid, ProofGrid, ServiceHero } from '@/components/service-kit';
import { getPortfolioBySlug } from '@/data/portfolio';
import { buildPlaceSchemas, PLACE_PROCESS, type PlacePageData } from '@/data/place-seo';
import { RichText } from './rich-text';

const BLOCKED_WORK = new Set([
  'antiparos-rentacar',
  'rentacar-antiparos-gr',
  'antiparos-transfer',
  'antiparos-rooms',
  'hotels-sifnos',
  'rentacar-sifnos',
  'george-xipolitas',
]);

const EN_ALTERNATE = '/en/seo-services';

export function PlacePageView({ place }: { readonly place: PlacePageData }) {
  const kit = getServiceKit('seo-audits');
  const projects = place.workSlugs
    .filter((slug) => !BLOCKED_WORK.has(slug))
    .map((slug) => getPortfolioBySlug(slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project) && project?.liveStatus !== 'offline');

  return (
    <>
      <SchemaMarkup schemas={buildPlaceSchemas(place)} />
      <Header locale="el" alternateHref={EN_ALTERNATE} />
      <main className="blueprint-grid relative z-0">
        <ServiceHero
          locale="el"
          breadcrumbs={[
            { name: 'Αρχική', url: '/el' },
            { name: 'SEO σε όλη την Ελλάδα', url: '/el/seo' },
            { name: `SEO ${place.name}`, url: `/el/seo/${place.slug}` },
          ]}
          pill={{
            kind: 'live',
            tag: place.name,
            text: `Υπηρεσίες SEO ${place.locative}`,
            href: '/el/seo',
          }}
          h1={place.h1}
          h1Accent={place.h1Accent}
          lead={place.lead}
          primaryLabel="Δωρεάν έλεγχος"
          primaryHref="/el/get-started"
          links={[
            { href: '/el/seo', label: 'Όλοι οι τόποι' },
            { href: '/el/services/website-creation', label: 'Κατασκευή ιστοσελίδων' },
            { href: '/el/pricing', label: 'Τιμές' },
          ]}
          visual={kit.hero('el', place.name)}
          visualLabel={kit.heroLabel.el}
        />

        {place.sections.map((section) => (
          <KitSection key={section.heading}>
            <h2 className={localH2}>{section.heading}</h2>
            <div className={localProse}>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>
          </KitSection>
        ))}

        <KitSection tinted>
          <KitHeading eyebrow="Σημεία" title={<AccentTitle text={`Πού κόβεται η αναζήτηση ${place.locative}`} />} />
          <ul className="mt-8 flex flex-wrap gap-2">
            {place.areas.map((area) => (
              <li key={area} className={hoodChip}>
                {area}
              </li>
            ))}
          </ul>
        </KitSection>

        {projects.length > 0 ? (
          <KitSection>
            <KitHeading
              eyebrow="Έργα"
              title={<AccentTitle text="Σχετική δουλειά από τον κατάλογό μας" />}
              description="Μόνο έργα που υπάρχουν ήδη στη σελίδα Έργα. Χωρίς πρόσθετα νούμερα."
            />
            <ProofGrid className="mt-10" projects={projects} locale="el" />
          </KitSection>
        ) : null}

        <KitSection tinted={projects.length === 0} id="nearby">
          <KitHeading eyebrow="Δίπλα" title={<AccentTitle text="Κοντινοί τόποι" />} />
          <ChipLinks className="mt-8" items={place.nearby} />
          <p className="mt-6 text-[15px] text-muted-foreground">
            <Link href="/el/seo" className="font-medium text-link underline-offset-4 hover:underline">
              SEO σε όλη την Ελλάδα
            </Link>
          </p>
        </KitSection>

        <KitSection id="process" tinted={projects.length > 0}>
          <KitHeading eyebrow="Διαδικασία" title={<AccentTitle text={`Πώς δουλεύουμε ${place.locative}`} />} />
          <ProcessGrid className="mt-10" steps={PLACE_PROCESS} />
        </KitSection>

        <KitSection tinted id="pricing">
          <KitHeading
            align="center"
            eyebrow="Τιμές"
            title={<AccentTitle text={`Πόσο κοστίζει το SEO ${place.locative}`} />}
            description="Τα μηνιαία πακέτα είναι τα ίδια με τη σελίδα τιμών. Το Foundations είναι η αφετηρία."
          />
          <PriceTiers kind="seo" locale="el" className="mt-12" />
          <p className="mt-10 text-center text-[14px]">
            <Link href="/el/pricing" className="font-medium text-link underline-offset-4 hover:underline">
              Όλες οι τιμές και τα πακέτα
            </Link>
          </p>
        </KitSection>

        <FaqBlock
          locale="el"
          title={<AccentTitle text={`Συχνές ερωτήσεις για το SEO ${place.locative}`} />}
          faqs={place.faqs}
        />

        <CtaBand
          locale="el"
          source={`place-seo-${place.slug}`}
          title={<AccentTitle text={`Ξεκινήστε το SEO ${place.locative} με έλεγχο`} />}
          description={`Στείλτε την ιστοσελίδα σας. Θα δείτε τι κρατά πίσω τις αναζητήσεις ${place.locative} και τι κοστίζει η δουλειά, πριν δεσμευτείτε.`}
        />
      </main>
      <Footer locale="el" />
    </>
  );
}
