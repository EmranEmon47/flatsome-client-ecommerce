// src/pages/admin/components/UserTable.jsx
import React from "react";

const UserTable = ({ users, promoteUser, demoteUser, deleteUser }) => {
  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="mb-4 text-lg font-semibold">User Management</h2>

      <div className="grid grid-cols-4 pb-2 text-sm font-bold border-b">
        <div>Name</div>
        <div>Email</div>
        <div>Role</div>
        <div>Actions</div>
      </div>

      {users.map((user) => (
        <div
          key={user._id}
          className="grid items-center grid-cols-4 py-3 text-sm border-b hover:bg-gray-50"
        >
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div className="capitalize">{user.role}</div>
          <div className="space-x-2">
            {user.role === "user" ? (
              <button
                className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                onClick={() => promoteUser(user._id)}
              >
                Promote
              </button>
            ) : (
              <button
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                onClick={() => demoteUser(user._id)}
              >
                Demote
              </button>
            )}
            <button
              className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
              onClick={() => deleteUser(user._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserTable;
