<script lang="ts">
  import { faq } from "$lib/data/home";
</script>

<section class="section anchor" id="faq">
  <div class="wrap">
    <h2>Frequently asked questions</h2>
    <div class="faq" style="margin-top: 28px; max-width: 760px;">
      {#each faq as item}
        <details>
          <summary>{item.q}</summary>
          <!-- eslint-disable-next-line svelte/no-at-html-tags — trusted local copy -->
          <p class="answer">{@html item.a}</p>
        </details>
      {/each}
    </div>
  </div>
</section>
