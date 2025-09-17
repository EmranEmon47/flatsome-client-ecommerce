import React from "react";

const QuantitySelector = ({ quantity, setQuantity }) => {
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const increment = () => setQuantity((q) => q + 1);

  return (
    <div className="flex items-center gap-4">
      <label className="text-sm font-medium">Quantity:</label>
      <div className="flex items-center border rounded">
        <button
          onClick={decrement}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
        >
          -
        </button>
        <span className="px-4">{quantity}</span>
        <button
          onClick={increment}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
