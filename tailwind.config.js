/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,tsx}",
    "./node_modules/@overreact/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      arcade: ["Arcade", "sans-serif"],
    },
  },
  plugins: [],
}

