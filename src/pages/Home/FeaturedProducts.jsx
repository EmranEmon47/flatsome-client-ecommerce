import React, { useState } from "react";
import product1 from "../../assets/product1.jpg";
import product2 from "../../assets/product2.jpg";
import product3 from "../../assets/product3.jpg";
import product4 from "../../assets/product4.jpg";

const products = [
  {
    image: product1,
    span: "Tops",
    name: "Lenox Star Knit Hunkydory",
    rating: 4,
    price: "$49.99",
  },
  {
    image: product2,
    span: "Jackets",
    name: "Sunny Tank Selected Femme",
    rating: 5,
    price: "$89.00",
  },
  {
    image: product3,
    span: "Sweaters",
    name: "Print Ls College Sweat",
    rating: 3,
    price: "$25.50",
  },
  {
    image: product4,
    span: "Mens",
    name: "Raglan Tee Denim",
    rating: 5,
    price: "$55.50",
  },
];

const Star = ({ filled }) => (
  <svg
    className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.566-.955L10 0l2.946 5.955 6.566.955-4.756 4.635 1.122 6.545z" />
  </svg>
);

const FeaturedProducts = () => {
  // Track the product for quick view
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto">
      {/* Heading */}
      <div className="flex items-center gap-4 mb-8">
        <hr className="flex-grow border-t border-gray-300" />
        <h2 className="text-2xl text-gray-600 font-medium uppercase whitespace-nowrap">
          Weekly Featured Products
        </h2>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white shadow-sm overflow-hidden hover:shadow-lg transition-shadow group relative"
          >
            {/* Image wrapper for hover interaction */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-84 object-cover object-top"
              />

              {/* Hover Quick View Button */}
              <button
                onClick={() => setSelectedProduct(product)}
                className="absolute  bottom-0 left-1/2 w-full  -translate-x-1/2 px-2 py-2 text-sm bg-[#445e85] text-white    transition-all opacity-0 group-hover:opacity-80"
              >
                Quick View
              </button>
            </div>

            {/* Product info */}
            <div className="p-4 text-left">
              <h5 className="text-base text-gray-400 font-normal mb-2">
                {product.span}
              </h5>
              <h3 className="text-sm font-normal mb-2">{product.name}</h3>
              <div className="flex justify-start mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} filled={i <= product.rating} />
                ))}
              </div>
              <p className="text-sm font-semibold text-gray-800">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={() => setSelectedProduct(null)} // Close modal on background click
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full relative"
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>

            {/* Product Image */}
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-auto mb-4 rounded object-contain max-h-[80vh]"
            />

            {/* Product Info */}
            <h3 className="text-xl font-semibold mb-2">
              {selectedProduct.name}
            </h3>
            <p className="text-gray-600 text-lg">{selectedProduct.price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;
