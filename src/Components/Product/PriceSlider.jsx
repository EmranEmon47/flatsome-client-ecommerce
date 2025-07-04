import React, { useState, useEffect, useRef } from "react";
import debounce from "lodash.debounce";

const PriceSlider = ({ min, max, value, onChange }) => {
  const [minVal, setMinVal] = useState(value.min);
  const [maxVal, setMaxVal] = useState(value.max);
  const [isDragging, setIsDragging] = useState(null);
  const minGap = 10;

  const debouncedChange = useRef(
    debounce((newMin, newMax) => {
      onChange({ min: newMin, max: newMax });
    }, 200)
  ).current;

  // Sync from parent
  useEffect(() => {
    setMinVal(value.min);
    setMaxVal(value.max);
  }, [value]);

  useEffect(() => {
    debouncedChange(minVal, maxVal);
  }, [minVal, maxVal, debouncedChange]);

  const getPercent = (val) => ((val - min) / (max - min)) * 100;
  const minPercent = getPercent(minVal);
  const maxPercent = getPercent(maxVal);

  const handleMinChange = (e) => {
    const val = Math.min(Number(e.target.value), maxVal - minGap);
    setMinVal(val);
  };

  const handleMaxChange = (e) => {
    const val = Math.max(Number(e.target.value), minVal + minGap);
    setMaxVal(val);
  };

  return (
    <div className="relative w-full h-10">
      {/* Background track */}
      <div className="absolute w-full h-1 -translate-y-1/2 bg-gray-300 rounded top-1/2" />

      {/* Active range bar */}
      <div
        className="absolute h-1 -translate-y-1/2 bg-blue-500 rounded top-1/2"
        style={{
          left: `${minPercent}%`,
          width: `${maxPercent - minPercent}%`,
        }}
      />

      {/* Min tooltip */}
      <div
        className={`absolute -top-5 transform -translate-x-1/2 px-2 py-1 text-xs text-black transition-opacity ${
          isDragging === "min" ? "opacity-100" : "opacity-50"
        }`}
        style={{ left: `${minPercent}%` }}
      >
        ${minVal}
      </div>

      {/* Max tooltip */}
      <div
        className={`absolute -top-5 transform -translate-x-1/2 px-2 py-1 text-xs text-black transition-opacity ${
          isDragging === "max" ? "opacity-100" : "opacity-50"
        }`}
        style={{ left: `${maxPercent}%` }}
      >
        ${maxVal}
      </div>

      {/* Min slider */}
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        step={1}
        onChange={handleMinChange}
        onMouseDown={() => setIsDragging("min")}
        onMouseUp={() => setIsDragging(null)}
        className="absolute w-full -translate-y-1/2 bg-transparent appearance-none pointer-events-auto top-1/2"
        style={{
          zIndex: minVal > max - 100 ? 6 : 7,
        }}
      />

      {/* Max slider */}
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        step={1}
        onChange={handleMaxChange}
        onMouseDown={() => setIsDragging("max")}
        onMouseUp={() => setIsDragging(null)}
        className="absolute w-full -translate-y-1/2 bg-transparent appearance-none pointer-events-auto top-1/2"
        style={{
          zIndex: maxVal <= min + 100 ? 8 : 5,
        }}
      />

      {/* Optional min/max labels below slider */}
      <div className="flex justify-between px-1 mt-3 text-xs text-gray-500">
        <span>${min}</span>
        <span>${max}</span>
      </div>
    </div>
  );
};

export default PriceSlider;
