/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
    "./views/login/**/*.{js,jsx,ts,tsx}",
    "./navigation/**/*.{js,jsx,ts,tsx}",
    "./views/main/**/*.{js,jsx,ts,tsx}",
    "./views/items/**/*.{js,jsx,ts,tsx}",
    "./views/report/**/*.{js,jsx,ts,tsx}",
    "./views/workers/**/*.{js,jsx,ts,tsx}",
    "./views/configuration/**/*.{js,jsx,ts,tsx}",
    "./views/configuration/acciones/**/*.{js,jsx,ts,tsx}",
    "./views/configuration/soporte/**/*.{js,jsx,ts,tsx}",
    "./views/sales/**/*.{js,jsx,ts,tsx}",
    "./views/scanner/**/*.{js,jsx,ts,tsx}"],

  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}