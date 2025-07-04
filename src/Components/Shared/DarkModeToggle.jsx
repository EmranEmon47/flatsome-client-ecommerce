import { useTheme } from "../../Context/ThemeProvider";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const DarkModeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 transition bg-gray-100 rounded-full dark:bg-gray-300"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <SunIcon className="w-5 h-5 text-red-500" />
      ) : (
        <MoonIcon className="w-5 h-5 text-gray-800" />
      )}
    </button>
  );
};

export default DarkModeToggle;
