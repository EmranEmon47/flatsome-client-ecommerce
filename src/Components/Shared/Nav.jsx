import React from "react";
import logo from "../../assets/logo.png";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const Nav = () => {
  return (
    <div className=" flex w-full items-center font-semibold py-4  text-gray-500  uppercase mx-auto max-w-[calc(100%-440px)]  shadow-sm">
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
        <a href="/">
          <img src={logo} className="h-10" alt="Logo" />
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
      {/* <div className="navbar-end flex items-center justify-items-center ">
        <div>
          <a className=" text-xs font-semibold">Login</a>
        </div>
        <div>
          <ul className="text-xs font-semibold flex  items-center  justify-items-center">
            <li>
              <a>Cart</a>
            </li>
            <li>
              <a>$0.00</a>
            </li>
          </ul>
        </div>
      </div> */}
      <div className="navbar-end flex items-center gap-4 ml-auto">
        <a className="text-xs font-semibold cursor-pointer">Login</a>
        <div className="w-px h-5 bg-gray-300"></div>
        <ul className="text-xs font-semibold flex items-center gap-2">
          <li>
            <a>Cart</a>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <a>$0.00</a>
          </li>
          <li>
            <ShoppingBagIcon className="w-8 h-8 text-gray-700" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
