// src/pages/admin/layout/AdminSidebar.jsx
import React from "react";
import { Link } from "react-router";

const AdminSidebar = () => {
  return (
    <aside className="w-64 p-6 bg-white shadow rounded-2xl">
      <h2 className="mb-6 text-xl font-bold">Admin Panel</h2>
      <nav className="space-y-4">
        <Link
          to="/admin"
          className="block font-medium text-gray-700 hover:text-black"
        >
          👥 Users
        </Link>
        <span className="block text-gray-400">📦 Products (coming)</span>
        <span className="block text-gray-400">📑 Orders (coming)</span>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
