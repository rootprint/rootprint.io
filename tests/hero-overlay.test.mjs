import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('hero uses the R field hover effect without corner crosshairs', async () => {
	const hero = await readFile(new URL('../src/lib/components/home/Hero.svelte', import.meta.url), 'utf8');

	assert.match(hero, /use:barField/);
	assert.match(hero, /class="bar-field"/);
	assert.match(hero, /class="bar-layer bar-base"/);
	assert.match(hero, /class="bar-layer bar-hi"/);
	assert.doesNotMatch(hero, /\bbp-corners\b/);
});

test('hero R field stays consistent across the whole section', async () => {
	const css = await readFile(new URL('../src/app.css', import.meta.url), 'utf8');

	assert.doesNotMatch(css, /\.bar-field\s*\{[^}]*mask-image:/s);
	assert.doesNotMatch(css, /\.bar-field\s*\{[^}]*-webkit-mask-image:/s);
});

test('site uses a cold gray base palette instead of warm paper tones', async () => {
	const css = await readFile(new URL('../src/app.css', import.meta.url), 'utf8');

	assert.match(css, /--color-base-100:\s*oklch\(97\.2% 0\.004 255\)/);
	assert.match(css, /--base-100:\s*oklch\(97\.2% 0\.004 255\)/);
	assert.match(css, /--hairline:\s*oklch\(20% 0\.012 255 \/ 0\.12\)/);
	assert.doesNotMatch(css, /warm paper/);
});
