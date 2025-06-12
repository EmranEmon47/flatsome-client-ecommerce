import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// Create the cart context
const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);

// CartProvider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add to cart
  const addToCart = (product, quantity) => {
    console.log("Adding to cart:", product);

    const numericPrice =
      typeof product.price === "string"
        ? parseFloat(product.price.replace("$", ""))
        : product.price;

    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.selectedColor === product.selectedColor &&
          item.selectedSize === product.selectedSize
      );

      let updatedCart;

      if (existing) {
        updatedCart = prev.map((item) =>
          item.id === product.id &&
          item.selectedColor === product.selectedColor &&
          item.selectedSize === product.selectedSize
            ? {
                ...item,
                quantity: item.quantity + quantity,
                price: numericPrice,
              }
            : item
        );
      } else {
        updatedCart = [...prev, { ...product, quantity, price: numericPrice }];
      }

      return updatedCart;
    });

    toast.success(
      `${product.name} (${product.selectedColor}, ${product.selectedSize}) added to your cart!`
    );
  };

  // Remove from cart
  const removeFromCart = (productId, selectedColor, selectedSize) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          )
      )
    );
  };

  // ✅ Updated updateQuantity function
  const updateQuantity = (
    productId,
    selectedColor,
    selectedSize,
    newQuantity
  ) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, selectedColor, selectedSize);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Total quantity of items in cart
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total price of all items in cart
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        updateQuantity,
        addToCart,
        removeFromCart,
        clearCart,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
