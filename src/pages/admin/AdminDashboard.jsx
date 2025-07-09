import React, { useState } from "react";
import useAdminUsers from "../../hooks/useAdminUsers";
import AdminSidebar from "./layout/AdminSidebar";
import AdminHeader from "./layout/AdminHeader";
import UserTable from "./components/UserTable";

const AdminDashboard = () => {
  const { users, promoteUser, demoteUser, deleteUser } = useAdminUsers();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter users by search term
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-6 space-y-6">
        <AdminHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <UserTable
          users={filteredUsers}
          promoteUser={promoteUser}
          demoteUser={demoteUser}
          deleteUser={deleteUser}
        />
      </main>
    </div>
  );
};

export default AdminDashboard;
