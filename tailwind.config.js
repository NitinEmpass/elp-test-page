/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gsl-dark-red": "#de4c39",
        "gsl-light-red": "#d65345",
      },
    },
  },
};
