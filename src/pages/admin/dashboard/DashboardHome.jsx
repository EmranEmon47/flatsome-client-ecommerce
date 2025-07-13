// src/pages/admin/dashboard/DashboardHome.jsx

import React from "react";
import OverviewSection from "../components/OverviewSection"; // if you extracted KPI section

const DashboardHome = () => {
  return (
    <section className="p-6 bg-white shadow-sm rounded-xl">
      <h2 className="mb-6 text-2xl font-semibold">Admin Dashboard</h2>
      <OverviewSection />
    </section>
  );
};

export default DashboardHome;
