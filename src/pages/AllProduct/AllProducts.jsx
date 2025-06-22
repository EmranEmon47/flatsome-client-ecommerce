// src/pages/AllProducts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import Nav from "../../Components/Shared/Nav";

const Star = ({ filled }) => (
  <svg
    className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.566-.955L10 0l2.946 5.955 6.566.955-4.756 4.635 1.122 6.545z" />
  </svg>
);

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/products`
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <div>
      <Nav />
      <div className="w-full max-w-[calc(100%-440px)] mt-20 mx-auto">
        {/* Heading */}
        <div className="flex items-center gap-4 mb-8">
          <hr className="flex-grow border-t border-gray-300" />
          <h2 className="text-2xl text-gray-600 font-medium uppercase whitespace-nowrap">
            All Products
          </h2>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {/* Product Grid */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-sm overflow-hidden hover:shadow-lg transition-shadow group relative"
            >
              <Link to={`/product/${product._id}`}>
                <div className="relative">
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    className="w-full h-84 object-cover object-top"
                  />
                </div>
              </Link>

              {/* Product info */}
              <div className="p-4 text-left">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="absolute bottom-1/4 left-1/2 w-full -translate-x-1/2 mb-4 px-2 py-2 text-sm bg-[#445e85] text-white transition-all opacity-0 group-hover:opacity-80"
                >
                  Quick View
                </button>
                <h5 className="text-base text-gray-400 font-normal mb-2">
                  {product.category} / {product.subcategory}
                </h5>
                <h3 className="text-sm font-normal mb-2">{product.name}</h3>
                <div className="flex justify-start mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} filled={i <= (product.rating || 4)} />
                  ))}
                </div>
                <p className="text-sm font-semibold text-gray-800">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedProduct && (
          <div
            className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
              >
                &times;
              </button>

              <img
                src={selectedProduct.primaryImage}
                alt={selectedProduct.name}
                className="w-full h-auto mb-4 rounded object-contain max-h-[80vh]"
              />

              <h3 className="text-xl font-semibold mb-2">
                {selectedProduct.name}
              </h3>
              <p className="text-gray-600 text-lg">
                ${selectedProduct.price.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
