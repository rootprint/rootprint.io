<script module lang="ts">
  import { browser } from "$app/environment";
  import { githubUrl } from "$lib/links";

  // One request per page load, shared by every instance. Renders nothing until
  // it resolves, so a rate-limited or blocked request just hides the count.
  const repo = $state<{ stars: number | null }>({ stars: null });
  if (browser) {
    fetch(githubUrl.replace("github.com", "api.github.com/repos"))
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (typeof data?.stargazers_count === "number")
          repo.stars = data.stargazers_count;
      })
      .catch(() => {});
  }

  const compact = new Intl.NumberFormat("en", { notation: "compact" });
</script>

{#if repo.stars !== null}
  <span class="stars">
    <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"
      />
    </svg>
    {compact.format(repo.stars)}
  </span>
{/if}

<style>
  .stars {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-left: 2px;
    padding-left: 10px;
    border-left: 1px solid var(--hairline-strong);
    color: var(--base-content-muted);
    font-variant-numeric: tabular-nums;
  }

  svg {
    fill: currentColor;
  }
</style>
