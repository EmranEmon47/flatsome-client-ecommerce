import React, { useState } from "react";
import axiosInstance from "../../../api/axiosInstance"; // make sure path is correct
import { useNavigate } from "react-router";

const AddProduct = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
    subcategory: "T-Shirts",
    materialInfo: "Cotton",
    availability: "In Stock",
    totalStock: "",
    primaryImage: "",
    additionalImages: [""],
    variants: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddImage = () => {
    if (productData.additionalImages.length < 3) {
      setProductData((prev) => ({
        ...prev,
        additionalImages: [...prev.additionalImages, ""],
      }));
    }
  };

  const handleImageChange = (idx, value) => {
    const updatedImages = [...productData.additionalImages];
    updatedImages[idx] = value;
    setProductData((prev) => ({
      ...prev,
      additionalImages: updatedImages,
    }));
  };

  const handleAddVariant = () => {
    setProductData((prev) => ({
      ...prev,
      variants: [...prev.variants, { size: "", colors: [] }],
    }));
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...productData.variants];
    updatedVariants[index][field] = value;
    setProductData((prev) => ({ ...prev, variants: updatedVariants }));
  };

  const handleAddColor = (variantIndex) => {
    const updatedVariants = [...productData.variants];
    updatedVariants[variantIndex].colors.push({
      name: "",
      hex: "",
      stock: 0,
    });
    setProductData((prev) => ({ ...prev, variants: updatedVariants }));
  };

  const handleColorChange = (variantIndex, colorIndex, field, value) => {
    const updatedVariants = [...productData.variants];
    updatedVariants[variantIndex].colors[colorIndex][field] = value;
    setProductData((prev) => ({ ...prev, variants: updatedVariants }));
  };

  // New validation function to check variants/colors completeness
  const validateProductData = () => {
    for (const variant of productData.variants) {
      if (!variant.size || variant.size.trim() === "") {
        alert("Please fill the size field for all variants.");
        return false;
      }
      for (const color of variant.colors) {
        if (!color.name || color.name.trim() === "") {
          alert("Please fill the color name field for all colors.");
          return false;
        }
        if (!color.hex || color.hex.trim() === "") {
          alert("Please fill the color hex code field for all colors.");
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before submit
    if (!validateProductData()) return;

    try {
      const res = await axiosInstance.post("/products", productData);
      alert("Product added successfully!");
      navigate("/admin/products/all");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <section className="p-6 bg-white shadow rounded-xl">
      <h2 className="mb-4 text-xl font-semibold">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Fields */}
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
              value={productData[name]}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}

        {/* Category & Subcategory */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Category</label>
            <select
              name="category"
              value={productData.category}
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
              value={productData.subcategory}
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
            value={productData.availability}
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
          {productData.additionalImages.map((img, idx) => (
            <input
              key={idx}
              type="text"
              value={img}
              onChange={(e) => handleImageChange(idx, e.target.value)}
              className="w-full p-2 mb-2 border rounded"
              placeholder={`Image ${idx + 1}`}
            />
          ))}
          {productData.additionalImages.length < 3 && (
            <button
              type="button"
              onClick={handleAddImage}
              className="px-3 py-1 text-sm text-white bg-blue-600 rounded"
            >
              + Add Image
            </button>
          )}
        </div>

        {/* Variants Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Variants (Size + Colors)</h3>
          {productData.variants.map((variant, vIdx) => (
            <div
              key={vIdx}
              className="p-4 space-y-3 border rounded-lg bg-gray-50"
            >
              <input
                type="text"
                placeholder="Size (e.g. 7, 8)"
                value={variant.size}
                onChange={(e) =>
                  handleVariantChange(vIdx, "size", e.target.value)
                }
                className="w-full p-2 border rounded"
                required
              />
              <div className="space-y-2">
                <h4 className="font-medium">Colors</h4>
                {variant.colors.map((color, cIdx) => (
                  <div key={cIdx} className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Color Name"
                      value={color.name}
                      onChange={(e) =>
                        handleColorChange(vIdx, cIdx, "name", e.target.value)
                      }
                      className="p-2 border rounded"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Hex Code"
                      value={color.hex}
                      onChange={(e) =>
                        handleColorChange(vIdx, cIdx, "hex", e.target.value)
                      }
                      className="p-2 border rounded"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Stock"
                      value={color.stock}
                      onChange={(e) =>
                        handleColorChange(vIdx, cIdx, "stock", e.target.value)
                      }
                      className="p-2 border rounded"
                      min={0}
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
          Add Product
        </button>
      </form>
    </section>
  );
};

export default AddProduct;
