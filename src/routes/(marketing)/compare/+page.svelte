<script lang="ts">
  import { WebsiteBaseUrl, WebsiteName } from "$lib/config";
  import { comparisons } from "$lib/data/compare";
  import { comparisonLinks } from "$lib/data/comparison-links";

  const title = `Compare ${WebsiteName}`;
  const description =
    "How Rootprint compares with Datadog, Elastic, Grafana Loki, and HyperDX for log search, tracing, storage, and cost.";
  const canonical = `${WebsiteBaseUrl}/compare/`;
  const socialImage = `${WebsiteBaseUrl}/images/og-card.png`;
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
    <h1>{title}</h1>
    <p class="muted">{description}</p>
  </header>

  <ul class="list">
    {#each comparisonLinks as item (item.slug)}
      <li>
        <a href="/compare/{item.slug}/">
          <svg class="logo" viewBox="0 0 24 24" aria-hidden="true"
            ><path d={item.icon} /></svg
          >
          <div>
            <h2>Rootprint vs {item.navLabel}</h2>
            <p class="muted">{comparisons[item.slug].description}</p>
            <span class="more">Read comparison →</span>
          </div>
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  .intro {
    padding: 56px 0 36px;
  }

  .intro p {
    max-width: 72ch;
    margin-top: 20px;
    font-size: 15px;
  }

  .list {
    list-style: none;
    margin: 0 0 72px;
    padding: 0;
    border: 1px solid var(--hairline);
    background: var(--base-200);
  }

  .list li + li {
    border-top: 1px solid var(--hairline);
  }

  .list a {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    padding: 24px;
    transition: background-color 0.15s ease;
  }

  .list a:hover {
    background: var(--base-300);
  }

  .list a:focus-visible {
    outline: 2px solid var(--base-content);
    outline-offset: -2px;
  }

  .logo {
    flex: none;
    width: 40px;
    height: 40px;
    padding: 9px;
    border: 1px solid var(--hairline);
    background: var(--base-100);
    fill: var(--base-content);
  }

  .list h2 {
    font-size: 17px;
  }

  .list p {
    max-width: 76ch;
    margin-top: 8px;
  }

  .more {
    display: inline-block;
    margin-top: 12px;
    font-size: 13px;
  }

  .list a:hover .more {
    text-decoration: underline;
    text-underline-offset: 5px;
  }

  @media (max-width: 720px) {
    .intro {
      padding-top: 40px;
    }

    .list a {
      flex-direction: column;
      gap: 16px;
      padding: 20px 16px;
    }
  }
</style>
