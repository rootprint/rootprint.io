<script lang="ts">
  import {
    WebsiteBaseUrl,
    WebsiteDescription,
    WebsiteName,
  } from "./../../config";
  import { onMount } from "svelte";
  import { reveal } from "$lib/actions/reveal";

  const docsUrl = "https://docs.rootprint.io";
  const githubUrl = "https://github.com/rootprint/rootprint";

  const capabilities = [
    {
      num: "01",
      kicker: "OPENTELEMETRY FIRST",
      name: "Ingest",
      description:
        "OTLP/HTTP endpoint, NDJSON gateway, per-index bearer tokens.",
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

  const pipeline = [
    { num: "01", label: "App / SDK", side: "otel-sdk" },
    { num: "02", label: "Rootprint API", side: "auth" },
    { num: "03", label: "OTEL Collector", side: "batching" },
    { num: "04", label: "Quickwit", side: "splits" },
    { num: "05", label: "S3", side: "storage" },
  ];

  const valueCards = [
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

  const compare = [
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

  const screens = [
    {
      tag: "FULL-TEXT SEARCH",
      title: "Search across every field",
      body: "Full-text and structured field filters over your indexed logs, powered by Quickwit.",
    },
    {
      tag: "FILTERS + HISTOGRAM",
      title: "Slice by field, text, and time",
      body: "Quickwit query string, saved queries, and a histogram to find the spike fast.",
    },
    {
      tag: "EXPORT",
      title: "Take your results with you",
      body: "Export query results as CSV or NDJSON for sharing or deeper analysis.",
    },
  ];

  // ── Hero C: cursor-lit dashed bar field ────────────────────────────────
  let heroHost = $state<HTMLElement | null>(null);
  let barField = $state<HTMLElement | null>(null);

  onMount(() => {
    const host = heroHost;
    const field = barField;
    if (!host || !field) return;
    const layers = field.querySelectorAll<HTMLElement>(".bar-layer");

    function fill() {
      const w = field!.clientWidth;
      const h = field!.clientHeight;
      const lineH = 8;
      const cols = Math.ceil(w / 5) + 8;
      const rows = Math.ceil(h / lineH) + 8;
      const filled = "R".repeat(cols);
      const blank = " ".repeat(cols);
      const lines: string[] = [];
      for (let r = 0; r < rows; r++) {
        lines.push(r % 2 === 0 ? filled : blank);
      }
      const text = lines.join("\n");
      layers.forEach((l) => (l.textContent = text));
    }

    let rafId = 0;
    let pendingX = 0;
    let pendingY = 0;
    function applyPos() {
      rafId = 0;
      host!.style.setProperty("--mx", pendingX + "px");
      host!.style.setProperty("--my", pendingY + "px");
    }
    function onMove(e: MouseEvent) {
      const r = host!.getBoundingClientRect();
      pendingX = e.clientX - r.left;
      pendingY = e.clientY - r.top;
      if (!rafId) rafId = requestAnimationFrame(applyPos);
    }
    function onLeave() {
      host!.style.setProperty("--mx", "-600px");
      host!.style.setProperty("--my", "-600px");
    }
    host.addEventListener("mousemove", onMove);
    host.addEventListener("mouseleave", onLeave);

    fill();
    let resizeT: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(fill, 120);
    };
    window.addEventListener("resize", onResize);

    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        clearTimeout(resizeT);
        resizeT = setTimeout(fill, 60);
      });
      ro.observe(field);
    }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fill);
    }

    return () => {
      host.removeEventListener("mousemove", onMove);
      host.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
      clearTimeout(resizeT);
      if (rafId) cancelAnimationFrame(rafId);
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
</script>

<svelte:head>
  <title>{WebsiteName} — Own Your Log Footprint</title>
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

<!-- ─── HERO — variant C: schematic / cursor-lit bar field ──────────────── -->
<section
  bind:this={heroHost}
  class="wrap bp-corners"
  style="position:relative;padding-top:48px;display:flex;flex-direction:column;"
>
  <div class="bar-field" aria-hidden="true" bind:this={barField}>
    <div class="bar-layer bar-base"></div>
    <div class="bar-layer bar-hi"></div>
  </div>

  <div
    style="position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;padding:36px 0;"
  >
    <p class="eyebrow">
      <span class="dot"></span>SELF-HOSTED · OPENTELEMETRY · APACHE-2.0
    </p>
    <h1
      class="display-serif"
      style="margin-top:18px;font-size:clamp(44px,5.5vw,76px);"
    >
      Own Your<br /><span class="grad-text">Log Footprint</span>
    </h1>
    <p
      class="muted"
      style="margin-top:20px;max-width:54ch;font-size:15px;line-height:1.6;"
    >
      Logs carry the shape of your systems. Rootprint keeps that operational
      fingerprint on infrastructure you control — fast search, OTLP-native,
      object-storage-backed, Apache-2.0-licensed.
    </p>
    <div
      style="display:flex;gap:12px;margin-top:28px;flex-wrap:wrap;justify-content:center;"
    >
      <a href={docsUrl} class="btn btn-primary"
        >Try Rootprint <span aria-hidden="true">→</span></a
      >
      <a href={githubUrl} class="btn btn-ghost">View on GitHub</a>
    </div>
  </div>

  <!-- Product screenshot (placeholder) -->
  <div
    class="shot-frame"
    style="position:relative;margin:36px 0 56px;"
    use:reveal
  >
    <div class="shot-bar">
      <span class="shot-dots"><i></i><i></i><i></i></span>
      <span>rootprint — log search</span>
      <span style="margin-left:auto;">localhost:8282</span>
    </div>
    <div class="shot" style="aspect-ratio:16/9;">
      <span class="shot-tag">App screenshot · 1600 × 900</span>
    </div>
  </div>
</section>

<!-- ─── CAPABILITIES — variant B: 4-column grid ─────────────────────────── -->
<div class="section-divider" aria-hidden="true"></div>
<section id="capabilities" style="scroll-margin-top:72px;">
  <div class="rail-wrap">
    <div style="padding:96px 32px 48px;">
      <p class="eyebrow">
        <span class="bracket">[</span> CAPABILITIES
        <span class="bracket">]</span>
      </p>
      <h2 style="margin-top:20px;">Log Search On<br />Storage You Own</h2>
    </div>

    <div class="caps-grid">
      {#each capabilities as cap, i}
        <div class="caps-cell" use:reveal={{ delay: i * 70 }}>
          <div class="mono faint" style="font-size:11px;letter-spacing:.12em;">
            {cap.num} / {cap.kicker}
          </div>
          <h3 style="margin-top:18px;font-size:30px;">{cap.name}</h3>
          <p
            class="muted"
            style="margin-top:14px;font-size:13px;line-height:1.6;"
          >
            {cap.description}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ─── INTERFACE — screenshot grid ─────────────────────────────────────── -->
<div class="section-divider" aria-hidden="true"></div>
<section id="interface" style="scroll-margin-top:72px;">
  <div class="rail-wrap">
    <div class="split-2" style="padding:96px 32px 48px;">
      <div>
        <p class="eyebrow">
          <span class="bracket">[</span> INTERFACE <span class="bracket">]</span>
        </p>
        <h2 style="margin-top:20px;">Built To Read<br />Under Pressure</h2>
      </div>
      <p
        class="muted"
        style="align-self:end;max-width:46ch;font-size:14px;line-height:1.6;"
      >
        The UI is for reading logs during an incident — not building dashboards.
        Severity, service, fields, and raw messages stay visible.
      </p>
    </div>

    <div class="shot-grid">
      {#each screens as s, i}
        <div class="shot-cell" use:reveal={{ delay: i * 70 }}>
          <div class="shot">
            <span class="shot-tag">{s.tag}</span>
          </div>
          <div class="shot-cap">
            <h4 style="font-size:18px;">{s.title}</h4>
            <p
              class="muted"
              style="margin-top:10px;font-size:13px;line-height:1.6;"
            >
              {s.body}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ─── ARCHITECTURE ────────────────────────────────────────────────────── -->
<div class="section-divider" aria-hidden="true"></div>
<section id="developers" style="scroll-margin-top:72px;">
  <div class="rail-wrap">
    <div class="split-2" style="padding:96px 32px 64px;">
      <div>
        <p class="eyebrow">
          <span class="bracket">[</span> ARCHITECTURE
          <span class="bracket">]</span>
        </p>
        <h2 style="margin-top:20px;">
          A Small Surface<br />Area For<br />Serious Logs
        </h2>
        <p
          class="muted"
          style="margin-top:24px;max-width:46ch;font-size:14px;line-height:1.6;"
        >
          Rootprint is intentionally compact: collect with standards, index with
          Quickwit, store on commodity object storage, and search from a UI your
          team can understand at 3 a.m.
        </p>
      </div>

      <div style="padding:20px 0;display:flex;flex-direction:column;gap:8px;">
        {#each pipeline as node, i}
          <div class="arch-row">
            <div class="arch-num mono">{node.num}</div>
            <div>{node.label}</div>
            <div class="mono faint arch-side">{node.side}</div>
          </div>
          {#if i < pipeline.length - 1}
            <div class="arch-arrow"></div>
          {/if}
        {/each}
      </div>
    </div>

    <div class="why-grid">
      {#each valueCards as card, i}
        <div class="why-cell" use:reveal={{ delay: i * 70 }}>
          <p class="eyebrow" style="color:var(--primary-strong);">
            {card.meta}
          </p>
          <h4 style="margin-top:14px;font-size:24px;">{card.title}</h4>
          <p
            class="muted"
            style="margin-top:12px;font-size:13px;line-height:1.6;"
          >
            {card.body}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ─── GET STARTED ─────────────────────────────────────────────────────── -->
<div class="section-divider" aria-hidden="true"></div>
<section id="start" style="scroll-margin-top:72px;">
  <div class="rail-wrap">
    <div class="start-grid">
      <div style="padding:64px 48px;">
        <p class="eyebrow">
          <span class="bracket">[</span> GET STARTED
          <span class="bracket">]</span>
        </p>
        <h2 style="margin-top:20px;font-size:54px;">
          Deploy<br />Rootprint<br />In Minutes
        </h2>
        <p
          class="muted"
          style="margin-top:24px;max-width:42ch;font-size:14px;line-height:1.6;"
        >
          Spin up the stack, point your collectors at Rootprint.
        </p>
        <div style="display:flex;gap:12px;margin-top:32px;flex-wrap:wrap;">
          <a href={docsUrl} class="btn btn-primary"
            >Read the docs <span aria-hidden="true">→</span></a
          >
          <a href={githubUrl} class="btn btn-ghost">★ Star on GitHub</a>
        </div>
      </div>
      <div
        class="hairline-l"
        style="padding:48px;background:var(--base-100);display:flex;flex-direction:column;gap:14px;justify-content:center;"
      >
        <div class="code" style="font-size:12px;">
          <div class="ln">
            <span class="c">$ </span><span class="ok">curl</span> -O <span
              class="v"
              >https://raw.githubusercontent.com/rootprint/rootprint/main/docs-site/files/docker-compose.yml</span
            >
          </div>
          <div class="ln">
            <span class="c">$ </span><span class="ok">docker</span> compose up -d
          </div>
          <div class="ln">&nbsp;</div>
          <div class="ln"><span class="c"># open the UI</span></div>
          <div class="ln">
            <span class="c">$ </span><span class="ok">open</span>
            <span class="v">http://localhost:8282</span>
          </div>
        </div>
        <div class="start-mini">
          <div>
            <div
              class="mono faint"
              style="font-size:10px;letter-spacing:.12em;"
            >
              SETUP
            </div>
            <div class="mono" style="font-size:18px;margin-top:4px;">
              ~3 min
            </div>
          </div>
          <div>
            <div
              class="mono faint"
              style="font-size:10px;letter-spacing:.12em;"
            >
              DOCKER
            </div>
            <div class="mono" style="font-size:18px;margin-top:4px;">
              1 file
            </div>
          </div>
          <div>
            <div
              class="mono faint"
              style="font-size:10px;letter-spacing:.12em;"
            >
              DEPS
            </div>
            <div class="mono" style="font-size:18px;margin-top:4px;">0</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ─── COMPARE STRIP ───────────────────────────────────────────────────── -->
<div class="section-divider" aria-hidden="true"></div>
<section id="compare" style="scroll-margin-top:72px;">
  <div class="rail-wrap">
    <div style="padding:64px 32px 32px;">
      <p class="eyebrow">
        <span class="bracket">[</span> COMPARE <span class="bracket">]</span>
      </p>
      <h2 style="margin-top:16px;font-size:44px;">If You're Coming From…</h2>
    </div>

    <div class="compare-grid">
      {#each compare as c, i}
        <a
          href="/compare/{c.slug}/"
          class="compare-card"
          use:reveal={{ delay: i * 70 }}
        >
          <div class="mono faint" style="font-size:11px;letter-spacing:.12em;">
            {c.tag}
          </div>
          <div style="font-size:32px;letter-spacing:-0.02em;margin-top:14px;">
            {c.name}
          </div>
          <p
            class="muted"
            style="margin-top:10px;font-size:13px;line-height:1.6;"
          >
            {c.body}
          </p>
          <div class="compare-cta mono">Read comparison →</div>
        </a>
      {/each}
    </div>
  </div>
</section>
