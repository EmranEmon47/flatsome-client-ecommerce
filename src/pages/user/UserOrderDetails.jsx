import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { HiArrowLeft, HiOutlineLocationMarker, HiUser } from "react-icons/hi";
import InvoiceDownload from "./InvoiceDownload.jsx"; // adjust path if needed

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const UserOrderDetails = () => {
  const { id } = useParams();
  const { firebaseUser } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = await firebaseUser.getIdToken();
        const { data } = await axios.get(
          `${API_BASE_URL}/orders/my-orders/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrder(data);
      } catch (err) {
        console.error("Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    };

    if (firebaseUser) fetchOrder();
  }, [firebaseUser, id]);

  if (loading)
    return <div className="mt-10 text-center">Loading order details...</div>;
  if (!order)
    return (
      <div className="mt-10 text-center text-red-500">Order not found.</div>
    );

  return (
    <div className="max-w-4xl p-6 mx-auto mt-2 bg-white rounded shadow-md dark:bg-gray-800 dark:text-white">
      {/* Back Button */}
      <Link
        to="/profile/my-orders"
        className="inline-flex items-center mb-4 text-blue-600 hover:underline"
      >
        <HiArrowLeft className="mr-1" />
        Back to My Orders
      </Link>

      {/* Order Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">Order Details</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Order ID: {order._id}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Placed on: {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Payment and Delivery Status */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div>
          <p className="font-semibold">Payment Status:</p>
          <p
            className={
              order.paymentStatus === "Paid"
                ? "text-green-600"
                : order.paymentStatus === "Failed"
                ? "text-red-600"
                : "text-yellow-600"
            }
          >
            {order.paymentStatus}
          </p>
        </div>
        <div>
          <p className="font-semibold">Delivery Status:</p>
          <p
            className={
              order.deliveryStatus === "Delivered"
                ? "text-green-600"
                : order.deliveryStatus === "Shipped"
                ? "text-blue-600"
                : "text-yellow-600"
            }
          >
            {order.deliveryStatus}
          </p>
        </div>
      </div>

      {/* Customer Info */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1 text-sm font-semibold">
          <HiUser />
          Customer
        </div>
        <p>{`${order.firstName || ""} ${order.lastName || ""}`}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {order.email}
        </p>
      </div>

      {/* Shipping Info */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1 text-sm font-semibold">
          <HiOutlineLocationMarker />
          Shipping Address
        </div>
        <p>
          {order.shippingInfo.address}, {order.shippingInfo.apartment}
        </p>
        <p>
          {order.shippingInfo.city}, {order.shippingInfo.postcode}
        </p>
        <p>Phone: {order.shippingInfo.phone}</p>
        {order.shippingInfo.notes && <p>Note: {order.shippingInfo.notes}</p>}
      </div>

      {/* Ordered Items */}
      <div>
        <h3 className="pb-1 mb-4 text-lg font-semibold border-b">Items</h3>
        <div className="space-y-4">
          {order.cartItems.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <img
                src={item.primaryImage}
                alt={item.name}
                className="object-cover w-16 h-16 border rounded"
              />
              <div className="flex-1 text-sm">
                <p className="font-medium">{item.name}</p>
                <p>
                  Size: {item.selectedSize}, Color: {item.selectedColor}
                </p>
                <p>
                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
              <p className="text-sm font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 text-lg font-bold text-right">
          Total{" "}
          <span className="text-xs font-light text-black">(with tax)</span>: $
          {order.totalAmount?.toFixed(2)}
        </div>
        {/* Invoice Download */}
        <div className="flex justify-end mt-4">
          <InvoiceDownload order={order} />
        </div>
      </div>
    </div>
  );
};

export default UserOrderDetails;
