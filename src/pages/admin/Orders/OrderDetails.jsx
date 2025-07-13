import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axiosInstance from "../../../api/axiosInstance";
import OrderUserInfo from "./OrderUserInfo";
import OrderShippingInfo from "./OrderShippingInfo";
import OrderStatusControls from "./OrderStatusControls";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/orders/${id}`);
      setOrder(res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch order details:", err);
      setError("Failed to load order details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!order) return <p>No order found.</p>;

  return (
    <div className="max-w-full p-6 mx-auto bg-white rounded shadow">
      <button
        onClick={() => navigate(-1)}
        className="px-3 py-1 mb-4 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back to Orders
      </button>

      <h1 className="mb-4 text-xl font-bold">Order Details - #{order._id}</h1>

      <OrderUserInfo order={order} />
      <OrderShippingInfo shippingInfo={order.shippingInfo} />
      <OrderStatusControls
        orderId={order._id}
        paymentStatus={order.paymentStatus}
        deliveryStatus={order.deliveryStatus}
        onStatusUpdated={fetchOrder}
      />

      <div className="mt-6">
        <h2 className="mb-2 font-semibold">Products</h2>
        <div className="border divide-y rounded">
          {order.cartItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4">
              <img
                src={item.primaryImage}
                alt={item.name}
                className="object-cover w-16 h-16 rounded"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Color: {item.selectedColor || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  Size: {item.selectedSize || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  Price: ${item.price.toFixed(2)}
                </p>
                <p className="text-sm font-semibold">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
