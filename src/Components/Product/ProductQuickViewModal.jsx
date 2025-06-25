// src/components/Product/ProductQuickViewModal.jsx
import React from "react";

const ProductQuickViewModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl p-6 transition-shadow bg-white rounded-lg shadow-lg hover:shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute text-xl text-gray-500 top-2 right-2 hover:text-black"
        >
          &times;
        </button>

        <img
          src={product.primaryImage}
          alt={product.name}
          className="w-full h-auto mb-4 rounded object-contain max-h-[80vh]"
        />

        <h3 className="mb-2 text-xl font-semibold">{product.name}</h3>
        <p className="text-lg text-gray-600">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductQuickViewModal;
