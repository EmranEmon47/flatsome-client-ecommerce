import React, { useEffect, useState } from "react";
import logo from "../../assets/logo-light.png"; // Adjust the path if needed

const SplashScreen = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setFadeOut(true), 2000); // Show for 2 seconds
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        className="w-64 h-16 mb-6 animate-bounce"
        draggable={false}
      />

      {/* Animated loading bar below logo */}
      <div className="w-12 h-2 overflow-hidden rounded-full bg-neutral-800">
        <div className="h-full bg-indigo-500 animate-loading-bar" />
      </div>
    </div>
  );
};

export default SplashScreen;
