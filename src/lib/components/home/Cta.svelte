<script lang="ts">
  import { demoUrl, docsUrl, githubUrl } from "$lib/links";
  import GithubIcon from "$lib/components/GithubIcon.svelte";
</script>

<section class="section">
  <div class="wrap" style="text-align: center;">
    <h2>Run it on your own terms</h2>
    <p class="muted" style="margin-top: 12px;">
      One container and your S3 bucket, running in ten minutes.
    </p>
    <div
      style="margin-top: 24px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;"
    >
      <a
        href={demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-primary btn-lift desktop-only"
      >
        Try the live demo
      </a>
      <a
        href={docsUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-ghost"
      >
        Get Started
      </a>
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-ghost"
      >
        <GithubIcon />
        Star on GitHub
      </a>
    </div>
  </div>
</section>
