<script lang="ts">
  import type { Component } from "svelte";
  import { WebsiteBaseUrl, WebsiteName } from "$lib/config";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  // mdsvex compiles each post to a Svelte component (wrapped by BlogPost layout).
  const Post = $derived(data.component as Component);
  const m = $derived(data.meta);

  const canonical = $derived(`${WebsiteBaseUrl}/blog/${data.slug}/`);
  const pageTitle = $derived(`${m.title} — ${WebsiteName}`);
  const socialImageUrl = $derived(
    m.cover
      ? `${WebsiteBaseUrl}${m.cover}`
      : `${WebsiteBaseUrl}/images/home-image.png`,
  );

  const ldJson = $derived({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: m.title,
    description: m.description,
    url: canonical,
    image: socialImageUrl,
    datePublished: m.date,
    dateModified: m.updated ?? m.date,
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
  <meta name="description" content={m.description} />
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={m.description} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={socialImageUrl} />
  <meta property="og:site_name" content={WebsiteName} />
  <meta property="article:published_time" content={m.date} />
  <meta property="article:modified_time" content={m.updated ?? m.date} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={m.description} />
  <meta name="twitter:image" content={socialImageUrl} />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonldScript}
</svelte:head>

<Post />
