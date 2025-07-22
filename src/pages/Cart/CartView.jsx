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
      <div className="min-h-screen bg-white dark:bg-black py-28">
        <Nav />
        <div className="p-8 text-center text-gray-600">
          <h2 className="mb-4 text-2xl font-semibold text-black dark:text-white">
            Your Cart is Empty
          </h2>
          <Link
            to="/"
            className="text-[#d26e4c] py-2 px-8 bg-gray-200 dark:bg-white mt-8 hover:text-[#ff6b39]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 text-black bg-white dark:bg-black dark:text-white lg:py-28">
      <Nav />
      <div className="lg:max-w-[calc(100%-440px)]  mx-auto w-full px-4 lg:px-0">
        <h2 className="mb-6 text-xl font-medium lg:text-2xl">Shopping Cart</h2>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left: Cart Items */}
          <div className="flex-1">
            <div className="hidden lg:grid grid-cols-[2fr_1fr_.5fr_.5fr_.5fr] font-semibold text-gray-700 dark:text-gray-200 py-2 border-b text-sm">
              <div>Product</div>
              <div>Color / Size</div>
              <div className="text-start">Unit Price</div>
              <div className="text-start">Quantity</div>
              <div className="text-end">Subtotal</div>
            </div>

            {cartItems.map((item, index) => (
              <div
                key={index}
                className="py-4 px-2 flex flex-row lg:grid lg:grid-cols-[2fr_1fr_.5fr_.5fr_.5fr] items-center border-b gap-3 text-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.primaryImage}
                    alt={item.name}
                    className="object-contain w-8 h-8 rounded lg:w-12 lg:h-12"
                  />
                  <h4 className="text-xs font-normal break-words lg:text-sm">
                    {item.name}
                  </h4>
                </div>

                <div className="text-gray-800 dark:text-gray-200">
                  <div>
                    <span className="text-xs font-normal capitalize break-words lg:text-sm">
                      {item.selectedColor}
                    </span>
                  </div>
                  <div className="text-xs font-normal break-words lg:text-sm">
                    {item.selectedSize}
                  </div>
                </div>

                <div className="text-xs font-normal text-center text-gray-800 break-words lg:text-sm dark:text-gray-200 ">
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
                    className="px-2 py-1 text-xs font-normal text-black break-words bg-gray-300 rounded lg:text-sm hover:bg-gray-100"
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
                    className="px-2 py-1 text-xs font-normal text-black break-words bg-gray-300 rounded lg:text-sm dark:text-black hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <div className="flex flex-col items-start gap-1 sm:items-end">
                  <p className="text-xs font-normal break-words lg:text-sm">
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
                    className="text-xs font-normal text-red-500 break-words lg:text-xs hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Cart Totals */}
          <div className="sticky self-start w-full p-4 text-black bg-white border shadow-sm lg:w-1/4 top-24 dark:text-white h-fit dark:bg-black ">
            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
              Cart Totals
            </h2>

            <div className="space-y-2 text-sm text-gray-00">
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
