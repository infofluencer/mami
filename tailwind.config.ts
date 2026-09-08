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
        ivory: {
          DEFAULT: "#F3EDDB",
          light: "#FAF7F0",
          dark: "#E8DFC8",
        },
        gold: {
          DEFAULT: "#B08D4C",
          dark: "#A67C34",
          light: "#D4B896",
          hairline: "rgba(176, 141, 76, 0.35)",
        },
        bordo: {
          DEFAULT: "#7B1E23",
          dark: "#5C1519",
          light: "#9A2E35",
        },
        sage: {
          DEFAULT: "#9CAF88",
          light: "#C5D4BC",
          muted: "#E4EBDF",
        },
        blush: {
          DEFAULT: "#E8D5D0",
          light: "#F5E8E4",
        },
        ink: {
          DEFAULT: "#5c4a3a",
          muted: "#6B5848",
          light: "#8A7666",
        },
      },
      fontFamily: {
        script: ["var(--font-great-vibes)", "cursive"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      boxShadow: {
        envelope: "0 12px 40px rgba(61, 53, 48, 0.18), 0 4px 12px rgba(61, 53, 48, 0.08)",
        seal: "0 4px 16px rgba(123, 30, 35, 0.45), inset 0 2px 4px rgba(255,255,255,0.15)",
        card: "0 8px 32px rgba(61, 53, 48, 0.1), 0 2px 8px rgba(61, 53, 48, 0.06)",
        glow: "0 0 24px rgba(212, 184, 150, 0.5)",
      },
      animation: {
        breathe: "breathe 4s ease-in-out infinite",
        "seal-glow": "seal-glow 3s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2.5s ease-in-out infinite",
        "chevron-bounce": "chevron-bounce 2s ease-in-out infinite",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
        "seal-glow": {
          "0%, 100%": { boxShadow: "0 4px 16px rgba(123, 30, 35, 0.45), 0 0 0 0 rgba(212, 184, 150, 0)" },
          "50%": { boxShadow: "0 4px 20px rgba(123, 30, 35, 0.55), 0 0 20px 4px rgba(212, 184, 150, 0.25)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        "chevron-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
      maxWidth: {
        invite: "430px",
      },
    },
  },
  plugins: [],
};

export default config;
