<script lang="ts">
  import {
    WebsiteBaseUrl,
    WebsiteDescription,
    WebsiteName,
  } from "./../../config";
  import { reveal } from "$lib/actions/reveal";
  import { cubicOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";

  const docsUrl = "https://docs.rootprint.io";
  const githubUrl = "https://github.com/oleksandr-zhyhalo/rootprint";
  const phrases = [
    "Ingest everything.",
    "Search instantly.",
    "Keep ownership.",
  ];
  const installCommands = [
    "curl -O https://raw.githubusercontent.com/oleksandr-zhyhalo/rootprint/main/docs-site/files/docker-compose.yml",
    "docker compose up -d",
  ];

  let phraseIndex = $state(0);
  let activeTab = $state(0);
  let copyState = $state<"idle" | "copied" | "failed">("idle");
  let copyTimeout: ReturnType<typeof setTimeout> | undefined;

  async function copyInstallCommand() {
    if (copyTimeout) clearTimeout(copyTimeout);

    try {
      await navigator.clipboard.writeText(installCommands.join("\n"));
      copyState = "copied";
    } catch {
      copyState = "failed";
    }

    copyTimeout = setTimeout(() => {
      copyState = "idle";
    }, 2000);
  }

  onMount(() => {
    const interval = setInterval(() => {
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }, 1800);

    return () => {
      clearInterval(interval);
      if (copyTimeout) clearTimeout(copyTimeout);
    };
  });

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: WebsiteName,
    url: WebsiteBaseUrl,
  };
  const jsonldScript = `<script type="application/ld+json">${
    JSON.stringify(ldJson) + "<"
  }/script>`;
  const socialImageUrl = `${WebsiteBaseUrl}/images/home-image.png`;

  const stats = [
    { label: "Median query", value: "43ms" },
    { label: "Storage tier", value: "S3/R2" },
    { label: "Ingest path", value: "OTLP" },
    { label: "License", value: "MIT" },
  ];

  const capabilities = [
    {
      name: "Ingest",
      kicker: "OpenTelemetry first",
      description:
        "Point collectors, SDKs, and custom emitters at one endpoint. Rootprint keeps the hot path boring and observable.",
      items: [
        "OTLP/HTTP log ingestion",
        "NDJSON gateway for custom schemas",
        "Per-index bearer tokens",
      ],
      visual: "ingest",
    },
    {
      name: "Query",
      kicker: "Built for incident flow",
      description:
        "Search across structured fields and full text without babysitting a cluster. Filters, histograms, and exports stay one click away.",
      items: [
        "Full-text search over object storage",
        "Fast field aggregation counts",
        "Shareable investigation links",
      ],
      visual: "query",
    },
    {
      name: "Store",
      kicker: "Object-storage economics",
      description:
        "Keep retention long and bills sane by writing readable data to storage you already operate.",
      items: [
        "S3, R2, MinIO compatible",
        "No proprietary storage lock-in",
        "Readable exports when you leave",
      ],
      visual: "store",
    },
    {
      name: "Control",
      kicker: "Self-hosted by design",
      description:
        "Run Rootprint inside your network, map access to teams, and keep operational data away from third-party SaaS defaults.",
      items: [
        "Invite-based access",
        "Role-aware index visibility",
        "Optional Google OAuth SSO",
      ],
      visual: "control",
    },
  ];

  const valueCards = [
    {
      title: "Less Cluster Tax",
      body: "Avoid managing expensive Elasticsearch-style storage just to search logs. Rootprint pairs Quickwit with object storage for a calmer cost curve.",
      meta: "-90% infra pattern",
    },
    {
      title: "Readable Under Pressure",
      body: "Severity, service, trace fields, and raw messages stay visible. The UI is tuned for production debugging, not dashboard theater.",
      meta: "incident ready",
    },
    {
      title: "Own The Footprint",
      body: "Logs often carry the shape of your systems. Rootprint keeps that operational fingerprint on infrastructure you control.",
      meta: "self-hosted",
    },
  ];

  const pipeline = [
    "App / SDK",
    "OTEL Collector",
    "Rootprint API",
    "Quickwit index",
    "S3 / R2 / MinIO",
  ];

  const capabilityTabId = (index: number) => `capability-tab-${index}`;
  const capabilityPanelId = (index: number) => `capability-panel-${index}`;
</script>

