/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				worksans: ["Work Sans", "sans-serif"],
				fira: ["Fira Code", "sans-serif"],
				raleway: ["Raleway", "sans-serif"],
			},
			colors: {
				neon: "#BDFF00",
				neonTransparent: "rgba(189, 255, 0, 0.7)",
				darkGray: "#1A1A1C",

				brand: {
					discord: "#7289da",
					facebook: "#3B5998",
					github: "#181717",
					instagram: "#bc2a8d",
					linkedin: "#0077B5",
					patreon: "#FF424D",
					reddit: "#ff4500",
					rss: "#FFA500",
					twitch: "#6441A4",
					twitter: "#1da1f2",
					youtube: "#e52d27",
				},
			},
		}
	},
	plugins: []
};