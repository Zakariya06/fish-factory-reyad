import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FBF9F4",
        ivory: "#F4EFE5",
        ink: "#0B2528",
        sea: {
          50: "#EEF5F3",
          100: "#D8E9E5",
          200: "#B2D3CC",
          300: "#83B7AD",
          400: "#55988D",
          500: "#357A6F",
          600: "#25645A",
          700: "#1C5049",
          800: "#153E39",
          900: "#0B2528",
        },
        gold: {
          light: "#E8DCC2",
          DEFAULT: "#C3A468",
          dark: "#9B7D45",
        },
        coral: "#D9896A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 70px -28px rgba(11, 37, 40, 0.22)",
        lift: "0 36px 90px -36px rgba(11, 37, 40, 0.36)",
        glow: "0 0 0 1px rgba(195, 164, 104, 0.35), 0 24px 70px -24px rgba(195, 164, 104, 0.45)",
        insetline: "inset 0 1px 0 rgba(255, 255, 255, 0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(3deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-22px) rotate(-4deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "70%": { transform: "scale(1.45)", opacity: "0" },
          "100%": { transform: "scale(1.45)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float-slow 11s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        shimmer: "shimmer 4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
