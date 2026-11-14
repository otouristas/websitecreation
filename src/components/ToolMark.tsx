import Image from "next/image";
import { cn } from "@/lib/cn";

const sources = {
  web: "/brand/asg-mark.svg",
  gsc: "/integrations/service-google_search_console.svg",
  ga: "/integrations/service-google_analytics.svg",
  wp: "/integrations/service-wordpress.svg",
  iphone: "/integrations/service-apple.svg",
  android: "/integrations/service-android.svg",
  chrome: "/integrations/service-chrome.svg",
  mcp: "/integrations/service-mcp.svg",
  chatgpt: "/integrations/service-chatgpt.svg",
  gemini: "/integrations/service-gemini.svg",
  perplexity: "/integrations/service-perplexity.svg",
  claude: "/integrations/service-claude.svg",
  x: "/integrations/service-x.svg",
  linkedin: "/integrations/service-linkedin.svg",
} as const;

export type ToolBrand = keyof typeof sources;

export function ToolMark({ brand, className }: { readonly brand: ToolBrand; readonly className?: string }) {
  return (
    <Image src={sources[brand]} alt="" aria-hidden="true" width={24} height={24} unoptimized
      data-tool-brand={brand}
      className={cn("size-6 shrink-0 object-contain", (brand === "iphone" || brand === "x") && "dark:invert", className)} />
  );
}
