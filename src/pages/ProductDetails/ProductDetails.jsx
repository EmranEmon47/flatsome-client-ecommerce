import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Nav from "../../Components/Shared/Nav";
import { useCart } from "../../Context/CartProvider";
import ColorSelector from "../../Components/Product/ColorSelector";
import SizeSelector from "../../Components/Product/SizeSelector";
import Breadcrumb from "../../Components/Product/Breadcrumb";
import Modal from "../../Components/Common/Modal";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/products/${id}`
      );
      setProduct(res.data);
      setPreviewImage(res.data.primaryImage);
      setCarouselIndex(0);
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
    return <div className="p-8 text-lg text-gray-500">Loading...</div>;
  if (error) return <div className="p-8 text-lg text-red-500">{error}</div>;
  if (!product)
    return <div className="p-8 text-red-500">Product not found.</div>;

  // Extract unique colors and sizes
  const allColors = product.variants.flatMap((v) => v.colors || []);
  const uniqueColorsMap = new Map();
  for (const color of allColors) {
    const key = `${color.name}-${color.hex}`;
    if (!uniqueColorsMap.has(key)) {
      uniqueColorsMap.set(key, { name: color.name, hex: color.hex });
    }
  }
  const uniqueColors = Array.from(uniqueColorsMap.values());
  const uniqueSizes = [...new Set(product.variants.map((v) => v.size))];
  const allImages = [product.primaryImage, ...(product.additionalImages || [])];

  const goNext = () => setCarouselIndex((i) => (i + 1) % allImages.length);
  const goPrev = () =>
    setCarouselIndex((i) => (i - 1 + allImages.length) % allImages.length);

  return (
    <div className="min-h-screen text-black bg-white">
      <Nav />
      <div className="max-w-[calc(100%-440px)] mt-20 mx-auto p-8">
        <Breadcrumb
          category={product.category}
          subcategory={product.subcategory}
          name={product.name}
          className="text-gray-700"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Image Zoom + Modal */}
          <div>
            <div
              className="relative overflow-hidden border border-gray-300 cursor-zoom-in"
              style={{ maxHeight: 600 }}
              onClick={() => setIsModalOpen(true)}
            >
              <img
                src={previewImage}
                alt={product.name}
                className="w-full h-[500px] object-contain transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>

            <div className="flex gap-2 mt-2">
              {allImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  onClick={() => setPreviewImage(img)}
                  className={`w-20 h-20 object-cover cursor-pointer border ${
                    previewImage === img ? "border-black" : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h2 className="mb-2 text-2xl font-medium bg-testRed">
              {product.name}
            </h2>
            <p className="mb-1 text-sm text-gray-600">
              Category: {product.category} → {product.subcategory}
            </p>
            <p className="mb-4 text-xl font-semibold text-gray-800">
              ${product.price.toFixed(2)}
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-base font-medium">Description:</h4>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>

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
                <h4 className="text-base font-medium">Availability:</h4>
                <p className="text-sm text-gray-600">{product.availability}</p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center mb-4 space-x-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`px-4 py-2 text-white rounded transition ${
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

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="flex items-center justify-between space-x-4">
            <button
              onClick={goPrev}
              aria-label="Previous Image"
              className="text-6xl font-bold text-gray-400 select-none"
            >
              ‹
            </button>

            <img
              src={allImages[carouselIndex]}
              alt={`carousel-${carouselIndex}`}
              className="max-h-[500px] max-w-full object-contain rounded"
            />

            <button
              onClick={goNext}
              aria-label="Next Image"
              className="text-6xl font-bold text-gray-400 select-none"
            >
              ›
            </button>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {allImages.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === carouselIndex ? "bg-black" : "bg-gray-400"
                }`}
                onClick={() => setCarouselIndex(i)}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductDetails;
