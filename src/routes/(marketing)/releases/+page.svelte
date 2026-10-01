<script lang="ts">
  import { WebsiteBaseUrl, WebsiteName } from "$lib/config";
  import { latest, releases, tagUrl } from "$lib/releases";
  import type { Snapshot } from "./$types";

  const title = `${WebsiteName} releases`;
  const description =
    "Every Rootprint release, with what changed and what to do before upgrading.";
  const canonical = `${WebsiteBaseUrl}/releases/`;
  const socialImage = `${WebsiteBaseUrl}/images/og-card.png`;

  const perPage = 10;
  const pageCount = Math.ceil(releases.length / perPage);
  let pageIndex = $state(0);
  const shown = $derived(
    releases.slice(pageIndex * perPage, (pageIndex + 1) * perPage),
  );

  // Back from a release page lands on the page it was opened from.
  export const snapshot: Snapshot<number> = {
    capture: () => pageIndex,
    restore: (value) => (pageIndex = value),
  };
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={socialImage} />
  <meta property="og:site_name" content={WebsiteName} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={socialImage} />
</svelte:head>

<div class="wrap">
  <header class="intro">
    <h1>Releases</h1>
    <p class="muted">{description}</p>
  </header>

  <div class="releases">
    <div class="row head" aria-hidden="true">
      <span>Version</span>
      <span>Date</span>
      <span>Release</span>
    </div>
    <ul>
      {#each shown as release (release.version)}
        {@const external = !release.title}
        {@const isLatest = release.version === latest.version}
        <li>
          <a
            class="row"
            class:latest={isLatest}
            class:tag-only={external}
            href={external
              ? tagUrl(release.version)
              : `/releases/${release.version}/`}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            <span class="version">
              {release.version}{#if external}&nbsp;↗{/if}
              {#if isLatest}<span class="sr-only">(latest)</span>{/if}
            </span>
            <time class="date" datetime={release.date}>{release.date}</time>
            <span class="title">{release.title ?? "—"}</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>

  <nav class="pagination" aria-label="Release pages">
    <button
      type="button"
      disabled={pageIndex === 0}
      onclick={() => (pageIndex -= 1)}>← Newer</button
    >
    <span class="pages">
      {#each { length: pageCount } as _, i (i)}
        <button
          type="button"
          aria-current={i === pageIndex ? "page" : undefined}
          onclick={() => (pageIndex = i)}>{i + 1}</button
        >
      {/each}
    </span>
    <button
      type="button"
      disabled={pageIndex === pageCount - 1}
      onclick={() => (pageIndex += 1)}>Older →</button
    >
  </nav>
</div>

<style>
  .intro {
    padding: 56px 0 36px;
  }

  .intro p {
    margin-top: 20px;
    font-size: 15px;
  }

  .releases {
    border: 1px solid var(--hairline);
    background: var(--base-200);
    font-size: 13px;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li + li {
    border-top: 1px solid var(--hairline);
  }

  .row {
    display: grid;
    grid-template-columns: 10ch 12ch 1fr;
    gap: 4px 16px;
    padding: 14px 16px;
  }

  .head {
    border-bottom: 1px solid var(--hairline);
    background: var(--base-300);
    font-weight: 500;
    color: var(--base-content-muted);
  }

  a.row:hover {
    background: var(--base-300);
  }

  a.row:focus-visible {
    outline: 2px solid var(--base-content);
    outline-offset: -2px;
  }

  /* Offset 0 lays the outline over the neighbouring hairlines instead of beside them. */
  a.row.latest {
    outline: 1px solid var(--primary-strong);
    outline-offset: 0;
  }

  .version {
    font-weight: 500;
  }

  .latest .version {
    color: var(--primary-strong);
  }

  .tag-only .version,
  .date {
    color: var(--base-content-muted);
  }

  .date {
    font-variant-numeric: tabular-nums;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin: 16px 0 72px;
    font-size: 13px;
  }

  .pages {
    display: flex;
    gap: 6px;
  }

  .pagination button {
    min-width: 34px;
    padding: 6px 12px;
    border: 1px solid var(--hairline);
    background: var(--base-200);
    color: var(--base-content-muted);
  }

  .pagination button:hover:not(:disabled) {
    border-color: var(--hairline-strong);
    color: var(--base-content);
  }

  .pagination button[aria-current="page"] {
    border-color: var(--base-content);
    color: var(--base-content);
  }

  .pagination button:disabled {
    opacity: 0.4;
    cursor: default;
  }

  @media (max-width: 720px) {
    .intro {
      padding-top: 40px;
    }
  }

  /* Version and date on one line, title below. */
  @media (max-width: 640px) {
    .head {
      display: none;
    }

    .row {
      grid-template-columns: 1fr auto;
      padding: 12px 16px;
    }

    .title {
      grid-column: 1 / -1;
    }

    .tag-only .title {
      display: none;
    }

    .pagination button {
      padding: 6px 10px;
    }
  }
</style>
