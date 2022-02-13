module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D98F0",
        gray: "rgb(110, 118, 125)",
        textColor: "rgb(217, 217, 217)",
        secondary: "rgb(21, 24, 28)",
        secondaryHover: "rgba(255, 255, 255,0.3)",
        grayHover: "rgba(255,255,255,0.03)",
        third: "rgb(110, 118, 125)",
      },
      screens: { sm: { min: "300px", max: "768px" } },
      boxShadow: {
        light:
          "rgba(255,255,255,0.12) 0px 0px 20px 0px, rgba(255,255,255,0.32) 0px 0px 10px 0px",
      },
    },
  },
  plugins: [],
};
