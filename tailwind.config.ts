/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Geologica', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
// export default config;
