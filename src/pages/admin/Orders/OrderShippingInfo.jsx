import React from "react";

const OrderShippingInfo = ({ shippingInfo }) => {
  if (!shippingInfo) return <p>No shipping information available.</p>;

  return (
    <div className="mt-4 space-y-1 text-sm">
      <h2 className="mb-2 font-semibold">Shipping Information</h2>
      <p>
        <span className="font-medium">🏠 Address:</span>{" "}
        {shippingInfo.address || "N/A"}
      </p>
      <p>
        <span className="font-medium">🏙️ City:</span>{" "}
        {shippingInfo.city || "N/A"}
      </p>
      <p>
        <span className="font-medium">📮 Postal Code:</span>{" "}
        {shippingInfo.postcode || "N/A"}
      </p>
      <p>
        <span className="font-medium">📞 Phone:</span>{" "}
        {shippingInfo.phone || "N/A"}
      </p>
      <p>
        <span className="font-Semibold">Note:</span>{" "}
        {shippingInfo.notes || "N/A"}
      </p>
    </div>
  );
};

export default OrderShippingInfo;
