import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../Components/Shared/Nav";
import ProductCard from "../../Components/Product/ProductCard";
import ProductCardModal from "../../Components/Product/ProductQuickViewModal";
import ProductCardSkeleton from "../../Components/Product/ProductCardSkeleton";
import Pagination from "../../Components/Common/Pagination";
import ProductFilter from "../../Components/Product/ProductFilter";
import ProductSearch from "../../Components/Product/ProductSearch";
import { useSearchParams } from "react-router";

const categories = ["Men", "Women", "Child"];
const subcategories = ["T-Shirts", "Jeans", "Shoes", "Jackets", "Tops"];
const availabilityOptions = ["In Stock", "Out of Stock"];
const priceRangeLimits = { min: 0, max: 1000 };

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const [filters, setFilters] = useState({
    category: [],
    subcategory: [],
    availability: [],
    price: { min: priceRangeLimits.min, max: priceRangeLimits.max },
    sortBy: "",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/products`
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="px-1 bg-yellow-200 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Filtering logic
  const filteredProducts = products
    .filter((p) => {
      const matchesCategory =
        filters.category.length === 0 || filters.category.includes(p.category);

      const matchesSubcategory =
        filters.subcategory.length === 0 ||
        filters.subcategory.includes(p.subcategory);

      const matchesAvailability =
        filters.availability.length === 0 ||
        filters.availability.includes(p.availability);

      const matchesPrice =
        p.price >= filters.price.min && p.price <= filters.price.max;

      const matchesSearch =
        !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase());

      return (
        matchesCategory &&
        matchesSubcategory &&
        matchesAvailability &&
        matchesPrice &&
        matchesSearch
      );
    })
    .sort((a, b) => {
      if (filters.sortBy === "priceLowHigh") return a.price - b.price;
      if (filters.sortBy === "priceHighLow") return b.price - a.price;
      return 0;
    });

  // Pagination slicing
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  // Clear all filters handler
  const clearAllFilters = () => {
    setFilters({
      category: [],
      subcategory: [],
      availability: [],
      price: { min: priceRangeLimits.min, max: priceRangeLimits.max },
      sortBy: "",
    });
  };

  // Active filters
  const activeFilters = [
    ...filters.category.map((c) => ({ type: "Category", value: c })),
    ...filters.subcategory.map((sc) => ({ type: "Subcategory", value: sc })),
    ...filters.availability.map((a) => ({ type: "Availability", value: a })),
  ];

  if (
    filters.price.min > priceRangeLimits.min ||
    filters.price.max < priceRangeLimits.max
  ) {
    activeFilters.push({
      type: "Price",
      value: `$${filters.price.min} - $${filters.price.max}`,
    });
  }

  if (filters.sortBy) {
    const label =
      filters.sortBy === "priceLowHigh"
        ? "Price: Low to High"
        : filters.sortBy === "priceHighLow"
        ? "Price: High to Low"
        : filters.sortBy;
    activeFilters.push({ type: "Sort", value: label });
  }

  if (searchTerm) {
    activeFilters.push({ type: "Search", value: searchTerm });
  }

  // Remove filter
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
        price: { min: priceRangeLimits.min, max: priceRangeLimits.max },
      }));
    } else if (type === "Sort") {
      setFilters((prev) => ({ ...prev, sortBy: "" }));
    } else if (type === "Search") {
      setSearchTerm("");
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  };

  return (
    <div>
      <Nav />
      <div className="w-full max-w-[calc(100%-440px)] mt-20 mx-auto flex gap-6">
        {/* Sidebar */}
        <aside className="w-72">
          <ProductFilter
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            subcategories={subcategories}
            availabilityOptions={availabilityOptions}
            priceRange={priceRangeLimits}
          />
        </aside>

        {/* Main content */}
        <main className="flex-1">
          <ProductSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {/* Filter summary & badges */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="mr-auto font-semibold text-gray-600">
              {filteredProducts.length} Products Found
            </div>

            {activeFilters.length > 0 && (
              <>
                {activeFilters.map(({ type, value }, i) => (
                  <button
                    key={`${type}-${value}-${i}`}
                    onClick={() => removeFilter(type, value)}
                    className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    {type}: {value} &times;
                  </button>
                ))}
                <button
                  onClick={clearAllFilters}
                  className="px-3 py-1 ml-2 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Clear All
                </button>
              </>
            )}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: productsPerPage }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              : currentProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={{
                      ...product,
                      name: highlightMatch(product.name, searchTerm),
                    }}
                    onQuickView={() => setSelectedProduct(product)}
                  />
                ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          {/* Modal */}
          {selectedProduct && (
            <ProductCardModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AllProducts;
