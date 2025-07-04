import React, { useState, useEffect, useRef, useCallback } from "react";

const PriceSlider = ({ min, max, value, onChange }) => {
  const [minVal, setMinVal] = useState(value.min);
  const [maxVal, setMaxVal] = useState(value.max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const rangeRef = useRef(null);
  const minGap = 10;

  const getPercent = useCallback(
    (val) => Math.round(((val - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);
    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);
    if (rangeRef.current) {
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    if (minVal !== minValRef.current || maxVal !== maxValRef.current) {
      onChange({ min: minVal, max: maxVal });
      minValRef.current = minVal;
      maxValRef.current = maxVal;
    }
  }, [minVal, maxVal, onChange]);

  return (
    <div className="relative w-full h-12 select-none">
      {/* Full track */}
      <div className="absolute z-10 w-full h-1 -translate-y-1/2 bg-gray-300 rounded top-1/2" />

      {/* Active range */}
      <div
        ref={rangeRef}
        className="absolute z-20 h-1 transition-all duration-150 -translate-y-1/2 bg-blue-500 rounded top-1/2"
      />

      {/* Min range input */}
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={minVal}
        onChange={(e) =>
          setMinVal(Math.min(Number(e.target.value), maxVal - minGap))
        }
        className="absolute z-30 w-full -translate-y-1/2 bg-transparent appearance-none pointer-events-auto thumb top-1/2"
        style={{ zIndex: minVal > max - 100 ? 5 : 3 }}
      />

      {/* Max range input */}
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={maxVal}
        onChange={(e) =>
          setMaxVal(Math.max(Number(e.target.value), minVal + minGap))
        }
        className="absolute z-20 w-full -translate-y-1/2 bg-transparent appearance-none pointer-events-auto thumb top-1/2"
        style={{ zIndex: minVal > max - 100 || minVal === maxVal ? 4 : 2 }}
      />

      {/* Labels */}
      <div className="flex justify-between px-1 mt-2 text-sm font-medium text-gray-700">
        <span>${minVal}</span>
        <span>${maxVal}</span>
      </div>

      {/* Styling for range thumbs (Tailwind + custom) */}
      <style jsx>{`
        input[type="range"].thumb::-webkit-slider-thumb {
          height: 16px;
          width: 16px;
          border-radius: 9999px;
          background-color: #3b82f6;
          border: 2px solid white;
          cursor: pointer;
          margin-top: -7px;
          -webkit-appearance: none;
        }

        input[type="range"].thumb::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 9999px;
          background-color: #3b82f6;
          border: 2px solid white;
          cursor: pointer;
        }

        input[type="range"].thumb::-webkit-slider-runnable-track {
          height: 1px;
          background: transparent;
        }

        input[type="range"].thumb::-moz-range-track {
          height: 1px;
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default PriceSlider;
