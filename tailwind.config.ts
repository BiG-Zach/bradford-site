import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { 900: "#0a1420", onGlass: "#07111b" },
        surface: { base: "#f7f9fb", glass: "rgba(255,255,255,0.18)", glassLine: "rgba(255,255,255,0.32)" },
        brand: {
          jade: { 500: "#12bfae", 600: "#0ea99d" }, // OKLCH primary + hover
          sky: { 500: "#2aa8ff", 600: "#1989ee" },  // Accent + focus ring
          opal: { 300: "#b8f3e6" },
          cyan: { 300: "#93e6ff" },
          success: { 500: "#22c98d" },
          warning: { 500: "#f4d164" },
          danger: { 500: "#e0523c" }
        },
      },
      backgroundImage: {
        "aurora-sweep": "linear-gradient(135deg, #12bfae 0%, #2aa8ff 55%, #1989ee 100%)",
        "triple-scrim":
          "linear-gradient(180deg, rgba(7,17,27,0.70) 0%, rgba(7,17,27,0.35) 28%, rgba(7,17,27,0.00) 46%), linear-gradient(180deg, rgba(7,17,27,0.00) 55%, rgba(7,17,27,0.35) 78%, rgba(7,17,27,0.70) 100%), radial-gradient(1200px 600px at 60% 20%, rgba(42,168,255,0.18), rgba(42,168,255,0) 60%)",
      },
      boxShadow: {
        glass: "0 1px 0 0 rgba(255,255,255,0.26) inset, 0 10px 36px rgba(25,137,238,0.18)",
        xlsoft: "0 25px 50px -12px rgba(0,0,0,0.25)",
      },
      backdropBlur: { xs: "2px" },
      keyframes: {
        ticker: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: { ticker: "ticker 24s linear infinite" },
      transitionTimingFunction: { "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)" },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        ".text-nuclear": {
          textShadow:
            "0 1px 0 rgba(255,255,255,0.7), 0 2px 6px rgba(0,0,0,0.45), 0 0 24px rgba(42,168,255,0.35)",
        },
      });
    },
  ],
};
export default config;