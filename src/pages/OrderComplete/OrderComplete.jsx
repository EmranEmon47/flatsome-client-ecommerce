import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useParams, Link } from "react-router";
import axiosInstance from "../../api/axiosInstance";
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
    <div className="min-h-screen text-black bg-white dark:bg-black dark:text-white">
      <Nav />
      <div className="w-full p-6 py-24 mx-auto lg:max-w-3xl lg:py-28">
        <h1 className="mb-4 text-3xl font-bold text-green-600">
          🎉 Order Successful Complete!
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

          <Link
            to="/"
            className="inline-block px-4 py-2 mt-6 text-white bg-[#FF6347] rounded hover:bg-[#EC2D01]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
