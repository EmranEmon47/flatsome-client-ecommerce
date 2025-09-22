import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Nav from "../../Components/Shared/Nav";
import Footer from "../../Components/Shared/Footer";
import { useCart } from "../../Context/CartProvider";
import ColorSelector from "../../Components/Product/ColorSelector";
import SizeSelector from "../../Components/Product/SizeSelector";
import Breadcrumb from "../../Components/Product/Breadcrumb";
import Modal from "../../Components/Common/Modal";
import RelatedProducts from "./RelatedProducts";

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
    return (
      <div className="p-8 text-lg text-gray-500 dark:text-gray-300">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="p-8 text-lg text-red-500 dark:text-red-400">{error}</div>
    );
  if (!product)
    return (
      <div className="p-8 text-red-500 dark:text-red-400">
        Product not found!
      </div>
    );

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
    <div className="relative min-h-screen overflow-hidden text-black bg-white dark:bg-black dark:text-white">
      {/* Red glow top */}
      <div className="pointer-events-none hidden lg:block absolute top-[-50px] left-[-50px] h-60 w-60 bg-red-500 opacity-20 rounded-full blur-3xl"></div>

      {/* Red glow bottom right */}
      <div className="pointer-events-none hidden lg:block absolute bottom-[-50px] right-[-50px] h-72 w-72 bg-red-500 opacity-10 rounded-full blur-3xl"></div>
      <Nav />
      <div className="lg:max-w-[calc(100%-440px)] w-full lg:px-0 px-4 pt-20 lg:pt-28 lg:pb-16 mx-auto ">
        <Breadcrumb
          category={product.category}
          subcategory={product.subcategory}
          name={product.name}
          className="text-gray-700 dark:text-gray-200 "
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image Zoom + Modal */}
          <div>
            <div
              className="relative overflow-hidden border border-gray-300 dark:border-gray-600 cursor-zoom-in"
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
                    previewImage === img
                      ? "border-black dark:border-white"
                      : "border-gray-300 dark:border-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h2 className="mb-2 text-2xl font-medium">{product.name}</h2>
            <p className="mb-1 text-sm text-gray-600 dark:text-gray-300">
              Category: {product.category} → {product.subcategory}
            </p>
            <p className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
              ${product.price.toFixed(2)}
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-base font-medium">Description:</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {product.description}
                </p>
              </div>
              <div>
                <h4 className="text-base font-medium">Material:</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {product.materialInfo}
                </p>
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
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {product.availability}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center mb-4 space-x-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 bg-gray-200 rounded dark:bg-gray-700"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 bg-gray-200 rounded dark:bg-gray-700"
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
        <div className="mt-16 space-y-4">
          <h3 className="text-lg font-semibold ">Product information</h3>
          <p>
            {product.description} Indulge in the timeless elegance of our blush
            pink silk midi dress. Crafted from luxurious silk, this dress drapes
            beautifully and feels incredibly soft against the skin. The delicate
            spaghetti straps and flattering A-line silhouette make it perfect
            for summer weddings or garden parties. The dress also features a
            hidden back zipper for a seamless look and is fully lined for
            comfort. Effortlessly chic and versatile, this dress will become a
            staple in your wardrobe.
          </p>
        </div>
      </div>
      <RelatedProducts />
      <Footer />
      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="flex items-center justify-between space-x-4">
            <button
              onClick={goPrev}
              aria-label="Previous Image"
              className="text-6xl font-bold text-gray-400 select-none dark:text-gray-500"
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
              className="text-6xl font-bold text-gray-400 select-none dark:text-gray-500"
            >
              ›
            </button>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {allImages.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === carouselIndex
                    ? "bg-black dark:bg-white"
                    : "bg-gray-400 dark:bg-gray-600"
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
