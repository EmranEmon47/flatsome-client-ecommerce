import React, { useState, useEffect } from "react";
import { useCart } from "../../Context/CartProvider.jsx";
import { useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import Nav from "../../Components/Shared/Nav.jsx";
import { useAuth } from "../../Context/AuthContext.jsx";

const Checkout = () => {
  const { cartItems } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [firstName, setFirstName] = useState(currentUser?.firstName || "");
  const [lastName, setLastName] = useState(currentUser?.lastName || "");
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

  const handlePlaceOrder = () => {
    if (!isValid) {
      toast.error("Please complete all required fields and accept terms.");
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

    navigate("/payment", {
      state: {
        shippingInfo: {
          ...shippingInfo,
          firstName,
          lastName,
          email: currentUser?.email || "",
        },
        totalAmount: Number(total.toFixed(2)),
      },
    });
  };

  return (
    <div>
      <Nav />
      <h1 className="text-2xl text-center font-medium py-6">
        Checkout Details
      </h1>
      <div className="max-w-[calc(100%-440px)] mx-auto pb-4 grid grid-cols-[1fr_1fr] gap-4">
        {/* Left: Shipping Form */}
        <div className="w-full">
          <h2 className="text-xl font-normal mb-4">Shipping Information</h2>
          <form className="grid gap-4 w-full">
            <input
              value={currentUser?.email || ""}
              disabled
              className="input w-full"
              placeholder="Email"
            />
            <input
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input w-full"
              placeholder="First Name *"
            />
            <input
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input w-full"
              placeholder="Last Name *"
            />
            <input
              name="company"
              onChange={handleChange}
              className="input w-full"
              placeholder="Company Name (optional)"
            />
            <select
              name="country"
              onChange={handleChange}
              value={shippingInfo.country}
              className="input w-full"
            >
              <option value="Bangladesh">Bangladesh</option>
            </select>
            <input
              name="address"
              value={shippingInfo.address}
              onChange={handleChange}
              className="input w-full"
              placeholder="Street Address *"
            />
            <input
              name="apartment"
              onChange={handleChange}
              className="input w-full"
              placeholder="Apartment / Suite"
            />
            <input
              name="postcode"
              value={shippingInfo.postcode}
              onChange={handleChange}
              className="input w-full"
              placeholder="Postcode / ZIP *"
            />
            <input
              name="city"
              value={shippingInfo.city}
              onChange={handleChange}
              className="input w-full"
              placeholder="Town / City *"
            />
            <input
              name="phone"
              value={shippingInfo.phone}
              onChange={handleChange}
              className="input w-full"
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
              <div className="grid gap-4 border p-4 rounded">
                <input
                  name="alternate.address"
                  onChange={handleChange}
                  className="input w-full"
                  placeholder="Alt. Street Address"
                />
                <input
                  name="alternate.apartment"
                  onChange={handleChange}
                  className="input w-full"
                  placeholder="Alt. Apartment / Suite"
                />
                <input
                  name="alternate.postcode"
                  onChange={handleChange}
                  className="input w-full"
                  placeholder="Alt. Postcode / ZIP"
                />
                <input
                  name="alternate.city"
                  onChange={handleChange}
                  className="input w-full"
                  placeholder="Alt. Town / City"
                />
                <input
                  name="alternate.phone"
                  onChange={handleChange}
                  className="input w-full"
                  placeholder="Alt. Phone Number"
                />
              </div>
            )}

            <textarea
              name="notes"
              onChange={handleChange}
              className="input h-20 w-full"
              rows="4"
              placeholder="Order notes (optional)"
            ></textarea>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="w-full border p-6 sticky top-24 h-fit bg-white">
          <h2 className="text-xl font-medium mb-4">Your Order</h2>
          <ul className="divide-y mb-4 text-sm">
            {cartItems.map((item, index) => (
              <li key={index} className="py-2">
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
              checked={shippingInfo.termsAccepted}
              onChange={handleChange}
            />
            I agree to the terms and conditions.
          </label>

          <div className="bg-gray-100 p-4 rounded mt-6 text-sm space-y-2">
            <h3 className="font-semibold text-lg mb-3">Confirm Your Order</h3>
            <p>
              <span className="font-medium">Name:</span> {firstName} {lastName}
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
                <span className="font-medium">Notes:</span> {shippingInfo.notes}
              </p>
            )}
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
