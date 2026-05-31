/** Adds `className` to the node the first time it scrolls into view, then stops
 *  observing. CSS keys the pipeline fill animation off this class. */
export function inView(
  node: HTMLElement,
  options?: { className?: string; threshold?: number },
) {
  const className = options?.className ?? "in-view";
  const threshold = options?.threshold ?? 0.3;

  // Respect the user's motion preference: land on the final state immediately
  // without observing for an animated reveal.
  if (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  ) {
    node.classList.add(className);
    return {};
  }

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
