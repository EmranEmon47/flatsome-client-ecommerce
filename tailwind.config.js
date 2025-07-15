// tailwind.config.js
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        dancing: ["Dancing Script", "cursive"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: '#445e85',
      },
    },
    screens: {

      sm: { max: '450px' },


      md: { min: '451px', max: '900px' },


      lg: { min: '901px' },
    },
  },
  plugins: [],
};
