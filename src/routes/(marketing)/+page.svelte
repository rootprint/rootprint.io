<script lang="ts">
  import { WebsiteBaseUrl, WebsiteDescription, WebsiteName } from "$lib/config";
  import Hero from "$lib/components/home/Hero.svelte";
  import WhatIs from "$lib/components/home/WhatIs.svelte";
  import Architecture from "$lib/components/home/Architecture.svelte";
  import Faq from "$lib/components/home/Faq.svelte";
  import Cta from "$lib/components/home/Cta.svelte";

  const pageTitle = `${WebsiteName} — Open-Source, Self-Hosted Log Management`;
  const ldJson = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: WebsiteName,
      url: WebsiteBaseUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: WebsiteName,
      url: WebsiteBaseUrl,
      logo: `${WebsiteBaseUrl}/logo.png`,
      sameAs: ["https://github.com/rootprint/rootprint"],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: WebsiteName,
      description: WebsiteDescription,
      url: WebsiteBaseUrl,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Linux, Docker",
      license: "https://www.apache.org/licenses/LICENSE-2.0",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  ];
  const jsonldScript = `<script type="application/ld+json">${
    JSON.stringify(ldJson) + "<"
  }/script>`;
  const socialImageUrl = `${WebsiteBaseUrl}/images/home-image.png`;
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={WebsiteDescription} />
  <link rel="canonical" href={WebsiteBaseUrl} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={WebsiteDescription} />
  <meta property="og:url" content={WebsiteBaseUrl} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={socialImageUrl} />
  <meta property="og:image:width" content="2530" />
  <meta property="og:image:height" content="1269" />
  <meta property="og:image:alt" content="Rootprint product interface preview" />
  <meta property="og:site_name" content={WebsiteName} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={WebsiteDescription} />
  <meta name="twitter:image" content={socialImageUrl} />
  <meta
    name="twitter:image:alt"
    content="Rootprint product interface preview"
  />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonldScript}
</svelte:head>

<Hero />
<WhatIs />
<Architecture />
<Faq />
<Cta />
