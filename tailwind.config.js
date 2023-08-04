/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'olive-green':'#2F3020',
        'olive-lightgreen':'#596235',
        'lightorange':'#D96846',
        'ash':'#CDCBD6',
      }
    },
  },
  plugins: [require("daisyui")],
}

