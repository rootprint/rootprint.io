<script lang="ts">
  import { WebsiteBaseUrl, WebsiteName } from "$lib/config";
  import { githubUrl } from "$lib/links";
  import { latest, tagUrl } from "$lib/releases";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  const release = $derived(data.release);
  const isLatest = $derived(release.version === latest.version);
  const title = $derived(`Rootprint ${release.version}: ${release.title}`);
  const canonical = $derived(`${WebsiteBaseUrl}/releases/${release.version}/`);
  const socialImage = `${WebsiteBaseUrl}/images/home-image.png`;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={release.summary} />
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={release.summary} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={socialImage} />
  <meta property="og:site_name" content={WebsiteName} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={release.summary} />
  <meta name="twitter:image" content={socialImage} />
</svelte:head>

<article class="wrap">
  <a href="/releases/" class="back">← All releases</a>

  <header class="head" class:latest={isLatest}>
    <div class="intro">
      <h1>{release.title}</h1>
      <p class="muted">{release.summary}</p>
    </div>
    <dl class="meta">
      <div>
        <dt class="eyebrow">Version</dt>
        <dd>
          {release.version}
          {#if isLatest}<span class="latest-note">latest</span>{/if}
        </dd>
      </div>
      <div>
        <dt class="eyebrow">Released</dt>
        <dd><time datetime={release.date}>{release.date}</time></dd>
      </div>
      <div>
        <dt class="eyebrow">Source</dt>
        <dd>
          <a
            href={tagUrl(release.version)}
            target="_blank"
            rel="noopener noreferrer">GitHub release ↗</a
          >
        </dd>
      </div>
      <div>
        <dt class="eyebrow">Changes</dt>
        <dd>
          {#if data.previousVersion}
            <a
              href="{githubUrl}/compare/v{data.previousVersion}...v{release.version}"
              target="_blank"
              rel="noopener noreferrer"
              >{data.previousVersion}…{release.version} ↗</a
            >
          {:else}
            —
          {/if}
        </dd>
      </div>
    </dl>
  </header>

  <div class="prose">
    <data.body />
  </div>

  <nav class="pager" aria-label="Other releases">
    {#if data.older}
      <a href="/releases/{data.older.version}/">
        <span class="eyebrow">← Previous</span>
        <span>{data.older.version} · {data.older.title}</span>
      </a>
    {/if}
    {#if data.newer}
      <a class="next" href="/releases/{data.newer.version}/">
        <span class="eyebrow">Next →</span>
        <span>{data.newer.version} · {data.newer.title}</span>
      </a>
    {/if}
  </nav>
</article>

<style>
  .back {
    display: inline-block;
    margin-top: 32px;
    font-size: 13px;
    color: var(--base-content-muted);
  }

  .back:hover {
    color: var(--base-content);
  }

  .head {
    margin-top: 16px;
    border: 1px solid var(--hairline);
    background: var(--base-200);
  }

  .head.latest {
    border-color: var(--primary-strong);
  }

  .intro {
    padding: 32px;
  }

  .intro p.muted {
    margin-top: 16px;
    font-size: 15px;
  }

  /* 1px gaps over a hairline background draw the dividers between cells. */
  .meta {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    margin: 0;
    border-top: 1px solid var(--hairline);
    background: var(--hairline);
  }

  .meta div {
    padding: 14px 32px;
    background: var(--base-200);
  }

  .meta dt {
    color: var(--base-content-faint);
  }

  .meta dd {
    margin: 4px 0 0;
    font-size: 13px;
  }

  .meta a:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  .latest-note {
    margin-left: 6px;
    color: var(--primary-strong);
  }

  .prose {
    padding: 16px 0 48px;
    overflow-wrap: anywhere;
  }

  .prose :global(h2) {
    margin: 40px 0 12px;
    font-size: 22px;
  }

  .prose :global(h3) {
    margin: 28px 0 8px;
    font-size: 15px;
  }

  .prose :global(p),
  .prose :global(ul),
  .prose :global(ol),
  .prose :global(pre) {
    margin: 12px 0;
  }

  .prose :global(ul),
  .prose :global(ol) {
    padding-left: 20px;
  }

  .prose :global(ul) {
    list-style: square;
  }

  .prose :global(ol) {
    list-style: decimal;
  }

  .prose :global(li + li) {
    margin-top: 6px;
  }

  .prose :global(li > p) {
    margin: 6px 0;
  }

  .prose :global(strong) {
    font-weight: 600;
  }

  .prose :global(a) {
    color: var(--primary-strong);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 2px;
  }

  .prose :global(code) {
    padding: 0.1em 0.35em;
    background: var(--base-300);
    font-size: 0.9em;
  }

  .prose :global(pre) {
    padding: 14px 16px;
    border: 1px solid var(--hairline-strong);
    background: var(--base-200);
    overflow-x: auto;
    overflow-wrap: normal;
    font-size: 13px;
    line-height: 1.6;
  }

  .prose :global(pre code) {
    padding: 0;
    background: none;
    font-size: inherit;
  }

  .pager {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 72px;
  }

  .pager a {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 20px 24px;
    border: 1px solid var(--hairline);
    background: var(--base-200);
    font-size: 13px;
  }

  .pager a:hover {
    border-color: var(--hairline-strong);
    background: var(--base-300);
  }

  .pager .next {
    grid-column: 2;
    text-align: right;
  }

  @media (max-width: 640px) {
    .intro {
      padding: 24px 20px;
    }

    .meta {
      grid-template-columns: 1fr 1fr;
    }

    .meta div {
      padding: 12px 20px;
    }

    .pager {
      grid-template-columns: 1fr;
    }

    .pager .next {
      grid-column: 1;
    }
  }
</style>
