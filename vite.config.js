import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			// Consult https://github.com/sveltejs/svelte-preprocess
			// for more information about preprocessors
			preprocess: [vitePreprocess()],
			adapter: adapter()
		})
	],
	ssr: {
		noExternal: ['chart.js']
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		host: '127.0.0.1'
	}
});
