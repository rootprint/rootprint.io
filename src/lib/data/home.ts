/** Content for the marketing home page sections. Kept out of the markup so
 *  copy can be edited without touching layout. */
import { docsUrl, githubUrl } from "$lib/links";

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
    title: "Full-text search",
    body: "Query any field of any log line: free text, filters, histograms, saved views, share links.",
  },
  {
    title: "Traces beside the logs",
    body: "Open a trace from the log that emitted it, or paste a trace ID into search. The waterfall shows per-span timing, attributes, and events, and every span links back to its logs.",
  },
  {
    title: "Service health",
    body: "Request rate, error rate, and p95 latency per service, endpoints ranked by time spent, and the failing spans behind each error.",
  },
  {
    title: "OpenTelemetry native",
    body: "OTLP for logs and traces from the Collector, Vector, Fluent Bit, or anything else that speaks OTLP, plus a plain HTTP endpoint for logs. Ingest keys are scoped per index.",
  },
  {
    title: "Retention at storage prices",
    body: "Keeping a year of logs costs a year of S3 storage. No extra nodes, no ingest fees.",
  },
  {
    title: "Self-hosted",
    body: "Runs inside your network. Sign in with Google or GitHub, invite your team, scope their access. Nothing phones home.",
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
    src: "/images/trace-waterfall.webp",
    alt: "Trace waterfall: spans from five services nested by parent, with timing bars, a span detail panel, and a button to open the logs for the selected span.",
  },
  {
    label: "service health",
    src: "/images/service-health.webp",
    alt: "Service health dashboard: error spans, request count, throughput, error rate, and slowest p95 tiles above p95 latency, request rate, and error rate charts.",
  },
];

export const faq: { q: string; a: string }[] = [
  {
    q: "What is Rootprint?",
    a: "Open-source, self-hosted logs and traces: OpenTelemetry-native ingestion, full-text search built on Quickwit, trace waterfalls, a service health dashboard, and your own object storage as the database.",
  },
  {
    q: "Does Rootprint handle traces?",
    a: `Yes. Send OTLP spans to <code>POST /v1/traces</code> with an existing ingest key. Open a trace from any log carrying its trace ID, or paste the ID into the search box, and you get a waterfall with per-span attributes, events, and links back to the correlated logs. The service health dashboard adds request rate, error rate, and p95 latency per service, plus the failing spans behind those errors.`,
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
    a: `Rootprint is pre-1.0 and under active development. See the <a href="${githubUrl}/blob/main/CHANGELOG.md">changelog</a> for the current release status. The engine underneath is Quickwit, which runs petabyte-scale log search in production.`,
  },
];
