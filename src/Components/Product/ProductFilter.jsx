import React from "react";
import PriceSlider from "./PriceSlider";

const ProductFilter = ({
  filters,
  setFilters,
  categories,
  subcategories,
  availabilityOptions,
  priceRange,
  searchTerm,
  setSearchTerm,
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

  const handlePriceSliderChange = (range) => {
    setFilters((prev) => ({ ...prev, price: range }));
  };

  // for active filer
  const clearAllFilters = () => {
    setFilters({
      category: [],
      subcategory: [],
      availability: [],
      price: { min: priceRange.min, max: priceRange.max },
      sortBy: "",
    });
    setSearchTerm("");
  };

  const removeFilter = (type, value) => {
    if (type === "Category") {
      setFilters((prev) => ({
        ...prev,
        category: prev.category.filter((c) => c !== value),
      }));
    } else if (type === "Subcategory") {
      setFilters((prev) => ({
        ...prev,
        subcategory: prev.subcategory.filter((sc) => sc !== value),
      }));
    } else if (type === "Availability") {
      setFilters((prev) => ({
        ...prev,
        availability: prev.availability.filter((a) => a !== value),
      }));
    } else if (type === "Price") {
      setFilters((prev) => ({
        ...prev,
        price: { min: priceRange.min, max: priceRange.max },
      }));
    } else if (type === "Sort") {
      setFilters((prev) => ({ ...prev, sortBy: "" }));
    } else if (type === "Search") {
      setSearchTerm("");
    }
  };

  const activeFilters = [
    ...filters.category.map((c) => ({ type: "Category", value: c })),
    ...filters.subcategory.map((sc) => ({ type: "Subcategory", value: sc })),
    ...filters.availability.map((a) => ({ type: "Availability", value: a })),
  ];

  if (
    filters.price.min > priceRange.min ||
    filters.price.max < priceRange.max
  ) {
    activeFilters.push({
      type: "Price",
      value: `$${filters.price.min} - ${filters.price.max}`,
    });
  }

  const sortLabels = {
    priceLowHigh: "Price: Low to High",
    priceHighLow: "Price: High to Low",
    nameAZ: "Name: A–Z",
    nameZA: "Name: Z–A",
    bestSelling: "Best Selling",
    newest: "Newest",
    oldest: "Oldest",
  };

  if (filters.sortBy) {
    activeFilters.push({
      type: "Sort",
      value: sortLabels[filters.sortBy] || filters.sortBy,
    });
  }
  if (searchTerm) {
    activeFilters.push({ type: "Search", value: searchTerm });
  }

  return (
    <div className="p-4 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 rounded-md shadow-sm sticky top-24 w-full max-w-[240px] h-fit">
      <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
        Filter Products
      </h3>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="mb-4">
          <h4 className="mb-2 font-semibold text-black dark:text-white">
            Active Filters
          </h4>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map(({ type, value }, i) => (
              <button
                key={`${type}-${value}-${i}`}
                onClick={() => removeFilter(type, value)}
                className="flex items-center gap-1 px-2 py-1 text-sm text-black bg-gray-200 rounded hover:bg-gray-300 dark:text-bkack"
              >
                {value} &times;
              </button>
              // {type}:
            ))}
            <button
              onClick={clearAllFilters}
              className="px-2 py-1 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-700"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Price Filter Section */}
      <div className="mb-2">
        <h4 className="mb-2 font-medium text-black dark:text-white">
          Price Range
        </h4>

        {/* Input boxes */}
        <div className="flex gap-4 ">
          <input
            type="number"
            min={priceRange.min}
            max={filters.price.max - 10}
            value={filters.price.min}
            onChange={handlePriceMinChange}
            className="w-1/2 px-2 text-black bg-white border rounded dark:text-white dark:bg-white/5 dark:text-whit3e dark:border-gray-600"
            aria-label="Minimum price"
          />
          <input
            type="number"
            min={filters.price.min + 10}
            max={priceRange.max}
            value={filters.price.max}
            onChange={handlePriceMaxChange}
            className="w-1/2 p-2 text-black bg-white border rounded dark:text-white dark:bg-white/5 dark:text-whit3e dark:border-gray-600"
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
    </div>
  );
};

export default ProductFilter;
