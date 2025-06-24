// src/components/Product/ProductCard.jsx
import React from "react";
import { Link } from "react-router";

const Star = ({ filled }) => (
  <svg
    className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.566-.955L10 0l2.946 5.955 6.566.955-4.756 4.635 1.122 6.545z" />
  </svg>
);

const ProductCard = ({ product, onQuickView }) => {
  return (
    <div className="relative overflow-hidden transition-shadow bg-white shadow-sm hover:shadow-lg group">
      <Link to={`/product/${product._id}`}>
        <div className="relative">
          <img
            src={product.primaryImage}
            alt={product.name}
            className="object-cover object-top w-full h-84"
          />
        </div>
      </Link>

      <div className="p-4 text-left">
        <button
          onClick={() => onQuickView(product)}
          className="absolute bottom-1/4 left-1/2 w-full -translate-x-1/2 mb-4 px-2 py-2 text-sm bg-[#445e85] text-white transition-all opacity-0 group-hover:opacity-80"
        >
          Quick View
        </button>
        <h5 className="mb-2 text-base font-normal text-gray-400">
          {product.category} / {product.subcategory}
        </h5>
        <h3 className="mb-2 text-sm font-normal">{product.name}</h3>
        <div className="flex justify-start mb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} filled={i <= Math.round(product.rating || 0)} />
          ))}
        </div>
        <p className="text-sm font-semibold text-gray-800">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
