/** Content for the marketing home page sections. Kept out of the markup so
 *  copy can be edited without touching layout. */
import { docsUrl, githubUrl } from "$lib/links";

/* NOTE: verify docs deep links (api/overview, send-logs/otlp,
   search/query-language, architecture) against the published docs before
   launch. The compose command below matches docs.rootprint.io/quickstart.
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
    body: "Query any field of any log line: filters, free text, histograms.",
  },
  {
    title: "Traces beside the logs",
    body: "Open a trace from the log that emitted it, or paste a trace ID into search: a waterfall with per-span attributes, events, and links back to correlated logs.",
  },
  {
    title: "OpenTelemetry native",
    body: "OTLP endpoints for logs and traces, plus an NDJSON gateway for logs, with per-index bearer tokens.",
  },
  {
    title: "Object-storage economics",
    body: "Keeping more logs costs more $/GB on your S3, without adding cluster nodes.",
  },
  {
    title: "Self-hosted",
    body: "Runs inside your network, behind your SSO. Logs stay in your VPC.",
  },
  {
    title: "Stateless search tier",
    body: "Query nodes hold no data. Add or remove them at any time; nothing needs to migrate.",
  },
  {
    title: "Apache-2.0, end to end",
    body: "The whole path is open, with standard formats and no per-seat pricing.",
  },
];

export const faq: { q: string; a: string }[] = [
  {
    q: "What is Rootprint?",
    a: "Open-source, self-hosted log management: OpenTelemetry-native ingestion, full-text search built on Quickwit, and your own object storage as the database.",
  },
  {
    q: "Does Rootprint handle traces?",
    a: `Yes. Send OTLP spans to <code>POST /v1/traces</code> with an existing ingest key. From there, open a trace from any log carrying its trace ID, or paste the trace ID into the search box. Spans land in one index and a trace stays openable for as long as they are retained. There is no span search or trace list yet: traces are reached from a log or by ID.`,
  },
  {
    q: "How do I self-host it?",
    a: `One container next to an S3-compatible bucket. Start with the <a href="${docsUrl}/quickstart">quickstart</a>: one Docker Compose command gets you running. Helm and other install methods are on the way.`,
  },
  {
    q: "What does it cost?",
    a: "The software is free (Apache-2.0). You pay for the compute you give it plus $/GB on your object storage. Rootprint charges nothing per host, per seat, or per GB ingested.",
  },
  {
    q: "What storage do I need?",
    a: "Any S3-compatible object store: AWS S3, Google Cloud Storage, MinIO, Ceph. Rootprint writes index splits there; search nodes stay stateless.",
  },
  {
    q: "Is it production-ready?",
    a: `Rootprint builds on Quickwit, which runs petabyte-scale log search in production. Check the <a href="${githubUrl}">GitHub repo</a> for current status and roadmap.`,
  },
];
