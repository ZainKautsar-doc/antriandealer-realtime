/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#e4002b",
          600: "#c10025",
          700: "#9f001f",
          800: "#82001a",
          900: "#6e0018",
        },
      },
      boxShadow: {
        soft: "0 18px 60px -28px rgba(15, 23, 42, 0.35)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(228, 0, 43, 0.1), transparent 35%), radial-gradient(circle at bottom right, rgba(228, 0, 43, 0.05), transparent 30%)",
      },
    },
  },
  plugins: [],
};
