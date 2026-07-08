"use client";

import { useState, type ReactElement } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Globe,
  RefreshCw,
  Search,
  Gauge,
  Sparkles,
  PenTool,
  FileText,
  MapPin,
  Link2,
  ClipboardCheck,
  ShoppingCart,
  TrendingUp,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { getServiceEl } from "@/data/services-i18n";
import { trackCtaClick } from "@/lib/analytics";
import { WHATSAPP_HREF, PHONE_DISPLAY } from "@/lib/contact-info";
import { getTrustChips } from "@/data/trust-stats";

interface ServiceItem {
  slug: string;
  icon: LucideIcon;
  en: { name: string; desc: string };
  el: { name: string; desc: string };
}

const SERVICE_ITEMS: ServiceItem[] = [
  { slug: "website-creation", icon: Globe, en: { name: "Website Creation", desc: "Fast, SEO-ready custom websites" }, el: { name: "Κατασκευή Ιστοσελίδων", desc: "Γρήγορες ιστοσελίδες, έτοιμες για SEO" } },
  { slug: "website-redesign", icon: RefreshCw, en: { name: "Website Redesign", desc: "Modernize without losing rankings" }, el: { name: "Ανασχεδιασμός Ιστοσελίδας", desc: "Ανανέωση χωρίς απώλεια κατατάξεων" } },
  { slug: "seo-web-design", icon: Search, en: { name: "SEO Web Design", desc: "Built to rank from day one" }, el: { name: "Σχεδιασμός με SEO", desc: "Σχεδιασμός που κατατάσσεται ψηλά" } },
  { slug: "eshop-woocommerce", icon: ShoppingCart, en: { name: "E-shop Development", desc: "WooCommerce stores that sell" }, el: { name: "Κατασκευή E-shop", desc: "WooCommerce καταστήματα που πουλάνε" } },
  { slug: "local-seo", icon: MapPin, en: { name: "Local SEO", desc: "Win the Google map pack" }, el: { name: "Τοπικό SEO", desc: "Κυριαρχία στον χάρτη της Google" } },
  { slug: "seo-audits", icon: ClipboardCheck, en: { name: "SEO Audit", desc: "Find what holds you back" }, el: { name: "Τεχνικός Έλεγχος SEO", desc: "Βρείτε τι σας κρατά πίσω" } },
  { slug: "ai-visibility", icon: Sparkles, en: { name: "AI Visibility (GEO/AEO)", desc: "Show up in ChatGPT & Gemini" }, el: { name: "Ορατότητα σε AI", desc: "Εμφάνιση σε ChatGPT & Gemini" } },
  { slug: "eshop-seo", icon: TrendingUp, en: { name: "E-shop SEO", desc: "More organic product sales" }, el: { name: "SEO για E-shop", desc: "Περισσότερες οργανικές πωλήσεις" } },
  { slug: "content-creation", icon: FileText, en: { name: "Content Creation", desc: "SEO copy that converts" }, el: { name: "Δημιουργία Περιεχομένου", desc: "Κείμενα με SEO που μετατρέπουν" } },
  { slug: "link-building", icon: Link2, en: { name: "Link Building", desc: "Quality backlinks & digital PR" }, el: { name: "Δημιουργία Backlinks", desc: "Ποιοτικά backlinks & digital PR" } },
  { slug: "speed-optimization", icon: Gauge, en: { name: "Speed Optimization", desc: "Pass Core Web Vitals" }, el: { name: "Βελτιστοποίηση Ταχύτητας", desc: "Επιτυχία στα Core Web Vitals" } },
  { slug: "logo-design", icon: PenTool, en: { name: "Logo Design", desc: "Professional brand identity" }, el: { name: "Σχεδιασμός Λογοτύπου", desc: "Επαγγελματική εταιρική ταυτότητα" } },
];

