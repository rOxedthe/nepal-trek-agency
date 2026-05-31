import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          900: "#1a2e1a",
          800: "#1f3d1f",
          700: "#2d5a2d",
          600: "#3a7a3a",
          500: "#4a9e4a",
        },
        amber: {
          600: "#c8852a",
          500: "#e09a38",
          400: "#f5b245",
          300: "#f9c96a",
        },
        sky: {
          100: "#e8f4fd",
          200: "#c5e3f8",
        },
        snow: "#f8f6f0",
        warm: "#faf7f2",
        earth: {
          900: "#2c1a0e",
          700: "#5c3d1e",
          400: "#9c6b3a",
        },
        stone: {
          100: "#f5f2ed",
          200: "#ece7df",
          500: "#8a7d6e",
          800: "#3d3530",
          900: "#1c1815",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        dm: ["var(--font-dm-serif)", "serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        lato: ["var(--font-lato)", "sans-serif"],
      },
      boxShadow: {
        trek: "0 18px 40px -18px rgba(26, 46, 26, 0.55)",
        "trek-lg": "0 30px 60px -24px rgba(26, 46, 26, 0.65)",
        glow: "0 0 0 1px rgba(245, 178, 69, 0.55), 0 18px 40px -16px rgba(200, 133, 42, 0.45)",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        "drift-down": {
          "0%": { transform: "translateY(-10%)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(110vh)", opacity: "0" },
        },
        "sway": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "soar": {
          "0%": { transform: "translateX(-10vw) translateY(0)" },
          "50%": { transform: "translateX(50vw) translateY(-24px)" },
          "100%": { transform: "translateX(110vw) translateY(8px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.6)", opacity: "0.5" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        "parallax-x": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-2.5%)" },
        },
        "shimmer": {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "drift-down": "drift-down linear infinite",
        sway: "sway 5s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        soar: "soar 26s linear infinite",
        "spin-slow": "spin-slow 60s linear infinite",
        "pulse-ring": "pulse-ring 4s ease-out infinite",
        "parallax-x": "parallax-x 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
