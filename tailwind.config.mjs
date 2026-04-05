/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        fig: "#2D1B4E",
        terra: "#E8622A",
        blush: "#F5C5A3",
        sand: "#FAF7F2"
      }
    },
  },
  plugins: [],
};