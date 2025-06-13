import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../../Context/CartProvider";
import Nav from "../../Components/Shared/Nav";

const OrderComplete = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem("orderSummary");

    if (!storedOrder) {
      navigate("/");
      return;
    }

    try {
      const parsedOrder = JSON.parse(storedOrder);
      setOrder(parsedOrder);

      clearCart(); // ✅ Clear cart once on mount
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Error parsing order summary:", error);
      navigate("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!order) return null;

  return (
    <div>
      <Nav />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-3xl font-bold mb-4 text-green-600">
          Thank you for your order!
        </h1>
        <p className="mb-2">
          Your order ID is <strong>{order.orderId}</strong>.
        </p>
        <p className="mb-4">
          Total Paid: <strong>${Number(order.totalAmount).toFixed(2)}</strong>
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Shipping Info:</h2>
        <ul className="list-disc list-inside">
          <li>
            Name: {order.shippingInfo.firstName} {order.shippingInfo.lastName}
          </li>
          <li>Email: {order.shippingInfo.email}</li>
          <li>
            Address: {order.shippingInfo.address}, {order.shippingInfo.city},{" "}
            {order.shippingInfo.postalCode}
          </li>
          <li>Country: {order.shippingInfo.country}</li>
        </ul>

        <div className="mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-[#FF6347] hover:bg-[#EC2D01] text-white py-2 px-4 rounded"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
