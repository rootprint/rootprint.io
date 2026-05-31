<script lang="ts">
  import Eyebrow from "$lib/components/Eyebrow.svelte";
  import { reveal } from "$lib/actions/reveal";
  import { compareCards } from "$lib/data/home";
</script>

<!-- COMPARE STRIP -->
<div class="section-divider" aria-hidden="true"></div>
<section id="compare" class="anchor">
  <div class="rail-wrap">
    <div class="cmp-head">
      <Eyebrow label="COMPARE" />
      <h2 class="cmp-title">If You're Coming From…</h2>
    </div>

    <div class="compare-grid">
      {#each compareCards as card, i}
        <a
          href="/compare/{card.slug}/"
          class="compare-card"
          use:reveal={{ delay: i * 70 }}
        >
          <div class="mono faint cmp-tag">{card.tag}</div>
          <div class="cmp-name">{card.name}</div>
          <p class="muted cmp-body">{card.body}</p>
          <div class="compare-cta mono">Read comparison →</div>
        </a>
      {/each}
    </div>
  </div>
</section>

<style>
  .cmp-head {
    padding: 64px 32px 32px;
  }
  .cmp-title {
    margin-top: 16px;
    font-size: 44px;
  }
  .cmp-tag {
    font-size: 11px;
    letter-spacing: 0.12em;
  }
  .cmp-name {
    font-size: 32px;
    letter-spacing: -0.02em;
    margin-top: 14px;
  }
  .cmp-body {
    margin-top: 10px;
    font-size: 13px;
    line-height: 1.6;
  }
</style>
