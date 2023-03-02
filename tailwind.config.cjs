/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "down-arrow": "url('/src/assets/down-arrow.svg')",
      },
      backgroundColor: {
        "main": "#94a3b8" // bg-slate-400
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar")
  ],
}