<svelte:head>
  <title>{WebsiteName} - Search Logs On Storage You Control</title>
  <meta name="description" content={WebsiteDescription} />
  <link rel="canonical" href={WebsiteBaseUrl} />
  <meta property="og:title" content={WebsiteName} />
  <meta property="og:description" content={WebsiteDescription} />
  <meta property="og:url" content={WebsiteBaseUrl} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={socialImageUrl} />
  <meta property="og:image:alt" content="Rootprint product interface preview" />
  <meta property="og:site_name" content={WebsiteName} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={WebsiteName} />
  <meta name="twitter:description" content={WebsiteDescription} />
  <meta name="twitter:image" content={socialImageUrl} />
  <meta
    name="twitter:image:alt"
    content="Rootprint product interface preview"
  />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonldScript}
</svelte:head>

<div class="overflow-hidden bg-base-100 text-base-content">
  <section class="relative min-h-[calc(100svh-4rem)] border-b border-white/10">
    <div
      class="absolute inset-0 pointer-events-none opacity-70"
      style="background-image: linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px); background-size: 48px 48px;"
    ></div>
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(circle at 18% 18%, rgba(39,247,149,0.18), transparent 28%), radial-gradient(circle at 82% 0%, rgba(248,172,73,0.12), transparent 26%), linear-gradient(180deg, rgba(10,10,10,0) 0%, #0a0a0a 88%);"
    ></div>

    <div
      class="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 pb-20 pt-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:pt-28"
    >
      <div>
        <div
          class="mb-8 inline-flex items-center gap-2 rounded border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary"
          use:reveal
        >
          <span class="h-1.5 w-1.5 rounded-full bg-primary"></span>
          Open-source log intelligence
        </div>

        <h1
          class="max-w-[10ch] text-5xl font-normal leading-[0.98] tracking-[-0.08em] text-white sm:text-6xl lg:text-[88px]"
          style="text-wrap: balance"
          use:reveal={{ delay: 80 }}
        >
          Own Your Log Footprint
        </h1>

        <p
          class="mt-7 max-w-[56ch] text-lg leading-8 text-neutral sm:text-xl"
          use:reveal={{ delay: 160 }}
        >
          Rootprint is a self-hosted log platform for teams that want modern
          search, OpenTelemetry ingestion, and cloud-storage economics without
          sending production evidence to another black box.
        </p>

        <p
          class="relative mt-5 h-9 overflow-hidden"
          use:reveal={{ delay: 220 }}
        >
          {#key phraseIndex}
            <span
              class="absolute inset-0 inline-flex items-center font-mono text-sm uppercase tracking-[0.22em] text-primary"
              in:fly={{ y: 20, duration: 350, easing: cubicOut }}
              out:fly={{ y: -20, duration: 250, easing: cubicOut }}
            >
              {phrases[phraseIndex]}
            </span>
          {/key}
        </p>

        <div class="mt-9 flex flex-wrap gap-3" use:reveal={{ delay: 280 }}>
          <a
            href={docsUrl}
            class="btn-lift inline-flex items-center gap-2 rounded bg-primary px-5 py-3 text-sm font-semibold text-primary-content transition-[transform,box-shadow] duration-200 ease-out-custom"
          >
            Try Rootprint
            <span aria-hidden="true">-&gt;</span>
          </a>
          <a
            href={githubUrl}
            class="btn-lift inline-flex items-center gap-2 rounded border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out-custom hover:border-primary/50 hover:bg-primary/10"
          >
            View on GitHub
          </a>
        </div>

        <div
          class="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded border border-white/10 bg-white/10 sm:grid-cols-4"
          use:reveal={{ delay: 340 }}
        >
          {#each stats as stat}
            <div class="bg-base-100 px-4 py-4">
              <p class="font-mono text-xl text-white">{stat.value}</p>
              <p class="mt-1 text-xs uppercase tracking-[0.14em] text-neutral">
                {stat.label}
              </p>
            </div>
          {/each}
        </div>
      </div>

      <div class="relative" use:reveal={{ delay: 180 }}>
        <div
          class="absolute -inset-10 rounded-full blur-3xl"
          style="background: radial-gradient(circle, rgba(39,247,149,0.2), transparent 62%);"
        ></div>
        <div
          class="relative rounded-lg border border-white/10 bg-[#0f0f0f] p-3"
        >
          <div
            class="mb-3 flex items-center justify-between rounded border border-white/10 bg-black px-3 py-2"
          >
            <div class="flex items-center gap-1.5">
              <span class="h-2.5 w-2.5 rounded-full bg-[#ec6d62]"></span>
              <span class="h-2.5 w-2.5 rounded-full bg-secondary"></span>
              <span class="h-2.5 w-2.5 rounded-full bg-primary"></span>
            </div>
            <span class="font-mono text-xs text-neutral"
              >rootprint://prod/api</span
            >
          </div>

          <div class="grid gap-3 lg:grid-cols-[180px_1fr]">
            <aside class="rounded border border-white/10 bg-base-200 p-4">
              <p
                class="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral"
              >
                Indexes
              </p>
              <div class="mt-4 space-y-2 text-sm">
                <div
                  class="rounded bg-primary px-3 py-2 font-medium text-primary-content"
                >
                  prod-api
                </div>
                <div
                  class="rounded border border-white/10 px-3 py-2 text-neutral"
                >
                  edge-workers
                </div>
                <div
                  class="rounded border border-white/10 px-3 py-2 text-neutral"
                >
                  iot-fleet
                </div>
              </div>
              <div class="mt-6 border-t border-white/10 pt-4">
                <p class="text-xs text-neutral">Retention</p>
                <p class="mt-1 font-mono text-lg text-white">180d</p>
              </div>
            </aside>

            <div class="rounded border border-white/10 bg-black p-4">
              <div
                class="flex flex-wrap items-center gap-2 rounded border border-white/10 bg-base-200 px-3 py-2 font-mono text-xs text-white"
              >
                <span class="text-primary">level:error</span>
                <span class="text-neutral">AND</span>
                <span>service:checkout</span>
                <span class="ml-auto text-neutral">last 15m</span>
              </div>

              <div
                class="mt-4 flex h-20 items-end gap-1 border-b border-white/10 pb-3"
              >
                {#each [18, 24, 16, 34, 22, 40, 28, 52, 30, 62, 42, 35, 54, 38, 68, 44, 32, 26] as height}
                  <div
                    class="flex-1 rounded-t bg-primary/80"
                    style="height: {height}px"
                  ></div>
                {/each}
              </div>

              <div class="mt-4 space-y-1 font-mono text-[12px] leading-6">
                <div
                  class="grid grid-cols-[70px_58px_1fr] gap-3 rounded border-l-2 border-l-error bg-white/[0.04] px-3 py-1.5"
                >
                  <span class="text-neutral">10:32:01</span>
                  <span class="text-error">ERROR</span>
                  <span class="truncate text-white"
                    >payment capture timed out trace=8f29</span
                  >
                </div>
                <div
                  class="grid grid-cols-[70px_58px_1fr] gap-3 rounded border-l-2 border-l-warning bg-white/[0.025] px-3 py-1.5"
                >
                  <span class="text-neutral">10:31:58</span>
                  <span class="text-warning">WARN</span>
                  <span class="truncate text-white/75"
                    >retrying stripe webhook delivery</span
                  >
                </div>
                <div
                  class="grid grid-cols-[70px_58px_1fr] gap-3 rounded border-l-2 border-l-info bg-white/[0.02] px-3 py-1.5"
                >
                  <span class="text-neutral">10:31:54</span>
                  <span class="text-info">INFO</span>
                  <span class="truncate text-white/65"
                    >checkout worker picked job=92144</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section
    id="capabilities"
    class="relative border-b border-white/10 py-24 scroll-mt-20"
  >
    <div class="mx-auto max-w-[1200px] px-6">
      <div
        class="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
      >
        <div>
          <p
            class="font-mono text-xs uppercase tracking-[0.2em] text-primary"
            use:reveal
          >
            [ capabilities ]
          </p>
          <h2
            class="mt-4 max-w-[12ch] text-4xl font-normal tracking-[-0.06em] text-white md:text-6xl"
            style="text-wrap: balance"
            use:reveal={{ delay: 60 }}
          >
            Log Search Without The SaaS Tax
          </h2>
        </div>
        <p
          class="max-w-[44ch] text-base leading-7 text-neutral"
          use:reveal={{ delay: 120 }}
        >
          Rootprint keeps the product surface tight: ingest, search, retain, and
          control. No sprawling suite required.
        </p>
      </div>

      <div class="grid gap-8 lg:grid-cols-[320px_1fr]">
        <div
          class="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible"
          role="tablist"
          aria-label="Capabilities"
        >
          {#each capabilities as capability, i}
            <button
              type="button"
              id={capabilityTabId(i)}
              role="tab"
              aria-selected={activeTab === i}
              aria-controls={capabilityPanelId(i)}
              class="min-w-[220px] rounded border px-4 py-4 text-left transition-colors duration-200 ease-out-custom lg:min-w-0 {activeTab ===
              i
                ? 'border-primary bg-primary text-primary-content'
                : 'border-white/10 bg-base-200 text-white hover:border-primary/40'}"
              onclick={() => (activeTab = i)}
            >
              <span
                class="font-mono text-xs uppercase tracking-[0.16em] {activeTab ===
                i
                  ? 'text-primary-content/70'
                  : 'text-neutral'}"
              >
                0{i + 1} / {capability.kicker}
              </span>
              <span class="mt-2 block text-2xl tracking-[-0.04em]"
                >{capability.name}</span
              >
            </button>
          {/each}
        </div>

        {#key activeTab}
          <div
            id={capabilityPanelId(activeTab)}
            role="tabpanel"
            aria-labelledby={capabilityTabId(activeTab)}
            class="grid min-h-[460px] gap-8 rounded-lg border border-white/10 bg-base-200 p-6 animate-[fadeSlideIn_400ms_cubic-bezier(0.16,1,0.3,1)] md:grid-cols-[0.9fr_1.1fr] md:p-8"
          >
            <div>
              <p
                class="font-mono text-xs uppercase tracking-[0.2em] text-primary"
              >
                {capabilities[activeTab].kicker}
              </p>
              <h3
                class="mt-4 text-3xl font-normal tracking-[-0.05em] text-white md:text-5xl"
              >
                {capabilities[activeTab].name}
              </h3>
              <p class="mt-5 max-w-[44ch] text-base leading-7 text-neutral">
                {capabilities[activeTab].description}
              </p>
              <ul class="mt-8 space-y-3">
                {#each capabilities[activeTab].items as item}
                  <li class="flex items-start gap-3 text-sm text-white">
                    <span
                      class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    ></span>
                    {item}
                  </li>
                {/each}
              </ul>
            </div>

            <div
              class="rounded border border-white/10 bg-black p-4 font-mono text-xs text-white"
            >
              {#if capabilities[activeTab].visual === "ingest"}
                <div class="mb-4 flex items-center gap-2">
                  <span
                    class="rounded bg-primary px-2 py-1 font-semibold text-primary-content"
                    >POST</span
                  >
                  <span>/api/otlp/v1/logs</span>
                </div>
                <pre
                  class="overflow-x-auto rounded border border-white/10 bg-base-100 p-4 leading-6"><span
                    class="text-primary">OTEL_EXPORTER_OTLP_ENDPOINT</span
                  >=https://rootprint.internal/api
<span class="text-primary">OTEL_EXPORTER_OTLP_HEADERS</span
                  >="Authorization=Bearer rpit_a7f3..."
<span class="text-neutral"># collector status</span>
accepted=124928 rejected=0 p95=31ms</pre>
              {:else if capabilities[activeTab].visual === "query"}
                <div class="rounded border border-white/10 bg-base-100 p-3">
                  <span class="text-primary">service:api</span> AND level:error AND
                  trace_id:*
                </div>
                <div class="mt-4 grid grid-cols-3 gap-2">
                  {#each ["checkout", "billing", "worker"] as service, i}
                    <div class="rounded border border-white/10 p-3">
                      <p class="text-neutral">{service}</p>
                      <p class="mt-1 text-2xl text-white">
                        {[420, 193, 77][i]}
                      </p>
                    </div>
                  {/each}
                </div>
                <div class="mt-4 space-y-2 text-neutral">
                  <p>
                    <span class="text-error">ERROR</span> card authorization timeout
                  </p>
                  <p>
                    <span class="text-error">ERROR</span> webhook signature mismatch
                  </p>
                  <p>
                    <span class="text-warning">WARN</span> queue depth over threshold
                  </p>
                </div>
              {:else if capabilities[activeTab].visual === "store"}
                <div class="grid gap-3">
                  {#each ["s3://prod-rootprint/logs", "quickwit: index segments", "ndjson export: portable"] as row}
                    <div
                      class="rounded border border-white/10 bg-base-100 px-4 py-3 text-white"
                    >
                      {row}
                    </div>
                  {/each}
                </div>
                <div
                  class="mt-5 rounded border border-primary/40 bg-primary/10 p-4"
                >
                  <p class="text-primary">
                    retention_budget = storage_cost + compute_when_queried
                  </p>
                </div>
              {:else}
                <div class="grid gap-3">
                  <div class="rounded border border-white/10 bg-base-100 p-4">
                    <p class="text-neutral">Role</p>
                    <p class="mt-1 text-white">SRE Admin -> all indexes</p>
                  </div>
                  <div class="rounded border border-white/10 bg-base-100 p-4">
                    <p class="text-neutral">Role</p>
                    <p class="mt-1 text-white">Developer -> owned services</p>
                  </div>
                  <div class="rounded border border-white/10 bg-base-100 p-4">
                    <p class="text-neutral">SSO</p>
                    <p class="mt-1 text-white">
                      Google OAuth + domain allowlist
                    </p>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        {/key}
      </div>
    </div>
  </section>

  <section
    id="for-developers"
    class="border-b border-white/10 py-24 scroll-mt-20"
  >
    <div class="mx-auto max-w-[1200px] px-6">
      <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p
            class="font-mono text-xs uppercase tracking-[0.2em] text-primary"
            use:reveal
          >
            [ architecture ]
          </p>
          <h2
            class="mt-4 text-4xl font-normal tracking-[-0.06em] text-white md:text-6xl"
            style="text-wrap: balance"
            use:reveal={{ delay: 60 }}
          >
            A Small Surface Area For Serious Logs
          </h2>
          <p
            class="mt-5 max-w-[48ch] text-base leading-7 text-neutral"
            use:reveal={{ delay: 120 }}
          >
            Rootprint is intentionally compact: collect with standards, index
            with Quickwit, store on commodity object storage, and search from a
            UI your team can understand at 3 a.m.
          </p>
        </div>

        <div
          class="rounded-lg border border-white/10 bg-base-200 p-5"
          use:reveal={{ delay: 120 }}
        >
          <div class="grid gap-3">
            {#each pipeline as node, i}
              <div class="flex items-center gap-3">
                <div
                  class="grid h-12 w-12 shrink-0 place-items-center rounded border border-primary/40 bg-primary/10 font-mono text-sm text-primary"
                >
                  0{i + 1}
                </div>
                <div
                  class="flex-1 rounded border border-white/10 bg-black px-4 py-3 text-white"
                >
                  {node}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <div class="mt-10 grid gap-4 md:grid-cols-3">
        {#each valueCards as card, i}
          <div
            class="rounded-lg border border-white/10 bg-base-200 p-6"
            use:reveal={{ delay: i * 70 }}
          >
            <p
              class="font-mono text-xs uppercase tracking-[0.18em] text-primary"
            >
              {card.meta}
            </p>
            <h3 class="mt-5 text-2xl font-normal tracking-[-0.04em] text-white">
              {card.title}
            </h3>
            <p class="mt-4 text-sm leading-6 text-neutral">{card.body}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="py-24">
    <div class="mx-auto max-w-[1200px] px-6">
      <div
        class="relative overflow-hidden rounded-lg border border-primary/30 bg-primary p-8 text-primary-content md:p-12"
        use:reveal
      >
        <div
          class="absolute inset-y-0 right-0 hidden w-1/2 bg-[linear-gradient(90deg,rgba(39,247,149,0),rgba(10,10,10,0.16))] md:block"
        ></div>
        <div class="relative grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-end">
          <div>
            <p class="font-mono text-xs uppercase tracking-[0.2em] opacity-70">
              [ get started ]
            </p>
            <h2
              class="mt-4 max-w-[12ch] text-4xl font-normal tracking-[-0.06em] md:text-6xl"
              style="text-wrap: balance"
            >
              Deploy Rootprint In Minutes
            </h2>
            <p class="mt-5 max-w-[48ch] text-base leading-7 opacity-80">
              Spin up the stack, point your collectors at Rootprint, and keep
              your logs close to the systems that generated them.
            </p>
          </div>

          <div class="rounded border border-black/20 bg-black p-4 text-white">
            <button
              type="button"
              onclick={copyInstallCommand}
              aria-label="Copy install commands"
              aria-live="polite"
              class="float-right rounded border border-white/15 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-primary hover:text-primary"
            >
              {copyState === "copied"
                ? "Copied"
                : copyState === "failed"
                  ? "Failed"
                  : "Copy"}
            </button>
            <div
              class="clear-both overflow-x-auto pr-4 pt-2 font-mono text-sm leading-7"
            >
              {#each installCommands as cmd}
                <div class="whitespace-nowrap">
                  <span class="text-primary">$</span>
                  {cmd}
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 flex flex-wrap gap-3">
        <a
          href={docsUrl}
          class="btn-lift rounded bg-white px-5 py-3 text-sm font-semibold text-black transition-[transform,box-shadow] duration-200 ease-out-custom"
        >
          Read the docs
        </a>
        <a
          href={githubUrl}
          class="btn-lift rounded border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-[transform,box-shadow,border-color] duration-200 ease-out-custom hover:border-primary"
        >
          Star on GitHub
        </a>
      </div>
    </div>
  </section>
</div>

<style>
  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
