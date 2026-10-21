# AnotherSEOGuru color palette

The full color palette of anotherseoguru.com (the design of the 2026-10 redesign).

**Source of truth:** `src/brand/tokens/brand.tokens.json`. The CSS (`src/brand/tokens/brand.tokens.css`) and TS (`brand.tokens.ts`) are generated from it with `src/brand/scripts/sync_tokens.py`. To change a color, change the JSON, regenerate, and then update this file.

The site is **dark-first**. Dark is the default look; `.light` on `<html>` switches to light.

## 1. Brand colors (same in both themes)

| Swatch | Token | HEX | Use |
|---|---|---|---|
| ![](https://placehold.co/24x24/007BFF/007BFF.png) | `--asg-brand-blue` | `#007BFF` | Start of the brand gradient, logo |
| ![](https://placehold.co/24x24/2FC6F4/2FC6F4.png) | `--asg-brand-cyan` | `#2FC6F4` | Main action in dark (buttons, "Sign up free") |
| ![](https://placehold.co/24x24/18BFAE/18BFAE.png) | `--asg-brand-teal` | `#18BFAE` | Middle of the gradient |
| ![](https://placehold.co/24x24/78E6A3/78E6A3.png) | `--asg-brand-mint` | `#78E6A3` | End of the gradient, success/check in dark |
| ![](https://placehold.co/24x24/050D1A/050D1A.png) | `--asg-brand-ink` | `#050D1A` | Dark background, labels on cyan buttons |
| ![](https://placehold.co/24x24/F5F7FB/F5F7FB.png) | `--asg-brand-paper` | `#F5F7FB` | Light background, text in dark |

**Brand gradient** (`--asg-brand-gradient`):

```css
linear-gradient(135deg, #007BFF 0%, #2FC6F4 38%, #18BFAE 68%, #78E6A3 100%)
```

Used on gradient borders (e.g. the App column in the comparison table), `.gradient-primary` and the logo.

**Accent gradient for the italic words** in headings (e.g. *shipped fixes*, *πελάτες*):

```css
linear-gradient(90deg, var(--primary), var(--signal))
/* dark: #2FC6F4 → #78E6A3   ·   light: #075CE5 → #137548 */
```

Rule: the span gets `inline-block`, end padding and `box-decoration-break: clone` so the last letter is never clipped.

## 2. Roles per theme

| Role | Token | Dark (default) | Light |
|---|---|---|---|
| Page background | `--asg-background` | `#050D1A` | `#F5F7FB` |
| Card / surface | `--asg-surface` | `#0C1728` | `#FFFFFF` |
| Raised surface | `--asg-surface-raised` | `#13223A` | `#EBF0F7` |
| Text | `--asg-text` | `#F5F7FB` | `#0B1526` |
| Secondary text | `--asg-text-secondary` | `#BAC6D8` | `#42536B` |
| Muted text | `--asg-text-muted` | `#94A4BC` | `#596A80` |
| Hairline / border | `--asg-border-subtle` | `#26354D` | `#D8E1ED` |
| Control border | `--asg-border-control` | `#667995` | `#77879E` |
| **Action (CTA)** | `--asg-action` | `#2FC6F4` | `#075CE5` |
| Action text | `--asg-action-foreground` | `#050D1A` | `#FFFFFF` |
| Action hover | `--asg-action-hover` | `#65D5F6` | `#064FC5` |
| Action pressed | `--asg-action-pressed` | `#1AA5D2` | `#0442A8` |
| Action disabled | `--asg-action-disabled` | `#233249` | `#E2E8F0` |
| Disabled text | `--asg-action-disabled-foreground` | `#A3B1C5` | `#586779` |
| Link | `--asg-link` | `#61CFFF` | `#075CE5` |
| Focus ring | `--asg-focus` | `#61CFFF` | `#075CE5` |
| Selected | `--asg-selected` | `#12314A` | `#E5F0FF` |
| Selected text | `--asg-selected-foreground` | `#61CFFF` | `#064FC5` |
| Success | `--asg-success` | `#78E6A3` | `#137548` |
| Success surface | `--asg-success-surface` | `#102D23` | `#E8F8EF` |
| Warning | `--asg-warning` | `#F3C36B` | `#8A5000` |
| Warning surface | `--asg-warning-surface` | `#342815` | `#FFF3D6` |
| Danger | `--asg-danger` | `#FF8DA1` | `#B4233C` |
| Danger surface | `--asg-danger-surface` | `#361C29` | `#FDECF0` |
| Info | `--asg-info` | `#61CFFF` | `#075CE5` |
| Info surface | `--asg-info-surface` | `#12314A` | `#E5F0FF` |

## 3. Charts

| Token | Dark | Light |
|---|---|---|
| `--asg-chart1` | `#61CFFF` | `#075CE5` |
| `--asg-chart2` | `#37D3C5` | `#087B86` |
| `--asg-chart3` | `#78E6A3` | `#137548` |
| `--asg-chart4` | `#F3C36B` | `#8A5000` |
| `--asg-chart5` | `#FF8DA1` | `#B4233C` |

## 4. Tailwind names (from `src/app/globals.css`)

In code, use the semantic names, not raw HEX values:

| Tailwind | Maps to |
|---|---|
| `bg-background`, `text-foreground` | background / text |
| `bg-surface`, `bg-surface-raised`, `bg-card` | surfaces |
| `border-hairline`, `border-border` | `--asg-border-subtle` |
| `bg-primary`, `text-primary-foreground` | action / action text |
| `text-link`, `text-brand`, `text-signature` | `--asg-link` |
| `text-signal`, `text-success` | `--asg-success` (mint in dark) |
| `text-warning`, `text-destructive` | warning / danger |
| `text-muted-foreground` | `--asg-text-secondary` |
| `ring-ring` | focus |
| `chart-1` … `chart-5` | charts |

## 5. Rules

- Dark: cyan button with Ink label. Light: blue button with white label.
- Selection, success, warning, danger and charts stay separate roles; don't reuse one for another.
- Never write a raw HEX in a component; use a token or Tailwind name.
- Client logos (`.home-logo`): in dark they get `filter: invert(1)` so the dark marks turn light; in light they stay as they are.
- The header pill, footer and cookie banner use these tokens; don't change them.
