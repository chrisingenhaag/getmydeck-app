import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
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
