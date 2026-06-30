import Link from 'next/link';
import { Car, Building2, Home, Map, Bot } from 'lucide-react';

const verticals = [
  {
    slug: 'rent-a-car',
    icon: Car,
    titleEn: 'Rent-a-car websites',
    titleEl: 'Ιστοσελίδες ενοικίασης αυτοκινήτου',
    descEn: 'Fleet pages, booking funnels and island SEO for car rental brands.',
    descEl: 'Στόλος, online κρατήσεις και SEO για rent-a-car σε νησιά και πόλεις.',
    href: '/solutions/rent-a-car',
  },
  {
    slug: 'hotels',
    icon: Building2,
    titleEn: 'Hotel & hospitality',
    titleEl: 'Ξενοδοχεία & φιλοξενία',
    descEn: 'Direct booking sites, room galleries and tourism keyword clusters.',
    descEl: 'Ιστοσελίδες ξενοδοχείων με galleries, κρατήσεις και SEO τουρισμού.',
    href: '/solutions/hotels',
  },
  {
    slug: 'villas-apartments',
    icon: Home,
    titleEn: 'Villas & apartments',
    titleEl: 'Βίλες & διαμερίσματα',
    descEn: 'Luxury rentals with photo-rich pages and international SEO.',
    descEl: 'Βίλες και ενοικιαζόμενα με premium design και διεθνές SEO.',
    href: '/solutions/villas-apartments',
  },
  {
    slug: 'tour-operators',
    icon: Map,
    titleEn: 'Tours & travel guides',
    titleEl: 'Εκδρομές & ταξιδιωτικοί οδηγοί',
    descEn: 'Excursion catalogs, destination hubs and content SEO at scale.',
    descEl: 'Τουριστικοί οδηγοί, εκδρομές και programmatic content SEO.',
    href: '/solutions/tour-operators',
  },
  {
    slug: 'travel-ai-chatbots',
    icon: Bot,
    titleEn: 'Travel AI chatbots',
    titleEl: 'AI chatbots για τουρισμό',
    descEn: 'Multilingual AI assistants for bookings, FAQs and AEO visibility.',
    descEl: 'AI chatbots πολύγλωσσα για κρατήσεις, FAQ και AEO.',
    href: '/solutions/travel-ai-chatbots',
  },
] as const;

import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

interface VerticalServicesProps {
  locale?: SiteLocale;
}

export function VerticalServices({ locale = 'en' }: VerticalServicesProps) {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);

  return (
    <section className="py-[var(--marketing-section-y)]">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            {isEl ? 'Εξειδίκευση στον τουρισμό' : 'Built for tourism & travel'}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            {isEl
              ? 'Κατασκευή ιστοσελίδας, SEO, GEO/AEO και AI - για κάθε vertical του ταξιδιού.'
              : 'Website design, SEO, GEO/AEO and AI chatbots - for every travel vertical you serve.'}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {verticals.map((v) => {
            const Icon = v.icon;
            return (
              <Link
                key={v.slug}
                href={lp(v.href)}
                className="card group p-6 transition-colors hover:border-primary/40"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {isEl ? v.titleEl : v.titleEn}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{isEl ? v.descEl : v.descEn}</p>
                <span className="mt-4 inline-block text-sm font-medium text-primary">
                  {isEl ? 'Μάθετε περισσότερα →' : 'Learn more →'}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
