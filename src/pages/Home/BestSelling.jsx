// src/pages/Home.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import products from "../../data/products";

const Star = ({ filled }) => (
  <svg
    className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.566-.955L10 0l2.946 5.955 6.566.955-4.756 4.635 1.122 6.545z" />
  </svg>
);

const BestSelling = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="pb-12 pt-4 w-full lg:max-w-[calc(100%-440px)] mx-auto">
      {/* Heading */}
      <div className="flex items-center gap-4 mb-8">
        <hr className="flex-grow border-t border-gray-300" />
        <h2 className="text-lg font-medium text-gray-600 uppercase lg:text-2xl whitespace-nowrap">
          Best Selling Products
        </h2>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {products
          .sort((a, b) => b.id - a.id)
          .map((product) => (
            <div
              key={product.id}
              className="relative overflow-hidden transition-shadow bg-white shadow-sm hover:shadow-lg group"
            >
              {/* Wrap image in link to product details */}
              <Link to={`/product/${product.id}`}>
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover object-top w-full h-84"
                  />
                </div>
              </Link>

              {/* Product info */}
              <div className="p-4 text-left">
                {/* Hover Quick View Button */}
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="absolute bottom-1/4 left-1/2 w-full -translate-x-1/2 mb-4 px-2 py-2 text-sm bg-[#445e85] text-white transition-all opacity-0 group-hover:opacity-80"
                >
                  Quick View
                </button>
                <h5 className="mb-2 text-base font-normal text-gray-400">
                  {product.span}
                </h5>
                <h3 className="mb-2 text-sm font-normal">{product.name}</h3>
                <div className="flex justify-start mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} filled={i <= product.rating} />
                  ))}
                </div>
                <p className="text-sm font-semibold text-gray-800">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative w-full max-w-xl p-6 bg-white rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute text-xl text-gray-500 top-2 right-2 hover:text-black"
            >
              &times;
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-auto mb-4 rounded object-contain max-h-[80vh]"
            />

            <h3 className="mb-2 text-xl font-semibold">
              {selectedProduct.name}
            </h3>
            <p className="text-lg text-gray-600">
              ${selectedProduct.price.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BestSelling;
