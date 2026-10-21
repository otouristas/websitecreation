import type { HomeCopy } from '@/components/pages/home/copy';

/** Illustrative app window. Every figure inside is sample data, never a client result. */
export function SampleWindow({ copy }: { readonly copy: HomeCopy }) {
  return (
    <div className="relative min-w-0">
      <figure className="relative min-w-0 overflow-hidden rounded-[22px] border border-hairline bg-surface/80 shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_25%,transparent),0_30px_80px_-24px_color-mix(in_oklab,var(--primary)_45%,transparent)]">
        <figcaption className="sr-only">{copy.sampleCaption}</figcaption>
        <div className="flex items-center gap-2 border-b border-hairline px-3 py-3 sm:px-4">
          <span className="size-2.5 shrink-0 rounded-full bg-[#FF5F57]" aria-hidden />
          <span className="size-2.5 shrink-0 rounded-full bg-[#FEBC2E]" aria-hidden />
          <span className="size-2.5 shrink-0 rounded-full bg-[#28C840]" aria-hidden />
          <div className="ml-2 min-w-0 flex-1 truncate rounded-md bg-foreground/5 px-3 py-1 font-code text-[11px] text-muted-foreground">
            app.anotherseoguru.com / aegean-suites.example
          </div>
          <span className="shrink-0 whitespace-nowrap rounded-full border border-warning/40 bg-warning/10 px-2 py-0.5 text-[10.5px] font-medium text-warning">
            {copy.sample}
          </span>
        </div>
        <div className="grid min-w-0 grid-cols-1 sm:grid-cols-[136px_minmax(0,1fr)]" aria-hidden>
          <aside className="hidden border-r border-hairline p-3 text-[12.5px] text-muted-foreground sm:block">
            <div className="mb-3 flex items-center gap-2 px-2 pt-1">
              <img src="/brand/asg-mark.svg" alt="" width={20} height={20} className="size-5" />
              <span className="font-semibold text-foreground">{copy.workspace}</span>
            </div>
            <div className="rounded-lg bg-primary/10 px-2.5 py-2 font-medium text-primary">{copy.nav[0]}</div>
            <div className="px-2.5 py-2">{copy.nav[1]}</div>
            <div className="px-2.5 py-2">{copy.nav[2]}</div>
            <div className="flex items-center justify-between px-2.5 py-2">
              {copy.nav[3]}
              <span className="rounded bg-foreground/10 px-1.5 text-[10px]">{copy.tasksCount}</span>
            </div>
            <div className="px-2.5 py-2">{copy.nav[4]}</div>
            <div className="mt-6 rounded-xl border border-hairline p-2.5">
              <div className="flex items-center gap-1.5 text-[11px] text-foreground/80">
                <img src="/integrations/service-google_search_console.svg" alt="" width={14} height={14} className="size-3.5" />
                Search Console
              </div>
              <div className="mt-1 text-[10.5px] text-success">● {copy.connected}</div>
            </div>
          </aside>
          <div className="min-w-0 space-y-3.5 p-3 sm:p-4">
            <div className="rounded-2xl border border-hairline bg-foreground/[0.02] p-3 sm:p-4">
              <div className="flex items-end justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[11.5px] text-muted-foreground">{copy.clicks}</div>
                  <div className="mt-0.5 flex flex-wrap items-baseline gap-2">
                    <span className="text-[26px] font-bold tracking-tight text-foreground">14.8K</span>
                    <span className="rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success">↗ +23%</span>
                  </div>
                </div>
                <div className="flex shrink-0 gap-1 text-[10.5px]">
                  <span className="rounded-md bg-foreground/10 px-2 py-1 text-foreground">{copy.ranges[0]}</span>
                  <span className="px-1.5 py-1 text-muted-foreground sm:px-2">{copy.ranges[1]}</span>
                  <span className="hidden px-2 py-1 text-muted-foreground min-[420px]:inline">{copy.ranges[2]}</span>
                </div>
              </div>
              <svg viewBox="0 0 400 110" className="mt-2 h-[92px] w-full sm:h-[110px]" preserveAspectRatio="none" aria-hidden>
                <defs>
                  <linearGradient id="home-sample-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#2FC6F4" stopOpacity="0.45" />
                    <stop offset="1" stopColor="#2FC6F4" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="home-sample-stroke" x1="0" x2="1">
                    <stop offset="0" stopColor="#2FC6F4" />
                    <stop offset="1" stopColor="#78E6A3" />
                  </linearGradient>
                </defs>
                <g stroke="currentColor" className="text-foreground/10">
                  <line x1="0" y1="27" x2="400" y2="27" />
                  <line x1="0" y1="55" x2="400" y2="55" />
                  <line x1="0" y1="83" x2="400" y2="83" />
                </g>
                <path d="M0 92 C30 88 50 90 75 84 S120 80 145 76 S190 79 215 66 S260 58 285 50 S330 40 350 30 S385 18 400 14 L400 110 L0 110Z" fill="url(#home-sample-fill)" />
                <path d="M0 92 C30 88 50 90 75 84 S120 80 145 76 S190 79 215 66 S260 58 285 50 S330 40 350 30 S385 18 400 14" fill="none" stroke="url(#home-sample-stroke)" strokeWidth="2.5" />
                <line x1="215" y1="8" x2="215" y2="110" stroke="#78E6A3" strokeDasharray="3 4" strokeOpacity="0.7" />
                <circle cx="215" cy="66" r="4.5" fill="#050D1A" stroke="#78E6A3" strokeWidth="2" />
              </svg>
              <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                <span className="size-2 shrink-0 rounded-full bg-success" />
                <span className="min-w-0">{copy.shipped}</span>
              </div>
            </div>
            <div className="grid min-w-0 gap-3.5 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              <div className="min-w-0 rounded-2xl border border-hairline bg-foreground/[0.02] p-3 sm:p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12.5px] font-semibold text-foreground">{copy.doNext}</span>
                  <span className="shrink-0 text-[10.5px] font-medium text-success">{copy.clickImpact}</span>
                </div>
                <ul className="mt-3 space-y-2 text-[12px]">
                  {copy.fixes.map((fix, index) => (
                    <li key={fix.title} className="flex items-center gap-2.5 rounded-xl bg-foreground/[0.03] px-2.5 py-2">
                      <span className="grid size-5 shrink-0 place-items-center rounded-md bg-primary/15 text-[10.5px] font-bold text-primary">{index + 1}</span>
                      <span className="min-w-0 flex-1 leading-snug text-foreground/90">{fix.title}</span>
                      <span className="shrink-0 font-semibold text-success">{fix.impact}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="min-w-0 rounded-2xl border border-hairline bg-foreground/[0.02] p-3 sm:p-4">
                <div className="text-[12.5px] font-semibold text-foreground">{copy.aiTitle}</div>
                <div className="mt-0.5 truncate text-[10.5px] text-muted-foreground">{copy.aiQuery}</div>
                <ul className="mt-3 space-y-2 text-[11.5px]">
                  {copy.engines.map((engine) => (
                    <li key={engine.name} className="flex items-center justify-between gap-2">
                      <span className="min-w-0 truncate text-foreground/85">{engine.name}</span>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10.5px] ${engine.cited ? 'bg-success/15 text-success' : 'bg-primary/15 text-primary'}`}>
                        {engine.state}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </figure>
      <div className="relative z-10 mt-4 w-full max-w-[300px] rounded-2xl border border-hairline bg-surface/90 p-3.5 shadow-[0_20px_50px_-16px_oklch(0_0_0/55%)] backdrop-blur lg:absolute lg:-bottom-16 lg:left-0 lg:mt-0">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-full bg-[linear-gradient(135deg,var(--primary),var(--signal))] text-[12px] font-bold text-primary-foreground">A</span>
          <span className="text-[12.5px] font-semibold text-foreground">{copy.asterName}</span>
          <span className="ml-auto text-[10px] text-muted-foreground">{copy.asterSample}</span>
        </div>
        <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{copy.asterBody}</p>
      </div>
    </div>
  );
}
