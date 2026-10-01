<script lang="ts">
  import { WebsiteBaseUrl, WebsiteName } from "$lib/config";
  import { githubUrl } from "$lib/links";

  const pageTitle = `Privacy — ${WebsiteName}`;
  const description =
    "rootprint.io has no analytics, ads, or tracking cookies. Cloudflare serves the site and GitHub supplies the star count.";
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

<article class="wrap">
  <h1>Privacy</h1>
  <p class="muted">
    This site has no analytics, ads, or tracking cookies, and we don't build
    profiles of visitors. Two services see your requests.
  </p>

  <h2>Cloudflare</h2>
  <p class="muted">
    Cloudflare hosts this site. It processes your IP address and request details
    to serve pages and block abuse, and it may set a security cookie to filter
    bots. See
    <a
      href="https://www.cloudflare.com/privacypolicy/"
      target="_blank"
      rel="noopener noreferrer">Cloudflare's Privacy Policy</a
    >.
  </p>

  <h2>GitHub</h2>
  <p class="muted">
    Your browser fetches the project's star count from GitHub's public API
    (api.github.com), so GitHub sees your IP address and request details. The
    request sends no cookies. See
    <a
      href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement"
      target="_blank"
      rel="noopener noreferrer">GitHub's Privacy Statement</a
    >.
  </p>

  <h2>The Rootprint software</h2>
  <p class="muted">
    Rootprint runs on your own infrastructure and sends nothing back to us.
  </p>

  <h2>Contact</h2>
  <p class="muted">
    Questions?
    <a href="{githubUrl}/issues" target="_blank" rel="noopener noreferrer"
      >Open an issue on GitHub</a
    >.
  </p>

  <p class="faint updated">Last updated: 2026-10-01</p>
</article>

<style>
  article {
    padding-top: 56px;
    padding-bottom: 72px;
  }

  h2 {
    margin-top: 40px;
    font-size: 17px;
  }

  p {
    max-width: 72ch;
    margin-top: 12px;
    font-size: 15px;
    line-height: 1.7;
  }

  h1 + p {
    margin-top: 20px;
  }

  a {
    color: var(--base-content);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .updated {
    margin-top: 48px;
    font-size: 13px;
  }
</style>
