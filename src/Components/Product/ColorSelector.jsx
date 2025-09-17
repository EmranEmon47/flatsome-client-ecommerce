import React from "react";

const ColorSelector = ({ colors, selectedColor, onSelectColor }) => {
  return (
    <div>
      <h4 className="text-base font-medium text-black">Available Colors:</h4>

      <div className="flex gap-2 mt-1">
        {colors.map((colorObj) => (
          <button
            key={`${colorObj.name}-${colorObj.hex}`} // Unique key
            onClick={() => onSelectColor(colorObj.name)} //  Send readable name like "Red"
            className={`w-8 h-8 rounded-full border-2 ${
              selectedColor === colorObj.name
                ? "border-black ring-2 ring-offset-1"
                : "border-gray-300"
            }`}
            style={{
              backgroundColor: colorObj.hex, // Set the swatch background color
            }}
            aria-label={`Select color ${colorObj.name}`}
          />
        ))}
      </div>

      {selectedColor && (
        <p className="mt-1 text-sm text-gray-600">
          Selected Color: <strong>{selectedColor}</strong>
        </p>
      )}
    </div>
  );
};

export default ColorSelector;
