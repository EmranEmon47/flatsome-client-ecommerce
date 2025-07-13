import React from "react";

const AdminOrderCartView = ({ cartItems }) => {
  if (!cartItems || cartItems.length === 0) {
    return <p className="text-gray-500">No items in cart.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border divide-y divide-gray-200">
        <thead className="text-left bg-gray-100">
          <tr>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Color</th>
            <th className="px-4 py-2">Size</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={`${item.id}-${index}`} className="border-b">
              <td className="px-4 py-2">
                <img
                  src={item.image || item.primaryImage}
                  alt={item.name}
                  className="object-cover rounded w-14 h-14"
                />
              </td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.selectedColor || "-"}</td>
              <td className="px-4 py-2">{item.selectedSize || "-"}</td>
              <td className="px-4 py-2">{item.quantity}</td>
              <td className="px-4 py-2">${item.price.toFixed(2)}</td>
              <td className="px-4 py-2">
                ${(item.quantity * item.price).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrderCartView;
