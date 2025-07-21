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
      animation: {
        "loading-bar": "loadingBar 1.5s infinite ease-in-out",
      },
      keyframes: {
        loadingBar: {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
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
