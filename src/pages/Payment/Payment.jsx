import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../Context/AuthContext";
import { useCart } from "../../Context/CartProvider";
import axiosInstance from "../../api/axiosInstance";
import Nav from "../../Components/Shared/Nav";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      "::placeholder": {
        color: "#a0aec0",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const Payment = () => {
  const { orderId } = useParams();
  const { firebaseUser } = useAuth();
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    if (!firebaseUser) {
      navigate("/login");
      return;
    }

    const fetchClientSecret = async () => {
      try {
        const token = await firebaseUser.getIdToken();
        const response = await axiosInstance.post(
          `/payments/create-payment-intent/${orderId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        setError("Failed to initialize payment. Please try again.");
        console.error("Error fetching clientSecret:", err);
      }
    };

    fetchClientSecret();
  }, [firebaseUser, navigate, orderId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet.");
      return;
    }

    const zipRegex = /^\d{5}$/;
    if (!postalCode.trim() || !zipRegex.test(postalCode.trim())) {
      setError("Please enter a valid 5-digit ZIP code.");
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card details not found.");
      setProcessing(false);
      return;
    }

    try {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: firebaseUser.displayName || "Customer",
            email: firebaseUser.email,
            address: {
              postal_code: postalCode.trim(),
              country: "US",
            },
          },
        },
      });

      if (payload.error) {
        setError(`Payment failed: ${payload.error.message}`);
        setProcessing(false);
      } else {
        setSucceeded(true);
        setProcessing(false);

        const token = await firebaseUser.getIdToken();
        await axiosInstance.patch(
          `/orders/${orderId}/payment-status`,
          { paymentStatus: "Paid" },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        clearCart();

        setTimeout(() => {
          navigate(`/order-complete/${orderId}`);
        }, 2000);
      }
    } catch (err) {
      setError("Payment processing error. Try again.");
      setProcessing(false);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-100 dark:bg-black lg:pt-36">
      <Nav />
      <div className="max-w-md p-6 mx-auto text-black bg-white rounded-md shadow-md dark:text-white dark:bg-gray-600">
        <h2 className="mb-4 text-2xl font-semibold text-center">
          Complete Payment
        </h2>

        {error && (
          <div className="p-2 mb-4 text-red-700 bg-red-100 border border-red-300 rounded">
            {error}
          </div>
        )}

        {succeeded ? (
          <div className="p-4 text-green-600 bg-green-100 border border-green-300 rounded">
            Payment succeeded! Redirecting...
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <label className="block mb-2 font-medium" htmlFor="postalCode">
              ZIP Code <span className="text-red-600">*</span>
            </label>
            <input
              id="postalCode"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
              maxLength={5}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
              placeholder="e.g. 12345"
            />

            <label className="block mb-2 font-medium">Card Details</label>
            <div className="p-3 mb-6 text-black bg-white border border-gray-300 rounded">
              <CardElement
                className="text-black"
                options={CARD_ELEMENT_OPTIONS}
              />
            </div>

            <button
              type="submit"
              disabled={!stripe || !clientSecret || processing}
              className={`w-full py-2 px-4 text-white rounded ${
                processing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {processing ? "Processing..." : "Pay Now"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Payment;
