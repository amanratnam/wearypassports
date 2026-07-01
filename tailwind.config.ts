import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Manrope", "system-ui", "sans-serif"],
        display: ["Fraunces", "serif"],
      },
      colors: {
        paper: {
          DEFAULT: "#FAF9F5",
          deep: "#F3F0E7",
          shadow: "#EAE6D9",
        },
        ink: "#23291F",
        forest: {
          900: "#12281C",
          800: "#1F4D36",
          700: "#335C45",
          500: "#5C8A5B",
          300: "#9DBE8F",
        },
        sun: "#E8B23A",
        terracotta: "#C56B4A",
        river: "#5B8FA3",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(35,41,31,0.05), 0 2px 8px rgba(35,41,31,0.04)",
        "soft-md": "0 4px 14px rgba(35,41,31,0.07), 0 12px 32px rgba(35,41,31,0.06)",
        "soft-lg": "0 10px 30px rgba(35,41,31,0.10), 0 24px 60px rgba(35,41,31,0.08)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
