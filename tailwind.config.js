/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
    "./views/login/**/*.{js,jsx,ts,tsx}",
    "./navigation/**/*.{js,jsx,ts,tsx}",
    "./views/main/**/*.{js,jsx,ts,tsx}",
    "./views/items/**/*.{js,jsx,ts,tsx}",
    "./views/report/**/*.{js,jsx,ts,tsx}"],

  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}