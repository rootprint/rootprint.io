<script lang="ts">
  import { docsUrl, githubUrl } from "$lib/links";
  import GithubIcon from "$lib/components/GithubIcon.svelte";

  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();
  let mobileMenuOpen = $state(false);
  const mobileMenuId = "mobile-navigation";

  const navLinks = [
    { label: "Docs", href: docsUrl, external: true },
    { label: "Architecture", href: "/#architecture", external: false },
    { label: "FAQ", href: "/#faq", external: false },
  ];
</script>

<a href="#main-content" class="skip-to-content">Skip to content</a>

<header
  class="hairline-b sticky top-0 z-40"
  style="background: color-mix(in oklch, var(--base-100) 92%, transparent); backdrop-filter: blur(8px);"
>
  <nav class="wrap site-nav">
    <a href="/" class="brand">
      <img
        src="/images/rp-mark-inverted-256.png"
        alt=""
        style="height: 24px; width: 24px; display: block;"
      />
      <span class="brand-name">Rootprint</span>
    </a>

    <!-- Desktop links + actions -->
    <div class="site-nav-links" style="display: none;" data-nav-desktop>
      {#each navLinks as link}
        <a
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
        >
          {link.label}
        </a>
      {/each}
    </div>
    <div class="site-nav-actions" style="display: none;" data-nav-desktop>
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-sm btn-ghost"
        aria-label="GitHub"
      >
        <GithubIcon />
        GitHub
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
      style="margin-left: auto; border: 1px solid var(--hairline-strong); padding: 6px 10px; background: transparent; font-size: 12px;"
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
      style="background: var(--base-100);"
      data-nav-mobile
    >
      <div
        class="wrap"
        style="display: flex; flex-direction: column; gap: 4px; padding-top: 12px; padding-bottom: 16px; font-size: 13px;"
      >
        {#each navLinks as link}
          <a
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            style="padding: 8px 0; color: var(--base-content);"
            onclick={() => (mobileMenuOpen = false)}>{link.label}</a
          >
        {/each}
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          style="padding: 8px 0; color: var(--base-content);"
          onclick={() => (mobileMenuOpen = false)}>GitHub</a
        >
        <a
          href={docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-sm btn-primary"
          style="margin-top: 8px;"
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

<footer class="hairline-t" inert={mobileMenuOpen}>
  <div class="wrap" style="padding-left: 0; padding-right: 0;">
    <div class="footer-grid">
      <div class="footer-cell">
        <div class="mono faint footer-h">PRODUCT</div>
        <a href={docsUrl} class="footer-link">Docs</a>
        <a href="/#capabilities" class="footer-link">What is Rootprint</a>
        <a href="{githubUrl}/releases" class="footer-link">Changelog</a>
      </div>
      <div class="footer-cell">
        <div class="mono faint footer-h">DEVELOPERS</div>
        <a href="{docsUrl}/api/overview" class="footer-link">API reference</a>
        <a href="{docsUrl}/quickstart" class="footer-link">Quickstart</a>
        <a href="{docsUrl}/send-logs/otlp" class="footer-link">OTLP setup</a>
        <a href="{docsUrl}/search/query-language" class="footer-link"
          >Query language</a
        >
      </div>
      <div class="footer-cell">
        <div class="mono faint footer-h">PROJECT</div>
        <a href={githubUrl} class="footer-link">GitHub</a>
        <a href="{githubUrl}/issues" class="footer-link">Issues</a>
        <a href="{githubUrl}/blob/main/CONTRIBUTING.md" class="footer-link"
          >Contributing</a
        >
        <a href="https://quickwit.io" class="footer-link">Quickwit</a>
      </div>
    </div>
    <div class="footer-meta">
      <span>© Rootprint · Apache-2.0</span>
      <a href="{githubUrl}/blob/main/LICENSE" class="footer-link faint"
        >License</a
      >
      <a href="/privacy/" class="footer-link faint">Privacy</a>
      <a href="{githubUrl}/blob/main/SECURITY.md" class="footer-link faint"
        >Security</a
      >
    </div>
  </div>
</footer>

<style>
  @media (min-width: 760px) {
    [data-nav-desktop] {
      display: flex !important;
    }
    [data-nav-mobile] {
      display: none !important;
    }
  }
</style>
