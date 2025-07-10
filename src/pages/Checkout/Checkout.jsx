import React, { useState, useEffect } from "react";
import { useCart } from "../../Context/CartProvider.jsx";
import { useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import Nav from "../../Components/Shared/Nav.jsx";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import axiosInstance from "../../api/axiosInstance";

const auth = getAuth(); // ✅ define globally
const Checkout = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isValid, setIsValid] = useState(false);

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

  useEffect(() => {
    const requiredFields = [
      "address",
      "apartment",
      "postcode",
      "city",
      "phone",
    ];
    const allFilled = requiredFields.every(
      (field) => shippingInfo[field].trim() !== ""
    );
    const nameFilled = firstName.trim() !== "" && lastName.trim() !== "";
    setIsValid(allFilled && shippingInfo.termsAccepted && nameFilled);
  }, [shippingInfo, firstName, lastName]);

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

  const handlePlaceOrder = async () => {
    if (!isValid) {
      toast.error("Please complete all required fields and accept terms.");
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      toast.error("Please log in to place your order.");
      navigate("/login", { state: { from: location } });
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const orderPayload = {
      cartItems,
      shippingInfo: {
        ...shippingInfo,
        firstName,
        lastName,
        email: user.email,
      },
      totalAmount: Number(total.toFixed(2)),
    };

    try {
      const token = await user.getIdToken();
      const res = await axiosInstance.post("/orders", orderPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const savedOrder = res.data;

      if (!savedOrder._id) {
        throw new Error("Failed to get order ID from backend");
      }

      toast.success("Order placed successfully!");

      navigate("/payment", {
        state: {
          shippingInfo: orderPayload.shippingInfo,
          totalAmount: Number(total.toFixed(2)),
          orderId: savedOrder._id, // Pass actual order ID here
        },
      });
    } catch (error) {
      console.error(
        "Order failed:",
        error.response?.data || error.message || error
      );
      toast.error("Failed to place order.");
    }
  };

  return (
    <div>
      <Nav />
      <h1 className="py-6 text-2xl font-medium text-center">
        Checkout Details
      </h1>
      <div className="max-w-[calc(100%-440px)] mx-auto pb-4 grid grid-cols-[1fr_1fr] gap-4">
        {/* Left: Shipping Form */}
        <div className="w-full">
          <h2 className="mb-4 text-xl font-normal">Shipping Information</h2>
          <form className="grid w-full gap-4">
            <input
              value={auth.currentUser?.email || ""}
              disabled
              className="w-full input"
              placeholder="Email"
            />
            <input
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full input"
              placeholder="First Name *"
            />
            <input
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full input"
              placeholder="Last Name *"
            />
            <input
              name="company"
              onChange={handleChange}
              className="w-full input"
              placeholder="Company Name (optional)"
            />
            <select
              name="country"
              onChange={handleChange}
              value={shippingInfo.country}
              className="w-full input"
            >
              <option value="Bangladesh">Bangladesh</option>
            </select>
            <input
              name="address"
              value={shippingInfo.address}
              onChange={handleChange}
              className="w-full input"
              placeholder="Street Address *"
            />
            <input
              name="apartment"
              onChange={handleChange}
              className="w-full input"
              placeholder="Apartment / Suite"
            />
            <input
              name="postcode"
              value={shippingInfo.postcode}
              onChange={handleChange}
              className="w-full input"
              placeholder="Postcode / ZIP *"
            />
            <input
              name="city"
              value={shippingInfo.city}
              onChange={handleChange}
              className="w-full input"
              placeholder="Town / City *"
            />
            <input
              name="phone"
              value={shippingInfo.phone}
              onChange={handleChange}
              className="w-full input"
              placeholder="Phone Number *"
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
              <div className="grid gap-4 p-4 border rounded">
                <input
                  name="alternate.address"
                  onChange={handleChange}
                  className="w-full input"
                  placeholder="Alt. Street Address"
                />
                <input
                  name="alternate.apartment"
                  onChange={handleChange}
                  className="w-full input"
                  placeholder="Alt. Apartment / Suite"
                />
                <input
                  name="alternate.postcode"
                  onChange={handleChange}
                  className="w-full input"
                  placeholder="Alt. Postcode / ZIP"
                />
                <input
                  name="alternate.city"
                  onChange={handleChange}
                  className="w-full input"
                  placeholder="Alt. Town / City"
                />
                <input
                  name="alternate.phone"
                  onChange={handleChange}
                  className="w-full input"
                  placeholder="Alt. Phone Number"
                />
              </div>
            )}

            <textarea
              name="notes"
              onChange={handleChange}
              className="w-full h-20 input"
              placeholder="Order notes (optional)"
            ></textarea>
          </form>
        </div>

        {/* Right: Summary */}
        <div className="sticky w-full p-6 bg-white border top-24 h-fit">
          <h2 className="mb-4 text-xl font-medium">Your Order</h2>
          <ul className="mb-4 text-sm divide-y">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between py-2">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="flex justify-between">
            Subtotal: <span>${subtotal.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            Shipping: <span>${shipping.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            Tax (5%): <span>${tax.toFixed(2)}</span>
          </p>
          <hr className="my-3" />
          <p className="flex justify-between text-lg font-semibold">
            Total: <span>${total.toFixed(2)}</span>
          </p>

          <label className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={shippingInfo.termsAccepted}
              onChange={handleChange}
            />
            I agree to the terms and conditions.
          </label>

          <div className="p-4 mt-6 space-y-2 text-sm bg-gray-100 rounded">
            <h3 className="mb-3 text-lg font-semibold">Confirm Your Order</h3>
            <p>
              Name: {firstName} {lastName}
            </p>
            <p>Email: {auth.currentUser?.email}</p>
            <p>
              Shipping: {shippingInfo.address}, {shippingInfo.city},{" "}
              {shippingInfo.postcode}
            </p>
            <p>Phone: {shippingInfo.phone}</p>
            {shippingInfo.notes && <p>Notes: {shippingInfo.notes}</p>}
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={!isValid}
            className={`mt-6 w-full px-4 py-2 font-semibold rounded ${
              isValid
                ? "bg-[#FF6347] hover:bg-[#EC2D01] text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
