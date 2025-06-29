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
    <div className="relative w-full h-12">
      {/* Track */}
      <div className="absolute w-full h-1 -translate-y-1/2 bg-gray-300 rounded top-1/2" />

      {/* Active range highlight */}
      <div
        className="absolute h-1 -translate-y-1/2 rounded top-1/2 bg-primary"
        style={{
          left: `${minPercent}%`,
          width: `${maxPercent - minPercent}%`,
        }}
      />

      {/* Min tooltip */}
      <div
        className={`absolute -top-8 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-black rounded transition-opacity ${
          isDragging === "min" ? "opacity-100" : "opacity-50"
        }`}
        style={{ left: `${minPercent}%` }}
      >
        ${minVal}
      </div>

      {/* Max tooltip */}
      <div
        className={`absolute -top-8 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-black rounded transition-opacity ${
          isDragging === "max" ? "opacity-100" : "opacity-50"
        }`}
        style={{ left: `${maxPercent}%` }}
      >
        ${maxVal}
      </div>

      {/* Min input slider (higher z-index when needed) */}
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={minVal}
        onChange={handleMinChange}
        onMouseDown={() => setIsDragging("min")}
        onMouseUp={() => setIsDragging(null)}
        className="absolute z-30 w-full -translate-y-1/2 bg-transparent appearance-none pointer-events-auto top-1/2"
        style={{ zIndex: minVal > maxVal - 100 ? 35 : 25 }}
      />

      {/* Max input slider */}
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={maxVal}
        onChange={handleMaxChange}
        onMouseDown={() => setIsDragging("max")}
        onMouseUp={() => setIsDragging(null)}
        className="absolute z-20 w-full -translate-y-1/2 bg-transparent appearance-none pointer-events-auto top-1/2"
        style={{ zIndex: maxVal <= minVal + 100 ? 34 : 24 }}
      />
    </div>
  );
};

export default PriceSlider;
