# Architecture Pipeline Animation — Design

**Date:** 2026-05-31
**Status:** Approved for planning

## Problem

The right column of the ARCHITECTURE section (`Architecture.svelte`) renders the
ingest pipeline as a plain static list of five numbered rows. It communicates the
steps but feels inert — there is no sense that telemetry actually moves through the
system. We want to make it feel alive without turning it into a noisy, perpetually
animating distraction.

## Scope

In scope: the visual treatment and animation of the `.arch-pipeline` block (the
five pipeline nodes and the connectors between them). The left column (eyebrow,
heading, intro paragraph) and the `.why-grid` value cards below are unchanged. The
pipeline content (`pipeline` array in `src/lib/data/home.ts`) is unchanged.

## Chosen direction

A **single "tracer" packet with progressive fill**, played **once when the section
scrolls into view**:

- **Resting state (before scroll-in):** the pipeline renders dim — node chips use a
  neutral/grey fill with faint text, connectors are hairline. Reads as "inactive,
  waiting."
- **Animation:** a glowing green packet hops connector-to-connector in sequence,
  node 01 → node 05. As it reaches each node, that node fills solid brand-green and
  the connector behind it fills green too — and stays lit. By the time the packet
  lands on S3, the entire path glows green.
- **Timing:** ≈0.4s per node, staggered by node index; total runtime ≈2.4s.
- **Final state:** fully-lit green pipeline, at rest. No perpetual motion.
- **Accessibility:** under `prefers-reduced-motion: reduce`, the pipeline renders in
  its final fully-lit state immediately, with no animation.

Directions considered and rejected during brainstorming: an architecture-schematic
diagram (boxes/cylinder/edge labels) and a sequential-spotlight walkthrough were set
aside in favor of the living data-flow concept. Within data-flow, a continuous
"steady stream" of dots and a "burst on view" were rejected in favor of the single
tracer for its calmer, storytelling read. A "highlight pulse" node reaction was
rejected in favor of "progressive fill" for the stronger "the log safely landed"
payoff. Continuous looping triggers were rejected in favor of play-once-on-scroll-in.

## Implementation plan

### 1. `src/lib/actions/inView.ts` (new)

A small Svelte action that adds a class to a node once it crosses an
IntersectionObserver threshold, then unobserves it. Mirrors the existing
`reveal.ts` pattern but toggles a class instead of mutating inline styles, so CSS
owns the animation.

- Signature: `inView(node, { className = 'in-view', threshold = 0.3 })`.
- On first intersection: `node.classList.add(className)` and `observer.unobserve(node)`.
- Returns a `destroy()` that unobserves, matching `reveal.ts`.

### 2. `src/lib/components/home/Architecture.svelte`

- Apply `use:inView` to the `.arch-pipeline` container.
- Give each `.arch-row` and `.arch-arrow` a `--i` index custom property via
  `style="--i:{i}"` so CSS can stagger by position.
- No data changes — the `pipeline` array stays as-is.

### 3. `src/app.css` (alongside existing `.arch-*` rules, ~lines 638–672)

- **Resting state:** restyle `.arch-num` to a neutral/dim fill (e.g. `--base-300`
  background, `--base-content-faint` text), dim the row label, and render
  `.arch-arrow` as a hairline.
- **Lit state:** gate transitions on `.arch-pipeline.in-view` with
  `transition-delay: calc(var(--i) * 0.4s)`. Node chips transition to brand-green
  (`--primary` background, `--primary-content` text); connectors fill green via a
  `transform: scaleY(...)` pseudo-element behind the line. The lit state is the
  transition's end state, so it persists (no reverse).
- **Traveling packet:** a green dot on each `.arch-arrow` that animates once
  (`animation-fill-mode: forwards`) with the same staggered delay, producing the
  hop-to-hop tracer read.
- **Reduced motion:** an `@media (prefers-reduced-motion: reduce)` block forces the
  final lit state with no transition or animation.

### Approach notes

- Sequential fill is driven by `--i` + `transition-delay` rather than one fragile
  full-column tracer element, so it is robust to row-height changes.
- Styles stay in `app.css` next to the current `.arch-*` rules rather than being
  scoped into the component, matching where those styles already live.
- No new dependencies — pure CSS animation plus one small IntersectionObserver action.

## Verification

Manual:

1. Load the marketing home page, scroll the ARCHITECTURE section into view, and
   confirm the staggered fill plays once and rests in the fully-lit state.
2. Enable the OS "reduce motion" setting and confirm the pipeline renders static and
   fully-lit with no animation.
