<script lang="ts">
  import Eyebrow from "$lib/components/Eyebrow.svelte";
  import { docsUrl, githubUrl } from "$lib/links";

  const composeUrl =
    "https://raw.githubusercontent.com/rootprint/rootprint/main/docs-site/files/docker-compose.yml";

  const stats = [
    { label: "SETUP", value: "~3 min" },
    { label: "DOCKER", value: "1 file" },
    { label: "DEPS", value: "0" },
  ];
</script>

<!-- GET STARTED -->
<div class="section-divider" aria-hidden="true"></div>
<section id="start" class="anchor">
  <div class="rail-wrap">
    <div class="start-grid">
      <div class="start-copy">
        <Eyebrow label="GET STARTED" />
        <h2 class="start-title">Deploy<br />Rootprint<br />In Minutes</h2>
        <p class="muted start-lede">
          Spin up the stack, point your collectors at Rootprint.
        </p>
        <div class="start-actions">
          <a href={docsUrl} class="btn btn-primary">
            Read the docs <span aria-hidden="true">→</span>
          </a>
          <a href={githubUrl} class="btn btn-ghost">★ Star on GitHub</a>
        </div>
      </div>

      <div class="hairline-l start-panel">
        <div class="code start-code">
          <div class="ln">
            <span class="c">$ </span><span class="ok">curl</span> -O
            <span class="v">{composeUrl}</span>
          </div>
          <div class="ln">
            <span class="c">$ </span><span class="ok">docker</span> compose up -d
          </div>
          <div class="ln">&nbsp;</div>
          <div class="ln"><span class="c"># open the UI</span></div>
          <div class="ln">
            <span class="c">$ </span><span class="ok">open</span>
            <span class="v">http://localhost:8282</span>
          </div>
        </div>
        <div class="start-mini">
          {#each stats as stat}
            <div>
              <div class="mono faint start-mini-label">{stat.label}</div>
              <div class="mono start-mini-value">{stat.value}</div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .start-copy {
    padding: 64px 48px;
  }
  .start-title {
    margin-top: 20px;
    font-size: 54px;
  }
  .start-lede {
    margin-top: 24px;
    max-width: 42ch;
    font-size: 14px;
    line-height: 1.6;
  }
  .start-actions {
    display: flex;
    gap: 12px;
    margin-top: 32px;
    flex-wrap: wrap;
  }
  .start-panel {
    padding: 48px;
    background: var(--base-100);
    display: flex;
    flex-direction: column;
    gap: 14px;
    justify-content: center;
  }
  .start-code {
    font-size: 12px;
  }
  .start-mini-label {
    font-size: 10px;
    letter-spacing: 0.12em;
  }
  .start-mini-value {
    font-size: 18px;
    margin-top: 4px;
  }
</style>
