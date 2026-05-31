# Architecture Pipeline Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Animate the ARCHITECTURE section's pipeline so a green "tracer" packet hops node-to-node and progressively fills the path on scroll-in, resting fully lit.

**Architecture:** A tiny `inView` Svelte action adds an `in-view` class to the pipeline container once it crosses an IntersectionObserver threshold. All motion is pure CSS: nodes/connectors render dim at rest and transition to brand-green in sequence (staggered by a `--i` index custom property) when `in-view` is present. The lit state is the transition's end state, so it persists. A `prefers-reduced-motion` block forces the final lit state with no animation.

**Tech Stack:** SvelteKit (Svelte 5), TypeScript, plain CSS in `src/app.css`. No test framework is configured in this project; verification is `npm run check` (svelte-check) plus manual browser confirmation, per the spec's verification section.

**Project rule:** The repo owner does not auto-commit. The final commit step is OPTIONAL and must only be run with the owner's explicit approval — otherwise stop after verification and let them commit.

**Spec:** `docs/superpowers/specs/2026-05-31-architecture-pipeline-animation-design.md`

---

## File Structure

- **Create:** `src/lib/actions/inView.ts` — IntersectionObserver action that adds a class once on first intersection. One responsibility: "tell CSS when an element has entered the viewport." Mirrors the existing `src/lib/actions/reveal.ts` pattern.
- **Modify:** `src/lib/components/home/Architecture.svelte` — wire `use:inView` onto `.arch-pipeline`, add a `--i` index to each row/connector, and give the label its own class so CSS can dim/light it.
- **Modify:** `src/app.css` — replace the static `.arch-*` pipeline rules (~lines 638–672) with resting (dim) state, staggered lit state under `.arch-pipeline.in-view`, the travelling-packet keyframe, and a reduced-motion fallback.

Timing model (step = 0.4s):

| Element | `--i` | delay                        |
| ------- | ----- | ---------------------------- |
| row 0   | 0     | 0s                           |
| arrow 0 | 0     | 0.2s                         |
| row 1   | 1     | 0.4s                         |
| arrow 1 | 1     | 0.6s                         |
| row 2   | 2     | 0.8s                         |
| …       | …     | …                            |
| row 4   | 4     | 1.6s (+0.4s fill ≈ 2.0–2.4s) |

Rows use `calc(var(--i) * 0.4s)`; connectors use `calc(var(--i) * 0.4s + 0.2s)` so each link fills after its source node and before the next.

---

## Task 1: `inView` action

**Files:**

- Create: `src/lib/actions/inView.ts`

- [ ] **Step 1: Create the action**

Create `src/lib/actions/inView.ts` with the following exact contents. It mirrors `reveal.ts` but toggles a class instead of mutating inline styles, so CSS owns the animation. It fires once, then unobserves.

```ts
/** Adds `className` to the node the first time it scrolls into view, then stops
 *  observing. CSS keys the pipeline fill animation off this class. */
export function inView(
  node: HTMLElement,
  options?: { className?: string; threshold?: number },
) {
  const className = options?.className ?? "in-view";
  const threshold = options?.threshold ?? 0.3;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          node.classList.add(className);
          observer.unobserve(node);
        }
      }
    },
    { threshold },
  );

  observer.observe(node);

  return {
    destroy() {
      observer.unobserve(node);
    },
  };
}
```

- [ ] **Step 2: Type-check**

Run: `npm run check`
Expected: PASS — no svelte-check errors. (The file is not imported yet; this confirms it is well-typed on its own.)

---

## Task 2: Wire the action and index into the component

**Files:**

- Modify: `src/lib/components/home/Architecture.svelte`

- [ ] **Step 1: Import the action**

In the `<script lang="ts">` block of `src/lib/components/home/Architecture.svelte`, add the import next to the existing `reveal` import. After the change the imports read:

```svelte
<script lang="ts">
  import Eyebrow from "$lib/components/Eyebrow.svelte";
  import { reveal } from "$lib/actions/reveal";
  import { inView } from "$lib/actions/inView";
  import { pipeline, valueCards } from "$lib/data/home";
</script>
```

