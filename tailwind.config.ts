import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        mango: "#FFC000",
        charcoal: "#1A1A1A",
        savings: "#2E7D32",
        canvas: "#F6F6F3",
      },
      boxShadow: {
        card: "0 12px 34px -22px rgba(26,26,26,0.38)",
        lift: "0 18px 38px -18px rgba(26,26,26,0.32)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.08)", opacity: "0.82" },
        },
      },
      animation: {
        rise: "rise .45s ease-out both",
        "pulse-soft": "pulseSoft 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
