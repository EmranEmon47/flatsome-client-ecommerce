import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance"; // use your axiosInstance here
import { useParams, useNavigate } from "react-router";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        setProductData(res.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
        alert("Product not found");
        navigate("/admin/products/all");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  // Generic input change handler for basic fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  // Additional Images handlers
  const handleImageChange = (idx, value) => {
    const images = productData.additionalImages
      ? [...productData.additionalImages]
      : [];
    images[idx] = value;
    setProductData((prev) => ({ ...prev, additionalImages: images }));
  };

  const handleAddImage = () => {
    const images = productData.additionalImages
      ? [...productData.additionalImages]
      : [];
    if (images.length < 3) {
      images.push("");
      setProductData((prev) => ({ ...prev, additionalImages: images }));
    }
  };

  // Variants handlers
  const handleVariantChange = (index, field, value) => {
    const variants = productData.variants ? [...productData.variants] : [];
    variants[index][field] = value;
    setProductData((prev) => ({ ...prev, variants }));
  };

  const handleAddVariant = () => {
    const variants = productData.variants ? [...productData.variants] : [];
    variants.push({ size: "", colors: [] });
    setProductData((prev) => ({ ...prev, variants }));
  };

  const handleAddColor = (variantIndex) => {
    const variants = productData.variants ? [...productData.variants] : [];
    if (!variants[variantIndex].colors) variants[variantIndex].colors = [];
    variants[variantIndex].colors.push({
      name: "",
      hex: "",
      stock: 0,
    });
    setProductData((prev) => ({ ...prev, variants }));
  };

  const handleColorChange = (variantIndex, colorIndex, field, value) => {
    const variants = productData.variants ? [...productData.variants] : [];
    if (
      variants[variantIndex] &&
      variants[variantIndex].colors &&
      variants[variantIndex].colors[colorIndex]
    ) {
      variants[variantIndex].colors[colorIndex][field] = value;
      setProductData((prev) => ({ ...prev, variants }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/products/${id}`, productData);
      alert("Product updated successfully!");
      navigate("/admin/products/all");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update product");
    }
  };

  if (loading || !productData) return <p>Loading product...</p>;

  return (
    <section className="p-6 bg-white shadow-sm rounded-xl">
      <h2 className="mb-4 text-xl font-semibold">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic fields */}
        {[
          { label: "Product Name", name: "name" },
          { label: "Description", name: "description" },
          { label: "Price", name: "price", type: "number" },
          { label: "Total Stock", name: "totalStock", type: "number" },
          { label: "Material Info", name: "materialInfo" },
          { label: "Primary Image URL", name: "primaryImage" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block font-medium">{label}</label>
            <input
              type={type}
              name={name}
              value={productData[name] || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}

        {/* Category + Subcategory */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Category</label>
            <select
              name="category"
              value={productData.category || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option>Men</option>
              <option>Women</option>
              <option>Child</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Subcategory</label>
            <select
              name="subcategory"
              value={productData.subcategory || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option>T-Shirts</option>
              <option>Jeans</option>
              <option>Shoes</option>
              <option>Jackets</option>
              <option>Tops</option>
            </select>
          </div>
        </div>

        {/* Availability */}
        <div>
          <label className="block font-medium">Availability</label>
          <select
            name="availability"
            value={productData.availability || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option>In Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>

        {/* Additional Images */}
        <div>
          <label className="block font-medium">Additional Images (max 3)</label>
          {(productData.additionalImages || []).map((img, idx) => (
            <input
              key={idx}
              type="text"
              value={img}
              onChange={(e) => handleImageChange(idx, e.target.value)}
              className="w-full p-2 mb-2 border rounded"
              placeholder={`Image ${idx + 1}`}
            />
          ))}
          {(productData.additionalImages?.length ?? 0) < 3 && (
            <button
              type="button"
              onClick={handleAddImage}
              className="px-3 py-1 text-sm text-white bg-blue-600 rounded"
            >
              + Add Image
            </button>
          )}
        </div>

        {/* Variants */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Variants (Size + Colors)</h3>
          {(productData.variants || []).map((variant, vIdx) => (
            <div key={vIdx} className="p-4 space-y-2 border rounded bg-gray-50">
              <input
                type="text"
                placeholder="Size"
                value={variant.size || ""}
                onChange={(e) =>
                  handleVariantChange(vIdx, "size", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
              {(variant.colors || []).map((color, cIdx) => (
                <div key={cIdx} className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Color Name"
                    value={color.name || ""}
                    onChange={(e) =>
                      handleColorChange(vIdx, cIdx, "name", e.target.value)
                    }
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Hex"
                    value={color.hex || ""}
                    onChange={(e) =>
                      handleColorChange(vIdx, cIdx, "hex", e.target.value)
                    }
                    className="p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={color.stock || 0}
                    onChange={(e) =>
                      handleColorChange(vIdx, cIdx, "stock", e.target.value)
                    }
                    className="p-2 border rounded"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddColor(vIdx)}
                className="px-3 py-1 mt-2 text-sm text-white bg-green-600 rounded"
              >
                + Add Color
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddVariant}
            className="px-4 py-2 text-white bg-indigo-600 rounded"
          >
            + Add Variant
          </button>
        </div>

        <button
          type="submit"
          className="px-6 py-2 text-white bg-gray-900 rounded hover:bg-gray-800"
        >
          Update Product
        </button>
      </form>
    </section>
  );
};

export default UpdateProduct;
