<script lang="ts">
  import { WebsiteName } from "./../../config";

  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();
  let mobileMenuOpen = $state(false);
  const mobileMenuId = "mobile-navigation";
  const docsUrl = "https://docs.rootprint.io";
  const githubUrl = "https://github.com/oleksandr-zhyhalo/rootprint";
</script>

<a href="#main-content" class="skip-to-content">Skip to content</a>

<!-- Navigation -->
<header
  class="sticky top-0 z-40 border-b border-white/10 bg-base-100/85 backdrop-blur-md"
>
  <nav
    class="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between"
  >
    <a
      href="/"
      class="flex items-center gap-2 text-xl font-semibold tracking-tight text-base-content"
    >
      <span
        class="grid h-7 w-7 place-items-center rounded border border-primary/40 bg-primary text-sm font-bold text-primary-content"
        aria-hidden="true">R</span
      >
      {WebsiteName}
    </a>

    <!-- Desktop nav -->
    <div class="hidden sm:flex items-center gap-8">
      <a
        href="/#capabilities"
        class="nav-link text-sm font-medium text-neutral hover:text-base-content transition-colors duration-200 ease-out-custom"
      >
        Capabilities
      </a>
      <a
        href="/#for-developers"
        class="nav-link text-sm font-medium text-neutral hover:text-base-content transition-colors duration-200 ease-out-custom"
      >
        For developers
      </a>
      <a
        href={docsUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="nav-link text-sm font-medium text-neutral hover:text-base-content transition-colors duration-200 ease-out-custom"
      >
        Docs
      </a>
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="nav-link text-sm font-medium text-neutral hover:text-base-content transition-colors duration-200 ease-out-custom"
      >
        GitHub
      </a>
      <a
        href={docsUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm font-medium bg-base-content text-base-100 px-4 py-1.5 rounded-md btn-lift transition-[transform,box-shadow] duration-200 ease-out-custom inline-flex items-center gap-1.5"
      >
        Get started
        <span aria-hidden="true">→</span>
      </a>
    </div>

    <!-- Mobile hamburger -->
    <button
      class="sm:hidden btn btn-ghost btn-circle btn-sm"
      type="button"
      onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
      aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      aria-controls={mobileMenuId}
      aria-expanded={mobileMenuOpen}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {#if mobileMenuOpen}
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        {:else}
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        {/if}
      </svg>
    </button>
  </nav>

  <!-- Mobile menu -->
  {#if mobileMenuOpen}
    <nav
      id={mobileMenuId}
      aria-label="Mobile navigation"
      class="overflow-hidden border-t border-white/10 bg-base-100 sm:hidden"
      style="animation: slideDown 200ms ease-out"
    >
      <div class="px-6 py-4 flex flex-col gap-3">
        <a
          href="/#capabilities"
          class="text-sm font-medium text-neutral hover:text-base-content transition-colors py-2"
          onclick={() => (mobileMenuOpen = false)}
        >
          Capabilities
        </a>
        <a
          href="/#for-developers"
          class="text-sm font-medium text-neutral hover:text-base-content transition-colors py-2"
          onclick={() => (mobileMenuOpen = false)}
        >
          For developers
        </a>
        <a
          href={docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm font-medium text-neutral hover:text-base-content transition-colors py-2"
        >
          Docs
        </a>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm font-medium text-neutral hover:text-base-content transition-colors py-2"
        >
          GitHub
        </a>
        <a
          href={docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm font-medium bg-base-content text-base-100 text-center px-4 py-2 rounded-md btn-lift transition-[transform,box-shadow] duration-200 ease-out-custom mt-2 inline-flex items-center justify-center gap-1.5"
        >
          Get started
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </nav>
  {/if}
</header>

<main id="main-content" inert={mobileMenuOpen}>
  {@render children?.()}
</main>

<!-- Spacer for sticky footer -->
<div class="grow"></div>

<!-- Footer -->
<footer class="border-t border-white/10 bg-[#050505]" inert={mobileMenuOpen}>
  <div
    class="max-w-[1200px] mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-3 gap-8"
  >
    <div>
      <span class="text-base-content font-semibold text-lg">{WebsiteName}</span>
      <p class="text-sm text-neutral mt-2 max-w-[30ch]">
        Open-source, self-hosted log intelligence for teams that own their data.
      </p>
    </div>
    <div>
      <span
        class="text-xs font-semibold text-neutral/70 tracking-wider uppercase"
        >Product</span
      >
      <nav class="mt-3 flex flex-col gap-2">
        <a
          href={docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-neutral hover:text-base-content transition-colors duration-200 ease-out-custom"
          >Docs</a
        >
        <a
          href="{githubUrl}/releases"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-neutral hover:text-base-content transition-colors duration-200 ease-out-custom"
          >Changelog</a
        >
      </nav>
    </div>
    <div>
      <span
        class="text-xs font-semibold text-neutral/70 tracking-wider uppercase"
        >Project</span
      >
      <nav class="mt-3 flex flex-col gap-2">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-neutral hover:text-base-content transition-colors duration-200 ease-out-custom"
          >GitHub</a
        >
        <a
          href="{githubUrl}/issues"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-neutral hover:text-base-content transition-colors duration-200 ease-out-custom"
          >Issues</a
        >
        <a
          href="{githubUrl}/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-neutral hover:text-base-content transition-colors duration-200 ease-out-custom"
          >Contributing</a
        >
        <a
          href="{githubUrl}/blob/main/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-neutral hover:text-base-content transition-colors duration-200 ease-out-custom"
          >License</a
        >
      </nav>
    </div>
  </div>
  <div class="border-t border-base-300">
    <div
      class="max-w-[1200px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-2"
    >
      <p class="text-xs text-neutral/70">
        &copy; {new Date().getFullYear()} Rootprint · Powered by
        <a
          href="https://quickwit.io"
          target="_blank"
          rel="noopener noreferrer"
          class="underline decoration-neutral/40 underline-offset-2 hover:decoration-base-content hover:text-base-content transition-colors duration-200 ease-out-custom"
          >Quickwit</a
        >
      </p>
      <a
        href="/privacy/"
        class="text-xs text-neutral/70 hover:text-base-content transition-colors duration-200 ease-out-custom"
        >Privacy</a
      >
    </div>
  </div>
</footer>

<style>
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
