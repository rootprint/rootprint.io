import { error } from "@sveltejs/kit";
import { postSlugs, loadPostComponent } from "$lib/posts";
import type { EntryGenerator, PageLoad } from "./$types";

export const prerender = true;

export const entries: EntryGenerator = () =>
  postSlugs.map((slug) => ({ slug }));

export const load: PageLoad = async ({ params }) => {
  const mod = await loadPostComponent(params.slug);
  if (!mod) error(404, "Post not found");

  return {
    slug: params.slug,
    component: mod.default,
    meta: mod.metadata,
  };
};
