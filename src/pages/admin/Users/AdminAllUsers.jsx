import React, { useState } from "react";
import UserTable from "./UserTable";

const AdminAllUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section className="p-6 bg-white shadow rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">All Users</h1>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 text-sm border rounded w-60"
        />
      </div>
      <UserTable searchTerm={searchTerm} />
    </section>
  );
};

export default AdminAllUsers;
