import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../Components/Shared/Nav";
import ProductCard from "../../Components/Product/ProductCard";
import ProductCardModal from "../../Components/Product/ProductQuickViewModal";
import ProductCardSkeleton from "../../Components/Product/ProductCardSkeleton";
import Pagination from "../../Components/Common/Pagination";
import ProductFilter from "../../Components/Product/ProductFilter";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    subcategory: "",
    price: [0, 500],
    sort: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/products`
        );
        setAllProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    let updated = [...allProducts];

    // Filter: Category
    if (filters.category) {
      updated = updated.filter((p) => p.category === filters.category);
    }

    // Filter: Subcategory
    if (filters.subcategory) {
      updated = updated.filter((p) => p.subcategory === filters.subcategory);
    }

    // Filter: Price range
    updated = updated.filter(
      (p) => p.price >= filters.price[0] && p.price <= filters.price[1]
    );

    // Sort
    if (filters.sort === "asc") {
      updated.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "desc") {
      updated.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updated);
    setCurrentPage(1); // reset to first page on filter change
  }, [filters, allProducts]);

  // Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div>
      <Nav />
      <div className="w-full max-w-[calc(100%-440px)] mt-20 mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <hr className="flex-grow border-t border-gray-300" />
          <h2 className="text-2xl font-medium text-gray-600 uppercase whitespace-nowrap">
            All Products
          </h2>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {/* Layout: Filter + Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
          {/* Sidebar filter */}
          <ProductFilter filters={filters} setFilters={setFilters} />

          {/* Product list */}
          <div>
            {loading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: productsPerPage }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : currentProducts.length === 0 ? (
              <p className="text-gray-500">No products match your filters.</p>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                  {currentProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onQuickView={() => setSelectedProduct(product)}
                    />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>

        {/* Quick View Modal */}
        {selectedProduct && (
          <ProductCardModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </div>
  );
};

export default AllProducts;
