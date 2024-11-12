/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        playwrite: ["Playwrite NL", "sans-serif"],
        dynalight: ["Dynalight", "cursive"],
        lobster: ["Lobster", "sans-serif"],
      },
    },
  },
  plugins: [],
};
