import React from "react";
import { useCart } from "../../Context/CartProvider.jsx";
import { useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import Nav from "../../Components/Shared/Nav.jsx";
import { useAuth } from "../../Context/AuthContext.jsx"; // 🔹 import useAuth
import {} from "react-router";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { currentUser } = useAuth(); // 🔹 get currentUser
  const navigate = useNavigate();
  const location = useLocation();

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!currentUser) {
      toast.error("Please log in to place your order.");
      navigate("/login", { state: { from: location } });

      return;
    }

    // ✅ User is logged in — proceed with order
    clearCart();
    toast.success("🎉 Order placed successfully!");

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div>
      <Nav />
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y">
              {cartItems.map((item, index) => (
                <li key={index} className="py-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Color: {item.selectedColor} | Size: {item.selectedSize}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-right">
              <p className="text-xl font-semibold">
                Total: ${totalPrice.toFixed(2)}
              </p>
              <button
                onClick={handlePlaceOrder}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
