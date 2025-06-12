import React from "react";
import { Link, useNavigate } from "react-router";
import Nav from "../../Components/Shared/Nav";
import { useCart } from "../../Context/CartProvider";

const CartView = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 5.0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <Nav />
        <div className="p-8 text-center text-gray-600">
          <h2 className="text-2xl font-semibold mb-2">Your Cart is Empty</h2>
          <Link
            to="/"
            className="text-[#d26e4c] underline hover:text-[#ff6b39]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

        <div className="divide-y">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="py-1 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-contain rounded "
                />
                <div>
                  <h4 className="font-medium text-lg">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    Color:{" "}
                    <span className="capitalize">{item.selectedColor}</span>,
                    Size: {item.selectedSize}
                  </p>
                  <p className="text-sm text-gray-600">
                    Unit Price: ${item.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600 font-semibold">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-2">
                <div className="flex items-center border rounded overflow-hidden">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.selectedColor,
                        item.selectedSize,
                        item.quantity - 1
                      )
                    }
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-sm bg-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.selectedColor,
                        item.selectedSize,
                        item.quantity + 1
                      )
                    }
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() =>
                    removeFromCart(
                      item.id,
                      item.selectedColor,
                      item.selectedSize
                    )
                  }
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total section */}
        <div className="mt-4 border-t pt-6 text-right space-y-2">
          <p className="text-gray-700">
            Subtotal:{" "}
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </p>
          <p className="text-gray-700">
            Shipping:{" "}
            <span className="font-semibold">${shipping.toFixed(2)}</span>
          </p>
          <p className="text-gray-700">
            Tax (5%): <span className="font-semibold">${tax.toFixed(2)}</span>
          </p>
          <h3 className="text-xl font-bold mt-2">Total: ${total.toFixed(2)}</h3>

          <button
            onClick={handleCheckout}
            className="mt-4 px-6 py-2 bg-[#FF6347] hover:bg-[#EC2D01] text-white "
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartView;
