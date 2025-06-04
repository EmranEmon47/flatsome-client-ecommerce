import React, { useState } from "react";
import { useParams } from "react-router";
import products from "../../data/products";
import Nav from "../../Components/Shared/Nav";
import { useCart } from "../../Context/CartProvider";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === parseInt(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product)
    return <div className="p-8 text-red-500">Product not found.</div>;

  const handleAdd = () => addToCart(product, quantity);

  return (
    <div>
      <Nav />

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Product Image */}
          <div className="w-full max-h-[600px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
              <p className="text-sm text-gray-600 mb-1">
                Category: {product.span}
              </p>
              <p className="text-2xl font-bold text-gray-800">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <h4 className="font-medium text-base text-black">
                  Description:
                </h4>
                <p>{product.description}</p>
              </div>

              <div>
                <h4 className="font-medium text-base text-black">
                  Available Colors:
                </h4>
                <p>{product.colors.join(", ")}</p>
              </div>

              <div>
                <h4 className="font-medium text-base text-black">
                  Available Sizes:
                </h4>
                <p>{product.sizes.join(", ")}</p>
              </div>

              <div>
                <h4 className="font-medium text-base text-black">
                  Availability:
                </h4>
                <p>{product.availability}</p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Quantity:</label>
              <div className="flex items-center border rounded">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div>
              <button
                onClick={handleAdd}
                disabled={quantity <= 0}
                className={`w-full md:w-auto px-6 py-2 mt-2 text-white rounded ${
                  quantity <= 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#d26e4c] hover:bg-[#ff6b39]"
                }`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetails;
