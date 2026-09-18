<script lang="ts">
  import { onDestroy } from "svelte";
  import { demoUrl, docsUrl, githubUrl } from "$lib/links";
  import GithubIcon from "$lib/components/GithubIcon.svelte";
  import { installTabs, shots } from "$lib/data/home";

  let active = $state(0);
  let shot = $state(0);
  let copied = $state(false);
  let copyTimer: ReturnType<typeof setTimeout> | undefined;

  async function copy() {
    try {
      await navigator.clipboard.writeText(installTabs[active].command);
      copied = true;
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => (copied = false), 1500);
    } catch {
      /* clipboard unavailable — command stays selectable as text */
    }
  }

  onDestroy(() => clearTimeout(copyTimer));
</script>

<section style="padding: 64px 0 72px;">
  <div class="wrap">
    <h1 style="max-width: 22ch;">Own your logs. Search them fast.</h1>
    <p
      class="muted"
      style="margin-top: 16px; max-width: 62ch; font-size: 15px;"
    >
      Rootprint is an open-source, self-hosted platform for logs and traces:
      OpenTelemetry-native ingestion, full-text search, trace waterfalls, and a
      service health dashboard, indexed straight to your own object storage.
      Retention costs whatever your bucket costs.
    </p>

    <div
      style="margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap; align-items: center;"
    >
      <a
        href={demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-primary btn-lift desktop-only"
      >
        Try the live demo
      </a>
      <a
        href={docsUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-ghost"
      >
        Get started
      </a>
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-ghost"
      >
        <GithubIcon />
        GitHub
      </a>
    </div>

    <div class="install" style="margin-top: 32px;">
      {#if installTabs.length > 1}
        <div class="install-tabs">
          {#each installTabs as tab, i}
            <button
              type="button"
              aria-pressed={active === i}
              onclick={() => (active = i)}
            >
              {tab.label}
            </button>
          {/each}
        </div>
      {/if}
      <div class="install-cmd">
        <span class="prompt" aria-hidden="true">$</span>
        <code>{installTabs[active].command}</code>
        <button
          type="button"
          class="copy-btn"
          aria-live="polite"
          onclick={copy}
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>
    </div>
    <div class="frame" style="margin-top: 48px;">
      <div class="install-tabs">
        {#each shots as s, i}
          <button
            type="button"
            aria-pressed={shot === i}
            onclick={() => (shot = i)}
          >
            {s.label}
          </button>
        {/each}
      </div>
      {#each shots as s, i}
        <img
          src={s.src}
          alt={s.alt}
          width="2160"
          height="1350"
          fetchpriority={i === 0 ? "high" : undefined}
          loading={i === 0 ? undefined : "lazy"}
          hidden={shot !== i}
        />
      {/each}
    </div>
  </div>
</section>
