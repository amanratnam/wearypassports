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
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      opacity: {
        "3": "0.03",
        "6": "0.06",
        "7": "0.07",
        "8": "0.08",
        "12": "0.12",
        "14": "0.14",
        "18": "0.18",
        "22": "0.22",
      },
      colors: {
        primary: "#111111",
        accent: "#2563EB",
        "accent-secondary": "#7C3AED",
        muted: "#F8FAFC",
        border: "#E5E7EB",
        "text-secondary": "#6B7280",
      },
      backgroundImage: {
        "gradient-blue-violet": "linear-gradient(135deg, #2563EB, #7C3AED)",
        "gradient-indigo-cyan": "linear-gradient(135deg, #4F46E5, #06B6D4)",
      },
      boxShadow: {
        "card": "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
        "hero": "0 20px 60px rgba(37,99,235,0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.6s ease forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
