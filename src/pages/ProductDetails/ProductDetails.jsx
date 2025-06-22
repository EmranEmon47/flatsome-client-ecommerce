import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Nav from "../../Components/Shared/Nav";
import { useCart } from "../../Context/CartProvider";
import ColorSelector from "../../Components/Product/ColorSelector";
import SizeSelector from "../../Components/Product/SizeSelector";
import Breadcrumb from "../../Components/Product/Breadcrumb";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/products/${id}`
      );
      setProduct(res.data);
      setPreviewImage(res.data.primaryImage);
      console.log("Variants from backend:", res.data.variants);
    } catch {
      setError("Failed to fetch product.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAdd = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select color and size.");
      return;
    }

    addToCart({ ...product, selectedColor, selectedSize }, quantity);
  };

  if (loading)
    return <div className="p-8 text-gray-500 text-lg">Loading...</div>;
  if (error) return <div className="p-8 text-red-500 text-lg">{error}</div>;
  if (!product)
    return <div className="p-8 text-red-500">Product not found.</div>;

  // ✅ Extract unique colors
  const allColors = product.variants.flatMap((v) => v.colors || []);
  const uniqueColorsMap = new Map();
  for (const color of allColors) {
    const key = `${color.name}-${color.hex}`;
    if (!uniqueColorsMap.has(key)) {
      uniqueColorsMap.set(key, { name: color.name, hex: color.hex });
    }
  }
  const uniqueColors = Array.from(uniqueColorsMap.values());

  // ✅ Extract unique sizes
  const uniqueSizes = [...new Set(product.variants.map((v) => v.size))];

  return (
    <div>
      <Nav />
      <div className="max-w-[calc(100%-440px)] mt-20 mx-auto p-8">
        {/* Breadcrumb here */}
        <Breadcrumb
          category={product.category}
          subcategory={product.subcategory}
          name={product.name}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Preview with Swapping */}
          <div>
            <img
              src={previewImage}
              alt={product.name}
              className="w-full max-h-[600px] object-contain mb-4 border"
            />
            <div className="flex gap-2">
              {[product.primaryImage, ...(product.additionalImages || [])].map(
                (img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`thumb-${i}`}
                    onClick={() => setPreviewImage(img)}
                    className={`w-20 h-20 object-cover cursor-pointer border ${
                      previewImage === img ? "border-black" : "border-gray-300"
                    }`}
                  />
                )
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h2 className="text-2xl font-medium mb-2">{product.name}</h2>
            <p className="text-gray-600 text-sm mb-1">
              Category: {product.category} → {product.subcategory}
            </p>
            <p className="text-xl text-gray-800 font-semibold mb-4">
              ${product.price.toFixed(2)}
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-base font-medium text-black">
                  Description:
                </h4>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>

              {/* ✅ ColorSelector with updated structure */}
              <ColorSelector
                colors={uniqueColors}
                selectedColor={selectedColor}
                onSelectColor={setSelectedColor}
              />

              <SizeSelector
                sizes={uniqueSizes}
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
              />

              <div>
                <h4 className="text-base font-medium text-black">
                  Availability:
                </h4>
                <p className="text-sm text-gray-600">{product.availability}</p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center mb-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 py-1 bg-gray-200"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2 py-1 bg-gray-200"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`px-4 py-2 text-white ${
                  !selectedColor || !selectedSize
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#d26e4c] hover:bg-[#ff6b39]"
                }`}
                disabled={!selectedColor || !selectedSize}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
