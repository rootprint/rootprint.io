<script lang="ts">
  import { WebsiteBaseUrl, WebsiteName } from "./../../../../config";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  const c = $derived(data.competitor);

  const docsUrl = "https://docs.rootprint.io";
  const githubUrl = "https://github.com/rootprint/rootprint";

  // Shared capability rows + Rootprint column (competitor column comes from data).
  const capabilities = [
    "Hosting model",
    "License",
    "Ingest path",
    "Index & query",
    "Storage",
    "Retention pricing",
    "Operational surface",
    "Beyond logs (APM/RUM)",
    "Data sovereignty",
    "Lock-in risk",
  ];

  const rpColumn = [
    { mark: "r:YES", text: "Self-host on your infra", tone: "win" },
    { mark: "r:Apache-2.0", text: "Open source", tone: "win" },
    { text: "OTLP/HTTP · NDJSON · Vector · Fluent Bit", tone: "" },
    { text: "Full-text + structured fields", tone: "" },
    { text: "Your S3 / R2 / MinIO bucket", tone: "win" },
    { text: "Object-storage rates ($/GB/month)", tone: "win" },
    { text: "Compose stack + object storage", tone: "win" },
    { mark: "x:NO", text: "Logs only", tone: "lose" },
    { text: "Stays inside your VPC", tone: "win" },
    { text: "NDJSON exports, readable segments", tone: "win" },
  ];

  const pickBullets = [
    "Long retention is the budget killer.",
    "Compliance / sovereignty requires logs stay in your perimeter.",
    "You already operate object storage and OpenTelemetry collectors.",
    "You want a stack you can read, audit, and fork.",
  ];

  function mark(m?: string) {
    if (!m) return null;
    const idx = m.indexOf(":");
    return { cls: m.slice(0, idx), label: m.slice(idx + 1) };
  }

  const canonical = $derived(`${WebsiteBaseUrl}/compare/${c.slug}/`);
</script>

<svelte:head>
  <title>{WebsiteName} vs {c.competitor} — Compare</title>
  <meta
    name="description"
    content="Rootprint compared to {c.competitor}: hosting, licensing, storage economics, query model, and where each one wins."
  />
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content="{WebsiteName} vs {c.competitor}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={canonical} />
</svelte:head>

<main class="wrap" style="padding-top:48px;padding-bottom:80px;">
  <!-- Compare sub-nav -->
  <div
    class="hairline-b"
    style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;padding-bottom:20px;"
  >
    <span class="mono faint" style="font-size:11px;letter-spacing:.1em;"
      >/ compare / <span style="color:var(--base-content);">{c.slug}</span
      ></span
    >
    <div
      style="flex:1;display:flex;gap:20px;justify-content:flex-end;flex-wrap:wrap;font-size:13px;"
    >
      {#each data.all as item}
        <a
          href="/compare/{item.slug}/"
          class={item.slug === c.slug ? "" : "muted"}
          style={item.slug === c.slug ? "color:var(--primary-strong);" : ""}
          >vs {item.navLabel}</a
        >
      {/each}
    </div>
  </div>

  <!-- Hero -->
  <section class="cmp-hero" style="margin-top:48px;">
    <div>
      <p class="eyebrow">
        <span class="bracket">[</span> COMPARE · {c.versus}
        <span class="bracket">]</span>
      </p>
      <h1 style="margin-top:20px;">
        Rootprint<br />
        <span class="faint" style="font-size:0.5em;letter-spacing:-0.01em;"
          >vs</span
        ><br />
        {c.competitor}
      </h1>
      <div class="cmp-versus" style="margin-top:28px;">
        <span class="pill brand">rootprint · self-hosted</span>
        <span>vs</span>
        <span class="pill">{c.competitorPill}</span>
      </div>
    </div>
    <div>
      <p class="muted" style="font-size:16px;line-height:1.6;max-width:46ch;">
        {c.tagline}
      </p>
      <p class="cmp-fineprint">
        Last updated <span class="mono">{c.updated}</span> · written by the rootprint
        team
      </p>
    </div>
  </section>

  <!-- TL;DR strip -->
  <section class="cmp-tldr">
    <div>
      <div class="lbl">TL;DR — COST</div>
      <div class="val">{c.tldrCost}</div>
    </div>
    <div>
      <div class="lbl">TL;DR — DATA</div>
      <div class="val">{c.tldrData}</div>
    </div>
    <div>
      <div class="lbl">TL;DR — TRADEOFF</div>
      <div class="val">{c.tldrTrade}</div>
    </div>
  </section>

  <!-- Feature matrix -->
  <section class="cmp-section">
    <p class="eyebrow">
      <span class="bracket">[</span> MATRIX <span class="bracket">]</span>
    </p>
    <h2 style="margin-top:20px;">Feature-by-feature</h2>
    <p class="lead">
      A direct comparison on the surfaces most teams care about when picking a
      logging platform.
    </p>

    <p class="cmp-scroll-hint mono" aria-hidden="true">scroll horizontally →</p>
    <table class="cmp-table">
      <thead>
        <tr>
          <th>Capability</th>
          <th>Rootprint</th>
          <th>{c.competitorCol}</th>
        </tr>
      </thead>
      <tbody>
        {#each capabilities as capability, i}
          {@const rp = rpColumn[i]}
          {@const comp = c.column[i]}
          {@const rpMark = mark(rp.mark)}
          {@const compMark = mark(comp.mark)}
          <tr>
            <td>{capability}</td>
            <td class={rp.tone ?? ""}>
              {#if rpMark}<span class="mark {rpMark.cls}">{rpMark.label}</span
                >{/if}{rp.text}
            </td>
            <td class={comp.tone ?? ""}>
              {#if compMark}<span class="mark {compMark.cls}"
                  >{compMark.label}</span
                >{/if}{comp.text}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>

  <!-- When to pick / when to stay -->
  <section class="cmp-section cmp-decision">
    <div>
      <p class="eyebrow" style="color:var(--primary-strong);">
        PICK ROOTPRINT IF…
      </p>
      <h2 style="margin-top:16px;font-size:30px;max-width:18ch;">
        You'd rather own the storage line item.
      </h2>
      <ul>
        {#each pickBullets as bullet}
          <li>
            <span style="color:var(--primary);font-family:var(--font-mono);"
              >●</span
            >{bullet}
          </li>
        {/each}
      </ul>
    </div>
    <div>
      <p class="eyebrow muted">STAY WITH {c.competitorStay} IF…</p>
      <h2 style="margin-top:16px;font-size:30px;max-width:18ch;">
        {c.stayTitle}
      </h2>
      <ul>
        {#each c.stayBullets as bullet}
          <li><span class="faint mono">○</span>{bullet}</li>
        {/each}
      </ul>
    </div>
  </section>

  <!-- CTA -->
  <section style="padding:64px 0;">
    <div
      class="hairline rounded-box"
      style="background:var(--base-200);padding:48px;display:flex;align-items:center;justify-content:space-between;gap:32px;flex-wrap:wrap;"
    >
      <div>
        <p class="eyebrow">
          <span class="bracket">[</span> NEXT <span class="bracket">]</span>
        </p>
        <h3 style="margin-top:14px;font-size:28px;max-width:22ch;">
          Try Rootprint side-by-side with your current pipeline.
        </h3>
        <p class="muted" style="margin-top:10px;font-size:14px;">
          Dual-ship for a week and compare the storage line item for yourself.
        </p>
      </div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href={docsUrl} class="btn btn-primary">Read the docs →</a>
        <a href={githubUrl} class="btn btn-ghost">★ Star on GitHub</a>
      </div>
    </div>
  </section>
</main>
