/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#f8f0e3',
        'accent-red': '#e63946',
        'accent-green': '#457b9d',
        'accent-gold': '#ffd700',
      },
    },
  },
  plugins: [],
}

