import { toast } from "react-hot-toast";

export const showToast = (message, type = "success") => {
  const isDark = document.documentElement.classList.contains("dark");

  const style = {
    background: isDark ? "#1f2937" : "#ffffff", // gray-800 / white
    color: isDark ? "#ffffff" : "#000000", // white / black
    borderRadius: "8px",
    padding: "12px 16px",
    fontWeight: "500",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transform: "translateY(10px)",
    transition: "all 0.3s ease",
  };

  const iconTheme = {
    primary: isDark ? "#4ade80" : "#22c55e", // green-400 / green-500
    secondary: isDark ? "#1f2937" : "#ffffff",
  };

  toast[type](message, {
    position: "bottom-right",
    duration: 3000,
    style,
    iconTheme,
  });
};
