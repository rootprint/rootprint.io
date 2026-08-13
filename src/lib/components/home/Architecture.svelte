<script lang="ts">
  import { docsUrl } from "$lib/links";
</script>

<section class="section anchor" id="architecture">
  <div class="wrap">
    <h2>How it works</h2>
    <p class="muted" style="margin-top: 14px; max-width: 62ch;">
      Your apps send logs and traces to Rootprint, which authenticates them and
      hands them to the embedded search engine. The engine indexes straight to your
      object storage and answers queries from the same place, so you run one
      container instead of a cluster.
    </p>

    <pre
      class="arch-ascii arch-ascii-wide"
      role="img"
      aria-label="Architecture diagram: your apps and agents send logs and traces to Rootprint, which handles auth, the UI, and the API. Rootprint forwards them to the embedded Quickwit engine for indexing and search, which stores everything on your S3-compatible object storage."
      style="margin-top: 32px;">┌────────────────────────────────┐            ┌────────────────────────────────────┐
│           your apps            │ ─────────▶ │             rootprint              │
│            & agents            │            │          auth · ui · api           │
└────────────────────────────────┘            └─────────────────┬──────────────────┘
                                                                │
┌────────────────────────────────┐            ┌─────────────────▼──────────────────┐
│            your s3             │ ◀───────── │              quickwit              │
│        s3 · gcs · minio        │            │           index · search           │
└────────────────────────────────┘            └────────────────────────────────────┘</pre>

    <pre
      class="arch-ascii arch-ascii-narrow"
      role="img"
      aria-label="Architecture diagram: your apps and agents send logs and traces to Rootprint, which handles auth, the UI, and the API. Rootprint forwards them to the embedded Quickwit engine for indexing and search, which stores everything on your S3-compatible object storage."
      style="margin-top: 32px;">┌──────────────────────────┐
│    your apps & agents    │
└──────────────────────────┘
              │
              ▼
┌──────────────────────────┐
│        rootprint         │
│     auth · ui · api      │
└──────────────────────────┘
              │
              ▼
┌──────────────────────────┐
│         quickwit         │
│      index · search      │
└──────────────────────────┘
              │
              ▼
┌──────────────────────────┐
│         your s3          │
│     s3 · gcs · minio     │
└──────────────────────────┘</pre>

    <a
      href="{docsUrl}/architecture"
      target="_blank"
      rel="noopener noreferrer"
      class="btn btn-ghost"
      style="margin-top: 28px;"
    >
      Read the architecture docs →
    </a>
  </div>
</section>
