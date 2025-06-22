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
      className="fixed inset-0 z-50 flex items-center justify-center bg-none bg-opacity-40 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-xl shadow-2xl max-w-4xl w-full mx-4 relative animate-fadeIn transition-all duration-300 scale-100"
      >
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold transition-colors duration-200"
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
