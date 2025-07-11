import { useState } from "react";
import {
  FiGrid,
  FiBox,
  FiUsers,
  FiShoppingBag,
  FiTrendingUp,
  FiVolume2,
  FiSearch,
  FiBell,
  FiChevronDown,
  FiArrowRight,
} from "react-icons/fi";

const sidebarItems = [
  { icon: FiGrid, label: "Dashboard" },
  { icon: FiBox, label: "Products" },
  { icon: FiUsers, label: "Customers" },
  { icon: FiShoppingBag, label: "Shop" },
  { icon: FiTrendingUp, label: "Income" },
  { icon: FiVolume2, label: "Promote" },
];

export default function AdminDashboard() {
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="w-full min-h-screen p-8 font-sans bg-gray-200">
      {/* Wrapper */}
      <div className="flex overflow-hidden bg-white shadow-xl rounded-3xl">
        {/* Sidebar */}
        <aside className="flex flex-col gap-8 p-6 bg-white border-r border-gray-100 w-60">
          {/* Logo */}
          <div className="flex items-center justify-center w-12 h-12 text-xl font-bold bg-gray-300 rounded-xl">
            {/* Placeholder logo */}
            🟪
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-2">
            {sidebarItems.map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={() => setActive(label)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  active === label
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="text-xl" />
                {label}
                {label === "Customers" || label === "Income" ? (
                  <FiChevronDown className="ml-auto" />
                ) : null}
              </button>
            ))}
          </nav>

          {/* Bottom utility buttons */}
          <div className="flex flex-col gap-3 mt-auto">
            <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-full hover:bg-gray-50">
              ⌘
            </button>
            <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-full hover:bg-gray-50">
              🌓
            </button>
            <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-full hover:bg-gray-50">
              ⚙️
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-10 space-y-10 overflow-y-auto bg-gray-100">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-6">
            <h1 className="text-3xl font-semibold">Dashboard</h1>

            <div className="flex items-center w-full max-w-sm gap-4 ml-auto">
              <div className="relative flex-1">
                <FiSearch className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  placeholder="Search anything…"
                  className="w-full py-2 pl-10 pr-4 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <button className="px-6 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800">
                Create
              </button>
              <button className="relative p-2 border border-gray-200 rounded-full hover:bg-gray-50">
                <FiBell className="text-lg" />
                <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-red-500"></span>
              </button>
              <button className="bg-gray-300 rounded-full h-9 w-9" />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            {/* Left column */}
            <div className="space-y-8">
              {/* Overview Card */}
              <section className="p-6 bg-white shadow-sm rounded-2xl">
                <header className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Overview</h2>
                  <select className="rounded-lg border border-gray-200 bg-transparent py-1.5 pl-3 pr-8 text-sm focus:outline-none">
                    <option>Last month</option>
                    <option>This month</option>
                  </select>
                </header>

                {/* KPIs */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-4 p-6 border border-gray-100 rounded-2xl">
                    <div className="flex items-center gap-3 text-gray-500">
                      <FiUsers /> Customers
                    </div>
                    <div className="text-4xl font-semibold">1,293</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="rounded-md bg-red-100 px-2 py-0.5 text-red-600">
                        -36.8%
                      </span>
                      vs last month
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 p-6 border border-gray-100 rounded-2xl">
                    <div className="flex items-center gap-3 text-gray-500">
                      <FiTrendingUp /> Balance
                    </div>
                    <div className="text-4xl font-semibold">256k</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="rounded-md bg-green-100 px-2 py-0.5 text-green-600">
                        +36.8%
                      </span>
                      vs last month
                    </div>
                  </div>
                </div>

                {/* New customers */}
                <div className="flex flex-col gap-4 mt-8">
                  <p className="text-sm font-medium">
                    857 new customers today!
                  </p>
                  <p className="text-sm text-gray-500">
                    Send a welcome message to all new customers.
                  </p>

                  <div className="flex items-center gap-6">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center text-xs text-center"
                      >
                        <div className="w-12 h-12 bg-gray-300 rounded-full" />
                        <span className="mt-2">Name</span>
                      </div>
                    ))}
                    <button className="flex items-center justify-center w-10 h-10 ml-auto border border-gray-200 rounded-full hover:bg-gray-50">
                      <FiArrowRight />
                    </button>
                    <button className="ml-2 text-sm font-medium text-gray-500 underline hover:text-gray-900">
                      View all
                    </button>
                  </div>
                </div>
              </section>

              {/* Product view placeholder */}
              <section className="flex items-center justify-center p-6 text-4xl text-gray-300 bg-white shadow-sm h-72 rounded-2xl">
                $10.2m Chart
              </section>
            </div>

            {/* Right column */}
            <div className="space-y-8">
              {/* Popular products */}
              <section className="p-6 bg-white shadow-sm rounded-2xl">
                <h2 className="mb-6 text-lg font-semibold">Popular products</h2>
                <ul className="space-y-4">
                  {[
                    {
                      name: "Crypter – NFT UI Kit",
                      price: "$3,250.00",
                      status: "Active",
                    },
                    {
                      name: "Bento Pro 2.0 Illustrations",
                      price: "$7,890.00",
                      status: "Active",
                    },
                    {
                      name: "Fleet – travel shopping kit",
                      price: "$1,500.00",
                      status: "Offline",
                    },
                    {
                      name: "SimpleSocial UI Design Kit",
                      price: "$9,999.99",
                      status: "Active",
                    },
                    {
                      name: "Bento Pro vol. 2",
                      price: "$4,750.00",
                      status: "Active",
                    },
                  ].map(({ name, price, status }) => (
                    <li key={name} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-xl" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{name}</p>
                        <p className="text-xs text-gray-500">{price}</p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-0.5 text-xs font-medium ${
                          status === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {status}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-2 mt-6 text-sm font-medium border border-gray-200 rounded-full hover:bg-gray-50">
                  All products
                </button>
              </section>

              {/* Comments */}
              <section className="p-6 bg-white shadow-sm rounded-2xl">
                <h2 className="mb-6 text-lg font-semibold">Comments</h2>
                <div className="space-y-6">
                  {[
                    {
                      name: "Joyce",
                      comment:
                        "Great work! When HTML version will be available? ✨",
                    },
                    {
                      name: "Gladyce",
                      comment: "Aswome. I’m desperately waiting for it!",
                    },
                  ].map(({ name, comment }, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-full" />
                      <div className="flex-1 text-sm">
                        <p className="font-medium">{name}</p>
                        <p className="mt-1 text-gray-500">{comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
