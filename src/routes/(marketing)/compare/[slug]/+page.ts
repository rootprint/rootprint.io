import { error } from "@sveltejs/kit";
import { compareData } from "$lib/compare";
import type { EntryGenerator, PageLoad } from "./$types";

export const prerender = true;

export const entries: EntryGenerator = () =>
  Object.keys(compareData).map((slug) => ({ slug }));

export const load: PageLoad = ({ params }) => {
  const competitor = compareData[params.slug];
  if (!competitor) error(404, "Comparison not found");

  return {
    competitor,
    all: Object.values(compareData).map((c) => ({
      slug: c.slug,
      navLabel: c.navLabel,
    })),
  };
};
