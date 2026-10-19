import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { localH2, localProse } from '@/components/seo/location-styles';
import { RichText } from '@/components/place-seo/rich-text';
import { CtaBand, KitHeading, KitSection } from '@/components/kit';
import {
  AccentTitle,
  CardGrid,
  ChipLinks,
  FaqBlock,
  getServiceKit,
  LinkCards,
  PriceTiers,
  ProcessGrid,
  ProofGrid,
  ServiceHero,
} from '@/components/service-kit';
import { getPortfolioBySlug } from '@/data/portfolio';
import {
  buildVerticalSchemas,
  TOURISM_HUB_NAME,
  TOURISM_HUB_PATH,
  TOURISM_PROCESS,
  TOURISM_RULES,
  TOURISM_VERTICALS,
  tourismPath,
  type TourismVertical,
} from '@/data/tourism-seo';

/** Same exclusions as the place pages: projects that would name the agency's own island. */
const BLOCKED_WORK = new Set([
  'antiparos-rentacar',
  'rentacar-antiparos-gr',
  'antiparos-transfer',
  'antiparos-rooms',
  'hotels-sifnos',
  'rentacar-sifnos',
  'george-xipolitas',
]);

export function VerticalPageView({ vertical }: { readonly vertical: TourismVertical }) {
  const kit = getServiceKit('local-seo');
  const projects = vertical.workSlugs
    .filter((slug) => !BLOCKED_WORK.has(slug))
    .map((slug) => getPortfolioBySlug(slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project) && project?.liveStatus !== 'offline');
  const siblings = TOURISM_VERTICALS.filter((other) => other.slug !== vertical.slug).map((other) => ({
    href: tourismPath(other.slug),
    label: other.name,
  }));

  return (
    <>
      <SchemaMarkup schemas={buildVerticalSchemas(vertical)} />
      <Header locale="el" alternateHref={vertical.enAlternate} />
      <main className="blueprint-grid relative z-0">
        <ServiceHero
          locale="el"
          breadcrumbs={[
            { name: 'Αρχική', url: '/el' },
            { name: TOURISM_HUB_NAME, url: TOURISM_HUB_PATH },
            { name: vertical.name, url: tourismPath(vertical.slug) },
          ]}
          pill={{ kind: 'live', tag: vertical.name, text: 'SEO για τουριστικές επιχειρήσεις', href: TOURISM_HUB_PATH }}
          h1={vertical.h1}
          h1Accent={vertical.h1Accent}
          lead={vertical.lead}
          primaryLabel="Δωρεάν έλεγχος"
          primaryHref="/el/get-started"
          links={[
            { href: TOURISM_HUB_PATH, label: 'Όλοι οι κλάδοι' },
            { href: '/el/pricing', label: 'Τιμές' },
            { href: '/el/work', label: 'Έργα' },
          ]}
          visual={kit.hero('el', vertical.name)}
          visualLabel={kit.heroLabel.el}
        />

        {vertical.sections.map((section) => (
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

        <KitSection tinted id="includes">
          <KitHeading
            eyebrow="Τι περιλαμβάνει"
            title={<AccentTitle text={`Τι περιλαμβάνουν οι υπηρεσίες SEO για ${vertical.name.toLocaleLowerCase('el-GR')}`} />}
          />
          <CardGrid className="mt-10" items={vertical.deliverables} />
        </KitSection>

        <KitSection id="searches">
          <KitHeading
            eyebrow="Αναζητήσεις"
            title={<AccentTitle text="Οι αναζητήσεις που στοχεύουμε" />}
            description="Μοτίβα αναζήτησης με πρόθεση κράτησης. Η λίστα για τη δική σας επιχείρηση βγαίνει από το Search Console και τον έλεγχο."
          />
          <ChipLinks className="mt-8" items={vertical.searches.map((label) => ({ label }))} />
        </KitSection>

        <KitSection tinted id="regions">
          <KitHeading
            eyebrow="Σε όλη την Ελλάδα"
            title={<AccentTitle text="Τι αλλάζει ανά προορισμό" />}
            description="Δεν ανοίγουμε σελίδα για κάθε πόλη με το ίδιο κείμενο. Κάθε προορισμός έχει μία σελίδα SEO, και εδώ γράφουμε τι αλλάζει για αυτόν τον κλάδο."
          />
          <LinkCards
            className="mt-10"
            items={vertical.regions.map((region) => ({ href: region.href, title: region.label, body: region.note }))}
          />
          <p className="mt-6 text-[15px] text-muted-foreground">
            <Link href="/el/seo" className="font-medium text-link underline-offset-4 hover:underline">
              SEO σε όλη την Ελλάδα, ανά πόλη και νησί
            </Link>
          </p>
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

        <KitSection id="process" tinted={projects.length > 0}>
          <KitHeading eyebrow="Διαδικασία" title={<AccentTitle text="Πώς δουλεύουμε" />} />
          <ProcessGrid className="mt-10" steps={TOURISM_PROCESS} />
        </KitSection>

        <KitSection id="rules" tinted={projects.length === 0}>
          <KitHeading
            eyebrow="Κανόνες"
            title={<AccentTitle text="Τι δεν κάνουμε, ώστε να μην κινδυνεύει το site σας" />}
          />
          <CardGrid className="mt-10" items={TOURISM_RULES} />
        </KitSection>

        <KitSection tinted id="pricing">
          <KitHeading
            align="center"
            eyebrow="Τιμές"
            title={<AccentTitle text="Πόσο κοστίζει" />}
            description="Τα μηνιαία πακέτα είναι τα ίδια με τη σελίδα τιμών. Το Foundations είναι η αφετηρία."
          />
          <PriceTiers kind="seo" locale="el" className="mt-12" />
          <p className="mt-10 text-center text-[14px]">
            <Link href="/el/pricing" className="font-medium text-link underline-offset-4 hover:underline">
              Όλες οι τιμές και τα πακέτα
            </Link>
          </p>
        </KitSection>

        <FaqBlock locale="el" title={<AccentTitle text="Συχνές ερωτήσεις" />} faqs={vertical.faqs} />

        <KitSection id="related">
          <KitHeading eyebrow="Σχετικά" title={<AccentTitle text="Διαβάστε επίσης" />} />
          <LinkCards className="mt-10" items={vertical.related} />
          <KitHeading className="mt-16" eyebrow="Άλλοι κλάδοι" title={<AccentTitle text="SEO για άλλες τουριστικές επιχειρήσεις" />} />
          <ChipLinks className="mt-8" items={siblings} />
        </KitSection>

        <CtaBand
          locale="el"
          source={`tourism-seo-${vertical.slug}`}
          title={<AccentTitle text="Ξεκινήστε με δωρεάν έλεγχο" />}
          description="Στείλτε την ιστοσελίδα σας. Θα δείτε από πού χάνονται οι άμεσες κρατήσεις και τι κοστίζει η δουλειά, πριν δεσμευτείτε."
        />
      </main>
      <Footer locale="el" />
    </>
  );
}
