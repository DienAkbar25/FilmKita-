/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a3a52",
        secondary: "#0f2540",
        accent: "#3a7aaa",
        gold: "#d4af37",
      },
    },
  },
  plugins: [],
}
