/** S3 bill model for the /cost/ page. Every constant and its source is in
 *  docs/superpowers/specs/2026-10-09-cost-calculator-design.md. */

export type CostInput = {
  /** Uncompressed logs + traces ingested per month. */
  dataGB: number;
  /** Share of `dataGB` that is traces, 0–100. */
  tracesPct: number;
  retentionDays: number;
  searchesPerDay: number;
  logsRatio: number;
  tracesRatio: number;
  logEventBytes: number;
  spanBytes: number;
};

export const PRICES = {
  asOf: "2026-10-09",
  region: "us-east-1",
  storageTiers: [
    { label: "first 50 TB", upToGB: 50 * 1024, perGB: 0.023 },
    { label: "next 450 TB", upToGB: 500 * 1024, perGB: 0.022 },
    { label: "over 500 TB", upToGB: Infinity, perGB: 0.021 },
  ],
  putPer1k: 0.005,
  getPer1k: 0.0004,
};

export const DEFAULTS: CostInput = {
  dataGB: 1024,
  tracesPct: 57,
  retentionDays: 365,
  searchesPerDay: 500,
  logsRatio: 9.5,
  tracesRatio: 16.5,
  logEventBytes: 500,
  spanBytes: 1000,
};

const GIB = 2 ** 30;
const HOURS_PER_MONTH = 730;
const DAYS_PER_MONTH = HOURS_PER_MONTH / 24;
// Quickwit's OTel indexes set commit_timeout_secs: 5, one split per commit.
export const COMMITS_PER_MONTH = (HOURS_PER_MONTH * 3600) / 5;
// stable_log, merge_factor 10: N splits cause N/10 + N/100 + … ≈ N/9 merges.
const MERGE_OVERHEAD = 1 / 9;
const SPLIT_DOCS = 10_000_000;
// Three stable_log levels below 10M docs, ~4.5 splits waiting in each.
const YOUNG_SPLITS = 14;
// Quickwit's GET formula per split: fields × terms × GETs per term + fieldnorms
// + timestamp. Neither body (json) nor trace_id (bytes) has positions, so a
// term costs 2 GETs and there are no fieldnorms.
const LOG_GETS_PER_SPLIT = 5;
const TRACE_GETS_PER_SPLIT = 3;
const DOCS_PER_SEARCH = 200;
const DOCS_PER_TRACE = 100;
const SEARCH_WINDOW_HOURS = 24;
// Hits, histogram, and one expanded sidebar facet.
const REQUESTS_PER_SEARCH = 3;
const TRACE_OPENS_PER_SEARCH = 0.2;

// Inputs come straight from form fields: blank binds null, so never trust them.
const positiveOr = (n: number, fallback = 0) =>
  Number.isFinite(n) && n > 0 ? n : fallback;

function storageCost(gb: number): number {
  let cost = 0;
  let floor = 0;
  for (const { upToGB, perGB } of PRICES.storageTiers) {
    cost += Math.max(0, Math.min(gb, upToGB) - floor) * perGB;
    floor = upToGB;
  }
  return cost;
}

// stable_log stops merging a split 48 h after its last merge, and a level merges
// only once 10 of its splits exist, so slow indexes settle below 10M docs.
function matureDocs(docsPerMonth: number): number {
  const perDay = docsPerMonth / DAYS_PER_MONTH;
  if (perDay >= 5_000_000) return SPLIT_DOCS;
  if (perDay >= 500_000) return 1_000_000;
  return 100_000;
}

function indexPuts(docsPerMonth: number): number {
  if (docsPerMonth <= 0) return 0;
  return (
    // Empty intervals produce no split; each initial upload needs a document.
    Math.min(
      docsPerMonth,
      Math.max(COMMITS_PER_MONTH, docsPerMonth / SPLIT_DOCS),
    ) *
    (1 + MERGE_OVERHEAD)
  );
}

