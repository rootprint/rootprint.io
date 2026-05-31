<script lang="ts">
  import { reveal } from "$lib/actions/reveal";
  import { barField } from "$lib/actions/barField";
  import { docsUrl, githubUrl } from "$lib/links";
</script>

<!-- HERO — schematic / cursor-lit bar field -->
<section class="wrap bp-corners hero" use:barField>
  <div class="bar-field" aria-hidden="true">
    <div class="bar-layer bar-base"></div>
    <div class="bar-layer bar-hi"></div>
  </div>

  <div class="hero-copy">
    <p class="eyebrow">
      <span class="dot"></span>SELF-HOSTED · OPENTELEMETRY · APACHE-2.0
    </p>
    <h1 class="display-serif hero-title">
      Own Your<br /><span class="grad-text">Log Footprint</span>
    </h1>
    <p class="muted hero-lede">
      Logs carry the shape of your systems. Rootprint keeps that operational
      fingerprint on infrastructure you control — fast search, OTLP-native,
      object-storage-backed, Apache-2.0-licensed.
    </p>
    <div class="hero-actions">
      <a href={docsUrl} class="btn btn-primary">
        Try Rootprint <span aria-hidden="true">→</span>
      </a>
      <a href={githubUrl} class="btn btn-ghost">View on GitHub</a>
    </div>
  </div>

  <!-- Product screenshot (placeholder) -->
  <div class="shot-frame hero-shot" use:reveal>
    <div class="shot-bar">
      <span class="shot-dots"><i></i><i></i><i></i></span>
    </div>
    <div class="shot" style="aspect-ratio:16/9;">
      <span class="shot-tag">App screenshot · 1600 × 900</span>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    padding-top: 48px;
    display: flex;
    flex-direction: column;
  }

  .hero-copy {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 36px 0;
  }

  .hero-title {
    margin-top: 18px;
    font-size: clamp(44px, 5.5vw, 76px);
  }

  .hero-lede {
    margin-top: 20px;
    max-width: 54ch;
    font-size: 15px;
    line-height: 1.6;
  }

  .hero-actions {
    display: flex;
    gap: 12px;
    margin-top: 28px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .hero-shot {
    position: relative;
    margin: 36px 0 56px;
  }
</style>
