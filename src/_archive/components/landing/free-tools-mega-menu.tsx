"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ComponentType, type ReactElement } from "react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  CheckCircle,
  ChevronDown,
  Code,
  FileSearch,
  FileText,
  Gauge,
  Gift,
  Globe,
  Image,
  Layers,
  Link2,
  Map,
  Newspaper,
  Search,
  Share2,
  Shield,
  Sparkles,
  Target,
} from "lucide-react";
import { getAppPath } from "@/lib/app-links";

interface ToolItem {
  readonly name: string;
  readonly href: string;
  readonly icon: ComponentType<{ className?: string }>;
  readonly hot?: boolean;
  readonly new?: boolean;
  readonly soon?: boolean;
}

const toolCategories: readonly {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly color: string;
  readonly tools: readonly ToolItem[];
}[] = [
  {
    id: "analysis",
    name: "Analysis Tools",
    description: "Deep-dive into your SEO performance",
    color: "from-blue-500 to-cyan-500",
    tools: [
      { name: "AI Overview Checker", href: "/free-tools/ai-overview-checker", icon: Sparkles, hot: true },
      { name: "Heading Analyzer", href: "/free-tools/heading-analyzer", icon: Layers },
      { name: "Blog Preview Analyzer", href: "/free-tools/blog-preview-analyzer", icon: Newspaper, new: true },
      { name: "Keyword Clustering", href: "/free-tools/keyword-clustering", icon: Target },
      { name: "Keyword Density Checker", href: "/free-tools/keyword-density-checker", icon: BarChart3 },
      { name: "PAA Extractor", href: "/free-tools/paa-extractor", icon: Search },
    ],
  },
  {
    id: "technical",
    name: "Technical SEO",
    description: "Fix technical issues instantly",
    color: "from-orange-500 to-red-500",
    tools: [
      { name: "CWV Pulse", href: "/free-tools/cwv-pulse", icon: Gauge, hot: true },
      { name: "Robots.txt Tester", href: "/free-tools/robots-txt-generator", icon: Shield },
      { name: "Hreflang Builder", href: "/free-tools/hreflang-builder", icon: Globe },
      { name: "Canonical Checker", href: "/free-tools/canonical-checker", icon: Link2, soon: true },
      { name: "Redirect Mapper", href: "/free-tools/redirect-mapper", icon: Map, soon: true },
      { name: "Log File Analyzer", href: "/free-tools/log-analyzer", icon: FileSearch, soon: true },
    ],
  },
  {
    id: "generators",
    name: "Generators",
    description: "Create SEO-ready code & content",
    color: "from-green-500 to-emerald-500",
    tools: [
      { name: "Meta Tags Generator", href: "/free-tools/meta-tags-generator", icon: FileText },
      { name: "Schema Markup Generator", href: "/free-tools/schema-generator", icon: Code, hot: true },
      { name: "Search Operators Builder", href: "/free-tools/search-operators", icon: Target, new: true },
      { name: "OG Preview", href: "/free-tools/og-preview", icon: Share2, soon: true },
      { name: "Image SEO Auditor", href: "/free-tools/image-optimizer", icon: Image, soon: true },
    ],
  },
  {
    id: "ai",
    name: "AI & Content",
    description: "Leverage AI for better content",
    color: "from-violet-500 to-purple-500",
    tools: [
      { name: "ChatGPT SEO Prompts", href: "/free-tools/chatgpt-seo-prompts", icon: Brain, hot: true },
      { name: "AI Content Grader", href: "/free-tools/ai-content-grader", icon: Bot, soon: true },
      { name: "SERP Intent Analyzer", href: "/free-tools/serp-intent", icon: Target, soon: true },
    ],
  },
];

function ToolBadge(props: { readonly children: string; readonly className: string }): ReactElement {
  return (
    <span
      className={`inline-flex shrink-0 rounded border px-1.5 py-0 text-[10px] font-medium ${props.className}`}
    >
      {props.children}
    </span>
  );
}

const megaMenuCloseDelayMs = 220;

