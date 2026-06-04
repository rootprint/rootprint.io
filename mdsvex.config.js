import path from "path";
import { fileURLToPath } from "url";
import { defineMDSveXConfig as defineConfig } from "mdsvex";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = defineConfig({
  extensions: [".md"],
  // mdsvex both fs.readFileSync()s this path AND injects it verbatim as the
  // layout import into each compiled .md module. A relative "./src/..." path
  // breaks one or the other (cwd vs. the post's directory), so use an absolute
  // path — it resolves correctly for both the fs read and Vite's import graph.
  layout: {
    _: path.join(__dirname, "src/lib/components/blog/BlogPost.svelte"),
  },
});

export default config;
