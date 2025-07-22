import React, { useState, useRef, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.png";
import lightLogo from "../../assets/logo-light.png";
import { ShoppingBagIcon, HeartIcon } from "@heroicons/react/24/outline";
import { useCart } from "../../Context/CartProvider";
import { useWishlist } from "../../Context/WishlistContext";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router"; // <--- updated import here
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import DarkModeToggle from "./DarkModeToggle";
import UserDropdown from "../Product/UserDropdown"; // ✅ imported here

const Nav = () => {
  const { firebaseUser, mongoUser, loading } = useAuth();
  const {
    cartItems,
    totalQuantity,
    totalPrice,
    removeFromCart,
    updateQuantity,
  } = useCart();
  const { wishlist } = useWishlist();

  const [desktopProductOpen, setDesktopProductOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }, [mobileMenuOpen]);

  if (loading) return null;

  // const getFirstName = () => {
  //   const fullName =
  //     mongoUser?.name || firebaseUser?.displayName || firebaseUser?.email;
  //   if (!fullName) return "User";
  //   return fullName.includes("@")
  //     ? fullName.split("@")[0]
  //     : fullName.split(" ")[0];
  // };

  // const handleLogout = async () => {
  //   try {
  //     await signOut(auth);
  //   } catch (error) {
  //     console.error("Logout error:", error.message);
  //   }
  // };

  return (
    <div>
      <nav className="navbar fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl mx-auto z-[500]">
        {/* Nav Container */}
        <div className="bg-white/50 backdrop-blur-lg dark:bg-black/50 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 transition-all duration-500 hover:shadow-3xl hover:bg-white/75 dark:hover:bg-black/75 hover:scale-[1.02] hover:border-white/30 dark:hover:border-gray-600/40">
          {/* Top Row */}
          <div className="flex items-center justify-between px-2 py-2 lg:px-6 lg:py-4">
            {/* --- MOBILE NAV --- */}
            <div className="flex items-center justify-between w-full lg:hidden">
              {/* Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Open menu"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {/* Center Logo */}
              <Link to="/" className="flex-shrink-0">
                <img src={logo} alt="Logo" className="block h-8 dark:hidden" />
                <img
                  src={lightLogo}
                  alt="Logo"
                  className="hidden h-8 dark:block"
                />
              </Link>

              {/* Dark Mode Toggle */}
              <DarkModeToggle />
            </div>

            {/* --- DESKTOP NAV --- */}
            <div className="items-center justify-between hidden w-full lg:flex">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="Logo" className="block h-10 dark:hidden" />
                <img
                  src={lightLogo}
                  alt="Logo"
                  className="hidden h-10 dark:block"
                />
              </Link>

              {/* Nav Items */}
              <ul className="flex items-center gap-6 text-sm font-semibold text-gray-700 uppercase dark:text-white">
                <li
                  className="relative"
                  onMouseEnter={() => setDesktopProductOpen(true)}
                  onMouseLeave={() => setDesktopProductOpen(false)}
                >
                  <span className="cursor-pointer py-4 hover:text-[#FF6347] transition">
                    Product
                  </span>
                  {desktopProductOpen && (
                    <ul className="absolute left-0 w-48 mt-2 bg-white rounded shadow-lg dark:bg-black">
                      {["all-products", "men", "women", "kids"].map((path) => (
                        <li key={path}>
                          <Link
                            to={`/${path}`}
                            className="block px-4 py-2 hover:bg-[#FF6347] hover:text-white transition"
                          >
                            {path === "all-products"
                              ? "All Products"
                              : `For ${
                                  path.charAt(0).toUpperCase() + path.slice(1)
                                }`}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                <li>
                  <Link to="/blogs" className="hover:text-[#FF6347] py-2">
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link to="/aboutUs" className="hover:text-[#FF6347] py-2">
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
                  className="flex items-center gap-2 text-xs font-semibold cursor-pointer"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <li className="text-gray-600 dark:text-gray-300">Cart</li>
                  <li className="text-gray-400">/</li>
                  <li className="text-gray-700 dark:text-gray-200">
                    {totalQuantity} item{totalQuantity !== 1 ? "s" : ""} - $
                    {totalPrice.toFixed(2)}
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
                  className="relative p-2 transition rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <HeartIcon className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-red-500" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center animate-ping-fast">
                      {wishlist.length}
                    </span>
                  )}
                </Link>

                <DarkModeToggle />
              </div>
            </div>
          </div>

          {/* --- CART DROPDOWN --- */}
          {isCartOpen && (
            <div
              className="absolute top-0 right-0 z-50 p-4 mt-20 mr-10 w-80 bg-white dark:bg-black border border-gray-200 rounded shadow-lg max-h-[30rem] flex flex-col"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <h2 className="pb-2 text-lg font-bold text-black dark:text-white">
                Your Cart
              </h2>
              <div className="flex-1 my-2 overflow-y-auto divide-y divide-gray-200">
                {cartItems.length === 0 ? (
                  <p className="mt-2 text-gray-700 dark:text-white">
                    Your cart is empty.
                  </p>
                ) : (
                  <ul>
                    {cartItems.map((item) => (
                      <li
                        key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                        className="flex items-center justify-between py-2 pr-2"
                      >
                        <div className="flex flex-col text-sm text-black dark:text-white">
                          <span>{item.name}</span>
                          {item.selectedColor && (
                            <span>Color: {item.selectedColor}</span>
                          )}
                          {item.selectedSize && (
                            <span>Size: {item.selectedSize}</span>
                          )}
                          <span>Price: ${item.price.toFixed(2)}</span>
                          <span>
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
                            className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-300 disabled:opacity-50"
                          >
                            -
                          </button>
                          <span className="font-semibold">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.selectedColor,
                                item.selectedSize,
                                item.quantity + 1
                              )
                            }
                            className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-300"
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
              </div>
              <div className="pt-2 border-t">
                <div className="px-8 py-2 font-semibold text-right">
                  Total: ${totalPrice.toFixed(2)}
                </div>
                <Link
                  to="/cart"
                  className="block w-full text-center rounded bg-[#445e85] text-white py-2 hover:bg-[#2c3c53]"
                >
                  View My Cart
                </Link>
                <Link
                  to="/checkout"
                  className="block w-full text-center rounded bg-[#FF6347] text-white py-2 mt-2 hover:bg-[#EC2D01]"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* --- MOBILE SLIDE MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <Motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 solid-bg-no-blur h-full w-[85%] max-w-sm z-[1001] bg-white dark:bg-black p-6 flex flex-col justify-between pointer-events-auto"
            >
              {/* Close Button */}
              <div
                className="flex items-center justify-between pointer-events-auto z-[1010] "
                // Added border for debug
              >
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  <img src={logo} alt="Logo" className="h-8 dark:hidden" />
                  <img
                    src={lightLogo}
                    alt="Logo"
                    className="hidden h-8 dark:block"
                  />
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  className="text-4xl font-bold text-black pointer-events-auto dark:text-white"
                  aria-label="Close menu"
                >
                  &times;
                </button>
              </div>

              {/* Nav Links */}
              <ul className="mt-10 space-y-6 text-sm font-semibold text-gray-800 uppercase dark:text-white">
                <li>
                  <Link
                    to="/all-products"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/men"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    For Men
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/women"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    For Women
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/kids"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    For Kids
                  </Link>
                </li>
                <li>
                  <Link to="/blogs" onClick={() => setMobileMenuOpen(false)}>
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link to="/aboutUs" onClick={() => setMobileMenuOpen(false)}>
                    About Us
                  </Link>
                </li>
              </ul>

              {/* Bottom - Wishlist / Cart / Login or User Nav */}
              <div className="flex flex-col gap-4 pt-6 mt-10 border-t">
                <Link
                  to="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-sm font-semibold"
                >
                  Wishlist
                  {wishlist.length > 0 && (
                    <span className="flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
                      {wishlist.length}
                    </span>
                  )}
                </Link>

                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-sm font-semibold"
                >
                  Cart
                  {totalQuantity > 0 && (
                    <span className="flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
                      {totalQuantity}
                    </span>
                  )}
                </Link>

                <div className="mt-2">
                  {firebaseUser ? (
                    <>
                      <div className="mt-8 mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                        Hi,{" "}
                        {mongoUser?.name
                          ? mongoUser.name.split(" ")[0]
                          : firebaseUser.displayName
                          ? firebaseUser.displayName.split(" ")[0]
                          : "User"}
                      </div>
                      <ul className="space-y-2 text-sm font-semibold text-gray-800 uppercase dark:text-white">
                        <li>
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              signOut(auth);
                            }}
                            className="block mt-4 py-2 px-4 text-center text-white bg-[#FF6347] rounded font-semibold transition"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block mt-4 py-2 text-center text-white bg-[#FF6347] rounded font-semibold"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </Motion.div>

            {/* Overlay */}
            <Motion.div
              className="fixed inset-0 z-[1000] bg-black bg-opacity-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Nav;