- [ ] **Step 2: Apply the action, index, and label class**

Replace the existing pipeline block:

```svelte
<div class="arch-pipeline">
  {#each pipeline as node, i}
    <div class="arch-row">
      <div class="arch-num mono">{node.num}</div>
      <div>{node.label}</div>
      <div class="mono faint arch-side">{node.side}</div>
    </div>
    {#if i < pipeline.length - 1}
      <div class="arch-arrow"></div>
    {/if}
  {/each}
</div>
```

with:

```svelte
<div class="arch-pipeline" use:inView>
  {#each pipeline as node, i}
    <div class="arch-row" style="--i:{i}">
      <div class="arch-num mono">{node.num}</div>
      <div class="arch-label">{node.label}</div>
      <div class="mono faint arch-side">{node.side}</div>
    </div>
    {#if i < pipeline.length - 1}
      <div class="arch-arrow" style="--i:{i}"></div>
    {/if}
  {/each}
</div>
```

Changes: `use:inView` on the container; `style="--i:{i}"` on each row and connector; the bare label `<div>` now carries `class="arch-label"`.

- [ ] **Step 3: Type-check**

Run: `npm run check`
Expected: PASS — no svelte-check errors.

---

## Task 3: Pipeline animation styles

**Files:**

- Modify: `src/app.css` (the `/* ── Architecture rows ── */` block, ~lines 638–672)

- [ ] **Step 1: Replace the pipeline CSS block**

In `src/app.css`, replace this exact block:

```css
/* ── Architecture rows ───────────────────────────────────────────────────── */
.arch-row {
  display: grid;
  grid-template-columns: 56px 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 18px 20px;
  border: 1px solid var(--hairline);
  background: var(--base-200);
  font-size: 16px;
  transition: background 0.15s ease;
}
.arch-row:hover {
  background: var(--base-100);
}
.arch-num {
  width: 40px;
  height: 40px;
  background: var(--primary);
  color: var(--primary-content);
  display: grid;
  place-items: center;
  font-size: 13px;
  font-weight: 600;
}
.arch-side {
  font-size: 11px;
  letter-spacing: 0.08em;
}
.arch-arrow {
  width: 1px;
  height: 10px;
  background: linear-gradient(180deg, var(--primary), transparent);
  margin: 0 0 0 40px;
}
```

with this block:

```css
/* ── Architecture rows ───────────────────────────────────────────────────── */
.arch-row {
  display: grid;
  grid-template-columns: 56px 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 18px 20px;
  border: 1px solid var(--hairline);
  background: var(--base-200);
  font-size: 16px;
  transition: background 0.15s ease;
}
.arch-row:hover {
  background: var(--base-100);
}

/* Resting (dim) state — pipeline waits, greyed out, until it scrolls into view. */
.arch-num {
  width: 40px;
  height: 40px;
  background: var(--base-300);
  color: var(--base-content-faint);
  display: grid;
  place-items: center;
  font-size: 13px;
  font-weight: 600;
  transition:
    background 0.4s ease,
    color 0.4s ease;
  transition-delay: calc(var(--i) * 0.4s);
}
.arch-label {
  color: var(--base-content-faint);
  transition: color 0.4s ease;
  transition-delay: calc(var(--i) * 0.4s);
}
.arch-side {
  font-size: 11px;
  letter-spacing: 0.08em;
}

/* Connector: hairline at rest; a green fill grows down behind it on activation,
   and a packet dot travels the gap. */
.arch-arrow {
  position: relative;
  width: 2px;
  height: 12px;
  background: var(--hairline);
  margin: 0 0 0 39px;
  overflow: visible;
}
.arch-arrow::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--primary);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.3s ease;
  transition-delay: calc(var(--i) * 0.4s + 0.2s);
}
.arch-arrow::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  width: 7px;
  height: 7px;
  margin-left: -3.5px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 8px var(--primary);
  opacity: 0;
}

/* Lit state — added once by the inView action when the pipeline enters view. */
.arch-pipeline.in-view .arch-num {
  background: var(--primary);
  color: var(--primary-content);
}
.arch-pipeline.in-view .arch-label {
  color: var(--base-content);
}
.arch-pipeline.in-view .arch-arrow::before {
  transform: scaleY(1);
}
.arch-pipeline.in-view .arch-arrow::after {
  animation: arch-packet 0.3s ease forwards;
  animation-delay: calc(var(--i) * 0.4s + 0.2s);
}
@keyframes arch-packet {
  0% {
    top: 0;
    opacity: 1;
  }
  100% {
    top: 12px;
    opacity: 0;
  }
}

/* Reduced motion: skip the animation, render the final fully-lit pipeline. */
@media (prefers-reduced-motion: reduce) {
  .arch-num,
  .arch-label,
  .arch-arrow::before {
    transition: none;
  }
  .arch-pipeline .arch-num {
    background: var(--primary);
    color: var(--primary-content);
  }
  .arch-pipeline .arch-label {
    color: var(--base-content);
  }
  .arch-pipeline .arch-arrow::before {
    transform: scaleY(1);
  }
  .arch-pipeline .arch-arrow::after {
    display: none;
  }
}
```

