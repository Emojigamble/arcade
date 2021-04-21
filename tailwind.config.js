const colors = require("tailwindcss/colors")

module.exports = {
  //mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: colors,
    extend: {
      borderWidth: {
        '1.5': '1.5px'
      }
    },
  },
  variants: {
    extend: {
      ringWidth: ['hover', 'dark']
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
