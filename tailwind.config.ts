import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0e1726",
          light: "#16223a",
          soft: "#1c2b47",
        },
        charcoal: "#14161c",
        safety: {
          // Safety yellow — primary accent
          DEFAULT: "#ffcc00",
          dark: "#e6b800",
          light: "#ffd84d",
        },
        alert: "#e02424",
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "1120px",
      },
    },
  },
  plugins: [],
};

export default config;
