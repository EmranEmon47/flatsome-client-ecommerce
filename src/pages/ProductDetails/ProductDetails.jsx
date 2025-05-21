// src/pages/ProductDetails.jsx
import React from "react";
import { useParams } from "react-router";
import products from "../../data/products"; // adjust the path if needed

const ProductDetails = () => {
  const { id } = useParams(); // get product ID from URL
  const product = products.find((item) => item.id === parseInt(id)); // find product

  if (!product) {
    return <div className="p-8 text-red-500">Product not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-contain rounded"
        />

        {/* Product Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-1">Category: {product.span}</p>
          <p className="text-xl text-gray-800 font-semibold mb-4">
            {product.price}
          </p>

          {/* Rating */}
          <div className="flex mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i <= product.rating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.566-.955L10 0l2.946 5.955 6.566.955-4.756 4.635 1.122 6.545z" />
              </svg>
            ))}
          </div>

          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            tincidunt, lorem a facilisis ultricies, tellus lacus aliquam lacus,
            ac blandit lorem quam eget nunc.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
