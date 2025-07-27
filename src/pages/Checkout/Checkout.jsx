// src/pages/Checkout/Checkout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../../Context/CartProvider";
import { useAuth } from "../../Context/AuthContext";
import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";
import Nav from "../../Components/Shared/Nav";

const Checkout = () => {
  const { cartItems, totalPrice } = useCart();
  const { mongoUser, firebaseUser, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    address: "",
    apartment: "",
    postcode: "",
    city: "",
    phone: "",
    notes: "",
    termsAccepted: false,
  });

  const isFormValid =
    form.address.trim() !== "" &&
    form.city.trim() !== "" &&
    form.postcode.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.termsAccepted;

  useEffect(() => {
    if (!loading && !firebaseUser) {
      navigate("/login", { state: { from: "/checkout" } });
    }
  }, [firebaseUser, loading, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill all required fields and accept the terms.");
      return;
    }

    if (!mongoUser) {
      toast.error("User data not loaded. Please wait or try again.");
      return;
    }

    try {
      const token = await firebaseUser.getIdToken();

      const orderPayload = {
        uid: mongoUser.uid,
        email: mongoUser.email,
        firstName: mongoUser.firstName,
        lastName: mongoUser.lastName,
        cartItems,
        shippingInfo: {
          address: form.address,
          apartment: form.apartment || undefined,
          postcode: form.postcode,
          city: form.city,
          phone: form.phone,
          notes: form.notes || undefined,
          termsAccepted: form.termsAccepted,
          alternate: {},
        },
        totalAmount: totalPrice,
        paymentStatus: "Pending",
      };

      const res = await axiosInstance.post("/orders", orderPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate(`/payment/${res.data._id}`);
    } catch (err) {
      console.error("Checkout error:", err);
      if (err.response) {
        console.error("Response data:", err.response.data);
      }
      toast.error("Failed to place order.");
    }
  };

  if (loading || !mongoUser) return <div>Loading...</div>;

  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-black lg:pt-28">
      <Nav />
      <div className="flex flex-col-reverse w-full gap-6 p-6 mx-auto lg:grid lg:max-w-5xl lg:grid-cols-2">
        <form
          onSubmit={handleSubmit}
          className="px-4 py-4 space-y-4 rounded-lg bg-slate-100 dark:bg-gray-800 lg:p-8"
        >
          <h2 className="mb-4 text-xl font-semibold text-black dark:text-white lg:text-2xl">
            Shipping Information
          </h2>

          <input
            name="address"
            placeholder="Write your address *"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full p-2 text-black bg-white border rounded placeholder:text-gray-400 dark:bg-gray-200"
          />
          <input
            name="apartment"
            placeholder="Apartment, suite, etc. (optional)"
            value={form.apartment}
            onChange={handleChange}
            className="w-full p-2 text-black bg-white border rounded placeholder:text-gray-400 dark:bg-gray-200"
          />
          <input
            name="postcode"
            placeholder="Postcode *"
            value={form.postcode}
            onChange={handleChange}
            required
            className="w-full p-2 text-black bg-white border rounded placeholder:text-gray-400 dark:bg-gray-200"
          />
          <input
            name="city"
            placeholder="City *"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full p-2 text-black bg-white border rounded placeholder:text-gray-400 dark:bg-gray-200"
          />
          <input
            name="phone"
            placeholder="Phone *"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full p-2 text-black bg-white border rounded placeholder:text-gray-400 dark:bg-gray-200"
          />
          <textarea
            name="notes"
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={handleChange}
            className="w-full p-2 text-black bg-white border rounded placeholder:text-gray-400 dark:bg-gray-200"
            rows={3}
          />

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={form.termsAccepted}
              onChange={handleChange}
              required
            />
            <span className="text-black dark:text-white">
              I accept the terms & conditions *
            </span>
          </label>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2 rounded text-white ${
              isFormValid
                ? " bg-gray-800  dark:bg-white text-black dark:text-black transition-colors"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Proceed to Payment
          </button>
        </form>

        <div className="p-6 text-black rounded-md bg-slate-100 dark:text-white dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold">Your Cart</h2>

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="max-h-full space-y-4 overflow-y-auto">
              {cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 pb-2 border-b"
                >
                  <img
                    src={item.primaryImage}
                    alt={item.name}
                    className="object-cover w-16 h-16 rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Color: {item.selectedColor} | Size: {item.selectedSize}
                    </p>
                    <p className="text-sm">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between mt-4 text-lg font-bold">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