- [ ] **Step 2: Type-check and format-check**

Run: `npm run check && npm run format_check`
Expected: `check` PASSES with no errors. If `format_check` reports the touched files, run `npm run format` to fix, then re-run `npm run format_check` until it passes.

---

## Task 4: Manual verification

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Expected: Vite prints a local URL (e.g. `http://localhost:5173`).

- [ ] **Step 2: Verify the animation (normal motion)**

Open the home page, scroll the ARCHITECTURE section (`#developers`) into view. Confirm:

- Before it enters view the pipeline is dim/grey.
- On entry, nodes fill brand-green in sequence 01 → 05, each connector fills green just after its node, and a small glowing dot travels each connector.
- After ~2 seconds the whole path is solid green and stays lit; nothing keeps looping.

- [ ] **Step 3: Verify reduced-motion fallback**

Enable the OS "reduce motion" setting (GNOME: Settings → Accessibility → Reduce Animation; or DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce"), reload, and scroll to the section. Confirm the pipeline appears fully lit (all green) immediately with no staggered animation or travelling dot.

- [ ] **Step 4: Commit (OPTIONAL — only with the owner's explicit approval)**

Per the project rule, do not commit autonomously. If — and only if — the owner has approved committing, run:

```bash
git add src/lib/actions/inView.ts src/lib/components/home/Architecture.svelte src/app.css
git commit -m "feat: animate architecture pipeline with scroll-triggered tracer fill"
```

Otherwise, stop here and let the owner review and commit.

---

## Self-Review

**Spec coverage:**

- Resting dim state → Task 3 resting `.arch-num`/`.arch-label`/`.arch-arrow`. ✓
- Tracer packet hopping 01→05 → Task 3 `.arch-arrow::after` + `arch-packet` keyframe, staggered. ✓
- Progressive green fill of nodes + connectors that stays lit → Task 3 `.in-view` lit rules (transition end-state persists). ✓
- Plays once on scroll-in → Task 1 `inView` action (unobserves after first intersection), Task 2 `use:inView`. ✓
- ~0.4s/node, ~2.4s total → timing table + `calc(var(--i) * 0.4s)` delays. ✓
- Final fully-lit resting state → lit rules have no reverse; action never removes the class. ✓
- `prefers-reduced-motion` static fully-lit fallback → Task 3 media block. ✓

**Placeholder scan:** No TBD/TODO/"handle edge cases"/vague steps; every code step shows complete code and every command states its expected result. ✓

**Type/name consistency:** `inView` (export, import, `use:inView`) consistent across Tasks 1–2. Class `in-view` matches the action default and the `.arch-pipeline.in-view` selectors. `--i` set in Task 2 markup and consumed by every `calc()` in Task 3. `.arch-label` added in Task 2 markup and styled in Task 3. ✓
