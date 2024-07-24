/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#874CCC', //color for text
        secondary: 'white', //color for text
      },
    },
  },
  plugins: [],
}

