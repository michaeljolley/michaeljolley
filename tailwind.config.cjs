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
				darkestGreen: '#02111B',
				darketGreenOpaque: {
					'40': 'rgba(2, 17, 27, .4)',
					'60': 'rgba(2, 17, 27, .6)',
					'80': 'rgba(2, 17, 27, .8)'
				} ,
				darkGreen: '#011B2B',
				meadow: '#18CDB9',
				stripe: 'rgba(25, 52, 70, .5)',
				neonYellow: '#E2FD37',

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
