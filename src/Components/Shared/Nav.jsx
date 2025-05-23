import React, { useState, useRef } from "react";
import logo from "../../assets/logo.png";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCart } from "../../Context/CartProvider";

const Nav = () => {
  const {
    cartItems,
    totalQuantity,
    totalPrice,
    removeFromCart,
    updateQuantity,
  } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // We use a ref to delay closing when mouse leaves the popup (optional for better UX)
  let timeoutRef = useRef(null);

  // Show modal on mouse enter
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsCartOpen(true);
  };

  // Hide modal on mouse leave with delay (to allow moving mouse into modal)
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCartOpen(false);
    }, 200);
  };

  return (
    <>
      <div className="flex items-center justify-around w-full lg:items-center font-semibold tracking-wide py-2 lg:py-4 text-gray-500 lg:uppercase uppercase mx-auto lg:max-w-[calc(100%-440px)] shadow-sm">
        <div className="navbar-start">
          {/* Dropdown and Logo unchanged */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a
            href="/"
            className="block absolute left-1/2 transform -translate-x-1/2 lg:static lg:translate-x-0"
          >
            <img src={logo} className="h-10 block" alt="Logo" />
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          {/* Your existing menu code unchanged */}
          <ul className="menu text-xs menu-horizontal px-1">
            <li>
              <details>
                <summary>Shop</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Pages</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Blog</a>
            </li>
            <li>
              <a>Elements</a>
            </li>
          </ul>
        </div>

        {/* Cart + quantity + price wrapper for hover */}
        <div className="navbar-end lg:flex lg:items-center lg:justify-center lg:gap-4 ml-auto relative ">
          <a className="text-xs lg:block hidden font-semibold cursor-pointer">
            Login
          </a>
          <div className="w-px h-5 lg:flex items-center hidden bg-gray-300 mx-2"></div>

          <ul
            className="text-xs font-semibold lg:flex lg:items-center gap-2 cursor-pointer select-none"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-haspopup="true"
            aria-expanded={isCartOpen}
          >
            <li className="hidden lg:flex items-center ">
              <a>Cart</a>
            </li>
            <li className="text-gray-400 lg:flex items-center hidden">/</li>
            <li className="lg:flex items-center hidden">
              <a href="#">
                {totalQuantity} item{totalQuantity !== 1 ? "s" : ""} - $
                {totalPrice.toFixed(2)}
              </a>
            </li>

            <li className="relative">
              <ShoppingBagIcon className="w-8 h-8 text-gray-700" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                  {totalQuantity}
                </span>
              )}
            </li>
          </ul>

          {/* SMALL cart dropdown modal */}
          {isCartOpen && (
            <div
              className="absolute right-0 top-0 mt-2 w-80 max-h-96 overflow-auto bg-white shadow-lg rounded border border-gray-200 z-50"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              role="menu"
              aria-label="Cart dropdown"
            >
              <div className="p-4">
                <h2 className="text-lg font-bold mb-3 border-b pb-2">
                  Your Cart
                </h2>

                {cartItems.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                  <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                    {cartItems.map((item) => (
                      <li
                        key={item.id}
                        className="py-2 flex justify-between items-center"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold">{item.name}</span>
                          <span className="text-sm text-gray-500">
                            Price: ${item.price.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500">
                            Total: ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            aria-label={`Increase quantity of ${item.name}`}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name} from cart`}
                            className="ml-2 text-red-500 hover:text-red-700 font-bold"
                          >
                            &times;
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 border-t pt-3 text-right font-semibold">
                  Total: ${totalPrice.toFixed(2)}
                </div>

                <button
                  onClick={() => alert("Proceed to Checkout")}
                  className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  aria-label="Proceed to checkout"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
