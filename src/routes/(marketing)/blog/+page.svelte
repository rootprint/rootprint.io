<script lang="ts">
  import { WebsiteBaseUrl, WebsiteName } from "$lib/config";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const canonical = `${WebsiteBaseUrl}/blog/`;
  const pageTitle = `Blog — ${WebsiteName}`;
  const description =
    "Field notes on observability, self-hosted log management, and the Rootprint tooling.";
  const socialImageUrl = `${WebsiteBaseUrl}/images/home-image.png`;

  function fmt(d: string) {
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={socialImageUrl} />
  <meta property="og:site_name" content={WebsiteName} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={socialImageUrl} />
</svelte:head>

<main class="wrap" style="padding-top:48px;padding-bottom:80px;">
  <p class="eyebrow">
    <span class="bracket">[</span> BLOG <span class="bracket">]</span>
  </p>
  <h1 style="margin-top:20px;">Field notes on observability</h1>
  <p class="lead" style="margin-top:14px;max-width:52ch;">
    Notes on self-hosted log management, OpenTelemetry, storage economics, and
    building the Rootprint tooling.
  </p>

  {#if data.posts.length === 0}
    <p class="muted" style="margin-top:48px;">
      No posts yet — check back soon.
    </p>
  {:else}
    <div style="margin-top:48px;">
      {#each data.posts as post}
        <a
          href="/blog/{post.slug}/"
          class="hairline-b post-row"
          style="display:block;padding:24px 0;color:var(--base-content);text-decoration:none;"
        >
          <div class="mono faint" style="font-size:11px;letter-spacing:.1em;">
            {fmt(post.date)}{#if post.tags?.length}
              · {post.tags.join(" · ")}{/if}
          </div>
          <h2 style="margin:8px 0 0;font-size:22px;">{post.title}</h2>
          <p class="muted" style="margin-top:8px;max-width:60ch;">
            {post.description}
          </p>
        </a>
      {/each}
    </div>
  {/if}
</main>

<style>
  .post-row h2 {
    transition: color 0.15s ease;
  }
  .post-row:hover h2 {
    color: var(--primary-strong);
  }
</style>
