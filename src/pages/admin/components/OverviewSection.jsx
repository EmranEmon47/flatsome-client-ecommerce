import React from "react";
import { FiUsers, FiTrendingUp, FiArrowRight } from "react-icons/fi";

const OverviewSection = () => {
  return (
    <section className="p-6 bg-white shadow-sm rounded-2xl">
      {/* Header */}
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

      {/* New customers placeholder */}
      <div className="flex flex-col gap-4 mt-8">
        <p className="text-sm font-medium">857 new customers today!</p>
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
  );
};

export default OverviewSection;
