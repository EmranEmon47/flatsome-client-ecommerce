// src/Components/Product/SizeSelector.jsx
import React from "react";

const SizeSelector = ({ sizes }) => {
  return (
    <div>
      <h4 className="font-medium text-base text-black">Available Sizes:</h4>
      <div className="flex gap-2 mt-1 flex-wrap">
        {sizes.map((size, index) => (
          <span
            key={index}
            className="px-2 py-1 border rounded text-sm hover:bg-gray-100 cursor-pointer"
          >
            {size}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
