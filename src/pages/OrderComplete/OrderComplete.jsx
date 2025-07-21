import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useParams } from "react-router";
import axiosInstance from "../../api/axiosInstance"; // Ensure this uses Firebase token
import Nav from "../../Components/Shared/Nav";

const OrderComplete = () => {
  const { mongoUser } = useAuth();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axiosInstance.get(`/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <p className="py-10 text-center">Loading order details...</p>;
  }

  if (!order) {
    return <p className="py-10 text-center text-red-500">Order not found.</p>;
  }

  const { shippingInfo, totalAmount, cartItems, createdAt } = order;

  return (
    <div>
      <Nav />
      <div className="max-w-3xl p-6 mx-auto py-28">
        <h1 className="mb-4 text-3xl font-bold text-green-600">
          🎉 Order Successful!
        </h1>
        <p className="mb-4">
          Thank you for your purchase,{" "}
          <span className="font-semibold">
            {mongoUser?.firstName || "Customer"}
          </span>
          !
        </p>

        <div className="space-y-3">
          <div>
            <h2 className="font-semibold">Order ID:</h2>
            <p>{order._id}</p>
          </div>

          <div>
            <h2 className="font-semibold">Order Date:</h2>
            <p>{new Date(createdAt).toLocaleString()}</p>
          </div>

          <div>
            <h2 className="font-semibold">Total Paid:</h2>
            <p>${totalAmount.toFixed(2)}</p>
          </div>

          <div>
            <h2 className="font-semibold">Shipping Info:</h2>
            <p>{shippingInfo.address}</p>
            <p>
              {shippingInfo.city}, {shippingInfo.postcode}
            </p>
            <p>{shippingInfo.phone}</p>
          </div>

          <div>
            <h2 className="mt-4 font-semibold">Items:</h2>
            <ul className="pl-5 list-disc">
              {cartItems.map((item, index) => (
                <li key={index}>
                  {item.name} x {item.quantity} ({item.selectedColor},{" "}
                  {item.selectedSize})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
