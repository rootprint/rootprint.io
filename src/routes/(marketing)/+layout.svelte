<script lang="ts">
  import { WebsiteName } from "./../../config";
  import { docsUrl, githubUrl } from "$lib/links";

  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();
  let mobileMenuOpen = $state(false);
  const mobileMenuId = "mobile-navigation";

  const navLinks = [
    { label: "Capabilities", href: "/#capabilities" },
    { label: "Developers", href: "/#developers" },
    { label: "Compare", href: "/#compare" },
  ];
</script>

<a href="#main-content" class="skip-to-content">Skip to content</a>

<!-- Brutalist vertical frame rails -->
<div class="vrail vrail-l" aria-hidden="true"></div>
<div class="vrail vrail-r" aria-hidden="true"></div>

<!-- ─── NAVIGATION — variant B: mono path-style ───────────────────────── -->
<header
  class="hairline-b sticky top-0 z-40"
  style="background: color-mix(in oklch, var(--base-100) 85%, transparent); backdrop-filter: blur(8px);"
>
  <nav class="wrap site-nav">
    <a href="/" class="brand">
      <img
        src="/logo.png"
        alt=""
        style="width:24px;height:24px;display:block;"
      />
      <span class="brand-name">Rootprint</span>
    </a>

    <!-- Desktop center links -->
    <div class="site-nav-links" style="display:none;" data-nav-desktop>
      {#each navLinks as link}
        <a href={link.href}>{link.label}</a>
      {/each}
    </div>

    <!-- Desktop right actions -->
    <div class="site-nav-actions" style="display:none;" data-nav-desktop>
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-sm btn-ghost"
        aria-label="GitHub"
      >
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
        GitHub
      </a>
      <a
        href={docsUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-sm btn-ghost"
      >
        Docs
      </a>
      <a
        href={docsUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-sm btn-primary"
      >
        Get Started
      </a>
    </div>

    <!-- Mobile toggle -->
    <button
      class="mono"
      type="button"
      style="margin-left:auto;border:1px solid var(--hairline-strong);border-radius:var(--radius-field);padding:6px 10px;background:transparent;font-size:12px;"
      onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
      aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      aria-controls={mobileMenuId}
      aria-expanded={mobileMenuOpen}
      data-nav-mobile
    >
      {mobileMenuOpen ? "[ close ]" : "[ menu ]"}
    </button>
  </nav>

  {#if mobileMenuOpen}
    <nav
      id={mobileMenuId}
      aria-label="Mobile navigation"
      class="hairline-t mono"
      style="background:var(--base-100);"
      data-nav-mobile
    >
      <div
        class="wrap"
        style="display:flex;flex-direction:column;gap:4px;padding-top:12px;padding-bottom:16px;font-size:13px;"
      >
        {#each navLinks as link}
          <a
            href={link.href}
            style="padding:8px 0;color:var(--base-content);"
            onclick={() => (mobileMenuOpen = false)}>{link.label}</a
          >
        {/each}
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          style="padding:8px 0;color:var(--base-content);"
          onclick={() => (mobileMenuOpen = false)}>GitHub</a
        >
        <a
          href={docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style="padding:8px 0;color:var(--base-content);"
          onclick={() => (mobileMenuOpen = false)}>Docs</a
        >
        <a
          href={docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-sm btn-primary"
          style="margin-top:8px;justify-content:center;"
        >
          Get Started
        </a>
      </div>
    </nav>
  {/if}
</header>

<main id="main-content" inert={mobileMenuOpen}>
  {@render children?.()}
</main>

<div class="grow"></div>

<!-- ─── FOOTER — variant B: brutalist sitemap grid ────────────────────── -->
<div class="section-divider" aria-hidden="true"></div>
<footer inert={mobileMenuOpen}>
  <div class="rail-wrap">
    <div class="footer-grid">
      <div class="footer-cell">
        <div class="mono faint footer-h">PRODUCT</div>
        <a href={docsUrl} class="footer-link">Docs</a>
        <a href="/#capabilities" class="footer-link">Capabilities</a>
        <a href="{githubUrl}/releases" class="footer-link">Changelog</a>
        <a href="{githubUrl}/blob/main/CHANGELOG.md" class="footer-link"
          >Roadmap</a
        >
      </div>
      <div class="footer-cell">
        <div class="mono faint footer-h">PROJECT</div>
        <a href={githubUrl} class="footer-link">GitHub</a>
        <a href="{githubUrl}/issues" class="footer-link">Issues</a>
        <a href="{githubUrl}/discussions" class="footer-link">Discussions</a>
        <a href="{githubUrl}/releases" class="footer-link">Releases</a>
      </div>
      <div class="footer-cell">
        <div class="mono faint footer-h">COMPARE</div>
        <a href="/compare/datadog/" class="footer-link">vs Datadog</a>
        <a href="/compare/elastic/" class="footer-link">vs Elastic</a>
        <a href="/compare/loki/" class="footer-link">vs Loki</a>
        <a href="/#compare" class="footer-link faint">All comparisons</a>
      </div>
      <div class="footer-cell">
        <div class="mono faint footer-h">DEVELOPERS</div>
        <a href={docsUrl} class="footer-link">Quickstart</a>
        <a href="{docsUrl}/install/docker-compose" class="footer-link"
          >OTLP setup</a
        >
        <a href={docsUrl} class="footer-link">Query DSL</a>
        <a href={docsUrl} class="footer-link">API reference</a>
      </div>
      <div class="footer-cell">
        <div class="mono faint footer-h">COMMUNITY</div>
        <a href="{githubUrl}/discussions" class="footer-link">Discussions</a>
        <a href="{githubUrl}/blob/main/CONTRIBUTING.md" class="footer-link"
          >Contributing</a
        >
        <a href="https://quickwit.io" class="footer-link">Quickwit</a>
        <a href={githubUrl} class="footer-link">Star us</a>
      </div>
      <div class="footer-cell">
        <div class="mono faint footer-h">LEGAL</div>
        <a href="{githubUrl}/blob/main/LICENSE" class="footer-link">License</a>
        <a href="/privacy/" class="footer-link">Privacy</a>
        <a href="{githubUrl}/blob/main/SECURITY.md" class="footer-link"
          >Security</a
        >
      </div>
    </div>
  </div>
</footer>

<style>
  /* Mono-path nav is desktop-only; mobile uses the [ menu ] toggle. */
  @media (min-width: 760px) {
    [data-nav-desktop] {
      display: flex !important;
    }
    [data-nav-mobile] {
      display: none !important;
    }
  }
</style>
