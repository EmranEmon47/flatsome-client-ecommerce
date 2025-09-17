import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="overflow-hidden bg-white rounded-md shadow-sm animate-pulse">
      {/* Image Placeholder */}
      <div className="relative w-full h-48 bg-gray-200 shimmer" />

      {/* Content Placeholder */}
      <div className="p-4 space-y-3">
        <div className="w-2/3 h-4 bg-gray-200 rounded shimmer" />
        <div className="w-1/2 h-4 bg-gray-200 rounded shimmer" />
        <div className="w-1/3 h-4 bg-gray-200 rounded shimmer" />
        <div className="w-1/4 h-4 bg-gray-200 rounded shimmer" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
