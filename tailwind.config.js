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
  },
  plugins: [],
};
