/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        drizzle: "pink",
        "drizzle-dark": "#FF69B4",
        "drizzle-light": "#95e7c1",
        "drizzle-ultralight": "#e9faf3",
        flow: "#00ee8a",
        catalog: "#4F517D",
        "catalog-dark": "#3C3F70",
        increment: "#3F64AD",
      },
      light: {
        DEFAULT: "#FAFBFC",
        lighter: "#F3F4F6",
      },
      fontFamily: {
        flow: ["sans-serif"],
      },
      boxShadow: {
        drizzle: "0px 5px 25px -5px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};
