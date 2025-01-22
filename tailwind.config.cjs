/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './client/index.html',
    './client/src/pages/*.{js,ts,jsx,tsx}',
    './client/src/pages/**/*.{js,ts,jsx,tsx}',
    './client/src/components/**/*.{js,ts.jsx.tsx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '1/5': '1fr 5fr',
        '1/2': '2fr 2fr',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
