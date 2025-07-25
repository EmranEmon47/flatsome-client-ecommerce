import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../../Components/Product/ProductCard";
import ProductCardSkeleton from "../../Components/Product/ProductCardSkeleton";
import ProductQuickViewModal from "../../Components/Product/ProductQuickViewModal";

const RelatedProducts = () => {
  const [products, setProducts] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const PRODUCTS_TO_SHOW = 6;
  const ITEMS_PER_VIEW = 4;

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
    ...products.slice(
      0,
      Math.max(0, start + ITEMS_PER_VIEW - PRODUCTS_TO_SHOW)
    ),
  ].slice(0, ITEMS_PER_VIEW);

  return (
    <div className="relative py-4 lg:px-0 px-4 w-full lg:max-w-[calc(100%-440px)] mx-auto">
      {/* Red glow top */}
      <div className="pointer-events-none hidden lg:block absolute top-[-50px] left-[-50px] h-60 w-60 bg-red-500 opacity-20 rounded-full blur-3xl"></div>

      {/* Red glow bottom right */}
      <div className="pointer-events-none hidden lg:block absolute bottom-[-50px] right-[-50px] h-72 w-72 bg-red-500 opacity-10 rounded-full blur-3xl"></div>
      {/* Heading */}
      <div className="flex items-center gap-4 mb-8">
        <hr className="flex-grow border-t border-gray-300" />
        <h2 className="text-lg font-medium text-gray-600 uppercase dark:text-white lg:text-2xl whitespace-nowrap">
          Related Products
        </h2>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      {/* Carousel Wrapper */}
      <div className="relative overflow-hidden group/item">
        {products.length > ITEMS_PER_VIEW && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-0 z-10 p-2 text-black transition-opacity -translate-y-1/2 opacity-0 group-hover/item:opacity-100 top-1/3"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 z-10 p-2 text-black transition-opacity -translate-y-1/2 opacity-0 group-hover/item:opacity-100 top-1/3"
            >
              <ChevronRight />
            </button>
          </>
        )}

        {/* Product Cards */}
        <div className="grid grid-cols-2 gap-4 transition-all duration-500 lg:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {loading
            ? Array.from({ length: ITEMS_PER_VIEW }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : visibleProducts.map((product) => (
                <div key={product._id} className="relative group/item">
                  <ProductCard
                    product={product}
                    onQuickView={() => setSelectedProduct(product)}
                  />
                </div>
              ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductQuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default RelatedProducts;
