import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../../Context/CartProvider";
import Nav from "../../Components/Shared/Nav";
import axiosInstance from "../../api/axiosInstance";

const OrderComplete = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem("orderSummary");

    if (!storedOrder) {
      navigate("/");
      return;
    }

    let parsedOrder;
    try {
      parsedOrder = JSON.parse(storedOrder);
    } catch (err) {
      console.error("Error parsing order summary:", err);
      navigate("/");
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/orders/${parsedOrder.orderId}`
        );
        setOrder(response.data);
        clearCart();
        localStorage.removeItem("cart");
        localStorage.removeItem("orderSummary");
      } catch (err) {
        console.error("Failed to fetch order details:", err);
        setError("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div>
        <Nav />
        <div className="max-w-2xl p-6 mx-auto mt-20 text-center bg-white rounded shadow">
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Nav />
        <div className="max-w-2xl p-6 mx-auto mt-20 text-center text-red-600 bg-white rounded shadow">
          <p>{error}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-[#FF6347] hover:bg-[#EC2D01] text-white py-2 px-4 rounded"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div>
      <Nav />
      <div className="max-w-3xl p-6 mx-auto bg-white rounded shadow">
        <h1 className="mb-4 text-3xl font-bold text-green-600">
          Thank you for your order!
        </h1>
        <p className="mb-2">
          Your order ID is <strong>{order._id}</strong>.
        </p>
        <p className="mb-4">
          Total Paid: <strong>${Number(order.totalAmount).toFixed(2)}</strong>
        </p>
        <p className="mb-4">
          Payment Status:{" "}
          <strong
            className={
              order.paymentStatus === "Paid"
                ? "text-green-600"
                : order.paymentStatus === "Failed"
                ? "text-red-600"
                : "text-yellow-600"
            }
          >
            {order.paymentStatus}
          </strong>
        </p>
        <p className="mb-4">
          Delivery Status: <strong>{order.deliveryStatus}</strong>
        </p>

        <h2 className="mt-6 mb-2 text-xl font-semibold">Items Ordered:</h2>
        <div className="space-y-4">
          {order.cartItems.map((item) => (
            <div
              key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
              className="flex items-center gap-4 p-3 border rounded-md"
            >
              <img
                src={item.primaryImage}
                alt={item.name}
                className="object-cover w-16 h-16 border rounded"
              />
              <div className="flex flex-col text-sm">
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-600">
                  Size: {item.selectedSize} | Qty: {item.quantity}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-600">Color:</span>
                  <span
                    className="inline-block w-4 h-4 border rounded-full"
                    style={{ backgroundColor: item.selectedColor }}
                    title={item.selectedColor}
                  ></span>
                </div>
                <span className="mt-1 text-gray-700">
                  Price: ${item.price.toFixed(2)} × {item.quantity} ={" "}
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-6 mb-2 text-xl font-semibold">Shipping Info:</h2>
        <ul className="text-sm text-gray-700 list-disc list-inside">
          <li>
            Name: {order.firstName} {order.lastName}
          </li>
          <li>Email: {order.email}</li>
          <li>
            Address: {order.shippingInfo.address}, {order.shippingInfo.city},{" "}
            {order.shippingInfo.postcode}
          </li>
          <li>Phone: {order.shippingInfo.phone}</li>
          {order.shippingInfo.notes && (
            <li>Notes: {order.shippingInfo.notes}</li>
          )}
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
