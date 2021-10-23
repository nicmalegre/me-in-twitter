module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#1D9BF0", //light-blue twitter
        blue: {
          450: "#5F99F7",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
