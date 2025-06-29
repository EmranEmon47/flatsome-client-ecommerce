import React from "react";
import PriceSlider from "./PriceSlider";

const ProductFilter = ({
  filters,
  setFilters,
  categories,
  subcategories,
  availabilityOptions,
  priceRange,
}) => {
  // Multi-select handler
  const handleMultiSelect = (filterKey, value) => {
    const currentValues = filters[filterKey];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    setFilters((prev) => ({ ...prev, [filterKey]: newValues }));
  };

  // Price input box handlers
  const handlePriceMinChange = (e) => {
    let val = Number(e.target.value);
    if (val < priceRange.min) val = priceRange.min;
    if (val > filters.price.max - 10) val = filters.price.max - 10;
    setFilters((prev) => ({
      ...prev,
      price: { min: val, max: prev.price.max },
    }));
  };

  const handlePriceMaxChange = (e) => {
    let val = Number(e.target.value);
    if (val > priceRange.max) val = priceRange.max;
    if (val < filters.price.min + 10) val = filters.price.min + 10;
    setFilters((prev) => ({
      ...prev,
      price: { min: prev.price.min, max: val },
    }));
  };

  const handleSortChange = (e) => {
    setFilters((prev) => ({ ...prev, sortBy: e.target.value }));
  };

  const handlePriceSliderChange = (range) => {
    setFilters((prev) => ({ ...prev, price: range }));
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-sm sticky top-24 w-full max-w-[240px] h-fit">
      <h3 className="mb-4 text-lg font-semibold">Filter Products</h3>

      {/* Category Filter */}
      <div className="mb-4">
        <h4 className="mb-2 font-medium">Category</h4>
        {categories.map((cat) => (
          <label key={cat} className="flex items-center mb-1 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.category.includes(cat)}
              onChange={() => handleMultiSelect("category", cat)}
              className="mr-2"
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Subcategory Filter */}
      <div className="mb-4">
        <h4 className="mb-2 font-medium">Subcategory</h4>
        {subcategories.map((subcat) => (
          <label key={subcat} className="flex items-center mb-1 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.subcategory.includes(subcat)}
              onChange={() => handleMultiSelect("subcategory", subcat)}
              className="mr-2"
            />
            {subcat}
          </label>
        ))}
      </div>

      {/* Availability Filter */}
      <div className="mb-4">
        <h4 className="mb-2 font-medium">Availability</h4>
        {availabilityOptions.map((avail) => (
          <label key={avail} className="flex items-center mb-1 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.availability.includes(avail)}
              onChange={() => handleMultiSelect("availability", avail)}
              className="mr-2"
            />
            {avail}
          </label>
        ))}
      </div>

      {/* Price Filter Section */}
      <div className="mb-6">
        <h4 className="mb-2 font-medium">Price Range</h4>

        {/* Input boxes */}
        <div className="flex gap-4 mb-3">
          <input
            type="number"
            min={priceRange.min}
            max={filters.price.max - 10}
            value={filters.price.min}
            onChange={handlePriceMinChange}
            className="w-1/2 p-1 border rounded"
            aria-label="Minimum price"
          />
          <input
            type="number"
            min={filters.price.min + 10}
            max={priceRange.max}
            value={filters.price.max}
            onChange={handlePriceMaxChange}
            className="w-1/2 p-1 border rounded"
            aria-label="Maximum price"
          />
        </div>

        {/* Dual Thumb Slider */}
        <PriceSlider
          min={priceRange.min}
          max={priceRange.max}
          value={filters.price}
          onChange={handlePriceSliderChange}
        />
      </div>

      {/* Sort By */}
      <div>
        <h4 className="mb-2 font-medium">Sort By</h4>
        <select
          value={filters.sortBy}
          onChange={handleSortChange}
          className="w-full p-2 border rounded"
        >
          <option value="">None</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;
