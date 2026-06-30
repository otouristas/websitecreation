import Link from "next/link";
import { elHome } from "@/data/translations/el-home";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";

interface AgencyBandProps {
  locale?: SiteLocale;
}

export function AgencyBand({ locale = "en" }: AgencyBandProps) {
  const isEl = locale === "el";
  const t = isEl ? elHome.agencyBand : null;

  return (
    <section className="py-20 lg:py-28 bg-foreground text-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-background/60 mb-3">
            {isEl ? t!.label : "Done-for-you agency"}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isEl ? t!.title : "We build websites that rank"}
          </h2>
          <p className="text-lg text-background/80 mb-8 leading-relaxed">
            {isEl
              ? t!.body
              : "Specialists in tourism, hotels, rent-a-car and travel AI. 55+ live projects — from the Greek islands to global markets."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={localizedPath(isEl ? "el" : "en", "/pricing")}
              className="btn bg-background text-foreground hover:bg-background/90 px-8 py-3"
            >
              {isEl ? t!.ctaPricing : "Agency packages"}
            </Link>
            <Link
              href={localizedPath(isEl ? "el" : "en", "/get-started")}
              className="btn border-2 border-background/40 text-background hover:bg-background/10 px-8 py-3"
            >
              {isEl ? t!.ctaStart : "Start a project"}
            </Link>
            <Link
              href={localizedPath(isEl ? "el" : "en", "/services")}
              className="btn border-2 border-background/40 text-background hover:bg-background/10 px-8 py-3"
            >
              {isEl ? t!.ctaServices : "Browse services"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
