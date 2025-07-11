import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import Nav from "../../Components/Shared/Nav";
import { useCart } from "../../Context/CartProvider";
import axiosInstance from "../../api/axiosInstance";
import { getAuth } from "firebase/auth";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  const auth = getAuth();

  // Destructure order data from location.state
  const { shippingInfo, totalAmount, orderId } = location.state || {};

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!shippingInfo || typeof totalAmount !== "number" || !orderId) {
      toast.error("Missing payment data. Redirecting...");
      navigate("/checkout");
    }
  }, [shippingInfo, totalAmount, orderId, navigate]);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      // Simulate payment delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update payment status in backend
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      const token = await user.getIdToken();

      await axiosInstance.patch(
        `/orders/${orderId}/payment-status`,
        { status: "Paid" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("🎉 Payment successful!");

      // Save order summary with real orderId to localStorage for OrderComplete page
      const orderSummary = {
        orderId,
        shippingInfo,
        totalAmount,
      };

      localStorage.setItem("orderSummary", JSON.stringify(orderSummary));

      // Clear cart only after successful payment & backend update
      clearCart();

      // Redirect to Order Complete page
      navigate("/order-complete");
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <Nav />
      <div className="max-w-md p-6 mx-auto bg-white border rounded shadow mt-28">
        <h2 className="mb-4 text-2xl font-semibold">Complete Your Payment</h2>

        <form onSubmit={handlePayment} className="space-y-4">
          <div className="p-4 border rounded">
            <CardElement />
          </div>

          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className="w-full bg-[#ff6b51] hover:bg-[#ec0101] text-white py-2 rounded font-semibold disabled:opacity-50"
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
