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
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-medium mb-6">Shopping Cart</h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Cart Items */}
          <div className="flex-1">
            {/* Table Header (hidden on small screens) */}
            <div className="hidden sm:grid grid-cols-[2fr_1fr_.5fr_.5fr_.5fr] font-semibold text-gray-700 py-2 border-b text-sm">
              <div>Product</div>
              <div>Color / Size</div>
              <div className="text-center">Unit Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-end">Subtotal</div>
            </div>

            {/* Cart Items */}
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="py-4 px-2 flex flex-col sm:grid sm:grid-cols-[2fr_1fr_.5fr_.5fr_.5fr] sm:items-center border-b gap-3 text-sm"
              >
                {/* Product */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-contain rounded"
                  />
                  <h4 className="font-normal text-sm sm:text-base break-words">
                    {item.name}
                  </h4>
                </div>

                {/* Color / Size */}
                <div className="text-gray-600">
                  <div>
                    Color:{" "}
                    <span className="capitalize">{item.selectedColor}</span>
                  </div>
                  <div>Size: {item.selectedSize}</div>
                </div>

                {/* Unit Price */}
                <div className="sm:text-center text-start text-gray-600">
                  ${item.price.toFixed(2)}
                </div>

                {/* Quantity Controls */}
                <div className="flex justify-start sm:justify-center items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.selectedColor,
                        item.selectedSize,
                        item.quantity - 1
                      )
                    }
                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.selectedColor,
                        item.selectedSize,
                        item.quantity + 1
                      )
                    }
                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal and Remove */}
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() =>
                      removeFromCart(
                        item.id,
                        item.selectedColor,
                        item.selectedSize
                      )
                    }
                    className="text-red-500 hover:underline text-xs"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Cart Totals */}
          <div className="lg:w-1/4 w-full sticky top-24 self-start border  p-4 h-fit bg-gray-50 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Cart Totals
            </h2>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (5%):</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-base font-semibold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-6 w-full px-4 py-2 bg-[#FF6347] hover:bg-[#EC2D01] text-white font-semibold "
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;
