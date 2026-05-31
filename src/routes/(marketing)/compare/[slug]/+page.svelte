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
  ];

  const rpColumn = [
    { mark: "r:YES", text: "Self-host on your infra", tone: "win" },
    { mark: "r:Apache-2.0", text: "Open source", tone: "win" },
    { text: "OTLP · HTTP · Vector · Fluent Bit", tone: "" },
    { text: "Full-text + structured fields", tone: "" },
    { text: "Your S3 / R2 / MinIO bucket", tone: "win" },
    { text: "Object-storage rates ($/GB/month)", tone: "win" },
    { text: "Compose stack + object storage", tone: "win" },
    { mark: "x:NO", text: "Logs only", tone: "lose" },
    { text: "Stays inside your VPC", tone: "win" },
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
  const pageTitle = $derived(`${WebsiteName} vs ${c.competitor} — Compare`);
  const metaDescription = $derived(
    `Rootprint compared to ${c.competitor}: hosting, licensing, storage economics, query model, and where each one wins.`,
  );
  const socialImageUrl = `${WebsiteBaseUrl}/images/home-image.png`;
  const ldJson = $derived({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${WebsiteName} vs ${c.competitor}`,
    description: metaDescription,
    url: canonical,
    image: socialImageUrl,
    author: { "@type": "Organization", name: WebsiteName, url: WebsiteBaseUrl },
    publisher: {
      "@type": "Organization",
      name: WebsiteName,
      url: WebsiteBaseUrl,
      logo: { "@type": "ImageObject", url: `${WebsiteBaseUrl}/logo.png` },
    },
  });
  const jsonldScript = $derived(
    `<script type="application/ld+json">${JSON.stringify(ldJson) + "<"}/script>`,
  );
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={metaDescription} />
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={metaDescription} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={socialImageUrl} />
  <meta property="og:image:width" content="2530" />
  <meta property="og:image:height" content="1269" />
  <meta property="og:site_name" content={WebsiteName} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={metaDescription} />
  <meta name="twitter:image" content={socialImageUrl} />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonldScript}
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
        <a href={githubUrl} class="btn btn-ghost">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            />
          </svg>
          Star on GitHub
        </a>
      </div>
    </div>
  </section>
</main>
