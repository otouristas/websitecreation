/**
 * SEO Launch calendar in Europe/Athens.
 *
 * Months are calendar months on the Athens civil date, so a start on the
 * 31st does not spill into the following month and a DST change does not
 * eat or add a day. Our own delay does not consume a month. A documented
 * client pause does.
 */

export interface PauseInterval {
  readonly from: string;
  readonly to: string;
  readonly cause: 'client' | 'us';
}

export interface ProgramClock {
  readonly startDate: string | null;
  readonly months: number;
  readonly pauses: readonly PauseInterval[];
  readonly autoRenew: false;
}

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

export function athensCivilDate(instant: Date): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Athens',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(instant);
  const pick = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
  return `${pick('year')}-${pick('month')}-${pick('day')}`;
}

function parseIsoDate(value: string): { year: number; month: number; day: number } {
  const match = ISO_DATE.exec(value);
  if (!match) throw new Error(`seo-program: expected YYYY-MM-DD, received ${value}`);
  return { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
}

function formatIsoDate(year: number, month: number, day: number): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${year}-${pad(month)}-${pad(day)}`;
}

function lastDayOfMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/** Add calendar months. Day-of-month clamps to the target month (31 Jan + 1 = 28 Feb). */
export function addCalendarMonths(isoDate: string, months: number): string {
  const { year, month, day } = parseIsoDate(isoDate);
  const index = month - 1 + months;
  const nextYear = year + Math.floor(index / 12);
  const nextMonth = (index % 12) + 1;
  const nextDay = Math.min(day, lastDayOfMonth(nextYear, nextMonth));
  return formatIsoDate(nextYear, nextMonth, nextDay);
}

function dateToUtcDay(isoDate: string): number {
  const { year, month, day } = parseIsoDate(isoDate);
  return Date.UTC(year, month - 1, day) / 86_400_000;
}

/** Client pauses extend the end date. Pauses caused by us do not. */
export function programEndDate(program: ProgramClock): string | null {
  if (!program.startDate || program.months <= 0) return null;
  if (program.autoRenew !== false) {
    throw new Error('seo-program: auto_renew must be false');
  }
  let end = addCalendarMonths(program.startDate, program.months);
  for (const pause of program.pauses) {
    if (pause.cause !== 'client') continue;
    const days = Math.max(0, dateToUtcDay(pause.to) - dateToUtcDay(pause.from));
    end = addCalendarMonths(end, 0);
    const shifted = dateToUtcDay(end) + days;
    end = new Date(shifted * 86_400_000).toISOString().slice(0, 10);
  }
  return end;
}

export type ProgramPhase = 'not_started' | 'paused' | 'active' | 'ended';

export function programPhase(program: ProgramClock, today: string): ProgramPhase {
  if (!program.startDate) return 'not_started';
  if (today < program.startDate) return 'not_started';
  const clientPause = program.pauses.find((pause) => pause.cause === 'client' && today >= pause.from && today < pause.to);
  if (clientPause) return 'paused';
  const end = programEndDate(program);
  if (!end || today >= end) return 'ended';
  return 'active';
}

/**
 * Which programme month `today` falls in, counting only elapsed active time.
 * Returns null when the programme has not started or is paused.
 */
export function activeMonthNumber(program: ProgramClock, today: string): number | null {
  const phase = programPhase(program, today);
  if (phase !== 'active' || !program.startDate) return null;
  let cursor = program.startDate;
  for (let month = 1; month <= program.months; month += 1) {
    const next = addCalendarMonths(program.startDate, month);
    const pausedDaysBefore = program.pauses
      .filter((pause) => pause.cause === 'client' && pause.from < next)
      .reduce((sum, pause) => sum + Math.max(0, dateToUtcDay(pause.to) - dateToUtcDay(pause.from)), 0);
    const windowEnd = new Date((dateToUtcDay(next) + pausedDaysBefore) * 86_400_000).toISOString().slice(0, 10);
    if (today >= cursor && today < windowEnd) return month;
    cursor = windowEnd;
  }
  return null;
}
