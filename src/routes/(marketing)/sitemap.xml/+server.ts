import type { RequestHandler } from "@sveltejs/kit";
import * as sitemap from "super-sitemap";
import { WebsiteBaseUrl } from "$lib/config";
import { compareData } from "$lib/compare";
import { postSlugs } from "$lib/posts";

export const prerender = true;

export const GET: RequestHandler = async () => {
  return await sitemap.response({
    origin: WebsiteBaseUrl,
    excludeRoutePatterns: [],
    paramValues: {
      "/compare/[slug]": Object.keys(compareData),
      "/blog/[slug]": postSlugs,
    },
  });
};
