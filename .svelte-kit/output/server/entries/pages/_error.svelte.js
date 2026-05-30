import { X as escape_html } from "../../chunks/renderer.js";
import "clsx";
import { p as page } from "../../chunks/index.js";
function _error($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="min-h-[100dvh] flex items-center justify-center px-6"><div class="text-center max-w-md"><p class="text-8xl font-bold text-base-300 tabular-nums">${escape_html(page.status ?? "?")}</p> <h1 class="text-2xl font-semibold text-base-content mt-6">`);
    if (page.status === 404) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`Page not found`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`Something went wrong`);
    }
    $$renderer2.push(`<!--]--></h1> <p class="text-neutral mt-3 leading-relaxed">${escape_html(page.error?.message ?? "An unexpected error occurred.")}</p> <a href="/" class="inline-block bg-base-content text-base-100 px-6 py-2.5 rounded-lg text-sm font-medium btn-lift transition-[transform,box-shadow] duration-200 ease-out-custom mt-8">Return home</a></div></div>`);
  });
}
export {
  _error as default
};
