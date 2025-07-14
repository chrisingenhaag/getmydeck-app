module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('daisyui')],
	daisyui: {
		themes: [
			{
				getmydeck: {
					primary: '#0C4A6E',
					secondary: '#2563EB',
					accent: '#37CDBE',
					neutral: '#3D4451',
					'base-100': '#FFFFFF',
					info: '#3ABFF8',
					success: '#36D399',
					warning: '#FBBD23',
					error: '#F87272'
				}
			}
		]
	}
};
