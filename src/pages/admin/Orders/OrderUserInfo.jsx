import React from "react";

const OrderUserInfo = ({ order }) => {
  if (!order) return null;

  return (
    <div className="mt-4 space-y-1 text-sm">
      <h2 className="mb-2 font-semibold">User Information</h2>
      <p>
        <span className="font-medium">👤 Email:</span> {order.email || "N/A"}
      </p>
      <p>
        <span className="font-medium">🆔 UID:</span> {order.uid || "N/A"}
      </p>
      <p>
        <span className="font-medium">🕓 Ordered At:</span>{" "}
        {order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}
      </p>
    </div>
  );
};

export default OrderUserInfo;
