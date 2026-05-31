/** Content for the marketing home page sections. Kept out of the markup so
 *  copy can be edited without touching layout. */

export interface Capability {
  num: string;
  kicker: string;
  name: string;
  description: string;
}

export interface PipelineNode {
  num: string;
  label: string;
  side: string;
}

export interface ValueCard {
  meta: string;
  title: string;
  body: string;
}

export interface CompareCard {
  slug: string;
  tag: string;
  name: string;
  body: string;
}

export interface Screen {
  tag: string;
  title: string;
  body: string;
  /** Optional product screenshot. When set, it replaces the placeholder tile. */
  img?: string;
  alt?: string;
}

export const capabilities: Capability[] = [
  {
    num: "01",
    kicker: "OPENTELEMETRY FIRST",
    name: "Ingest",
    description: "OTLP endpoint, HTTP gateway, per-index bearer tokens.",
  },
  {
    num: "02",
    kicker: "FULL-TEXT SEARCH",
    name: "Query",
    description: "Field filters, full-text, histograms.",
  },
  {
    num: "03",
    kicker: "STORAGE",
    name: "Store",
    description:
      "Store data on the object store you already operate. No vendor lock-in.",
  },
  {
    num: "04",
    kicker: "SELF-HOSTED",
    name: "Control",
    description: "Inside your network, behind your SSO.",
  },
];

export const pipeline: PipelineNode[] = [
  { num: "01", label: "App / SDK", side: "otel-sdk" },
  { num: "02", label: "Rootprint API", side: "auth" },
  { num: "03", label: "OTEL Collector", side: "batching" },
  { num: "04", label: "Quickwit", side: "splits" },
  { num: "05", label: "S3", side: "storage" },
];

export const valueCards: ValueCard[] = [
  {
    meta: "STORAGE ECONOMICS",
    title: "Lighter Cluster Footprint",
    body: "Instead of running a stateful Elasticsearch-style cluster just to search logs, Rootprint pairs Quickwit with object storage — so retention scales with $/GB rather than node count.",
  },
  {
    meta: "STATELESS SEARCH",
    title: "Scale Search, Not State",
    body: "Query nodes hold no data of their own — every index split lives in object storage. Scale the search tier up during an incident and back down after, with no cluster to rebalance.",
  },
  {
    meta: "OPEN SOURCE",
    title: "Apache-2.0, End To End",
    body: "The whole path is open, from the collector to the query API. Read it, audit it, run it anywhere — no proprietary formats and no per-host or per-seat pricing to model.",
  },
];

export const compareCards: CompareCard[] = [
  {
    slug: "datadog",
    tag: "vs · HOSTED SaaS",
    name: "Datadog",
    body: "Self-host the search surface, cut retention bills, keep evidence inside your VPC.",
  },
  {
    slug: "elastic",
    tag: "vs · SEARCH ENGINE",
    name: "Elastic",
    body: "Object-storage economics and a focused UI without managing a heavy cluster.",
  },
  {
    slug: "loki",
    tag: "vs · LABEL-FIRST",
    name: "Grafana Loki",
    body: "Full-text search and structured filters as first-class — not label cardinality math.",
  },
];

export const screens: Screen[] = [
  {
    tag: "FULL-TEXT SEARCH",
    title: "Search across every field",
    body: "Full-text and structured field filters over your indexed logs.",
    img: "/images/full-text-search.png",
    alt: "Rootprint full-text search: a query filtering by service_name with a frequency histogram and a live result table.",
  },
  {
    tag: "FILTERS + HISTOGRAM",
    title: "Slice by field, text, and time",
    body: "Query string, saved queries, and a histogram to find the spike fast.",
    img: "/images/filters-histogram.png",
    alt: "Rootprint filters: a level facet (DEBUG, INFO, WARN, ERROR, CRITICAL) and service_name filter beside a frequency histogram of matching logs.",
  },
  {
    tag: "CONTEXT",
    title: "See what happened around it",
    body: "Expand any match to the log lines before and after to trace what led to the error.",
    img: "/images/context.png",
    alt: "Rootprint context view: a selected payment-service log line surrounded by the events before and after it, with a service_name filter applied.",
  },
];
