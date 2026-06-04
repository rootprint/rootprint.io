// Blog post discovery. Posts are markdown files in src/posts/*.md.
// Filename (minus .md) is the slug. Frontmatter drives metadata + drafts.

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO "YYYY-MM-DD"
  updated?: string; // ISO "YYYY-MM-DD"; falls back to `date` for dateModified
  published: boolean;
  tags?: string[];
  cover?: string; // optional path under /static, used for the OG image
}

type MdModule = {
  metadata: Omit<PostMeta, "slug">;
  default: unknown; // compiled Svelte component (wrapped by BlogPost layout)
};

// Eager: read frontmatter of every post for the list page.
const eager = import.meta.glob<MdModule>("/src/posts/*.md", { eager: true });
// Lazy: code-split per-post component, loaded on demand by the [slug] route.
const lazy = import.meta.glob<MdModule>("/src/posts/*.md");

const slugOf = (path: string): string =>
  path.split("/").pop()!.replace(/\.md$/, "");

/** Published posts, newest first. */
export const posts: PostMeta[] = Object.entries(eager)
  .map(([path, mod]) => ({ slug: slugOf(path), ...mod.metadata }))
  .filter((p) => p.published)
  .sort((a, b) => +new Date(b.date) - +new Date(a.date));

/** Slugs for the [slug] EntryGenerator + sitemap (published only). */
export const postSlugs: string[] = posts.map((p) => p.slug);

/** Load a single compiled post component + its metadata by slug. */
export async function loadPostComponent(
  slug: string,
): Promise<MdModule | null> {
  const hit = Object.entries(lazy).find(([path]) => slugOf(path) === slug);
  return hit ? await hit[1]() : null;
}
