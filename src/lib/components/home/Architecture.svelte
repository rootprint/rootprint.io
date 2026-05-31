<script lang="ts">
  import Eyebrow from "$lib/components/Eyebrow.svelte";
  import { reveal } from "$lib/actions/reveal";
  import { pipeline, valueCards } from "$lib/data/home";
</script>

<!-- ARCHITECTURE -->
<div class="section-divider" aria-hidden="true"></div>
<section id="developers" class="anchor">
  <div class="rail-wrap">
    <div class="split-2 arch-head">
      <div>
        <Eyebrow label="ARCHITECTURE" />
        <h2>A Small Surface<br />Area For<br />Serious Logs</h2>
        <p class="muted arch-intro">
          Rootprint is intentionally compact: collect with standards, index with
          Quickwit, store on commodity object storage, and search from a UI your
          team can understand at 3 a.m.
        </p>
      </div>

      <div class="arch-pipeline">
        {#each pipeline as node, i}
          <div class="arch-row">
            <div class="arch-num mono">{node.num}</div>
            <div>{node.label}</div>
            <div class="mono faint arch-side">{node.side}</div>
          </div>
          {#if i < pipeline.length - 1}
            <div class="arch-arrow"></div>
          {/if}
        {/each}
      </div>
    </div>

    <div class="why-grid">
      {#each valueCards as card, i}
        <div class="why-cell" use:reveal={{ delay: i * 70 }}>
          <p class="eyebrow why-meta">{card.meta}</p>
          <h4 class="why-title">{card.title}</h4>
          <p class="muted why-body">{card.body}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .arch-head {
    padding: 96px 32px 64px;
  }
  .arch-head h2 {
    margin-top: 20px;
  }
  .arch-intro {
    margin-top: 24px;
    max-width: 46ch;
    font-size: 14px;
    line-height: 1.6;
  }
  .arch-pipeline {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .why-meta {
    color: var(--primary-strong);
  }
  .why-title {
    margin-top: 14px;
    font-size: 24px;
  }
  .why-body {
    margin-top: 12px;
    font-size: 13px;
    line-height: 1.6;
  }
</style>
