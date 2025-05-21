import React from "react";
import { useParams } from "react-router";
import products from "../../data/products";
import Nav from "../../Components/Shared/Nav";

const ProductDetails = () => {
  const { id } = useParams(); // get product ID from URL
  const product = products.find((item) => item.id === parseInt(id)); // find product

  if (!product) {
    return <div className="p-8 text-red-500">Product not found.</div>;
  }

  return (
    <div>
      {/* Nav bar here */}
      <Nav />
      <div className="max-w-[calc(100%-440px)] mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-contain "
          />

          {/* Product Info */}
          <div>
            <h2 className="text-2xl font-medium mb-2">{product.name}</h2>
            <p className="text-gray-600 text-sm mb-1">
              Category: {product.span}
            </p>
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

            <div className="mt-6 space-y-4">
              {/* Description */}
              <div>
                <h4 className="text-base font-medium text-black">
                  Description:
                </h4>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>

              {/* Available Colors */}
              <div>
                <h4 className="text-base font-medium text-black">
                  Available Colors:
                </h4>
                <p className="text-sm text-gray-600">
                  {product.colors.join(", ")}
                </p>
              </div>

              {/* Sizes (optional) */}
              <div>
                <h4 className="text-base font-medium text-black">
                  Available Sizes:
                </h4>
                <p className="text-sm text-gray-600">
                  {product.sizes.join(", ")}
                </p>
              </div>

              {/* Availability */}
              <div>
                <h4 className="text-base font-medium text-black">
                  Availability:
                </h4>
                <p className="text-sm text-gray-600">{product.availability}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
