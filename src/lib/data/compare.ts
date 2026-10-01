import { comparisonLinks } from "$lib/data/comparison-links";

export const rootprintFeatures = {
  Hosting: "Self-hosted",
  "Log search": "Full-text and field search",
  Traces: "Trace explorer and waterfalls, linked to related logs",
  "Service health":
    "Per-service request rate, error rate, p95 latency, and dependencies",
  Storage: "Your object storage; local disk for development",
  Cost: "Free Apache-2.0 software; you pay for compute and storage",
  Operations: "You run Rootprint, Quickwit, and Postgres",
};

interface Comparison {
  description: string;
  summary: string;
  features: Record<keyof typeof rootprintFeatures, string>;
  useRootprint: string;
  useCompetitor: string;
}

type ComparisonSlug = (typeof comparisonLinks)[number]["slug"];

export const comparisons: Record<ComparisonSlug, Comparison> = {
  datadog: {
    description:
      "With Rootprint, you run log search and tracing on your own infrastructure. Datadog hosts these services for you and includes tools for monitoring, alerting, and incident response.",
    summary:
      "Log search, tracing, and service health on your own infrastructure. Not the whole suite: no RUM, synthetics, or alerting.",
    features: {
      Hosting: "Datadog's hosted service",
      "Log search": "Full-text search, facets, and log analytics",
      Traces: "Distributed tracing through Datadog APM",
      "Service health": "Service dashboards and monitors",
      Storage: "Datadog manages storage",
      Cost: "Usage-based pricing for ingestion, indexing, and retention",
      Operations:
        "You configure agents and pipelines; Datadog runs the platform",
    },
    useRootprint:
      "Use Rootprint if you need to keep logs and traces in your network and can operate the stack yourself. You pay your infrastructure provider for compute and storage, with no Rootprint charges per host, seat, or GB ingested.",
    useCompetitor:
      "Datadog is a better fit if you want a hosted service or depend on its alerting, RUM, synthetics, and incident workflows. Rootprint covers log search, tracing, and service health; it does not replace the full Datadog suite.",
  },
  elastic: {
    description:
      "Rootprint uses Quickwit to search logs and traces stored in your object store. Elastic combines Elasticsearch, Kibana, and ingestion tools, with options to self-host or use Elastic Cloud.",
    summary:
      "The same full-text search without a stateful cluster. Indexes live in your bucket and search nodes are stateless.",
    features: {
      Hosting: "Self-managed or Elastic Cloud",
      "Log search": "Elasticsearch queries and Kibana log exploration",
      Traces: "Distributed tracing through Elastic APM",
      "Service health": "APM service views and Kibana dashboards",
      Storage:
        "Cluster data tiers, with searchable snapshots on object storage",
      Cost: "Infrastructure and applicable subscriptions, or Elastic Cloud usage",
      Operations: "You operate the cluster, or use Elastic Cloud",
    },
    useRootprint:
      "Use Rootprint if you need log search and tracing with indexes in your own object storage. The stack consists of Rootprint, Quickwit, and Postgres. Quickwit keeps search nodes stateless, so adding search capacity does not require moving stored indexes between nodes.",
    useCompetitor:
      "Stay with Elastic if you depend on Kibana dashboards, Elasticsearch queries, or search beyond logs and traces. Rootprint uses Quickwit's query syntax; existing Elasticsearch queries and integrations will need work to migrate.",
  },
  loki: {
    description:
      "Rootprint indexes log text and fields with Quickwit. Loki indexes stream labels and searches log contents within the selected streams. Both support object storage and self-hosting.",
    summary:
      "Loki indexes labels. Rootprint indexes every word, so you can search for a string without knowing which stream holds it.",
    features: {
      Hosting: "Self-hosted or Grafana Cloud",
      "Log search": "Label selectors and log filtering with LogQL",
      Traces: "Separate tracing backend, such as Grafana Tempo",
      "Service health": "Grafana dashboards with queries and metrics sources",
      Storage: "Object storage",
      Cost: "Infrastructure costs, or Grafana Cloud usage",
      Operations: "You run Loki and Grafana, or use Grafana Cloud",
    },
    useRootprint:
      "Use Rootprint if you often search for text or field values without knowing which log stream contains them. You can open trace waterfalls and related logs in the same application. Both platforms use object storage, so compare costs with your own queries and ingestion volume.",
    useCompetitor:
      "Stay with Loki if your team uses LogQL and Grafana dashboards, especially if most searches start with a known service or stream. With Tempo for traces and a metrics backend, you can investigate these signals through Grafana.",
  },
  hyperdx: {
    description:
      "Rootprint searches logs and traces stored in your object store with Quickwit. HyperDX is the interface of ClickStack, which stores logs, traces, metrics, and session replays in ClickHouse. Both can be self-hosted.",
    summary:
      "Fewer signals, no database cluster. Indexes live in your bucket instead of ClickHouse tables you size and replicate.",
    features: {
      Hosting: "Self-hosted or ClickHouse Cloud",
      "Log search": "Full-text and property search, or SQL on ClickHouse",
      Traces: "Trace waterfalls linked to logs and session replays",
      "Service health": "Charts, dashboards, and alerts on ClickHouse queries",
      Storage: "ClickHouse tables on disk, with optional S3-backed storage",
      Cost: "Free MIT software, or ClickHouse Cloud usage",
      Operations:
        "You run ClickHouse, HyperDX, an OpenTelemetry Collector, and MongoDB, or use ClickHouse Cloud",
    },
    useRootprint:
      "Use Rootprint if you want logs and traces indexed straight into your object storage. The stack is Rootprint, Quickwit, and Postgres; there is no ClickHouse cluster to size, replicate, or tune, and search nodes are stateless.",
    useCompetitor:
      "HyperDX is a better fit if you need metrics, session replay, or alerting next to logs and traces, or if your team already runs ClickHouse and wants to query telemetry with SQL. Rootprint does not cover those signals or features.",
  },
};
