import { error } from "@sveltejs/kit";
const compareData = {
  datadog: {
    slug: "datadog",
    navLabel: "Datadog",
    competitor: "Datadog Logs",
    versus: "vs HOSTED SAAS",
    competitorPill: "datadog · saas",
    competitorCol: "Datadog Logs",
    competitorStay: "DATADOG",
    tagline: "An honest, side-by-side look at where Rootprint fits, where Datadog still wins, and what changes when you move log evidence inside your own perimeter.",
    updated: "2026-05-29",
    tldrCost: "Pay for storage and compute you already operate, not per-GB ingestion tiers.",
    tldrData: "Logs stay inside your VPC. No third-party retention contract.",
    tldrTrade: "You give up the full APM/RUM/Synthetics suite. Bring your own dashboards and alerting.",
    stayTitle: "You need the full observability suite.",
    stayBullets: [
      "You depend on APM, RUM, or Synthetics in the same pane.",
      "You want managed alerting and incident workflows out of the box.",
      "Your team has no appetite to run a stateful service.",
      "Storage cost isn't currently a problem."
    ],
    column: [
      { mark: "x:SaaS", text: "Hosted multi-tenant", tone: "lose" },
      { mark: "x:—", text: "Proprietary", tone: "lose" },
      { text: "Proprietary agent · HTTP intake" },
      { text: "Full-text + facets" },
      { text: "Vendor-managed, opaque", tone: "lose" },
      { text: "Per-GB indexed + retention tier", tone: "lose" },
      { mark: "r:YES", text: "Fully managed — no ops", tone: "win" },
      { mark: "r:YES", text: "Full suite", tone: "win" },
      { text: "Crosses third-party boundary", tone: "lose" },
      { text: "Proprietary index format", tone: "lose" }
    ]
  },
  elastic: {
    slug: "elastic",
    navLabel: "Elastic",
    competitor: "Elastic / ELK",
    versus: "vs SEARCH ENGINE",
    competitorPill: "elastic · cluster",
    competitorCol: "Elastic / ELK",
    competitorStay: "ELASTIC",
    tagline: "How Rootprint compares to a self-managed ELK stack — what you keep, what you give up, and why object-storage economics change the math at long retention.",
    updated: "2026-05-29",
    tldrCost: "Object storage instead of a stateful Elasticsearch cluster. Retention scales with $/GB, not node count.",
    tldrData: "Same self-hosted posture — Rootprint just keeps the runtime surface smaller.",
    tldrTrade: "Elastic is a general-purpose search engine. Rootprint is logs-only and prefers Quickwit semantics.",
    stayTitle: "You need a general-purpose search engine.",
    stayBullets: [
      "You query far beyond logs — traces, vectors, business search.",
      "You already run and tune Elasticsearch clusters comfortably.",
      "You rely on the Kibana ecosystem and its plugins.",
      "Relevance scoring and ranking matter more than storage cost."
    ],
    column: [
      { text: "Self-host (stateful cluster)" },
      { mark: "x:SSPL", text: "Source-available", tone: "lose" },
      { text: "Beats · Logstash · OTLP" },
      { mark: "r:YES", text: "Full Lucene / ES DSL", tone: "win" },
      { text: "Hot nodes + frozen on S3", tone: "lose" },
      { text: "Node count + storage", tone: "lose" },
      { mark: "x:HEAVY", text: "Shards, JVM, capacity planning", tone: "lose" },
      { mark: "r:YES", text: "APM + general search", tone: "win" },
      { text: "Stays inside your infra" },
      { text: "Snapshot / reindex to migrate", tone: "lose" }
    ]
  },
  loki: {
    slug: "loki",
    navLabel: "Grafana Loki",
    competitor: "Grafana Loki",
    versus: "vs LABEL-FIRST",
    competitorPill: "loki · label-index",
    competitorCol: "Grafana Loki",
    competitorStay: "LOKI",
    tagline: "Loki indexes labels; Rootprint indexes full text. Where that distinction matters during an incident — and where Loki's tradeoff still wins.",
    updated: "2026-05-29",
    tldrCost: "Both are object-storage-backed. Costs are close; query shape is what differs.",
    tldrData: "Self-hosted on both sides. Rootprint exposes a Quickwit-backed full-text index.",
    tldrTrade: "Loki rewards disciplined label design. Rootprint trades that for fewer cardinality footguns at the cost of a slightly heavier index.",
    stayTitle: "You've invested in disciplined labels.",
    stayBullets: [
      "Your teams already design low-cardinality labels well.",
      "You live inside Grafana dashboards already.",
      "Your queries are label-scoped, not full-text scans.",
      "You want the lightest possible index footprint."
    ],
    column: [
      { text: "Self-host (Grafana stack)" },
      { mark: "r:AGPL-3.0", text: "Open source" },
      { text: "Promtail · OTLP · Fluent Bit" },
      { mark: "x:LABELS", text: "Label filters + LogQL", tone: "lose" },
      { text: "Object storage (S3 / GCS)" },
      { text: "Object-storage rates" },
      {
        mark: "x:MULTI",
        text: "Distributor / ingester / querier",
        tone: "lose"
      },
      { mark: "x:NO", text: "Logs only (Grafana for rest)" },
      { text: "Stays inside your infra" },
      { text: "Chunk format + LogQL coupling", tone: "lose" }
    ]
  }
};
const prerender = true;
const entries = () => Object.keys(compareData).map((slug) => ({ slug }));
const load = ({ params }) => {
  const competitor = compareData[params.slug];
  if (!competitor) error(404, "Comparison not found");
  return {
    competitor,
    all: Object.values(compareData).map((c) => ({
      slug: c.slug,
      navLabel: c.navLabel
    }))
  };
};
export {
  entries,
  load,
  prerender
};
