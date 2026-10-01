import { error } from "@sveltejs/kit";
import { comparisonLinks } from "$lib/data/comparison-links";
import { comparisons, rootprintFeatures } from "$lib/data/compare";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const prerender = true;

export const entries: EntryGenerator = () =>
  comparisonLinks.map(({ slug }) => ({ slug }));

export const load: PageServerLoad = ({ params }) => {
  const link = comparisonLinks.find(({ slug }) => slug === params.slug);
  if (!link) error(404, "Comparison not found");
  const comparison = comparisons[link.slug];

  return {
    comparison: { ...link, ...comparison },
    comparisons: comparisonLinks,
    rows: Object.entries(comparison.features).map(([label, competitor]) => ({
      label,
      rootprint: rootprintFeatures[label as keyof typeof rootprintFeatures],
      competitor,
    })),
  };
};
