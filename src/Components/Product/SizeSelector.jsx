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
            className={`px-3 py-1 border rounded ${
              selectedSize === size
                ? "border-black bg-gray-100"
                : "border-gray-300"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
      {selectedSize && (
        <p className="text-sm text-gray-600 mt-1">
          Selected Size: <strong>{selectedSize}</strong>
        </p>
      )}
    </div>
  );
};

export default SizeSelector;
