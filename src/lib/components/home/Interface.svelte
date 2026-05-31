<script lang="ts">
  import Eyebrow from "$lib/components/Eyebrow.svelte";
  import { reveal } from "$lib/actions/reveal";
  import { screens } from "$lib/data/home";
</script>

<!-- INTERFACE — screenshot grid -->
<div class="section-divider" aria-hidden="true"></div>
<section id="interface" class="anchor">
  <div class="rail-wrap">
    <div class="if-head">
      <Eyebrow label="INTERFACE" />
      <h2>Built To Read<br />Under Pressure</h2>
      <p class="muted if-intro">
        The UI is for reading logs during an incident — not building dashboards.
        Severity, service, fields, and raw messages stay visible.
      </p>
    </div>

    <div class="shot-grid">
      {#each screens as screen, i}
        <div class="shot-cell" use:reveal={{ delay: i * 70 }}>
          <div class="shot" class:shot-img={screen.img}>
            {#if screen.img}
              <img
                class="shot-screenshot"
                src={screen.img}
                alt={screen.alt}
                loading="lazy"
                decoding="async"
              />
            {:else}
              <span class="shot-tag">{screen.tag}</span>
            {/if}
          </div>
          <div class="shot-cap">
            <h3 class="if-title">{screen.title}</h3>
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
    margin-top: 24px;
    max-width: 46ch;
    font-size: 14px;
    line-height: 1.6;
  }
  .shot-img {
    background: var(--base-200);
    overflow: hidden;
    /* Mat each screenshot so adjacent tiles read as separate framed shots
       instead of one continuous image. */
    padding: 14px;
  }
  .shot-screenshot {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top left;
    border: 1px solid var(--hairline-strong);
    border-radius: 8px;
    background: var(--base-100);
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
