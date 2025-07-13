import React from "react";
import useAdminUsers from "../../../hooks/useAdminUsers";

const UserTable = ({ searchTerm }) => {
  const { users, promoteUser, demoteUser, deleteUser } = useAdminUsers();

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="p-6 bg-white shadow rounded-xl">
      <h2 className="mb-4 text-xl font-semibold">User Management</h2>
      <table className="w-full text-sm border">
        <thead>
          <tr className="text-left bg-gray-50">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Role</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} className="border-b hover:bg-gray-50">
              <td className="p-3 border">{user.name || "N/A"}</td>
              <td className="p-3 border">{user.email}</td>
              <td className="p-3 capitalize border">{user.role}</td>
              <td className="p-3 space-x-2 border">
                {user.role !== "admin" ? (
                  <button
                    onClick={() => promoteUser(user._id)}
                    className="px-2 py-1 text-xs text-white bg-green-600 rounded hover:bg-green-700"
                  >
                    Promote
                  </button>
                ) : (
                  <button
                    onClick={() => demoteUser(user._id)}
                    className="px-2 py-1 text-xs text-yellow-600 border border-yellow-500 rounded hover:bg-yellow-50"
                  >
                    Demote
                  </button>
                )}
                <button
                  onClick={() => deleteUser(user._id)}
                  className="px-2 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default UserTable;
