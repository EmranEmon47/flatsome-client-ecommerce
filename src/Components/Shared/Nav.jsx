import React, { useState, useRef } from "react";
import logo from "../../assets/logo.png";
import { ShoppingBagIcon, HeartIcon } from "@heroicons/react/24/outline";
import { useCart } from "../../Context/CartProvider";
import { useWishlist } from "../../Context/WishlistContext";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router";
import DarkModeToggle from "./DarkModeToggle";
import UserDropdown from "../Product/UserDropdown"; // ✅ imported here

const Nav = () => {
  const { firebaseUser, loading } = useAuth();
  const {
    cartItems,
    totalQuantity,
    totalPrice,
    removeFromCart,
    updateQuantity,
  } = useCart();
  const { wishlist } = useWishlist();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsCartOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCartOpen(false);
    }, 200);
  };

  if (loading) return null;

  return (
    <div className="fixed top-0 z-50 w-full text-gray-800 transition duration-300 bg-white border-b border-gray-200 dark:bg-black dark:text-white navbar">
      <div className="grid items-center w-full grid-cols-3 max-w-[calc(100%-440px)] mx-auto py-4 font-semibold text-gray-500 uppercase ">
        {/* Logo */}
        <div className="justify-self-start">
          <Link
            to="/"
            className="absolute block transform -translate-x-1/2 left-1/2 lg:static lg:translate-x-0"
          >
            <img src={logo} className="block h-10" alt="Logo" />
          </Link>
        </div>

        {/* Center menu */}
        <div className="justify-self-center">
          <ul className="flex items-center justify-center gap-2 text-sm font-medium uppercase">
            <li
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <span className="cursor-pointer py-4 hover:text-[#FF6347]">
                Product
              </span>
              {open && (
                <ul className="absolute left-0 w-48 mt-2 bg-white border shadow-lg">
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

            <li>
              <Link
                to="/blogs"
                className="hover:text-[#FF6347] p-2 transition duration-200"
              >
                Blogs
              </Link>
            </li>

            <li>
              <Link
                to="/aboutUs"
                className="hover:text-[#FF6347]  p-2 transition duration-200"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 justify-self-end">
          {/* User */}
          {firebaseUser ? (
            <UserDropdown />
          ) : (
            <Link
              to="/login"
              className="hidden text-xs font-semibold cursor-pointer lg:block"
            >
              Login
            </Link>
          )}

          <div className="items-center hidden w-px h-5 mx-1 bg-gray-300 lg:flex"></div>

          {/* Cart */}
          <ul
            className="gap-2 text-xs font-semibold cursor-pointer select-none text-secondary lg:flex lg:items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <li className="items-center hidden lg:flex">
              <a>Cart</a>
            </li>
            <li className="items-center hidden text-gray-400 lg:flex">/</li>
            <li className="items-center hidden lg:flex">
              <a href="#">
                {totalQuantity} item{totalQuantity !== 1 ? "s" : ""} - $
                {totalPrice.toFixed(2)}
              </a>
            </li>
            <li className="relative">
              <ShoppingBagIcon className="w-8 h-8 text-gray-700" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-ping-fast">
                  {totalQuantity}
                </span>
              )}
            </li>
          </ul>

          {/* Wishlist */}
          <div className="flex items-center">
            <Link
              to="/wishlist"
              className="relative p-2 transition rounded-full group hover:bg-gray-100"
            >
              <HeartIcon className="w-6 h-6 text-gray-600 group-hover:text-red-500" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center animate-ping-fast">
                  {wishlist.length}
                </span>
              )}
            </Link>
          </div>

          <DarkModeToggle />

          {/* Cart dropdown */}
          {isCartOpen && (
            <div
              className="absolute top-0 right-0 z-50 p-4 mt-20 mr-10 overflow-auto bg-white border border-gray-200 rounded shadow-lg mt-18 w-80 max-h-96"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div>
                <h2 className="text-lg font-bold border-b ">Your Cart</h2>
                {cartItems.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                  <ul className="overflow-y-auto divide-y divide-gray-200 max-h-60">
                    {cartItems.map((item) => (
                      <li
                        key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                        className="flex items-center justify-between py-2"
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
                            className="ml-2 font-bold text-red-500 hover:text-red-700"
                          >
                            &times;
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="py-3 mt-4 font-semibold text-right border-t">
                  Total: ${totalPrice.toFixed(2)}
                </div>
                <Link
                  to="/cart"
                  className="block w-full text-center bg-[#445e85] text-white py-2 hover:bg-[#2c3c53] transition"
                >
                  View My Cart
                </Link>
                <Link
                  to="/checkout"
                  className="block w-full text-center bg-[#FF6347] text-white py-2 mt-2 hover:bg-[#EC2D01] transition"
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