const SOLUTION_ITEMS: { slug: string; en: string; el: string }[] = [
  { slug: "hotels", en: "Hotels", el: "Ξενοδοχεία" },
  { slug: "rent-a-car", en: "Rent-a-Car", el: "Rent-a-Car" },
  { slug: "tour-operators", en: "Tour Operators", el: "Τουριστικά γραφεία" },
  { slug: "villas-apartments", en: "Villas & Apartments", el: "Βίλες & Καταλύματα" },
  { slug: "restaurants", en: "Restaurants", el: "Εστιατόρια" },
  { slug: "real-estate", en: "Real Estate", el: "Ακίνητα" },
  { slug: "lawyers", en: "Lawyers", el: "Δικηγόροι" },
  { slug: "dentists", en: "Dentists", el: "Οδοντίατροι" },
];

export function AgencyMegaMenu({ locale, label }: { locale: SiteLocale; label: string }): ReactElement {
  const [open, setOpen] = useState(false);
  const isEl = locale === "el";
  const lp = (path: string) => localizedPath(locale, path);
  const chips = getTrustChips(locale);

  return (
    <div className="static" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className="inline-flex items-center gap-0.5 rounded-lg px-1 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        aria-expanded={open}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="absolute left-0 right-0 top-full z-[70] px-4 pt-2">
          <div className="mx-auto max-w-[1200px] overflow-hidden rounded-3xl border border-border/80 bg-background/95 shadow-[0_30px_70px_-20px_hsl(217_91%_60%_/_0.25)] backdrop-blur-xl dark:shadow-[0_30px_70px_-20px_hsl(0_0%_0%_/_0.55)]">
            <div className="grid gap-0 lg:grid-cols-[1fr_1fr_0.8fr]">
              {/* Services (2 columns) */}
              <div className="col-span-2 grid grid-cols-2 gap-1 p-5">
                <div className="col-span-2 mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {isEl ? "Υπηρεσίες" : "Services"}
                </div>
                {SERVICE_ITEMS.map((s) => {
                  const svcEl = isEl ? getServiceEl(s.slug) : null;
                  const name = isEl ? svcEl?.name ?? s.el.name : s.en.name;
                  const desc = isEl ? s.el.desc : s.en.desc;
                  const Icon = s.icon;
                  return (
                    <Link
                      key={s.slug}
                      href={lp(`/services/${s.slug}`)}
                      className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-primary/[0.06]"
                    >
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-foreground">{name}</span>
                        <span className="block truncate text-xs text-muted-foreground">{desc}</span>
                      </span>
                    </Link>
                  );
                })}
                <Link href={lp("/services")} className="col-span-2 mt-1 inline-flex items-center gap-1 px-2.5 text-sm font-semibold text-primary hover:underline">
                  {isEl ? "Όλες οι υπηρεσίες" : "All services"} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Solutions + featured CTA */}
              <div className="flex flex-col justify-between gap-4 border-t border-border/60 bg-muted/30 p-5 lg:border-l lg:border-t-0">
                <div>
                  <div className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {isEl ? "Λύσεις ανά κλάδο" : "Solutions by industry"}
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                    {SOLUTION_ITEMS.map((ind) => (
                      <Link key={ind.slug} href={lp(`/solutions/${ind.slug}`)} className="rounded-lg px-1.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">
                        {isEl ? ind.el : ind.en}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-primary to-[hsl(142_69%_50%)] p-4 text-primary-foreground shadow-lg">
                  <p className="text-sm font-bold">{isEl ? "Δωρεάν προσφορά σε 24 ώρες" : "Free quote in 24 hours"}</p>
                  <p className="mt-1 text-xs text-primary-foreground/85">
                    {isEl ? "Πείτε μας για το έργο σας και λάβετε πλάνο & τιμή." : "Tell us about your project and get a plan & price."}
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    <Link
                      href={lp("/get-started")}
                      onClick={() => trackCtaClick("mega_menu_quote")}
                      className="inline-flex items-center justify-center gap-1 rounded-xl bg-white px-3 py-2 text-sm font-bold text-primary transition hover:bg-white/90"
                    >
                      {isEl ? "Ζητήστε προσφορά" : "Get a quote"} <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                      href={WHATSAPP_HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackCtaClick("mega_menu_whatsapp")}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/40 px-3 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-white/10"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-primary-foreground/85">
                    {chips.map((c) => (
                      <span key={c}>✓ {c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AgencyMegaMenu;
