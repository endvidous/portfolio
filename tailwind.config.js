/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        darkOlive: "#181C14",
        lightGrey: "#3C3D37",
        lightOlive: "#697565",
        skin: "#ECDFCC",
        chalkWhite: "#FAF7F0",
        chalkgrey: "#D8D2C2",
        brick: "#B17457",
        chalkblack: "#4A4947",
        heavyMetal: "#2b2e2f",
        pearlBush: "#e4ddd6",
        bulletShell: "#bd9956",
        lightSeaGreen: "#45a3a2",
      },
    },
  },
  plugins: [],
};
