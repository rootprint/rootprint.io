/**
 * Hero "cursor-lit dashed bar field" effect.
 *
 * Attach to the section host. It tracks the pointer (exposed as `--mx`/`--my`
 * CSS custom properties used by the highlight mask) and fills the inner
 * `.bar-layer` nodes with a dashed character grid sized to the field.
 */
export function barField(host: HTMLElement) {
  const field = host.querySelector<HTMLElement>(".bar-field");
  if (!field) return;
  const fieldEl = field;

  const layers = fieldEl.querySelectorAll<HTMLElement>(".bar-layer");
  const LINE_HEIGHT = 8;

  function fill() {
    const cols = Math.ceil(fieldEl.clientWidth / 5) + 8;
    const rows = Math.ceil(fieldEl.clientHeight / LINE_HEIGHT) + 8;
    const filled = "R".repeat(cols);
    const blank = " ".repeat(cols);
    const lines: string[] = [];

    for (let r = 0; r < rows; r++) {
      lines.push(r % 2 === 0 ? filled : blank);
    }

    const text = lines.join("\n");
    layers.forEach((layer) => {
      layer.textContent = text;
    });
  }

  let rafId = 0;
  let pendingX = -600;
  let pendingY = -600;

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
    pendingX = -600;
    pendingY = -600;
    if (!rafId) rafId = requestAnimationFrame(applyPos);
  }

  host.addEventListener("mousemove", onMove);
  host.addEventListener("mouseleave", onLeave);

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
    ro.observe(fieldEl);
  }

  if (document.fonts?.ready) {
    document.fonts.ready.then(fill);
  }

  applyPos();
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
