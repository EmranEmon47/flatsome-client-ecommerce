import React, { useState, useRef } from "react";
import logo from "../../assets/logo.png";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCart } from "../../Context/CartProvider";
import { Link } from "react-router";
import { useAuth } from "../../Context/AuthContext.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import DarkModeToggle from "./DarkModeToggle.jsx";

const Nav = () => {
  const { currentUser } = useAuth();

  const getFirstName = (fullNameOrEmail) => {
    if (!fullNameOrEmail) return "User";
    return fullNameOrEmail.split(" ")[0] || fullNameOrEmail.split("@")[0];
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const {
    cartItems,
    totalQuantity,
    totalPrice,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);
  let timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsCartOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCartOpen(false);
    }, 200);
  };
  const [open, setOpen] = useState(false);
  return (
    <div className="navbar bg-white fixed top-0  z-50  w-full">
      <div className="flex items-center justify-center w-full max-w-[calc(100%-440px)]  mx-auto font-semibold tracking-wide py-2  text-gray-500 uppercase   ">
        <div className="navbar-start">
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
          <ul className="flex items-center font-medium text-sm gap-2">
            {/* Product Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <span className="cursor-pointer p-2 hover:text-[#FF6347]">
                Product
              </span>

              {open && (
                <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg  border">
                  <li>
                    <Link
                      to="/all-products"
                      className="block px-4 py-2 hover:bg-[#FF6347] hover:text-white"
                    >
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products/men"
                      className="block px-4 py-2 hover:bg-[#FF6347] hover:text-white"
                    >
                      For Men
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products/women"
                      className="block px-4 py-2 hover:bg-[#FF6347] hover:text-white"
                    >
                      For Women
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products/kids"
                      className="block px-4 py-2 hover:bg-[#FF6347] hover:text-white"
                    >
                      For Kids
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Blogs */}
            <li>
              <Link
                to="/blogs"
                className="hover:text-[#FF6347] p-2 transition duration-200"
              >
                Blogs
              </Link>
            </li>

            {/* About Us */}
            <li>
              <Link
                to="/about"
                className="hover:text-[#FF6347] p-2 transition duration-200"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-4">
          {currentUser ? (
            <div className="relative group text-sm font-semibold text-gray-500 lg:block hidden">
              <button className="cursor-pointer py-2 rounded text-[#6184b8] transition">
                {getFirstName(currentUser.displayName || currentUser.email)}
              </button>
              <ul className="absolute right-0 w-32 bg-white border rounded shadow-md hidden group-hover:block z-50">
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-xs lg:block hidden font-semibold cursor-pointer"
            >
              Login
            </Link>
          )}

          <div className="w-px h-5 lg:flex items-center hidden bg-gray-300 mx-1"></div>

          <ul
            className="text-xs font-semibold lg:flex lg:items-center gap-2 cursor-pointer select-none"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-haspopup="true"
            aria-expanded={isCartOpen}
          >
            <li className="hidden lg:flex items-center">
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
          <DarkModeToggle />

          {/* Cart dropdown */}
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
                        key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                        className="py-2 flex justify-between items-center"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold">{item.name}</span>
                          {item.selectedColor && (
                            <span className="text-sm text-gray-500">
                              Color:{" "}
                              <span className="font-medium">
                                {item.selectedColor}
                              </span>
                            </span>
                          )}
                          {item.selectedSize && (
                            <span className="text-sm text-gray-500">
                              Size:{" "}
                              <span className="font-medium">
                                {item.selectedSize}
                              </span>
                            </span>
                          )}
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
                              updateQuantity(
                                item.id,
                                item.selectedColor,
                                item.selectedSize,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity <= 1}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.selectedColor,
                                item.selectedSize,
                                item.quantity + 1
                              )
                            }
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            +
                          </button>
                          <button
                            onClick={() =>
                              removeFromCart(
                                item.id,
                                item.selectedColor,
                                item.selectedSize
                              )
                            }
                            className="ml-2 text-red-500 hover:text-red-700 font-bold"
                          >
                            &times;
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 border-t py-3 text-right font-semibold">
                  Total: ${totalPrice.toFixed(2)}
                </div>

                <Link
                  to="/cart"
                  className="w-full block text-center bg-[#445e85] text-white py-2  hover:bg-[#2c3c53] transition"
                >
                  View My Cart
                </Link>
                <Link
                  to="/checkout"
                  className="w-full block text-center bg-[#FF6347] text-white  py-2 mt-2  hover:bg-[#EC2D01] transition"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
