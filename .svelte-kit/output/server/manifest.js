export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["android-chrome-192x192.png","android-chrome-512x512.png","apple-touch-icon.png","favicon-16x16.png","favicon-32x32.png","favicon.ico","favicon.png","fonts/geist-mono-variable.woff2","fonts/geist-sans-variable.woff2","images/home-image.png","robots.txt","site.webmanifest"]),
	mimeTypes: {".png":"image/png",".woff2":"font/woff2",".txt":"text/plain",".webmanifest":"application/manifest+json"},
	_: {
		client: {start:"_app/immutable/entry/start.BSjSD7F1.js",app:"_app/immutable/entry/app.BOkMi64C.js",imports:["_app/immutable/entry/start.BSjSD7F1.js","_app/immutable/chunks/D2LCwVLv.js","_app/immutable/chunks/D6CaKOij.js","_app/immutable/chunks/OA8UcISh.js","_app/immutable/chunks/CJW1hZF5.js","_app/immutable/entry/app.BOkMi64C.js","_app/immutable/chunks/D6CaKOij.js","_app/immutable/chunks/Bwfyu_mA.js","_app/immutable/chunks/BqEM_q9Y.js","_app/immutable/chunks/CJW1hZF5.js","_app/immutable/chunks/DRJ8g9zm.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/","/sitemap.xml","/compare/datadog/","/compare/elastic/","/compare/loki/","/privacy/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
