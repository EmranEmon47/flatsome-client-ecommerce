import React, { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";

const OrderStatusControls = ({
  orderId,
  paymentStatus: initialPaymentStatus,
  deliveryStatus: initialDeliveryStatus,
  onStatusUpdated,
}) => {
  const [paymentStatus, setPaymentStatus] = useState(initialPaymentStatus);
  const [deliveryStatus, setDeliveryStatus] = useState(initialDeliveryStatus);
  const [pendingChange, setPendingChange] = useState(null);
  const [loading, setLoading] = useState(false);

  const confirmChange = async () => {
    if (!pendingChange) return;

    const { type, value } = pendingChange;
    setLoading(true);

    try {
      await axiosInstance.patch(`/orders/${orderId}/${type}-status`, {
        status: value,
      });

      if (type === "payment") setPaymentStatus(value);
      if (type === "delivery") setDeliveryStatus(value);

      onStatusUpdated?.();
      closeModal();
    } catch (error) {
      console.error(`Failed to update ${type} status:`, error);
      alert(`Failed to update ${type} status`);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (type, value) => {
    if (
      (type === "payment" && value === paymentStatus) ||
      (type === "delivery" && value === deliveryStatus)
    )
      return;

    setPendingChange({ type, value });
  };

  const closeModal = () => setPendingChange(null);

  return (
    <div className="mt-4 space-y-4 text-sm">
      <div>
        <label className="font-medium">💳 Payment Status: </label>
        <select
          value={paymentStatus}
          onChange={(e) => handleStatusChange("payment", e.target.value)}
          className="px-2 py-1 ml-2 border rounded"
          disabled={loading}
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Failed">Failed</option>
        </select>
      </div>
      <div>
        <label className="font-medium">🚚 Delivery Status: </label>
        <select
          value={deliveryStatus}
          onChange={(e) => handleStatusChange("delivery", e.target.value)}
          className="px-2 py-1 ml-2 border rounded"
          disabled={loading}
        >
          <option value="Not Shipped">Not Shipped</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* Modal */}
      {pendingChange && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
          <div className="w-full max-w-sm p-6 bg-white rounded shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">
              Confirm Status Change
            </h2>
            <p className="mb-6 text-sm text-gray-700">
              Are you sure you want to update{" "}
              <span className="font-medium">{pendingChange.type}</span> status
              to{" "}
              <span className="font-bold text-blue-600">
                {pendingChange.value}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-3 py-1 text-sm text-gray-700 transition border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmChange}
                className="px-4 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                disabled={loading}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderStatusControls;
