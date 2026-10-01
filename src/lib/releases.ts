import type { Component } from "svelte";
import { githubUrl } from "$lib/links";

interface Release {
  version: string;
  date: string;
  title?: string;
}

interface ReleasePage extends Release {
  title: string;
  summary: string;
}

// The ?meta query gives these eager imports their own module IDs, so Vite can
// drop the bodies here and split each one into its own lazy chunk below.
const metadata = import.meta.glob<Omit<ReleasePage, "version"> | undefined>(
  "/src/content/releases/*.md",
  { eager: true, import: "metadata", query: "?meta" },
);
const bodies = import.meta.glob<Component>("/src/content/releases/*.md", {
  import: "default",
});

const newestFirst = (a: Release, b: Release) =>
  b.version.localeCompare(a.version, undefined, { numeric: true });

export const pages: ReleasePage[] = Object.entries(metadata)
  .map(([path, meta]) => {
    const version = path.slice(path.lastIndexOf("/") + 1, -".md".length);
    if (
      !/^\d+\.\d+\.\d+$/.test(version) ||
      !meta?.title ||
      !meta.summary ||
      !/^\d{4}-\d{2}-\d{2}$/.test(String(meta.date))
    ) {
      throw new Error(
        `${path}: needs an X.Y.Z.md filename and frontmatter with title, summary, and a quoted "YYYY-MM-DD" date`,
      );
    }
    return { version, ...meta };
  })
  .sort(newestFirst);

// 0.1.x shipped before the changelog was kept, so these rows link to GitHub tags.
const tagOnly: Release[] = [
  { version: "0.1.11", date: "2026-04-13" },
  { version: "0.1.10", date: "2026-04-07" },
  { version: "0.1.9", date: "2026-04-07" },
  { version: "0.1.8", date: "2026-03-28" },
  { version: "0.1.7", date: "2026-03-26" },
  { version: "0.1.6", date: "2026-03-26" },
  { version: "0.1.5", date: "2026-03-26" },
  { version: "0.1.4", date: "2026-03-25" },
  { version: "0.1.3", date: "2026-03-25" },
  { version: "0.1.2", date: "2026-03-24" },
  { version: "0.1.1", date: "2026-03-24" },
  { version: "0.1.0", date: "2026-03-24" },
];

export const releases: Release[] = [...pages, ...tagOnly].sort(newestFirst);
export const latest = releases[0];

export const tagUrl = (version: string) =>
  `${githubUrl}/releases/tag/v${version}`;

export const bodyOf = (version: string) =>
  bodies[`/src/content/releases/${version}.md`]();
