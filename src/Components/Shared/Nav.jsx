import React, { useState, useRef } from "react";
import logo from "../../assets/logo.png";
import lightLogo from "../../assets/logo-light.png";
import { ShoppingBagIcon, HeartIcon } from "@heroicons/react/24/outline";
import { useCart } from "../../Context/CartProvider";
import { useWishlist } from "../../Context/WishlistContext";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router";
import DarkModeToggle from "./DarkModeToggle";
import UserDropdown from "../Product/UserDropdown"; // ✅ imported here

const Nav = () => {
  // Ai do not touch or change it from here
  const { firebaseUser, loading } = useAuth();
  const {
    cartItems,
    totalQuantity,
    totalPrice,
    removeFromCart,
    updateQuantity,
  } = useCart();
  const { wishlist } = useWishlist();

  const [desktopProductOpen, setDesktopProductOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);

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

  // Mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) return null;
  // Ai do not touch or change it until here

  return (
    <nav className="navbar fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl mx-auto z-50">
      <div className="backdrop-blur-xl bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 transition-all duration-500 hover:shadow-3xl hover:bg-white/95 dark:hover:bg-black/95 hover:scale-[1.02] hover:border-white/30 dark:hover:border-gray-600/40">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="block h-10 dark:hidden" />
            <img
              src={lightLogo}
              alt="Logo"
              className="hidden h-10 dark:block"
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="items-center hidden gap-6 text-sm font-semibold text-gray-700 uppercase transition lg:flex dark:text-white">
            <li
              className="relative"
              onMouseEnter={() => setDesktopProductOpen(true)}
              onMouseLeave={() => setDesktopProductOpen(false)}
            >
              <span className="cursor-pointer py-4 hover:text-[#FF6347] transition">
                Product
              </span>
              {desktopProductOpen && (
                <ul className="absolute left-0 w-48 mt-2 bg-white border shadow-lg dark:bg-neutral-900">
                  <li>
                    <Link
                      to="/all-products"
                      className="block px-4 py-2 hover:bg-[#FF6347] hover:text-white transition"
                    >
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products/men"
                      className="block px-4 py-2 hover:bg-[#FF6347] hover:text-white transition"
                    >
                      For Men
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products/women"
                      className="block px-4 py-2 hover:bg-[#FF6347] hover:text-white transition"
                    >
                      For Women
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products/kids"
                      className="block px-4 py-2 hover:bg-[#FF6347] hover:text-white transition"
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
                className="hover:text-[#FF6347] py-2 transition duration-200"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/aboutUs"
                className="hover:text-[#FF6347] py-2 transition duration-200"
              >
                About Us
              </Link>
            </li>
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-3">
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

            {/* Cart */}
            <ul
              className="items-center hidden gap-2 text-xs font-semibold cursor-pointer select-none lg:flex"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <li className="text-gray-600 dark:text-gray-300">Cart</li>
              <li className="text-gray-400">/</li>
              <li>
                <a href="#" className="text-gray-700 dark:text-gray-200">
                  {totalQuantity} item{totalQuantity !== 1 ? "s" : ""} - $
                  {totalPrice.toFixed(2)}
                </a>
              </li>
              <li className="relative">
                <ShoppingBagIcon className="w-6 h-6 text-gray-700 dark:text-white" />
                {totalQuantity > 0 && (
                  <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2 animate-ping-fast">
                    {totalQuantity}
                  </span>
                )}
              </li>
            </ul>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 transition rounded-full group hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <HeartIcon className="w-6 h-6 text-gray-600 group-hover:text-red-500 dark:text-gray-300" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center animate-ping-fast">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <DarkModeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center w-8 h-8 rounded-md lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg
                className="w-6 h-6 text-gray-700 dark:text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="px-4 pt-2 pb-4 space-y-2 shadow-md lg:hidden bg-white/80 dark:bg-black/70 backdrop-blur-md">
            <div
              className="relative"
              onMouseEnter={() => setMobileProductOpen(true)}
              onMouseLeave={() => setMobileProductOpen(false)}
            >
              <span className="block px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                Product
              </span>
              {mobileProductOpen && (
                <ul className="absolute left-0 w-48 mt-2 bg-white border shadow-lg dark:bg-neutral-900">
                  <li>
                    <Link
                      to="/all-products"
                      className="block px-4 py-2 hover:bg-[#FF6347] hover:text-white transition"
                    >
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products/men"
                      className="block px-4 py-2 hover:bg-[#FF6347] hover:text-white transition"
                    >
                      For Men
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products/women"
                      className="block px-4 py-2 hover:bg-[#FF6347] hover:text-white transition"
                    >
                      For Women
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products/kids"
                      className="block px-4 py-2 hover:bg-[#FF6347] hover:text-white transition"
                    >
                      For Kids
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            <Link
              to="/blogs"
              className="block px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Blogs
            </Link>
            <Link
              to="/aboutUs"
              className="block px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              About Us
            </Link>
          </div>
        )}

        {/* Cart Dropdown */}
        {/* ai donot change anything from here */}
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
        {/* ai donot change anything until here */}
      </div>
    </nav>
  );
};

export default Nav;
