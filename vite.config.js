import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['chart.js']
	},
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:3001'
			}
		}
	}

};

export default config;