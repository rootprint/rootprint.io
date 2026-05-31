<script lang="ts">
  import Eyebrow from "$lib/components/Eyebrow.svelte";
  import { reveal } from "$lib/actions/reveal";
  import { capabilities } from "$lib/data/home";
</script>

<!-- CAPABILITIES — 4-column grid -->
<div class="section-divider" aria-hidden="true"></div>
<section id="capabilities" class="anchor">
  <div class="rail-wrap">
    <div class="caps-head">
      <Eyebrow label="CAPABILITIES" />
      <h2>Log Search On<br />Storage You Own</h2>
    </div>

    <div class="caps-grid">
      {#each capabilities as cap, i}
        <div class="caps-cell" use:reveal={{ delay: i * 70 }}>
          <div class="mono faint caps-kicker">{cap.num} / {cap.kicker}</div>
          <h3 class="caps-name">{cap.name}</h3>
          <p class="muted caps-body">{cap.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .caps-head {
    padding: 96px 32px 48px;
  }
  .caps-head h2 {
    margin-top: 20px;
  }
  .caps-kicker {
    font-size: 11px;
    letter-spacing: 0.12em;
  }
  .caps-name {
    margin-top: 18px;
    font-size: 30px;
  }
  .caps-body {
    margin-top: 14px;
    font-size: 13px;
    line-height: 1.6;
  }
</style>
