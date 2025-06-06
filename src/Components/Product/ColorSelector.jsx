// src/Components/Product/ColorSelector.jsx
import React from "react";

const ColorSelector = ({ colors }) => {
  return (
    <div>
      <h4 className="font-medium text-base text-black">Available Colors:</h4>
      <div className="flex gap-2 mt-1">
        {colors.map((color, index) => (
          <span
            key={index}
            className="w-6 h-6 rounded-full border-none"
            title={color}
            style={{ backgroundColor: color }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