export function FreeToolsMegaMenu(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  function cancelScheduledClose(): void {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }
  function openMegaMenu(): void {
    cancelScheduledClose();
    setIsOpen(true);
  }
  function scheduleCloseMegaMenu(): void {
    cancelScheduledClose();
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      closeTimerRef.current = null;
    }, megaMenuCloseDelayMs);
  }
  useEffect(() => () => cancelScheduledClose(), []);
  return (
    <div
      className="relative"
      onMouseEnter={openMegaMenu}
      onMouseLeave={scheduleCloseMegaMenu}
    >
      <button
        type="button"
        className="group relative inline-flex items-center gap-1 rounded-lg px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
      >
        Free Tools
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden
        />
        <span className="absolute -right-1 -top-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">
            15+
          </span>
        </span>
      </button>
      {isOpen ? (
        <>
          {/*
            Pull the hover hit-area up into the header (-mt) and pad it back (pt) so the pointer
            can travel from the trigger to the panel without leaving this subtree (fixes instant close).
          */}
          <div
            className="fixed left-0 right-0 top-[var(--site-header-height)] z-[100] -mt-10 pt-10"
            onMouseEnter={openMegaMenu}
            onMouseLeave={scheduleCloseMegaMenu}
          >
            <div className="border-b border-border/80 bg-background/95 shadow-[0_24px_60px_-12px_hsl(217_91%_60%_/_0.15)] backdrop-blur-xl transition-opacity duration-200 dark:shadow-[0_24px_60px_-12px_hsl(0_0%_0%_/_0.45)]">
              <div className="h-1 bg-gradient-to-r from-primary via-primary/80 to-secondary" />
              <div className="mx-auto max-w-[1400px] px-6 py-10 sm:px-8 lg:px-10 lg:py-12">
                <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
                  <div className="lg:col-span-4">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
                      {toolCategories.map((category) => (
                        <div key={category.id} className="space-y-5">
                          <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${category.color}`} />
                            <h3 className="font-bold text-foreground">{category.name}</h3>
                          </div>
                          <p className="text-xs leading-relaxed text-muted-foreground">{category.description}</p>
                          <div className="space-y-1.5">
                            {category.tools.map((tool) => {
                              const Icon = tool.icon;
                              const isSoon = Boolean(tool.soon);
                              const href = isSoon ? "#" : getAppPath(tool.href);
                              const content = (
                                <>
                                  <Icon
                                    className={`h-4 w-4 shrink-0 ${isSoon ? "" : "transition-transform group-hover/item:scale-110"}`}
                                  />
                                  <span className="flex-1 truncate">{tool.name}</span>
                                  {tool.hot ? (
                                    <ToolBadge className="border-orange-500/20 bg-orange-500/10 text-orange-600 dark:text-orange-400">
                                      HOT
                                    </ToolBadge>
                                  ) : null}
                                  {tool.new ? (
                                    <ToolBadge className="border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400">
                                      NEW
                                    </ToolBadge>
                                  ) : null}
                                  {tool.soon ? (
                                    <ToolBadge className="text-muted-foreground">SOON</ToolBadge>
                                  ) : null}
                                </>
                              );
                              if (isSoon) {
                                return (
                                  <span
                                    key={tool.href}
                                    className="group/item flex cursor-not-allowed items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground opacity-60"
                                  >
                                    {content}
                                  </span>
                                );
                              }
                              return (
                                <Link
                                  key={tool.href}
                                  href={href}
                                  className="group/item flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-foreground transition-all hover:bg-primary/10 hover:text-primary"
                                  onClick={() => {
                                    cancelScheduledClose();
                                    setIsOpen(false);
                                  }}
                                >
                                  {content}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-1 lg:pl-2">
                    <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-purple-500/10 to-secondary/10 p-7">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
                        <Gift className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="mb-3 font-bold text-foreground">All Tools Free Forever</h4>
                      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                        No credit card. No limits. Just powerful SEO tools.
                      </p>
                      <ul className="mb-5 space-y-2.5 text-xs text-muted-foreground">
                        {["No signup required", "Export all results", "Daily usage: Unlimited"].map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 shrink-0 text-success" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/tools"
                        className="btn btn-gradient inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-95"
                        onClick={() => {
                          cancelScheduledClose();
                          setIsOpen(false);
                        }}
                      >
                        View All Tools
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-muted/50 p-3 text-center">
                        <div className="text-2xl font-black text-primary">15+</div>
                        <div className="text-[10px] text-muted-foreground">Live Tools</div>
                      </div>
                      <div className="rounded-lg bg-muted/50 p-3 text-center">
                        <div className="text-2xl font-black text-secondary">100%</div>
                        <div className="text-[10px] text-muted-foreground">Free</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