// Splits a query reads: mature ones covering `docsInScope`, plus young ones
// still waiting to merge.
function searchedSplits(docsPerMonth: number, docsInScope: number): number {
  if (docsPerMonth <= 0) return 0;
  return Math.ceil(docsInScope / matureDocs(docsPerMonth)) + YOUNG_SPLITS;
}

function queryGets(splits: number, perSplit: number, docsReturned: number) {
  return splits > 0 ? splits * perSplit + docsReturned : 0;
}

export function estimate(input: CostInput) {
  const dataGB = positiveOr(input.dataGB);
  const tracesShare = Number.isFinite(input.tracesPct)
    ? Math.min(Math.max(input.tracesPct, 0), 100) / 100
    : DEFAULTS.tracesPct / 100;
  const logsGB = dataGB * (1 - tracesShare);
  const tracesGB = dataGB * tracesShare;
  const months = positiveOr(input.retentionDays) / DAYS_PER_MONTH;
  const logsRatio = positiveOr(input.logsRatio, DEFAULTS.logsRatio);
  const tracesRatio = positiveOr(input.tracesRatio, DEFAULTS.tracesRatio);
  const logEventBytes = positiveOr(input.logEventBytes, DEFAULTS.logEventBytes);
  const spanBytes = positiveOr(input.spanBytes, DEFAULTS.spanBytes);

  const storedPerMonthGB = logsGB / logsRatio + tracesGB / tracesRatio;
  const storageGB = months * storedPerMonthGB;
  const storage = storageCost(storageGB);

  const logDocs = (logsGB * GIB) / logEventBytes;
  const spanDocs = (tracesGB * GIB) / spanBytes;

  const puts = indexPuts(logDocs) + indexPuts(spanDocs);
  const put = (puts / 1000) * PRICES.putPer1k;

  const logSplits = searchedSplits(
    logDocs,
    (logDocs / HOURS_PER_MONTH) * SEARCH_WINDOW_HOURS,
  );
  // Rootprint looks traces up by trace_id with no time bound: every split is read.
  const traceSplits = searchedSplits(spanDocs, spanDocs * months);
  const searchGets =
    positiveOr(input.searchesPerDay) *
    DAYS_PER_MONTH *
    (queryGets(
      logSplits,
      REQUESTS_PER_SEARCH * LOG_GETS_PER_SPLIT,
      DOCS_PER_SEARCH,
    ) +
      TRACE_OPENS_PER_SEARCH *
        queryGets(traceSplits, TRACE_GETS_PER_SPLIT, DOCS_PER_TRACE));
  const search = (searchGets / 1000) * PRICES.getPer1k;

  const total = storage + put + search;

  return {
    storedPerMonthGB,
    storageGB,
    storage,
    puts,
    put,
    logSplits,
    traceSplits,
    searchGets,
    search,
    total,
    perGB: dataGB > 0 ? total / dataGB : 0,
  };
}

const VOLUME_MIN_GB = 10;
const VOLUME_MAX_GB = 30 * 1024;

// Two significant digits, in TB once that reads at least 1, so the slider lands
// on 1 TB rather than 1,020 GB and the label always matches the math.
function inUnit(gb: number) {
  const tb = Number((gb / 1024).toPrecision(2));
  return tb >= 1
    ? { unit: "TB", size: 1024, value: tb }
    : { unit: "GB", size: 1, value: Number(gb.toPrecision(2)) };
}

// Every distinct value a log-scale sweep from 10 GB to 30 TB rounds to. The
// slider steps through these, so every step changes the value. 1 TB is 1024 GB,
// so a 1000 GB stop would sit next to 1 TB and read as the same amount.
export const VOLUME_STOPS = [
  ...new Set(
    Array.from({ length: 1001 }, (_, i) => {
      const { size, value } = inUnit(
        VOLUME_MIN_GB * (VOLUME_MAX_GB / VOLUME_MIN_GB) ** (i / 1000),
      );
      return value * size;
    }),
  ),
].filter((gb) => gb !== 1000);

export function formatVolume(gb: number): string {
  const { unit, value } = inUnit(gb);
  return `${value} ${unit}`;
}
