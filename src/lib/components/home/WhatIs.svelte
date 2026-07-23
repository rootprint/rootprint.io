<script lang="ts">
  import { whatIs } from "$lib/data/home";
  import { docsUrl } from "$lib/links";
</script>

<section class="section anchor" id="capabilities">
  <div class="wrap">
    <h2>What is Rootprint?</h2>

    <ul class="check-list" style="margin-top: 28px; max-width: 72ch;">
      {#each whatIs as item}
        <li>
          <span>
            <strong>{item.title}</strong>
            <span class="muted"> — {item.body}</span>
          </span>
        </li>
      {/each}
    </ul>
    <a
      href={docsUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="btn btn-ghost"
      style="margin-top: 28px;"
    >
      Read docs →
    </a>
  </div>
</section>
