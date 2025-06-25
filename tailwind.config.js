// tailwind.config.js
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dancing: ["Dancing Script", "cursive"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#445e85",
        secondary: "#d26e4c",
        brand: {
          light: "#e0e7ff",
          DEFAULT: "#6366f1",
          dark: "#3730a3",
        },
        neutral: {
          100: "#f5f5f5",
          900: "#111827",
        },
        accent: "#f59e0b",
        danger: "#ef4444",
        success: "#10b981",
      },
    },
  },
  plugins: [],
};
