<script>
  import "../app.css";
  import { page } from "$app/state";
</script>

<div class="min-h-[100dvh] flex items-center justify-center px-6">
  <div class="text-center max-w-md">
    <p class="text-8xl font-bold text-base-300 tabular-nums">
      {page.status ?? "?"}
    </p>
    <h1 class="text-2xl font-semibold text-base-content mt-6">
      {#if page.status === 404}
        Page not found
      {:else}
        Something went wrong
      {/if}
    </h1>
    <p class="text-neutral mt-3 leading-relaxed">
      {page.error?.message ?? "An unexpected error occurred."}
    </p>
    <a
      href="/"
      class="btn btn-primary btn-lift mt-8"
    >
      Return home
    </a>
  </div>
</div>
