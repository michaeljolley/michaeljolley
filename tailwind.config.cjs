module.exports = {
	content: [
		'./public/**/*.html',
		'./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}',
	],
	theme: {
		extend: {
			fontFamily: {
				cairo: ['Cairo', 'sans-serif'],
				fira: ['Fira Code', 'sans-serif'],
				raleway: ['Raleway', 'sans-serif'],
			},
			colors: {
				darkGray: '#1A1A1C',
				lightGray: '#EAEEF4',
				purple: '#8958F2',
				teal: '#0AC2C2',
				transparentGray: 'rgba(255, 255, 255, .05)',
				transparentWhite: 'rgba(255, 255, 255, .3)',

				darkGreen: '#011B2B',
				stripe: 'rgba(137, 88, 242, .05)',

				brand: {
					discord: '#7289da',
					facebook: '#3B5998',
					github: '#181717',
					instagram: '#bc2a8d',
					linkedin: '#0077B5',
					patreon: '#FF424D',
					reddit: '#ff4500',
					rss: '#FFA500',
					twitch: '#6441A4',
					twitter: '#1da1f2',
					youtube: '#e52d27',
				},
			},
		},
	},
	variants: {
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
