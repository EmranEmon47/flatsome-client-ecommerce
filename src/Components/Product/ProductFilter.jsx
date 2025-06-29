import React, { useEffect, useState } from "react";

const categories = ["Men", "Women", "Child"];
const subcategories = ["T-Shirts", "Jeans", "Shoes", "Jackets", "Tops"];

const ProductFilter = ({ filters, setFilters }) => {
  const [priceRange, setPriceRange] = useState([0, 500]); // Initial range
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      price: priceRange,
      sort: sortOrder,
    }));
  }, [priceRange, sortOrder]);

  const handleCategoryChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === value ? "" : value,
    }));
  };

  const handleSubcategoryChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      subcategory: prev.subcategory === value ? "" : value,
    }));
  };

  const handleReset = () => {
    setFilters({ category: "", subcategory: "", price: [0, 500], sort: "" });
    setPriceRange([0, 500]);
    setSortOrder("");
  };

  return (
    <div className="sticky p-4 bg-white border rounded shadow-sm top-24 h-fit">
      <h3 className="mb-4 text-lg font-semibold text-[#001d49]">Filters</h3>

      {/* Category */}
      <div className="mb-4">
        <h4 className="mb-2 font-medium">Category</h4>
        {categories.map((cat) => (
          <div key={cat}>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={filters.category === cat}
                onChange={() => handleCategoryChange(cat)}
              />
              <span>{cat}</span>
            </label>
          </div>
        ))}
      </div>

      {/* Subcategory */}
      <div className="mb-4">
        <h4 className="mb-2 font-medium">Subcategory</h4>
        {subcategories.map((sub) => (
          <div key={sub}>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="subcategory"
                value={sub}
                checked={filters.subcategory === sub}
                onChange={() => handleSubcategoryChange(sub)}
              />
              <span>{sub}</span>
            </label>
          </div>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <h4 className="mb-2 font-medium">Price Range</h4>
        <div className="flex items-center gap-2">
          <span>${priceRange[0]}</span>
          <input
            type="range"
            min={0}
            max={1000}
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
          />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span>${priceRange[1]}</span>
          <input
            type="range"
            min={0}
            max={1000}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          />
        </div>
      </div>

      {/* Sort */}
      <div className="mb-4">
        <h4 className="mb-2 font-medium">Sort by</h4>
        <select
          className="w-full p-1 border rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Default</option>
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      {/* Active Filters */}
      <div className="mb-4">
        <h4 className="mb-2 font-medium">Active Filters</h4>
        <div className="flex flex-wrap gap-2">
          {filters.category && (
            <span className="px-2 py-1 text-sm text-white bg-blue-500 rounded">
              {filters.category}
            </span>
          )}
          {filters.subcategory && (
            <span className="px-2 py-1 text-sm text-white bg-green-500 rounded">
              {filters.subcategory}
            </span>
          )}
          {(filters.price[0] > 0 || filters.price[1] < 500) && (
            <span className="px-2 py-1 text-sm text-white bg-purple-500 rounded">
              ${filters.price[0]} - ${filters.price[1]}
            </span>
          )}
          {filters.sort && (
            <span className="px-2 py-1 text-sm text-white bg-yellow-500 rounded">
              {filters.sort === "asc" ? "Low → High" : "High → Low"}
            </span>
          )}
        </div>
      </div>

      {/* Reset Button */}
      <button
        className="w-full px-4 py-2 mt-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
        onClick={handleReset}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default ProductFilter;
