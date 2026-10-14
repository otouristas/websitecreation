import {
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  Building2,
  CreditCard,
  FileText,
  KeyRound,
  Layers,
  LayoutDashboard,
  Library,
  Link2,
  ListChecks,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

/** Icon keys content files may use (cards, sidebar). Unknown keys render without an icon. */
export const DOC_ICONS: Readonly<Record<string, LucideIcon>> = {
  rocket: Rocket,
  smartphone: Smartphone,
  "bar-chart": BarChart3,
  key: KeyRound,
  shield: ShieldCheck,
  bot: Bot,
  bell: Bell,
  sparkles: Sparkles,
  layout: LayoutDashboard,
  "credit-card": CreditCard,
  building: Building2,
  book: BookOpen,
  search: Search,
  zap: Zap,
  link: Link2,
  list: ListChecks,
  layers: Layers,
  library: Library,
  file: FileText,
  wrench: Wrench,
};

export function docIcon(key: string | undefined): LucideIcon | null {
  return key ? (DOC_ICONS[key] ?? null) : null;
}

/** Renders the icon for a key, or nothing. */
export function DocIcon({ name, className }: { readonly name: string | undefined; readonly className?: string }) {
  const Icon = name ? DOC_ICONS[name] : undefined;
  return Icon ? <Icon className={className} aria-hidden /> : null;
}
