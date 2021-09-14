module.exports = {
  mode: "jit",
  purge: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: "#445a6a",
        secondary: "#b28a4f",
      },
      fontFamily: {
        display: "'Playfair Display', serif",
        body: "'Raleway', sans-serif",
      },
    },
  },
  plugins: [require("@tailwindcss/ui"), require("@tailwindcss/forms")],
};
