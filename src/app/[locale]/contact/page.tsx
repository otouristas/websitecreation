import type { ReactElement } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock3, Globe, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactChannels from "@/components/ContactChannels";
import { ContactFormClient } from "./contact-form-client";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { elContact } from "@/data/translations/el-contact";
import { CONTACT_EMAIL } from "@/lib/contact-info";
import { CtaBand, TrustLine, agencyTrust } from "@/components/kit";
import { KitBreadcrumbs } from "@/components/page-kit";
import { AnnouncePill, WaveHero, waveGhostBtn } from "@/components/pages/platform-wave/ui";
import { accentEnd } from "@/components/pages/services-wave/ui";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<ReactElement> {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const l = locale as SiteLocale;
  const isEl = l === "el";
  const lp = (path: string) => localizedPath(l, path);
  const t = isEl ? elContact : null;

  return (
    <>
      <Header locale={l} />
      <main className="blueprint-grid relative z-0 overflow-x-clip" lang={isEl ? "el" : undefined}>
        <WaveHero
          pill={
            <div className="flex flex-col items-start gap-4">
              <KitBreadcrumbs
                align="left"
                items={[
                  { name: isEl ? elContact.breadcrumbHome : "Home", url: lp("/") },
                  { name: isEl ? elContact.breadcrumbContact : "Contact", url: lp("/contact") },
                ]}
              />
              <AnnouncePill
                wrap
                href={lp("/get-started#free-audit")}
                tag={isEl ? "Δωρεάν" : "Free"}
                text={isEl ? "Προσθέστε την ιστοσελίδα σας για δωρεάν έλεγχο SEO" : "Add your website for a free SEO audit"}
              />
            </div>
          }
          title={accentEnd(isEl ? elContact.h1 : "Let's Talk About Your Project", 2)}
          titleClassName="text-[1.7rem] min-[400px]:text-[1.95rem] sm:text-[2.45rem] lg:text-[3rem]"
          lead={
            isEl
              ? elContact.intro
              : "Have a question or ready to get started? Send us a message and we'll get back to you within 24 hours."
          }
          trust={<TrustLine align="left" items={agencyTrust(l)} />}
          panel={
            <div className="min-w-0 space-y-4">
              <div className="rounded-[22px] border border-hairline bg-surface/80 p-6 shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_18%,transparent),0_30px_80px_-28px_color-mix(in_oklab,var(--primary)_45%,transparent)]">
                <h2 className="font-display text-[20px] font-semibold tracking-[-0.025em] text-foreground">
                  {isEl ? t!.getInTouch : "Get in Touch"}
                </h2>
                <ContactChannels variant="buttons" locale={l} className="mt-5" />
                <dl className="mt-6 divide-y divide-hairline border-t border-hairline">
                  <div className="relative min-w-0 py-4 pl-7">
                    <dt className="text-[13px] text-muted-foreground">
                      <Mail className="absolute left-0 top-4 mt-0.5 size-4 text-primary" aria-hidden />
                      {isEl ? t!.email : "Email"}
                    </dt>
                    <dd>
                      <a href={`mailto:${CONTACT_EMAIL}`} className="break-all text-[15px] font-medium text-foreground hover:text-primary">
                        {CONTACT_EMAIL}
                      </a>
                    </dd>
                  </div>
                  <div className="relative py-4 pl-7">
                    <dt className="text-[13px] text-muted-foreground">
                      <Clock3 className="absolute left-0 top-4 mt-0.5 size-4 text-primary" aria-hidden />
                      {isEl ? t!.responseTime : "Response Time"}
                    </dt>
                    <dd className="text-[15px] font-medium text-foreground">{isEl ? t!.responseValue : "Within 24 hours"}</dd>
                  </div>
                  <div className="relative pt-4 pl-7">
                    <dt className="text-[13px] text-muted-foreground">
                      <Globe className="absolute left-0 top-4 mt-0.5 size-4 text-primary" aria-hidden />
                      {isEl ? t!.serving : "Serving"}
                    </dt>
                    <dd className="text-[15px] font-medium text-foreground">{isEl ? t!.servingValue : "Clients worldwide"}</dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-[22px] border border-hairline bg-surface/70 p-6">
                <h3 className="text-[16px] font-semibold text-foreground">{isEl ? t!.readyTitle : "Ready to start?"}</h3>
                <p className="mt-2 text-pretty text-[14px] leading-relaxed text-muted-foreground">
                  {isEl
                    ? t!.readyBody
                    : "Skip the form and go straight to our onboarding wizard to choose your package and get started today."}
                </p>
                <Link href={lp("/get-started")} className={`${waveGhostBtn} mt-5 w-full`}>
                  {isEl ? t!.readyCta : "Start Your Project"}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          }
        />
        <section data-shot="form" className="scroll-mt-28">
          <div className="mx-auto max-w-[760px] px-5 pb-16 pt-2 lg:px-8 lg:pb-24">
            <ContactFormClient locale={l} />
          </div>
        </section>
        <div data-shot="cta">
          <CtaBand locale={l} source="contact-band" />
        </div>
      </main>
      <Footer locale={l} />
    </>
  );
}
