/**
 * Hero "cursor-lit dashed bar field" effect.
 *
 * Attach to the section host. It tracks the pointer (exposed as `--mx`/`--my`
 * CSS custom properties used by the highlight mask) and fills the inner
 * `.bar-layer` nodes with a dashed character grid sized to the field.
 *
 * Expected markup inside the host:
 *   <div class="bar-field">
 *     <div class="bar-layer bar-base"></div>
 *     <div class="bar-layer bar-hi"></div>
 *   </div>
 */
export function barField(host: HTMLElement) {
  const field = host.querySelector<HTMLElement>(".bar-field");
  if (!field) return;
  const layers = field.querySelectorAll<HTMLElement>(".bar-layer");

  const LINE_HEIGHT = 8;

  function fill() {
    const cols = Math.ceil(field!.clientWidth / 5) + 8;
    const rows = Math.ceil(field!.clientHeight / LINE_HEIGHT) + 8;
    const filled = "R".repeat(cols);
    const blank = " ".repeat(cols);
    const lines: string[] = [];
    for (let r = 0; r < rows; r++) {
      lines.push(r % 2 === 0 ? filled : blank);
    }
    const text = lines.join("\n");
    layers.forEach((layer) => (layer.textContent = text));
  }

  // Pointer tracking, throttled to a single rAF per frame.
  let rafId = 0;
  let pendingX = 0;
  let pendingY = 0;

  function applyPos() {
    rafId = 0;
    host.style.setProperty("--mx", pendingX + "px");
    host.style.setProperty("--my", pendingY + "px");
  }

  function onMove(e: MouseEvent) {
    const rect = host.getBoundingClientRect();
    pendingX = e.clientX - rect.left;
    pendingY = e.clientY - rect.top;
    if (!rafId) rafId = requestAnimationFrame(applyPos);
  }

  function onLeave() {
    host.style.setProperty("--mx", "-600px");
    host.style.setProperty("--my", "-600px");
  }

  host.addEventListener("mousemove", onMove);
  host.addEventListener("mouseleave", onLeave);

  // Refill on resize (debounced) so the grid always covers the field.
  let resizeTimer: ReturnType<typeof setTimeout>;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fill, 120);
  }
  window.addEventListener("resize", onResize);

  let ro: ResizeObserver | undefined;
  if (typeof ResizeObserver !== "undefined") {
    ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(fill, 60);
    });
    ro.observe(field);
  }

  // Re-measure once webfonts settle, in case metrics shift the field size.
  if (document.fonts?.ready) {
    document.fonts.ready.then(fill);
  }

  fill();

  return {
    destroy() {
      host.removeEventListener("mousemove", onMove);
      host.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
      clearTimeout(resizeTimer);
      if (rafId) cancelAnimationFrame(rafId);
    },
  };
}
