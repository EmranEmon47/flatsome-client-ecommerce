// src/pages/Home.jsx
import React from "react";
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

const BrowserCategories = () => {
  //   const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="py-12 w-full max-w-[calc(100%-440px)] mx-auto">
      {/* Heading */}
      <div className="flex items-center gap-4 mb-8">
        <hr className="flex-grow border-t border-gray-300" />
        <h2 className="text-2xl text-gray-600 font-medium uppercase whitespace-nowrap">
          Browse our categories
        </h2>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      {/* Product Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products
          .sort((a, b) => b.id - a.id)
          .map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-sm overflow-hidden hover:shadow-lg transition-shadow group relative"
            >
              {/* Wrap image in link to product details */}
              <Link to={`/product/${product.id}`}>
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-84 object-cover object-top"
                  />
                </div>
                <div className="text-left">
                  {/* Hover Quick View Button */}
                  <button className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 mb-10 px-2 py-2 text-sm  text-gray-600 group-hover:text-white transition-all bg-white group-hover:bg-[#445e85]">
                    <div className="flex flex-col ">
                      <div className="text-lg font-medium">{product.span}</div>
                      <div className="text-xs font-normal">
                        {product.stock} Products
                      </div>
                    </div>
                  </button>
                </div>
              </Link>

              {/* Product info */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default BrowserCategories;
