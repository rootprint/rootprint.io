<script lang="ts">
  import { ScopeLine, WebsiteBaseUrl, WebsiteName } from "$lib/config";
  import { demoUrl, docsUrl } from "$lib/links";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  const comparison = $derived(data.comparison);
  const title = $derived(`Rootprint vs ${comparison.navLabel}`);
  const canonical = $derived(`${WebsiteBaseUrl}/compare/${comparison.slug}/`);
  const socialImage = `${WebsiteBaseUrl}/images/home-image.png`;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={comparison.description} />
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={comparison.description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={socialImage} />
  <meta property="og:site_name" content={WebsiteName} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={comparison.description} />
  <meta name="twitter:image" content={socialImage} />
</svelte:head>

<div class="wrap">
  <nav class="compare-nav" aria-label="Comparisons">
    <a href="/compare/">All comparisons</a>
    {#each data.comparisons as item (item.slug)}
      <a
        href="/compare/{item.slug}/"
        aria-current={item.slug === comparison.slug ? "page" : undefined}
      >
        vs {item.navLabel}
      </a>
    {/each}
  </nav>

  <header class="intro">
    <h1 class="title">
      <span
        ><img
          src="/images/rp-mark-inverted-256.png"
          alt=""
          width="40"
          height="40"
        />Rootprint</span
      >
      vs
      <span
        ><svg viewBox="0 0 24 24" aria-hidden="true"
          ><path d={comparison.icon} /></svg
        >{comparison.navLabel}</span
      >
    </h1>
    <p class="muted">{comparison.description}</p>
  </header>

  <!-- Explicit roles: Safari drops table semantics once rows switch to grid on mobile. -->
  <!-- svelte-ignore a11y_no_redundant_roles -->
  <table role="table">
    <caption class="sr-only">{title}: features and hosting</caption>
    <thead role="rowgroup">
      <tr role="row">
        <th role="columnheader" scope="col">Feature</th>
        <th role="columnheader" scope="col">Rootprint</th>
        <th role="columnheader" scope="col">{comparison.navLabel}</th>
      </tr>
    </thead>
    <tbody role="rowgroup">
      {#each data.rows as row (row.label)}
        <tr role="row">
          <th role="rowheader" scope="row">{row.label}</th>
          <td role="cell" class="ours">{row.rootprint}</td>
          <td role="cell">{row.competitor}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="notes">
    <section>
      <h2>When Rootprint fits</h2>
      <p class="muted">{comparison.useRootprint}</p>
    </section>
    <section>
      <h2>When {comparison.navLabel} fits</h2>
      <p class="muted">{comparison.useCompetitor}</p>
    </section>
  </div>

  <section class="section">
    <h2>Try Rootprint</h2>
    <p class="muted summary">{comparison.summary} {ScopeLine}</p>
    <div class="actions">
      <a
        href="{docsUrl}/quickstart"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-primary btn-lift">Get started</a
      >
      <a
        href={demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-ghost desktop-only">Live demo</a
      >
    </div>
  </section>
</div>

<style>
  .compare-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 24px;
    padding: 16px 0;
    border-bottom: 1px solid var(--hairline);
    font-size: 13px;
    color: var(--base-content-muted);
  }

  .compare-nav a:hover,
  .compare-nav a[aria-current="page"] {
    color: var(--base-content);
    text-decoration: underline;
    text-underline-offset: 5px;
  }

  .intro {
    padding: 56px 0 36px;
  }

  .title {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0 0.35em;
  }

  .title span {
    display: inline-flex;
    align-items: center;
    gap: 0.35em;
  }

  .title img,
  .title svg {
    width: 0.9em;
    height: 0.9em;
  }

  .title svg {
    fill: var(--base-content);
  }

  .intro p {
    max-width: 72ch;
    margin-top: 20px;
    font-size: 15px;
  }

  table {
    width: 100%;
    border: 1px solid var(--hairline);
    border-collapse: collapse;
    background: var(--base-200);
    font-size: 13px;
  }

  th,
  td {
    padding: 16px;
    text-align: left;
    vertical-align: top;
    border-bottom: 1px solid var(--hairline);
  }

  thead {
    background: var(--base-300);
  }

  tbody th {
    width: 22%;
    font-weight: 500;
  }

  td {
    width: 39%;
    color: var(--base-content-muted);
  }

  td.ours {
    color: var(--base-content);
  }

  tbody tr:last-child > * {
    border-bottom: 0;
  }

  .notes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr));
    gap: 32px 48px;
    padding: 48px 0;
  }

  .notes h2 {
    font-size: 20px;
  }

  .notes p {
    margin-top: 12px;
  }

  .summary {
    max-width: 72ch;
    margin-top: 12px;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 24px;
  }

  @media (max-width: 720px) {
    .intro {
      padding-top: 40px;
    }
  }

  /* Two value columns under a full-width feature name, so the competitor stays on screen. */
  @media (max-width: 640px) {
    tr {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    thead th:first-child {
      display: none;
    }

    th,
    td {
      width: auto;
      padding: 12px;
    }

    tbody th {
      grid-column: 1 / -1;
      width: auto;
      padding-bottom: 0;
      border-bottom: 0;
    }
  }
</style>
