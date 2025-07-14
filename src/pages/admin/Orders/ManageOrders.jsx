import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [filterPayment, setFilterPayment] = useState("All");
  const [filterDelivery, setFilterDelivery] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/orders");
      setOrders(res.data);
      setFilteredOrders(res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = [...orders];

    // Filter by payment status
    if (filterPayment !== "All") {
      filtered = filtered.filter(
        (o) => o.paymentStatus.toLowerCase() === filterPayment.toLowerCase()
      );
    }

    // Filter by delivery status
    if (filterDelivery !== "All") {
      filtered = filtered.filter(
        (o) => o.deliveryStatus.toLowerCase() === filterDelivery.toLowerCase()
      );
    }

    // Filter by order ID search
    if (searchId.trim()) {
      filtered = filtered.filter((o) =>
        o._id.toLowerCase().includes(searchId.trim().toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  }, [searchId, filterPayment, filterDelivery, orders]);

  return (
    <div className="max-w-6xl p-6 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Manage Orders</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="px-3 py-2 border rounded flex-grow min-w-[250px]"
        />

        <select
          value={filterPayment}
          onChange={(e) => setFilterPayment(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="All">All Payment Status</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Failed">Failed</option>
        </select>

        <select
          value={filterDelivery}
          onChange={(e) => setFilterDelivery(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="All">All Delivery Status</option>
          <option value="Not Shipped">Not Shipped</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* Orders Table */}
      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && filteredOrders.length === 0 && <p>No orders found.</p>}

      {!loading && filteredOrders.length > 0 && (
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left border">Order ID</th>
              <th className="p-2 text-left border">Email</th>
              <th className="p-2 text-left border">Payment Status</th>
              <th className="p-2 text-left border">Quantity</th>
              <th className="p-2 text-left border">Delivery Status</th>
              <th className="p-2 text-left border">Ordered At</th>
              <th className="p-2 text-left border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="cursor-pointer hover:bg-gray-50">
                <td className="p-2 text-sm border">{order._id}</td>
                <td className="p-2 text-sm border">{order.email}</td>
                <td className="p-2 text-sm border">{order.paymentStatus}</td>
                <td className="p-2 text-sm border">
                  {order.cartItems?.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </td>
                <td className="p-2 text-sm border">{order.deliveryStatus}</td>
                <td className="p-2 text-sm border">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => navigate(`/admin/orders/${order._id}`)}
                    className="px-3 py-1 text-sm text-white bg-blue-400 rounded hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageOrders;
