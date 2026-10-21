import type { ReactNode } from "react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { WaveAccent, WaveEyebrow, WaveSection, waveGhostBtn, wavePrimaryBtn } from "@/components/pages/platform-wave/ui";
import { WHATSAPP_HREF } from "@/lib/contact-info";
import type { SiteLocale } from "@/lib/i18n/locale";

/**
 * Homepage design language for the managed-service hubs.
 * Risk buckets group work the page already describes. They do not add claims.
 */

export function accentEnd(text: string, words = 2): ReactNode {
  const parts = text.trim().split(/\s+/);
  if (parts.length <= words) return <WaveAccent>{text}</WaveAccent>;
  return (
    <>
      {parts.slice(0, -words).join(" ")} <WaveAccent>{parts.slice(-words).join(" ")}</WaveAccent>
    </>
  );
}

export type RiskItem = {
  readonly key: string;
  readonly title: string;
  readonly body: string;
  readonly href?: string;
  readonly icon?: ReactNode;
  readonly badge?: ReactNode;
  readonly points?: readonly string[];
};

export type RiskTier = {
  readonly id: string;
  readonly label: string;
  readonly items: readonly RiskItem[];
};

export function RiskBuckets({ tiers }: { readonly tiers: readonly RiskTier[] }) {
  return (
    <div className="mt-12 space-y-14">
      {tiers.map((tier) => (
        <div key={tier.id} data-shot={tier.id} className="min-w-0">
          {tier.label ? <WaveEyebrow>{tier.label}</WaveEyebrow> : null}
          <ul className={`${tier.label ? "mt-5" : ""} grid gap-5 sm:grid-cols-2 ${tier.items.length >= 3 ? "lg:grid-cols-3" : ""}`}>
            {tier.items.map((item) => {
              const card = (
                <article className="flex h-full min-w-0 flex-col rounded-[22px] border border-hairline bg-surface/60 p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7">
                  {item.icon || item.badge ? (
                    <div className="flex items-start justify-between gap-3">
                      {item.icon ? (
                        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">{item.icon}</span>
                      ) : (
                        <span />
                      )}
                      {item.badge ? <span className="shrink-0">{item.badge}</span> : null}
                    </div>
                  ) : null}
                  <h3 className={`${item.icon || item.badge ? "mt-5" : ""} flex items-start justify-between gap-3 text-balance text-[19px] font-bold leading-snug text-foreground`}>
                    <span className="min-w-0">{item.title}</span>
                    {item.href ? (
                      <span className="shrink-0 text-primary" aria-hidden>
                        →
                      </span>
                    ) : null}
                  </h3>
                  <p className="mt-2 flex-1 text-pretty text-[15px] leading-relaxed text-muted-foreground">{item.body}</p>
                  {item.points && item.points.length > 0 ? (
                    <ul className="mt-5 space-y-2 border-t border-hairline pt-4">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-2 text-pretty text-[13.5px] leading-5 text-foreground/90">
                          <span className="text-primary" aria-hidden>
                            ✓
                          </span>
                          <span className="min-w-0">{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              );
              return (
                <li key={item.key} className="min-w-0">
                  {item.href ? (
                    <Link href={item.href} className="block h-full">
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

const WHATSAPP_LABEL = { en: "Talk on WhatsApp", el: "Μιλήστε στο WhatsApp" } as const;

export function ServiceHeroActions({
  locale,
  primaryHref,
  primaryLabel,
  whatsappLabel,
  links,
}: {
  readonly locale: SiteLocale;
  readonly primaryHref: string;
  readonly primaryLabel: string;
  readonly whatsappLabel?: string;
  readonly links?: readonly { readonly href: string; readonly label: string }[];
}) {
  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link href={primaryHref} className={wavePrimaryBtn}>
          {primaryLabel}
        </Link>
        <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className={waveGhostBtn}>
          <WhatsAppIcon className="size-5 text-[#25D366]" />
          {whatsappLabel ?? WHATSAPP_LABEL[locale]}
        </a>
      </div>
      {links && links.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[14px] font-medium">
          {links.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="text-foreground/80 underline decoration-hairline underline-offset-4 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** Homepage FAQ chrome. Schema stays on the page that already publishes it. */
export function ManagedFaq({
  locale,
  title,
  faqs,
  askLabel,
}: {
  readonly locale: SiteLocale;
  readonly title: ReactNode;
  readonly faqs: readonly { readonly question: string; readonly answer: string }[];
  readonly askLabel: string;
}) {
  if (faqs.length === 0) return null;
  return (
    <section id="faq" data-shot="faq" className="scroll-mt-28 border-t border-hairline bg-surface/35">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:px-8 lg:py-28">
        <div className="min-w-0">
          <WaveEyebrow>{locale === "el" ? "Ερωτήσεις" : "Questions"}</WaveEyebrow>
          <h2 className="mt-4 text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.6rem]">{title}</h2>
          <a href={WHATSAPP_HREF} className={`${waveGhostBtn} mt-8`} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="size-5 text-[#25D366]" />
            {askLabel}
          </a>
        </div>
        <div className="min-w-0 divide-y divide-hairline rounded-[22px] border border-hairline bg-background/70">
          {faqs.map((item, index) => (
            <details key={item.question} className="group p-5 sm:p-6" open={index === 0 ? true : undefined}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-semibold text-foreground sm:text-[17px] [&::-webkit-details-marker]:hidden">
                <span className="min-w-0 text-pretty">{item.question}</span>
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-hairline text-primary transition-transform duration-200 group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-4 text-pretty text-[15.5px] leading-relaxed text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QuietSection({
  id,
  shot,
  tinted = false,
  children,
}: {
  readonly id?: string;
  readonly shot: string;
  readonly tinted?: boolean;
  readonly children: ReactNode;
}) {
  return (
    <WaveSection id={id} shot={shot} tinted={tinted}>
      {children}
    </WaveSection>
  );
}
