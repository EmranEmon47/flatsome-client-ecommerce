import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../Components/Shared/Nav";
import ProductCard from "../../Components/Product/ProductCard";
import ProductCardModal from "../../Components/Product/ProductQuickViewModal";
import ProductCardSkeleton from "../../Components/Product/ProductCardSkeleton";
import Pagination from "../../Components/Common/Pagination";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

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

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading
            ? Array.from({ length: productsPerPage }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : currentProducts.map((product) => (
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
