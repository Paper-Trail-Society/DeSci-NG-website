/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "2xl": { min: "1600px" },
      xl: { max: "1599px" },
      ml: { max: "1450px" },
      lg: { max: "1280px" },
      md: { max: "1024px" },
      sm: { max: "768px" },
      "2xs": { max: "640px" },
      xs: { max: "450px" },
      tab: { min: "769px", max: "900px" },
    },
  },
  plugins: [],
};
