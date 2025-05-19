// tailwind.config.js
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        dancing: ["Dancing Script", "cursive"],
        poppins: ["Poppins", "sans-serif"],
      },
      // keyframes: {
      //   slideRight: {
      //     "0%": { opacity: "0", transform: "translateX(-50px)" },
      //     "100%": { opacity: "1", transform: "translateX(0)" },
      //   },
      // },
      // animation: {
      //   slideRight: "slideRight 0.8s ease-out forwards",
      // },
    },
  },
  plugins: [],
};
