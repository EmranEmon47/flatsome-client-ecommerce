import React, { useState } from "react";
import { useCart } from "../../Context/CartProvider.jsx";
import { useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import Nav from "../../Components/Shared/Nav.jsx";
import { useAuth } from "../../Context/AuthContext.jsx";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [shippingInfo, setShippingInfo] = useState({
    company: "",
    country: "Bangladesh",
    address: "",
    apartment: "",
    postcode: "",
    city: "",
    phone: "",
    shipToDifferent: false,
    alternate: {
      address: "",
      apartment: "",
      postcode: "",
      city: "",
      phone: "",
    },
    notes: "",
    termsAccepted: false,
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 5.0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("alternate.")) {
      const field = name.split(".")[1];
      setShippingInfo((prev) => ({
        ...prev,
        alternate: { ...prev.alternate, [field]: value },
      }));
    } else {
      setShippingInfo((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handlePlaceOrder = () => {
    if (!shippingInfo.termsAccepted) {
      toast.error("Please accept the terms and conditions.");
      return;
    }

    if (!currentUser) {
      toast.error("Please log in to place your order.");
      navigate("/login", { state: { from: location } });
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // Future: Save data to database here
    clearCart();
    toast.success("🎉 Order placed successfully!");
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div>
      <Nav />
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Shipping Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <form className="grid gap-4">
            <input
              value={currentUser?.email || ""}
              disabled
              className="input"
              placeholder="Email"
            />
            <input
              value={currentUser?.firstName || ""}
              disabled
              className="input"
              placeholder="First Name"
            />
            <input
              value={currentUser?.lastName || ""}
              disabled
              className="input"
              placeholder="Last Name"
            />
            <input
              name="company"
              onChange={handleChange}
              className="input"
              placeholder="Company Name (optional)"
            />
            <select
              name="country"
              onChange={handleChange}
              value={shippingInfo.country}
              className="input"
            >
              <option value="Bangladesh">Bangladesh</option>
              {/* Add more countries as needed */}
            </select>
            <input
              name="address"
              onChange={handleChange}
              className="input"
              placeholder="Street Address"
            />
            <input
              name="apartment"
              onChange={handleChange}
              className="input"
              placeholder="Apartment / Suite"
            />
            <input
              name="postcode"
              onChange={handleChange}
              className="input"
              placeholder="Postcode / ZIP"
            />
            <input
              name="city"
              onChange={handleChange}
              className="input"
              placeholder="Town / City"
            />
            <input
              name="phone"
              onChange={handleChange}
              className="input"
              placeholder="Phone Number"
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="shipToDifferent"
                onChange={handleChange}
              />
              Ship to a different address?
            </label>

            {shippingInfo.shipToDifferent && (
              <div className="grid gap-4 border p-4 rounded">
                <input
                  name="alternate.address"
                  onChange={handleChange}
                  className="input"
                  placeholder="Alt. Street Address"
                />
                <input
                  name="alternate.apartment"
                  onChange={handleChange}
                  className="input"
                  placeholder="Alt. Apartment / Suite"
                />
                <input
                  name="alternate.postcode"
                  onChange={handleChange}
                  className="input"
                  placeholder="Alt. Postcode / ZIP"
                />
                <input
                  name="alternate.city"
                  onChange={handleChange}
                  className="input"
                  placeholder="Alt. Town / City"
                />
                <input
                  name="alternate.phone"
                  onChange={handleChange}
                  className="input"
                  placeholder="Alt. Phone Number"
                />
              </div>
            )}

            <textarea
              name="notes"
              onChange={handleChange}
              className="input"
              rows="4"
              placeholder="Order notes (optional)"
            ></textarea>
          </form>
        </div>

        {/* Right: Order Summary + Confirm Order Card */}
        <div className="border rounded p-6 sticky top-24 h-fit">
          <h2 className="text-xl font-semibold mb-4">Your Order</h2>
          <ul className="divide-y mb-4">
            {cartItems.map((item, index) => (
              <li key={index} className="py-2 text-sm">
                <div className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping:</span>
            <span>${shipping.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (5%):</span>
            <span>${tax.toFixed(2)}</span>
          </p>
          <hr className="my-3" />
          <p className="font-semibold flex justify-between text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </p>

          <label className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              name="termsAccepted"
              onChange={handleChange}
            />
            I agree to the terms and conditions.
          </label>

          {/* Confirm Order Card */}
          <div className="bg-gray-100 p-4 rounded mt-6">
            <h3 className="font-semibold text-lg mb-3">Confirm Your Order</h3>
            <div className="text-sm space-y-2">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {currentUser?.firstName} {currentUser?.lastName}
              </p>
              <p>
                <span className="font-medium">Email:</span> {currentUser?.email}
              </p>
              <p>
                <span className="font-medium">Shipping Address:</span>{" "}
                {shippingInfo.address}, {shippingInfo.city},{" "}
                {shippingInfo.postcode}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {shippingInfo.phone}
              </p>
              {shippingInfo.notes && (
                <p>
                  <span className="font-medium">Notes:</span>{" "}
                  {shippingInfo.notes}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full px-4 py-2 bg-[#FF6347] hover:bg-[#EC2D01] text-white font-semibold rounded"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
