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
			typography: {
				DEFAULT: {
					css: {
						a: {
							color: "#BDFF00",
							"text-decoration": "underline",
						},
						h1: {
							"font-family": "Work Sans",
						},
						h2: {
							"font-family": "Work Sans",
						},
						h3: {
							"font-family": "Work Sans",
						},
						h4: {
							"font-family": "Work Sans",
						},
						h5: {
							"font-family": "Work Sans",
						},
						h6: {
							"font-family": "Work Sans",
						},
						pre: {
							"max-height": "32rem"
						},
						"p code": {
							"background-color": "rgba(156, 163, 175,.3)",
							"padding": "0 0.2rem",
							"&:before": {
								content: "none"
							},
							"&:after": {
								content: "none"
							}
						},
						"blockquote": {
							"border": "solid 1px #BDFF00",
							"background-color": "linear-gradient(to bottom, rgba(143, 255, 0, 1) rgba(143, 255, 0, .2)",
							"padding": "0.2rem 0.4rem",
							"p": {
								"&:before": {
									content: "none"
								},
								"&:after": {
									content: "none"
								}
							}
						}
					}
				}
			}
		},
	},
	plugins: [require("@tailwindcss/typography")],
}
