/** Content for the marketing home page sections. Kept out of the markup so
 *  copy can be edited without touching layout. */
import { ScopeLine } from "$lib/config";
import { docsUrl } from "$lib/links";

/* NOTE: the compose command below matches docs.rootprint.io/quickstart.
   Docker/helm tabs can be added here once those artifacts exist — the hero
   shows the tab row automatically when there is more than one entry. */
export const installTabs: { label: string; command: string }[] = [
  {
    label: "compose",
    command:
      "curl -o docker-compose.yml https://docs.rootprint.io/files/docker-compose.full.yaml && docker compose up -d",
  },
];

export const whatIs: { title: string; body: string }[] = [
  {
    title: "Find any line",
    body: "Rootprint indexes the full text of every log, so you can search without knowing the service, stream, or label. Add field filters, histograms, saved views, and share links.",
  },
  {
    title: "Your bucket is the database",
    body: "Indexes live in your S3, GCS, R2, MinIO, or Azure Blob bucket. A year of retention costs a year of storage, with no extra nodes and no ingest fees.",
  },
  {
    title: "Logs and traces, one place",
    body: "Open a trace from the log that emitted it, or paste a trace ID into search. The trace page shows per-span timing, attributes, and events, groups database calls by query, and links every span back to its logs.",
  },
  {
    title: "Trace explorer",
    body: "Chart span volume, error rate, and p50/p95/p99 latency, rank the busiest operations, and filter spans by service, operation, duration, and status.",
  },
  {
    title: "Service health",
    body: "Every service gets its own page with request rate, error rate, p95 latency, operations, dependencies, and errors, each linking to the matching traces.",
  },
  {
    title: "OpenTelemetry native",
    body: "OTLP for logs and traces from the Collector, Vector, Fluent Bit, or anything else that speaks OTLP, plus a plain HTTP endpoint for logs. Setup guides for nine integrations start from your ingest key, scoped per index.",
  },
  {
    title: "Self-hosted",
    body: "Runs inside your network. Sign in with Google, GitHub, or any OpenID Connect provider, invite your team, scope their access. Nothing phones home.",
  },
  {
    title: "Stateless search nodes",
    body: "Quickwit searchers hold no data. Add or remove them as load changes; nothing migrates.",
  },
  {
    title: "Apache-2.0",
    body: "Every component is open source, with standard formats and no per-seat pricing.",
  },
];

/** Hero screenshot tabs. All images are 2160x1350 so switching never shifts layout. */
export const shots: { label: string; src: string; alt: string }[] = [
  {
    label: "logs",
    src: "/images/hero-screenshot.webp",
    alt: "Rootprint log explorer: field sidebar with level counts and attribute discovery, a frequency histogram, and a table of log lines from a dozen services.",
  },
  {
    label: "traces",
    src: "/images/trace-explorer.webp",
    alt: "Trace explorer: filters for service, duration, status, and root spans above latency, error rate, and span volume charts, and a table of the busiest operations with span counts, error rates, and p95 latency.",
  },
  {
    label: "service health",
    src: "/images/service-health.webp",
    alt: "Service health: error spans, requests, throughput, error rate, and slowest p95 tiles above p95 latency by service, request rate, and error rate charts, with a table of services ranked by error rate.",
  },
];

export const faq: { q: string; a: string }[] = [
  {
    q: "What is Rootprint?",
    a: "Open-source log and trace search that runs on your own object storage. Built on Quickwit, it indexes the full text of every log, so you can find any line without designing labels first. Indexes live in your S3, GCS, R2, MinIO, or Azure Blob bucket, so a year of retention costs a year of storage. Send data over OpenTelemetry, open a trace from any log, and see request rate, errors, and p95 latency for every service.",
  },
  {
    q: "Does Rootprint handle traces?",
    a: `Yes. Send OTLP spans to <code>POST /v1/traces</code> with an existing ingest key. The trace explorer charts span volume, error rate, and latency, and filters spans by service, operation, duration, and status. Open a trace from any log carrying its trace ID, or paste the ID into the search box, and you get a waterfall with per-span attributes, events, database calls, and links back to the correlated logs. Each service has its own page with request rate, error rate, p95 latency, operations, dependencies, and errors.`,
  },
  {
    q: "How do I self-host it?",
    a: `Docker Compose brings up three containers next to an S3-compatible bucket: Rootprint, Quickwit, and Postgres. The <a href="${docsUrl}/quickstart">quickstart</a> takes about five minutes.`,
  },
  {
    q: "What does it cost?",
    a: "Nothing for the software (Apache-2.0). You pay your cloud provider for the compute it runs on and the storage it fills. Rootprint charges nothing per host, per seat, or per GB ingested.",
  },
  {
    q: "What storage do I need?",
    a: "Any S3-compatible object store (AWS S3, Google Cloud Storage, Cloudflare R2, MinIO, Ceph), Azure Blob, or local disk for a laptop trial. Quickwit writes index splits there; search nodes stay stateless.",
  },
  {
    q: "Is it production-ready?",
    a: `Rootprint is pre-1.0 and under active development. See the <a href="/releases/">release notes</a> for the current release status. The engine underneath is Quickwit, which runs petabyte-scale log search in production.`,
  },
  {
    q: "Does it do metrics or alerting?",
    a: `No. ${ScopeLine}`,
  },
];
