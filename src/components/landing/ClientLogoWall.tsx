import Image from 'next/image';
import type { SiteLocale } from '@/lib/i18n/locale';

/**
 * Real client logos from `public/logos/assets/`, duplicated once and scrolled
 * as a seamless marquee (`.client-logo-marquee` translates the track -50%).
 *
 * One entry per brand, not per site. `public/logos/assets/` holds six Aggelos
 * marks (aggelosrentals, rentacarantiparos, antiparosrentacar, antiparosrooms,
 * antiparostransfer, athensrentacar) because that client runs six sites - all
 * but one are left out, or a third of the wall would read as the same yellow
 * wordmark repeating.
 *
 * Logos are shown greyscale so the wall reads as one texture rather than a
 * dozen competing brand palettes; colour returns on hover in light mode. Dark
 * mode inverts instead - most of these marks are dark-on-transparent, so
 * inverting is what makes them legible, and un-greyscaling an inverted logo
 * would show false colours. Two source files fought that: the Artemis SVG and
 * meropirooms.png both shipped white-on-transparent (invisible on the light
 * surface) and were recoloured dark in `public/`.
 */
const LOGOS = [
  { src: '/logos/assets/naxos-auto-rent.png', alt: 'Naxos Auto Rent' },
  { src: '/logos/assets/artemis-auto-rental.svg', alt: 'Artemis Rental Sifnos' },
  { src: '/logos/assets/villa-olivia-clara-logo-768x204.png', alt: 'Villa Olivia Clara' },
  { src: '/logos/assets/fastmotorrental-naxos.png', alt: 'Fast Motor Rental Naxos' },
  { src: '/logos/assets/roadrunner-folegandros.png', alt: 'Road Runner Folegandros' },
  { src: '/logos/assets/aggelosrentals.png', alt: 'Aggelos Rentals' },
  { src: '/logos/assets/alkhotel.png', alt: 'ALK Hotel' },
  { src: '/logos/assets/elitehospitality.png', alt: 'Elite Hospitality Services' },
  { src: '/logos/assets/meropirooms.png', alt: 'Meropi Rooms' },
] as const;

export function ClientLogoWall({ locale = 'en' }: { locale?: SiteLocale }) {
  const isEl = locale === 'el';

  const track = (ariaHidden: boolean) => (
    <div
      className="client-logo-marquee flex shrink-0 items-center gap-14 pr-14"
      aria-hidden={ariaHidden || undefined}
    >
      {LOGOS.map((logo) => (
        <Image
          key={`${logo.alt}-${ariaHidden}`}
          src={logo.src}
          alt={ariaHidden ? '' : logo.alt}
          width={140}
          height={44}
          // Next's optimizer refuses to serve SVG inline unless
          // `dangerouslyAllowSVG` is set. These are our own static files, so
          // bypass the optimizer for them rather than loosening that flag.
          unoptimized={logo.src.endsWith('.svg')}
          className="h-11 w-auto max-w-[140px] object-contain opacity-55 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 dark:opacity-70 dark:invert dark:hover:grayscale"
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
