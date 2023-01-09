/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: 'class',
  important: true,
  theme: {
    extend: {
      colors: {
        'primary': '#3f51b5'
      }
    },
  },
  plugins: [],
};
