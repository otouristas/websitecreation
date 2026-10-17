import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { appLink } from "@/components/gsc-boost/copy";
import { moduleById } from "@/components/gsc-boost/modules";
import { cn } from "@/lib/cn";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { DevicePhone } from "./DevicePhone";

const SHOTS = {
  opportunities: { src: "/images/product/bento-opportunities.webp", width: 1400, height: 800 },
  performance: { src: "/images/product/bento-performance.webp", width: 1400, height: 700 },
  ai: { src: "/images/product/bento-ai.webp", width: 1200, height: 664 },
  tasks: { src: "/images/product/bento-tasks.webp", width: 1400, height: 772 },
  integrations: { src: "/images/product/bento-integrations.webp", width: 1200, height: 640 },
  phone: { src: "/images/product/hero-phone.webp", width: 780, height: 1688 },
} as const;

type ShotId = keyof typeof SHOTS;

type TileMedia =
  | { readonly kind: "shot"; readonly id: ShotId; readonly sizes: string; readonly frame: string }
  | { readonly kind: "phone" };

type Tile = {
  readonly key: string;
  readonly title: string;
  readonly body: string;
  readonly href: string;
  readonly external: boolean;
  readonly className: string;
  readonly media: TileMedia;
};

function TileMediaView({ media }: { readonly media: TileMedia }) {
  switch (media.kind) {
    case "shot": {
      const shot = SHOTS[media.id];
      return (
        <div className={cn("relative mt-auto overflow-hidden rounded-t-xl border border-b-0 border-hairline bg-background", media.frame)}>
          <Image
            src={shot.src}
            alt=""
            fill
            sizes={media.sizes}
            quality={66}
            className="object-cover object-left-top"
          />
        </div>
      );
    }
    case "phone":
      return (
        <div className="relative mt-2 flex flex-1 items-end justify-center overflow-hidden px-6 pt-2">
          <DevicePhone className="w-[196px] translate-y-8 sm:w-[210px]">
            <Image
              src={SHOTS.phone.src}
              alt=""
              width={SHOTS.phone.width}
              height={SHOTS.phone.height}
              quality={64}
              sizes="210px"
              className="h-auto w-full"
            />
          </DevicePhone>
        </div>
      );
    default: {
      const exhaustive: never = media;
      return exhaustive;
    }
  }
}

function TileLink({ tile, children }: { readonly tile: Tile; readonly children: ReactNode }) {
  const className =
    "group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-hairline bg-background text-left shadow-[0_1px_0_0_oklch(1_0_0/4%)_inset] transition-[border-color,transform] duration-200 hover:border-brand/40 motion-safe:hover:-translate-y-px motion-reduce:transition-none motion-reduce:hover:translate-y-0";
  if (tile.external) {
    return (
      <a href={tile.href} className={cn(className, tile.className)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={tile.href} className={cn(className, tile.className)}>
      {children}
    </Link>
  );
}

/**
 * Product capabilities as a bento. Copy is the existing module taglines and
 * the homepage "ship and measure" line; screenshots are crops of the public demo.
 */
export function ProductBento({ locale, className }: { readonly locale: SiteLocale; readonly className?: string }) {
  const isEl = locale === "el";
  const tx = (en: string, el: string) => (isEl ? el : en);
  const lp = (path: string) => localizedPath(locale, path);
  const opportunities = moduleById("opportunities");
  const performance = moduleById("performance");
  const ai = moduleById("ai-visibility");

  const tiles: readonly Tile[] = [
    {
      key: "opportunities",
      title: opportunities.name[locale],
      body: opportunities.tagline[locale],
      href: `${lp("/platform/features")}#opportunities`,
      external: false,
      className: "md:col-span-2 lg:col-span-7",
      media: {
        kind: "shot",
        id: "opportunities",
        sizes: "(min-width: 1024px) 58vw, 100vw",
        frame: "mx-5 h-[230px] sm:mx-6 sm:h-[280px] lg:h-[320px]",
      },
    },
    {
      key: "iphone",
      title: tx("iPhone app", "Εφαρμογή iPhone"),
      body: tx(
        "This week's fixes, rank tracking, alerts and widgets on your phone, on the same account.",
        "Οι διορθώσεις της εβδομάδας, θέσεις, ειδοποιήσεις και widgets στο κινητό, με τον ίδιο λογαριασμό.",
      ),
      href: lp("/platform/iphone"),
      external: false,
      className: "max-h-[460px] lg:col-span-5 lg:row-span-2 lg:max-h-none",
      media: { kind: "phone" },
    },
    {
      key: "performance",
      title: performance.name[locale],
      body: performance.tagline[locale],
      href: `${lp("/platform/features")}#performance`,
      external: false,
      className: "lg:col-span-4",
      media: {
        kind: "shot",
        id: "performance",
        sizes: "(min-width: 1024px) 34vw, 100vw",
        frame: "mx-5 h-[190px] sm:mx-6 lg:h-[210px]",
      },
    },
    {
      key: "ai",
      title: ai.name[locale],
      body: ai.tagline[locale],
      href: `${lp("/platform/features")}#ai-visibility`,
      external: false,
      className: "lg:col-span-3",
      media: {
        kind: "shot",
        id: "ai",
        sizes: "(min-width: 1024px) 26vw, 100vw",
        frame: "mx-5 h-[190px] sm:mx-6 lg:h-[210px]",
      },
    },
    {
      key: "tasks",
      title: tx("Tasks", "Εργασίες"),
      body: tx(
        "Turn fixes into tasks, mark what you shipped and watch the result on the chart.",
        "Κάντε τις διορθώσεις εργασίες, σημειώστε τι αλλάξατε και δείτε το αποτέλεσμα.",
      ),
      href: appLink("/demo/tasks/board", locale, "home-bento-tasks"),
      external: true,
      className: "lg:col-span-6",
      media: {
        kind: "shot",
        id: "tasks",
        sizes: "(min-width: 1024px) 46vw, 100vw",
        frame: "mx-5 h-[210px] sm:mx-6 lg:h-[240px]",
      },
    },
    {
      key: "integrations",
      title: tx("Chrome & WordPress", "Chrome & WordPress"),
      body: tx(
        "An SEO extension for Chrome and a Search Console plugin for WordPress, on the same account.",
        "Επέκταση SEO για Chrome και plugin Search Console για WordPress, στον ίδιο λογαριασμό.",
      ),
      href: lp("/platform/integrations"),
      external: false,
      className: "lg:col-span-6",
      media: {
        kind: "shot",
        id: "integrations",
        sizes: "(min-width: 1024px) 46vw, 100vw",
        frame: "mx-5 h-[210px] sm:mx-6 lg:h-[240px]",
      },
    },
  ];

  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-12 lg:gap-4">
        {tiles.map((tile) => (
          <TileLink key={tile.key} tile={tile}>
            <div className="px-5 pt-5 sm:px-6 sm:pt-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-[18px] font-semibold tracking-[-0.03em] text-foreground">{tile.title}</h3>
                <ArrowUpRight
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand motion-reduce:transition-none"
                  aria-hidden
                />
              </div>
              <p className="mt-1.5 max-w-[42ch] text-[13.5px] leading-relaxed text-muted-foreground">{tile.body}</p>
            </div>
            <TileMediaView media={tile.media} />
          </TileLink>
        ))}
      </div>
      <p className="mt-4 text-center text-[12.5px] text-muted-foreground">
        {tx("Live demo · sample data", "Ζωντανή επίδειξη · δείγμα δεδομένων")}
      </p>
    </div>
  );
}
