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
        darkBlue: "#121824",
        pink: "#D4145F",

        darkBlueTransparent: "rgba(18, 24, 36, 0.85)",
        darkBlueLighter: "rgba(18, 24, 36, 0.2)",
        pinkTransparent: "rgba(212, 20, 95, 0.8)",
        pinkLighter: "rgba(212, 20, 95, 0.2)",

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
              color: "#D4145F",
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
              "background-color": "rgba(156, 163, 175,.1)",
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
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
