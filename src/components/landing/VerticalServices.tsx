import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { Panel, Section, SectionHeading } from './primitives';

const VERTICALS = [
  { slug: 'hotels', titleEn: 'Hotels & hospitality', titleEl: 'Ξενοδοχεία & φιλοξενία',
    descEn: 'Direct-booking sites, room galleries and tourism keyword clusters that beat the OTAs on your own name.',
    descEl: 'Ιστοσελίδες με απευθείας κρατήσεις, γκαλερί δωματίων και θεματικούς κόμβους τουρισμού.' },
  { slug: 'rent-a-car', titleEn: 'Rent-a-car', titleEl: 'Ενοικίαση αυτοκινήτου',
    descEn: 'Fleet pages, booking funnels and island or airport SEO for car rental brands.',
    descEl: 'Σελίδες στόλου, διαδικασία κράτησης και SEO για νησιά ή αεροδρόμια.' },
  { slug: 'tour-operators', titleEn: 'Tours & travel', titleEl: 'Εκδρομές & τουρισμός',
    descEn: 'Excursion catalogues, destination hubs and content SEO built to scale across seasons.',
    descEl: 'Κατάλογοι εκδρομών, κόμβοι προορισμών και περιεχόμενο που κλιμακώνεται ανά σεζόν.' },
] as const;

export function VerticalServices({ locale = 'en' }: { locale?: SiteLocale }) {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);

  return (
    <Section id="ideal-for">
      <SectionHeading
        eyebrow={isEl ? 'Εξειδίκευση' : 'Ideal for'}
        title={isEl ? 'Ξέρουμε τον κλάδο σας' : 'We know your vertical'}
        body={isEl
          ? 'Δεν φτιάχνουμε γενικές ιστοσελίδες. Η εμπειρία μας είναι στον τουρισμό και τη φιλοξενία.'
          : 'We do not build generic websites. Our depth is in tourism and hospitality.'}
      />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {VERTICALS.map((v) => (
          <Link key={v.slug} href={lp(`/solutions/${v.slug}`)} className="group">
            <Panel className="flex h-full flex-col p-7">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-foreground">
                  {isEl ? v.titleEl : v.titleEn}
                </h3>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {isEl ? v.descEl : v.descEn}
              </p>
            </Panel>
          </Link>
        ))}
      </div>
    </Section>
  );
}
