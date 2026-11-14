import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, CalendarDays, Check } from "lucide-react";
import { KitBreadcrumbs, type Crumb } from "@/components/page-kit/PageHero";
import {
  currentPrice,
  currentDisplayPrice,
  formatPrice,
  isOfferActive,
  OFFER_ENDS,
  seoPackages,
  websitePackages,
  withVat,
} from "@/data/pricing";
import { SEO_MIN_TERM_MONTHS } from "@/data/company-facts";
import styles from "./BlackMonthPricingHero.module.css";

/** Campaign presentation only. Every amount and deadline comes from the existing pricing source. */
export function BlackMonthPricingHero({
  breadcrumbs,
}: {
  breadcrumbs: readonly Crumb[];
}) {
  if (!isOfferActive()) return null;
  const deadline = new Intl.DateTimeFormat("el-GR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Athens",
  }).format(OFFER_ENDS);
  const offers = [
    {
      tier: websitePackages[0],
      label: "ΚΑΤΑΣΚΕΥΗ ΙΣΤΟΣΕΛΙΔΑΣ",
      per: "",
      href: "#websites",
      service: "website-creation",
    },
    {
      tier: seoPackages[0],
      label: "ΜΗΝΙΑΙΕΣ ΥΠΗΡΕΣΙΕΣ SEO",
      per: "/μήνα",
      href: "#seo",
      service: "seo",
    },
  ];

  return (
    <section
      className={`hero-below-header ${styles.section}`}
      aria-labelledby="black-month-pricing-title"
    >
      <div className={styles.container}>
        <KitBreadcrumbs items={breadcrumbs} align="left" />
        <div className={styles.hero} data-black-month-creative>
          <Image
            className={styles.art}
            src="/campaigns/black-month-2026/background.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 760px) 100vw, 1320px"
          />
          <div className={styles.shade} aria-hidden />
          <div className={styles.topline}>
            <Image
              src="/brand/asg-lockup-on-dark.svg"
              width={1128}
              height={256}
              alt="AnotherSEOGuru"
              className={`${styles.logo} ${styles.darkLogo}`}
              unoptimized
            />
            <Image
              src="/brand/asg-lockup-on-light.svg"
              width={1128}
              height={256}
              alt="AnotherSEOGuru"
              className={`${styles.logo} ${styles.lightLogo}`}
              unoptimized
            />
            <span className={styles.edition}>ΝΟΕΜΒΡΙΟΣ 2026</span>
          </div>
          <div className={styles.heading}>
            <span className={styles.eyebrow}>ΙΣΤΟΣΕΛΙΔΕΣ / SEO / E-SHOP</span>
            <h1 id="black-month-pricing-title">
              BLACK
              <br />
              <span>MONTH.</span>
            </h1>
            <p className={styles.tagline}>
              Ίδια τιμή.
              <br />
              Δώρο και ο ΦΠΑ.
            </p>
            <p className={styles.lead}>
              Η νέα σας ιστοσελίδα. Το SEO που σχεδιάζετε. Οι προσφορές
              Νοεμβρίου της AnotherSEOGuru είναι εδώ.
            </p>
          </div>
          <div className={styles.offers}>
            {offers.map(({ tier, label, per, href, service }) => {
              const net = currentPrice(tier);
              return (
                <article className={styles.offer} key={tier.id}>
                  <div className={styles.offerLabel}>
                    {label}
                    <span>BLACK MONTH</span>
                  </div>
                  <h2>{tier.name}</h2>
                  <p className={styles.was}>
                    Πριν{" "}
                    <del>
                      €{formatPrice(tier.regular, "el")}
                      {per}
                    </del>
                    {' '}+ ΦΠΑ 24%
                    <br />
                    (€{formatPrice(withVat(tier.regular), "el")}{per} με ΦΠΑ)
                  </p>
                  <p className={styles.price}>
                    <strong>
                      <small className={styles.now}>Τώρα</small>
                      €{formatPrice(currentDisplayPrice(tier), "el")}
                    </strong>
                    <span>
                      {per}
                      <br />
                      τελική με ΦΠΑ 24%
                    </span>
                  </p>
                  <p className={styles.gross}>
                    Καθαρή αξία €{formatPrice(net, "el")}
                    {per}. Ο ΦΠΑ περιλαμβάνεται.
                  </p>
                  <div className={styles.offerFooter}>
                    <span>Δώρο ο ΦΠΑ</span>
                    <Link
                      href={`/el/get-started?service=${service}&utm_source=website&utm_medium=campaign&utm_campaign=black-month-2026&utm_content=${tier.id}`}
                      aria-label={`Ζητήστε Black Month προσφορά για ${tier.name}`}
                    >
                      <ArrowUpRight size={22} aria-hidden />
                    </Link>
                  </div>
                  <a href={href} className={styles.details}>
                    Δείτε τι περιλαμβάνει
                    <ArrowDown size={14} aria-hidden />
                  </a>
                </article>
              );
            })}
          </div>
          <div className={styles.terms}>
            <p>
              <CalendarDays size={16} aria-hidden />
              Για νέα έργα που θα επιβεβαιωθούν έως {deadline}.
            </p>
            <p>
              <Check size={16} aria-hidden />
              SEO: €{formatPrice(seoPackages[0].offer, "el")} τελική/μήνα, με
              ΦΠΑ, σε όλη τη συνεργασία των {SEO_MIN_TERM_MONTHS} μηνών. Οι
              προσφορές αφορούν τα δύο παραπάνω πακέτα.
            </p>
          </div>
        </div>
        <div className={styles.followup}>
          <div>
            <span className={styles.smallLabel}>
              ΚΑΘΕ ΕΠΙΧΕΙΡΗΣΗ ΕΧΕΙ ΤΟ ΔΙΚΟ ΤΗΣ ΠΛΑΝΟ
            </span>
            <h2>
              Ιστοσελίδα, e-shop, SEO.
              <br />
              Συνδυάστε όσα χρειάζεστε.
            </h2>
          </div>
          <div>
            <p>
              Για τα υπόλοιπα πακέτα, το e-shop, το περιεχόμενο και την εταιρική
              ταυτότητα, ζητήστε εξατομικευμένη πρόταση με βάση το έργο σας.
            </p>
            <Link href="/el/get-started?service=website&utm_source=website&utm_medium=campaign&utm_campaign=black-month-2026&utm_content=custom">
              Συζητήστε το έργο σας
              <ArrowUpRight size={17} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
