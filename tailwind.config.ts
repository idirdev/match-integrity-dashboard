import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: { DEFAULT: "#0a0a10", card: "#111118", hover: "#1a1a24" },
        border: { DEFAULT: "#1e1e2e" },
        integrity: { high: "#10b981", medium: "#f59e0b", low: "#ef4444", neutral: "#6b7280" },
      },
    },
  },
  plugins: [],
};

export default config;
