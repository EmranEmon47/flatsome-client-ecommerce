import React from "react";
import logo from "../../assets/logo.png";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCart } from "../../Context/CartProvider";

const Nav = () => {
  const { totalQuantity, totalPrice } = useCart();
  return (
    <div className="flex items-center justify-around   w-full lg:items-center font-semibold lg:font-semibold tracking-wide py-2 lg:py-4  text-gray-500 lg:uppercase  uppercase mx-auto lg:max-w-[calc(100%-440px)]  shadow-sm">
      <div className="navbar-start ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm  dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
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
        {/* <a className="btn btn-ghost text-xl">daisy</a> */}
        <a
          href="/"
          className="block absolute left-1/2 transform -translate-x-1/2 lg:static lg:translate-x-0"
        >
          <img src={logo} className="h-10 block" alt="Logo" />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
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

      <div className="navbar-end    lg:flex lg:items-center lg:justify-center  lg:gap-4 ml-auto">
        <a className="text-xs lg:block hidden font-semibold cursor-pointer">
          Login
        </a>
        <div className="w-px h-5 lg:flex items-center hidden bg-gray-300"></div>
        <ul className="text-xs font-semibold  lg:flex lg:items-center gap-2">
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

          <li>
            <ShoppingBagIcon className="w-8 flex justify-center items-center h-8 text-gray-700" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
