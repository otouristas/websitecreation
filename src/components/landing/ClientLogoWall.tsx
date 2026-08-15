import Image from 'next/image';
import type { SiteLocale } from '@/lib/i18n/locale';

/**
 * Real client logos from `public/logos/assets/`, duplicated once and scrolled
 * as a seamless marquee (`.footer-logo-marquee` translates the track -50%).
 *
 * Every logo here is an actual client - nothing is placeholder.
 */
const LOGOS = [
  { src: '/logos/assets/aggelosrentals.png', alt: 'Aggelos Rentals' },
  { src: '/logos/assets/alkhotel.png', alt: 'ALK Hotel' },
  { src: '/logos/assets/antiparosrentacar.png', alt: 'Antiparos Rent a Car' },
  { src: '/logos/assets/elitehospitality.png', alt: 'Elite Hospitality' },
  { src: '/logos/assets/athensrentacar.png', alt: 'Athens Rent a Car' },
  { src: '/logos/assets/antiparosrooms.png', alt: 'Antiparos Rooms' },
  { src: '/logos/assets/meropirooms.png', alt: 'Meropi Rooms' },
  { src: '/logos/assets/antiparostransfer.png', alt: 'Antiparos Transfer' },
  { src: '/logos/assets/petsville.png', alt: 'Petsville' },
  { src: '/logos/assets/healthassistance.png', alt: 'Health Assistance' },
  { src: '/logos/assets/activesport.png', alt: 'Active Sport' },
  { src: '/logos/assets/eefedu.png', alt: 'EEF Education' },
] as const;

export function ClientLogoWall({ locale = 'en' }: { locale?: SiteLocale }) {
  const isEl = locale === 'el';

  const track = (ariaHidden: boolean) => (
    <div
      className="footer-logo-marquee flex shrink-0 items-center gap-14 pr-14"
      aria-hidden={ariaHidden || undefined}
    >
      {LOGOS.map((logo) => (
        <Image
          key={`${logo.alt}-${ariaHidden}`}
          src={logo.src}
          alt={ariaHidden ? '' : logo.alt}
          width={140}
          height={44}
          className="h-9 w-auto max-w-[140px] object-contain opacity-55 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 dark:invert dark:opacity-70"
        />
      ))}
    </div>
  );

  return (
    <section className="border-y border-hairline bg-surface/40 py-12">
      <p className="mb-8 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {isEl
          ? 'Μας εμπιστεύονται επιχειρήσεις σε Ελλάδα και εξωτερικό'
          : 'Trusted by businesses across Greece and beyond'}
      </p>
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {track(false)}
        {track(true)}
      </div>
    </section>
  );
}
