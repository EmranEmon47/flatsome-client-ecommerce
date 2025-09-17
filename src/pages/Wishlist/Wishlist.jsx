import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { TrashIcon } from "@heroicons/react/24/outline";
// import { useAuth } from "../../Context/AuthContext"; // If using Firebase Auth
import Nav from "../../Components/Shared/Nav";

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [wishlistedIds, setWishlistedIds] = useState([]);
  // const { user } = useAuth(); // assuming Firebase auth context

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    const parsed = stored ? JSON.parse(stored) : [];
    setWishlistedIds(parsed);
  }, []);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (wishlistedIds.length === 0) {
        setProducts([]);
        return;
      }
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/products`
        );
        const filtered = res.data.filter((p) => wishlistedIds.includes(p._id));
        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching wishlist products", err);
      }
    };
    fetchWishlistProducts();
  }, [wishlistedIds]);

  const handleRemove = (id) => {
    const updated = wishlistedIds.filter((pid) => pid !== id);
    setWishlistedIds(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="text-black bg-white dark:text-white dark:bg-black">
      <Nav />
      <div className="w-full max-w-[calc(100%-440px)] pt-28 mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6 text-center text-[#001d49]">
          My Wishlist 💖
        </h2>

        {products.length === 0 ? (
          <p className="text-lg text-center text-gray-500">
            Your wishlist is empty. Start adding your favorite products!
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="relative overflow-hidden text-black transition border rounded-lg shadow-sm dark:text-white bg-black/20 dark:bg-white/20 hover:shadow-md"
              >
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    className="object-cover w-full h-64"
                  />
                </Link>

                <div className="p-4 space-y-2">
                  <h5 className="text-sm text-gray-500">
                    {product.category} / {product.subcategory}
                  </h5>
                  <h3 className="text-lg font-medium text-[#001d49]">
                    {product.name}
                  </h3>
                  <p className="text-base font-semibold text-[#d26e4c]">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => handleRemove(product._id)}
                  className="absolute p-2 transition bg-white rounded-full shadow top-2 right-2 hover:bg-red-100"
                  title="Remove from wishlist"
                >
                  <TrashIcon className="w-5 h-5 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div>
          <Link
            to="/all-products"
            className="text-[#ff855c] font-semibold text-lg py-2 px-8 bg-gray-200 dark:bg-white mt-8 hover:text-[#ff6b39]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
