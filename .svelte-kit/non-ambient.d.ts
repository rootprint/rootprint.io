
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/(marketing)" | "/" | "/(marketing)/compare" | "/(marketing)/compare/[slug]" | "/(marketing)/privacy" | "/(marketing)/sitemap.xml";
		RouteParams(): {
			"/(marketing)/compare/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/(marketing)": { slug?: string | undefined };
			"/": { slug?: string | undefined };
			"/(marketing)/compare": { slug?: string | undefined };
			"/(marketing)/compare/[slug]": { slug: string };
			"/(marketing)/privacy": Record<string, never>;
			"/(marketing)/sitemap.xml": Record<string, never>
		};
		Pathname(): "/" | `/compare/${string}` & {} | `/compare/${string}/` & {} | "/privacy/" | "/sitemap.xml";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/android-chrome-192x192.png" | "/android-chrome-512x512.png" | "/apple-touch-icon.png" | "/favicon-16x16.png" | "/favicon-32x32.png" | "/favicon.ico" | "/fonts/geist-mono-variable.woff2" | "/fonts/geist-sans-variable.woff2" | "/images/home-image.png" | "/logo.png" | "/robots.txt" | "/site.webmanifest" | string & {};
	}
}