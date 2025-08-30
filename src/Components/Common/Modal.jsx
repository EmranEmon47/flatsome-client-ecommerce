import React, { useEffect } from "react";

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-none bg-opacity-40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl p-6 mx-4 transition-all duration-300 scale-100 bg-white shadow-2xl dark:bg-black rounded-xl animate-fadeIn"
      >
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute text-2xl font-bold text-gray-500 transition-colors duration-200 top-3 right-3 hover:text-red-500"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* ✅ Modal Content */}
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
