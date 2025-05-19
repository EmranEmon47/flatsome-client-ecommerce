// tailwind.config.js
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"], // ✅ Critical to include all source files
  theme: {
    extend: {
      fontFamily: {
        dancing: ['"Dancing Script"', "cursive"], // ✅ double quotes around font name
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
