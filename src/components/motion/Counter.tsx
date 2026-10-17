/**
 * A trust figure.
 *
 * The HTML is the final value, and the client does not replace it. The old
 * count-up started at 0 once the strip was on screen, so a screenshot or
 * crawler that caught it there read "0+" / "0" / "0h" until the animation
 * finished, and a stopped animation could rest on that 0. The resting text
 * is the real number, with the same prefix and suffix.
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
