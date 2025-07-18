import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../Components/Shared/Nav";
import Footer from "../../Components/Shared/Footer";
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
const priceRangeLimits = { min: 0, max: 500 };

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

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
    if (!query || !text) return text;
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
        !searchTerm ||
        [p.name, p.description, p.category, p.subcategory].some((field) =>
          new RegExp(`\\b${searchTerm}\\b`, "i").test(field)
        );

      return (
        matchesCategory &&
        matchesSubcategory &&
        matchesAvailability &&
        matchesPrice &&
        matchesSearch
      );
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "priceLowHigh":
          return a.price - b.price;
        case "priceHighLow":
          return b.price - a.price;
        case "nameAZ":
          return a.name.localeCompare(b.name);
        case "nameZA":
          return b.name.localeCompare(a.name);
        case "bestSelling":
          return (b.sold || 0) - (a.sold || 0);
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="min-h-screen text-black bg-white dark:bg-black dark:text-white">
      {/* Red glow top */}
      <div className="pointer-events-none absolute top-[-50px] left-[-50px] h-60 w-60 bg-red-500 opacity-20 rounded-full blur-3xl"></div>

      {/* Red glow bottom right */}
      <div className="pointer-events-none absolute bottom-[-50px] right-[-50px] h-72 w-72 bg-red-500 opacity-10 rounded-full blur-3xl"></div>
      <Nav />
      <div className="w-full max-w-[calc(100%-440px)] pt-28 pb-8 mx-auto flex gap-6">
        <aside className="w-72">
          <ProductFilter
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            subcategories={subcategories}
            availabilityOptions={availabilityOptions}
            priceRange={priceRangeLimits}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </aside>

        <main className="flex-1">
          <ProductSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {/* Sort By (top of grid) */}
          <div className="flex items-center justify-end mb-4">
            <div className="mr-auto font-semibold text-gray-600 dark:text-gray-200">
              {filteredProducts.length} Products Found
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="sortBy"
                className="text-sm font-medium text-black dark:text-white"
              >
                Sort By:
              </label>
              <select
                id="sortBy"
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
                }
                className="p-2 text-black border border-gray-300 rounded dark:text-white hover:bg-white backdrop-blur-lg bg-white/70 dark:bg-black/70"
              >
                <option value="">Default sorting</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="nameAZ">A–Z</option>
                <option value="nameZA">Z–A</option>
                <option value="bestSelling">Best Selling</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                      description: highlightMatch(
                        product.description,
                        searchTerm
                      ),
                    }}
                    onQuickView={() => setSelectedProduct(product)}
                  />
                ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          {selectedProduct && (
            <ProductCardModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AllProducts;
