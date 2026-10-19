import type { QueryRow } from "./engine";

/**
 * Reads the Queries.csv (or Pages.csv) that Search Console's Performance
 * report exports: a text column, then Clicks, Impressions, CTR and Position.
 * Headers change with the account language, so columns are found by name
 * when they are English and by position otherwise. Also accepts a paste from
 * Google Sheets (tabs) and decimal commas.
 */

export interface ParseResult {
  readonly rows: QueryRow[];
  readonly skipped: number;
  readonly error?: string;
}

function splitLine(line: string, sep: string): string[] {
  const out: string[] = [];
  let cur = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (quoted && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else quoted = !quoted;
    } else if (ch === sep && !quoted) {
      out.push(cur);
      cur = "";
    } else cur += ch;
  }
  out.push(cur);
  return out.map((c) => c.trim());
}

function number(raw: string): number {
  let s = raw.replace(/[%\s ]/g, "");
  // 1.234,5 or 12,5 -> decimal comma; 1,234.5 -> thousands comma.
  if (/,\d{1,2}$/.test(s) && !/\.\d+,/.test(s)) s = s.replace(/\./g, "").replace(",", ".");
  else s = s.replace(/,/g, "");
  const v = Number(s);
  return Number.isFinite(v) ? v : NaN;
}

export function parseSearchConsoleExport(text: string): ParseResult {
  const lines = text.replace(/^﻿/, "").split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return { rows: [], skipped: 0, error: "The file needs a header row and at least one row of data." };
  const first = lines[0];
  const sep = first.includes("\t") ? "\t" : first.split(";").length > first.split(",").length ? ";" : ",";
  const header = splitLine(first, sep).map((h) => h.toLowerCase());
  const find = (re: RegExp, fallback: number) => {
    const i = header.findIndex((h) => re.test(h));
    return i >= 0 ? i : fallback;
  };
  const cols = {
    key: find(/quer|page|ερωτ|σελίδ/, 0),
    clicks: find(/^clicks?$|κλικ/, 1),
    impressions: find(/impression|εμφαν/, 2),
    ctr: find(/ctr/, 3),
    position: find(/position|θέση/, 4),
  };
  if (header.length < 5) {
    return { rows: [], skipped: 0, error: "Expected five columns: query (or page), clicks, impressions, CTR and position. Export from Search Console → Performance → Export → CSV and upload Queries.csv." };
  }
  const rows: QueryRow[] = [];
  let skipped = 0;
  for (const line of lines.slice(1)) {
    const cells = splitLine(line, sep);
    const key = cells[cols.key];
    const clicks = number(cells[cols.clicks] ?? "");
    const impressions = number(cells[cols.impressions] ?? "");
    const position = number(cells[cols.position] ?? "");
    let ctr = number(cells[cols.ctr] ?? "");
    if (!key || !Number.isFinite(clicks) || !Number.isFinite(impressions) || !Number.isFinite(position) || impressions <= 0) {
      skipped++;
      continue;
    }
    // Exports write "3.4%"; a ratio column would already be below 1.
    if (!Number.isFinite(ctr)) ctr = clicks / impressions;
    else if (ctr > 1 || (cells[cols.ctr] ?? "").includes("%")) ctr = ctr / 100;
    rows.push({ key, clicks, impressions, ctr, position });
  }
  if (rows.length === 0) return { rows, skipped, error: "No rows could be read. Check that the file is the Queries.csv from a Search Console export." };
  return { rows, skipped };
}
