import { error } from "@sveltejs/kit";
import { bodyOf, pages, releases } from "$lib/releases";
import type { EntryGenerator, PageLoad } from "./$types";

export const entries: EntryGenerator = () =>
  pages.map(({ version }) => ({ version }));

// Universal load: a server load can't pass the mdsvex component to the page.
export const load: PageLoad = async ({ params }) => {
  const index = pages.findIndex(({ version }) => version === params.version);
  if (index === -1) error(404, "Release not found");
  const release = pages[index];

  return {
    release,
    body: await bodyOf(release.version),
    newer: pages[index - 1],
    older: pages[index + 1],
    previousVersion: releases[releases.indexOf(release) + 1]?.version,
  };
};
