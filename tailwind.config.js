/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "orange-gradient-0deg":
          "linear-gradient(0deg, #ffc700 18%, #ff9500 76%)",
      },
    },
  },
  plugins: [],
};
