/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{js,jsx,ts,tsx}", "./App.{js,jsx,ts,tsx}","./views/login/**/*.{js,jsx,ts,tsx}" ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}