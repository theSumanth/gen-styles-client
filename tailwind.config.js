/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Playwrite NL", "sans-serif"],
        playwrite: ["Playwrite NL", "sans-serif"],
      },
      colors: {
        customBlue: "#746eea",
        customBackground: "#f5f5f5",
      },
      screens: {
        "custom-range": { max: "848px", min: "768px" },
        "not-mobile-view": { max: "1800px", min: "520px" },
      },
    },
  },
  plugins: [],
};
