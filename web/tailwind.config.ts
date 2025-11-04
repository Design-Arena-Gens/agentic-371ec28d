import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#080808",
        surface: "#111111",
        panel: "#191919",
        accent: "#ff6b35",
        accentMuted: "#ff915f",
        text: {
          DEFAULT: "#f5f5f5",
          muted: "#a1a1aa",
          subtle: "#6b7280",
        },
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1.25rem",
      },
      boxShadow: {
        panel: "0 20px 60px -30px rgba(0,0,0,0.8)",
        glow: "0 0 25px rgba(255, 107, 53, 0.3)",
      },
      backgroundImage: {
        "noise-light":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
        "glow-orange":
          "radial-gradient(circle at top, rgba(255,107,53,0.08), transparent 55%)",
      },
    },
  },
  plugins: [],
};
export default config;
