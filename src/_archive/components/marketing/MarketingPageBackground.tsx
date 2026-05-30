import type { ReactElement } from "react";

/**
 * Multi-layered marketing backdrop adapted from
 * [Paddle Next.js starter kit](https://github.com/PaddleHQ/paddle-nextjs-starter-kit)
 * (`home-page.css` + `HomePageBackground`), using our CSS variables for blurs
 * so primary / secondary brand colors apply in light and dark mode.
 */
export function MarketingPageBackground(): ReactElement {
  return (
    <div className="asg-paddle-canvas" aria-hidden>
      <div className="asg-paddle-grain-blur" />
      <div className="asg-paddle-grain" />
      <div className="asg-paddle-grid" />
      <div className="asg-paddle-orb-primary" />
      <div className="asg-paddle-orb-small" />
    </div>
  );
}
