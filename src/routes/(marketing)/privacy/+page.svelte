<script lang="ts">
  import { WebsiteBaseUrl, WebsiteName } from "../../../config";

  const pageTitle = `Privacy — ${WebsiteName}`;
  const description =
    "How we handle data on rootprint.io. Short version: we don't add analytics or tracking.";
  const canonical = `${WebsiteBaseUrl}/privacy/`;
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonical} />
  <meta property="og:site_name" content={WebsiteName} />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={description} />
</svelte:head>

<article class="max-w-[1200px] mx-auto px-6 py-16">
  <div class="max-w-[65ch] mx-auto">
    <h1
      class="text-3xl sm:text-4xl font-semibold text-base-content tracking-tight"
    >
      Privacy
    </h1>

    <p class="mt-6 text-base text-neutral leading-relaxed">
      We don't add any analytics, advertising, or tracking to this site — no
      analytics scripts, no tracking cookies, and we don't build a profile of
      who visits. The one thing to know: like any website, this site is served
      by a hosting provider (Cloudflare), and serving a page necessarily
      involves some standard technical data. Details below.
    </p>

    <h2 class="mt-10 text-xl font-semibold text-base-content tracking-tight">
      What's not collected
    </h2>
    <ul
      class="mt-4 space-y-2 text-base text-neutral leading-relaxed list-disc pl-6"
    >
      <li>
        <strong class="text-base-content font-semibold">No analytics scripts.</strong>
        We don't load any analytics or measurement code, and we haven't enabled
        visitor analytics on our host.
      </li>
      <li>
        <strong class="text-base-content font-semibold">No tracking cookies.</strong>
        We set no cookies. Our host may set a security cookie to protect the
        site from bots and abuse; it isn't used to track you.
      </li>
      <li>
        <strong class="text-base-content font-semibold">No profiling.</strong>
        We don't combine, sell, or use visitor data to build profiles or
        identify individuals.
      </li>
      <li>
        <strong class="text-base-content font-semibold"
          >No cross-site tracking.</strong
        > Your activity on other sites is not linked to activity here.
      </li>
    </ul>

    <h2 class="mt-10 text-xl font-semibold text-base-content tracking-tight">
      Hosting
    </h2>
    <p class="mt-4 text-base text-neutral leading-relaxed">
      This site is served through Cloudflare. To deliver and protect the site,
      Cloudflare processes standard connection data — including your IP address
      and basic request details — in its server logs for a limited period.
      Cloudflare acts as a data processor on our behalf and doesn't use this
      data for its own advertising. See <a
        href="https://www.cloudflare.com/privacypolicy/"
        target="_blank"
        rel="noopener noreferrer"
        class="underline decoration-neutral/40 underline-offset-2 hover:decoration-base-content hover:text-base-content transition-colors duration-200 ease-out-custom"
        >Cloudflare's Privacy Policy</a
      >.
    </p>

    <h2 class="mt-10 text-xl font-semibold text-base-content tracking-tight">
      The rest of Rootprint
    </h2>
    <p class="mt-4 text-base text-neutral leading-relaxed">
      Rootprint is self-hosted software you run on your own infrastructure. When
      you install and use Rootprint, no data from your installation flows back
      to us. Everything stays on your servers.
    </p>

    <h2 class="mt-10 text-xl font-semibold text-base-content tracking-tight">
      Contact
    </h2>
    <p class="mt-4 text-base text-neutral leading-relaxed">
      Questions? <a
        href="https://github.com/rootprint/rootprint/issues"
        target="_blank"
        rel="noopener noreferrer"
        class="underline decoration-neutral/40 underline-offset-2 hover:decoration-base-content hover:text-base-content transition-colors duration-200 ease-out-custom"
        >Open an issue on GitHub</a
      >.
    </p>

    <p class="mt-12 text-sm text-neutral/70">Last updated: 2026-05-31</p>
  </div>
</article>
