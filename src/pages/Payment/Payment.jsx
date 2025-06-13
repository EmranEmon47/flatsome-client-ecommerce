import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import Nav from "../../Components/Shared/Nav";

// Import your cart context hook
import { useCart } from "../../Context/CartProvider";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();

  // Get clearCart function from context
  const { clearCart } = useCart();

  // 👇 Getting the order info passed from Checkout
  const { shippingInfo, totalAmount } = location.state || {};

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!shippingInfo || typeof totalAmount !== "number") {
      toast.error("Missing payment data. Redirecting...");
      navigate("/checkout");
    }
  }, [shippingInfo, totalAmount, navigate]);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    // ✅ Simulate successful payment
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("🎉 Payment successful!");

      // ✅ Save order summary to localStorage
      const orderSummary = {
        orderId: Date.now(), // Simple unique ID
        shippingInfo,
        totalAmount,
      };

      localStorage.setItem("orderSummary", JSON.stringify(orderSummary));

      // ✅ Clear the cart AFTER successful payment
      clearCart();

      // ✅ Redirect to Order Complete
      navigate("/order-complete");
    }, 1500);
  };

  return (
    <div>
      <Nav />
      <div className="max-w-md mx-auto mt-10 p-6 border rounded bg-white shadow">
        <h2 className="text-2xl font-semibold mb-4">Complete Your Payment</h2>

        <form onSubmit={handlePayment} className="space-y-4">
          <div className="p-4 border rounded">
            <CardElement />
          </div>

          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className="w-full bg-[#FF6347] hover:bg-[#EC2D01] text-white py-2 rounded font-semibold disabled:opacity-50"
          >
            {isProcessing
              ? "Processing..."
              : `Pay $${Number(totalAmount).toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
