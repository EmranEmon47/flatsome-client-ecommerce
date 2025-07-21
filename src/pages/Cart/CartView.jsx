import React from "react";
import { Link, useNavigate } from "react-router";
import Nav from "../../Components/Shared/Nav";
import { useCart } from "../../Context/CartProvider";
import { useAuth } from "../../Context/AuthContext";

const CartView = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { firebaseUser } = useAuth();
  const navigate = useNavigate();

  // Calculate totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 5.0;
  const tax = subtotal * 0.05;
  const totalAmount = parseFloat((subtotal + shipping + tax).toFixed(2));

  const handleCheckout = () => {
    if (!firebaseUser) {
      return navigate("/login");
    }
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-28">
        <Nav />
        <div className="p-8 text-center text-gray-600">
          <h2 className="mb-2 text-2xl font-semibold">Your Cart is Empty</h2>
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
      <div className="max-w-[calc(100%-440px)] mx-auto py-28">
        <h2 className="mb-6 text-2xl font-medium">Shopping Cart</h2>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left: Cart Items */}
          <div className="flex-1">
            <div className="hidden sm:grid grid-cols-[2fr_1fr_.5fr_.5fr_.5fr] font-semibold text-gray-700 py-2 border-b text-sm">
              <div>Product</div>
              <div>Color / Size</div>
              <div className="text-start">Unit Price</div>
              <div className="text-start">Quantity</div>
              <div className="text-end">Subtotal</div>
            </div>

            {cartItems.map((item, index) => (
              <div
                key={index}
                className="py-4 px-2 flex flex-col lg:grid lg:grid-cols-[2fr_1fr_.5fr_.5fr_.5fr] sm:items-center border-b gap-3 text-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.primaryImage}
                    alt={item.name}
                    className="object-contain w-12 h-12 rounded"
                  />
                  <h4 className="text-sm font-normal break-words sm:text-base">
                    {item.name}
                  </h4>
                </div>

                <div className="text-gray-600">
                  <div>
                    Color:{" "}
                    <span className="capitalize">{item.selectedColor}</span>
                  </div>
                  <div>Size: {item.selectedSize}</div>
                </div>

                <div className="text-gray-600 sm:text-center text-start">
                  ${item.price.toFixed(2)}
                </div>

                <div className="flex items-center justify-start gap-2 sm:justify-center">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.selectedColor,
                        item.selectedSize,
                        item.quantity - 1
                      )
                    }
                    className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
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
                    className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>

                <div className="flex flex-col items-start gap-1 sm:items-end">
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
                    className="text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Cart Totals */}
          <div className="sticky self-start w-full p-4 border shadow-sm lg:w-1/4 top-24 h-fit bg-gray-50">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
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
                <span>${totalAmount}</span>
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
