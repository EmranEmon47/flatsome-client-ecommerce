import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router";

const AdminAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products"); // Use axiosInstance & shortened URL

        console.log("✅ Fetched products:", res.data);

        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.warn("❌ Unexpected response:", res.data);
          setProducts([]);
        }
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/products/${productId}`); // Use axiosInstance here too
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      alert("Product deleted successfully.");
    } catch (err) {
      console.error("❌ Delete failed:", err);
      alert("Failed to delete product.");
    }
  };

  return (
    <section className="p-6 bg-white shadow-sm rounded-xl">
      <h2 className="mb-4 text-xl font-semibold">All Products</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Image</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Stock</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 border">
                    <img
                      src={prod.primaryImage}
                      alt={prod.name}
                      className="object-cover w-16 h-16 rounded"
                    />
                  </td>
                  <td className="p-3 border">{prod.name}</td>
                  <td className="p-3 border">
                    {prod.category} / {prod.subcategory}
                  </td>
                  <td className="p-3 border">${prod.price}</td>
                  <td className="p-3 border">{prod.totalStock}</td>
                  <td className="p-3 space-x-2 border">
                    <button
                      onClick={() =>
                        navigate(`/admin/products/update/${prod._id}`)
                      }
                      className="inline-flex items-center gap-1 px-3 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                    >
                      <FiEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(prod._id)}
                      className="inline-flex items-center gap-1 px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-50"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AdminAllProducts;
