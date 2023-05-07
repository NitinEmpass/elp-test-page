/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gsl-dark-red": "#ff3131",
        "gsl-light-red": "#ff4545",
      },
    },
  },
};
