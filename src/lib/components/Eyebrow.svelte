<script lang="ts">
  /** Section label rendered in the bracketed `[ LABEL ]` mono style. */
  let { label }: { label: string } = $props();
</script>

<p class="eyebrow">
  <span class="bracket">[</span>
  {label}
  <span class="bracket">]</span>
</p>
