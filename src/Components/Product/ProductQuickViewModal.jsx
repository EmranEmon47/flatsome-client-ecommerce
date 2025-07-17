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
        className="relative w-full max-w-xl pt-10 transition-shadow bg-white rounded-lg shadow-lg hover:shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute px-2 text-sm text-black transition-colors rounded-full bg-slate-300 top-2 right-2 "
        >
          close &times;
        </button>

        <img
          src={product.primaryImage}
          alt={product.name}
          className="w-full h-auto mb-4  object-contain max-h-[80vh]"
        />

        <div className="p-4 bg-white dark:bg-black">
          <h3 className="mb-2 text-xl font-semibold">{product.name}</h3>
          <p className="text-lg text-red-500">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickViewModal;
