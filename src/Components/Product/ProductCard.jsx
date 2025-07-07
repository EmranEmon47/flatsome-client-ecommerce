// src/components/Product/ProductCard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";

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
  const hoverImage = product.additionalImages?.[0];
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsWishlisted(wishlist.includes(product._id));
  }, [product._id]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let updated;

    if (wishlist.includes(product._id)) {
      updated = wishlist.filter((id) => id !== product._id);
    } else {
      updated = [...wishlist, product._id];
    }

    localStorage.setItem("wishlist", JSON.stringify(updated));
    setIsWishlisted(updated.includes(product._id));
  };

  return (
    <div className="relative overflow-hidden transition-shadow bg-white shadow-sm hover:shadow-lg group">
      {/* ❤️ Wishlist Heart Icon */}
      <button
        onClick={toggleWishlist}
        className="absolute z-10 p-1 bg-white rounded-full shadow top-3 right-3"
      >
        {isWishlisted ? (
          <SolidHeart className="w-5 h-5 text-red-500 animate-ping-once" />
        ) : (
          <OutlineHeart className="w-5 h-5 text-gray-400 hover:text-red-500" />
        )}
      </button>

      {/* Product Link and Images */}
      <Link to={`/product/${product._id}`}>
        <div className="relative w-full overflow-hidden h-80">
          <div className="relative w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105">
            <img
              src={product.primaryImage}
              alt={product.name}
              className="absolute top-0 left-0 object-cover object-top w-full h-full transition-opacity duration-300 group-hover:opacity-0"
            />
            {hoverImage && (
              <img
                src={hoverImage}
                alt={`${product.name} hover`}
                className="absolute top-0 left-0 object-cover object-top w-full h-full transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              />
            )}
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 text-left">
        <button
          onClick={() => onQuickView(product)}
          className="absolute bottom-1/4 left-1/2 w-full -translate-x-1/2 mb-3.5 px-2 py-2 text-sm bg-[#445e85] text-white transition-all opacity-0 group-hover:opacity-80"
        >
          Quick View
        </button>

        <h5 className="text-xs font-normal text-gray-400 ">
          {product.category} / {product.subcategory}
        </h5>
        <h3 className="mb-2 text-base font-normal">{product.name}</h3>
        <div className="flex justify-start mb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} filled={i <= Math.round(product.rating || 0)} />
          ))}
        </div>
        <p className="text-base font-semibold text-[#001d49]">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
