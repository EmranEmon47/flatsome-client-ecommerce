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

      // Trigger toast after state is set

      return updatedCart;
    });
    toast.success(
      `${product.name} (${product.selectedColor}, ${product.selectedSize}) added to your cart!`
    );
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };
  // Add this function inside CartProvider component:
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      // Remove item if quantity is zero or less
      removeFromCart(productId);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
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
