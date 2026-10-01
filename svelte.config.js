import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],
  kit: {
    adapter: adapter({
      fallback: "404.html",
    }),
    // allow up to 150kb of style to be inlined with the HTML
    // Faster FCP (First Contentful Paint) by reducing the number of requests
    inlineStyleThreshold: 150000,
  },
  // mdsvex must run first so .md compiles to Svelte before vitePreprocess.
  preprocess: [mdsvex({ extensions: [".md"] }), vitePreprocess()],
};

export default config;
