import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Default to light mode unless user saved dark mode
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") return true;
      if (saved === "light") return false;
      return false; // default to light mode
    }
    return false;
  });

  // Apply/remove dark class and set localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Toggle explicitly switching modes and logging
  const toggleTheme = () => {
    if (darkMode) {
      // currently dark, switch to light
      setDarkMode(false);
      console.log("☀️ Light mode is now ON");
    } else {
      // currently light, switch to dark
      setDarkMode(true);
      console.log("🌙 Dark mode is now ON");
    }
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
