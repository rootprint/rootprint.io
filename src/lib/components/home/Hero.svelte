<script lang="ts">
  import { onDestroy } from "svelte";
  import { docsUrl, githubUrl } from "$lib/links";
  import GithubIcon from "$lib/components/GithubIcon.svelte";
  import { installTabs } from "$lib/data/home";

  let active = $state(0);
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
      Rootprint is open-source, self-hosted log management with
      OpenTelemetry-native ingestion, full-text search, and traces next to the
      logs that emitted them. You pay for retention at your object storage's
      $/GB.
    </p>

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
        <button type="button" class="copy-btn" aria-live="polite" onclick={copy}>
          {copied ? "copied" : "copy"}
        </button>
      </div>
    </div>

    <div
      style="margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap; align-items: center;"
    >
      <a
        href={docsUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-primary"
      >
        Get Started
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
    <div class="frame" style="margin-top: 48px;">
      <img
        src="/images/hero-screenshot.png"
        alt="Rootprint interface: full-text log search with field filters and a frequency histogram."
        width="2530"
        height="1268"
        fetchpriority="high"
      />
    </div>
  </div>
</section>
