import React from "react";
import { FiSearch, FiBell } from "react-icons/fi";
import { useAuth } from "../../../Context/AuthContext";

const AdminHeader = ({ searchTerm, setSearchTerm }) => {
  const { firebaseUser, mongoUser } = useAuth();

  const adminName = mongoUser?.fullName || firebaseUser?.displayName || "Admin";

  return (
    <div className="flex items-center justify-between gap-6 px-10 py-6">
      <h1 className="text-xl font-semibold">
        Welcome, <span className="text-gray-900">{adminName}</span>
      </h1>

      <div className="flex items-center w-full max-w-sm gap-4 ml-auto">
        <div className="relative flex-1">
          <FiSearch className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Search anything…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <button className="px-6 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800">
          Create
        </button>
        <button className="relative p-2 border border-gray-200 rounded-full hover:bg-gray-50">
          <FiBell className="text-lg" />
          <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-red-500" />
        </button>
        <button className="bg-gray-300 rounded-full h-9 w-9" />
      </div>
    </div>
  );
};

export default AdminHeader;
