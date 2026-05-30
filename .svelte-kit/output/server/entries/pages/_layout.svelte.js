import "clsx";
import { n as navigating } from "../../chunks/index.js";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    if (navigating.to) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="fixed w-full top-0 right-0 left-0 h-1 z-50 bg-primary"></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    children?.($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _layout as default
};
