/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f1f7ff",
          100: "#dcecff",
          200: "#bfdcff",
          300: "#8fc4ff",
          400: "#58a3ff",
          500: "#2f80ed",
          600: "#1f67d0",
          700: "#1b53a9",
          800: "#1d4788",
          900: "#1d3c70",
        },
      },
      boxShadow: {
        soft: "0 18px 60px -28px rgba(15, 23, 42, 0.35)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(47, 128, 237, 0.24), transparent 35%), radial-gradient(circle at bottom right, rgba(14, 165, 233, 0.18), transparent 30%)",
      },
    },
  },
  plugins: [],
};
