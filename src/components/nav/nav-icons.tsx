import type { ComponentType } from 'react';
import {
  BookOpen,
  Bot,
  Building2,
  Car,
  ClipboardCheck,
  Compass,
  FileText,
  Gauge,
  Globe,
  Home,
  Hotel,
  KeyRound,
  LayoutGrid,
  Library,
  LineChart,
  Link2,
  ListChecks,
  MapPin,
  MessageSquare,
  Smartphone,
  Palette,
  PenTool,
  Plug,
  Puzzle,
  RefreshCw,
  Scale,
  ScanSearch,
  Search,
  ShieldCheck,
  ShoppingCart,
  Smile,
  Sparkles,
  Swords,
  Tag,
  TrendingUp,
  Users,
  UtensilsCrossed,
} from 'lucide-react';
import type { NavIconKey } from '@/data/nav-menu';

type NavIcon = ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' }>;

/** Same mark as the WordPress pages. Lucide has no WordPress glyph. */
function WordPressIcon({ className }: { readonly className?: string; readonly 'aria-hidden'?: boolean | 'true' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="m6.5 8.5 3 8 2.5-6 2.5 6 3-8" />
    </svg>
  );
}

export const NAV_ICONS: Record<NavIconKey, NavIcon> = {
  search: Search,
  map: MapPin,
  sparkles: Sparkles,
  audit: ClipboardCheck,
  cart: ShoppingCart,
  trend: TrendingUp,
  link: Link2,
  pen: PenTool,
  globe: Globe,
  refresh: RefreshCw,
  gauge: Gauge,
  palette: Palette,
  hotel: Hotel,
  car: Car,
  compass: Compass,
  home: Home,
  utensils: UtensilsCrossed,
  building: Building2,
  scale: Scale,
  tooth: Smile,
  list: ListChecks,
  chart: LineChart,
  key: KeyRound,
  file: FileText,
  shield: ShieldCheck,
  swords: Swords,
  bot: Bot,
  message: MessageSquare,
  users: Users,
  phone: Smartphone,
  plug: Plug,
  puzzle: Puzzle,
  wordpress: WordPressIcon,
  book: BookOpen,
  library: Library,
  scan: ScanSearch,
  tag: Tag,
  grid: LayoutGrid,
};
