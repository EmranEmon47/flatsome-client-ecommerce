import React, { useEffect, useState } from "react";
import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { useWishlist } from "../../Context/WishlistContext";

const Star = ({ filled }) => (
  <svg
    className={`w-4 h-4 text-red-500 ${
      filled ? "text-yellow-400" : "text-red"
    }`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.566-.955L10 0l2.946 5.955 6.566.955-4.756 4.635 1.122 6.545z" />
  </svg>
);

const ProductCard = ({ product, onQuickView }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(isInWishlist(product._id));
  }, [isInWishlist, product._id]);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
    setIsWishlisted(!isWishlisted);
  };

  return (
    <motion.div
      className="relative flex flex-col overflow-hidden backdrop-blur-lg bg-black/5 dark:bg-white/10  shadow-lg border border-white/20 dark:border-gray-700/30 transition-all duration-500 hover:shadow-xl hover:bg-black/10 dark:hover:bg-white/15 hover:scale-[1.02] hover:border-white/30 dark:hover:border-gray-600/40 group h-[400px] lg:h-[450px] rounded-md"
      initial={{ opacity: 0.75, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.25, ease: "easeInOut" }}
    >
      {/*  Wishlist */}
      <button
        onClick={toggleWishlist}
        className="absolute z-10 p-1 bg-gray-200 rounded-full shadow dark:bg-gray-200 top-3 right-3"
      >
        {isWishlisted ? (
          <SolidHeart className="w-5 h-5 text-red-500 animate-ping-once" />
        ) : (
          <OutlineHeart className="w-5 h-5 text-gray-500 dark:text-gray-500 hover:text-red-500" />
        )}
      </button>

      {/*  Product Image */}
      <Link
        to={`/product/${product._id}`}
        className="block h-[280px] lg:h-[300px] relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-500 ease-in-out"
      >
        <img
          src={product.primaryImage}
          alt={product.name}
          className="object-cover object-top w-full h-full"
        />
        {product.additionalImages?.[0] && (
          <img
            src={product.additionalImages[0]}
            alt={`${product.name} hover`}
            className="absolute top-0 left-0 object-cover object-top w-full h-full transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          />
        )}
      </Link>

      {/*  Quick View */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onQuickView(product);
        }}
        className="absolute bottom-[118px] lg:bottom-[146px]  left-1/2 transform  -translate-x-1/2 w-full py-2 text-sm bg-[#445e85] text-white transition-all opacity-0 group-hover:opacity-90"
      >
        Quick View
      </button>

      {/*  Product Info */}
      <div className="flex-1 p-2 lg:p-4 text-left h-[120px] lg:h-[150px]">
        <h5 className="text-xs font-normal text-gray-400 dark:text-gray-400">
          {product.category} / {product.subcategory}
        </h5>
        <h3 className="mb-0 text-sm font-medium lg:mb-2 lg:text-base line-clamp-2">
          {product.name}
        </h3>
        <div className="flex mb-0 lg:mb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} filled={i <= Math.round(product.rating || 0)} />
          ))}
        </div>
        <p className="lg:text-base text-sm font-semibold text-[#001d49] dark:text-white">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
