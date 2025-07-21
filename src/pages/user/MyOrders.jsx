// src/Pages/User/MyOrders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router";

const MyOrders = () => {
  const { firebaseUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!firebaseUser) return;

      try {
        const token = await firebaseUser.getIdToken();
        const res = await axios.get(
          "http://localhost:5000/api/orders/my-orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [firebaseUser]);

  if (loading)
    return <div className="mt-10 text-center">Loading orders...</div>;

  if (!orders.length)
    return (
      <div className="mt-10 text-center text-gray-500">
        You haven’t placed any orders yet.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-6">
      <h2 className="text-xl font-bold text-center text-black dark:text-white">
        My Orders
      </h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="p-4 bg-white rounded shadow-md dark:bg-gray-800"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-300">
              Order ID: {order._id}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-300">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="mb-2 text-sm text-gray-700 dark:text-gray-200">
            Total: <strong>${order.totalAmount?.toFixed(2)}</strong>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div>
              Payment:{" "}
              <span
                className={
                  order.paymentStatus === "Paid"
                    ? "text-green-600"
                    : order.paymentStatus === "Failed"
                    ? "text-red-600"
                    : "text-yellow-600"
                }
              >
                {order.paymentStatus}
              </span>
              {" • "}
              Delivery:{" "}
              <span
                className={
                  order.deliveryStatus === "Delivered"
                    ? "text-green-600"
                    : order.deliveryStatus === "Shipped"
                    ? "text-blue-600"
                    : "text-yellow-600"
                }
              >
                {order.deliveryStatus}
              </span>
            </div>

            <Link
              to={`/profile/user-orders/${order._id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
