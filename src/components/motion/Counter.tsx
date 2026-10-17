/**
 * A trust figure.
 *
 * The server HTML is the final value, and nothing on the client replaces it.
 * A count-up that started at 0 painted "0+" / "0" / "0h" for screenshots,
 * crawlers, no-JS visitors, reduced-motion users, and any case where the
 * intersection observer never finished the animation. The resting text is
 * the real number, with the same prefix and suffix as before.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <span className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
