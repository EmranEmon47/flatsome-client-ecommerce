import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [products, setProducts] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const PRODUCTS_TO_SHOW = 6;
  const ITEMS_PER_VIEW = 3;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/products`
        );
        setProducts(res.data.slice(0, PRODUCTS_TO_SHOW));
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const maxIndex = Math.ceil(PRODUCTS_TO_SHOW / ITEMS_PER_VIEW) - 1;

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const start = carouselIndex * ITEMS_PER_VIEW;
  const visibleProducts = [
    ...products.slice(start, start + ITEMS_PER_VIEW),
    // if near end, wrap-around remaining items
    ...products.slice(
      0,
      Math.max(0, start + ITEMS_PER_VIEW - PRODUCTS_TO_SHOW)
    ),
  ].slice(0, ITEMS_PER_VIEW); // just in case

  return (
    <div className="relative group w-full max-w-[calc(100%-440px)] mx-auto">
      {/* Heading */}
      <div className="flex items-center gap-4 mb-8">
        <hr className="flex-grow border-t border-gray-300" />
        <h2 className="text-2xl font-medium text-gray-600 uppercase whitespace-nowrap">
          Weekly Featured Products
        </h2>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      {/* Carousel Wrapper */}
      <div className="relative overflow-hidden">
        {/* Arrow Buttons */}
        {products.length > ITEMS_PER_VIEW && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-0 z-10 p-2 transition-opacity -translate-y-1/2 opacity-0 bg-none top-1/2 hover:bg-none group-hover:opacity-100"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 z-10 p-2 transition-opacity -translate-y-1/2 bg-white border shadow opacity-0 top-1/2 hover:bg-gray-100 group-hover:opacity-100"
            >
              <ChevronRight />
            </button>
          </>
        )}

        {/* Product Cards or Skeleton */}
        <div className="grid grid-cols-1 gap-4 transition-all duration-500 sm:grid-cols-2 md:grid-cols-3">
          {loading
            ? Array.from({ length: ITEMS_PER_VIEW }).map((_, i) => (
                <div
                  key={i}
                  className="p-4 bg-white border rounded shadow-sm animate-pulse"
                >
                  <div className="mb-4 bg-gray-200 rounded h-52" />
                  <div className="w-3/4 h-4 mb-2 bg-gray-300 rounded" />
                  <div className="w-1/2 h-4 mb-2 bg-gray-300 rounded" />
                  <div className="w-1/4 h-4 bg-gray-300 rounded" />
                </div>
              ))
            : visibleProducts.map((product) => (
                <div
                  key={product._id}
                  className="relative transition-shadow bg-white shadow-sm hover:shadow-lg group"
                >
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.primaryImage}
                      alt={product.name}
                      className="object-cover w-full h-72"
                    />
                  </Link>

                  <div className="p-4">
                    <h5 className="mb-2 text-base font-normal text-gray-400">
                      {product.subcategory}
                    </h5>
                    <h3 className="mb-2 text-sm font-semibold">
                      {product.name}
                    </h3>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          filled={i <= Math.round(product.rating || 0)}
                        />
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-gray-800">
                      ${product.price?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
