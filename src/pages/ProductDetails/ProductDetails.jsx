import React, { useState } from "react";
import { useParams } from "react-router";
import products from "../../data/products";
import Nav from "../../Components/Shared/Nav";
import { useCart } from "../../Context/CartProvider";
import ColorSelector from "../../Components/Product/ColorSelector";
import SizeSelector from "../../Components/Product/SizeSelector";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === parseInt(id));
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  if (!product)
    return <div className="p-8 text-red-500">Product not found.</div>;

  const handleAdd = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select a color and size.");
      return;
    }

    addToCart({ ...product, selectedColor, selectedSize }, quantity);
  };

  return (
    <div>
      <Nav />
      <div className="max-w-[calc(100%-440px)] mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[600px] object-contain"
          />
          <div>
            <h2 className="text-2xl font-medium mb-2">{product.name}</h2>
            <p className="text-gray-600 text-sm mb-1">
              Category: {product.span}
            </p>
            <p className="text-xl text-gray-800 font-semibold mb-4">
              ${product.price.toFixed(2)}
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-base font-medium text-black">
                  Description:
                </h4>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>

              {/* 🔵 Color Selector */}
              <ColorSelector
                colors={product.colors}
                selectedColor={selectedColor}
                onSelectColor={setSelectedColor}
              />

              {/* 🔴 Size Selector */}
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
              />

              <div>
                <h4 className="text-base font-medium text-black">
                  Availability:
                </h4>
                <p className="text-sm text-gray-600">{product.availability}</p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center mb-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 py-1 bg-gray-200"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2 py-1 bg-gray-200"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`px-4 py-2 text-white ${
                  !selectedColor || !selectedSize
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#d26e4c] hover:bg-[#ff6b39]"
                }`}
                disabled={!selectedColor || !selectedSize}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
