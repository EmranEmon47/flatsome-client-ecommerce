import React from "react";

const SizeSelector = ({ sizes, selectedSize, onSelectSize }) => {
  return (
    <div>
      <h4 className="text-base font-medium text-black">Available Sizes:</h4>
      <div className="flex gap-2 mt-1">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelectSize(size)}
            className={`px-3 py-1 border text-black rounded ${
              selectedSize === size
                ? "border-black text-white dark:text-black bg-gray-600 dark:bg-gray-200 "
                : "border-gray-600 bg-white dark:bg-gray-800 dark:text-white"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
      {selectedSize && (
        <p className="mt-1 text-sm text-gray-600">
          Selected Size: <strong>{selectedSize}</strong>
        </p>
      )}
    </div>
  );
};

export default SizeSelector;
