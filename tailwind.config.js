/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xxl: '1536px',
    },
    colors: {
      'first': '#dad7cd',
      'second': '#a3b18a',
      'third': '#588157',
      'fourth': '#3a5a40',
      'fifth': '#344e41',
      'black': '#000000'
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}

