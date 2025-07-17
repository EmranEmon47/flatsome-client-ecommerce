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
    <div className="relative w-full select-none h-14">
      {/* Full track */}
      <div className="absolute left-0 right-0 z-10 h-1 -translate-y-1/2 bg-gray-200 rounded top-1/2" />

      {/* Active range */}
      <div
        ref={rangeRef}
        className="absolute z-20 h-1 transition-all duration-150 -translate-y-1/2 bg-blue-500 rounded top-1/2"
      />

      {/* Range Inputs */}
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={minVal}
        onChange={(e) =>
          setMinVal(Math.min(Number(e.target.value), maxVal - minGap))
        }
        className="absolute w-full top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none z-30 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:-mt-0
          [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto"
        style={{ zIndex: minVal > max - 100 ? 50 : 30 }}
      />

      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={maxVal}
        onChange={(e) =>
          setMaxVal(Math.max(Number(e.target.value), minVal + minGap))
        }
        className="absolute w-full top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none z-30 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:-mt-0
          [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto"
        style={{ zIndex: minVal > max - 100 || minVal === maxVal ? 40 : 20 }}
      />

      {/* Min and Max labels */}
      <div className="flex justify-between px-1 mt-3 text-xs font-normal text-gray-700 dark:text-white">
        <span>${minVal}</span>
        <span>${maxVal}</span>
      </div>
    </div>
  );
};

export default PriceSlider;
