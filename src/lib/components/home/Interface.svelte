<script lang="ts">
  import Eyebrow from "$lib/components/Eyebrow.svelte";
  import { reveal } from "$lib/actions/reveal";
  import { screens } from "$lib/data/home";
</script>

<!-- INTERFACE — screenshot grid -->
<div class="section-divider" aria-hidden="true"></div>
<section id="interface" class="anchor">
  <div class="rail-wrap">
    <div class="split-2 if-head">
      <div>
        <Eyebrow label="INTERFACE" />
        <h2>Built To Read<br />Under Pressure</h2>
      </div>
      <p class="muted if-intro">
        The UI is for reading logs during an incident — not building dashboards.
        Severity, service, fields, and raw messages stay visible.
      </p>
    </div>

    <div class="shot-grid">
      {#each screens as screen, i}
        <div class="shot-cell" use:reveal={{ delay: i * 70 }}>
          <div class="shot">
            <span class="shot-tag">{screen.tag}</span>
          </div>
          <div class="shot-cap">
            <h4 class="if-title">{screen.title}</h4>
            <p class="muted if-body">{screen.body}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .if-head {
    padding: 96px 32px 48px;
  }
  .if-head h2 {
    margin-top: 20px;
  }
  .if-intro {
    align-self: end;
    max-width: 46ch;
    font-size: 14px;
    line-height: 1.6;
  }
  .if-title {
    font-size: 18px;
  }
  .if-body {
    margin-top: 10px;
    font-size: 13px;
    line-height: 1.6;
  }
</style>
