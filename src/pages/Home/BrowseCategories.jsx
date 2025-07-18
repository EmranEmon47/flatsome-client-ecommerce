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
    <div className="relative w-full lg:max-w-[calc(100%-440px)] mx-auto">
      {/* Red glow top */}
      <div className="pointer-events-none hidden lg:block absolute top-[-50px] left-[-50px] h-60 w-60 bg-red-500 opacity-30 rounded-full blur-3xl"></div>

      {/* Red glow bottom right */}
      <div className="pointer-events-none hidden lg:block absolute bottom-[-50px] right-[-50px] h-72 w-72 bg-red-500 opacity-30 rounded-full blur-3xl"></div>
      {/* Heading */}
      <div className="flex items-center gap-4 mt-2 mb-8">
        <hr className="flex-grow border-t border-gray-300" />
        <h2 className="text-lg font-medium text-gray-600 uppercase lg:text-2xl whitespace-nowrap">
          Browse our categories
        </h2>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 px-4 lg:px-0 lg:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products
          .sort((a, b) => b.id - a.id)
          .map((product) => (
            <div
              key={product.id}
              className="relative overflow-hidden h-[350px] lg:h-[400px] transition-shadow rounded bg-white shadow-sm hover:shadow-lg group"
            >
              {/* Wrap image in link to product details */}
              <Link to={`/all-products`}>
                <div className="relative h-[350px] lg:h-[400px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover object-top w-full h-full"
                  />
                </div>
                <div className="text-left">
                  {/* Hover Quick View Button */}
                  <button className="absolute bottom-0 left-1/2 w-full dark:bg-black dark:text-white -translate-x-1/2 mb-10 px-2 py-2 text-sm  text-black group-hover:text-white transition-all bg-white group-hover:bg-[#445e85]">
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
