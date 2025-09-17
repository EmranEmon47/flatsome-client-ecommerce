import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "./AuthContext";
import { showToast } from "..//Components/Shared/showToast.jsx";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { firebaseUser, loading } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    // Initialize from localStorage if logged out
    try {
      const localCart = JSON.parse(localStorage.getItem("cartItems"));
      return localCart || [];
    } catch {
      return [];
    }
  });
  const [isSyncing, setIsSyncing] = useState(false);

  // Fetch cart from backend when logged in
  useEffect(() => {
    const fetchCart = async () => {
      if (!firebaseUser) {
        console.log("[CartProvider] No user logged in, clear cart");
        setCartItems([]);
        return;
      }

      setIsSyncing(true);
      try {
        const token = await firebaseUser.getIdToken();
        const res = await axiosInstance.get("/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(
          "[CartProvider] Fetched cart from backend:",
          res.data?.items
        );
        setCartItems(res.data?.items || []);
      } catch (error) {
        console.error("[CartProvider] Failed to fetch cart:", error);
        toast.error("Failed to load cart data.");
      } finally {
        setIsSyncing(false);
      }
    };

    if (!loading) {
      fetchCart();
    }
  }, [firebaseUser, loading]);

  // Save cart to backend when cartItems change and user is logged in
  // Otherwise save to localStorage when logged out
  useEffect(() => {
    if (isSyncing) return; // Don't save while loading from backend

    if (firebaseUser) {
      const saveCart = async () => {
        try {
          const token = await firebaseUser.getIdToken();
          await axiosInstance.put(
            "/cart",
            { items: cartItems },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log("[CartProvider] Saved cart to backend");
        } catch (error) {
          console.error("[CartProvider] Failed to save cart:", error);
          toast.error("Failed to sync cart.");
        }
      };

      saveCart();
    } else {
      // Save to localStorage when logged out
      try {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        console.log("[CartProvider] Saved cart to localStorage");
      } catch (err) {
        console.error(
          "[CartProvider] Failed to save cart to localStorage:",
          err
        );
      }
    }
  }, [cartItems, firebaseUser, isSyncing]);

  // Clear cart on logout (firebaseUser becomes null)
  useEffect(() => {
    if (!firebaseUser) {
      setCartItems([]);
      localStorage.removeItem("cartItems");
      console.log("[CartProvider] User logged out - cart cleared");
    }
  }, [firebaseUser]);

  // Add to cart
  const addToCart = (product, quantity) => {
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

      if (existing) {
        return prev.map((item) =>
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
        return [...prev, { ...product, quantity, price: numericPrice }];
      }
    });

    showToast(
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

  // Update quantity
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

  // Clear cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
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
