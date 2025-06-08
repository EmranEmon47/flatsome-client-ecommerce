import React from "react";

const ColorSelector = ({ colors, selectedColor, onSelectColor }) => {
  return (
    <div>
      <h4 className="text-base font-medium text-black">Available Colors:</h4>
      <div className="flex gap-2 mt-1">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onSelectColor(color)}
            className={`w-8 h-8 rounded-full border-2 ${
              selectedColor === color
                ? "border-black ring-2 ring-offset-1"
                : "border-gray-300"
            }`}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
      {selectedColor && (
        <p className="text-sm text-gray-600 mt-1">
          Selected Color: <strong>{selectedColor}</strong>
        </p>
      )}
    </div>
  );
};

export default ColorSelector;
