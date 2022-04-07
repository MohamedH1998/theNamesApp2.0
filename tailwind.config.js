const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        "clr-bg": "#FCFAF2",
        "clr-accent": "#DE7254",
        "clr-success": "#0A8059",
        "clr-secondary-accent": "#253858"
      }
    },
    backgroundImage: () => ({
      "main-background-gradiant":
        "radial-gradient(circle, rgba(251,250,198,1) 0%, rgba(250,245,255,1) 100%);"
    })
  },
  plugins: []
};
