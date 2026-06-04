<script lang="ts">
  // mdsvex layout: frontmatter arrives as props, the post body as `children`.
  interface Props {
    title?: string;
    description?: string;
    date?: string;
    tags?: string[];
    cover?: string;
    published?: boolean;
    children?: import("svelte").Snippet;
  }

  let { title, date, tags = [], children }: Props = $props();

  const formatted = $derived(
    date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "",
  );
</script>

<article class="wrap" style="padding-top:48px;padding-bottom:80px;">
  <header class="hairline-b" style="padding-bottom:24px;">
    <p class="eyebrow" style="margin-bottom:14px;">
      <span class="bracket">[</span> POST <span class="bracket">]</span>
    </p>
    <h1 style="margin:0;">{title}</h1>
    <p class="mono faint" style="font-size:12px;margin-top:14px;">
      {formatted}{#if tags.length}{" · " + tags.join(" · ")}{/if}
    </p>
  </header>

  <!-- Post matches the full site width (1320px wrap) like every other page. -->
  <div class="prose" style="margin-top:36px;max-width:none;">
    {@render children?.()}
  </div>
</article>
