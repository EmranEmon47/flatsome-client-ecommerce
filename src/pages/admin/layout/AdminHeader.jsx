// src/pages/admin/layout/AdminHeader.jsx
import React from "react";

const AdminHeader = () => {
  return (
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="px-4 py-2 text-sm bg-gray-200 rounded-full">
        Welcome, Admin
      </div>
    </header>
  );
};

export default AdminHeader;
