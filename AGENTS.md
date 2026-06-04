# apps/landing — Agent Guide

## About

Marketing site served at rootprint.io. SvelteKit with `adapter-static` — fully prerendered to static HTML. The product UI and user docs live in separate projects.

Standalone repo using Bun, Prettier (defaults), and TS strict.

## Stack

- SvelteKit 2 + Svelte 5
- `@sveltejs/adapter-static`
- Tailwind v4 via `@tailwindcss/postcss`
- `@tailwindcss/typography`
- DaisyUI 5
- `super-sitemap`

## Run, Build, Check

```bash
bun run dev          # vite dev
bun run build        # static build
bun run preview      # preview the built site
bun run check        # svelte-kit sync && svelte-check
bun run format       # prettier write (with prettier-plugin-svelte)
bun run format_check # prettier check
```

## Source Layout

| Path                                                   | Purpose                                            |
| ------------------------------------------------------ | -------------------------------------------------- |
| `src/routes/`                                          | SvelteKit pages (landing, pricing, features, etc.) |
| `src/lib/`                                             | Components and helpers shared across pages         |
| `src/app.html`                                         | HTML shell                                         |
| `src/app.css`                                          | Tailwind entry; global styles                      |
| `src/lib/config.ts`                                    | Site-level config (canonical URL, nav, etc.)       |
| `static/`                                              | Public assets served at the root                   |
| `svelte.config.js`                                     | SvelteKit config (uses `adapter-static`)           |
| `vite.config.ts`, `postcss.config.js`, `tsconfig.json` | Tooling configs                                    |

## Content Scope

- Marketing copy, landing pages, pricing/feature pages.
- **Not** for product docs — those live in `apps/docs`. If you find yourself writing how-to-use-the-product content here, move it to `apps/docs`.

## Svelte 5 Patterns

- Use runes: `$props`, `$state`, `$derived`, `$effect`, `$bindable`.
- Keep component scripts typed (`<script lang="ts">`).
- Prefer small presentational components.
- For deeper SvelteKit and Svelte 5 guidance, use the Svelte MCP server if available.

## Styling

- Tailwind v4 utilities + DaisyUI 5 components.
- For inputs with adornments (icon, button, etc.) use DaisyUI's `<label class="input">` and `join` patterns rather than ad-hoc button-on-input layouts.
- Use `@tailwindcss/typography` for long-form prose where it fits.

## Tests

One source-assertion check in `tests/` (run with `bun test`) guards the Hero
markup and color palette against regressions. Beyond that, do manual visual
review via `bun run preview`.

## Conventions

- TS strict (extends `./.svelte-kit/tsconfig.json`).
- Prettier defaults — double quotes, 2-space indent, semicolons, trailing commas. No custom Prettier config; run `bun run format`.
- Prettier formats Svelte files automatically via `prettier-plugin-svelte`.
- Use SvelteKit aliases (`$lib`, `$app`, `$env`) over deep relative paths. Site config lives at `$lib/config`.
